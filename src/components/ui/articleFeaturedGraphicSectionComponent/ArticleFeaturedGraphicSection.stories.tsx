import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ArticleFeaturedGraphicSection from "./ArticleFeaturedGraphicSection";

const meta = {
  title: "UI/ArticleFeaturedGraphicSection",
  component: ArticleFeaturedGraphicSection,
  args: {
    heading: "Featured graphic",
    subheading: "This reuses the same section readers saw on the dashboard homepage.",
    children: (
      <div
        style={{
          minHeight: 260,
          borderRadius: 24,
          border: "1px solid #e5e7eb",
          background: "#ffffff",
        }}
      />
    ),
  },
  decorators: [
    (Story) => (
      <div className="site-container" style={{ paddingBlock: "1rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArticleFeaturedGraphicSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
