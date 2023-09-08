import Image from 'next/image';
import React from 'react';

const APIKeys = () => {
  return (
    <div className="w-[90%] rounded-3xl rounded-tl-none bg-tertiary-color p-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex h-[50px] w-[215px] items-center gap-3 rounded-[20px] bg-primary-color p-4 text-[16px] text-font-color"
        >
          <Image
            src="/assets/icons/plus.svg"
            alt="add"
            width={25}
            height={25}
          />
          Create new key
        </button>
        <button
          type="button"
          className="flex h-[50px] w-[215px] items-center gap-3 rounded-[20px] bg-primary-color p-4 text-[16px] text-font-color"
        >
          <Image
            src="/assets/icons/g1228.svg"
            alt="delete"
            width={21}
            height={25}
          />
          Delete (2)
        </button>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-primary-color p-4">
        <div className="flex min-w-[25%] items-center gap-3">
          <Image
            src="/assets/icons/Group 48095782.svg"
            alt="checkbox"
            width={20}
            height={20}
          />
          <p className="text-[16px] font-semibold text-font-color">Name</p>
        </div>
        <div className="min-w-[15%] max-w-[15%]">
          <p className="text-[16px] font-semibold text-font-color">Key</p>
        </div>
        <div className="flex min-w-[15%] items-center">
          <p className="text-[16px] font-semibold text-font-color">Last used</p>
        </div>
        <div className="flex min-w-[10%] items-center">
          <p className="text-[16px] font-semibold text-font-color">Created</p>
        </div>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-4">
        <div className=" flex min-w-[22%] items-center gap-3">
          <Image
            src="/assets/icons/Rectangle 39422.svg"
            alt="checkbox"
            width={20}
            height={20}
          />
          <p className="text-[16px] font-semibold text-font-color">
            voluptatem dolorum tenetur
          </p>
        </div>
        <div className="ml-[3%] flex min-w-[15%] max-w-[18%]">
          <p className="text-[16px] text-font-color">Key-2P..Q@ET9A0</p>
        </div>
        <div className="flex min-w-[15%] max-w-[15%] items-center">
          <p className="text-[16px]  text-font-color">Sun Dec 5 2023</p>
        </div>
        <div className=" flex min-w-[8%] max-w-[10%] items-center">
          <p className="text-[16px] text-font-color">Sun Dec 14 2023</p>
        </div>
        <div className="ml-[20%] flex min-w-[10%] max-w-[10%] items-center">
          <button type="button">
            <Image
              src="/assets/icons/Group 48095882.svg"
              alt="..."
              width={70}
              height={50}
            />
          </button>
        </div>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-4">
        <div className=" flex min-w-[22%] items-center gap-3">
          <Image
            src="/assets/icons/checked.svg"
            alt="checkbox"
            width={20}
            height={20}
          />
          <p className="text-[16px] font-semibold text-font-color">
            voluptatem dolorum tenetur
          </p>
        </div>
        <div className="ml-[3%] flex min-w-[15%] max-w-[18%]">
          <p className="text-[16px] text-font-color">Key-2P..Q@ET9A0</p>
        </div>
        <div className="flex min-w-[15%] max-w-[15%] items-center">
          <p className="text-[16px]  text-font-color">Sun Dec 5 2023</p>
        </div>
        <div className=" flex min-w-[8%] max-w-[10%] items-center">
          <p className="text-[16px] text-font-color">Sun Dec 14 2023</p>
        </div>
        <div className="ml-[20%] flex min-w-[10%] max-w-[10%] items-center">
          <button type="button">
            <Image
              src="/assets/icons/Group 48095882.svg"
              alt="..."
              width={70}
              height={50}
            />
          </button>
        </div>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-4">
        <div className=" flex min-w-[22%] items-center gap-3">
          <Image
            src="/assets/icons/checked.svg"
            alt="checkbox"
            width={20}
            height={20}
          />
          <p className="text-[16px] font-semibold text-font-color">
            voluptatem dolorum tenetur
          </p>
        </div>
        <div className="ml-[3%] flex min-w-[15%] max-w-[18%]">
          <p className="text-[16px] text-font-color">Key-2P..Q@ET9A0</p>
        </div>
        <div className="flex min-w-[15%] max-w-[15%] items-center">
          <p className="text-[16px]  text-font-color">Sun Dec 5 2023</p>
        </div>
        <div className=" flex min-w-[8%] max-w-[10%] items-center">
          <p className="text-[16px] text-font-color">Sun Dec 14 2023</p>
        </div>
        <div className="ml-[20%] flex min-w-[10%] max-w-[10%] items-center">
          <button type="button">
            <Image
              src="/assets/icons/Group 48095882.svg"
              alt="..."
              width={70}
              height={50}
            />
          </button>
        </div>
      </div>
      <div className="my-3 flex h-[70px] w-[100%] items-center rounded-[20px] bg-sixth-color p-4">
        <div className=" flex min-w-[22%] items-center gap-3">
          <Image
            src="/assets/icons/Rectangle 39422.svg"
            alt="checkbox"
            width={20}
            height={20}
          />
          <p className="text-[16px] font-semibold text-font-color">
            voluptatem dolorum tenetur
          </p>
        </div>
        <div className="ml-[3%] flex min-w-[15%] max-w-[18%]">
          <p className="text-[16px] text-font-color">Key-2P..Q@ET9A0</p>
        </div>
        <div className="flex min-w-[15%] max-w-[15%] items-center">
          <p className="text-[16px]  text-font-color">Sun Dec 5 2023</p>
        </div>
        <div className=" flex min-w-[8%] max-w-[10%] items-center">
          <p className="text-[16px] text-font-color">Sun Dec 14 2023</p>
        </div>
        <div className="ml-[20%] flex min-w-[10%] max-w-[10%] items-center">
          <button type="button">
            <Image
              src="/assets/icons/Group 48095882.svg"
              alt="..."
              width={70}
              height={50}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default APIKeys;
