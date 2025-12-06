import type { Meta, StoryObj } from '@storybook/react';
import { AppHeaderUI } from '@ui';

const meta = {
  title: 'Example/AppHeader',
  component: AppHeaderUI,
  tags: ['autodocs'],
} satisfies Meta<typeof AppHeaderUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: 'Света',
    isConstructorActive: true,
    isFeedActive: false,
    isProfileActive: false,
  }
};

export const FeedActive: Story = {
  args: {
    userName: 'Света',
    isConstructorActive: false,
    isFeedActive: true,
    isProfileActive: false,
  }
};

export const ProfileActive: Story = {
  args: {
    userName: 'Света',
    isConstructorActive: false,
    isFeedActive: false,
    isProfileActive: true,
  }
};
