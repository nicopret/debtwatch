import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CircularMetric from "./CircularMetric";

const meta = {
  title: "UI/CircularMetric",
  component: CircularMetric,
  args: {
    labelText: "UK 10-year gilt",
    mainValueText: "4.6%",
    helperText: "Bank of England | Mar 2026",
  },
  decorators: [
    (Story) => (
      <div className="site-container" style={{ paddingBlock: "1rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CircularMetric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkText: Story = {
  args: {
    backgroundColor: "#f5a4a4",
    textColor: "#4a1010",
    borderColor: "#c26e6e",
  },
};
