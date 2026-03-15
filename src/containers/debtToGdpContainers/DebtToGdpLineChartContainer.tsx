"use client";

import DebtToGdpLineChartCard from "@/components/ui/debtToGdpLineChartCardComponent/DebtToGdpLineChartCard";
import { getUtcDateFolderName } from "@/lib/versioning";
import { useAppSelector } from "@/store/hooks";
import {
  selectDebtToGdpGovernmentBands,
  selectDebtToGdpTimelinePoints,
} from "@/store/selectors/metricsSelectors";

export default function DebtToGdpLineChartContainer() {
  const points = useAppSelector(selectDebtToGdpTimelinePoints);
  const governmentBands = useAppSelector(selectDebtToGdpGovernmentBands);
  const snapshotDate = getUtcDateFolderName(new Date());

  return (
    <DebtToGdpLineChartCard
      title="Debt vs GDP"
      subtitle="UK debt burden over time"
      points={points}
      governmentBands={governmentBands}
      embedAction={{
        chartTitle: "Debt vs GDP",
        contextSlug: "how-debt-to-gdp-works",
        embedSlug: "debt-to-gdp-over-time",
        snapshotDate,
      }}
    />
  );
}
