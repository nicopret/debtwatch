import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MetricCard from "./MetricCard";

const meta = {
  title: "UI/MetricCard",
  component: MetricCard,
  args: {
    headerText: "Total UK public sector debt",
    bodyText: "GBP 2.8T",
    footerText: "Rolling central government debt total.",
  },
  decorators: [
    (Story) => (
      <div className="site-container" style={{ paddingBlock: "1rem" }}>
        <div className="metrics-grid">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultMetricCard: Story = {};

export const TotalUkDebtMetric: Story = {
  args: {
    headerText: "Total UK Debt",
    bodyText: "\u00A32.9T",
    footerText: "Jan 2026",
    headerColor: "#0f766e",
  },
};

export const TextOnly: Story = {
  args: {
    headerText: "Debt to GDP ratio",
    bodyText: "97.6%",
    footerText: "Public debt as a share of annual output.",
  },
};

export const FooterTextAndMoreLink: Story = {
  args: {
    headerText: "Annual debt interest",
    bodyText: "GBP 104B",
    footerText: "Estimated yearly debt servicing cost.",
    moreText: "Read analysis",
    moreHref: "/articles",
  },
};

export const FooterMoreLinkOnly: Story = {
  args: {
    headerText: "Borrowing this year",
    bodyText: "GBP 127B",
    footerText: undefined,
    moreText: "Methodology",
    moreHref: "/methodology",
  },
};

export const CustomColors: Story = {
  args: {
    headerText: "Monthly debt payment",
    headerColor: "#0f766e",
    bodyText: "GBP 8.7B",
    bodyColor: "#111827",
    footerText: "Average monthly debt interest outflow.",
    footerColor: "#6b7280",
    moreText: "Sources",
    moreHref: "/sources",
    moreColor: "#1d4ed8",
  },
};

export const MissingValues: Story = {
  args: {
    headerText: undefined,
    bodyText: undefined,
    footerText: undefined,
    moreText: undefined,
    moreHref: undefined,
  },
};
