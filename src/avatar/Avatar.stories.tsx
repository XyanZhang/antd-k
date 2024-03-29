
import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './index';
import { circleImageSrc } from '../utils';
import StarTwoTone from '@ant-design/icons/StarTwoTone';

const meta = {
  title: 'DataDisplay/Avatar',
  component: Avatar,
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>; // satisfies表示Avatar是Meta的子集
//satisfies 让你用自动推导出的类型，而不是声明的类型，增加灵活性，同时还可以对这个推导出的类型做类型检查，保证安全

export default meta;

type Story = StoryObj<typeof meta>;

export const ImageSrc: Story = { // 配置了这些参数的作用：1. 生成文档 2. 生成控制面板
  args: {
    src: circleImageSrc(),
    shape: 'circle', // 'square' | 'circle'
    size: 64,
    gap: 4,
    className: '1233',
    icon: '',
    children: 'avatar',
    style: {
      backgroundColor: '#ccc',
    },
    title: 'avatar title',
    alt: "avatar alt"
  },
};
export const Icon: Story = { // 配置了这些参数的作用：1. 生成文档 2. 生成控制面板
  args: {
    src: circleImageSrc(),
    shape: 'circle', // 'square' | 'circle'
    size: 64,
    gap: 4,
    className: '1233',
    icon: <StarTwoTone />,
    children: 'avatar',
    style: {
      backgroundColor: '#ccc',
    },
    title: 'avatar title',
    alt: "avatar alt"
  },
};