'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import type { SelectTypes1 } from './types';

const CustomizedSelect = (props: SelectTypes1) => {
  const [value, setValue] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    props.initialSelect
  );
  // const Accor = {
  //   id: 1,
  //   title: 'SDI',
  //   child: 'Sony Camera',
  //   img: '/assets/icons/Camera.svg',
  // };

  // const options = [
  //   { id: 1, name: 'RTBG' },
  //   { id: 2, name: 'B' },
  //   { id: 3, name: 'C' },
  //   { id: 4, name: 'D' },
  //   { id: 5, name: 'E' },
  //   { id: 6, name: 'RTSP' },
  // ];
  const popupRef = useRef<HTMLDivElement>(null);
  const dropdownVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto' },
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setValue(false);
      }
    };

    const handleEscapeKey = (event: any) => {
      if (event.key === 'Escape') {
        setValue(false);
      }
    };

    if (value) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [value]);

  return (
    <div className={`select-none ${props.marginTop} `} ref={popupRef}>
      <button
        type="button"
        data-testid="CustomizedSelect"
        onClick={() => {
          setValue(!value);
        }}
        className={`${value ? 'z-50' : ''} relative min-w-[88px] ${
          props.height
        } ${props.width} ${props.border} ${props.borderLeft} ${
          props.borderRight
        } border-2  duration-300 ease-in-out ${props.borderColor}`}
      >
        <span className="pointer-events-none absolute  bottom-[64%] left-[17px]   bg-primary-color p-1 text-sm  text-quaternary-color">
          {props.title}
        </span>
        <div className="flex">
          <Image
            width={0}
            height={27}
            src={props.img ? props.img : ''}
            alt=""
            className={`z-[1] ml-2 mt-[2px] ${props.imgHeight}  w-auto`}
          />
          <span
            className={`absolute top-[7px] ${props.textMarginLeft}  ml-4 text-sm font-normal ${props.textcolor}`}
          >
            {selectedOption || props.rtspLink}
          </span>
        </div>
        <div className="flex justify-end">
          <Image
            width={0}
            height={0}
            src="/assets/icons/Vector (3).png"
            alt="Icon"
            className={`absolute h-[5px] w-[9px]  ${props.arrowBottom} mr-4  ${
              value ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>
      <div
        className={`${props.width} absolute z-10 ${
          value
            ? '  rounded-lg border-2 border-t-0  border-solid  border-tertiary-color bg-fifth-color '
            : ''
        }`}
      >
        {props.options?.map((item) => (
          <div key={item.id}>
            <motion.div
              initial="closed"
              animate={value ? 'open' : 'closed'}
              variants={dropdownVariants}
              transition={{ duration: 0.3 }}
            >
              {value && (
                <div>
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedOption(item.name); // Update selected option
                        setValue(false);
                        if (props.onSelectOption) {
                          props.onSelectOption(item.name); // Close the dropdown
                        }
                      }}
                      className="h-[34px] cursor-pointer text-base text-quaternary-color hover:bg-tertiary-color"
                    >
                      {item.name}
                    </button>
                    <hr className="border-solid border-tertiary-color" />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { CustomizedSelect };
