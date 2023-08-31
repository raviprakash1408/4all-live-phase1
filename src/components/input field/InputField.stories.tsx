import { userEvent, within } from '@storybook/testing-library';

import InputField from './InputField';
import type { InputItem } from './types';

export default {
  component: InputField,
  title: 'InputField',
  tags: ['InputField'],
};

export const Default: { args: InputItem } = {
  args: {
    name: 'Space Name',
    img: '/assets/sidebar/spaces.svg',
    validation: true,
    withImage: true,
    height: 'h-[12vh]',
    width: 'w-[8vw]',
    borderColor: 'border-tertiary-color',
  },
};
export const InputFieldTest: any = {
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    userEvent.type(canvas.getByTestId('inputField'), 'hello');
  },
};
