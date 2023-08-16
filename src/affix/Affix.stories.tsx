import type { Meta, StoryObj } from '@storybook/react'

import Affix from './affixUse';
import Button from '../button/index';


const meta: Meta<typeof Affix> = {
  tags: ['autodocs'],
  component: Affix,
  args: {
    offsetTop: 0,
    offsetBottom: undefined,
    style: {},
    // target: () => window,
    onChange: (affixed?:boolean) => void 0,
    target: () => window,
    prefixCls: 'ant-affix',
    children: <Button>affix button</Button>,
  }
}; 

export default meta;
type Story = StoryObj<typeof Affix>;


const onChange = (affixed?:boolean) => {
  console.log(affixed)
}

export const Primary: Story = {
  args: {
    offsetTop: 10,

  }
};

export const Basic: Story = {
  args: {
    // children: <Button>affix button</Button>,
    onChange,
  },
}

export const RegionAffix = () => {
  return <>
    <div>
      <Affix target={window} className='haha' offsetTop={10} onChange={onChange}>
        <Button>affix button</Button>
      </Affix>
      <ul>
        {new Array(20).fill(1).map((_, index) => <li key={index}>{ String(index).padStart(2, '0') }</li>)}
      </ul>
    </div>
  </>
}