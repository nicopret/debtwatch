import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import G7DebtComparisonCard from "./G7DebtComparisonCard";

const meta = {
  title: "UI/G7DebtComparisonCard",
  component: G7DebtComparisonCard,
  args: {
    title: "UK vs the G7",
    ukValue: "103.4%",
    ukRank: 4,
    g7Average: "127.7%",
    differenceFromAverage: "-24.3pp",
    comparisonYear: "2025",
    highestCountry: {
      countryCode: "JPN",
      countryLabel: "Japan",
      formattedValue: "229.6%",
      rank: 1,
    },
    countries: [
      { countryCode: "JPN", countryLabel: "Japan", formattedValue: "229.6%", rank: 1 },
      { countryCode: "ITA", countryLabel: "Italy", formattedValue: "136.8%", rank: 2 },
      { countryCode: "USA", countryLabel: "United States", formattedValue: "125.1%", rank: 3 },
      { countryCode: "FRA", countryLabel: "France", formattedValue: "116.5%", rank: 4 },
      { countryCode: "CAN", countryLabel: "Canada", formattedValue: "113.9%", rank: 5 },
      { countryCode: "GBR", countryLabel: "United Kingdom", formattedValue: "103.4%", rank: 6 },
      { countryCode: "DEU", countryLabel: "Germany", formattedValue: "64.4%", rank: 7 }
    ]
  },
  decorators: [
    (Story) => (
      <div className="site-container" style={{ paddingBlock: "1rem" }}>
        <div style={{ maxWidth: "380px" }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof G7DebtComparisonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
