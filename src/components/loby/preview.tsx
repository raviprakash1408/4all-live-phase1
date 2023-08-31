import {
  Grow,
  Paper,
  Popper,
  Grid,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import SelectLabels from "../../sections/Dropdown";
import {
  setAudioDevices,
  setAudioOutputDevices,
  setAudioPermission,
  setCurrentAudioTrackSwitch,
  setVideoDevices,
  setVideoPermission,
  setVideoSwitchTrack,
} from "../../state/local/localSlice";
import { RootState } from "../../state/store";
// @ts-ignore
import ClickAwayListener from "../clickAwayListener.tsx";
import Settings from "../Settings";
// @ts-ignore
import CameraList from "./cameraList.tsx";
// @ts-ignore
import MicList from "./MicList.tsx";
import { useDispatch, useSelector } from "react-redux";
import { organizationUser } from "../../utilities/common";
// @ts-ignore
import AvatarElem from "../staged_layout/avatar.tsx";
import { shortNameCreator } from "../../utilities/shortName";
import {
  //MediaPermissionsError,
  MediaPermissionsErrorType,
  requestMediaPermissions,
} from "mic-check";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import { useLocation } from "react-router-dom";
import { setVideoInputDeviceId } from "../../state/mediaDevices/mediaDeviceSlice";
import { MediaDeviceFailure } from "livekit-client";
import { sethideUpArrow } from "../../state/conference/conferenceSlice";

function Preview({ type, theme, closePopupHandler }) {
  // selectedVideoDevice state
  const participantPropertyChange = useSelector(
    (state: any) =>
      state.userProfile.userUpdated.userId +
      state.userProfile.userUpdated.value +
      state.userProfile.userUpdated.type
  );
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(
    localStorage.getObject("camDeviceId")
  );
  // selectedAudioDevice state
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(
    localStorage.getObject("micDeviceId")
  );
  // selectedAudioOutputDevice state
  const [selectedAudioOutputDevice, setSelectedAudioOutputDevice] =
    useState("");
  // get videodevice and audio device from redux store
  const videoDevices = useSelector(
    (state: RootState) => state.local.videoDevices
  );
  const audioDevices = useSelector(
    (state: RootState) => state.local.audioDevices
  );
  // console.log(videoDevices,audioDevices, "videoDevices");
  const audioOutputDevices = useSelector(
    (state: RootState) => state.local.audioOutputDevices
  );
  const currentAudioDevice = useSelector(
    (state: RootState) => state.local.currentAudioDevice
  );
  const currentVideoDevice = useSelector(
    (state: RootState) => state.local.currentVideoDevice
  );
  const currentAudioOutputDevice = useSelector(
    (state: RootState) => state.local.currentAudioOutputDevice
  );
  const dispatch = useDispatch();

  const videoPermission = useSelector(
    (state: RootState) => state.local.videoPermission
  );
  const audioPermission = useSelector(
    (state: RootState) => state.local.audioPermission
  );

  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [third])

  React.useEffect(() => {
    async function handleDeviceListChanged() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      //@ts-ignore
      if (devices.deviceId !== "") {
        // map devices by kind
        //@ts-ignore
        const devicesByKind = devices.reduce((acc, device) => {
          acc[device.kind] = acc[device.kind] || [];
          acc[device.kind].push(device);
          return acc;
        }, {});
        console.log(devicesByKind, "devicesByKind");
        dispatch(setVideoDevices(devicesByKind.videoinput));
        dispatch(setAudioDevices(devicesByKind.audioinput));
        dispatch(setAudioOutputDevices(devicesByKind.audiooutput));
      }
    }
    handleDeviceListChanged();
  }, [dispatch]);
  const [videoOff, setVideoOff] = useState(
    localStorage.getObject("videoMuted") === "true" ? true : false
  );
  // const [videoOff, setVideoOff] = useState(true);

  const [audioOff, setAudioOff] = useState(
    localStorage.getObject("audioMuted") === "true" ? true : false
  );
  const [popoverType, setpopoverType] = useState("");

  const [deviceId, setdeviceId] = useState(
    localStorage.getObject("camDeviceId")
  );

  //   audioDeviceId
  const [audioDeviceId, setaudioDeviceId] = useState("");

  const [showPopup, setshowPopup] = useState(false);

  const location = useLocation();

  // const theme = useSelector((state: RootState) => state.theme.themeData);
  const theme_color = useSelector((state: RootState) => state.theme.theme);
  const hideUpArrow = useSelector((state) => state.conference.hideUpArrow);

  const local = useSelector((state: RootState) => state.local);
  // useselector for mediaDevice
  const mediaDevice = useSelector(
    (state: RootState) => state.mediaDevice.videoInputDeviceId
  );

  const [open, setOpen] = useState(false);
  //hiddenUser
  const [hiddenUser, sethiddenUser] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const anchorRef = React.useRef(null);
  const permissions = useSelector((state: RootState) => state.permissions);

  const [device_active_video, setDeviceActiveVideo] = useState(false);

  const [VideoDeviceMalFunctionMsg, setVideoDeviceMalFunctionMsg] =
    useState("");
  const [AudioDeviceMalFunctionMsg, setAudioDeviceMalFunctionMsg] =
    useState("");

  const [device_active_audio, setDeviceActiveAudio] = useState(false);

  const [overrideTheme, setoverrideTheme] = useState<boolean>(false);
  // const [theme, settheme] = useState(
  //   useSelector((state: RootState) => state.theme.themeData)
  // );
  // useEffect(() => {
  //   console.log(location.pathname, "useEffect");
  //   // check if the string contains lobby or not
  //   if (location.pathname.includes("lobby")) {
  //     let path = location.pathname.substring(
  //       location.pathname.lastIndexOf("/") + 1
  //     );
  //     if (Object.keys(local.currentSubspace).length !== 0) {
  //       path = local.currentSubspace.slug;
  //     }
  //     AxiosLocal.get(`subroom/${path}`)
  //       .then(function (response) {
  //         console.log(response.data.data, "IndividualEventData");
  //         if (response.data.data.override_theme) {
  //           setoverrideTheme(true);
  //           if (localStorage.getObject("theme") === "dark") {
  //             settheme({ ...theme, ...response.data.data.dark_theme });
  //           } else {
  //             settheme({ ...theme, ...response.data.data.light_theme });
  //           }
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  // }, [
  //   local.currentSubspace,
  //   useSelector((state: RootState) => state.theme.themeData),
  // ]);

  const permissionDevice = useCallback(() => {
    console.log(
      participantPropertyChange,
      window.localStorage.getObject("user_type"),
      "participantPropertyChange"
    );
    if (window.localStorage.getObject("user_type") == "V") {
      dispatch(setVideoPermission(false));
      setDeviceActiveVideo(false);
      setDeviceActiveAudio(false);
      sethiddenUser(true);
      dispatch(sethideUpArrow(true));
      return;
    }

    window.navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // console.log("JOHAN-PC", stream);
      })
      .catch((err) => console.log("JOHAN-PC-ERROR", err));

    requestMediaPermissions({ audio: false, video: true })
      .then(() => {
        // can successfully access camera and microphone streams
        // DO SOMETHING HERE
        setDeviceActiveVideo(true);
        dispatch(setVideoPermission(true));
      })
      .catch((err) => {
        const { type, name, message } = err;
        if (type === MediaPermissionsErrorType.SystemPermissionDenied) {
          // browser does not have permission to access camera or microphone
          setDeviceActiveVideo(false);
          setVideoDeviceMalFunctionMsg("Camera is Blocked");

          //  setShowWindow("camera_and_microphone_blocked");
        } else if (type === MediaPermissionsErrorType.UserPermissionDenied) {
          // user didn't allow app to access camera or microphone
          setDeviceActiveVideo(false);
          setVideoDeviceMalFunctionMsg("Camera Permission Denied");

          //  setShowWindow("allow_camera_and_microphone");
        } else if (
          type === MediaPermissionsErrorType.CouldNotStartVideoSource
        ) {
          // camera is in use by another application (Zoom, Skype) or browser tab (Google Meet, Messenger Video)
          // (mostly Windows specific problem)
          setDeviceActiveVideo(false);
          setVideoDeviceMalFunctionMsg("Could Not Start Video Source");
        } else {
          // not all error types are handled by this library
          console.log("not all error types are handled by this library");
          //  setShowWindow("camera_and_microphone_not_used");
        }
        dispatch(setVideoPermission(false));
        setDeviceActiveVideo(false);
      });

    requestMediaPermissions({ audio: true, video: false })
      .then(() => {
        // can successfully access camera and microphone streams
        // DO SOMETHING HERE
        setDeviceActiveAudio(true);
        dispatch(setAudioPermission(true));
      })
      .catch((err) => {
        const { type, name, message } = err;
        if (type === MediaPermissionsErrorType.SystemPermissionDenied) {
          // browser does not have permission to access camera or microphone

          setDeviceActiveAudio(false);
          setAudioDeviceMalFunctionMsg(
            "The System denied the microphone permission"
          );
          //  setShowWindow("camera_and_microphone_blocked");
        } else if (type === MediaPermissionsErrorType.UserPermissionDenied) {
          // user didn't allow app to access camera or microphone

          setDeviceActiveAudio(false);
          setAudioDeviceMalFunctionMsg(
            "You have denied the microphone permission"
          );
          //  setShowWindow("allow_camera_and_microphone");
        } else {
          // not all error types are handled by this library
          setDeviceActiveAudio(false);
          setAudioDeviceMalFunctionMsg("Microphone cannot be used");
          //  setShowWindow("camera_and_microphone_not_used");
        }

        setDeviceActiveAudio(false);
        dispatch(setAudioPermission(false));
      });
  }, [participantPropertyChange]);
  //use function to get media devices navigator.mediaDevices.enumerateDevices()
  const getMediaDevices = useCallback(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((mediaDevices) => {
        if (
          mediaDevices.filter(({ kind }) => kind === "videoinput").length === 0
        ) {
          setVideoOff(true);
        } else {
          setVideoOff(false);
          setdeviceId(
            mediaDevices.filter(({ kind }) => kind === "videoinput")[0].deviceId
          );
          localStorage.setObject(
            "camDeviceId",
            mediaDevices.filter(({ kind }) => kind === "videoinput")[0].deviceId
          );
          // }
        }

        if (
          mediaDevices.filter(({ kind }) => kind === "audioinput").length === 0
        ) {
          setAudioOff(true);
        } else {
          setAudioOff(false);
          setaudioDeviceId(
            mediaDevices.filter(({ kind }) => kind === "audioinput")[0].deviceId
          );
          localStorage.setObject(
            "micDeviceId",
            mediaDevices.filter(({ kind }) => kind === "audioinput")[0].deviceId
          );
        }

        if (
          mediaDevices.filter(({ kind }) => kind === "audiooutput").length === 0
        ) {
          //  setAudioOff(true);
        } else {
          //  setAudioOff(false);
          //  setaudioDeviceId(
          //    mediaDevices.filter(({ kind }) => kind === "audioinput")[0].deviceId
          //  );
          localStorage.setObject(
            "audioOutputDeviceId",
            mediaDevices.filter(({ kind }) => kind === "audiooutput")[0]
              .deviceId
          );
        }
      })
      .catch((err) => {
        // console.log(err.name, err.message);
      });
  }, []);

  // const handleDevices = React.useCallback(
  //   (mediaDevices) => {
  //     console.log(mediaDevices, "mediaDevices");
  //     console.log(
  //       mediaDevices.filter(({ kind }) => kind === "videoinput")[0].deviceId,
  //       "sssssssss"
  //     );
  //     if (
  //       mediaDevices.filter(({ kind }) => kind === "videoinput").length === 0
  //     ) {
  //       setVideoOff(true);
  //       console.log("Permission denied for video input");
  //     } else {
  //       setVideoOff(false);

  //       setdeviceId(
  //         mediaDevices.filter(({ kind }) => kind === "videoinput")[0].deviceId
  //       );

  //       localStorage.setObject(
  //         "camDeviceId",
  //         mediaDevices.filter(({ kind }) => kind === "videoinput")[0].deviceId
  //       );

  //       // }
  //     }

  //     if (
  //       mediaDevices.filter(({ kind }) => kind === "audioinput").length === 0
  //     ) {
  //       setAudioOff(true);
  //     } else {
  //       setAudioOff(false);
  //       setaudioDeviceId(
  //         mediaDevices.filter(({ kind }) => kind === "audioinput")[0].deviceId
  //       );
  //       localStorage.setObject(
  //         "micDeviceId",
  //         mediaDevices.filter(({ kind }) => kind === "audioinput")[0].deviceId
  //       );
  //     }

  //     if (
  //       mediaDevices.filter(({ kind }) => kind === "audiooutput").length === 0
  //     ) {
  //       //  setAudioOff(true);
  //     } else {
  //       //  setAudioOff(false);
  //       //  setaudioDeviceId(
  //       //    mediaDevices.filter(({ kind }) => kind === "audioinput")[0].deviceId
  //       //  );
  //       localStorage.setObject(
  //         "audioOutputDeviceId",
  //         mediaDevices.filter(({ kind }) => kind === "audiooutput")[0].deviceId
  //       );
  //     }
  //   },
  //   [setdeviceId, setaudioDeviceId]
  // );

  React.useEffect(() => {
    permissionDevice();
  }, [permissionDevice]);

  React.useEffect(() => {
    if (
      localStorage.getObject("camDeviceId") === null ||
      localStorage.getObject("camDeviceId") == "" ||
      localStorage.getObject("micDeviceId") == "" ||
      localStorage.getObject("micDeviceId") === null
    ) {
      getMediaDevices();

      // navigator.mediaDevices.enumerateDevices().then(
      //   (mediaDevices) => {
      //     console.log(mediaDevices, "mediaDevices mediaDevices");
      //     if(mediaDevices.length>0){
      //       handleDevices();
      //     }else{
      //       setTimeout(() => {
      //         handleDevices();
      //       }, 3000);
      //     }
      //   }
      // ).catch(
      //   (err) => {
      //     console.log(err,"permissionDevice");
      //   }
      // );
    }
  }, [getMediaDevices]);
  const handleToggle = (e, name) => {
    setOpen((prevOpen) => !prevOpen);
    setAnchorEl(e.currentTarget);
    setpopoverType(name);
  };
  const handleClose = (event) => {
    // @ts-ignore
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function closePopupHandlers() {
    setshowPopup(false);
  }
  const [device, setdevice] = useState({});

  React.useEffect(() => {
    if (
      localStorage.getObject("camDeviceId") == "" ||
      localStorage.getObject("camDeviceId") == null ||
      localStorage.getObject("camDeviceId") == undefined ||
      localStorage.getObject("camDeviceId") == "null"
    ) {
      localStorage.setObject("camDeviceId", audioDevices[0]?.deviceId);
      setdevice({ ...device, camDeviceId: audioDevices[0]?.deviceId });
    } else {
      setdevice({
        ...device,
        camDeviceId: localStorage.getObject("camDeviceId"),
      });
    }
  }, [audioDevices]);

  const handleChange = (event, type) => {
    //  setdeviceId(event.target.value);
    setdevice({ ...device, [type]: event.target.value });
    //  localStorage.setObject(type, event.target.value);
    if (type == "micDeviceId" || type == "camDeviceId") {
      setdeviceId(event.target.value);
    }
    // switch for audio and video dispatch
    //  if (type == "camDeviceId" && event.target.value != "") {
    //    dispatch(setVideoInputDeviceId(event.target.value));
    //  }
  };

  const switchDevice = async (type, deviceId) => {
    if (type === "video") {
      //  window.room.getLocalVideoTracks().forEach(async (value, key) => {
      //    console.log(value, key, "value, key");
      //    if (value.trackName === "") {
      //      console.log(value, "valuevalue");
      //       const videoTrack = await createLocalVideoTrack({
      //         deviceId: deviceId || undefined,
      //       });

      //      if (localStorage.getObject("videoMuted") === "true") {
      //        console.log(
      //          localStorage.getObject("videoMuted"),
      //          "mutedmutedmuted true"
      //        );

      //        videoTrack.isMuted = true;
      //      } else {
      //        videoTrack.isMuted = false;
      //      }
      //      window.room.localParticipant.publishTrack(videoTrack).then(() => {
      //        window.room.localParticipant.unpublishTrack(value.track);
      //      });
      //    }
      //  });
      await window.room
        ?.switchActiveDevice("videoinput", deviceId)
        .then((track) => {
          if (window.location.href.indexOf("lobby") > -1) {
            dispatch(setVideoSwitchTrack(track[0]));
          } else {
            dispatch(setVideoSwitchTrack(track[0]));
          }
        })
        .catch((err) => {
          // console.log("error switching video track", err);
        });
    } else if (type === "audioinput") {
      window.room
        .switchActiveDevice("audioinput", deviceId)
        .then((track) => {
          console.log("switched audio track", track);
        })
        .catch((err) => {
          console.log("error switching audio track", err);
        });
    } else if (type === "audiooutput") {
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

  const videoRef = React.useRef(null);
  const [cameraError, setCameraError] = useState(false);
  const [cameraPerm, setCameraPerm] = useState(true);

  const [errorMsg, seterrorMsg] = useState("");

  const checkCameraError = async () => {
    setCameraError(false);
    seterrorMsg("");
    try {
      const constraints = {
        video: {
          facingMode: "environment",
          deviceId: {
            exact:
              "16b8b5805b2851133b553a11138d4bc1b741e49239eb2452b7a576da2f2e9c9c",
          },
        },
      };
      const stream1 = await navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          try {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          } catch (error) {
            // console.error(error.name, "errorrrrrasync");
          }
        });
    } catch (error) {
      if (error.name == "NotReadableError") {
        setCameraError(true);
        seterrorMsg("Could not start video source");
      } else if (error.name == "NotAllowedError") {
        setCameraPerm(false);
        seterrorMsg("Please allow camera access to continue");
      }
    }
  };

  useEffect(() => {
    checkCameraError();
  }, []);

  const handleClick = () => {
    // setting the device id in local storage by using the state device object for loop
    for (const [key, value] of Object.entries(device)) {
      localStorage.setObject(key, value);
      if (key == "camDeviceId" && value != "") {
        if (location.pathname.includes("lobby")) {
          dispatch(setVideoInputDeviceId(value));
        }

        if (localStorage.getObject("videoMuted") !== "true") {
          // switchVideoInput(value);
          switchDevice("video", value);
        }
      } else if (key == "micDeviceId" && value != "") {
        if (localStorage.getObject("audioMuted") !== "true") {
          // switchAudioInput(value);
          switchDevice("audioinput", value);
        }
      } else if (key == "audioOutputDeviceId" && value != "") {
        if (localStorage.getObject("audioMuted") !== "true") {
          switchDevice("audiooutput", value);
        }
      }
    }

    closePopupHandler(false);
  };

  return (
    <div>
      <Grid container>
        <Grid
          item
          xs={type === "settings" ? 6 : 12}
          md={type === "settings" ? 6 : 12}
        >
          <div style={{ display: type === "settings" ? "flex" : "block" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "180px",
                  width: "320px",
                  backgroundColor: theme?.bg_color_3,
                  color: "white",
                  margin: type === "settings" ? "20px 50px" : "20px 0",
                }}
              >
                {!device_active_video ? (
                  <p style={{ color: theme?.font_color_0 }}>
                    {VideoDeviceMalFunctionMsg != ""
                      ? VideoDeviceMalFunctionMsg
                      : "No camera found"}
                  </p>
                ) : type === "settings" ? (
                  <Webcam
                    height={type === "settings" ? "206px" : "auto"}
                    width={type === "settings" ? "363px" : "100%"}
                    style={{
                      aspectRatio: "16 / 9",
                    }}
                    audio={false}
                    videoConstraints={{
                      // deviceId: mediaDevice,
                      //@ts-ignore
                      deviceId: device.camDeviceId,
                      aspectRatio: 16 / 9,
                    }}
                  />
                ) : // <video
                //   disablePictureInPicture
                //   src=""
                //   style={{
                //     height: type === "settings" ? "206px" : "auto",
                //     width: type === "settings" ? "363px" : "100%",
                //     // aspectRatio: 16 / 9,
                //   }}
                //   autoPlay
                //   id={`video_local_${camDeviceId}`}
                //   className="local-device"
                //   muted={true}
                //   ref={videoRef}
                //   onError={() => setCameraError(true)}
                //   playsInline={true}
                // />
                !videoOff && permissions.mute_video ? (
                  <Webcam
                    height={type === "settings" ? "206px" : "auto"}
                    width={type === "settings" ? "363px" : "100%"}
                    style={{
                      aspectRatio: "16 / 9",
                    }}
                    audio={false}
                    videoConstraints={{
                      deviceId: mediaDevice,
                      aspectRatio: 16 / 9,
                    }}
                  />
                ) : (
                  <AvatarElem
                    userShortName={shortNameCreator(
                      localStorage.getObject("username"),
                      localStorage.getObject("last_name")
                    )}
                    avatar={localStorage.getObject("avatar")}
                    view={undefined}
                    theme={theme}
                  />

                  // <p>AM</p>
                )}
              </div>
            </div>
            {type === "settings" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {" "}
                <div
                  // item
                  // xs={6}
                  // md={6}
                  style={{ marginTop: "10px" }}
                >
                  {/* {audioPermission && */}
                  <>
                    <Typography
                      style={{
                        color: theme?.font_color_0,
                        fontSize: "14px",
                        marginTop: "10px",
                        fontFamily: "URW DIN REGULAR",
                      }}
                    >
                      Microphone
                    </Typography>
                    <SelectLabels
                      options={audioDevices}
                      type="micDeviceId"
                      setdeviceId={setdeviceId}
                      permission={audioPermission}
                      error_message={AudioDeviceMalFunctionMsg}
                      theme={theme}
                      handleChange={(e) => handleChange(e, "micDeviceId")}
                    />
                  </>
                  {/* } */}
                  {/* {videoPermission ? ( */}
                  <>
                    <Typography
                      style={{
                        color: theme?.font_color_0,
                        fontSize: "14px",
                        marginTop: "10px",
                        fontFamily: "URW DIN REGULAR",
                      }}
                    >
                      Camera
                    </Typography>
                    <SelectLabels
                      options={videoDevices}
                      type="camDeviceId"
                      setdeviceId={setdeviceId}
                      // permission={cameraPerm}
                      permission={videoPermission}
                      error_message={VideoDeviceMalFunctionMsg}
                      theme={theme}
                      handleChange={(e) => handleChange(e, "camDeviceId")}
                    />
                  </>
                  {/* ) : (
                <></>
              ) */}
                  {/* } */}

                  {/* {audioPermission && */}
                  <>
                    <Typography
                      style={{
                        color: theme?.font_color_0,
                        fontSize: "14px",
                        marginTop: "10px",
                        fontFamily: "URW DIN REGULAR",
                      }}
                    >
                      Audio output
                    </Typography>
                    <SelectLabels
                      options={audioOutputDevices}
                      type="audioOutputDeviceId"
                      permission={audioPermission}
                      error_message={AudioDeviceMalFunctionMsg}
                      theme={theme}
                      handleChange={(e) =>
                        handleChange(e, "audioOutputDeviceId")
                      }
                    />
                  </>

                  {/* } */}
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  userSelect: "none",
                  justifyContent: "center",
                }}
              >
                {organizationUser(permissions.mute_audio) && (
                  <div
                    className="video-button"
                    style={{
                      cursor: "pointer",
                      backgroundColor: !device_active_audio
                        ? "#88A1AB"
                        : audioOff
                        ? theme?.button_color_1
                        : theme?.bg_color_0,
                      margin: "26px 5px",
                      borderRadius: "4px",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "50px",
                      height: "50px",
                      pointerEvents: !device_active_audio ? "none" : "auto",
                    }}
                  >
                    {!device_active_audio ? (
                      <img
                        src="/assets/bottomIcons/no_mic_disable.svg"
                        alt="disabled camera"
                      />
                    ) : audioOff ? (
                      <img
                        alt=""
                        src="/assets/bottomIcons/no_mic.svg"
                        onClick={() => {
                          setAudioOff(false);
                          localStorage.setObject("audioMuted", "false");
                        }}
                      />
                    ) : (
                      <img
                        alt=""
                        src="/assets/bottomIcons/mic.svg"
                        onClick={() => {
                          setAudioOff(true);
                          localStorage.setObject("audioMuted", "true");
                        }}
                      />
                    )}

                    <img
                      alt=""
                      src={
                        "/assets/icons/up" +
                        (theme_color == "dark" ? "" : "_white") +
                        ".svg"
                      }
                      onClick={(e) => {
                        handleToggle(e, "Audio");
                      }}
                      style={{
                        display: audioOff ? "none" : "flex",
                        position: "absolute",
                        top: "-5%",
                        right: "0%",
                        padding: "5px 3px",
                        backgroundColor:
                          theme_color == "dark"
                            ? theme?.loby.secondaryColor
                            : "#88A1AB",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                )}
                {organizationUser(permissions.mute_video) && (
                  <div
                    className="video-button"
                    style={{
                      cursor: "pointer",
                      backgroundColor: !device_active_video
                        ? "#88A1AB"
                        : videoOff
                        ? theme?.button_color_1
                        : theme?.bg_color_0,
                      margin: "26px 5px",
                      borderRadius: "4px",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "50px",
                      height: "50px",
                      pointerEvents: !device_active_video ? "none" : "auto",
                    }}
                  >
                    {!device_active_video ? (
                      <img
                        src="/assets/bottomIcons/no_cam_disable.svg"
                        alt=""
                      />
                    ) : videoOff ? (
                      <img
                        alt=""
                        // style={{
                        //   filter:
                        //     "brightness(0) saturate(100%) invert(10%) sepia(10%) saturate(6873%) hue-rotate(181deg) brightness(105%) contrast(108%)",
                        // }}
                        src="/assets/bottomIcons/no_cam.svg"
                        onClick={() => {
                          setVideoOff(false);
                          localStorage.setObject("videoMuted", "false");

                          // }
                        }}
                      />
                    ) : (
                      <img
                        alt=""
                        src="/assets/bottomIcons/cam.svg"
                        onClick={() => {
                          console.log("Video", local.currentVideoTrack);
                          setVideoOff(true);
                          localStorage.setObject("videoMuted", "true");
                        }}
                      />
                    )}

                    <img
                      alt=""
                      src={
                        "/assets/icons/up" +
                        (theme_color == "dark" ? "" : "_white") +
                        ".svg"
                      }
                      onClick={(e) => {
                        handleToggle(e, "Video");
                      }}
                      style={{
                        display: videoOff ? "none" : "flex",
                        position: "absolute",
                        top: "-5%",
                        right: "0%",
                        padding: "5px 3px",
                        backgroundColor:
                          theme_color == "dark"
                            ? theme?.loby.secondaryColor
                            : "#88A1AB",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                )}

                {/* setting */}
                {organizationUser(permissions.show_settings_button_loby) &&
                  !hideUpArrow && (
                    <div
                      className="video-button"
                      style={{
                        cursor: "pointer",
                        backgroundColor: theme?.bg_color_0,
                        margin: "26px 5px",
                        borderRadius: "4px",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "50px",
                        height: "50px",
                      }}
                      onClick={() => {
                        setshowPopup(true);
                      }}
                    >
                      <img
                        alt=""
                        src="/assets/bottomIcons/three_dots/settings.svg"
                      />
                    </div>
                  )}
              </div>
            )}

            {hiddenUser ? (
              <></>
            ) : (
              <Box
                style={{
                  backgroundColor: "#88A1AB",
                  color: "#012243",
                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  margin: "0px 20px 10px 20px",
                  borderRadius: "4px",
                  padding: "10px 14px",
                  display:
                    type === "settings"
                      ? "none"
                      : !device_active_audio || !device_active_video
                      ? "flex"
                      : "none",
                }}
              >
                <img alt="" src="/assets/bottomIcons/info-triangle.svg" />
                <p style={{ margin: 0, padding: "0px 0px 0px 18px" }}>
                  You need to enable microphone and camera access
                </p>
              </Box>
            )}
          </div>
        </Grid>
      </Grid>
      {type === "settings" ? (
        <>
          <Divider
            variant="fullWidth"
            style={{
              borderColor: "#002E56",
              margin: "20px 40px 0px 40px",
              borderWidth: "1px",
            }}
          />
          <div style={{ textAlign: "center", margin: "18px 0px 0px" }}>
            <Button
              variant="contained"
              style={{
                textTransform: "none",
                padding: "9px 25px",
                fontSize: "14px",
                fontFamily: "URW DIN REGULAR",
                lineHeight: "22px",
                backgroundColor:
                  !device_active_audio && !device_active_video
                    ? "#88A1AB"
                    : theme?.login?.mainColor,
                marginRight: "21px",
                borderRadius: "4px",
                minWidth: "137px",
                color: "white",
              }}
              disabled={!device_active_audio && !device_active_video}
              onClick={handleClick}
            >
              Save
            </Button>
            <Button
              variant="contained"
              style={{
                textTransform: "none",
                padding: "8px 47px",
                fontSize: "14px",
                fontFamily: "URW DIN REGULAR",
                lineHeight: "22px",
                backgroundColor: theme.login.primaryColor,
                border: "2px solid",
                borderColor: theme.login.primaryColor,
                borderRadius: "4px",
                color: theme?.login?.tertiaryColor,
              }}
              onClick={() => {
                closePopupHandler(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
      <Popper
        open={open}
        anchorEl={anchorEl}
        role={undefined}
        placement="top-start"
        transition
        disablePortal
        style={{ zIndex: 9999 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "top-start" ? "left top" : "left bottom",
            }}
          >
            <Paper
              style={{
                width: popoverType === "Audio" ? "260px" : "320px",
                backgroundColor: theme?.spaces.primaryColor,
                color: "#88A1AB",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                {popoverType === "Video" ? (
                  <CameraList
                    handleClose={handleClose}
                    setdeviceId={setdeviceId}
                  />
                ) : popoverType === "Audio" ? (
                  <MicList
                    handleClose={handleClose}
                    setdeviceId={setaudioDeviceId}
                  />
                ) : (
                  <></>
                )}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {showPopup && (
        <Settings
          theme={theme}
          closePopupHandler={closePopupHandlers}
          deviceId={deviceId}
        />
      )}
    </div>
  );
}

export default Preview;
function switchActiveDevice(arg0: string, deviceId: any) {
  throw new Error("Function not implemented.");
}
