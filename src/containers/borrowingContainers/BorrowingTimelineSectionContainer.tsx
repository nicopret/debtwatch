"use client";

import BorrowingTimelineSection from "@/components/ui/borrowingTimelineSectionComponent/BorrowingTimelineSection";
import AnnualBorrowingLineChartContainer from "./AnnualBorrowingLineChartContainer";
import BorrowingGovernmentSummaryContainer from "./BorrowingGovernmentSummaryContainer";

export default function BorrowingTimelineSectionContainer() {
  return (
    <BorrowingTimelineSection
      leftCard={<AnnualBorrowingLineChartContainer />}
      rightCard={<BorrowingGovernmentSummaryContainer />}
    />
  );
}
