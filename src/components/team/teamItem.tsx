import Image from 'next/image';
import React from 'react';

import type { Team } from '@/utils/types/team';

import { ColoredButton } from '../button/colored';

const TeamItem = ({ team }: { team: Team }) => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="h-[10px] w-[10px] rounded-full bg-secondary-color" />
      <Image
        width={50}
        height={50}
        src="/assets/images/sony.png"
        alt=" "
        className="rounded-full object-cover"
      />
      <div>
        <div className="text-base font-semibold text-white">
          {team.organization.company_name}
        </div>
        <div className="text-sm font-normal text-secondary-color">
          {team.invited_by.email}
        </div>

        <div className="flex items-center justify-between gap-[10px]">
          {team.is_my_team ? (
            <div className="flex items-center justify-between gap-[10px]">
              <ColoredButton
                bgcolor="bg-secondary-color"
                height="h-[25px]"
                styles="text-sm text-white min-w-[70px]"
              >
                Owner
              </ColoredButton>

              <ColoredButton
                bgcolor="bg-secondary-color"
                height="h-[25px]"
                styles="text-sm text-white min-w-[70px]"
              >
                Default
              </ColoredButton>
            </div>
          ) : (
            <ColoredButton
              bgcolor="bg-secondary-color"
              height="h-[25px]"
              styles="text-sm text-white min-w-[70px]"
            >
              Member
            </ColoredButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamItem;
