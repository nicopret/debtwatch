"use client";

import DebtInterestSection from "@/components/ui/debtInterestSectionComponent/DebtInterestSection";
import DebtInterestLineChartContainer from "./DebtInterestLineChartContainer";
import DebtInterestSummaryContainer from "./DebtInterestSummaryContainer";

export interface DebtInterestSectionContainerProps {
  publicationDate?: string;
}

export default function DebtInterestSectionContainer({
  publicationDate,
}: DebtInterestSectionContainerProps) {
  return (
    <DebtInterestSection
      leftCard={<DebtInterestLineChartContainer publicationDate={publicationDate} />}
      rightCard={<DebtInterestSummaryContainer publicationDate={publicationDate} />}
    />
  );
}
