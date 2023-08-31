'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import type { CheckBoxTickTypes } from './types';

const CheckboxTick = (props: CheckBoxTickTypes) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label
      htmlFor="checkbox"
      className="flex cursor-pointer items-center space-x-2"
    >
      <input
        type="checkbox"
        className="hidden"
        checked={isChecked}
        id="checkbox"
        onChange={handleCheckboxChange}
      />
      <span
        className={`flex h-5 w-5 items-center justify-center rounded border-2 border-solid border-secondary-color bg-transparent ${
          isChecked ? `${props.secondaryColor}` : ''
        }`}
      >
        {isChecked || (
          <div>
            <Image
              width={0}
              height={0}
              className="h-auto w-auto"
              src="/assets/icons/Vector 82.svg"
              alt=""
            />
          </div>
        )}
      </span>
    </label>
  );
};

export default CheckboxTick;
