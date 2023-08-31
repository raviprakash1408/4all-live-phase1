import React from 'react';

import Toggle from '../toggle button/toggle';
import type { NewTaskTypes } from './types';

const ToggleComponent = (item: NewTaskTypes) => {
  // const [task, setTask] = useState(item.checked);
  // const [addButton, setAddButton] = useState('0');
  // const [FromError, setFromError] = useState(false);
  // const [ToError, setToError] = useState(false);
  // const [sameDay, setSameDay] = useState(false);
  // const [sameDay1, setSameDay1] = useState(false);
  const { day, checked, onToggleChange } = item;

  const handleToggle = () => {
    setTimeout(() => {
      onToggleChange?.(day, !checked);
    }, 100);
  };

  // const [fromTimeObj, setFromTimeObj] = useState({
  //   day: item.day,
  //   hours: '',
  //   mins: '',
  //   timePeriod: '',
  //   hour1: '',
  //   mins1: '',
  //   timePeriod1: '',
  // });
  // const [toTimeObj, setToTimeObj] = useState({
  //   day: item.day,
  //   hours: '',
  //   mins: '',
  //   timePeriod: '',
  //   hour1: '',
  //   mins1: '',
  //   timePeriod1: '',
  // });
  // const get24HourTimeString = (selectedTime: any) => {
  //   const { day, hours, mins, timePeriod } = selectedTime;
  //   let hourValue = parseInt(hours, 10);

  //   if (timePeriod === 'PM' && hourValue !== 12) {
  //     hourValue += 12;
  //   } else if (timePeriod === 'AM' && hourValue === 12) {
  //     hourValue = 0;
  //   }

  //   const hourString = hourValue.toString().padStart(2, '0');
  //   const minuteString = mins.padStart(2, '0');

  //   return `${day} ${hourString}:${minuteString}`;
  // };
  // const fromTimeString = get24HourTimeString(fromTimeObj);
  // const toTimeString = get24HourTimeString(toTimeObj);
  // const onChangeFromTime = (hour: number, minute: number, period: string) => {
  //   setFromTimeObj({
  //     ...fromTimeObj,
  //     hours: JSON.stringify(hour),
  //     mins: JSON.stringify(minute),
  //     timePeriod: period,
  //   });
  // };

  // const onChangeToTime = (hour: number, minute: number, period: string) => {
  //   setToTimeObj({
  //     ...toTimeObj,
  //     hours: JSON.stringify(hour),
  //     mins: JSON.stringify(minute),
  //     timePeriod: period,
  //   });
  //   if (fromTimeString > toTimeString) {
  //     setSameDay(true);
  //   } else {
  //     setSameDay(false);
  //   }
  // };

  // const get24HourTimeString1 = (selectedTime: any) => {
  //   const { day, hour1, mins1, timePeriod1 } = selectedTime;
  //   let hourValue = parseInt(hour1, 10);

  //   if (timePeriod1 === 'PM' && hourValue !== 12) {
  //     hourValue += 12;
  //   } else if (timePeriod1 === 'AM' && hourValue === 12) {
  //     hourValue = 0;
  //   }

  //   const hourString = hourValue.toString().padStart(2, '0');
  //   const minuteString = mins1.padStart(2, '0');

  //   return `${day} ${hourString}:${minuteString}`;
  // };

  // const fromTimeString1 = get24HourTimeString1(fromTimeObj);
  // const toTimeString1 = get24HourTimeString1(toTimeObj);
  // useEffect(() => {
  //   console.log(fromTimeString);
  // });

  // const onChangeFromTime1 = (hour: number, minute: number, period: string) => {
  //   setFromTimeObj({
  //     ...fromTimeObj,
  //     hour1: JSON.stringify(hour),
  //     mins1: JSON.stringify(minute),
  //     timePeriod1: period,
  //   });
  //   if (fromTimeString1 < fromTimeString || fromTimeString1 > toTimeString) {
  //     // console.log(
  //     //   'Selected time is within the allowed range.',
  //     //   fromTimeString1
  //     // );
  //     setFromError(false);

  //     // setError(true);
  //   } else {
  //     // console.log(
  //     //   'Error: Selected time is outside the allowed range.',
  //     //   fromTimeString1
  //     // );
  //     setFromError(true);
  //   }
  // };

  // const onChangeToTime1 = (hour: number, minute: number, period: string) => {
  //   setToTimeObj({
  //     ...toTimeObj,
  //     hour1: JSON.stringify(hour),
  //     mins1: JSON.stringify(minute),
  //     timePeriod1: period,
  //   });

  //   if (toTimeString1 < fromTimeString || toTimeString1 > toTimeString) {
  //     // console.log('Selected time is within the allowed range.', toTimeString1);
  //     // setError(true);
  //     setToError(false);
  //   } else {
  //     // console.log(
  //     //   'Error: Selected time is outside the allowed range.',
  //     //   toTimeString1
  //     // );
  //     setToError(true);
  //   }
  //   // if (
  //   //   fromTimeString >= JSON.stringify(hour) &&
  //   //   JSON.stringify(hour) <= toTimeString
  //   // ) {
  //   //   setError(true);
  //   //   console.log(error);
  //   // } else {
  //   //   console.log('Error: Selected time is outside the allowed range.');
  //   // }
  //   // if (fromTimeString1 === toTimeString1) {
  //   //   setToError(true);
  //   // } else {
  //   //   setToError(false);
  //   // }
  //   if (fromTimeString1 > toTimeString1) {
  //     setSameDay1(true);
  //   } else {
  //     setSameDay1(false);
  //   }
  // };

  // const addButtobVal = item.id;
  // let initial;
  // useEffect(() => {
  //   if (item.checked === true) {
  //     setTask(true);
  //   } else {
  //     setTask(false);
  //   }
  // }, []);
  return (
    <div>
      {' '}
      <div>
        <div className="mb-[17px] flex h-10 select-none">
          <p
            className={` ml-4 w-[12%] text-start text-base font-normal text-quaternary-color 
            `}
          >
            {item.day}
          </p>
          <div className="ml-8 mr-2 mt-7 ">
            {' '}
            {item.id && (
              <Toggle
                button={item.checked}
                // disabledColor={isChecked1 ? 'opacity-[18%]' : ''}
                // button={isChecked1 === true}
                text={false}
                id={item.id}
                onClick={handleToggle}
                state={checked ? 'isChecked' : ''}
              />
            )}
          </div>

          {/* {task && (
            <>
              <div className="ml-4">
                <TimeSelect
                  textColor="text-font-color"
                  hour={item.hour}
                  minutes1={item.minutes1}
                  timePeriod1={item.timePeriod1}
                  onChangeTime={onChangeFromTime}
                />
              </div>
              <span className="ml-3 mt-[22px] text-quaternary-color">-</span>
              <div className="ml-4">
                <TimeSelect
                  textColor="text-font-color"
                  hour1={item.hour}
                  minutes2={item.minutes1}
                  timePeriod2={item.timePeriod2}
                  onChangeTime={onChangeToTime}
                />
              </div>
              <button
                onClick={item.addButton}
                type="button"
                className="ml-4 mt-[18px] cursor-pointer"
              >
                <SettingsComponent
                  content="+ Add hour"
                  height="h-[39px]"
                  width="w-28 "
                  backgroundColor=""
                  textsize={`text-base ml-[-25px] text-quaternary-color
              `}
                />
              </button>
            </>
          )} */}
          {/* <button
            onClick={item.addButton}
            type="button"
            className="ml-4 mt-[18px] cursor-pointer"
          >
            <SettingsComponent
              content="+ Add hour"
              height="h-[39px]"
              width="w-28 "
              backgroundColor=""
              textsize={`text-base ml-[-25px] text-quaternary-color
              `}
            />
          </button> */}
        </div>
        {/* {sameDay && (
          <span className="ml-48 text-center text-sm text-quaternary-color">
            You cant schedule next days task here
          </span>
        )} */}
        {/* {item.id === addButton && task && (
          <div>
            <div className="mb-2 ml-[10.5rem] flex">
              <div>
                <TimeSelect
                  textColor="text-font-color select-none"
                  onChangeTime={onChangeFromTime1}
                />
              </div>
              <span className="ml-3 mt-[22px] text-quaternary-color">-</span>
              <div className="ml-4">
                <TimeSelect
                  textColor="text-font-color select-none"
                  onChangeTime={onChangeToTime1}
                />
              </div>
              <button
                onClick={() => {
                  setAddButton('');
                }}
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
              </button>
            </div>
            <div>
              {' '}
              {sameDay1 && (
                <span className="ml-48 text-center text-sm text-quaternary-color">
                  You cant schedule next days task here
                </span>
              )}
            </div>
            {(FromError || ToError) && (
              <span className="ml-48 text-center text-sm text-quaternary-color">
                This time has been already selected
              </span>
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ToggleComponent;
