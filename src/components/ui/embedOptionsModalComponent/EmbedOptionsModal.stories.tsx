import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import EmbedOptionsModal from "./EmbedOptionsModal";

const meta = {
  title: "UI/EmbedOptionsModal",
  component: EmbedOptionsModal,
  args: {
    isOpen: true,
    onClose: () => undefined,
    chartTitle: "Debt interest over time",
    contextSlug: "debt-interest-explained",
    embedSlug: "debt-interest-over-time",
    snapshotDate: "20260314",
  },
} satisfies Meta<typeof EmbedOptionsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
