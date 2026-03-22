import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { borrowingExplainedArticle } from "../../data/articles/borrowingExplainedArticle.js";
import {
  comparePublicationMonths,
  parseArticlePublicationMonth,
  parseDataMonth,
} from "../../lib/articlePublicationDate.js";

const publicationMonth = parseArticlePublicationMonth(borrowingExplainedArticle.date);
assert.ok(publicationMonth);

const totalDebtMetric = JSON.parse(
  readFileSync(new URL("../../data/totalDebtMetrics.json", import.meta.url), "utf8"),
) as {
  dateValue: string;
};

const debtSustainabilityTimeline = JSON.parse(
  readFileSync(new URL("../../data/debtSustainabilityTimeline.json", import.meta.url), "utf8"),
) as {
  items: Array<{ yearLabel: string }>;
};

const giltYieldTimeline = JSON.parse(
  readFileSync(new URL("../../data/giltYieldTimeline.json", import.meta.url), "utf8"),
) as {
  items: Array<{ dateLabel: string }>;
};

const latestEligibleDebtSustainabilityPoint = debtSustainabilityTimeline.items
  .filter((item) => {
    const itemMonth = parseDataMonth(item.yearLabel);
    return publicationMonth && itemMonth
      ? comparePublicationMonths(itemMonth, publicationMonth) <= 0
      : false;
  })
  .at(-1);

const latestEligibleGiltYieldPoint = giltYieldTimeline.items
  .filter((item) => {
    const itemMonth = parseDataMonth(item.dateLabel);
    return publicationMonth && itemMonth
      ? comparePublicationMonths(itemMonth, publicationMonth) <= 0
      : false;
  })
  .at(-1);

assert.equal(borrowingExplainedArticle.date, "15 Jan 2026");
assert.equal(totalDebtMetric.dateValue, "Jan 2026");
assert.equal(latestEligibleDebtSustainabilityPoint?.yearLabel, "2025");
assert.equal(latestEligibleGiltYieldPoint?.dateLabel, "2026-01");

console.log("borrowingArticleCutoff.test.ts passed");
