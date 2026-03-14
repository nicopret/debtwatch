"use client";

import DebtInterestSummaryCard from "@/components/ui/debtInterestSummaryCardComponent/DebtInterestSummaryCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectAverageAnnualDebtInterest,
  selectDebtInterestGovernmentTotals,
  selectDebtInterestLatestVsAverage,
  selectDebtInterestPeakAmount,
  selectDebtInterestPeakGovernment,
  selectDebtInterestPeakYear,
  selectLatestAnnualDebtInterest,
} from "@/store/selectors/metricsSelectors";

export default function DebtInterestSummaryContainer() {
  const latest = useAppSelector(selectLatestAnnualDebtInterest);
  const peakYear = useAppSelector(selectDebtInterestPeakYear);
  const peakAmount = useAppSelector(selectDebtInterestPeakAmount);
  const peakGovernment = useAppSelector(selectDebtInterestPeakGovernment);
  const average = useAppSelector(selectAverageAnnualDebtInterest);
  const latestVsAverage = useAppSelector(selectDebtInterestLatestVsAverage);
  const governmentTotals = useAppSelector(selectDebtInterestGovernmentTotals);

  return (
    <DebtInterestSummaryCard
      title="Debt interest summary"
      latestValue={latest.formattedValue}
      latestYear={latest.year}
      peakYear={peakYear}
      peakAmount={peakAmount.formattedValue}
      peakGovernment={peakGovernment.governmentLabel}
      averageValue={average.formattedValue}
      latestVsAverage={latestVsAverage.formattedDifference}
      latestVsAveragePercent={latestVsAverage.formattedPercentageDifference}
      governmentTotals={governmentTotals}
    />
  );
}
