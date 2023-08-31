// use client

import Image from 'next/image';
import React from 'react';

import RangeSlider from '../range';

const IconComponentButton = () => {
  return (
    <div>
      <button
        type="button"
        className="flex items-center rounded-full border-2 border-[#21464F] bg-[#21464F] px-4 py-2 text-[#70A6A6] hover:border-quaternary-color min-[400px]:h-8 min-[1600px]:h-9"
      >
        <Image
          width={0}
          height={0}
          src="/assets/icons/Grid.svg"
          alt=""
          className="h-4 w-auto"
        />
        <span className="ml-3 text-sm">Grid size</span>
        <div className="ml-2">
          <RangeSlider
            type="withThumb"
            width="w-20"
            textSide=""
            dataType=""
            progress={10}
          />
        </div>
      </button>
    </div>
  );
};
export default IconComponentButton;
