"use client";

import DonutBreakdownCard from "@/components/ui/donutBreakdownCardComponent/DonutBreakdownCard";
import { useAppSelector } from "@/store/hooks";
import { selectOtherIncomeBreakdown } from "@/store/selectors/metricsSelectors";

export default function OtherIncomeBreakdownContainer() {
  const breakdown = useAppSelector(selectOtherIncomeBreakdown);

  return (
    <DonutBreakdownCard
      title={breakdown.title}
      subtitle={breakdown.subtitle}
      items={breakdown.items}
      totalValue={breakdown.totalFormattedValue}
      centerLabel="Other income"
    />
  );
}
