import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import EmbedIconButton from "./EmbedIconButton";

const meta = {
  title: "UI/EmbedIconButton",
  component: EmbedIconButton,
  args: {
    onClick: () => undefined,
  },
  decorators: [
    (Story) => (
      <div className="site-container" style={{ paddingBlock: "1rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmbedIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

