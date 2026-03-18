import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import {
  buildDebtOwnershipBreakdown,
  type DebtOwnershipSource,
} from "../src/lib/debtOwnershipBreakdown.js";

const INPUT_PATH = join(process.cwd(), "src", "data", "ukDebtOwnershipSource.json");
const OUTPUT_PATH = join(process.cwd(), "src", "data", "ukDebtOwnershipBreakdown.json");

async function main() {
  try {
    // The current ownership snapshot is maintained from DMO Quarterly Review Chart A.9,
    // which reports gilt holdings by sector at market value using ONS sector data.
    const rawSource = await readFile(INPUT_PATH, "utf8");
    const source = JSON.parse(rawSource) as DebtOwnershipSource;
    const breakdown = buildDebtOwnershipBreakdown(source);

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, `${JSON.stringify(breakdown, null, 2)}\n`, "utf8");

    console.log("Updated UK debt ownership breakdown.");
    console.log(`Date: ${breakdown.dateValue}`);
    console.log(
      `Percentages: ${breakdown.items.map((item) => `${item.label} ${item.value}%`).join(" | ")}`,
    );
    console.log(`Saved: ${OUTPUT_PATH}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update UK debt ownership breakdown.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
