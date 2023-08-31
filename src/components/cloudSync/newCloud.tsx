import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { CurvedButton } from '../button/curvedButton';
import InputField from '../input field/InputField';
import type { CloudItem } from './types';

const data = [
  {
    id: 1,
    title: 'Google Drive',
    img: '/assets/icons/GoogleDrive.svg',
  },
  {
    id: 2,
    title: 'OneDrive',
    img: '/assets/icons/OneDrive.svg',
  },
  {
    id: 3,
    title: 'DropBox',
    img: '/assets/icons/DropBox.svg',
  },
  {
    id: 4,
    title: 'FTP',
    img: '/assets/icons/FtpGoogleDrive.svg',
  },
  {
    id: 5,
    title: 'FTP',
    img: '/assets/icons/GoogleDrive.svg',
  },
  {
    id: 6,
    title: 'FTP',
    img: '/assets/icons/GoogleDrive.svg',
  },
  {
    id: 7,
    title: 'FTP',
    img: '/assets/icons/GoogleDrive.svg',
  },
  {
    id: 8,
    title: 'FTP',
    img: '/assets/icons/GoogleDrive.svg',
  },
  {
    id: 9,
    title: 'FTP',
    img: '/assets/icons/GoogleDrive.svg',
  },
  {
    id: 10,
    title: 'FTP',
    img: '/assets/icons/GoogleDrive.svg',
  },
  {
    id: 11,
    title: 'OneDrive',
    img: '/assets/icons/OneDrive.svg',
  },
  {
    id: 12,
    title: 'OneDrive',
    img: '/assets/icons/OneDrive.svg',
  },
  {
    id: 13,
    title: 'OneDrive',
    img: '/assets/icons/OneDrive.svg',
  },
  {
    id: 14,
    title: 'OneDrive',
    img: '/assets/icons/OneDrive.svg',
  },
];
const NewCloud = () => {
  const [popup, setPopup] = useState(false);

  const [selectedCloud, setSelectedCloud] = useState<CloudItem | null>({
    id: null,
    title: null,
    img: null,
  });
  const [value, setValue] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const popupRef = useRef<HTMLDivElement>(null);
  let box;

  if (selectedCloud?.id === undefined || selectedCloud?.id === null) {
    box = true;
  } else {
    box = false;
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (popup || value) &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setPopup(false);
        setValue(false);
      }
    };

    const handleEscapeKey = (event: any) => {
      if (event.key === 'Escape') {
        setPopup(false);
        setValue(false);
      }
    };

    if (popup || value) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [popup, value]);
  const handleCloudSelection = (id: number, title: string, img: string) => {
    if (selectedCloud && selectedCloud.id === id) {
      // Cloud is already selected, deselect it
      setSelectedCloud(null);
    } else {
      // Cloud is not selected, select it
      setSelectedCloud({ id, title, img });
    }
  };
  const handleCreate = () => {
    // console.log('selectedCloud', selectedCloud);
    setValue(true);
  };
  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => {
            setTimeout(() => {
              setPopup(!popup);
            }, 400);
          }}
          className=" ml-4 mt-[14px] select-none rounded-full border-2 border-primary-color hover:border-quaternary-color"
        >
          <div className="">
            <CurvedButton
              backgroundColor="bg-tertiary-color"
              height="min-[400px]:h-8 min-[1600px]:h-9"
            >
              <div className="flex">
                <Image
                  width={0}
                  height={0}
                  src="/assets/icons/icon10.svg"
                  alt=""
                  className="h-auto w-auto px-[0.5vw]"
                />
                <div className="  px-[0.5vw] py-[0.8vh] text-sm text-quaternary-color ">
                  New Cloud
                </div>
              </div>
            </CurvedButton>
          </div>
          {/* <HalfCurvedButtons
          content="Schedule"
          // height="h-[1px]"
          width="w-[9.5rem]"
          backgroundColor="bg-tertiary-color h-[35px] "
          image="/assets/icons/icon18.svg"
          textcolor="text-quaternary-color"
          textsize="text-sm"
          imgcolor="h-5 w-5"
          // hoverColor="hover:border-quaternary-color"
        /> */}
        </button>
        {popup && (
          <div className="">
            <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-fifthOpacity-color">
              <div
                className={`
                  absolute
                  top-[10%] select-none`}
              >
                <div
                  className={`  
                  h-[44rem] w-[46rem]  rounded-3xl bg-primary-color `}
                  ref={popupRef}
                >
                  {/* <h1 className="mt-4  text-center ">
                 
                </h1> */}
                  <div className="select-none  pt-6 text-center text-sm font-medium text-font-color">
                    {' '}
                    Add new cloud
                  </div>

                  <div className="mt-4 pb-2 text-center text-[16px] font-normal text-slate-400">
                    Click on the cloud drive to connect to MoLink
                  </div>

                  <hr className="ml-[28px] mt-4 w-[90%] border border-tertiary-color" />
                  <div className="mt-4 flex justify-center ">
                    <InputField
                      name=""
                      validation={false}
                      withImage
                      height="h-10"
                      width="w-80"
                      placeholder="Search Cloud Services"
                      bottominput="bottom-1"
                      textMargin="pl-12"
                      img="/assets/icons/Search.svg"
                      borderColor="border-tertiary-color"
                      onChange={(e: any) => setSearchValue(e.target.value)}
                    />
                  </div>
                  <div className="custom-scrollbar mt-5 h-[24rem] w-[45.5rem] overflow-y-auto overflow-x-hidden ">
                    <div className="relative ml-6  grid grid-cols-4 ">
                      {data
                        .filter((item) =>
                          item.title
                            .toLowerCase()
                            .includes(searchValue.toLowerCase())
                        )
                        .map((item) => (
                          <div
                            key={item.id}
                            className={`mb-5 flex h-[100px] w-40 cursor-pointer select-none flex-col rounded-3xl border-2  bg-tertiary-color hover:border-secondary-color ${
                              selectedCloud?.id === item.id
                                ? 'border-secondary-color'
                                : 'border-primary-color'
                            } `}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                handleCloudSelection(
                                  item.id,
                                  item.title,
                                  item.img
                                )
                              }
                            >
                              <div className="ml-[52px] mt-3">
                                <Image
                                  width={50}
                                  height={44}
                                  src={item.img}
                                  alt=""
                                  draggable={false}
                                  className=""
                                />
                              </div>
                              <div className="mt-1.5 text-center text-base font-normal text-quaternary-color">
                                {item.title}
                              </div>
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                  <hr className="ml-[28px] mt-4 w-[90%] border border-tertiary-color" />
                  <div>
                    <button
                      disabled={box}
                      type="submit"
                      onClick={handleCreate}
                      className={` ml-72 mt-10 h-8 w-36 select-none rounded-3xl bg-secondary-color text-center  text-base 
                          text-font-color no-underline
                      `}
                    >
                      Create
                    </button>
                  </div>
                  {value && (
                    <div>
                      <div
                        className="  absolute
                 left-[26%] top-[17%] h-[348px] w-[345px] rounded-2xl bg-primary-color"
                      >
                        <div className="absolute left-[91px] top-[28px] text-center text-[16px] font-semibold leading-normal text-white">
                          Connect cloud drive
                        </div>
                        <div className="absolute left-[85px] top-[72px] text-center text-[16px] font-normal text-slate-400">
                          Give access to MoLink
                        </div>
                        <div className="absolute left-[26%] top-[34%] mb-5 flex h-[100px] w-40 cursor-pointer select-none flex-col rounded-3xl border-2 border-primary-color bg-tertiary-color hover:border-secondary-color">
                          <div className="ml-[52px] mt-3">
                            <Image
                              width={50}
                              height={44}
                              src={selectedCloud?.img ? selectedCloud.img : ''}
                              alt=""
                              draggable={false}
                              className=""
                            />
                          </div>
                          <div className="mt-1.5 text-center text-base font-normal text-quaternary-color">
                            {selectedCloud?.title}
                          </div>
                        </div>
                        <div className="absolute left-[86px] top-[256px] h-10 w-[173px]">
                          <button
                            type="button"
                            onClick={() => {
                              setValue(!value);
                            }}
                            className="absolute left-0 top-0 h-10 w-[173px] rounded-[25px] bg-teal-500"
                          >
                            <div className="absolute left-[58px] top-[8px] cursor-pointer text-center text-[16px] font-normal text-white">
                              Access
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCloud;
