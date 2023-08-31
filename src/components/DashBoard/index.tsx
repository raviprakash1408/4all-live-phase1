'use client';

import React from 'react';

import SpaceGrid from '../CameraGrids';
import DashBoard1 from './dashBoard1';

const DashBoardIndex = () => {
  return (
    <div className="p-2">
      <DashBoard1 />
      <div className="mt-4">
        <SpaceGrid type="livefeeds" />
      </div>
    </div>
  );
};

export default DashBoardIndex;
