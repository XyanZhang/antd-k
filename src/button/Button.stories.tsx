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
    children: <><StarTwoTone /> 嘻嘻</>,
    shape: "default",
    danger: true,
    size: 'md',
    disabled: true
  },
};

const style={
  marginLeft: 8
}

export const Basic = () => {
  return <>
    <Button type="primary">Primary Button</Button>
    <Button style={style}>Default Button</Button>
    <Button type="dashed" style={style}>Dashed Button</Button>
    <br />
    <Button type="text">Text Button</Button>
    <Button type="link" style={style}>Link Button</Button>
  </>
}

export const Demos = () => {
  return (
    <div style={{width: '300px'}}>
      <Button type="primary" size="sm">primary</Button>
      <Button type="primary" size="sm" block>Block</Button>
      <hr/>
      <div>
        <Button type="primary" size="lg">primary</Button>
        <Button type="primary" size="lg" disabled={true}>primary</Button>
      </div>
      <hr/>
      <div>
        <Button type="primary" size="lg" block={false}>block</Button>
        <Button type="primary" size="lg" block>block</Button>
        <Button type="primary" size="lg" block={true}>block</Button>
      </div>
    </div>
  )
}