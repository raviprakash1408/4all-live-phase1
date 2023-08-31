'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import type { CurvedButton } from './types';

const HalfCurvedButton = (props: CurvedButton) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const openFileUploader = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };
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
        return 'h-4 w-20';
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
    <div>
      {props.buttonType === 'normal' && (
        <div
          // type="button"
          className={`mt-1 flex items-center ${curve()}  border-2 border-tertiary-color ${
            props.backgroundColor
          } py-2  pl-4 ${props.Color} hover:border-quaternary-color ${
            props.width
          } ${props.height}`}
        >
          <Image
            width={21}
            height={30}
            src={props.image}
            alt="Icon"
            className={`${props.Color1} ${ImgSizeClass}`}
          />
          <div className={`text-sm ${props.textProp}`}>{props.content}</div>
        </div>
      )}
      {props.buttonType === 'uploadFile' && (
        <div>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileInputChange}
          />
          <button
            type="button"
            className={`mt-1 flex items-center ${curve()}  ${props.width} ${
              props.height
            } border-2 border-tertiary-color ${
              props.backgroundColor
            } py-2  pl-4 ${props.Color} hover:border-quaternary-color`}
            onClick={openFileUploader}
          >
            <Image
              width={21}
              height={30}
              src={props.image}
              alt="Icon"
              className={`${props.Color1} ${ImgSizeClass}`}
            />
            <span className="ml-4 text-base">
              {props.content}
              {selectedFile ? '' : ''}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export { HalfCurvedButton };
