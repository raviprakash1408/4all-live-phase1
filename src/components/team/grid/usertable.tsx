import Image from 'next/image';
import React from 'react';

import Checkbox from '@/components/checkbox/checkbox';
import { Select } from '@/components/select/index';
import Toggle from '@/components/toggle button/toggle';

import type { HeadItem } from '../types';

const Usertable = () => {
  const tableHeadItems: Array<HeadItem> = [
    {
      name: 'Name',
      img: `/assets/team/name.svg`,
    },
    {
      name: 'Email',
      img: `/assets/team/email.svg`,
    },
    {
      name: 'Role',
      img: `/assets/team/role.svg`,
    },
    {
      name: 'Current space',
      img: `/assets/team/space.svg`,
    },
    {
      name: 'Last activity',
      img: `/assets/team/last_activity.svg`,
    },

    {
      name: 'Status',
      img: `/assets/team/status.svg`,
    },
    {
      name: ' ',
      img: '',
    },
  ];
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="flex h-[50px] items-center gap-2 rounded-l-[20px] bg-tertiary-color pl-5  text-base font-normal text-quaternary-color">
            <Checkbox backgroundColor="bg-tertiary-color" type="Square" id="" />
            All
          </th>
          {tableHeadItems.map((item, index) => (
            <th
              key={item.name}
              className={` ${
                index === tableHeadItems.length - 1 ? 'rounded-r-[20px]' : ''
              } bg-tertiary-color text-left text-base font-normal text-quaternary-color`}
            >
              <div className="flex items-center justify-around hover:rounded-[20px] hover:bg-fifth-color hover:text-white">
                <div className="flex">
                  <Image
                    width={0}
                    height={0}
                    className="h-auto w-auto"
                    src={item.img ? item.img : ''}
                    alt=""
                  />

                  <div className="p-[12px]">{item.name}</div>
                </div>
                {/* <div>
                  <img src={item.img} alt="" />
                </div> */}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        <tr className="border-b border-tertiary-color">
          <td>
            <div className="pl-5">
              <Checkbox
                backgroundColor="bg-primary-color"
                type="Square"
                id=""
              />
            </div>
          </td>
          <td>
            <div className="flex items-center justify-center gap-[10px]">
              <div className="text-base font-semibold text-quaternary-color">
                1
              </div>
              <div className="h-[10px] w-[10px] rounded-full bg-secondary-color" />
              <Image
                src="/assets/images/sony.png"
                alt=" "
                className="my-2.5 h-[50px] w-[50px] rounded-full object-cover"
                width={50}
                height={50}
              />
              <div>
                <div className="text-base font-semibold text-quaternary-color">
                  Johan Romero
                </div>
              </div>
            </div>
          </td>
          <td>
            <div className="text-center text-sm font-normal text-secondary-color">
              johan@10thd.io
            </div>
          </td>
          <td>
            <Select name="" img="" />
          </td>

          <td className="flex items-center justify-center gap-[10px] pt-[22px]">
            <div className="h-[10px] w-[10px] rounded-full bg-secondary-color" />
            <div className="text-base text-quaternary-color">Coke, sony</div>
          </td>
          <td>
            <div className="flex justify-center">
              <Toggle text id="" />
            </div>
          </td>
          <td className="text-center text-base text-quaternary-color">
            01/02/2022 - 06:30 PM
          </td>
        </tr>

        {/* row 1 */}
        <tr className="border-b border-tertiary-color">
          <td>
            <div className="pl-5">
              <Checkbox
                backgroundColor="bg-primary-color"
                type="Square"
                id=""
              />
            </div>
          </td>
          <td>
            <div className="flex items-center justify-center gap-[10px]">
              <div className="text-base font-semibold text-quaternary-color">
                1
              </div>
              <div className="h-[10px] w-[10px] rounded-full bg-secondary-color" />
              <Image
                src="/assets/images/sony.png"
                alt=" "
                className="my-2.5 h-[50px] w-[50px] rounded-full object-cover"
                width={50}
                height={50}
              />
              <div>
                <div className="text-base font-semibold text-quaternary-color">
                  Dr. Della Rice
                </div>
              </div>
            </div>
          </td>
          <td>
            <div className="text-center text-sm font-normal text-secondary-color">
              johan@10thd.io
            </div>
          </td>
          <td>
            <Select name="" img="" />
          </td>

          <td className="flex items-center justify-center gap-[10px] pt-[22px]">
            <div className="h-[10px] w-[10px] rounded-full bg-secondary-color" />
            <div className="text-base text-quaternary-color">Coke, sony</div>
          </td>
          <td>
            <div className="flex justify-center">
              <Toggle text id="" />
            </div>
          </td>
          <td className="text-center text-base text-quaternary-color">
            01/02/2022 - 06:30 PM
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Usertable;
