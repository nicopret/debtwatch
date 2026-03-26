import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import {
  buildStructuralDebtFlow,
  type StructuralDebtFlowSource,
} from "../src/lib/structuralDebtFlow.js";

const SOURCE_PATH = join(
  process.cwd(),
  "src",
  "data",
  "structuralDebtFlowSource.json",
);

const OUTPUT_PATH = join(
  process.cwd(),
  "src",
  "data",
  "structuralDebtFlow.json",
);

async function main() {
  try {
    const rawSource = await readFile(SOURCE_PATH, "utf8");
    const source = JSON.parse(rawSource) as StructuralDebtFlowSource;
    const diagram = buildStructuralDebtFlow(source);

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, `${JSON.stringify(diagram, null, 2)}\n`, "utf8");

    console.log("Updated structural debt flow diagram data.");
    console.log(`Saved: ${OUTPUT_PATH}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update structural debt flow diagram data.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
