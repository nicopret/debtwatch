import assert from "node:assert/strict";

import { buildGovernmentSpendingTopCategories } from "./governmentSpendingTopCategories.js";

const result = buildGovernmentSpendingTopCategories({
  headlineSpending: {
    dateValue: "2025-26",
    timestamp: "2026-02-28T00:00:00.000Z",
    source: "Office for Budget Responsibility",
    items: [
      { label: "Welfare & pensions", numericValue: 333 },
      { label: "Health", numericValue: 202 },
      { label: "Education", numericValue: 95 },
      { label: "Defence", numericValue: 39 },
      { label: "Debt interest", numericValue: 114 },
      { label: "Infrastructure", numericValue: 159 },
      { label: "Other services", numericValue: 428 },
    ],
  },
  residualSpending: {
    dateValue: "2025-26",
    timestamp: "2026-02-28T00:00:00.000Z",
    source: "Office for Budget Responsibility (derived residual split)",
    items: [
      { label: "Public order & safety", numericValue: 77.04 },
      { label: "Local government", numericValue: 111.28 },
      { label: "Overseas aid", numericValue: 17.12 },
      { label: "Environment", numericValue: 29.96 },
      { label: "Administration", numericValue: 64.2 },
      { label: "Culture / communities", numericValue: 42.8 },
      { label: "Other", numericValue: 85.6 },
    ],
  },
});

assert.equal(result.items.length, 11);
assert.equal(result.dateValue, "Feb 2026");
assert.equal(result.items.at(-1)?.label, "Other");
assert.equal(result.items.find((item) => item.label === "Debt interest")?.color, "red");

const topTen = result.items.slice(0, 10);
for (let index = 1; index < topTen.length; index += 1) {
  assert.ok(topTen[index - 1]!.numericValue >= topTen[index]!.numericValue);
}

const otherValue = result.items.at(-1)?.numericValue ?? 0;
assert.equal(Number(otherValue.toFixed(2)), Number((29.96 + 17.12 + 85.6).toFixed(2)));

console.log("governmentSpendingTopCategories.test.ts passed");
