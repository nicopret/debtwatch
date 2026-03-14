"use client";

import DebtToGdpLineChartCard from "@/components/ui/debtToGdpLineChartCardComponent/DebtToGdpLineChartCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectDebtToGdpGovernmentBands,
  selectDebtToGdpTimelinePoints,
} from "@/store/selectors/metricsSelectors";

export default function DebtToGdpLineChartContainer() {
  const points = useAppSelector(selectDebtToGdpTimelinePoints);
  const governmentBands = useAppSelector(selectDebtToGdpGovernmentBands);

  return (
    <DebtToGdpLineChartCard
      title="Debt vs GDP"
      subtitle="UK debt burden over time"
      points={points}
      governmentBands={governmentBands}
    />
  );
}
