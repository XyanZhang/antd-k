import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Affix from './index';

export default {
  title: 'Example/Affix',
  component: Affix,
} as ComponentMeta<typeof Affix>;

const Template: ComponentStory<typeof Affix> = (args) => <Affix {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  children: 'Affix',
};

export const Basic = () => {
  return <>
    <Affix type="primary">Primary Affix</Affix>
  </>
}
