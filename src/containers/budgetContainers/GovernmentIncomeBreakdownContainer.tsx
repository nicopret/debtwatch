"use client";

import BudgetBreakdownCard from "@/components/ui/budgetBreakdownCardComponent/BudgetBreakdownCard";
import { useAppSelector } from "@/store/hooks";
import { selectGovernmentIncomeBreakdown } from "@/store/selectors/metricsSelectors";

export default function GovernmentIncomeBreakdownContainer() {
  const income = useAppSelector(selectGovernmentIncomeBreakdown);

  return (
    <BudgetBreakdownCard
      title="Where government money comes from"
      subtitle={`UK receipts, forecast ${income.dateValue}`}
      totalValue={income.totalFormattedValue}
      items={income.items}
      barAriaLabel="Government income breakdown stacked bar"
    />
  );
}
