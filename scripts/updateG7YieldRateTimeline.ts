import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import { buildG7YieldRateTimeline } from "../src/lib/g7YieldRateTimeline.js";

const OECD_KEY =
  "GBR+USA+CAN+FRA+DEU+ITA+JPN.M.IRLT.PA._Z._Z._Z._Z.N";
const OECD_URL =
  `https://sdmx.oecd.org/public/rest/data/OECD.SDD.STES,DSD_STES@DF_FINMARK,4.0/${OECD_KEY}`;
const BOE_BANK_RATE_SERIES_CODE = "IUMABEDR";
const MIN_YEAR = 1990;
const OUTPUT_PATH = join(process.cwd(), "src", "data", "g7YieldRateTimeline.json");

type ParsedOecdSeries = {
  countryCode: string;
  observations: Array<{
    period: string;
    value: number;
    status: string | null;
  }>;
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

function isMonthlyPeriod(value: string): boolean {
  return /^\d{4}-\d{2}$/.test(value);
}

function parseOecdXmlSeries(xml: string): ParsedOecdSeries[] {
  const seriesMatches = [...xml.matchAll(/<generic:Series>([\s\S]*?)<\/generic:Series>/g)];

  return seriesMatches.map((seriesMatch) => {
    const seriesXml = seriesMatch[1] ?? "";
    const countryCodeMatch = /<generic:Value id="REF_AREA" value="([^"]+)"/.exec(seriesXml);
    if (!countryCodeMatch) {
      throw new Error("Missing OECD REF_AREA in G7 yield timeline series.");
    }

    const observations = [...seriesXml.matchAll(
      /<generic:Obs>[\s\S]*?<generic:ObsDimension id="TIME_PERIOD" value="([^"]+)" \/>[\s\S]*?<generic:ObsValue value="([^"]+)"[\s\S]*?(?:<generic:Value id="OBS_STATUS" value="([^"]+)" \/>|<\/generic:Obs>)/g,
    )].map((match) => ({
      period: match[1]!,
      value: Number(match[2]!),
      status: match[3] ?? null,
    }));

    return {
      countryCode: countryCodeMatch[1]!,
      observations: observations.filter(
        (item) => Number.isFinite(item.value) && isMonthlyPeriod(item.period),
      ),
    };
  });
}

function mergeCountrySeries(series: ParsedOecdSeries[]): ParsedOecdSeries[] {
  const grouped = new Map<string, ParsedOecdSeries[]>();

  for (const item of series) {
    grouped.set(item.countryCode, [...(grouped.get(item.countryCode) ?? []), item]);
  }

  return [...grouped.entries()].map(([countryCode, options]) => {
    const mergedByPeriod = new Map<string, number>();

    for (const option of options) {
      for (const observation of option.observations) {
        if (observation.status === "B") {
          continue;
        }

        if (!isMonthlyPeriod(observation.period)) {
          continue;
        }

        mergedByPeriod.set(observation.period, observation.value);
      }
    }

    const observations = [...mergedByPeriod.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([period, value]) => ({
        period,
        value,
        status: null,
      }));

    if (observations.length === 0) {
      throw new Error(`Missing usable OECD monthly yield history for ${countryCode}.`);
    }

    return { countryCode, observations };
  });
}

function buildUkAndG7AverageSeries(series: ParsedOecdSeries[]): {
  uk10yByPeriod: Map<string, number>;
  g7AverageByPeriod: Map<string, number>;
} {
  const byCountry = new Map(series.map((item) => [item.countryCode, item]));
  const ukSeries = byCountry.get("GBR");
  if (!ukSeries) {
    throw new Error("Missing OECD UK monthly long-term yield series.");
  }

  const periods = [...ukSeries.observations]
    .map((item) => item.period)
    .filter((period) => Number(period.slice(0, 4)) >= MIN_YEAR)
    .sort((left, right) => left.localeCompare(right));

  const uk10yByPeriod = new Map<string, number>();
  const g7AverageByPeriod = new Map<string, number>();

  for (const period of periods) {
    const values = series
      .map(
        (countrySeries) =>
          countrySeries.observations.find((item) => item.period === period)?.value ?? null,
      )
      .filter((value): value is number => value !== null);

    if (values.length !== 7) {
      continue;
    }

    const ukValue = ukSeries.observations.find((item) => item.period === period)?.value;
    if (ukValue === undefined) {
      continue;
    }

    uk10yByPeriod.set(period, ukValue);
    g7AverageByPeriod.set(
      period,
      values.reduce((sum, value) => sum + value, 0) / values.length,
    );
  }

  return { uk10yByPeriod, g7AverageByPeriod };
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

function getBoEHtmlUrl(seriesCode: string): string {
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

function buildMonthlyBankRateSeries(html: string): Map<string, number> {
  const rows = [...html.matchAll(/<tr>\s*<td[^>]*nowrap>([^<]+)<\/td><td[^>]*>\s*([^<]+?)\s*<\/td>\s*<\/tr>/gi)];
  const valuesByPeriod = new Map<string, number>();

  for (const match of rows) {
    const date = parseBoEDate(decodeHtml(match[1]));
    const value = Number(decodeHtml(match[2]));

    if (!(date instanceof Date) || Number.isNaN(date.getTime()) || !Number.isFinite(value)) {
      continue;
    }

    const year = date.getUTCFullYear();
    if (year < MIN_YEAR) {
      continue;
    }

    const period = `${year}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    valuesByPeriod.set(period, value);
  }

  return new Map([...valuesByPeriod.entries()].sort(([left], [right]) => left.localeCompare(right)));
}

async function main() {
  try {
    const [oecdResponse, boeResponse] = await Promise.all([
      fetch(OECD_URL),
      fetch(getBoEHtmlUrl(BOE_BANK_RATE_SERIES_CODE), {
        headers: { Accept: "text/html,application/xhtml+xml" },
      }),
    ]);

    if (!oecdResponse.ok) {
      throw new Error(`OECD yield timeline request failed with status ${oecdResponse.status}.`);
    }

    if (!boeResponse.ok) {
      throw new Error(`Bank of England Bank Rate request failed with status ${boeResponse.status}.`);
    }

    const parsedOecdSeries = mergeCountrySeries(parseOecdXmlSeries(await oecdResponse.text()));
    if (parsedOecdSeries.length !== 7) {
      throw new Error(`Expected 7 OECD G7 monthly series but found ${parsedOecdSeries.length}.`);
    }

    const { uk10yByPeriod, g7AverageByPeriod } = buildUkAndG7AverageSeries(parsedOecdSeries);
    const bankRateByPeriod = buildMonthlyBankRateSeries(await boeResponse.text());

    // The latest plotted period is the latest common month across:
    // - the merged OECD monthly UK 10-year history
    // - the merged OECD monthly G7 average history
    // - the monthly BoE Bank Rate series
    // This avoids mixing months across countries or frequencies across series.
    const timeline = buildG7YieldRateTimeline({
      timestamp: new Date().toISOString(),
      source: "OECD long-term interest rates / Bank of England",
      uk10yByPeriod,
      g7AverageByPeriod,
      bankRateByPeriod,
    });

    if (timeline.dateValue <= "2021-12") {
      throw new Error(
        `Expected the refreshed yield-rate timeline to extend beyond 2021, found ${timeline.dateValue}.`,
      );
    }

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, `${JSON.stringify(timeline, null, 2)}\n`, "utf8");

    console.log("Updated G7 yield-rate timeline.");
    console.log(`Months: ${timeline.items.length}`);
    console.log(`Latest period: ${timeline.dateValue}`);
    console.log(`Saved: ${OUTPUT_PATH}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update G7 yield-rate timeline.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
