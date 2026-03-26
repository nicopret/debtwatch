import assert from "node:assert/strict";

import {
  buildG7YieldComparison,
  type G7YieldComparisonSource,
} from "./g7YieldComparison.js";

const source: G7YieldComparisonSource = {
  timestamp: "2026-03-20T00:00:00.000Z",
  source: "OECD long-term interest rates",
  period: "2025 annual average",
  items: [
    { countryCode: "GBR", year: "2025", value: 4.582183 },
    { countryCode: "USA", year: "2025", value: 4.430917 },
    { countryCode: "CAN", year: "2025", value: 3.308333 },
    { countryCode: "FRA", year: "2025", value: 3.365833 },
    { countryCode: "DEU", year: "2025", value: 2.536667 },
    { countryCode: "ITA", year: "2025", value: 3.600833 },
    { countryCode: "JPN", year: "2025", value: 1.423333 },
  ],
};

const comparison = buildG7YieldComparison(source);

assert.equal(comparison.unit, "percent");
assert.equal(comparison.period, "2025 annual average");
assert.equal(comparison.items.length, 7);
assert.deepEqual(
  comparison.items.map((item) => item.countryCode),
  ["GBR", "USA", "ITA", "FRA", "CAN", "DEU", "JPN"],
);
assert.equal(comparison.items[0]?.highlight, true);
assert.equal(comparison.items[0]?.color, "amber");
assert.equal(comparison.items[0]?.formattedValue, "4.6%");
assert.throws(() =>
  buildG7YieldComparison({
    ...source,
    items: source.items.filter((item) => item.countryCode !== "JPN"),
  }),
);

console.log("g7YieldComparison.test.ts passed");
