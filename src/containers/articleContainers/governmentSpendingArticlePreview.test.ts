import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { governmentSpendingExplainedArticle } from "../../data/articles/governmentSpendingExplainedArticle.js";
import {
  comparePublicationMonths,
  parseArticlePublicationMonth,
  parseDataMonth,
} from "../../lib/articlePublicationDate.js";

const timeline = JSON.parse(
  readFileSync(
    new URL("../../data/budgetReceiptsSpendingTimeline.json", import.meta.url),
    "utf8",
  ),
) as {
  dateValue: string;
  items: Array<{
    yearLabel: string;
    receipts: number;
    spending: number;
    gap: number;
  }>;
};

const publicationMonth = parseArticlePublicationMonth(governmentSpendingExplainedArticle.date);
const dataMonth = parseDataMonth(timeline.dateValue);

assert.equal(governmentSpendingExplainedArticle.date, "15 Feb 2026");
assert.equal(governmentSpendingExplainedArticle.previewGraphicKey, "budget-gap-trend");
assert.ok(publicationMonth);
assert.ok(dataMonth);
assert.ok(comparePublicationMonths(dataMonth!, publicationMonth!) <= 0);
assert.equal(timeline.items.length, 5);
assert.deepEqual(
  timeline.items.map((item) => item.yearLabel),
  ["2021-22", "2022-23", "2023-24", "2024-25", "2025-26"],
);
assert.ok(timeline.items.every((item) => item.spending > item.receipts));

console.log("governmentSpendingArticlePreview.test.ts passed");
