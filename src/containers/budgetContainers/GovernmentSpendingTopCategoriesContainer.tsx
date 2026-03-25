"use client";

import GovernmentSpendingTopCategoriesCard from "@/components/ui/governmentSpendingTopCategoriesCardComponent/GovernmentSpendingTopCategoriesCard";
import { useAppSelector } from "@/store/hooks";
import { selectGovernmentSpendingTopCategories } from "@/store/selectors/metricsSelectors";

export default function GovernmentSpendingTopCategoriesContainer() {
  const chart = useAppSelector(selectGovernmentSpendingTopCategories);

  return (
    <GovernmentSpendingTopCategoriesCard
      title={chart.title}
      subtitle={chart.subtitle}
      items={chart.items}
    />
  );
}
