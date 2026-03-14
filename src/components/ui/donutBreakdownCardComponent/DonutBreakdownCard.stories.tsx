import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DonutBreakdownCard from "./DonutBreakdownCard";

const meta = {
  title: "UI/DonutBreakdownCard",
  component: DonutBreakdownCard,
  args: {
    title: 'What\'s inside "Other" income',
    subtitle: "Residual receipts, forecast 2025-26",
    totalValue: "\u00A3414bn",
    centerLabel: "Other income",
    items: [
      {
        label: "Fuel duty",
        formattedValue: "\u00A324bn",
        formattedPercentage: "6%",
        percentageValue: 6,
        color: "#f1c453",
      },
      {
        label: "Property taxes",
        formattedValue: "\u00A321bn",
        formattedPercentage: "5%",
        percentageValue: 5,
        color: "#f5d98d",
      },
      {
        label: "Excise duties",
        formattedValue: "\u00A343bn",
        formattedPercentage: "10%",
        percentageValue: 10,
        color: "#d2ddec",
      },
      {
        label: "Capital taxes",
        formattedValue: "\u00A329bn",
        formattedPercentage: "7%",
        percentageValue: 7,
        color: "#9fb4cb",
      },
      {
        label: "Council tax / business rates",
        formattedValue: "\u00A393bn",
        formattedPercentage: "23%",
        percentageValue: 23,
        color: "#6f8eaf",
      },
      {
        label: "Other receipts",
        formattedValue: "\u00A3204bn",
        formattedPercentage: "49%",
        percentageValue: 49,
        color: "#415f84",
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="site-container" style={{ paddingBlock: "1rem" }}>
        <div style={{ maxWidth: "560px" }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof DonutBreakdownCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Spending: Story = {
  args: {
    title: 'What\'s inside "Other" spending',
    subtitle: "Residual services, forecast 2025-26",
    totalValue: "\u00A3428bn",
    centerLabel: "Other spending",
    items: [
      {
        label: "Local government",
        formattedValue: "\u00A3111bn",
        formattedPercentage: "26%",
        percentageValue: 26,
        color: "#3b5e90",
      },
      {
        label: "Public order & safety",
        formattedValue: "\u00A377bn",
        formattedPercentage: "18%",
        percentageValue: 18,
        color: "#203b73",
      },
      {
        label: "Administration",
        formattedValue: "\u00A364bn",
        formattedPercentage: "15%",
        percentageValue: 15,
        color: "#8fa8c9",
      },
      {
        label: "Other",
        formattedValue: "\u00A386bn",
        formattedPercentage: "20%",
        percentageValue: 20,
        color: "#d8e0ea",
      },
    ],
  },
};
