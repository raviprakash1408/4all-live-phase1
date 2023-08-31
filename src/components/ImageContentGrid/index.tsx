import Image from 'next/image';
import React from 'react';

import type { FolderSpace } from './types';

const ImgaecontentGrid = (props: FolderSpace) => {
  return (
    <div
      className={`group flex  justify-between border-x-2  border-t-2 ${props.height} ${props.width} border-sixth-color rounded-2xl ${props.Background} hover:border-secondary-color`}
    >
      <div className="mt-4 flex justify-center">
        <Image
          width={0}
          height={0}
          src="/assets/icons/Vector (2).png"
          alt="no icon"
          className="h-8 w-8"
        />
      </div>
      <div className=" flex justify-center rounded-b-2xl border-b-2 border-primary-color bg-primary-color px-2 text-base text-quaternary-color transition-all group-hover:border-b-secondary-color group-hover:text-sm">
        {props.content}
      </div>
    </div>
  );
};

export { ImgaecontentGrid };
