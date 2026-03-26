"use client";

import DebtInterestLineChartCard from "@/components/ui/debtInterestLineChartCardComponent/DebtInterestLineChartCard";
import { getUtcDateFolderName } from "@/lib/versioning";
import { useAppSelector } from "@/store/hooks";
import {
  selectArticleDebtInterestGovernmentBands,
  selectArticleDebtInterestTimelinePoints,
  selectDebtInterestGovernmentBands,
  selectDebtInterestTimelinePoints,
} from "@/store/selectors/metricsSelectors";

export interface DebtInterestLineChartContainerProps {
  publicationDate?: string;
}

export default function DebtInterestLineChartContainer({
  publicationDate,
}: DebtInterestLineChartContainerProps) {
  const points = useAppSelector((state) =>
    publicationDate
      ? selectArticleDebtInterestTimelinePoints(state, publicationDate)
      : selectDebtInterestTimelinePoints(state),
  );
  const governmentBands = useAppSelector((state) =>
    publicationDate
      ? selectArticleDebtInterestGovernmentBands(state, publicationDate)
      : selectDebtInterestGovernmentBands(state),
  );
  const snapshotDate = getUtcDateFolderName(new Date());

  return (
    <DebtInterestLineChartCard
      title="Debt interest over time"
      subtitle="Annual cost of servicing government debt"
      points={points}
      governmentBands={governmentBands}
      embedAction={{
        chartTitle: "Debt interest over time",
        contextSlug: "debt-interest-explained",
        embedSlug: "debt-interest-over-time",
        snapshotDate,
        articleUrl: "https://debtwatch.uk/articles/debt-interest-explained",
        shareText: "Annual cost of servicing government debt,\n\nDebt interest over time",
      }}
    />
  );
}
