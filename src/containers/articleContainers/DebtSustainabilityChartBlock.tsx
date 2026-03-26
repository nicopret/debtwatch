"use client";

import DebtSustainabilityLineChartCard from "@/components/ui/debtSustainabilityLineChartCardComponent/DebtSustainabilityLineChartCard";
import { useAppSelector } from "@/store/hooks";
import { selectArticleDebtSustainabilityTimeline } from "@/store/selectors/metricsSelectors";

export interface DebtSustainabilityChartBlockProps {
  caption?: string;
  publicationDate?: string;
}

export default function DebtSustainabilityChartBlock({
  caption,
  publicationDate,
}: DebtSustainabilityChartBlockProps) {
  const timeline = useAppSelector((state) =>
    selectArticleDebtSustainabilityTimeline(state, publicationDate ?? ""),
  );

  return (
    <DebtSustainabilityLineChartCard
      title={caption ?? timeline.title}
      subtitle={timeline.subtitle}
      points={timeline.items}
    />
  );
}
