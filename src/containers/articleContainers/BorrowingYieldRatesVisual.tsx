"use client";

import ArticleVisualPanel from "@/components/ui/articleVisualPanelComponent/ArticleVisualPanel";
import { useAppSelector } from "@/store/hooks";
import {
  selectFiveYearGiltYieldFormattedValue,
  selectGiltYieldRatesHelperText,
  selectTenYearGiltYieldFormattedValue,
  selectTwentyYearGiltYieldFormattedValue,
} from "@/store/selectors/metricsSelectors";

export default function BorrowingYieldRatesVisual() {
  const fiveYearGiltYield = useAppSelector(selectFiveYearGiltYieldFormattedValue);
  const tenYearGiltYield = useAppSelector(selectTenYearGiltYieldFormattedValue);
  const twentyYearGiltYield = useAppSelector(selectTwentyYearGiltYieldFormattedValue);
  const helperText = useAppSelector(selectGiltYieldRatesHelperText);

  return (
    <ArticleVisualPanel
      eyebrow="Bond pricing"
      value="Yield rates"
      helperText={helperText}
      items={[
        { label: "5-year gilt", value: fiveYearGiltYield },
        { label: "10-year gilt", value: tenYearGiltYield, tone: "accent" },
        { label: "20-year gilt", value: twentyYearGiltYield },
      ]}
      accentColor="#b45309"
    />
  );
}
