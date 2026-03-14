import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RelatedArticles from "./RelatedArticles";

const meta = {
  title: "UI/RelatedArticles",
  component: RelatedArticles,
  args: {
    items: [
      {
        slug: "debt-interest-explained",
        title: "Debt interest explained",
        tagline: "Budget pressure",
        description: "Why the yearly cost of servicing debt matters.",
      },
      {
        slug: "how-debt-to-gdp-works",
        title: "How debt-to-GDP works",
        tagline: "Context",
        description: "Why analysts compare debt with the size of the economy.",
      },
      {
        slug: "where-government-money-goes",
        title: "Where government money goes",
        tagline: "Budget composition",
        description: "A quick explainer on the largest spending blocks.",
      },
      {
        slug: "borrowing-over-time",
        title: "Borrowing over time",
        tagline: "Historical view",
        description: "Why annual borrowing spikes in crisis years.",
      },
      {
        slug: "why-gilt-yields-matter",
        title: "Why gilt yields matter",
        tagline: "Market signal",
        description: "How the market prices UK government borrowing.",
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
