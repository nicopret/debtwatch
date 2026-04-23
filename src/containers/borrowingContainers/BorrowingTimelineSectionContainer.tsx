"use client";

import BorrowingTimelineSection from "@/components/ui/borrowingTimelineSectionComponent/BorrowingTimelineSection";
import AnnualBorrowingLineChartContainer from "./AnnualBorrowingLineChartContainer";
import BorrowingGovernmentSummaryContainer from "./BorrowingGovernmentSummaryContainer";

export interface BorrowingTimelineSectionContainerProps {
  publicationDate?: string;
  snapshotDate: string;
}

export default function BorrowingTimelineSectionContainer({
  publicationDate,
  snapshotDate,
}: BorrowingTimelineSectionContainerProps) {
  return (
    <BorrowingTimelineSection
      leftCard={
        <AnnualBorrowingLineChartContainer
          publicationDate={publicationDate}
          snapshotDate={snapshotDate}
        />
      }
      rightCard={<BorrowingGovernmentSummaryContainer publicationDate={publicationDate} />}
    />
  );
}
