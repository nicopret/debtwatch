"use client";

import WelfareIncomeTaxHeroChart from "@/components/ui/welfareIncomeTaxHeroChartComponent/WelfareIncomeTaxHeroChart";
import { useAppSelector } from "@/store/hooks";
import { selectArticleWelfareIncomeTaxTimeline } from "@/store/selectors/metricsSelectors";

export interface WelfareIncomeTaxHeroVisualProps {
  publicationDate?: string;
}

export default function WelfareIncomeTaxHeroVisual({
  publicationDate,
}: WelfareIncomeTaxHeroVisualProps) {
  const timeline = useAppSelector((state) =>
    selectArticleWelfareIncomeTaxTimeline(state, publicationDate ?? ""),
  );

  if (!timeline) {
    return null;
  }

  return (
    <WelfareIncomeTaxHeroChart
      title={timeline.title}
      subtitle={timeline.subtitle}
      source={timeline.source}
      dateValue={timeline.dateValue}
      points={timeline.items}
    />
  );
}
