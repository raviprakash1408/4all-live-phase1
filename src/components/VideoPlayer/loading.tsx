import React from 'react';

interface LoadingVideoProps {
  width?: string;
  height?: string;
}
const LoadingVideo = (props: LoadingVideoProps) => {
  return (
    <div>
      <div
        className={`${props.width} ${props.height} mt-[6px] animate-pulse rounded-2xl bg-fifth-color`}
      />
    </div>
  );
};

export default LoadingVideo;
