'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

import type { Team } from '@/utils/types/team';

import Arrow from '../arrow/arrow';
import InputField from '../input field/InputField';
import TeamGrid from './grid';
import { TeamTable } from './list';

const TeamHeader = ({ teams }: { teams: Team[] }) => {
  const [mode, setmode] = useState('list');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between px-6">
        {/* <div>
          <HalfCurvedButton
            content="Create new team"
            image="/assets/icons/plus.svg"
            backgroundColor="bg-primary-color"
            Color="text-font-color"
            Color1=""
            textProp="pl-1 pr-2"
          />
        </div> */}
        <div className="flex items-center gap-4">
          <Arrow
            img={
              mode === 'grid'
                ? '/assets/icons/listView.svg'
                : '/assets/icons/listViewActive.svg'
            }
            backgroundColor={
              mode === 'grid' ? 'bg-primary-color' : 'bg-tertiary-color'
            }
            rotate=" w-5"
            width="w-10 h-10"
            onClick={() => setmode('list')}
          />
          <Arrow
            img={
              mode === 'list'
                ? '/assets/icons/gridIcon.svg'
                : '/assets/icons/gridViewActive.svg'
            }
            backgroundColor={
              mode === 'list' ? 'bg-primary-color' : 'bg-tertiary-color'
            }
            rotate=" w-5"
            width="w-10 h-10"
            onClick={() => setmode('grid')}
          />
          <InputField
            name=""
            img="/assets/icons/Search.svg"
            placeholder="Search email, name"
            imgCursor="cursor-pointer"
            errorBorder="border-quaternary-color"
            validation={false}
            withImage={false}
            height=""
            width=""
            borderColor=""
          />
        </div>
      </div>

      {/* team table list */}
      {mode === 'list' ? (
        <div className="px-[30px] py-5">
          <TeamTable teams={teams} />
        </div>
      ) : (
        <TeamGrid teams={teams} />
      )}

      {/* team table grid */}
    </motion.div>
  );
};

export { TeamHeader };
