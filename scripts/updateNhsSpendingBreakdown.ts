import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import {
  buildNhsSpendingBreakdown,
  type NhsSpendingBreakdownSource,
} from "../src/lib/nhsSpendingBreakdown.js";

const SOURCE_PATH = join(
  process.cwd(),
  "src",
  "data",
  "nhsSpendingBreakdownSource.json",
);

const OUTPUT_PATH = join(
  process.cwd(),
  "src",
  "data",
  "nhsSpendingBreakdown.json",
);

async function main() {
  try {
    const rawSource = await readFile(SOURCE_PATH, "utf8");
    const source = JSON.parse(rawSource) as NhsSpendingBreakdownSource;
    const breakdown = buildNhsSpendingBreakdown(source);

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, `${JSON.stringify(breakdown, null, 2)}\n`, "utf8");

    console.log("Updated NHS spending breakdown.");
    console.log(`Saved: ${OUTPUT_PATH}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update NHS spending breakdown.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
