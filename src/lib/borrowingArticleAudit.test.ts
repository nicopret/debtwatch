import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { borrowingExplainedArticle } from "../data/articles/borrowingExplainedArticle.js";

const annualBorrowingTimeline = JSON.parse(
  readFileSync(join(process.cwd(), "src", "data", "annualBorrowingTimeline.json"), "utf8"),
) as {
  items: Array<{ yearLabel: string; formattedValue: string }>;
};

const annualLendingMetric = JSON.parse(
  readFileSync(join(process.cwd(), "src", "data", "annualLendingMetric.json"), "utf8"),
) as {
  formattedValue: string;
};

const debtToGdpTimeline = JSON.parse(
  readFileSync(join(process.cwd(), "src", "data", "debtToGdpTimeline.json"), "utf8"),
) as {
  items: Array<{ yearLabel: string; numericValue: number; formattedValue: string }>;
};

const debtToGdpMetric = JSON.parse(
  readFileSync(join(process.cwd(), "src", "data", "debtToGdpMetrics.json"), "utf8"),
) as {
  dateValue: string;
  numericValue: number;
  formattedValue: string;
};

const budgetDeficitMetric = JSON.parse(
  readFileSync(join(process.cwd(), "src", "data", "budgetDeficitMetric.json"), "utf8"),
) as {
  descriptiveText?: string;
};

const latestAnnualBorrowing =
  annualBorrowingTimeline.items[annualBorrowingTimeline.items.length - 1];
const latestDebtToGdpPoint =
  debtToGdpTimeline.items[debtToGdpTimeline.items.length - 1];

assert.ok(latestAnnualBorrowing);
assert.ok(latestDebtToGdpPoint);

assert.equal(
  borrowingExplainedArticle.metricStrip[0]?.helperText,
  "Latest annual net borrowing",
);
assert.notEqual(
  latestAnnualBorrowing?.formattedValue,
  annualLendingMetric.formattedValue,
);
assert.equal(debtToGdpMetric.dateValue, latestDebtToGdpPoint?.yearLabel);
assert.equal(debtToGdpMetric.numericValue, latestDebtToGdpPoint?.numericValue);
assert.equal(debtToGdpMetric.formattedValue, latestDebtToGdpPoint?.formattedValue);
assert.match(budgetDeficitMetric.descriptiveText ?? "", /public sector net borrowing/i);
assert.match(budgetDeficitMetric.descriptiveText ?? "", /gilt issuance/i);

console.log("borrowingArticleAudit.test.ts passed");
