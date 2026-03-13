import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import gdpData from "../src/data/gdpMetric.json" with { type: "json" };

type DebtToGdp = {
  numericValue: number;
  formattedValue: string;
  timestamp: string;
  dateValue: string;
}

type OnsObservation = {
  date?: string;
  year?: string;
  month?: string;
  value?: string;
};

type OnsResponse = {
  months?: OnsObservation[];
  quarters?: OnsObservation[];
  years?: OnsObservation[];
  description?: {
    unit?: string;
    preUnit?: string;
  };
};

type TotalDebtMetric = {
  numericValue: number;
  formattedValue: string;
  currencySymbol: string;
  timestamp: string;
  dateValue: string;
};

type TaxpayerDebtMetric = {
  currencySymbol: string;
  dateValue: string;
  formattedValue: string;
  numericValue: number;
  taxpayers: number;
  taxpayersFormatted: string;
  source: string;
  taxYear: string;
  timestamp: string;
}

const ONS_URL =
  "https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/timeseries/hf6w/pusf/data";
const OUTPUT_PATH = join(process.cwd(), "src", "data", "totalDebtMetrics.json");
const DEBT_TO_GDP_OUTPUT_PATH = join(process.cwd(), "src", "data", "debtToGdpMetrics.json");
const MONTH_MAP: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};
const TAXPAYER_OUTPUT_PATH = join(process.cwd(), "src", "data", "taxpayerDebt.json");

const TAXPAYERS = {
  "taxpayers": 39100000,
  "taxpayersFormatted": "39m",
  "source": "HMRC Income Tax Liabilities Statistics",
  "taxYear": "2025-2026"
}

function toNumber(value: string | undefined): number | null {
  if (!value) return null;

  const cleaned = value.replace(/,/g, "").trim();
  if (!cleaned) return null;

  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeDate(rawDate: string | undefined): Date | null {
  if (!rawDate) return null;

  const trimmed = rawDate.trim();

  // Common ONS labels for this series include "YYYY MON" e.g. "2026 JAN".
  const onsMonthMatch = /^(\d{4})\s+([A-Za-z]{3})$/i.exec(trimmed);
  if (onsMonthMatch) {
    const year = Number(onsMonthMatch[1]);
    const monthKey = onsMonthMatch[2].toLowerCase();
    const monthIndex = MONTH_MAP[monthKey];
    if (monthIndex !== undefined) {
      return new Date(Date.UTC(year, monthIndex, 1));
    }
  }

  const iso = new Date(trimmed);
  return Number.isNaN(iso.getTime()) ? null : iso;
}

function toPounds(value: number, unit: string | undefined): number {
  const normalizedUnit = (unit ?? "").toLowerCase();
  if (normalizedUnit.includes("bn")) return Math.round(value * 1_000_000_000);
  if (normalizedUnit.includes("m")) return Math.round(value * 1_000_000);
  if (normalizedUnit.includes("k")) return Math.round(value * 1_000);
  return Math.round(value);
}

function formatCompactPounds(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (abs >= 1_000_000_000_000) {
    return `${sign}\u00A3${(abs / 1_000_000_000_000).toFixed(1)}T`;
  }
  if (abs >= 1_000_000_000) {
    return `${sign}\u00A3${(abs / 1_000_000_000).toFixed(1)}B`;
  }
  if (abs >= 1_000_000) {
    return `${sign}\u00A3${(abs / 1_000_000).toFixed(1)}M`;
  }

  return `${sign}\u00A3${abs.toLocaleString("en-GB")}`;
}

function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function getLatestObservation(data: OnsResponse): { value: number; date: Date } {
  const candidates = data.months ?? data.quarters ?? data.years ?? [];
  if (!Array.isArray(candidates) || candidates.length === 0) {
    throw new Error("No observations returned by ONS dataset.");
  }

  const parsed = candidates
    .map((entry) => ({
      value: toNumber(entry.value),
      date: normalizeDate(entry.date ?? `${entry.year ?? ""} ${entry.month ?? ""}`.trim()),
    }))
    .filter((entry): entry is { value: number; date: Date } => {
      return entry.value !== null && entry.date instanceof Date;
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  if (parsed.length === 0) {
    throw new Error("ONS response did not contain a valid latest observation.");
  }

  return parsed[parsed.length - 1];
}

async function main() {
  try {
    const response = await fetch(ONS_URL, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`ONS request failed with status ${response.status}.`);
    }

    const data = (await response.json()) as OnsResponse;
    const latest = getLatestObservation(data);
    const numericValue = toPounds(latest.value, data.description?.unit);
    const debtToGdp = (numericValue / gdpData.numericValue) * 100
    const metric: TotalDebtMetric = {
      numericValue,
      formattedValue: formatCompactPounds(numericValue),
      currencySymbol: "\u00A3",
      timestamp: new Date().toISOString(),
      dateValue: formatMonthYear(latest.date),
    };

    const taxpayerDebtMetric: TaxpayerDebtMetric = {
      currencySymbol: "\u00A3",
      dateValue: formatMonthYear(latest.date),
      formattedValue: formatCompactPounds(Number((numericValue / TAXPAYERS.taxpayers).toFixed(0))),
      numericValue, ...TAXPAYERS,
      timestamp: new Date().toISOString()
    }

    const debtToGdpMetric: DebtToGdp = {
      dateValue: formatMonthYear(latest.date),
      formattedValue: `${debtToGdp.toFixed(1)}%`,
      numericValue: debtToGdp,
      timestamp: new Date().toISOString()
    }

    await writeFile(OUTPUT_PATH, `${JSON.stringify(metric, null, 2)}\n`, "utf8");
    await writeFile(TAXPAYER_OUTPUT_PATH, `${JSON.stringify(taxpayerDebtMetric, null, 2)}\n`, 'utf8');
    await writeFile(DEBT_TO_GDP_OUTPUT_PATH, `${JSON.stringify(debtToGdpMetric, null, 2)}\n`, "utf8");

    console.log(`Total GDP: ${gdpData.numericValue}`);
    console.log("Updated Total UK Debt metric");
    console.log(`Raw value: ${metric.numericValue}`);
    console.log(`Formatted: ${metric.formattedValue}`);
    console.log("Saved to src/data/totalDebtMetrics.json");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update Total UK Debt metric.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
