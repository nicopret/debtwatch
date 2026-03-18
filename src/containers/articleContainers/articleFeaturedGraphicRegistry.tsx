import type { ReactNode } from "react";
import type { ArticleFeaturedGraphicKey } from "@/data/articles/articleTypes";
import BorrowingTimelineSectionContainer from "@/containers/borrowingContainers/BorrowingTimelineSectionContainer";
import BudgetComparisonSectionContainer from "@/containers/budgetContainers/BudgetComparisonSectionContainer";
import DebtInterestSectionContainer from "@/containers/debtInterestContainers/DebtInterestSectionContainer";
import DebtToGdpSectionContainer from "@/containers/debtToGdpContainers/DebtToGdpSectionContainer";

export interface ArticleFeaturedGraphicDefinition {
  heading: string;
  subheading: string;
  render: () => ReactNode;
}

export const articleFeaturedGraphicRegistry: Record<
  ArticleFeaturedGraphicKey,
  ArticleFeaturedGraphicDefinition
> = {
  borrowingTimeline: {
    heading: "Borrowing in the dashboard",
    subheading: "The same borrowing-over-time section appears here to keep the article and homepage in sync.",
    render: () => <BorrowingTimelineSectionContainer />,
  },
  debtToGdpSection: {
    heading: "Debt vs GDP in the dashboard",
    subheading: "This is the same debt-to-GDP section readers see on the main DebtWatch landing page.",
    render: () => <DebtToGdpSectionContainer />,
  },
  debtInterestTimeline: {
    heading: "Debt interest in the dashboard",
    subheading: "The article reuses the landing-page debt-interest section for continuity.",
    render: () => <DebtInterestSectionContainer />,
  },
  budgetComparison: {
    heading: "Government income vs spending",
    subheading: "The article reuses the main budget comparison section rather than repeating the chart logic.",
    render: () => <BudgetComparisonSectionContainer />,
  },
};
