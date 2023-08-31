import Image from 'next/image';
import React from 'react';

import type { MemberPic } from './types';

const Members = (props: MemberPic) => {
  const { ProfileItems } = props;

  return (
    <div>
      {ProfileItems && ProfileItems.length > 4 ? (
        <div className="flex items-center">
          {ProfileItems.slice(0, 4).map((item) => (
            <div key={item.id} className="group -mr-2 inline-block">
              <div className="">
                {item.url ? (
                  <Image
                    width={40}
                    height={40}
                    alt=""
                    src={item.url}
                    className="rounded-full border-2 border-secondary-color"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-secondary-color bg-primary-color text-sm text-font-color">
                    {item.name ? item.name[0] : ''}
                  </div>
                )}
                {item.name && (
                  <div
                    className={`absolute -left-3 -top-2 hidden -translate-y-full rounded-lg bg-gray-500 px-2 py-1 text-center text-sm text-font-color after:absolute after:left-1/2 after:top-[99%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-500 after:content-[''] group-hover:flex`}
                  >
                    {item.name}
                  </div>
                )}
              </div>
            </div>
          ))}
          {ProfileItems.length > 4 && (
            <div className=" flex h-10 w-10 items-center justify-center rounded-full border-2 border-secondary-color bg-primary-color text-sm text-font-color">
              <span className="font-bold">+</span>
              <span className="font-bold">{ProfileItems.length - 4}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center">
          {ProfileItems?.map((item) => (
            <div key={item.id} className="group -mr-2 inline-block">
              <div className="">
                {item.url ? (
                  <Image
                    width={40}
                    height={40}
                    alt=""
                    src={item.url}
                    className=" rounded-full border-2 border-secondary-color"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-secondary-color bg-primary-color text-sm text-font-color">
                    {item.name ? item.name[0] : ''}
                  </div>
                )}
                {item.name && (
                  <div
                    className={`absolute -left-3 -top-2 hidden -translate-y-full rounded-lg bg-gray-500  px-2 py-1 text-center text-sm text-font-color after:absolute after:left-1/2 after:top-[99%] after:-translate-x-1/2 after:border-8 after:border-x-transparent  after:border-b-transparent after:border-t-gray-500 after:content-[''] group-hover:flex`}
                  >
                    {item.name}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Members;
