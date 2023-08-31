'use client';

import React from 'react';

import type { DemoButton } from './types';

const CurvedButton = (props: DemoButton) => {
  // const [clicked, setClicked] = useState(false);

  const curve = () => {
    if (!props.halfCurved) return 'rounded-full';
    if (props.curveType === 'left') return 'rounded-l-full';
    return 'rounded-r-full';
  };

  // const handleClick = () => {
  //   setClicked(!clicked);
  // };

  return (
    <div
      className={`group flex w-full ${
        props.height
      } ${curve()} items-center justify-center  ${props.backgroundColor}`}
      // onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export { CurvedButton };
