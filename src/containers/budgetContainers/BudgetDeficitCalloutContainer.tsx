"use client";

import BudgetDeficitCalloutCard from "@/components/ui/budgetDeficitCalloutCardComponent/BudgetDeficitCalloutCard";
import { useAppSelector } from "@/store/hooks";
import { selectBudgetDeficitMetric } from "@/store/selectors/metricsSelectors";

export default function BudgetDeficitCalloutContainer() {
  const deficit = useAppSelector(selectBudgetDeficitMetric);

  return (
    <BudgetDeficitCalloutCard
      title="Budget deficit"
      value={deficit.formattedValue}
      bodyText={
        deficit.descriptiveText ??
        "Spending exceeds income. The gap is financed through new borrowing and added to debt."
      }
    />
  );
}
