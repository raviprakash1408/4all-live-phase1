/* eslint-disable no-console */

'use client';

import React, { useEffect, useState } from 'react';

import Checkbox from '../checkbox/checkbox';
import ListView from './ListView';
import type { TaskTypes } from './types';

const CameraList: TaskTypes[] = [
  {
    id: 1,
    title: 'Voluptatem ut asperiores',
    startDate: '31/08/2023',
    endDate: '31/08/2023',
    language: 'En',
  },
  {
    id: 2,
    title: 'Voluptatem ut asperiores',
    startDate: '31/08/2023',
    endDate: '31/08/2023',
    language: 'En',
  },
  {
    id: 3,
    title: 'Voluptatem ut asperiores',
    startDate: '31/08/2023',
    endDate: '31/08/2023',
    language: 'En',
  },
  {
    id: 4,
    title: 'Voluptatem ut asperiores',
    startDate: '31/08/2023',
    endDate: '31/08/2023',
    language: 'En',
  },
  {
    id: 5,
    title: 'Voluptatem ut asperiores',
    startDate: '31/08/2023',
    endDate: '31/08/2023',
    language: 'En',
  },
];
const Tasks = () => {
  const [checkbox, setCheckbox] = useState(false);
  const [sortedData, setSortedData] = useState(CameraList);
  const [sortingCriterion, setSortingCriterion] = useState(null);
  // const [items, setItems] = useState([...]);
  const [selectedId, setSelectedId] = useState(0);
  const [deleteButton, setDeleteButton] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedIdForDelete, setSelectedIdForDelete] = useState(null);
  // Update the status of an item to "Cancelled"
  // const handleStatusUpdate = (itemId: number) => {
  //   setSortedData((prevData: any) => {
  //     return prevData.map((item: any) => {
  //       if (item.id === itemId) {
  //         const updatedItem = { ...item, status: 'Cancelling' };
  //         setTimeout(() => {
  //           const finalUpdatedItems = prevData.map((dataItem: any) =>
  //             dataItem.id === itemId
  //               ? { ...dataItem, status: 'Cancelled' }
  //               : dataItem
  //           );
  //           setSortedData(finalUpdatedItems);
  //         }, 1000); // 1000 milliseconds = 1 second
  //         return updatedItem;
  //       }
  //       return item;
  //     });
  //   });
  // };

  useEffect(() => {
    if (selectedId === 0) {
      setDeleteButton(true);
    } else {
      setDeleteButton(false);
    }
  }, [selectedId]);

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    // Prevent the default scroll behavior
    event.preventDefault();

    // Calculate the new scroll position based on the mouse wheel delta
    const scrollDelta = event.deltaY;
    const scrollAmount = 80; // Adjust this value to control the scrolling speed
    const scrollableContent = event.currentTarget;
    scrollableContent.scrollLeft +=
      scrollDelta > 0 ? scrollAmount : -scrollAmount;
  };

  const handleClickedItem = (item: number) => {
    console.log('item.id', item, selectedIdForDelete);
    setSelectedId(item);
  };
  console.log('sortedDataListView', selectedId);

  return (
    <div className="select-none">
      <div
        className="custom-scrollbar h-screen overflow-x-auto overflow-y-hidden"
        onWheel={handleScroll}
      >
        <div className="relative ml-5 mt-4 flex h-[70px] w-[91vw] items-center rounded-3xl  bg-primary-color ">
          <div className="ml-2 mt-1">
            <Checkbox
              backgroundColor=""
              id="Tasks"
              type="Square"
              button={checkbox}
              onClick={() => {
                setCheckbox(!checkbox);
              }}
            />
          </div>
          <div className="ml-24 mt-2  text-base font-medium text-font-color">
            Event
          </div>
          <div className="ml-[24rem] mt-2 text-base font-medium text-font-color">
            Start Date
          </div>
          <div className="ml-32 mt-2 text-base font-medium text-font-color">
            End Date
          </div>
          <div className="ml-32 mt-2 whitespace-nowrap text-base font-medium text-font-color">
            Download Transcript
          </div>
          <div className="ml-32 mt-2 whitespace-nowrap text-base font-medium text-font-color">
            Language
          </div>
        </div>
        {sortedData.length === 0 ? (
          <div className="flex h-[78vh] select-none items-center justify-center text-sm text-font-color">
            No Task Available Right Now
          </div>
        ) : (
          <div className="mb-4">
            {sortedData.map((item: any) => {
              console.log('itemsefdf', sortedData);

              return (
                <div key={item.id}>
                  <ListView
                    item={item}
                    checkbox1={checkbox}
                    onItemSelect={handleClickedItem}
                    // onDelete={handleStatusUpdate}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
