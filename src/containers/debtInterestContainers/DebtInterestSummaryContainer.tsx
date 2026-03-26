"use client";

import DebtInterestSummaryCard from "@/components/ui/debtInterestSummaryCardComponent/DebtInterestSummaryCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectArticleDebtInterestSummary,
  selectDebtInterestGovernmentTotals,
  selectLatestAnnualDebtInterest,
} from "@/store/selectors/metricsSelectors";

export interface DebtInterestSummaryContainerProps {
  publicationDate?: string;
}

export default function DebtInterestSummaryContainer({
  publicationDate,
}: DebtInterestSummaryContainerProps) {
  const articleSummary = useAppSelector((state) =>
    publicationDate ? selectArticleDebtInterestSummary(state, publicationDate) : null,
  );
  const latest = useAppSelector(selectLatestAnnualDebtInterest);
  const governmentTotals = useAppSelector(selectDebtInterestGovernmentTotals);

  return (
    <DebtInterestSummaryCard
      title="Debt interest summary"
      latestValue={articleSummary?.latestValue ?? latest.formattedValue}
      latestYear={articleSummary?.latestYear ?? latest.year}
      governmentTotals={articleSummary?.governmentTotals ?? governmentTotals}
    />
  );
}
