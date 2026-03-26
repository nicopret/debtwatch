"use client";

import GiltYieldPeerLineChartCard from "@/components/ui/giltYieldPeerLineChartCardComponent/GiltYieldPeerLineChartCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectArticleGiltYieldPeerTimeline,
  selectGiltYieldPeerTimeline,
} from "@/store/selectors/metricsSelectors";

export interface GiltYieldPeerFeaturedGraphicContainerProps {
  publicationDate?: string;
}

export default function GiltYieldPeerFeaturedGraphicContainer({
  publicationDate,
}: GiltYieldPeerFeaturedGraphicContainerProps) {
  const timeline = useAppSelector((state) =>
    publicationDate
      ? selectArticleGiltYieldPeerTimeline(state, publicationDate)
      : selectGiltYieldPeerTimeline(state),
  );

  return (
    <GiltYieldPeerLineChartCard
      title={timeline.title}
      subtitle={timeline.subtitle}
      points={timeline.items}
    />
  );
}
