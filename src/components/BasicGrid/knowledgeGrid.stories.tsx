import { BasicGrid } from '.';
import type { Gridbar } from './types';

export default {
  component: BasicGrid,
  title: 'BasicGrid',
  tags: ['BasicGrid'],
};

export const Default: { args: Gridbar } = {
  args: {
    backgroundColor: 'bg-tertiary-color',
    BackgroundColor: 'bg-secondary-color',
    FontColor: 'text-font-color',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    title: 'Getting Started',
    size: 'small',
    img: '/assets/icons/Group.png',
  },
};
export const Large: { args: Gridbar } = {
  args: {
    backgroundColor: 'bg-tertiary-color',
    BackgroundColor: 'bg-secondary-color',
    FontColor: 'text-font-color',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    title: 'Getting Started',
    size: 'large',
    img: '/assets/icons/Group.png',
  },
};
export const Medium: { args: Gridbar } = {
  args: {
    backgroundColor: 'bg-tertiary-color',
    BackgroundColor: 'bg-secondary-color',
    FontColor: 'text-font-color',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    title: 'Getting Started',
    size: 'medium',
    img: '/assets/icons/Group.png',
  },
};
