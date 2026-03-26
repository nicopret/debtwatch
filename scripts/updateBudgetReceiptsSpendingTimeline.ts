import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import * as XLSX from "xlsx";

import {
  buildBudgetReceiptsSpendingTimeline,
  type BudgetReceiptsSpendingPointSource,
} from "../src/lib/budgetReceiptsSpendingTimeline.js";

type ParsedWorkbookRow = {
  yearLabel: string;
  values: Record<string, number | string>;
};

const WORKBOOK_URL =
  "https://obr.uk/download/public-finances-databank-february-2026/?tmstv=1773441267";
const RELEASE_MONTH = "Feb 2026";
const LATEST_FISCAL_YEAR = "2025-26";
const HISTORY_LENGTH = 5;

const OUTPUT_PATH = join(
  process.cwd(),
  "src",
  "data",
  "budgetReceiptsSpendingTimeline.json",
);

const RECEIPTS_COLUMN_LABELS = {
  totalReceipts: "Public sector current receipts",
} as const;

const AGGREGATES_COLUMN_LABELS = {
  totalSpending: "Total managed expenditure",
} as const;

function normalizeNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function getSheetByKeyword(
  workbook: XLSX.WorkBook,
  requiredKeywords: string[],
): XLSX.WorkSheet {
  const sheetName = workbook.SheetNames.find((name) =>
    requiredKeywords.every((keyword) => name.includes(keyword)),
  );

  if (!sheetName) {
    throw new Error(`Could not find workbook sheet matching ${requiredKeywords.join(", ")}.`);
  }

  return workbook.Sheets[sheetName]!;
}

function parseWorkbookRows(worksheet: XLSX.WorkSheet): ParsedWorkbookRow[] {
  const rows = XLSX.utils.sheet_to_json<Array<string | number>>(worksheet, {
    header: 1,
    defval: "",
  });

  const labels = rows[3] ?? [];
  const dataRows = rows.filter(
    (row) => typeof row[1] === "string" && /^\d{4}-\d{2}$/.test(String(row[1])),
  );

  return dataRows.map((row) => ({
    yearLabel: String(row[1]).trim(),
    values: labels.reduce<Record<string, number | string>>((result, label, index) => {
      if (typeof label === "string" && label.trim()) {
        result[label] = row[index];
      }
      return result;
    }, {}),
  }));
}

async function main() {
  try {
    const response = await fetch(WORKBOOK_URL);
    if (!response.ok) {
      throw new Error(`OBR workbook request failed with status ${response.status}.`);
    }

    const workbookBuffer = Buffer.from(await response.arrayBuffer());
    const workbook = XLSX.read(workbookBuffer, { type: "buffer" });
    const receiptsSheet = getSheetByKeyword(workbook, ["Receipts", "bn"]);
    const aggregatesSheet = getSheetByKeyword(workbook, ["Aggregates", "bn"]);

    const receiptRows = parseWorkbookRows(receiptsSheet);
    const aggregateRows = parseWorkbookRows(aggregatesSheet);

    const receiptsByYear = new Map(
      receiptRows.map((row) => [
        row.yearLabel,
        normalizeNumber(row.values[RECEIPTS_COLUMN_LABELS.totalReceipts]),
      ]),
    );

    const aggregatePoints = aggregateRows
      .map((row) => {
        const yearLabel = row.yearLabel;

        if (!yearLabel || !receiptsByYear.has(yearLabel)) {
          return null;
        }

        return {
          yearLabel,
          receipts: receiptsByYear.get(yearLabel)!,
          spending: normalizeNumber(row.values[AGGREGATES_COLUMN_LABELS.totalSpending]),
        } satisfies BudgetReceiptsSpendingPointSource;
      })
      .filter((item): item is BudgetReceiptsSpendingPointSource => item !== null);

    const latestSafeIndex = aggregatePoints.findIndex(
      (item) => item.yearLabel === LATEST_FISCAL_YEAR,
    );

    if (latestSafeIndex === -1) {
      throw new Error(`Could not find latest safe fiscal year ${LATEST_FISCAL_YEAR}.`);
    }

    const historyStartIndex = Math.max(0, latestSafeIndex - (HISTORY_LENGTH - 1));
    const cappedPoints = aggregatePoints.slice(historyStartIndex, latestSafeIndex + 1);

    if (cappedPoints.length !== HISTORY_LENGTH) {
      throw new Error(`Expected ${HISTORY_LENGTH} annual points but found ${cappedPoints.length}.`);
    }

    const timeline = buildBudgetReceiptsSpendingTimeline({
      dateValue: RELEASE_MONTH,
      timestamp: new Date().toISOString(),
      source: "Office for Budget Responsibility",
      items: cappedPoints,
    });

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, `${JSON.stringify(timeline, null, 2)}\n`, "utf8");

    console.log("Updated budget receipts versus spending timeline.");
    console.log(`Saved: ${OUTPUT_PATH}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update budget receipts versus spending timeline.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
