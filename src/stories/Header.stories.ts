import type { Meta, StoryObj } from '@storybook/react';
import { AppHeaderUI } from '../components/ui/app-header/app-header';

const meta: Meta<typeof AppHeaderUI> = {
  title: 'Components/AppHeader',
  component: AppHeaderUI
};

export default meta;
type Story = StoryObj<typeof AppHeaderUI>;

export const Default: Story = {
  args: {
    userName: 'Гость',
    onConstructorClick: () => {},
    onFeedClick: () => {},
    onProfileClick: () => {},
    isConstructorActive: false,
    isFeedActive: false,
    isProfileActive: false
  }
};

export const ConstructorActive: Story = {
  args: {
    userName: 'Гость',
    onConstructorClick: () => {},
    onFeedClick: () => {},
    onProfileClick: () => {},
    isConstructorActive: true,
    isFeedActive: false,
    isProfileActive: false
  }
};

export const FeedActive: Story = {
  args: {
    userName: 'Гость',
    onConstructorClick: () => {},
    onFeedClick: () => {},
    onProfileClick: () => {},
    isConstructorActive: false,
    isFeedActive: true,
    isProfileActive: false
  }
};

export const ProfileActive: Story = {
  args: {
    userName: 'Гость',
    onConstructorClick: () => {},
    onFeedClick: () => {},
    onProfileClick: () => {},
    isConstructorActive: false,
    isFeedActive: false,
    isProfileActive: true
  }
};
