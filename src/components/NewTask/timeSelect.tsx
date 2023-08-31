import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import type { NewTaskTypes } from './types';

const TimeSelect = (props: NewTaskTypes) => {
  const [select, setSelect] = useState(false);
  const [number, setNumber] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState('AM');
  const popupRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const secondsRef = useRef<HTMLDivElement>(null);
  const formatNumber = (num: any) => {
    return num.toString().padStart(2, '0');
  };
  useEffect(() => {
    if (props.hour) {
      setNumber(props.hour);
    } else {
      setNumber(0);
    }
  }, []);

  useEffect(() => {
    if (props.minutes1 !== undefined) {
      setMinutes(props.minutes1);
    } else {
      setMinutes(0);
    }
  }, []);

  useEffect(() => {
    if (props.timePeriod1 !== undefined) {
      setTime(props.timePeriod1);
    } else {
      setTime('AM');
    }
  }, []);

  const prevData = useRef<{ number: number; minutes: number; time: string }>({
    number: 0,
    minutes: 0,
    time: '',
  });
  console.log('cameraId', props.cameraId);

  useEffect(() => {
    if (
      number !== prevData.current.number ||
      minutes !== prevData.current.minutes ||
      time !== prevData.current.time
    ) {
      props.updateHour?.(
        props.timeSelectId,
        props.day,
        number,
        minutes,
        time,
        props.updateType,
        props.cameraId,

        seconds
      );
      prevData.current.number = number;
      prevData.current.minutes = minutes;
      prevData.current.time = time;
    }
  }, [number, minutes, time, props.updateHour]);

  const increaseSeconds = () => {
    setSeconds((prevSeconds) => (prevSeconds + 10) % 60);
  };

  const decreaseSeconds = () => {
    setSeconds((prevSeconds) => (prevSeconds - 10 + 60) % 60);
  };

  const previousSeconds = [(seconds - 20 + 60) % 60, (seconds - 10 + 60) % 60];
  const nextSeconds = [(seconds + 10) % 60, (seconds + 20) % 60];

  const increaseMinutes = () => {
    setMinutes((prevMinutes) => (prevMinutes + 1) % 60);
  };

  const decreaseMinutes = () => {
    setMinutes((prevMinutes) => (prevMinutes - 1 + 60) % 60);
  };
  const previousMinutes = [(minutes - 2 + 60) % 60, (minutes - 1 + 60) % 60];
  const nextMinutes = [(minutes + 1) % 60, (minutes + 2) % 60];

  const increaseNumber = () => {
    setNumber((prevNumber) => (prevNumber + 1) % 13);
  };

  const decreaseNumber = () => {
    setNumber((prevNumber) => (prevNumber - 1 + 13) % 13);
  };
  const previousNumbers = [(number - 2 + 13) % 13, (number - 1 + 13) % 13];
  const nextNumbers = [(number + 1) % 13, (number + 2) % 13];
  const selectNumber = (selectedNumber: any) => {
    setNumber(selectedNumber);
  };
  const selectSeconds = (selectedSeconds: any) => {
    setSeconds(selectedSeconds);
  };
  const selectMinutes = (selectedMinutes: any) => {
    setMinutes(selectedMinutes);
  };
  // const formatNumber = (num: any) => {
  //   return num.toString().padStart(2, '0');
  // };
  const handleMinutesWheel = (event: WheelEvent) => {
    const { deltaY } = event;
    if (deltaY < 0) {
      increaseMinutes();
    } else if (deltaY > 0) {
      decreaseMinutes();
    }
  };

  const handleNumberWheel = (event: WheelEvent) => {
    const { deltaY } = event;
    if (deltaY < 0) {
      increaseNumber();
    } else if (deltaY > 0) {
      decreaseNumber();
    }
  };
  const handleSecondsWheel = (event: WheelEvent) => {
    const { deltaY } = event;
    if (deltaY < 0) {
      increaseSeconds();
    } else if (deltaY > 0) {
      decreaseSeconds();
    }
  };

  useEffect(() => {
    const minutesRefElement = minutesRef.current;
    if (minutesRefElement) {
      minutesRefElement.addEventListener('wheel', handleMinutesWheel);
    }

    const numberRefElement = numberRef.current;
    if (numberRefElement) {
      numberRefElement.addEventListener('wheel', handleNumberWheel);
    }
    const secondsRefElement = secondsRef.current;
    if (secondsRefElement) {
      secondsRefElement.addEventListener('wheel', handleSecondsWheel);
    }
    return () => {
      if (minutesRefElement) {
        minutesRefElement.removeEventListener('wheel', handleMinutesWheel);
      }
      if (numberRefElement) {
        numberRefElement.removeEventListener('wheel', handleNumberWheel);
      }
      if (secondsRefElement) {
        secondsRefElement.removeEventListener('wheel', handleSecondsWheel);
      }
    };
  });
  const Hour1 = number;
  const Minutes1 = minutes;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setSelect(false);
      }
    };

    const handleEscapeKey = (event: any) => {
      if (event.key === 'Escape') {
        setSelect(false);
      }
    };

    if (select) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [select]);
  return (
    <div ref={popupRef}>
      {Hour1 && Minutes1 ? '' : ''}
      {props.type === 'seconds' ? (
        <div className="relative -mt-2 flex h-[45px] flex-col">
          {/* <button className="pointer-events-none absolute bottom-8 ml-4 flex-1  bg-primary-color p-1 text-sm  text-quaternary-color">
    {props.title}
  </button> */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSelect(!select);
            }}
            className={` mt-2 ${props.width} flex-1 rounded-full border-2 border-solid
     border-tertiary-color
     bg-primary-color px-2 text-start text-base font-thin ${props.textColor}  select-none transition-colors duration-300  
     ease-in-out
       
        placeholder:text-quaternary-color hover:border-quaternary-color focus:outline-none`}
          >
            {formatNumber(number)}:{formatNumber(minutes)}:
            {formatNumber(seconds)}
            <button type="button" className="ml-1">
              {time}
            </button>
            {/* {formattedTime} */}
          </button>
        </div>
      ) : (
        <div className="relative mt-[15px] flex h-[45px] flex-col">
          {/* <button className="pointer-events-none absolute bottom-8 ml-4 flex-1  bg-primary-color p-1 text-sm  text-quaternary-color">
      {props.title}
    </button> */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSelect(!select);
            }}
            className={` mt-2 w-28 flex-1 rounded-full border-2 
       border-solid
       border-tertiary-color bg-primary-color px-2 text-base font-thin ${props.textColor}  select-none transition-colors duration-300  
       ease-in-out
         
          placeholder:text-quaternary-color hover:border-quaternary-color focus:outline-none`}
          >
            {formatNumber(number)}: {formatNumber(minutes)}
            <button type="button" className="ml-1">
              {time}
            </button>
            {/* {formattedTime} */}
          </button>
        </div>
      )}
      {select &&
        (props.type === 'seconds' ? (
          <div className="absolute z-10 w-28 select-none rounded-2xl border border-tertiary-color bg-primary-color">
            <div className=" flex h-8 rounded-full bg-tertiary-color">
              <button
                type="button"
                onClick={() => {
                  setTime('AM');
                }}
                className={` w-[55px] select-none rounded-l-full text-base font-thin ${
                  time === 'AM'
                    ? 'bg-fifth-color text-quaternary-color'
                    : 'text-font-color'
                }`}
              >
                AM
              </button>
              <button
                type="button"
                onClick={() => {
                  setTime('PM');
                }}
                className={` w-[55px] select-none rounded-r-full text-base font-thin ${
                  time === 'PM'
                    ? 'bg-fifth-color text-quaternary-color'
                    : 'text-font-color'
                }`}
              >
                PM
              </button>
            </div>
            <div className=" flex w-28 flex-row">
              <div className="" ref={numberRef}>
                <div className="ml-3">
                  <button type="button" className="" onClick={increaseNumber}>
                    <Image
                      width={0}
                      height={0}
                      src="/assets/icons/Vector (3).png"
                      alt=""
                      className="h-auto w-auto rotate-180 select-none"
                    />
                  </button>
                </div>

                <div className="">
                  <button
                    onClick={() => selectNumber(nextNumbers[1])}
                    type="button"
                    className={`w-[40px] select-none text-lg text-quaternary-color ${
                      number === nextNumbers[2] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(nextNumbers[1])}
                  </button>
                  <br />
                  <button
                    onClick={() => selectNumber(nextNumbers[0])}
                    type="button"
                    className={`w-[40px] select-none text-lg text-quaternary-color ${
                      number === nextNumbers[0] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(nextNumbers[0])}
                  </button>
                  <br />

                  <button
                    onClick={() => selectNumber(number)}
                    type="button"
                    className="w-[40px] select-none bg-fifth-color text-lg text-quaternary-color"
                  >
                    {formatNumber(number)}
                  </button>
                  <br />
                  <button
                    onClick={() => selectNumber(previousNumbers[1])}
                    type="button"
                    className={`w-[40px] select-none text-lg text-quaternary-color ${
                      number === previousNumbers[1] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(previousNumbers[1])}
                  </button>
                  <br />

                  <button
                    onClick={() => selectNumber(previousNumbers[0])}
                    type="button"
                    className={`w-[40px] select-none text-lg text-quaternary-color ${
                      number === previousNumbers[0] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(previousNumbers[0])}
                  </button>
                </div>
                <div className="ml-3">
                  <button type="button" className="" onClick={decreaseNumber}>
                    <Image
                      width={0}
                      height={0}
                      src="/assets/icons/Vector (3).png"
                      alt=""
                      className="h-auto w-auto select-none"
                    />
                  </button>
                </div>
              </div>
              <div className="" ref={minutesRef}>
                <div className="ml-[6px]">
                  <button type="button" className="" onClick={increaseMinutes}>
                    <Image
                      width={0}
                      height={0}
                      src="/assets/icons/Vector (3).png"
                      alt=""
                      className="h-auto w-auto rotate-180 select-none"
                    />
                  </button>
                </div>

                <div className="">
                  <button
                    onClick={() => selectMinutes(nextMinutes[1])}
                    type="button"
                    className={`w-[32px] select-none text-lg text-quaternary-color ${
                      minutes === nextMinutes[2] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(nextMinutes[1])}
                  </button>
                  <br />

                  <button
                    onClick={() => selectMinutes(nextMinutes[0])}
                    type="button"
                    className={`w-[32px] select-none text-lg text-quaternary-color ${
                      minutes === nextMinutes[0] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(nextMinutes[0])}
                  </button>
                  <br />
                  <button
                    type="button"
                    className="w-[32px] select-none bg-fifth-color text-lg text-quaternary-color"
                  >
                    {formatNumber(minutes)}
                  </button>
                  <br />
                  <button
                    onClick={() => selectMinutes(previousMinutes[1])}
                    type="button"
                    className={`w-[32px] select-none text-lg text-quaternary-color ${
                      minutes === previousMinutes[1] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(previousMinutes[1])}
                  </button>

                  <br />
                  <button
                    onClick={() => selectMinutes(previousMinutes[0])}
                    type="button"
                    className={`w-[32px] select-none text-lg text-quaternary-color ${
                      minutes === previousMinutes[0] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(previousMinutes[0])}
                  </button>
                </div>
                <div className="ml-[6px]">
                  <button type="button" className="" onClick={decreaseMinutes}>
                    <Image
                      width={0}
                      height={0}
                      src="/assets/icons/Vector (3).png"
                      alt=""
                      className="h-auto w-auto select-none"
                    />
                  </button>
                </div>
              </div>
              <div className="" ref={secondsRef}>
                <div className="ml-2">
                  <button type="button" className="" onClick={increaseSeconds}>
                    <Image
                      width={0}
                      height={0}
                      src="/assets/icons/Vector (3).png"
                      alt=""
                      className="h-auto w-auto rotate-180 select-none"
                    />
                  </button>
                </div>

                <div className="">
                  <button
                    onClick={() => selectSeconds(nextSeconds[1])}
                    type="button"
                    className={`w-[32px] select-none text-lg text-quaternary-color ${
                      seconds === nextSeconds[2] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(nextSeconds[1])}
                  </button>
                  <br />

                  <button
                    onClick={() => selectSeconds(nextSeconds[0])}
                    type="button"
                    className={`w-[32px] select-none text-lg text-quaternary-color ${
                      seconds === nextSeconds[0] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(nextSeconds[0])}
                  </button>
                  <br />
                  <button
                    type="button"
                    className="w-[32px] select-none bg-fifth-color text-lg text-quaternary-color"
                  >
                    {formatNumber(seconds)}
                  </button>
                  <br />
                  <button
                    onClick={() => selectSeconds(previousSeconds[1])}
                    type="button"
                    className={`w-[32px] select-none text-lg text-quaternary-color ${
                      seconds === previousSeconds[1] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(previousSeconds[1])}
                  </button>

                  <br />
                  <button
                    onClick={() => selectSeconds(previousSeconds[0])}
                    type="button"
                    className={`w-[32px] select-none text-lg text-quaternary-color ${
                      seconds === previousSeconds[0] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(previousSeconds[0])}
                  </button>
                </div>
                <div className="ml-2">
                  <button type="button" className="" onClick={decreaseSeconds}>
                    <Image
                      width={0}
                      height={0}
                      src="/assets/icons/Vector (3).png"
                      alt=""
                      className="h-auto w-auto select-none"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute z-10 w-28 select-none rounded-2xl border border-tertiary-color bg-primary-color">
            <div className=" flex h-8 rounded-full bg-tertiary-color">
              <button
                type="button"
                onClick={() => {
                  setTime('AM');
                }}
                className={` w-[55px] select-none rounded-l-full text-base font-thin ${
                  time === 'AM'
                    ? 'bg-fifth-color text-quaternary-color'
                    : 'text-font-color'
                }`}
              >
                AM
              </button>
              <button
                type="button"
                onClick={() => {
                  setTime('PM');
                }}
                className={` w-[55px] select-none rounded-r-full text-base font-thin ${
                  time === 'PM'
                    ? 'bg-fifth-color text-quaternary-color'
                    : 'text-font-color'
                }`}
              >
                PM
              </button>
            </div>
            <div className=" flex w-28 flex-row">
              <div className="" ref={numberRef}>
                <div className="ml-[19px]">
                  <button type="button" className="" onClick={increaseNumber}>
                    <Image
                      width={0}
                      height={0}
                      src="/assets/icons/Vector (3).png"
                      alt=""
                      className="h-auto w-auto rotate-180 select-none"
                    />
                  </button>
                </div>

                <div className="">
                  <button
                    onClick={() => selectNumber(nextNumbers[1])}
                    type="button"
                    className={`w-[51px] select-none text-lg text-quaternary-color ${
                      number === nextNumbers[2] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(nextNumbers[1])}
                  </button>
                  <br />
                  <button
                    onClick={() => selectNumber(nextNumbers[0])}
                    type="button"
                    className={`w-[51px] select-none text-lg text-quaternary-color ${
                      number === nextNumbers[0] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(nextNumbers[0])}
                  </button>
                  <br />

                  <button
                    onClick={() => selectNumber(number)}
                    type="button"
                    className="w-[51px] select-none bg-fifth-color text-lg text-quaternary-color"
                  >
                    {formatNumber(number)}
                  </button>
                  <br />
                  <button
                    onClick={() => selectNumber(previousNumbers[1])}
                    type="button"
                    className={`w-[51px] select-none text-lg text-quaternary-color ${
                      number === previousNumbers[1] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(previousNumbers[1])}
                  </button>
                  <br />

                  <button
                    onClick={() => selectNumber(previousNumbers[0])}
                    type="button"
                    className={`w-[51px] select-none text-lg text-quaternary-color ${
                      number === previousNumbers[0] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(previousNumbers[0])}
                  </button>
                </div>
                <div className="ml-[24px]">
                  <button type="button" className="" onClick={decreaseNumber}>
                    <Image
                      width={0}
                      height={0}
                      src="/assets/icons/Vector (3).png"
                      alt=""
                      className="h-auto w-auto select-none"
                    />
                  </button>
                </div>
              </div>
              <div className="" ref={minutesRef}>
                <div className="ml-[20px]">
                  <button type="button" className="" onClick={increaseMinutes}>
                    <Image
                      width={0}
                      height={0}
                      src="/assets/icons/Vector (3).png"
                      alt=""
                      className="h-auto w-auto rotate-180 select-none"
                    />
                  </button>
                </div>

                <div className="">
                  <button
                    onClick={() => selectMinutes(nextMinutes[1])}
                    type="button"
                    className={`w-[61px] select-none text-lg text-quaternary-color ${
                      minutes === nextMinutes[2] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(nextMinutes[1])}
                  </button>
                  <br />

                  <button
                    onClick={() => selectMinutes(nextMinutes[0])}
                    type="button"
                    className={`w-[61px] select-none text-lg text-quaternary-color ${
                      minutes === nextMinutes[0] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(nextMinutes[0])}
                  </button>
                  <br />
                  <button
                    type="button"
                    className="w-[61px] select-none bg-fifth-color text-lg text-quaternary-color"
                  >
                    {formatNumber(minutes)}
                  </button>
                  <br />
                  <button
                    onClick={() => selectMinutes(previousMinutes[1])}
                    type="button"
                    className={`w-[61px] select-none text-lg text-quaternary-color ${
                      minutes === previousMinutes[1] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(previousMinutes[1])}
                  </button>

                  <br />
                  <button
                    onClick={() => selectMinutes(previousMinutes[0])}
                    type="button"
                    className={`w-[61px] select-none text-lg text-quaternary-color ${
                      minutes === previousMinutes[0] ? 'bg-fifth-color' : ''
                    }`}
                  >
                    {formatNumber(previousMinutes[0])}
                  </button>
                </div>
                <div className="ml-[24px]">
                  <button type="button" className="" onClick={decreaseMinutes}>
                    <Image
                      width={0}
                      height={0}
                      src="/assets/icons/Vector (3).png"
                      alt=""
                      className="h-auto w-auto select-none"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TimeSelect;
