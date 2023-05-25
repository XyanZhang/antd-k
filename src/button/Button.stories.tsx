import { useState } from 'react';
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
export const Loading = () => {
  let [loading, setLoading] = useState(false);
  let loadingHandle = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
  return <>
    <Button type="primary" loading={true}  onClick={loadingHandle}>Primary Button</Button>
    <Button style={style} loading={loading} onClick={() => setLoading(!loading)}>Default Button</Button>
    <Button type="primary" style={style}>Dashed Button</Button>
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

export const LoadingOnClick = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setLoading(true);
    setCount(count + 1);
  };
  const handleReset = () => {
    setLoading(false);
    setCount(0);
  }

  const handleDisableLoading = () => {
    setLoading(false);
  }
  return (
    <>
      <Button type="primary" loading={loading} onClick={handleClick}>
        {loading ? 'Loading' : 'Click me'}
        : {count}
      </Button>
      <Button onClick={handleDisableLoading}>disable click loading</Button>
      <Button onClick={handleReset}>reset</Button>
    </>
  );
}
