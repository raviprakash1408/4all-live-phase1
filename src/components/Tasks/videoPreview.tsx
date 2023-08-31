import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

import ReactPlayers from '../reactPLayer';

const VideoPreview = ({
  url,
  onClose,
  title,
}: {
  url: string;
  onClose: () => void;
  title?: string;
}) => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node)
    ) {
      console.log('Clicked outside');
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  console.log('videoPlayerUrl', url);

  return (
    <div>
      <div>
        <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-fifthOpacity-color">
          <div
            ref={componentRef}
            data-testid="VideoPreview"
            className="relative h-[33rem] w-[46rem] rounded-3xl bg-primary-color"
          >
            <div className="my-4 text-center text-lg font-medium text-quaternary-color ">
              {title}
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
              }}
              className="absolute right-[-7px] top-[-5px] "
            >
              <Image
                width={0}
                height={0}
                src="/assets/icons/close.svg"
                alt=""
                className="h-auto w-auto select-none"
              />
            </button>
            <hr className="mb-3 ml-[28px] mt-2 w-[90%] border border-tertiary-color" />
            <div className="ml-[10px]">
              <ReactPlayers
                validUrl={url}
                streamUrl={url}
                width="w-[45rem]"
                height="h-[28.4rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
