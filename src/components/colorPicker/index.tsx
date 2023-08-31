import type { SketchPickerProps } from 'react-color';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SketchPicker } from 'react-color';

export const ColorPicker = ({ color }: SketchPickerProps) => {
  return <SketchPicker color={color} />;
};
