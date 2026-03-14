import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import {
  GOVERNMENT_PERIODS,
  getGovernmentPeriodForYear,
} from "../src/lib/governmentPeriods.js";

type OnsObservation = {
  date?: string;
  year?: string;
  value?: string;
};

type OnsResponse = {
  years?: OnsObservation[];
  description?: {
    title?: string;
    unit?: string;
  };
};

type AnnualBorrowingTimelineItem = {
  yearLabel: string;
  numericValue: number;
  formattedValue: string;
  governmentKey: string;
  governmentLabel: string;
};

type AnnualBorrowingTimeline = {
  title: string;
  subtitle: string;
  dateValue: string;
  timestamp: string;
  source: string;
  items: AnnualBorrowingTimelineItem[];
};

type BorrowingGovernmentSummaryEntry = {
  governmentKey: string;
  governmentLabel: string;
  startYear: number;
  endYear: number | null;
  totalBorrowingNumericValue: number;
  totalBorrowingFormattedValue: string;
  peakYear: string;
  peakYearBorrowingNumericValue: number;
  peakYearBorrowingFormattedValue: string;
};

type BorrowingByGovernmentSummary = {
  timestamp: string;
  source: string;
  governments: BorrowingGovernmentSummaryEntry[];
  overallPeak: {
    year: string;
    governmentKey: string;
    governmentLabel: string;
    numericValue: number;
    formattedValue: string;
  };
};

const ONS_URL =
  "https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/timeseries/dzls/pusf/data";
const MIN_YEAR = 1997;
const OUTPUT_PATHS = {
  timeline: join(process.cwd(), "src", "data", "annualBorrowingTimeline.json"),
  summary: join(process.cwd(), "src", "data", "borrowingByGovernmentSummary.json"),
};

function toNumber(value: string | undefined): number | null {
  if (!value) return null;

  const parsed = Number(value.replace(/,/g, "").trim());
  return Number.isFinite(parsed) ? parsed : null;
}

function toPounds(value: number, unit: string | undefined): number {
  const normalizedUnit = (unit ?? "").toLowerCase();
  if (normalizedUnit.includes("million")) return Math.round(value * 1_000_000);
  if (normalizedUnit.includes("billion")) return Math.round(value * 1_000_000_000);
  return Math.round(value);
}

function formatBorrowingCompact(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  const billions = abs / 1_000_000_000;
  const fractionDigits = Number.isInteger(billions) || billions >= 100 ? 0 : 1;

  return `${sign}\u00A3${billions.toFixed(fractionDigits)}B`;
}

function parseYearLabel(observation: OnsObservation): string | null {
  if (observation.year?.trim()) {
    return observation.year.trim();
  }

  if (observation.date?.trim()) {
    const match = /^(\d{4})/.exec(observation.date.trim());
    if (match) {
      return match[1];
    }
  }

  return null;
}

async function writeJsonFile(path: string, value: unknown) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
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
    const yearObservations = data.years ?? [];

    if (yearObservations.length === 0) {
      throw new Error("ONS response did not include an annual series.");
    }

    // ONS series DZLS provides annual public sector net borrowing excluding public sector
    // banks, in GBP millions, within the Public sector finances time series (PUSF) dataset.
    const timelineItems = yearObservations
      .map((observation) => {
        const yearLabel = parseYearLabel(observation);
        const numericYear = yearLabel ? Number(yearLabel) : Number.NaN;
        const numericValue = toNumber(observation.value);
        if (!yearLabel || !Number.isInteger(numericYear) || numericValue === null) {
          return null;
        }

        if (numericYear < MIN_YEAR) {
          return null;
        }

        const government = getGovernmentPeriodForYear(numericYear);
        if (!government) {
          throw new Error(`No government period configured for year ${numericYear}.`);
        }

        const valueInPounds = toPounds(numericValue, data.description?.unit);

        return {
          yearLabel,
          numericValue: valueInPounds,
          formattedValue: formatBorrowingCompact(valueInPounds),
          governmentKey: government.governmentKey,
          governmentLabel: government.governmentLabel,
        } satisfies AnnualBorrowingTimelineItem;
      })
      .filter((item): item is AnnualBorrowingTimelineItem => item !== null)
      .sort((left, right) => Number(left.yearLabel) - Number(right.yearLabel));

    if (timelineItems.length < 10) {
      throw new Error(
        `Expected at least 10 annual borrowing observations, found ${timelineItems.length}.`,
      );
    }

    const latestYear = timelineItems[timelineItems.length - 1]?.yearLabel;
    if (!latestYear) {
      throw new Error("Unable to determine latest borrowing year.");
    }

    const overallPeak = timelineItems.reduce((peak, item) =>
      item.numericValue > peak.numericValue ? item : peak,
    );

    const governments = GOVERNMENT_PERIODS.map((period) => {
      const items = timelineItems.filter((item) => item.governmentKey === period.governmentKey);
      if (items.length === 0) {
        return null;
      }

      const totalBorrowingNumericValue = items.reduce(
        (sum, item) => sum + item.numericValue,
        0,
      );
      const peakYearItem = items.reduce((peak, item) =>
        item.numericValue > peak.numericValue ? item : peak,
      );

      return {
        governmentKey: period.governmentKey,
        governmentLabel: period.governmentLabel,
        startYear: period.startYear,
        endYear: period.endYear,
        totalBorrowingNumericValue,
        totalBorrowingFormattedValue: formatBorrowingCompact(totalBorrowingNumericValue),
        peakYear: peakYearItem.yearLabel,
        peakYearBorrowingNumericValue: peakYearItem.numericValue,
        peakYearBorrowingFormattedValue: peakYearItem.formattedValue,
      } satisfies BorrowingGovernmentSummaryEntry;
    }).filter((item): item is BorrowingGovernmentSummaryEntry => item !== null);

    if (governments.length === 0) {
      throw new Error("No government borrowing summaries could be produced.");
    }

    const timestamp = new Date().toISOString();
    const timeline: AnnualBorrowingTimeline = {
      title: "Borrowing over time",
      subtitle: "Annual UK borrowing with government periods",
      dateValue: latestYear,
      timestamp,
      source: "Office for National Statistics",
      items: timelineItems,
    };

    const summary: BorrowingByGovernmentSummary = {
      timestamp,
      source: "Office for National Statistics",
      governments,
      overallPeak: {
        year: overallPeak.yearLabel,
        governmentKey: overallPeak.governmentKey,
        governmentLabel: overallPeak.governmentLabel,
        numericValue: overallPeak.numericValue,
        formattedValue: overallPeak.formattedValue,
      },
    };

    await Promise.all([
      writeJsonFile(OUTPUT_PATHS.timeline, timeline),
      writeJsonFile(OUTPUT_PATHS.summary, summary),
    ]);

    console.log("Updated annual borrowing timeline from ONS.");
    console.log(`Years processed: ${timeline.items.length}`);
    console.log(`Governments summarised: ${summary.governments.length}`);
    console.log(
      `Overall peak: ${summary.overallPeak.year} | ${summary.overallPeak.formattedValue} | ${summary.overallPeak.governmentLabel}`,
    );
    console.log(`Saved: ${OUTPUT_PATHS.timeline}`);
    console.log(`Saved: ${OUTPUT_PATHS.summary}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update annual borrowing timeline.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
