"use client";

import ArticleVisualPanel from "@/components/ui/articleVisualPanelComponent/ArticleVisualPanel";
import { useAppSelector } from "@/store/hooks";
import {
  selectBudgetDeficitMetric,
  selectGovernmentIncomeBreakdown,
  selectGovernmentSpendingBreakdown,
} from "@/store/selectors/metricsSelectors";

export default function BudgetIncomeSpendingTotalsContainer() {
  const income = useAppSelector(selectGovernmentIncomeBreakdown);
  const spending = useAppSelector(selectGovernmentSpendingBreakdown);
  const deficit = useAppSelector(selectBudgetDeficitMetric);

  return (
    <ArticleVisualPanel
      eyebrow={`Budget totals | ${income.dateValue}`}
      title="Income, spending and the gap"
      value="The gap is borrowed"
      helperText="The government collects revenue, spends more than it collects, and finances the shortfall through borrowing."
      items={[
        { label: "Income", value: income.totalFormattedValue },
        { label: "Spending", value: spending.totalFormattedValue },
        { label: "Deficit", value: deficit.formattedValue, tone: "accent" },
      ]}
      accentColor="#b45309"
    />
  );
}
