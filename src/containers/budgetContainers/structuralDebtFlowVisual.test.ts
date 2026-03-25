import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { governmentSpendingExplainedArticle } from "../../data/articles/governmentSpendingExplainedArticle.js";
import {
  comparePublicationMonths,
  parseArticlePublicationMonth,
  parseDataMonth,
} from "../../lib/articlePublicationDate.js";

const diagram = JSON.parse(
  readFileSync(new URL("../../data/structuralDebtFlow.json", import.meta.url), "utf8"),
) as {
  dateValue: string;
  nodes: Array<{ label: string }>;
  edges: Array<{ from: string; to: string }>;
};

const publicationMonth = parseArticlePublicationMonth(governmentSpendingExplainedArticle.date);
const dataMonth = parseDataMonth(diagram.dateValue);
const structuralSection = governmentSpendingExplainedArticle.sections.find(
  (section) => section.id === "structural-problem",
);

assert.equal(governmentSpendingExplainedArticle.date, "15 Feb 2026");
assert.ok(publicationMonth);
assert.ok(dataMonth);
assert.ok(comparePublicationMonths(dataMonth!, publicationMonth!) <= 0);
assert.equal(diagram.nodes.length, 5);
assert.deepEqual(diagram.nodes.map((node) => node.label), [
  "Debt rolled over",
  "New borrowing",
  "Inflation-linked uplift",
  "Interest payments",
  "Total debt increases",
]);
assert.deepEqual(diagram.edges, [
  { from: "debt_rollover", to: "total_debt" },
  { from: "new_borrowing", to: "total_debt" },
  { from: "inflation_linked_uplift", to: "total_debt" },
  { from: "interest_payments", to: "outflow" },
]);
assert.equal(structuralSection?.visualKey, "structural-debt-flow");
assert.equal(structuralSection?.layout, "split");

console.log("structuralDebtFlowVisual.test.ts passed");
