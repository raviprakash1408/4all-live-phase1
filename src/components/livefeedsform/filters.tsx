import React from 'react';

import { CustomizedSelect } from '../CustomizedSelect';
import RangeSlider from '../range';

const Filters = () => {
  const dropdown = [
    {
      id: 1,
      title: 'Deband',
    },
    {
      id: 2,
      title: 'Deflicker',
    },
    {
      id: 3,
      title: 'Deshake',
    },
    {
      id: 4,
      title: 'Dejudder',
    },
    {
      id: 5,
      title: 'Denoise',
    },
    {
      id: 6,
      title: 'Deinterface',
    },
  ];
  const sliderData = [
    { id: 1, name: 'Contrast' },
    { id: 2, name: 'Contrast' },
    { id: 3, name: 'Contrast' },
    { id: 4, name: 'Contrast' },
  ];

  return (
    <div className="pb-8">
      <div className="ml-9 grid  sm:grid-cols-2 xl:grid-cols-3">
        {dropdown.map((item) => (
          <div key={item.id} className="mb-1 mt-6">
            <CustomizedSelect
              width="2xl:w-72 sm:w-[10rem]"
              height="h-[38px]"
              title={item.title}
              border="rounded-full"
              initialSelect="Enabled"
              arrowBottom="top-[12px]"
              textcolor="text-font-color"
              textMarginLeft="pl-[5px]"
              marginTop="mt-[-5px]"
              // options={options}
              borderColor="border-tertiary-color group-hover:border-quaternary-color"
            />
          </div>
        ))}
      </div>
      <hr className=" mb-[15px] mt-4   w-[64vw] border-[1px] border-tertiary-color" />
      <div className="mb-1 grid grid-cols-4">
        {sliderData.map((item) => (
          <div key={item.id} className="relative mb-1">
            <RangeSlider
              progress={80}
              type="thumbBorder"
              width="2xl:w-60 lg:w-40 mt-2"
              textSide="up"
              dataType=""
              textMargin="ml-[14rem] "
              rangeDisabled={false}
            />
            <div className="absolute left-[75px] top-0 flex text-sm  text-quaternary-color">
              {item.name}
            </div>
          </div>
        ))}
      </div>
      <hr className=" mb-[15px] mt-4  w-[64vw] border-[1px] border-tertiary-color " />
      <div className="relative ml-4 flex items-start justify-start ">
        <RangeSlider
          progress={80}
          type="thumbBorder"
          width="w-[36vw] mt-2"
          textSide="up"
          dataType=""
          textMargin="2xl:ml-[40.2rem] xl:ml-[26rem]"
          rangeDisabled={false}
        />
        <div className="absolute top-0 text-sm text-quaternary-color  xl:left-4 2xl:left-4">
          Audio Contrast
        </div>
      </div>
    </div>
  );
};

export default Filters;
