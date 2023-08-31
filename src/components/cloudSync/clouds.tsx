import React from 'react';

import { HalfCurvedButtons } from '../halfcurvedbuttons';
import CloudHeader from './cloudHeader';
import NewCloud from './newCloud';

const Clouds = () => {
  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    // Prevent the default scroll behavior
    event.preventDefault();

    // Calculate the new scroll position based on the mouse wheel delta
    const scrollDelta = event.deltaY;
    const scrollAmount = 30; // Adjust this value to control the scrolling speed
    const scrollableContent = event.currentTarget;
    scrollableContent.scrollLeft +=
      scrollDelta > 0 ? scrollAmount : -scrollAmount;
  };
  return (
    <div>
      <div className="flex ">
        <NewCloud />

        <div className="ml-4 mt-[14px] rounded-full border-2 border-primary-color ">
          <HalfCurvedButtons
            content=" Delete (1)"
            height="min-[400px]:h-8 min-[1600px]:h-9"
            width="w-[8.2rem]"
            image="/assets/icons/icon25.svg"
            backgroundColor="bg-tertiary-color"
            halfCurved={false}
            textcolor="text-quaternary-color hover:border-quaternary-color cursor-pointer"
            textsize="text-sm pl-[12px]"
          />
        </div>
      </div>
      <div
        onWheel={handleScroll}
        className="custom-scrollbar overflow-x-auto overflow-y-hidden"
      >
        <CloudHeader />
      </div>
    </div>
  );
};

export default Clouds;
