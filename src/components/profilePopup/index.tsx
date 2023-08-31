'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import ProfileItems from './ProfileItems';
import type { ProfileItem } from './types';

const ProfilePop = () => {
  const [showModal, setShowModal] = useState(false);
  const profileItems: Array<ProfileItem> = [
    {
      name: 'Switch team',
      img: `/assets/images/sony.png`,
      subImage: `/assets/icons/switch_team.svg`,
      type: 'team',
      url: '/teams',
    },
    {
      name: 'Profile',
      img: `/assets/sidebar/Group.svg`,
      type: 'normal',
      url: '/spaces',
    },
    {
      name: 'Space',
      img: `/assets/sidebar/spaces.svg`,
      type: 'normal',
      url: '/roles',
    },
    {
      name: 'Dashboard',
      img: `/assets/sidebar/dashboard.svg`,
      type: 'normal',
      url: '/statistics',
    },
    {
      name: 'Location: Los Angeles',
      img: `/assets/sidebar/location.svg`,
      type: 'normal',
      url: '/subscriptions',
    },
    {
      name: 'Subscriptions',
      img: `/assets/sidebar/subscription.svg`,
      type: 'normal',
      url: '/billing',
    },
    {
      name: 'Billing',
      img: `/assets/sidebar/billing.svg`,
      type: 'normal',
      url: '/support',
    },
    {
      name: 'Analitics',
      img: `/assets/sidebar/analitycs.svg`,
      type: 'normal',
      url: '/affiliate',
    },
    {
      name: 'Settings',
      img: `/assets/sidebar/setting.svg`,
      type: 'normal',
      url: '/account',
    },
    {
      name: 'Connectivity',
      img: `/assets/sidebar/connectivity_test.svg`,
      type: 'normal',
      url: '/knowledge',
    },
    {
      name: 'en-US',
      img: `/assets/sidebar/language.svg`,
      type: 'dropdown',
      url: '/knowledge',
      label: 'Language',
    },
    {
      name: 'Theme',
      img: `/assets/sidebar/theme.svg`,
      type: 'normal',
      url: '/knowledge',
    },
    {
      name: 'Keyboard Shortcuts',
      img: `/assets/sidebar/keyboard.svg`,
      type: 'normal',
      url: '/knowledge',
    },
    {
      name: 'Send Feedback',
      img: `/assets/sidebar/send_feedback.svg`,
      type: 'normal',
      url: '/knowledge',
    },
    {
      name: 'Product Updates',
      img: `/assets/sidebar/p_update.svg`,
      type: 'normal',
      url: '/knowledge',
    },
    {
      name: 'Knowledge',
      img: `/assets/sidebar/knowledge.svg`,
      type: 'normal',
      url: '/knowledge',
    },
    {
      name: 'Support/FAQ',
      img: `/assets/sidebar/support.svg`,
      type: 'normal',
      url: '/knowledge',
    },
    {
      name: 'Status',
      img: `/assets/sidebar/status.svg`,
      type: 'normal',
      url: '/knowledge',
    },
    {
      name: 'Logout',
      img: `/assets/sidebar/logout.svg`,
      type: 'normal',
      url: '/knowledge',
    },
  ];

  return (
    <div>
      {/* {props.type === '' ? '' : ''} */}
      <button
        type="button"
        onClick={() => {
          setShowModal(!showModal);
        }}
        className="absolute right-0 top-1 mr-5 flex h-[4.5rem] w-80 cursor-pointer select-none items-center justify-end rounded-xl border-solid bg-primary-color pr-2 text-white duration-300 ease-in-out hover:bg-fifth-color"
      >
        <Image
          width={56}
          height={56}
          src="/assets/images/blank_profile.jpeg"
          alt=""
          className="mr-4rounded-full border-4 border-solid border-secondary-color "
        />

        <div className="mr-7 flex flex-col ">
          <div className="flex-1 text-lg">Johan Romero</div>
          <div className="-mt-2 flex-1 text-start text-sm text-secondary-color">
            Director
          </div>
          <div className="-mt-1 flex-1 text-start text-sm text-secondary-color">
            johan@10hd.io
          </div>
        </div>
        <div className="ml-6 h-10 w-10 rounded-full border-2 border-solid  border-tertiary-color">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="16"
            // height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 mt-3 h-4 w-5"
          >
            <path d="M12 5L8 9 4 5" />
          </svg>
        </div>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[99] m-auto flex flex-col items-center justify-center rounded backdrop-blur-sm">
          <button
            type="button"
            onClick={() => {
              setShowModal(!showModal);
            }}
            className="absolute inset-y-0 right-0 mr-6 mt-5 flex h-16 w-80 cursor-pointer select-none items-center justify-end rounded-t-2xl border-solid bg-tertiary-color pr-2 text-white"
          >
            <Image
              width={56}
              height={56}
              src="/assets/images/blank_profile.jpeg"
              alt=""
              className="mr-4rounded-full border-4 border-solid border-secondary-color"
            />

            <div className="mr-7 flex flex-col ">
              <div className="flex-1 text-lg">Johan Romero</div>
              <div className="-mt-2 flex-1 text-start text-sm text-secondary-color">
                Director
              </div>
              <div className="-mt-1 flex-1 text-start text-sm text-secondary-color">
                johan@10hd.io
              </div>
            </div>
            <div className="ml-6 h-10 w-10 rounded-full border-2  border-solid border-primary-color ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                // width="16"
                // height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 mt-3 h-4 w-5"
              >
                <path d="M12 5L8 9 4 5" />
              </svg>
            </div>
          </button>
          <div className="absolute inset-y-0 right-0 mr-6 mt-20 flex h-full w-80 cursor-pointer  rounded-sm border-solid bg-tertiary-color">
            <div className=" mt-4 select-none text-sm text-quaternary-color">
              {profileItems.map((item, index) => (
                <>
                  <div>
                    <ProfileItems key={item.name} item={item} />
                  </div>
                  {index % 4 === 3 && index < 12 && (
                    <hr className="border-quaternary-color" />
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { ProfilePop };
