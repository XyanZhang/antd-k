import React, { ReactElement } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserOutlined } from '@ant-design/icons';

import Input from './index';
import TextArea2 from './TextArea2';

export default {
  title: 'Example/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Input',
};

export const Basic = () => {
  return <Input placeholder="basic usage" defaultValue="abcd" />
}


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

