import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ArticleHero from "./ArticleHero";
import ArticleVisualPanel from "../articleVisualPanelComponent/ArticleVisualPanel";

const meta = {
  title: "UI/ArticleHero",
  component: ArticleHero,
  args: {
    header: "Debt interest explained",
    tagline: "Why servicing the national debt costs more",
    date: "15 Mar 2026",
    author: "DebtWatch Research Desk",
    authorBioUrl: "https://debtwatch.uk/methodology/",
    description:
      "Debt interest is the annual cost of servicing government debt. It moves with inflation-linked bonds, refinancing rates and the size of the debt stock.",
    keyTakeaway:
      "Higher yields do not hit the budget instantly, but they do raise the cost of refinancing over time.",
    visual: (
      <ArticleVisualPanel
        eyebrow="Debt interest"
        title="Budget pressure"
        value="£93.4B"
        helperText="Example article hero visual"
        items={[
          { label: "Peak year", value: "2022" },
          { label: "Latest", value: "Jan 2026", tone: "accent" },
        ]}
      />
    ),
  },
  decorators: [
    (Story) => (
      <div className="site-container" style={{ paddingBlock: "1rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArticleHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
