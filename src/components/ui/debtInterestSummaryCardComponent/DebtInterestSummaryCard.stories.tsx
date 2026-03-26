import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DebtInterestSummaryCard from "./DebtInterestSummaryCard";

const meta = {
  title: "UI/DebtInterestSummaryCard",
  component: DebtInterestSummaryCard,
  args: {
    title: "Debt interest summary",
    latestValue: "\u00A3108.9B",
    latestYear: "2025",
    governmentTotals: [
      {
        governmentKey: "labour_1997",
        governmentLabel: "Labour (1997-2010)",
        totalFormattedValue: "\u00A3389B",
        averageAnnualFormattedValue: "\u00A329.9B",
      },
      {
        governmentKey: "coalition_2010",
        governmentLabel: "Coalition (2010-2015)",
        totalFormattedValue: "\u00A3227B",
        averageAnnualFormattedValue: "\u00A345.4B",
      },
      {
        governmentKey: "conservative_2015",
        governmentLabel: "Conservative (2015-2024)",
        totalFormattedValue: "\u00A3601B",
        averageAnnualFormattedValue: "\u00A366.8B",
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
} satisfies Meta<typeof DebtInterestSummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
