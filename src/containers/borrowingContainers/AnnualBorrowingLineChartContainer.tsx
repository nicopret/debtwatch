"use client";

import AnnualBorrowingLineChartCard from "@/components/ui/annualBorrowingLineChartCardComponent/AnnualBorrowingLineChartCard";
import { getUtcDateFolderName } from "@/lib/versioning";
import { useAppSelector } from "@/store/hooks";
import {
  selectAnnualBorrowingTimelinePoints,
  selectBorrowingGovernmentBands,
} from "@/store/selectors/metricsSelectors";

export default function AnnualBorrowingLineChartContainer() {
  const points = useAppSelector(selectAnnualBorrowingTimelinePoints);
  const governmentBands = useAppSelector(selectBorrowingGovernmentBands);
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
