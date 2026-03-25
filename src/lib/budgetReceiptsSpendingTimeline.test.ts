import assert from "node:assert/strict";

import { buildBudgetReceiptsSpendingTimeline } from "./budgetReceiptsSpendingTimeline.js";

const result = buildBudgetReceiptsSpendingTimeline({
  dateValue: "Feb 2026",
  timestamp: "2026-02-28T00:00:00.000Z",
  source: "Office for Budget Responsibility",
  items: [
    { yearLabel: "2021-22", receipts: 915, spending: 1045 },
    { yearLabel: "2022-23", receipts: 1032, spending: 1117 },
    { yearLabel: "2023-24", receipts: 1098, spending: 1223 },
    { yearLabel: "2024-25", receipts: 1168, spending: 1298 },
    { yearLabel: "2025-26", receipts: 1232, spending: 1370 },
  ],
});

assert.equal(result.items.length, 5);
assert.equal(result.dateValue, "Feb 2026");
assert.equal(result.items[4]?.yearLabel, "2025-26");
assert.equal(result.items[0]?.gap, 130);
assert.equal(result.items[4]?.gap, 138);

console.log("budgetReceiptsSpendingTimeline.test.ts passed");
