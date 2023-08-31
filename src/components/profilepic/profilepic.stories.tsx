import Members from '.';
import { ProfileItems } from './memberitems';
import type { MemberPic } from './types';

export default {
  component: Members,
  title: 'Members',
  tags: ['Members'],
};

export const Default = (args: MemberPic) => <Members {...args} />;

Default.args = {
  ProfileItems,
};
