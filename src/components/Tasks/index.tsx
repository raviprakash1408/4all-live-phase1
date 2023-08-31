/* eslint-disable no-console */

'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import callApi from '@/utils/constants/apiCall';
import { MAIN_URL, TASK_LIST } from '@/utils/constants/apiUrls';

import { CurvedButton } from '../button/curvedButton';
import Checkbox from '../checkbox/checkbox';
import ConfirmationPopup from '../confirmation';
import SortOptions from '../sortOptions/sortOptions';
import NewTaskCreate from './CreateTask';
import ListView from './ListView';
import type { TaskTypes } from './types';

const CameraList: TaskTypes[] = [];
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
    const fetchData = async () => {
      try {
        const jsonData = await callApi<any>(`${MAIN_URL}${TASK_LIST}`, 'GET');
        setSortedData(jsonData);
      } catch (error) {
        console.error('API request error:', error);
      }
    };

    // Fetch data immediately on mount
    fetchData();

    // Set up the interval and store the interval ID
    const fetchInterval = setInterval(fetchData, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(fetchInterval);
    };
  }, []);
  useEffect(() => {
    if (selectedId === 0) {
      setDeleteButton(true);
    } else {
      setDeleteButton(false);
    }
  }, [selectedId]);
  const handleSort = (id: number) => {
    if (id === 2) {
      // Sort based on Name criterion
      const sortedData1 = [...CameraList].sort((a, b) => {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      // Update the sorted data in the component state or use it as needed
      setSortedData(sortedData1);
    }
    // Implement sorting logic based on the selected checkbox (id)
    // Update the data array or fetch sorted data from an API
    // Assign the sorted data to a new state variable
    // Example:
    // const sortedData = ... // Implement sorting logic
    // setSortedData(sortedData);
  };
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

  const addTaskToList = (newTask: TaskTypes) => {
    setSortedData([...sortedData, newTask]);
  };
  const handleClickedItem = (item: number) => {
    console.log('item.id', item, selectedIdForDelete);
    setSelectedId(item);
  };
  console.log('sortedDataListView', selectedId);

  const handleDeleteSelected = (confirmed: any) => {
    if (confirmed) {
      const updatedData = sortedData.filter(
        (item: TaskTypes) => item.id !== selectedId
      );
      setSortedData(updatedData);
      setSelectedIdForDelete(null);
      setDeleteButton(true);
    }
    setShowConfirmation(false);
  };
  return (
    <div className="select-none">
      <div className="flex">
        <NewTaskCreate addTask={addTaskToList} sortedData={sortedData} />
        <button
          type="button"
          disabled={deleteButton}
          onClick={() => setShowConfirmation(true)}
          className="ml-4 mt-[14px] rounded-full border-2 border-primary-color hover:border-quaternary-color"
        >
          <CurvedButton
            backgroundColor="bg-tertiary-color"
            height="min-[400px]:h-8 min-[1600px]:h-9"
          >
            <div className="flex">
              <Image
                width={0}
                height={0}
                src="/assets/icons/icon25.svg"
                alt=""
                className="h-auto w-auto px-[0.5vw]"
              />
              <div className="px-[0.5vw] py-[0.8vh] text-sm text-quaternary-color">
                Delete
              </div>
            </div>
          </CurvedButton>
        </button>
        {showConfirmation && (
          <ConfirmationPopup
            title="Are you sure you want to delete the this task?"
            onConfirmation={handleDeleteSelected}
          />
        )}
      </div>
      <div
        className="custom-scrollbar h-screen overflow-x-auto overflow-y-hidden"
        onWheel={handleScroll}
      >
        <div className="relative ml-5 mt-4 flex h-10 w-[101rem] rounded-full bg-tertiary-color ">
          <div className="ml-2 mt-2.5">
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
          <div className="ml-24 mt-2 text-base font-medium text-quaternary-color">
            Name
          </div>
          <div className="ml-44 mt-2 text-base font-medium text-quaternary-color">
            Type
          </div>
          <div className="ml-48 mt-2 text-base font-medium text-quaternary-color">
            Status
          </div>
          <div className="ml-72 mt-2 whitespace-nowrap text-base font-medium text-quaternary-color">
            Creation Date
          </div>
          <div className="ml-24 mt-2 whitespace-nowrap text-base font-medium text-quaternary-color">
            Completed Date
          </div>
          <div className="ml-28 mt-2 text-base font-medium text-quaternary-color">
            Notification
          </div>
          <div className="ml-12 mt-2 text-base font-medium text-quaternary-color">
            Actions
          </div>
          <SortOptions
            sortingCriterion={sortingCriterion}
            setCriterion={setSortingCriterion}
            handleSort={handleSort}
          />
        </div>
        {sortedData.length === 0 ? (
          <div className="flex h-[78vh] select-none items-center justify-center text-sm text-quaternary-color">
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
