'use client';

import React, { useEffect, useState } from 'react';

import { CustomizedSelect } from '../CustomizedSelect';
import type { InputAndOutputTypes } from './types';

const SelectInputField = (props: InputAndOutputTypes) => {
  const [inputValue, setInputValue] = useState(props.value);
  const [error, setError] = useState('');
  const [hasError, setHasError] = useState(false);
  const [rtsp, setRtsp] = useState('');
  useEffect(() => {
    setInputValue(props.value); // Update inputValue when props.value changes
  }, [props.value]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const selectedValue = e.target.value;

    setInputValue(selectedValue);
    setError('');
    // console.log("selectedValue",selectedValue);

    props.onChange(selectedValue);
    if (props.rtspValidation) {
      const urlPattern =
        /^(rtsp|srt|SRT):\/\/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}:[0-9]{1,5}\/[a-zA-Z0-9]+["]?/;

      if (selectedValue && !urlPattern.test(selectedValue)) {
        setError('Please enter a valid URL.');
        setHasError(true); // Set error status to true
      } else {
        setHasError(false); // Set error status to false
      }

      // Check for specific patterns in selectedValue
      if (selectedValue.includes('rtsp://')) {
        setRtsp('RTSP');
      } else if (selectedValue.includes('https://')) {
        setRtsp('HTTPS');
      } else if (selectedValue.includes('http://')) {
        setRtsp('HTTP');
      } else if (selectedValue.includes('rtmp://')) {
        setRtsp('RTMP');
      } else if (props.value?.includes('http://')) {
        setRtsp('HTTP');
      } else {
        setRtsp(''); // Reset rtsp if no valid pattern is found
      }
    }
  };

  useEffect(() => {
    if (props.resetButton) {
      setError('');
    }
  }, [props.resetButton]);

  useEffect(() => {
    if (inputValue === '') {
      setRtsp('');
    }
  }, [inputValue]);
  // useEffect(()=>{
  //   if (inputValue?.includes('rtsp://') ) {
  //     // Check for "https"
  //     setRtsp('RTSP'); // Update rtspLink prop with "RTSP"
  //   }
  // },[inputValue])
  useEffect(() => {
    if (props.onInputError) {
      props.onInputError(hasError);
    }
  }, [hasError]);
  useEffect(() => {
    if (inputValue?.includes('https://')) {
      setRtsp('HTTPS');
    } else if (inputValue?.includes('http://')) {
      setRtsp('HTTP'); // Set to "HTTP" instead of an empty string
    } else if (inputValue?.includes('rtsp://')) {
      setRtsp('RTSP');
    }
  }, [inputValue]);
  return (
    <div>
      {/* {inputValue ? '' : ''} */}

      {props.rtspValidation ? (
        <div
          className={`group relative flex ${
            props.disableInput ? 'pointer-events-none opacity-50' : ''
          } ${props.width} group flex-row`}
        >
          <CustomizedSelect
            title={props.title}
            width="w-[5rem]"
            // data={SelectOptions}
            height="h-[38px]"
            borderLeft="rounded-l-full"
            onSelectOption={props.onSelectOption}
            arrowBottom="bottom-[14px] mr-[4px]"
            borderRight="border-r-0"
            defaultvalue="RTSP"
            rtspLink={rtsp}
            options={props.options}
            initialSelect={props.initialSelect}
            textcolor="text-font-color"
            borderColor={
              error !== ''
                ? 'border-red-500 hover:border-red-500'
                : 'border-tertiary-color group-hover:border-quaternary-color'
            }
          />
          <input
            data-testid="inputField"
            type="text"
            value={inputValue}
            onChange={handleChange}
            className={`${props.MarginTop} ${
              error !== ''
                ? 'border-red-500 group-hover:border-red-500'
                : ' border-tertiary-color group-hover:border-quaternary-color'
            }  h-[38px] ${props.width} rounded-r-full border-2 border-solid 
         
         bg-primary-color px-2 text-sm  font-normal text-font-color transition-colors duration-300  ease-in-out placeholder:text-quaternary-color focus:outline-none  
         
             group-hover:border-quaternary-color`}
          />
          {error && (
            <span className="absolute left-24 top-10 text-xs text-red-500">
              {error}
            </span>
          )}
        </div>
      ) : (
        <div className={`group relative flex ${props.width} group flex-row`}>
          <CustomizedSelect
            title={props.title}
            width="w-[5rem]"
            // data={SelectOptions}
            height="h-[38px]"
            borderLeft="rounded-l-full"
            arrowBottom="bottom-[14px] mr-[4px]"
            options={props.options}
            rtspLink={rtsp}
            initialSelect={props.initialSelect}
            onSelectOption={props.onSelectOption}
            borderRight="border-r-0"
            defaultvalue="RTSP"
            textcolor="text-font-color"
            borderColor={
              error
                ? 'border-red-500 hover:border-red-500'
                : 'border-tertiary-color group-hover:border-quaternary-color'
            }
          />
          <input
            data-testid="inputField"
            type="text"
            value={inputValue}
            disabled={props.disableInput}
            onChange={handleChange}
            className={`${props.MarginTop} h-[38px]  border-tertiary-color   group-hover:border-quaternary-color ${props.width} rounded-r-full border-2 border-solid 
         
         bg-primary-color  text-sm font-normal text-font-color transition-colors duration-300  ease-in-out placeholder:text-quaternary-color  focus:outline-none  
         
             group-hover:border-quaternary-color`}
          />
        </div>
      )}
    </div>
  );
};

export default SelectInputField;
