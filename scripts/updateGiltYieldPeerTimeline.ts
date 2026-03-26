import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import {
  buildGiltYieldPeerTimeline,
  type GiltYieldPeerTimelineSource,
} from "../src/lib/giltYieldPeerTimeline.js";

type G7YieldRateTimelineSourceData = {
  timestamp: string;
  items: Array<{
    dateLabel: string;
    uk10yGiltYieldPct: number;
    g7Average10yYieldPct: number;
  }>;
};

const INPUT_PATH = join(process.cwd(), "src", "data", "g7YieldRateTimeline.json");
const OUTPUT_PATH = join(process.cwd(), "src", "data", "giltYieldPeerTimeline.json");

async function main() {
  try {
    const rawInput = await readFile(INPUT_PATH, "utf8");
    const input = JSON.parse(rawInput) as G7YieldRateTimelineSourceData;

    const source: GiltYieldPeerTimelineSource = {
      timestamp: input.timestamp,
      source: "OECD long-term interest rates",
      items: input.items.map((item) => ({
        dateLabel: item.dateLabel,
        uk10yGiltYieldPct: item.uk10yGiltYieldPct,
        g7Average10yYieldPct: item.g7Average10yYieldPct,
      })),
    };

    const timeline = buildGiltYieldPeerTimeline(source);

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, `${JSON.stringify(timeline, null, 2)}\n`, "utf8");

    console.log("Updated gilt-yield peer timeline.");
    console.log(`Months: ${timeline.items.length}`);
    console.log(`Latest period: ${timeline.dateValue}`);
    console.log(`Saved: ${OUTPUT_PATH}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to update gilt-yield peer timeline.");
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
