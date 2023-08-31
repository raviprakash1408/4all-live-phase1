'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import type { NumberType } from './types';

const NumberInput = (props: NumberType) => {
  const [value, setValue] = useState(0);

  const increaseValue = () => {
    setValue(value + 1);
  };

  const decreaseValue = () => {
    setValue(value - 1);
  };

  return (
    <div className="relative flex h-11 flex-col">
      <span className="pointer-events-none absolute bottom-8 ml-4 flex-1  bg-primary-color p-1 text-sm  text-quaternary-color">
        {props.name}
      </span>
      <input
        className="w-72 flex-1 cursor-pointer select-none rounded-full border-2 
        border-solid
       border-tertiary-color bg-primary-color pl-12 pr-2 font-thin text-font-color  transition-colors duration-300 ease-in-out
       
          placeholder:text-quaternary-color
       hover:border-quaternary-color focus:outline-none "
        placeholder={props.placeholder}
        type="text"
        readOnly
        value={value}
        onChange={(e: any) => setValue(parseInt(e.target.value, 10))}
      />
      {props.withImg === true && (
        <Image
          width={0}
          height={0}
          src={props.img}
          className={`absolute ml-4 mt-[10px] h-6 w-6 ${props.imgCursor}`}
          alt=""
          draggable="false"
        />
      )}
      <div className="absolute bottom-5 ml-64">
        <button
          type="button"
          className=" focus:outline-none"
          onClick={increaseValue}
        >
          <Image
            width={0}
            height={0}
            src="/assets/icons/Vector (3).png"
            alt=""
            className="h-2 w-auto rotate-180"
          />
        </button>
      </div>
      <div className="absolute top-[12px] ml-64">
        <button
          type="button"
          className=" focus:outline-none"
          onClick={decreaseValue}
        >
          <Image
            width={0}
            height={0}
            src="/assets/icons/Vector (3).png"
            alt=""
            className="h-2 w-auto"
          />
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
