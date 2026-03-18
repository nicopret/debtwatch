"use client";

import ArticleVisualPanel from "@/components/ui/articleVisualPanelComponent/ArticleVisualPanel";
import { useAppSelector } from "@/store/hooks";
import type { RootState } from "@/store";

function formatPercent(value: number): string {
  return `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;
}

export default function DebtOwnershipBreakdownVisual() {
  const breakdown = useAppSelector((state: RootState) => state.metrics.debtOwnershipBreakdown);

  return (
    <ArticleVisualPanel
      eyebrow="Debt ownership"
      value="Who owns UK debt?"
      valueColor="#17315f"
      helperText={`${breakdown.source} | ${breakdown.dateValue}`}
      items={breakdown.items
        .filter((item) => item.key !== "governments")
        .map((item) => ({
          label: item.label,
          value: formatPercent(item.value),
          labelTone:
            item.key === "international_investors" ? "amber" :
            item.key === "central_bank" ? "green" :
            "neutral",
          valueTone:
            item.key === "international_investors" ? "amber" :
            item.key === "central_bank" ? "green" :
            "neutral",
        }))}
      accentColor="#0f766e"
    />
  );
}
