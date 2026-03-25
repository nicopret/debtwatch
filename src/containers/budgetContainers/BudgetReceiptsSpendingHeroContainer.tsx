"use client";

import BudgetReceiptsSpendingHeroChart from "@/components/ui/budgetReceiptsSpendingHeroChartComponent/BudgetReceiptsSpendingHeroChart";
import { useAppSelector } from "@/store/hooks";
import { selectBudgetReceiptsSpendingTimeline } from "@/store/selectors/metricsSelectors";

export default function BudgetReceiptsSpendingHeroContainer() {
  const timeline = useAppSelector(selectBudgetReceiptsSpendingTimeline);

  return (
    <BudgetReceiptsSpendingHeroChart
      title={timeline.title}
      subtitle={timeline.subtitle}
      points={timeline.items}
    />
  );
}
