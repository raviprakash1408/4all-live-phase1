'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import GridView from './GridView';
import { SpaceComponent } from './ListView';

const ListAndGrid = () => {
  const [viewType, setViewType] = useState('list');

  return (
    <div>
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={() => setViewType('grid')}
          className={` mr-2 mt-2 h-12 w-12 cursor-pointer rounded-full border-2 border-solid  ${
            viewType === 'grid'
              ? 'border-quaternary-color  '
              : 'border-tertiary-color '
          }`}
        >
          <Image
            width={0}
            height={0}
            src="/assets/icons/GridView.svg"
            alt=""
            className={`ml-[10px] mt-[4px] h-1/2 w-1/2 object-cover ${
              viewType === 'grid' ? 'filter-custom' : ' '
            }`}
          />
        </button>
        <button
          type="button"
          onClick={() => setViewType('list')}
          className={` mr-8 mt-2 h-12 w-12 cursor-pointer rounded-full border-2 border-solid  ${
            viewType === 'list'
              ? 'border-quaternary-color '
              : 'border-tertiary-color'
          }`}
        >
          <Image
            width={0}
            height={0}
            src="/assets/icons/ListView.svg"
            alt=""
            className={`ml-[10px] mt-[4px] h-1/2 w-1/2 object-cover ${
              viewType === 'list' ? 'filter-custom' : ' '
            }`}
          />
        </button>
      </div>
      <div>
        <div className="mb-4">
          {viewType === 'list' ? <SpaceComponent /> : <GridView />}
        </div>
      </div>
    </div>
  );
};

export { ListAndGrid };
