import { Slider, Typography } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { RootState } from "../../state/store.ts";
import { setplaying } from "../../state/conference/conferenceSlice.js";
import { changeOpacity } from "../../utilities/common.js";
import { addVolume } from "../../state/controlpannel/slice.ts";
function PlayerControl({
  timing,
  playing,
  setvolume,
  volume,
  player,
  is_hover,
  type,
  id,
}) {
  const [progress, setprogress] = useState(50);
  const [confVolume, setconfVolume] = useState(100);

  // const permissions = useSelector((state: RootState) => state.permissions);
  // // seek to time state
  const [seekToTime, setseekToTime] = useState(0);
  const dispatch = useDispatch();
  const volumes = useSelector((state) => state.controlpanel.volumes);
  const conference = useSelector((state) => state.conference);

  const eventTheme = useSelector(
    (state: any) => state.theme.eventTheme[state.theme.theme]
  );

  useEffect(() => {
    if (player.current) {
      console.log(player.current, "player.currentplayer.currentplayer.current");
      player.current.seekTo(seekToTime, "seconds");
    }
  }, [player, seekToTime]);

  // play and pause
  useEffect(() => {
    if (playing) {
      let startTime = parseFloat(parseFloat(timing.startTime).toFixed(2));
      let endTime = parseFloat(parseFloat(timing.endTime).toFixed(2));
      let remaining = endTime - startTime;
      let progress = (remaining / endTime) * 100;
      // console.log(progress, "progressprogressprogress",startTime,endTime,remaining);

      setprogress(progress);
    }
  }, [playing, timing]);

  useEffect(() => {
    let allVolumes = volumes || [];

    let newVolume;
    newVolume = allVolumes.find((v) => v.device_id == id);

    if (newVolume?.volume == 0) {
      setconfVolume(0);
    } else {
      setconfVolume(newVolume?.volume || 100);
    }
  }, [id, volumes]);

  const updateVolumeLocal = (volume) => {
    if (typeof volume == "object") {
      volume = volume.volume;
    }

    let volumeData = {
      type: "device",
      device_id: id,
      user_id: null,
      volume: volume,
    };

    //  dispatch(addVolume(volumeData));
    if (
      conference.directorMode.mode &&
      conference.directorMode.user_id === window.room.myUserId()
    ) {
      console.log("update_volume");
      window.eventChanel.publish({ event: "update_volume", volumeData });
    } else {
      dispatch(addVolume(volumeData));
    }
  };

  return (
    <>
      {type == "centerStage" ? (
        <div
          style={{
            position: "absolute",
            bottom: is_hover ? 0 : -100,
            left: 0,
            right: 0,
            backgroundColor: "rgba(1, 34, 67, 0.8)",
            height: "100px",
            // div should come up slowly
            transition: "bottom 0.5s ease",
          }}
          // onMouseEnter={() => {
          //   setHover(true);
          // }}
          // onMouseLeave={() => {
          //   setHover(false);
          // }}
        >
          <div
            style={{
              position: "absolute",
              bottom: playing ? "31px" : "35px",
              left: playing ? "34px" : "40px",
              display: "flex",
            }}
          >
            {!playing ? (
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (conference.directorMode.mode && conference.directorMode.user_id === window.room.myUserId()) {
                    window.eventChanel?.publish({
                      event: "videoPlayPause",
                      videoStatus: { id: id, play: true },
                    });
                  } else {
                    dispatch(setplaying({ id: id, play: true }));
                  }
                }}
                style={{
                  width: "26px",
                  height: "auto",
                  cursor: "pointer",
                  zIndex: 1,
                }}
                alt=""
                src="/assets/fileManager/pause.svg"
              />
            ) : (
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (conference.directorMode.mode && conference.directorMode.user_id === window.room.myUserId()) {
                    window.eventChanel?.publish({
                      event: "videoPlayPause",
                      videoStatus: { id: id, play: false },
                    });
                  } else {
                  dispatch(setplaying({ id: id, play: false }));
                  }
                }}
                style={{
                  width: "40px",
                  height: "auto",
                  cursor: "pointer",
                  zIndex: 1,
                  filter:
                    "invert(67%) sepia(10%) saturate(579%) hue-rotate(151deg) brightness(92%) contrast(86%)",
                }}
                alt="pause"
                src="/assets/devices/pause.svg"
              />
            )}

            <Typography
              style={{
                paddingLeft: playing ? "28px" : "36px",
                fontSize: "1.5rem",
                fontFamily: "URW DIN REGULAR",
                color: "rgba(136, 161, 171, 1)",
              }}
            >
              {(parseFloat(timing.startTime) / 100).toFixed(2)}/
              {(parseFloat(timing.endTime) / 100).toFixed(2)}
            </Typography>
          </div>
          <div>
            <div
              style={{
                position: "absolute",
                display: "flex",
                width: "185px",
                height: "40px",
                bottom: "30px",
                right: "40px",
                // backgroundColor: "#012A50",
                borderRadius: "4px",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: "10",
              }}
              // onClick={(e) => {
              //   e.stopPropagation();
              //   setstreamAudio(!streamAudio);
              //   if (!streamAudio) {
              //     setvolume(0);
              //   }
              // }}
            >
              <img
                alt=""
                src={
                  // streamAudio
                  //   ? "/assets/bottomIcons/three_dots/no_audio.svg"
                  //   :
                  "/assets/bottomIcons/three_dots/audio.svg"
                }
                style={{
                  width: "18px",
                  // filter: streamAudio
                  //   ? "brightness(0) saturate(100%) invert(9%) sepia(51%) saturate(3191%) hue-rotate(196deg) brightness(93%) contrast(99%)"
                  //   : "",
                }}
              />
              {/* {!streamAudio && ( */}
              <Slider
                onClick={(e) => {
                  e.stopPropagation();
                }}
                aria-label="Volume"
                value={confVolume}
                onChange={(e) => {
                  if (confVolume != e.target.value) {
                    updateVolumeLocal(e.target.value);
                  }
                }}
                sx={{
                  width: 170,
                  color: "#008BCD",
                  height: 2,
                  marginLeft: "15px",
                  borderRadius: "0px",
                  // marginLeft: "20px",

                  "& .MuiSlider-thumb": {
                    border: "2px solid",
                    borderColor: "#008BCD",
                    color: "#E1E7EA",
                    // boxShadow: '0 0 0 2px rgba(0, 255, 0, 0.3) !important'
                    width: "17px",
                    height: "17px",
                  },
                  "& .MuiSlider-thumb:hover": {
                    // boxShadow: "0 0 0 4px rgba(0, 139, 205, 0.1) !important",
                  },
                }}
              />
              {/* )} */}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="player-control"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            height: "40px",
            position: "absolute",
            bottom: "4px",
            backgroundColor: changeOpacity(eventTheme?.bg_color_0, 0.9),
            zIndex: 3,
            opacity: is_hover ? 1 : 0,
            // opacity: 1,
          }}
        >
          <div
            className="player-timer"
            style={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "space-between",
              // width: "14%",
            }}
          >
            {!playing ? (
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (conference.directorMode.mode && conference.directorMode.user_id === window.room.myUserId()) {
                    window.eventChanel?.publish({
                      event: "videoPlayPause",
                      videoStatus: { id: id, play: true },
                    });
                  } else {
                  dispatch(setplaying({ id: id, play: true }));
                  }
                }}
                style={{
                  width: "15px",
                  height: "auto",
                  padding: "4px 20px 0px",
                }}
                alt="play"
                src="/assets/fileManager/pause.svg"
              />
            ) : (
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (conference.directorMode.mode && conference.directorMode.user_id === window.room.myUserId()) {
                    window.eventChanel?.publish({
                      event: "videoPlayPause",
                      videoStatus: { id: id, play: false },
                    });
                  } else {
                  dispatch(setplaying({ id: id, play: false }));
                  }
                }}
                style={{
                  width: "20px",
                  height: "20px",
                  padding: "0px 15px 0px 20px",
                  filter:
                    "invert(67%) sepia(10%) saturate(579%) hue-rotate(151deg) brightness(92%) contrast(86%)",
                }}
                alt="pause"
                src="/assets/devices/pause.svg"
              />
            )}
            <div
              style={{
                paddingTop: !playing ? "1px" : "",
                fontSize: "12px",
                color: "#fff",
                fontFamily: "URW DIN REGULAR",
              }}
            >
              {(parseFloat(timing.startTime) / 100).toFixed(2)}/
              {(parseFloat(timing.endTime) / 100).toFixed(2)}
            </div>
          </div>
          <div
            onClick={(e) => {
              let width = e.target.clientWidth;
              let offset = e.nativeEvent.offsetX;
              let percentage = (offset / width) * 100;
              let seekToTime =
                (percentage / 100) *
                parseFloat(parseFloat(timing.endTime).toFixed(2));
              setseekToTime(seekToTime);
              console.log(
                seekToTime,
                "e.nativeEvent.offsetXe.nativeEvent.offsetXe.nativeEvent.offsetX",
                e.target.clientWidth
              );
            }}
            style={{
              width: "100%",

              // left: "15%",
              position: "absolute",
              bottom: "40px",
            }}
            className="progressBar"
          >
            {/* svg progress bar */}
            <span
              style={{
                position: "absolute",
                display: "inline-block",
                width: 100 - progress + "%",
                left: "0",
                height: "5px",
                backgroundColor: "#008BCD",
              }}
            ></span>
            <span
              style={{
                display: "inline-block",
                position: "absolute",
                left: 100 - progress + "%",
                width: progress + "%",
                height: "5px",
                backgroundColor: "#012A50",
              }}
            ></span>
            {/* <svg className="progressBar-done" width={progress} height={10} viewBox={`0 0 100 10`}>
            <rect className="progressBar-svg-rect" fill='green' x="0" y="0" width={progress} height="10" />
           </svg>
           <svg className="progressBar-tobe" width={100 -progress} height={10} viewBox={`0 0 100 10`}>
            <rect className="progressBar-svg-rect" fill='red' x="0" y="0" width={100 -progress} height="10" />
           </svg> */}
          </div>

          {/* <div className='slider'>
        <div
              style={{
                display:
               permissions.control_volume_of_remote_user
                    ? "flex"
                    : "none",

              }}
            >
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  width:  "135px",
                  height: "auto",
                  bottom: "50%",
                  right: "-10px",
                //   backgroundColor: "#012A50",
                  borderRadius: "4px",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: "10",
              
                }}
                onClick={(e) => {
                  e.stopPropagation();
                 
                   
                      setvolume(0);
                    
                  
                }}
              >
                <img
                  alt=""
                  src={
                    volume == 0
                      ? "/assets/bottomIcons/three_dots/no_audio.svg"
                      : "/assets/bottomIcons/three_dots/audio.svg"
                  }
                  style={{
                    width: "18px",
                   
                    filter:    volume == 0
                      ? "brightness(0) saturate(100%) invert(9%) sepia(51%) saturate(3191%) hue-rotate(196deg) brightness(93%) contrast(99%)"
                      : "",
                  }}
                />
            
              </div>
            </div>
        <Slider
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    aria-label="Volume"
                    //   disabled={audioMuted}
                    value={volume}
                    onChange={(e) => {
                      console.log(e);
                    // @ts-ignore
                      setvolume(e.target.value/100);
                    }}
                    sx={{
                      width: 76,
                      color: "#008BCD",
                      height: 2,
                      marginLeft: "2px",
                      borderRadius: "0px",
                      // marginLeft: "20px",

                      "& .MuiSlider-thumb": {
                        border: "2px solid",
                        borderColor: "#008BCD",
                        color: "#E1E7EA",
                        // boxShadow: '0 0 0 2px rgba(0, 255, 0, 0.3) !important'
                        width: "17px",
                        height: "17px",
                      },
                      "& .MuiSlider-thumb:hover": {
                        // boxShadow: "0 0 0 4px rgba(0, 139, 205, 0.1) !important",
                      },
                    }}
                  />
        </div> */}
        </div>
      )}
    </>
  );
}

export default PlayerControl;
