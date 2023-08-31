import type { Meta } from '@storybook/react';
import type { SketchPickerProps } from 'react-color';

import { ColorPicker } from '.';

const meta: Meta<typeof ColorPicker> = {
  component: ColorPicker,
  title: 'ColorPicker',
  tags: ['ColorPicker'],
};

export const Default: { args: SketchPickerProps } = {
  args: {
    color: '#fff',
  },
};

export default meta;
