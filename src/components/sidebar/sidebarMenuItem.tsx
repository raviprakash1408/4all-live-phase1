import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import type { MenuItem } from './types';

const SidebarMenuItem = ({ item }: { item: MenuItem; showMenu: boolean }) => {
  // get current url using next js router
  const pathname = usePathname() || '';
  const isActive = pathname.includes(item.url);

  const getData = () => {
    let data: JSX.Element;
    switch (item.type) {
      case 'logo':
        data = (
          <div className="m-[9px] mb-5 flex h-9 items-center justify-center gap-[4px] py-[22px] duration-300 ease-in-out">
            <Image
              width={63}
              height={33}
              src={item.img}
              alt="logo"
              className=""
              draggable={false}
            />
            {/* <Image
              width={86}
              height={35}
              className={`${!showMenu && 'hidden'}`}
              src={item.subImage ? item.subImage : ''}
              alt="logo2"
              draggable={false}
            /> */}
          </div>
        );

        break;
      // case 'team':
      //   data = (
      //     <div className="mb-2.5 flex items-center bg-primary-color duration-300 ease-in-out">
      //       <img src={item.img} className="py-2.5 pl-5 pr-3" alt="team" />
      //       <div className={`${!showMenu && 'hidden'}`}>
      //         <p className="threeDotText w-36 text-base text-quaternary-color">
      //           Sony pictures Television
      //         </p>
      //         <div className="flex w-36 rounded-[52px] bg-quaternary-color px-2.5">
      //           <p className="pr-3">Switch team</p>
      //           <img src={item.subImage} alt="switch_team" />
      //         </div>
      //       </div>
      //     </div>
      //   );
      //   break;
      default:
        data = (
          <Link href={item.url}>
            <div
              className={`${
                isActive ? 'mt-[3px] ' : 'mt-[3px]'
              } group mb-5 flex cursor-pointer items-center px-3 duration-300  ease-in-out  min-[400px]:h-[2.2rem] min-[1200px]:h-[3.2rem] min-[1600px]:h-14  `}
            >
              <div
                className={`${
                  isActive ? 'bg-secondary-color' : 'bg-sixth-color'
                } flex items-center  justify-center rounded-2xl  duration-300 ease-in-out group-hover:bg-secondary-color  xl:h-[60px] xl:w-[70px]`}
              >
                <Image
                  width={0}
                  height={0}
                  className={`w-auto md:h-[14px] xl:h-auto ${
                    isActive && 'brightness-0 invert'
                  } ease-in-out group-hover:brightness-0 group-hover:invert`}
                  src={item.img}
                  alt={item.name}
                  draggable={false}
                />
              </div>
            </div>
          </Link>
        );
    }

    return data;
  };
  return getData();
};

export default SidebarMenuItem;
