import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { buildG7YieldRateTimeline } from "./g7YieldRateTimeline.js";

function buildPeriods(startYear: number, startMonth: number, count: number): string[] {
  return Array.from({ length: count }, (_, index) => {
    const monthOffset = startMonth - 1 + index;
    const year = startYear + Math.floor(monthOffset / 12);
    const month = (monthOffset % 12) + 1;
    return `${year}-${String(month).padStart(2, "0")}`;
  });
}

const periods = buildPeriods(2024, 1, 24);

const timeline = buildG7YieldRateTimeline({
  timestamp: "2026-03-20T00:00:00.000Z",
  source: "OECD / Bank of England",
  uk10yByPeriod: new Map(periods.map((period, index) => [period, 4 + index * 0.1])),
  g7AverageByPeriod: new Map(periods.map((period, index) => [period, 3 + index * 0.1])),
  bankRateByPeriod: new Map(periods.map((period, index) => [period, 5 - index * 0.1])),
});

assert.equal(timeline.unit, "percent");
assert.equal(timeline.xKey, "date");
assert.equal(timeline.items.length, 24);
assert.deepEqual(Object.keys(timeline.items[0] ?? {}), [
  "dateLabel",
  "uk10yGiltYieldPct",
  "g7Average10yYieldPct",
  "bankRatePct",
]);
assert.equal(timeline.items[0]?.g7Average10yYieldPct, 3);
assert.equal(timeline.items[timeline.items.length - 1]?.bankRatePct, 2.7);

const generatedTimeline = JSON.parse(
  readFileSync(new URL("../data/g7YieldRateTimeline.json", import.meta.url), "utf8"),
) as {
  dateValue: string;
  items: Array<{
    dateLabel: string;
    uk10yGiltYieldPct: number;
    g7Average10yYieldPct: number;
    bankRatePct: number;
  }>;
};

assert.ok(generatedTimeline.dateValue > "2021-12");
assert.ok((generatedTimeline.items.at(-1)?.dateLabel ?? "") > "2021-12");
assert.ok(
  generatedTimeline.items.every(
    (item) =>
      item.uk10yGiltYieldPct >= 0 &&
      item.g7Average10yYieldPct >= 0 &&
      item.bankRatePct >= 0 &&
      item.uk10yGiltYieldPct <= 100 &&
      item.g7Average10yYieldPct <= 100 &&
      item.bankRatePct <= 100,
  ),
);

console.log("g7YieldRateTimeline.test.ts passed");
