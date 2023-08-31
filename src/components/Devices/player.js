import { useState,useEffect } from 'react';
import ReactPlayer from 'react-player'
import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setplayerTiming } from '../../state/conference/conferenceSlice';
import PlayerControl from './playerControl.tsx';
import { addPlayerTiming } from '../../state/controlpannel/slice.ts';
import { getPlayerTimingByDeviceId } from '../../state/controlpannel/selectors.ts';

import { createSelector } from "@reduxjs/toolkit";



export default function Player(props) {
    let  local = useSelector(state => state.local);
    let playingVideos = useSelector((state) => state.conference.playing);
    // get playing video from redux by device id
    let playing = playingVideos?.find((item) => item.id == props.id);
    const [timing,setTiming] = useState({startTime:0,endTime : 10}) 
    const player = React.useRef(null)
    const [isReady, setIsReady] = React.useState(false);
    // const [playing, setplaying] = useState(true)
    const [volume, setvolume] = useState(0.5)
    const [duration, setduration] = useState(0)
  // get player timing
  const playerTiming = useSelector(state => state.controlpanel.playerTiming);
  // createselector for player timing
  
    const [controls, setcontrols] = useState(true)
    const [muted, setmuted] = useState(false)
  
  const dispatch = useDispatch();

  
  useEffect(() => {
    try {
      // window.room.addCommandListener("playVideo",(data)=>{
      //   console.log(data,"playVideo");
      //   setplaying(true)

      // })
      // window.room.addCommandListener("stopVideo",(data)=>{
      //   console.log(data,"stopVideo");
      //   setplaying(false)

      // })
      // window.room.addCommandListener("seekVideo",(data)=>{
      //   console.log(data,"seekVideo");
      //   this.player.seekTo(parseFloat(data.seek.value))

      // })
      // props.handleClickToast()
      
    } catch (error) {
      console.log(error);
    }
    
   
  }, [local, props])
  useEffect(() => {
    // console.log("playerTiming");
  },)

  useEffect(() => {
    // console.log(props.volume,"volume");
    setvolume(props.volume/100)
  }, [props.volume])
    return (
      <div>
        {props.control && (
          <PlayerControl
            player={player}
            volume={volume}
            setvolume={setvolume}
            playing={playing?.play}
            // setplaying={setplaying}
            timing={timing}
            is_hover={props.is_hover}
            id={props.id}
            type={props.type}
            duration={duration}
          />
        )}
        <ReactPlayer
          style={{ borderRadius: "4px", aspectRatio: 16 / 9 }}
          borderRadius="4px"
          loop={true}
          ref={player}
          playing={playing?.play}
          width="100%"
          height="100%"
          url={props.url}
          onReady={() => {
            if (!isReady) {
              console.log("onReadyonReadyonReadyonReady");
              // get player timing by device id
              let timing = playerTiming.find(
                (item) => item.device_id == props.data?.id
              );
              // setduration(timing?.duration);
              console.log(timing, "timing");
              if (timing?.currentTime && timing.startTime != 0) {
                player.current.seekTo(timing.currentTime, "seconds");
              }
              setIsReady(true);
            }
          }}
          onPlay={() => {
            try {
              // window.room.sendCommandOnce('playVideo', {value:props.ShareUrl, userId:'abc45'});
              // handleClickToast()
              console.log("onPlay");
            } catch (error) {
              console.log(error);
            }
          }}
          onPause={() => {
            try {
              // window.room.sendCommandOnce('stopVideo', {value:props.ShareUrl});

              console.log("onPause");
            } catch (error) {
              console.log(error);
            }
          }}
          onProgress={(e) => {
            // console.log(e,"onProgress",props.data);
            dispatch(
              addPlayerTiming({
                currentTime: e.playedSeconds,
                duration: e.loadedSeconds,
                device_id: props.data?.id,
                user_id: props.data?.user_id,
              })
            );
            dispatch(setplayerTiming({ time: e, id: props.data?.id }));
            setTiming({ startTime: e.playedSeconds, endTime: e.loadedSeconds });
          }}
          // onSeek={(e) => {
          //   try {
          //     window.room.sendCommandOnce('seekVideo', {value:props.ShareUrl,seek:e});

          //     console.log('seekVideo')
          //   } catch (error) {
          //     console.log(error);
          //   }
          // }}

          controls={false}
          controlslist="nofullscreen"
          volume={volume}
          muted={muted}
        />
      </div>
    );
}

