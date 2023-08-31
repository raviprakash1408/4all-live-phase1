import Image from 'next/image';
import React from 'react';

export default function Share() {
  return (
    <div>
      <button
        type="button"
        className="flex h-10 w-36 items-center rounded-2xl border-2 border-primary-color bg-primary-color px-6 py-2 text-quaternary-color hover:border-quaternary-color"
      >
        <Image
          width={0}
          height={0}
          src="/assets/icons/Group (1).png"
          alt="Icon"
          className="h-auto w-auto"
        />
        <div className="ml-2 text-sm">Share</div>
      </button>
    </div>
  );
}
