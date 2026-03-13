import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

type LendingObservation = {
  date: Date;
  valueMillionPounds: number;
};

type AnnualLendingMetric = {
  numericValue: number;
  formattedValue: string;
  currencySymbol: string;
  timestamp: string;
  dateValue: string;
};

// Bank of England IADB series code:
// LPMVTVJ = "Total lending to individuals excluding student loans, Changes (SA)"
// from Table A5.2 (Money and Credit). Values are in GBP millions.
const BOE_SERIES_CODE = "LPMVTVJ";
const BOE_CSV_URL =
  `https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp?csv.x=yes` +
  `&Datefrom=01/Jan/2010&Dateto=now&SeriesCodes=${BOE_SERIES_CODE}&UsingCodes=Y&VPD=Y`;

const OUTPUT_PATH = join(process.cwd(), "src", "data", "annualLendingMetric.json");

function formatCurrency(value: number): string {
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

function parseCsv(text: string): LendingObservation[] {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    throw new Error("Bank of England CSV response contains no data rows.");
  }

  const observations: LendingObservation[] = [];

  for (const row of lines.slice(1)) {
    const parts = row.split(",");
    if (parts.length < 2) continue;

    const rawDate = parts[0]?.trim();
    const rawValue = parts[1]?.trim();
    if (!rawDate || !rawValue) continue;

    const parsedDate = new Date(rawDate);
    const parsedValue = Number(rawValue.replace(/,/g, ""));

    if (Number.isNaN(parsedDate.getTime()) || !Number.isFinite(parsedValue)) {
      continue;
    }

    observations.push({
      date: parsedDate,
      valueMillionPounds: parsedValue,
    });
  }

  if (observations.length === 0) {
    throw new Error("No valid lending observations could be parsed from CSV.");
  }

  observations.sort((a, b) => a.date.getTime() - b.date.getTime());
  return observations;
}

async function main() {
  try {
    const response = await fetch(BOE_CSV_URL, {
      headers: {
        Accept: "text/csv",
      },
    });

    if (!response.ok) {
      throw new Error(`Bank of England request failed with status ${response.status}.`);
    }

    const csvText = await response.text();
    const observations = parseCsv(csvText);

    if (observations.length < 12) {
      throw new Error(
        `Expected at least 12 monthly observations but found ${observations.length}.`,
      );
    }

    const latest12 = observations.slice(-12);
    const rolling12MonthTotalMillions = latest12.reduce(
      (sum, observation) => sum + observation.valueMillionPounds,
      0,
    );
    const numericValue = Math.round(rolling12MonthTotalMillions * 1_000_000);

    const latestObservationDate = latest12[latest12.length - 1].date;
    const metric: AnnualLendingMetric = {
      numericValue,
      formattedValue: formatCurrency(numericValue),
      currencySymbol: "\u00A3",
      timestamp: new Date().toISOString(),
      dateValue: formatMonthYear(latestObservationDate),
    };

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, `${JSON.stringify(metric, null, 2)}\n`, "utf8");

    console.log("Updated Annual Lending metric");
    console.log(`Series code: ${BOE_SERIES_CODE}`);
    console.log(`Latest month: ${metric.dateValue}`);
    console.log(`Rolling 12-month total: ${metric.formattedValue}`);
    console.log("Saved to src/data/annualLendingMetric.json");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update Annual Lending metric.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
