"use client";

import DebtInterestLineChartCard from "@/components/ui/debtInterestLineChartCardComponent/DebtInterestLineChartCard";
import { getUtcDateFolderName } from "@/lib/versioning";
import { useAppSelector } from "@/store/hooks";
import {
  selectDebtInterestGovernmentBands,
  selectDebtInterestTimelinePoints,
} from "@/store/selectors/metricsSelectors";

export default function DebtInterestLineChartContainer() {
  const points = useAppSelector(selectDebtInterestTimelinePoints);
  const governmentBands = useAppSelector(selectDebtInterestGovernmentBands);
  const snapshotDate = getUtcDateFolderName(new Date());

  return (
    <DebtInterestLineChartCard
      title="Debt interest over time"
      subtitle="Annual cost of servicing government debt"
      points={points}
      governmentBands={governmentBands}
      embedAction={{
        chartTitle: "Debt interest over time",
        contextSlug: "debt-interest-explained",
        embedSlug: "debt-interest-over-time",
        snapshotDate,
      }}
    />
  );
}
