"use client";

import AnnualBorrowingLineChartCard from "@/components/ui/annualBorrowingLineChartCardComponent/AnnualBorrowingLineChartCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectArticleAnnualBorrowingTimelinePoints,
  selectArticleBorrowingGovernmentBands,
  selectAnnualBorrowingTimelinePoints,
  selectBorrowingGovernmentBands,
} from "@/store/selectors/metricsSelectors";

export interface AnnualBorrowingLineChartContainerProps {
  publicationDate?: string;
  snapshotDate: string;
}

export default function AnnualBorrowingLineChartContainer({
  publicationDate,
  snapshotDate,
}: AnnualBorrowingLineChartContainerProps) {
  const points = useAppSelector((state) =>
    publicationDate
      ? selectArticleAnnualBorrowingTimelinePoints(state, publicationDate)
      : selectAnnualBorrowingTimelinePoints(state),
  );
  const governmentBands = useAppSelector((state) =>
    publicationDate
      ? selectArticleBorrowingGovernmentBands(state, publicationDate)
      : selectBorrowingGovernmentBands(state),
  );
  return (
    <AnnualBorrowingLineChartCard
      title="Borrowing over time"
      subtitle="Annual UK borrowing with government periods"
      points={points}
      governmentBands={governmentBands}
      embedAction={{
        chartTitle: "Borrowing over time",
        contextSlug: "borrowing-over-time",
        embedSlug: "borrowing-over-time",
        snapshotDate,
        articleUrl: "https://debtwatch.uk/articles/borrowing-over-time",
        socialUrl: "https://debtwatch.uk/articles/borrowing-over-time",
        shareText: "Borrowing is the gap between what the government spends and what it raises.",
      }}
    />
  );
}
