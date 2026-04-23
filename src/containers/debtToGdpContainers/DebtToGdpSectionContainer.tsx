"use client";

import DebtToGdpSection from "@/components/ui/debtToGdpSectionComponent/DebtToGdpSection";
import DebtToGdpLineChartContainer from "./DebtToGdpLineChartContainer";
import G7DebtComparisonContainer from "./G7DebtComparisonContainer";

export interface DebtToGdpSectionContainerProps {
  publicationDate?: string;
  snapshotDate: string;
}

export default function DebtToGdpSectionContainer({
  publicationDate,
  snapshotDate,
}: DebtToGdpSectionContainerProps) {
  return (
    <DebtToGdpSection
      leftCard={
        <DebtToGdpLineChartContainer
          publicationDate={publicationDate}
          snapshotDate={snapshotDate}
        />
      }
      rightCard={<G7DebtComparisonContainer publicationDate={publicationDate} />}
    />
  );
}
