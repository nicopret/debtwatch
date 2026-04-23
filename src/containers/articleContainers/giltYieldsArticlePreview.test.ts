import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { giltYieldsExplainedArticle } from "../../data/articles/giltYieldsExplainedArticle.js";
import {
  comparePublicationMonths,
  parseArticlePublicationMonth,
  parseDataMonth,
} from "../../lib/articlePublicationDate.js";

const timeline = JSON.parse(
  readFileSync(new URL("../../data/giltYieldPeerTimeline.json", import.meta.url), "utf8"),
) as {
  items: Array<{
    dateLabel: string;
    uk10yGiltYieldPct: number;
    g7Average10yYieldPct: number;
  }>;
};

const publicationMonth = parseArticlePublicationMonth(giltYieldsExplainedArticle.date);
assert.ok(publicationMonth);
assert.equal(giltYieldsExplainedArticle.previewGraphicKey, "gilt-yield-peer-trend");

const latestPoint = timeline.items
  .filter((item) => {
    const itemMonth = parseDataMonth(item.dateLabel);
    return publicationMonth && itemMonth
      ? comparePublicationMonths(itemMonth, publicationMonth) <= 0
      : false;
  })
  .at(-1);

assert.equal(giltYieldsExplainedArticle.date, "15 Dec 2025");
assert.equal(giltYieldsExplainedArticle.publishedSnapshotVersion, "20251215");
assert.equal(latestPoint?.dateLabel, "2025-12");
assert.ok(typeof latestPoint?.uk10yGiltYieldPct === "number");
assert.ok(typeof latestPoint?.g7Average10yYieldPct === "number");

console.log("giltYieldsArticlePreview.test.ts passed");
