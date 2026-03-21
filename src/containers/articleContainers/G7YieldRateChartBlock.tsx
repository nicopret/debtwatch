"use client";

import G7YieldRateLineChartCard from "@/components/ui/g7YieldRateLineChartCardComponent/G7YieldRateLineChartCard";
import { useAppSelector } from "@/store/hooks";
import { selectG7YieldRateTimeline } from "@/store/selectors/metricsSelectors";

export interface G7YieldRateChartBlockProps {
  caption?: string;
}

export default function G7YieldRateChartBlock({
  caption,
}: G7YieldRateChartBlockProps) {
  const timeline = useAppSelector(selectG7YieldRateTimeline);

  return (
    <G7YieldRateLineChartCard
      title={caption ?? timeline.title}
      subtitle={timeline.subtitle}
      points={timeline.items}
    />
  );
}
