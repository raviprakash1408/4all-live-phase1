/* eslint-disable no-console */

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useReducer, useRef, useState } from 'react';

import callApi from '@/utils/constants/apiCall';
import { MAIN_URL, TASK } from '@/utils/constants/apiUrls';
import { convertToMinutes, isHourConflict } from '@/utils/helperfunctions';

import { CustomizedSelect } from '../CustomizedSelect';
import { HalfCurvedButtons } from '../halfcurvedbuttons';
import InputField from '../input field/InputField';
import TimeSelect from '../NewTask/timeSelect';
import ToggleComponent from '../NewTask/toggleComponent';
import NumberInput from '../NumberInput';
import RangeSlider from '../range';
import Toggle from '../toggle button/toggle';
import DateSelector from './dateSelector';
import { CreateNewTaskState, NewTasNewTaskinitialHours } from './initialData';
import { ToggleCheckbox, ToggleTask } from './toggleTask';
import type { AddTaskProps, Day, Days, Hour, Task } from './types';

const validateTime = (days: Task[]): Task[] => {
  const newState = days.map((task) => {
    const updatedTask: Task = {
      ...task,
      days: task.days.map((day) => {
        const updatedDay: Day = {
          ...day,
          error: null,
        };

        const { hours } = day;
        const hourCount = hours.length;
        let totalMinutes = 0;
        let fromTime: number = 0;
        let toTime: number = 0;

        for (let i = 0; i < hourCount; i += 1) {
          const currentHour = hours[i];
          fromTime =
            (currentHour?.from_hour &&
              convertToMinutes(
                currentHour.from_hour,
                currentHour.from_minutes,
                currentHour.from_Am_Pm
              )) ??
            0;
          toTime =
            (currentHour?.to_hour &&
              convertToMinutes(
                currentHour.to_hour,
                currentHour.to_minutes,
                currentHour.to_Am_Pm
              )) ??
            0;

          // Check if from_time and to_time are the same
          if (fromTime === toTime) {
            updatedDay.error = {
              message: 'From time and to time cannot be the same',
              type: 'error',
            };

            break;
          }

          if (fromTime > toTime) {
            updatedDay.error = {
              message: 'Time slot exceeds the boundary of the day',
              type: 'error',
            };

            break;
          }

          // Check if current hour overlaps with any other hour
          for (let j = 0; j < hourCount; j += 1) {
            if (i !== j) {
              // Skip comparing with itself
              const compareHour = hours[j];

              if (compareHour) {
                // Add null check here
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
                  updatedDay.error = {
                    message: 'Time slots cannot overlap',
                    type: 'error',
                  };

                  break;
                }
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
          updatedDay.error = {
            message: 'Time slot exceeds the boundary of the day',
            type: 'error',
          };
        }

        return updatedDay;
      }),
    };

    return updatedTask;
  });

  return newState;
};

const reducer = (state: Task[], action: any): Task[] => {
  let taskId: number;

  switch (action.type) {
    case 'ADD_HOUR': {
      const { id, day } = action.data;
      const newState = state.map((task) => {
        if (task.cameraId === id) {
          const updatedTask = { ...task };
          let checkedHours: Hour[] = [];
          updatedTask.days = updatedTask.days.map((d) => {
            const updatedDay = { ...d };
            if (d.day === day) {
              const currentHour: Hour = {
                ...NewTasNewTaskinitialHours,
                id: d.hours.length + 1,
              };
              checkedHours = d.hours.filter((hour) =>
                isHourConflict(currentHour, hour)
              );
              updatedDay.hours.push(currentHour);
            }
            if (checkedHours.length > 0) {
              updatedDay.error = {
                message: 'There is a conflict',
                type: 'warning',
              };
            }
            return updatedDay;
          });
          return updatedTask;
        }
        return task;
      });

      return validateTime(newState);
    }

    case 'REMOVE_HOUR': {
      const { id, day } = action.data;
      const newState = state.map((task) => {
        const updatedTask = { ...task };
        updatedTask.days = updatedTask.days.map((d) => {
          if (d.day === day) {
            const updatedHours = d.hours.filter((hour) => hour.id !== id);
            console.log('id', id);

            const updatedDay = {
              ...d,
              hours: updatedHours,
              error: null,
            };
            return updatedDay;
          }
          return d;
        });
        return updatedTask;
      });

      return validateTime(newState);
    }
    case 'TOGGLE_CHECKBOX':
      taskId = action.data.taskId; // Assign value to taskId
      return state.map((task) =>
        task.cameraId === taskId ? { ...task, checkbox: !task.checkbox } : task
      );
    case 'RESET_STATE':
      return CreateNewTaskState;
    case 'TOGGLE_DAY': {
      const { day, enabled } = action.data;
      const newState = state.map((task) => {
        const updatedTask = { ...task };
        updatedTask.days = updatedTask.days.map((d) => {
          if (d.day === day) {
            const updatedDay = { ...d, enabled };
            return updatedDay;
          }
          return d;
        });
        return updatedTask;
      });

      return newState;
    }

    case 'UPDATE_HOUR': {
      const { cameraId, id, day, hour, minute, period, updateType } =
        action.data;
      console.log('updatHour', cameraId, id, hour, minute, period, updateType);

      const newState = state.map((task) => {
        if (task.cameraId === cameraId) {
          const updatedTask = { ...task };
          updatedTask.days = updatedTask.days.map((d) => {
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
          });
          return updatedTask;
        }
        return task;
      });
      return validateTime(newState);
    }

    case 'UPDATE_TIMEZONE': {
      const { id, timezone } = action.data;
      const newState = state.map((task) => {
        if (task.cameraId === id) {
          const updatedTask = { ...task, timezone };
          return updatedTask;
        }
        return task;
      });

      return newState;
    }

    case 'SET_TASK_NAME': {
      const { taskName } = action.data;
      const newState = state.map((task) => {
        const updatedTask = { ...task, taskName };
        return updatedTask;
      });

      return newState;
    }
    case 'SET_START_DATE':
      return state.map((task) => {
        return {
          ...task,
          startDate: action.startDate,
        };
      });

    case 'SET_END_DATE':
      return state.map((task) => {
        return {
          ...task,
          endDate: action.endDate,
        };
      });
    case 'SET_FROM_TIME':
      return state.map((task) => {
        return {
          ...task,
          fromTime: action.fromTime, // Add fromTime
        };
      });
    case 'SET_TO_TIME':
      return state.map((task) => {
        return {
          ...task,
          toTime: action.toTime, // Add toTime
        };
      });
    case 'SET_FROM_TIME1': {
      const { hour, minute, seconds, period, updateType } = action.data;
      const formattedHour = hour < 10 ? `0${hour}` : hour;
      const formattedMinute = minute < 10 ? `0${minute}` : minute;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

      return state.map((task) => ({
        ...task,
        [`${updateType}Time`]: `${formattedHour}:${formattedMinute}:${formattedSeconds}:${period}`,
      }));
    }

    default:
      return state;
  }
};

//

const NewTaskCreate: React.FC<AddTaskProps> = ({ addTask, sortedData }) => {
  const [popup, setPopup] = useState(false);
  const [value1, setValue1] = useState<number | null>(null);
  const [isChecked1, setIsChecked1] = useState(true);
  const [errorMSg, seterrorMsg] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  // const [isOpenState, setIsOpenState] = useState({});
  const [nameError, setNameError] = useState(true);
  // const [error, seterror] = useState('');
  // const [warning, setwarning] = useState('');
  const [error1] = useState('');
  const [warning1] = useState('');
  const [taskName, setTaskName] = useState('');
  const [emptyTaskname, setEmptyTaskName] = useState(true);
  const [days, dispatch] = useReducer(reducer, CreateNewTaskState);

  // const [deleteTask, setDeleteTask] = useState(false);

  useEffect(() => {
    const nameExists = sortedData?.some(
      (item) => item?.title?.toLowerCase() === taskName.toLowerCase()
    );

    if (nameExists) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [taskName, sortedData]);
  useEffect(() => {
    if (!popup) {
      setTaskName('');
    }
  }, [popup, taskName]);
  useEffect(() => {
    if (taskName === '') {
      setEmptyTaskName(true);
    } else {
      setEmptyTaskName(false);
    }
  }, [taskName]);
  console.log('nameError', errorMSg, taskName);
  let selectedType: string;
  if (selectedOption === 'Live recording') {
    selectedType = 'live_recording';
  }
  // const [cameraList, setCameraList] = useState<Task[]>([]);
  const handleToggleChange = (day: Days, enabled: boolean) => {
    dispatch({
      type: 'TOGGLE_DAY',
      data: { day, enabled },
    });
  };
  const timestamp = Date.now();
  const currentDate = new Date(timestamp);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const CurrentDay = currentDate.getDate();
  const HandleCreate = async () => {
    const url = `${MAIN_URL}${TASK}`;
    const filteredDays = days.filter((item) => item.checkbox);

    try {
      for (const day of filteredDays) {
        const Postdata = {
          name: `${taskName}-${day.camera}`,
          task_type: selectedType,
          live_recording_id: Date.now(),
          mp4_queue_id: Date.now(),
        };

        const jsonData = callApi<any>(url, 'POST', Postdata);
        console.log('jsonData', jsonData);
      }
    } catch (error) {
      console.error('API request error:', error);
    }

    setSelectedOption('');
    console.log('checkboxselect', url, filteredDays);
    setPopup(false);
    dispatch({ type: 'RESET_STATE' });
  };

  // const HandleCreate = () => {
  //   const filteredDays = days.filter((item) => item.checkbox);
  //   // setCameraList(filteredDays);

  //   const task: any = {
  //     id: Date.now(),
  //     title: taskName,
  //     type: selectedOption,
  //     creationDate: `${CurrentDay.toString()}-${month
  //       .toString()
  //       .padStart(2, '0')}-${year.toString()}`,
  //     completionDate: '',
  //     status: 'Queue',
  //     notification: false,
  //   };

  //   // Check if filteredDays contains items before proceeding
  //   if (filteredDays.length > 0) {
  //     filteredDays.forEach((camera, index) => {
  //       const cameraPropertyName = `cameraName${index + 1}`;
  //       task[cameraPropertyName] = camera;
  //     });

  //     console.log(task);

  //     // Make sure addTask function works correctly
  //     addTask(task);
  //   }
  //   console.log('cameraList', task);
  //   setPopup(false);
  //   setTaskName('');
  //   // setCameraList([]);
  //   setSelectedOption('');

  //   dispatch({ type: 'RESET_STATE' });
  // };
  const HandleFileDelete = () => {
    // setCameraList(filteredDays);

    const task: any = {
      id: Date.now(),
      title: taskName, // Make sure you have defined taskName somewhere
      type: selectedOption, // Make sure you have defined selectedOption somewhere
      creationDate: `${CurrentDay.toString()}-${month
        .toString()
        .padStart(2, '0')}-${year.toString()}`,
      compeletionDate: '',
      status: 'Queue',
      notification: false,
    };

    addTask(task);
    console.log('deleteTask', task);
    setSelectedOption('');
    setTaskName('');

    setPopup(false);
    // setCameraList([]);
    dispatch({ type: 'RESET_STATE' });
  };
  // console.log("cameraListsadfdsf",cameraList,task);

  const handleCheckboxToggle = (taskId: number) => {
    dispatch({
      type: 'TOGGLE_CHECKBOX',
      data: { taskId },
    });
  };

  // const toggleDay = (id: number, day: Days, enabled: boolean) => {
  //   dispatch({
  //     type: 'TOGGLE_DAY',
  //     data: { id, day, enabled },
  //   });
  // };
  const handleTaskNameChange = (event: any) => {
    const { value } = event.target;
    setTaskName(value);
  };
  console.log('TaskName', days);

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

  // const handleTzChange = (timezone: string) => {
  //   dispatch({
  //     type: 'UPDATE_TIMEZONE',
  //     data: {
  //       timezone,
  //     },
  //   });
  // };

  // console.log('fileDeleting', fileDeleting);

  // async function postData(url: any, data: any) {
  //   try {
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
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
  const options = [
    { id: 1, name: 'Live recording' },
    // { id: 2, name: 'Schedule live stream' },
    { id: 3, name: 'Mp4 generation' },
    { id: 4, name: 'File deletion' },
  ];
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);

    // Do something with the selected option in the parent component
  };

  let dropDownImg;
  if (selectedOption === 'Schedule live stream') {
    dropDownImg = '/assets/icons/liveStreamingImg.svg';
  }
  if (selectedOption === 'Live recording') {
    dropDownImg = '/assets/icons/ProcessingImg.svg';
  }
  if (selectedOption === 'Mp4 generation') {
    dropDownImg = '/assets/icons/CompletedImg.svg';
  }
  if (selectedOption === 'File deletion') {
    dropDownImg = '/assets/icons/deleteImg.svg';
  }
  // useEffect(() => {
  //   if (selectedOption === 'Mp4 generation') {
  //     setValue1(null);
  //   }
  // }); // Add selectedOption as a dependency

  const fileDeletion = [
    {
      id: 1,
      title: ' Delete all files immediately',
    },
    {
      id: 2,
      title: ' Delete old files and move them to recycle bin',
    },
    // {
    //   id: 3,
    //   title: 'Make an archive at the work folder and delete an original',
    // },
    // {
    //   id: 4,
    //   title: 'Move to the folder',
    // },
    // {
    //   id: 5,
    //   title: 'Copy to the folder',
    // },
    // {
    //   id: 6,
    //   title:
    //     'Report search for the old files without actions. Result seen in logs',
    // },
  ];
  const handleAddHour = (id: any, day: any) => {
    // console.log('Adding hour:', id, day);
    dispatch({
      type: 'ADD_HOUR',
      data: {
        id,
        day,
      },
    });
  };
  const handleStartDateChange = (startDate: string) => {
    dispatch({
      type: 'SET_START_DATE',
      startDate,
    });
    // console.log('time', startDate);
  };
  // console.log('time', days);

  // const handleEndDateChange = (endDate: string) => {
  //   dispatch({
  //     type: 'SET_END_DATE',
  //     endDate,
  //   });
  //   // console.log('fromtime', endDate);
  // };
  const handleFromTimeChange = (fromTime: string) => {
    dispatch({
      type: 'SET_FROM_TIME',
      fromTime,
    });
    // console.log('fromtime', fromTime);
  };

  // const handleToTimeChange = (toTime: string) => {
  //   dispatch({
  //     type: 'SET_TO_TIME',
  //     toTime,
  //   });
  //   // console.log('fromtime', toTime);
  // };

  useEffect(() => {
    const hasError = days.some((task) => {
      return task.days.some((item) => {
        return item.error;
      });
    });
    if (hasError === true) {
      seterrorMsg(true);
    } else {
      seterrorMsg(false);
    }
    // seterrorMsg(hasError);
  }, [days]);

  // useEffect(() => {
  //   let hasWarning = false;
  //   let hasError = false;
  //   let hasErrorTime = false;
  //   const hasWarningTime = false;
  //   const convertToTime = (timeString: string) => {
  //     const [time, period] = timeString.split(' ');
  //     const [hour = '0', minute = '0', seconds = '0'] = time?.split(':') ?? [];
  //     const isPM = period?.toLowerCase() === 'pm';

  //     let hourValue = parseInt(hour, 10);
  //     if (Number.isNaN(hourValue)) {
  //       hourValue = 0;
  //     }
  //     if (isPM && hourValue !== 12) {
  //       hourValue += 12;
  //     } else if (!isPM && hourValue === 12) {
  //       hourValue = 0;
  //     }

  //     return new Date(
  //       0,
  //       0,
  //       0,
  //       hourValue,
  //       parseInt(minute, 10),
  //       parseInt(seconds, 10)
  //     );
  //   };
  //   days.forEach((item) => {
  //     if (item.startDate === item.endDate && item.fromTime === item.toTime) {
  //       hasError = true;
  //     }
  //     if (item.startDate > item.endDate) {
  //       hasWarning = true;
  //     }
  //     if (item.fromTime === item.toTime) {
  //       hasErrorTime = true;
  //     }
  //     if (selectedOption === 'Mp4 generation') {
  //       const fromTime = convertToTime(item.fromTime);
  //       const toTime = convertToTime(item.toTime);

  //       if (fromTime > toTime) {
  //         // fromTime is greater than toTime
  //         hasErrorTime = true;
  //         // console.log('fromTime is greater than toTime');
  //       } else {
  //         // fromTime is not greater than toTime
  //         // console.log('fromTime is not greater than toTime');
  //       }
  //     }
  //     // Add additional conditions for warnings/errors here if needed

  //     // Break the loop if both warning and error conditions are met
  //     // if (hasWarning && hasError) {
  //     // }
  //   });

  //   setwarning(
  //     hasWarning ? '⚠ End time should not be smaller than start time.' : ''
  //   );
  //   seterror(
  //     hasError ? "You can't select the same start time and end time." : ''
  //   );
  //   setwarning1(
  //     hasWarningTime ? '⚠ End time should not be smaller than start time.' : ''
  //   );
  //   seterror1(
  //     hasErrorTime ? "You can't select the same start time and end time." : ''
  //   );
  //   seterrorMsg(!!hasError);
  //   seterrorMsg(!!hasErrorTime);
  // }, [days]);

  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.4 } },
  };
  let TimeField;
  if (selectedOption === 'Mp4 generation') {
    TimeField = false;
  } else {
    TimeField = true;
  }
  let checkedHeight: string;
  if (isChecked1) {
    checkedHeight = 'h-48';
  } else {
    checkedHeight = 'h-[26rem]';
  }
  const handleToggleClick = (id: number, title: string) => {
    console.log('Clicked item:', { id, title });
    // Add your other logic here if needed
  };
  console.log('updateTime', days);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setTimeout(() => {
            setPopup(!popup);
          }, 400);
        }}
        className="ml-4 mt-4 select-none"
      >
        <HalfCurvedButtons
          content="New Task"
          height="min-[400px]:h-8 min-[1600px]:h-9"
          width="w-[8.2rem]"
          image="/assets/icons/icon10.svg"
          backgroundColor="bg-tertiary-color"
          halfCurved={false}
          textcolor="text-quaternary-color hover:border-quaternary-color"
          textsize="text-sm pl-[6px]"
        />
      </button>
      {popup && (
        <div className="">
          <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-fifthOpacity-color">
            <div
              className={`${
                selectedOption === 'Live recording' ||
                selectedOption === 'File deletion' ||
                selectedOption === 'Mp4 generation' ||
                selectedOption === 'Schedule live stream'
                  ? 'top-[3%]'
                  : 'top-[26%]'
              }
                  absolute
                `}
            >
              <div
                className={`  
                
                  w-[39rem]  bg-primary-color sm:rounded-2xl `}
                ref={popupRef}
              >
                {/* <h1 className="mt-4  text-center ">
                 
                </h1> */}
                <div className=" select-none pt-[14px] text-center text-sm text-font-color">
                  {' '}
                  Create new task
                </div>
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
                    className="absolute -right-2 top-[-7px] h-auto w-auto select-none"
                  />
                </button>
                <div className="ml-6">
                  <InputField
                    name="Task name"
                    validation={false}
                    withImage={false}
                    height="h-10"
                    width="w-[36.25rem]"
                    bottominput="-top-4"
                    onChange={(e: any) => handleTaskNameChange(e)}
                    placeholder="Task Name"
                    textMargin="pl-8"
                    borderColor={`${
                      nameError === true
                        ? 'border-red-500'
                        : 'border-tertiary-color'
                    }`}
                  />
                  {nameError && (
                    <span className="mt-1 text-sm text-red-500">
                      Task with this name is already available
                    </span>
                  )}
                </div>
                <div className="ml-6 mt-4 flex ">
                  <CustomizedSelect
                    width="w-72"
                    height="h-[40px]"
                    title="Task type"
                    border="rounded-full"
                    options={options}
                    textcolor="text-font-color"
                    textMarginLeft="pl-7"
                    onSelectOption={handleSelectOption}
                    img={dropDownImg}
                    arrowBottom="top-[14px] "
                    imgHeight="h-5 ml-3"
                    borderColor="border-tertiary-color group-hover:border-quaternary-color"
                  />
                  {selectedOption === 'File deletion' && (
                    <div className="ml-1">
                      <InputField
                        name="Directory"
                        validation={false}
                        withImage={false}
                        height="h-[40px]"
                        width="w-72"
                        bottominput="-top-4"
                        textMargin="pl-8"
                        borderColor="border-tertiary-color"
                      />
                    </div>
                  )}

                  {(selectedOption === 'Live recording' ||
                    selectedOption === 'Schedule live stream') && (
                    <div className="ml-4 mt-2 flex">
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
                  )}
                </div>
                {selectedOption === 'File deletion' && (
                  <div className="ml-6 mt-2 flex ">
                    <div className="relative">
                      <RangeSlider
                        progress={80}
                        type="withThumb"
                        width="w-72 mt-2"
                        textSide="up"
                        dataType="%"
                        textMargin="ml-[13.2rem] "
                        rangeDisabled={false}
                      />
                      <div className=" absolute left-[-10px] top-[6px] text-sm text-quaternary-color">
                        Storage threshold to start deleting
                      </div>
                    </div>
                    <div className="mt-3">
                      <CustomizedSelect
                        width="w-72"
                        height="h-[40px]"
                        title="Extension filter"
                        border="rounded-full"
                        // options={options}
                        textcolor="text-font-color"
                        textMarginLeft="ml-11"
                        onSelectOption={handleSelectOption}
                        arrowBottom="top-[14px] "
                        borderColor="border-tertiary-color group-hover:border-quaternary-color"
                      />
                    </div>
                  </div>
                )}
                {selectedOption === 'File deletion' && (
                  <>
                    <div className="ml-8 mt-2 text-base font-medium text-font-color">
                      Action
                    </div>
                    {fileDeletion.map((item) => (
                      <button
                        type="button"
                        // onClick={() => console.log(item.title)}
                        key={item.id}
                        className="ml-8 mt-2 w-[35rem] rounded-full border-2 border-tertiary-color"
                      >
                        <div className="relative ml-3 flex pb-2 pt-[6px]">
                          <ToggleCheckbox
                            onToggleClick={handleToggleClick}
                            id={`${item.id}`}
                            title={item.title}
                          />
                          <span className=" ml-6 text-base text-quaternary-color">
                            {item.title}
                          </span>
                        </div>
                      </button>
                    ))}
                    <div className="ml-8 mt-2 text-base font-medium text-font-color">
                      Keep Time
                    </div>
                    <div className="mt-4 flex">
                      <div className="ml-2">
                        <NumberInput name="Keep Time" img="" withImg={false} />
                      </div>
                      <div className="ml-2">
                        <CustomizedSelect
                          width="w-72"
                          height="h-[40px]"
                          title="Time unit"
                          border="rounded-full"
                          // options={options}
                          textcolor="text-font-color"
                          textMarginLeft="ml-11"
                          onSelectOption={handleSelectOption}
                          arrowBottom="top-[14px] "
                          borderColor="border-tertiary-color group-hover:border-quaternary-color"
                        />
                      </div>
                    </div>
                  </>
                )}
                {/* {(selectedOption === 'Schedule recording' ||
                  selectedOption === 'Schedule live stream') && (
                  <div
                    className={`ml-8 mt-4 flex ${
                      isChecked1 ? 'pointer-events-none opacity-10' : ''
                    }`}
                  >
                    <div className="relative">
                      <span className="pointer-events-none absolute top-[-17px] z-[1] ml-4 h-6 flex-1 bg-primary-color p-1 text-sm text-quaternary-color">
                        Start Date
                      </span>
                      <DateSelector
                        TimeField={TimeField}
                        onDateChange={handleStartDateChange}
                        onTimeChange={handleFromTimeChange}
                        showDateSelector
                      />
                      <span className="absolute w-[20rem] whitespace-nowrap text-sm text-red-500">
                        {error}
                      </span>
                      <span className="absolute w-[19rem] whitespace-nowrap text-sm text-yellow-500">
                        {warning}
                      </span>
                    </div>
                    <div className="relative ml-2">
                      <span className="pointer-events-none absolute top-[-17px] z-[1] ml-4 h-6 flex-1 bg-primary-color p-1 text-sm text-quaternary-color">
                        End Date
                      </span>
                      <DateSelector
                        TimeField={TimeField}
                        onDateChange={handleEndDateChange}
                        onTimeChange={handleToTimeChange}
                        showDateSelector
                      />
                    </div>
                  </div>
                )} */}
                {selectedOption === 'Mp4 generation' && (
                  <div
                    className={`ml-8 mt-5 flex ${
                      isChecked1 ? 'pointer-events-none opacity-10' : ''
                    }`}
                  >
                    <div className="relative">
                      <span className="pointer-events-none absolute top-[-17px] z-[1] ml-4 h-6 flex-1 bg-primary-color p-1 text-sm text-quaternary-color">
                        Date
                      </span>
                      <DateSelector
                        TimeField={TimeField}
                        onDateChange={handleStartDateChange}
                        onTimeChange={handleFromTimeChange}
                        showDateSelector
                      />
                    </div>
                  </div>
                )}
                {selectedOption === 'Mp4 generation' && (
                  <div
                    className={`ml-8 mt-6 flex  ${
                      isChecked1 ? 'pointer-events-none opacity-10' : ''
                    }`}
                  >
                    <div className="relative">
                      <span className="pointer-events-none absolute top-[-17px] z-[1] ml-4 h-6 flex-1 bg-primary-color p-1 text-sm text-quaternary-color">
                        From Time
                      </span>
                      <TimeSelect
                        type="seconds"
                        width="w-[17rem]"
                        textColor="text-font-color"
                        updateType="from"
                        updateHour={(
                          id: number | undefined,
                          day: Days,
                          hour: number,
                          minute: number,
                          period: string,
                          updateType: string | undefined,
                          seconds: number | undefined,
                          cameraId: number | undefined
                        ) => {
                          dispatch({
                            type: 'SET_FROM_TIME1',
                            data: {
                              id,
                              cameraId,
                              day,
                              hour,
                              minute,
                              period,
                              seconds,
                              updateType,
                            },
                          });
                        }}
                      />
                      <span className="absolute w-[19rem] whitespace-nowrap text-sm text-red-500">
                        {error1}
                      </span>
                      <span className="absolute w-[19rem] whitespace-nowrap text-sm text-yellow-500">
                        {warning1}
                      </span>
                    </div>
                    <div className="relative ml-2">
                      <span className="pointer-events-none absolute top-[-17px] z-[1] ml-4 h-6 flex-1 bg-primary-color p-1 text-sm text-quaternary-color">
                        To Time
                      </span>
                      <TimeSelect
                        type="seconds"
                        width="w-[17rem]"
                        textColor="text-font-color"
                        updateType="to"
                        updateHour={(
                          id: number | undefined,
                          day: Days,
                          hour: number,
                          minute: number,
                          period: string,
                          updateType: string | undefined,
                          seconds: number | undefined,
                          cameraId: number | undefined
                        ) => {
                          dispatch({
                            type: 'SET_FROM_TIME1',
                            data: {
                              id,
                              cameraId,
                              day,
                              hour,
                              minute,
                              period,
                              seconds,
                              updateType,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                )}
                {/* {(selectedOption === 'Schedule recording' ||
                  selectedOption === 'Schedule live stream' ||
                  selectedOption === 'Mp4 generation') && (
                  <div
                    className={`relative ml-[25px] mt-9 ${
                      isChecked1 ? 'pointer-events-none opacity-10' : ''
                    }`}
                  >
                    <span className="pointer-events-none absolute top-[-17px] z-[1] ml-4 h-6 flex-1 bg-primary-color p-1 text-sm text-quaternary-color">
                      Timezone
                    </span>
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
                )} */}
                {(selectedOption === 'Live recording' ||
                  selectedOption === 'Schedule live stream' ||
                  selectedOption === 'Mp4 generation') && (
                  <div className=" mt-2">
                    <div
                      className={`${
                        isChecked1 ? '' : ''
                      } ml-9 select-none pb-2  text-sm font-semibold text-font-color `}
                    >
                      Live feeds
                    </div>
                    <div
                      className={`custom-scrollbar  h-[22rem] 
                                 w-[38.5rem] overflow-y-auto overflow-x-hidden pb-2`}
                    >
                      {days.map((device) => {
                        console.log('device', device);
                        return (
                          <div
                            key={device.cameraId}
                            className={`${isChecked1 ? '' : ''} ml-6 mt-2 `}
                          >
                            <div>
                              <div
                                className={`relative h-full w-[36rem] ${
                                  value1
                                    ? 'rounded-2xl  transition duration-300'
                                    : 'rounded-full'
                                }   border-2 border-tertiary-color duration-300 ease-in-out group-hover:border-quaternary-color`}
                              >
                                <div
                                  data-testid="Accordion1"
                                  className="relative  flex w-[36rem]"
                                >
                                  <div className="mb-[5px] flex">
                                    <ToggleTask
                                      id={device.camera}
                                      backgroundColor=""
                                      type="Square"
                                      button={device.checkbox}
                                      onClick={() => {
                                        // Stop the click event from propagating
                                        handleCheckboxToggle(device.cameraId);
                                      }}
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    className="w-[29vw]"
                                    onClick={() => {
                                      // Update value1 directly using the functional form of setState
                                      setValue1((prevValue) =>
                                        prevValue === device.cameraId
                                          ? null
                                          : device.cameraId
                                      );
                                    }}
                                  >
                                    <span className="ml-4 mt-1 flex select-none  items-start text-start text-base  text-font-color">
                                      {device.camera}
                                    </span>
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
                                </div>
                                <div
                                  className={`custom-scrollbar  ${
                                    value1 === device.cameraId
                                      ? checkedHeight
                                      : 'hidden h-[42px]'
                                  } w-[37rem] overflow-y-auto overflow-x-hidden pb-2`}
                                >
                                  {isChecked1 ? (
                                    <div className="mt-[4.5rem] flex items-center justify-center self-center text-base font-medium text-quaternary-color">
                                      Always recording is on
                                    </div>
                                  ) : (
                                    <div className=" mt-[-20px] w-[36rem]">
                                      {value1 === device.cameraId &&
                                        device.days.map((item: any) => {
                                          return (
                                            <div key={item.day}>
                                              <motion.div
                                                initial="closed"
                                                animate={
                                                  value1 ? 'open' : 'closed'
                                                }
                                                variants={dropdownVariants}
                                              >
                                                <div className={` `}>
                                                  <ToggleComponent
                                                    id={item.day}
                                                    day={item.day}
                                                    checked={item.enabled}
                                                    onToggleChange={
                                                      handleToggleChange
                                                    }
                                                  />

                                                  {item.enabled && (
                                                    <div className="ml-[26%] mt-[-58px]">
                                                      {item.hours.map(
                                                        (items: any) => (
                                                          <div
                                                            key={items.id}
                                                            className="flex flex-row"
                                                          >
                                                            <div className="relative ml-4">
                                                              <TimeSelect
                                                                textColor="text-font-color"
                                                                timeSelectId={
                                                                  items.id
                                                                }
                                                                day={item.day}
                                                                hour={
                                                                  items.from_hour
                                                                }
                                                                cameraId={
                                                                  device.cameraId
                                                                }
                                                                updateType="from"
                                                                updateHour={(
                                                                  id:
                                                                    | number
                                                                    | undefined,
                                                                  day: Days,
                                                                  hour: number,
                                                                  minute: number,
                                                                  period: string,
                                                                  updateType:
                                                                    | string
                                                                    | undefined,
                                                                  cameraId:
                                                                    | number
                                                                    | undefined
                                                                ) => {
                                                                  dispatch({
                                                                    type: 'UPDATE_HOUR',
                                                                    data: {
                                                                      id,
                                                                      cameraId,
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
                                                                timeSelectId={
                                                                  items.id
                                                                }
                                                                day={item.day}
                                                                hour={
                                                                  items.to_hour
                                                                }
                                                                cameraId={
                                                                  device.cameraId
                                                                }
                                                                minutes1={
                                                                  items.to_minutes
                                                                }
                                                                timePeriod1={
                                                                  items.to_Am_Pm
                                                                }
                                                                updateType="to"
                                                                updateHour={(
                                                                  id:
                                                                    | number
                                                                    | undefined,
                                                                  day: Days,
                                                                  hour: number,
                                                                  minute: number,
                                                                  period: string,
                                                                  updateType:
                                                                    | string
                                                                    | undefined,
                                                                  cameraId:
                                                                    | number
                                                                    | undefined
                                                                ) => {
                                                                  dispatch({
                                                                    type: 'UPDATE_HOUR',
                                                                    data: {
                                                                      id,
                                                                      cameraId,
                                                                      day,
                                                                      hour,
                                                                      minute,
                                                                      period,
                                                                      updateType,
                                                                    },
                                                                  });
                                                                  console.log(
                                                                    'UpateHour',
                                                                    hour
                                                                  );
                                                                }}
                                                              />
                                                            </div>

                                                            <div>
                                                              {items.id ===
                                                              1 ? (
                                                                <button
                                                                  disabled={
                                                                    item.error
                                                                  }
                                                                  onClick={() => {
                                                                    setTimeout(
                                                                      () => {
                                                                        handleAddHour(
                                                                          device.cameraId,
                                                                          item.day
                                                                        );
                                                                      },
                                                                      500
                                                                    ); // 1000 milliseconds = 1 second
                                                                  }}
                                                                  type="button"
                                                                  className="ml-2 mt-[22px] cursor-pointer select-none"
                                                                >
                                                                  <HalfCurvedButtons
                                                                    content="+ Add hour"
                                                                    height="h-[39px]"
                                                                    width="w-28"
                                                                    backgroundColor={
                                                                      item.error
                                                                        ? ''
                                                                        : 'bg-primary-color text-quaternary-color'
                                                                    }
                                                                    textsize="text-base ml-[-25px]"
                                                                  />
                                                                </button>
                                                              ) : (
                                                                <button
                                                                  onClick={() => {
                                                                    dispatch({
                                                                      type: 'REMOVE_HOUR',
                                                                      data: {
                                                                        day: item.day,
                                                                        id: items.id,
                                                                      },
                                                                    });
                                                                  }}
                                                                  type="button"
                                                                  className="ml-2 mt-[18px] cursor-pointer select-none"
                                                                >
                                                                  <HalfCurvedButtons
                                                                    content="- Remove"
                                                                    height="h-[39px]"
                                                                    width="w-28"
                                                                    backgroundColor=""
                                                                    textsize="text-base ml-[-17px] text-quaternary-color"
                                                                  />
                                                                </button>
                                                              )}
                                                            </div>
                                                          </div>
                                                        )
                                                      )}
                                                      {item.error && (
                                                        <span className="ml-8 w-32 select-none text-center text-base text-[#FF1759] duration-1000">
                                                          {item.error.message}
                                                        </span>
                                                      )}
                                                    </div>
                                                  )}
                                                </div>
                                              </motion.div>
                                            </div>
                                          );
                                        })}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <hr className="ml-[26px] mt-4 w-[90%] border border-tertiary-color" />

                <div>
                  <div className="mb-4 ml-[7.5rem] mt-3 flex flex-row pb-[25px]">
                    <Toggle text={false} id="send email" />
                    <span className="ml-2 select-none text-sm">
                      Send email notification
                    </span>
                    <button
                      disabled={errorMSg || nameError || emptyTaskname}
                      // disabled={isChecked1 === true}
                      type="submit"
                      onClick={
                        selectedOption === 'File deletion'
                          ? HandleFileDelete
                          : HandleCreate
                      }
                      // onClick={
                      //   // async () => {
                      //   //   const url =
                      //   //     'http://localhost:9000/api_v1_live_recording_settings'; // Replace with your API endpoint
                      //   //   const data = days.days.map((item: any) => ({
                      //   //     from_time: `${item.hours[0].from_hour}:${item.hours[0].from_minutes} ${item.hours[0].from_Am_Pm}`,

                      //   //     to_time: `${item.hours[0].to_hour}:${item.hours[0].to_minutes} ${item.hours[0].to_Am_Pm}`,
                      //   //     day_of_week: convertDayToNumber(item.day),
                      //   //     camera_name: days.camera,
                      //   //     is_ffmpeg_live_recording_all_time: isChecked1,
                      //   //   }));
                      //   //   console.log('items', data);
                      //   //   // console.log('days', data.from_time);

                      //   //   try {
                      //   //     const result = await postData(url, data);
                      //   //     // Handle the API response, e.g., update state or display success message
                      //   //     console.log('API response:', result);
                      //   //   } catch (error) {
                      //   //     // Handle error, e.g., display an error message
                      //   //     console.error('API request error:', error);
                      //   //   }
                      //   //   const convertedDays = days.days.map((day: any) => {
                      //   //     const convertedNumber = convertDayToNumber(day.day);
                      //   //     return { ...days, day: convertedNumber };
                      //   //   });

                      //   //   console.log(convertedDays, 'Submit');
                      //   // }

                      //   () => {
                      //     console.log('updated', days);

                      //     // console.log(days);

                      //     const convertedDays = days.days.map((day: any) => {
                      //       const convertedNumber = convertDayToNumber(day.day);
                      //       return { ...days, day: convertedNumber };
                      //     });

                      //     console.log(convertedDays, 'Submit');
                      //   }
                      // }
                      className={`-mt-1 ml-5 h-8 w-36 select-none rounded-3xl text-center text-base  no-underline ${
                        errorMSg || nameError || emptyTaskname
                          ? 'pointer-events-none border border-tertiary-color'
                          : ' bg-secondary-color text-font-color'
                      }`}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewTaskCreate;
