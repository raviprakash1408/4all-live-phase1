// component name: Sidebar

'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import ProcessingGrid from '../processing';
import SidebarMenuItem from './sidebarMenuItem';
import type { MenuItem } from './types';

const Sidebar = ({
  sidebarMenuItems,
}: {
  sidebarMenuItems: Array<MenuItem>;
}) => {
  const [status, setStatus] = useState(false);
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setStatus(false);
      }
    };

    const handleEscapeKey = (event: any) => {
      if (event.key === 'Escape') {
        setStatus(false);
      }
    };

    if (status) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [status]);
  return (
    <div className=" select-none bg-tertiary-color">
      <div className="flex">
        <div
          className={`w-20
           custom-scrollbar h-[100vh] overflow-y-auto bg-tertiary-color duration-300`}
        >
          {sidebarMenuItems.map((item) => {
            return (
              <SidebarMenuItem
                key={item.name}
                item={item}
                showMenu={showMenu}
              />
            );
          })}
        </div>
        {/* <button
          type="button"
          className={`${
            showMenu ? 'ml-56' : 'ml-20'
          } group absolute top-4  z-[4] flex h-11 cursor-pointer items-center self-center rounded-r-[20px] bg-tertiary-color pl-[2px] pr-2 transition duration-150 ease-out  hover:ease-in focus:outline-none`}
          onClick={() => setShowMenu((preValue) => !preValue)}
        >
          <Image
            width={0}
            height={0}
            className={`h-auto w-auto duration-300 ease-in-out group-hover:translate-x-0.5 max-[1000px]:hidden ${
              showMenu ? '' : 'rotate-180'
            }`}
            src="/assets/MoLink/SideBarArrow.svg"
            alt=""
          />
        </button> */}
      </div>
   
    </div>
  );
};

export { Sidebar };
