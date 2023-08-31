import type { CheckBoxTypes } from './types';

const Checkbox = (props: CheckBoxTypes) => {
  const handleCheckboxChange = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <div
      onMouseEnter={props.onMouseEnter} // Add onMouseEnter prop
      onMouseLeave={props.onMouseLeave}
    >
      {props.type === 'Square' && (
        <div>
          <label
            htmlFor={props.id}
            className="flex cursor-pointer items-center space-x-2"
          >
            <input
              type="checkbox"
              className="hidden"
              checked={props.button}
              defaultChecked={props.button} // Set the defaultChecked attribute
              id={props.id}
              onChange={handleCheckboxChange}
            />
            <span
              className={`flex h-5 w-5 items-center justify-center rounded border-2 border-solid border-font-color ${props.backgroundColor}`}
            >
              {props.button === true && (
                <span className="h-2 w-2 bg-secondary-color" />
              )}
            </span>
          </label>
        </div>
      )}

      {props.type === 'Circle' && (
        <label
          htmlFor={props.id}
          className="flex cursor-pointer items-center space-x-2"
        >
          <input
            type="checkbox"
            className="hidden"
            checked={props.button}
            defaultChecked={props.button} // Set the defaultChecked attribute
            id={props.id}
            onChange={handleCheckboxChange}
          />
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 border-solid border-quaternary-color ${props.backgroundColor} p-[3px]`}
          >
            {props.button && (
              <span className="h-2 w-2 rounded-full bg-secondary-color" />
            )}
          </span>
        </label>
      )}
    </div>
  );
};

export default Checkbox;
