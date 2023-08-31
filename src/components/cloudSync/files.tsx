import Image from 'next/image';
import React from 'react';

import { HalfCurvedButtons } from '..';
import RadialProgressBar from '../ProgressBar';
import FileList from './filesList';
import NewCloud from './newCloud';

const uploadFiles = [
  {
    id: 1,
    title: 'Google Drive',
    img: '/assets/icons/GoogleDrive.svg',
    freeSpace: '54 GB',
    totalSpace: '264 GB',
  },
  {
    id: 2,
    title: 'One Drive',
    img: '/assets/icons/OneDrive.svg',
    freeSpace: '540 GB',
    totalSpace: '1 TB',
  },
  {
    id: 3,
    title: 'Dropbox',
    img: '/assets/icons/DropBox.svg',
    freeSpace: '87 GB',
    totalSpace: '100 GB',
  },
  {
    id: 4,
    title: 'Google Drive',
    img: '/assets/icons/FtpGoogleDrive.svg',
    freeSpace: '54 GB',
    totalSpace: '256 GB',
  },
];
const Files = () => {
  // const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
  //   // Prevent the default scroll behavior
  //   event.preventDefault();

  //   // Calculate the new scroll position based on the mouse wheel delta
  //   const scrollDelta = event.deltaY;
  //   const scrollAmount = 30; // Adjust this value to control the scrolling speed
  //   const scrollableContent = event.currentTarget;
  //   scrollableContent.scrollLeft +=
  //     scrollDelta > 0 ? scrollAmount : -scrollAmount;
  // };
  return (
    <div>
      <div className="ml-3 mt-4 grid max-w-[100%] gap-2 md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3  2xl:grid-cols-4">
        {uploadFiles.map((item) => {
          let progress = 0;
          const totalSpaceInGB = item.totalSpace.includes('TB')
            ? parseFloat(item.totalSpace) * 1000
            : parseFloat(item.totalSpace);

          if (!Number.isNaN(totalSpaceInGB)) {
            progress = (parseFloat(item.freeSpace) / totalSpaceInGB) * 100;
          }
          return (
            <div
              key={item.id}
              className="relative flex h-32 rounded-3xl bg-tertiary-color "
            >
              <div className="mx-4 mt-8 h-16 w-16 rounded-full bg-fifth-color">
                <Image
                  width={70}
                  height={58}
                  src={item.img}
                  alt=""
                  className="p-2"
                />
              </div>
              <div className="ml-2 mt-9 flex flex-col whitespace-nowrap lg:w-[9vw] 2xl:w-[7vw]">
                <span className="text-font-color sm:text-base lg:text-xl">
                  {item.title}
                </span>
                <span className="ml-1 text-sm text-quaternary-color sm:text-xs lg:text-sm">
                  {item.freeSpace} / {item.totalSpace}
                </span>
              </div>
              <div className="">
                <RadialProgressBar progress={progress} radius={40} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex ">
        <NewCloud />
        <div className="ml-4 mt-[14px] rounded-full border-2 border-primary-color ">
          <HalfCurvedButtons
            content="Upload"
            height="min-[400px]:h-8 min-[1600px]:h-9"
            width="w-[8.2rem]"
            image="/assets/icons/Clouds.svg"
            backgroundColor="bg-tertiary-color"
            halfCurved={false}
            textcolor="text-quaternary-color hover:border-quaternary-color cursor-pointer"
            textsize="text-sm pl-[12px]"
          />
        </div>
        <div className="ml-4 mt-[14px] rounded-full border-2 border-primary-color ">
          <HalfCurvedButtons
            content=" Delete "
            height="min-[400px]:h-8 min-[1600px]:h-9"
            width="w-[8.2rem]"
            image="/assets/icons/icon25.svg"
            backgroundColor="bg-tertiary-color"
            halfCurved={false}
            textcolor="text-quaternary-color hover:border-quaternary-color cursor-pointer"
            textsize="text-sm pl-[12px]"
          />
        </div>
      </div>
      <div
        // onWheel={handleScroll}
        id="scrollable-content"
        className="custom-scrollbar ml-5 overflow-x-auto  overflow-y-hidden"
      >
        <FileList />
      </div>
    </div>
  );
};

export default Files;
