import Image from 'next/image';
import React from 'react';

type RolesProps = {
  isRoles: boolean;
  setIsRoles: (value: boolean) => void;
};

const Roles: React.FC<RolesProps> = ({ isRoles, setIsRoles }) => {
  const toggleRole = () => {
    setIsRoles(!isRoles);
    console.log('clicked');
  };
  return (
    <div className="w-[90%] rounded-3xl rounded-tl-none bg-tertiary-color p-6">
      <h3 className="text-[20px] text-font-color">User roles</h3>
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
            placeholder="Search user roles"
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
            Create role
          </button>
        </div>
      </div>
      <div className="mt-[1rem] flex h-[70px] w-[100%] items-center rounded-[20px] bg-primary-color px-16 ">
        <h3 className="min-w-[25%] px-4 text-[16px] text-font-color">
          User role
        </h3>
        <h3 className="min-w-[25%] text-[16px] text-font-color">Users</h3>
        <h3 className="min-w-[23%] text-[16px] text-font-color">Permissions</h3>
        <h3 className="text-[16px] text-font-color">Loreipsom</h3>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-2">
        <div className="flex min-w-[25%] items-center">
          <Image
            src="/assets/icons/Rectangle 394207.svg"
            alt="image"
            width={50}
            height={50}
          />
          <h3 className="px-4 text-[16px] text-font-color">Superadmin</h3>
        </div>
        <p className="min-w-[25%] px-8 text-[16px] text-font-color">1</p>
        <p className="min-w-[22%]  text-[16px] text-font-color">45</p>
        <h3 className="min-w-[13%] text-[16px] text-font-color">0</h3>
        <div className="flex w-[100%] items-center justify-between">
          <button
            type="button"
            className="flex h-[50px] w-[160px] items-center justify-between rounded-2xl bg-seventh-color px-7 text-[16px] text-font-color"
            onClick={toggleRole}
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
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-2">
        <div className="flex min-w-[25%] items-center">
          <Image
            src="/assets/icons/Rectangle 394207.svg"
            alt="image"
            width={50}
            height={50}
          />
          <h3 className="px-4 text-[16px] text-font-color">Superadmin</h3>
        </div>
        <p className="min-w-[25%] px-8 text-[16px] text-font-color">1</p>
        <p className="min-w-[22%]  text-[16px] text-font-color">45</p>
        <h3 className="min-w-[13%] text-[16px] text-font-color">0</h3>
        <div className="flex w-[100%] items-center justify-between">
          <button
            type="button"
            className="flex h-[50px] w-[160px] items-center justify-between rounded-2xl bg-seventh-color px-7 text-[16px] text-font-color"
            onClick={toggleRole}
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
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-2">
        <div className="flex min-w-[25%] items-center">
          <Image
            src="/assets/icons/Rectangle 394207.svg"
            alt="image"
            width={50}
            height={50}
          />
          <h3 className="px-4 text-[16px] text-font-color">Superadmin</h3>
        </div>
        <p className="min-w-[25%] px-8 text-[16px] text-font-color">1</p>
        <p className="min-w-[22%]  text-[16px] text-font-color">45</p>
        <h3 className="min-w-[13%] text-[16px] text-font-color">0</h3>
        <div className="flex w-[100%] items-center justify-between">
          <button
            type="button"
            className="flex h-[50px] w-[160px] items-center justify-between rounded-2xl bg-seventh-color px-7 text-[16px] text-font-color"
            onClick={toggleRole}
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
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-2">
        <div className="flex min-w-[25%] items-center">
          <Image
            src="/assets/icons/Rectangle 394207.svg"
            alt="image"
            width={50}
            height={50}
          />
          <h3 className="px-4 text-[16px] text-font-color">Superadmin</h3>
        </div>
        <p className="min-w-[25%] px-8 text-[16px] text-font-color">1</p>
        <p className="min-w-[22%]  text-[16px] text-font-color">45</p>
        <h3 className="min-w-[13%] text-[16px] text-font-color">0</h3>
        <div className="flex w-[100%] items-center justify-between">
          <button
            type="button"
            className="flex h-[50px] w-[160px] items-center justify-between rounded-2xl bg-seventh-color px-7 text-[16px] text-font-color"
            onClick={() => toggleRole}
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
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-2">
        <div className="flex min-w-[25%] items-center">
          <Image
            src="/assets/icons/Rectangle 394207.svg"
            alt="image"
            width={50}
            height={50}
          />
          <h3 className="px-4 text-[16px] text-font-color">Superadmin</h3>
        </div>
        <p className="min-w-[25%] px-8 text-[16px] text-font-color">1</p>
        <p className="min-w-[22%]  text-[16px] text-font-color">45</p>
        <h3 className="min-w-[13%] text-[16px] text-font-color">0</h3>
        <div className="flex w-[100%] items-center justify-between">
          <button
            type="button"
            className="flex h-[50px] w-[160px] items-center justify-between rounded-2xl bg-seventh-color px-7 text-[16px] text-font-color"
            onClick={() => toggleRole}
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
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-2">
        <div className="flex min-w-[25%] items-center">
          <Image
            src="/assets/icons/Rectangle 394207.svg"
            alt="image"
            width={50}
            height={50}
          />
          <h3 className="px-4 text-[16px] text-font-color">Superadmin</h3>
        </div>
        <p className="min-w-[25%] px-8 text-[16px] text-font-color">1</p>
        <p className="min-w-[22%]  text-[16px] text-font-color">45</p>
        <h3 className="min-w-[13%] text-[16px] text-font-color">0</h3>
        <div className="flex w-[100%] items-center justify-between">
          <button
            type="button"
            className="flex h-[50px] w-[160px] items-center justify-between rounded-2xl bg-seventh-color px-7 text-[16px] text-font-color"
            onClick={() => toggleRole}
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
    </div>
  );
};

export default Roles;
