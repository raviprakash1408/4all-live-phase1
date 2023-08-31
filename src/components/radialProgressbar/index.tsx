import React from 'react';

const RProgressBar = ({ progress }: { progress: number }) => {
  const progressStyle = {
    animation: `progress-animation ${progress}s linear forwards`,
  };

  return (
    <div className="relative h-32 w-32">
      <div className="absolute left-0 top-0 h-full w-full rounded-full border-4 border-gray-300" />
      <div
        className="absolute left-0 top-0 h-full w-full rounded-full border-4 border-blue-500"
        style={progressStyle}
      />
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
        <span className="text-2xl font-bold">{progress}%</span>
      </div>
    </div>
  );
};

export default RProgressBar;
