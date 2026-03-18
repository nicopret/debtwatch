"use client";

import DebtSustainabilityLineChartCard from "@/components/ui/debtSustainabilityLineChartCardComponent/DebtSustainabilityLineChartCard";
import { useAppSelector } from "@/store/hooks";
import { selectDebtSustainabilityTimeline } from "@/store/selectors/metricsSelectors";

export interface DebtSustainabilityChartBlockProps {
  caption?: string;
}

export default function DebtSustainabilityChartBlock({
  caption,
}: DebtSustainabilityChartBlockProps) {
  const timeline = useAppSelector(selectDebtSustainabilityTimeline);

  return (
    <DebtSustainabilityLineChartCard
      title={caption ?? timeline.title}
      subtitle={timeline.subtitle}
      points={timeline.items}
    />
  );
}
