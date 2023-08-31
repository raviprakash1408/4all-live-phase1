import Image from 'next/image';
import React from 'react';

import Toggle from '@/components/toggle button/toggle';
import type { Team } from '@/utils/types/team';

import Members from '../../profilepic';
import { ProfileItems } from '../../profilepic/memberitems';
import RangeSlider from '../../range';
import TeamItem from '../teamItem';
import type { HeadItem } from '../types';

const TeamTable = ({ teams }: { teams: Team[] }) => {
  const tableHeadItems: Array<HeadItem> = [
    {
      name: 'Team',
      img: `/assets/team/team.svg`,
    },
    {
      name: 'Members',
      img: `/assets/team/members.svg`,
    },
    {
      name: 'Storage usage',
      img: `/assets/team/storage_usage.svg`,
    },
    {
      name: 'Bandwidth usage',
      img: `/assets/team/bandwidth.svg`,
    },
    {
      name: 'Status',
      img: `/assets/team/status.svg`,
    },
    {
      name: 'Role',
      img: `/assets/team/role.svg`,
    },
    {
      name: 'Last activity',
      img: `/assets/team/last_activity.svg`,
    },
    {
      name: ' ',
      img: ``,
    },
  ];
  return (
    <table className="w-full">
      <thead>
        <tr>
          {tableHeadItems.map((item, index) => (
            <th
              key={item.name}
              className={`${index === 0 ? 'rounded-l-[20px]' : ''} ${
                index === tableHeadItems.length - 1 ? 'rounded-r-[20px]' : ''
              } bg-tertiary-color text-center text-base font-normal text-quaternary-color`}
            >
              <div className="flex justify-center hover:rounded-[20px] hover:bg-fifth-color hover:text-white">
                <Image
                  width={0}
                  height={0}
                  className="h-auto w-auto"
                  src={item.img ? item.img : ''}
                  alt=""
                />

                <div className="p-[13px]">{item.name}</div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        {teams.map((team) => (
          <tr key={team.id} className="border-b border-tertiary-color">
            <td>
              <div className="pb-2.5 pl-5 pt-2">
                <TeamItem team={team} />
              </div>
            </td>
            <td>
              <div className="flex justify-center">
                <Members ProfileItems={ProfileItems} />
              </div>
            </td>
            <td>
              <div className="flex flex-col justify-center">
                <RangeSlider
                  progress={50}
                  type="withoutThumb"
                  textSide="up"
                  width=""
                  dataType=""
                />
                <div className="text-center text-base text-quaternary-color">
                  <span className="text-base font-semibold text-secondary-color">
                    600 GB
                  </span>
                  / 1.000 GB{' '}
                </div>
              </div>
            </td>
            <td>
              {/* <RadialProgressBar progress={50} radius={30} /> */}
              <div className="text-center text-base text-quaternary-color">
                <span className="text-base font-semibold text-secondary-color">
                  600 GB{' '}
                </span>
                / 1.000 GB{' '}
              </div>
            </td>
            <td>
              <div className="flex flex-col items-center justify-center">
                <Toggle text id="" />
              </div>
            </td>
            <td className="text-center text-base text-quaternary-color">
              Producer
            </td>
            <td className="text-center text-base text-quaternary-color">
              01/02/2022 - 06:30 PM
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { TeamTable };
