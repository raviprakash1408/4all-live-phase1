'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import Checkbox from '../checkbox/checkbox';
import SmallRadialBar from '../ProgressBar/smallRadial';

const CLoudList = ({ item, checkbox1 }: { item: any; checkbox1: boolean }) => {
  const {
    id,
    title,
    type,
    freeSpace,
    totalSpace,
    status,
    creationDate,
    completionDate,
    // cloudService,
  } = item;
  const [checkbox, setCheckbox] = useState(false);
  // console.log('checkBox', checkbox, id);

  useEffect(() => {
    if (checkbox1 === true) {
      setCheckbox(true);
    }
    if (checkbox1 === false) {
      setCheckbox(false);
    }
    // console.log('checkboxselect', checkbox1);
  }, [checkbox1]);
  let img1;
  if (title === 'Google Drive') {
    img1 = '/assets/icons/GoogleDrive.svg';
  }
  if (title === 'One Drive') {
    img1 = '/assets/icons/OneDrive.svg';
  }
  if (title === 'DropBox') {
    img1 = '/assets/icons/DropBox.svg';
  }
  if (title === 'FTP - Meetmo Hosting') {
    img1 = '/assets/icons/FtpGoogleDrive.svg';
  }
  let progress = 0;
  const totalSpaceInGB = item.totalSpace.includes('TB')
    ? parseFloat(item.totalSpace) * 1000
    : parseFloat(item.totalSpace);

  if (!Number.isNaN(totalSpaceInGB)) {
    progress = (parseFloat(item.freeSpace) / totalSpaceInGB) * 100;
  }
  // let statusImg;
  // if (
  //   status === 'Completed' ||
  //   status === 'Queue' ||
  //   status === 'Cancelled' ||
  //   status === 'Stopped'
  // ) {
  //   statusImg = '/assets/icons/CompletedImg.svg';
  // } else {
  //   statusImg = '/assets/icons/ProcessingImg.svg';
  // }

  return (
    <div>
      <div className="cursor-pointer select-none">
        <div className="group relative ml-5 mt-2 flex h-14 w-[103rem] rounded-3xl border-2 border-tertiary-color bg-primary-color duration-300 ease-in-out hover:bg-tertiary-color ">
          <div className="ml-2.5 mt-4">
            <Checkbox
              backgroundColor=""
              id={id}
              type="Square"
              button={checkbox}
              onClick={() => {
                setCheckbox(!checkbox);
              }}
            />
          </div>
          <div className="ml-8 mt-3.5 w-6 text-base font-medium text-quaternary-color">
            <Image width={25} height={25} src={img1 || ''} alt="" />
          </div>
          <div className="ml-8 mt-3.5 w-44 whitespace-nowrap text-base font-normal text-quaternary-color">
            {title}
          </div>
          <div className="ml-28 flex flex-col">
            <div className=" mt-3 w-8 whitespace-nowrap text-base font-normal text-quaternary-color">
              {type}
            </div>
          </div>
          <div className="relative ml-40 mt-1 flex w-28 flex-row whitespace-nowrap text-base font-normal text-quaternary-color">
            {/* <div className="absolute bottom-[73px] left-28"> */}
            {/* <RadialProgressBar progress={40} radius={10} /> */}
            <div className="">
              <SmallRadialBar
                progress={progress}
                radius={20}
                hoverColor="group-hover:text-primary-color"
              />
            </div>
            {/* </div> */}
            <div className="ml-4 mt-2">
              {freeSpace} / {totalSpace}
            </div>
          </div>
          <div className="ml-40  flex w-[14rem]">
            {(status === 'Completed' || status === 'Processing') && (
              <Image
                width={10}
                height={10}
                src="/assets/icons/completedDot.svg"
                alt=""
                className=" "
              />
            )}
            {(status === 'Connection Failed' || status === 'Stopped') && (
              <Image
                width={10}
                height={10}
                src="/assets/icons/CanceledImg.svg"
                alt=""
                className=" "
              />
            )}
            {status === 'Uploading' && (
              <Image
                width={10}
                height={10}
                src="/assets/icons/QueueImg.svg"
                alt=""
                className=" "
              />
            )}
            <div className=" ml-2 mt-3.5 text-base font-normal text-quaternary-color">
              {status}
            </div>
          </div>
          <div className=" mt-3.5 text-base font-normal text-quaternary-color">
            {creationDate}
          </div>
          <div className="ml-28 mt-3.5 w-12 text-base font-normal text-quaternary-color">
            {status === 'Queue' ||
            status === 'Stopped' ||
            status === 'Processing'
              ? '--'
              : completionDate}
          </div>

          {/* <div className="ml-40  w-24 text-base text-quaternary-color">
            <img src={img1} alt="" className="mt-3 h-7" />
          </div> */}

          <button
            type="button"
            className=" top-4  ml-48 text-base font-medium text-quaternary-color"
          >
            <Image
              width={20}
              height={20}
              src="/assets/icons/Pencil.svg"
              alt=""
            />
          </button>
          <button
            type="button"
            className=" top-5 ml-8  text-xl font-bold text-quaternary-color"
          >
            <Image
              width={11}
              height={11}
              src="/assets/icons/CloseIcon2.svg"
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CLoudList;
