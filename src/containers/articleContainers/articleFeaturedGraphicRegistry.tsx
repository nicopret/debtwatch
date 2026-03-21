import type { ReactNode } from "react";
import type { ArticleFeaturedGraphicKey } from "@/data/articles/articleTypes";
import BorrowingTimelineSectionContainer from "@/containers/borrowingContainers/BorrowingTimelineSectionContainer";
import BudgetComparisonSectionContainer from "@/containers/budgetContainers/BudgetComparisonSectionContainer";
import DebtInterestSectionContainer from "@/containers/debtInterestContainers/DebtInterestSectionContainer";
import DebtToGdpSectionContainer from "@/containers/debtToGdpContainers/DebtToGdpSectionContainer";

export interface ArticleFeaturedGraphicDefinition {
  heading?: string;
  subheading?: string;
  render: () => ReactNode;
}

export const articleFeaturedGraphicRegistry: Record<
  ArticleFeaturedGraphicKey,
  ArticleFeaturedGraphicDefinition
> = {
  borrowingTimeline: {
    render: () => <BorrowingTimelineSectionContainer />,
  },
  debtToGdpSection: {
    render: () => <DebtToGdpSectionContainer />,
  },
  debtInterestTimeline: {
    render: () => <DebtInterestSectionContainer />,
  },
  budgetComparison: {
    render: () => <BudgetComparisonSectionContainer />,
  },
};
