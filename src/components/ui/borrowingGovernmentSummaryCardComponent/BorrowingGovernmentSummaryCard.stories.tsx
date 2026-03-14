import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BorrowingGovernmentSummaryCard from "./BorrowingGovernmentSummaryCard";

const meta = {
  title: "UI/BorrowingGovernmentSummaryCard",
  component: BorrowingGovernmentSummaryCard,
  args: {
    title: "Borrowing by government",
    governments: [
      {
        governmentKey: "labour_1997",
        governmentLabel: "Labour (1997-2010)",
        totalBorrowingFormattedValue: "\u00A3458.9B",
        peakYear: "2009",
        peakYearBorrowingFormattedValue: "\u00A3161.8B",
      },
      {
        governmentKey: "coalition_2010",
        governmentLabel: "Coalition (2010-2015)",
        totalBorrowingFormattedValue: "\u00A3609.1B",
        peakYear: "2010",
        peakYearBorrowingFormattedValue: "\u00A3148.0B",
      },
      {
        governmentKey: "conservative_2015",
        governmentLabel: "Conservative (2015-2024)",
        totalBorrowingFormattedValue: "\u00A31,123.1B",
        peakYear: "2020",
        peakYearBorrowingFormattedValue: "\u00A3272.9B",
      },
      {
        governmentKey: "labour_2024",
        governmentLabel: "Labour (2024-)",
        totalBorrowingFormattedValue: "\u00A3134.0B",
        peakYear: "2024",
        peakYearBorrowingFormattedValue: "\u00A3134.0B",
      },
    ],
    peakYearSummary: {
      year: "2020",
      formattedValue: "\u00A3272.9B",
      governmentLabel: "Conservative (2015-2024)",
    },
  },
  decorators: [
    (Story) => (
      <div className="site-container" style={{ paddingBlock: "1rem" }}>
        <div style={{ maxWidth: "360px" }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof BorrowingGovernmentSummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
