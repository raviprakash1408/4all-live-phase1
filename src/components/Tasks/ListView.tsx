'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import callApi from '@/utils/constants/apiCall';
import { MAIN_URL, TASK } from '@/utils/constants/apiUrls';

import Checkbox from '../checkbox/checkbox';
import ConfirmationPopup from '../confirmation';
import Toggle from '../toggle button/toggle';
import VideoPreview from './videoPreview';

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
  const StopTask = async () => {
    setShowCloseConfirmation(true);
    // setShowCancelling('Cancelling');

    try {
      await onDelete(item.task_id);
    } finally {
      // setShowCancelling('');
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
  let statusImg;
  if (item.task_type === 'live_recording') {
    statusImg = '/assets/icons/LiveRecording.svg';
  } else if (item.task_type === 'Mp4 generation') {
    statusImg = '/assets/icons/CompletedImg.svg';
  } else if (item.task_type === 'File deletion') {
    statusImg = '/assets/icons/FileDeletion.svg';
  }
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
  const formattedDate = format(new Date(item.created_date), 'dd-MM-yyyy');
  return (
    <div>
      <div className="cursor-pointer select-none">
        <div className="group relative ml-5 mt-2 flex h-max w-[101rem] rounded-3xl border-2 border-tertiary-color bg-primary-color pb-2 duration-300 ease-in-out hover:bg-tertiary-color ">
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
              src={statusImg || ''}
              alt=""
              className="mt-[2px]"
            />
          </div>
          <div className="ml-8 mt-3.5 w-36 whitespace-nowrap text-base font-normal text-quaternary-color">
            {item.name}
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
              <span className="absolute rounded-full bg-tertiary-color px-2 text-xs text-quaternary-color group-hover:bg-primary-color">
                {item?.live_recording_settings?.camera_name}
              </span>
            </div>
          </div>
          <div className="ml-12  flex w-[17rem] ">
            {(item.status === 'Completed' ||
              item.status === 'Processing' ||
              item.task_status === 'started') && (
              <div className="mt-[15px]">
                <Image
                  width={10}
                  height={10}
                  src="/assets/icons/completedDot.svg"
                  alt=""
                  className="mt-[6px]"
                />
              </div>
            )}
            {(item.task_status === 'Cancelled' ||
              item.task_status === 'Stopped' ||
              item.task_status === 'cancelling') && (
              <div className="mt-[15px]">
                <Image
                  width={10}
                  height={10}
                  src="/assets/icons/CanceledImg.svg"
                  alt=""
                  className="mt-[6px]"
                />
              </div>
            )}
            {item.status === 'Queue' ||
              (item.task_status === 'pending' && (
                <div className="mt-[15px]">
                  <Image
                    width={10}
                    height={10}
                    src="/assets/icons/QueueImg.svg"
                    alt=""
                    className="mt-[6px]"
                  />
                </div>
              ))}
            <div className=" ml-[15px] mt-3.5 text-base font-normal text-quaternary-color">
              {item.task_status}
            </div>
            {item.status === 'Completed' && (
              <>
                <button
                  type="button"
                  onClick={handleDownload}
                  className=" ml-4 mt-2 flex h-9  rounded-full bg-tertiary-color pl-4 pr-7 group-hover:bg-primary-color"
                >
                  <Image
                    width={0}
                    height={0}
                    src="/assets/icons/DownloadRecording.svg"
                    alt=""
                    className="mt-2 h-auto w-auto"
                  />
                  <span className="ml-2 mt-2 text-xs text-quaternary-color">
                    Download
                  </span>
                </button>
                {/* {clicked && (
                  <a
                    href={downloadUrl}
                    download
                    ref={(link) => {
                      if (link && clicked) {
                        link.click();
                        setClicked(false);
                      }
                    }}
                  >
                    Download Link
                  </a>
                )} */}

                <button
                  onClick={() => {
                    setPreview((prevalue) => !prevalue);
                  }}
                  type="button"
                  className="ml-2 mt-2 flex h-9 rounded-full bg-tertiary-color pl-4 pr-7 group-hover:bg-primary-color"
                >
                  <span className="ml-2 mt-2 text-xs text-quaternary-color">
                    Preview
                  </span>
                </button>
              </>
            )}
            {preview && (
              <div>
                <VideoPreview
                  url="https://playlists.mycujoo.football/eu/ckjvdj4k4f10e0gdrn9322dgm/master.m3u8"
                  onClose={() => {
                    setPreview(false);
                  }}
                />
              </div>
            )}
          </div>
          <div className="ml-20 mt-3.5 whitespace-nowrap text-base font-normal text-quaternary-color">
            {formattedDate}
          </div>
          <div className="ml-32 mt-3.5 w-12 text-base font-normal text-quaternary-color">
            {item.status === 'Queue' ||
            item.status === 'Stopped' ||
            item.status === 'Processing'
              ? '--'
              : item.completionDate}
          </div>

          <div className="ml-40 mt-3.5 w-24 text-base text-quaternary-color">
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
            className=" top-4  ml-28 text-base font-medium text-quaternary-color"
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
          <button
            type="button"
            disabled={cancelTask}
            onClick={StopTask}
            className=" top-5 ml-2 mt-2  text-xl font-bold text-quaternary-color"
          >
            <Image
              width={15}
              height={30}
              src="/assets/icons/stop-solid.svg"
              alt=""
            />
          </button>
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
