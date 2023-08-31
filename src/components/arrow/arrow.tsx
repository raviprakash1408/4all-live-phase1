import Image from 'next/image';
import React from 'react';

import type { ArrowTypes } from './types';

export default function Arrow(props: ArrowTypes) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`${
        props.width
      } flex items-center justify-center  rounded-full border-2  ${
        props.borderColor ? props.borderColor : 'border-tertiary-color'
      } ${props.backgroundColor}  hover:border-quaternary-color`}
    >
      <Image
        width={props.iconWidth ? props.iconWidth : 50}
        height={props.iconHeight ? props.iconHeight : 50}
        src={props.img}
        alt="Icon"
        className={`${props.rotate}`}
      />
    </button>
  );
}
