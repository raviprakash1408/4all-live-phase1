import { Sidebar } from '.';

export default {
  component: Sidebar,
  title: 'Sidebar',
  tags: ['Sidebar'],
};

export const Default = {
  args: {
    sidebarMenuItems: [
      {
        name: 'logo',
        img: `/assets/images/MoLink.png`,
        subImage: `/assets/images/MoLink.png`,
        type: 'logo',
        url: '/spaces',
      },
      {
        name: 'Switch team',
        img: `/assets/images/sony.png`,
        subImage: `/assets/icons/switch_team.svg`,
        type: 'team',
        url: '/teams',
      },

      {
        name: 'spaces',
        img: `/assets/images/sony.png`,
        subImage: `/assets/icons/switch_team.svg`,
        type: 'normal',
        url: '/teams',
      },
    ],
  },
};
