import assert from "node:assert/strict";

import { buildNhsSpendingBreakdown } from "./nhsSpendingBreakdown.js";

const result = buildNhsSpendingBreakdown({
  dateValue: "2024-25",
  timestamp: "2026-02-28T00:00:00.000Z",
  source: "NHS England annual report and accounts / Department of Health and Social Care",
  items: [
    { key: "nhs_payroll", label: "NHS payroll", value: 92.4 },
    { key: "agency_staff", label: "Agency staff", value: 8.6 },
    { key: "clinical_procurement", label: "Clinical procurement", value: 24.8 },
    { key: "medicines_and_pharmacy", label: "Medicines and pharmacy", value: 20.7 },
    { key: "primary_care_contracts", label: "Primary care contracts", value: 18.5 },
    { key: "capital_and_estates", label: "Capital and estates", value: 9.8 },
    {
      key: "clinical_negligence_and_legal",
      label: "Clinical negligence and legal",
      value: 4.1,
    },
    { key: "other_operating_costs", label: "Other operating costs", value: 17.1 },
  ],
});

assert.equal(result.items.length, 7);
assert.deepEqual(result.items.map((item) => item.label), [
  "Staff costs",
  "Procurement",
  "Medicine",
  "Primary care",
  "Infrastructure",
  "Legal costs",
  "Other",
]);
assert.equal(result.items[0]?.numericValue, 101);
assert.equal(result.totalNumericValue, 196);
assert.equal(
  Number(
    result.items.reduce((sum, item) => sum + item.numericValue, 0).toFixed(1),
  ),
  196,
);

console.log("nhsSpendingBreakdown.test.ts passed");
