import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BudgetBreakdownCard from "./BudgetBreakdownCard";

const meta = {
  title: "UI/BudgetBreakdownCard",
  component: BudgetBreakdownCard,
  args: {
    title: "Where government money comes from",
    subtitle: "UK receipts, forecast 2025-26",
    totalValue: "\u00A31.232T",
    barAriaLabel: "Income breakdown stacked bar",
    items: [
      {
        label: "Income Tax",
        formattedValue: "\u00A3329bn",
        formattedPercentage: "27%",
        percentageValue: 27,
        color: "#f4bf1a",
      },
      {
        label: "National Insurance",
        formattedValue: "\u00A3205bn",
        formattedPercentage: "17%",
        percentageValue: 17,
        color: "#f6d768",
      },
      {
        label: "VAT",
        formattedValue: "\u00A3180bn",
        formattedPercentage: "15%",
        percentageValue: 15,
        color: "#f7e499",
      },
      {
        label: "Corporation Tax",
        formattedValue: "\u00A3103bn",
        formattedPercentage: "8%",
        percentageValue: 8,
        color: "#e7eef5",
      },
      {
        label: "Other",
        formattedValue: "\u00A3414bn",
        formattedPercentage: "34%",
        percentageValue: 34,
        color: "#9eb5c8",
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="site-container" style={{ paddingBlock: "1rem" }}>
        <div style={{ maxWidth: "420px" }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof BudgetBreakdownCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Spending: Story = {
  args: {
    title: "Where government money goes",
    subtitle: "UK spending, forecast 2025-26",
    totalValue: "\u00A31.370T",
    barAriaLabel: "Spending breakdown stacked bar",
    items: [
      {
        label: "Welfare & pensions",
        formattedValue: "\u00A3333bn",
        formattedPercentage: "24%",
        percentageValue: 24,
        color: "#203b73",
      },
      {
        label: "Health",
        formattedValue: "\u00A3202bn",
        formattedPercentage: "15%",
        percentageValue: 15,
        color: "#3f5f96",
      },
      {
        label: "Debt interest",
        formattedValue: "\u00A3114bn",
        formattedPercentage: "8%",
        percentageValue: 8,
        color: "#c75b5b",
      },
      {
        label: "Other services",
        formattedValue: "\u00A3428bn",
        formattedPercentage: "31%",
        percentageValue: 31,
        color: "#d8e0ea",
      },
    ],
  },
};
