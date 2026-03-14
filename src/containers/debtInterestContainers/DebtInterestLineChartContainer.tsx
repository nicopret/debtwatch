"use client";

import DebtInterestLineChartCard from "@/components/ui/debtInterestLineChartCardComponent/DebtInterestLineChartCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectDebtInterestGovernmentBands,
  selectDebtInterestTimelinePoints,
} from "@/store/selectors/metricsSelectors";

export default function DebtInterestLineChartContainer() {
  const points = useAppSelector(selectDebtInterestTimelinePoints);
  const governmentBands = useAppSelector(selectDebtInterestGovernmentBands);

  return (
    <DebtInterestLineChartCard
      title="Debt interest over time"
      subtitle="Annual cost of servicing government debt"
      points={points}
      governmentBands={governmentBands}
    />
  );
}
