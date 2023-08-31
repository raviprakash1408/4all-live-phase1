// HalfCurvedButtons.stories.tsx

import { HalfCurvedButtons } from '.';
import type { CurvedButton } from './types';

export default {
  component: HalfCurvedButtons,
  title: 'HalfCurvedButtons',
  tags: ['HalfCurvedButtons'],
};

// const Template: Story = (args) => <HalfCurvedButtons {...args} />;

export const Default: { args: CurvedButton } = {
  args: {
    backgroundColor: 'bg-primary-color',
    textcolor: 'text-quaternary-color',
    imgcolor: '',
    content: 'settings',
    image: '/assets/icons/Group.png',
  },
};
export const Left: { args: CurvedButton } = {
  args: {
    backgroundColor: 'bg-primary-color',
    textcolor: 'text-quaternary-color',
    imgcolor: '',
    content: 'settings ',
    image: '/assets/icons/Group.png',
    halfCurved: true,
    curveType: 'left',
  },
};
export const Large: { args: CurvedButton } = {
  args: {
    backgroundColor: 'bg-primary-color',
    textcolor: 'text-quaternary-color',
    imgcolor: '',
    content: 'share',
    image: '/assets/icons/Group (1).png',
    size: 'large',
  },
};
export const Medium: { args: CurvedButton } = {
  args: {
    backgroundColor: 'bg-primary-color',
    textcolor: 'text-quaternary-color',
    imgcolor: '',
    content: 'share',
    image: '/assets/icons/Group (1).png',
    size: 'medium',
  },
};
export const Small: { args: CurvedButton } = {
  args: {
    backgroundColor: 'bg-primary-color',
    textcolor: 'text-quaternary-color',
    imgcolor: '',
    content: 'invite',
    image: '/assets/icons/Group (1).png',
    size: 'small',
  },
};
export const NoContent: { args: CurvedButton } = {
  args: {
    backgroundColor: 'bg-primary-color',
    textcolor: 'text-quaternary-color',
    imgcolor: '',
    content: '',
    image: '/assets/icons/Vector (3).png',
    size: 'small',
  },
};
