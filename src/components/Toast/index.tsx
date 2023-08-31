'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import type { ToastType } from './types';

const Toast = (props: ToastType) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (props.onClose) {
        props.onClose();
      }
    }, 2000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    if (props.onClose) {
      props.onClose();
    }
  };
  let BackgroundColor;
  if (props.type === 'success') {
    BackgroundColor = 'bg-secondary-color';
  }
  if (props.type === 'warning') {
    BackgroundColor = 'bg-warning-color';
  }
  if (props.type === 'error') {
    BackgroundColor = 'bg-danger-color';
  }
  return (
    <div
      className={`fixed bottom-0 right-[42%] z-10  m-4 min-h-min min-w-min rounded-3xl p-4 ${BackgroundColor} ${
        show ? 'visible' : 'invisible'
      }`}
    >
      <div className="flex">
        {props.type === 'success' && (
          <div className="mt-1">
            <Image
              width={0}
              height={0}
              className="mt-1 h-auto w-auto"
              src="/assets/icons/ToastTick.svg"
              alt=""
            />
          </div>
        )}
        {props.type === 'warning' && (
          <div className="mt-1">
            <Image
              width={0}
              height={0}
              className="mt-1 h-auto w-auto"
              src="/assets/icons/ToastWarning.svg"
              alt=""
            />
          </div>
        )}
        {props.type === 'error' && (
          <div className="mt-1">
            <Image
              width={0}
              height={0}
              className="mt-1 h-auto w-auto"
              src="/assets/icons/ToastClose.svg"
              alt=""
            />
          </div>
        )}
        <div className="ml-2 flex flex-col">
          <span className=" max-w-[11.1rem] font-medium text-white">
            {props.heading}
          </span>
          <span className=" max-w-full whitespace-nowrap text-sm text-white">
            {props.message}
          </span>
        </div>
      </div>
      <button
        type="button"
        className="absolute right-[-5px] top-[-3px] text-white"
        onClick={handleClose}
      >
        <Image
          width={0}
          height={0}
          className="h-auto w-auto select-none"
          src="/assets/icons/ToastClose.svg"
          alt=""
        />
      </button>
    </div>
  );
};

export default Toast;
