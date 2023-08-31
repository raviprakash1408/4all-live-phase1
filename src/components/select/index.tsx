'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import type { SelectTypes } from './types';

const Select = (props: SelectTypes) => {
  const [value, setvalue] = useState(props.value);
  // console.log(value);

  return (
    <div
      className=" relative rounded-full
    border-2 border-solid
  border-tertiary-color   transition-colors duration-300  ease-in-out placeholder:text-quaternary-color  hover:border-quaternary-color"
    >
      <span className="pointer-events-none absolute bottom-[27px] ml-4 flex-1  bg-primary-color p-1 text-sm  text-quaternary-color  ">
        {props.name}
      </span>
      {props.img !== '' && (
        <Image
          width={24}
          height={24}
          src={props.img}
          className="absolute ml-4 mt-[10px]"
          alt=""
        />
      )}

      <select
        name=""
        id=""
        className={`h-10 w-[98%] rounded-full  bg-primary-color  ${
          props.img !== '' ? 'pl-12' : 'pl-4'
        } text-base  font-thin 
        text-quaternary-color  focus:outline-none
        `}
        value={value}
        onChange={(e) => {
          setvalue(e.target.value);
          if (props.onChange) {
            props.onChange(e.target.value);
          }
        }}
      >
        {props.options?.map((item) => (
          <option
            key={item}
            value={item}
            // selected={value === item}
            className=""
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export { Select };
