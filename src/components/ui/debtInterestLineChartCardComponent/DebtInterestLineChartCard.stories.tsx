import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DebtInterestLineChartCard from "./DebtInterestLineChartCard";

const meta = {
  title: "UI/DebtInterestLineChartCard",
  component: DebtInterestLineChartCard,
  args: {
    title: "Debt interest over time",
    subtitle: "Annual cost of servicing government debt",
    points: [
      { yearLabel: "2008", numericValue: 30000000000, formattedValue: "\u00A330.0B", governmentLabel: "Labour (1997-2010)" },
      { yearLabel: "2009", numericValue: 31800000000, formattedValue: "\u00A331.8B", governmentLabel: "Labour (1997-2010)" },
      { yearLabel: "2010", numericValue: 43100000000, formattedValue: "\u00A343.1B", governmentLabel: "Coalition (2010-2015)" },
      { yearLabel: "2011", numericValue: 48500000000, formattedValue: "\u00A348.5B", governmentLabel: "Coalition (2010-2015)" },
      { yearLabel: "2012", numericValue: 44400000000, formattedValue: "\u00A344.4B", governmentLabel: "Coalition (2010-2015)" },
      { yearLabel: "2013", numericValue: 48700000000, formattedValue: "\u00A348.7B", governmentLabel: "Coalition (2010-2015)" },
      { yearLabel: "2014", numericValue: 43100000000, formattedValue: "\u00A343.1B", governmentLabel: "Coalition (2010-2015)" },
      { yearLabel: "2018", numericValue: 41700000000, formattedValue: "\u00A341.7B", governmentLabel: "Conservative (2015-2024)" },
      { yearLabel: "2020", numericValue: 35600000000, formattedValue: "\u00A335.6B", governmentLabel: "Conservative (2015-2024)" },
      { yearLabel: "2022", numericValue: 109300000000, formattedValue: "\u00A3109.3B", governmentLabel: "Conservative (2015-2024)" },
      { yearLabel: "2023", numericValue: 113900000000, formattedValue: "\u00A3113.9B", governmentLabel: "Conservative (2015-2024)" },
      { yearLabel: "2025", numericValue: 108900000000, formattedValue: "\u00A3108.9B", governmentLabel: "Labour (2024-)" }
    ],
    governmentBands: [
      { governmentKey: "labour_1997", label: "Labour", color: "rgba(215, 95, 95, 0.08)", startIndex: 0, endIndex: 1 },
      { governmentKey: "coalition_2010", label: "Coalition", color: "rgba(100, 125, 165, 0.08)", startIndex: 2, endIndex: 6 },
      { governmentKey: "conservative_2015", label: "Conservative", color: "rgba(32, 59, 115, 0.06)", startIndex: 7, endIndex: 10 },
      { governmentKey: "labour_2024", label: "Labour", color: "rgba(215, 95, 95, 0.05)", startIndex: 11, endIndex: 11 }
    ]
  },
  decorators: [
    (Story) => (
      <div className="site-container" style={{ paddingBlock: "1rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DebtInterestLineChartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
