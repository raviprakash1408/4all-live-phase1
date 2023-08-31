import Image from 'next/image';
import React from 'react';

import type { Gridbar } from './types';

const BasicGrid = (props: Gridbar) => {
  const getSizeClass = () => {
    switch (props.size) {
      case 'large':
        return 'h-80 w-64';
      case 'small':
        return 'h-32 w-60';
      case 'medium':
      default:
        return 'h-52 w-64';
    }
  };
  const getTextSizeClass = () => {
    switch (props.size) {
      case 'large':
        return 'text-base';
      case 'small':
        return 'text-xs';
      case 'medium':
      default:
        return 'text-sm';
    }
  };

  return (
    <div
      className={` group ml-10  mt-10 flex ${getSizeClass()} flex-col items-center justify-evenly rounded-md  border-2 border-tertiary-color ${
        props.backgroundColor
      }  hover:bg-secondary-color`}
    >
      <div
        className={` flex h-10 w-10 items-center justify-center rounded-full ${props.BackgroundColor} group-hover:bg-tertiary-color`}
      >
        <Image width={25} height={25} src={props.img} alt="no" />
      </div>
      <h3 className={`mt-2 ${getTextSizeClass} ${props.FontColor}`}>
        Getting Started
      </h3>
      <p
        className={`text-center ${getTextSizeClass()} text-quaternary-color group-hover:text-white`}
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
  );
};
export { BasicGrid };
