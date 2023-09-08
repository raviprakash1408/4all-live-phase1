import Image from 'next/image';
import React from 'react';

const Index = () => {
  return (
    <div className="flex h-[100vh] w-[100%] justify-between bg-primary-color p-4">
      <div className="flex h-[92%] w-[100%] justify-between rounded-[20px] bg-tertiary-color p-4">
        <div className="flex w-[46%] flex-col">
          <div className="flex h-[max-content] w-[100%] justify-between gap-4">
            <div className="relative min-h-[160px] min-w-[160px]">
              <Image
                src="/assets/images/Rectangle 39411.svg"
                alt="product"
                width={160}
                height={160}
              />
              <Image
                src="/assets/icons/Group.svg"
                alt="avatar"
                width={25}
                height={25}
                className="absolute left-16 top-16"
              />
            </div>
            <div className="flex h-[100%] w-[100%] items-start gap-4 rounded-[20px] border-2 border-sixth-color p-4">
              <div>
                <Image
                  src="/assets/icons/Group 48095819.svg"
                  alt="description"
                  width={25}
                  height={25}
                />
              </div>
              <div className="flex flex-col">
                <p className="text-[12px] text-[#808080]">Description</p>
                <p className="w-[90%] text-[16px] text-font-color">
                  Twenty 30-second applications within half an hour is well in
                  excess of almost anyone’s use of a sani
                </p>
                <p className="mt-6 self-end text-[12px] text-[#808080]">
                  250 characters
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex w-[100%] flex-wrap justify-between gap-6">
            <div className="flex h-[50px] w-[380px] gap-3 rounded-[20px] border-2 border-sixth-color p-3">
              <div>
                <Image
                  src="/assets/icons/Group 48095768.svg"
                  alt="event-name"
                  width={25}
                  height={25}
                />
              </div>
              <div className="-mt-2">
                <p className="text-[12px] text-[#808080]">Event Name</p>
                <input
                  type="text"
                  value="2024 Grammy's"
                  className="absolute w-[300px] border-none bg-tertiary-color text-[16px] text-font-color outline-none"
                />
              </div>
            </div>
            <div className="flex h-[50px] w-[380px] gap-3 rounded-[20px] border-2 border-sixth-color p-3">
              <div>
                <Image
                  src="/assets/icons/g2509.svg"
                  alt="location"
                  width={17}
                  height={25}
                />
              </div>
              <div className="-mt-2">
                <p className="text-[12px] text-[#808080]">Location</p>
                <input
                  type="text"
                  value="Convention center"
                  className="absolute w-[300px] border-none bg-tertiary-color text-[16px] text-font-color outline-none"
                />
              </div>
            </div>
            <div className="flex h-[50px] w-[380px] gap-3 rounded-[20px] border-2 border-sixth-color p-3">
              <div>
                <Image
                  src="/assets/icons/start-date.svg"
                  alt="location"
                  width={25}
                  height={25}
                />
              </div>
              <div className="-mt-2">
                <p className="text-[12px] text-[#808080]">Start date</p>
                <input
                  type="text"
                  value="Tue Apr 27 2066 17:06:14 GMT-0500"
                  className="absolute w-[300px] border-none bg-tertiary-color text-[16px] text-font-color outline-none"
                />
              </div>
            </div>
            <div className="flex h-[50px] w-[380px] gap-3 rounded-[20px] border-2 border-sixth-color p-3">
              <div>
                <Image
                  src="/assets/icons/end-date.svg"
                  alt="location"
                  width={25}
                  height={25}
                />
              </div>
              <div className="-mt-2">
                <p className="text-[12px] text-[#808080]">End date</p>
                <input
                  type="text"
                  value="Mon Aug 12 2058 20:50 GMT-0500"
                  className="absolute w-[300px] border-none bg-tertiary-color text-[16px] text-font-color outline-none"
                />
              </div>
            </div>
            <div className="flex h-[50px] w-[380px] gap-3 rounded-[20px] border-2 border-sixth-color p-3">
              <div>
                <Image
                  src="/assets/icons/Group 48095761.svg"
                  alt="location"
                  width={25}
                  height={25}
                />
              </div>
              <div className="-mt-2">
                <p className="text-[12px] text-[#808080]">Language</p>
                <input
                  type="text"
                  value="Auto-detect"
                  className="absolute w-[300px] border-none bg-tertiary-color text-[16px] text-font-color outline-none"
                />
              </div>
            </div>
            <div className="flex h-[50px] w-[380px] gap-3 rounded-[20px] border-2 border-sixth-color p-3">
              <div>
                <Image
                  src="/assets/icons/privacy.svg"
                  alt="location"
                  width={21}
                  height={25}
                />
              </div>
              <div className="-mt-2">
                <p className="text-[12px] text-[#808080]">Privacy</p>
                <input
                  type="text"
                  value="Public"
                  className="absolute w-[300px] border-none bg-tertiary-color text-[16px] text-font-color outline-none"
                />
              </div>
            </div>
            <div className="relative">
              <button
                className="h-[50px] w-[380px] rounded-[20px] bg-[#FF4615] text-[16px] text-font-color"
                type="button"
              >
                Apply
              </button>
              <Image
                src="/assets/icons/apply.svg"
                alt="apply"
                width={25}
                height={25}
                className="absolute left-3 top-3"
              />
            </div>
            <div className="relative">
              <button
                className="h-[50px] w-[380px] rounded-[20px] border-2 border-seventh-color bg-tertiary-color text-[16px] text-font-color"
                type="button"
              >
                Delete
              </button>
              <Image
                src="/assets/icons/delete.svg"
                alt="delete"
                width={17}
                height={17}
                className="absolute left-4 top-4"
              />
            </div>
          </div>
        </div>
        <div className="flex h-[332px] w-[49%] flex-col items-center rounded-[20px] bg-sixth-color p-5">
          <h3 className="text-[20px] text-font-color">Join the event</h3>
          <p className="text-[16px] text-[#A4A4A4]">
            use the following QR code to access the live event.
          </p>
          <Image
            src="/assets/icons/Group 48095792.svg"
            alt="qr"
            width={74}
            height={74}
            className="m-3"
          />
          <div className="flex  h-[50px] w-[100%] items-center justify-between rounded-[20px] border-2 border-[#343434] p-3">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/icons/Group 48095793.svg"
                alt="link"
                width={25}
                height={25}
              />
              <div className="flex flex-col">
                <p className="text-[12px] text-[#808080]">Event link</p>
                <p className="text-[16px] text-font-color">
                  4all.live/share/ces2024camqret
                </p>
              </div>
            </div>
            <Image
              src="/assets/icons/g495.svg"
              alt="copy"
              width={25}
              height={25}
            />
          </div>
          <div className="relative w-[100%]">
            <button
              type="button"
              className="mt-4 h-[50px] w-[100%] rounded-[20px] bg-[#FF4615] text-[16px] text-[#FFF]"
            >
              Live Setup
            </button>
            <Image
              src="/assets/icons/live.svg"
              alt="live"
              width={25}
              height={25}
              className="absolute left-2 top-7"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
