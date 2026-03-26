"use client";

import DebtToGdpSection from "@/components/ui/debtToGdpSectionComponent/DebtToGdpSection";
import DebtToGdpLineChartContainer from "./DebtToGdpLineChartContainer";
import G7DebtComparisonContainer from "./G7DebtComparisonContainer";

export interface DebtToGdpSectionContainerProps {
  publicationDate?: string;
}

export default function DebtToGdpSectionContainer({
  publicationDate,
}: DebtToGdpSectionContainerProps) {
  return (
    <DebtToGdpSection
      leftCard={<DebtToGdpLineChartContainer publicationDate={publicationDate} />}
      rightCard={<G7DebtComparisonContainer publicationDate={publicationDate} />}
    />
  );
}
