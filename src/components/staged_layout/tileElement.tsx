import React, { useEffect, useRef, useState } from "react";
import AvatarElem from "./avatar.tsx";
import {
  setCurrentActiveVideo,
  LAYOUT_TYPES,
  setLayout,
  setCenterStageDevice,
  setcurrentActiveUserId,
} from "../../state/conference/conferenceSlice";
import { addVolume } from "../../state/controlpannel/slice.ts";

import { useDispatch, useSelector } from "react-redux";
import TileConnectivy from "../tile_connectivy";
import BottomMenuAudioInputVolumn from "../bottom_menu_audio_input_volumn";
import { shortNameCreator } from "../../utilities/shortName";
import PanToolIcon from "@mui/icons-material/PanTool";
import Box from "@mui/material/Box";
import MpegtsPlayer from "../mpegtsPlayer.tsx";
import ThreeDotOverlay from "../three_dot_overlay";
import Tooltip from "@mui/material/Tooltip";

const TileElement = ({
  isLocal,
  userId,
  video,
  videoMuted,
  audio,
  audioMuted,
  position,
  data,
}) => {
  const dispatch = useDispatch();
  const audioElement = useRef();
  const info = useSelector((state) => state.info);
  let status = info.callStatus;
  const eventTheme = useSelector(
    (state:any) => state.theme.eventTheme[state.theme.theme]
  );
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [role, setrole] = useState("");
  const [avatar, setavatar] = useState("");
  const [hover, setHover] = useState(false);
  const [hoverConnectivity, sethoverConnectivity] = useState(false);
  const [hoverMore, sethoverMore] = useState(false);
  const [is_device, setis_device] = useState(false);
  const [volume, setvolume] = useState(50);
  const [userShortName, setuserShortName] = useState("");

   const volumes = useSelector((state) => state.controlpanel.volumes);


  const conference = useSelector((state) => state.conference);
  const HandRise = useSelector((state) => state.conference.HandRise);
  const currentActiveUserId = useSelector(
    (state) => state.conference.currentActiveUserId
  );

  let canvas;


  useEffect(() => {
    let allVolumes = volumes || [];

    let newVolume;

    if (video?.type == "device") {
      newVolume = allVolumes.find((v) => v.device_id == video?.id);
      console.log(newVolume, "allVolumesallVolumes device");

    } else {
      newVolume = allVolumes.find((v) => v.user_id == video?.userId);
      console.log(newVolume, "allVolumesallVolumes");

    }
    if (newVolume?.volume == 0) {
      setvolume(0);
      // console.log(newVolume, confVolume,"zerovolume");
    
    } else {
      setvolume(newVolume?.volume || 50);
      // console.log(newVolume,confVolume,"zerovolume else");

   }
  }, [video?.id, video?.type, video?.userId, volumes]);

  useEffect(() => {
    setis_device(video?.type == "device");
    console.log(video, " --- type");
    // setshowDeviceActions(props.data?.)
  }, [video, video?.type]);

  useEffect(() => {
    if (audioElement.current) {
      // @ts-ignore
      audioElement.current.volume = volume / 100;
    }
  }, [audioElement, volume]);

  useEffect(() => {
    console.log("userIduserId", data);
    if (isLocal) {
      setfirstName(window.room?.getLocalParticipantProperty("firstName"));
      setlastName(window.room?.getLocalParticipantProperty("lastName"));

      setrole(window.room?.getLocalParticipantProperty("role"));
      setavatar(window.room?.getLocalParticipantProperty("avatar"));
    } else if (data.type == "device") {
      if (data.user_id == window.room.myUserId()) {
        setfirstName(window.room?.getLocalParticipantProperty("firstName"));
        setlastName(window.room?.getLocalParticipantProperty("lastName"));

        setrole(window.room?.getLocalParticipantProperty("role"));
        setavatar(window.room?.getLocalParticipantProperty("avatar"));
      } else {
        setfirstName(
          window.room
            ?.getParticipantById(data.user_id)
            ?.getProperty("firstName")
        );
        setlastName(
          window.room?.getParticipantById(data.user_id)?.getProperty("lastName")
        );
        setrole(
          window.room?.getParticipantById(data.user_id)?.getProperty("role")
        );
        setavatar(
          window.room?.getParticipantById(data.user_id)?.getProperty("avatar")
        );
      }
    } else {
      setfirstName(
        window.room?.getParticipantById(userId)?.getProperty("firstName")
      );
      setlastName(
        window.room?.getParticipantById(userId)?.getProperty("lastName")
      );
      setrole(window.room?.getParticipantById(userId)?.getProperty("role"));
      setavatar(window.room?.getParticipantById(userId)?.getProperty("avatar"));
    }
  }, [isLocal, userId]);

  useEffect(() => {
    try {
      if (!is_device) {
        if (video && !videoMuted) {
          video.attach(document.getElementById(`video-${userId}`));
        }
        if (isLocal) {
          setuserShortName(
            shortNameCreator(
              window.room?.getLocalParticipantProperty("firstName"),
              window.room?.getLocalParticipantProperty("lastName")
            )
          );
        } else {
          setuserShortName(
            shortNameCreator(
              window.room?.getParticipantById(userId)?.getProperty("firstName"),
              window.room?.getParticipantById(userId)?.getProperty("lastName")
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [isLocal, is_device, userId, video, videoMuted]);

  useEffect(() => {
    if (audio != undefined) {
      try{
      audio.attach(document.getElementById(`${userId}-audio`));
      // play audio

      $(`${userId}-audio`)[0]?.play();
      if ($(`${userId}-audio`)[0] != undefined) {
        $(`${userId}-audio`)[0].onloadedmetadata = (e) => {
          console.log("playing audio ", `${userId}-audio`);
          audio.play();
        };
      }
    }catch(error){
      console.log(error);
    }
    } else if (audio) {
      canvas = document.getElementById(`${userId}-audioCanvas`);
    }
  }, [audio]);

  const [positionTop, setpositionTop] = useState<Number>();

  const goToCenterStage = (e) => { if (!is_device) {
    console.log("click on tile");
    window.room?.setReceiverConstraints({
      onStageEndpoints: [userId], // The endpoint ids of the participants that are prioritized up to a higher resolution.
      defaultConstraints: { maxHeight: 180 }, // Default resolution requested for all endpoints.
      constraints: {
        // Endpoint specific resolution.
        [userId]: { maxHeight: 720 },
      },
    });
    dispatch(setLayout(LAYOUT_TYPES.STAGE_LAYOUT));

    dispatch(setCurrentActiveVideo(video));
    dispatch(setcurrentActiveUserId(userId));
    dispatch(
      setCenterStageDevice({
        layout_change: true,
        enabled: false,
        url: "",
      })
    );
      console.log("tileclickpublish NoVideoNoVideo");

  } else {
    dispatch(setcurrentActiveUserId(video.id));

    dispatch(
      setCenterStageDevice({
        layout_change: true,
        enabled: true,
        url: video.url,
      })
    );
  }

  }
   const updateVolumeLocal = (volume) => {
     if (typeof volume == "object") {
       volume = volume.volume;
     }
     if (audioElement.current) {
       console.log(volume, " --- volume");

       audioElement.current.volume = volume / 100;
     }
     let volumeData = {
       type: is_device ? "device" : "user",
       device_id: is_device ? video?.id : null,
       user_id: is_device ? null : userId,
       volume: volume,
     };
     
     dispatch(addVolume(volumeData));
     if (conference.directorMode.mode &&
       conference.directorMode.user_id === window.room.myUserId()
     ) {
       console.log("update_volume");
       window.eventChanel.publish({ event: "update_volume", volumeData });
     }
   };
  return (
    <>
      <div
        ref={(el) => {
          if (!el) return;

          // if (800 - el.getBoundingClientRect().y > 315){
          //     setpositionTop(800 - el.getBoundingClientRect().y);
          // }else{
          setpositionTop(el.getBoundingClientRect().y);
          // }
        }}
        key={userId}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0px",
          width: "130px",
          height: "120px",
          backgroundColor: "#011934",
          borderRadius: "4px",
          //overflow: "hidden",
          cursor: "pointer",
          position: "relative",
          outline: hover
            ? "3px solid #0E558C"
            : HandRise.includes(userId) || currentActiveUserId == userId
            ? "3px solid #008BCD"
            : "",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={(e) => {
          if (
            conference.directorMode.mode &&
            conference.directorMode.user_id === window.room.myUserId()
          ) {
            window.eventChanel.publish({
              event: "layoutChanged",
              layout: "stage_layout",
              user_id: userId,
            });
            goToCenterStage(e);
          } else {
            goToCenterStage(e);
          }
        }}
      >
        {is_device ? (
          <></>
        ) : (
          hover && (
            <Tooltip
              title={
                <div style={{ display: "flex", zIndex: 1 }}>
                  <span
                    style={{
                      margin: "4px",
                      fontFamily: "URW DIN REGULAR",
                      color: "black",
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                  >
                    <TileConnectivy
                      is_hover={hoverConnectivity}
                      userId={userId}
                      type="staged"
                      theme={eventTheme}
                    />
                  </span>
                </div>
              }
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "transparent",
                  },
                },
              }}
              placement="right-start"
            >
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  width: "20px",
                  height: "20px",
                  top: "5px",
                  left: "5px",
                  backgroundColor: hoverConnectivity
                    ? "#008BCD"
                    : status.connectionQuality >= 80
                    ? "#08CF6F"
                    : status.connectionQuality >= 50
                    ? "#CFBB08"
                    : "#CF4408",
                  borderRadius: "4px",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: "10",
                }}
                onMouseEnter={() => sethoverConnectivity(true)}
                onMouseLeave={() => sethoverConnectivity(false)}
                onClick={(e) => {
                  e.stopPropagation();

                  //dispatch(setPopoverOpen({open:true,anchorEl:e.currentTarget,orientation:props.type=="tier2" ? "left" : "right",id:props.userId}))
                }}
              >
                <img
                  alt=""
                  src="/assets/icons/on_videos/detail.svg"
                  style={{ width: "15px" }}
                />
              </div>
            </Tooltip>
          )
        )}
        {is_device ? (
          <div
            style={{
              position: "absolute",
              display: !hover ? "none" : "flex",
              width: "20px",
              height: "20px",
              top: "5px",
              right: "5px",
              backgroundColor: "rgb(230, 25, 89)",
              borderRadius: "4px",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: "10",
            }}
            onClick={(e) => {
              window.eventChanel.publish({
                event: "removeDevice",
                id: video.id,
              });

              // dispatch(setCurrentActiveVideo(props.video));

              // todo remove device
              // AxiosLocal.post("/api/devices/remove", {

              // })
              // let newDevices = [...devices];
              // newDevices = newDevices.filter(
              //   (item) => item.id !== props.data.id
              // );
              // updateRoomConfig({ devices: newDevices });
              e.stopPropagation();
            }}
          >
            <img
              alt=""
              src="/assets/admin/close.svg"
              style={{
                filter: "brightness(0) invert(1)",
                width: "10px",
              }}
            />
          </div>
        ) : userId != window.room?.myUserId() ? (
          hover && (
            <Tooltip
              title={
                <div style={{ display: "flex", zIndex: 1 }}>
                  <span
                    style={{
                      margin: "4px",
                      fontFamily: "URW DIN REGULAR",
                      color: "black",
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                  >
                    <ThreeDotOverlay
                      userId={userId}
                      is_hover={true}
                      setHoverMenu={sethoverMore}
                      type="staged"
                      position={position}
                      theme={eventTheme}
                      updateVolumeLocal={updateVolumeLocal}
                    
                      // positionTop={positionTop}
                    />
                  </span>
                </div>
              }
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "transparent",
                  },
                },
              }}
              placement="right-start"
            >
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  width: "20px",
                  height: "20px",
                  top: "5px",
                  right: "5px",
                  backgroundColor: hoverMore ? "#008BCD" : "#012A50",
                  borderRadius: "4px",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: "10",
                }}
                onMouseEnter={() => sethoverMore(true)}
                onMouseLeave={() => sethoverMore(false)}
                onClick={(e) => {
                  e.stopPropagation();

                  // dispatch(setPopoverOpen({open:true,anchorEl:e.currentTarget,orientation:props.type=="tier2" ? "left" : "right",id:props.userId}))
                }}
              >
                <img
                  alt=""
                  src={
                    "/assets/icons/on_videos/three_dot" +
                    (hover ? "_white" : "") +
                    ".svg"
                  }
                  style={{ width: "15px" }}
                />
              </div>
            </Tooltip>
          )
        ) : (
          // )
          <></>
        )}
        {HandRise.includes(userId) && (
          <Box
            sx={{
              position: "absolute",
              top: "5px",
              left: "5px",
              backgroundColor: "#008BCD",
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              zIndex: "99",
            }}
          >
            <PanToolIcon
              style={{
                fontSize: "13px",
                padding: "3px 1px 1px 2px",
                color: "white",
              }}
            />
            {/* <img src='assets/bottomIcons/hand.svg' /> */}
          </Box>
        )}
        <div style={{ height: "73px", display: "flex", alignItems: "center" }}>
          {is_device ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                // margin: "5px 0px",
                backgroundColor: "rgb(20, 63, 99)",
                borderRadius: "4px",
              }}
            >
              <MpegtsPlayer
                control={false}
                data={data}
                volume={volume}
                ShareUrl={data.url}
              />
            </div>
          ) : !videoMuted ? (
            <video
              autoPlay
              style={{
                width: "130px",
                aspectRatio: 16 / 9,
              }}
              id={`video-${userId}`}
            />
          ) : (
            <AvatarElem userShortName={userShortName} avatar={avatar} />
          )}
          {audioMuted ? (
            <div
              style={{
                backgroundColor: "#032E57",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                position: "absolute",
                top: "42px",
                right: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img alt="" src="/assets/icons/on_videos/muted_audio.svg" />
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "#032E57",
                borderRadius: "4px",
                width: "39px",
                height: "25px",
                position: "absolute",
                top: "42px",
                right: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img alt="" src="/assets/icons/on_videos/unmuted_audio.svg" />
            </div>
            // <BottomMenuAudioInputVolumn
            //   deviceid={''}
            //   default_volumn={0}
            // />
          )}
        </div>
        <p
          style={{
            margin: "0px",
            padding: "4px 12px 0px",
            textAlign: "center",
            fontFamily: "URW DIN REGULAR",
            fontSize: "14px",
            color: "white",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {firstName} {lastName}
        </p>
        <p
          style={{
            margin: "0px",
            padding: "0px",
            textAlign: "center",
            fontFamily: "URW DIN REGULAR",
            fontSize: "12px",
            color: "#88A1AB",
          }}
        >
          {role}
        </p>

        {userId !== window.room.myUserId() && (
          <audio
            ref={audioElement}
            autoPlay
            id={`${userId}-audio`}
            class={`${userId}-audio`}
          />
        )}
      </div>
      {/* <TileConnectivy
        is_hover={hoverConnectivity}
        userId={userId}
        type="staged"
        position={position}
        positionTop={positionTop}
      /> */}
      {/* <ThreeDotOverlay
        userId={userId}
        is_hover={hoverMore}
        setHoverMenu={sethoverMore}
        type="staged"
        position={position}
        // positionTop={positionTop}
      /> */}
    </>
  );
};

export default TileElement;
