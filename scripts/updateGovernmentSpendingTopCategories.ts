import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import {
  buildGovernmentSpendingTopCategories,
  type GovernmentSpendingTopCategoriesSource,
} from "../src/lib/governmentSpendingTopCategories.js";

const HEADLINE_SPENDING_PATH = join(
  process.cwd(),
  "src",
  "data",
  "governmentSpendingBreakdown.json",
);

const RESIDUAL_SPENDING_PATH = join(
  process.cwd(),
  "src",
  "data",
  "otherSpendingBreakdown.json",
);

const OUTPUT_PATH = join(
  process.cwd(),
  "src",
  "data",
  "governmentSpendingTopCategories.json",
);

async function main() {
  try {
    const [headlineRaw, residualRaw] = await Promise.all([
      readFile(HEADLINE_SPENDING_PATH, "utf8"),
      readFile(RESIDUAL_SPENDING_PATH, "utf8"),
    ]);

    const source = {
      headlineSpending: JSON.parse(headlineRaw),
      residualSpending: JSON.parse(residualRaw),
    } as GovernmentSpendingTopCategoriesSource;

    const chart = buildGovernmentSpendingTopCategories(source);

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, `${JSON.stringify(chart, null, 2)}\n`, "utf8");

    console.log("Updated government spending top categories chart data.");
    console.log(`Saved: ${OUTPUT_PATH}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update government spending top categories chart data.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
