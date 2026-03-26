import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { debtInterestExplainedArticle } from "../../data/articles/debtInterestExplainedArticle.js";
import {
  comparePublicationMonths,
  parseArticlePublicationMonth,
  parseDataMonth,
} from "../../lib/articlePublicationDate.js";

const timeline = JSON.parse(
  readFileSync(new URL("../../data/g7YieldRateTimeline.json", import.meta.url), "utf8"),
) as {
  items: Array<{
    dateLabel: string;
    uk10yGiltYieldPct: number;
    g7Average10yYieldPct: number;
    bankRatePct: number;
  }>;
};

const publicationMonth = parseArticlePublicationMonth(debtInterestExplainedArticle.date);
assert.ok(publicationMonth);

const latestPoint = timeline.items
  .filter((item) => {
    const itemMonth = parseDataMonth(item.dateLabel);
    return publicationMonth && itemMonth
      ? comparePublicationMonths(itemMonth, publicationMonth) <= 0
      : false;
  })
  .at(-1);

assert.equal(debtInterestExplainedArticle.date, "15 Mar 2026");
assert.equal(latestPoint?.dateLabel, "2026-02");
assert.ok(typeof latestPoint?.uk10yGiltYieldPct === "number");
assert.ok(typeof latestPoint?.g7Average10yYieldPct === "number");
assert.ok(typeof latestPoint?.bankRatePct === "number");

console.log("debtInterestArticleCutoff.test.ts passed");
