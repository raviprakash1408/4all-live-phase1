import React, { useEffect, useRef, useState } from 'react';

import CheckboxSort from './checkboxSort';

const data = [
  {
    id: 1,
    title: 'Show all columns',
  },
  {
    id: 2,
    title: 'Name',
  },
  {
    id: 3,
    title: 'Type',
  },
  {
    id: 4,
    title: 'Status',
  },
  {
    id: 5,
    title: 'Creation Date',
  },
  {
    id: 6,
    title: 'Completed Date',
  },
  {
    id: 7,
    title: 'Notification',
  },
];

const SortOptions = ({
  sortingCriterion,
  setCriterion,
  handleSort,
}: {
  sortingCriterion: any;
  setCriterion: any;
  handleSort: any;
}) => {
  const [value, setValue] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setValue(false);
      }
    };

    const handleEscapeKey = (event: any) => {
      if (event.key === 'Escape') {
        setValue(false);
      }
    };

    if (value) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [value]);

  const handleSortSelection = (id: number) => {
    setCriterion(id);
    setValue(false);
    handleSort(id);
    // console.log(sortingCriterion);
  };

  return (
    <div ref={popupRef}>
      {sortingCriterion ? '' : ''}

      <button
        type="button"
        onClick={() => {
          setValue(!value);
        }}
        className="relative  ml-3 text-xl font-extrabold text-quaternary-color"
      >
        ...
      </button>
      {value && (
        <div className="absolute right-0 top-12 z-10 h-[311px] w-56 select-none rounded-3xl bg-fifth-color">
          {data.map((item, index) => (
            <React.Fragment key={item.id}>
              <button
                type="button"
                className={`ml-5 ${item.id === 1 ? 'mb-4' : ''} mt-[14px] flex`}
                onClick={() => handleSortSelection(item.id)}
              >
                <CheckboxSort id={item.id} />
                <div className="ml-2 text-base text-quaternary-color">
                  {item.title}
                </div>
              </button>
              {index === 0 && <hr className=" border border-tertiary-color" />}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortOptions;
