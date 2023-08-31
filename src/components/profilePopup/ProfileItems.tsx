import Image from 'next/image';
import React from 'react';

// import { availableLanguages } from '@/languages';
// import { getCookie, setCookie } from '@/utils/clientUtils';
import type { ProfileItem } from './types';

const ProfileItems = ({ item }: { item: ProfileItem }) => {
  // console.log(item, 'itemmmm');
  // const currentlanguage = getCookie('lan');
  // const router = useRouter()
  const getData = () => {
    let data: JSX.Element;
    switch (item.type) {
      case 'team':
        data = (
          <div className="mb-2.5 flex items-center bg-primary-color duration-300 ease-in-out">
            <Image
              width={0}
              height={0}
              src={item.img}
              className="h-auto w-auto py-2.5 pl-5 pr-3"
              alt="team"
            />
            <p className="threeDotText w-36  text-base text-quaternary-color">
              Sony pictures Television
            </p>
            <div className=" flex w-36  rounded-[52px] bg-quaternary-color px-2.5 text-tertiary-color hover:bg-secondary-color">
              <span className="">Switch team</span>
              <Image
                width={0}
                height={0}
                className="h-auto w-auto"
                src={item.subImage ? item.subImage : ''}
                alt="switch_team"
              />
            </div>
          </div>
        );
        break;
      case 'dropdown':
        data = (
          <div className="group flex h-10 cursor-pointer items-center rounded-2xl border-2 border-solid border-tertiary-color px-5  duration-300 ease-in-out hover:bg-primary-color">
            <div
              className={` flex h-[30px] w-[30px] items-center justify-center bg-transparent duration-300 ease-in-out `}
            >
              <Image
                width={0}
                height={0}
                className=" h-auto w-auto ease-in-out"
                src={item.img}
                alt={item.name}
              />
            </div>
            <p className="sidebarName pl-2.5 text-quaternary-color">
              <label htmlFor="language_selecter">{item.label}</label>
              <select
                // onChange={(e) => {
                //   // const { value } = e.currentTarget;
                //   // setCookie('lan', value, 7);
                //   router.refresh();
                // }}
                id="language_selecter"
              >
                {/* {availableLanguages.map((lang) => (
                  <option
                    key={lang}
                    selected={lang === currentlanguage}
                    value={lang}
                  >
                    {lang}
                  </option>
                ))} */}
              </select>
            </p>
          </div>
        );
        break;
      default:
        data = (
          <div className="group flex h-10 cursor-pointer items-center rounded-2xl border-2 border-solid border-tertiary-color px-5  duration-300 ease-in-out hover:bg-primary-color">
            <div
              className={`animate-shake flex h-[30px] w-[30px] items-center justify-center bg-transparent duration-300 ease-in-out `}
            >
              <Image
                width={0}
                height={0}
                className=" h-auto w-auto ease-in-out"
                src={item.img}
                alt={item.name}
              />
            </div>
            <p className="sidebarName pl-2.5 text-quaternary-color">
              {item.name}
            </p>
          </div>
        );
    }

    return data;
  };
  return getData();
};

export default ProfileItems;
