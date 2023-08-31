import { ImgaecontentGrid } from '.';
import type { FolderSpace } from './types';

export default {
  component: ImgaecontentGrid,
  title: 'ImgaecontentGrid',
  tags: ['ImgaecontentGrid'],
};

export const Default: { args: FolderSpace } = {
  args: {
    content: 'Folder1',
    img: '/assets/icons/Group 1232.png',
    width: 'w-64',
    height: 'h-24',
    Background: 'bg-sixth-color',
  },
};
