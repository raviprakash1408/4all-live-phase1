'use client';
'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import callApi from '@/utils/constants/apiCall';
import { GET_SYSTEM_INFO, MAIN_URL } from '@/utils/constants/apiUrls';

import RangeSlider from '../range';
import type { SystemInfo } from './types';

const DashBoard1 = () => {
  const [data, setData] = useState<SystemInfo | undefined>(undefined);
  // console.log('data.storage_usage.percent', data?.cpu_percent);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await callApi<any>(
          `${MAIN_URL}${GET_SYSTEM_INFO}`,
          'GET'
        );
        setData(jsonData);
      } catch (error) {
        console.error('API request error:', error);
      }
    };

    // Fetch data immediately on mount
    fetchData();

    // Set up the interval and store the interval ID
    const fetchInterval = setInterval(fetchData, 5000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(fetchInterval);
    };
  }, []);
  return (
    <div className="select-none">
      <div className="mb-[10px]  grid  select-none grid-cols-4 ">
        {/* Cpu Load */}
        <div className="flex h-[50px] w-[15vw]">
          <div
            // CPU BUTTON
            className="flex items-center rounded-l-2xl border-2 border-primary-color bg-fifth-color p-5 text-tertiary-color hover:border-quaternary-color   sm:flex-col lg:w-1/2 xl:ml-4 2xl:ml-14 2xl:flex-row "
          >
            <Image
              width={0}
              height={0}
              src="/assets/icons/CPU_Load.svg"
              alt="Icon"
              className="h-4 w-auto sm:-mt-3 xl:-ml-2 2xl:mr-0 2xl:mt-0"
            />
            <span className="whitespace-nowrap text-[10px] font-semibold text-quaternary-color md:text-[10px] xl:ml-[1px] 2xl:ml-4 2xl:text-sm">
              CPU Load
            </span>
          </div>

          <div
            // type="button"
            className="flex h-[50px]  w-1/2 items-center rounded-r-2xl border-2 border-primary-color bg-tertiary-color py-2"
          >
            {/* <img src={props.img} alt="Icon" className={``} /> */}
            {/* <p className='pl-5 font-semibold text-quaternary-color text-lg'>80%</p> */}
            {/* <p className="ml-4 text-sm flex font-semibold text-quaternary-color">{props.title}</p> */}
            {data?.cpu_percent !== undefined ? (
              <div className="ml-3 flex items-center">
                <RangeSlider
                  progress={data?.cpu_percent ? data?.cpu_percent : 0}
                  type="withoutThumb"
                  width="w-full mr-1"
                  textSide="left"
                  dataType="%"
                  textMargin="-mt-[1px] pr-1"
                  rangeDisabled
                />
              </div>
            ) : (
              <div className="flex 2xl:flex">
                <RangeSlider
                  progress={4.1}
                  type="withoutThumb"
                  width="w-full mr-2"
                  textSide="left"
                  dataType="%"
                  textMargin="-mt-[1px] pr-1"
                  rangeDisabled
                />
              </div>
            )}
          </div>
        </div>

        {/* GPU Load */}
        <div className="flex  h-[50px] w-[15vw]">
          <div className="w-1/2">
            <div
              // "GPU   button"
              className="flex h-[50px] items-center rounded-l-2xl border-2 border-primary-color bg-fifth-color p-5 text-tertiary-color hover:border-quaternary-color sm:flex-col 2xl:flex-row"
            >
              <Image
                width={0}
                height={0}
                src="/assets/icons/GPU_Load.svg"
                alt="Icon"
                className="h-5 w-auto sm:-mt-3 xl:-ml-3  2xl:ml-0 2xl:mt-0"
              />
              <span className="whitespace-nowrap font-semibold text-quaternary-color sm:text-[10px] xl:ml-[1px] 2xl:ml-4 2xl:text-sm">
                GPU Load
              </span>
            </div>
          </div>

          <div
            // type="button"
            className=" w-1/2 rounded-r-2xl border-2  border-primary-color bg-tertiary-color pl-[14px] pr-5"
          >
            <div className="mt-1 flex items-center gap-2.5 leading-[19px]">
              <span className="text-base font-normal text-secondary-color sm:text-[6px] xl:text-base">
                Enc
              </span>
              <div>
                <RangeSlider
                  progress={20}
                  type="withoutThumb"
                  width="w-full mt-1 ml-4"
                  textSide="left"
                  dataType="%"
                />
              </div>
            </div>

            <div className="flex items-center gap-2.5 leading-4">
              <span className="text-base font-normal text-secondary-color sm:text-[6px] xl:text-base">
                Dec
              </span>
              <div>
                <RangeSlider
                  progress={30}
                  type="withoutThumb"
                  width="w-full ml-4"
                  textSide="left"
                  dataType="%"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Storage */}
        <div className="flex h-[50px] w-[15vw]">
          <div className="w-1/2">
            <div className="flex h-[50px] items-center rounded-l-2xl border-2 border-primary-color bg-fifth-color p-5 text-tertiary-color hover:border-quaternary-color sm:flex-col xl:flex-row">
              <Image
                width={0}
                height={0}
                src="/assets/icons/Storage.svg"
                alt="Icon"
                className="h-4 w-auto sm:-mt-3 xl:-ml-2 2xl:ml-0 2xl:mt-0"
              />
              <span className="font-semibold text-quaternary-color sm:text-[10px] xl:ml-[1px] xl:mr-2 2xl:mx-4 2xl:text-sm">
                Storage
              </span>
            </div>
          </div>

          <div
            className={`flex  w-full items-center rounded-r-2xl border-2 border-primary-color bg-tertiary-color py-2 `}
          >
            <div>
              <div className="ml-2 whitespace-nowrap text-sm text-secondary-color">
                {data?.storage_usage.free}
              </div>
              <div className="ml-2 whitespace-nowrap text-sm text-quaternary-color">
                {data?.storage_usage.total}
              </div>
            </div>
            {data?.storage_usage.percent !== undefined ? (
              <div>
                <RangeSlider
                  progress={100 - data.storage_usage.percent}
                  type="withoutThumb"
                  width="w-[79%]"
                  textSide=""
                  dataType="%"
                  rangeDisabled
                />
              </div>
            ) : (
              <div>
                <RangeSlider
                  progress={99}
                  type="withoutThumb"
                  width="w-[4.5vw] ml-4"
                  textSide=""
                  dataType="%"
                  rangeDisabled
                />
              </div>
            )}
          </div>
        </div>
        {/* uptime */}
        <div className="flex  h-[50px] w-[15vw]">
          <div className="flex  w-1/2 items-center rounded-l-2xl border-2 border-primary-color bg-fifth-color p-5 text-tertiary-color hover:border-quaternary-color sm:flex-col 2xl:flex-row">
            <Image
              width={0}
              height={0}
              src="/assets/icons/Clock.svg"
              alt="Icon"
              className="h-4 w-auto sm:-mt-3 xl:-ml-2 2xl:ml-0 2xl:mt-0"
            />
            <span className="font-semibold text-quaternary-color sm:text-[10px] xl:ml-[1px] xl:text-xs 2xl:ml-4 2xl:text-sm">
              Uptime
            </span>
          </div>

          <div
            // type="button"
            className={`flex w-1/2 items-center rounded-r-2xl border-2 border-primary-color bg-tertiary-color py-2 `}
          >
            <div className="">
              <span className="text-sm text-quaternary-color sm:text-[10px] 2xl:text-sm">
                01 d 02 h 07 min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard1;
