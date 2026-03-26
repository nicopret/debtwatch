"use client";

import AnnualBorrowingLineChartCard from "@/components/ui/annualBorrowingLineChartCardComponent/AnnualBorrowingLineChartCard";
import { getUtcDateFolderName } from "@/lib/versioning";
import { useAppSelector } from "@/store/hooks";
import {
  selectArticleAnnualBorrowingTimelinePoints,
  selectArticleBorrowingGovernmentBands,
  selectAnnualBorrowingTimelinePoints,
  selectBorrowingGovernmentBands,
} from "@/store/selectors/metricsSelectors";

export interface AnnualBorrowingLineChartContainerProps {
  publicationDate?: string;
}

export default function AnnualBorrowingLineChartContainer({
  publicationDate,
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
  const snapshotDate = getUtcDateFolderName(new Date());

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
      }}
    />
  );
}
