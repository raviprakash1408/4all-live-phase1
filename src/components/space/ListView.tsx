'use client';

import React from 'react';

// import { SettingsComponent } from '../settings';
import { Data } from './Data';
import List from './List';

const SpaceComponent = () => {
  return (
    <div className="mt-8 pl-7 pr-11">
      {Data.map((item) => (
        <List key={item.id} item={item} />
      ))}
    </div>
  );
};

export { SpaceComponent };
