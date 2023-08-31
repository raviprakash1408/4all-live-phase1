import { SmallGrid } from '.';
import type { SmallGridItems } from './types';

export default {
  component: SmallGrid,
  title: 'SmallGrid',
  tags: ['SmallGrid'],
};

// const Template: Story = (args) => <SettingsComponent {...args} />;

export const Default: { args: SmallGridItems } = {
  args: {
    img: '/assets/icons/image.svg',
    subImage: '/assets/icons/icon1.svg',
    content1: 'Notes',
    content2: '524 files',
    content3: '32 MB',
  },
};
