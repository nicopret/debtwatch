import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RelatedArticles from "./RelatedArticles";
import BorrowingArticlePreviewGraphic from "../borrowingArticlePreviewGraphicComponent/BorrowingArticlePreviewGraphic";

const meta = {
  title: "UI/RelatedArticles",
  component: RelatedArticles,
  args: {
    items: [
      {
        slug: "debt-interest-explained",
        title: "Debt interest explained",
        tagline: "Budget pressure",
      },
      {
        slug: "how-debt-to-gdp-works",
        title: "How debt-to-GDP works",
        tagline: "Context",
      },
      {
        slug: "where-government-money-goes",
        title: "Where government money goes",
        tagline: "Budget composition",
      },
      {
        slug: "borrowing-over-time",
        title: "Borrowing over time",
        tagline: "Historical view",
        previewGraphic: <BorrowingArticlePreviewGraphic />,
      },
      {
        slug: "why-gilt-yields-matter",
        title: "Why gilt yields matter",
        tagline: "Market signal",
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="site-container" style={{ paddingBlock: "1rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RelatedArticles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
