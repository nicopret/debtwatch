import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DebtToGdpLineChartCard from "./DebtToGdpLineChartCard";

const meta = {
  title: "UI/DebtToGdpLineChartCard",
  component: DebtToGdpLineChartCard,
  args: {
    title: "Debt vs GDP",
    subtitle: "UK debt burden over time",
    points: [
      { yearLabel: "2008", numericValue: 48.0, formattedValue: "48.0%", governmentLabel: "Labour (1997-2010)" },
      { yearLabel: "2009", numericValue: 60.2, formattedValue: "60.2%", governmentLabel: "Labour (1997-2010)" },
      { yearLabel: "2010", numericValue: 69.8, formattedValue: "69.8%", governmentLabel: "Coalition (2010-2015)" },
      { yearLabel: "2011", numericValue: 77.3, formattedValue: "77.3%", governmentLabel: "Coalition (2010-2015)" },
      { yearLabel: "2012", numericValue: 81.4, formattedValue: "81.4%", governmentLabel: "Coalition (2010-2015)" },
      { yearLabel: "2013", numericValue: 82.9, formattedValue: "82.9%", governmentLabel: "Coalition (2010-2015)" },
      { yearLabel: "2014", numericValue: 84.6, formattedValue: "84.6%", governmentLabel: "Coalition (2010-2015)" },
      { yearLabel: "2015", numericValue: 84.3, formattedValue: "84.3%", governmentLabel: "Conservative (2015-2024)" },
      { yearLabel: "2018", numericValue: 82.0, formattedValue: "82.0%", governmentLabel: "Conservative (2015-2024)" },
      { yearLabel: "2020", numericValue: 99.2, formattedValue: "99.2%", governmentLabel: "Conservative (2015-2024)" },
      { yearLabel: "2023", numericValue: 96.8, formattedValue: "96.8%", governmentLabel: "Conservative (2015-2024)" },
      { yearLabel: "2024", numericValue: 97.7, formattedValue: "97.7%", governmentLabel: "Labour (2024-)" }
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
} satisfies Meta<typeof DebtToGdpLineChartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
