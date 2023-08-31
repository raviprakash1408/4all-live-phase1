// import React from 'react'

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import type { InputItem } from './types';

const InputField = (props: InputItem) => {
  const [inputValue, setInputValue] = useState<string>(props.value ?? ''); // Provide a default value
  useEffect(() => {
    setInputValue(props.value ?? '');
  }, [props.value]);

  const [touched, setTouched] = useState(false);
  const image = props.withImage;
  const handleChange = (event: any) => {
    const { value } = event.target;
    setInputValue(value);
    // setTouched(value === '');
    setTouched(value === '' && (props.validation || false));
    props.onChange(event);
  };

  const handleBlur = () => {
    // setTouched(inputValue === '');
    setTouched(inputValue === '' && props.validation);
  };

  return (
    <div>
      <div className={`relative flex ${props.height} flex-col`}>
        <span
          className={`pointer-events-none absolute ${props.bottominput} ml-4 flex-1  bg-primary-color p-1 text-sm  text-quaternary-color`}
        >
          {props.name}
        </span>
        <input
          data-testid="inputField"
          value={inputValue}
          onBlur={props.validation ? handleBlur : undefined}
          onChange={handleChange}
          type="text"
          className={`${props.width} flex-1 ${
            props.height
          } rounded-full border-2 border-solid ${
            touched ? `${props.errorBorder}` : `${props.borderColor}`
          }  bg-primary-color ${
            props.img ? `${props.textMargin}` : `${props.textMargin}`
          } pr-2 text-sm  font-normal  text-font-color transition-colors  duration-300 ease-in-out placeholder:text-quaternary-color  ${
            touched
              ? `hover:${props.errorBorder}`
              : `hover:${props.borderColor}`
          } focus:outline-none`}
          placeholder={props.placeholder}
        />
        {image && (
          <Image
            width={0}
            height={0}
            src={props.img ? props.img : ''}
            className={`absolute ml-4 mt-[8px] h-5 w-5 ${props.imgCursor}`}
            alt=""
          />
        )}
        <div className="absolute top-11">
          {touched && <span className="ml-5  text-red-500">{props.error}</span>}
        </div>
      </div>
    </div>
  );
};

export default InputField;
