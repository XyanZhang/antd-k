
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import Avatar from './index';
import { circleImageSrc } from '../utils';

import { UserOutlined } from '@ant-design/icons';

const meta = {
  title: 'Example/Avatar',
  component: Avatar,
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>; // satisfies表示Avatar是Meta的子集

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = { // 配置了这些参数的作用：1. 生成文档 2. 生成控制面板
  args: {
    src: circleImageSrc(),
    alt: 'avatar',
    size: 64,
  },
};

let Basic = () => {
  return <>
  <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
    <Avatar size={64} icon={<UserOutlined rev=""/>} />
    <Avatar size="large" icon={<UserOutlined rev="" />} />
    <Avatar icon={<UserOutlined rev="" />} />
    <Avatar size="small" icon={<UserOutlined rev="" />} />
  </div>
  <br/>
  <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
    <Avatar shape="square" size={64} icon={<UserOutlined rev="" />} />
    <Avatar shape="square" size="large" icon={<UserOutlined rev="" />} />
    <Avatar shape="square" icon={<UserOutlined rev="" />} />
    <Avatar shape="square" size="small" icon={<UserOutlined rev="" />} />
  </div>
</>
}
export const BasicUsage: StoryFn = Basic.bind({
  args: {
    src: circleImageSrc(),
    alt: 'avatar',
    size: 80,
  },
}); // bind的作用是将Basic函数绑定到BasicUsage上，这样BasicUsage就可以作为一个组件使用了