"use client";

import DebtInterestSection from "@/components/ui/debtInterestSectionComponent/DebtInterestSection";
import DebtInterestLineChartContainer from "./DebtInterestLineChartContainer";
import DebtInterestSummaryContainer from "./DebtInterestSummaryContainer";

export interface DebtInterestSectionContainerProps {
  publicationDate?: string;
  snapshotDate: string;
}

export default function DebtInterestSectionContainer({
  publicationDate,
  snapshotDate,
}: DebtInterestSectionContainerProps) {
  return (
    <DebtInterestSection
      leftCard={
        <DebtInterestLineChartContainer
          publicationDate={publicationDate}
          snapshotDate={snapshotDate}
        />
      }
      rightCard={<DebtInterestSummaryContainer publicationDate={publicationDate} />}
    />
  );
}
