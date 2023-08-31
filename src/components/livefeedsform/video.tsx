'use client';

import React, { useReducer, useState } from 'react';

import { CustomizedSelect } from '../CustomizedSelect';
import RangeSlider from '../range';

const video = [
  {
    name: 'Codec',
    key: 'codec',
    input_type: 'dropdown',
    value: '',
    options: [
      {
        id: 1,
        name: 'Copy',
      },
    ],
  },
  {
    name: 'Preset',
    key: 'preset',
    input_type: 'dropdown',
    value: '',
    options: [
      {
        id: 1,
        name: 'codec',
      },
    ],
  },
  {
    name: 'Pass',
    key: 'preset',
    input_type: 'dropdown',
    value: '',
    options: [
      {
        id: 1,
        name: 'codec',
      },
    ],
  },
  {
    name: 'Bitrate',
    key: 'bitrate',
    input_type: 'rangebar',
    value: '',
  },
  {
    name: 'Min rate',
    key: 'min-rate',
    input_type: 'rangebar',

    value: '',
  },
  {
    name: 'Max rate',
    key: 'max-rate',
    input_type: 'rangebar',

    value: '',
  },
  {
    name: 'Buffer size',
    key: 'buffer-size',
    input_type: 'rangebar',

    value: '',
  },
  {
    name: 'GOP size',
    key: 'gop-size',
    input_type: 'rangebar',

    value: '',
  },
  {
    name: 'Pixel formate',
    key: 'pixel-formate',
    input_type: 'dropdown',
    value: '',
    options: [
      {
        id: 1,
        name: 'codec',
      },
    ],
  },
  {
    name: 'Framerate',
    key: 'framerate',
    input_type: 'dropdown',
    value: '',
    options: [
      {
        id: 1,
        name: 'codec',
      },
    ],
  },
  {
    name: 'Speed',
    key: 'speed',
    input_type: 'dropdown',
    value: '',
    options: [
      {
        id: 1,
        name: 'codec',
      },
    ],
  },
  {
    name: 'Tune',
    key: 'tune',
    input_type: 'dropdown',
    value: '',
    options: [
      {
        id: 1,
        name: 'codec',
      },
    ],
  },
  {
    name: 'Profile',
    key: 'profile',
    input_type: 'dropdown',
    value: '',
    options: [
      {
        id: 1,
        name: 'codec',
      },
    ],
  },
  {
    name: 'Level',
    key: 'level',
    input_type: 'dropdown',
    value: '',
    options: [
      {
        id: 1,
        name: 'codec',
      },
    ],
  },
  {
    name: 'Faststart',
    key: 'faststart',
    input_type: 'dropdown',
    value: '',
    options: [
      {
        id: 1,
        name: 'codec',
      },
    ],
  },
  {
    name: 'Size',
    key: 'size',
    input_type: 'dropdown',
    value: '',
    options: [
      {
        id: 1,
        name: 'codec',
      },
    ],
  },
  {
    name: 'Format',
    key: 'format',
    input_type: 'dropdown',
    value: '',
    options: [
      {
        id: 1,
        name: 'codec',
      },
    ],
  },
  {
    name: 'Aspect',
    key: 'aspect',
    input_type: 'dropdown',
    value: '',
    options: [
      {
        id: 1,
        name: 'codec',
      },
    ],
  },
  {
    name: 'Scaling',
    key: 'scaling',
    input_type: 'dropdown',
    value: '',
    options: [
      {
        id: 1,
        name: 'codec',
      },
    ],
  },
];

type VideoSettings = {
  name: string;
  key: string;
  input_type: string;
  value: string;
  options?: { id: number; name: string }[];
};

type VideoState = VideoSettings[];

const videoReducer = (state: VideoState, action: any) => {
  switch (action.type) {
    case 'UPDATE_FIELD_VALUE': {
      const { key, value } = action.payload;
      return state.map((item) =>
        item.key === key ? { ...item, value } : item
      );
    }
    case 'RESET': {
      return state.map((item) => ({ ...item, value: '' }));
    }
    default:
      return state;
  }
};

// Initializing the state with the video array

const VideoOption = () => {
  const [values] = useState('Copy');

  const [videoSettings] = useReducer(videoReducer, video);
  const livefeedfun = (field: VideoSettings) => {
    const { name, key, options } = field;

    switch (field.input_type) {
      case 'dropdown':
        return (
          <div
            className={`relative ${
              key !== 'codec' && values === 'Copy'
                ? 'pointer-events-none opacity-30'
                : ''
            }`}
          >
            <CustomizedSelect
              width="2xl:w-72 lg:w-44"
              height="h-[38px]"
              title={name}
              border="rounded-full"
              initialSelect={key === 'codec' ? values : ''}
              arrowBottom="top-[12px]"
              textcolor="text-font-color"
              textMarginLeft="pl-[5px]"
              marginTop="mt-[-5px]"
              options={options}
              borderColor="border-tertiary-color group-hover:border-quaternary-color"
            />
          </div>
        );
      case 'rangebar':
        return (
          <div
            className={`relative ${
              key !== 'codec' && values === 'Copy'
                ? 'pointer-events-none opacity-30'
                : ''
            }`}
          >
            <RangeSlider
              progress={80}
              type="thumbBorder"
              width="2xl:w-60 xl:w-48 mt-2"
              textSide="up"
              dataType=""
              textMargin="ml-[14rem] "
              rangeDisabled={false}
            />
          </div>
        );
      default:
        return <div />;
    }
  };
  return (
    <div className="pb-4">
      <div>
        <div className="ml-20 mt-8 grid grid-cols-3">
          {videoSettings.slice(0, 3).map((field) => (
            <React.Fragment key={field.key}>
              {livefeedfun(field)}
            </React.Fragment>
          ))}
        </div>
        <div className="ml-10 grid gap-2 lg:grid-cols-3 2xl:grid-cols-5">
          {videoSettings.slice(3, 8).map((field) => (
            <React.Fragment key={field.key}>
              {livefeedfun(field)}
            </React.Fragment>
          ))}
        </div>
        <hr className=" mb-[15px] mt-6   w-full border-[1px] border-tertiary-color" />
        <div className="ml-20 mt-10 grid gap-y-9 lg:grid-cols-3 2xl:grid-cols-5">
          {videoSettings.slice(8, 14).map((field) => (
            <React.Fragment key={field.key}>
              {livefeedfun(field)}
            </React.Fragment>
          ))}
        </div>
        <hr className=" mb-[15px] mt-4   w-full border-[1px] border-tertiary-color" />
        <div className="ml-6 mt-10 grid gap-4 lg:grid-cols-3 2xl:grid-cols-5">
          {videoSettings.slice(14, 19).map((field) => (
            <React.Fragment key={field.key}>
              {livefeedfun(field)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoOption;
