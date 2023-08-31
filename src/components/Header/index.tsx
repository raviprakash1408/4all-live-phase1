'use client';

import Image from 'next/image';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useEffect, useState } from 'react';

import ThemeToggle from '../toggle button/themeToggle';
import { CurvedButton } from '../button/curvedButton';

// import type { SystemInfo } from '../DashBoard/types';

export default function Header() {
  const segment = useSelectedLayoutSegment();

  const [heading, setHeading] = useState('');
  const [img, setImage] = useState<string | null>(null);

  useEffect(() => {
    switch (segment) {
      case 'Events':
        setHeading('Events');
        setImage('/assets/MoLink/Dashboard.svg');
        break;
      case 'livefeed':
        setHeading('Live feeds');
        setImage('/assets/MoLink/LiveFeeds.svg');

        break;
      case 'liverecordings':
        setHeading('Live Recordings');
        setImage('/assets/MoLink/LiveRecordings.svg');

        break;
      case 'tasks':
        setHeading('Tasks');
        setImage('/assets/MoLink/Tasks.svg');

        break;
      case 'cloudSync':
        setHeading('Sync');
        setImage('/assets/MoLink/CloudSync.svg');

        break;
      case 'controlDevices':
        setHeading('Control Devices');
        setImage('/assets/MoLink/ControlDevices.svg');

        break;
      case 'addons':
        setHeading('AddOns');
        setImage('/assets/MoLink/AddOns.svg');

        break;
      case 'history':
        setHeading('History');
        setImage('/assets/MoLink/History.svg');

        break;
      case 'realtimeLogs':
        setHeading('Realtime Logs');
        setImage('/assets/MoLink/RealTimelogs.svg');

        break;
      case 'stats':
        setHeading('Stats');
        setImage('/assets/MoLink/Stats.svg');

        break;
      case 'settings':
        setHeading('Settings');
        setImage('/assets/MoLink/Settings.svg');

        break;
      default:
        break;
    }
  }, [segment]);
  if (img === null) {
    return null;
  }
  return (
    <header>
      <div className="relative select-none">
        <div className="h-[44px] ">
          <div className="flex  items-start justify-start ml-4">
            {/* <Image
              width={24}
              height={24}
              src={img}
              alt=""
              className="secondary-color-filter mr-2 mt-1"
              draggable={false}
            /> */}
            <h3 className="mt-1 pl-2 text-lg font-bold text-font-color">
              {heading}
            </h3>
          </div>
          <div className='flex justify-center items-center mt-[-42px]'>
            <div className='w-[9vw] relative'>
            <CurvedButton  backgroundColor="bg-tertiary-color"
            height="min-[400px]:h-12 min-[1600px]:h-12">
              <span className='text-font-color text-sm'>              New Event
</span>
            </CurvedButton>
            <Image src={'/assets/icons/newEvent.svg'} height={25} width={25} alt='' className='absolute top-3 left-[10px]'/>

            </div>
            <div className='w-[9vw] ml-2 relative'>
            <CurvedButton  backgroundColor="bg-tertiary-color"
            height="min-[400px]:h-12 min-[1600px]:h-12" >
             <span className='text-font-color text-sm'>              Delete
</span>
            </CurvedButton>
            <Image src={'/assets/icons/newEvent.svg'} height={25} width={25} alt='' className='absolute top-3 left-[10px]'/>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[11px] right-0">
          <div className=" flex items-end justify-end gap-8">
            {/* <div>
              <ThemeToggle />
            </div> */}
            <div>
              <Image
                width={44}
                height={44}
                src="/assets/MoLink/ProfileImage.png"
                alt=""
                className=""
              />
            </div>
          </div>
        </div>
        <hr className=" w-full border border-tertiary-color" />
      </div>
    </header>
  );
}
