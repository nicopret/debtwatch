"use client";

import BudgetBreakdownCard from "@/components/ui/budgetBreakdownCardComponent/BudgetBreakdownCard";
import { useAppSelector } from "@/store/hooks";
import { selectGovernmentSpendingBreakdown } from "@/store/selectors/metricsSelectors";

export default function GovernmentSpendingBreakdownContainer() {
  const spending = useAppSelector(selectGovernmentSpendingBreakdown);

  return (
    <BudgetBreakdownCard
      title="Where government money goes"
      subtitle={`UK spending, forecast ${spending.dateValue}`}
      totalValue={spending.totalFormattedValue}
      items={spending.items}
      barAriaLabel="Government spending breakdown stacked bar"
    />
  );
}
