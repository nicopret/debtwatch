import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { governmentSpendingExplainedArticle } from "../../data/articles/governmentSpendingExplainedArticle.js";
import {
  comparePublicationMonths,
  parseArticlePublicationMonth,
  parseDataMonth,
} from "../../lib/articlePublicationDate.js";

const chart = JSON.parse(
  readFileSync(new URL("../../data/nhsSpendingBreakdown.json", import.meta.url), "utf8"),
) as {
  dateValue: string;
  totalNumericValue: number;
  items: Array<{
    label: string;
    numericValue: number;
  }>;
};

const publicationMonth = parseArticlePublicationMonth(governmentSpendingExplainedArticle.date);
const dataMonth = parseDataMonth(chart.dateValue);
const healthSection = governmentSpendingExplainedArticle.sections.find(
  (section) => section.id === "health-spending",
);

assert.equal(governmentSpendingExplainedArticle.date, "15 Feb 2026");
assert.ok(publicationMonth);
assert.ok(dataMonth);
assert.ok(comparePublicationMonths(dataMonth!, publicationMonth!) <= 0);
assert.deepEqual(chart.items.map((item) => item.label), [
  "Staff costs",
  "Procurement",
  "Medicine",
  "Primary care",
  "Infrastructure",
  "Legal costs",
  "Other",
]);
assert.equal(
  Number(chart.items.reduce((sum, item) => sum + item.numericValue, 0).toFixed(1)),
  Number(chart.totalNumericValue.toFixed(1)),
);
assert.equal(healthSection?.visualKey, "nhs-spending-breakdown");
assert.equal(healthSection?.layout, "split-reverse");

console.log("nhsSpendingVisual.test.ts passed");
