"use client";

import BorrowingGovernmentSummaryCard from "@/components/ui/borrowingGovernmentSummaryCardComponent/BorrowingGovernmentSummaryCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectBorrowingGovernmentSummaries,
  selectBorrowingOverallPeak,
} from "@/store/selectors/metricsSelectors";

export default function BorrowingGovernmentSummaryContainer() {
  const governments = useAppSelector(selectBorrowingGovernmentSummaries);
  const peakYearSummary = useAppSelector(selectBorrowingOverallPeak);

  return (
    <BorrowingGovernmentSummaryCard
      title="Borrowing by government"
      governments={governments}
      peakYearSummary={peakYearSummary}
    />
  );
}
