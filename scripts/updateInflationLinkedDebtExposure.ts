import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import {
  buildInflationLinkedDebtExposure,
  type InflationLinkedDebtExposureSource,
} from "../src/lib/inflationLinkedDebtExposure.js";

const INPUT_PATH = join(
  process.cwd(),
  "src",
  "data",
  "inflationLinkedDebtExposureSource.json",
);
const OUTPUT_PATH = join(
  process.cwd(),
  "src",
  "data",
  "inflationLinkedDebtExposure.json",
);

async function main() {
  try {
    const rawSource = await readFile(INPUT_PATH, "utf8");
    const source = JSON.parse(rawSource) as InflationLinkedDebtExposureSource;
    const exposure = buildInflationLinkedDebtExposure(source);

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, `${JSON.stringify(exposure, null, 2)}\n`, "utf8");

    console.log("Updated inflation-linked debt exposure.");
    console.log(`Period: ${exposure.period}`);
    console.log(
      exposure.items.map((item) => `${item.label} ${item.value}`).join(" | "),
    );
    console.log(`Saved: ${OUTPUT_PATH}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update inflation-linked debt exposure.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
