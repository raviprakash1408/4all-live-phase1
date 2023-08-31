import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import callApi from '@/utils/constants/apiCall';
import { MAIN_URL, NAS_STORAGE_LOGS } from '@/utils/constants/apiUrls';

import { CurvedButton } from '../button/curvedButton';

interface LogItem {
  id: number;
  message: JSX.Element;
}
const NasStorage = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use callApi function to fetch data from the URL
        const jsonData = await callApi<any>(
          `${MAIN_URL}${NAS_STORAGE_LOGS}`,
          'GET'
        );
        setData(jsonData);
      } catch (error) {
        console.error('API request error:', error);
      }

      // Set the timeout for 2 seconds before making another API call
      setTimeout(fetchData, 10000);
    };
    fetchData();
  }, [data]);
  const generateLogs = (): LogItem[] => {
    return data.map((item: any) => ({
      id: item.id,
      message: (
        <div key={item.id} className="my-2">
          <span>{item.id}</span>
          <br />

          <span>Type:{`${item.log_type} `}</span>
          <br />
          <span>Camera_Name: {item.camera_name}</span>
          <br />
          <span>Camera_Error_Log:{item.camera_check_error_log}</span>
          <br />
          <span>Camera_Success_Log:{item.camera_check_success_log}</span>
          <br />
          <span>Created_date:{item.created_date}</span>
        </div>
      ),
    }));
  };

  const [logs, setLogs] = useState<LogItem[]>([]);

  useEffect(() => {
    setLogs(generateLogs());
  }, [data]);

  const handleClearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="custom-scrollbar mx-8 mb-8 mt-4  h-[81vh] w-[97%] select-none overflow-y-auto  overflow-x-hidden rounded-2xl border-b-2 border-b-primary-color bg-fifth-color">
      <div className=" ">
        <div className="mr-6 flex  justify-end">
          <div className={` mt-2`}>
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
    </div>
  );
};

export default NasStorage;
