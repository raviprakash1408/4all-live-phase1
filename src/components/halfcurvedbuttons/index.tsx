import Image from 'next/image';
import React from 'react';

import type { CurvedButton } from './types';

const HalfCurvedButtons = (props: CurvedButton) => {
  const curve = () => {
    if (!props.halfCurved) return 'rounded-full';
    if (props.curveType === 'left') return 'rounded-l-full';
    if (props.curveType === 'right') return 'rounded-r-full';
    return '';
  };
  // const getSizeClass = () => {
  //   if (!props.content) {
  //     return 'h-10 w-10';
  //   }
  //   switch (props.size) {
  //     case 'large':
  //       return 'h-12 w-48';
  //     case 'small':
  //       return 'h-8 w-24';
  //     case 'medium':
  //       return 'h-10 w-40';
  //     default:
  //       return 'h-10';
  //   }
  // };
  const ImgSizeClass = () => {
    switch (props.size) {
      case 'large':
        return 'h-12 w-12';
      case 'medium':
        return 'h-8';
      case 'small':
      default:
        return '';
    }
  };
  // const getSpaceClass = () => {
  //   if (props.size === 'small') {
  //     return 'mr-2';
  //   }
  //   return 'mr-6';
  // };

  return (
    <div
      // type="button"
      className={`${props.height} flex items-center ${curve()} ${
        props.width
      } border-2 border-tertiary-color ${props.backgroundColor} py-1.5  pl-4 ${
        props.textcolor
      } hover:border-quaternary-color`}
    >
      <Image
        width={0}
        height={0}
        src={props.image ? props.image : ''}
        alt=""
        className={`${props.imgcolor} ${ImgSizeClass} h-auto w-auto`}
      />
      <div className={`${props.textsize} ${props.textProp} pl-4`}>
        {props.content}
      </div>
    </div>
  );
};

export { HalfCurvedButtons };
