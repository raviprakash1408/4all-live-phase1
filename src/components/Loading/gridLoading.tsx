import React from 'react';

const GridLoading = () => {
  return (
    <div className="ml-6 mt-4 grid gap-x-9 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
      <div className="relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border-2 border-primary-color duration-300">
        <div className="relative  h-48 w-full animate-pulse  rounded bg-tertiary-color" />
        <div className="flex h-16 animate-pulse flex-row bg-fifth-color">
          <div className="ml-2 mt-4 h-8 w-12 animate-pulse rounded-[20px] bg-primary-color" />
          <div className="ml-6 mt-4 h-8 w-60 animate-pulse rounded-[20px] bg-primary-color" />
        </div>
      </div>
    </div>
  );
};

export default GridLoading;
