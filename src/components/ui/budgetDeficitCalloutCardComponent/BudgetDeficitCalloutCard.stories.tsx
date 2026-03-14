import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BudgetDeficitCalloutCard from "./BudgetDeficitCalloutCard";

const meta = {
  title: "UI/BudgetDeficitCalloutCard",
  component: BudgetDeficitCalloutCard,
  args: {
    title: "Budget deficit",
    value: "\u00A3138bn",
    bodyText:
      "Spending exceeds income. The gap is financed through new borrowing and added to debt.",
  },
  decorators: [
    (Story) => (
      <div className="site-container" style={{ paddingBlock: "1rem" }}>
        <div style={{ maxWidth: "260px" }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof BudgetDeficitCalloutCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkAccent: Story = {
  args: {
    accentColor: "#9f3030",
  },
};
