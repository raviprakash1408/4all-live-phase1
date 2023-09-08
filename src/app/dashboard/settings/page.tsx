/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import APIKeys from '@/components/APIKeys';
import General from '@/components/generalSetting';
import Notifications from '@/components/Notifications';
import Teams from '@/components/teams';

const Settings = () => {
  const [isGeneral, setIsGeneral] = useState(true);
  const [isTeams, setIsTeams] = useState(false);
  const [isKeys, setIsKeys] = useState(false);
  const [isNotifications, setIsNotifications] = useState(false);
  const handleGeneral = () => {
    setIsTeams(false);
    setIsKeys(false);
    setIsNotifications(false);
    setIsGeneral(true);
  };
  const handleTeams = () => {
    setIsGeneral(false);
    setIsKeys(false);
    setIsNotifications(false);
    setIsTeams(true);
  };
  const handleKeys = () => {
    setIsGeneral(false);
    setIsTeams(false);
    setIsNotifications(false);
    setIsKeys(true);
  };
  const handleNotifications = () => {
    setIsGeneral(false);
    setIsTeams(false);
    setIsKeys(false);
    setIsNotifications(true);
  };
  return (
    <div className="flex h-[92vh] w-[100%] justify-between bg-primary-color p-2">
      <div className=" w-[10%]">
        <div
          className={`flex h-[50px] cursor-pointer items-center rounded-tl-3xl ${
            isGeneral
              ? 'border-2 border-tertiary-color border-b-[#F03641]  bg-tertiary-color'
              : 'bg-[#0D0D0D]'
          } p-3`}
          onClick={handleGeneral}
        >
          {isGeneral ? (
            <Image
              src="/assets/icons/settings.svg"
              alt="settings"
              width={25}
              height={25}
            />
          ) : (
            <Image
              src="/assets/icons/general.svg"
              alt="settings"
              width={25}
              height={25}
            />
          )}
          <h3 className="ml-4 text-[16px] text-font-color">General</h3>
        </div>
        <div
          className={`flex h-[50px] cursor-pointer items-center ${
            isTeams
              ? 'border-2 border-tertiary-color border-b-[#F03641]  bg-tertiary-color'
              : 'bg-[#0D0D0D]'
          } p-3`}
          onClick={handleTeams}
        >
          {isTeams ? (
            <Image
              src="/assets/icons/Group 48095764.svg"
              alt="teams"
              width={25}
              height={25}
            />
          ) : (
            <Image
              src="/assets/icons/non-active-teams.svg"
              alt="teams"
              width={25}
              height={25}
            />
          )}
          <h3 className="ml-4 text-[16px] text-font-color">Teams</h3>
        </div>
        <div
          className={`flex h-[50px] cursor-pointer items-center ${
            isKeys
              ? 'border-2 border-tertiary-color border-b-[#F03641]  bg-tertiary-color'
              : 'bg-[#0D0D0D]'
          } p-3`}
          onClick={handleKeys}
        >
          {isKeys ? (
            <Image
              src="/assets/icons/active-keys.svg"
              alt="keys"
              width={25}
              height={25}
            />
          ) : (
            <Image
              src="/assets/icons/non-active-keys.svg"
              alt="keys"
              width={25}
              height={25}
            />
          )}
          <h3 className="ml-4 text-[16px] text-font-color">API keys</h3>
        </div>
        <div
          className={`flex h-[50px] cursor-pointer items-center rounded-bl-3xl ${
            isNotifications
              ? 'border-2 border-tertiary-color border-b-[#F03641]  bg-tertiary-color'
              : 'bg-[#0D0D0D]'
          } p-3`}
          onClick={handleNotifications}
        >
          {isNotifications ? (
            <Image
              src="/assets/icons/active-notifications.svg"
              alt="notification"
              width={25}
              height={25}
            />
          ) : (
            <Image
              src="/assets/icons/non-active-notifications.svg"
              alt="notification"
              width={25}
              height={25}
            />
          )}
          <h3 className="ml-4 text-[16px] text-font-color">Notification</h3>
        </div>
      </div>
      {isGeneral && <General />}
      {isTeams && <Teams />}
      {isKeys && <APIKeys />}
      {isNotifications && <Notifications />}
    </div>
  );
};

export default Settings;
