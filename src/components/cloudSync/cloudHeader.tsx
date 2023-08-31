'use client';

import React, { useState } from 'react';

import Checkbox from '../checkbox/checkbox';
import SortOptions from '../sortOptions/sortOptions';
import CLoudList from './cloudList';

const CameraList = [
  {
    id: 1,
    title: 'Google Drive',
    type: 'Drive',
    freeSpace: '54 GB',
    totalSpace: '256 GB',
    status: 'Completed',
    creationDate: '05/06/2023',
    completionDate: '09/07/2023',
    cloudService: 'Google Drive',
  },
  {
    id: 2,
    title: 'One Drive',
    type: 'Drive',
    freeSpace: '540 GB',
    totalSpace: '1 TB',

    status: 'Completed',

    creationDate: '05/06/2023',
    completionDate: '09/07/2023',
    cloudService: 'OneDrive',
  },
  {
    id: 3,
    title: 'DropBox',
    type: 'Drive',
    freeSpace: '87 GB',
    totalSpace: '100 GB',

    status: 'Completed',

    creationDate: '05/06/2023',
    completionDate: '09/07/2023',
    cloudService: 'DropBox',
  },
  {
    id: 4,
    title: 'FTP - Meetmo Hosting',
    type: 'FTP',

    freeSpace: '54 GB',
    totalSpace: '256 GB',
    status: 'Connection Failed',

    creationDate: '05/06/2023',
    completionDate: '09/07/2023',
    cloudService: 'Ftp Google Drive',
  },
];
const CloudHeader = () => {
  const [checkbox, setCheckbox] = useState(false);
  const [sortedData, setSortedData] = useState(CameraList);
  const [sortingCriterion, setSortingCriterion] = useState(null);
  const handleSort = (id: number) => {
    if (id === 2) {
      // Sort based on Name criterion
      const sortedData1 = [...CameraList].sort((a, b) => {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      // Update the sorted data in the component state or use it as needed
      setSortedData(sortedData1);
    }
  };

  return (
    <div>
      <div>
        <div className="relative ml-5 mt-4 flex  h-10 w-[103rem]  rounded-full bg-tertiary-color">
          <div className="ml-2 mt-2.5">
            <Checkbox
              backgroundColor=""
              id="cloudList"
              type="Square"
              button={checkbox}
              onClick={() => {
                setCheckbox(!checkbox);
              }}
            />
          </div>
          <div className=" ml-24 mt-2 text-base font-medium text-quaternary-color">
            Name
          </div>
          <div className="ml-60 mt-2 text-base font-medium text-quaternary-color">
            Type
          </div>
          <div className="ml-48 mt-2 text-base font-medium text-quaternary-color">
            Used
          </div>
          <div className="ml-56 mt-2 whitespace-nowrap text-base font-medium text-quaternary-color">
            Status
          </div>
          <div className="ml-32 mt-2 whitespace-nowrap text-base font-medium text-quaternary-color">
            Creation date
          </div>
          <div className="ml-32 mt-2 whitespace-nowrap text-base font-medium text-quaternary-color ">
            Las connection
          </div>
          <div className="  ml-24 mt-2 text-base font-medium text-quaternary-color">
            Actions
          </div>
          <SortOptions
            sortingCriterion={sortingCriterion}
            setCriterion={setSortingCriterion}
            handleSort={handleSort}
          />
        </div>
        <div className=" mb-4 ">
          {sortedData.map((item) => (
            <div key={item.id}>
              <CLoudList item={item} checkbox1={checkbox} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CloudHeader;
