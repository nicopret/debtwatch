import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ArticleSection from "./ArticleSection";
import ArticleVisualPanel from "../articleVisualPanelComponent/ArticleVisualPanel";

const meta = {
  title: "UI/ArticleSection",
  component: ArticleSection,
  args: {
    heading: "Why the bill jumped",
    body: [
      "The UK has a meaningful stock of index-linked bonds, so inflation can feed directly into debt-interest costs.",
      "Higher gilt yields also make new borrowing more expensive as existing bonds mature and are replaced.",
    ],
    layout: "split",
    visual: (
      <ArticleVisualPanel
        eyebrow="Transmission"
        title="Rates move first"
        value="Then the budget adjusts"
        helperText="Example inline visual block"
      />
    ),
    callout: (
      <div>
        <p style={{ color: "#6b7280", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase" }}>
          Why it matters
        </p>
        <p style={{ color: "#17315f", marginTop: "0.35rem", lineHeight: 1.6, fontWeight: 600 }}>
          Debt interest competes with day-to-day public spending inside the budget.
        </p>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="site-container" style={{ paddingBlock: "1rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArticleSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SplitLayout: Story = {};

export const StackedLayout: Story = {
  args: {
    layout: "stacked",
    visual: undefined,
  },
};

