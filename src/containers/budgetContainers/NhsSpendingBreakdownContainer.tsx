"use client";

import DonutBreakdownCard from "@/components/ui/donutBreakdownCardComponent/DonutBreakdownCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectArticleNhsSpendingBreakdown,
  selectNhsSpendingBreakdown,
} from "@/store/selectors/metricsSelectors";

export interface NhsSpendingBreakdownContainerProps {
  publicationDate?: string;
}

export default function NhsSpendingBreakdownContainer({
  publicationDate,
}: NhsSpendingBreakdownContainerProps) {
  const breakdown = useAppSelector((state) =>
    publicationDate
      ? selectArticleNhsSpendingBreakdown(state, publicationDate)
      : selectNhsSpendingBreakdown(state),
  );

  if (!breakdown) {
    return null;
  }

  return (
    <DonutBreakdownCard
      title={breakdown.title}
      subtitle={breakdown.subtitle}
      items={breakdown.items}
      totalValue={breakdown.totalFormattedValue}
      centerLabel="NHS spend"
    />
  );
}
