import type { Meta } from '@storybook/react';
import defaultTheme from 'tailwindcss/defaultTheme';

import { names } from '@/utils/Theme';

import CustomButton from '.';
import type { CustomButtonProps } from './types';

// console.log(defaultTheme);

const meta: Meta<typeof CustomButton> = {
  component: CustomButton,
  argTypes: {
    gap: {
      options: Object.keys(defaultTheme.spacing),
      control: { type: 'select' },
    },
    borderColor: {
      options: names,
      control: { type: 'select' },
    },
    backgroundColor: {
      options: names,
      control: { type: 'select' },
    },
    textColor: {
      options: names,
      control: { type: 'select' },
    },
    hoverBackgroundColor: {
      options: names,
      control: { type: 'select' },
    },
    hoverBorderColor: {
      options: names,
      control: { type: 'select' },
    },
    hoverTextColor: {
      options: names,
      control: { type: 'select' },
    },
    iconColor: {
      options: names,
      control: { type: 'select' },
    },
    textSize: {
      options: Object.keys(defaultTheme.fontSize),
      control: { type: 'select' },
    },

    hoverTextSize: {
      options: Object.keys(defaultTheme.spacing),
      control: { type: 'select' },
    },
    iconAnimation: {
      options: Object.keys(defaultTheme.animation).concat(['scanning']),
      control: { type: 'select' },
    },

    iconWidth: {
      options: Object.keys(defaultTheme.spacing),
      control: { type: 'select' },
    },
    iconHeight: {
      options: Object.keys(defaultTheme.spacing),
      control: { type: 'select' },
    },
    iconPosition: {
      options: ['left', 'right'],
      control: { type: 'select' },
    },
    roundedLeft: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    roundedRight: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
  },
};

export default meta;
// type Story = StoryObj<typeof CustomButton>;

// export const Primary: Story = {
//   args: {
//     variant: 'primary',
//   },
// };
export const Default: { args: CustomButtonProps } = {
  args: {
    icon: '/assets/icons/Media.svg',
    children: 'text',
  },
};
