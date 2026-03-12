import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Footer from './Footer';

const meta = {
  title: 'Layout/Footer',
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NarrowViewport: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '420px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};
