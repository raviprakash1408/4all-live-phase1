import React from 'react';

const HoursSelect = () => {
  return (
    <div className="flex flex-row">
      {/* {task && ( */}
      {/* <div className="ml-4">
        <TimeSelect
          textColor="text-font-color"
          hour={items.hour}
          minutes1={items.minutes1}
          timePeriod1={items.timePeriod1}
          onChangeTime={items.onChangeTime}
        />
      </div>
      <span className="ml-3 mt-[22px] text-quaternary-color">-</span>
      <div className="ml-4">
        <TimeSelect
          textColor="text-font-color"
          hour={items.hour1}
          minutes1={items.minutes2}
          timePeriod1={items.timePeriod2}
          onChangeTime={items.onChangeTime}
        />
      </div>

      <div>
        {items.timeId === 1 ? (
          <button
            onClick={items.addButton}
            type="button"
            className="ml-4 mt-[18px] cursor-pointer"
          >
            <SettingsComponent
              content="+ Add hour"
              height="h-[39px]"
              width="w-28 "
              backgroundColor=""
              textsize={`text-base ml-[-25px] text-quaternary-color
                                           `}
            />
          </button>
        ) : (
          // />
          <button
            onClick={items.removeButton}
            type="button"
            className="ml-4 mt-[18px] cursor-pointer"
          >
            <SettingsComponent
              content="- Remove"
              height="h-[39px]"
              width="w-28 "
              backgroundColor=""
              textsize={`text-base ml-[-17px]
                   text-quaternary-color
                  `}
            />
          </button>
        )}
      </div> */}
      {/* <button
        onClick={item.removeButton}
        type="button"
        className="ml-4 mt-[18px] cursor-pointer"
      >
        <SettingsComponent
          content="- Remove"
          height="h-[39px]"
          width="w-28 "
          backgroundColor=""
          textsize={`text-base ml-[-17px]
                   text-quaternary-color
                  `}
        />
      </button> */}
    </div>
  );
};

export default HoursSelect;
