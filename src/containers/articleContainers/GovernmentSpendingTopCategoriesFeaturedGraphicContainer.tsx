"use client";

import GovernmentSpendingTopCategoriesContainer from "@/containers/budgetContainers/GovernmentSpendingTopCategoriesContainer";

export interface GovernmentSpendingTopCategoriesFeaturedGraphicContainerProps {
  publicationDate?: string;
}

export default function GovernmentSpendingTopCategoriesFeaturedGraphicContainer({
  publicationDate,
}: GovernmentSpendingTopCategoriesFeaturedGraphicContainerProps) {
  return <GovernmentSpendingTopCategoriesContainer publicationDate={publicationDate} />;
}
