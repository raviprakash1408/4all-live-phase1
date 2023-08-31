import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import type { ButtonType } from './types';

const GridComponent = (props: ButtonType) => {
  const [hidden, setHidden] = useState(0);
  let imgMain: string | undefined;
  let icon: string = '';
  const Visible = (id: number) => {
    setHidden(id);
  };

  const Hidden1 = () => {
    setHidden(0);
  };
  // const buttonName = [
  //   {
  //     id: 1,
  //     buttonName: 'Roto',
  //   },
  //   {
  //     id: 2,
  //     buttonName: 'QC',
  //   },
  //   {
  //     id: 3,
  //     buttonName: 'Plate',
  //   },
  // ];

  // function for getting the image and icon according to the type
  if (props.type === 'media') {
    imgMain = props.img;
    icon = '/assets/icons/Media.svg';
  } else if (props.type === 'image') {
    imgMain = props.img;
    icon = '/assets/icons/image.svg';
  } else if (props.type === 'audio') {
    imgMain = '/assets/icons/Audio.svg';
    icon = '/assets/icons/Audio.svg';
  } else if (props.type === 'document') {
    imgMain = '/assets/icons/DocumentImg.svg';
    icon = '/assets/icons/DocumentImg.svg';
  } else if (props.type === 'notes') {
    imgMain = '/assets/icons/NotesImg.svg';
    icon = '/assets/icons/NotesImg.svg';
  }
  useEffect(() => {
    console.log('props.video', props.playVideo);
  });
  return (
    <div
      key={props.id}
      className=" relative cursor-pointer select-none overflow-hidden rounded-3xl border-2 border-primary-color bg-fifth-color duration-300 group-hover:border-secondary-color sm:w-[20vw] xl:w-[13vw] 2xl:w-[13vw]"
      onMouseEnter={() => {
        if (props.id) {
          Visible(props.id);
        }
      }}
      onMouseLeave={Hidden1}
    >
      {imgMain ? '' : ''}

      {/* {props.playVideo === props.title && (
        <ReactPlayers
          validUrl={props.URL ? props.URL : ''}
          streamUrl={props.URL ? props.URL : ''}
          width="2xl:w-[13vw] xl:w-[13vw]"
          height="2xl:h-[19.7vh] xl:h-[16.7vh] "
        />
        //   <VideoPlayer
        //   validUrl={"https://www.youtube.com/watch?v=CtPhRhwSJd0&list=RDCtPhRhwSJd0&start_radio=1"}
        //   streamUrl={"https://www.youtube.com/watch?v=CtPhRhwSJd0&list=RDCtPhRhwSJd0&start_radio=1"}
        //   width="18vw"
        // />
      )} */}

      <div className="flex h-[16.7vh] items-center justify-center bg-fifth-color xl:h-[16.7vh] 2xl:h-[19.7vh]">
        <Image
          src={imgMain || ''}
          height={0}
          width={0}
          alt=""
          className={imgMain === icon ? 'min-w-[65px]' : 'h-full w-full'}
        />
        {hidden === props.id && (
          <Image
            width={20}
            height={20}
            src="/assets/icons/Tick.svg"
            alt=""
            className="absolute left-2 top-4 ml-4 cursor-pointer rounded-full"
            onMouseEnter={() => {
              if (props.id) {
                Visible(props.id);
              }
            }}
          />
        )}
      </div>
      <div className="flex h-[6.2vh] text-center">
        <div className=" w-12 cursor-pointer bg-quaternary-color">
          <div className="">
            <Image
              width={0}
              height={props.type === 'media' ? 0 : 24}
              src={icon}
              alt=""
              className={`mediaImage mx-auto mt-5 w-full max-w-[21px] `}
            />
          </div>
        </div>
        <div className="w-[81%]  bg-tertiary-color">
          <div className="flex flex-col">
            <span className="ml-[19px]  mt-1 truncate whitespace-nowrap text-start text-lg font-semibold text-quaternary-color hover:whitespace-normal group-hover:text-font-color">
              {props.title}
            </span>
            <span className="ml-5 mt-[-5px] text-start text-sm text-quaternary-color group-hover:text-font-color">
              {props.fileSize}
            </span>
            {/* <div className="ml-2 grid grid-cols-5 pr-5">
              {buttonName.map((itemName) => (
                <FileButton
                  key={itemName.id}
                  name={itemName.buttonName}
                  // bgColor="bg-secondary-color"
                />
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridComponent;
