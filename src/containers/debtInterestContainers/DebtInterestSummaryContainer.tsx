"use client";

import DebtInterestSummaryCard from "@/components/ui/debtInterestSummaryCardComponent/DebtInterestSummaryCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectDebtInterestGovernmentTotals,
  selectLatestAnnualDebtInterest,
} from "@/store/selectors/metricsSelectors";

export default function DebtInterestSummaryContainer() {
  const latest = useAppSelector(selectLatestAnnualDebtInterest);
  const governmentTotals = useAppSelector(selectDebtInterestGovernmentTotals);

  return (
    <DebtInterestSummaryCard
      title="Debt interest summary"
      latestValue={latest.formattedValue}
      latestYear={latest.year}
      governmentTotals={governmentTotals}
    />
  );
}
