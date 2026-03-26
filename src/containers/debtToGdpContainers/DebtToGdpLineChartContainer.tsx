"use client";

import DebtToGdpLineChartCard from "@/components/ui/debtToGdpLineChartCardComponent/DebtToGdpLineChartCard";
import { getUtcDateFolderName } from "@/lib/versioning";
import { useAppSelector } from "@/store/hooks";
import {
  selectArticleDebtToGdpGovernmentBands,
  selectArticleDebtToGdpTimelinePoints,
  selectDebtToGdpGovernmentBands,
  selectDebtToGdpTimelinePoints,
} from "@/store/selectors/metricsSelectors";

export interface DebtToGdpLineChartContainerProps {
  publicationDate?: string;
}

export default function DebtToGdpLineChartContainer({
  publicationDate,
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
  const snapshotDate = getUtcDateFolderName(new Date());

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
      }}
    />
  );
}
