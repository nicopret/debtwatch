import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { borrowingExplainedArticle } from "../data/articles/borrowingExplainedArticle.js";

const annualBorrowingTimeline = JSON.parse(
  readFileSync(join(process.cwd(), "src", "data", "annualBorrowingTimeline.json"), "utf8"),
) as {
  items: Array<{ yearLabel: string; formattedValue: string }>;
};

const annualBorrowingMetric = JSON.parse(
  readFileSync(join(process.cwd(), "src", "data", "annualBorrowingMetric.json"), "utf8"),
) as {
  dateValue: string;
  formattedValue: string;
  releaseDate?: string;
};

const debtToGdpMetric = JSON.parse(
  readFileSync(join(process.cwd(), "src", "data", "debtToGdpMetrics.json"), "utf8"),
) as {
  dateValue: string;
  numericValue: number;
  formattedValue: string;
  releaseDate?: string;
};

const budgetDeficitMetric = JSON.parse(
  readFileSync(join(process.cwd(), "src", "data", "budgetDeficitMetric.json"), "utf8"),
) as {
  descriptiveText?: string;
};

const latestAnnualBorrowing =
  annualBorrowingTimeline.items[annualBorrowingTimeline.items.length - 1];

assert.ok(latestAnnualBorrowing);

assert.equal(
  borrowingExplainedArticle.metricStrip[0]?.helperText,
  "Latest annual net borrowing",
);
assert.equal(annualBorrowingMetric.dateValue, "Mar 2026");
assert.equal(annualBorrowingMetric.formattedValue, "\u00A3132B");
assert.equal(annualBorrowingMetric.releaseDate, "23 Apr 2026");
assert.notEqual(latestAnnualBorrowing?.formattedValue, annualBorrowingMetric.formattedValue);
assert.equal(debtToGdpMetric.dateValue, "Mar 2026");
assert.equal(debtToGdpMetric.numericValue, 93.8);
assert.equal(debtToGdpMetric.formattedValue, "93.8%");
assert.equal(debtToGdpMetric.releaseDate, "23 Apr 2026");
assert.match(budgetDeficitMetric.descriptiveText ?? "", /public sector net borrowing/i);
assert.match(budgetDeficitMetric.descriptiveText ?? "", /gilt issuance/i);

console.log("borrowingArticleAudit.test.ts passed");
