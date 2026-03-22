"use client";

import ArticleVisualPanel from "@/components/ui/articleVisualPanelComponent/ArticleVisualPanel";
import { useAppSelector } from "@/store/hooks";
import { selectInflationLinkedDebtExposure } from "@/store/selectors/metricsSelectors";

function formatItemValue(value: number, unit: "percent" | "gbp_billions"): string {
  if (unit === "percent") {
    return `${value.toFixed(1)}%`;
  }

  return `\u00A3${value.toFixed(1)}bn`;
}

export default function InflationLinkedDebtExposureVisual() {
  const exposure = useAppSelector(selectInflationLinkedDebtExposure);

  return (
    <ArticleVisualPanel
      eyebrow="Inflation linkage"
      value="Inflation-linked debt exposure"
      valueColor="#17315f"
      helperText={`${exposure.source} | ${exposure.period} data`}
      items={exposure.items.map((item) => ({
        label: item.label,
        value: formatItemValue(item.value, item.unit),
        preserveCase: true,
        labelTone: item.color === "amber" ? "amber" : "navy",
        valueTone: item.color === "amber" ? "amber" : "navy",
      }))}
      accentColor="#b86a1f"
    />
  );
}
