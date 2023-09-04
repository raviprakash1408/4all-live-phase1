/* eslint-disable no-console */

'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import callApi from '@/utils/constants/apiCall';
import { MAIN_URL, TASK } from '@/utils/constants/apiUrls';

import { CurvedButton } from '../button/curvedButton';
import Checkbox from '../checkbox/checkbox';
import ConfirmationPopup from '../confirmation';

const ListView = ({
  item,
  checkbox1,
  onItemSelect,
}: // onDelete,
{
  item: any;
  checkbox1: boolean;
  onItemSelect: (selectedItem: any) => void;
  // onDelete: (status: number) => void;
}) => {
  const [, setToggle] = useState(item.notification);
  const [checkbox, setCheckbox] = useState(false);
  // const [preview, setPreview] = useState(false);
  // const [cameraNames, setCameraNames] = useState(false);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const [, setCancelTask] = useState(false);
  // const [showCancelling, setShowCancelling] = useState('');

  // const handleCloseClick = () => {
  //   setShowCloseConfirmation(true);
  // };
  // console.log('checkBox', checkbox, id);
  console.log('index', item);

  const onDelete = async (itemId: any) => {
    try {
      const jsonData = await callApi<any>(
        `${MAIN_URL}${TASK}/${itemId}/cancel`,
        'POST'
      );

      console.log('jsonData', jsonData);
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  useEffect(() => {
    if (item.task_status === 'cancelled' || item.task_status === 'cancelling') {
      setCancelTask(true); // Disable the button
    }
  }, [item.task_status]);

  useEffect(() => {
    if (checkbox1 === true) {
      setCheckbox(true);
    }
    if (checkbox1 === false) {
      setCheckbox(false);
    }
    // console.log('checkboxselect', checkbox1);
  }, [checkbox1]);
  useEffect(() => {
    if (item.notification === true) {
      setToggle(true);
    }
  });

  // const handleToggle = () => {
  //   setToggle((val: boolean) => !val);
  // };

  // const downloadUrl =
  //   'https://playlists.mycujoo.football/eu/ckjvdj4k4f10e0gdrn9322dgm/master.m3u8';
  // const handleDownload = () => {
  //   // Create a temporary link element
  //   const link = document.createElement('a');
  //   link.href = downloadUrl;
  //   link.download = 'filename.m3u8'; // Set the desired file name here
  //   link.click();
  // };
  // console.log('dropdown', cameraNames);
  // const formattedDate = format(new Date(item.created_date), 'dd-MM-yyyy');
  return (
    <div>
      <div className="cursor-pointer select-none">
        <div className="group relative ml-5 mt-2 flex h-[70px] w-[86vw] items-center rounded-3xl border-2 border-tertiary-color bg-sixth-color pb-2 duration-300 ease-in-out hover:bg-tertiary-color ">
          <div className="ml-2.5 mt-4">
            <Checkbox
              backgroundColor=""
              id={item.id}
              type="Square"
              button={checkbox}
              onClick={() => {
                setCheckbox(!checkbox);

                if (!checkbox) {
                  onItemSelect(item.id); // Send the ID only if checkbox is checked
                }
              }}
            />
          </div>
          <div className="ml-4 mt-3.5  text-base font-medium text-quaternary-color">
            <Image
              width={50}
              height={50}
              src="/assets/icons/eventsImg.svg"
              alt=""
              className="mt-[2px]"
            />
          </div>
          <div className="ml-8 mt-3.5 w-[20vw] whitespace-nowrap text-base font-normal text-font-color">
            {item.title}
          </div>

          <div className="ml-8 mt-3.5 w-[11vw] whitespace-nowrap text-base font-normal text-font-color">
            {item.startDate}
          </div>
          <div className="mt-3.5 w-[11vw] text-base font-normal text-font-color">
            {item.status === 'Queue' ||
            item.status === 'Stopped' ||
            item.status === 'Processing'
              ? '--'
              : item.endDate}
          </div>

          <div className=" mt-[9px] w-[15vw] text-base text-font-color">
            <div className="relative w-[173px] cursor-pointer">
              <CurvedButton
                backgroundColor="bg-seventh-color"
                height="min-[400px]:h-12 min-[1600px]:h-12"
              >
                <span className="ml-7 text-base text-font-color">
                  {' '}
                  Download
                </span>
              </CurvedButton>
              <Image
                src="/assets/icons/Download.svg"
                height={25}
                width={25}
                alt=""
                className="absolute left-[14px] top-2.5"
              />
            </div>
          </div>
          <div className=" flex">
            <div className="mt-[7px] text-lg text-font-color">
              {item.language}
            </div>
            <Image
              src="/assets/icons/flag.svg"
              height={36}
              width={36}
              alt=""
              className=" ml-2 mt-[4px]"
            />
          </div>
          <div className="relative ml-14 mt-[9px]  w-[150px] cursor-pointer">
            <CurvedButton
              backgroundColor="bg-seventh-color"
              height="min-[400px]:h-12 min-[1600px]:h-12"
            >
              <span className="ml-7 text-base text-font-color"> Setup</span>
            </CurvedButton>
            <Image
              src="/assets/icons/Setup.svg"
              height={25}
              width={25}
              alt=""
              className="absolute left-[14px] top-3"
            />
          </div>
        </div>
      </div>

      {showCloseConfirmation && (
        <ConfirmationPopup
          title="Are you sure you want to cancel this task?"
          onConfirmation={(confirmed) => {
            if (confirmed) {
              onDelete(item.id);
            }
            setShowCloseConfirmation(false);
          }}
        />
      )}
    </div>
  );
};

export default ListView;
