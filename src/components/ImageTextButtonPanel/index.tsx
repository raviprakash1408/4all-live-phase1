import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import type { ImageTextButtonPanelTypes } from './type';

const ImageTextButtonPanel = (props: ImageTextButtonPanelTypes) => {
  let href = '/';

  if (props.content3 === 'Go Offline') {
    href = 'offline/dashboard';
  } else {
    href = '/login';
  }

  return (
    <div className=" h-96 w-96 rounded-2xl bg-tertiary-color p-6  no-underline hover:bg-fifth-color">
      <div className="flex h-80 flex-col">
        <div className="flex  h-32 items-center justify-center">
          <Image
            width={props.imgwidth ? props.imgwidth : 0}
            height={props.imgheight ? props.imgheight : 0}
            src={props.img}
            // className={` ${props.imgheight} ${props.imgwidth}`}
            alt=""
          />
        </div>
        <p className="mt-2 text-center font-poppins text-3xl font-bold text-font-color">
          {props.content1}
        </p>
        <p className="text-center text-xl text-secondary-color">
          {props.content2}
        </p>
        <div>
          <Link href={href} className="">
            <div className="mt-12 flex justify-center no-underline">
              <button
                type="button"
                className="h-10 w-36 rounded-3xl bg-secondary-color text-center text-font-color no-underline"
              >
                {props.content3}
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageTextButtonPanel;
