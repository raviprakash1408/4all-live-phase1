'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import Clouds from './clouds';
import Files from './files';

const CloudSync = () => {
  const [value, setValue] = useState('Files');

  return (
    <div className="custom-scrollbar  mt-2 h-[86vh] overflow-y-auto overflow-x-hidden">
      <div className=" flex justify-center rounded-full  bg-transparent">
        <button
          type="button"
          onClick={() => {
            setValue('Files');
          }}
          className={`${
            value === 'Files'
              ? 'bg-secondary-color text-font-color'
              : 'text-quaternary-color'
          } relative h-10 w-52 rounded-l-full border-2  border-tertiary-color text-center text-base`}
        >
          <Image
            src="/assets/icons/Media.svg"
            alt=""
            width={24}
            height={20}
            className={`absolute left-3 top-[10px] ${
              value === 'Files' ? 'brightness-[2] grayscale' : ''
            }`}
          />
          Files
        </button>

        <button
          type="button"
          onClick={() => {
            setValue('Cloud');
          }}
          className={`${
            value === 'Cloud'
              ? 'bg-secondary-color text-font-color'
              : 'text-quaternary-color'
          } relative h-10 w-52 rounded-r-full border-2 border-l-0  border-tertiary-color text-center text-base`}
        >
          <Image
            src="/assets/icons/Clouds.svg"
            alt=""
            width={24}
            height={20}
            className={`absolute left-3 top-[10px] ${
              value === 'Cloud' ? 'brightness-[2] grayscale' : ''
            }`}
          />
          Cloud
        </button>
      </div>
      {value === 'Files' ? (
        <div>
          <Files />
        </div>
      ) : (
        <div>
          <Clouds />
        </div>
      )}
    </div>
  );
};

export default CloudSync;
