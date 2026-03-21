import assert from "node:assert/strict";

import {
  buildDebtInterestVsPublicServicePay,
  type DebtInterestVsPublicServicePaySource,
} from "./debtInterestVsPublicServicePay.js";

const source: DebtInterestVsPublicServicePaySource = {
  timestamp: "2026-03-19T00:00:00.000Z",
  debtInterest: {
    year: "2023",
    value: 86_281_000_000,
    source: "Office for National Statistics",
    definition: "Public sector debt interest payments (calendar-year sum of NMFX monthly outturns).",
  },
  publicServicePaySource: {
    year: "2023",
    source: "Office for National Statistics",
    definition:
      "General government compensation of employees from ONS ESA Table 11, using the six largest top-level COFOG functions.",
    items: [
      { key: "health_pay", label: "Health pay", value: 104_699_000_000 },
      { key: "education_pay", label: "Education pay", value: 59_150_000_000 },
      { key: "public_order_pay", label: "Public order pay", value: 28_574_000_000 },
      {
        key: "general_public_services_pay",
        label: "Government admin pay",
        value: 17_173_000_000,
      },
      { key: "defence_pay", label: "Defence pay", value: 16_611_000_000 },
      { key: "social_protection_pay", label: "Social protection pay", value: 16_221_000_000 },
    ],
  },
};

const comparison = buildDebtInterestVsPublicServicePay(source);

assert.equal(comparison.dateValue, "2023");
assert.equal(comparison.unit, "gbp_billions");
assert.equal(comparison.basis, "calendar_year");
assert.deepEqual(
  comparison.items.map((item) => item.key),
  [
    "debt_interest",
    "health_pay",
    "education_pay",
    "public_order_pay",
    "general_public_services_pay",
    "defence_pay",
    "social_protection_pay",
  ],
);
assert.deepEqual(
  comparison.items.map((item) => item.value),
  [86.3, 104.7, 59.1, 28.6, 17.2, 16.6, 16.2],
);
assert.equal(comparison.items[0]?.color, "amber");
assert.equal(comparison.items[1]?.color, "darkNavy");

assert.throws(() =>
  buildDebtInterestVsPublicServicePay({
    ...source,
    publicServicePaySource: {
      ...source.publicServicePaySource,
      year: "2022",
    },
  }),
);

console.log("debtInterestVsPublicServicePay.test.ts passed");
