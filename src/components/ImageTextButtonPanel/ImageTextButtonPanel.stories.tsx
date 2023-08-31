import ImageTextButtonPanel from '.';
import type { ImageTextButtonPanelTypes } from './type';

export default {
  component: ImageTextButtonPanel,
  title: 'ImageTextButtonPanel',
  tags: ['ImageTextButtonPanel'],
};

export const Default: { args: ImageTextButtonPanelTypes } = {
  args: {
    img: '/assets/logo/Group 770.svg',
    content1: 'ImageTextButtonPanel',
    content2: 'Link to Meetmo.io',
    content3: 'Link',
    imgheight: 50,
    imgwidth: 50,
  },
};
