'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import callApi from '@/utils/constants/apiCall';
import { MAIN_URL } from '@/utils/constants/apiUrls';

import { CurvedButton } from '../button/curvedButton';
import { RectangleButton } from '../button/rectanglebutton';
import SpaceGrid from '../CameraGrids';
import ConfirmationPopup from '../confirmation';
import { HalfCurvedButtons } from '../halfcurvedbuttons';
import IconComponentButton from '../IconComponentButton';
import Toast from '../Toast';
import LivefeedForm from './livefeed';

const LiveFeed = () => {
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [confirmationResponse, setConfirmationResponse] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [selectedItem, setSelectedItem] = useState<any>({
    id: null,
    name: null,
    input_url: null,
    preview_url: null,
    storage_path: null,
  });
  const [showForm, setShowForm] = useState('live settings');
  // const [isNewCameraCreated, setIsNewCameraCreated] = useState(false);
  const [isCameraDeleted, setIsCameraDeleted] = useState(false);
  const [newCamera, setNewCamera] = useState(false);
  const [cameraName, setCameraName] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [loading, setVideoLoading] = useState(false);
  const [parentAddCamera, setParentAddCamera] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [ResetButton, setResetButton] = useState(false); // Parent's reset state
  const [dataUpdate, setdDataUpdate] = useState(false);

  const segment = useSelectedLayoutSegment();
  useEffect(() => {
    if (segment === 'new') {
      setNewCamera(true);
    } else {
      setNewCamera(false);
    }
  }, [segment]);

  const handleTextSelect = (value: string) => {
    setCameraName(value);
  };

  // Function to receive reset value from LivefeedForm
  const handleResetFromChild = (resetValue: boolean) => {
    setResetButton(resetValue);
  };

  // Callback function to receive error1 value from LivefeedForm component
  const handleChildError = (childError: string) => {
    setUrlError(childError);
  };
  const handleNewLiveChange = (newLiveValue: boolean) => {
    // Do something with the newLiveValue in the parent component
    // For example, you can update a state variable with the new value
    // or perform any other desired action.
    if (newLiveValue === false) {
      setNewCamera(false);
    }
  };

  const handleAddCameraChange = (newAddCameraValue: boolean) => {
    setParentAddCamera(newAddCameraValue);
  };
  const handleParentLoading = (isLoading: boolean) => {
    setVideoLoading(isLoading);
  };
  useEffect(() => {
    if (parentAddCamera === true) {
      setNewCamera(false);
    }
  }, [parentAddCamera]);
  // const handleCameraCreation = (isNewCameraCreated1: boolean) => {
  //   setIsNewCameraCreated(isNewCameraCreated1);
  // };

  const handleFormButtonClick = () => {
    setShowForm('live settings');
  };

  const handlePresetsButtonClick = () => {
    setShowForm('Presets');
  };

  const handleTemplatesButtonClick = () => {
    setShowForm('Templates');
  };
  const handleItemSelected = (
    id: number | null | undefined,
    name?: string | undefined | null,
    input_url?: string | undefined | null,
    preview_url?: string | undefined | null,
    storage_path?: string | undefined | null
  ) => {
    setSelectedItem({ id, name, input_url, preview_url, storage_path });
  };
  const handleDelete = async () => {
    setShowConfirmationDialog(true);
  };
  const handleConfirmation = async (confirmed: boolean) => {
    setConfirmationResponse(confirmed);
    if (confirmed) {
      try {
        await callApi<void>(`${MAIN_URL}cameras/${selectedItem.id}`, 'DELETE');
        setShowToast(true);
        setIsCameraDeleted(!isCameraDeleted);
        console.log('Object deleted successfully');
        setSelectedItem({ id: null });
      } catch (error) {
        console.error('API request error:', error);
      }
    }

    setShowConfirmationDialog(false);
  };
  const handleToastClose = () => {
    setShowToast(false);
  };
  useEffect(() => {
    if (newCamera) {
      setSelectedItem((prevSelectedItem: any) => ({
        ...prevSelectedItem,
        id: null,
      }));
    }
  }, [newCamera]);
  const dataUpdated = (value: boolean) => {
    setdDataUpdate(value);
  };
  // console.log("newLive",newCamera);
  // console.log("selectedId",selectedItem.id);
  // let Slug
  // if(newCamera===true){
  //   Slug=`/offline/livefeed/new`
  // }
  // else if(selectedItem.id===null){
  //   Slug=`/offline/livefeed/`
  // }
  // else if(selectedItem.id!==null && !newCamera){
  //   Slug=`/offline/livefeed/${selectedItem.name}`
  // }

  return (
    <div className="z-0 select-none px-2">
      <div className="mb-[5px] mt-[25px] flex gap-5">
        {confirmationResponse ? '' : ''}
        <div className="no-underline">
          <Link
            className={`no-underline ${newCamera ? 'hidden' : ''}`}
            href={
              newCamera === true
                ? `/offline/livefeed/`
                : '/offline/livefeed/new'
            }
          >
            <div className="no-underline">
              <button
                type="button"
                onClick={() => {
                  setNewCamera(!newCamera);
                  // if (newCamera) {
                  //   router.push('/your-current-page-path/new');
                  // } else {
                  //   router.push('/your-current-page-path');
                  // }
                }}
                className="ml-4"
              >
                <HalfCurvedButtons
                  content="New Live Feed"
                  height="min-[400px]:h-8 min-[1600px]:h-9"
                  width="w-44"
                  image="/assets/icons/icon10.svg"
                  backgroundColor="bg-tertiary-color"
                  halfCurved={false}
                  textcolor="text-quaternary-color hover:border-quaternary-color"
                  textsize="text-sm"
                />
              </button>
            </div>
          </Link>
        </div>

        {/* <NewCamera onCameraCreated={handleCameraCreation} /> */}
        <IconComponentButton />
        <button
          type="button"
          disabled={selectedItem.id === null}
          onClick={handleDelete}
          className={`${
            selectedItem.id === null ? 'pointer-events-none' : ''
          } relative mt-[-2px] w-[141px] rounded-full border-2 border-primary-color`}
        >
          <CurvedButton
            backgroundColor={`${
              selectedItem.null
                ? 'pointer-events-none'
                : 'hover:border-quaternary-color bg-tertiary-color'
            } `}
            height="min-[400px]:h-8 min-[1600px]:h-9 "
          >
            <div className=" flex">
              <Image
                width={15}
                height={15}
                src="/assets/icons/icon25.svg"
                alt=""
                className="absolute left-[15px] top-2"
              />
              <div className="ml-5 mt-[1px] text-sm text-quaternary-color ">
                Delete
              </div>
            </div>
          </CurvedButton>
        </button>
        {/* <div className="absolute right-0 -mt-2 ml-96 flex">
          <button
            type="button"
            className="mr-4  mt-4 h-12 w-12 cursor-pointer rounded-full border-2 border-solid border-tertiary-color"
          >
            <Image
              width={19}
              height={19}
              src="/assets/icons/icon11.svg"
              alt=""
              className="ml-[12px] mt-[4px]  object-cover"
            />
          </button>
          <button
            type="button"
            className="mr-8 mt-4 h-12 w-12 cursor-pointer rounded-full border-2 border-solid border-tertiary-color"
          >
            <Image
              width={19}
              height={19}
              src="/assets/icons/icon12.svg"
              alt=""
              className="ml-[12px] mt-[4px]  object-cover"
            />
          </button>
        </div> */}
      </div>

      <div className="flex-row">
        <SpaceGrid
          deleteButton={isCameraDeleted}
          saveButton={parentAddCamera}
          type="livefeeds"
          onItemSelected={handleItemSelected}
          name={cameraName}
          videoUrl={inputTitle}
          newLiveFeed={newCamera}
          loading={loading}
          validUrl={urlError}
          resetButton={ResetButton}
          dataUpdate={dataUpdate}
          // selectedId={selectedItem?.id}
        />

        <div className="mt-4 flex ">
          <button
            type="button"
            onClick={handleFormButtonClick}
            className={` ml-4 flex items-center ${
              showForm ? 'live settings' : ''
            }`}
          >
            <RectangleButton
              height="min-[400px]:h-9 min-[1600px]:h-10"
              backgroundColor={
                showForm === 'live settings'
                  ? 'bg-secondary-color text-font-color'
                  : 'bg-tertiary-color text-quaternary-color'
              }
              topCurved
              curveType="left"
            >
              <div className="flex items-center px-4">
                <Image
                  width={24}
                  height={19}
                  src="/assets/icons/Groupsettings.svg"
                  alt=""
                  className={
                    showForm === 'live settings'
                      ? 'brightness-[2] grayscale'
                      : ''
                  }
                />
              </div>
              <div className="pl-1 pr-12 text-base sm:text-xs lg:text-base">
                Live settings
              </div>
            </RectangleButton>
          </button>
          <button
            type="button"
            onClick={handlePresetsButtonClick}
            className={`ml-0.5 flex items-center ${showForm ? 'active' : ''}`}
          >
            <RectangleButton
              height="min-[400px]:h-9 min-[1600px]:h-10"
              backgroundColor={
                showForm === 'Presets'
                  ? 'bg-secondary-color text-font-color'
                  : 'bg-tertiary-color text-quaternary-color'
              }
              topCurved={false}
            >
              <div className="flex items-center px-4">
                <Image
                  width={21}
                  height={24}
                  src="/assets/icons/icon14.svg"
                  alt=""
                  className={
                    showForm === 'Presets' ? 'brightness-[2] grayscale' : ''
                  }
                />
              </div>
              <div className="pl-2 pr-8 text-base sm:text-xs lg:text-base">
                Presets
              </div>
            </RectangleButton>
          </button>
          <button
            type="button"
            onClick={handleTemplatesButtonClick}
            className={`ml-0.5 flex items-center ${showForm ? 'active' : ''} `}
          >
            <RectangleButton
              height="min-[400px]:h-9 min-[1600px]:h-10"
              backgroundColor={
                showForm === 'Templates'
                  ? 'bg-secondary-color text-font-color'
                  : 'bg-tertiary-color text-quaternary-color'
              }
              topCurved
              curveType="right"
            >
              <div className="flex items-center px-4 ">
                <Image
                  width={21}
                  height={22}
                  src="/assets/icons/icon15.svg"
                  alt=""
                  className={
                    showForm === 'Templates' ? 'brightness-[2] grayscale' : ''
                  }
                />
              </div>
              <div className="pl-1 pr-12 text-base sm:text-xs lg:text-base">
                Templates
              </div>
            </RectangleButton>
          </button>
        </div>
        <div className="">
          {showForm === 'live settings' ? (
            <LivefeedForm
              key=""
              name=""
              newCamera={newCamera}
              input_type=""
              setInputTitle={setInputTitle} // Pass the setInputTitle function as prop
              setCameraName={handleTextSelect}
              onLoadingChange={handleParentLoading}
              storage_path={selectedItem.storage_path}
              onDataUpdated={dataUpdated}
              id={selectedItem?.id}
              onSelectedIdChange={handleItemSelected}
              deviceName={selectedItem.name ? selectedItem.name : ''}
              input_url={selectedItem.input_url ? selectedItem.input_url : ''}
              preview_url={
                selectedItem.preview_url ? selectedItem.preview_url : ''
              }
              addCamera={parentAddCamera}
              setAddCamera={handleAddCameraChange}
              onNewLiveChange={handleNewLiveChange}
              onErrorChange={handleChildError}
              onResetFromChild={handleResetFromChild}
            />
          ) : (
            <p className="mx-4 flex  h-[37vh] w-[81vw] items-center justify-center rounded-lg border-2 border-tertiary-color text-base text-quaternary-color">
              Pages
            </p>
          )}
        </div>
        <div className="mb-2 flex justify-center">
          {showConfirmationDialog && (
            <ConfirmationPopup
              title={`Are you sure you want to delete the ${selectedItem.name}?`}
              onConfirmation={handleConfirmation}
            />
          )}
        </div>
      </div>
      {showToast && (
        <Toast
          type="success"
          heading="Camera deleted"
          message="Camera has been deleted successfully!"
          onClose={handleToastClose}
        />
      )}
    </div>
  );
};
export default LiveFeed;
