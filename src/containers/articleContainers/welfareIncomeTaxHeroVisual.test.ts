import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { welfareBillOvertakesIncomeTaxArticle } from "../../data/articles/welfareBillOvertakesIncomeTaxArticle.js";
import {
  comparePublicationMonths,
  parseArticlePublicationMonth,
  parseDataMonth,
} from "../../lib/articlePublicationDate.js";

const timeline = JSON.parse(
  readFileSync(
    new URL("../../data/welfareIncomeTaxTimeline.json", import.meta.url),
    "utf8",
  ),
) as {
  dateValue: string;
  items: Array<{
    dateLabel: string;
    incomeTax: number;
    benefits: number;
    gap: number;
  }>;
};

const publicationMonth = parseArticlePublicationMonth(welfareBillOvertakesIncomeTaxArticle.date);
const dataMonth = parseDataMonth(timeline.dateValue);
const latestPoint = timeline.items.at(-1);

assert.equal(welfareBillOvertakesIncomeTaxArticle.date, "15 Apr 2026");
assert.equal(welfareBillOvertakesIncomeTaxArticle.heroVisual, "welfare-income-tax-hero");
assert.equal(timeline.dateValue, "Feb 2026");
assert.ok(publicationMonth);
assert.ok(dataMonth);
assert.ok(comparePublicationMonths(dataMonth!, publicationMonth!) <= 0);
assert.ok(timeline.items.length > 100);
assert.equal(latestPoint?.dateLabel, "Feb 2026");

for (const item of timeline.items) {
  assert.equal(Number((item.benefits - item.incomeTax).toFixed(6)), Number(item.gap.toFixed(6)));
}

console.log("welfareIncomeTaxHeroVisual.test.ts passed");
