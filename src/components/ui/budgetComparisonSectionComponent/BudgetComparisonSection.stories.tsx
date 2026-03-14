import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BudgetBreakdownCard from "../budgetBreakdownCardComponent/BudgetBreakdownCard";
import BudgetDeficitCalloutCard from "../budgetDeficitCalloutCardComponent/BudgetDeficitCalloutCard";
import DonutBreakdownCard from "../donutBreakdownCardComponent/DonutBreakdownCard";
import BudgetComparisonSection from "./BudgetComparisonSection";

const meta = {
  title: "UI/BudgetComparisonSection",
  component: BudgetComparisonSection,
  args: {
    heading: "Government income vs spending",
    subheading: "Two stacked bars tell the budget story at a glance.",
    leftCard: (
      <BudgetBreakdownCard
        title="Where government money comes from"
        subtitle="UK receipts, forecast 2025-26"
        totalValue="\u00A31.232T"
        barAriaLabel="Income breakdown stacked bar"
        items={[
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
        ]}
      />
    ),
    centerCard: (
      <BudgetDeficitCalloutCard
        title="Budget deficit"
        value="\u00A3138bn"
        bodyText="Spending exceeds income. The gap is financed through new borrowing and added to debt."
      />
    ),
    lowerLeftCard: (
      <DonutBreakdownCard
        title={'What\'s inside "Other" income'}
        subtitle="Residual receipts, forecast 2025-26"
        totalValue="\u00A3414bn"
        centerLabel="Other income"
        items={[
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
        ]}
      />
    ),
    lowerRightCard: (
      <DonutBreakdownCard
        title={'What\'s inside "Other" spending'}
        subtitle="Residual services, forecast 2025-26"
        totalValue="\u00A3428bn"
        centerLabel="Other spending"
        items={[
          {
            label: "Public order & safety",
            formattedValue: "\u00A377bn",
            formattedPercentage: "18%",
            percentageValue: 18,
            color: "#203b73",
          },
          {
            label: "Local government",
            formattedValue: "\u00A3111bn",
            formattedPercentage: "26%",
            percentageValue: 26,
            color: "#3b5e90",
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
        ]}
      />
    ),
    rightCard: (
      <BudgetBreakdownCard
        title="Where government money goes"
        subtitle="UK spending, forecast 2025-26"
        totalValue="\u00A31.370T"
        barAriaLabel="Spending breakdown stacked bar"
        items={[
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
} satisfies Meta<typeof BudgetComparisonSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
