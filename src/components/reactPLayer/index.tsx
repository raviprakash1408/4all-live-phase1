import React from 'react';
import ReactPlayer from 'react-player';

import LoadingVideo from '@/components/VideoPlayer/loading';
import NoPreview from '@/components/VideoPlayer/noPrevew';

interface VideoPlayerProps {
  validUrl: string | undefined;
  streamUrl: string;
  width?: string;
  height?: string;
  borderColor?: string;
  loading?: boolean;
}

const ReactPlayers = (props: VideoPlayerProps) => {
  const { validUrl, streamUrl, width, height, borderColor, loading } = props;

  // const [isPLay, setisPLay] = useState(false);
  // // const [buffer,setBuffer]=useState(false)

  // useEffect(() => {
  //   setisPLay(true);

  //   return () => {
  //     setisPLay(false);
  //   };
  // }, [streamUrl]);
  console.log('streamUrl', streamUrl);

  // useEffect(() => {
  //   if (validUrl && !loading) {
  //     checkPlayableUrl();
  //   }
  // }, [validUrl, loading, streamUrl]);

  // const checkPlayableUrl = async () => {
  //   try {
  //     const response = await fetch(streamUrl, { method: 'HEAD' });
  //     if (response.ok) {
  //       setBuffer(false);
  //     } else {
  //       setBuffer(true);
  //     }
  //   } catch (error) {
  //     setBuffer(true);
  //   }
  // };

  // console.log("fsfd",buffer);

  return (
    <div>
      {validUrl === '' && !loading && (
        <NoPreview type="NoPreview" width={width || ''} height={height || ''} />
      )}
      {validUrl === '' && loading && (
        <LoadingVideo height="h-[26.7vh] w-[27vw]" />
      )}
      {validUrl !== '' && !loading && (
        <div
          className={`!rounded-2xl ${borderColor} ${width} ${height} pr-[1px]`}
        >
          <div className="">
            <ReactPlayer
              className={`react-player ${width} ${height} `}
              url={streamUrl}
              controls
              width=""
              height=""
              playing
              muted
            />
          </div>
        </div>
      )}
      {validUrl !== '' && loading && (
        <LoadingVideo height="h-[26.7vh] w-[27vw]" />
      )}
      {/* {validUrl !== '' && !loading && buffer && <div><NoPreview type='NotPlayable' width={width?width:""} height={height?height:""} /></div>} */}
      {/* {validUrl !== '' && !loading && <NoPreview />} */}
    </div>
  );
};

export default ReactPlayers;
