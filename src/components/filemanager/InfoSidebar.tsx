import Image from 'next/image';
import React, { useState } from 'react';

import { ColoredButton } from '@/components';
import Members from '@/components/profilepic';
import { ProfileItems } from '@/components/profilepic/memberitems';

interface SystemPropItem {
  name: string;
  value: string;
}
const InfoSidebar = ({
  isOpen,
  button1,
}: {
  isOpen: boolean;
  button1: any;
}) => {
  const [button, setButton] = useState(true);

  const systemProp: Array<SystemPropItem> = [
    // {
    //   name: 'Tags',
    //   value: `Roto, Plate, VFX, QC`,
    // },
    {
      name: 'Type',
      value: 'Video',
    },
    // {
    //   name: 'Location',
    //   value: 'Los Angeles',
    // },
    // {
    //   name: 'Owner',
    //   value: 'Me',
    // },
    {
      name: 'Modified',
      value: '8:53 PM by me',
    },
    {
      name: 'Opened',
      value: '10:35 PM by me',
    },
    {
      name: 'Created',
      value: '8:53 PM',
    },
  ];
  // const variants = {
  //   open: { display: 'block', width: 360 },
  //   closed: { display: 'none', width: 0 },
  // };

  return (
    <div className="mt-8 flex">
      <button
        type="button"
        onClick={() => {
          const updatedButton = !button;
          setButton(updatedButton);
          button1(updatedButton);
        }}
        className={`group h-20 ${button ? '' : 'mt-[21.8rem]'} ${
          isOpen ? ' w-[15px]' : ' w-0'
        }  cursor-pointer items-center self-center rounded-l-[20px] bg-tertiary-color transition duration-150 ease-out hover:bg-fifth-color hover:ease-in`}
        // onClick={() => setShowMenu((preValue) => !preValue)}
      >
        <Image
          width={0}
          height={0}
          className="mr-1 h-auto w-auto duration-300 ease-in-out group-hover:translate-x-0.5"
          src="/assets/icons/arrow-close.svg"
          alt=""
        />
      </button>
      <div
        // animate={isOpen ? 'open' : 'closed'}
        // variants={variants}
        className={`${
          isOpen && button
            ? 'h-[90vh] w-[360px]'
            : 'hidden w-0 shrink-0 overflow-hidden'
        } rounded-[20px] bg-tertiary-color p-5 !duration-300 ease-in-out `}
      >
        <Image
          width={320}
          height={170}
          src="/assets/images/production_commercial.png"
          alt="production_commercial"
          className="rounded-[20px]"
        />

        <div className="mt-3 flex items-center gap-[15px]">
          <Image
            width={24}
            height={20}
            src="/assets/filemanager/notes.svg"
            alt="nbbvnmn"
          />
          <div>
            <div className="text-base font-semibold text-quaternary-color">
              Production commercial.mp4
            </div>
            <div className="text-base font-normal text-quaternary-color">
              20MB
            </div>
          </div>
        </div>

        <div className="mt-5 flex">
          {' '}
          <ColoredButton
            bgcolor="bg-secondary-color"
            halfCurved
            curveType="left"
            height="h-10"
            styles="min-w-[135px] border-2 hover:border-transparent border-quaternary-color"
          >
            <Image
              alt="icon"
              src="/assets/icons/Group.png"
              width="20"
              height="20"
              className="brightness-0 invert"
            />
            <div className="ml-[10px] text-sm text-font-color">Details</div>
          </ColoredButton>
          <ColoredButton
            bgcolor="bg-primary-color"
            halfCurved
            curveType="right"
            height="h-10"
            styles="min-w-[135px] border-2 hover:border-transparent border-quaternary-color"
          >
            <Image
              alt="icon"
              src="/assets/sidebar/file.svg"
              width="20"
              height="20"
            />
            <div className="ml-2.5 text-sm text-quaternary-color">Activity</div>
          </ColoredButton>
        </div>

        <div className="mt-[26px] pb-[6px] text-base font-semibold text-quaternary-color">
          Who has access
        </div>
        <Members ProfileItems={ProfileItems} />
        <div className="mt-[16px] text-base font-semibold text-quaternary-color">
          System properties
        </div>

        {systemProp.map((item) => (
          <div
            key={item.value}
            className="flex items-center pt-[5px] text-base"
          >
            <div className="w-[105px]  font-normal text-quaternary-color">
              {item.name}
            </div>
            <div className="flex-1 font-normal  text-quaternary-color">
              {item.value}
            </div>
          </div>
        ))}

        <div className="mb-5 mt-8 flex items-center justify-center ">
          <ColoredButton
            // onClick={() => {

            // }}
            bgcolor="bg-primary-color"
            height="h-10"
            halfCurved={false}
            styles="max-w-[203px]"
          >
            <div className=" text-base font-normal text-quaternary-color">
              Show metadata
            </div>
          </ColoredButton>
        </div>
      </div>
    </div>
  );
};

export default InfoSidebar;
