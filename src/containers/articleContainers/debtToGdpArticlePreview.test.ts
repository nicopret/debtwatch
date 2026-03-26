import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { debtToGdpExplainedArticle } from "../../data/articles/debtToGdpExplainedArticle.js";
import {
  comparePublicationMonths,
  parseArticlePublicationMonth,
  parseDataMonth,
} from "../../lib/articlePublicationDate.js";

const metric = JSON.parse(
  readFileSync(new URL("../../data/debtToGdpMetrics.json", import.meta.url), "utf8"),
) as {
  dateValue: string;
  numericValue: number;
  formattedValue: string;
};

const publicationMonth = parseArticlePublicationMonth(debtToGdpExplainedArticle.date);
const dataMonth = parseDataMonth(metric.dateValue);

assert.equal(debtToGdpExplainedArticle.date, "25 Mar 2026");
assert.equal(debtToGdpExplainedArticle.previewGraphicKey, "debt-to-gdp-ratio");
assert.ok(
  debtToGdpExplainedArticle.previewGraphicPosition === undefined ||
    debtToGdpExplainedArticle.previewGraphicPosition === "left",
);
assert.ok(publicationMonth);
assert.ok(dataMonth);
assert.ok(comparePublicationMonths(dataMonth!, publicationMonth!) <= 0);
assert.ok(typeof metric.numericValue === "number");
assert.ok(metric.numericValue > 0);

console.log("debtToGdpArticlePreview.test.ts passed");
