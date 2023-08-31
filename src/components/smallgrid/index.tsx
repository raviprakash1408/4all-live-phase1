'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import RangeSlider from '../range';
import type { SmallGridItems } from './types';

const SmallGrid = (props: SmallGridItems) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleSliderMouseEnter = () => {
    setIsHovered(true);
  };

  const handleSliderMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      onMouseEnter={handleSliderMouseEnter}
      onMouseLeave={handleSliderMouseLeave}
      className={`rounded-1 group flex h-10 min-w-[50px] items-center justify-center gap-0 ${
        props.bgColor
      } pb-[7px] pt-[2px] text-quaternary-color hover:bg-secondary-color hover:text-white md:h-auto md:min-w-[206px] md:gap-[18px] md:rounded-[20px] ${
        props.active ? 'active' : ''
      }`}
    >
      <Image
        width={20}
        height={0}
        src={props.img}
        alt=""
        className={` h-auto ${props.selected}  group-hover:brightness-0 group-hover:invert md:w-10`}
      />
      <div className="hidden md:block">
        <div
          className={`${props.textColor} text-left font-poppins text-sm font-semibold`}
        >
          {props.content1}
        </div>
        <div className={`text-left ${props.textColor}  font-poppins text-sm`}>
          {' '}
          {props.content2}
        </div>
        <div className="flex items-center justify-center gap-2">
          <Image
            width={0}
            height={0}
            src={props.subImage ? props.subImage : ''}
            alt=""
            className={`h-auto w-auto pr-3 ${props.selected}  group-hover:brightness-0 group-hover:invert`}
          />

          <RangeSlider
            progress={40}
            type="withoutThumb"
            width="w-[43px]"
            textSide=""
            dataType=""
            rangeColor={isHovered ? '#fff' : props.rangeColor}
            rangeDisabled
          />
          <div className={`font-poppins ${props.textColor} text-sm`}>
            {props.content3}
          </div>
        </div>
      </div>
    </div>
  );
};

export { SmallGrid };
