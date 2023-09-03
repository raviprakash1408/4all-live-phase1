/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import Image from 'next/image';
import React, { useState } from 'react';

const Settings = () => {
  const [userName, setUserName] = useState('4ALLCompany');
  const [name, setName] = useState('4ALLCompany');
  const [email, setEmail] = useState('info@4allcompany.com');
  return (
    <div className="flex h-[90vh] w-[100%] justify-between bg-primary-color p-4">
      <div className="flex h-[50px] w-[10%] items-center rounded-tl-3xl border-2 border-tertiary-color border-b-[#FF4615] bg-tertiary-color px-4">
        <Image
          src="/assets/icons/settings.svg"
          alt="settings"
          width={25}
          height={25}
        />
        <h3 className="ml-4 text-[16px] text-font-color">General</h3>
      </div>
      <div className="w-[90%] rounded-3xl rounded-tl-none bg-tertiary-color p-8">
        <h3 className="text-[20px] text-font-color">
          Personal account settings
        </h3>
        <p className="mt-0 text-[16px] text-font-color">
          Autem explicabo fuga eligendi veniam reprehenderit inventore. Quia
          voluptatem consectetur et commodi. Qui esse pariatur.
        </p>
        <div className="mt-4 w-[100%] rounded-3xl bg-sixth-color p-8">
          <p className="text-[16px] text-font-color">
            This is your URL namespace within 4all.live
          </p>
          <div className="relative mb-8 mt-1 h-[50px] w-[400px] rounded-2xl bg-tertiary-color">
            <Image
              src="/assets/icons/g2676.svg"
              alt="@"
              width={25}
              height={25}
              className="absolute left-3 top-3"
            />
            <div className="absolute left-11 top-1">
              <p className="text-[12px] text-[#808080]">Username</p>
              <p className="text-[16px] text-[#808080]">
                4all.live/
                <span className="text-font-color">
                  <input
                    type="text"
                    className="border-none bg-tertiary-color outline-none"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </span>
              </p>
            </div>
          </div>
          <div className="relative mb-8 mt-1 h-[50px] w-[400px] rounded-2xl bg-tertiary-color">
            <Image
              src="/assets/icons/g439.svg"
              alt="name"
              width={25}
              height={25}
              className="absolute left-3 top-2"
            />
            <div className="absolute left-11 top-1">
              <p className="text-[12px] text-[#808080]">Your name</p>
              <p className="text-[16px] text-font-color">
                <input
                  type="text"
                  className="border-none bg-tertiary-color outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </p>
            </div>
          </div>
          <div className="relative mb-8 mt-1 h-[50px] w-[400px] rounded-2xl bg-tertiary-color">
            <Image
              src="/assets/icons/g2370.svg"
              alt="@"
              width={25}
              height={25}
              className="absolute left-3 top-3"
            />
            <div className="absolute left-11 top-1">
              <p className="text-[12px] text-[#808080]">Email</p>
              <p className="text-[16px] text-font-color">
                <input
                  type="text"
                  className="border-none bg-tertiary-color outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="relative cursor-pointer">
              <Image
                src="/assets/icons/avatar.svg"
                alt="avatar"
                width={96}
                height={96}
              />
              <Image
                src="/assets/icons/Group.svg"
                alt="avatar"
                width={25}
                height={25}
                className="absolute left-8 top-9"
              />
              <input type="file" style={{ display: 'none' }} accept="image/*" />
            </label>
            <p className="text-[16px] text-[#808080]">Avatar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
