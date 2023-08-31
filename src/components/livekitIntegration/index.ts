import { Dispatch } from "@reduxjs/toolkit";
import {
  Room,
  RoomEvent,
  RemoteParticipant,
  RemoteTrackPublication,
  RemoteTrack,
  Participant,
  VideoPresets,
  LocalTrackPublication,
  LocalParticipant,
  Track,
  TrackPublication,
  LocalVideoTrack,
  createLocalVideoTrack,
  createLocalAudioTrack,
  Uint8Array,
  DataPacket_Kind,
} from "livekit-client";
import {
  checkCurrentActiveVideoRemoved,
  checkDirectorLeft,
  currentActiveUserId,
  setCenterStageDevice,
  setCurrentActiveVideo,
  setLayout,
  setNoVideo,
  setVideoMute,
  setcurrentActiveUserId,
  switchCamera,
} from "../../state/conference/conferenceSlice.js";
import {
  addTrackPosition,
  removeTrackPosition,
  setRender,
  setlocalAudioTracks,
} from "../../state/livekit/slice.ts";

import {
  addTrack,
  removeTrack,
  setaudioTracks,
} from "../../state/livekit/slice.ts";
import {
  setAudioDevices,
  setAudioMuted,
  setAudioOutputDevices,
  setScreenSharing,
  setVideoDevices,
  setVideoMuted,
} from "../../state/local/localSlice";
import { VideoTrack } from "livekit-client";
import { useSelector } from "react-redux";
// import { checkDirectorLeftControlPannel } from '../../state/controlpannel/slice.ts';
import {
  //MediaPermissionsError,
  MediaPermissionsErrorType,
  requestMediaPermissions,
} from "mic-check";
import { async } from "q";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import { getTeamSlugFromUrl } from "../../utilities/common.js";

let no_video = false;
let replacedTracks: Array<string | undefined> = [];
let newReplacedTracks: Array<string | undefined> = [];
interface LocalParticipantProperty {
  user_type?: string;
  userId?: string;
}

interface ParticipantProperty {
  _properties?: {
    user_type?: string;
    id?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    avatar?: string;
    is_organization_user?: boolean;
  };
}

interface CustomTrackProperty {
  viewing_type?: string;
  name?: string;
  type?: "device" | "user";
  is_local?: boolean;
  user_db_id?: string;
  is_guest_user: boolean;
}

export interface LivekitRoom extends Room {
  getLocalVideoTracks?: () => Map<string, LocalTrackPublication>;
  getParticipants?: () => Map<string, RemoteParticipant>;
  addTrack?: (track: any) => void;
  getLocalAudioTrack?: () => Promise<MediaDeviceInfo[]>;
  getParticipantById?: (id: string) => ParticipantProperty;
  getLocalParticipantProperty?: () => LocalParticipantProperty;
  sendCommandOnce?: (command: string, data: any) => void;
  myUserId?: () => string;
}

declare global {
  interface Window {
    room: LivekitRoom;
  }
}

// add function properties to RemoteParticipant type
declare module "livekit-client" {
  interface RemoteParticipant {
    getParticipantProperty: () => ParticipantProperty;
  }

  interface Track {
    customProperty?: CustomTrackProperty;
    getCustomeProperty?: () => CustomTrackProperty;
    getParticipantId?: () => string;
    isDefaultVideoTrack?: () => boolean;
  }

  interface Participant {
    getDefaultVideoTrack: () => Track | null;
    isDefaultVideoTrack: (track: Track) => boolean;
  }
}

Track.prototype.getCustomeProperty = function () {
  return this.customProperty || {};
};

Track.prototype.isDefaultVideoTrack = function () {
  let isDefault = false;
  try {
    isDefault = JSON.parse(this.customProperty.name).default;
  } catch (error) {
    console.log(error);
  }

  return isDefault;
};



// function for get participant ptoperty from metadata
const getParticipantPropertyFromMetadata = (
  metadata: string | undefined,
  sid: string
) => {
  const participantProperty = JSON.parse(metadata || "{}");
  return {
    _properties: {
      user_id: participantProperty.user_id,
      id: sid,
      firstName: participantProperty.user_first_name,
      // @ts-ignore
      lastName: participantProperty.user_last_name,
      role: participantProperty.role || "",
      avatar: participantProperty.avatar || "",
      is_organization_user: false,
      user_type: participantProperty.user_type || "P",
    },
  };
};

RemoteParticipant.prototype.getParticipantProperty = function () {
  return {
    _properties: {
      id: JSON.parse(this.metadata).user_id,
    },
  };
};

Participant.prototype.getDefaultVideoTrack = function () {
  let track1: Track | null = null;
  this.videoTracks.forEach((value, key) => {
    let isDefault = false;
    try {
      isDefault = JSON.parse(value.trackName).default;
    } catch (error) { }

    if (isDefault && value.source != "screen_share") {
      track1 = value.track;
    }
  });
  return track1;
};

Participant.prototype.isDefaultVideoTrack = function (track: Track) {
  let track1 = this.getDefaultVideoTrack();

  if (track1) {
    return track1.sid == track.sid;
  }

  return false;
};

export const connectToRoom = async (dispatch, token) => {
  // creates a new room with options
  const room: LivekitRoom = (window.room = new Room({
    // automatically manage subscribed video quality
    adaptiveStream: true,
    // optimize publishing bandwidth and CPU for published tracks
    dynacast: true,
    //automatically change resolution
    audioCaptureDefaults: {
      echoCancellation: true,
      autoGainControl: true,
      noiseSuppression: true,
    },

    videoCaptureDefaults: {
      resolution: VideoPresets.h2160.resolution,
    },

    // publish Default
    publishDefaults: {
      videoCodec:"av1",
      backupCodec: { codec: 'vp9' }, // only needed if overriding defaults

    },
  }));

  room.getParticipantById = (id) => {
    let participant;
    if (id == room.localParticipant.sid) {
      participant = room.localParticipant;
    } else {
      participant = room.participants.get(id);
    }
    if (participant) {
      return getParticipantPropertyFromMetadata(participant.metadata, id);
    }
    return {
      _properties: {},
    };
  };
  room.getLocalAudioTrack = () => {
    return room.localParticipant.audioTracks.values().next().value;
  };
  room.getLocalParticipantProperty = () => {
    return {
      user_type: "P",
      userId: "2",
    };
  };

  room.sendCommandOnce = (command, data) => {
    console.log("sendCommandOnce", command, data);
  };
  room.myUserId = () => {
    return room.localParticipant.sid;
  };

  room.getParticipants = () => {
    return room.participants;
  };

  room.getLocalVideoTracks = () => {
    return room.localParticipant.videoTracks;
  };

  room.addTrack = (track) => {
    room.switchActiveDevice(track.kind, track.deviceId);
  };

  let team_slug = getTeamSlugFromUrl("space");

  const decoder = new TextDecoder();
  // set up event listeners
  room
    .on(
      RoomEvent.TrackSubscribed,
      (
        track: RemoteTrack,
        publication: RemoteTrackPublication,
        participant: RemoteParticipant
      ) => handleTrackSubscribed(track, publication, participant, dispatch)
    )
    .on(
      RoomEvent.LocalTrackPublished,
      (publication: LocalTrackPublication, participant: LocalParticipant) => {
        let track = publication.track;
        let participantData = getParticipantPropertyFromMetadata(
          participant.metadata,
          participant.sid
        );
        if (publication.track?.kind !== "audio") {


          if (track) {
            track.getParticipantId = () => window.room?.localParticipant.sid;
            if (participantData?._properties?.user_id !== undefined) {
              AxiosLocal.get(
                `user/info/?user_id=${participantData?._properties?.user_id}&role=${participantData?._properties?.role}&team_slug=${team_slug}`
              )
                .then((res) => {
                  let user_type = res.data.data[0].viewer_type;
                  // let viewing_type = participantData._properties.user_type;
                  let viewing_type = user_type;
                  let isdefault = false;
                  let prevTrackId = "";

                  try {
                    isdefault = JSON.parse(publication.trackName).default;
                  } catch (error) {
                    console.log("error", error);
                  }

                  try {
                    prevTrackId = JSON.parse(publication.trackName).prevTrackId;
                  } catch (error) {
                    console.log("error", error);
                  }

                  if (prevTrackId) {
                    setTimeout(() => {
                      dispatch(
                        switchCamera({
                          trackId: track?.sid,
                          replacedTrack: {
                            video: track,
                            userId: participant.sid,
                          },
                        })
                      );
                    }, 100);
                  }

                  track.customProperty = {
                    viewing_type,
                    name: publication.trackName,
                    type:
                      publication.source == "screen_share"
                        ? "desktop"
                        : isdefault
                          ? "user"
                          : "device",

                    is_local: true,
                    user_db_id: participantData._properties.user_id,
                    is_guest_user: participantData._properties.role == "Guest",
                  };

                  dispatch(addTrack(track));

                  if (track.source === Track.Source.ScreenShare) {
                    dispatch(
                      addTrackPosition({
                        trackId: publication.track?.sid,
                        trackType: viewing_type == "V" ? "S" : viewing_type,
                      })
                    );
                  } else {
                    dispatch(
                      addTrackPosition({
                        trackId: publication.track?.sid,
                        trackType: viewing_type,
                      })
                    );
                  }
                })
                .catch((err) => {
                  let viewing_type = "P";
                  try {
                    viewing_type = JSON.parse(publication.trackName).user_type;
                  } catch (error) {
                    console.log("error", error);
                    // assign randomly "P" or "S"
                    viewing_type = Math.random() > 0.5 ? "P" : "S";
                  }
                  addTrackPositionCustom(
                    viewing_type,
                    publication,
                    dispatch,
                    track,
                    participant,
                    participantData
                  );
                });
            } else {
              let viewing_type = "P";
              try {
                viewing_type = JSON.parse(publication.trackName).user_type;
              } catch (error) {
                console.log("error", error);
                // assign randomly "P" or "S"
                viewing_type = Math.random() > 0.5 ? "P" : "S";
              }
              addTrackPositionCustom(
                viewing_type,
                publication,
                dispatch,
                track,
                participant,
                participantData
              );
            }
          }
        }
        // else{
        //   dispatch(setlocalAudioTracks(track));
        // }

        if (publication.track?.kind == "audio") {
          // attach it to a new HTMLVideoElement or HTMLAudioElement
          // @ts-ignore
          // track.getParticipantId = () => participant.sid;
          dispatch(setlocalAudioTracks(publication.track));
          track.getParticipantId = () => window.room?.localParticipant.sid;
        }

        dispatch(setRender(`LocalTrackPublished_${publication.trackSid}`));
      }
    )
    .on(
      RoomEvent.TrackUnsubscribed,
      (
        track: RemoteTrack,
        publication: RemoteTrackPublication,
        participant: RemoteParticipant
      ) => handleTrackUnsubscribed(track, publication, participant, dispatch)
    )
    .on(RoomEvent.ActiveSpeakersChanged, handleActiveSpeakerChange)
    .on(RoomEvent.Disconnected, handleDisconnect)
    .on(RoomEvent.LocalTrackUnpublished, (track: LocalTrackPublication) =>
      handleLocalTrackUnpublished(track, dispatch)
    )
    .on(
      RoomEvent.TrackMuted,
      (publication: TrackPublication, participant: Participant) => {
        handleMuted(publication, participant, dispatch);
      }
    )
    .on(
      RoomEvent.ParticipantMetadataChanged,
      (metadata, participant: Participant) => {
        dispatch(setRender(`ParticipantMetadataChanged_${participant.sid}`));
      }
    )
    .on(
      RoomEvent.TrackUnmuted,
      (publication: TrackPublication, participant: Participant) => {
        // handleunMuted(publication, participant, dispatch);
        if (participant.isLocal) {
          dispatch(setVideoMuted(false));
        }

        dispatch(
          setVideoMute({
            unmuted: true,
            id: participant?.sid,
          })
        );
      }
    )
    .on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
      let participantData = getParticipantPropertyFromMetadata(
        participant.metadata,
        participant.sid
      );
      dispatch(
        addTrackPosition({
          trackId: participant.sid,
          trackType: participantData._properties.user_type,
        })
      );
    })
    .on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
      dispatch(removeTrackPosition(participant.sid));
      dispatch(checkDirectorLeft(participant.sid));
      // dispatch(removeNoVideo(participant.sid));
    });
  //     .on(RoomEvent.DataReceived, (payload: Uint8Array, participant: Participant, kind: DataPacket_Kind) => {
  //       const strData = decoder.decode(payload)
  //       console.log("DataReceived");

  // });
  // connect to room
  await room.connect("wss://lk-helm-dev.cluster.meetmo.io", token);
  // console.log("connected to room", token, room.name);

  // receive data from other participants
  room.on(
    RoomEvent.DataReceived,
    (payload: Uint8Array, participant: Participant | undefined) => {
      const strData = decoder.decode(payload);
      let data: {
        type?: string;
        prevTrackid?: string;
      } = {};
      try {
        data = JSON.parse(strData);
      } catch (error) {
        console.log("error", error);
      }

      if (data.type == "no_video") {
        dispatch(setNoVideo(participant?.sid));
      } else if (data.type == "replaceTrack") {
        replacedTracks.push(data?.prevTrackid);
      }
    }
  );

  try {
    // create a new LocalAudioTrack using the micDeviceId from local storage

    requestMediaPermissions({ audio: true, video: false })
      .then(async () => {
        // can successfully access camera and microphone streams
        // DO SOMETHING HERE

        if (
          localStorage.getObject("micDeviceId") == null ||
          localStorage.getObject("micDeviceId") == undefined ||
          localStorage.getObject("micDeviceId") == "" ||
          localStorage.getObject("micDeviceId") == "undefined"
        ) {
          //set micDeviceId to default

          navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => {
              const audioOutputDevices = devices.filter(
                (device) => device.kind === "audiooutput"
              );
              //set audioOutputDeviceId to default
              const audioOutputDeviceId = audioOutputDevices[0].deviceId;
              localStorage.setObject("audioOutputDeviceId", audioOutputDeviceId);

              const audioInputDevices = devices.filter(
                (device) => device.kind === "audioinput"
              );
              const audioInputDeviceId = audioInputDevices[0].deviceId;
              localStorage.setObject("micDeviceId", audioInputDeviceId);
              const videoOutputDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );
            })
            .catch((error) => {
              // console.error("Failed to enumerate devices:", error);
            });
        }

        const audioTrack = await createLocalAudioTrack({
          deviceId: localStorage.getObject("micDeviceId") || undefined,
        });

        // get audioOutputDeviceId from local storage
        if (localStorage.getObject("audioOutputDeviceId")) {
          const audioOutputDeviceId =
            localStorage.getObject("audioOutputDeviceId") || undefined;
          window.room.switchActiveDevice("audiooutput", audioOutputDeviceId);
        } else {
          if (audioOutputDevices.length > 0) {
            const audioOutputDeviceId = audioOutputDevices[0].deviceId;
            window.room.switchActiveDevice("audiooutput", audioOutputDeviceId);
          } else {
            audioTrack.isMuted = true;
          }
        }

        // mute local audio track if audioMuted in local storage is true

        if (localStorage.getObject("audioMuted") === "true") {
          audioTrack.isMuted = true;
        } else {
          audioTrack.isMuted = false;
        }

        await room.localParticipant.publishTrack(audioTrack);
      })
      .catch(async (err) => {
        const { type, name, message } = err;
        if (type === MediaPermissionsErrorType.SystemPermissionDenied) {
          // browser does not have permission to access camera or microphone
          console.log("browser does not have permission to access microphone");
        } else if (type === MediaPermissionsErrorType.UserPermissionDenied) {
          // user didn't allow app to access camera or microphone
          let participant = room.localParticipant;
          let participantData = getParticipantPropertyFromMetadata(
            participant.metadata,
            participant.sid
          );
          dispatch(
            addTrackPosition({
              trackId: participantData._properties.id,
              trackType: participantData._properties.user_type,
            })
          );
        } else if (
          type === MediaPermissionsErrorType.CouldNotStartVideoSource
        ) {
          // camera is in use by another application (Zoom, Skype) or browser tab (Google Meet, Messenger Video)
          // (mostly Windows specific problem)

          console.log("(mostly Windows specific problem)");
        } else {
          // not all error types are handled by this library
          console.log("not all error types are handled by this library");
        }
      });
  } catch (error) {
    console.log("error", error);
  }

  try {
    requestMediaPermissions({ audio: false, video: true })
      .then(async () => {
        if (
          localStorage.getObject("camDeviceId") == null ||
          localStorage.getObject("camDeviceId") == undefined ||
          localStorage.getObject("camDeviceId") == "" ||
          localStorage.getObject("camDeviceId") == "undefined"
        ) {
          //set micDeviceId to default
          console.log("videoTrackvideoTrack null");

          navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => {
              const videoOutputDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );
              // set camDeviceId to default
              const camDeviceId = videoOutputDevices[0].deviceId;
              localStorage.setObject("camDeviceId", camDeviceId);
            })
            .catch((error) => {
              // console.error("Failed to enumerate devices:", error);
            });
        }

        let camDevice = localStorage.getObject("camDeviceId");
        const videoTrack = await createLocalVideoTrack({
          deviceId: camDevice || undefined,
        });

        console.log("videoTrackvideoTrack extists", videoTrack, camDevice);

        // mute local video track if videoMuted in local storage is true
        if (localStorage.getObject("videoMuted") === "true") {
          videoTrack.isMuted = true;
        } else {
          videoTrack.isMuted = false;
        }

        let user_type = "P";

        try {
          // @ts-ignore
          user_type = window.room?.getParticipantById(
            window.room?.localParticipant.sid
          )._properties.user_type;
        } catch (e) {
          console.log("error", e);
        }

        let data = {
          default: true,
          user_type,
        };
        await room.localParticipant.publishTrack(videoTrack, {
          name: JSON.stringify(data),
        });
      })
      .catch(async (err) => {
        no_video = true;
        const strData = JSON.stringify({ type: "no_video", no_video: true });
        const encoder = new TextEncoder();

        // publishData takes in a Uint8Array, so we need to convert it
        const data = encoder.encode(strData);

        // publish reliable data to a set of participants
        room.localParticipant.publishData(data, DataPacket_Kind.RELIABLE);

        dispatch(setNoVideo(room.localParticipant.sid));

        const { type, name, message } = err;
        if (type === MediaPermissionsErrorType.SystemPermissionDenied) {
          // browser does not have permission to access camera or microphone
          console.log("browser does not have permission to access camera");
        } else if (type === MediaPermissionsErrorType.UserPermissionDenied) {
          // user didn't allow app to access camera or microphone
          console.log("user didn't allow app to access camera");
        } else if (
          type === MediaPermissionsErrorType.CouldNotStartVideoSource
        ) {
          // camera is in use by another application (Zoom, Skype) or browser tab (Google Meet, Messenger Video)
          // (mostly Windows specific problem)

          console.log("(mostly Windows specific problem)");
        } else {
          // not all error types are handled by this library
          console.log("not all error types are handled by this library");
        }
      });

    // publish local camera and mic tracks
  } catch (error) {
    console.log("error", error);
  }
  // await room.localParticipant.enableCameraAndMicrophone();
};

function addTrackPositionCustom(
  viewing_type,
  publication,
  dispatch,
  track,
  participant,
  participantData
) {
  let defaultTrack = false;
  let prevTrackid = "";
  try {
    defaultTrack = JSON.parse(publication.trackName).default;
    prevTrackid = JSON.parse(publication.trackName).prevTrackId;
  } catch (error) {
    console.log("error", error);
  }

  if (prevTrackid != "") {
    newReplacedTracks.push(prevTrackid);
  }
  // else {
  //   console.log("bnbnbnbbnbn");

  if (prevTrackid) {
    dispatch(
      switchCamera({
        trackId: track.sid,
        replacedTrack: { video: track, userId: participant.sid },
      })
    );
  }

  track.customProperty = {
    viewing_type,
    name: publication.trackName,
    type: defaultTrack ? "user" : "device",
    is_local: false,
    user_db_id: participantData._properties.user_id,
    is_guest_user: participantData._properties.role == "Guest",
  };
  dispatch(addTrack(track));
  dispatch(setRender("rendering to avoid flickering"));

  if (track.source === Track.Source.ScreenShare) {
    const audio = new Audio("/assets/sounds/present.wav");
    audio.play();
    dispatch(
      addTrackPosition({
        default: false,
        trackId: track.sid,
        trackType: viewing_type == "V" ? "S" : viewing_type,
        participantId: participant.sid,
      })
    );
  } else {
    dispatch(
      addTrackPosition({
        default: defaultTrack,
        trackId: track.sid,
        trackType: viewing_type,
        participantId: participant.sid,
      })
    );
  }
}

function handleTrackSubscribed(
  track: RemoteTrack,
  publication: RemoteTrackPublication,
  participant: RemoteParticipant,
  dispatch: Dispatch
) {
  const isUser = publication.trackName == "";

  // if (isUser ){

  //   const audio = new Audio(
  //     "/assets/sounds/part-joined.wav"
  //   );
  //   audio.play();

  // }

  if (track.kind === Track.Kind.Video) {
    // attach it to a new HTMLVideoElement or HTMLAudioElement
    // @ts-ignore
    track.getParticipantId = () => participant.sid;

    let participantData = getParticipantPropertyFromMetadata(
      participant.metadata,
      participant.sid
    );
    let viewing_type = participantData._properties.user_type;
    try {
      viewing_type = JSON.parse(publication.trackName).user_type;
    } catch (error) {
      // randomly assign a viewing type "S" or "P"
      viewing_type = Math.random() < 0.5 ? "S" : "P";
    }
    let team_slug = getTeamSlugFromUrl("space");


    AxiosLocal.get(
      `user/info/?user_id=${participantData._properties.user_id}&role=${participantData._properties.role}&team_slug=${team_slug}`
    )
      .then((res) => {
        let user_type = res.data.data[0].viewer_type;
        addTrackPositionCustom(
          user_type,
          publication,
          dispatch,
          track,
          participant,
          participantData
        );
      })
      .catch((err) => {
        addTrackPositionCustom(
          viewing_type,
          publication,
          dispatch,
          track,
          participant,
          participantData
        );
      });

    // dispatch(
    //   addTrackPosition({
    //     trackId: track.sid,
    //     trackType: participantData._properties.user_type,
    //   })
    // );
  } else if (track.kind === Track.Kind.Audio) {
    // attach it to a new HTMLVideoElement or HTMLAudioElement
    // @ts-ignore
    track.getParticipantId = () => participant.sid;
    dispatch(setaudioTracks(track));
    let participantData = getParticipantPropertyFromMetadata(
      participant.metadata,
      participant.sid
    );
    // dispatch(addTrackPosition({
    //   default: publication.trackName === "",
    //   trackId: participantData._properties.id,
    //   trackType: participantData._properties.user_type,
    //   participantId: participant.sid,
    // }))
  } else {
    // attach it to a new HTMLVideoElement or HTMLAudioElement
    // @ts-ignore
    track.getParticipantId = () => participant.sid;
    dispatch(setaudioTracks(track));
    let participantData = getParticipantPropertyFromMetadata(
      participant.metadata,
      participant.sid
    );
    let viewing_type = participantData._properties.user_type;
    try {
      viewing_type = JSON.parse(publication.trackName).user_type;
    } catch (error) {
      console.log("error", error);
    }

    dispatch(
      addTrackPosition({
        default: JSON.parse(publication.trackName).default,
        trackId: track.sid,
        trackType: viewing_type,
        participantId: participant.sid,
      })
    );
  }
}

function handleTrackUnsubscribed(
  track: RemoteTrack,
  publication: RemoteTrackPublication,
  participant: RemoteParticipant,
  dispatch: Dispatch
) {
  // remove tracks from all attached elements
  // track.detach();
  // variable for currentActiveUserId from redux

  if (replacedTracks.includes(track.sid)) {
    let repeating = window.setInterval(() => {
      if (newReplacedTracks.includes(track.sid)) {
        dispatch(removeTrack(track));
        if (track.kind === Track.Kind.Video) {
          dispatch(removeTrackPosition(track.sid));
          if (track.source != Track.Source.ScreenShare) {
            if (!replacedTracks.includes(track.sid)) {
              dispatch(checkDirectorLeft(participant.sid));
            }
          }
          // dispatch(checkDirectorLeftControlPannel(participant.sid));
        }

        dispatch(setRender("userLeft"));
        if (!replacedTracks.includes(track.sid)) {
          dispatch(checkCurrentActiveVideoRemoved(track.sid));
        }

        window.clearInterval(repeating);
      }
    }, 5);
  } else {
    dispatch(removeTrack(track));
    if (track.kind === Track.Kind.Video) {
      dispatch(removeTrackPosition(track.sid));
      if (track.source != Track.Source.ScreenShare) {
        if (!replacedTracks.includes(track.sid)) {
          dispatch(checkDirectorLeft(participant.sid));
        }
      }
      // dispatch(checkDirectorLeftControlPannel(participant.sid));
    }

    dispatch(setRender("userLeft"));
    if (!replacedTracks.includes(track.sid)) {
      dispatch(checkCurrentActiveVideoRemoved(track.sid));
    }
    //  else {
    //   console.log("bnbnbnbbnbn");

    //    dispatch(setcurrentActiveUserId(track.sid));
    //    dispatch(
    //      setCurrentActiveVideo({ video: track, userId: participant.sid })
    //    );
    //  }
  }
}

function handleMuted(
  publication: TrackPublication,
  participant: Participant,
  dispatch: Dispatch
) {
  if (participant.isLocal) {
    dispatch(setVideoMuted(true));
  } else {
  }
  dispatch(
    setVideoMute({
      unmuted: false,
      id: participant?.sid,
    })
  );
}
function handleunMuted(
  publication: TrackPublication,
  participant: Participant,
  dispatch: Dispatch
) {
  dispatch(
    setVideoMute({ unmuted: participant?.isSpeaking, id: participant?.sid })
  );
}

function handleLocalTrackUnpublished(
  track: LocalTrackPublication,
  dispatch: Dispatch
) {
  // when local tracks are ended, update UI to remove them from rendering
  // track.detach();
  //get window.room.localParticipant.sid value from LocalTrackPublication
  // @ts-ignore

  dispatch(setRender(`LocalTrackPublished_screenShare_${track.trackSid}`));
  dispatch(removeTrack(track.trackInfo));
  if (track.source === Track.Source.ScreenShare) {
    dispatch(setScreenSharing(false));
  }
  if (track.kind === Track.Kind.Video) {
    dispatch(removeTrackPosition(track.track?.sid));
    if (track.source != Track.Source.ScreenShare) {
      if (!replacedTracks.includes(track.track?.sid)) {
        dispatch(checkDirectorLeft(track.track?.sid));
      }
    }
    // dispatch(checkDirectorLeftControlPannel(track.track?.sid));
  }
  dispatch(checkCurrentActiveVideoRemoved(track.track?.sid));
}

function handleActiveSpeakerChange(speakers: Participant[]) {
  //loop speakers and add flicker class to video element
  speakers.forEach((speaker) => {
    //check speakers is muted
    try {
      if (speaker.isMicrophoneEnabled) {
        $(`.outer-ring-${speaker.sid}`)
          .addClass("flicker")
          .delay(1000)
          .queue(function (next) {
            $(this).removeClass("flicker");
            next();
          });
        $(`.outer-video-${speaker.sid}`)
          .addClass("flickerVideo")
          .delay(1000)
          .queue(function (next) {
            $(this).removeClass("flickerVideo");
            next();
          });
      }
    } catch (error) {
      console.log(error);

    }

  });
}



function handleDisconnect() {
  console.log('disconnected from room');
}
