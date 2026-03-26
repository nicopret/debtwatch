import type { ReactNode } from "react";
import type {
  ArticleData,
  ArticleFeaturedGraphicKey,
} from "@/data/articles/articleTypes";
import BorrowingTimelineSectionContainer from "@/containers/borrowingContainers/BorrowingTimelineSectionContainer";
import BudgetComparisonSectionContainer from "@/containers/budgetContainers/BudgetComparisonSectionContainer";
import DebtInterestSectionContainer from "@/containers/debtInterestContainers/DebtInterestSectionContainer";
import DebtToGdpSectionContainer from "@/containers/debtToGdpContainers/DebtToGdpSectionContainer";
import GiltYieldPeerFeaturedGraphicContainer from "./GiltYieldPeerFeaturedGraphicContainer";
import GovernmentSpendingTopCategoriesFeaturedGraphicContainer from "./GovernmentSpendingTopCategoriesFeaturedGraphicContainer";

export interface ArticleFeaturedGraphicDefinition {
  heading?: string;
  subheading?: string;
  render: (article?: ArticleData) => ReactNode;
}

export const articleFeaturedGraphicRegistry: Record<
  ArticleFeaturedGraphicKey,
  ArticleFeaturedGraphicDefinition
> = {
  borrowingTimeline: {
    render: (article) => <BorrowingTimelineSectionContainer publicationDate={article?.date} />,
  },
  debtToGdpSection: {
    render: (article) => <DebtToGdpSectionContainer publicationDate={article?.date} />,
  },
  debtInterestTimeline: {
    render: (article) => <DebtInterestSectionContainer publicationDate={article?.date} />,
  },
  budgetComparison: {
    render: () => <BudgetComparisonSectionContainer />,
  },
  governmentSpendingTopCategories: {
    render: (article) => (
      <GovernmentSpendingTopCategoriesFeaturedGraphicContainer publicationDate={article?.date} />
    ),
  },
  giltYieldPeers: {
    render: (article) => <GiltYieldPeerFeaturedGraphicContainer publicationDate={article?.date} />,
  },
};
