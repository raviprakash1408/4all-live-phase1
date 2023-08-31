'use client';

import React from 'react';

import type { MenuItem } from './types';

const RectangleButton = (props: MenuItem) => {
  const curve = () => {
    if (!props.topCurved) return '';
    if (props.curveType === 'left') return 'rounded-tl-3xl';
    if (props.curveType === 'right') return 'rounded-tr-3xl';
    return 'rounded-t-2xl';
  };

  const { height } = props;

  return (
    <div
      className={`flex ${height} items-center justify-center ${curve()} border-2 border-tertiary-color ${
        props.hoverbgcolor
      }
        ${props.backgroundColor} `}
    >
      {props.children}
    </div>
  );
};

export { RectangleButton };
