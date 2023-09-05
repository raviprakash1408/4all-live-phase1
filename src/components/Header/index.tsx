/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */

'use client';

import Image from 'next/image';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CurvedButton } from '../button/curvedButton';
import InputField from '../input field/InputField';

// import type { SystemInfo } from '../DashBoard/types';

export default function Header() {
  const segment = useSelectedLayoutSegment();

  const [heading, setHeading] = useState('');
  const [img, setImage] = useState<string | null>(null);
  const [isOnNewEventPage, setIsOnNewEventPage] = useState(false);
  // const router = useRouter();
  useEffect(() => {
    if (window.location.href.includes('/dashboard/events/newEvent/')) {
      setIsOnNewEventPage(true);
      setHeading('New event');
    } else if (window.location.href.includes('/dashboard/events')) {
      setHeading('Events');
      setIsOnNewEventPage(false);
    }
    console.log('segment', window.location.href);
  });
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
  const router = useRouter();
  const handleNewEventClick = () => {
    // You can also update the segment state here if needed
    // setSegment('events');

    // Use router.push to navigate to the desired URL
    router.push('/dashboard/events/newEvent');
  };

  const handleBack = () => {
    setHeading('Events');
    router.push('/dashboard/events/');
  };

  return (
    <header>
      <div className="relative select-none">
        <div className="relative flex h-[44px] items-center justify-between">
          <div className="-mt-4 ml-4 flex items-center">
            {/* <Image
              width={24}
              height={24}
              src={img}
              alt=""
              className="secondary-color-filter mr-2 mt-1"
              draggable={false}
            /> */}
            {(heading !== 'Events' || isOnNewEventPage) && (
              <button
                type="button"
                className="ml-[15px] h-12 w-12 rounded-2xl bg-tertiary-color"
                onClick={handleBack}
              >
                <Image
                  src="/assets/icons/arrow-close.svg"
                  height={8}
                  width={8}
                  alt=""
                  className="ml-[17px]"
                />
              </button>
            )}
            <h3 className="mt-1 pl-2 text-lg font-bold text-font-color ">
              {heading}
            </h3>
            <div>
              <InputField
                name={undefined}
                validation={false}
                withImage
                height="h-[50px] ml-4"
                width="w-[227px] pl-[47px]"
                borderColor="border-tertiary-color "
                placeholder="Search event"
                imgCursor="top-2 left-3"
                bottominput="hidden"
                img="/assets/icons/Search.svg"
              />
            </div>
          </div>
          {heading === 'Events' && (
            <div className="absolute -top-2 left-[40%] flex justify-between">
              <div
                className={`relative w-[173px] cursor-pointer ${
                  isOnNewEventPage ? 'hidden' : ''
                }`}
                onClick={handleNewEventClick}
              >
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
              <div
                className={`relative ml-2 w-[173px] cursor-pointer ${
                  isOnNewEventPage ? 'hidden' : ''
                }`}
              >
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
            <div className="flex h-12 w-12 rounded-full bg-tertiary-color">
              <Image
                width={39}
                height={27}
                src="/assets/icons/notification.svg"
                alt=""
                className="ml-1 mt-2"
              />
            </div>
            <div className="flex h-12 w-48 rounded-full bg-tertiary-color">
              <Image
                width={30}
                height={30}
                src="/assets/icons/team.svg"
                alt=""
                className="ml-2 "
              />
              <div className="ml-4 mt-3 text-center text-sm text-font-color">
                ASL Group
              </div>
              <Image
                width={20}
                height={20}
                src="/assets/icons/switch_team.svg"
                alt=""
                className="ml-4 "
              />
            </div>
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
