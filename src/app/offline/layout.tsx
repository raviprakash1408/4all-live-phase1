import { Sidebar } from '@/components';
import Header from '@/components/Header';
import type { MenuItem } from '@/components/sidebar/types';
import { URLS } from '@/constants/urls';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarMenuItems: Array<MenuItem> = [
    {
      name: 'logo',
      img: `/assets/images/4All Logo.svg`,
      subImage: `/assets/images/link.png`,
      type: 'logo',
      url: '/spaces',
    },
    // {
    //   name: 'Switch team',
    //   img: `/assets/images/sony.png`,
    //   subImage: `/assets/icons/switch_team.svg`,
    //   type: 'team',
    //   url: '/teams',
    // },
    {
      name: 'Dashboard',
      img: `/assets/MoLink/Dashboard.svg`,
      type: 'normal',
      url: URLS.dashboard,
    },
    {
      name: 'Live feeds',
      img: `/assets/MoLink/LiveFeeds.svg`,
      type: 'normal',
      url: URLS.livefeed,
    },
    {
      name: 'File Manager',
      img: `/assets/MoLink/LiveRecordings.svg`,
      type: 'normal',
      url: URLS.liveRecordings,
    },
    {
      name: 'Tasks',
      img: `/assets/MoLink/Tasks.svg`,
      type: 'normal',
      url: URLS.tasks,
    },
    {
      name: 'Cloud Sync',
      img: `/assets/MoLink/CloudSync.svg`,
      type: 'normal',
      url: URLS.cloudSync,
    },
   
  ];
  return (
    <div className="flex h-screen w-full px-1 text-gray-700 antialiased">
      <div className="h-screen w-full">
        <div className="flex h-full w-full">
          <Sidebar sidebarMenuItems={sidebarMenuItems} />

          <main className="content flex-1  overflow-hidden py-5 text-xl">
            <Header />
            <div>{children}</div>
          </main>
        </div>
        {/* <footer className=" footer ">
          © Copyright {new Date().getFullYear()} {AppConfig.title}
          
        </footer> */}
      </div>
    </div>
  );
}
