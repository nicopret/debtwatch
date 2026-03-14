import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import { getGovernmentPeriodForYear, GOVERNMENT_PERIODS } from "../src/lib/governmentPeriods.js";

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

type DebtInterestTimelineItem = {
  yearLabel: string;
  numericValue: number;
  formattedValue: string;
  governmentKey: string;
  governmentLabel: string;
};

type DebtInterestTimeline = {
  title: string;
  subtitle: string;
  dateValue: string;
  timestamp: string;
  source: string;
  items: DebtInterestTimelineItem[];
};

type GovernmentTotal = {
  governmentKey: string;
  governmentLabel: string;
  startYear: number;
  endYear: number | null;
  totalNumericValue: number;
  totalFormattedValue: string;
  averageAnnualNumericValue: number;
  averageAnnualFormattedValue: string;
};

type DebtInterestSummary = {
  timestamp: string;
  dateValue: string;
  source: string;
  latestAnnualInterest: {
    year: string;
    numericValue: number;
    formattedValue: string;
  };
  peakYear: string;
  peakYearAmount: {
    numericValue: number;
    formattedValue: string;
  };
  peakGovernment: {
    governmentKey: string;
    governmentLabel: string;
  };
  averageAnnualInterest: {
    numericValue: number;
    formattedValue: string;
  };
  latestVsAverage: {
    numericDifference: number;
    formattedDifference: string;
    percentageDifference: number;
    formattedPercentageDifference: string;
  };
  governmentTotals: GovernmentTotal[];
};

type ParsedMonthlyObservation = {
  date: Date;
  numericValue: number;
};

const ONS_ENDPOINTS = [
  "https://api.ons.gov.uk/timeseries/NMFX/dataset/pusf/data",
  "https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/timeseries/nmfx/pusf/data",
] as const;
const MIN_YEAR = 1997;
const OUTPUT_PATHS = {
  timeline: join(process.cwd(), "src", "data", "debtInterestTimeline.json"),
  summary: join(process.cwd(), "src", "data", "debtInterestSummary.json"),
};
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

function toNumber(value: string | undefined): number | null {
  if (!value) return null;

  const cleaned = value.replace(/,/g, "").trim();
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

  const fallback = new Date(trimmed);
  return Number.isNaN(fallback.getTime()) ? null : fallback;
}

function toPounds(value: number, unit: string | undefined): number {
  const normalizedUnit = (unit ?? "").toLowerCase();
  if (normalizedUnit.includes("bn")) return Math.round(value * 1_000_000_000);
  if (normalizedUnit.includes("m")) return Math.round(value * 1_000_000);
  if (normalizedUnit.includes("k")) return Math.round(value * 1_000);
  return Math.round(value);
}

function formatBillions(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  const billions = abs / 1_000_000_000;
  const fractionDigits = Number.isInteger(billions) || billions >= 100 ? 0 : 1;

  return `${sign}\u00A3${billions.toFixed(fractionDigits)}B`;
}

function formatDifference(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}${formatBillions(Math.abs(value))}`;
}

function formatPercentage(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}${Math.abs(value).toFixed(1)}%`;
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

  throw new Error(lastError ?? "Unable to fetch ONS debt-interest data.");
}

function parseMonthlyObservations(data: OnsResponse): ParsedMonthlyObservation[] {
  if (!Array.isArray(data.months) || data.months.length === 0) {
    throw new Error("ONS response did not include monthly debt-interest observations.");
  }

  const parsed = data.months
    .map((entry) => ({
      date: normalizeDate(entry.date ?? `${entry.year ?? ""} ${entry.month ?? ""}`.trim()),
      numericValue: entry.value !== undefined ? toPounds(toNumber(entry.value) ?? NaN, data.description?.unit) : null,
    }))
    .filter(
      (entry): entry is ParsedMonthlyObservation =>
        entry.date instanceof Date &&
        typeof entry.numericValue === "number" &&
        Number.isFinite(entry.numericValue),
    )
    .sort((left, right) => left.date.getTime() - right.date.getTime());

  if (parsed.length < 24) {
    throw new Error(`Expected at least 24 monthly observations, found ${parsed.length}.`);
  }

  return parsed;
}

function buildTimeline(monthlyObservations: ParsedMonthlyObservation[]): DebtInterestTimelineItem[] {
  const currentYear = new Date().getUTCFullYear();
  const totalsByYear = new Map<number, number>();

  for (const observation of monthlyObservations) {
    const year = observation.date.getUTCFullYear();
    if (year < MIN_YEAR || year >= currentYear) {
      continue;
    }

    totalsByYear.set(year, (totalsByYear.get(year) ?? 0) + observation.numericValue);
  }

  const items = [...totalsByYear.entries()]
    .sort(([leftYear], [rightYear]) => leftYear - rightYear)
    .map(([year, numericValue]) => {
      const government = getGovernmentPeriodForYear(year);
      if (!government) {
        throw new Error(`No government period configured for debt-interest year ${year}.`);
      }

      return {
        yearLabel: String(year),
        numericValue,
        formattedValue: formatBillions(numericValue),
        governmentKey: government.governmentKey,
        governmentLabel: government.governmentLabel,
      } satisfies DebtInterestTimelineItem;
    });

  if (items.length < 10) {
    throw new Error(`Expected at least 10 annual debt-interest points, found ${items.length}.`);
  }

  return items;
}

function buildSummary(items: DebtInterestTimelineItem[]): DebtInterestSummary {
  const latestAnnualInterest = items[items.length - 1]!;
  const peakYearItem = items.reduce((peak, item) =>
    item.numericValue > peak.numericValue ? item : peak,
  );
  const averageAnnualNumericValue =
    items.reduce((sum, item) => sum + item.numericValue, 0) / items.length;
  const latestVsAverageNumericDifference =
    latestAnnualInterest.numericValue - averageAnnualNumericValue;
  const latestVsAveragePercentageDifference =
    averageAnnualNumericValue === 0
      ? 0
      : (latestVsAverageNumericDifference / averageAnnualNumericValue) * 100;

  const governmentTotals = GOVERNMENT_PERIODS.map((period) => {
    const periodItems = items.filter((item) => item.governmentKey === period.governmentKey);
    if (periodItems.length === 0) {
      return null;
    }

    const totalNumericValue = periodItems.reduce((sum, item) => sum + item.numericValue, 0);
    const averageAnnualNumericValueForPeriod = totalNumericValue / periodItems.length;

    return {
      governmentKey: period.governmentKey,
      governmentLabel: period.governmentLabel,
      startYear: period.startYear,
      endYear: period.endYear,
      totalNumericValue,
      totalFormattedValue: formatBillions(totalNumericValue),
      averageAnnualNumericValue: averageAnnualNumericValueForPeriod,
      averageAnnualFormattedValue: formatBillions(averageAnnualNumericValueForPeriod),
    } satisfies GovernmentTotal;
  }).filter((entry): entry is GovernmentTotal => entry !== null);

  return {
    timestamp: new Date().toISOString(),
    dateValue: latestAnnualInterest.yearLabel,
    source: "Office for National Statistics",
    latestAnnualInterest: {
      year: latestAnnualInterest.yearLabel,
      numericValue: latestAnnualInterest.numericValue,
      formattedValue: latestAnnualInterest.formattedValue,
    },
    peakYear: peakYearItem.yearLabel,
    peakYearAmount: {
      numericValue: peakYearItem.numericValue,
      formattedValue: peakYearItem.formattedValue,
    },
    peakGovernment: {
      governmentKey: peakYearItem.governmentKey,
      governmentLabel: peakYearItem.governmentLabel,
    },
    averageAnnualInterest: {
      numericValue: averageAnnualNumericValue,
      formattedValue: formatBillions(averageAnnualNumericValue),
    },
    latestVsAverage: {
      numericDifference: latestVsAverageNumericDifference,
      formattedDifference: formatDifference(latestVsAverageNumericDifference),
      percentageDifference: latestVsAveragePercentageDifference,
      formattedPercentageDifference: formatPercentage(latestVsAveragePercentageDifference),
    },
    governmentTotals,
  };
}

async function writeJsonFile(path: string, value: unknown) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function main() {
  try {
    const onsData = await fetchOnsData();
    // ONS series NMFX provides monthly public sector debt-interest payments.
    // This section sums each completed calendar year's 12 monthly observations
    // into an annual debt-interest total for a consistent long-run comparison.
    const monthlyObservations = parseMonthlyObservations(onsData);
    const timelineItems = buildTimeline(monthlyObservations);
    const timeline: DebtInterestTimeline = {
      title: "Debt interest over time",
      subtitle: "Annual cost of servicing government debt",
      dateValue: timelineItems[timelineItems.length - 1]!.yearLabel,
      timestamp: new Date().toISOString(),
      source: "Office for National Statistics",
      items: timelineItems,
    };
    const summary = buildSummary(timelineItems);

    await Promise.all([
      writeJsonFile(OUTPUT_PATHS.timeline, timeline),
      writeJsonFile(OUTPUT_PATHS.summary, summary),
    ]);

    console.log("Updated debt-interest timeline data.");
    console.log(`Years processed: ${timeline.items.length}`);
    console.log(
      `Peak: ${summary.peakYear} | ${summary.peakYearAmount.formattedValue} | ${summary.peakGovernment.governmentLabel}`,
    );
    console.log(
      `Latest annual debt interest: ${summary.latestAnnualInterest.year} | ${summary.latestAnnualInterest.formattedValue}`,
    );
    console.log(`Saved: ${OUTPUT_PATHS.timeline}`);
    console.log(`Saved: ${OUTPUT_PATHS.summary}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update debt-interest timeline.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
