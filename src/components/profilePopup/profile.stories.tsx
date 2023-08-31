import ProfileItems from './ProfileItems';

export default {
  component: ProfileItems,
  title: 'ProfileListItem',
  tags: ['ProfileListItem'],
};

export const Default = {
  args: {
    item: {
      name: 'Switch team',
      img: `/assets/images/sony.png`,
      subImage: `/assets/icons/switch_team.svg`,
      type: 'team',
      url: '/teams',
    },
  },
};
