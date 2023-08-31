import { userEvent, within } from '@storybook/testing-library';

import { CustomizedSelect } from '.';
import type { SelectTypes1 } from './types';

export default {
  component: CustomizedSelect,
  title: 'CustomizedSelect',
  tags: ['CustomizedSelect'],
};
// const options: string[] = ['option1', 'option2'];

export const Default: { args: SelectTypes1 } = {
  args: {
    img: '/assets/icons/Camera.svg',
    width: '',
    height: 'h-9',
    arrowBottom: 'top-[11px]',
    border: 'rounded-full',
    // title: 'Input',
  },
};

export const Select: any = {
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    userEvent.click(canvas.getByTestId('CustomizedSelect'));
  },
};
