import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

type GiltYieldMetric = {
  numericValue: number;
  formattedValue: string;
  timestamp: string;
  dateValue: string;
  source: string;
};

type GiltYieldTimeline = {
  title: string;
  unit: "percent";
  xKey: "date";
  dateValue: string;
  timestamp: string;
  source: string;
  items: Array<{
    dateLabel: string;
    fiveYearGiltYieldPct: number;
    tenYearGiltYieldPct: number;
    twentyYearGiltYieldPct: number;
  }>;
};

type SeriesDefinition = {
  label: string;
  seriesCode: string;
  outputPath: string;
  outputKey: "fiveYearGiltYieldPct" | "tenYearGiltYieldPct" | "twentyYearGiltYieldPct";
};

const MIN_YEAR = 1990;
const TIMELINE_OUTPUT_PATH = join(process.cwd(), "src", "data", "giltYieldTimeline.json");

const SERIES_DEFINITIONS: SeriesDefinition[] = [
  {
    label: "5-year nominal par yield",
    seriesCode: "IUDSNPY",
    outputPath: join(process.cwd(), "src", "data", "fiveYearGiltYieldMetric.json"),
    outputKey: "fiveYearGiltYieldPct",
  },
  {
    label: "10-year nominal par yield",
    seriesCode: "IUDMNPY",
    outputPath: join(process.cwd(), "src", "data", "tenYearGiltYieldMetric.json"),
    outputKey: "tenYearGiltYieldPct",
  },
  {
    label: "20-year nominal par yield",
    seriesCode: "IUDLNPY",
    outputPath: join(process.cwd(), "src", "data", "twentyYearGiltYieldMetric.json"),
    outputKey: "twentyYearGiltYieldPct",
  },
];

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

function decodeHtml(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .trim();
}

function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
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

function parseBoEDate(value: string): Date | null {
  const match = /^(\d{2})\s([A-Za-z]{3})\s(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = MONTH_MAP[match[2].toLowerCase()];
  const twoDigitYear = Number(match[3]);
  const year = twoDigitYear >= 90 ? 1900 + twoDigitYear : 2000 + twoDigitYear;

  if (month === undefined) {
    return null;
  }

  return new Date(Date.UTC(year, month, day));
}

function parseBoEHtml(html: string): Array<{ date: Date; value: number }> {
  const rows = [...html.matchAll(/<tr>\s*<td[^>]*nowrap>([^<]+)<\/td><td[^>]*>\s*([^<]+?)\s*<\/td>\s*<\/tr>/gi)];

  return rows
    .map((match) => {
      const rawDate = decodeHtml(match[1]);
      const rawValue = decodeHtml(match[2]);
      const date = parseBoEDate(rawDate);
      const value = Number(rawValue);

      if (!(date instanceof Date) || Number.isNaN(date.getTime()) || !Number.isFinite(value)) {
        return null;
      }

      return { date, value };
    })
    .filter((row): row is { date: Date; value: number } => row !== null)
    .sort((left, right) => left.date.getTime() - right.date.getTime());
}

function buildMonthlySeries(observations: Array<{ date: Date; value: number }>): Map<string, number> {
  const latestByMonth = new Map<string, number>();

  for (const observation of observations) {
    const year = observation.date.getUTCFullYear();
    if (year < MIN_YEAR) {
      continue;
    }

    const period = `${year}-${String(observation.date.getUTCMonth() + 1).padStart(2, "0")}`;
    latestByMonth.set(period, observation.value);
  }

  return new Map([...latestByMonth.entries()].sort(([left], [right]) => left.localeCompare(right)));
}

async function fetchSeriesObservations(series: SeriesDefinition) {
  const response = await fetch(getBoEYieldUrl(series.seriesCode), {
    headers: {
      Accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Bank of England request failed for ${series.seriesCode} with status ${response.status}.`,
    );
  }

  const html = await response.text();
  const observations = parseBoEHtml(html);

  if (observations.length === 0) {
    throw new Error(`Bank of England response did not contain any observations for ${series.seriesCode}.`);
  }

  return observations;
}

async function writeJson(outputPath: string, value: unknown) {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function main() {
  try {
    const timestamp = new Date().toISOString();
    const seriesResults = await Promise.all(
      SERIES_DEFINITIONS.map(async (series) => ({
        series,
        observations: await fetchSeriesObservations(series),
      })),
    );

    const monthlySeriesEntries = seriesResults.map(({ series, observations }) => ({
      series,
      monthlySeries: buildMonthlySeries(observations),
      latestObservation: observations[observations.length - 1]!,
    }));

    for (const entry of monthlySeriesEntries) {
      const roundedValue = Number(entry.latestObservation.value.toFixed(1));

      const metric: GiltYieldMetric = {
        numericValue: roundedValue,
        formattedValue: formatPercentage(roundedValue),
        timestamp,
        dateValue: formatMonthYear(entry.latestObservation.date),
        source: "Bank of England",
      };

      await writeJson(entry.series.outputPath, metric);
    }

    const commonPeriods = [...monthlySeriesEntries[0]!.monthlySeries.keys()].filter((period) =>
      monthlySeriesEntries.every((entry) => entry.monthlySeries.has(period)),
    );

    if (commonPeriods.length === 0) {
      throw new Error("Could not build a common monthly gilt-yield history.");
    }

    const timeline: GiltYieldTimeline = {
      title: "UK gilt yield curve",
      unit: "percent",
      xKey: "date",
      dateValue: commonPeriods[commonPeriods.length - 1]!,
      timestamp,
      source: "Bank of England",
      items: commonPeriods.map((period) => ({
        dateLabel: period,
        fiveYearGiltYieldPct: Number(
          monthlySeriesEntries.find((entry) => entry.series.outputKey === "fiveYearGiltYieldPct")!
            .monthlySeries.get(period)!
            .toFixed(1),
        ),
        tenYearGiltYieldPct: Number(
          monthlySeriesEntries.find((entry) => entry.series.outputKey === "tenYearGiltYieldPct")!
            .monthlySeries.get(period)!
            .toFixed(1),
        ),
        twentyYearGiltYieldPct: Number(
          monthlySeriesEntries.find((entry) => entry.series.outputKey === "twentyYearGiltYieldPct")!
            .monthlySeries.get(period)!
            .toFixed(1),
        ),
      })),
    };

    await writeJson(TIMELINE_OUTPUT_PATH, timeline);

    for (const entry of monthlySeriesEntries) {
      console.log(`Updated ${entry.series.label}`);
      console.log(`Series: ${entry.series.seriesCode}`);
      console.log(`Formatted: ${formatPercentage(Number(entry.latestObservation.value.toFixed(1)))}`);
      console.log(`Saved to ${entry.series.outputPath}`);
    }

    console.log(`Saved monthly gilt-yield timeline to ${TIMELINE_OUTPUT_PATH}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update gilt yield metrics.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
