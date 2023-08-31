import React, { useState } from 'react';

import type { TootipTypes } from './type';

const Tooltip = (props: TootipTypes) => {
  const { children } = props;
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleToggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleToggleTooltip}
        // onMouseEnter={handleToggleTooltip}
        // onMouseLeave={handleToggleTooltip}
      >
        {children}
      </button>
      {isTooltipVisible && (
        <div
          className={`absolute -left-5 -top-2 flex  ${props.width} -translate-y-full rounded-lg ${props.backgroundColor} px-2 py-1 text-center text-sm ${props.textcolor} after: after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent${props.bordertopcolor} after:content-['']`}
        >
          {props.text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
