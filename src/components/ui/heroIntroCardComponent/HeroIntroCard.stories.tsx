import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import HeroIntroCard from "./HeroIntroCard";

const meta = {
  title: "UI/HeroIntroCard",
  component: HeroIntroCard,
  args: {
    headerText: "Cost of Living explained",
    bodyText:
      "UK debt, borrowing, inflation and public spending - translated into clear numbers, simple charts and source-led explainers.",
    footerText: "Snapshot dashboard - UK data only",
  },
  decorators: [
    (Story) => (
      <div className="site-container" style={{ paddingBlock: "1rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroIntroCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MutedSurface: Story = {
  args: {
    backgroundColor: "#f3f7fb",
    headerColor: "#0f766e",
    footerColor: "#4b5563",
  },
};
