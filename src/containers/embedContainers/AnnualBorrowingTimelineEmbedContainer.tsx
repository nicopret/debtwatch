"use client";

import AnnualBorrowingLineChartCard from "@/components/ui/annualBorrowingLineChartCardComponent/AnnualBorrowingLineChartCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectAnnualBorrowingTimelinePoints,
  selectBorrowingGovernmentBands,
} from "@/store/selectors/metricsSelectors";

export default function AnnualBorrowingTimelineEmbedContainer() {
  const points = useAppSelector(selectAnnualBorrowingTimelinePoints);
  const governmentBands = useAppSelector(selectBorrowingGovernmentBands);

  return (
    <AnnualBorrowingLineChartCard
      title="Borrowing over time"
      subtitle="Annual UK borrowing"
      points={points}
      governmentBands={governmentBands}
    />
  );
}
