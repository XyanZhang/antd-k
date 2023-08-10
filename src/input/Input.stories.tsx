import React from 'react';
import { UserOutlined } from '@ant-design/icons';

import Input from './index';
import { Meta, StoryObj } from '@storybook/react';
const meta = {
  title: 'General/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: <>嘻嘻</>,
    size: 'small',
    placeholder: '请输入',
    defaultValue: 'default value',
  },
};


export const Prefix = () => {
  return <>
    <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
    <br />
    <br />
    <Input placeholder="default size" prefix={<UserOutlined />} />
    <br />
    <br />
    <Input size="small" placeholder="small size" prefix={<UserOutlined />} />
  </>
}

export const Size = () => {
  return <>
    <Input size="small" placeholder="small" /><br />
    <Input placeholder="small" /><br />
    <Input size="large" placeholder="small" /><br />
  </>
}

export const Control = () => {
  const [value, setValue] = React.useState('')
  return <>
    <Input value={value} onChange={(e: any) => setValue(e.target.value)} /><br />

    <button onClick={() => setValue('set by button')}>set value</button>
  </>
}

const onChange = (e:any) => {
  console.log('Change:', e.target.value);
};

export const MaxLength = () => (
  <>
    <Input maxLength={20} onChange={onChange} />
  </>
);

