import { RectangleButton } from '.';
import type { MenuItem } from './types';

export default {
  component: RectangleButton,
  title: 'RectangleButton',
  tags: ['RectangleButton'],
};

// const Template: Story = (args) => <SettingsComponent {...args} />;

export const Default: { args: MenuItem } = {
  args: {
    backgroundColor: 'bg-primary-color',
    content: 'Files',
    img: '/assets/icons/Group 1232.png',
    width: 'w-20',
    height: 'h-12',
    children: undefined,
  },
};

export const Left: { args: MenuItem } = {
  args: {
    backgroundColor: 'bg-primary-color',
    content: 'Files ',
    img: '/assets/icons/Group 1232.png',
    topCurved: true,
    curveType: 'left',
    width: 'w-20',
    height: 'h-12',
    children: undefined,
  },
};
export const Right: { args: MenuItem } = {
  args: {
    backgroundColor: 'bg-primary-color',
    content: 'Files ',
    img: '/assets/icons/Group 1232.png',
    topCurved: true,
    curveType: 'right',
    width: 'w-20',
    height: 'h-12',
    children: undefined,
  },
};
export const Both: { args: MenuItem } = {
  args: {
    backgroundColor: 'bg-primary-color',
    content: 'Files ',
    img: '/assets/icons/Group 1232.png',
    topCurved: true,
    curveType: 'both',
    width: 'w-20',
    height: 'h-12',
    children: undefined,
  },
};
