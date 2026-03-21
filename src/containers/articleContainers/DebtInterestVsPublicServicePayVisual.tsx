"use client";

import ArticleVisualPanel from "@/components/ui/articleVisualPanelComponent/ArticleVisualPanel";
import { useAppSelector } from "@/store/hooks";
import { selectDebtInterestVsPublicServicePay } from "@/store/selectors/metricsSelectors";

function formatBillions(value: number): string {
  return `\u00A3${value.toFixed(1)}bn`;
}

export default function DebtInterestVsPublicServicePayVisual() {
  const comparison = useAppSelector(selectDebtInterestVsPublicServicePay);

  return (
    <ArticleVisualPanel
      eyebrow="Opportunity cost"
      value="Debt interest vs public service pay"
      valueColor="#17315f"
      helperText={`${comparison.source} | ${comparison.dateValue} calendar year`}
      items={comparison.items.map((item) => ({
        label: item.label,
        value: formatBillions(item.value),
        preserveCase: true,
        labelTone: item.color === "amber" ? "amber" : "navy",
        valueTone: item.color === "amber" ? "amber" : "navy",
      }))}
      accentColor="#b86a1f"
    />
  );
}
