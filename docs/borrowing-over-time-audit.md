# Borrowing Over Time Audit

## Files audited

- `src/data/articles/borrowingExplainedArticle.ts`
- `src/containers/articleContainers/ArticleMetricStripContainer.tsx`
- `src/containers/articleContainers/articleVisualRegistry.tsx`
- `src/containers/borrowingContainers/AnnualBorrowingLineChartContainer.tsx`
- `src/containers/borrowingContainers/BorrowingGovernmentSummaryContainer.tsx`
- `src/store/selectors/metricsSelectors.ts`
- `src/store/slices/metricsSlice.ts`
- `src/data/annualBorrowingTimeline.json`
- `src/data/annualLendingMetric.json`
- `src/data/budgetDeficitMetric.json`
- `src/data/annualInterestPayableMetric.json`
- `src/data/monthlyInterestPayableMetric.json`
- `src/data/debtToGdpTimeline.json`
- `src/data/debtToGdpMetrics.json`
- `src/data/totalDebtMetrics.json`
- `src/data/debtSustainabilityTimeline.json`
- `src/data/ukDebtOwnershipBreakdown.json`
- `scripts/updateAnnualBorrowingTimeline.ts`
- `scripts/updateAnnualLending.ts`
- `scripts/updateBudgetBreakdown.ts`
- `scripts/updateAnnualInterestPayable.ts`
- `scripts/updateDebtToGdpSection.ts`
- `scripts/updateDebtSustainabilityTimeline.ts`
- `scripts/updateDebtOwnershipBreakdown.ts`
- `scripts/updateTotalDebt.ts`
- `scripts/updateTenYearGiltYield.ts`
- `scripts/updateGDP.ts`

## Findings

| Metric | Source file | Datasource | Current label | Actual definition | Time basis | Unit | Status | Issue | Recommended fix |
|---|---|---|---|---|---|---|---|---|---|
| Annual borrowing card in borrowing article | `src/containers/articleContainers/ArticleMetricStripContainer.tsx` | Bank of England `LPMVTVJ` via `annualLendingMetric.json` | `Annual borrowing` | Total lending to individuals excluding student loans, rolling last 12 months | Rolling 12 months to latest month | GBP | incorrect | Article card was wired to private household lending, not public sector net borrowing | Fixed: article card now uses latest item from `annualBorrowingTimeline.json` |
| Annual borrowing timeline | `scripts/updateAnnualBorrowingTimeline.ts` -> `src/data/annualBorrowingTimeline.json` | ONS `DZLS` | `Borrowing over time` | Annual public sector net borrowing excluding public sector banks | Annual calendar-year series | GBP | correct | None in pipeline; article label was the problem elsewhere | Keep as source of truth for article borrowing outturn |
| Budget deficit callout | `scripts/updateBudgetBreakdown.ts` -> `src/data/budgetDeficitMetric.json` | OBR public finances databank, aggregates sheet | `Budget deficit` / text said `new borrowing` | Fiscal-year public sector net borrowing forecast | Fiscal year `2025-26` | GBP bn | misleading | Descriptive text blurred net borrowing with total debt issuance/refinancing | Fixed text to state this is public sector net borrowing and that refinancing happens separately |
| Debt issuance / rollover | No dataset in article visuals | none currently | implied in article prose | Not currently quantified in a dataset; rollover is discussed conceptually only | n/a | n/a | misleading by omission | There is no gross gilt issuance dataset wired into this article, so issuance cannot be compared numerically with deficit borrowing | If needed later, add a dedicated DMO issuance pipeline and label it as gross issuance including refinancing |
| Debt interest metric | `scripts/updateAnnualInterestPayable.ts` -> `annualInterestPayableMetric.json` | ONS `NMFX` | `Debt Interest / Year` | Sum of latest 12 monthly debt-interest observations | Rolling 12 months to latest month | GBP | correct | Not the same basis as the annual debt-interest timeline, but this is now intentionally canonical for the metric card | Keep label/date explicit as rolling latest-12-months if surfaced near annual history |
| Debt interest annual history | `scripts/updateDebtInterestTimeline.ts` / `debtInterestSummary.json` | ONS `NMFX` | `Debt interest over time` / `Latest annual debt interest` | Completed calendar-year totals from monthly debt-interest observations | Annual calendar year | GBP | correct after prior fix | Different basis from rolling 12-month metric; summary now intentionally reads canonical metric for the displayed latest block | Keep summary/metric linkage as implemented; do not use it to infer issuance |
| Total debt | `scripts/updateTotalDebt.ts` -> `totalDebtMetrics.json` | ONS `HF6W` | `Total debt` | Latest public sector net debt level | Latest monthly observation | GBP | correct | None | Keep |
| Debt-to-GDP timeline | `scripts/updateDebtToGdpSection.ts` -> `debtToGdpTimeline.json` | ONS `HF6X` | `Debt vs GDP` | Public sector net debt as a percentage of GDP | Latest observation in each completed calendar year | percent | correct | This is the site-standard debt-ratio methodology | Keep as source of truth |
| Canonical debt-to-GDP metric | `scripts/updateTotalDebt.ts` -> `debtToGdpMetrics.json` | Previously `HF6W / YBHA` local calculation | `Debt to GDP ratio` | Previously a separately calculated ratio using debt level divided by annualised GDP | Monthly debt numerator vs trailing 4-quarter GDP denominator | percent | misleading | Used a different methodology from the rest of the site | Fixed: canonical selector now uses latest `debtToGdpTimeline` point, and generator now writes `debtToGdpMetrics.json` from that same timeline |
| Nominal GDP growth | `scripts/updateDebtSustainabilityTimeline.ts` -> `debtSustainabilityTimeline.json` | IMF WEO current-price GDP levels | `Nominal GDP growth` | Year-over-year growth in GDP at current prices | Annual | percent | correct | None | Keep |
| Real GDP growth | `scripts/updateDebtSustainabilityTimeline.ts` -> `debtSustainabilityTimeline.json` | IMF WEO constant-price percent-change series | `Real GDP growth` | Direct inflation-adjusted GDP growth series | Annual | percent | correct | None after recent update | Keep |
| Borrowing cost | `scripts/updateDebtSustainabilityTimeline.ts` and `scripts/updateTenYearGiltYield.ts` | Bank of England `IUDMNPY` | `Borrowing cost` / gilt-yield visual | 10-year nominal par gilt yield; annual average in sustainability chart | Annual in chart, latest observation in metric | percent | correct | None | Keep labels explicit that yield is a borrowing-cost benchmark, not debt interest itself |
| Debt ownership visual | `scripts/updateDebtOwnershipBreakdown.ts` -> `ukDebtOwnershipBreakdown.json` | DMO Quarterly Review Chart A.9 / ONS sector holdings | `Who owns UK debt?` | Ownership shares of gilt stock grouped into simplified buckets | Snapshot | percent | correct with simplification | Visual hides the `governments` bucket even though pipeline still calculates it | Acceptable editorial simplification; keep documented |
| Household debt breakdown in borrowing hero | `src/containers/articleContainers/articleVisualRegistry.tsx` | Hardcoded values, BoE family only cited in article sources | `Debt per taxpayer` rows | Editorial illustrative values, not a generated pipeline | Static display | GBP | misleading | Values are not currently generated from a source-backed pipeline | Leave as editorial for now or add a dedicated household-debt pipeline if exact sourced values are required |

## Main mismatch

The main mismatch was not in the annual public borrowing pipeline itself. It was in the article wiring:

1. the borrowing article's metric strip used `annualLendingMetric.json`, which is a Bank of England household-credit series, not public sector net borrowing
2. the canonical debt-to-GDP metric used a separate local calculation from debt level and GDP, while the rest of the site used ONS `HF6X`
3. the budget deficit copy blurred fiscal-year net borrowing with gross debt issuance/refinancing

## Changes made

- The borrowing article now reads its `Annual borrowing` value from the latest annual borrowing timeline outturn.
- The borrowing article helper text now says `Latest annual net borrowing`.
- The canonical debt-to-GDP selector now resolves to the latest `debtToGdpTimeline` point.
- `updateTotalDebt.ts` now writes `debtToGdpMetrics.json` from the same debt-to-GDP timeline methodology instead of recalculating it from `HF6W / YBHA`.
- The budget-deficit descriptive text now explicitly distinguishes public sector net borrowing from refinancing through gilt issuance.

## Remaining limitation

The household-debt comparison shown in the borrowing hero remains an editorial visual, not a source-generated pipeline. That is the only major number block in the article that is not yet backed by a dedicated transform/update script.
