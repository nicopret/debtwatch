"use client";

import DebtToGdpLineChartCard from "@/components/ui/debtToGdpLineChartCardComponent/DebtToGdpLineChartCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectArticleDebtToGdpGovernmentBands,
  selectArticleDebtToGdpTimelinePoints,
  selectDebtToGdpGovernmentBands,
  selectDebtToGdpTimelinePoints,
} from "@/store/selectors/metricsSelectors";

export interface DebtToGdpLineChartContainerProps {
  publicationDate?: string;
  snapshotDate: string;
}

export default function DebtToGdpLineChartContainer({
  publicationDate,
  snapshotDate,
}: DebtToGdpLineChartContainerProps) {
  const points = useAppSelector((state) =>
    publicationDate
      ? selectArticleDebtToGdpTimelinePoints(state, publicationDate)
      : selectDebtToGdpTimelinePoints(state),
  );
  const governmentBands = useAppSelector((state) =>
    publicationDate
      ? selectArticleDebtToGdpGovernmentBands(state, publicationDate)
      : selectDebtToGdpGovernmentBands(state),
  );
  return (
    <DebtToGdpLineChartCard
      title="Debt vs GDP"
      subtitle="UK debt burden over time"
      points={points}
      governmentBands={governmentBands}
      embedAction={{
        chartTitle: "Debt vs GDP",
        contextSlug: "how-debt-to-gdp-works",
        embedSlug: "debt-to-gdp-over-time",
        snapshotDate,
        articleUrl: "https://debtwatch.uk/articles/how-debt-to-gdp-works",
        socialUrl: "https://debtwatch.uk/articles/how-debt-to-gdp-works",
        shareText: "Debt-to-GDP shows the burden of debt relative to the size of the economy.",
      }}
    />
  );
}
