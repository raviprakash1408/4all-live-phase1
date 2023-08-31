'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useReducer, useRef, useState } from 'react';

import callApi from '@/utils/constants/apiCall';
import {
  LIVE_RECORDING_SETTINGS_CREATE,
  MAIN_URL,
} from '@/utils/constants/apiUrls';

import { CurvedButton } from '../button/curvedButton';
import { HalfCurvedButtons } from '../halfcurvedbuttons';
import type { LiveSettings } from '../livefeedsform/types';
import Toast from '../Toast';
import Toggle from '../toggle button/toggle';
import TimeSelect from './timeSelect';
import Timezone from './timezone';
import ToggleComponent from './toggleComponent';
import type { Day, Days, Hour, Task } from './types';
// import { Toggle } from './types';

const initialHours: Hour = {
  from_hour: 1,
  from_minutes: 0,
  from_Am_Pm: 'AM',
  to_hour: 2,
  to_minutes: 0,
  to_Am_Pm: 'AM',
  id: 1,
};

const initialState: Task = {
  days: [
    {
      day: 'Sunday',
      enabled: true,
      hours: [initialHours],
    },
    {
      day: 'Monday',
      enabled: false,
      hours: [initialHours],
    },
    {
      day: 'Tuesday',
      enabled: false,
      hours: [initialHours],
    },
    {
      day: 'Wednesday',
      enabled: false,
      hours: [initialHours],
    },
    {
      day: 'Thursday',
      enabled: false,
      hours: [initialHours],
    },
    {
      day: 'Friday',
      enabled: false,
      hours: [initialHours],
    },
    {
      day: 'Saturday',
      enabled: false,
      hours: [initialHours],
    },
  ],
  camera: 'Camera 01',
  timezone: '',
  cameraId: 1,
};

const convertToMinutes = (hour: number, minute: number, period: string) => {
  let totalMinutes = 0;
  let h = hour;
  if (period === 'PM' && h !== 12) {
    h += 12;
  } else if (period === 'AM' && h === 12) {
    h = 0;
  }
  totalMinutes = h * 60 + minute;
  return totalMinutes;
};
function convertDayToNumber(day: string): number {
  const daysOfWeek: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const index = daysOfWeek.indexOf(day);

  if (index === -1) {
    throw new Error('Invalid day');
  }

  return index;
}
const validateTime = (days: any) => {
  const newState = {
    ...days,
  };
  newState.days.forEach((day: any) => {
    const { hours } = day;
    const d = day;
    const hourCount = hours.length;
    let totalMinutes = 0;
    let fromTime: number = 0;
    let toTime: number = 0;

    for (let i = 0; i < hourCount; i += 1) {
      const currentHour = hours[i];
      fromTime = convertToMinutes(
        currentHour.from_hour,
        currentHour.from_minutes,
        currentHour.from_Am_Pm
      );
      toTime = convertToMinutes(
        currentHour.to_hour,
        currentHour.to_minutes,
        currentHour.to_Am_Pm
      );

      // Check if from_time and to_time are the same
      if (fromTime === toTime) {
        d.error = {
          message: 'From time and to time cannot be the same',
          type: 'error',
        };

        return;
      }
      if (fromTime > toTime) {
        d.error = {
          message: 'Time slot exceeds the boundary of the day',
          type: 'error',
        };

        return;
      }

      // Check if current hour overlaps with any other hour
      for (let j = 0; j < hourCount; j += 1) {
        if (i !== j) {
          // Skip comparing with itself
          const compareHour = hours[j];
          const compareFromTime = convertToMinutes(
            compareHour.from_hour,
            compareHour.from_minutes,
            compareHour.from_Am_Pm
          );
          const compareToTime = convertToMinutes(
            compareHour.to_hour,
            compareHour.to_minutes,
            compareHour.to_Am_Pm
          );

          if (
            (fromTime >= compareFromTime && fromTime < compareToTime) ||
            (toTime > compareFromTime && toTime < compareToTime)
          ) {
            d.error = {
              message: 'Time slots cannot overlap',
              type: 'error',
            };

            return;
          }
        }
      }

      // Calculate the duration of the current hour
      const duration = Math.abs(toTime - fromTime);

      // Update the total time
      totalMinutes += duration;
    }

    // Check if the total time exceeds 24 hours or the time slot exceeds the boundary of the day
    if (totalMinutes > 24 * 60 || toTime < fromTime) {
      d.error = {
        message: 'Time slot exceeds the boundary of the day',
        type: 'error',
      };

      return;
    }

    // Reset the error if no overlap or exceeding time is found
    d.error = null;
  });

  return newState;
};

const IsHourConflict = (currentHour: Hour, hour: Hour) => {
  const currentFromTime = convertToMinutes(
    currentHour.from_hour,
    currentHour.from_minutes,
    currentHour.from_Am_Pm
  );
  const currentToTime = convertToMinutes(
    currentHour.to_hour,
    currentHour.to_minutes,
    currentHour.to_Am_Pm
  );
  const fromTime = convertToMinutes(
    hour.from_hour,
    hour.from_minutes,
    hour.from_Am_Pm
  );
  const toTime = convertToMinutes(hour.to_hour, hour.to_minutes, hour.to_Am_Pm);

  return (
    (currentFromTime >= fromTime && currentFromTime < toTime) ||
    (currentToTime > fromTime && currentToTime <= toTime)
  );
};

const reducer = (
  state: Task,
  action: {
    type:
      | 'ADD_HOUR'
      | 'REMOVE_HOUR'
      | 'UPDATE_HOUR'
      | 'TOGGLE_DAY'
      | 'UPDATE_TIMEZONE';
    data: {
      minute?: number;
      period?: string;
      hour?: number;
      day?: Days;
      id?: number;
      enabled?: boolean;
      hours?: number;
      updateType?: string;
      timezone?: string;
    };
  }
) => {
  switch (action.type) {
    case 'ADD_HOUR': {
      const newState = { ...state };
      let checkedHours: Hour[] = [];
      newState.days = newState.days.map((d) => {
        const data = { ...d };
        if (d.day === action.data.day) {
          const currentHour = { ...initialHours, id: d.hours.length + 1 };
          checkedHours = d.hours.filter((hour) => {
            return IsHourConflict(currentHour, hour);
          });
          data.hours.push(currentHour);
        }
        if (checkedHours.length > 0) {
          data.error = {
            message: 'There is a conflict',
            type: 'warning',
          };
        }
        return data;
      });

      return {
        ...newState,
      };
    }
    case 'REMOVE_HOUR': {
      const { day, id } = action.data;
      const newState = { ...state };

      newState.days = newState.days.map((d) => {
        if (d.day === day) {
          const updatedHours = d.hours.filter((hour) => hour.id !== id);
          const updatedDay = {
            ...d,
            hours: updatedHours,
            error: null,
          };
          return updatedDay;
        }
        return d;
      });

      return validateTime(newState); // Apply time validation after removing the hour
    }

    case 'TOGGLE_DAY': {
      const newState = { ...state };

      newState.days = newState.days.map((d) => {
        const day = d;
        if (day.day === action.data.day) {
          day.enabled = action.data.enabled;
        }
        return day;
      });

      return {
        ...newState,
      };
    }
    case 'UPDATE_HOUR': {
      const { hour, minute, period, day, id, updateType } = action.data;
      const newState = {
        ...state,
        days: state.days.map((d) => {
          if (d.day === day) {
            const updatedHours = d.hours.map((hourItem) => {
              if (hourItem.id === id) {
                const updatedHour = {
                  ...hourItem,
                  [`${updateType}_hour`]: hour,
                  [`${updateType}_minutes`]: minute,
                  [`${updateType}_Am_Pm`]: period,
                };
                return updatedHour;
              }
              return hourItem;
            });

            const updatedDay = {
              ...d,
              hours: updatedHours,
            };
            return updatedDay;
          }
          return d;
        }),
      };
      // console.log('newState', newState);

      return validateTime(newState); // Apply time validation after each hour update
    }
    case 'UPDATE_TIMEZONE': {
      const newState = { ...state };

      newState.timezone = action.data.timezone;
      // console.log('State', newState);
      return {
        ...newState,
      };
    }

    default:
      return state;
  }
};

interface CameraDataProps {
  cameraData: LiveSettings;
}

//

const CreateTask = (props: CameraDataProps) => {
  const { cameraData } = props;
  // console.log('cameraData', cameraData);

  const [popup, setPopup] = useState(false);
  const [value1, setValue1] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [isChecked1, setIsChecked1] = useState(true);
  const [errorMSg, seterrorMsg] = useState(false);
  const [days, dispatch] = useReducer(reducer, initialState);
  const [showToast, setShowToast] = useState(false);

  const handleToggleChange = (day: Days, enabled: boolean) => {
    dispatch({
      type: 'TOGGLE_DAY',
      data: { day, enabled },
    });
  };
  console.log('cameraData', cameraData.id);

  const handleToggle = () => {
    setIsChecked((val) => !val);
  };
  const handleToggle1 = () => {
    setIsChecked1((val) => !val);
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
  useEffect(() => {
    if (days.days.some((item: Day) => item.error)) {
      seterrorMsg(true);
    } else {
      seterrorMsg(false);
    }
  }, [days.days]);
  const handleTzChange = (timezone: string) => {
    dispatch({
      type: 'UPDATE_TIMEZONE',
      data: {
        timezone,
      },
    });
    // Do something with the updated timezone value
    // console.log('Selected timezone:', timezone);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  const handleSaveButtonClick = async () => {
    const url = `${MAIN_URL}${LIVE_RECORDING_SETTINGS_CREATE}`;
    // console.log('log', url);

    if (isChecked1) {
      try {
        const payload = {
          // camera_name: cameraData.deviceName,
          camera_id: cameraData.id,
          is_ffmpeg_live_recording_all_time: true,
        };
        const result = await callApi(url, 'POST', payload);
        console.log('API response:', result);
        setShowToast(true);
      } catch (error) {
        console.error('API request error:', error);
      }
    } else {
      try {
        const data1 = days.days.map((item: any) => ({
          from_time: `${item.hours[0].from_hour}:${item.hours[0].from_minutes} ${item.hours[0].from_Am_Pm}`,
          to_time: `${item.hours[0].to_hour}:${item.hours[0].to_minutes} ${item.hours[0].to_Am_Pm}`,
          day_of_week: convertDayToNumber(item.day),
          camera_name: days.camera,
          is_active: isChecked,
          is_ffmpeg_live_recording_all_time: isChecked1,
          camera_id: days.cameraId,
        }));
        // console.log('items', data1);

        await Promise.all(
          data1.map(async (datas: any) => {
            const Postdata = {
              from_time: datas.from_time,
              to_time: datas.to_time,
              day_of_week: datas.day_of_week,
              camera_name: datas.camera_name,
              is_active: datas.is_active,
              is_ffmpeg_live_recording_all_time:
                datas.is_ffmpeg_live_recording_all_time,
              camera_id: datas.camera_id,
            };
            // console.log('Postdata:', Postdata);
            const result = await callApi(url, 'POST', Postdata);
            console.log('API response:', result);
          })
        );

        const convertedDays = days.days.map((day: any) => ({
          // Convert day names to numbers if needed
          ...day,
          day: convertDayToNumber(day.day),
        }));

        console.log(convertedDays, 'Submit');
        setShowToast(true);
      } catch (error) {
        console.error('API request error:', error);
      }
    }
    setPopup(false);
  };

  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.4 } },
  };
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setTimeout(() => {
            setPopup(!popup);
          }, 400);
        }}
        className="ml-2 mt-1 select-none max-[1000px]:ml-24"
      >
        <CurvedButton backgroundColor="bg-tertiary-color" height="">
          <div className="flex px-[1vw] py-[0.5vh]">
            <Image
              width={20}
              height={20}
              src="/assets/icons/icon18.svg"
              alt=""
              className=""
            />
            <div className="px-[1vw]  text-sm text-quaternary-color group-hover:text-secondary-color">
              Schedule
            </div>
          </div>
        </CurvedButton>
      </button>
      {popup && (
        <div className="">
          <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-fifthOpacity-color ">
            <div
              className={`${
                value1 || isChecked ? 'top-[3%]' : 'top-[26%]'
              } absolute `}
            >
              <div
                className={`  
                  w-[39rem]  bg-primary-color sm:rounded-2xl `}
                ref={popupRef}
              >
                {/* <h1 className="mt-4  text-center ">
                 
                </h1> */}
                <div className="select-none pt-[14px] text-center text-sm text-font-color">
                  {' '}
                  Create new task
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPopup(false);
                    setIsChecked(true);
                  }}
                >
                  <Image
                    width={0}
                    height={0}
                    src="/assets/icons/close.svg"
                    alt=""
                    className="absolute -right-2 top-[-7px] h-auto w-auto select-none"
                  />
                </button>
                <div className="ml-6 flex">
                  <Toggle
                    button={isChecked}
                    text
                    onClick={handleToggle}
                    // state={isChecked === true ? 'isChecked' : ''}
                    id="Enable"
                    textType="Enable"
                  />
                  <div className="ml-2 flex">
                    <Toggle
                      button={isChecked1}
                      text={false}
                      disabled
                      onClick={handleToggle1}
                      // state={isChecked1 === true ? 'isChecked' : ''}
                      id="Always recording"
                    />
                    <span className="ml-2 select-none text-sm text-quaternary-color">
                      Always recording
                    </span>
                  </div>
                </div>

                <div
                  className={`ml-[25px] ${
                    isChecked1 ? 'pointer-events-none' : ''
                  }`}
                >
                  <Timezone
                    props="Time zone"
                    title="GMT -5:00 Central Standard Time"
                    width={`w-[36rem]  ${
                      isChecked1 === true ? '' : 'text-font-color'
                    }`}
                    img="/assets/icons/timezone.svg"
                    position=""
                    onTzChanged={handleTzChange}
                  />
                </div>

                <div className=" mt-2">
                  <div
                    className={`ml-9 select-none  pb-2 text-sm font-semibold ${
                      isChecked1 === true ? '' : 'text-font-color'
                    }`}
                  >
                    Live feeds
                  </div>
                  <div
                    className={` ml-6 ${
                      isChecked1 ? 'pointer-events-none' : ''
                    }`}
                  >
                    <div>
                      <div
                        className={`relative h-full w-[36rem] ${
                          value1 || isChecked
                            ? 'rounded-2xl  transition duration-300'
                            : 'rounded-full'
                        }   border-2 border-tertiary-color duration-300 ease-in-out group-hover:border-quaternary-color`}
                      >
                        <button
                          type="button"
                          data-testid="Accordion1"
                          onClick={() => {
                            setTimeout(() => {
                              setValue1(!value1);
                            }, 100);
                          }}
                          className={`relative  w-[36rem] ${
                            isChecked ? 'pointer-events-none' : ''
                          }`}
                        >
                          <div className="-mt-1 flex h-[34px]">
                            <span
                              className={`absolute left-0  ml-4 mt-[10px] select-none text-base  ${
                                isChecked1 === true ? '' : 'text-font-color'
                              }`}
                            >
                              {days.camera}
                            </span>
                            {/* ))} */}
                          </div>
                          <div className="flex justify-end">
                            <Image
                              width={12}
                              height={0}
                              src="/assets/icons/Vector (3).png"
                              alt="Icon"
                              className={`absolute right-[10px] top-[17px] mr-2 h-auto select-none ${
                                value1 ? 'rotate-180' : ''
                              }`}
                            />
                          </div>
                        </button>
                        <div
                          className={`custom-scrollbar ${
                            value1 || isChecked
                              ? 'h-[26rem]'
                              : 'hidden h-[full]'
                          } w-[37rem] overflow-y-auto overflow-x-hidden pb-2`}
                        >
                          <div className=" mt-[-20px] w-[36rem]">
                            {(value1 === true || isChecked === true) &&
                              days.days.map((item: any) => (
                                <div key={item.day} className="">
                                  <motion.div
                                    initial="closed"
                                    animate={
                                      value1 || isChecked ? 'open' : 'closed'
                                    }
                                    variants={dropdownVariants}
                                  >
                                    <div
                                      className={`${
                                        isChecked1 ? 'opacity-10' : ''
                                      } `}
                                    >
                                      <ToggleComponent
                                        id={item.day}
                                        day={item.day}
                                        checked={item.enabled}
                                        onToggleChange={handleToggleChange}
                                      />

                                      {item.enabled && (
                                        <div className="ml-[28%] mt-[-58px] ">
                                          {item.hours.map((items: any) => (
                                            <div
                                              key={items.id}
                                              className="flex flex-row"
                                            >
                                              {/* {task && ( */}
                                              <div className="relative ml-4">
                                                <TimeSelect
                                                  textColor="text-font-color"
                                                  timeSelectId={items.id}
                                                  day={item.day}
                                                  hour={items.from_hour}
                                                  updateType="from"
                                                  // minutes1={items.from_minutes}
                                                  // timePeriod1={items.from_Am_Pm}
                                                  updateHour={(
                                                    id: number | undefined,
                                                    day: Days,
                                                    hour: number,
                                                    minute: number,
                                                    period: string,
                                                    updateType:
                                                      | string
                                                      | undefined
                                                  ) => {
                                                    dispatch({
                                                      type: 'UPDATE_HOUR',
                                                      data: {
                                                        id,
                                                        day,
                                                        hour,
                                                        minute,
                                                        period,
                                                        updateType,
                                                      },
                                                    });
                                                  }}
                                                />
                                              </div>
                                              <span className="ml-2 mt-[22px] select-none text-quaternary-color">
                                                -
                                              </span>
                                              <div className="relative ml-2">
                                                <TimeSelect
                                                  textColor="text-font-color"
                                                  timeSelectId={items.id}
                                                  day={item.day}
                                                  hour={items.to_hour}
                                                  minutes1={items.to_minutes}
                                                  timePeriod1={items.to_Am_Pm}
                                                  updateType="to"
                                                  // minutes1={items.from_minutes}
                                                  // timePeriod1={items.from_Am_Pm}
                                                  updateHour={(
                                                    id: number | undefined,
                                                    day: Days,
                                                    hour: number,
                                                    minute: number,
                                                    period: string,
                                                    updateType:
                                                      | string
                                                      | undefined
                                                  ) => {
                                                    dispatch({
                                                      type: 'UPDATE_HOUR',
                                                      data: {
                                                        id,
                                                        day,
                                                        hour,
                                                        minute,
                                                        period,
                                                        updateType,
                                                      },
                                                    });
                                                  }}
                                                />
                                              </div>

                                              <div>
                                                {items.id === 1 ? (
                                                  <button
                                                    disabled={item.error}
                                                    onClick={() => {
                                                      setTimeout(() => {
                                                        dispatch({
                                                          type: 'ADD_HOUR',
                                                          data: {
                                                            day: item.day,
                                                            // from_hour: '',
                                                            // from_minutes: '',
                                                            // from_Am_Pm: '',
                                                          },
                                                        });
                                                      }, 500);
                                                    }}
                                                    type="button"
                                                    className="ml-2 mt-[21px] cursor-pointer select-none"
                                                  >
                                                    <HalfCurvedButtons
                                                      content="+ Add hour"
                                                      height="h-[39px]"
                                                      width="w-28 "
                                                      backgroundColor={
                                                        item.error
                                                          ? ' '
                                                          : 'bg-primary-color text-quaternary-color'
                                                      }
                                                      textsize={`text-base ml-[-25px] 
                                                                               `}
                                                    />
                                                  </button>
                                                ) : (
                                                  // />
                                                  <button
                                                    onClick={() => {
                                                      dispatch({
                                                        type: 'REMOVE_HOUR',
                                                        data: {
                                                          day: item.day,
                                                          id: items.id,
                                                          // from_hour: '',
                                                          // from_minutes: '',
                                                          // from_Am_Pm: '',
                                                        },
                                                      });
                                                    }}
                                                    type="button"
                                                    className="ml-2 mt-[18px] cursor-pointer select-none"
                                                  >
                                                    <HalfCurvedButtons
                                                      content="- Remove"
                                                      height="h-[39px]"
                                                      width="w-28 "
                                                      backgroundColor=""
                                                      textsize={`text-base ml-[-17px] 
                                                       text-quaternary-color
                                                      `}
                                                    />
                                                  </button>
                                                )}
                                              </div>

                                              {/* <button
                                            onClick={item.removeButton}
                                            type="button"
                                            className="ml-4 mt-[18px] cursor-pointer"
                                          >
                                            <SettingsComponent
                                              content="- Remove"
                                              height="h-[39px]"
                                              width="w-28 "
                                              backgroundColor=""
                                              textsize={`text-base ml-[-17px] 
                                                       text-quaternary-color
                                                      `}
                                            />
                                          </button> */}
                                            </div>
                                          ))}
                                          {item.error && (
                                            <span className=" ml-8 w-32 select-none text-center text-sm text-[#FF1759] duration-1000">
                                              {item.error.message}
                                            </span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="ml-[26px] mt-4 w-[90%] border border-tertiary-color" />

                <div>
                  <div className="mb-4 ml-[7.5rem] mt-3 flex flex-row pb-[25px]">
                    <Toggle text={false} id="send email" />
                    <span className="ml-2 select-none text-sm">
                      Send email notification
                    </span>
                    <button
                      disabled={errorMSg}
                      // disabled={isChecked1 === true}
                      type="submit"
                      onClick={handleSaveButtonClick}
                      className={`-mt-1 ml-5 h-8 w-36 select-none rounded-3xl text-center text-base  no-underline ${
                        errorMSg
                          ? 'pointer-events-none border border-tertiary-color'
                          : ' bg-secondary-color text-font-color'
                      }`}
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
          heading="Task Scheduled"
          message="Task has been scheduled successfully!"
          onClose={handleToastClose}
        />
      )}
    </div>
  );
};

export default CreateTask;
