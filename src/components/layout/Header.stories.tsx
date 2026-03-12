import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Header from './Header';

const meta = {
  title: 'Layout/Header',
  component: Header,
} satisfies Meta<typeof Header>;

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
