"use client";

import DonutBreakdownCard from "@/components/ui/donutBreakdownCardComponent/DonutBreakdownCard";
import { useAppSelector } from "@/store/hooks";
import { selectOtherSpendingBreakdown } from "@/store/selectors/metricsSelectors";

export default function OtherSpendingBreakdownContainer() {
  const breakdown = useAppSelector(selectOtherSpendingBreakdown);

  return (
    <DonutBreakdownCard
      title={breakdown.title}
      subtitle={breakdown.subtitle}
      items={breakdown.items}
      totalValue={breakdown.totalFormattedValue}
      centerLabel="Other spending"
    />
  );
}
