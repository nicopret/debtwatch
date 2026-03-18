import assert from "node:assert/strict";

import {
  buildDebtOwnershipBreakdown,
  type DebtOwnershipSource,
} from "./debtOwnershipBreakdown.js";

const source: DebtOwnershipSource = {
  title: "Gilt holdings by sector",
  unit: "gbp_millions_market_value",
  dateValue: "Q2 2025",
  timestamp: "2026-03-16T00:00:00.000Z",
  source: "UK Debt Management Office / Office for National Statistics",
  sourceUrl: "https://www.dmo.gov.uk/media/oykbuhke/jul-sep25.pdf",
  items: [
    { label: "Insurance companies and pension funds", value: 449571 },
    { label: "Overseas", value: 696258 },
    { label: "Bank of England (Asset Purchase Facility)", value: 427066 },
    { label: "Other financial institutions and private non-financial corporations", value: 330549 },
    { label: "Monetary financial institutions", value: 201125 },
    { label: "Households and non-profit institutions serving households", value: 2995 },
    { label: "Local authorities and public corporations", value: 998 },
  ],
};

const breakdown = buildDebtOwnershipBreakdown(source);

assert.deepEqual(
  breakdown.items.map((item) => item.key),
  [
    "international_investors",
    "local_investors",
    "governments",
    "central_bank",
  ],
);

assert.deepEqual(
  breakdown.items.map((item) => item.value),
  [33, 46.7, 0, 20.3],
);

assert.equal(
  breakdown.items.reduce((sum, item) => sum + item.value, 0),
  100,
);

console.log("debtOwnershipBreakdown.test.ts passed");
