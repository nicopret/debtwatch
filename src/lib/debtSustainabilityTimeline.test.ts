import assert from "node:assert/strict";

import { buildDebtSustainabilityTimeline } from "./debtSustainabilityTimeline.js";

const debtToGdpByYear = new Map<number, number>();
const nominalGdpByYear = new Map<number, number>();
const realGdpGrowthByYear = new Map<number, number>();
const borrowingCostByYear = new Map<number, number>();

for (let year = 2000; year <= 2025; year += 1) {
  debtToGdpByYear.set(year, 40 + (year - 2000));
  nominalGdpByYear.set(year, 1_000 + (year - 2000) * 50);
  realGdpGrowthByYear.set(year, 2 + (year - 2000) * 0.05);
  borrowingCostByYear.set(year, 3 + (year - 2000) * 0.1);
}

const timeline = buildDebtSustainabilityTimeline({
  debtToGdpByYear,
  nominalGdpByYear,
  realGdpGrowthByYear,
  borrowingCostByYear,
  timestamp: "2026-03-17T00:00:00.000Z",
  source: "Test source",
});

assert.equal(timeline.unit, "percent");
assert.equal(timeline.xKey, "year");
assert.equal(timeline.items[0]?.yearLabel, "2001");
assert.equal(timeline.items[timeline.items.length - 1]?.yearLabel, "2025");
assert.ok(
  timeline.items.every(
    (item) =>
      typeof item.debtToGdpPct === "number" &&
      typeof item.nominalGdpGrowthPct === "number" &&
      typeof item.realGdpGrowthPct === "number" &&
      typeof item.borrowingCostPct === "number",
  ),
);

console.log("debtSustainabilityTimeline.test.ts passed");
