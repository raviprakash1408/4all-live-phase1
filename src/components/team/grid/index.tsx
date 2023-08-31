import React from 'react';

import type { Team } from '@/utils/types/team';

import TeamItem from '../teamItem';
import TeamActions from './teamActions';
import Usertable from './usertable';

const TeamGrid = ({ teams }: { teams: Team[] }) => {
  // const itemCount = 5;
  // const items = Array.from(
  //   { length: itemCount },
  //   (_, index) => `Item ${index + 1}`
  // );

  return (
    <div className="flex gap-5 px-6 pt-3">
      <div>
        <div className="flex h-[50px] items-center justify-center rounded-[20px] bg-tertiary-color text-quaternary-color">
          Teams
        </div>
        {teams.map((team) => (
          <div key={team.id} className={`group `}>
            <div className="rounded-[20px] px-3 py-2 group-hover:bg-fifth-color">
              <TeamItem team={team} />
            </div>

            <hr className="border-b-[2px] border-tertiary-color group-hover:border-transparent" />
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-[20px] border-[2px] border-tertiary-color px-5">
        <TeamActions />
        <Usertable />
      </div>
    </div>
  );
};

export default TeamGrid;
