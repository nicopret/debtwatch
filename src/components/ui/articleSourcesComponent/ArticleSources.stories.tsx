import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ArticleSources from "./ArticleSources";

const meta = {
  title: "UI/ArticleSources",
  component: ArticleSources,
  args: {
    items: [
      {
        label: "ONS public sector finances",
        url: "https://www.ons.gov.uk/",
        note: "Example source item for article pages.",
      },
      {
        label: "Bank of England yield curve data",
        note: "Used for market-rate context and comparison.",
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
} satisfies Meta<typeof ArticleSources>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

