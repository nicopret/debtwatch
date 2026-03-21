"use client";

import ArticleVisualPanel from "@/components/ui/articleVisualPanelComponent/ArticleVisualPanel";
import { useAppSelector } from "@/store/hooks";
import { selectG7YieldComparison } from "@/store/selectors/metricsSelectors";

export default function G7YieldComparisonVisual() {
  const comparison = useAppSelector(selectG7YieldComparison);

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
