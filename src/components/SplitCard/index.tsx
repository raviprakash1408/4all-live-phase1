'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import RangeSlider from '../range';
import type { SplitCardType } from './types';

const SplitCard = (props: SplitCardType) => {
  const [range, setRange] = useState(props.range);
  const BillingData = [
    {
      id: 1,
      type: 'Users',
      active: '17',
      total: '20',
      img: '/assets/sidebar/Group.svg',
    },
    {
      id: 2,
      type: 'Users',
      active: '17',
      total: '20',
      img: '/assets/sidebar/Group.svg',
    },
    {
      id: 3,
      type: 'Users',
      active: '17',
      total: '20',
      img: '/assets/sidebar/Group.svg',
    },
    {
      id: 4,
      type: 'Users',
      active: '17',
      total: '20',
      img: '/assets/sidebar/Group.svg',
    },
    {
      id: 5,
      type: 'Users',
      active: '17',
      total: '20',
      img: '/assets/sidebar/Group.svg',
    },
    {
      id: 6,
      type: 'Users',
      active: '17',
      total: '20',
      img: '/assets/sidebar/Group.svg',
    },
  ];
  const BillingDataRange = [
    {
      id: 1,
      type: 'Users',
      completeTime: 20,
      time: 200,
      img: '/assets/sidebar/Group.svg',
    },
  ];
  useEffect(() => {
    if (props.range === true) {
      setRange(true);
    }
    if (props.range === false) {
      setRange(false);
    }
  }, []);

  return (
    <div>
      <div className="  py-5">
        <main className="">
          <div className="">
            {!range && (
              <div className="grid gap-4 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {BillingData.map((item) => (
                  <div
                    key={item.id}
                    className=" mt-6 flex h-48 w-[21rem] justify-center rounded-3xl border border-primary-color hover:border-secondary-color"
                  >
                    <div className="w-32 rounded-l-3xl  bg-fifth-color ">
                      <Image
                        width={0}
                        height={56}
                        src={item.img}
                        alt=""
                        className="ml-[26%] mt-14 w-auto "
                        draggable={false}
                      />
                      <h1 className=" mt-[10px] select-none text-center text-base text-quaternary-color">
                        {item.type}
                      </h1>
                    </div>
                    <div className="w-64 rounded-r-3xl bg-tertiary-color">
                      <h1 className="mt-12 select-none text-center text-4xl text-secondary-color">
                        {item.active}
                        <span className="select-none text-quaternary-color">
                          /{item.total}
                        </span>
                      </h1>
                      <h1 className="select-none text-center text-quaternary-color">
                        active/available
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {range && (
              <div>
                <div className="grid gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {BillingDataRange.map((item) => (
                    <div
                      key={item.id}
                      className=" mt-6 flex h-48 justify-center"
                    >
                      <div className="w-[37%] rounded-l-3xl bg-fifth-color">
                        <Image
                          width={0}
                          height={56}
                          src={item.img}
                          alt=""
                          className="ml-[24%] mt-14 w-auto"
                        />
                        <h1 className=" mt-[10px] text-center text-base text-quaternary-color">
                          {item.type}
                        </h1>
                      </div>
                      <div className="w-[76%] rounded-r-3xl bg-tertiary-color">
                        <h1 className="mt-12 text-center text-4xl text-secondary-color">
                          {item.completeTime} MIN
                        </h1>
                        <h1 className="mt-[-19px] text-center text-3xl text-quaternary-color">
                          {item.time} MIN
                        </h1>
                        <RangeSlider
                          progress={item.time / item.completeTime}
                          type="withoutThumb"
                          width=""
                          textSide="down"
                          dataType="% remaining"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SplitCard;
