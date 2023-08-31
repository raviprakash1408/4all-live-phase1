import { useEffect, useState } from 'react';

import type { RangeSliderType } from './type';

const WithoutProgress = (props: RangeSliderType) => {
  const [value, setValue] = useState(props.progress);
  const [text, setText] = useState(false);
  const { textSide } = props;

  useEffect(() => {
    if (textSide === 'down') {
      setText(false);
    }
    if (textSide === 'left') {
      setText(true);
    }
  }, []);
  const thumb = props.type;
  let ThumbClass;

  const handleSliderChange = (e: any) => {
    setValue(parseInt(e.target.value, 10));
  };

  const calculateBackgroundColor = (value1: number) => {
    const percentage = (value1 / 100) * 100;
    return `linear-gradient(to right, #00CDB8 ${percentage}%, #1B3944 ${percentage}%)`;
  };

  if (thumb === 'withoutThumb') {
    ThumbClass = 'withoutThumb';
  }
  if (thumb === 'withThumb') {
    ThumbClass = 'withThumb';
  }
  if (thumb === 'thumbBorder') {
    ThumbClass = 'thumbBorder';
  }
  return (
    <div
      className={`relative  ${
        text ? 'flex flex-row justify-center' : `flex flex-col`
      } items-center`}
    >
      {value && (
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleSliderChange}
          className={`${ThumbClass} h-1 ${props.width}  ml-4 cursor-pointer  appearance-none rounded-full focus:outline-none`}
          style={{ background: calculateBackgroundColor(value) }}
        />
      )}

      {/* <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 0;
          height: 0;
        }
      `}</style> */}
    </div>
  );
};

export default WithoutProgress;
