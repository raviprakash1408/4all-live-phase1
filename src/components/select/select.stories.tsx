import { Select } from '@/components/select/index';

import type { SelectTypes } from './types';

export default {
  component: Select,
  title: 'Select',
  tags: ['Select'],
};

export const Default: { args: SelectTypes } = {
  args: {
    name: 'SDI',
    img: '',
    options: ['public', 'private'],
  },
};
