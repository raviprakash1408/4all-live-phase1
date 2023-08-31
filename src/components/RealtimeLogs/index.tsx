'use client';

import React, { useState } from 'react';

import { CustomizedSelect } from '../CustomizedSelect';
import CameraCheck from './cameraCheck';
import InternetConnectionCheck from './internetConnection';
import LiveRecording from './liveRecording';
import Mp4Generation from './mp4Generation';
import NasStorage from './nasStorageLogs';

const options = [
  {
    id: 1,
    name: 'Camera Check',
  },
  {
    id: 2,
    name: 'Live Recording Progress',
  },
  {
    id: 3,
    name: 'Mp4 Generation Process',
  },
  {
    id: 4,
    name: 'Nas Storage Check',
  },
  {
    id: 5,
    name: 'Internet Connection Check',
  },
];
const RealTimeLogs = () => {
  const [selectedOption, setSelectedOption] = useState('Camera Check');

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);

    // Do something with the selected option in the parent component
  };
  return (
    <div>
      <div className="ml-8 mt-4">
        <CustomizedSelect
          width="w-72"
          height="h-10"
          border="rounded-full"
          options={options}
          textcolor="text-quaternary-color"
          initialSelect="Camera Check"
          onSelectOption={handleSelectOption}
          borderColor="border-tertiary-color group-hover:border-quaternary-color"
        />
      </div>
      {selectedOption === 'Camera Check' && (
        <div>
          <CameraCheck />
        </div>
      )}
      {selectedOption === 'Live Recording Progress' && (
        <div>
          <LiveRecording />
        </div>
      )}
      {selectedOption === 'Mp4 Generation Process' && (
        <div>
          <Mp4Generation />
        </div>
      )}
      {selectedOption === 'Nas Storage Check' && (
        <div>
          <NasStorage />
        </div>
      )}
      {selectedOption === 'Internet Connection Check' && (
        <div>
          <InternetConnectionCheck />
        </div>
      )}
    </div>
  );
};

export default RealTimeLogs;
