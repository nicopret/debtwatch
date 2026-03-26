"use client";

import GovernmentSpendingTopCategoriesCard from "@/components/ui/governmentSpendingTopCategoriesCardComponent/GovernmentSpendingTopCategoriesCard";
import { useAppSelector } from "@/store/hooks";
import {
  selectArticleGovernmentSpendingTopCategories,
  selectGovernmentSpendingTopCategories,
} from "@/store/selectors/metricsSelectors";

export interface GovernmentSpendingTopCategoriesContainerProps {
  publicationDate?: string;
}

export default function GovernmentSpendingTopCategoriesContainer({
  publicationDate,
}: GovernmentSpendingTopCategoriesContainerProps) {
  const chart = useAppSelector((state) =>
    publicationDate
      ? selectArticleGovernmentSpendingTopCategories(state, publicationDate)
      : selectGovernmentSpendingTopCategories(state),
  );

  if (!chart) {
    return null;
  }

  return (
    <GovernmentSpendingTopCategoriesCard
      title={chart.title}
      subtitle={chart.subtitle}
      items={chart.items}
    />
  );
}
