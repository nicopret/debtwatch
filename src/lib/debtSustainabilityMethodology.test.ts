import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const debtSustainabilityTimeline = JSON.parse(
  readFileSync(join(process.cwd(), "src", "data", "debtSustainabilityTimeline.json"), "utf8"),
) as {
  items: Array<{
    yearLabel: string;
    debtToGdpPct: number;
    nominalGdpGrowthPct: number;
    realGdpGrowthPct: number;
    borrowingCostPct: number;
  }>;
};

const debtToGdpTimeline = JSON.parse(
  readFileSync(join(process.cwd(), "src", "data", "debtToGdpTimeline.json"), "utf8"),
) as {
  items: Array<{ yearLabel: string; numericValue: number }>;
};

const latestSustainabilityPoint =
  debtSustainabilityTimeline.items[debtSustainabilityTimeline.items.length - 1];
const matchingDebtTimelinePoint = debtToGdpTimeline.items.find(
  (item) => item.yearLabel === latestSustainabilityPoint?.yearLabel,
);
const year2023Point = debtSustainabilityTimeline.items.find(
  (item) => item.yearLabel === "2023",
);

assert.ok(latestSustainabilityPoint);
assert.ok(matchingDebtTimelinePoint);
assert.equal(
  latestSustainabilityPoint?.debtToGdpPct,
  matchingDebtTimelinePoint?.numericValue,
);
assert.ok(
  debtSustainabilityTimeline.items.every(
    (item) =>
      item.debtToGdpPct >= 0 &&
      item.debtToGdpPct <= 200 &&
      Math.abs(item.nominalGdpGrowthPct) <= 25 &&
      Math.abs(item.realGdpGrowthPct) <= 15 &&
      Math.abs(item.borrowingCostPct) <= 20,
  ),
);
assert.ok(
  debtSustainabilityTimeline.items.some(
    (item) => item.nominalGdpGrowthPct !== item.realGdpGrowthPct,
  ),
);
assert.equal(year2023Point?.realGdpGrowthPct, 0.4);
assert.ok(
  (year2023Point?.nominalGdpGrowthPct ?? 0) > (year2023Point?.realGdpGrowthPct ?? 0),
);

console.log("debtSustainabilityMethodology.test.ts passed");
