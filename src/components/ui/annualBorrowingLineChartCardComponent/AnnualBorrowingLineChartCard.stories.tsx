import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AnnualBorrowingLineChartCard from "./AnnualBorrowingLineChartCard";

const meta = {
  title: "UI/AnnualBorrowingLineChartCard",
  component: AnnualBorrowingLineChartCard,
  args: {
    title: "Borrowing over time",
    subtitle: "Annual UK borrowing with government periods",
    points: [
      {
        yearLabel: "2008",
        numericValue: 87_979_000_000,
        formattedValue: "\u00A388.0B",
        governmentLabel: "Labour (1997-2010)",
      },
      {
        yearLabel: "2009",
        numericValue: 161_020_000_000,
        formattedValue: "\u00A3161B",
        governmentLabel: "Labour (1997-2010)",
      },
      {
        yearLabel: "2010",
        numericValue: 148_622_000_000,
        formattedValue: "\u00A3149B",
        governmentLabel: "Coalition (2010-2015)",
      },
      {
        yearLabel: "2011",
        numericValue: 122_164_000_000,
        formattedValue: "\u00A3122B",
        governmentLabel: "Coalition (2010-2015)",
      },
      {
        yearLabel: "2012",
        numericValue: 130_503_000_000,
        formattedValue: "\u00A3131B",
        governmentLabel: "Coalition (2010-2015)",
      },
      {
        yearLabel: "2013",
        numericValue: 103_611_000_000,
        formattedValue: "\u00A3104B",
        governmentLabel: "Coalition (2010-2015)",
      },
      {
        yearLabel: "2014",
        numericValue: 104_006_000_000,
        formattedValue: "\u00A3104B",
        governmentLabel: "Coalition (2010-2015)",
      },
      {
        yearLabel: "2015",
        numericValue: 85_620_000_000,
        formattedValue: "\u00A385.6B",
        governmentLabel: "Conservative (2015-2024)",
      },
      {
        yearLabel: "2016",
        numericValue: 67_813_000_000,
        formattedValue: "\u00A367.8B",
        governmentLabel: "Conservative (2015-2024)",
      },
      {
        yearLabel: "2017",
        numericValue: 54_921_000_000,
        formattedValue: "\u00A354.9B",
        governmentLabel: "Conservative (2015-2024)",
      },
      {
        yearLabel: "2018",
        numericValue: 51_927_000_000,
        formattedValue: "\u00A351.9B",
        governmentLabel: "Conservative (2015-2024)",
      },
      {
        yearLabel: "2019",
        numericValue: 51_701_000_000,
        formattedValue: "\u00A351.7B",
        governmentLabel: "Conservative (2015-2024)",
      },
      {
        yearLabel: "2020",
        numericValue: 272_881_000_000,
        formattedValue: "\u00A3272.9B",
        governmentLabel: "Conservative (2015-2024)",
      },
      {
        yearLabel: "2021",
        numericValue: 163_725_000_000,
        formattedValue: "\u00A3163.7B",
        governmentLabel: "Conservative (2015-2024)",
      },
      {
        yearLabel: "2022",
        numericValue: 104_694_000_000,
        formattedValue: "\u00A3104.7B",
        governmentLabel: "Conservative (2015-2024)",
      },
      {
        yearLabel: "2023",
        numericValue: 134_104_000_000,
        formattedValue: "\u00A3134.1B",
        governmentLabel: "Conservative (2015-2024)",
      },
      {
        yearLabel: "2024",
        numericValue: 134_000_000_000,
        formattedValue: "\u00A3134.0B",
        governmentLabel: "Labour (2024-)",
      },
    ],
    governmentBands: [
      {
        governmentKey: "labour_1997",
        label: "Labour",
        color: "rgba(215, 95, 95, 0.08)",
        startIndex: 0,
        endIndex: 1,
      },
      {
        governmentKey: "coalition_2010",
        label: "Coalition",
        color: "rgba(100, 125, 165, 0.08)",
        startIndex: 2,
        endIndex: 6,
      },
      {
        governmentKey: "conservative_2015",
        label: "Conservative",
        color: "rgba(32, 59, 115, 0.06)",
        startIndex: 7,
        endIndex: 14,
      },
      {
        governmentKey: "labour_2024",
        label: "Labour",
        color: "rgba(215, 95, 95, 0.05)",
        startIndex: 15,
        endIndex: 15,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="site-container" style={{ paddingBlock: "1rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AnnualBorrowingLineChartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
