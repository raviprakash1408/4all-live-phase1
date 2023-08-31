import { useEffect, useState } from 'react';

import type { RangeSliderType } from './type';

const RangeSlider = (props: RangeSliderType) => {
  const [value, setValue] = useState(props.progress);
  const [text, setText] = useState(false);
  const { textSide } = props;
  const { width } = props;

  useEffect(() => {
    if (textSide === 'down') {
      setText(false);
    } else if (textSide === 'left') {
      setText(true);
    }
  }, [textSide]);

  const thumb = props.type;
  let ThumbClass;

  const handleSliderChange = (e: any) => {
    setValue(parseInt(e.target.value, 10));
  };

  const calculateBackgroundColor = (value1: number) => {
    const percentage = (value1 / 100) * 100;
    return `linear-gradient(to right,${
      props.rangeColor === '' || props.rangeColor === undefined
        ? '#00CDB8'
        : props.rangeColor
    }  ${percentage}%, #1B3944 ${percentage}%)`;
  };

  const handleSliderMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  if (thumb === 'withoutThumb') {
    ThumbClass = 'withoutThumb';
  } else if (thumb === 'withThumb') {
    ThumbClass = 'withThumb';
  } else if (thumb === 'thumbBorder') {
    ThumbClass = 'thumbBorder';
  }

  return (
    <div
      className={`relative  ${
        text ? 'flex flex-row justify-center' : `flex flex-col`
      } items-center`}
    >
      {text && textSide === 'left' && (
        <div>
          <div
            className={`${props.textMargin} select-none text-quaternary-color min-[900px]:text-[10px] xl:text-base`}
          >
            {props.progress}
            {props.dataType}
          </div>
        </div>
      )}
      {textSide === 'up' && (
        <div className="mr-2">
          <span
            className={`${props.textMargin}   select-none text-base text-quaternary-color min-[900px]:text-[10px] xl:text-base`}
          >
            {props.rangeDisabled ? props.progress : value}
            {props.dataType}
          </span>
        </div>
      )}
      <input
        type="range"
        min="0"
        max="100"
        value={props.rangeDisabled ? props.progress : value}
        onMouseDown={props.rangeDisabled ? handleSliderMouseDown : undefined}
        onChange={handleSliderChange}
        className={`${ThumbClass}  h-1 ${width}  cursor-pointer appearance-none rounded-full focus:outline-none`}
        style={{
          background: calculateBackgroundColor(
            props.rangeDisabled ? props.progress : value
          ),
        }}
      />
      {!text && textSide === 'down' && (
        <div className="ml-2 mt-2">
          <span
            className={`${props.textMargin} mt-2 select-none text-base text-quaternary-color`}
          >
            {100 - props.progress}
            {props.dataType}
          </span>
        </div>
      )}
    </div>
  );
};

export default RangeSlider;
