import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import * as XLSX from "xlsx";

import { getGovernmentPeriodForYear } from "../src/lib/governmentPeriods.js";

type OnsObservation = {
  date?: string;
  year?: string;
  month?: string;
  value?: string;
};

type OnsResponse = {
  months?: OnsObservation[];
  description?: {
    title?: string;
    unit?: string;
  };
};

type DebtToGdpTimelineItem = {
  yearLabel: string;
  numericValue: number;
  formattedValue: string;
  governmentKey: string;
  governmentLabel: string;
};

type DebtToGdpTimeline = {
  title: string;
  subtitle: string;
  dateValue: string;
  timestamp: string;
  source: string;
  items: DebtToGdpTimelineItem[];
};

type G7CountryEntry = {
  countryCode: string;
  countryLabel: string;
  numericValue: number;
  formattedValue: string;
  rank: number;
};

type G7Comparison = {
  timestamp: string;
  dateValue: string;
  source: string;
  uk: G7CountryEntry;
  g7: G7CountryEntry[];
  ukRankInG7: number;
  g7AverageNumericValue: number;
  g7AverageFormattedValue: string;
  differenceFromG7AverageNumericValue: number;
  differenceFromG7AverageFormattedValue: string;
  highestCountry: G7CountryEntry;
  lowestCountry: G7CountryEntry;
};

type ImfCountryRow = Record<string, string | number>;

type ParsedMonthObservation = {
  date: Date;
  numericValue: number;
};

const ONS_URL =
  "https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/timeseries/hf6x/pusf/data";
const IMF_WEO_URL =
  "https://data.imf.org/-/media/iData/External%20Storage/Documents/5661B7CB2FCC4A56866765D4281AEF01/en/WEOOct2025all";
const IMF_SHEET_NAME = "Countries";
const IMF_INDICATOR = "Gross debt, General government, Percent of GDP";
const MIN_YEAR = 1997;
const OUTPUT_PATHS = {
  timeline: join(process.cwd(), "src", "data", "debtToGdpTimeline.json"),
  comparison: join(process.cwd(), "src", "data", "g7DebtToGdpComparison.json"),
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
const G7_COUNTRIES = [
  { countryCode: "GBR", countryLabel: "United Kingdom" },
  { countryCode: "USA", countryLabel: "United States" },
  { countryCode: "CAN", countryLabel: "Canada" },
  { countryCode: "FRA", countryLabel: "France" },
  { countryCode: "DEU", countryLabel: "Germany" },
  { countryCode: "ITA", countryLabel: "Italy" },
  { countryCode: "JPN", countryLabel: "Japan" },
] as const;

function toNumber(value: string | undefined): number | null {
  if (!value) return null;

  const parsed = Number(value.replace(/,/g, "").trim());
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeOnsDate(rawDate: string | undefined): Date | null {
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

function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

function formatDifference(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}${Math.abs(value).toFixed(1)}pp`;
}

function parsePublicationYear(value: string | number | undefined): number | null {
  if (typeof value === "number" && Number.isInteger(value)) {
    return new Date(value * 24 * 60 * 60 * 1000).getUTCFullYear();
  }

  if (typeof value === "string" && value.trim()) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.getUTCFullYear();
  }

  return null;
}

function getComparisonYear(rows: ImfCountryRow[]): string {
  const publicationYear = parsePublicationYear(rows[0]?.PUBLICATION_DATE);
  if (!publicationYear) {
    throw new Error("Unable to determine IMF publication year.");
  }

  // Use the latest complete publication-year column with values for every G7 country.
  for (let year = publicationYear; year >= MIN_YEAR; year -= 1) {
    const yearKey = String(year);
    const hasAllCountries = rows.every((row) => {
      const value = row[yearKey];
      return typeof value === "number" && Number.isFinite(value);
    });

    if (hasAllCountries) {
      return yearKey;
    }
  }

  throw new Error("Unable to find a complete IMF comparison year for the G7.");
}

function parseOnsAnnualTimeline(data: OnsResponse): DebtToGdpTimelineItem[] {
  const monthlyObservations = (data.months ?? [])
    .map((observation) => ({
      date: normalizeOnsDate(
        observation.date ?? `${observation.year ?? ""} ${observation.month ?? ""}`.trim(),
      ),
      numericValue: toNumber(observation.value),
    }))
    .filter(
      (observation): observation is ParsedMonthObservation =>
        observation.date instanceof Date && observation.numericValue !== null,
    )
    .sort((left, right) => left.date.getTime() - right.date.getTime());

  if (monthlyObservations.length === 0) {
    throw new Error("ONS debt-to-GDP series did not contain valid monthly observations.");
  }

  const currentYear = new Date().getUTCFullYear();
  const latestByCompletedYear = new Map<number, ParsedMonthObservation>();

  for (const observation of monthlyObservations) {
    const year = observation.date.getUTCFullYear();
    if (year < MIN_YEAR || year >= currentYear) {
      continue;
    }
    latestByCompletedYear.set(year, observation);
  }

  const items = [...latestByCompletedYear.entries()]
    .sort(([leftYear], [rightYear]) => leftYear - rightYear)
    .map(([year, observation]) => {
      const government = getGovernmentPeriodForYear(year);
      if (!government) {
        throw new Error(`No government period configured for debt-to-GDP year ${year}.`);
      }

      return {
        yearLabel: String(year),
        numericValue: observation.numericValue,
        formattedValue: formatPercentage(observation.numericValue),
        governmentKey: government.governmentKey,
        governmentLabel: government.governmentLabel,
      } satisfies DebtToGdpTimelineItem;
    });

  if (items.length < 10) {
    throw new Error(`Expected at least 10 annual debt-to-GDP points, found ${items.length}.`);
  }

  return items;
}

function parseImfComparison(rows: ImfCountryRow[]): G7Comparison {
  const comparisonYear = getComparisonYear(rows);

  const countries: G7CountryEntry[] = G7_COUNTRIES.map((configured) => {
    const row = rows.find((entry) => entry["COUNTRY.ID"] === configured.countryCode);
    if (!row) {
      throw new Error(`Missing IMF G7 row for ${configured.countryLabel}.`);
    }

    const value = row[comparisonYear];
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new Error(
        `Missing IMF debt-to-GDP value for ${configured.countryLabel} in ${comparisonYear}.`,
      );
    }

    return {
      countryCode: configured.countryCode,
      countryLabel: configured.countryLabel,
      numericValue: value,
      formattedValue: formatPercentage(value),
      rank: 0,
    };
  })
    .sort((left, right) => right.numericValue - left.numericValue)
    .map((country, index) => ({
      ...country,
      rank: index + 1,
    }));

  if (countries.length !== G7_COUNTRIES.length) {
    throw new Error(`Expected ${G7_COUNTRIES.length} G7 countries but found ${countries.length}.`);
  }

  const uk = countries.find((country) => country.countryCode === "GBR");
  if (!uk) {
    throw new Error("Unable to find United Kingdom in IMF G7 comparison.");
  }

  const g7AverageNumericValue =
    countries.reduce((sum, country) => sum + country.numericValue, 0) / countries.length;
  const highestCountry = countries[0]!;
  const lowestCountry = countries[countries.length - 1]!;
  const differenceFromG7AverageNumericValue = uk.numericValue - g7AverageNumericValue;

  return {
    timestamp: new Date().toISOString(),
    dateValue: comparisonYear,
    source: "IMF World Economic Outlook Database, October 2025",
    uk,
    g7: countries,
    ukRankInG7: uk.rank,
    g7AverageNumericValue,
    g7AverageFormattedValue: formatPercentage(g7AverageNumericValue),
    differenceFromG7AverageNumericValue,
    differenceFromG7AverageFormattedValue: formatDifference(
      differenceFromG7AverageNumericValue,
    ),
    highestCountry,
    lowestCountry,
  };
}

async function writeJsonFile(path: string, value: unknown) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function main() {
  try {
    const [onsResponse, imfResponse] = await Promise.all([
      fetch(ONS_URL, { headers: { Accept: "application/json" } }),
      fetch(IMF_WEO_URL),
    ]);

    if (!onsResponse.ok) {
      throw new Error(`ONS debt-to-GDP request failed with status ${onsResponse.status}.`);
    }

    if (!imfResponse.ok) {
      throw new Error(`IMF WEO request failed with status ${imfResponse.status}.`);
    }

    const onsData = (await onsResponse.json()) as OnsResponse;
    const timelineItems = parseOnsAnnualTimeline(onsData);
    const timeline: DebtToGdpTimeline = {
      title: "Debt vs GDP",
      subtitle: "UK debt burden over time",
      dateValue: timelineItems[timelineItems.length - 1]!.yearLabel,
      timestamp: new Date().toISOString(),
      source: "Office for National Statistics",
      items: timelineItems,
    };

    const workbookBuffer = Buffer.from(await imfResponse.arrayBuffer());
    const workbook = XLSX.read(workbookBuffer, { type: "buffer" });
    const countryRows = XLSX.utils.sheet_to_json<ImfCountryRow>(
      workbook.Sheets[IMF_SHEET_NAME]!,
      { defval: "" },
    ).filter(
      (row) => row.INDICATOR === IMF_INDICATOR &&
        G7_COUNTRIES.some((country) => country.countryCode === row["COUNTRY.ID"]),
    );

    if (countryRows.length !== G7_COUNTRIES.length) {
      throw new Error("IMF workbook did not contain the full G7 debt-to-GDP comparison set.");
    }

    // IMF WEO Countries sheet:
    // - INDICATOR = "Gross debt, General government, Percent of GDP"
    // - comparison year = latest complete publication-year column across the G7
    const comparison = parseImfComparison(countryRows);

    await Promise.all([
      writeJsonFile(OUTPUT_PATHS.timeline, timeline),
      writeJsonFile(OUTPUT_PATHS.comparison, comparison),
    ]);

    console.log("Updated debt-to-GDP section data.");
    console.log(`UK years processed: ${timeline.items.length}`);
    console.log(`UK current debt-to-GDP: ${comparison.uk.formattedValue}`);
    console.log(`UK G7 rank: ${comparison.ukRankInG7}`);
    console.log(`G7 average: ${comparison.g7AverageFormattedValue}`);
    console.log(`Saved: ${OUTPUT_PATHS.timeline}`);
    console.log(`Saved: ${OUTPUT_PATHS.comparison}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update debt-to-GDP section.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
