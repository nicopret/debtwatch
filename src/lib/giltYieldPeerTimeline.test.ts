import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { buildGiltYieldPeerTimeline } from "./giltYieldPeerTimeline.js";
import { giltYieldsExplainedArticle } from "../data/articles/giltYieldsExplainedArticle.js";

function buildPeriods(startYear: number, startMonth: number, count: number): string[] {
  return Array.from({ length: count }, (_, index) => {
    const monthOffset = startMonth - 1 + index;
    const year = startYear + Math.floor(monthOffset / 12);
    const month = (monthOffset % 12) + 1;
    return `${year}-${String(month).padStart(2, "0")}`;
  });
}

const periods = buildPeriods(2000, 1, 315);

const timeline = buildGiltYieldPeerTimeline({
  timestamp: "2026-03-22T00:00:00.000Z",
  source: "OECD long-term interest rates",
  items: periods.map((period, index) => ({
    dateLabel: period,
    uk10yGiltYieldPct: 4 + index * 0.01,
    g7Average10yYieldPct: 3 + index * 0.01,
  })),
});

assert.equal(timeline.unit, "percent");
assert.equal(timeline.xKey, "date");
assert.equal(timeline.dateValue, "2025-12");
assert.equal(timeline.items[0]?.dateLabel, "2000-01");
assert.deepEqual(Object.keys(timeline.items[0] ?? {}), [
  "dateLabel",
  "uk10yGiltYieldPct",
  "g7Average10yYieldPct",
]);

const generatedTimeline = JSON.parse(
  readFileSync(new URL("../data/giltYieldPeerTimeline.json", import.meta.url), "utf8"),
) as {
  dateValue: string;
  items: Array<{
    dateLabel: string;
    uk10yGiltYieldPct: number;
    g7Average10yYieldPct: number;
  }>;
};

assert.equal(giltYieldsExplainedArticle.date, "15 Dec 2025");
assert.equal(generatedTimeline.dateValue, "2025-12");
assert.ok(generatedTimeline.items.every((item) => item.dateLabel <= "2025-12"));
assert.ok(
  generatedTimeline.items.every(
    (item) =>
      item.uk10yGiltYieldPct >= 0 &&
      item.uk10yGiltYieldPct <= 100 &&
      item.g7Average10yYieldPct >= 0 &&
      item.g7Average10yYieldPct <= 100,
  ),
);

console.log("giltYieldPeerTimeline.test.ts passed");
