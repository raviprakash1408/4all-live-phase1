import React, { useState } from 'react';

import type { HardwareTypes } from './types';

const IncreaseCount = (props: HardwareTypes) => {
  const [count, setCount] = useState(1);

  return (
    <div>
      {' '}
      <div>
        <div className="absolute ml-[40%] mt-44 h-8 w-40 rounded-full bg-primary-color text-sm text-quaternary-color  group-hover:text-font-color">
          <button
            type="button"
            onClick={() => setCount(count - 1)}
            className="ml-1 mt-1 h-6 w-6 rounded-full bg-secondary-color text-font-color"
          >
            -
          </button>
          <span className="mx-2 text-font-color">{count}</span>{' '}
          <button
            type="button"
            onClick={() => setCount(count + 1)}
            className=" mt-1 h-6 w-6 rounded-full bg-secondary-color text-font-color"
          >
            +
          </button>
          <span className="ml-2">${count * props.price}</span>
        </div>
      </div>
    </div>
  );
};

export default IncreaseCount;
