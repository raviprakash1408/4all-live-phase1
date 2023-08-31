import { ColorThemes, names } from '@/utils/Theme';

import Demo from '.';
import type DemoTypes from './types';

export default {
  component: Demo,
  title: 'Demo',
  tags: ['Demo'],
  argTypes: {
    bg_color: { control: 'radio', options: names },
    font_color: { control: 'select', options: names },
    border_color: { control: 'select', options: names },
    hover_font_color: { control: 'select', options: names },
    hover_bg_color: { control: 'select', options: names },
  },
};

export const Default: { args: DemoTypes } = {
  args: {
    bg_color: ColorThemes['primary-color'],
    font_color: ColorThemes['primary-color'],
    border_color: ColorThemes['primary-color'],
    hover_font_color: ColorThemes['primary-color'],
    hover_bg_color: ColorThemes['primary-color'],
    border_radius: '',
    font_size: '',
  },
};
