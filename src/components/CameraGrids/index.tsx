import Image from 'next/image';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { useEffect, useReducer, useState } from 'react';

import { getStreamIdFromRtspUrl } from '@/utils/common';
import callApi from '@/utils/constants/apiCall';
import { CAMERA_LIST, MAIN_URL } from '@/utils/constants/apiUrls';

import CheckboxTick from '../checkboxtick';
import ReactPlayers from '../reactPLayer';
import type { Camera, SpaceGridType } from './type';

type DataState = {
  data: SpaceGridType[];
};
const initialState = {
  data: [], // Initialize with an empty array
};

const dataReducer = (state: DataState, action: any) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
const CameraGrids = (props: Camera) => {
  // const [data, setData] = useState<SpaceGridType[]>([]);
  const [data, dispatch] = useReducer(dataReducer, initialState);
  // const [url, setUrl] = useState('');
  // const [streamId] = useState('');
  const [error1] = useState('');
  const segment = useSelectedLayoutSegment();
  // const router = useRouter();

  // useEffect(() => {
  //   // console.log(segment);
  //   console.log('bjsdjs', segment);

  //   // if (segment === 'new') {
  //   //   setNewCamera(true);
  //   // } else {
  //   //   setNewCamera(false);
  //   // }
  // }, [segment]);

  const [videoLoading, setVideoLoading] = useState(props.loading);
  const [newCameraName, setNewCameraName] = useState<string | undefined>('');
  const [selectedId, setSelectedId] = useState<SpaceGridType | null>({
    id: null,
    name: null,
    input_url: null,
    preview_url: null,
    storage_path: null,
    slug: null,
  });
  const router = useRouter();

  // useEffect(()=>{
  // if(segme)
  // },[segment])
  useEffect(() => {
    if (props.validUrl === 'error') {
      setVideoLoading(false);
    }
  }, [props.validUrl]);
  useEffect(() => {
    if (props.newLiveFeed === false) {
      setNewCameraName('');
      // setUrl('');
    }
  }, [props.newLiveFeed]);
  useEffect(() => {
    if (props.name !== '') {
      setNewCameraName(props.name);
    } else {
      setNewCameraName('');
    }
  }, [props.name]);
  useEffect(() => {
    if (props.resetButton) {
      setNewCameraName('');
    }
  }, [props.resetButton]);

  const fetchData = async () => {
    try {
      const jsonData = await callApi<any>(`${MAIN_URL}${CAMERA_LIST}`, 'GET');
      dispatch({ type: 'SET_DATA', payload: jsonData });
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  useEffect(() => {
    fetchData();

    if (
      props.saveButton === true ||
      props.deleteButton === true ||
      props.dataUpdate === true
    ) {
      fetchData();
    }
  }, [props.saveButton, props.deleteButton, props.dataUpdate]);

  // console.log("APIDATA",data,props.saveButton);

  const handleItemSelected = (
    id: number | null | undefined,
    name: string | null | undefined,
    input_url: string | null | undefined,
    preview_url: string | null | undefined,
    storage_path: string | null | undefined,
    slug: string | null | undefined
  ) => {
    setSelectedId((prevSelectedId) => {
      if (prevSelectedId && prevSelectedId.id === id && props.onItemSelected) {
        props.onItemSelected(null, null, null, null, null);
        // If the selected item's ID matches the current item's ID, navigate to /offline/livefeed/
        router.push('/offline/livefeed/');
        return null;
      }
      if (props.onItemSelected) {
        props.onItemSelected(
          id,
          name,
          input_url,
          preview_url,
          storage_path,
          slug
        );
        if (prevSelectedId?.id !== id) {
          // If the selected item's ID is different, perform actions before navigating
          // ...
        }
        router.push(`/offline/livefeed/${slug}`);
        return {
          id,
          name,
          input_url,
          preview_url,
          storage_path,
        };
      }
      return prevSelectedId;
    });
  };
  console.log('selectedId', segment);
  console.log('selectedId', window.location.href);

  useEffect(() => {
    const currentUrl = window.location.href;
    const foundSegment = data.data.find(
      (item: SpaceGridType) => item.slug === segment
    );

    if (currentUrl.includes('/offline/livefeed/') && segment === null) {
      router.push('/offline/livefeed/');
      return;
    }
    if (
      currentUrl.includes('/offline/livefeed/') &&
      !foundSegment &&
      segment !== 'new'
    ) {
      router.push('/404');
      return;
    }

    if (foundSegment) {
      setSelectedId({
        id: foundSegment.id,
        name: foundSegment.name,
        input_url: foundSegment.input_url,
        preview_url: foundSegment.preview_url,
        storage_path: foundSegment.storage_path,
        slug: foundSegment.slug,
      });

      // Call the props.onItemSelected function with the selectedId data
      if (props.onItemSelected) {
        props.onItemSelected(
          foundSegment.id,
          foundSegment.name,
          foundSegment.input_url,
          foundSegment.preview_url,
          foundSegment.storage_path
        );
      }
    }
  }, [data.data, segment]);
  useEffect(() => {
    setVideoLoading(props.loading);
  }, [props.loading]);
  useEffect(() => {
    if (props.newLiveFeed === true) {
      setVideoLoading(false);
    }
  }, [props.newLiveFeed]);
  // useEffect(() => {
  //   if (props.videoUrl === '') {
  //     setUrl('');
  //   } else if (props.videoUrl !== '') {
  //     setUrl(`${props.videoUrl}`);
  //   }
  // }, [props.videoUrl]);

  // console.log("streamId", url, props.videoUrl);

  // console.log("streamId",Url,props.videoUrl);
  // console.log('videoUrl', props.videoUrl);
  //   useEffect(()=>{
  // if(props.videoUrl){
  //   setUrl(props.videoUrl)
  // }
  //   },[props.videoUrl])
  useEffect(() => {
    if (props.dataUpdate === true) {
      setSelectedId(null);
    }
  }, [props.dataUpdate]);
  useEffect(() => {
    if (props.newLiveFeed === true) {
      setSelectedId(null);
    }
  }, [props.newLiveFeed]);
  // console.log(segment, data.data, selectedId, 'segment');

  return (
    <div
      className={`${props.newLiveFeed ? '' : ''} ${
        props.type === 'livefeeds'
          ? `custom-scrollbar ml-4 flex overflow-x-auto  overflow-y-hidden sm:gap-4 md:gap-4 lg:gap-4 xl:gap-8`
          : ' grid grid-cols-3  grid-rows-1 gap-5'
      }`}
    >
      {error1 ? '' : ''}
      {props.newLiveFeed && (
        <button
          type="button"
          className={`w-3-minus-20 relative shrink-0
                
            `}
        >
          {(props.validUrl === 'error' || props.validUrl === '') &&
            !videoLoading && (
              // Show loading indicator or placeholder
              <ReactPlayers
                width="w-[27vw]"
                height="h-[26.4vh]"
                validUrl=""
                streamUrl=""
                // loading={videoLoading}
              />
            )}
          {(props.validUrl === 'success' || videoLoading) && (
            <div className="">
              <ReactPlayers
                width="w-[27vw]"
                height="h-[26.7vh]"
                validUrl={props.videoUrl}
                streamUrl={`${props.videoUrl}/index.m3u8`}
                loading={videoLoading}
              />
            </div>
          )}
          <div
            className={`absolute top-3 ml-4 flex h-8  ${
              props.name === '' ? 'w-[7vw]' : 'w-min'
            } items-center rounded-lg bg-tertiary-color`}
          >
            <div className="ml-2 flex items-center whitespace-nowrap rounded-xl pr-2 text-base text-font-color">
              <span className="max-w-[22vw] shrink-0 overflow-hidden">
                {newCameraName}
              </span>
              <span className="ml-2 items-center text-base text-quaternary-color" />
            </div>
          </div>
        </button>
      )}
      {!props.newLiveFeed &&
        data.data.map((item: SpaceGridType) => (
          <div className="no-underline" key={item.id}>
            {/* <Link
              className="no-underline"
              href={
                item.name
                  ? `/offline/livefeed/${item.name}`
                  : `/offline/livefeed/`
              }
            > */}
            <div className="no-underline">
              <button
                disabled={props.newLiveFeed}
                key={item.id}
                type="button"
                onClick={() =>
                  handleItemSelected(
                    item.id,
                    item.name,
                    item.input_url,
                    item.preview_url,
                    item.storage_path,
                    item.slug
                  )
                }
                className={` ${
                  props.type === 'livefeeds'
                    ? 'w-3-minus-20 relative shrink-0'
                    : 'relative'
                }`}
              >
                {/* <img
            src="/assets/images/spaceship.png"
            alt=""
            className={`w-full rounded-2xl border-2 hover:border-secondary-color ${
              selectedId?.id === item.id
                ? 'border-secondary-color'
                : 'border-primary-color'
            }`}
          /> */}
                {/* <div  className={`w-full rounded-2xl border-2 hover:border-secondary-color ${
              selectedId?.id === item.id
                ? 'border-secondary-color'
                : 'border-primary-color'
            }`}> */}
                <ReactPlayers
                  streamUrl={`${item.playable_preview_url}/index.m3u8`}
                  width="w-[27vw]"
                  height="h-[26.7vh]"
                  borderColor={`border-2 hover:border-secondary-color
             ${
               selectedId?.id === item.id && !props.newLiveFeed
                 ? 'border-secondary-color'
                 : 'border-tertiary-color'
             }`}
                  validUrl={getStreamIdFromRtspUrl(item?.input_url) || ''}
                />
                {/* <VideoPlayer
            streamUrl={`${VIDEOJS_PLAYER}${getStreamIdFromRtspUrl(
              item?.rtsp_url
            )}/index.m3u8`}
            width="27vw"
            height="27vh"
            borderColor={`border-2 hover:border-secondary-color
             ${
               selectedId?.id === item.id
                 ? 'border-secondary-color'
                 : 'border-primary-color'
             }`}
            validUrl={getStreamIdFromRtspUrl(item?.rtsp_url) || ''}
          /> */}
                {/* </div> */}
                {/* <Image
            width={24}
            height={0}
            src="/assets/icons/ZoomOut.svg"
            alt=""
            className="absolute bottom-1 right-[14px] ml-20 h-auto rounded-lg bg-tertiary-color p-1"
          /> */}
                <div className="absolute top-3 ml-4 flex h-8 min-w-min items-center rounded-lg bg-tertiary-color pr-[17px]">
                  {selectedId?.id === item.id && (
                    <div>
                      <div>
                        <CheckboxTick
                          backgroundColor="bg-transparent"
                          secondaryColor="text-secondary-color"
                        />
                      </div>
                    </div>
                  )}
                  <Image
                    width={0}
                    height={20}
                    src="/assets/icons/Video.svg"
                    className="ml-2 mt-0  w-auto"
                    alt=""
                  />
                  <div className="ml-2 flex items-center whitespace-nowrap rounded-xl pr-2 text-base text-font-color sm:text-xs lg:text-base">
                    <span className="max-w-[22vw] shrink-0 overflow-hidden">
                      {item.name}
                    </span>
                    <span className="ml-2 items-center text-base text-quaternary-color" />
                  </div>
                </div>
                {selectedId?.id === item.id && (
                  <div className="absolute left-[17vw] top-3 flex h-6 w-20 items-center rounded-2xl bg-tertiary-color px-2 sm:-right-2 lg:right-2 xl:left-[19vw] 2xl:left-[21vw]">
                    <div className="h-2 w-2 rounded-full bg-[#FF1759] px-1 " />
                    <div className="px-4 text-[#E1E7EA] sm:text-xs lg:text-base">
                      Live
                    </div>
                  </div>
                )}
              </button>
            </div>
            {/* </Link> */}
          </div>
        ))}
    </div>
  );
};

export default CameraGrids;
