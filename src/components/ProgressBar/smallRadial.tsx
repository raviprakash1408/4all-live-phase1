import React from 'react';

import type { RadialProgressBarTypes } from './types';

const SmallRadialBar = (props: RadialProgressBarTypes) => {
  const { radius } = props;
  const circumference = radius * 2 * Math.PI;
  const percent = props.progress;
  // const progressOffset = ((100 - progress) / 100) * circumference;
  return (
    <div className="relative h-8 w-8">
      <svg
        className="ml-[-20px] mt-[-22px] h-16 w-24 translate-x-1 translate-y-1 align-middle"
        x-cloak
        aria-hidden="true"
      >
        <circle
          className={`text-tertiary-color ${props.hoverColor}`}
          stroke-width="4"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
        <circle
          className="text-secondary-color"
          stroke-width="4"
          stroke-dasharray={circumference}
          stroke-dashoffset={circumference - (percent / 100) * circumference}
          // stroke-linecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
      </svg>
      <span className="absolute left-[11px] top-[32px] text-sm text-quaternary-color">
        {Math.round(percent)}%
      </span>
    </div>
  );
};

export default SmallRadialBar;
