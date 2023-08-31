import Image from 'next/image';
import React from 'react';

import FileButton from '@/components/MediaContentCard/button';
import type { CustomFile } from '@/utils/types/file';

const ListRow = ({ item }: { item: CustomFile }) => {
  let icon: string = '';

  const buttonName = [
    {
      id: 1,
      buttonName: 'Roto',
    },
    {
      id: 2,
      buttonName: 'QC',
    },
    {
      id: 3,
      buttonName: 'Plate',
    },
  ];

  if (item.type === 'media') {
    icon = '/assets/icons/Medias.svg';
  } else if (item.type === 'image') {
    icon = '/assets/icons/image.svg';
  } else if (item.type === 'audio') {
    icon = '/assets/icons/Audio.svg';
  } else if (item.type === 'document') {
    icon = '/assets/icons/DocumentImg.svg';
  } else if (item.type === 'notes') {
    icon = '/assets/icons/NotesImg.svg';
  }
  return (
    <div className="mt-[10px] flex h-10 w-full items-center rounded-[20px] bg-primary-color px-5 text-left text-base font-normal text-quaternary-color">
      <div className="flex w-[30%]">
        <Image alt={item.name} width={25} height={25} src={icon} />
        <div className="pl-4">{item.name}</div>
      </div>
      <div className="w-[10%] text-center">12MB</div>
      <div className="flex w-[30%]">
        {buttonName.map((itemName) => (
          <FileButton key={itemName.id} name={itemName.buttonName} />
        ))}
      </div>
      <div className="w-[30%]">Fri Sep 04 1998 13:11:45 GMT-0500</div>
    </div>
  );
};

export default ListRow;
