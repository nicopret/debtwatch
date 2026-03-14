"use client";

import DebtToGdpSection from "@/components/ui/debtToGdpSectionComponent/DebtToGdpSection";
import DebtToGdpLineChartContainer from "./DebtToGdpLineChartContainer";
import G7DebtComparisonContainer from "./G7DebtComparisonContainer";

export default function DebtToGdpSectionContainer() {
  return (
    <DebtToGdpSection
      leftCard={<DebtToGdpLineChartContainer />}
      rightCard={<G7DebtComparisonContainer />}
    />
  );
}
