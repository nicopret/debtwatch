"use client";

import ArticleVisualPanel from "@/components/ui/articleVisualPanelComponent/ArticleVisualPanel";
import { useAppSelector } from "@/store/hooks";
import {
  selectArticleG7YieldComparison,
  selectG7YieldComparison,
} from "@/store/selectors/metricsSelectors";

export interface G7YieldComparisonVisualProps {
  publicationDate?: string;
}

export default function G7YieldComparisonVisual({
  publicationDate,
}: G7YieldComparisonVisualProps) {
  const comparison = useAppSelector((state) =>
    publicationDate
      ? selectArticleG7YieldComparison(state, publicationDate)
      : selectG7YieldComparison(state),
  );

  if (!comparison) {
    return null;
  }

  return (
    <ArticleVisualPanel
      eyebrow="Peer comparison"
      value="G7 borrowing costs"
      valueColor="#17315f"
      helperText={`${comparison.source} | ${comparison.period}`}
      items={comparison.items.map((item) => ({
        label: item.label,
        value: item.formattedValue,
        preserveCase: true,
        labelTone: item.highlight ? "amber" : "neutral",
        valueTone: item.highlight ? "amber" : "neutral",
      }))}
      accentColor="#b86a1f"
    />
  );
}
