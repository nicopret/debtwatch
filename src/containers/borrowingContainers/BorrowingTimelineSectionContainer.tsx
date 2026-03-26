"use client";

import BorrowingTimelineSection from "@/components/ui/borrowingTimelineSectionComponent/BorrowingTimelineSection";
import AnnualBorrowingLineChartContainer from "./AnnualBorrowingLineChartContainer";
import BorrowingGovernmentSummaryContainer from "./BorrowingGovernmentSummaryContainer";

export interface BorrowingTimelineSectionContainerProps {
  publicationDate?: string;
}

export default function BorrowingTimelineSectionContainer({
  publicationDate,
}: BorrowingTimelineSectionContainerProps) {
  return (
    <BorrowingTimelineSection
      leftCard={<AnnualBorrowingLineChartContainer publicationDate={publicationDate} />}
      rightCard={<BorrowingGovernmentSummaryContainer publicationDate={publicationDate} />}
    />
  );
}
