import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { borrowingExplainedArticle } from "./borrowingExplainedArticle.js";
import { debtInterestExplainedArticle } from "./debtInterestExplainedArticle.js";
import { debtToGdpExplainedArticle } from "./debtToGdpExplainedArticle.js";
import { giltYieldsExplainedArticle } from "./giltYieldsExplainedArticle.js";
import { governmentSpendingExplainedArticle } from "./governmentSpendingExplainedArticle.js";
import { isOnOrBeforePublicationMonth } from "../../lib/articlePublicationDate.js";

function readJson<T>(relativePath: string): T {
  return JSON.parse(readFileSync(new URL(relativePath, import.meta.url), "utf8")) as T;
}

const annualBorrowingTimeline = readJson<{
  dateValue: string;
  items: Array<{ yearLabel: string }>;
}>("../annualBorrowingTimeline.json");
const debtSustainabilityTimeline = readJson<{
  dateValue: string;
}>("../debtSustainabilityTimeline.json");
const debtOwnershipBreakdown = readJson<{
  dateValue: string;
}>("../ukDebtOwnershipBreakdown.json");
const debtInterestVsPublicServicePay = readJson<{
  dateValue: string;
}>("../debtInterestVsPublicServicePay.json");
const g7YieldComparison = readJson<{
  dateValue: string;
}>("../g7YieldComparison.json");
const g7YieldRateTimeline = readJson<{
  dateValue: string;
  items: Array<{ dateLabel: string }>;
}>("../g7YieldRateTimeline.json");
const inflationLinkedDebtExposure = readJson<{
  period: string;
}>("../inflationLinkedDebtExposure.json");
const giltYieldPeerTimeline = readJson<{
  dateValue: string;
}>("../giltYieldPeerTimeline.json");
const budgetReceiptsSpendingTimeline = readJson<{
  dateValue: string;
  items: Array<{ yearLabel: string }>;
}>("../budgetReceiptsSpendingTimeline.json");
const governmentSpendingTopCategories = readJson<{
  dateValue: string;
}>("../governmentSpendingTopCategories.json");
const nhsSpendingBreakdown = readJson<{
  dateValue: string;
}>("../nhsSpendingBreakdown.json");
const structuralDebtFlow = readJson<{
  dateValue: string;
}>("../structuralDebtFlow.json");
const debtToGdpTimeline = readJson<{
  dateValue: string;
}>("../debtToGdpTimeline.json");
const g7DebtToGdpComparison = readJson<{
  dateValue: string;
}>("../g7DebtToGdpComparison.json");

assert.ok(
  isOnOrBeforePublicationMonth(
    annualBorrowingTimeline.items.at(-1)?.yearLabel ?? annualBorrowingTimeline.dateValue,
    borrowingExplainedArticle.date,
  ),
);
assert.ok(
  isOnOrBeforePublicationMonth(debtSustainabilityTimeline.dateValue, borrowingExplainedArticle.date),
);
assert.ok(
  isOnOrBeforePublicationMonth(debtOwnershipBreakdown.dateValue, borrowingExplainedArticle.date),
);

assert.ok(
  isOnOrBeforePublicationMonth(
    g7YieldRateTimeline.items.at(-1)?.dateLabel ?? g7YieldRateTimeline.dateValue,
    debtInterestExplainedArticle.date,
  ),
);
assert.ok(
  isOnOrBeforePublicationMonth(
    debtInterestVsPublicServicePay.dateValue,
    debtInterestExplainedArticle.date,
  ),
);
assert.ok(
  isOnOrBeforePublicationMonth(g7YieldComparison.dateValue, debtInterestExplainedArticle.date),
);

assert.ok(
  isOnOrBeforePublicationMonth(inflationLinkedDebtExposure.period, giltYieldsExplainedArticle.date),
);
assert.ok(
  isOnOrBeforePublicationMonth(giltYieldPeerTimeline.dateValue, giltYieldsExplainedArticle.date),
);

assert.ok(
  isOnOrBeforePublicationMonth(
    budgetReceiptsSpendingTimeline.dateValue,
    governmentSpendingExplainedArticle.date,
  ),
);
assert.equal(budgetReceiptsSpendingTimeline.items.length, 5);
assert.ok(
  isOnOrBeforePublicationMonth(
    governmentSpendingTopCategories.dateValue,
    governmentSpendingExplainedArticle.date,
  ),
);
assert.ok(
  isOnOrBeforePublicationMonth(nhsSpendingBreakdown.dateValue, governmentSpendingExplainedArticle.date),
);
assert.ok(
  isOnOrBeforePublicationMonth(structuralDebtFlow.dateValue, governmentSpendingExplainedArticle.date),
);

assert.ok(
  isOnOrBeforePublicationMonth(debtToGdpTimeline.dateValue, debtToGdpExplainedArticle.date),
);
assert.ok(
  isOnOrBeforePublicationMonth(g7DebtToGdpComparison.dateValue, debtToGdpExplainedArticle.date),
);

console.log("articlePublicationCutoffAudit.test.ts passed");
