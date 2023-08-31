'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import callApi from '@/utils/constants/apiCall';
import { CAMERA_CHECK_LOGS, MAIN_URL } from '@/utils/constants/apiUrls';

import { CurvedButton } from '../button/curvedButton';

interface LogItem {
  id: number;
  message: JSX.Element;
}

const CameraCheck = () => {
  const [data, setData] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the scrolling container
  const [logs, setLogs] = useState<LogItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await callApi<any>(
          `${MAIN_URL}${CAMERA_CHECK_LOGS}`,
          'GET'
        );
        setData(jsonData);
      } catch (error) {
        console.error('API request error:', error);
      }

      setTimeout(fetchData, 10000);
    };
    fetchData();
  }, [data]);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  const generateLogs = (): LogItem[] => {
    const reversedData = data.slice().reverse();
    return reversedData.map((item: any) => ({
      id: item.id,
      message: (
        <div key={item.id} className="my-2 flex">
          <span className="mr-1">{formatDate(item.created_date)}</span>
          <span className="mr-1">Camera Id : {item.id}</span>
          <span className="mr-1">{item.camera_name}</span>
          <span className="mr-1">{item.camera_check_error_log}</span>
          <span className="mr-1">{item.camera_check_success_log}</span>
        </div>
      ),
    }));
  };

  useEffect(() => {
    const newLogs = generateLogs();
    setLogs((prevLogs) => {
      const existingIds = new Set(prevLogs.map((log) => log.id));
      const filteredNewLogs = newLogs.filter((log) => !existingIds.has(log.id));
      return [...prevLogs, ...filteredNewLogs];
    });

    // Scroll to the latest added data when the component updates
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [data]);

  const handleClearLogs = () => {
    setLogs([]);
  };
  // console.log('sasdf', logs);

  return (
    <div
      className="custom-scrollbar relative mx-8 mb-8 mt-4  h-[83vh] w-[97%] select-none overflow-y-auto  overflow-x-hidden rounded-2xl border-b-2 border-b-primary-color bg-fifth-color"
      ref={containerRef}
    >
      <div className="fixed right-[3%]   flex justify-end">
        <div className={`  mt-2`}>
          <button
            type="button"
            className="ml-2 mt-1 w-32 select-none"
            onClick={handleClearLogs}
          >
            <CurvedButton backgroundColor="bg-tertiary-color" height="">
              <div className="flex px-[1vw] py-[0.5vh]">
                <Image
                  width={20}
                  height={20}
                  src="/assets/icons/icon25.svg"
                  alt=""
                  className=""
                />
                <div className="px-[1vw]  text-sm text-quaternary-color group-hover:text-secondary-color">
                  Clear
                </div>
              </div>
            </CurvedButton>
          </button>
        </div>
        <div className="mt-2">
          <button type="button" className="ml-2 mt-1 w-40 select-none">
            <CurvedButton backgroundColor="bg-tertiary-color" height="">
              <div className="flex px-[1vw] py-[0.5vh]">
                <Image
                  width={20}
                  height={20}
                  src="/assets/icons/DownloadRecording.svg"
                  alt=""
                  className=""
                />
                <div className="px-[1vw]  text-sm text-quaternary-color group-hover:text-secondary-color">
                  Download
                </div>
              </div>
            </CurvedButton>
          </button>
        </div>
      </div>
      <div className="ml-8 flex flex-col text-base font-normal  text-quaternary-color">
        {logs.map((log: any) => (
          <div key={log.id}>{log.message}</div>
        ))}
      </div>
    </div>
  );
};

export default CameraCheck;
