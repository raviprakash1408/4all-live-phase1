'use client';

import React, { useState } from 'react';

import Checkbox from '../checkbox/checkbox';
import SortOptions from '../sortOptions/sortOptions';
import FileListView from './fileListView';

const CameraList = [
  {
    id: 1,
    title: 'Export Mp4 livefeed4',
    type: 'Live Streaming',
    cameraName: 'Camera1',
    cameraName1: 'Camera2',
    status: 'Completed',
    creationDate: '05/06/2023',
    completionDate: '09/07/2023',
    cloudService: 'Google Drive',
  },
  {
    id: 2,
    title: 'Export Mp4 livefeed2',
    type: 'Live Streaming',
    cameraName: 'Camera1',
    cameraName1: 'Camera2',

    status: 'Completed',

    creationDate: '05/06/2023',
    completionDate: '09/07/2023',
    cloudService: 'OneDrive',
  },
  {
    id: 3,
    title: 'Export Mp4 livefeed1',
    type: 'Live Streaming',

    cameraName: 'Camera1',
    cameraName1: 'Camera2',

    status: 'Completed',

    creationDate: '05/06/2023',
    completionDate: '09/07/2023',
    cloudService: 'DropBox',
  },
  {
    id: 4,
    title: 'Export Mp4 livefeed0',
    type: 'Live Streaming',

    cameraName: 'Camera1',
    cameraName1: 'Camera2',

    status: 'Completed',

    creationDate: '05/06/2023',
    completionDate: '09/07/2023',
    cloudService: 'Ftp Google Drive',
  },
  {
    id: 5,
    title: 'Export Mp4 livefeed9',
    type: 'Live Streaming',

    cameraName: 'Camera1',
    cameraName1: 'Camera2',

    status: 'Uploading',

    creationDate: '05/06/2023',
    completionDate: '09/07/2023',
    cloudService: 'Google Drive',
  },
  {
    id: 6,
    title: 'Export Mp4 livefeed9',
    type: 'Live Streaming',

    cameraName: 'Camera1',
    cameraName1: 'Camera2',

    status: 'Uploading',

    creationDate: '05/06/2023',
    completionDate: '09/07/2023',
    cloudService: 'Google Drive',
  },
  {
    id: 7,
    title: 'Export Mp4 livefeed9',
    type: 'Live Streaming',

    cameraName: 'Camera1',
    cameraName1: 'Camera2',

    status: 'Uploading',

    creationDate: '05/06/2023',
    completionDate: '09/07/2023',
    cloudService: 'Google Drive',
  },
];
const FileList = () => {
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
    <div className="">
      <div className="relative mt-4 flex  h-10 w-[103rem]  rounded-full bg-tertiary-color ">
        <div className="ml-2 mt-2.5">
          <Checkbox
            backgroundColor=""
            id="fileList"
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
        <div className="ml-44 mt-2 text-base font-medium text-quaternary-color">
          Type
        </div>
        <div className="ml-48 mt-2 text-base font-medium text-quaternary-color">
          Status
        </div>
        <div className="ml-72 mt-2 whitespace-nowrap text-base font-medium text-quaternary-color">
          Creation Date
        </div>
        <div className="ml-32 mt-2 whitespace-nowrap text-base font-medium text-quaternary-color">
          Updated
        </div>
        <div className="ml-32 mt-2 text-base font-medium text-quaternary-color ">
          Cloud
        </div>
        <div className="  ml-28 mt-2 text-base font-medium text-quaternary-color">
          Actions
        </div>
        <SortOptions
          sortingCriterion={sortingCriterion}
          setCriterion={setSortingCriterion}
          handleSort={handleSort}
        />
      </div>
      <div className="mb-4 ">
        {sortedData.map((item) => (
          <div key={item.id} className="">
            <FileListView item={item} checkbox1={checkbox} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;
