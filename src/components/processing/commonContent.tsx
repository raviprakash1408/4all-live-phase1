import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import callApi from '@/utils/constants/apiCall';
import { GET_SYSTEM_INFO, MAIN_URL } from '@/utils/constants/apiUrls';

import type { SystemInfo } from '../DashBoard/types';

const CommonContent = () => {
  const [data, setData] = useState<SystemInfo | undefined>(undefined);

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
  console.log('data', data);

  return (
    <div>
      {' '}
      <div className="flex flex-col">
        <div className="mt-4 flex">
          <div className="mr-2 mt-2">
            <Image
              width={0}
              height={0}
              className="h-auto w-auto"
              src="/assets/icons/icon1.svg"
              alt="no icon"
            />
          </div>
          <p className="mt-[3px] whitespace-nowrap text-quaternary-color">
            Storage: {data?.storage_usage.percent}%{' '}
            <span className="ml-[5px]">
              {data?.storage_usage.used}/{data?.storage_usage.total}
            </span>
          </p>
        </div>
        <div className="mt-2 flex">
          <div className="mr-4">
            <Image
              width={0}
              height={0}
              className="h-5 w-5"
              src="/assets/icons/GPU_Load.svg"
              alt="no icon"
            />
          </div>
          <p className=" mr-6 text-quaternary-color">GPU</p>

          <p className="mr-6 whitespace-nowrap text-quaternary-color">
            ENC: 2%
          </p>
          <p className="mr-6 whitespace-nowrap text-quaternary-color">
            DEC: 2%
          </p>
        </div>
        <div className="mt-2 flex">
          <div className="mr-4">
            <Image
              width={0}
              height={0}
              className="h-auto w-auto"
              src="/assets/icons/icon8.svg"
              alt="no icon"
            />
          </div>
          <p className=" mr-6 text-quaternary-color">
            CPU:{data?.cpu_percent}%
          </p>
          <div className="mr-2 mt-2">
            <Image
              width={0}
              height={0}
              className="-mt-1 h-auto w-auto"
              src="/assets/icons/g2076.svg"
              alt=" no icon"
            />
          </div>
          <p className="w-20 whitespace-nowrap text-quaternary-color">
            RAM: {data?.memory_usage.percent}%
          </p>
        </div>
        <div className="mr-2 mt-2 flex whitespace-nowrap">
          <div>
            <Image
              width={0}
              height={0}
              className="h-auto w-auto"
              src="/assets/icons/Group 978.svg"
              alt="no icon"
            />
          </div>
          <p className=" ml-4 text-quaternary-color">Bitrate: </p>
          <div className="ml-1 mt-2">
            <Image
              width={0}
              height={0}
              className="h-auto w-auto"
              src="/assets/icons/icon6.svg"
              alt="no icon"
            />
          </div>
          <p className=" text-quaternary-color"> 500 kbps </p>
          <div className="ml-1 mt-2">
            <Image
              width={0}
              height={0}
              className="h-auto w-auto"
              src="/assets/icons/icon4.svg"
              alt="no icon"
            />
          </div>
          <p className="text-quaternary-color"> 3233 kbps </p>
        </div>
        <div className="mt-2 flex">
          <div className="mr-5">
            <Image
              width={0}
              height={0}
              className="h-auto w-auto"
              src="/assets/icons/Group 581308.svg"
              alt="no icon"
            />
          </div>
          <p className="mr-24 text-quaternary-color">
            IP:<span className="ml-1">192.168.11.111</span>
          </p>
        </div>
        <div className="mt-2 flex whitespace-nowrap">
          <div className="mr-4">
            <Image
              width={0}
              height={0}
              className="h-auto w-auto"
              src="/assets/icons/g172.svg"
              alt="no icon"
            />
          </div>
          <p className="mr-12 text-quaternary-color">
            Firmware version: 1.01.06
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommonContent;
