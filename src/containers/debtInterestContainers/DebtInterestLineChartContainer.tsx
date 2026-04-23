"use client";

import DebtInterestLineChartCard from "@/components/ui/debtInterestLineChartCardComponent/DebtInterestLineChartCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectArticleDebtInterestGovernmentBands,
  selectArticleDebtInterestTimelinePoints,
  selectDebtInterestGovernmentBands,
  selectDebtInterestTimelinePoints,
} from "@/store/selectors/metricsSelectors";

export interface DebtInterestLineChartContainerProps {
  publicationDate?: string;
  snapshotDate: string;
}

export default function DebtInterestLineChartContainer({
  publicationDate,
  snapshotDate,
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
        socialUrl: "https://debtwatch.uk/articles/debt-interest-explained",
        shareText: "Annual cost of servicing government debt,\n\nDebt interest over time",
      }}
    />
  );
}
