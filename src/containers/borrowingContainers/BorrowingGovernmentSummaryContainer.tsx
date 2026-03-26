"use client";

import BorrowingGovernmentSummaryCard from "@/components/ui/borrowingGovernmentSummaryCardComponent/BorrowingGovernmentSummaryCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectArticleBorrowingByGovernmentSummary,
  selectBorrowingGovernmentSummaries,
  selectBorrowingOverallPeak,
} from "@/store/selectors/metricsSelectors";

export interface BorrowingGovernmentSummaryContainerProps {
  publicationDate?: string;
}

export default function BorrowingGovernmentSummaryContainer({
  publicationDate,
}: BorrowingGovernmentSummaryContainerProps) {
  const articleSummary = useAppSelector((state) =>
    publicationDate ? selectArticleBorrowingByGovernmentSummary(state, publicationDate) : null,
  );
  const governments = useAppSelector(selectBorrowingGovernmentSummaries);
  const peakYearSummary = useAppSelector(selectBorrowingOverallPeak);

  return (
    <BorrowingGovernmentSummaryCard
      title="Borrowing by government"
      governments={articleSummary?.governments ?? governments}
      peakYearSummary={articleSummary?.overallPeak ?? peakYearSummary}
    />
  );
}
