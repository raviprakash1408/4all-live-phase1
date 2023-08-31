'use client';

import { debounce } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useReducer, useState } from 'react';

import callApi from '@/utils/constants/apiCall';
import {
  CAMERA_LIST,
  CAMERA_NAME_CHECK,
  MAIN_URL,
  STOP_LIVE_RECORDING,
} from '@/utils/constants/apiUrls';

import { CurvedButton } from '../button/curvedButton';
import { RectangleButton } from '../button/rectanglebutton';
import type { SpaceGridType } from '../CameraGrids/type';
import { CustomizedSelect } from '../CustomizedSelect';
import InputField from '../input field/InputField';
import CreateTask from '../NewTask';
import RangeSlider from '../range';
import SelectInputField from '../SelectInputField';
import Toast from '../Toast';
import Toggle from '../toggle button/toggle';
import Filters from './filters';
import FormatOptions from './format';
import Options from './options';
import type { LiveSettings } from './types';
import VideoOption from './video';

interface CheckboxStates {
  [key: string]: boolean;
}
const fields: LiveSettings[] = [
  {
    name: 'Name',
    key: 'name',
    input_type: 'text',
    value: '',
    key_word: 'namefield',
  },
  {
    name: 'Preset',
    key: 'preset',
    input_type: 'select',
    options: [
      {
        id: 1,
        name: 'H264 Very Fast 1080p30',
      },
    ],
    value: 'Production',
    key_word: 'productionfield',
  },
  {
    name: 'Input',
    key: 'Input',
    input_type: 'dropdown',
    options: [
      {
        id: 1,
        name: 'Rtsp',
      },
    ],
    value: '',
    key_word: 'inputfield',
  },
  {
    name: 'Preview',
    key: 'Preview',
    input_type: 'dropdown',
    options: [{ id: 1, name: 'Rtsp' }],
    value: '',
    key_word: 'inputField2',
  },

  {
    name: 'Output',
    key: 'Output',
    input_type: 'dropdown',
    options: [
      {
        id: 1,
        name: 'storage',
      },
    ],
    value: '',
    key_word: 'outputfield',
  },
];
const CodecOptions = [
  {
    id: 1,
    name: 'Copy',
  },
];
const reducer = (
  state: LiveSettings[],
  action: { type: 'UPDATE_FIELD_VALUE' | 'RESET'; value?: string; key?: string }
) => {
  let newState; // Declare the variable outside the switch

  switch (action.type) {
    case 'UPDATE_FIELD_VALUE': {
      if (Array.isArray(state)) {
        newState = state.map((item) =>
          item.key === action.key ? { ...item, value: action.value } : item
        );

        return newState;
      }

      return state;
    }
    case 'RESET': {
      const resetState = state.map((item) => ({ ...item, value: '' }));
      return resetState;
    }
    default:
      return state;
  }
};

const LivefeedForm = (props: LiveSettings) => {
  // const [selectedId, setSelectedId] = useState<number | null>(null);

  const [option, setOption] = useState('Audio');
  const [fieldValues, dispatchFieldValues] = useReducer(reducer, fields);
  const [inputTitle, setInputTitle] = useState('');

  const [cameraName, setCameraName] = useState('');
  // const [outputTitle, setOutputTitle] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [loading, setVideoLoading] = useState(false);
  const [addCamera, setAddCamera] = useState(false);
  const [NameError, setNameError] = useState(true);
  const [newLive, setNewLive] = useState(props.newCamera || false);
  const [reset, setReset] = useState(false);
  // const [selectedOption, setSelectedOption] = useState('');
  const [alreadyExist, setAlreadyExist] = useState('');
  const [error1, setError1] = useState('');
  const [codec] = useState('Copy');
  const [previewUrl, setPreviewUrl] = useState('');
  const [stopLiveFeedToast, setStopLiveFeedToast] = useState(false);
  // const [rtspToggle, setRtspToggle] = useState(false);
  // const [hevcToggle, setHevcToggle] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState<CheckboxStates>({});
  const [checkedCheckbox, setCheckedCheckbox] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState('');
  const [input2, setInput2] = useState('');
  const [dataUpdated, setdDataUpdated] = useState(false);
  const router = useRouter();

  // Set the initial checked state for the first checkbox
  useEffect(() => {
    if (fieldValues.length > 2) {
      const firstCheckboxId = fieldValues[2]?.key; // Use optional chaining
      if (firstCheckboxId) {
        setCheckboxStates({ ...checkboxStates, [firstCheckboxId]: true });
        setCheckedCheckbox(firstCheckboxId);
      }
    }
  }, []);

  const handleToggle = (id: string) => {
    const updatedStates = { ...checkboxStates };

    // Uncheck all other checkboxes
    Object.keys(updatedStates).forEach((checkboxId) => {
      updatedStates[checkboxId] = false;
    });

    // Check the clicked checkbox
    updatedStates[id] = true;

    setCheckboxStates(updatedStates);
    setCheckedCheckbox(id);

    // Log the checkbox states
  };

  // const handleSelectOption = (value: string) => {
  //   setSelectedOption(value);
  // };

  const handleInputError = (hasError: boolean) => {
    if (hasError === true) {
      // setInputTitle("");
      setVideoLoading(true);
    }
    const inputField = fieldValues.find((field) => field.key === 'Input');
    if (inputField?.value !== '') {
      setVideoLoading(true);
    }
  };
  useEffect(() => {
    if (inputTitle !== '') {
      setVideoLoading(true);
    }
  }, [inputTitle]);
  useEffect(() => {
    if (props.newCamera === true) {
      setAlreadyExist('');
    }
  }, [props.newCamera]);
  useEffect(() => {
    if (props.newCamera) {
      setCameraName('');

      dispatchFieldValues({
        type: 'UPDATE_FIELD_VALUE',
        key: 'name',
        value: '', // Reset the value of InputField
      });
    }
  }, [props.newCamera]);
  const UpdateCamera = async () => {
    const url = `${MAIN_URL}cameras/${props.id}`;
    setdDataUpdated(true);

    const postData1 = {
      ...(cameraName !== '' && { name: cameraName }),
      input_url: fieldValues?.find((field) => field.key === 'Input')?.value,
      preview_url: fieldValues?.find((field) => field.key === 'Preview')?.value,
      playable_preview_url: previewUrl,
      recording_url: checkboxStates.Input === true ? inputTitle : input2,
      // storage_path: `${cameraName.replace(/\s+/g, "-").toLocaleLowerCase()}`,
      ...(cameraName !== '' && {
        storage_path: `${cameraName.replace(/\s+/g, '-').toLocaleLowerCase()}`,
      }),
    };

    try {
      const result: SpaceGridType = await callApi(url, 'PUT', postData1);
      console.log('API response:', result);

      // Show the Toast with a success message
    } catch (error) {
      console.error('API request error:', error);

      // Show the Toast with an error message
      setShowToast(true);
    }

    if (props.onSelectedIdChange) {
      props.onSelectedIdChange(null);
    }
    setShowToast(true);
    dispatchFieldValues({
      type: 'UPDATE_FIELD_VALUE',
      key: 'Input',
      value: '', // Reset the value of InputField
    });
  };

  useEffect(() => {
    if (props.onDataUpdated) {
      props.onDataUpdated(dataUpdated);
    }
  }, [dataUpdated]);
  const AddCamera = async () => {
    const url = `${MAIN_URL}${CAMERA_LIST}`;

    const postData1 = {
      name: cameraName,
      input_url: inputTitle,
      preview_url: input2,
      playable_preview_url:
        'http://192.168.50.52:8888/h264/84c3e227-6ba8-42e2-9617-22abfe08fbd2/',
      recording_url: checkboxStates.Input === true ? inputTitle : input2,
      storage_path: `${cameraName.replace(/\s+/g, '-').toLocaleLowerCase()}`,
    };
    // console.log('postData', postData1);

    try {
      const result = await callApi(url, 'POST', postData1);
      console.log('API response:', result);

      // Show the Toast with a success message
      setAddCamera(!addCamera);
      setPreviewUrl('');
      router.push('/offline/livefeed/');

      setShowToast(true);
    } catch (error) {
      console.error('API request error:', error);

      // Show the Toast with an error message
      // setShowToast(true);
    }
    if (props.setAddCamera) {
      props.setAddCamera(!props.addCamera);

      // Reset values of selectInputField and InputField

      setInputTitle(''); // Reset the inputTitle
      setCameraName(''); // Reset the cameraName

      // setOutputTitle(''); // Reset the outputTitle
    }
  };
  useEffect(() => {
    if (props.newCamera) {
      setPreviewUrl('');
      setVideoLoading(false);
    }
  }, [props.newCamera]);
  const stopLiveRecording = async (cameraId: string) => {
    // console.log("stopLiveRecording", cameraId);
    const Url = `${MAIN_URL}${STOP_LIVE_RECORDING}?camera_id=${cameraId}`;
    try {
      const result = await callApi<any>(Url, 'POST', {});
      console.log('API response:', result);

      if (result.status === 'success') {
        // console.log('stopLiveRecording', result);
        setStopLiveFeedToast(true);
      }
    } catch (error) {
      console.error('API request error:', error);
    } finally {
      setVideoLoading(false);
    }
  };

  const performRtspUrlCheck = async (input: string) => {
    if (!input) {
      // No need to proceed if input is empty
      return;
    }

    const Url = `${MAIN_URL}cameras/rtsp/check?url=${input}&url_type=preview_url`;

    try {
      setVideoLoading(true);

      const result = await callApi<any>(Url, 'POST', {});
      console.log('API response:', result);

      if (result.status === 'success') {
        setError1('success');

        if (input === input2) {
          // Set previewUrl using input2
          setPreviewUrl(result.streaming_url);
        }

        // const streamIdRes = getStreamIdFromRtspUrl(input);
        // console.log(streamIdRes, 'Stream Urlllll');
      } else if (result.status === 'error') {
        setError1('error');
      } else {
        setError1('');
      }
    } catch (error) {
      setError1('error');

      console.error('API request error:', error);
    } finally {
      setVideoLoading(false);
    }
  };

  useEffect(() => {
    performRtspUrlCheck(inputTitle);
  }, [inputTitle]);

  useEffect(() => {
    performRtspUrlCheck(input2);
  }, [input2]);

  useEffect(() => {
    if (loading === true) {
      if (props.onLoadingChange) {
        props.onLoadingChange(true);
      }
    }
    if (loading === false) {
      if (props.onLoadingChange) {
        props.onLoadingChange(false);
      }
    }
  }, [loading]);
  useEffect(() => {
    if (error1 === 'success') {
      if (props.onErrorChange) {
        props.onErrorChange('success');
      }
    }
    if (error1 === 'error') {
      if (props.onErrorChange) {
        props.onErrorChange('error');
      }
    }
  }, [error1]);
  const CameraNameCheck = debounce(async (name) => {
    try {
      const response = await callApi<any>(
        `${MAIN_URL}${CAMERA_NAME_CHECK}${name}`,
        'POST'
      );

      if (response.message === 'Camera already exists.') {
        // if(props.newCamera){
        setNameError(true);
        setAlreadyExist('Camera with this name is already available');
        // }
      }
      if (response.status === 'Success') {
        setNameError(false);
        setAlreadyExist('');
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  }, 2000); // Debounce for 1000 milliseconds (1 second)
  useEffect(() => {
    // This effect runs whenever props or ID changes
    setNameError(false);
    setAlreadyExist('');
  }, [props, props.id]);
  useEffect(() => {
    if (props.onErrorChange) {
      props.onErrorChange(error1);
    }
  }, [error1]);
  useEffect(() => {
    if (cameraName) {
      CameraNameCheck(cameraName);
    }
  }, [cameraName]);
  const handleToastClose = () => {
    setShowToast(false);
  };
  useEffect(() => {
    if (input2 === '') {
      setPreviewUrl('');
    }
  }, [input2]);
  // console.log("props.id", props.id);

  const livefeedfun = (field: LiveSettings) => {
    const { name, key, options } = field;
    let initialSelect;
    if (key === 'Output') {
      initialSelect = 'Storage';
    }
    let valueToDisplay;
    if (props.newCamera) {
      valueToDisplay = '';
    } else {
      switch (key) {
        case 'name':
          valueToDisplay = props.deviceName;
          break;
        case 'Input':
          valueToDisplay = props.input_url;
          break;
        case 'Output':
          valueToDisplay = props.storage_path;
          break;
        case 'Preview':
          valueToDisplay = props.preview_url;
          break;

        default:
          valueToDisplay = ''; // Default to empty value if key doesn't match
          break;
      }
    }

    // let disabledField
    // if(rtspToggle===false && key==="Input2"){
    //   disabledField=true

    // }
    // if(rtspToggle===true && key==="Input"){
    //   disabledField=true

    // }
    // if(key==="Output"){
    //   disabledField=true
    // }

    switch (field.input_type) {
      case 'select':
        return (
          <CustomizedSelect
            width="w-72"
            height="h-[38px]"
            title={name}
            border="rounded-full"
            initialSelect="H264 Very Fast 1080p30"
            arrowBottom="top-[12px]"
            textcolor="text-font-color"
            textMarginLeft="pl-[5px]"
            marginTop="mt-[-5px]"
            options={options}
            borderColor="border-tertiary-color group-hover:border-quaternary-color"
          />
        );

      case 'dropdown':
        return (
          <div className="relative ">
            <SelectInputField
              title={name}
              width="2xl:w-[20vw] lg:w-44 md:w-44"
              MarginTop={`mt-[2px] ${key === 'Output' ? 'px-2' : 'px-2'}`}
              // MarginTop={`mt-[2px] px-2
              // `}
              rtspValidation
              value={valueToDisplay}
              options={options}
              initialSelect={initialSelect}
              resetButton={reset}
              disableInput={key === 'Output'}
              // onSelectOption={handleSelectOption}
              onChange={(selectedValue) => {
                dispatchFieldValues({
                  type: 'UPDATE_FIELD_VALUE',
                  key,
                  value: selectedValue,
                });
                if (key === 'Input') {
                  setInputTitle(selectedValue);
                  if (props.setInputTitle) {
                    props.setInputTitle(previewUrl);
                  }
                }
                if (key === 'Preview') {
                  setInput2(selectedValue);
                }

                //  else if (key === 'Output') {
                //   setOutputTitle(selectedValue);
                // }
              }}
              onInputError={handleInputError}
            />
            {key === 'Output' && props.newCamera && (
              <div className="absolute left-24 top-[8px] max-w-[14vw] truncate text-base xl:max-w-[12vw] 2xl:max-w-[14vw]">
                /nas-storage/
                <span className="text-base text-font-color">
                  {' '}
                  {cameraName.replace(/\s+/g, '-').toLocaleLowerCase()}
                </span>
                {/* <span className="text-base text-font-color">
                  {getStreamIdFromRtspUrl(inputTitle)}
                </span> */}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div>
            <div className="relative">
              <InputField
                name={name}
                validation={false}
                withImage={false}
                height="h-[38px]"
                width="w-44"
                value={valueToDisplay}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const newValue = event.target.value;
                  dispatchFieldValues({
                    type: 'UPDATE_FIELD_VALUE',
                    key,
                    value: newValue,
                  });
                  setCameraName(newValue);
                  if (props.setCameraName) {
                    props.setCameraName(newValue);
                  }
                }}
                bottominput="-top-4"
                borderColor={
                  alreadyExist === 'Camera with this name is already available'
                    ? 'border-red-500'
                    : 'border-tertiary-color'
                }
                textMargin="pl-8"
                img=""
              />
              <div className="">
                {alreadyExist && (
                  <span className="text-xs text-red-500">{alreadyExist}</span>
                )}
              </div>
            </div>
          </div>
        );
    }
  };
  useEffect(() => {
    if (props.setCameraName) {
      props.setCameraName(cameraName);
    }
  }, [cameraName]);
  const handleCancelButtonClick = () => {
    setNewLive(true);
    setCameraName('');
    setPreviewUrl('');

    if (props.onNewLiveChange) {
      props.onNewLiveChange(newLive);
    }
    // Show some loading indicator or message if needed
    setTimeout(() => {
      setNewLive(false); // Change newLive back to false after 2 seconds
    }, 500);
  };
  const handleResetButtonClick = () => {
    dispatchFieldValues({ type: 'RESET' });

    setInputTitle('');
    setCameraName('');
    // setOutputTitle('');
    setShowToast(false);
    setVideoLoading(false);
    setAddCamera(false);
    setNameError(true);
    if (props.setCameraName) {
      props.setCameraName('');
    }

    setReset(true);

    if (props.onResetFromChild) {
      props.onResetFromChild(reset);
    }

    // Set the reset button to false after 1 second
    setTimeout(() => {
      setReset(false);
    }, 1000);
  };
  // console.log('parentCameraName', props.newCamera,);

  useEffect(() => {
    if (props.setInputTitle) {
      props.setInputTitle(previewUrl);
    }
  }, [previewUrl]);

  console.log('fieldValues', fieldValues);
  console.log('error', previewUrl, loading);

  return (
    <div>
      <div className="custom-scrollbar mx-4 h-[50vh] max-w-[100%] overflow-auto rounded-lg border-2 border-tertiary-color min-[400px]:h-[34vh] min-[1800px]:h-[41vh]">
        <div className="">
          <div className="">
            {props.id === null && !props.newCamera ? (
              <div className="flex items-center justify-center text-center text-base text-quaternary-color xl:h-[26vh] 2xl:h-[35vh]">
                Please select a live feed to edit
              </div>
            ) : (
              <div className="min-[400px]:mt-12 xl:h-[19rem]  2xl:mt-8  2xl:h-[21rem]">
                <div className="ml-8 flex gap-4">
                  {fieldValues.slice(0, 2).map((field, index) => {
                    const result = livefeedfun(field);
                    return index !== 1 ? <>{result} </> : result;
                  })}
                </div>
                <div className="ml-8 mt-4 flex h-[46px] w-[25rem] md:gap-4 lg:h-[56px] lg:gap-4 2xl:h-[46px] 2xl:gap-4">
                  {fieldValues.slice(2, 4).map((field) => {
                    const updatedField = { ...field };
                    const result = livefeedfun(updatedField);
                    const checkboxId = field.key || '';

                    let tooltipContent = '';

                    if (
                      checkboxId === 'Preview' &&
                      checkboxStates.Input === true
                    ) {
                      tooltipContent =
                        'Click on this to change the recording Input';
                    } else if (
                      checkboxId === 'Input' &&
                      checkboxStates.Preview === true
                    ) {
                      tooltipContent =
                        'Click on this to change the recording input';
                    }

                    return (
                      <div className="flex" key={checkboxId}>
                        <div>
                          <React.Fragment key={field.key}>
                            {result}&nbsp;
                          </React.Fragment>
                        </div>
                        <div>
                          <div className=" relative ml-24 mr-2 mt-2 md:ml-[6rem] lg:ml-24 xl:ml-24 2xl:ml-2">
                            <Toggle
                              text={false}
                              // type="Square"
                              button={checkboxStates[checkboxId] || false}
                              onClick={() => handleToggle(checkboxId)}
                              id={checkboxId}
                              // backgroundColor=""
                              checked={checkedCheckbox === checkboxId}
                              onMouseEnter={() => {
                                setShowTooltip(tooltipContent);
                              }}
                              onMouseLeave={() => {
                                setShowTooltip('');
                              }}
                            />
                            {showTooltip === tooltipContent && (
                              <div
                                className={`absolute left-[-3.4rem] top-[-10px] z-10 flex w-36 -translate-y-full rounded-lg ${
                                  tooltipContent ? 'bg-tertiary-color' : ''
                                } after: px-2 py-1 text-center text-sm text-quaternary-color after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-t-tertiary-color ${
                                  tooltipContent ? 'after:border-8' : ''
                                } after:border-x-transparent after:border-b-transparent after:border-t-tertiary-color `}
                              >
                                {tooltipContent}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div>
                    <CurvedButton
                      backgroundColor="bg-tertiary-color mt-[5px]"
                      height=""
                    >
                      <div className="flex px-[1vw] py-[0.5vh]">
                        <Image
                          width={24}
                          height={20}
                          src="/assets/icons/icon16.svg"
                          alt=""
                          className="lg:h-4 lg:w-4 2xl:h-5 2xl:w-5"
                        />
                        <div className="px-[2vw] text-base text-quaternary-color group-hover:text-secondary-color">
                          Check
                        </div>
                      </div>
                    </CurvedButton>
                  </div>
                  {/* <div className="ml-4 mt-[0.80rem]  w-4"> */}
                  {/* </div> */}
                  {error1 === 'success' && (
                    <div className="ml-2 mt-1 flex">
                      <Image
                        width={24}
                        height={24}
                        src="/assets/icons/icon24.svg"
                        alt=""
                        className="lg:-mt-1 lg:h-[2.5rem] lg:w-[1rem] 2xl:mt-2 2xl:h-5 2xl:w-5"
                      />
                      <span className="ml-2 mt-[6px] whitespace-nowrap text-base text-quaternary-color lg:ml-0 lg:text-sm 2xl:ml-2 2xl:text-base">
                        Connection found!
                      </span>
                    </div>
                  )}
                  {error1 === 'error' && (
                    <div className="ml-2 mt-1 flex">
                      <Image
                        width={24}
                        height={24}
                        src="/assets/icons/ConnectNotFound.svg"
                        alt=""
                        className="lg:-mt-1 lg:h-[2.5rem] lg:w-[1rem] 2xl:mt-2 2xl:h-5 2xl:w-5"
                      />
                      <span className="ml-2 mt-[6px] whitespace-nowrap text-base text-quaternary-color lg:ml-0 lg:text-sm 2xl:ml-2 2xl:text-base">
                        Connection Not found!
                      </span>
                    </div>
                  )}
                </div>
                <div className="ml-9 flex  lg:gap-x-24 xl:gap-x-24 2xl:mt-2 2xl:gap-x-4">
                  {fields.slice(-1).map((field) => {
                    const result = livefeedfun(field);
                    return (
                      <React.Fragment key={field.key}>{result}</React.Fragment>
                    );
                  })}
                  {/* <div className="mt-1">
                  <CurvedButton backgroundColor="bg-tertiary-color" height="">
                    <div className="flex px-[1vw] py-[0.5vh]">
                      <Image
                        width={25}
                        height={25}
                        src="/assets/icons/icon17.svg"
                        alt=""
                        className="h-5 w-5 lg:h-5 lg:w-5 2xl:h-5 2xl:w-5"
                      />
                      <div className="px-1.5 text-sm text-quaternary-color group-hover:text-secondary-color lg:text-[12px] 2xl:text-sm">
                        Add output
                      </div>
                    </div>
                  </CurvedButton>
                </div>
                */}
                  <div className="mt-0">
                    <CreateTask cameraData={props} />
                  </div>
                </div>
                <div className="mx-4 -ml-1 mt-6 border-t-2 border-t-tertiary-color" />
                <div className=" ml-8 mt-4 flex">
                  <button
                    type="button"
                    onClick={() => {
                      setOption('Format');
                    }}
                    className=" -mr-1 ml-2 mt-1"
                  >
                    <CurvedButton
                      backgroundColor={
                        option === 'Format'
                          ? `bg-secondary-color`
                          : 'bg-primary-color'
                      }
                      height="h-[38px]"
                      halfCurved
                      curveType="left"
                    >
                      <div className="flex px-[1vw] py-[0.5vh] ">
                        <Image
                          width={18}
                          height={24}
                          src="/assets/icons/icon19.svg"
                          alt=""
                          className={
                            option === 'Format'
                              ? 'brightness-[2] grayscale'
                              : ''
                          }
                        />
                        <div
                          className={`${
                            option === 'Format'
                              ? 'text-font-color'
                              : 'text-quaternary-color'
                          } pl-[1.5vw] pr-[2vw] sm:text-xs lg:text-sm`}
                        >
                          Format
                        </div>
                      </div>
                    </CurvedButton>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOption('Video');
                    }}
                    className="ml-0 mt-1 "
                  >
                    <RectangleButton
                      height="h-[37px]"
                      backgroundColor={
                        option === 'Video'
                          ? `bg-secondary-color`
                          : 'bg-primary-color'
                      }
                      topCurved={false}
                      hoverbgcolor=""
                    >
                      <div className={` flex items-center px-[1vw]`}>
                        <Image
                          width={24}
                          height={20}
                          src="/assets/icons/icon20.svg"
                          alt=""
                          className={
                            option === 'Video' ? 'brightness-[2] grayscale' : ''
                          }
                        />
                      </div>
                      <div
                        className={`pl-[1vw] pr-[2vw] sm:text-xs lg:text-sm  ${
                          option === 'Video'
                            ? 'text-font-color'
                            : 'text-quaternary-color'
                        }`}
                      >
                        Video
                      </div>
                    </RectangleButton>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOption('Audio');
                    }}
                    className="ml-0 mt-1"
                  >
                    <RectangleButton
                      height="h-[37px]"
                      backgroundColor={
                        option === 'Audio'
                          ? `bg-secondary-color`
                          : 'bg-primary-color'
                      }
                      topCurved={false}
                      hoverbgcolor=""
                    >
                      <div className="flex items-center px-[1vw]">
                        <Image
                          width={22}
                          height={22}
                          src="/assets/icons/Groupaudio.svg"
                          alt=""
                          className={
                            option === 'Audio' ? 'brightness-[2] grayscale' : ''
                          }
                        />
                      </div>
                      <div
                        className={`pl-[1vw] pr-[2vw] sm:text-xs lg:text-sm  ${
                          option === 'Audio'
                            ? 'text-font-color'
                            : 'text-quaternary-color'
                        }`}
                      >
                        Audio
                      </div>
                    </RectangleButton>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOption('Filters');
                    }}
                    className="ml-0 mt-1 "
                  >
                    <RectangleButton
                      height="h-[37px]"
                      backgroundColor={
                        option === 'Filters'
                          ? `bg-secondary-color`
                          : 'bg-primary-color'
                      }
                      topCurved={false}
                      hoverbgcolor=""
                    >
                      <div className="flex items-center px-[1vw]">
                        <Image
                          width={22}
                          height={22}
                          src="/assets/icons/icon22.svg"
                          alt=""
                          className={
                            option === 'Filters'
                              ? 'brightness-[2] grayscale'
                              : ''
                          }
                        />
                      </div>
                      <div
                        className={`pl-[1vw] pr-[2vw] sm:text-xs lg:text-sm ${
                          option === 'Filters'
                            ? 'text-font-color'
                            : 'text-quaternary-color'
                        }`}
                      >
                        Filters
                      </div>
                    </RectangleButton>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOption('Options');
                    }}
                    className="ml-0 mt-1"
                  >
                    <CurvedButton
                      backgroundColor={
                        option === 'Options'
                          ? `bg-secondary-color`
                          : 'bg-primary-color'
                      }
                      height=""
                      halfCurved
                      curveType="right"
                    >
                      <div className="flex items-center px-[1vw] py-[0.6vh]">
                        <Image
                          width={22}
                          height={22}
                          src="/assets/icons/icon23.svg"
                          alt=""
                          className={`2xl:h-5
                        2xl:w-5
                          ${
                            option === 'Options'
                              ? 'brightness-[2] grayscale'
                              : ''
                          }
                        `}
                        />
                        <div
                          className={`pl-[1.5vw] pr-[2vw] sm:text-xs lg:text-sm ${
                            option === 'Options'
                              ? 'text-font-color'
                              : 'text-quaternary-color'
                          }`}
                        >
                          Options
                        </div>
                      </div>
                    </CurvedButton>
                  </button>
                </div>
                {option === 'Audio' && (
                  <div className="ml-7 mt-4  flex">
                    <div className="relative ml-4">
                      <CustomizedSelect
                        width="lg:w-[12vw] sm:w-[18vw]"
                        height="h-[4vh]"
                        title="Codec"
                        options={CodecOptions}
                        initialSelect={codec}
                        border="rounded-full"
                        textcolor="text-font-color"
                        arrowBottom="top-3"
                        borderColor="border-tertiary-color group-hover:border-quaternary-color"
                      />
                    </div>
                    <div
                      className={`relative ml-4 ${
                        codec === 'Copy' ? 'pointer-events-none opacity-50' : ''
                      }`}
                    >
                      <CustomizedSelect
                        width="lg:w-[12vw] sm:w-[18vw]"
                        height="h-[4vh]"
                        title="Channel"
                        border="rounded-full"
                        textcolor="text-font-color"
                        arrowBottom="top-3"
                        borderColor="border-tertiary-color group-hover:border-quaternary-color"
                      />
                    </div>
                    <div
                      className={`relative ml-4 ${
                        codec === 'Copy' ? 'pointer-events-none opacity-50' : ''
                      }`}
                    >
                      <CustomizedSelect
                        width="lg:w-[12vw] sm:w-[18vw]"
                        height="h-[4vh]"
                        title="Quality"
                        border="rounded-full"
                        textcolor="text-font-color"
                        arrowBottom="top-3"
                        borderColor="border-tertiary-color group-hover:border-quaternary-color"
                      />
                    </div>
                    <div
                      className={`relative ml-4 ${
                        codec === 'Copy' ? 'pointer-events-none opacity-50' : ''
                      }`}
                    >
                      <CustomizedSelect
                        width="lg:w-[12vw] sm:w-[18vw]"
                        height="h-[4vh]"
                        title="Sample rate"
                        border="rounded-full"
                        textcolor="text-font-color"
                        arrowBottom="top-3"
                        borderColor="border-tertiary-color group-hover:border-quaternary-color"
                      />
                    </div>
                    <div
                      className={`relative ${
                        codec === 'Copy' ? 'pointer-events-none opacity-50' : ''
                      }`}
                    >
                      <div className="absolute bottom-7 left-3 text-base text-quaternary-color lg:text-xs 2xl:text-base">
                        Volume
                      </div>
                      <div className="absolute bottom-7 right-0 text-base text-quaternary-color lg:text-xs 2xl:text-base">
                        32db
                      </div>
                      <div className="ml-4 mt-6">
                        <RangeSlider
                          progress={100}
                          type="thumbBorder"
                          width="2xl:w-48 lg:w-28"
                          textSide=""
                          dataType=""
                          rangeDisabled={false}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {option === 'Filters' && (
                  <div>
                    <Filters />
                  </div>
                )}
                {option === 'Options' && (
                  <div>
                    <Options />
                  </div>
                )}
                {option === 'Video' && (
                  <div>
                    <VideoOption />
                  </div>
                )}
                {option === 'Format' && (
                  <div>
                    <FormatOptions />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mb-2 flex justify-center">
        {props.id !== null || props.newCamera ? (
          <>
            <div className="no-underline">
              <Link href="/offline/livefeed">
                <div>
                  <button
                    type="button"
                    onClick={handleCancelButtonClick}
                    className=" ml-3 min-[400px]:mt-3 min-[1600px]:mt-6"
                  >
                    <CurvedButton
                      backgroundColor="bg-primary-color"
                      height="h-[2.12rem]"
                    >
                      <div className="px-[2vw] py-[0.7vh] text-sm text-quaternary-color group-hover:text-secondary-color">
                        Cancel
                      </div>
                    </CurvedButton>
                  </button>
                </div>
              </Link>
            </div>
            <div className="ml-2">
              <button
                type="button"
                onClick={handleResetButtonClick}
                className="ml-3 min-[400px]:pt-3 min-[1600px]:pt-6 "
              >
                <CurvedButton
                  backgroundColor="bg-primary-color"
                  height="h-[2.12rem]"
                >
                  <div className="px-[2vw] py-[0.7vh] text-sm text-quaternary-color group-hover:text-secondary-color">
                    Reset
                  </div>
                </CurvedButton>
              </button>
            </div>
            <div className="ml-3 flex min-[400px]:mt-3 min-[1600px]:mt-6 ">
              <div>
                <CurvedButton
                  backgroundColor="bg-primary-color"
                  height="h-[2.12rem]"
                  halfCurved
                  curveType="left"
                >
                  <div className="px-[1vw] py-[0.7vh] text-sm text-quaternary-color group-hover:text-secondary-color">
                    Save templates
                  </div>
                </CurvedButton>
              </div>
              <div>
                <CurvedButton
                  height="h-[2.12rem]"
                  backgroundColor="bg-primary-color"
                  halfCurved
                  curveType="right"
                >
                  <Image
                    width={26}
                    height={5}
                    src="/assets/icons/Vector (3).png"
                    alt="Icon"
                    className="px-2"
                  />
                </CurvedButton>
              </div>
            </div>
          </>
        ) : null}

        {/* {NameError ? '' : ''} */}
        <div className="mr-2 mt-3">
          {/* <CustomizedSelect
              width="w-[1vw]"
              height="h-[4vh]"
              borderRight="rounded-r-full"
              textcolor="text-font-color"
            /> */}
        </div>
        <div className="ml-2 min-[400px]:mt-3 min-[1600px]:mt-6">
          {props.newCamera && (
            <div>
              <button
                // disabled={
                //   error1 === 'error' ||
                //   NameError ||
                //   cameraName === '' ||
                //   inputTitle === '' ||
                //   previewUrl === ''
                // }
                type="button"
                onClick={AddCamera}
                className=""
              >
                <CurvedButton
                  // backgroundColor={
                  //   error1 === 'error' ||
                  //   NameError ||
                  //   cameraName === '' ||
                  //   inputTitle === '' ||
                  //   previewUrl === ''
                  //     ? 'pointer-events-none opacity-50'
                  //     : 'bg-secondary-color '
                  // }
                  backgroundColor="bg-secondary-color "
                  height="h-[2.12rem]"
                >
                  <div
                    className={`px-[2vw] py-[0.5vh] text-sm ${
                      props.id ? 'text-quaternary-color' : 'text-font-color'
                    }  group-hover:text-font-color`}
                  >
                    Add Camera
                  </div>
                </CurvedButton>
              </button>
            </div>
          )}
          {props.id !== null && (
            <button
              type="button"
              onClick={() => {
                // setSelectedId(null);
                if (props.id) {
                  stopLiveRecording(props.id.toString());
                } else if (props.onSelectedIdChange) {
                  props.onSelectedIdChange(null);
                }
                // Deselect the grid by setting selectedId to null
                // Notify the parent component about the deselection
              }}
              className="ml-3 "
            >
              {!props.newCamera && (
                <button type="button">
                  <CurvedButton
                    backgroundColor={
                      props.id ? 'bg-[#FF1759]' : 'bg-secondary-color '
                    }
                    height="h-[2.12rem]"
                  >
                    <div
                      className={`px-[2vw] py-[0.5vh] text-sm ${
                        props.id ? 'text-font-color' : 'text-font-color'
                      }  group-hover:text-font-color`}
                    >
                      {props.id ? 'Stop Live Feed' : 'Start Live Feed'}
                    </div>
                  </CurvedButton>
                </button>
              )}
            </button>
          )}
        </div>
        {props.newCamera ||
          (props.id !== null && (
            <div className="no-underline">
              <Link href="offline/livefeed">
                <div>
                  <button
                    disabled={error1 === 'error' || NameError}
                    type="button"
                    onClick={UpdateCamera}
                    className="ml-3 min-[400px]:mt-3 min-[1600px]:mt-6"
                  >
                    <CurvedButton
                      backgroundColor={`${
                        error1 === 'error' || NameError
                          ? 'pointer-events-none opacity-50'
                          : 'bg-secondary-color'
                      } 
                
                    
                `}
                      height="h-[2.12rem]"
                    >
                      <div
                        className={`px-[2vw] py-[0.5vh] text-sm ${'text-font-color '}  group-hover:text-font-color`}
                      >
                        Update
                      </div>
                    </CurvedButton>
                  </button>
                </div>
              </Link>
            </div>
          ))}
      </div>
      {showToast && (
        <Toast
          type="success"
          heading={`${dataUpdated ? 'Camera updated' : 'Camera created'}`}
          message={`${
            dataUpdated
              ? 'Camera has been updated successfully!'
              : 'Camera has been created successfully!'
          }`}
          onClose={handleToastClose}
        />
      )}
      {stopLiveFeedToast && (
        <Toast
          type="success"
          heading="Live Recording Stopped"
          message="Live recording has been stopped successfully!"
          onClose={handleToastClose}
        />
      )}
    </div>
  );
};

export default LivefeedForm;
