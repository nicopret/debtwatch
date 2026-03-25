"use client";

import DonutBreakdownCard from "@/components/ui/donutBreakdownCardComponent/DonutBreakdownCard";
import { useAppSelector } from "@/store/hooks";
import { selectNhsSpendingBreakdown } from "@/store/selectors/metricsSelectors";

export default function NhsSpendingBreakdownContainer() {
  const breakdown = useAppSelector(selectNhsSpendingBreakdown);

  return (
    <DonutBreakdownCard
      title={breakdown.title}
      subtitle={breakdown.subtitle}
      items={breakdown.items}
      totalValue={breakdown.totalFormattedValue}
      centerLabel="NHS spend"
    />
  );
}
