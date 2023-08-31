import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import '@videojs/themes/dist/sea/index.css'

export const VideoJS = ({ options, themeName='sea'}) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  React.useEffect(() => {
    const player = playerRef.current
    if (!player) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = videoRef.current
      if(!videoElement) return;
     
      playerRef.current = videojs(videoElement, options)
      };
      return() => {
        if(player){
          player.dispose();
          playerRef.current = null;
        }
      };
      },[options, videoRef, playerRef]);

     



  return (
    <div data-vjs-player>
      <div ref={videoRef} className={`video-js vjs-big-play-centered vjs-theme-${themeName}`}/>
    </div>
  );
};

export default VideoJS;
