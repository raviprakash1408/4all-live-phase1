import Image from 'next/image';
import React from 'react';

import type { FolderGridTypes } from './types';

const FolderGrid = (props: FolderGridTypes) => {
  return (
    <button
      type="button"
      className={`group ${props.width} ml-6`}
      onDoubleClick={props.onClick}
    >
      <div className=" flex flex-col  rounded-3xl border-2 border-primary-color group-hover:border-secondary-color min-[320px]:w-full sm:w-full md:w-full">
        <div className="relative cursor-pointer overflow-hidden rounded-b-none  rounded-t-3xl  bg-fifth-color duration-300 ">
          <div className="flex h-[16.7vh] items-center justify-center self-center xl:h-[16.7vh] 2xl:h-[19.7vh]">
            <Image
              width={70}
              height={70}
              src={props.img}
              alt=""
              className="my-7  object-contain"
            />
          </div>
        </div>

        <div className="h-[6.2vh] rounded-b-3xl bg-tertiary-color  text-center">
          <div className="">
            <div className="flex items-center justify-center">
              <span className=" mt-3 text-center  text-lg font-semibold text-quaternary-color group-hover:text-font-color">
                {props.FolderName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default FolderGrid;
