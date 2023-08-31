// HalfCurvedButton.stories.tsx

import { HalfCurvedButton } from '.';
import type { CurvedButton } from './types';

export default {
  component: HalfCurvedButton,
  title: 'HalfCurvedButton',
  tags: ['HalfCurvedButton'],
};

// const Template: Story = (args) => <HalfCurvedButton {...args} />;

export const Default: { args: CurvedButton } = {
  args: {
    content: 'settings',
    image: '/assets/icons/Group.png',
    height: 'h-4',
    width: 'w-96',
    backgroundColor: 'bg-primary-color',
    Color: 'text-quaternary-color',
    Color1: '',
    buttonType: 'uploadFile',
  },
};
export const Left: { args: CurvedButton } = {
  args: {
    content: 'settings ',
    image: '/assets/icons/Group.png',
    halfCurved: true,
    curveType: 'left',
    height: 'h-8',
    width: 'w-12',
    backgroundColor: 'bg-primary-color',
    Color: 'text-quaternary-color',
    Color1: '',
  },
};
export const Large: { args: CurvedButton } = {
  args: {
    content: 'share',
    image: '/assets/icons/Group (1).png',
    size: 'large',
    height: 'h-8',
    width: 'w-12',
    backgroundColor: 'bg-primary-color',
    Color: 'text-quaternary-color',
    Color1: '',
  },
};
export const Medium: { args: CurvedButton } = {
  args: {
    content: 'share',
    image: '/assets/icons/Group (1).png',
    size: 'medium',
    height: 'h-8',
    width: 'w-12',
    backgroundColor: 'bg-primary-color',
    Color: 'text-quaternary-color',
    Color1: '',
  },
};
export const Small: { args: CurvedButton } = {
  args: {
    content: 'invite',
    image: '/assets/icons/Group (1).png',
    size: 'small',
    height: 'h-8',
    width: 'w-12',
    backgroundColor: 'bg-primary-color',
    Color: 'text-quaternary-color',
    Color1: '',
  },
};
export const NoContent: { args: CurvedButton } = {
  args: {
    content: '',
    image: '/assets/icons/Vector (3).png',
    size: 'small',
    height: 'h-8',
    width: 'w-12',
    backgroundColor: 'bg-primary-color',
    Color: 'text-quaternary-color',
    Color1: '',
  },
};
