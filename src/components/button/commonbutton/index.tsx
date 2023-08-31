// button component

import Image from 'next/image';

import type { CommonButtonTypes } from './types';

export default function CommonButton(props: CommonButtonTypes) {
  return (
    <button
      type="button"
      className="flex h-10 w-36 items-center rounded-3xl border-2 border-solid border-primary-color bg-primary-color px-4 py-2 text-quaternary-color hover:border-quaternary-color"
    >
      <Image
        width={0}
        height={0}
        src={props.img}
        alt="Icon"
        className="h-auto w-auto"
      />
      <div className="ml-4 text-sm ">{props.name}</div>
    </button>
  );
}
