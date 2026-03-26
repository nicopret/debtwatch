import assert from "node:assert/strict";

import { borrowingExplainedArticle } from "./borrowingExplainedArticle.js";
import { debtInterestExplainedArticle } from "./debtInterestExplainedArticle.js";
import { debtToGdpExplainedArticle } from "./debtToGdpExplainedArticle.js";
import { giltYieldsExplainedArticle } from "./giltYieldsExplainedArticle.js";
import { governmentSpendingExplainedArticle } from "./governmentSpendingExplainedArticle.js";
const articles = [
  debtInterestExplainedArticle,
  debtToGdpExplainedArticle,
  governmentSpendingExplainedArticle,
  borrowingExplainedArticle,
  giltYieldsExplainedArticle,
];

const sorted = [...articles].sort(
  (left, right) => new Date(right.date).getTime() - new Date(left.date).getTime(),
);

assert.equal(debtToGdpExplainedArticle.date, "25 Mar 2026");
assert.equal(sorted[0]?.slug, "how-debt-to-gdp-works");

console.log("articleOrderingByDate.test.ts passed");
