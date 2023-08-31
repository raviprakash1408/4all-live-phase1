import React, { useEffect, useRef, useState } from "react";
import ThreeDotOverlay from "../three_dot_overlay";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip, Slider, Box } from "@mui/material";
import PanToolIcon from "@mui/icons-material/PanTool";
import { changeOpacity, organizationUser } from "../../utilities/common";
// @ts-ignore
import AvatarElem from "../staged_layout/avatar.tsx";
import { shortNameCreator } from "../../utilities/shortName";
import TileConnectivy from "../tile_connectivy";
import {
  LAYOUT_TYPES,
  setCenterStageDevice,
  setcurrentActiveUserId,
  setCurrentActiveVideo,
  setisMobileStaged,
  setLayout,
} from "../../state/conference/conferenceSlice";
import { setPopoverOpen } from "../../state/info/infoSlice";
// @ts-ignore
import MpegtsPlayer from "../mpegtsPlayer.tsx";
// @ts-ignore
import { updateRoomConfig } from "../../livekitConnection/userMap.ts";
// @ts-ignore
import { addVolume } from "../../state/controlpannel/slice.ts";
import CustomTooltip from "../../admin/CustomTooltip";
import Wave from "wave-visualizer";
import { VideoTrack, AudioTrack } from "livekit-client";
// @ts-ignore
import { tableData } from "../ControlPanel.tsx";
import { RootState } from "../../state/store";

interface TileProps {
  type: "tier1" | "tier2" | "tier";
  trackUniqueId: string;
  tileType: "remote" | "local" | "device";
  track: VideoTrack | tableData;
  userId: string;
  audio: AudioTrack;
  user: {
    firstName: string;
    lastName: any;
    avatar: any;
    is_organization_user: any;
    role: string;
  };
}

export const LiveKitTile = (props: TileProps) => {
  
  const audioElement = useRef();
  const [volume, setvolume] = useState(50);
  const [is_hover, setHover] = useState(false);
  const [b_height, setBHeight] = useState("0px");
  const [videoOff, setVideoOff] = useState(false);
  const [is_hover_detail, setHoverDetail] = useState(false);
  const [videomuteLocal, setvideomuteLocal] = useState(false);
  const [mainUser, setMainUser] = useState(false);
  const [connectionQuality, setconnectionQuality] = useState("good");
  const [local_device, setlocal_device] = useState("");


  const dispatch = useDispatch();
  const permissions = useSelector((state: RootState) => state.permissions);
  const local = useSelector((state: RootState) => state.local);
  const eventTheme = useSelector(
    (state: any) => state.theme.eventTheme[state.theme.theme]
  );
  const conference = useSelector((state: any) => state.conference);
  const livekitTracks = useSelector((state: RootState) => state.livekit.tracks);
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
  const [viewerType, setviewerType] = useState(
    getTrackType(props.trackUniqueId)
  );
  const videoMuteIdsList = useSelector(
    (state: any) => state.conference.videoMuteIds
  );
  const HandRise = useSelector((state: RootState) => state.conference.HandRise);

  const devices = useSelector((state: RootState) => state.conference.devices);

  const mouseLeave = () => {
    let container = document.getElementById(
      `draggable_div_${props.type}_${props.trackUniqueId}`
    );
    //   set draggable on container
    // @ts-ignore
    container.draggable = false;
    //   change cursor to normal
    // @ts-ignore
    container.style.cursor = "default";
  };

  const mouseEnter = () => {
    let container = document.getElementById(
      `draggable_div_${props.type}_${props.trackUniqueId}`
    );
    //   set draggable on container
    if (true) {
      // @ts-ignore
      container.draggable = true;
    }

    //   change cursor to grab
    // @ts-ignore
    container.style.cursor = "grab";
  };

  //volume
  const [confVolume, setconfVolume] = useState(100);
  const [streamAudio, setstreamAudio] = useState(false);
  const volumes = useSelector((state) => state.controlpanel.volumes);

  useEffect(() => {
    console.log(volumes, "volumesvolumes");

    let allVolumes = volumes || [];

    let newVolume;
    if (props.tileType == "device") {
      newVolume = allVolumes.find((v) => v.device_id == props.track?.id);
    } else {
      newVolume = allVolumes.find((v) => v.user_id == props.trackUniqueId);
    }
    if (newVolume?.volume == 0) {
      setconfVolume(0);
      audioElement.current.volume = 0;
    } else {
      setconfVolume(newVolume?.volume || 100);
      audioElement.current.volume = newVolume?.volume / 100 || 1;
    }
    // console.log("volumevolume", newVolume?.volume, confVolume, props.track?.id);
  }, [
    confVolume,
    props.tileType,
    props.track?.id,
    props.trackUniqueId,
    volumes,
  ]);

  const updateVolumeLocal = (volume) => {
    if (typeof volume == "object") {
      volume = volume.volume;
    }
    if (audioElement.current) {
      audioElement.current.volume = volume / 100;
    }
    let volumeData = {
      type: props.tileType == "device" ? "device" : "user",
      device_id: props.tileType == "device" ? props.track?.id : null,
      user_id: props.tileType == "device" ? null : props.trackUniqueId,
      volume: volume,
    };

    //  dispatch(addVolume(volumeData));
    if (
      conference.directorMode.mode &&
      conference.directorMode.user_id === window.room.myUserId()
    ) {
      window.eventChanel.publish({ event: "update_volume", volumeData });
    } else {
      dispatch(addVolume(volumeData));
    }
  };

  useEffect(() => {
    let isDefault = false;

    try {
      isDefault = JSON.parse(props.track?.customProperty?.name).default;
    } catch (e) {
      console.log(e);
    }
    // if (isDefault && props.track?.source == "camera") {
    if (isDefault) {
      setMainUser(true);
    }
  }, [props.track?.customProperty?.name, props.track?.source]);

  useEffect(() => {
    let name = "";

    try {
      name = JSON.parse(props.track?.customProperty?.name).name;
    } catch (e) {
      console.log(e);
    }
    // if (isDefault && props.track?.source == "camera") {
    if (name != "") {
      setlocal_device(name);
    }
  }, [props.track?.customProperty?.name, props.track?.source]);

  const b = useRef(null);
  useEffect(() => {
    setBHeight(b.current?.clientHeight);
  }, [b.current?.clientHeight]);

  useEffect(() => {
    if (props.track.isMuted) {
      setVideoOff(true);
    } else {
      setVideoOff(false);
    }
  }, [props.userId, videoMuteIdsList]);

  useEffect(() => {
    if (props.tileType != "device") {
      const video = document.getElementById(
        `video-${props.trackUniqueId}`
      ) as HTMLVideoElement;
      if ((video && !videoOff) || props.track?.source === "screen_share") {
        props.track?.attach(video);
      } else {
        props.track?.detach();
      }
    }
  }, [props.tileType, props.track, props.trackUniqueId, videoOff]);

  useEffect(() => {
    const audio = document.getElementById(
      `${props.trackUniqueId}-${props.type}-audio`
    ) as HTMLAudioElement;

    const canvas = document.getElementById(
      `${props.trackUniqueId}-${props.type}-canvas`
    ) as HTMLCanvasElement;
    if (
      audio &&
      props.userId != window.room?.localParticipant?.participantInfo?.sid
    ) {
      props.audio?.attach(audio);

      try {
      } catch (e) {
        console.log(e, "error");
      }
    }
  }, [props.audio, props.trackUniqueId, props.type, props.userId]);

  useEffect(() => {
    if (audioElement.current) {
      // @ts-ignore
      audioElement.current.volume = volume / 100;
    }
  }, [audioElement, volume]);

  const goToCenterStage = (e) => {
    if (
      permissions.change_horizontal_layout ||
      permissions.change_vertical_layout ||
      permissions.change_tile_layout
    ) {
      if (props.tileType != "device") {
        dispatch(setLayout(LAYOUT_TYPES.STAGE_LAYOUT));

        dispatch(
          setPopoverOpen({
            open: false,
            anchorEl: e.currentTarget,
            orientation: props.type == "tier2" ? "left" : "right",
            id: props.userId,
          })
        );

        dispatch(
          setCurrentActiveVideo({ video: props.track, userId: props.userId })
        );
        // if(props.track.source === "screen_share"){
        // dispatch(setcurrentActiveUserId(props.trackUniqueId));
        // }else{
        dispatch(setcurrentActiveUserId(props.trackUniqueId));
        // }
        dispatch(
          setCenterStageDevice({
            layout_change: true,
            enabled: false,
            url: "",
            id: "",
          })
        );
      } else {
        dispatch(setcurrentActiveUserId(props.track.id));

        dispatch(
          setCenterStageDevice({
            layout_change: true,
            enabled: true,
            url: props.track.url,
            id: props.track.id,
          })
        );
      }
    }
    // }
  };

  useEffect(() => {
    try {
      // @ts-ignore
      window.deviceStreamChannel.on("publication", (ctx) => {
        if (ctx.data.action == "on_unpublish") {
          if (props.tileType == "device") {
            if (ctx.data.client_id === props.track.device.publish.cid) {
              if (props.track.customProperty?.type != "device") {
                // @ts-ignore
                window.eventChanel.publish({
                  event: "removeDevice",
                  id: props.track.id,
                });

                let newDevices = [...devices];
                newDevices = newDevices.filter(
                  (item) => item.id !== props.track.id
                );
                updateRoomConfig({ devices: newDevices });
              } else {
                window.room.localParticipant.unpublishTrack(props.track);
              }
            }
          }
        }
      });
    } catch (error) {
      // console.log(error);
    }
  }, [props.track]);

  return (
    <>
      <div
        ref={b}
        id={`draggable_div_${props.type}_${props.trackUniqueId}`}
        onClick={(e) => {
          if (
            conference.directorMode.mode &&
            conference.directorMode.user_id == window.room?.myUserId()
          ) {
            window.eventChanel.publish({
              event: "layoutChanged",
              layout: "stage_layout",
              trackUniqueId: props.trackUniqueId,
            });
            goToCenterStage(e);
          } else {
            goToCenterStage(e);
          }
        }}
        onMouseEnter={() => {
          setHover(true);
          let container = document.getElementById(
            `draggable_div_${props.type}_${props.trackUniqueId}`
          );
          container.style.cursor = "pointer";
        }}
        onMouseLeave={() => {
          setHover(false);
          let container = document.getElementById(
            `draggable_div_${props.type}_${props.trackUniqueId}`
          );
          container.style.cursor = "default";
        }}
        style={{
          position: "relative",
          containerType: "inline-size",
        }}
      >
        {props.tileType != "device" ? (
          !videoOff ? (
            <video
              style={{
                width: "100%",
                aspectRatio: "16/9",
                "--ring-color": eventTheme?.button_color_0,
                "--ring-color-2": changeOpacity(eventTheme?.button_color_0, 0),
                "--ring-color-3": changeOpacity(
                  eventTheme?.button_color_0,
                  0.5
                ),
                "--ring-color-4": changeOpacity(eventTheme?.button_color_0, 1),
                outline:
                  HandRise.includes(props.userId) && mainUser
                    ? `2px solid ${eventTheme?.button_color_0}`
                    : "none",
              }}
              id={`video-${props.trackUniqueId}`}
              autoPlay={true}
              muted={true}
              className={`no-select outer-video-${
                mainUser && props.track?.source == "camera" ? props.userId : ""
              }`}
              disablePictureInPicture
            />
          ) : (
            <div
              style={{
                outline:
                  HandRise.includes(props.userId) && mainUser
                    ? `2px solid ${eventTheme?.button_color_0}`
                    : "none",
                // margin: "auto",
                // width: "auto",
                aspectRatio: 16 / 9,
                backgroundColor: eventTheme?.bg_color_2
                  ? eventTheme?.bg_color_2
                  : "rgba(20, 63, 99, 1)",
                borderRadius: "4px",
                position: "relative",
              }}
            >
              {/* <canvas id={`${props.trackUniqueId}-${props.type}-canvas`}></canvas> */}
              <div
                className={`no-select outer-ring-${
                  mainUser ? props.userId : ""
                }`}
                style={{
                  "--ring-color": eventTheme?.button_color_0,
                  "--ring-color-2": changeOpacity(
                    eventTheme?.button_color_0,
                    0
                  ),
                  "--ring-color-3": changeOpacity(
                    eventTheme?.button_color_0,
                    0.5
                  ),
                  "--ring-color-4": changeOpacity(
                    eventTheme?.button_color_0,
                    1
                  ),
                  width: "22%",
                  height: "40%",
                  borderRadius: "50%",
                  backgroundColor: eventTheme?.dark_theme_color_3
                    ? eventTheme?.dark_theme_color_3
                    : "rgba(1, 34, 67, 1)",
                  position: "absolute",
                  top: "45%",
                  right: "50%",
                  transform: "translate(50%,-50%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // border: "2px solid #008BCD",
                }}
              >
                <AvatarElem
                  userShortName={shortNameCreator(
                    props.user?.firstName,
                    props.user?.lastName
                  )}
                  avatar={props.user?.avatar ? props.user?.avatar : "null"}
                  view="horizontal"
                  theme={eventTheme}
                />
              </div>
            </div>
          )
        ) : (
          <></>
        )}

        {window.mobileCheck() && (
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              // backgroundColor: eventTheme?.button_color_0,
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              zIndex: "99",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setisMobileStaged(true));
              if (
                conference.directorMode.mode &&
                conference.directorMode.user_id == window.room?.myUserId()
              ) {
                window.eventChanel.publish({
                  event: "layoutChanged",
                  layout: "stage_layout",
                  trackUniqueId: props.trackUniqueId,
                });
                goToCenterStage(e);
              } else {
                goToCenterStage(e);
              }
            }}
          >
            <img
              alt=""
              style={{ width: "15px", height: "15px" }}
              src="/assets/bottomIcons/three_dots/fullscreen.svg"
            />
          </Box>
        )}

        {HandRise.includes(props.userId) && mainUser ? (
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              left: "10px",
              backgroundColor: eventTheme?.button_color_0,
              width: "28px",
              height: "25px",
              borderRadius: "4px",
              zIndex: "99",
            }}
          >
            <PanToolIcon
              style={{
                fontSize: "18px",
                padding: "3px 0px 3px 3px",
                color: "white",
              }}
            />
            {/* <img src='assets/bottomIcons/hand.svg' /> */}
          </Box>
        ) : (
          <></>
        )}
        {/* {props.track.customProperty?.type == "device" &&
        props.userId == window.room?.localParticipant.sid &&
        is_hover ? (
          <div
            style={{
              position: "absolute",
              display: "flex",
              width: "30px",
              height: "30px",
              top: "10px",
              right: "50px",
              backgroundColor: videomuteLocal
                ? "rgb(230, 25, 89)"
                : eventTheme?.dark_theme_color_5,
              borderRadius: "4px",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: "14",
            }}
            onClick={(e) => {
              e.stopPropagation();

              window.room?.getLocalVideoTracks().forEach(async (value, key) => {
                if (
                  value.trackName === "Device" &&
                  value.track?.sid === props.track.sid
                ) {
                  //  let selectedVideo = document.getElementById(
                  //    `video-${props.trackUniqueId}`
                  //  );
                  if (!videomuteLocal) {
                    setvideomuteLocal(true);
                    value.track?.setTrackMuted(true);
                  } else {
                    value.track?.setTrackMuted(false);
                    setvideomuteLocal(false);
                  }
                }
              });
            }}
          >
            <img
              alt=""
              src={
                videomuteLocal
                  ? "/assets/bottomIcons/no_cam.svg"
                  : "/assets/bottomIcons/cam.svg"
              }
              style={{
                filter: "brightness(0) invert(1)",
                width: "20px",
              }}
            />
          </div>
        ) : (
          <></>
        )} */}
        {props.tileType == "device" ||
        props.track.customProperty?.type == "device" ||
        props.track?.source == "screen_share"
          ? is_hover && (
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  width: "30px",
                  height: "30px",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "rgb(230, 25, 89)",
                  borderRadius: "4px",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: "10",
                }}
                onClick={(e) => {
                  // step 1 stop event propagation
                  e.stopPropagation();
                  // step 2 declare variable
                  let publish = false;
                  let event = "";
                  let id = "";
                  let trackId = "";
                  if (props.track?.source == "screen_share") {
                    event = "removeScreenShare";
                    id = props.userId;
                    publish = true;
                  } else if (props.track.customProperty?.type != "device") {
                    event = "removeDevice";
                    id = props.track.id;
                    publish = true;
                    let newDevices = [...devices];
                    newDevices = newDevices.filter(
                      (item) => item.id !== props.track.id
                    );
                    updateRoomConfig({ devices: newDevices });
                  } else if (props.track.customProperty?.type == "device") {
                    event = "removeLocalDevice";
                    id = props.userId;
                    trackId = props.track.sid;
                    publish = true;
                  }
                  // else {
                  //   window.room.localParticipant.unpublishTrack(props.track);
                  // }

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
                  }}
                />
              </div>
            )
          : is_hover &&
            props.userId !== window.room?.localParticipant.sid &&
            props.track?.source !== "screen_share" && (
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
                        trackUniqueId={props.trackUniqueId}
                        userId={props.userId}
                        is_hover={true}
                        setHoverMenu={setHover}
                        theme={eventTheme}
                        type={"horizontal"}
                        updateVolumeLocal={""}
                        tileType={props.type}
                        isDirector={
                          conference.directorMode.mode &&
                          conference.directorMode.user_id ===
                            window.room?.localParticipant.sid
                        }
                        viewerType={viewerType}
                        track={props.track}
                        audioTrack={props.audio}
                        dbuserId={props.user.user_id}
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
                placement="left-start"
              >
                <div
                  style={{
                    position: "absolute",
                    display: "flex",
                    width: "30px",
                    height: "30px",
                    top: "10px",
                    right: "10px",
                    //   backgroundColor: is_hover_menu
                    //     ? "#008BCD"
                    //     : eventTheme?.bg_color_0,
                    backgroundColor: eventTheme?.button_color_0
                      ? eventTheme?.button_color_0
                      : "#008BCD",
                    borderRadius: "4px",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    zIndex: "10",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <img
                    alt=""
                    src={
                      "/assets/icons/on_videos/three_dot" +
                      (true ? "_white" : "") +
                      ".svg"
                    }
                  />
                </div>
              </Tooltip>
            )}
        <div
          className="no-select"
          style={{
            // display: "none",
            // display:
            //   is_hover && props.userId == window.room?.localParticipant.sid
            //     ? "none"
            //     : "flex",

            display: "flex",

            // Mannual layout Horizontal and Vertical
            marginTop: "auto", // 16:9 aspect vertical layout

            width: b_height < 350 ? "100%" : "",
            maxWidth: "280px",
            // minWidth: props.width,
            aspectRatio: 16 / 9,

            //height:'20%',
            height: "30px",
            //display:'flex',
            alignItems: "center",
            // justifyContent: "left",
            color: "#E1E7EA",
            fontFamily: "URW DIN REGULAR",
            position: "absolute",
            left: b_height < 350 ? "0px" : "10px",
            bottom: videoOff
              ? b_height < 350
                ? "0px"
                : "10px"
              : b_height < 350
              ? "4px"
              : "14px",
            zIndex: "1",
          }}
        >
          {is_hover && props.tileType == "device" ? (
            <></>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                paddingLeft: "10px",
                alignItems: "center",
                justifyContent: "start",
                overflow: "hidden",
                backgroundColor: eventTheme?.dark_theme_color_3
                  ? eventTheme?.dark_theme_color_3
                  : "rgba(1, 34, 67, 1)",
                opacity: "0.9",
                borderBottomLeftRadius: "4px",
                borderBottomRightRadius: "4px",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
                height: "30px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "18px",
                  height: "18px",
                  minWidth: "18px",
                  minHeight: "18px",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: "10",
                  overflow: "hidden",
                }}
              >
                {props.tileType === "device" ||
                props.track.customProperty.type == "device" ? (
                  <img
                    alt=""
                    src="/assets/bottomIcons/video-sharing.svg"
                    style={{ width: "18px" }}
                  />
                ) : props.track?.source === "screen_share" ? (
                  <img
                    alt=""
                    style={{
                      width: "18px",
                      filter:
                        "invert(49%) sepia(76%) saturate(2282%) hue-rotate(160deg) brightness(93%) contrast(101%)",
                    }}
                    src="/assets/bottomIcons/end_icons/share.svg"
                  />
                ) : window.room?.getLocalAudioTrack()?.track?.isMuted &&
                  props.userId == window.room?.localParticipant.sid ? (
                  <img alt="" src="/assets/icons/on_videos/muted_audio.svg" />
                ) : props.audio?.isMuted ? (
                  <img alt="" src="/assets/icons/on_videos/muted_audio.svg" />
                ) : (
                  <img alt="" src="/assets/icons/on_videos/unmuted_audio.svg" />
                )}
              </div>

              <div
                style={{
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: props.tileType == "device" ? "225px" : "120px",
                  fontFamily: "URW DIN REGULAR",
                  fontSize: "14px",
                  fontSize: "clamp(10px, 3cqw, 14px)",
                }}
              >
                {props.tileType == "device"
                  ? props.user?.firstName +
                    " - " +
                    (props.track.file_name
                      ? props.track.file_name
                      : props.track.name?.split("/").pop())
                  : !mainUser
                  ? props.user?.firstName + " - " + local_device
                  : props.user?.firstName ||
                    "bot" +
                      " " +
                      (!mainUser ? local_device : props.user?.lastName)}
              </div>

              <span
                style={{
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "90px",
                  fontSize: "12px",
                  fontSize: "clamp(10px, 3cqw, 12px)",
                  color: "#88A1AB",
                  //paddingLeft:'10px'
                  fontFamily: "URW DIN REGULAR",
                  paddingRight: "10px",
                }}
              >
                {props.track?.source === "screen_share"
                  ? "Desktop"
                  : props.tileType == "device" ||
                    props.track.customProperty.type == "device"
                  ? ""
                  : props.user?.is_organization_user
                  ? "Owner"
                  : props.user?.role}
              </span>
            </div>
          )}
          {conference.directorMode.mode &&
            conference.directorMode.user_id === props.userId &&
            props.tileType !== "device" &&
            mainUser && (
              // localMainUser == props.userId &&
              <CustomTooltip
                text="Directing view"
                placement="top-start"
                bgColor={"#88A1AB"}
                textColor={eventTheme?.dark_theme_color_3}
              >
                <div
                  style={{
                    borderBottomLeftRadius: "4px",
                    borderBottomRightRadius: "4px",
                    borderTopLeftRadius: "4px",
                    borderTopRightRadius: "4px",
                    marginLeft: "10px",
                    backgroundColor: eventTheme?.dark_theme_color_3
                      ? eventTheme?.dark_theme_color_3
                      : "rgba(1, 34, 67, 1)",
                    opacity: "0.9",
                    padding: "6px 7px 4px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    style={{
                      height: "15px",
                    }}
                    alt=""
                    src="/assets/bottomIcons/three_dots/director_mode.svg"
                  />
                </div>
              </CustomTooltip>
            )}
        </div>
        {conference.directorMode.mode &&
          conference.directorMode.user_id === window.room?.myUserId() &&
          (conference.layout == "dynamic_layout_horizontal" ||
            conference.layout == "dynamic_layout_vertical") && (
            // conference.layout == "dynamic_grid_layout"
            <div
              style={{
                position: "absolute",
                display: is_hover ? "flex" : "none",
                width: "30px",
                height: "30px",
                top: "10px",
                left: props.tileType === "device" ? "10px" : "50px",
                backgroundColor: true
                  ? `${eventTheme?.button_color_0}`
                  : "#143F63",
                borderRadius: "4px",
                alignItems: "center",
                justifyContent: "center",
                // cursor: "pointer",
                zIndex: "10",
              }}
              onMouseOver={mouseEnter}
              onMouseLeave={mouseLeave}
              className="drag_button"
            >
              {/* <img alt="" draggable="false" src="/assets/drag/drag.svg" /> */}
              <img
                alt=""
                draggable="false"
                src="/assets/drag/up.svg"
                className="drag-icon-up"
              />
              <img
                alt=""
                draggable="false"
                src="/assets/drag/left.svg"
                className="drag-icon-left"
              />
              <img
                alt=""
                draggable="false"
                src="/assets/drag/right.svg"
                className="drag-icon-right"
              />
              <img
                alt=""
                draggable="false"
                src="/assets/drag/down.svg"
                className="drag-icon-down"
              />
            </div>
          )}
        {is_hover &&
          organizationUser(permissions?.show_connectivity_test) &&
          props.tileType == "remote" && (
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
                      track={props.track}
                      is_hover={is_hover_detail}
                      userId={props.userId}
                      theme={eventTheme}
                      type="horizontal"
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
                  width: "30px",
                  height: "30px",
                  top:
                    HandRise.includes(props.userId) && mainUser
                      ? "40px"
                      : "10px",
                  left: "10px",
                  backgroundColor: is_hover_detail
                    ? eventTheme?.button_color_0
                    : connectionQuality == "excellent" ||
                      connectionQuality == "good"
                    ? "#08CF6F"
                    : // : connectionQuality == "good"
                      // ? "#CFBB08"
                      "#CF4408",
                  borderRadius: "4px",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: "10",
                }}
                onClick={(e) => {
                  e.stopPropagation();

                  //dispatch(setPopoverOpen({open:true,anchorEl:e.currentTarget,orientation:props.type=="tier2" ? "left" : "right",id:props.userId}))
                }}
                onMouseEnter={() => setHoverDetail(true)}
                onMouseLeave={() => setHoverDetail(false)}
              >
                <img alt="" src="/assets/icons/on_videos/detail.svg" />
              </div>
            </Tooltip>
          )}

        {props.userId == window.room?.localParticipant.sid &&
        props.track?.isDefaultVideoTrack &&
        mainUser ? (
          <></>
        ) : props.track?.source === "screen_share" ? (
          <></>
        ) : (
          !props.audio?.isMuted && (
            <div
              style={{
                position: "absolute",
                display:
                  is_hover && permissions.control_volume_of_remote_user
                    ? "flex"
                    : "none",
                width: streamAudio ? "40px" : "135px",
                height: "auto",
                bottom: streamAudio
                  ? "12px"
                  : props.tileType === "device"
                  ? "7px"
                  : "30px",
                right: "10px",
                backgroundColor:
                  props.tileType === "device"
                    ? ""
                    : streamAudio
                    ? "#88A1AB"
                    : eventTheme?.bg_color_0,
                borderRadius: "4px",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: "10",
                padding: "2px 0px",
                // rotate: "270deg",
              }}
              onClick={(e) => {
                e.stopPropagation();

                setstreamAudio(!streamAudio);
                if (!streamAudio) {
                  updateVolumeLocal(0);
                } else {
                  updateVolumeLocal(50);
                }
              }}
            >
              <img
                alt=""
                src={
                  streamAudio
                    ? "/assets/bottomIcons/three_dots/no_audio.svg"
                    : "/assets/bottomIcons/three_dots/audio.svg"
                }
                style={{
                  width: "18px",
                  // rotate: "90deg",
                  // filter: streamAudio
                  //   ? "brightness(0) saturate(100%) invert(9%) sepia(51%) saturate(3191%) hue-rotate(196deg) brightness(93%) contrast(99%)"
                  //   : "",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  width: streamAudio ? "40px" : "135px",
                  height: "auto",
                  bottom: "30px",
                  right: "10px",
                  backgroundColor: streamAudio
                    ? "#88A1AB"
                    : eventTheme?.bg_color_0,
                  borderRadius: "4px",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: "10",
                  // rotate: "270deg",
                }}
              />
              {!streamAudio && (
                <Slider
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  aria-label="Volume"
                  //   disabled={audioMuted}
                  value={confVolume}
                  onChange={(e) => {
                    // setvolume(e.target.value);
                    if (confVolume != e.target.value) {
                      updateVolumeLocal(e.target.value);
                    }
                  }}
                  sx={{
                    width: 76,
                    color: eventTheme?.button_color_0,
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
              )}
            </div>
          )
        )}
        {/* {conference.directorMode.mode &&
      conference.directorMode.user_id === props.userId && (
        <div
          style={{
            display: is_hover ? "none" : "flex",

            //display: "flex",
            backgroundColor: eventTheme?.dark_theme_color_3
              ? eventTheme?.dark_theme_color_3
              : "rgba(1, 34, 67, 1)",
            opacity: "0.9",
            margin: "auto",

            
            borderBottomLeftRadius: "4px",
            borderBottomRightRadius: "4px",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
            height: "30px",
            position: "absolute",
            bottom: "10px",
            padding: "0px 10px",
            width:'30px'
          }}
        >
          <img
            style={{
              height: "15px",
              marginLeft: "-10px",
              paddingRight: "10px",
            }}
            alt=""
            src="/assets/bottomIcons/three_dots/director_mode.svg"
          />
        </div>
      )} */}
        <audio
          ref={audioElement}
          autoPlay
          id={`${props.trackUniqueId}-${props.type}-audio`}
          className={`${props.userId}-audio`}
        />

        {props.tileType === "device" ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              // margin: "5px 0px",
              // backgroundColor: "rgb(20, 63, 99)",
              borderRadius: "4px",
            }}
            // onClick={()=>{
            //   dispatch(setcurrentActiveUserId(props.data.id));

            // }}
          >
            <MpegtsPlayer
              data={props.track}
              volume={confVolume}
              ShareUrl={props.track.url}
              control={true}
              is_hover={is_hover}
              id={props.track?.id}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
