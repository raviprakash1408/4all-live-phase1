'use client';

import Image from 'next/image';
import type { ChangeEvent } from 'react';
import React, { useEffect, useReducer, useRef, useState } from 'react';

import { getStreamIdFromRtspUrl } from '@/utils/common';
import callApi from '@/utils/constants/apiCall';
import { CAMERA_LIST, MAIN_URL } from '@/utils/constants/apiUrls';

import { HalfCurvedButtons } from '../halfcurvedbuttons';
import InputField from '../input field/InputField';
import ReactPlayers from '../reactPLayer';
import Toast from '../Toast';
import Toggle from '../toggle button/toggle';
import type { CameraFormFields } from './types';

const initialState = {
  name: '',
  rtsp_url: '',
  ping_url: '',
  storage_path: '',
  rtsp_offline: false,
  device_offline: false,
};

// async function postData(url: any, Postdata: any) {
//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(Postdata),
//     });

//     if (!response.ok) {
//       throw new Error('API request failed');
//     }

//     return await response.json();
//   } catch (error) {
//     // Handle error, e.g., display an error message
//     console.error('API request error:', error);
//     throw error;
//   }
// }

const reducer = (
  state: CameraFormFields,
  action: {
    type:
      | 'SET_CAMERA_NAME'
      | 'SET_RTSP_LINK'
      | 'SET_PING_LINK'
      | 'SET_STORAGE_PATH';
    value: string;
  }
) => {
  switch (action.type) {
    case 'SET_CAMERA_NAME':
      return {
        ...state,
        name: action.value,
      };
    case 'SET_RTSP_LINK':
      return {
        ...state,
        rtsp_url: action.value,
      };
    case 'SET_PING_LINK':
      return {
        ...state,
        ping_url: action.value,
      };
    case 'SET_STORAGE_PATH':
      return {
        ...state,
        storage_path: action.value,
      };
    default:
      return state;
  }
};

const NewCamera = ({
  onCameraCreated,
}: {
  onCameraCreated: (isNewCameraCreated: boolean) => void;
}) => {
  const [popup, setPopup] = useState(false);
  // const [value1, setValue1] = useState(false);
  const [rtsp, setRtsp] = useState(false);
  const [device, setDevice] = useState(false);

  // const [inputValue, setInputValue] = useState('');
  const [error1, setError] = useState('');
  const [camera, dispatch] = useReducer(reducer, initialState);
  const [streamId, setStreamId] = useState('');
  const [videoLoading, setVideoLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);

  const handleToggle = () => {
    setRtsp((val) => !val);
  };
  const handleToggle1 = () => {
    setDevice((val) => !val);
  };

  const handleChangeFields = async (field: string, value: string) => {
    setError('');

    if (field === 'rtsp_link') {
      const url = `${MAIN_URL}cameras/rtsp/check?url=${value}`;

      try {
        setVideoLoading(true);
        const result = await callApi<any>(url, 'POST', {}); // Use the callApi function here
        console.log('API response:', result);

        if (result.status === 'success') {
          const streamIdRes = getStreamIdFromRtspUrl(value);

          if (streamIdRes) {
            setStreamId(result.streaming_url || '');
          }
        } else {
          setStreamId('');
          setError('Please enter a valid URL.');
        }
      } catch (error) {
        setStreamId('');

        console.error('API request error:', error);
      } finally {
        setVideoLoading(false);
      }
    }
    dispatch({
      type: `SET_${field.toUpperCase()}` as
        | 'SET_CAMERA_NAME'
        | 'SET_RTSP_LINK'
        | 'SET_PING_LINK'
        | 'SET_STORAGE_PATH',
      value,
    });
  };
  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setPopup(false);
      }
    };

    const handleEscapeKey = (event: any) => {
      if (event.key === 'Escape') {
        setPopup(false);
      }
    };

    if (popup) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [popup]);

  // const handleChangeFields = (
  //   field: 'camera_name' | 'rtsp_link' | 'ping_link' | 'storage_path',
  //   value: string
  // ) => {
  //   dispatch({
  //     type: `SET_${field.toUpperCase()}` as
  //       | 'SET_CAMERA_NAME'
  //       | 'SET_RTSP_LINK'
  //       | 'SET_PING_LINK'
  //       | 'SET_STORAGE_PATH',
  //     value,
  //   });
  // };
  // console.log('data', rtsp, device);
  const handleSubmit = async () => {
    const url = `${MAIN_URL}${CAMERA_LIST}`;

    const postData1 = {
      name: camera.name,
      rtsp_url: camera.rtsp_url,
      ping_url: camera.ping_url,
      storage_path: camera.storage_path,
      rtsp_offline: rtsp,
      device_offline: device,
    };

    try {
      const result = await callApi(url, 'POST', postData1);
      console.log('API response:', result);

      // Show the Toast with a success message
      setShowToast(true);
    } catch (error) {
      console.error('API request error:', error);

      // Show the Toast with an error message
      setShowToast(true);
    }
    onCameraCreated(true);

    setPopup(false);
  };
  useEffect(() => {
    if (!popup) {
      // Reset the form fields when the popup is closed
      onCameraCreated(false);

      dispatch({ type: 'SET_CAMERA_NAME', value: '' });
      dispatch({ type: 'SET_RTSP_LINK', value: '' });
      dispatch({ type: 'SET_PING_LINK', value: '' });
      dispatch({ type: 'SET_STORAGE_PATH', value: '' });
      setRtsp(false);
      setDevice(false);
      setStreamId('');
      setError('');
      setVideoLoading(false);
    }
  }, [popup]);
  const handleToastClose = () => {
    setShowToast(false);
  };
  useEffect(() => {
    let hasEmptyInput = false;

    if (
      camera.name === '' ||
      camera.rtsp_url === '' ||
      camera.ping_url === ''
    ) {
      hasEmptyInput = true;
    } else {
      hasEmptyInput = false;
    }

    setEmptyInput(hasEmptyInput);
  });
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setTimeout(() => {
            setPopup(!popup);
          }, 400);
        }}
        className="ml-4"
      >
        <HalfCurvedButtons
          content="New Live Feed"
          height="min-[400px]:h-8 min-[1600px]:h-9"
          width="w-44"
          image="/assets/icons/icon10.svg"
          backgroundColor="bg-tertiary-color"
          halfCurved={false}
          textcolor="text-quaternary-color hover:border-quaternary-color"
          textsize="text-sm"
        />
      </button>

      {popup && (
        <div className="">
          <div className=" absolute bottom-0 left-0 z-10 max-h-full bg-fifthOpacity-color min-[1px]:w-[400%] min-[320px]:w-[400%] sm:w-[full] md:h-full md:w-[184%] lg:w-[138%] xl:w-full">
            <div className="absolute inset-0 z-50 flex items-center justify-center">
              <div
                className="w-[40rem] bg-primary-color sm:rounded-2xl"
                ref={popupRef}
              >
                <div className="flex items-end justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setPopup(false);
                    }}
                  >
                    <Image
                      width={0}
                      height={0}
                      src="/assets/icons/close.svg"
                      alt=""
                      className=" absolute -ml-3 mt-[-6px] h-auto w-auto select-none"
                    />
                  </button>
                </div>
                <div className="select-none pt-[20px] text-center text-base text-font-color">
                  New Live Feed
                </div>

                <hr className="ml-[26px] mt-4 w-[90%] border border-tertiary-color" />

                <div className="flex justify-center">
                  <div className="mb-3 mt-4 flex flex-col items-center justify-center">
                    {/* {streamId === '' ? (
                      <img
                      src="/assets/images/spaceship.png"
                      alt=""
                      className={`w-full rounded-2xl border-2 hover:border-secondary-color border-secondary-color`}
                    />) : ( */}
                    <ReactPlayers
                      validUrl={streamId}
                      streamUrl={`${streamId}/index.m3u8`}
                      width="320px"
                      height="100%"
                      borderColor="border-tertiary-color border-2"
                      loading={videoLoading}
                    />
                    {/* <VideoPlayer
                      validUrl={streamId}
                      streamUrl={`${VIDEOJS_PLAYER_URL}${streamId}/index.m3u8`}
                      width="320px"
                      height="180px"
                      borderColor="border-tertiary-color border-2"
                      loading={videoLoading}
                    /> */}
                    {/* )
                      } */}

                    <div className="mt-8">
                      <InputField
                        name="Camera Name"
                        validation={false}
                        withImage={false}
                        height="h-[38px]"
                        width="w-[27vw]"
                        bottominput="-top-5"
                        textMargin="pl-8"
                        borderColor="border-tertiary-color"
                        value={camera.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChangeFields('camera_name', e.target.value)
                        }
                      />
                    </div>
                    <div className="relative mt-8">
                      <InputField
                        name="Rtsp url"
                        validation
                        withImage={false}
                        value={camera.rtsp_url}
                        height="h-[38px]"
                        width="w-[27vw]"
                        bottominput="-top-5"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          // console.log('e.target.value', e.target.value);

                          handleChangeFields('rtsp_link', e.target.value);
                        }}
                        textMargin={`${
                          error1 === 'Please enter a valid URL.'
                            ? 'border-red-500'
                            : 'border-tertiary-color'
                        } pl-8`}
                        borderColor=""
                      />
                      {error1 && (
                        <span className="absolute left-4 top-10 text-xs text-red-500">
                          {error1}
                        </span>
                      )}
                    </div>
                    <div className="mt-8">
                      <InputField
                        name="Ping url"
                        validation={false}
                        withImage={false}
                        height="h-[38px]"
                        width="w-[27vw]"
                        bottominput="-top-4"
                        textMargin="pl-8"
                        borderColor="border-tertiary-color"
                        value={camera.ping_url}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChangeFields('ping_link', e.target.value)
                        }
                      />
                    </div>
                    <div className="mt-8">
                      <InputField
                        name="Storage path"
                        validation={false}
                        withImage={false}
                        height="h-[38px]"
                        width="w-[27vw]"
                        bottominput="-top-4"
                        textMargin="pl-8"
                        borderColor="border-tertiary-color"
                        value={camera.storage_path}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChangeFields('storage_path', e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex justify-center">
                  <div className="flex">
                    <div className="mb-3 mr-3 text-sm font-normal text-quaternary-color">
                      Rtsp Offline
                    </div>
                    <Toggle
                      text={false}
                      id="RtspOffline"
                      onClick={handleToggle}
                      button={rtsp}
                    />
                  </div>
                  <div className="ml-6 flex">
                    <div className="mb-3 mr-3 text-sm font-normal text-quaternary-color">
                      Device Offline
                    </div>
                    <Toggle
                      text={false}
                      id="DeviceOffline"
                      onClick={handleToggle1}
                      button={device}
                    />
                  </div>
                </div>

                <hr className="ml-[26px] mt-4 w-[90%] border border-tertiary-color" />

                <div>
                  <div className="mt-6 flex justify-center pb-[25px]">
                    <button
                      disabled={emptyInput}
                      type="submit"
                      onClick={handleSubmit}
                      className={`${
                        error1 === 'Please enter a valid URL.'
                          ? 'pointer-events-none opacity-10'
                          : 'bg-secondary-color '
                      } -mt-1 ml-5 h-8 w-36 select-none rounded-3xl  text-center text-base text-font-color no-underline`}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showToast && (
        <Toast
          type="success"
          heading="Camera created"
          message="Camera has been created successfully!"
          onClose={handleToastClose}
        />
      )}
    </div>
  );
};

export default NewCamera;
