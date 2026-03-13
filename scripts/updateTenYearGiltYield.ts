import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

type TenYearGiltYieldMetric = {
  numericValue: number;
  formattedValue: string;
  timestamp: string;
  dateValue: string;
  source: string;
};

const OUTPUT_PATH = join(
  process.cwd(),
  "src",
  "data",
  "tenYearGiltYieldMetric.json",
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

function getBoETenYearGiltUrl(): string {
  const currentYear = new Date().getUTCFullYear();
  const fromYear = currentYear - 1;
  const params = new URLSearchParams({
    "html.x": "yes",
    Datefrom: `01/Jan/${fromYear}`,
    Dateto: "now",
    SeriesCodes: "IUDMNPY",
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
  const year = 2000 + Number(match[3]);

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
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

async function main() {
  try {
    // Bank of England database series IUDMNPY = "Yield from British Government Securities, 10 year Nominal Par Yield".
    const response = await fetch(getBoETenYearGiltUrl(), {
      headers: {
        Accept: "text/html,application/xhtml+xml",
      },
    });

    if (!response.ok) {
      throw new Error(`Bank of England request failed with status ${response.status}.`);
    }

    const html = await response.text();
    const observations = parseBoEHtml(html);

    if (observations.length === 0) {
      throw new Error("Bank of England response did not contain any 10-year gilt yield observations.");
    }

    const latestObservation = observations[observations.length - 1];
    const roundedValue = Number(latestObservation.value.toFixed(1));

    const metric: TenYearGiltYieldMetric = {
      numericValue: roundedValue,
      formattedValue: formatPercentage(roundedValue),
      timestamp: new Date().toISOString(),
      dateValue: formatMonthYear(latestObservation.date),
      source: "Bank of England",
    };

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, `${JSON.stringify(metric, null, 2)}\n`, "utf8");

    console.log("Updated 10-year gilt yield metric");
    console.log(`Raw value: ${latestObservation.value}`);
    console.log(`Formatted: ${metric.formattedValue}`);
    console.log("Saved to src/data/tenYearGiltYieldMetric.json");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update 10-year gilt yield metric.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
