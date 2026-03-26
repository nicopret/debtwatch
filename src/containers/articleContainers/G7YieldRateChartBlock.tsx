"use client";

import G7YieldRateLineChartCard from "@/components/ui/g7YieldRateLineChartCardComponent/G7YieldRateLineChartCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectArticleG7YieldRateTimeline,
  selectG7YieldRateTimeline,
} from "@/store/selectors/metricsSelectors";

export interface G7YieldRateChartBlockProps {
  caption?: string;
  publicationDate?: string;
}

export default function G7YieldRateChartBlock({
  caption,
  publicationDate,
}: G7YieldRateChartBlockProps) {
  const timeline = useAppSelector((state) =>
    publicationDate
      ? selectArticleG7YieldRateTimeline(state, publicationDate)
      : selectG7YieldRateTimeline(state),
  );

  return (
    <G7YieldRateLineChartCard
      title={caption ?? timeline.title}
      subtitle={timeline.subtitle}
      points={timeline.items}
    />
  );
}
