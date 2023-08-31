import * as React from 'react';
import { useState,useEffect } from 'react';
import mpegts from 'mpegts.js';
import { CircularProgress } from '@mui/material';
import VideoLoader from './videoLoader.tsx';
import YoutubeShare from './youtubeShare';



function MpegtsPlayer(props) {
    
    const [extention, setextention] = useState("")
    const [url, seturl] = useState("")
    // selected
    const [selected, setSelected] = useState(false);
    // video ref

    const [buffering, setbuffering] = useState(true)

    const [tsplayer, settsplayer] = useState(null)

    
    useEffect(() => {
    if(tsplayer !==null && props.volume){
        // @ts-ignore
        tsplayer.volume = props.volume/100;
       
    }
    }, [props.volume, tsplayer])
    

    const videoRef = React.useRef(null);
    useEffect(() => {
        setextention(props.ShareUrl?.split('.').pop())
        seturl(props.ShareUrl?.replace('http://','http://'))
      }, [props.ShareUrl])
    useEffect(() => {
        if(extention == "flv" && videoRef.current){
          // setcontrols(false)
          
    try{      if (mpegts.getFeatureList().mseLivePlayback) {
            var videoElement = videoRef.current;
            var player = mpegts.createPlayer({
                type: 'flv',  // could also be mpegts, m2ts, flv
                isLive: true,
                url
            });
            // @ts-ignore
            settsplayer(player)
            player.on(mpegts.Events.LOADING_COMPLETE, (e) => {
                console.log("LOADING_COMPLETE");
             
            });
            player.on(mpegts.ErrorTypes.MEDIA_ERROR, (e) => {
                console.log(e, "MEDIA_ERROR");
            });
            player.on(mpegts.Events.ERROR,(err)=>{
                console.log(err,"gggggfgfg");
                seturl(props.ShareUrl?.replace(".flv", ".ts"));
            })
            player.on(mpegts.Events.MEDIA_INFO, (info) =>
              console.log(info, "gggggfgfg")
            );
            if (videoElement) {
                player.attachMediaElement(videoElement as HTMLVideoElement);
                player.load();
                player.volume = 0;
                player.play();
            }
            
        }}
        catch(e){
          console.log(e,"MpegtsPlayer")
        }
        }
      }, [extention, props.ShareUrl, url, videoRef])
      
    return extention == "flv" ? (
      <div
        style={{
          position: "relative",
          // boxShadow: selected ? '0px 0px 5px 5px hsl(213deg 89% 37%)' : 'none',
          // backgroundColor: selected ? 'hsl(213deg 89% 30%)' : 'none',
        }}
        onClick={() => {
          if (props.onClick) {
            if (!selected) {
              props.onClick();
            }
            setSelected(!selected);
          }
        }}
      >
        <VideoLoader videoElement={videoRef.current} />
        <video
          style={{
            aspectRatio: 16 / 9,
          }}
          ref={videoRef}
          id="videoElement"
          width="100%"
          height="100%"
        />
      </div>
    ) : (
      <YoutubeShare
        control={props.control}
        max={false}
        data={props.data}
        volume={props.volume}
        ShareUrl={url}
        is_hover={props.is_hover}
        id={props.id}
        type={props.type}
      />
    );
}

export default MpegtsPlayer;

