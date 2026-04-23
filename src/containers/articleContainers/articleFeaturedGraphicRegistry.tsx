import type { ReactNode } from "react";
import type {
  ArticleData,
  ArticleFeaturedGraphicKey,
  ArticleVisualKey,
} from "@/data/articles/articleTypes";
import { resolveVisualSnapshotVersion } from "@/lib/publishedVisualVersion";
import BorrowingTimelineSectionContainer from "@/containers/borrowingContainers/BorrowingTimelineSectionContainer";
import BudgetComparisonSectionContainer from "@/containers/budgetContainers/BudgetComparisonSectionContainer";
import DebtInterestSectionContainer from "@/containers/debtInterestContainers/DebtInterestSectionContainer";
import DebtToGdpSectionContainer from "@/containers/debtToGdpContainers/DebtToGdpSectionContainer";
import GiltYieldPeerFeaturedGraphicContainer from "./GiltYieldPeerFeaturedGraphicContainer";
import GovernmentSpendingTopCategoriesFeaturedGraphicContainer from "./GovernmentSpendingTopCategoriesFeaturedGraphicContainer";

export interface ArticleFeaturedGraphicDefinition {
  heading?: string;
  subheading?: string;
  articleVisualKey?: ArticleVisualKey;
  render: (article?: ArticleData) => ReactNode;
}

export const articleFeaturedGraphicRegistry: Record<
  ArticleFeaturedGraphicKey,
  ArticleFeaturedGraphicDefinition
> = {
  borrowingTimeline: {
    render: (article) => (
      <BorrowingTimelineSectionContainer
        publicationDate={article?.date}
        snapshotDate={resolveVisualSnapshotVersion({
          contextSlug: "borrowing-over-time",
          assetSlug: "borrowing-over-time",
        })}
      />
    ),
  },
  debtToGdpSection: {
    render: (article) => (
      <DebtToGdpSectionContainer
        publicationDate={article?.date}
        snapshotDate={resolveVisualSnapshotVersion({
          contextSlug: "how-debt-to-gdp-works",
          assetSlug: "debt-to-gdp-over-time",
        })}
      />
    ),
  },
  debtInterestTimeline: {
    render: (article) => (
      <DebtInterestSectionContainer
        publicationDate={article?.date}
        snapshotDate={resolveVisualSnapshotVersion({
          contextSlug: "debt-interest-explained",
          assetSlug: "debt-interest-over-time",
        })}
      />
    ),
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
    articleVisualKey: "gilt-yield-peers",
    render: (article) => <GiltYieldPeerFeaturedGraphicContainer publicationDate={article?.date} />,
  },
};
