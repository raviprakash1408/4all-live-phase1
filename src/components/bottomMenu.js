import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setVideoMuted,
  setAudioMuted,
  setCurrentVideoTrack,
  setCurrentAudioTrack,
  setVideoSwitchTrack,
  setCurrentAudioTrackSwitch,
  STREAM_TYPES,
  setShowBottomMenu,
  setScreenSharing,
  setShareUrl,
  setStreamType,
  setVideoPermission,
} from "../state/local/localSlice";

import Slide from "@mui/material/Slide";
import { Input, Typography } from "@mui/material";
import Settings from "./Settings";
import { useNavigate } from "react-router-dom";
import {
  LAYOUT_TYPES,
  setHandRise,
  setLayout,
  setCurrentActiveVideo,
  setdirectorMode,
  setcurrentActiveUserId,
  setreplacedTrackId,
  sethideUpArrow,
  setfullscreen,
} from "../state/conference/conferenceSlice";
import { setPopoverOpen } from "../state/info/infoSlice";
import FileManager from "../sections/FileManager";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import BottomMenuButton from "./bottomMenuButton";
import KeyboardShortcuts from "./keyboardShortcuts";

import {
  //MediaPermissionsError,
  MediaPermissionsErrorType,
  requestMediaPermissions,
} from "mic-check";

import AllowCameraAndMicrophone from "./devicePermission/allow_camera_and_microphone";
import CameraAndMicrophoneBlocked from "./devicePermission/camera_and_microphone_blocked";
import CameraAndMicrophoneNotUsed from "./devicePermission/camera_and_microphone_not_used";
import BottomMenuLayoutElement from "./bottom_menu_layout_element";
import ThreeDotMenuElement from "./three_dot_menu_element";
import BottomMenuEndElement from "./bottom_menu_end_element";
import BottomMenuAudioInputVolumn from "./bottom_menu_audio_input_volumn";
import NewWindow from "react-new-window";
import Devices from "./Devices/index.tsx";
import Share from "./Event/share.tsx";
import { updateRoomConfig } from "../livekitConnection/userMap.ts";
import { organizationUser, userLogout } from "../utilities/common";
import SpaceChat from "./SpaceChat/index.tsx";
import { newChatState } from "../state/spaceChat/spaceChatSlice.ts";
import { setChatOpened } from "../state/spaceChat/spaceChatSlice.ts";
import {
  Track,
  createLocalVideoTrack,
  LocalTrackPublication,
  createLocalAudioTrack,
  VideoPresets,
  DataPacket_Kind,
} from "livekit-client";
import { setRender } from "../state/livekit/slice.ts";
import LeaveDrop from "./popup/leaveDrop.tsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
let VideoTracksToDelete = {};
// popup menu items
export const PopupMenuItems = (props) => {
  const { theme } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [videoTracks, setvideoTracks] = useState({});
  const local = useSelector((state) => state.local);
  const permissions = useSelector((state) => state.permissions);
  const conference = useSelector((state) => state.conference);
  const directorMode = useSelector((state) => state.conference.directorMode);
  const participantPositions = useSelector(
    (state) => state.conference.participantPositions
  );

  const current_layout = useSelector((state) => state.conference.layout);

  // Theme color dark and light
  const theme_color = useSelector((state) => state.theme.theme);

  // iAmDirector
  const [iAmDirector, setiAmDirector] = useState(false);
  // noDirector
  const [noDirector, setnoDirector] = useState(true);
  //useState for devices
  const [devices, setDevices] = useState([]);
  const [audioOutputDevices, setaudioOutputDevices] = useState([]);
  const [audioInputDevices, setaudioInputDevices] = useState([]);

  useEffect(() => {
    // get director mode from conference state
    if (
      conference.directorMode.mode &&
      conference.directorMode.user_id === window.room.myUserId()
    ) {
      setiAmDirector(true);
      setnoDirector(false);
    } else if (
      conference.directorMode.mode &&
      conference.directorMode.user_id !== window.room.myUserId()
    ) {
      setiAmDirector(false);
      setnoDirector(false);
    } else {
      setiAmDirector(false);
      setnoDirector(true);
    }
  }, [conference.directorMode.mode, conference.directorMode.user_id]);

  const handleClickOpen = () => {
    props.setopenEndDialoge(true);
  };

  const handleClickOpenEndEvent = () => {
    props.setOpenEndEvent(true);
  };

  const handleClose = () => {
    props.setopenEndDialoge(false);
  };
  const handleCloseEndEvent = () => {
    props.setOpenEndEvent(false);
  };

  // function for switcch camera and mic device in livekit room
  const switchDevice = async (type, deviceId, vtrack) => {
    if (type === "video") {
      localStorage.setObject("camDeviceId", deviceId);
      //  if(localStorage.getObject("videoMuted") != "true") {
      window.room.getLocalVideoTracks().forEach((value, key) => {
        console.log("switching video device", value.trackName);
        let defaultTrack = false;
        try {
          defaultTrack = JSON.parse(value.trackName).default;
        } catch (error) {
          defaultTrack = false;
        }
        if (defaultTrack && value.source != "screen_share") {
          const videoTrack = vtrack;

          let isMuted = localStorage.getObject("videoMuted") == "true";

          let oldTrack = props.trackPosition.filter(
            (item) => item.trackId === value.track.sid
          )[0];
          dispatch(setreplacedTrackId(value.track.sid));
          const strData = JSON.stringify({
            type: "replaceTrack",
            prevTrackid: value.track.sid,
          });
          const encoder = new TextEncoder();

          // publishData takes in a Uint8Array, so we need to convert it
          const data = encoder.encode(strData);

          // publish reliable data to a set of participants
          window.room.localParticipant.publishData(
            data,
            DataPacket_Kind.RELIABLE
          );

          window.room.localParticipant
            .publishTrack(videoTrack, {
              name: JSON.stringify({
                default: true,
                user_type: oldTrack.trackType,
                prevTrackId: value.track.sid,
              }),
            })
            .then((lt) => {
              dispatch(setRender("switchCamera"));

              window.room.localParticipant.unpublishTrack(value.track);
              lt.track.setTrackMuted(isMuted);
            });
        }
      });
      //  }
    } else if (type === "audioinput") {
      localStorage.setObject("micDeviceId", deviceId);
      window.room
        .switchActiveDevice("audioinput", deviceId)
        .then((track) => {
          console.log("switched audio track", track);
        })
        .catch((err) => {
          console.log("error switching audio track", err);
        });
    } else if (type === "audiooutput") {
      localStorage.setObject("audioOutputDeviceId", deviceId);
      window.room
        .switchActiveDevice("audiooutput", deviceId)

        .then((track) => {
          console.log("switched audio track", track);
        })
        .catch((err) => {
          console.log("error switching audio track", err);
        });
    }
  };

  useEffect(() => {
    if (devices.length === 0) {
      window.navigator.mediaDevices.enumerateDevices().then((devicelist) => {
        setDevices(devicelist.filter((device) => device.kind === "videoinput"));
        setaudioOutputDevices(
          devicelist.filter((device) => device.kind === "audiooutput")
        );
        setaudioInputDevices(
          devicelist.filter((device) => device.kind === "audioinput")
        );
      });
    }

    if (props.popoverType == "Video" && devices.length > 0) {
      devices.forEach(async (device, index) => {
        const preferredCodecs = [
          { mimeType: "video/av1" },
          { mimeType: "video/vp9" },
        ];

        const videoTrack = await createLocalVideoTrack(
          {
            deviceId: device.deviceId || undefined,
          },
          { preferredCodecs }
        );
        videoTrack.attach(
          document.getElementById(`video_local_${device.deviceId}`)
        );
        VideoTracksToDelete[
          device.deviceId + Object.keys(VideoTracksToDelete).length
        ] = videoTrack;
      });
    }

    return () => {
      // loop through all VideoTracks and stop them
      Object.keys(VideoTracksToDelete).forEach((key, index) => {
        let videotracks = [];
        try {
          // VideoTracksToDelete[key].detach();
          VideoTracksToDelete[key].stop();
        } catch (error) {
          console.log("videoTrackvideoTrackvideoTrack", error);
        }
      });
    };
  }, [devices, devices.length, props]);

  const getLocalVideoTrack = () => {
    const localTracks = window.room?.getLocalVideoTracks();
    const localVideoTrack = Array.from(localTracks.values()).find(
      (track) => track.kind === "video"
    );
    return localVideoTrack;
  };

  switch (props.popoverType) {
    case "Share":
      return <Share props={{ ...props }} theme={theme} />;
    case "Video":
      return (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "0px",
            paddingLeft: "9px",
            // paddingRight: "5px",
            backgroundColor: theme?.bg_color_0,
          }}
        >
          <div
            style={{
              display: props.is_show_overflow ? "flex" : "none",
              position: "absolute",
              width: "200vw",
              height: "200vh",
              top: "-100vh",
              left: "-100vw",
              zIndex: "-1",
            }}
            onClick={() => {
              //props.handleClose()
              props.setOpen(false);
              props.setShowOverflow(false);
              props.setTmr(Date.now());

              /*props.setHoverChk(false)

              setTimeout(() => {
                //is_chk.current = is_hover_chk
                //console.log("- "+is_chk.current)
                if(!props.is_chk.current) props.setHover(false)
              }, 5000)*/
            }}
          />
          <MenuList
            autoFocusItem={props.open}
            id="composition-menu"
            aria-labelledby="composition-button"
            onKeyDown={props.handleListKeyDown}
            style={{
              overflowY: "scroll",
              maxHeight: "70vh",
              overflowX: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {devices.map((item, index) => {
              let selected =
                localStorage.getObject("camDeviceId") === item.deviceId;
              return (
                <MenuItem
                  onClick={async (e) => {
                    let selectedVideo = document.getElementById(
                      `video_local_${item.deviceId}`
                    );

                    // create LocalVideoTrack with selectedVideo.srcObject.getVideoTracks()[0]
                    let track = await createLocalVideoTrack({
                      deviceId: item.deviceId,
                    });

                    switchDevice("video", item.deviceId, track);
                    if (localStorage.getObject("muteVideo") === "true") {
                      track.stop();
                    }
                    props.handleClose(e);
                  }}
                  key={index}
                  style={{
                    //padding: '13px 18px',
                    position: "relative",
                    padding: "0px",
                    //marginTop: '5px',
                    display: "flex",
                    flexDirection: "column",
                    //border: selected ? "3px solid #008BCD": "default",
                    color: selected ? theme?.font_color_0 : "default",
                    overflow: "hidden",
                  }}
                >
                  <video
                    disablePictureInPicture
                    style={{
                      //margin:'auto',
                      //width:'90%',
                      // height:'90%',
                      width: "300px",
                      //height: "full",
                      aspectRatio: 16 / 9,
                      border: selected
                        ? `3px solid ${theme?.button_color_0}`
                        : "default",
                    }}
                    autoPlay
                    key={index}
                    id={`video_local_${item.deviceId}`}
                    className="local-device"
                    muted={true}
                    playsInline={true}
                  />

                  <span
                    style={{
                      position: "absolute",
                      width: "170px",
                      bottom: "10px",
                      //paddingLeft: "10px",
                      //paddingRight: "10px",
                      //paddingLeft: '12px',
                      fontSize: "14px",
                      fontFamily: "URW DIN REGULAR",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {item.label}
                  </span>
                </MenuItem>
              );
            })}
            {/* {local.videoDevices.map((item, index) => {
              let selected =
                getLocalVideoTrack()?.track._mediaStreamTrack.label ==
                item.label;

              return (
                <MenuItem
                  onClick={async (e) => {
                    switchDevice("video", item.deviceId);
                    props.handleClose(e);
                  }}
                  key={index}
                  style={{
                    //padding: '13px 18px',
                    position: "relative",
                    padding: "0px",
                    //marginTop: '5px',
                    display: "flex",
                    flexDirection: "column",
                    //border: selected ? "3px solid #008BCD": "default",
                    color: selected ? theme?.font_color_0 : "default",
                    overflow: "hidden",
                  }}
                >
                  <video
                    disablePictureInPicture
                    style={{
                      //margin:'auto',
                      //width:'90%',
                      // height:'90%',
                      width: "300px",
                      //height: "full",
                      aspectRatio: 16 / 9,
                      border: selected
                        ? `3px solid ${theme?.button_color_0}`
                        : "default",
                    }}
                    autoPlay
                    id={`${item.deviceId}-video`}
                  />

                  <span
                    style={{
                      position: "absolute",
                      width: "170px",
                      bottom: "10px",
                      //paddingLeft: "10px",
                      //paddingRight: "10px",
                      //paddingLeft: '12px',
                      fontSize: "14px",
                      fontFamily: "URW DIN REGULAR",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {item.label}
                  </span>
                </MenuItem>
              );
            })} */}
          </MenuList>
        </div>
      );
    case "Audio":
      return (
        <div
          style={{
            position: "absolute",
            maxWidth: "250px",
            bottom: "10px",
            left: "0px",
            backgroundColor: theme.bg_color_0,
            userSelect: "none",
          }}
        >
          <div
            style={{
              display: props.is_show_overflow ? "flex" : "none",
              position: "absolute",
              width: "200vw",
              height: "200vh",
              top: "-100vh",
              left: "-100vw",
              zIndex: "-1",
            }}
            onClick={() => {
              //props.handleClose()
              props.setOpen(false);
              props.setShowOverflow(false);
              props.setTmr(Date.now());

              /*props.setHoverChk(false)

              setTimeout(() => {
                //is_chk.current = is_hover_chk
                //console.log("- "+is_chk.current)
                if(!props.is_chk.current) props.setHover(false)
              }, 5000)*/
            }}
          />
          <MenuList
            style={{
              overflowY: "scroll",
              maxHeight: "40vh",
              overflowX: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            autoFocusItem={props.open}
            id="audio-menu"
            aria-labelledby="composition-button"
            onKeyDown={props.handleListKeyDown}
            //className="no-scrollbar"
            className="vertical-scrollbar"
          >
            <Typography
              style={{
                fontSize: "18px",
                fontFamily: "URW DIN REGULAR",
                padding: "8px 14px",
                color: theme?.font_color_0,
              }}
            >
              Audio Inputs
            </Typography>

            {audioInputDevices.map((item, index) => {
              let selected =
                localStorage.getObject("micDeviceId") === item.deviceId;

              return (
                <MenuItem
                  onClick={(e) => {
                    // switchAudioInput(item.deviceId);
                    switchDevice("audioinput", item.deviceId);

                    props.handleClose(e);
                  }}
                  deviceId={item.deviceId}
                  key={index}
                  style={{
                    //padding:'13px 18px',
                    marginTop: "5px",
                    paddingTop: "13px",
                    paddingLeft: "30px",
                    paddingRight: "50px",
                    backgroundColor: selected
                      ? theme?.button_color_0
                      : "default",
                    color: selected ? theme?.font_color_0 : "default",
                    overflow: "hidden",
                  }}
                >
                  {/* <img src='/assets/icons/connectivity.png' style={{paddingLeft: '8px'}} /> */}
                  <span
                    style={{
                      /*paddingLeft: '12px',*/
                      maxWidth: "full",
                      fontSize: "14px",
                      fontFamily: "URW DIN REGULAR",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {" "}
                    {item.label}
                  </span>

                  <BottomMenuAudioInputVolumn
                    deviceid={item.deviceId}
                    default_volumn={0}
                  />
                </MenuItem>
              );
            })}

            <Typography
              style={{
                fontSize: "18px",
                fontFamily: "URW DIN REGULAR",
                padding: "8px 14px",
                color: theme?.font_color_0,
              }}
            >
              Audio Outputs
            </Typography>

            {audioOutputDevices?.map((item, index) => {
              let selected =
                localStorage.getObject("audioOutputDeviceId") === item.deviceId;

              return (
                <MenuItem
                  id={item.label}
                  key={index}
                  style={{
                    //padding: '13px 18px',
                    marginTop: "5px",
                    paddingTop: "13px",
                    //paddingLeft: "5px",
                    paddingLeft: "30px",
                    //paddingRight: "30px",
                    paddingRight: "5px",
                    backgroundColor: selected
                      ? theme?.button_color_0
                      : "default",
                    color: selected ? theme?.font_color_0 : "default",
                    overflow: "hidden",
                  }}
                  onClick={() => {
                    switchDevice("audiooutput", item.deviceId);

                    props.handleClose();
                  }}
                >
                  {/* <img src='/assets/icons/connectivity.png' style={{paddingLeft: '8px'}} /> */}
                  <span
                    style={{
                      /*paddingLeft: '12px',*/
                      fontSize: "14px",
                      maxWidth: "full",
                      fontFamily: "URW DIN REGULAR",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.label}
                  </span>

                  <span>
                    <img
                      alt=""
                      style={{
                        width: "20px",
                        height: "auto",
                        paddingRight: "10px",
                      }}
                      src="/assets/images/play.svg"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </span>
                </MenuItem>
              );
            })}
          </MenuList>
        </div>
      );

    case "layout":
      return (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "-120px",
            backgroundColor: theme.bg_color_0,
          }}
        >
          <div
            style={{
              display: props.is_show_overflow ? "flex" : "none",
              position: "absolute",
              width: "200vw",
              height: "200vh",
              top: "-100vh",
              left: "-100vw",
              zIndex: "-1",
            }}
            onClick={() => {
              // if (!noDirector) return;

              //props.handleClose()
              props.setOpen(false);
              props.setShowOverflow(false);
              props.setTmr(Date.now());

              /*props.setHoverChk(false)

              setTimeout(() => {
                //is_chk.current = is_hover_chk
                //console.log("- "+is_chk.current)
                if(!props.is_chk.current) props.setHover(false)
              }, 5000)*/
            }}
          />

          <MenuList
            style={{
              overflowY: "scroll",
              //height:"9vh",
              overflowX: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            autoFocusItem={props.open}
            id="layout-menu"
            aria-labelledby="composition-button"
            onKeyDown={props.handleListKeyDown}
            className="no-scrollbar"
          >
            {organizationUser(permissions.change_tile_layout) && (
              <BottomMenuLayoutElement
                iAmDirector={iAmDirector}
                props={props}
                title="Tileview layout"
                layout={LAYOUT_TYPES.DYNAMIC_GRID_LAYOUT}
                icon="tileview"
                theme={theme}
              />
            )}
            {organizationUser(permissions.change_horizontal_layout) && (
              <BottomMenuLayoutElement
                iAmDirector={iAmDirector}
                props={props}
                title="Horizontal layout"
                layout={LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL}
                icon="horizontal"
                theme={theme}
              />
            )}
            {organizationUser(permissions.change_vertical_layout) && (
              <BottomMenuLayoutElement
                iAmDirector={iAmDirector}
                props={props}
                title="Vertical layout"
                layout={LAYOUT_TYPES.DYNAMIC_LAYOUT_VERTICAL}
                icon="vertical"
                theme={theme}
              />
            )}
          </MenuList>
        </div>
      );
    case "End Call":
      return (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "-70px",
            backgroundColor: theme.bg_color_0,
          }}
        >
          <div
            style={{
              display: props.is_show_overflow ? "flex" : "none",
              position: "absolute",
              width: "200vw",
              height: "200vh",
              top: "-100vh",
              left: "-100vw",
              zIndex: "-1",
            }}
            onClick={() => {
              //props.handleClose()
              props.setOpen(false);
              props.setShowOverflow(false);
              props.setTmr(Date.now());

              /*props.setHoverChk(false)

              setTimeout(() => {
                //is_chk.current = is_hover_chk
                //console.log("- "+is_chk.current)
                if(!props.is_chk.current) props.setHover(false)
              }, 5000)*/
            }}
          />

          <MenuList
            style={{
              overflowY: "scroll",
              //height:"9vh",
              overflowX: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            autoFocusItem={props.open}
            id="endcall-menu"
            aria-labelledby="composition-button"
            onKeyDown={props.handleListKeyDown}
            className="no-scrollbar"
          >
            {organizationUser(permissions.leave_event) && (
              <BottomMenuEndElement
                props={props}
                title="Leave event"
                icon="leave"
                onClick={(e) => {
                  handleClickOpen();
                }}
                theme={theme}
              />
            )}
            {organizationUser(permissions.end_event) && (
              <BottomMenuEndElement
                props={props}
                title="End event"
                icon="end"
                onClick={(e) => {
                  handleClickOpenEndEvent();
                }}
                theme={theme}
              />
            )}
          </MenuList>
          {/* <PopUp
            message="Are you sure you want to end the space, all users will be kicked out of the meeting"
            openEndDialoge={openEndEvent}
            handleClose={handleCloseEndEvent}
            handleYes={() => {
              window.eventChanel.publish({
                event: "kickAllUser",
              });
            }}
            theme={theme}
          /> */}

          {/* <PopUp
            message="Are you sure you want to leave?."
            openEndDialoge={openEndDialoge}
            handleClose={handleClose}
            handleYes={() => {
              window.location.href = "/spaces/";
            }}
            theme={theme}
          /> */}
        </div>
      );

    default:
      return (
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "0px",
            //left: "-50%",
            backgroundColor: theme.bg_color_0,
          }}
        >
          <div
            style={{
              display: props.is_show_overflow ? "flex" : "none",
              position: "absolute",
              width: "200vw",
              height: "200vh",
              top: "-100vh",
              left: "-100vw",
              zIndex: "-1",
            }}
            onClick={() => {
              //props.handleClose()
              props.setOpen(false);
              props.setShowOverflow(false);
              props.setTmr(Date.now());

              /*props.setHoverChk(false)

              setTimeout(() => {
                //is_chk.current = is_hover_chk
                //console.log("- "+is_chk.current)
                if(!props.is_chk.current) props.setHover(false)
              }, 5000)*/
            }}
          />

          <MenuList
            autoFocusItem={props.open}
            id="threeDot-menu"
            aria-labelledby="composition-button"
            onKeyDown={props.handleListKeyDown}
            style={{
              zIndex: "2",
            }}
          >
            {/* {permissions.start_connectivity_test && (
              <ThreeDotMenuElement
                props={props}
                title="Connectivity test"
                icon="connectivity"
                onClick={(e) => {
                  props.handleClose(e);
                }}
              />
            )} */}

            {/* {permissions.performance_settings && (
              <ThreeDotMenuElement
                props={props}
                title="Performance settings"
                icon="performance"
                onClick={(e) => {
                  props.handleClose(e);
                }}
              />
            )} */}

            {/* {permissions.share_video && (
              <ThreeDotMenuElement
                props={props}
                title="Share video"
                icon="share"
                onClick={(e) => {
                  props.showShareHandler();
                  props.setopenView(1);
                  props.handleClose(e);

                  props.setOpen(false);
                  props.setShowOverflow(false);
                  props.setHoverChk(false);
                  props.setHover(false);
                }}
              />
            )} */}

            {/* {permissions.share_audio && (
              <ThreeDotMenuElement
                props={props}
                title="Share audio"
                icon="audio"
                onClick={(e) => {
                  props.handleClose(e);
                }}
              />
            )} */}

            {organizationUser(permissions.settings) &&
              !conference.hideUpArrow && (
                <ThreeDotMenuElement
                  props={props}
                  title="Settings"
                  icon="settings"
                  onClick={(e) => {
                    props.showPopupHandler();
                    props.handleClose(e);

                    props.setOpen(false);
                    props.setShowOverflow(false);
                    props.setHoverChk(false);
                    props.setHover(false);
                  }}
                  theme={theme}
                />
              )}

            {/* {organizationUser(permissions.control_panel) && iAmDirector && (
              <ThreeDotMenuElement
                props={props}
                title="Control Panel"
                icon="controlPanel"
                onClick={(e) => {
                  props.setopenControlPanel(true);
                  props.handleClose(e);
                }}
              />
            )} */}
            {organizationUser(permissions.director_mode) && (
              <ThreeDotMenuElement
                iAmDirector={iAmDirector}
                directorMode={directorMode}
                props={props}
                title={"Director Mode"}
                icon="director_mode"
                boolean={true}
                onClick={(e) => {
                  if (directorMode.mode === false) {
                    dispatch(
                      setdirectorMode({
                        mode: !directorMode.mode,
                        user_id: window.room?.myUserId(),
                      })
                    );
                    props.handleClickToast("You are directoring now");

                    // publish the director mode through the eventchannel
                    window.eventChanel.publish({
                      event: "director_mode",
                      value: !directorMode.mode,
                      user_id: window.room?.myUserId(),
                      participantPositions,
                      layout: current_layout,
                      currentActiveUserId: conference.currentActiveUserId,
                      activeUserId: conference.currentActiveVideo?.userId,
                      centerStage: conference.centerStage,
                    });
                  } else {
                    if (conference.directorMode.mode) {
                      // check if the user who left is the director
                      if (
                        conference.directorMode.user_id ==
                        window.room?.myUserId()
                      ) {
                        // turn off director mode
                        dispatch(
                          setdirectorMode({ mode: false, user_id: null })
                        );
                        props.handleClickToast(
                          "You have turned off director mode"
                        );
                        window.eventChanel.publish({
                          event: "director_mode",
                          value: !directorMode.mode,
                          user_id: window.room?.myUserId(),
                          participantPositions,
                          layout: current_layout,
                        });
                      }
                    }
                  }
                  let directorMode1 = {
                    mode: !directorMode.mode,
                    user_id: window.room?.myUserId(),
                    id: localStorage.getObject("id"),
                  };

                  updateRoomConfig({ directorMode: directorMode1 });
                  props.setOpen(false);
                  props.setShowOverflow(false);
                  props.setTmr(Date.now());
                }}
                checked={iAmDirector}
                theme={theme}
              />
            )}
            {organizationUser(permissions.view_full_screen) && (
              <ThreeDotMenuElement
                props={props}
                title={
                  conference.fullscreen
                    ? "Exit full screen"
                    : "View full screen"
                }
                icon="fullscreen"
                onClick={(e) => {
                  var element = document.querySelector("#MainEvent");
                  if (conference.fullscreen) {
                    document.exitFullscreen();
                    dispatch(setfullscreen(false));
                  } else {
                    element.requestFullscreen();
                    dispatch(setfullscreen(true));
                  }

                  props.handleClose(e);
                }}
                theme={theme}
              />
            )}

            {/* {organizationUser(permissions.view_shortcuts) && (
              <ThreeDotMenuElement
                props={props}
                title="View shortcuts"
                icon="shortcuts"
                onClick={(e) => {
                  props.setShowWindow("keyboard_shortcuts");
                  props.handleClose(e);

                  props.setOpen(false);
                  props.setShowOverflow(false);
                  props.setHoverChk(false);
                  props.setHover(false);
                }}
              />
            )} */}
            {/* {organizationUser(permissions.manage_devices) && (
              <ThreeDotMenuElement
                props={props}
                title="Manage Devices"
                icon="manage_devices"
                onClick={(e) => {
                  props.setmanageDevices(true);
                  props.handleClose(e);

                  props.setOpen(false);
                  props.setShowOverflow(false);
                  props.setHoverChk(false);
                  props.setHover(false);
                }}
              />
            )} */}
          </MenuList>
        </div>
      );
  }
};

// create react functional component
export default function BottomMenu(props) {
  const { theme } = props;

  //  bottomMenuRef
  const bottomMenuRef = useRef(null);
  const arrowMenuRef = useRef(null);
  const HandRise = useSelector((state) => state.conference.HandRise);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openView, setopenView] = useState(2);
  // const theme = useSelector((state) => state.theme.themeData);
  const local = useSelector((state) => state.local);
  const permissions = useSelector((state) => state.permissions);

  const conference = useSelector((state) => state.conference);
  const [openPop, setOpenPop] = React.useState(false);
  const [shareUrl, setshareUrl] = useState("");
  // state for manageDevices
  const [manageDevices, setmanageDevices] = React.useState(false);
  const theme_color = useSelector((state) => state.theme.theme);

  const [showPopup, setshowPopup] = useState(false);
  const [showShare, setshowShare] = useState(false);
  // state popovertype
  const [popoverType, setpopoverType] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openControlPanel, setOpenControlPanel] = useState(false);
  const controlPanel = useRef(null);
  // iAmDirector
  const [iAmDirector, setiAmDirector] = useState(false);
  // noDirector
  const [noDirector, setnoDirector] = useState(true);

  const [openChat, setopenChat] = useState(false);
  //state for muteTrack
  const [muteTrack, setmuteTrack] = useState();
  // state for muteVideo
  const [muteVideo, setmuteVideo] = useState();

  const [openEndDialoge, setopenEndDialoge] = React.useState(false);

  const [openEndEvent, setOpenEndEvent] = React.useState(false);

  const trackPosition = useSelector((state) => state.livekit.trackPosition);

  useEffect(() => {
    setmuteTrack(localStorage.getObject("audioMuted") === "true")
    setmuteVideo(localStorage.getObject("videoMuted") === "true")

    window.addEventListener("storage", (e) => {
      console.log(localStorage.getObject("audioMuted"), "lllll");
      if (localStorage.getObject("audioMuted") === "true") {
        setmuteTrack(true);
      } else {
        setmuteTrack(false);
      }

      if (localStorage.getObject("videoMuted") === "true") {
        setmuteVideo(true);
      } else {
        setmuteVideo(false);
      }
    });
  }, []);


  // get layout disabled
  const layoutDisabled = () => {
    let disabled = false;
    // if(noDirector) {
    //   disabled = false;
    // }
    // else{
    //   if(iAmDirector){
    //     disabled = false;
    //   }
    //   else{
    //     disabled = true;
    //   }
    // }
    return disabled;
  };

  useEffect(() => {
    // get director mode from conference state
    if (
      conference.directorMode.mode &&
      conference.directorMode.user_id === window.room.myUserId()
    ) {
      setiAmDirector(true);
      setnoDirector(false);
    } else if (
      conference.directorMode.mode &&
      conference.directorMode.user_id !== window.room.myUserId()
    ) {
      setiAmDirector(false);
      setnoDirector(false);
    } else {
      setiAmDirector(false);
      setnoDirector(true);
    }
  }, [conference.directorMode.mode, conference.directorMode.user_id]);

  useEffect(() => {
    if (local.showBottomMenu) {
      window.setTimeout(() => {
        dispatch(setShowBottomMenu(false));
      }, 5000);
    }
  }, [local.showBottomMenu]);

  function setopenControlPanel(value) {
    if (value && controlPanel.current) {
      controlPanel.current.window.focus();
    }
    setOpenControlPanel(value);
  }
  function showPopupHandler() {
    setshowPopup(true);
  }

  function closePopupHandler() {
    setshowPopup(false);
  }

  function showShareHandler() {
    setshowShare(true);
  }

  function closeShareHandler() {
    setshowShare(false);
  }

  const handleClickOpen = () => {
    setOpenPop(true);
  };

  const handleClosePop = () => {
    setOpenPop(false);
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = (_pop) => {
    if (_pop == popoverType) {
      setOpen((prevOpen) => !prevOpen);
      setShowOverflow(!is_show_overflow);
    } else {
      setOpen(true);
      setShowOverflow(true);
    }
  };

  const handleClose = (event) => {
    // if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //   return;
    // }

    setOpen(false);
    setShowOverflow(false);
  };

  const [openToast, setOpenToast] = React.useState(false);
  const [handrised, setHandrised] = React.useState(true);
  const [toastData, settoastData] = useState("");

  const handleClickToast = (content = null, type) => {
    if (type === "hand") {
      setHandrised(!handrised);
      if (content) {
        settoastData(content);
      }
      if (handrised) {
        setOpenToast(true);
      }
    } else {
      if (content) {
        settoastData(content);
      }
      setOpenToast(true);
    }
  };

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
      setShowOverflow(false);
    } else if (event.key === "Escape") {
      setOpen(false);
      setShowOverflow(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      try {
        anchorRef.current.focus();
      } catch (error) {
        console.warn(error);
      }
    }

    prevOpen.current = open;
  }, [open]);

  const [device_active_video, setDeviceActiveVideo] = useState(false);
  const [device_active_audio, setDeviceActiveAudio] = useState(false);

  const current_layout = useSelector((state) => state.conference.layout);
  const current_active_video = useSelector(
    (state) => state.conference.currentActiveVideo
  );

  useEffect(() => {
    try {
      if (current_active_video == null) {
        if (window.room?.localParticipant.getDefaultVideoTrack() != null) {
          dispatch(
            setCurrentActiveVideo({
              video: window.room?.localParticipant.getDefaultVideoTrack(),
              userId: window.room?.localParticipant
                .getDefaultVideoTrack()
                .getParticipantId(),
            })
          );
          dispatch(
            setcurrentActiveUserId(
              window.room?.localParticipant.getDefaultVideoTrack().sid
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const participantPropertyChange = useSelector(
    (state) =>
      state.userProfile.userUpdated.userId +
      state.userProfile.userUpdated.value +
      state.userProfile.userUpdated.type
  );
  const [temp_layout, setTempLayout] = useState(current_layout);
  React.useEffect(() => {
    if (
      temp_layout != current_layout &&
      (current_layout == LAYOUT_TYPES.DYNAMIC_GRID_LAYOUT ||
        current_layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL ||
        current_layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_VERTICAL)
    ) {
      //temp = current_layout
      setTempLayout(current_layout);
    }
    //console.log(current_active_video, "------------------- ACTIVE VIDEO")
  }, [current_layout]);

  // React.useEffect(() => {
  //   if (permissions.switch_audio_on_off) {
  //    dispatch(setCurrentAudioTrack(null));
  //   }
  // }, [dispatch, permissions.switch_audio_on_off]);

  const BottomMenuItems = [
    {
      show: organizationUser(permissions.mute_video),
      name: "Video",
      bgColor:
        device_active_video && organizationUser(permissions.mute_video)
          ? muteVideo
            ? theme?.button_color_1
            : /*"rgba(1, 42, 80, 1)"*/ ""
          : theme?.button_color_0,
      icon:
        device_active_video && organizationUser(permissions.mute_video)
          ? muteVideo
            ? "/assets/bottomIcons/no_cam.svg"
            : "/assets/bottomIcons/cam.svg"
          : "/assets/bottomIcons/no_cam_disable.svg",
      // pointer:
      //   device_active_video &&
      //   organizationUser(permissions.mute_video) &&
      //   muteVideo
      //     ? false
      //     : true,
      pointer: conference.hideUpArrow ? false : true,
      permission: true,
      disable:
        device_active_video && organizationUser(permissions.mute_video)
          ? false
          : true,
      active: false,
      tooltip_shotcut_win: "ALT + V",
      tooltip_shotcut_osx: "Option + V",
      tooltip_description: "Select camera device",
      onClick: () => {
        window.room.getLocalVideoTracks().forEach((value, key) => {
          // value.track.source === "camera";
          try {
            //create createLocalVideoTrack with localstorage device id
            //     createLocalVideoTrack({

            //   deviceId: localStorage.getObject("camDeviceId") || undefined,

            // }).then((track) => {
            //   console.log(track, "track");
            //   track.setTrackMuted(!muteVideo);
            //   window.room.localParticipant.publishTrack(track).then(() => {
            //     window.room.localParticipant.unpublishTrack(value.track);
            //   });

            // });

            if (
              JSON.parse(value.trackName).default &&
              (value.track.source === "camera" ||
                value.track.source === "unknown")
            ) {
              if (!muteVideo) {
                value.track.stop();
                value.track.setTrackMuted(!muteVideo);
              } else {
                value.track.restart().then(() => {
                  value.track.setTrackMuted(!muteVideo);
                });
              }
            }
          } catch (error) {
            console.log(error);
          }
        });

        localStorage.setObject("videoMuted", !muteVideo);
      },
    },
    {
      show: organizationUser(permissions.mute_audio),
      name: "Audio",
      bgColor:
        device_active_audio && organizationUser(permissions.mute_audio)
          ? muteTrack
            ? theme?.button_color_1
            : /*"rgba(1, 42, 80, 1)"*/ ""
          : theme?.button_color_0,
      icon:
        device_active_audio && organizationUser(permissions.mute_audio)
          ? muteTrack
            ? "/assets/bottomIcons/no_mic.svg"
            : "/assets/bottomIcons/mic.svg"
          : "/assets/bottomIcons/no_mic_disable.svg",
      // pointer:
      //   device_active_audio &&
      //   organizationUser(permissions.mute_audio) &&
      //   muteTrack
      //     ? false
      //     : true,
      pointer: conference.hideUpArrow ? false : true,
      //switch by up arrow
      permission: true,
      disable:
        device_active_audio && organizationUser(permissions.mute_audio)
          ? false
          : true,
      active: false,
      tooltip_shotcut_win: "ALT + A",
      tooltip_shotcut_osx: "Option + A",
      tooltip_description: "Select audio device",
      onClick: () => {
        window.room?.localParticipant.setMicrophoneEnabled(muteTrack);
        localStorage.setObject("audioMuted", !muteTrack);
      },
      // popover menu component
    },
    {
      show:
        organizationUser(permissions.share_screen) ||
        organizationUser(permissions.manage_devices) ||
        organizationUser(permissions.share_video),
      name: "Share",
      bgColor: /*"rgba(1, 42, 80, 1)"*/ "",
      icon: "/assets/bottomIcons/share.svg",
      tooltip_shotcut_win: "ALT + S",
      tooltip_shotcut_osx: "Option + S",
      tooltip_description: "Share your screen",
      pointer: false,
      disable: false,
      active: local.screenSharing,
      onClick: (e) => {
        e.stopPropagation();
        setpopoverType("Share");
        handleToggle("Share");
        setAnchorEl(e.currentTarget);
        // if (local.screenSharing) {
        //   window.room2.getLocalTracks().forEach((track) => {
        //     window.room2
        //       .removeTrack(track)
        //       .then((succ) => console.log("succccc", succ))
        //       .catch((err) => console.log("err", err));
        //     track.dispose();
        //   });

        //   window.room2.leave();
        //   // window.connection2.disconnect()
        //   dispatch(setScreenSharing(false));
        // } else {
        //   room2Init();
        //   connectDesktop(localStorage.getObject("currentSubSpaceSlug"), dispatch);
        //   dispatch(setScreenSharing(true));
        // }

        // handleClickOpen()
      },
    },
    {
      show: organizationUser(permissions.chat_on_space) && !window.mobileCheck(),
      name: "Chat",
      bgColor: /*"rgba(1, 42, 80, 1)"*/ "",
      icon: "/assets/bottomIcons/chat.svg",
      pointer: false,
      disable: false,
      tooltip_shotcut_win: "ALT + C",
      tooltip_shotcut_osx: "Option + C",
      tooltip_description: "Open chat box",
      onClick: () => {
        setopenChat(!openChat);
        dispatch(newChatState(false));
        dispatch(setChatOpened(true));
      },
    },
    //share video close
    // {
    //   show: true,
    //   name: "Filemanager",
    //   bgColor: "#E61959",
    //   icon: "/assets/bottomIcons/three_dots/filemanager.svg",
    //   pointer: false,
    //   disable: false,
    //   tooltip_shotcut_win: "ALT + C",
    //   tooltip_shotcut_osx: "Option + C",
    //   tooltip_description: "Close Share Video",
    //   onClick: () => {
    //     console.log("Chat");
    //     dispatch(setStreamType(STREAM_TYPES.NORMAL));
    //     dispatch(setShareUrl(""));
    //     window.room.sendCommandOnce("Share", {
    //       value: JSON.stringify({ shareUrl, userId: local.userId }),
    //     });
    //   },
    // },
    {
      show: organizationUser(permissions.raise_hand),
      name: "Hand",
      bgColor: /*"rgba(1, 42, 80, 1)"*/ !handrised
        ? `${theme?.button_color_0}`
        : "",
      icon: !handrised
        ? "/assets/bottomIcons/hand_white.svg"
        : "/assets/bottomIcons/hand.svg",
      pointer: false,
      disable: false,
      active: false,
      tooltip_shotcut_win: "ALT + H",
      tooltip_shotcut_osx: "Option + H",
      tooltip_description: "Put your hand up",
      onClick: () => {
        // window.room.sendCommandOnce("HandRise", { value: local.userId });
        try {
          window.eventChanel.publish({
            event: "HandRised",
            value: {
              user_id: window.room?.localParticipant.sid,
            },
          });
        } catch (error) {
          window.eventChanel.publish({
            event: "HandRised",
            value: {
              user_id: window.room?.localParticipant.sid,
            },
          });
        }

        handleClickToast("You have Raised Your Hand!", "hand");
        handleClickOpen();
      },
    },
    {
      show:
        (organizationUser(permissions.change_horizontal_layout) ||
          organizationUser(permissions.change_vertical_layout) ||
          organizationUser(permissions.change_tile_layout)) && !window.mobileCheck(),
      name: "layout",
      bgColor: /*"rgba(1, 42, 80, 1)"*/ "",
      /*bgColor:  current_layout == LAYOUT_TYPES.DYNAMIC_GRID_LAYOUT ||
                      current_layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL ||
                      current_layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_VERTICAL ?
                        "#008BCD" : "",*/
      icon:
        temp_layout == LAYOUT_TYPES.DYNAMIC_GRID_LAYOUT
          ? "/assets/bottomIcons/layouts/tileview.svg"
          : temp_layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL
            ? "/assets/bottomIcons/layouts/horizontal.svg"
            : "/assets/bottomIcons/layouts/vertical.svg",
      pointer: true,
      permission:
        organizationUser(permissions.change_horizontal_layout) ||
        organizationUser(permissions.change_vertical_layout) ||
        organizationUser(permissions.change_tile_layout),
      disable: layoutDisabled(),
      active:
        current_layout == LAYOUT_TYPES.DYNAMIC_GRID_LAYOUT ||
          current_layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL ||
          current_layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_VERTICAL
          ? true
          : false,
      tooltip_shotcut_win: "ALT + L",
      tooltip_shotcut_osx: "Option + L",
      tooltip_description: "Change to layout",
      onClick: (e) => {
        if (layoutDisabled()) return;
        e.preventDefault();

        // let layout = conference.layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL ? LAYOUT_TYPES.DYNAMIC_LAYOUT_VERTICAL: LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL
        //let layout = conference.layout == LAYOUT_TYPES.DYNAMIC_GRID_LAYOUT ? LAYOUT_TYPES.DYNAMIC_LAYOUT_VERTICAL : LAYOUT_TYPES.DYNAMIC_GRID_LAYOUT

        //let temp = ""

        /*if(temp_layout != current_layout &&
                  (
                    current_layout == LAYOUT_TYPES.DYNAMIC_GRID_LAYOUT ||
                    current_layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL ||
                    current_layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_VERTICAL
                  )
                ) {
                  //temp = current_layout
                  setTempLayout(current_layout)
                }*/

        // --------------------------

        if (current_active_video == null) {
          // if (!conference.hideUpArrow){
          dispatch(
            setCurrentActiveVideo({
              video: window.room?.localParticipant.getDefaultVideoTrack(),
              userId: window.room?.myUserId(),
            })
          );
          dispatch(
            setcurrentActiveUserId(
              window.room?.localParticipant.getDefaultVideoTrack().sid
            )
          );
          // }
        }

        let layout =
          current_layout == LAYOUT_TYPES.DYNAMIC_GRID_LAYOUT ||
            current_layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL ||
            current_layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_VERTICAL
            ? LAYOUT_TYPES.STAGE_LAYOUT
            : temp_layout;

        //let layout = current_layout

        // let layout = LAYOUT_TYPES.STAGE_LAYOUT;
        dispatch(setLayout(layout));
        if (!iAmDirector) return;
        window.eventChanel.publish({
          event: "layoutChanged",
          layout,
          trackUniqueId:
            window.room?.localParticipant?.getDefaultVideoTrack()?.sid,
        });
        // handleClickOpen()

        console.log("------------- START CHECK AVTIVE VIDEO --------------");

        if (layout == LAYOUT_TYPES.STAGE_LAYOUT) {
          if (current_active_video == null) {
            console.log("-------------- NOT ACTIVE VIDEO -----------------");
            /*console.log(remoteVideoTracks)
                    const [user_id] = remoteVideoTracks.keys()
                    const [video] = remoteVideoTracks.values()

                    console.log(user_id, "----------- ID")
                    console.log(video, "----------- VIDEO")

                    dispatch(setPopoverOpen({open:false, anchorEl: e.currentTarget, orientation: "left", id: user_id}))
                    dispatch(setCurrentActiveVideo(video))*/

            /*let activeVideo = document.getElementById(`active-video`)

                    current_active_video.attach(activeVideo)

                    current_active_video.onloadedmetadata = (e) => {
                      current_active_video.play();
                    }*/

            console.log(
              "-------------- END NOT ACTIVE VIDEO -----------------"
            );
          } else {
            console.log("---------------- ACTIVE VIDEO --------------------");
          }
        }
      },
    },
    {
      show:
        organizationUser(permissions.leave_event) ||
        organizationUser(permissions.end_event),
      name: "EndCall",
      bgColor: theme.button_color_1
        ? theme.button_color_1
        : "rgba(230, 25, 89, 1)",
      icon: local.callStarted
        ? "/assets/bottomIcons/hangup.svg"
        : "/assets/bottomIcons/hangup.svg",
      pointer: false,
      disable: false,
      active: false,
      tooltip_shotcut_win: "ALT + E",
      tooltip_shotcut_osx: "Option + E",
      tooltip_description: "End call",
      onClick: (e) => {
        e.stopPropagation();
        setpopoverType("End Call");
        handleToggle("End Call");
        setAnchorEl(e.currentTarget);
      },
    },

    // {
    //   show: true,
    //     name: 'More',
    //     bgColor: "rgba(1, 42, 80, 1)" ,
    //     icon: "/assets/bottomIcons/more.svg",
    //     pointer: false,
    //     onClick: () => {
    //        setshowPopup(true);
    //     }
    // }
  ];

  // loop through bottom menu items
  const bottomMenuItems = BottomMenuItems.filter((elem) => elem.show).map(
    (item, index) => {
      return (
        <BottomMenuButton
          key={index}
          item={item}
          setOpen={setOpen}
          anchorRef={anchorRef}
          setpopoverType={setpopoverType}
          handleToggle={handleToggle}
          setAnchorEl={setAnchorEl}
          theme={theme}
        />
      );

      // return bottom menu item
      /*return (
            <div
              key={index}
              style={
                {
                  cursor:"pointer",
                  backgroundColor: item.bgColor,
                  zIndex: "1",
                  display:"flex",
                  justifyContent:"center",
                  padding:"12px",
                  margin:"5px",
                  borderRadius: '4px',
                  position: 'relative'
                }
              }

              className="bottom-menu-item noselect"
            >
              <img style={{
                  width: '26px',
                  height: '26px',
              }}
              
              onClick={() => {
                  item.onClick()
                  setOpen(false)
                }
              }
              
              src={item.icon} alt={item.name} />
          {item.pointer ? <img ref={anchorRef}  onClick={(e)=>{
            setpopoverType(item.name)
            handleToggle(item.name)
            setAnchorEl(e.currentTarget)
          }} src='/assets/icons/up.svg' style={{position: 'absolute', top: '-3%', right: '0%', padding: '5px 3px',backgroundColor: '#143F63',borderRadius: '4px'}} /> : <></> } 
          
        </div>
        );*/
    }
  );

  const [is_hover, setHover] = useState(true);
  //const [is_hover_chk, setHoverChk] = useState(false)
  const [is_show_overflow, setShowOverflow] = useState(false);
  const [tmr, setTmr] = useState(Date.now() + 5000);
  const [is_hover_c, setIsHoverC] = useState(false);

  //const is_chk = useRef(is_hover_chk)
  //is_chk.current = is_hover_chk

  const is_tmr = useRef(tmr);
  is_tmr.current = tmr;

  const [is_window, setWindow] = useState(null);

  const setShowWindow = useCallback((name) => {
    switch (name) {
      case "keyboard_shortcuts":
        setWindow(
          <KeyboardShortcuts
            closePopupHandler={closePopupHandler}
            setWindow={setWindow}
          />
        );
        break;
      case "allow_camera_and_microphone":
        setWindow(
          <AllowCameraAndMicrophone
            closePopupHandler={closePopupHandler}
            setWindow={setWindow}
          />
        );
        break;
      case "camera_and_microphone_blocked":
        setWindow(
          <CameraAndMicrophoneBlocked
            closePopupHandler={closePopupHandler}
            setWindow={setWindow}
          />
        );
        break;
      case "camera_and_microphone_not_used":
        setWindow(
          <CameraAndMicrophoneNotUsed
            closePopupHandler={closePopupHandler}
            setWindow={setWindow}
          />
        );
        break;
      default:
        setWindow(null);
    }
  }, []);
  const rerendered = useSelector((state) => state.livekit.rerender);
  const permissionDevice = useCallback(() => {
    requestMediaPermissions({ audio: false, video: true })
      .then(() => {
        // console.log("can successfully access camera and microphone streams");
        setDeviceActiveVideo(true);
        dispatch(setVideoPermission(true));
      })
      .catch((err) => {
        const { type, name, message } = err;
        if (type === MediaPermissionsErrorType.SystemPermissionDenied) {
          // console.log(
          //   "browser does not have permission to access camera or microphone"
          // );
          setShowWindow("camera_and_microphone_blocked");
        } else if (type === MediaPermissionsErrorType.UserPermissionDenied) {
          // user didn't allow app to access camera or microphone
          // console.log("user didn't allow app to access camera or microphone");
          dispatch(setVideoPermission(false));
          setDeviceActiveVideo(false);
          setShowWindow("allow_camera_and_microphone");
        } else if (
          type === MediaPermissionsErrorType.CouldNotStartVideoSource
        ) {
          // camera is in use by another application (Zoom, Skype) or browser tab (Google Meet, Messenger Video)
          // (mostly Windows specific problem)
          // console.log(
          //   "camera is in use by another application (Zoom, Skype) or browser tab (Google Meet, Messenger Video)"
          // );
          // console.log("(mostly Windows specific problem)");
        } else {
          // not all error types are handled by this library
          // console.log("not all error types are handled by this library");
          setShowWindow("camera_and_microphone_not_used");
        }
      });

    requestMediaPermissions({ audio: false, video: true })
      .then(() => {
        // can successfully access camera and microphone streams
        // DO SOMETHING HERE
        // console.log("can successfully access camera and microphone streams");
        setDeviceActiveVideo(true);
        dispatch(setVideoPermission(true));
      })
      .catch((err) => {
        const { type, name, message } = err;
        if (type === MediaPermissionsErrorType.SystemPermissionDenied) {
          // browser does not have permission to access camera or microphone
          // console.log(
          //   "browser does not have permission to access camera or microphone"
          // );
          setShowWindow("camera_and_microphone_blocked");
        } else if (type === MediaPermissionsErrorType.UserPermissionDenied) {
          // user didn't allow app to access camera or microphone
          // console.log("user didn't allow app to access camera or microphone");
          setShowWindow("allow_camera_and_microphone");
        } else if (
          type === MediaPermissionsErrorType.CouldNotStartVideoSource
        ) {
          // camera is in use by another application (Zoom, Skype) or browser tab (Google Meet, Messenger Video)
          // (mostly Windows specific problem)
          // console.log(
          //   "camera is in use by another application (Zoom, Skype) or browser tab (Google Meet, Messenger Video)"
          // );
          // console.log("(mostly Windows specific problem)");
        } else {
          // not all error types are handled by this library
          // console.log("not all error types are handled by this library");
          setShowWindow("camera_and_microphone_not_used");
        }
        dispatch(setVideoPermission(false));
        setDeviceActiveVideo(false);
      });

    requestMediaPermissions({ audio: true, video: false })
      .then(() => {
        // can successfully access camera and microphone streams
        // DO SOMETHING HERE
        // console.log("can successfully access camera and microphone streams");
        setDeviceActiveAudio(true);
      })
      .catch((err) => {
        const { type, name, message } = err;
        if (type === MediaPermissionsErrorType.SystemPermissionDenied) {
          // browser does not have permission to access camera or microphone
          // console.log(
          //   "browser does not have permission to access camera or microphone"
          // );
          setShowWindow("camera_and_microphone_blocked");
        } else if (type === MediaPermissionsErrorType.UserPermissionDenied) {
          // user didn't allow app to access camera or microphone
          // console.log("user didn't allow app to access camera or microphone");
          setShowWindow("allow_camera_and_microphone");
        } else if (
          type === MediaPermissionsErrorType.CouldNotStartVideoSource
        ) {
          // camera is in use by another application (Zoom, Skype) or browser tab (Google Meet, Messenger Video)
          // (mostly Windows specific problem)
          // console.log(
          //   "camera is in use by another application (Zoom, Skype) or browser tab (Google Meet, Messenger Video)"
          // );
          // console.log("(mostly Windows specific problem)");
        } else {
          // not all error types are handled by this library
          // console.log("not all error types are handled by this library");
          setShowWindow("camera_and_microphone_not_used");
        }

        setDeviceActiveAudio(false);
      });
  }, [dispatch, participantPropertyChange, setShowWindow]);

  useEffect(() => {
    const customTrackPositions = {};
    trackPosition.forEach((track_position, index) => {
      customTrackPositions[track_position.trackId] = track_position;
    });
    window.room?.localParticipant.videoTracks.forEach((value, index) => {
      if (value.trackName) {
        if (customTrackPositions[value.trackSid]?.trackType == "V") {
          dispatch(setVideoPermission(false));
          setDeviceActiveVideo(false);
          setDeviceActiveAudio(false);
          dispatch(sethideUpArrow(true));
          return;
        } else {
          dispatch(sethideUpArrow(false));
        }
      }
    });
  }, [dispatch, rerendered, trackPosition]);

  useEffect(() => {
    permissionDevice();
    // setHover(true);
    setHover(false);

    /*setTimeout(() => {
        if(!is_chk.current) setHover(false)
      }, 5000)*/

    bottomMenuRef.current &&
      bottomMenuRef.current.addEventListener("mouseenter", () => {
        setHover(true);
        //setHoverChk(true)
        setTmr(Date.now());
      });

    // setInterval(() => {
    //   //console.log(Date.now() - is_tmr.current)
    //   const tmrLeft = Date.now() - is_tmr.current;

    //   if (tmrLeft >= 5000) {
    //     setHover(false);
    //   }
    // }, 500);
  }, [permissionDevice]);
  //outside click

  const warpperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event) => {
    const { current: wrap } = warpperRef;
    if (wrap && !wrap.contains(event.target)) {
      if (window.mobileCheck()) {
        setHover(true);
      } else {
        setHover(false);
      }
    }
  };
  const [arrowUp, setarrowUp] = useState(true);

  return (
    <div>
      <div
        ref={bottomMenuRef}
        style={{
          position: "absolute",
          display: "flex",
          width: window.mobileCheck() ? "33vw" : "30vw",
          left: "34vw",
          height: "100px",
          maxHeight: "100px",
          bottom: window.mobileCheck() ? "-20px" : "0px",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "3",
        }}

        /*onMouseEnter={ () => {
            setHover(true)
            setHoverChk(true)
          }
        }
        onMouseLeave={ () => {
            setHoverChk(false)

            setTimeout(() => {
              if(!is_chk.current) setHover(false)
            }, 5000)
          }
        }*/
      >
        {/* <div
          style={{
            height: "19px",
            width: "79px",
            backgroundColor: "rgba(1, 25, 52, 1)",
            borderRadius: "4px 4px 0px 0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: "3",
            opacity:
              local.showBottomMenu ||
              ((is_hover || open) && !is_window && !showPopup && !showShare)
                ? "1"
                : "0",
            // opacity: "1",
            position: "absolute",
            // left: "50%",
            // padding: "25px",
            top:
              local.showBottomMenu ||
              ((is_hover || open) && !is_window && !showPopup && !showShare)
                ? "2px"
                : "100px",
            // top:'1px',
            // transform: `translateX(-50%)`,
            // width: "79px",
            // height: "19px",
            transition: `
                            top 0.5s ease-in-out`,
          }}
          onClick={() => {
            console.log("arrowUp", arrowUp);
            setarrowUp(!arrowUp);
          }}
        >
          <img
            alt=""
            src="/assets/icons/up.svg"
            style={
              {
                // rotate: showBottomMenu() ? "" : "180deg",
              }
            }
          />
        </div> */}
        <div
          style={
            {
              position: "absolute",
              display: "flex",
              padding: "20px",

              top:
                window.mobileCheck() &&
                conference.layout == "stage_layout" &&
                conference.hideHeader
                  ? "60px"
                  : "0px",
              opacity:
                local.showBottomMenu ||
                ((is_hover || open) && !is_window && !showPopup && !showShare)
                  ? "1"
                  : "0",

              transition: `
                            top 0.5s ease-in-out,
                            opacity 0.5s ease-in-out
                          `,
            }
            /*{
              transform: 'translateX(-50%) translateY(-50%)',
              display: 'flex',
              left: '50%',
              bottom: '0%',
              position: 'absolute',
              padding: '20px'
            }*/
          }

          //onMouseLeave={() => setOpen(false) }
        >
          <div
            //className="bottom-menu"
            ref={warpperRef}
            style={{
              display: is_hover ? "flex" : "none",
              //background:'rgba(1, 25, 52, 0.5)',
              backgroundColor: theme.bg_color_0,
              //padding:'20px',
              padding: "0px",
              borderRadius: "4px",
              zIndex: "2",
              width: window.mobileCheck() ? "101vw" : "auto",
              justifyContent: "space-between",
            }}
          >
            {bottomMenuItems}

            {(organizationUser(permissions.director_mode) ||
              organizationUser(permissions.settings) ||
              organizationUser(permissions.view_full_screen) ||
              organizationUser(permissions.view_shortcuts)) && (
              <Box
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={(e) => {
                  setpopoverType("default");
                  handleToggle("default");
                  setAnchorEl(e.currentTarget);
                }}
                onMouseEnter={() => setIsHoverC(true)}
                onMouseLeave={() => setIsHoverC(false)}
                style={{
                  cursor: "pointer",
                  backgroundColor: is_hover_c ? `${theme?.button_color_0}` : "",
                  display: window.mobileCheck() ? "none" : "flex",
                  justifyContent: "center",
                  padding: "12px",
                  margin: "5px",
                  borderRadius: "4px",
                  position: "relative",
                  zIndex: "1",
                }}
                className="bottom-menu-item noselect"
              >
                <img
                  alt=""
                  style={{
                    width: "26px",
                    height: "26px",
                  }}
                  src={
                    "/assets/bottomIcons/more" +
                    (is_hover_c ? "_white" : "") +
                    ".svg"
                  }
                />

                <div
                  style={{
                    display: is_hover_c ? "flex" : "none",
                    color: theme?.font_color_2,
                    fontSize: "15px",
                    padding: "8px 10px",
                    backgroundColor: theme?.bg_color_0,
                    borderRadius: "4px",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: "60px",
                  }}
                >
                  More&nbsp;actions
                </div>
              </Box>
            )}

            {/* <Box
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Dashboard
        </Box> */}
            <Popper
              open={open}
              anchorEl={anchorEl}
              role={undefined}
              placement="top-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    /*transformOrigin:
                      placement === 'top-start' ? 'left top' : 'left bottom',*/
                    transformOrigin: "top-start",
                    position: "fixed",
                  }}
                >
                  <Paper
                    style={{
                      width: "12vw",
                      backgroundColor: theme.bg_color_0,
                      color: "#88A1AB",
                    }}
                  >
                    <ClickAwayListener onClickAway={handleClose}>
                      {open ? (
                        <PopupMenuItems
                          handleClose={handleClose}
                          open={open}
                          local={local}
                          popoverType={popoverType}
                          setopenControlPanel={setopenControlPanel}
                          showPopupHandler={showPopupHandler}
                          showShareHandler={showShareHandler}
                          setopenView={setopenView}
                          setOpen={setOpen}
                          setHover={setHover}
                          setopenEndDialoge={setopenEndDialoge}
                          setOpenEndEvent={setOpenEndEvent}
                          //setHoverChk={ setHoverChk }
                          //is_chk={ is_chk }
                          setTmr={setTmr}
                          is_show_overflow={is_show_overflow}
                          setShowOverflow={setShowOverflow}
                          setShowWindow={setShowWindow}
                          setmanageDevices={setmanageDevices}
                          handleClickToast={handleClickToast}
                          theme={theme}
                          trackPosition={trackPosition}
                        />
                      ) : (
                        <></>
                      )}
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>

          {/* <Dialog
        fullWidth	= {true}
        maxWidth={"sm"}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Share Youtube/vimeo video</DialogTitle>
        <DialogContent>
          <Input style={{width:"100%"}} value={shareUrl} onChange={e=>setshareUrl(e.target.value)} placeholder='https://www.youtube.com/watch?v=BV8Lm3yl2ng' />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={()=>{
            console.log(shareUrl,"shareUrl");
            dispatch(setStreamType(STREAM_TYPES.SHARING))
            dispatch(setShareUrl(shareUrl))
            window.room.sendCommandOnce('Share', {value:shareUrl});
            handleClose()
        }}>Share</Button>

     
        </DialogActions>
      </Dialog> */}
        </div>
        <Snackbar
          open={openToast}
          autoHideDuration={1500}
          onClose={handleCloseToast}
        >
          <Alert
            onClose={handleCloseToast}
            severity="info"
            sx={{ width: "100%" }}
          >
            {toastData}
          </Alert>
        </Snackbar>
        {showPopup && (
          <Settings closePopupHandler={closePopupHandler} theme={theme} />
        )}
        {showShare && (
          <FileManager
            closeShareHandler={closeShareHandler}
            openView={openView}
            theme={theme}
          />
        )}
        {!!is_window && is_window}

        {openControlPanel && (
          <NewWindow
            ref={controlPanel}
            onUnload={(e) => {
              setopenControlPanel(false);
            }}
            url={`${window.location.href}/controlpanel`}
            name={"Control Panel"}
            features={{ popup: true, width: 1200, height: 500 }}
          >
            {/* <ControlPanel /> */}
          </NewWindow>
        )}
        {manageDevices && (
          <Devices onClose={() => setmanageDevices(false)} theme={theme} />
        )}
        <SpaceChat
          openChat={openChat}
          setopenChat={setopenChat}
          theme={theme}
        />
      </div>
      {openEndDialoge && (
        <LeaveDrop
          title={"Exit space"}
          theme={theme}
          content={"Are you sure want to leave the space?"}
          // setOpen={setopenEndDialoge}
          openButtonText={"Exit"}
          openButtonfunction={() => {
            if (localStorage.getObject("guestUser") == "true") {
              userLogout();
              window.location.href = "/";
            } else {
              window.location.href = "/spaces";
            }
          }}
          cancelButtonfunction={() => {
            setopenEndDialoge(false);
          }}
          img={"/assets/switch_space/exit.svg"}
        />
      )}

      {openEndEvent && (
        <LeaveDrop
          title={"End event"}
          theme={theme}
          content={
            "Are you sure you want to end the space, all users will be kicked out of the meeting"
          }
          // setOpen={setOpenEndEvent}
          openButtonText={"Leave"}
          openButtonfunction={() => {
            window.eventChanel.publish({
              event: "kickAllUser",
            });
          }}
          cancelButtonfunction={() => {
            setOpenEndEvent(false);
          }}
          img={"/assets/switch_space/end.svg"}
        />
      )}
    </div>
  );
}
//
