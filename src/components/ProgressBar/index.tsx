import React from 'react';

import type { RadialProgressBarTypes } from './types';

const RadialProgressBar = (props: RadialProgressBarTypes) => {
  const { radius } = props;
  const circumference = radius * 2 * Math.PI;
  const percent = props.progress;
  // const progressOffset = ((100 - progress) / 100) * circumference;
  return (
    <div className="relative h-4 w-4">
      <svg
        className={` h-28 w-28 translate-x-1 translate-y-1 align-middle`}
        x-cloak
        aria-hidden="true"
      >
        <circle
          className="text-primary-color"
          stroke-width="4"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
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
          cx="60"
          cy="60"
        />
      </svg>
      <span className="absolute left-[50px] top-[50px] text-base text-quaternary-color">
        {Math.round(percent)}%
      </span>
    </div>
  );
};

export default RadialProgressBar;
