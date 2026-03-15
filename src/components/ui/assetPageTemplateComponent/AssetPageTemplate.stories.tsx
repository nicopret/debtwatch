import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AssetPageTemplate from "./AssetPageTemplate";

const meta = {
  title: "UI/AssetPageTemplate",
  component: AssetPageTemplate,
  args: {
    title: "Debt interest over time",
    sourceNote: "Annual debt-interest history from ONS",
    sourceHref: "https://debtwatch.uk/articles/debt-interest-explained/",
    versionLabel: "20260315",
    visual: (
      <div
        style={{
          minHeight: 240,
          borderRadius: 16,
          border: "1px solid #dbe3ef",
          background:
            "linear-gradient(180deg, rgba(248,250,252,1) 0%, rgba(255,255,255,1) 100%)",
        }}
      />
    ),
  },
} satisfies Meta<typeof AssetPageTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
