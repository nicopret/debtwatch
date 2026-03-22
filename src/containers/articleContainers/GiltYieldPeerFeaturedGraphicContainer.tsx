"use client";

import GiltYieldPeerLineChartCard from "@/components/ui/giltYieldPeerLineChartCardComponent/GiltYieldPeerLineChartCard";
import { useAppSelector } from "@/store/hooks";
import { selectGiltYieldPeerTimeline } from "@/store/selectors/metricsSelectors";

export default function GiltYieldPeerFeaturedGraphicContainer() {
  const timeline = useAppSelector(selectGiltYieldPeerTimeline);

  return (
    <GiltYieldPeerLineChartCard
      title={timeline.title}
      subtitle={timeline.subtitle}
      points={timeline.items}
    />
  );
}
