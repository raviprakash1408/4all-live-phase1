import Image from 'next/image';
import React from 'react';

const Info = ({
  width,
  height,
  img,
  text,
  textStyle,
}: {
  width: number;
  height: number;
  img: string;
  text?: string;
  textStyle?: string;
}) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image width={width} height={height} src={img} alt="Icon" />
      <div className={`text-center ${textStyle}`}>{text}</div>
    </div>
  );
};

export default Info;
