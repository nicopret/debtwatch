import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { governmentSpendingExplainedArticle } from "../../data/articles/governmentSpendingExplainedArticle.js";
import {
  comparePublicationMonths,
  parseArticlePublicationMonth,
  parseDataMonth,
} from "../../lib/articlePublicationDate.js";

const chart = JSON.parse(
  readFileSync(new URL("../../data/governmentSpendingTopCategories.json", import.meta.url), "utf8"),
) as {
  dateValue: string;
  items: Array<{
    label: string;
    numericValue: number;
    color: "navy" | "red";
  }>;
};

const publicationMonth = parseArticlePublicationMonth(governmentSpendingExplainedArticle.date);
const dataMonth = parseDataMonth(chart.dateValue);

assert.equal(governmentSpendingExplainedArticle.date, "15 Feb 2026");
assert.ok(publicationMonth);
assert.ok(dataMonth);
assert.ok(comparePublicationMonths(dataMonth!, publicationMonth!) <= 0);
assert.equal(chart.items.length, 11);
assert.equal(chart.items.at(-1)?.label, "Other");
assert.equal(chart.items.find((item) => item.label === "Debt interest")?.color, "red");

for (let index = 1; index < 10; index += 1) {
  assert.ok(chart.items[index - 1]!.numericValue >= chart.items[index]!.numericValue);
}

console.log("governmentSpendingFeaturedGraphic.test.ts passed");
