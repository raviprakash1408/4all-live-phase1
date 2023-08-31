'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import FolderGrid from '@/components/folderGrid';
import GridComponent from '@/components/MediaContentCard/GridComponent';
import callApi from '@/utils/constants/apiCall';
import {
  GET_FILES_URL,
  GET_FOLDER_URL,
  MAIN_URL,
} from '@/utils/constants/apiUrls';

import Arrow from '../arrow/arrow';
import ContextMenu from '../contextMenu';
import FolderGridLoading from '../folderGrid/folderGridLoading';
import InputField from '../input field/InputField';
import { SmallGrid } from '../smallgrid';
import VideoPreview from '../Tasks/videoPreview';
import Toggle from '../toggle button/toggle';
import BackButton from './backButton';
import Breadcrumbs from './breadCrumbs';

interface FolderData {
  [key: string]: FileData | FolderData;
}

interface FileData {
  name: string;
  path: string;
}

const fileCategoryData = [
  {
    name: 'All Files',
    img: `/assets/icons/AllFiles.svg`,
    subImage: `/assets/icons/icon1.svg`,
    url: 'all',
    selected: true as boolean, // Add type annotation here
  },
  {
    name: 'Folders',
    img: `/assets/icons/folder-large.svg`,
    subImage: `/assets/icons/icon1.svg`,
    url: 'folders',
    selected: true as boolean, // Add type annotation here
  },
  {
    name: 'M3u8',
    img: `/assets/icons/Media.svg`,
    subImage: `/assets/icons/switch_team.svg`,
    url: 'm3u8',
    selected: true as boolean, // Add type annotation here
  },
  {
    name: 'M4s',
    img: `/assets/icons/Media.svg`,
    subImage: `/assets/icons/switch_team.svg`,
    url: 'm4s',
    selected: true as boolean, // Add type annotation here
  },
  {
    name: 'Mp4',
    img: `/assets/icons/Media.svg`,
    subImage: `/assets/icons/switch_team.svg`,
    url: 'mp4',
    selected: true as boolean, // Add type annotation here
  },
];

const FileManager = () => {
  const [folderData, setFolderData] = useState<any>({});
  const [clickedFolderName, setClickedFolderName] = useState<string | null>(
    null
  );
  const [mode, setmode] = useState('grid');
  const [category, setCategory] = useState<
    {
      name: string;
      img: string;
      subImage: string;
      url: string;
      selected: boolean;
    }[]
  >(fileCategoryData);
  const [checked, setchecked] = useState(true);
  const [isOpen] = useState(false);
  const [isOpen1] = useState(true);
  const [pageWidth, setPageWidth] = useState('');
  const [currentFolderData, setCurrentFolderData] = useState<FolderData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState('All Files');
  // const [lastFetchedTimestamp, setLastFetchedTimestamp] = useState<number>(0);
  const [currentFolderPath, setCurrentFolderPath] = useState<string>('');
  // const [shouldRefresh, setShouldRefresh] = useState<boolean>(false);
  const [breadCrumbsPath, setBreadCrumbsPath] = useState('');
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [isFileContextMenuVisible, setIsFileContextMenuVisible] =
    useState(false);
  const [fileContextMenuPosition, setFileContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedFolderName, setSelectedFolderName] = useState('');
  const [contextFileData, setContextFileData] = useState<FileData | null>(null);
  const [playVideo, setPLayVideo] = useState(false);
  // const [videoPlayUrl,setVideoPlayUrl]=useState<FileData|null>();

  // console.log('contextFileLog', contextFileData);

  const handleContextMenu = (event: React.MouseEvent, folderName: string) => {
    event.preventDefault();
    const position = { x: event.clientX, y: event.clientY };
    setContextMenuPosition(position);
    setSelectedFolderName(folderName);
    setIsContextMenuVisible(true);
  };
  const handleFileContextMenu = (
    event: React.MouseEvent,
    fileData: FileData
  ) => {
    event.preventDefault();
    const position = { x: event.clientX, y: event.clientY };
    setFileContextMenuPosition(position);
    setContextFileData(fileData || '');
    setIsFileContextMenuVisible(true);
  };

  const handleContextFileClick = (optionValue: string) => {
    // Handle selected option
    if (optionValue === 'Play') {
      setSelectedOption(optionValue);
      setPLayVideo(true);

      // Simulate opening the folder
    }
    if (optionValue === 'Stop') {
      setSelectedOption(optionValue);
    }
    // Handle other options as needed
    // ...
  };

  const handleFolderClick = (
    folderName: string,
    folderData1?: FolderData | undefined
  ) => {
    setClickedFolderName(folderName);
    setCurrentFolderData(folderData1 || {});
    // setShouldRefresh(true);
    setCurrentFolderPath((prevPath) =>
      prevPath === '' ? folderName : `${prevPath}/${folderName}`
    );
    // Reset last fetched timestamp to fetch all new data within the folder
    // setLastFetchedTimestamp(0);

    // Toggle the selected property for the clicked category
    setCategory((prevCategories) =>
      prevCategories.map((cat) => ({
        ...cat,
        selected: cat.url === folderName ? !cat.selected : cat.selected,
      }))
    );
    console.log('handleClick', selectedOption);
  };
  const handleClickFile = (fileData: FileData) => {
    setContextFileData(fileData);
    // setVideoPlayUrl(`${MAIN_URL}get_file${contextFileData?.path}`)
    // setVideoPlayUrl(fileData);
    // setVideoPlayUrl({
    //   url: `${MAIN_URL}get_file${contextFileData?.path}`,
    //   title: {contextFileData?.name}
    // });

    // Do something with the selected file data, such as displaying it in a modal
    // You can use the state variable `selectedFile` to access the selected file data
  };

  useEffect(() => {
    setBreadCrumbsPath(currentFolderPath);
  }, [currentFolderPath]);
  // const fetchData = async () => {
  //   try {
  //     // setLoading(true);

  //     const jsonData = await callApi<any>(
  //       `${MAIN_URL}${GET_FOLDER_URL}`,
  //       'GET'
  //     );
  //     setCurrentFolderData(jsonData.files || {});
  //   } catch (error) {
  //     console.error('API request error:', error);
  //   }
  //   finally{
  //       // setLoading(false)
  //     }
  // };
  // useEffect(() => {
  //   fetchData(); // Initial data fetch

  //   // Set up a polling interval to fetch data every 5 seconds
  //   const interval = setInterval(fetchData, 5000);

  //   // Clear the interval when the component unmounts
  //   return () => clearInterval(interval);
  // }, []);
  const fetchData = async () => {
    try {
      // setLoading(true);

      const jsonData = await callApi<any>(
        `${MAIN_URL}${GET_FOLDER_URL}`,
        'GET'
      );
      setFolderData(jsonData.files || {});
    } catch (error) {
      console.error('API request error:', error);
    } finally {
      // setLoading(false);
    }

    // setTimeout(fetchData, 2000); // Polling interval: fetch data every 2 seconds
  };

  // useEffect(() => {
  //   fetchData(); // Initial data fetch
  // }, [lastFetchedTimestamp]);
  useEffect(() => {
    fetchData(); // Initial data fetch
  }, []);

  // useEffect(() => {
  //   let interval: NodeJS.Timeout | null = null;

  //   if (shouldRefresh) {
  //     interval = setInterval(() => {
  //       fetchData();
  //     }, 5000);
  //   }

  //   return () => {
  //     if (interval) {
  //       clearInterval(interval);
  //     }
  //   };
  // }, [shouldRefresh]);

  useEffect(() => {
    if (isOpen === false && isOpen1 === true) {
      setPageWidth('w-[84vw]');
    } else if (isOpen === true && isOpen1 === true) {
      setPageWidth('min-[1300px]:w-[57vw] min-[1301px]:w-[65vw]');
    } else if (isOpen === true && isOpen1 === false) {
      setPageWidth('w-[84vw]');
    }
  });
  const handleOptionClick = (
    optionValue: string,
    folderName: string,
    folderData1: FolderData
  ) => {
    // Handle selected option
    if (optionValue === 'Open') {
      setSelectedOption(optionValue);
      // Simulate opening the folder
      if (folderName && folderData1) {
        handleFolderClick(folderName, folderData1);
      }
    }
    // Handle other options as needed
    // ...
    // console.log('elected', optionValue, folderName, selectedFolderName);
  };
  const renderFolderContents = (currentFolder: FolderData | null) => {
    if (currentFolder === null) {
      return null; // Handle the case when currentFolder is null
    }
    const selectedCategories = category
      .filter((cat) => cat.selected)
      .map((cat) => cat.url);

    return Object.entries(currentFolder).map(([folderName, data1]) => {
      if ('name' in data1) {
        // This is a file
        const fileData = data1 as FileData;
        // console.log('fileData', fileData);

        if (selectedCategories.includes(fileData.name.split('.').pop() || '')) {
          return (
            <div
              key={fileData.name}
              className="h-[26vh]"
              onContextMenu={(e) => handleFileContextMenu(e, fileData)}
            >
              <button
                type="button"
                key={fileData.name}
                // Handle file click
                // console.log('File Name:', fileData.name);
                // console.log('File Path:', fileData.path);
                onContextMenu={() => {
                  // Handle file click and pass the fileData to the click handler
                  handleClickFile(fileData);
                }}
                className="ml-[26px] h-[170px]"
              >
                <GridComponent
                  URL={`${MAIN_URL}${GET_FILES_URL}${fileData?.path?.substring(
                    1
                  )}`}
                  title={fileData.name}
                  img="/assets/icons/Media.svg"
                  type="media"
                  id={parseInt(fileData.name, 10)}
                  // fileSize="Size: 12MB"
                />
              </button>
              {isFileContextMenuVisible && (
                <ContextMenu
                  x={fileContextMenuPosition.x}
                  y={fileContextMenuPosition.y}
                  onClose={() => setIsFileContextMenuVisible(false)}
                  onFileOptionClick={handleContextFileClick}
                  fileData={fileData}
                  type="file"
                />
              )}
            </div>
          );
        }
      } else {
        // This is a folder
        const folderData1 = data1 as FolderData;

        if (
          selectedCategories.includes('folders') ||
          Object.prototype.hasOwnProperty.call(folderData1, 'folders')
        ) {
          return (
            <div
              key={folderName}
              className="h-[26vh] xl:w-[13vw] 2xl:w-[13vw]"
              onContextMenu={(e) => handleContextMenu(e, folderName)}
            >
              <FolderGrid
                img="/assets/icons/folder-large.svg"
                width="2xl:w-[13vw] xl:w-[13vw] sm:w-[20vw]"
                FolderName={folderName}
                onClick={() => handleFolderClick(folderName, folderData1)}
              />
              {folderName === clickedFolderName && (
                <div className="ml-2 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8">
                  {renderFolderContents(folderData1)}
                </div>
              )}
              {isContextMenuVisible && (
                <ContextMenu
                  x={contextMenuPosition.x}
                  y={contextMenuPosition.y}
                  onClose={() => setIsContextMenuVisible(false)}
                  onOptionClick={handleOptionClick}
                  folderName={selectedFolderName}
                  folderData1={folderData1 || {}}
                  type="folder"
                />
              )}
            </div>
          );
        }
      }
      return null;
    });
  };

  const getFolderDataFromPath = (folderPath: string): FolderData | null => {
    const pathSegments = folderPath.split('/');
    let folderDataAtPath: FolderData | null = folderData;

    for (const segment of pathSegments) {
      if (folderDataAtPath && segment in folderDataAtPath) {
        folderDataAtPath = folderDataAtPath[segment] as FolderData;
      } else {
        folderDataAtPath = null;
        break;
      }
    }

    return folderDataAtPath;
  };

  const handleGoBack = () => {
    const lastSlashIndex = currentFolderPath.lastIndexOf('/');
    const parentFolderPath =
      lastSlashIndex >= 0 ? currentFolderPath.substring(0, lastSlashIndex) : '';
    setCurrentFolderPath(parentFolderPath);
    setClickedFolderName(null);

    // If the parent folder path is empty, it means we are at the root level
    // In that case, set the current folder data to the top-level folder data
    const parentFolderData = parentFolderPath
      ? getFolderDataFromPath(parentFolderPath)
      : folderData;
    setCurrentFolderData(parentFolderData);
    // console.log("folderDataAtPath",parentFolderPath);
  };
  const navigateToFolder = (folderPath: string, FolderName: string) => {
    // console.log('Navigating to folder path:', folderPath);
    // console.log('Navigating to folder path:', FolderName);

    // Logic to update the current folder data based on the folderPath
    const folderDataAtPath = getFolderDataFromPath(folderPath);

    if (folderDataAtPath) {
      setClickedFolderName(FolderName);
      // Update the state with the new folder data and folder path
      setCurrentFolderData(folderDataAtPath);
      setCurrentFolderPath(folderPath);
      // setShouldRefresh(true);

      // Reset last fetched timestamp to fetch all new data within the folder
      // setLastFetchedTimestamp(0);

      // Update the selected property for the clicked category
      setCategory((prevCategories) =>
        prevCategories.map((cat) => ({
          ...cat,
          selected: cat.url === folderPath ? !cat.selected : cat.selected,
        }))
      );
    } else {
      console.log('Folder data not found for path:', folderPath);
    }
  };

  useEffect(() => {
    // Simulate loading for 5 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeout);
  }, []);
  const handleToggle1 = () => {
    setchecked((val) => !val);
  };
  // useEffect(() => {
  //   if (selectedOption) {
  //     handleFolderClick();
  //   }
  // });
  useEffect(() => {
    if (isContextMenuVisible === true) {
      setIsFileContextMenuVisible(false);
    }
  }, [isContextMenuVisible]);
  useEffect(() => {
    if (isFileContextMenuVisible === true) {
      setIsContextMenuVisible(false);
    }
  }, [isFileContextMenuVisible]);

  return (
    <div className="select-none">
      <div>
        <div
          className={`ml-6 mt-4 grid  ${
            isOpen && isOpen1 ? 'w-[54vw] gap-4' : 'w-[67vw] gap-16'
          }   gap-y-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5`}
        >
          {category.map((item) => (
            <button
              type="button"
              key={item.name}
              onClick={() => {
                setFiles(item.name);
                // If the clicked category is "All Files", set all categories to selected
                if (item.url === 'all') {
                  setCategory((prevCategories) =>
                    prevCategories.map((cat) => ({
                      ...cat,
                      selected: true,
                    }))
                  );
                } else {
                  // Set the selected property of the clicked category to true
                  // and set the selected property of other categories to false
                  setCategory((prevCategories) =>
                    prevCategories.map((cat) => ({
                      ...cat,
                      selected: cat.url === item.url,
                    }))
                  );
                }
              }}
            >
              <SmallGrid
                img={item.img}
                subImage="/assets/icons/icon1.svg"
                content1={item.name}
                content2="81 files"
                content3="32 MB"
                rangeColor={files === item.name ? '#fff ' : ''}
                selected={
                  files === item.name ? 'brightness-0 invert' : 'invert-0'
                }
                textColor={files === item.name ? 'text-font-color' : ''}
                bgColor={
                  files === item.name
                    ? 'bg-secondary-color'
                    : 'bg-tertiary-color'
                }
              />
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between px-6 py-4 ">
          <div className="flex items-center gap-4 ">
            {/* <HalfCurvedButton
              content="Upload file"
              image="/assets/icons/Clouds.svg"
              backgroundColor="bg-primary-color"
              Color="text-quaternary-color"
              Color1=""
              textProp="pr-[25px] pl-[15px]"
              buttonType="uploadFile"
              width="w-[162px]"
              height="h-10"
            /> */}
            <div>
              {currentFolderPath && <BackButton onClick={handleGoBack} />}
            </div>
            <InputField
              name=""
              validation={false}
              withImage
              height="h-10"
              width="w-72"
              placeholder="Search Files"
              bottominput="bottom-1"
              textMargin="pl-12"
              img="/assets/icons/Search.svg"
              borderColor="border-tertiary-color"
            />
            {/* <span className="text-quaternary-color">
              {currentFolderPath === '' ? '' : '/'}
              {currentFolderPath}
            </span> */}
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex h-10 w-[114px] items-center justify-center gap-2 rounded-[20px] bg-primary-color"
              // onClick={handleToggle1}
            >
              <div>
                <Image
                  alt="icon"
                  src="/assets/icons/files.svg"
                  width="20"
                  height="20"
                />
              </div>
              <div className="mt-2">
                <Toggle
                  text={false}
                  id="filemanager1"
                  button={checked}
                  onClick={handleToggle1}
                />
              </div>
            </button>

            {/* <Arrow
              img={
                mode === 'grid'
                  ? '/assets/icons/listView.svg'
                  : '/assets/icons/listViewActive.svg'
              }
              backgroundColor={
                mode === 'grid' ? 'bg-primary-color' : 'bg-primary-color'
              }
              borderColor={
                mode === 'grid'
                  ? 'border-primary-color'
                  : 'border-quaternary-color'
              }
              rotate=" w-5"
              width="w-10 h-10"
              onClick={() => setmode('list')}
            /> */}
            <Arrow
              img={
                mode === 'list'
                  ? '/assets/icons/gridIcon.svg'
                  : '/assets/icons/gridViewActive.svg'
              }
              backgroundColor={
                mode === 'list' ? 'bg-primary-color' : 'bg-primary-color'
              }
              borderColor={
                mode === 'list'
                  ? 'border-primary-color'
                  : 'border-quaternary-color'
              }
              rotate=" w-5"
              width="w-10 h-10"
              onClick={() => setmode('grid')}
            />
          </div>
        </div>
        <hr className=" ml-[17px] w-[97%] border border-tertiary-color" />
      </div>
      <div>
        <Breadcrumbs
          currentFolderPath={breadCrumbsPath}
          onFolderClick={navigateToFolder}
        />

        <div className="custom-scrollbar flex select-none overflow-y-auto  overflow-x-hidden xl:h-[73vh] 2xl:h-[63vh]">
          <div className={`mt-6 flex ${pageWidth}`}>
            <div
              className={`ml-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-[10px] 2xl:grid-cols-5  2xl:gap-x-8 ${
                currentFolderPath === ''
                  ? 'gap-y-4 xl:gap-y-4 2xl:gap-y-4'
                  : 'gap-y-4 xl:gap-y-20 2xl:gap-y-32'
              }`}
            >
              {loading ? (
                <FolderGridLoading />
              ) : (
                checked && renderFolderContents(currentFolderData || folderData)
              )}
              {playVideo && (
                <div>
                  <VideoPreview
                    title={contextFileData?.name ? contextFileData?.name : ''}
                    // url={`${MAIN_URL}get_file${contextFileData?.path}`}
                    url="http://192.168.50.84:8888/h264/e8e84e90-43a6-477c-95da-e4f783ce6e86/index.m3u8"
                    onClose={() => {
                      setPLayVideo(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileManager;
