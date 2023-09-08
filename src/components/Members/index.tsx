'use client';

import Image from 'next/image';
import React, { useState } from 'react';

const Members = () => {
  const [email, setEmail] = useState('johan@4all.live');
  return (
    <div className="w-[90%] rounded-3xl rounded-tl-none bg-tertiary-color p-6">
      <h3 className="text-[20px] text-font-color">Teams</h3>
      <p className="mt-0 text-[16px] text-font-color">
        Autem explicabo fuga eligendi veniam reprehenderit inventore. Quia
        voluptatem consectetur et commodi. Qui esse pariatur.
      </p>
      <div className="mt-[1rem] h-[241px] w-[100%] rounded-[20px] bg-sixth-color p-4 ">
        <div className="flex items-center gap-4 p-2">
          <h2 className="text-[20px] font-semibold text-font-color">
            Invite new members
          </h2>
          <button
            type="button"
            className="flex h-[50px] w-[175px] items-center rounded-[20px] bg-tertiary-color p-3 text-[16px] text-font-color"
          >
            <Image
              src="/assets/icons/Group 480957931.svg"
              alt="link"
              width={25}
              height={25}
              className="mr-[1rem]"
            />
            Invite link
          </button>
        </div>
        <div className="my-3 flex items-center gap-5">
          <div className="flex h-[50px] w-[400px] items-center gap-3 rounded-[20px] bg-tertiary-color p-2">
            <Image
              src="/assets/icons/mail.svg"
              alt="mail"
              width={25}
              height={19}
            />
            <div className="flex flex-col">
              <p className="text-[12px] text-[#808080]">Email</p>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-none bg-transparent text-[16px] text-font-color outline-none"
              />
            </div>
          </div>
          <div className="relative flex h-[50px] w-[400px] items-center gap-3 rounded-[20px] bg-tertiary-color p-2">
            <Image
              src="/assets/icons/g1968.svg"
              alt="role"
              width={25}
              height={19}
            />
            <div className="flex flex-col">
              <p className="text-[12px] text-[#808080]">Role</p>
              <p className="text-[16px] text-font-color">Editor</p>
            </div>
            <Image
              src="/assets/icons/Vector 2.svg"
              alt="arrow"
              width={15}
              height={7.5}
              className="absolute right-3"
            />
          </div>
        </div>
        <button
          type="button"
          className="flex h-[50px] w-[217px] items-center rounded-[20px] bg-tertiary-color px-4 text-[16px] text-font-color"
        >
          <Image
            src="/assets/icons/plus.svg"
            alt="add"
            width={25}
            height={25}
            className="mr-[2rem]"
          />
          Add more
        </button>
      </div>
      <div className="mt-[1.5rem] w-[100%]">
        <h3 className="text-[20px] font-semibold text-font-color">Members</h3>
        <p className="text-[16px] text-font-color">
          Autem explicabo fuga eligendi veniam reprehenderit inventore. Quia
          voluptatem consectetur et commodi. Qui esse pariatur.
        </p>
      </div>
      <div className="mt-[1rem] flex h-[70px] w-[100%] items-center rounded-[20px] bg-primary-color px-16 ">
        <h3 className="min-w-[25%] px-4 text-[16px] text-font-color">
          Members
        </h3>
        <h3 className="min-w-[25%] text-[16px] text-font-color">
          Last activity
        </h3>
        <h3 className="min-w-[23%] text-[16px] text-font-color">
          Team permission
        </h3>
        <h3 className="text-[16px] text-font-color">Editing permission</h3>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-2">
        <div className="flex min-w-[25%] items-center">
          <Image
            src="/assets/icons/Rectangle 394206.svg"
            alt="image"
            width={50}
            height={50}
          />
          <div className="ml-[1rem]">
            <h3 className="text-[16px] text-font-color">Dean Renner</h3>
            <p className="text-[16px] text-[#808080]">Owner</p>
          </div>
        </div>
        <p className="min-w-[25%] px-8 text-[16px] text-font-color">
          11 minutes ago
        </p>
        <p className="min-w-[22%]  text-[16px] text-font-color">Owner</p>
        <div className="flex w-[100%] items-center justify-between">
          <div>
            <h3 className="text-[16px] text-font-color">Edit permissions</h3>
            <p className="text-[16px] text-[#808080]">Jul 28, 2022</p>
          </div>
          <Image
            src="/assets/icons/Group 48095882.svg"
            alt="..."
            height={50}
            width={70}
          />
        </div>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-2">
        <div className="flex min-w-[25%] items-center">
          <Image
            src="/assets/icons/Rectangle 394206.svg"
            alt="image"
            width={50}
            height={50}
          />
          <div className="ml-[1rem]">
            <h3 className="text-[16px] text-font-color">Dean Renner</h3>
            <p className="text-[16px] text-[#808080]">Owner</p>
          </div>
        </div>
        <p className="min-w-[25%] px-8 text-[16px] text-font-color">
          11 minutes ago
        </p>
        <p className="min-w-[22%]  text-[16px] text-font-color">Owner</p>
        <div className="flex w-[100%] items-center justify-between">
          <div>
            <h3 className="text-[16px] text-font-color">Edit permissions</h3>
            <p className="text-[16px] text-[#808080]">Jul 28, 2022</p>
          </div>
          <Image
            src="/assets/icons/Group 48095882.svg"
            alt="..."
            height={50}
            width={70}
          />
        </div>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-2">
        <div className="flex min-w-[25%] items-center">
          <Image
            src="/assets/icons/Rectangle 394206.svg"
            alt="image"
            width={50}
            height={50}
          />
          <div className="ml-[1rem]">
            <h3 className="text-[16px] text-font-color">Dean Renner</h3>
            <p className="text-[16px] text-[#808080]">Owner</p>
          </div>
        </div>
        <p className="min-w-[25%] px-8 text-[16px] text-font-color">
          11 minutes ago
        </p>
        <p className="min-w-[22%]  text-[16px] text-font-color">Owner</p>
        <div className="flex w-[100%] items-center justify-between">
          <div>
            <h3 className="text-[16px] text-font-color">Edit permissions</h3>
            <p className="text-[16px] text-[#808080]">Jul 28, 2022</p>
          </div>
          <Image
            src="/assets/icons/Group 48095882.svg"
            alt="..."
            height={50}
            width={70}
          />
        </div>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-2">
        <div className="flex min-w-[25%] items-center">
          <Image
            src="/assets/icons/Rectangle 394206.svg"
            alt="image"
            width={50}
            height={50}
          />
          <div className="ml-[1rem]">
            <h3 className="text-[16px] text-font-color">Dean Renner</h3>
            <p className="text-[16px] text-[#808080]">Owner</p>
          </div>
        </div>
        <p className="min-w-[25%] px-8 text-[16px] text-font-color">
          11 minutes ago
        </p>
        <p className="min-w-[22%]  text-[16px] text-font-color">Owner</p>
        <div className="flex w-[100%] items-center justify-between">
          <div>
            <h3 className="text-[16px] text-font-color">Edit permissions</h3>
            <p className="text-[16px] text-[#808080]">Jul 28, 2022</p>
          </div>
          <Image
            src="/assets/icons/Group 48095882.svg"
            alt="..."
            height={50}
            width={70}
          />
        </div>
      </div>
    </div>
  );
};

export default Members;
