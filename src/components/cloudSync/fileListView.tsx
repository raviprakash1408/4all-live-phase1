'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import Checkbox from '../checkbox/checkbox';

const FileListView = ({
  item,
  checkbox1,
}: {
  item: any;
  checkbox1: boolean;
}) => {
  const {
    id,
    title,
    type,
    cameraName,
    cameraName1,
    status,
    creationDate,
    completionDate,
    cloudService,
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
  if (cloudService === 'Google Drive') {
    img1 = '/assets/icons/GoogleDrive.svg';
  }
  if (cloudService === 'OneDrive') {
    img1 = '/assets/icons/OneDrive.svg';
  }
  if (cloudService === 'DropBox') {
    img1 = '/assets/icons/DropBox.svg';
  }
  if (cloudService === 'Ftp Google Drive') {
    img1 = '/assets/icons/FtpGoogleDrive.svg';
  }

  let statusImg;
  if (
    status === 'Completed' ||
    status === 'Queue' ||
    status === 'Cancelled' ||
    status === 'Stopped'
  ) {
    statusImg = '/assets/icons/CompletedImg.svg';
  } else {
    statusImg = '/assets/icons/ProcessingImg.svg';
  }

  return (
    <div>
      <div className="cursor-pointer select-none ">
        <div className="group relative  mt-2 flex h-14 w-[103rem] rounded-3xl border-2 border-tertiary-color bg-primary-color duration-300 ease-in-out hover:bg-tertiary-color ">
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
            <Image width={31} height={25} src={statusImg} alt="" />
          </div>
          <div className="ml-8 mt-3.5 w-36 whitespace-nowrap text-base font-normal text-quaternary-color">
            {title}
          </div>
          <div className="ml-16 flex flex-col">
            <div className="mt-1 whitespace-nowrap text-base font-normal text-quaternary-color">
              {type}
            </div>
            <div className="relative">
              <span className="absolute rounded-full bg-tertiary-color px-2 text-xs text-quaternary-color group-hover:bg-primary-color">
                {cameraName}
              </span>
              <span className="absolute -right-5 rounded-full bg-tertiary-color px-2 text-xs text-quaternary-color group-hover:bg-primary-color">
                {cameraName1}
              </span>
            </div>
          </div>
          <div className="ml-28  flex w-[17rem]">
            {(status === 'Completed' || status === 'Processing') && (
              <Image
                src="/assets/icons/completedDot.svg"
                alt=""
                className=" "
                width={10}
                height={10}
              />
            )}
            {(status === 'Cancelled' || status === 'Stopped') && (
              <Image
                src="/assets/icons/CanceledImg.svg"
                alt=""
                className=" "
                width={10}
                height={10}
              />
            )}
            {status === 'Uploading' && (
              <Image
                src="/assets/icons/QueueImg.svg"
                alt=""
                className=" "
                width={10}
                height={10}
              />
            )}
            <div className=" ml-2 mt-3.5 text-base font-normal text-quaternary-color">
              {status}
            </div>
          </div>
          <div className="ml-28 mt-3.5 text-base font-normal text-quaternary-color">
            {creationDate}
          </div>
          <div className="ml-28 mt-3.5 w-12 text-base font-normal text-quaternary-color">
            {status === 'Queue' ||
            status === 'Stopped' ||
            status === 'Processing'
              ? '--'
              : completionDate}
          </div>

          <div className="ml-40  w-24 text-base text-quaternary-color">
            <Image
              src={img1 || ''}
              width={25}
              height={22.35}
              alt=""
              className="mt-3"
            />
          </div>

          <button
            type="button"
            className=" top-4  ml-20 text-base font-medium text-quaternary-color"
          >
            <Image
              width={20}
              height={20}
              src="/assets/icons/DownloadRecording.svg"
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

export default FileListView;
