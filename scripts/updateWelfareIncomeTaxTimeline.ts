import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import {
  buildWelfareIncomeTaxTimeline,
  type WelfareIncomeTaxTimelinePointSource,
} from "../src/lib/welfareIncomeTaxTimeline.js";

const DATA_URL =
  "https://www.ons.gov.uk/file?uri=%2Feconomy%2Fgovernmentpublicsectorandtaxes%2Fpublicsectorfinance%2Fdatasets%2Fpublicsectorfinances%2Fcurrent%2Fprevious%2Fv137%2Fpusf.csv";
const EXPECTED_RELEASE_DATE = "20-03-2026";
const LAST_SAFE_SOURCE_MONTH = "2026 FEB";
const DISPLAY_START_SOURCE_MONTH = "2000 JAN";

const OUTPUT_PATH = join(
  process.cwd(),
  "src",
  "data",
  "welfareIncomeTaxTimeline.json",
);

const SERIES = {
  incomeTax: {
    code: "LIBR",
    label:
      "CG: Current receipts: Taxes on income: Income tax and capital gains tax: \u00A3m CPNSA",
  },
  benefits: {
    code: "GZSL",
    label: "GG: Current expenditure: Net social benefits (D62): \u00A3m CPNSA",
  },
} as const;

const MONTH_ORDER = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
} as const;

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type SourceMonthLabel = `${number} ${keyof typeof MONTH_ORDER}`;

type ParsedMonthlyRow = {
  rawDateLabel: SourceMonthLabel;
  dateLabel: string;
  year: number;
  monthIndex: number;
  incomeTaxMillions: number;
  benefitsMillions: number;
};

function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === "\"") {
      if (inQuotes && line[index + 1] === "\"") {
        current += "\"";
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (character === "," && !inQuotes) {
      cells.push(current);
      current = "";
      continue;
    }

    current += character;
  }

  cells.push(current);
  return cells;
}

function normalizeLabel(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function parseNumber(value: string): number {
  const normalized = value.replaceAll(",", "").trim();
  if (!normalized) {
    return 0;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseSourceMonthLabel(value: string): { year: number; monthIndex: number } | null {
  const match = /^(\d{4}) ([A-Z]{3})$/.exec(value.trim());
  if (!match) {
    return null;
  }

  const monthIndex = MONTH_ORDER[match[2] as keyof typeof MONTH_ORDER];
  if (monthIndex === undefined) {
    return null;
  }

  return {
    year: Number(match[1]),
    monthIndex,
  };
}

function formatMonthLabel(year: number, monthIndex: number): string {
  return `${MONTH_LABELS[monthIndex]} ${year}`;
}

function compareSourceMonthLabels(left: string, right: string): number {
  const leftParsed = parseSourceMonthLabel(left);
  const rightParsed = parseSourceMonthLabel(right);

  if (!leftParsed || !rightParsed) {
    return left.localeCompare(right);
  }

  if (leftParsed.year !== rightParsed.year) {
    return leftParsed.year - rightParsed.year;
  }

  return leftParsed.monthIndex - rightParsed.monthIndex;
}

function buildRollingTwelveMonthPoints(
  rows: ParsedMonthlyRow[],
): WelfareIncomeTaxTimelinePointSource[] {
  const points: WelfareIncomeTaxTimelinePointSource[] = [];

  for (let index = 11; index < rows.length; index += 1) {
    let incomeTaxMillions = 0;
    let benefitsMillions = 0;

    for (let cursor = index - 11; cursor <= index; cursor += 1) {
      incomeTaxMillions += rows[cursor]!.incomeTaxMillions;
      benefitsMillions += rows[cursor]!.benefitsMillions;
    }

    points.push({
      dateLabel: rows[index]!.dateLabel,
      incomeTax: Number((incomeTaxMillions / 1_000).toFixed(3)),
      benefits: Number((benefitsMillions / 1_000).toFixed(3)),
    });
  }

  return points;
}

async function main() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`ONS PUSF request failed with status ${response.status}.`);
    }

    const csvText = await response.text();
    const rows = csvText
      .split(/\r?\n/)
      .filter((line) => line.trim().length > 0)
      .map(parseCsvLine);

    if (rows.length < 8) {
      throw new Error("ONS PUSF CSV did not contain the expected header rows.");
    }

    const titlesRow = rows[0] ?? [];
    const cdidRow = rows[1] ?? [];
    const releaseDateRow = rows[4] ?? [];

    const incomeTaxColumnIndex = cdidRow.indexOf(SERIES.incomeTax.code);
    const benefitsColumnIndex = cdidRow.indexOf(SERIES.benefits.code);

    if (incomeTaxColumnIndex === -1 || benefitsColumnIndex === -1) {
      throw new Error("Could not find one or both required ONS series columns in PUSF.");
    }

    if (releaseDateRow[incomeTaxColumnIndex] !== EXPECTED_RELEASE_DATE) {
      throw new Error(
        `Income tax series ${SERIES.incomeTax.code} used ${releaseDateRow[incomeTaxColumnIndex]} instead of ${EXPECTED_RELEASE_DATE}.`,
      );
    }

    if (releaseDateRow[benefitsColumnIndex] !== EXPECTED_RELEASE_DATE) {
      throw new Error(
        `Benefits series ${SERIES.benefits.code} used ${releaseDateRow[benefitsColumnIndex]} instead of ${EXPECTED_RELEASE_DATE}.`,
      );
    }

    const monthlyRows = rows
      .slice(7)
      .map((row) => {
        const rawDateLabel = row[0]?.trim() ?? "";
        const parsedMonth = parseSourceMonthLabel(rawDateLabel);

        if (!parsedMonth) {
          return null;
        }

        return {
          rawDateLabel: rawDateLabel as SourceMonthLabel,
          dateLabel: formatMonthLabel(parsedMonth.year, parsedMonth.monthIndex),
          year: parsedMonth.year,
          monthIndex: parsedMonth.monthIndex,
          incomeTaxMillions: parseNumber(row[incomeTaxColumnIndex] ?? ""),
          benefitsMillions: parseNumber(row[benefitsColumnIndex] ?? ""),
        } satisfies ParsedMonthlyRow;
      })
      .filter((row): row is ParsedMonthlyRow => row !== null);

    const safeMonthlyRows = monthlyRows.filter(
      (row) => compareSourceMonthLabels(row.rawDateLabel, LAST_SAFE_SOURCE_MONTH) <= 0,
    );

    const latestSafeRow = safeMonthlyRows.at(-1);
    if (!latestSafeRow || latestSafeRow.rawDateLabel !== LAST_SAFE_SOURCE_MONTH) {
      throw new Error(
        `Expected the latest safe source month to be ${LAST_SAFE_SOURCE_MONTH}, found ${latestSafeRow?.rawDateLabel ?? "nothing"}.`,
      );
    }

    const rollingPoints = buildRollingTwelveMonthPoints(safeMonthlyRows).filter((point) => {
      const parsedMonth = parseSourceMonthLabel(
        point.dateLabel.replace(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4})$/, (_, month, year) => {
          const monthKey = month.toUpperCase() as keyof typeof MONTH_ORDER;
          return `${year} ${monthKey}`;
        }),
      );

      const startMonth = parseSourceMonthLabel(DISPLAY_START_SOURCE_MONTH);
      if (!parsedMonth || !startMonth) {
        return true;
      }

      if (parsedMonth.year !== startMonth.year) {
        return parsedMonth.year > startMonth.year;
      }

      return parsedMonth.monthIndex >= startMonth.monthIndex;
    });

    if (rollingPoints.length === 0) {
      throw new Error("No rolling 12-month points were generated for the display window.");
    }

    const timeline = buildWelfareIncomeTaxTimeline({
      // The article is dated 15 Apr 2026, so it must not show the later 23 Apr 2026
      // ONS vintage. Using the 20 Mar 2026 release keeps the chart capped at Feb 2026.
      dateValue: latestSafeRow.dateLabel,
      timestamp: new Date().toISOString(),
      source: [
        "Office for National Statistics",
        "Public sector finances (PUSF)",
        `${EXPECTED_RELEASE_DATE} release`,
        `${SERIES.incomeTax.code} income tax receipts`,
        `${SERIES.benefits.code} net social benefits`,
      ].join(" | "),
      items: rollingPoints,
    });

    // Rolling 12-month totals smooth highly seasonal monthly tax receipts so the structural
    // relationship between the revenue series and benefits spending is easier to compare.
    // Caveat: LIBR is a central-government income-tax-plus-CGT receipts series, while GZSL is
    // a general-government net social benefits series, so the scopes are not perfectly matched.

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, `${JSON.stringify(timeline, null, 2)}\n`, "utf8");

    console.log("Updated welfare income tax timeline.");
    console.log(`Saved: ${OUTPUT_PATH}`);
    console.log(`Release date: ${releaseDateRow[incomeTaxColumnIndex]}`);
    console.log(`Final endpoint: ${latestSafeRow.dateLabel}`);
    console.log(`Series: ${normalizeLabel(titlesRow[incomeTaxColumnIndex] ?? SERIES.incomeTax.label)}`);
    console.log(`Series: ${normalizeLabel(titlesRow[benefitsColumnIndex] ?? SERIES.benefits.label)}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update welfare income tax timeline.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
