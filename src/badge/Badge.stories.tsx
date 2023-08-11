import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Badge from './index';

const meta: Meta<typeof Badge> = {
  component: Badge,
}

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  name: 'Badge',
  render: () => <Badge />,
};

// use 
/*
export const Basic: Story = {
  name: Badge,
  args: {
    type: 'primary',
    children: 'Badge',
  },
};
*/