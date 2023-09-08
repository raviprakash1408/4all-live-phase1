import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Teams = () => {
  const router = useRouter();
  const handleTeams = () => {
    router.push('dashboard/settings/team-settings/');
  };
  return (
    <div className="w-[90%] rounded-3xl rounded-tl-none bg-tertiary-color p-6">
      <h3 className="text-[20px] text-font-color">Teams</h3>
      <p className="mt-0 text-[16px] text-font-color">
        Autem explicabo fuga eligendi veniam reprehenderit inventore. Quia
        voluptatem consectetur et commodi. Qui esse pariatur.
      </p>
      <div className="mt-[2rem] flex gap-5">
        <div className="flex h-[50px] w-[363px] items-center rounded-[20px] bg-primary-color p-3">
          <Image
            src="/assets/icons/Search.svg"
            alt="search"
            width={25}
            height={25}
          />
          <input
            type="text"
            placeholder="Search Teams"
            className="ml-3 bg-primary-color text-[16px] italic text-[#808080]"
          />
        </div>
        <div className="flex h-[50px] w-[217px] items-center rounded-[20px] bg-primary-color p-3">
          <Image
            src="/assets/icons/plus.svg"
            alt="add"
            width={25}
            height={25}
          />
          <button
            type="button"
            className="ml-3 bg-none text-[16px] text-font-color"
          >
            Create team
          </button>
        </div>
      </div>
      <div className="mt-[1rem] flex h-[70px] w-[100%] items-center rounded-[20px] bg-primary-color px-16">
        <h3 className="text-[16px] text-font-color">Teams</h3>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center justify-between rounded-[20px] bg-sixth-color p-2">
        <div className="flex items-center">
          <Image
            src="/assets/icons/Rectangle 39420.svg"
            alt="image"
            width={50}
            height={50}
          />
          <div className="ml-[1rem]">
            <h3 className="text-[16px] text-font-color">The4AllCompany team</h3>
            <p className="text-[16px] text-[#808080]">Owner</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="flex h-[50px] w-[135px] items-center justify-between rounded-2xl bg-seventh-color px-8 text-[16px] text-font-color"
          >
            <Image
              src="/assets/icons/g2569.svg"
              alt="view"
              height={17}
              width={25}
            />
            View
          </button>
          <button
            type="button"
            className="flex h-[50px] w-[160px] items-center justify-between rounded-2xl bg-seventh-color px-7 text-[16px] text-font-color"
            onClick={handleTeams}
          >
            <Image
              src="/assets/icons/g117.svg"
              alt="manage"
              height={17}
              width={25}
            />
            Manage
          </button>
          <Image
            src="/assets/icons/Group 48095882.svg"
            alt="..."
            height={50}
            width={70}
          />
        </div>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center justify-between rounded-[20px] bg-sixth-color p-2">
        <div className="flex items-center">
          <Image
            src="/assets/icons/Rectangle 394201.svg"
            alt="image"
            width={50}
            height={50}
          />
          <div className="ml-[1rem]">
            <h3 className="text-[16px] text-font-color">Officia quod ea</h3>
            <p className="text-[16px] text-[#808080]">
              Requested access 26 days ago
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="flex h-[50px] w-[135px] items-center justify-between rounded-2xl bg-seventh-color px-8 text-[16px] text-font-color"
          >
            <Image
              src="/assets/icons/g2569.svg"
              alt="view"
              height={17}
              width={25}
            />
            View
          </button>
          <button
            type="button"
            className="flex h-[50px] w-[160px] items-center justify-between rounded-2xl bg-seventh-color px-7 text-[16px] text-font-color"
            onClick={handleTeams}
          >
            <Image
              src="/assets/icons/g117.svg"
              alt="manage"
              height={17}
              width={25}
            />
            Manage
          </button>
          <Image
            src="/assets/icons/Group 48095882.svg"
            alt="..."
            height={50}
            width={70}
          />
        </div>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center justify-between rounded-[20px] bg-sixth-color p-2">
        <div className="flex items-center">
          <Image
            src="/assets/icons/Rectangle 394202.svg"
            alt="image"
            width={50}
            height={50}
          />
          <div className="ml-[1rem]">
            <h3 className="text-[16px] text-font-color">Voluptatem</h3>
            <p className="text-[16px] text-[#808080]">Owner</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="flex h-[50px] w-[218px] items-center justify-between rounded-2xl bg-seventh-color px-8 text-[16px] text-font-color"
          >
            <Image
              src="/assets/icons/Group 48095971.svg"
              alt="request"
              height={17}
              width={17}
            />
            Request access
          </button>
          <Image
            src="/assets/icons/Group 48095882.svg"
            alt="..."
            height={50}
            width={70}
          />
        </div>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center justify-between rounded-[20px] bg-sixth-color p-2">
        <div className="flex items-center">
          <Image
            src="/assets/icons/Rectangle 394203.svg"
            alt="image"
            width={50}
            height={50}
          />
          <div className="ml-[1rem]">
            <h3 className="text-[16px] text-font-color">Numquam placeat et</h3>
            <p className="text-[16px] text-[#808080]">Owner</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="flex h-[50px] w-[135px] items-center justify-between rounded-2xl bg-seventh-color px-8 text-[16px] text-font-color"
          >
            <Image
              src="/assets/icons/g2569.svg"
              alt="view"
              height={17}
              width={25}
            />
            View
          </button>
          <button
            type="button"
            className="flex h-[50px] w-[160px] items-center justify-between rounded-2xl bg-seventh-color px-7 text-[16px] text-font-color"
            onClick={handleTeams}
          >
            <Image
              src="/assets/icons/g117.svg"
              alt="manage"
              height={17}
              width={25}
            />
            Manage
          </button>
          <Image
            src="/assets/icons/Group 48095882.svg"
            alt="..."
            height={50}
            width={70}
          />
        </div>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center justify-between rounded-[20px] bg-sixth-color p-2">
        <div className="flex items-center">
          <Image
            src="/assets/icons/Rectangle 394204.svg"
            alt="image"
            width={50}
            height={50}
          />
          <div className="ml-[1rem]">
            <h3 className="text-[16px] text-font-color">Voluptatem </h3>
            <p className="text-[16px] text-[#808080]">
              Requested access 8 days ago
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="flex h-[50px] w-[267px] items-center justify-between rounded-2xl bg-seventh-color px-6 text-[16px] text-font-color"
          >
            <Image
              src="/assets/icons/Group 4809597.svg"
              alt="cancel"
              height={17}
              width={17}
            />
            Cancel request access
          </button>
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

export default Teams;
