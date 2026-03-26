"use client";

import ArticleVisualPanel from "@/components/ui/articleVisualPanelComponent/ArticleVisualPanel";
import { useAppSelector } from "@/store/hooks";
import { selectArticleGiltYieldRates } from "@/store/selectors/metricsSelectors";

export interface BorrowingYieldRatesVisualProps {
  publicationDate?: string;
}

export default function BorrowingYieldRatesVisual({
  publicationDate,
}: BorrowingYieldRatesVisualProps) {
  const yieldRates = useAppSelector((state) =>
    selectArticleGiltYieldRates(state, publicationDate ?? ""),
  );

  return (
    <ArticleVisualPanel
      eyebrow="Bond pricing"
      value="Yield rates"
      helperText={yieldRates.helperText}
      items={[
        { label: "5-year gilt", value: yieldRates.fiveYearFormattedValue },
        { label: "10-year gilt", value: yieldRates.tenYearFormattedValue, tone: "accent" },
        { label: "20-year gilt", value: yieldRates.twentyYearFormattedValue },
      ]}
      accentColor="#b45309"
    />
  );
}
