'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import callApi from '@/utils/constants/apiCall';
import { MAIN_URL, TASK } from '@/utils/constants/apiUrls';

import Checkbox from '../checkbox/checkbox';
import ConfirmationPopup from '../confirmation';
import Toggle from '../toggle button/toggle';

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
  const [toggle, setToggle] = useState(item.notification);
  const [checkbox, setCheckbox] = useState(false);
  const [preview, setPreview] = useState(false);
  // const [cameraNames, setCameraNames] = useState(false);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const [cancelTask, setCancelTask] = useState(false);
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

  const handleToggle = () => {
    setToggle((val: boolean) => !val);
  };

  const downloadUrl =
    'https://playlists.mycujoo.football/eu/ckjvdj4k4f10e0gdrn9322dgm/master.m3u8';
  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'filename.m3u8'; // Set the desired file name here
    link.click();
  };
  // console.log('dropdown', cameraNames);
  // const formattedDate = format(new Date(item.created_date), 'dd-MM-yyyy');
  return (
    <div>
      <div className="cursor-pointer select-none">
        <div className="group relative ml-5 mt-2 flex h-[70px] w-[91vw] items-center rounded-3xl border-2 border-tertiary-color bg-primary-color pb-2 duration-300 ease-in-out hover:bg-tertiary-color ">
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
          <div className="ml-8 mt-3.5 w-6 text-base font-medium text-quaternary-color">
            <Image
              width={22}
              height={21}
              src="/assets/icons/eventsImg.svg"
              alt=""
              className="mt-[2px]"
            />
          </div>
          <div className="ml-8 mt-3.5 w-36 whitespace-nowrap text-base font-normal text-font-color">
            {item.title}
          </div>
          <div className="ml-16 flex w-48 flex-col">
            <div
              className={`mt-1 ${
                item.type === 'File deletion' ? 'mt-4' : ''
              } whitespace-nowrap text-base font-normal text-quaternary-color`}
            >
              {item.task_type}
            </div>
            <div className="relative pb-4 pt-1">
              <span className="absolute rounded-full bg-tertiary-color px-2 text-xs text-font-color group-hover:bg-primary-color">
                {item?.live_recording_settings?.camera_name}
              </span>
            </div>
          </div>

          <div className="ml-8 mt-3.5 whitespace-nowrap text-base font-normal text-font-color">
            {item.startDate}
          </div>
          <div className="ml-32 mt-3.5 w-12 text-base font-normal text-font-color">
            {item.status === 'Queue' ||
            item.status === 'Stopped' ||
            item.status === 'Processing'
              ? '--'
              : item.endDate}
          </div>

          <div className="ml-40 mt-3.5 w-24 text-base text-font-color">
            {(item.status === 'Queue' ||
              item.status === 'Processing' ||
              item.status === 'Stopped') && (
              <Toggle
                text
                id={item.title}
                button={toggle}
                onClick={handleToggle}
                textType="On"
              />
            )}
          </div>

          <button
            type="button"
            className=" top-4  ml-28 text-base font-medium text-font-color"
          >
            {/* {(item.status === 'Completed' || item.status === 'Cancelled') && (
              <Image
                width={22}
                height={21}
                src="/assets/icons/Refresh.svg"
                alt=""
              />
            )} */}
            {/* {(item.status === 'Queue' || item.status === 'Processing') && (
              <Image
                width={15}
                height={21}
                src="/assets/icons/PauseImg.svg"
                alt=""
              />
            )} */}
            {item.status === 'Stopped' && (
              <Image
                width={17}
                height={22}
                src="/assets/icons/PlayImg.svg"
                alt=""
              />
            )}
          </button>
          {/* <button
            type="button"
            disabled={cancelTask}
            // onClick={StopTask}
            className=" top-5 ml-2 mt-2  text-xl font-bold text-quaternary-color"
          >
            <Image
              width={15}
              height={30}
              src="/assets/icons/stop-solid.svg"
              alt=""
            />
          </button> */}
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
