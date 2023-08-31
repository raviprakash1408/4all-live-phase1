import React from 'react';

import type { ButtonType } from './types';

const FileButton = (props: ButtonType) => {
  let bgColor: string = 'bg-secondary-color';

  if (props.name === 'Roto') {
    bgColor = 'bg-secondary-color';
  }
  if (props.name === 'Plate') {
    bgColor = 'bg-[#009BCC]';
  }
  if (props.name === 'VFX') {
    bgColor = 'bg-[#B857C8]';
  }
  if (props.name === 'QC') {
    bgColor = 'bg-[#CC7A00]';
  }
  if (props.name === '...') {
    bgColor = 'bg-[#00CC76]';
  }

  return (
    <button
      type="button"
      className={`${bgColor} ml-2 w-[52px] cursor-pointer rounded-2xl text-sm text-font-color`}
    >
      {props.name}
    </button>
  );
};

export default FileButton;
