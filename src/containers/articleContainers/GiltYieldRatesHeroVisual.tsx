"use client";

import ArticleVisualPanel from "@/components/ui/articleVisualPanelComponent/ArticleVisualPanel";
import { useAppSelector } from "@/store/hooks";
import { selectArticleGiltYieldComparisonRates } from "@/store/selectors/metricsSelectors";

export interface GiltYieldRatesHeroVisualProps {
  publicationDate?: string;
}

export default function GiltYieldRatesHeroVisual({
  publicationDate,
}: GiltYieldRatesHeroVisualProps) {
  const yieldRates = useAppSelector((state) =>
    selectArticleGiltYieldComparisonRates(state, publicationDate ?? ""),
  );

  return (
    <ArticleVisualPanel
      eyebrow="Market rates"
      value="Yield rates"
      helperText={yieldRates.helperText}
      items={[
        { label: "UK 10-year gilt", value: yieldRates.ukFormattedValue, tone: "accent" },
        { label: "G7 average", value: yieldRates.g7FormattedValue },
        { label: "Bank Rate", value: yieldRates.bankRateFormattedValue },
      ]}
      accentColor="#b45309"
    />
  );
}
