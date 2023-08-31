import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import AvatarElem from "./avatar.tsx";
import {
  setCurrentActiveVideo,
  LAYOUT_TYPES,
  setLayout,
  setCenterStageDevice,
  setcurrentActiveUserId,
} from "../../state/conference/conferenceSlice";
// @ts-ignore
import { addVolume } from "../../state/controlpannel/slice.ts";

import { useDispatch, useSelector } from "react-redux";
import TileConnectivy from "../tile_connectivy";
import BottomMenuAudioInputVolumn from "../bottom_menu_audio_input_volumn";
import { shortNameCreator } from "../../utilities/shortName";
import PanToolIcon from "@mui/icons-material/PanTool";
import Box from "@mui/material/Box";
// @ts-ignore
import MpegtsPlayer from "../mpegtsPlayer.tsx";
import ThreeDotOverlay from "../three_dot_overlay";
import Tooltip from "@mui/material/Tooltip";
import { Slider } from "@mui/material";
import { RootState } from "../../state/store.js";

const LivekitTileNoTrackElement = ({
  isLocal,
  userId,
  video,
  // videoMuted,
  audio,
  audioMuted,
  type,
  position,
  data,
  user,
  trackUniqueId,
}) => {
  const dispatch = useDispatch();
  const audioElement = useRef();
  const info = useSelector((state: RootState) => state.info);
  let status = info.callStatus;
  const eventTheme = useSelector(
    (state: any) => state.theme.eventTheme[state.theme.theme]
  );

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [role, setrole] = useState("");
  const [avatar, setavatar] = useState("");
  const [hover, setHover] = useState(false);
  const [hoverConnectivity, sethoverConnectivity] = useState(false);
  const [hoverMore, sethoverMore] = useState(false);
  const [userShortName, setuserShortName] = useState("");
  //state for videoMuted
  const [videoMuted, setvideoMuted] = useState(true);
  const [connectionQuality, setconnectionQuality] = useState("good");


  //volume
  const [volume, setvolume] = useState(50);
  const volumes = useSelector((state: RootState) => state.controlpanel.volumes);
  const [confVolume, setconfVolume] = useState(100);

  const conference = useSelector((state: RootState) => state.conference);
  const HandRise = useSelector((state: RootState) => state.conference.HandRise);
  const currentActiveUserId = useSelector(
    (state: RootState) => state.conference.currentActiveUserId
  );
  const trackPosition = useSelector(
    (state: RootState) => state.livekit.trackPosition
  );
  // function for getting trackType from trackPosition array by comparing trackId
  const getTrackType = (trackId) => {
    let trackType = "";
    trackPosition.forEach((track) => {
      if (track.trackId == trackId) {
        trackType = track.trackType;
      }
    });
    return trackType;
  };
  const [viewerType, setviewerType] = useState(getTrackType(trackUniqueId));

  useEffect(() => {
    if (audioElement.current) {
      // @ts-ignore
      audioElement.current.volume = volume / 100;
    }
  }, [audioElement, volume]);

  useEffect(() => {
    setfirstName(user.user_first_name);
    setlastName(user.user_last_name);
    setrole(user.role);
    setavatar(user.avatar);
    setuserShortName(
      shortNameCreator(user.user_first_name, user.user_last_name)
    );
    // }
  }, [user.avatar, user.firstName, user.lastName, user.role]);

  useEffect(() => {
    if (audio != undefined) {
      try {
        const audioRef = document.getElementById(
          `${trackUniqueId}-${userId}-audio`
        ) as HTMLAudioElement;

        const canvas = document.getElementById(
          `${trackUniqueId}-${userId}-canvas`
        ) as HTMLCanvasElement;

        if (
          (audioRef &&
            // @ts-ignore
            userId != window.room?.localParticipant?.participantInfo?.sid) ||
          video?.source === "screen_share"
        ) {
          audio?.attach(audioRef);

          // $(`${trackUniqueId}-${userId}-audio`)[0]?.play();
          // if ($(`${trackUniqueId}-${userId}-audio`)[0] != undefined) {
          //   $(`${trackUniqueId}-${userId}-audio`)[0].onloadedmetadata = (e) => {
          //     audio.play();
          //   };
          // }
        }
      } catch (error) {
        console.log(error);
      }
    } else if (audio) {
      // @ts-ignore
      canvas = document.getElementById(`${userId}-audioCanvas`);
    }
  }, [audio, audioMuted]);

  const [positionTop, setpositionTop] = useState<Number>();

  const goToCenterStage = (e) => {
    if (type !== "device") {
      console.log("click on tile");

      dispatch(setLayout(LAYOUT_TYPES.STAGE_LAYOUT));
      console.log(video, userId, "click on tile");

      dispatch(setCurrentActiveVideo({ video: video, userId: userId }));
      dispatch(setcurrentActiveUserId(trackUniqueId));
      dispatch(
        setCenterStageDevice({
          layout_change: true,
          enabled: false,
          url: "",
          id: "",
        })
      );
    } else {
      dispatch(setcurrentActiveUserId(video.id));

      dispatch(
        setCenterStageDevice({
          layout_change: true,
          enabled: true,
          url: video.url,
          id: video.id,
        })
      );
    }
  };

  useEffect(() => {
    let allVolumes = volumes || [];

    let newVolume;
    if (type == "device") {
      newVolume = allVolumes.find((v) => v.device_id == video?.id);
      console.log(newVolume, "allVolumesallVolumes device");
    } else {
      newVolume = allVolumes.find((v) => v.user_id == trackUniqueId);
      console.log(newVolume, "allVolumesallVolumes");
    }
    if (newVolume?.volume == 0) {
      setconfVolume(0);
      // console.log(newVolume, confVolume,"zerovolume");
      // @ts-ignore
      audioElement.current.volume = 0;
    } else {
      setconfVolume(newVolume?.volume || 100);
      // console.log(newVolume,confVolume,"zerovolume else");
      // @ts-ignore
      audioElement.current.volume = newVolume?.volume / 100 || 1;
    }
  }, [trackUniqueId, type, video?.id, volumes]);

  const updateVolumeLocal = (volume) => {
    if (typeof volume == "object") {
      volume = volume.volume;
    }
    if (audioElement.current) {
      console.log(volume, " --- volume");
      // @ts-ignore
      audioElement.current.volume = volume / 100;
    }
    let volumeData = {
      type: type == "device" ? "device" : "user",
      device_id: type == "device" ? video?.id : null,
      user_id: type == "device" ? null : trackUniqueId,
      volume: volume,
    };

    //  dispatch(addVolume(volumeData));
    if (
      conference.directorMode.mode &&
      conference.directorMode.user_id === window.room.myUserId()
    ) {
      console.log("update_volume");
      // @ts-ignore
      window.eventChanel.publish({ event: "update_volume", volumeData });
    } else {
      // @ts-ignore
      dispatch(addVolume(volumeData));
    }
  };
  const devices = useSelector((state: RootState) => state.conference.devices);
  let currentActiveUserDevices = devices.filter(
    // @ts-ignore
    (device) => device.id == conference.currentActiveUserId
  );
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
          backgroundColor: eventTheme?.bg_color_2,
          borderRadius: "4px",
          //overflow: "hidden",
          cursor: "pointer",
          position: "relative",
          outline: hover
            ? "3px solid #0E558C"
            : HandRise.includes(userId) && video?.isDefaultVideoTrack() ||
              currentActiveUserId == trackUniqueId
            ? "3px solid #008BCD"
            : "",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={(e) => {
          console.log(
            conference.directorMode.mode,
            conference.directorMode.user_id,
            window.room?.myUserId(),
            "directorMode"
          );

          if (
            conference.directorMode.mode &&
            conference.directorMode.user_id == window.room?.myUserId()
          ) {
            window.eventChanel.publish({
              event: "layoutChanged",
              layout: "stage_layout",
              trackUniqueId,
            });
            goToCenterStage(e);
          } else {
            goToCenterStage(e);
          }
        }}
      >
        {type === "device" ? (
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
                      track={video}
                      is_hover={hoverConnectivity}
                      userId={userId}
                      type="staged"
                      theme={eventTheme}
                      connectionQuality={connectionQuality}
                      setconnectionQuality={setconnectionQuality}
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
                    ? eventTheme?.button_color_0
                    : connectionQuality == "excellent" ||
                      connectionQuality == "good"
                    ? "#08CF6F"
                    // : status.connectionQuality >= 50
                    // ? "#CFBB08"
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
        {type === "device" ||
        video.customProperty?.type == "device" ||
        video?.source == "screen_share" ? (
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
              e.stopPropagation();
              let publish = false;
              let event = "";
              let id = "";
              let trackId = "";

              if (video?.source == "screen_share") {
                event = "removeScreenShare";
                id = userId;
                publish = true;
              } else if (video.customProperty?.type != "device") {
                event = "removeDevice";
                id = video.id;
                publish = true;
              } else if (video.customProperty?.type == "device") {
                console.log("removeLocalDevice");
                event = "removeLocalDevice";
                id = userId;
                trackId = video.sid;
                publish = true;
              }

              if (publish) {
                // @ts-ignore
                window?.eventChanel?.publish({
                  event,
                  id,
                  trackId,
                });
              }
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
                      trackUniqueId={trackUniqueId}
                      userId={userId}
                      is_hover={true}
                      setHoverMenu={sethoverMore}
                      type="staged"
                      position={position}
                      theme={eventTheme}
                      // updateVolumeLocal={updateVolumeLocal}
                      isDirector={
                        conference.directorMode.mode &&
                        conference.directorMode.user_id ===
                          window.room?.localParticipant.sid
                      }
                      viewerType={viewerType}
                      track={video}
                      audioTrack={audio}
                      dbuserId={user.user_id}
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
        {HandRise.includes(userId) && video?.isDefaultVideoTrack() && (
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
          {type === "device" ? (
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
                // data={data}
                data={currentActiveUserDevices[0]}
                volume={currentActiveUserId == video?.id ? confVolume : 0}
                ShareUrl={data.url}
                id={video?.id}
              />
            </div>
          ) : !videoMuted ? (
            <video
              autoPlay
              style={{
                width: "130px",
                aspectRatio: 16 / 9,
              }}
              id={`video-${trackUniqueId}`}
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
          ) : userId == window.room?.myUserId() ? (
            <></>
          ) : (
            // <div
            //   style={{
            //     backgroundColor: "#032E57",
            //     borderRadius: "4px",
            //     width: "39px",
            //     height: "25px",
            //     position: "absolute",
            //     top: "42px",
            //     right: "6px",
            //     display: "flex",
            //     alignItems: "center",
            //     justifyContent: "center",
            //   }}
            // >
            //   <img alt="" src="/assets/icons/on_videos/unmuted_audio.svg" />
            // </div>
            hover && (
              <div
                style={{
                  backgroundColor: "#032E57",
                  borderRadius: "4px",
                  width: "75px",
                  height: "20px",
                  position: "absolute",
                  top: type == "device" ? "46px" : "52px",
                  right: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0px 10px 0px 5px",
                }}
              >
                <img
                  src="/assets/three_dot_overlay_icons/audio.svg"
                  alt=""
                  style={{ width: "14px", padding: "0px 3px 0px 0px" }}
                />
                <Slider
                  aria-label="Volume"
                  // disabled={audioMuted}
                  value={confVolume}
                  onChange={(e) => {
                    if (confVolume != e.target.value) {
                      updateVolumeLocal(e.target.value);
                      setconfVolume(e.target.value);
                    }
                  }}
                  sx={{
                    width: 60,
                    color: audioMuted
                      ? "#143F63 !important"
                      : eventTheme?.button_color_0,
                    height: 2,
                    marginLeft: "6px",
                    borderRadius: "0px",
                    "& .MuiSlider-thumb": {
                      border: "2px solid",
                      borderColor: audioMuted
                        ? "#143F63"
                        : eventTheme?.button_color_0,
                      color: audioMuted ? "#143F63" : "#E1E7EA",
                      // boxShadow: '0 0 0 2px rgba(0, 255, 0, 0.3) !important'
                      width: "13px",
                      height: "13px",
                    },
                    "& .MuiSlider-thumb:hover": {
                      // boxShadow: '0 0 0 2px rgba(0, 255, 0, 0.3) !important'
                    },
                  }}
                />
              </div>
            )
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
            padding: "0px 5px",
            display: "inline-block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "130px",
            textAlign: "center",
            fontFamily: "URW DIN REGULAR",
            fontSize: "12px",
            color: "#88A1AB",
          }}
        >
          {user?.is_organization_user ? "Owner" : role}
        </p>
        <audio
          ref={audioElement}
          autoPlay
          id={`${trackUniqueId}-${userId}-audio`}
          classNameS={`${userId}-audio`}
        />
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

export default LivekitTileNoTrackElement;
