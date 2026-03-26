import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import * as XLSX from "xlsx";

import { buildDebtSustainabilityTimeline } from "../src/lib/debtSustainabilityTimeline.js";

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

type ImfCountryRow = Record<string, string | number>;

const IMF_WEO_URL =
  "https://data.imf.org/-/media/iData/External%20Storage/Documents/5661B7CB2FCC4A56866765D4281AEF01/en/WEOOct2025all";
const IMF_SHEET_NAME = "Countries";
const IMF_NOMINAL_GDP_INDICATOR = "Gross domestic product (GDP), Current prices, Domestic currency";
const UK_COUNTRY_CODE = "GBR";
const BOE_TEN_YEAR_SERIES_CODE = "IUDMNPY";
const ONS_DEBT_TO_GDP_URL =
  "https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/timeseries/hf6x/pusf/data";
const OUTPUT_PATH = join(process.cwd(), "src", "data", "debtSustainabilityTimeline.json");
const MIN_YEAR = 1997;
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

function toNumber(value: string | number | undefined): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

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

function decodeHtml(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .trim();
}

function parseBoEDate(value: string): Date | null {
  const match = /^(\d{2})\s([A-Za-z]{3})\s(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }

  const month = MONTH_MAP[match[2].toLowerCase()];
  if (month === undefined) {
    return null;
  }

  const twoDigitYear = Number(match[3]);
  const fullYear = twoDigitYear >= 90 ? 1900 + twoDigitYear : 2000 + twoDigitYear;

  return new Date(Date.UTC(fullYear, month, Number(match[1])));
}

function parseBoEHtml(html: string): Array<{ date: Date; value: number }> {
  const rows = [...html.matchAll(/<tr>\s*<td[^>]*nowrap>([^<]+)<\/td><td[^>]*>\s*([^<]+?)\s*<\/td>\s*<\/tr>/gi)];

  return rows
    .map((match) => {
      const date = parseBoEDate(decodeHtml(match[1]));
      const value = Number(decodeHtml(match[2]));

      if (!(date instanceof Date) || Number.isNaN(date.getTime()) || !Number.isFinite(value)) {
        return null;
      }

      return { date, value };
    })
    .filter((row): row is { date: Date; value: number } => row !== null)
    .sort((left, right) => left.date.getTime() - right.date.getTime());
}

function getBoEYieldUrl(seriesCode: string): string {
  const params = new URLSearchParams({
    "html.x": "yes",
    Datefrom: `01/Jan/${MIN_YEAR}`,
    Dateto: "now",
    SeriesCodes: seriesCode,
    UsingCodes: "Y",
    VPD: "Y",
  });

  return `https://www.bankofengland.co.uk/boeapps/database/_iadb-fromshowcolumns.asp?${params.toString()}`;
}

function buildAnnualBorrowingCostSeries(observations: Array<{ date: Date; value: number }>): Map<number, number> {
  const totalsByYear = new Map<number, { sum: number; count: number }>();
  const currentYear = new Date().getUTCFullYear();

  for (const observation of observations) {
    const year = observation.date.getUTCFullYear();
    if (year < MIN_YEAR || year >= currentYear) {
      continue;
    }

    const current = totalsByYear.get(year) ?? { sum: 0, count: 0 };
    current.sum += observation.value;
    current.count += 1;
    totalsByYear.set(year, current);
  }

  return new Map(
    [...totalsByYear.entries()].map(([year, totals]) => [year, totals.sum / totals.count]),
  );
}

function buildOnsDebtToGdpSeries(data: OnsResponse): Map<number, number> {
  const monthlyObservations = (data.months ?? [])
    .map((observation) => ({
      date: normalizeOnsDate(
        observation.date ?? `${observation.year ?? ""} ${observation.month ?? ""}`.trim(),
      ),
      numericValue: toNumber(observation.value),
    }))
    .filter(
      (observation): observation is { date: Date; numericValue: number } =>
        observation.date instanceof Date && observation.numericValue !== null,
    )
    .sort((left, right) => left.date.getTime() - right.date.getTime());

  if (monthlyObservations.length === 0) {
    throw new Error("ONS debt-to-GDP series did not contain valid monthly observations.");
  }

  const currentYear = new Date().getUTCFullYear();
  const latestByCompletedYear = new Map<number, number>();

  for (const observation of monthlyObservations) {
    const year = observation.date.getUTCFullYear();
    if (year < MIN_YEAR || year >= currentYear) {
      continue;
    }
    latestByCompletedYear.set(year, observation.numericValue);
  }

  if (latestByCompletedYear.size < 10) {
    throw new Error(
      `Expected at least 10 annual debt-to-GDP observations, found ${latestByCompletedYear.size}.`,
    );
  }

  return latestByCompletedYear;
}

function buildImfAnnualSeries(rows: ImfCountryRow[], indicator: string): Map<number, number> {
  const row = rows.find(
    (entry) => entry["COUNTRY.ID"] === UK_COUNTRY_CODE && entry.INDICATOR === indicator,
  );

  if (!row) {
    throw new Error(`Missing IMF row for indicator: ${indicator}`);
  }

  const series = new Map<number, number>();
  for (let year = MIN_YEAR; year <= new Date().getUTCFullYear(); year += 1) {
    const value = toNumber(row[String(year)]);
    if (value !== null) {
      series.set(year, value);
    }
  }

  return series;
}

function buildImfAnnualSeriesFromCandidates(
  rows: ImfCountryRow[],
  indicators: string[],
): Map<number, number> {
  for (const indicator of indicators) {
    const matchingRow = rows.find(
      (entry) => entry["COUNTRY.ID"] === UK_COUNTRY_CODE && entry.INDICATOR === indicator,
    );

    if (!matchingRow) {
      continue;
    }

    const series = new Map<number, number>();
    for (let year = MIN_YEAR; year <= new Date().getUTCFullYear(); year += 1) {
      const value = toNumber(matchingRow[String(year)]);
      if (value !== null) {
        series.set(year, value);
      }
    }

    if (series.size > 0) {
      return series;
    }
  }

  throw new Error(
    `Missing IMF row for indicators: ${indicators.join(" | ")}`,
  );
}

function buildGrowthRateSeriesFromLevels(levelsByYear: Map<number, number>): Map<number, number> {
  const growthByYear = new Map<number, number>();
  const years = [...levelsByYear.keys()].sort((left, right) => left - right);

  for (let index = 1; index < years.length; index += 1) {
    const year = years[index]!;
    const previousYear = years[index - 1]!;
    const currentValue = levelsByYear.get(year)!;
    const previousValue = levelsByYear.get(previousYear)!;

    if (previousValue <= 0) {
      continue;
    }

    growthByYear.set(year, ((currentValue - previousValue) / previousValue) * 100);
  }

  return growthByYear;
}

function buildImfRealGdpGrowthSeries(rows: ImfCountryRow[]): Map<number, number> {
  const directGrowth = buildImfAnnualSeriesFromCandidates(rows, [
    "Gross domestic product (GDP), Constant prices, Percent change",
  ]);

  if (directGrowth.size > 0) {
    return directGrowth;
  }

  const levels = buildImfAnnualSeriesFromCandidates(rows, [
    "Gross domestic product (GDP), Constant prices, Domestic currency",
  ]);

  return buildGrowthRateSeriesFromLevels(levels);
}

async function writeJsonFile(path: string, value: unknown) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function main() {
  try {
    const [imfResponse, onsDebtToGdpResponse, boeResponse] = await Promise.all([
      fetch(IMF_WEO_URL),
      fetch(ONS_DEBT_TO_GDP_URL, { headers: { Accept: "application/json" } }),
      fetch(getBoEYieldUrl(BOE_TEN_YEAR_SERIES_CODE), {
        headers: { Accept: "text/html,application/xhtml+xml" },
      }),
    ]);

    if (!imfResponse.ok) {
      throw new Error(`IMF WEO request failed with status ${imfResponse.status}.`);
    }

    if (!onsDebtToGdpResponse.ok) {
      throw new Error(
        `ONS debt-to-GDP request failed with status ${onsDebtToGdpResponse.status}.`,
      );
    }

    if (!boeResponse.ok) {
      throw new Error(`Bank of England request failed with status ${boeResponse.status}.`);
    }

    const workbookBuffer = Buffer.from(await imfResponse.arrayBuffer());
    const workbook = XLSX.read(workbookBuffer, { type: "buffer" });
    const countryRows = XLSX.utils.sheet_to_json<ImfCountryRow>(
      workbook.Sheets[IMF_SHEET_NAME]!,
      { defval: "" },
    );

    // Alignment choices:
    // - debt_to_gdp_pct uses the same ONS HF6X public sector net debt ratio used elsewhere
    //   on the site, taking the latest observation in each completed calendar year
    // - nominal_gdp_growth_pct is derived from IMF annual current-price GDP levels
    // - real_gdp_growth_pct uses the direct IMF real GDP growth series at constant prices
    // - borrowing_cost_pct is the annual average of daily BoE 10-year nominal par yields
    const debtToGdpByYear = buildOnsDebtToGdpSeries(
      (await onsDebtToGdpResponse.json()) as OnsResponse,
    );
    const nominalGdpByYear = buildImfAnnualSeries(countryRows, IMF_NOMINAL_GDP_INDICATOR);
    const realGdpGrowthByYear = buildImfRealGdpGrowthSeries(countryRows);
    const borrowingCostByYear = buildAnnualBorrowingCostSeries(
      parseBoEHtml(await boeResponse.text()),
    );

    const timestamp = new Date().toISOString();
    const timeline = buildDebtSustainabilityTimeline({
      debtToGdpByYear,
      nominalGdpByYear,
      realGdpGrowthByYear,
      borrowingCostByYear,
      timestamp,
      source: "Office for National Statistics / IMF World Economic Outlook / Bank of England",
    });

    await writeJsonFile(OUTPUT_PATH, timeline);

    console.log("Updated debt sustainability timeline.");
    console.log(`Years processed: ${timeline.items.length}`);
    console.log(`Latest year: ${timeline.dateValue}`);
    console.log(`Saved: ${OUTPUT_PATH}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update debt sustainability timeline.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
