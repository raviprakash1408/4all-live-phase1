import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Arrow from '../arrow/arrow';
import CommonButton from '../button/commonbutton';
import Loading from '../Loading';
// import { SettingsComponent } from '../settings';
import Share from '../share';
import Dropdown from './Dropdown';
import type { DropdownItem } from './types';

const List = ({ item }: { item: DropdownItem }) => {
  const [isLoading, setIsLoading] = useState(true);

  const segment = useSelectedLayoutSegment();

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setTimeout(() => {
      setIsOpen(!isOpen);
    }, 100);
  };

  useEffect(() => {
    // console.log(segment);

    if (segment === item.slug) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [segment]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Delay of 2 seconds (2000 milliseconds)
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div key={item.id}>
          <div
            key={item.id}
            className="mt-2 flex h-20 w-full items-center justify-around rounded-2xl border border-tertiary-color bg-tertiary-color hover:border-fifth-color  hover:bg-fifth-color "
          >
            <Image
              width={0}
              height={0}
              src={item.img}
              alt=""
              className="h-auto w-auto rounded-full"
            />
            <p className=" text-lg font-bold text-font-color">{item.name}</p>
            <CommonButton name="Join Space" img="/assets/icons/Group 914.png" />
            <div className="flex ">
              <Image
                width={0}
                height={0}
                src="\assets\icons\Ellipse 17.png"
                alt="icon"
                className="mt-2 h-2 w-2"
              />
              <div className="ml-2 text-sm text-quaternary-color">
                Now Online
              </div>
            </div>
            {/* <Index/> */}

            {/* <div className="relative flex">
              <Link
                href={`dashboard/spaces/${item.slug}`}
                className="border-none hover:border-none"
              >
                <button type="button" onClick={toggleDropdown}>
                  <SettingsComponent
                    backgroundColor={` ${
                      isOpen ? 'bg-secondary-color' : 'bg-primary-color'
                    }`}
                    Color={` ${
                      isOpen ? 'text-font-color' : 'text-quaternary-color'
                    }`}
                    Color1={` ${
                      isOpen ? 'filter grayscale brightness-[2]' : ''
                    }`}
                  />
                </button>
              </Link>
              <SettingsComponent content={undefined} height={''} width={''} backgroundColor={''} />
            </div> */}
            <Share />
            <Link
              href={`dashboard/spaces/${item.slug}`}
              className="border-none hover:border-none"
            >
              <button type="button" onClick={toggleDropdown}>
                <Arrow
                  //   isOpen ? 'bg-secondary-color' : 'bg-primary-color'
                  // }`}
                  // Color1={` ${isOpen ? 'filter grayscale brightness-[2]' : ''}`}
                  backgroundColor={` ${isOpen ? '' : 'bg-primary-color'}`}
                  rotate={` ${isOpen ? 'transform rotate-180' : ''}`}
                  width=""
                  img=""
                />
                {/* <DropdownComponent
              // backgroundColor={` ${
              //   isOpen ? 'bg-secondary-color' : 'bg-primary-color'
              // }`}
              // Color1={` ${isOpen ? 'filter grayscale brightness-[2]' : ''}`}
              backgroundColor={` ${isOpen ? '' : 'bg-primary-color'}`}
              Color1={` ${isOpen ? 'transform rotate-180' : ''}`}
            /> */}
              </button>
            </Link>
          </div>
          <div>
            {isOpen && (
              <div className=" w-full">
                {/* Your dropdown content goes here */}
                <Dropdown item={item} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
