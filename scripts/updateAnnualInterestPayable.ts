import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

type OnsObservation = {
  date?: string;
  year?: string;
  month?: string;
  value?: string;
};

type OnsResponse = {
  months?: OnsObservation[];
  description?: {
    unit?: string;
  };
};

type AnnualInterestPayableMetric = {
  numericValue: number;
  formattedValue: string;
  currencySymbol: string;
  timestamp: string;
  dateValue: string;
};

type MonthlyTaxpayersInterestPayableMetric = {
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

const ONS_ENDPOINTS = [
  "https://api.ons.gov.uk/timeseries/NMFX/dataset/pusf/data",
  "https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/timeseries/nmfx/pusf/data",
];

const MONTHLY_OUTPUT_PATH = join(
  process.cwd(),
  "src",
  "data",
  "monthlyInterestPayableMetric.json",
);

const OUTPUT_PATH = join(
  process.cwd(),
  "src",
  "data",
  "annualInterestPayableMetric.json",
);

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
  const onsMonthMatch = /^(\d{4})\s+([A-Za-z]{3})$/i.exec(trimmed);

  if (onsMonthMatch) {
    const year = Number(onsMonthMatch[1]);
    const monthIndex = MONTH_MAP[onsMonthMatch[2].toLowerCase()];
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

async function fetchOnsData(): Promise<OnsResponse> {
  let lastError: string | null = null;

  for (const endpoint of ONS_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        lastError = `Request failed (${response.status}) for ${endpoint}`;
        continue;
      }

      return (await response.json()) as OnsResponse;
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Unknown request error";
    }
  }

  throw new Error(lastError ?? "Unable to fetch ONS data from known endpoints.");
}

function getLatest12MonthlyObservations(data: OnsResponse): Array<{ value: number; date: Date }> {
  if (!Array.isArray(data.months) || data.months.length === 0) {
    throw new Error("ONS response did not include monthly observations.");
  }

  const parsed = data.months
    .map((entry) => ({
      value: toNumber(entry.value),
      date: normalizeDate(entry.date ?? `${entry.year ?? ""} ${entry.month ?? ""}`.trim()),
    }))
    .filter((entry): entry is { value: number; date: Date } => {
      return entry.value !== null && entry.date instanceof Date;
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  if (parsed.length < 12) {
    throw new Error(`Expected at least 12 monthly observations but found ${parsed.length}.`);
  }

  return parsed.slice(-12);
}

async function main() {
  try {
    const data = await fetchOnsData();
    const latest12 = getLatest12MonthlyObservations(data);
    const unit = data.description?.unit;

    const numericValue = latest12.reduce((sum, observation) => {
      return sum + toPounds(observation.value, unit);
    }, 0);

    const latestObservationDate = latest12[latest12.length - 1].date;

    const metric: AnnualInterestPayableMetric = {
      numericValue,
      formattedValue: formatCompactPounds(numericValue),
      currencySymbol: "\u00A3",
      timestamp: new Date().toISOString(),
      dateValue: formatMonthYear(latestObservationDate),
    };

    const monthlyMetric: MonthlyTaxpayersInterestPayableMetric = {
      currencySymbol: "\u00A3",
      dateValue: formatMonthYear(latestObservationDate),
      formattedValue: formatCompactPounds(Number((numericValue / TAXPAYERS.taxpayers / 12).toFixed(0))),
      numericValue, ...TAXPAYERS,
      timestamp: new Date().toISOString()
    }

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, `${JSON.stringify(metric, null, 2)}\n`, "utf8");

    await writeFile(MONTHLY_OUTPUT_PATH, `${JSON.stringify(monthlyMetric, null, 2)}\n`, 'utf8')

    console.log("Updated Annual Interest Payable metric");
    console.log(`Raw value: ${metric.numericValue}`);
    console.log(`Formatted: ${metric.formattedValue}`);
    console.log("Saved to src/data/annualInterestPayableMetric.json");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update Annual Interest Payable metric.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
