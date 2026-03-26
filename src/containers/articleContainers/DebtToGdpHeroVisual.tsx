"use client";

import ArticleVisualPanel from "@/components/ui/articleVisualPanelComponent/ArticleVisualPanel";
import { useAppSelector } from "@/store/hooks";
import {
  selectArticleDebtToGdpMetric,
  selectArticleTotalDebtMetric,
} from "@/store/selectors/metricsSelectors";

export interface DebtToGdpHeroVisualProps {
  publicationDate?: string;
}

function formatTrillions(value: number) {
  return `\u00A3${(value / 1_000_000_000_000).toFixed(1)}T`;
}

export default function DebtToGdpHeroVisual({
  publicationDate,
}: DebtToGdpHeroVisualProps) {
  const debtMetric = useAppSelector((state) =>
    selectArticleTotalDebtMetric(state, publicationDate ?? ""),
  );
  const debtToGdpMetric = useAppSelector((state) =>
    selectArticleDebtToGdpMetric(state, publicationDate ?? ""),
  );

  const gdpNumericValue =
    debtToGdpMetric.numericValue > 0
      ? debtMetric.numericValue / (debtToGdpMetric.numericValue / 100)
      : 0;

  return (
    <ArticleVisualPanel
      eyebrow="Debt burden"
      title="Debt is easier to judge against the size of the economy"
      value="Ratio, not raw cash"
      helperText="The debt stock looks different when set against national income. That is why analysts use debt-to-GDP as a default framing tool."
      items={[
        { label: "Debt stock", value: debtMetric.formattedValue },
        { label: "GDP", value: formatTrillions(gdpNumericValue) },
        { label: "Debt / GDP", value: debtToGdpMetric.formattedValue, tone: "accent" },
      ]}
      accentColor="#1d4f91"
    />
  );
}
