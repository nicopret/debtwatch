import type { Preview } from '@storybook/nextjs-vite';
import { Geist, Geist_Mono } from 'next/font/google';
import React from 'react';
import '../src/app/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const preview: Preview = {
  decorators: [
    (Story) =>
      React.createElement(
        'div',
        {
          className: `${geistSans.variable} ${geistMono.variable}`,
          style: {
            minHeight: '100vh',
            background: 'var(--background)',
            color: 'var(--foreground)',
            fontFamily: 'var(--font-geist-sans), Arial, Helvetica, sans-serif',
          },
        },
        React.createElement(Story),
      ),
  ],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
    backgrounds: {
      default: 'app',
      values: [{ name: 'app', value: '#fafafa' }],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
