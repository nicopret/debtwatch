"use client";

import BudgetReceiptsSpendingHeroChart from "@/components/ui/budgetReceiptsSpendingHeroChartComponent/BudgetReceiptsSpendingHeroChart";
import { useAppSelector } from "@/store/hooks";
import {
  selectArticleBudgetReceiptsSpendingTimeline,
  selectBudgetReceiptsSpendingTimeline,
} from "@/store/selectors/metricsSelectors";

export interface BudgetReceiptsSpendingHeroContainerProps {
  publicationDate?: string;
}

export default function BudgetReceiptsSpendingHeroContainer({
  publicationDate,
}: BudgetReceiptsSpendingHeroContainerProps) {
  const timeline = useAppSelector((state) =>
    publicationDate
      ? selectArticleBudgetReceiptsSpendingTimeline(state, publicationDate)
      : selectBudgetReceiptsSpendingTimeline(state),
  );

  if (!timeline) {
    return null;
  }

  return (
    <BudgetReceiptsSpendingHeroChart
      title={timeline.title}
      subtitle={timeline.subtitle}
      points={timeline.items}
    />
  );
}
