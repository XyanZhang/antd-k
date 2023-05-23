import type { Meta, StoryObj } from '@storybook/react';
import StarTwoTone from '@ant-design/icons/StarTwoTone';
import Button, { ButtonTypes } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'General/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ButtonTypes,
      control: {
        type: "select",
      }
    },
    shape: {
      options: ['default', 'circle', 'round'],
      control: {
        type: "radio",
      },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: "radio",
      },
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    type: 'primary',
    children: "button",
    shape: "default",
    danger: true,
    size: 'md'
  },
};
export const IconButton: Story = {
  args: {
    type: 'primary',
    children: <StarTwoTone />,
    shape: "default",
    danger: true,
    size: 'md'
  },
};