import React from 'react';

const Loading = () => {
  return (
    <div>
      {' '}
      <div className="relative mt-4 h-20 w-full animate-pulse rounded bg-tertiary-color" />
      <div className="absolute top-[22%] ml-10 h-[52px] w-[52px] animate-pulse rounded-full bg-quaternary-color" />
    </div>
  );
};

export default Loading;
