'use client';

import Image from 'next/image';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CurvedButton } from '../button/curvedButton';

// import type { SystemInfo } from '../DashBoard/types';

export default function Header() {
  const segment = useSelectedLayoutSegment();

  const [heading, setHeading] = useState('');
  const [img, setImage] = useState<string | null>(null);

  useEffect(() => {
    switch (segment) {
      case 'events':
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
          <div className="ml-4  flex items-start justify-start">
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
          {heading === 'Events' && (
            <div className="mr-44 mt-[-42px] flex items-center justify-center">
              <div className="relative w-[173px] cursor-pointer">
                <CurvedButton
                  backgroundColor="bg-tertiary-color"
                  height="min-[400px]:h-12 min-[1600px]:h-12"
                >
                  <span className="ml-7 text-base text-font-color">
                    {' '}
                    New Event
                  </span>
                </CurvedButton>
                <Image
                  src="/assets/icons/newEvent.svg"
                  height={25}
                  width={25}
                  alt=""
                  className="absolute left-[10px] top-3"
                />
              </div>
              <div className="relative ml-2 w-[173px] cursor-pointer">
                <CurvedButton
                  backgroundColor="bg-tertiary-color"
                  height="min-[400px]:h-12 min-[1600px]:h-12"
                >
                  <span className="ml-7 text-base text-font-color">
                    {' '}
                    Delete
                  </span>
                </CurvedButton>
                <Image
                  src="/assets/icons/deleteImg.svg"
                  height={25}
                  width={21}
                  alt=""
                  className="absolute left-[14px] top-3"
                />
              </div>
            </div>
          )}
        </div>
        <div className="absolute bottom-[11px] right-0">
          <div className=" flex items-end justify-end gap-8">
            {/* <div>
              <ThemeToggle />
            </div> */}
            <div className="flex">
              <div className="mr-6 mt-[10px] text-base text-font-color">
                Jonathan Grimes
              </div>
              <Image
                width={44}
                height={44}
                src="/assets/icons/profile.svg"
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
