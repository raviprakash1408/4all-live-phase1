import React from 'react';

import type { HeadItem } from '@/components/team/types';
import type { CustomFile } from '@/utils/types/file';

import ListRow from './listRow';

const FilemanagerList = ({
  categoryData,
}: {
  categoryData: Array<CustomFile>;
}) => {
  // console.log(categoryData, 'CustomFile CustomFile');

  const tableHeadItems: Array<HeadItem> = [
    {
      name: 'File name',
      width: `w-[30%]`,
    },
    {
      name: 'Size',
      width: 'w-[10%]',
    },
    {
      name: 'Tags',
      width: 'w-[30%]',
    },
    {
      name: 'Last modified',
      width: 'w-[30%]',
    },
  ];
  return (
    <div>
      <div className="flex h-10 w-full items-center rounded-[20px] bg-primary-color">
        {tableHeadItems.map((item) => (
          <div
            key={item.name}
            className={`text-left text-base font-normal text-quaternary-color ${item.width}`}
          >
            <div className="flex max-w-[180px] items-center justify-around rounded-[20px] bg-primary-color hover:bg-fifth-color hover:text-white">
              <div className="p-2">{item.name}</div>
            </div>
          </div>
        ))}
      </div>

      {categoryData.map((item) => (
        <div key={item.name}>
          <ListRow item={item} />
        </div>
      ))}
    </div>
  );
};

export default FilemanagerList;
