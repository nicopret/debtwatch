"use client";

import DebtInterestSection from "@/components/ui/debtInterestSectionComponent/DebtInterestSection";
import DebtInterestLineChartContainer from "./DebtInterestLineChartContainer";
import DebtInterestSummaryContainer from "./DebtInterestSummaryContainer";

export default function DebtInterestSectionContainer() {
  return (
    <DebtInterestSection
      leftCard={<DebtInterestLineChartContainer />}
      rightCard={<DebtInterestSummaryContainer />}
    />
  );
}
