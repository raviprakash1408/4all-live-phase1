import 'video.js/dist/video-js.css';

import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';

import LoadingVideo from './loading';
import NoPreview from './noPrevew';

interface VideoPlayerProps {
  validUrl: string;
  streamUrl: string;
  width?: string;
  height?: string;
  borderColor?: string;
  loading?: boolean;
}

const VideoPlayer = (props: VideoPlayerProps) => {
  const { streamUrl, width, height, borderColor, loading, validUrl } = props;
  const videoRef = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    const options = {
      sources: [
        {
          src: `${streamUrl}`,
          type: 'application/x-mpegURL',
        },
      ],
      autoplay: true,
      fluid: true, // Make the player responsive
      controlBar: {
        volumePanel: { inline: false }, // Display the volume control as a separate button
      },
    };
    try {
      const player = videojs(videoRef.current!, options);

      // player.src({
      //   src: `${VIDEOJS_PLAYER}${streamId}/index.m3u8`,
      //   // src: `http://192.168.10.80:9000/api/v1/get_file/dummy/2023-08-01-master.m3u8`,
      //   type: 'application/x-mpegURL',
      // });

      player.play();

      return () => {
        player.dispose();
      };
    } catch (error) {
      console.log(error);
    }
    return () => {};
  }, [validUrl]);

  return (
    <div>
      {validUrl === '' && !loading && (
        <NoPreview type="NoPreview" width={width || ''} height={height || ''} />
      )}
      {validUrl === '' && loading && (
        <LoadingVideo height="h-[180px] w-[320px]" />
      )}
      {validUrl !== '' && !loading && (
        <div
          className={`!rounded-2xl ${borderColor}`}
          data-vjs-player
          style={{ width, height }}
        >
          <video
            ref={videoRef}
            className={`video-js !rounded-2xl  `}
            autoPlay
            muted
          >
            <track kind="captions" />
          </video>
        </div>
      )}
      {validUrl !== '' && loading && <LoadingVideo />}
    </div>
  );
};

export default VideoPlayer;
