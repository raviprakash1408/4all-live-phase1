'use client';

import type { ToggleType } from './types';

const Toggle = (props: ToggleType) => {
  // const [isChecked, setIsChecked] = useState(props.button);
  // const { text } = props;
  // const handleToggle = () => {
  //   setIsChecked(!isChecked);
  // };

  return (
    <div
      onMouseEnter={props.onMouseEnter} // Add onMouseEnter prop
      onMouseLeave={props.onMouseLeave}
    >
      <label
        htmlFor={props.id}
        className="relative inline-flex cursor-pointer items-center"
      >
        <input
          onClick={() => {
            // setIsChecked(!isChecked);
            props.onClick();
          }}
          type="checkbox"
          checked={props.button}
          value=""
          id={props.id}
          className="peer sr-only"
          disabled={props.disabled}
          defaultChecked={props.button}
        />
        <div
          className={`${props.disabledColor} h-6 w-11 rounded-full border-2  border-solid border-quaternary-color bg-quaternary-color after:absolute  after:left-[6px] after:top-[4px] after:h-4 after:w-4 after:rounded-full after:bg-quaternary-color after:transition-all after:content-['']  peer-checked:border-none peer-checked:bg-[#00cdb8] peer-checked:after:translate-x-full peer-checked:after:border-none peer-checked:after:bg-white peer-focus:outline-none  dark:bg-primary-color `}
        />

        <div className="absolute">
          {props.button === true && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              className="m-auto ml-1 h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
        {props.text && (
          <>
            {props.textType === 'Enable' && (
              <label
                htmlFor={props.onClick}
                className="ml-2 select-none text-sm text-quaternary-color"
              >
                {props.button ? 'Enabled' : 'Disabled'}
              </label>
            )}
            {props.textType === 'On' && (
              <label
                htmlFor={props.onClick}
                className="ml-2 select-none text-sm text-quaternary-color"
              >
                {props.button ? 'On' : 'Off'}
              </label>
            )}
          </>
        )}
      </label>
    </div>
  );
};

export default Toggle;
