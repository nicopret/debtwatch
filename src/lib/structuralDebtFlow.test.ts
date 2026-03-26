import assert from "node:assert/strict";

import { buildStructuralDebtFlow } from "./structuralDebtFlow.js";

const result = buildStructuralDebtFlow({
  dateValue: "Feb 2026",
  timestamp: "2026-02-28T00:00:00.000Z",
  source: "Office for Budget Responsibility / UK Debt Management Office / Office for National Statistics",
  values: {
    debt_rollover: "≈£220bn / year",
    new_borrowing: "≈£138bn / year",
    inflation_linked_uplift: "≈£35bn / year",
    interest_payments: "≈£95bn / year",
    total_debt: "≈£173bn / year",
  },
});

assert.equal(result.dateValue, "Feb 2026");
assert.equal(result.nodes.length, 5);
assert.deepEqual(result.nodes.map((node) => node.label), [
  "Debt rolled over",
  "New borrowing",
  "Inflation-linked uplift",
  "Interest payments",
  "Total debt increases",
]);
assert.deepEqual(result.edges, [
  { from: "debt_rollover", to: "total_debt" },
  { from: "new_borrowing", to: "total_debt" },
  { from: "inflation_linked_uplift", to: "total_debt" },
  { from: "interest_payments", to: "outflow" },
]);

console.log("structuralDebtFlow.test.ts passed");
