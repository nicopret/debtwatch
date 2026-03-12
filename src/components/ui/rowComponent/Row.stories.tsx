import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Row from "./Row";

function PlaceholderBlock({ label }: { label: string }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "1rem",
        minHeight: "90px",
        display: "grid",
        placeItems: "center",
      }}
    >
      {label}
    </div>
  );
}

const meta = {
  title: "UI/Row",
  component: Row,
  args: {
    children: null,
  },
  decorators: [
    (Story) => (
      <div className="site-container" style={{ paddingBlock: "1rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Row>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultRow: Story = {
  render: () => (
    <Row>
      <PlaceholderBlock label="Block 1" />
      <PlaceholderBlock label="Block 2" />
      <PlaceholderBlock label="Block 3" />
    </Row>
  ),
};

export const MetricsStyleRow: Story = {
  render: () => (
    <Row columns={4} gap="1rem">
      <PlaceholderBlock label="Metric A" />
      <PlaceholderBlock label="Metric B" />
      <PlaceholderBlock label="Metric C" />
      <PlaceholderBlock label="Metric D" />
    </Row>
  ),
};

export const WrappingMobileFriendly: Story = {
  render: () => (
    <Row columns={3} gap="1.25rem" wrap>
      <PlaceholderBlock label="Article 1" />
      <PlaceholderBlock label="Article 2" />
      <PlaceholderBlock label="Article 3" />
      <PlaceholderBlock label="Article 4" />
      <PlaceholderBlock label="Article 5" />
    </Row>
  ),
};
