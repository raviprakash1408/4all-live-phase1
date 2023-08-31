import {
  Typography,
  Box,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
  MenuItem,
  MenuList,
} from "../components/mui_core";
import { Helmet } from "react-helmet";

import {
  LAYOUT_TYPES,
  setCurrentActiveVideo,
  setLayout,
  setCurrentActiveVideoAndLayout,
  setdirectorMode,
  switchParticipantPosition,
  setParticipantPositions,
  setparticipantPositions,
  setDevices,
  replaceDevices,
  removeDevices,
  setCenterStageDevice,
  setcurrentActiveUserId,
  setHandRise,
  checkCurrentActiveVideoRemoved,
  setplaying,
  setisMobileStaged,
  sethideHeader,
} from "../state/conference/conferenceSlice";

import {
  setVideoTracks,
  setAudioTracks,
  setCurrentVideoTrack,
  setCurrentAudioTrack,
  setcurrentSpaceName,
  setVideoSwitchTrack,
  setShowBottomMenu,
  setCurrentSpace,
  setcurrentSpaceJwt,
  setfromLoby,
  setAudioDevices,
  setAudioOutputDevices,
  setVideoDevices,
} from "../state/local/localSlice";

import { useDispatch, useSelector } from "react-redux";

import { useCallback, useEffect, useState } from "react";

import BottomMenu from "../components/bottomMenu";
import Grid from "../components/grid";
import SideThumbMenu from "../components/sideThumbMenu";
import YoutubeShare from "../components/youtubeShare";

import React from "react";
import { PackedGrid } from "react-packed-grid";
import Tile from "../components/tile";
import { AxiosLocal } from "../utilities/axiosUtils.ts";
import { setPopoverOpen } from "../state/info/infoSlice";

import { shortNameCreator } from "../utilities/shortName";

import { useLocation, useNavigate } from "react-router-dom";
import { setSpaces } from "../state/user/userSlice";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PopUp from "../components/endCall";
import DynamicGrid from "../components/dynamic_grid";
import { Offline } from "react-detect-offline";
import useMediaQuery from "@mui/material/useMediaQuery";
import Skeleton from "@mui/material/Skeleton";
import PopUpForm from "../components/popupForm.tsx";
import IneractPopUpForm from "../components/IntercatPopup.tsx";

import MpegtsPlayer from "../components/mpegtsPlayer.tsx";
import useLocalStorage from "use-local-storage";
import EventPlaceHolder from "../components/Event/eventPlaceHolder.tsx";
import { client } from "../utilities/centrifugoUtils.ts";
import { allParticipants } from "../livekitConnection/userMap.ts";
import { setSpace, setUsers } from "../state/space/spaceSlice.ts";
import AvatarElem from "../components/staged_layout/avatar.tsx";
import { addDevice, removeDevice } from "../state/controlpannel/slice.ts";
import { newChatState } from "../state/spaceChat/spaceChatSlice.ts";
import { addVolume } from "../state/controlpannel/slice.ts";
import { setEventDark, setEventLight } from "../state/theme/themeSlice";
import { setuserUpdated } from "../state/userProfile/userProfileSlice";
import { connectToRoom } from "../components/livekitIntegration/index.ts";
import {
  setRender,
  setTrackPosition,
  updateTrackPosition,
} from "../state/livekit/slice.ts";
import { v4 as uuidv4 } from "uuid";
import { addTrackPosition } from "../state/livekit/slice.ts";
import {
  setSelectedSpaces,
  setNonselectedSpaces,
  setCurrentSpaceData,
  updateCurrentSubSpaceData,
  setCurrentSubSpaceData,
  updateNonselectedSpaceData,
  updateSelectedSpaceData,
  updateCurrentSpaceData,
  updateNonSelecteSubSpaceData,
  updateSelecteSubSpaceData,
  addSubSpaceToNonSelectedSpaces,
  addSubSpaceToSelectedSpaces,
} from "../state/assignedSpaces/assignedSpacesSlice.ts";
import { setCodec } from "../state/codec/codecSlice.ts";
import {
  getSupportedCodec,
  getTeamSlugFromUrl,
  removeHyphenAndCapitalize,
} from "../utilities/common";
import { CAPITALIZE_WEBSITE_PATH } from "../utilities/websiteUrls.ts";
import Toast from "./Toast";
import LeaveDrop from "../components/popup/leaveDrop.tsx";
import { userLogout } from "../utilities/common";
import MeetingMobile from "../components/MeetingMobile/index.tsx";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const getHeight = (h) => {
  if (h < 360) return 360;
  if (h < 480) return 480;
  if (h < 720) return 720;
  if (h < 1080) return 1080;
  if (h < 1440) return 1440;
  if (h < 2160) return 2160;
};
function loginChannelEvents(
  ctx,
  handleClickToast,
  spacesNotAssigned,
  spacesAssigned,
  mainEvent,
  subEvent,
  setreloadView,
  dispatch,
  navigate,
  location,
  seterrMessage,
  setOpenerrorToast,
  directorModeOn
) {
  console.log(ctx.data, "ctx.data");
  if (ctx.data.type == "username_edited") {
    dispatch(
      setuserUpdated({
        userId: ctx.data.user_id,
        type: "role",
      })
    );
  }
  if (ctx.data.event == "permission for director_mode") {
    if (ctx.data.value) {
      if (directorModeOn) {
        dispatch(setdirectorMode({ mode: false, user_id: null }));
        handleClickToast("Permission for director mode is denied");
      }
    }
  }

  if (ctx.data.type == "workflow_changed") {
    setOpenerrorToast(true);
    seterrMessage("Team workflow changed, so this page will be reloaded.");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
  if (ctx.data.type == "viewer_type_updation") {
    if (ctx.data.user_id == localStorage.getObject("id")) {
      let viewer_type = ctx.data.viewer_type;
      if (viewer_type == "V") {
        handleClickToast("You are joined to this space as hidden");
      }
      localStorage.setObject("user_type", viewer_type);
      // window.room.setLocalParticipantProperty("user_type", viewer_type);
      dispatch(
        setuserUpdated({
          userId: ctx.data.user_id,
          type: "user_type",
          value: viewer_type,
        })
      );
      // dispatch(setParticipantViewTypeChanged(`${ctx.data.user_id}_${viewer_type}`))
      // UpdateLayout()
      // setreloadView("viewer_type_updation");
    }
  }
  if (ctx.data.type == "update_role") {
    if (ctx.data.user_id == localStorage.getObject("id")) {
      // localStorage.setObject("id", ctx.data.user_id);
      localStorage.setObject("role", ctx.data.role.name);
      // window.location.reload(true);

      // window.room.setLocalParticipantProperty("role", ctx.data.role.name);

      setreloadView(
        `${ctx.data.user_id}_${ctx.data.type}_${ctx.data.role.name}`
      );
      dispatch(
        setuserUpdated({
          userId: ctx.data.user_id,
          type: "role",
        })
      );
      window.eventChanel.publish({
        event: "update_role_responce",
        user_id: ctx.data.user_id,
        role: ctx.data.role.name,
      });
    }
  }
  if (ctx.data.type == "update_role_responce") {
    setreloadView(`${ctx.data.user_id}_${ctx.data.type}_${ctx.data.role.name}`);
    dispatch(
      setuserUpdated({
        userId: ctx.data.user_id,
        type: "role",
      })
    );
  }

  if (ctx.data.type == "user_space_changed") {
    let mainEventData = ctx.data.data.filter(
      (space) => space.slug === mainEvent[0].slug
    );
    if (ctx.data.user_id == localStorage.getObject("id")) {
      if (mainEventData.length == 0) {
        window.location.href = "/404";
        // navigate("/404");
      }
    }

    let team_slug = getTeamSlugFromUrl("space");

    AxiosLocal.post("space/subroom/selected/", {
      slug: location.pathname.substring(location.pathname.lastIndexOf("/") + 1),
      team_slug: team_slug,
    })
      .then(function (response) {
        let assignedSpaceList = response.data.data;
        dispatch(setSelectedSpaces([...assignedSpaceList]));
        let selectedMAinSpace = assignedSpaceList[0];
        dispatch(setCurrentSpaceData({ ...selectedMAinSpace }));
        let selectedMainSubSpace = selectedMAinSpace.subrooms.find(
          (subroom) =>
            subroom.slug ===
            location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
        );
        dispatch(setCurrentSubSpaceData(selectedMainSubSpace));
      })
      .catch(function (error) {
        console.log(error);
      });

    AxiosLocal.post("space/subroom/notselected/", {
      slug: location.pathname.substring(location.pathname.lastIndexOf("/") + 1),
      team_slug: team_slug,
    }).then(function (response) {
      dispatch(setNonselectedSpaces([...response.data.data]));
    });
  }

  if (ctx.data.type == "user_remove") {
    if (ctx.data?.user_ids[0] === localStorage.getObject("id")) {
      userLogout();
      window.location.href = "/";
    }
  }

  if (ctx.data.type == "user_space_edit") {
    if (ctx.data.data.id == mainEvent[0].id) {
      dispatch(updateCurrentSpaceData(ctx.data.data));
      dispatch(updateSelectedSpaceData(ctx.data.data));
    } else {
      dispatch(updateNonselectedSpaceData(ctx.data.data));
    }
  }

  if (ctx.data.type == "user_subspace_edit") {
    if (ctx.data.data.main_space_id == mainEvent[0].id) {
      dispatch(updateSelecteSubSpaceData(ctx.data.data));
    } else {
      dispatch(updateNonSelecteSubSpaceData(ctx.data.data));
    }
  }
}

function eventChannelEvents(
  ctx,
  got_the_answer,
  left,
  participantPositions,
  trackPosition,
  iAmDirector,
  setLeft,
  setWidth,
  conference,
  dispatch,
  setopenDialoge,
  setaskedtoBecomeDirectorId,
  setmessageType,
  setmessage,
  setuserShortName,
  local,
  layout,
  setbackgroundImage,
  deviceState,
  livekitTracks,
  volumes,
  temp_layout,
  primary,
  secondary,
  handleClickToast,
  navigate,
  location,
  setshowVideo,
  setavatar
) {
  console.log("ctx.data", ctx.data);
  if (ctx.data.type === "light_theme" || ctx.data.type === "dark_theme") {
    if (localStorage.getObject("theme") === "dark") {
      dispatch(setEventDark({ ...ctx.data.dark_theme }));
    } else {
      dispatch(setEventLight({ ...ctx.data.light_theme }));
    }
  }
  if (ctx.data.event == "update_volume") {
    dispatch(addVolume(ctx.data.volumeData));
  }
  if (ctx.data.event == "HandRised") {
    dispatch(setHandRise(ctx.data.value.user_id));
  }
  if (ctx.data.event == "muteVideo") {
    if (window.room?.localParticipant.sid == ctx.data.userId) {
      window.room?.localParticipant.getDefaultVideoTrack().setTrackMuted(true);
      localStorage.setObject("videoMuted", true);
    }
  }
  if (ctx.data.event == "Request UnmuteVideo") {
    if (window.room?.localParticipant.sid == ctx.data.userId) {
      // window.room?.localParticipant.getDefaultVideoTrack().setTrackMuted(false);
      setopenDialoge(true);
      setmessageType("video");
      setmessage(
        `Admin has requested to unmute your video. do you wish to unmute your video`
      );
    }
  }
  if (ctx.data.event == "muteAudio") {
    if (window.room?.localParticipant.sid == ctx.data.userId) {
      window.room?.localParticipant.setMicrophoneEnabled(false);
      localStorage.setObject("audioMuted", true);
    }
  }
  if (ctx.data.event == "Kick User") {
    if (window.room?.localParticipant.sid == ctx.data.userId) {
      handleClickToast("You have been kicked out bye.... ");
      console.log("kickUserTestGuest", localStorage.getObject("guestUser"));
      window.setTimeout(() => {
        if (localStorage.getObject("guestUser") === "true") {
          userLogout();
          window.location.href = "/";
        } else {
          window.location.href = "/spaces";
        }
      }, 2000);
    } else {
      handleClickToast(`${ctx.data.name} will be kicked out`);
    }
  }
  if (ctx.data.event == "kickAllUser") {
    handleClickToast("The event has been ended bye...");
    window.setTimeout(() => {
      if (localStorage.getObject("guestUser") === "true") {
        userLogout();
        window.location.href = "/";
      } else {
        window.location.href = "/spaces";
      }
    }, 2000);
  }

  if (ctx.data.event == "RemoveDuplicateUser") {
    if (
      ctx.data.roomUserId !== window.room?.localParticipant.sid &&
      localStorage.getObject("id") == ctx.data.userId
    ) {
      handleClickToast("You have been removed from this space bye.... ");
      if (localStorage.getObject("guestUser") === "true") {
        window.location.href = "/";
      } else {
        window.location.href = "/spaces";
      }
    }
  }

  if (ctx.data.event == "Remove User") {
    let team_slug = getTeamSlugFromUrl("space");
    if (window.room?.localParticipant.sid == ctx.data.userId) {
      handleClickToast("You have been removed from this space bye.... ");
      if (localStorage.getObject("guestUser") === "true") {
        userLogout();
        window.location.href = "/";
      } else {
        window.setTimeout(() => {
          AxiosLocal.delete("subroom/user/delete", {
            data: {
              user_id: ctx.data.dbuserId,
              subroom_slug: location.pathname.substring(
                location.pathname.lastIndexOf("/") + 1
              ),
              team_slug: team_slug,
            },
          }).then(function (response) {
            window.location.href = "/spaces";
          });
        }, 2000);
      }
    } else {
      handleClickToast(`${ctx.data.name} will be removed from this space`);
    }
  }

  if (ctx.data.event == "Request UnmuteAudio") {
    if (window.room?.localParticipant.sid == ctx.data.userId) {
      setopenDialoge(true);
      setmessageType("audio");
      setmessage(
        `Admin has requested to unmute your audio. do you wish to unmute your audio`
      );
    }
  }

  if (ctx.data.event == "Move to Subroom") {
    if (window.room?.localParticipant.sid == ctx.data.userId) {
      if (ctx.data.lobbyEnabled) {
        window.location.href = `/lobby/${localStorage.getObject(
          "organization_slug"
        )}/${ctx.data.roomSlug}/${ctx.data.subroomSlug}`;
      } else {
        window.location.href = `/${localStorage.getObject(
          "organization_slug"
        )}/${ctx.data.roomSlug}/${ctx.data.subroomSlug}`;
      }
    }
  }

  if (ctx.data.event == "removeScreenShare") {
    let id = ctx.data.id;
    if (window.room?.localParticipant.sid == id) {
      window.room?.localParticipant.setScreenShareEnabled(false);
    }
  }

  if (ctx.data.event == "removeLocalDevice") {
    let id = ctx.data.id;
    let trackId = ctx.data.trackId;
    if (window.room?.localParticipant.sid == id) {
      let track;
      // value.trackName === "Device"
      window.room?.getLocalVideoTracks().forEach(async (value, key) => {
        if (value.track?.sid === trackId) {
          track = value.track;
        }
      });
      window.room?.localParticipant.unpublishTrack(track);
    }
  }
  if (ctx.data.event == "asking for supported codec") {
    window.eventChanel.publish({
      event: "getSupportedCodec",
      userId: ctx.data.userId,
      supportedCodec: getSupportedCodec(),
    });
  }
  if (ctx.data.event == "getSupportedCodec") {
    dispatch(
      setCodec({
        userId: ctx.data.userId,
        supportedCodec: ctx.data.supportedCodec,
      })
    );
  }
  if (ctx.data.event == "getDevices") {
    if (iAmDirector) {
      window.eventChanel.publish({
        event: "getDevicesResponce",
        devices: deviceState,
      });
    }
  }

  if (ctx.data.event == "layoutChanged") {
    if (ctx.data.layout == LAYOUT_TYPES.STAGE_LAYOUT) {
      //  && ctx.data.userId !== window.room?.localParticipant.sid && ctx.data.clickedby !== window.room?.localParticipant.sid
      dispatch(setcurrentActiveUserId(ctx.data.trackUniqueId));
      let trackId = ctx.data.trackUniqueId;
      let track = livekitTracks.find((item) => item.sid == trackId);
      if (track) {
        dispatch(
          setCurrentActiveVideo({
            video: track,
            userId: track.getParticipantId(),
          })
        );
        dispatch(
          setCenterStageDevice({
            layout_change: true,
            enabled: false,
            url: "",
            id: "",
          })
        );

        dispatch(setRender(`track_changed_centerStage_${track.sid}`));
      } else {
        // try {

        // } catch (error) {
        //   console.log(error);
        // }
        let device = deviceState.find((item) => item.id == trackId);
        if (device) {
          dispatch(
            setCenterStageDevice({
              layout_change: true,
              enabled: true,
              url: device.url,
              id: device.id,
            })
          );
        } else {
          try {
            dispatch(
              setCurrentActiveVideo({ video: "no video", userId: trackId })
            );
            dispatch(
              setCenterStageDevice({
                layout_change: true,
                enabled: false,
                url: "",
                id: "",
              })
            );
          } catch (error) {
            console.log(error);
          }
        }
      }
    }

    dispatch(setLayout(ctx.data.layout));
  }

  if (ctx.data.event == "askToBecomeDirector") {
    if (ctx.data.user_id == window.room?.myUserId()) {
      setopenDialoge(true);
      setaskedtoBecomeDirectorId(ctx.data.current_user_id);
      setmessageType("askToBecomeDirector");
      setmessage(
        `${window.room?.getParticipantById(ctx.data.current_user_id)?._properties
          ?.firstName
        } has requested to become director`
      );
    }
  }

  try {
    if (ctx.data.event == "directorModeUpdate") {
      if (ctx.data.user_id != window.room?.myUserId()) {
        window.eventChanel.publish({
          event: "query_director_mode",
        });
      }
    }
  } catch (e) {
    console.log(e, "directorModeUpdateError");
  }

  if (ctx.data.event == "acceptedToBecomeDirector") {
    if (ctx.data.user_id == window.room?.myUserId()) {
      dispatch(
        setdirectorMode({
          mode: true,
          user_id: window.room?.myUserId(),
          setuserShortName,
        })
      );
      // publish the director mode through the eventchannel
      window.eventChanel.publish({
        event: "director_mode",
        value: true,
        layout,
        user_id: window.room?.myUserId(),
        participantPositions,
        currentActiveUserId: conference.currentActiveUserId,
      });
      if (ctx.data.user_id === window.room?.myUserId()) {
        handleClickToast(
          `You got the director access. You are directoring now`
        );
      }
    }
  }
  if (ctx.data.type == "background_image") {
    setbackgroundImage(ctx.data.value);
  }
  if (ctx.data.event == "addDevice") {
    let user = window.room.getParticipantById(ctx.data.user_id);
    if (ctx.data.user_id == window.room?.myUserId()) {
      user = {
        _properties: {
          user_type: localStorage.getObject("user_type"),
          avatar: localStorage.getObject("avatar"),
          userId: localStorage.getObject("id"),
          firstName: localStorage.getObject("username"),
        },
      };
    }
    dispatch(
      addTrackPosition({
        trackId: ctx.data.id,
        trackType: "P",
        default: false,
        participantId: ctx.data.user_id,
      })
    );
    dispatch(
      addDevice({
        streamType: ctx.data.type === "video" ? "Video" : "Device",
        role: "",
        userType: user._properties.user_type,
        profilePic: user._properties.avatar,
        id: ctx.data.id,
        user_id: ctx.data.user_id,
        name: user._properties.firstName,
        url: ctx.data.url,
        file_name: ctx.data.file_name,
      })
    );
    // dispatch(
    //   setParticipantPositions({
    //     user_id: ctx.data.id,
    //     position: window.room?.participants + 1,
    //     user_Type: window.room?.getParticipantById(ctx.data.user_id)
    //       ?._properties?.user_type,
    //   })
    // );
    dispatch(
      setDevices({
        user_id: ctx.data.user_id,
        name: ctx.data.name,
        url: ctx.data.url,
        id: ctx.data.id,
        device: ctx.data.device,
        type: ctx.data.type,
        file_name: ctx.data.file_name,
      })
    );

    if (ctx.data.director_mode) {
      dispatch(setcurrentActiveUserId(ctx.data.id));
      dispatch(
        setCenterStageDevice({
          layout_change: true,
          enabled: true,
          url: ctx.data.url,
          id: ctx.data.id,
        })
      );
    }
    dispatch(setRender("render"));
  }

  if (ctx.data.event == "videoPlayPause") {
    dispatch(setplaying(ctx.data.videoStatus));

    // dispatch(setRender("render"));
  }

  if (ctx.data.event == "removeDevice") {
    dispatch(removeDevice(ctx.data.id));
    dispatch(setParticipantPositions({ user_id: ctx.data.id, position: null }));

    dispatch(
      removeDevices({
        id: ctx.data.id,
      })

      // check this video is big if big then make our video big
    );

    //for removing closed video on center stage

    if (conference.currentActiveUserId == ctx.data.id) {
      dispatch(
        setCenterStageDevice({
          layout_change: true,
          enabled: false,
          url: "",
          id: "",
        })
      );
      dispatch(setLayout(temp_layout));
      window.eventChanel.publish({
        event: "layoutChanged",
        layout: temp_layout,
        user_id: window.room.myUserId(),
      });
    }

    // setdevicesLocal(JSON.stringify(localDevices.join("::")))
  }

  if (ctx.data?.event == "director_mode") {
    dispatch(
      setdirectorMode({ mode: ctx.data.value, user_id: ctx.data.user_id })
    );

    if (ctx.data?.value) {
      if (ctx.data?.layout == "stage_layout") {
        if (ctx.data?.centerStage?.enabled) {
          dispatch(
            setCenterStageDevice({
              layout_change: true,
              enabled: true,
              url: ctx.data.centerStage.url,
              id: ctx.data.centerStage.id,
            })
          );
          dispatch(setcurrentActiveUserId(ctx.data.centerStage.id));
        }
        if (ctx.data?.centerStage?.enabled == false) {
          let activeTrack = livekitTracks.filter(
            (track) => track.sid == ctx.data.currentActiveUserId
          )[0];
          dispatch(
            setCurrentActiveVideo({
              video: activeTrack,
              userId: ctx.data.activeUserId,
            })
          );
          dispatch(setcurrentActiveUserId(ctx.data.currentActiveUserId));
          dispatch(
            setCenterStageDevice({
              layout_change: true,
              enabled: false,
              url: "",
              id: "",
            })
          );
        }
      } else {
        dispatch(setLayout(ctx.data?.layout));
      }
    }
    dispatch(setparticipantPositions(ctx.data.participantPositions));

    if (ctx.data.user_id !== window.room?.myUserId()) {
      let firstName = "";
      let lastName = "";
      let participantProperties = window.room.getParticipantById(
        ctx.data.user_id
      )._properties;
      firstName = participantProperties["firstName"];
      lastName = participantProperties["lastName"];
      if (ctx.data.value == false) {
        handleClickToast(
          `${firstName} ${lastName} has stopped directoring, You can become the director now`
        );
      } else {
        handleClickToast(`${firstName} ${lastName} is directoring now`);
      }
    }
    // if(ctx.data.value == false && ctx.data.user_id !== window.room?.myUserId()){
    //   handleClickToast(`${firstName} ${lastName} has stopped directoring, You can become the director now`);
    // }
  }
  if (ctx.data.event == "director_mode_width") {
    if (ctx.data.user_id != window.room.myUserId()) {
      setLeft(ctx.data.value);
      setWidth(ctx.data.value);
      //  window.eventChanel.publish({
      //   event: "layoutChanged",
      //   layout:ctx.data.layout,
      //   trackUniqueId: ctx.data.user_id,
      // });
      dispatch(setLayout(ctx.data.layout));

    }

  }
  if (ctx.data.event == "director_mode_drop") {
    let newValue = ctx.data.value;
    dispatch(
      setuserUpdated({
        userId: ctx.data.user_id,
        type: "drop",
      })
    );
    if (ctx.data.user_id != window.room.myUserId()) {
      if (!ctx.data.livekit) {
        if (newValue.user_id_1 == localStorage.getObject("id")) {
          newValue.user_id_1 = window.room?.myUserId();
        } else {
          let participant = window.room
            ?.getParticipants()
            .filter((item) => item._properties.id == newValue.user_id_1);
          newValue.user_id_1 = participant[0]._id;
        }
        // newValue.user_id_1 = window.room?.
      }
      dispatch(switchParticipantPosition(newValue));
    } else {
      // window.room.setLocalParticipantProperty("user_type",newValue.user_type);
    }
  }

  if (ctx.data.event == "real_time_drop") {
    let newValue = ctx.data.value;
    // get participants
    let participants = window.room?.participants;
    let newParticipants = {};
    // loop through participants and map the participant id to the participant
    for (const [key, value] of Object.entries(participants)) {
      newParticipants[value._properties.id] = key;
    }
    newParticipants[window.room?.getLocalParticipantProperty("id")] =
      window.room?.myUserId();
    newValue.user_id_1 = newParticipants[newValue.user_id_1];
    dispatch(switchParticipantPosition(newValue));
  }

  // query if direcror mode is on
  if (ctx.data.event == "query_director_mode") {
    if (iAmDirector) {
      // setTimeout(() => {
      window.eventChanel.publish({
        event: "query_director_mode_answer",
        value: true,
        user_id: window.room?.myUserId(),
        width: left,
        trackPosition: trackPosition,
        layout,
        currentActiveUserId: conference?.currentActiveUserId,
        activeUserId: conference.currentActiveVideo?.userId,
        centerStage: conference.centerStage,
        // handrisedUsers: conference.HandRise,
      });
      // }, 2000);
    }
    // currentActiveUserId: conference.currentActiveUserId,

    // // check if director mode is on
    // if (directorMode) {
    //   window.eventChanel.publish({
    //     event: "query_director_mode_answer",
    //     value: directorMode,
    //     user_id: conference.directorMode.user_id,
    //     width: left,
    //     participantPositions: participantPositions,
    //   });
    // }
  }
  // setTrckPosition
  if (ctx.data.event == "set_track_position") {
    dispatch(setTrackPosition(ctx.data.value));
  }

  // answer if direcror mode is on
  if (ctx.data.event == "query_director_mode_answer") {
    // check if director mode is on
    if (!iAmDirector) {
      if (ctx.data.value) {
        //  dispatch(setHandRise(ctx.data.handrisedUsers))
        // ctx.data.handrisedUsers.map((user) => {
        //   dispatch(setHandRise(user));
        // });
        dispatch(
          setdirectorMode({
            mode: ctx.data.value,
            user_id: ctx.data.user_id,
          })
        );
        let newwidth = ctx.data.width;
        setLeft(newwidth);
        setWidth(newwidth);
        // setParticipantPositions(ctx.data.participantPositions);
        dispatch(setTrackPosition(ctx.data.trackPosition));
        dispatch(setLayout(ctx.data.layout));

        if (ctx.data.layout == "stage_layout") {
          if (ctx.data.centerStage.enabled) {
            dispatch(
              setCenterStageDevice({
                layout_change: true,
                enabled: true,
                url: ctx.data.centerStage.url,
                id: ctx.data.centerStage.id,
              })
            );
            dispatch(setcurrentActiveUserId(ctx.data.centerStage.id));
          } else {
            setTimeout(() => {
              window.room.participants.forEach((item) => {
                if (item.sid == ctx.data.activeUserId) {
                  dispatch(
                    setCurrentActiveVideo({
                      video: "no video",
                      userId: ctx.data.activeUserId,
                    })
                  );
                  dispatch(setcurrentActiveUserId(ctx.data.activeUserId));
                  dispatch(
                    setCenterStageDevice({
                      layout_change: true,
                      enabled: false,
                      url: "",
                      id: "",
                    })
                  );
                }
              });
            }, 2000);
          }
        }

        dispatch(setRender(`director_mode_update_${uuidv4()} `));
      }
    }
  }

  if (
    ctx.data.event == "query_default" &&
    ctx.data.user_id != window.room?.myUserId()
  ) {
    // check if director mode is on
    window.eventChanel.publish({
      event: "query_default_answer",
      devices: deviceState,
      user_id: window.room?.myUserId(),
      trackPosition: trackPosition,
      handrisedUsers: conference.HandRise,
    });
    // window.eventChanel.publish({
    //   event: "hand_rised_users",
    //   handrisedUsers: conference.HandRise,
    // });
  }

  if (ctx.data.event == "query_default_answer") {
    console.log(
      ctx.data.user_id,
      window.room?.myUserId(),
      got_the_answer,
      "query_default_answerquery_default_answer"
    );
    if (
      !got_the_answer &&
      ctx.data.user_id != window.room?.myUserId() &&
      ctx.data.user_id != ""
    ) {
      if (ctx.data.devices.length > 0) {
        dispatch(replaceDevices(ctx.data?.devices));
        //map ctx.data?.devices
        ctx.data?.devices.forEach((device) => {
          dispatch(setplaying({ id: device.id, play: true }));
        });
        dispatch(setRender(`replaceDevices`));
        //loop over ctx.data.handrisedUsers and dispatch setHandRise
        // ctx.data.handrisedUsers.map((user) => {
        //   dispatch(setHandRise(user));
        // });

        // dispatch(setHandRise(ctx.data.handrisedUsers));
      }

      got_the_answer = true;
    }

    // dispatch(setRender(`replaceDevices`));
    //   if(ctx.data.trackPosition.length > 0){
    //       dispatch(setTrackPosition(ctx.data.trackPosition));
    // }
    // setLayout(ctx.data.layout);
  }
  // if(ctx.data.event == "hand_rised_users"){
  //   ctx.data.handrisedUsers.map((user) => {
  //     dispatch(setHandRise(user));
  //   });
  //   dispatch(setRender(`hand_rised_users`));
  // }
}
let got_the_answer = false;
export default function MainEvent(props) {
  const matches = useMediaQuery("(min-width:1500px)");
  const navigate = useNavigate();
  const shareUrl = useSelector((state) => state.conference.ShareUrl);
  const layout = useSelector((state) => state.conference.layout);
  const [temp_layout, setTempLayout] = useState(layout);

  let team_slug = getTeamSlugFromUrl("space");
  useEffect(() => {
    if (
      temp_layout != layout &&
      (layout == LAYOUT_TYPES.DYNAMIC_GRID_LAYOUT ||
        layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL ||
        layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_VERTICAL)
    ) {
      //temp = current_layout
      setTempLayout(layout);
    }
  }, [layout]);

  const [duplicateCheckOpen, setDuplicateCheckOpen] = useState(false);

  // get devices from conference state
  const devices = useSelector((state) => state.conference.devices);
  // get centerStage from conference state
  const centerStage = useSelector((state) => state.conference.centerStage);
  let conference = useSelector((state) => state.conference);
  // director mode
  const directorMode = useSelector(
    (state) => state.conference.directorMode.mode
  );
  const remote = useSelector((state) => state.conference);
  const permissions = useSelector((state) => state.permissions);
  const participantPositions = useSelector(
    (state) => state.conference.participantPositions
  );
  const trackPosition = useSelector((state) => state.livekit.trackPosition);

  const info = useSelector((state) => state.info);
  const local = useSelector((state) => state.local);
  const [onlyLocal, setonlyLocal] = useState(false);
  const [primary, setprimary] = useState({});
  const [secondary, setsecondary] = useState({});

  const videoMuteIdsList = useSelector(
    (state) => state.conference.videoMuteIds
  );
  const audioMuteIdsList = useSelector(
    (state) => state.conference.audioMuteIds
  );

  const chatOpened = useSelector((state) => state.spaceChats.chatOpened);
  const livekitTracks = useSelector((state) => state.livekit.tracks);
  const rerender = useSelector((state) => state.livekit.rerender);

  // useselector for the device state from control panel
  const deviceState = useSelector((state) => state.conference.devices);
  const volumes = useSelector((state) => state.controlpanel.volumes);

  // const [activeId, setactiveId] = useState("")
  // useEffect(() => {
  //   setactiveId(current_active_user_id);
  // }, [current_active_user_id]);

  const remoteVideoTracks = remote.remoteVideoStreams;
  const remoteAudioTracks = remote.remoteAudioStreams;

  const [open, setOpen] = useState(false);
  const theme = useSelector((state) => state.theme.themeData);

  // dynamicTheme
  const eventTheme = useSelector(
    (state) => state.theme.eventTheme[state.theme.theme]
  );

  const [width, setWidth] = useState(50);

  // state for mouse down
  const [mouseDown, setMouseDown] = useState(false);
  const [userShortName, setuserShortName] = useState("");
  const [avatar, setavatar] = useState("");

  const [showVideo, setshowVideo] = useState(false);
  // left for the seperator
  const [left, setLeft] = useState(50);
  const dispatch = useDispatch();
  const location = useLocation();
  const [openDialoge, setopenDialoge] = React.useState(false);
  // setAskedtoBecomeDirectorId
  const [askedtoBecomeDirectorId, setaskedtoBecomeDirectorId] = useState("");
  const [message, setmessage] = useState("");
  const [messageType, setmessageType] = useState("");
  const [subscribedToCentrifugo, setsubscribedToCentrifugo] = useState(false);
  // subscribedToEventChanel
  const [subscribedToEventChanel, setsubscribedToEventChanel] = useState(false);

  const [responseSend, setresponseSend] = useState(false);

  const [EventReady, setEventReady] = useState(false);

  const [UserInteractPopOpen, setUserInteractPopOpen] = useState(false);

  const [readyToJoin, setreadyToJoin] = useState(false);

  // state for showing the username popup
  const [showUsernamePopup, setshowUsernamePopup] = useState(false);

  // state for showing the savedSubroom
  const [savedSubroom, setsavedSubroom] = useState({});
  // state for showing the username
  const [showUsername, setshowUsername] = useState(false);
  // state for showing the password
  const [showPassword, setshowPassword] = useState(false);

  //staged view volume
  const [is_hover, setHover] = useState(false);
  const [volumeStaged, setvolumeStaged] = useState(0);

  const [reloadView, setreloadView] = useState("false");

  // iAmDirector
  const [iAmDirector, setiAmDirector] = useState(false);

  //DirectorModeOn
  const [directorModeOn, setdirectorModeOn] = useState(false);

  // background image
  const [backgroundImage, setbackgroundImage] = useState("");

  const [errMessage, seterrMessage] = useState("");
  const [openerrorToast, setOpenerrorToast] = useState(false);

  const spacesNotAssigned = useSelector(
    (state) => state.assignedSpaces.nonselectedSpaces
  );
  const spacesAssigned = useSelector(
    (state) => state.assignedSpaces.selectedSpaces
  );
  const mainEvent = useSelector((state) => state.assignedSpaces.currentSpace);
  const subEvent = useSelector((state) => state.assignedSpaces.currentSubSpace);

  useEffect(() => {
    let allVolumes = volumes || [];
    let videos = { ...primary, ...secondary };
    let newVolume;
    let currentVideo = videos[conference.currentActiveUserId];
    if (currentVideo?.type == "device") {
      newVolume = allVolumes.find(
        (v) => v.device_id == conference.currentActiveUserId
      );
    } else {
      newVolume = allVolumes.find(
        (v) => v.user_id == conference.currentActiveUserId
      );
    }
    if (newVolume?.volume == 0) {
      setvolumeStaged(0);
      // audioElement.current.volume = 0;
    } else {
      setvolumeStaged(newVolume?.volume || 100);
      // audioElement.current.volume = newVolume?.volume / 100 || 50 / 100;
    }
  }, [conference.currentActiveUserId, primary, secondary, volumes]);

  const updateVolumeLocal = (volume) => {
    if (typeof volume == "object") {
      volume = volume.volume;
    }
    let videos = { ...primary, ...secondary };
    let currentVideo = videos[conference.currentActiveUserId];
    let is_device = currentVideo?.type == "device";
    let volumeData = {
      type: is_device ? "device" : "user",
      device_id: is_device ? currentVideo?.id : null,
      user_id: is_device ? null : currentVideo?.user_id,
      volume: volume,
    };
    dispatch(addVolume(volumeData));
    if (iAmDirector) {
      window.eventChanel.publish({ event: "update_volume", volumeData });
    }
  };

  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = theme?.login?.favicon32x32;
  }, []);

  useEffect(() => {
    // Space Channel for showing online users in space
    AxiosLocal.post("centrifugo/space_online", {
      subspace_slug: location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1
      ),
      team_slug: team_slug,
    }).then((res) => {
      try {
        // @ts-ignore
        if (window.spaceOnlineChannel) {
          // @ts-ignore
        } else {
          let spaceOnlineChannel = (window.spaceOnlineChannel =
            client.newSubscription(res.data.channel_name, {
              token: res.data.token,
              joinLeave: true,
            }));
          spaceOnlineChannel.subscribe();
        }
      } catch (error) {
        // console.log(error, "no event channel");
      }
      // @ts-ignore
    });
  }, []);

  useEffect(() => {
    // Space Chat Channel Subscription
    AxiosLocal.post("centrifugo/space_chat", {
      subspace_slug: location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1
      ),
      team_slug: team_slug,
    }).then((res) => {
      let chatChanel;
      try {
        if (!window.chatChanel) {
          // @ts-ignore
          let chatChanel = (window.chatChanel = client.newSubscription(
            res.data.channel_name,
            {
              token: res.data.token,
              joinLeave: true,
            }
          ));
          chatChanel.subscribe();
        }
      } catch (error) {
        console.log(error, "no chat channel");
        chatChanel = window.chatChanel;
      }

      setInterval(() => {
        // Chat Channel Listener for new messages and notification sound in space
        if (window.chatChanel.listeners("publication").length === 0) {
          window.chatChanel.addListener("publication", (event) => {
            if (event.data.type === "space_chat") {
              if (
                event.info.chanInfo.user_id !== localStorage.getObject("id")
              ) {
                const audio = new Audio(
                  "/assets/sounds/message-notification.aac"
                );
                audio.play();
                if (!chatOpened) {
                  dispatch(newChatState(true));
                }
              }
            }
          });
        }
      }, 1000);
    });
  }, []);

  useEffect(() => {
    // get director mode from conference state
    if (
      conference.directorMode.mode &&
      conference.directorMode.user_id === window.room?.myUserId()
    ) {
      setiAmDirector(true);
    } else {
      setiAmDirector(false);
    }
  }, [conference.directorMode.mode, conference.directorMode.user_id]);

  useEffect(() => {
    if (conference.directorMode.mode) {
      setdirectorModeOn(true);
    } else {
      setdirectorModeOn(false);
    }
  }, [conference.directorMode.mode]);
  const getDevices = useCallback(() => {
    return devices;
  }, [devices]);

  useEffect(() => {
    return () => { };
  }, [location, location.pathname]);
  // useEffect(() => {
  //   const unloadCallback = (event) => {
  //     event.preventDefault();
  //     event.returnValue = "";
  //     return "";
  //   };

  //   window.addEventListener("beforeunload", unloadCallback);
  //   return () => window.removeEventListener("beforeunload", unloadCallback);
  // }, []);

  //  useEffect for mapping the livekit userid to db user id

  useEffect(() => {
    if (local.livekitInitialized) {
      let allParticipantsList = allParticipants();
      // updateRoomConfigByProperty all participants
    }
  }, [local.livekitInitialized]);

  useEffect(() => {
    if (local.livekitInitialized) {
      let allParticipantsList = allParticipants();
      // updateRoomConfigByProperty all participants
    }
  }, [local.livekitInitialized]);

  useEffect(() => {
    if (
      conference.centrifugoClient &&
      !subscribedToCentrifugo &&
      !subscribedToEventChanel
    ) {
      if (!window.eventChanel) {
        let path = location.pathname.substring(
          location.pathname.lastIndexOf("/") + 1
        );
        AxiosLocal.post("centrifugo/space", {
          subspace_slug: path,
          team_slug: team_slug,
        })
          .then((res) => {
            AxiosLocal.get(
              `user/info/?user_id=${localStorage.getObject(
                "id"
              )}&team_slug=${team_slug}`,
              {}
            ).then((res) => {
              if (res.data.data.length > 0) {
                let user = res.data.data[0];
                localStorage.setObject("user_type", user.viewer_type);
                // window.room.setLocalParticipantProperty(
                //   "user_type",
                //   user.viewer_type
                // );
                if (user.viewer_type == "V") {
                  handleClickToast("You are joined to this space as hidden");
                }
                setreloadView(`${user.id}_${user.viewer_type}`);
                // dispatch(setParticipantViewTypeChanged(`${user.id}_${ user.viewer_type}`))
                // UpdateLayout()
              }
            });
            let eventToken = res.data.token;
            // let eventToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaGFubmVsIjoic3BhY2VfY2hhbm5lbF8xMV8xIiwic3ViIjoiNSIsImluZm8iOnsibmFtZSI6Ikdva3VsIFAgUiIsInVzZXJfaWQiOiI1IiwiZW1haWwiOiJnb2t1bHJhZ2h1dGhhbWFuQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJHb2t1bCIsImxhc3RfbmFtZSI6IlAgUiIsInRlYW1faWQiOjEsInRlYW1fbmFtZSI6IkVWRU5UUy5GT1gifX0.czjgM-4L5ZShvUJdbLmPq9tUXO2C5QEvFkZ1UIKbpEI"
            if (!window.eventChanel) {
              let eventChanel = (window.eventChanel = client.newSubscription(
                res.data.channel_name,
                {
                  token: eventToken,
                  joinLeave: true,
                }
              ));
              //
              console.log("duplicate tab test 1");
              eventChanel.subscribe();
              setsubscribedToEventChanel(true);
            }

            // if (eventChanel) {
            //   setsubscribedToEventChanel(true);
            //   window.eventChanel = eventChanel;
            // }
            // query if direcror mode is on
            window.eventChanel.publish({
              event: "query_director_mode",
            });

            window.eventChanel.publish({
              event: "query_default",
              user_id: window.room?.myUserId(),
            });
          })
          .catch((err) => {
            // console.log(err, "eventChanel");
          });
      }
    }
    try {
      if (window.loginChannel) {
        window.loginChannel.on("publication", (ctx) => {
          loginChannelEvents(
            ctx,
            handleClickToast,
            setreloadView,
            spacesNotAssigned,
            spacesAssigned,
            mainEvent,
            subEvent,
            dispatch,
            navigate,
            location,
            seterrMessage,
            setOpenerrorToast,
            directorModeOn
          );
        });
      }
      if (window.eventChanel) {
        window.eventChanel.on("publication", (ctx) =>
          eventChannelEvents(
            ctx,
            got_the_answer,
            left,
            participantPositions,
            trackPosition,
            iAmDirector,
            setLeft,
            setWidth,
            conference,
            dispatch,
            setopenDialoge,
            setaskedtoBecomeDirectorId,
            setmessageType,
            setmessage,
            setuserShortName,
            local,
            layout,
            setbackgroundImage,
            deviceState,
            livekitTracks,
            volumes,
            temp_layout,
            primary,
            secondary,
            handleClickToast,
            navigate,
            location,
            setshowVideo,
            setavatar
          )
        );
      }
    } catch (error) {
      // console.log(error, "window.eventChanel");
    }

    return () => {
      if (window.loginChannel) {
        window.loginChannel.removeAllListeners("publication");
      }
      if (window.eventChanel) {
        window.eventChanel.removeAllListeners("publication");
      }
      // window.eventChanel?.unsubscribe();
    };
  }, [
    iAmDirector,
    local.livekitInitialized,
    conference.centrifugoClient,
    conference.devices,
    conference.directorMode.mode,
    conference.directorMode.user_id,
    devices,
    directorMode,
    dispatch,
    left,
    trackPosition,
    participantPositions,
    subscribedToCentrifugo,
    getDevices,
    conference,
    layout,
    deviceState,
    livekitTracks,
    volumes,
    local,
    temp_layout,
    primary,
    secondary,
    subscribedToEventChanel,
    location.pathname,
    navigate,
    mainEvent,
    subEvent,
    directorModeOn,
  ]);
  useEffect(() => {
    if (local.livekitInitialized) {
      let constraints = {
        defaultConstraints: {
          maxHeight: 480, //TODO to be replaced with minimum reciever height
        },
        constraints: {},
      };

      switch (layout) {
        case LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL:
          let tier1_video = window.$("#tier1-grid").find("video");
          let tier2_video = window.$("#tier2-grid").find("video");

          let maxHeightPrimary = 720;
          let maxHeightSecondary = 360;

          if (tier1_video.length != 0) {
            maxHeightPrimary = getHeight(tier1_video[0].clientHeight);
          }
          if (tier2_video.length != 0) {
            maxHeightSecondary = getHeight(tier2_video[0].clientHeight);
          }

          Object.keys(primary).forEach((userId) => {
            constraints.constraints[userId] = {
              maxHeight: maxHeightPrimary,
            };
          });
          Object.keys(secondary).forEach((userId) => {
            constraints.constraints[userId] = {
              maxHeight: maxHeightSecondary,
            };
          });
          break;

        default:
          break;
      }

      // window.room.setReceiverConstraints(constraints)
    }
  }, [layout, local.livekitInitialized, primary, secondary, width]);

  // get local video and audio tracks from the browser using navigator.mediaDevices.getUserMedia()

  const audioTracks = useSelector((state) => state.livekit.audioTracks);

  useEffect(() => {
    if (layout == LAYOUT_TYPES.STAGE_LAYOUT) {
      try {
        if (conference.currentActiveVideo?.video) {
          if (
            conference.currentActiveVideo.userId ==
            window.room?.localParticipant.sid
          ) {
            if (conference.currentActiveVideo.video.isMuted) {
              setshowVideo(false);
              let firstName = localStorage.getObject("username");
              let lastName = localStorage.getObject("last_name");
              setuserShortName(shortNameCreator(firstName, lastName));
              setavatar(localStorage.getObject("avatar"));
            } else if (conference.currentActiveVideo.video == "no video") {
              setshowVideo(false);
              let firstName = localStorage.getObject("username");
              let lastName = localStorage.getObject("last_name");
              setuserShortName(shortNameCreator(firstName, lastName));
              setavatar(localStorage.getObject("avatar"));
            } else {
              setshowVideo(true);
              // attach the video track to the active-video
              try {
                let activeVideoElem = document.getElementById(`active-video`);
                // if (activeVideoElem == null) {
                //   dispatch(setCurrentActiveVideo(local.currentVideoTrack));
                // }
                conference.currentActiveVideo?.video?.attach(activeVideoElem);
                conference.currentActiveVideo.video.onloadedmetadata = (e) => {
                  conference.currentActiveVideo.video.play();
                };

                if (activeVideoElem) {
                  activeVideoElem.style.opacity = 1;
                }
              } catch (error) {
                console.log(error);
              }
            }
          } else {
            let user;
            try {
              user = window.room?.getParticipantById(
                conference.currentActiveVideo.video?.getParticipantId()
              )._properties;
            } catch (error) {
              user = window.room?.getParticipantById(
                conference.currentActiveVideo.userId
              )._properties;
            }

            if (conference.currentActiveVideo.video.isMuted) {
              setshowVideo(false);
              let firstName = user?.firstName;
              let lastName = user.lastName;
              setuserShortName(shortNameCreator(firstName, lastName));
              setavatar(user?.avatar);
            } else if (conference.currentActiveVideo.video == "no video") {
              setshowVideo(false);
              let firstName = user?.firstName;
              let lastName = user.lastName;
              setuserShortName(shortNameCreator(firstName, lastName));
              setavatar(user?.avatar);
            } else {
              setshowVideo(true);
              // attach the video track to the active-video
              let activeVideoElem = document.getElementById(`active-video`);
              // if (activeVideoElem == null) {
              //   dispatch(setCurrentActiveVideo(local.currentVideoTrack));
              // }
              conference.currentActiveVideo.video?.attach(activeVideoElem);
              conference.currentActiveVideo.video.onloadedmetadata = (e) => {
                conference.currentActiveVideo.video.play();
              };

              activeVideoElem.style.opacity = 1;
            }
          }
        } else {
          let user;
          try {
            user = window.room?.getParticipantById(
              conference.currentActiveVideo.video?.getParticipantId()
            )._properties;
          } catch (error) {
            user = window.room?.getParticipantById(
              conference.currentActiveVideo.userId
            )._properties;
          }

          if (conference.currentActiveVideo.video.isMuted) {
            setshowVideo(false);
            let firstName = user?.firstName;
            let lastName = user.lastName;
            setuserShortName(shortNameCreator(firstName, lastName));
            setavatar(user?.avatar);
          } else if (conference.currentActiveVideo.video == "no video") {
            setshowVideo(false);
            let firstName = user?.firstName;
            let lastName = user.lastName;
            setuserShortName(shortNameCreator(firstName, lastName));
            setavatar(user?.avatar);
          } else {
            setshowVideo(true);
            // attach the video track to the active-video
            let activeVideoElem = document.getElementById(`active-video`);
            // if (activeVideoElem == null) {
            //   dispatch(setCurrentActiveVideo(local.currentVideoTrack));
            // }
            conference.currentActiveVideo.video?.attach(activeVideoElem);
            conference.currentActiveVideo.video.onloadedmetadata = (e) => {
              conference.currentActiveVideo.video.play();
            };
            if (activeVideoElem) {
              activeVideoElem.style.opacity = 1;
            }
          }
        }
      } catch (err) {
        console.log(err, "stage layout");
      }
    }
  }, [
    layout,
    conference.currentActiveVideo,
    local.videoMuted,
    showVideo,
    conference.videoMuteIds,
    local.currentVideoTrack,
    dispatch,
  ]);

  useEffect(() => {
    if (local.livekitInitialized) {
      // after livekit intialised
      if (local.videoMuted) {
        dispatch(setCurrentVideoTrack(null));
      }

      // if (local.initialAudioMuted) {
      //   window.setTimeout(() => {
      //
      //     dispatch(setCurrentAudioTrack(null));
      //   }, 2000);
      // }

      window.room.addCommandListener("kickUser", (data) => {
        let property = JSON.parse(data.value);

        if (property.userId == window.room.myUserId()) {
          handleClickToast("You have been kicked out bye.... ");
          window.setTimeout(() => {
            window.room.getLocalTracks().forEach((track) => track.dispose());

            window.room.leave();
            window.connection.disconnect();
            navigate(`/spaces/`);
          }, 2000);
        }

        //
      });

      // window.room.addCommandListener("removeUser", (data) => {
      //   let property = JSON.parse(data.value);

      //   if (property.userId == window.room.myUserId()) {
      //     handleClickToast("You have been removed from this space bye.... ");
      //     window.setTimeout(() => {
      //       window.room.getLocalTracks().forEach((track) => track.dispose());

      //       window.room.leave();
      //       window.connection.disconnect();
      //       AxiosLocal.delete("subroom/user/delete/", {
      //         user_id: property.userId,
      //         // todo impliment with gokul
      //         subroom_id: localStorage.getObject("currentSubSpaceId"),
      //       }).then(function (response) {
      //         let data = response.data.data;
      //         navigate(`/spaces/`);
      //       });

      //     }, 2000);
      //   }

      //   //
      // });

      window.room.addCommandListener("RequestUser", (data) => {
        let property = JSON.parse(data.value);

        if (property.userId == window.room.myUserId()) {
          setopenDialoge(true);
          setmessageType(property.type);
          setmessage(
            `Admin has requested to unmute your ${property.type}. do you wish to unmute your ${property.type}`
          );
        }

        //
      });
      window.room.addCommandListener("audio_video_button", (data) => {
        let property = JSON.parse(data.value);

        if (property.userId == window.room.myUserId()) {
          dispatch(setShowBottomMenu(true));
        }

        //
      });

      window.room.addCommandListener("muteTrack", (data) => {
        let property = JSON.parse(data.value);

        if (property.userId == window.room.myUserId()) {
          if (property.type == "video") {
            dispatch(setCurrentVideoTrack(null));
          } else if (property.type == "audio") {
            dispatch(setCurrentAudioTrack(null));
          }
        }

        //
      });
    }
  }, [dispatch, local.livekitInitialized, local.videoMuted, navigate]);
  const UpdateLayout = useCallback(() => {
    let primaryUsers = {};
    let secondaryUsers = {};
    let width = 50;

    let participants = window.room?.getParticipants().map((participant) => {
      return participant._properties.userId;
    });

    let remoteVideoTracksKeys = Object.keys(remoteVideoTracks);

    // compare the participants and remoteVideoTracksKeys and get the difference
    let difference = participants?.filter((x) => {
      if (window.room.getParticipantById(x)?._properties.desktop) {
        return false;
      }
      return !remoteVideoTracksKeys.includes(x);
    });
    let customRemoteTracks = { ...remoteVideoTracks };
    difference?.forEach((user_id) => {
      customRemoteTracks[user_id] = {
        customTrack: true,
        getParticipantId: () => {
          return user_id;
        },
      };
    });
    Object.keys(customRemoteTracks).map((key, index) => {
      //
      let user_type =
        participantPositions[key]?.user_type != undefined
          ? participantPositions[key]?.user_type
          : window.room?.getParticipantById(key)?._properties?.user_type;

      if (user_type == "P") {
        primaryUsers[key] = customRemoteTracks[key];
      } else if (user_type == "S") {
        secondaryUsers[key] = customRemoteTracks[key];
      }
    });
    devices.forEach((device) => {
      // let user_type
      // if (device.user_id == window.room.myUserId()) {
      //    user_type = window.room?.getLocalParticipantProperty("user_type")
      // }
      // else {
      //   user_type  = window.room?.getParticipantById(device.user_id)?._properties?.user_type;

      // }
      if (device.streamType == "Desktop") {
        return;
      }
      let user_type;
      if (participantPositions[device.id] !== undefined) {
        user_type =
          participantPositions[device.id].user_type != undefined
            ? participantPositions[device.id].user_type
            : "P";
      } else {
        user_type =
          participantPositions[device.user_id]?.user_type != undefined
            ? participantPositions[device.user_id]?.user_type
            : "P";
      }

      if (user_type == "P") {
        primaryUsers[device.id] = { ...device, type: "device" };
      } else if (user_type == "S") {
        secondaryUsers[device.id] = { ...device, type: "device" };
      }
    });

    if (Object.keys(remoteVideoTracks).length == 0 && local.currentVideoTrack) {
      setonlyLocal(true);
      // dispatch(setPopoverOpen({open:false,anchorEl:e.currentTarget,orientation:props.type=="tier2" ? "left" : "right",id:props.userId}))

      dispatch(
        setCurrentActiveVideoAndLayout({
          layout,
          currentActiveVideo: local.currentVideoTrack,
        })
      );
    } else {
      if (onlyLocal) {
        // dispatch(setLayout(LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL));
        // setonlyLocal(false);
      }
    }

    setprimary(primaryUsers);
    setsecondary(secondaryUsers);
  }, [
    remoteVideoTracks,
    devices,
    local.currentVideoTrack,
    reloadView,
    participantPositions,
    dispatch,
    layout,
    onlyLocal,
    remote.participantViewTypeChanged,
  ]);

  useEffect(() => {
    try {
      UpdateLayout();
    } catch (err) {
      // console.log(err);
    }
  }, [
    UpdateLayout,
    remoteVideoTracks,
    devices,
    participantPositions,
    reloadView,
    remote.participantViewTypeChanged,
  ]);
  const [openToast, setOpenToast] = useState(false);
  const [toastData, settoastData] = useState("");

  const handleClickToast = (content = null) => {
    if (content) {
      settoastData(content);
    } else {
      settoastData("You have Joined the Meeting");
    }
    setOpenToast(true);
  };

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };
  useEffect(() => {
    if (local.livekitInitialized) {
      // getUserSpaceConfig().then((config) => {
      //   Object.keys(config).forEach((key) => {
      //     if (key == "layout") {
      //       dispatch(setLayout(config[key]));
      //     } else if (key == "audio") {
      //       // dispatch(setAudioMuted(config[key]));
      //     } else if (key == "video") {
      //       // dispatch(setVideoMuted(config[key]));
      //     }
      //     if(key == "participantPositions"){
      //       dispatch(setparticipantPositions(config[key]));
      //     }
      //   })
      // });
      // getRoomConfig(localStorage.getObject("currentSubSpaceSlug")).then((config) => {
      //   Object.keys(config).forEach((key) => {
      //     if (key == "devices") {
      //       dispatch(replaceDevices(config[key]));
      //     }
      //     // directorMode
      //     if(key == "directorMode"){
      //       let user = window.room.getParticipants().find((user) => user._properties?.id == config[key].id)
      //       if(user.length() > 0){
      //         let data = {
      //           ...config[key],
      //         }
      //         data.user_id = user[0]._properties?.userId
      //         dispatch(setdirectorMode(data));
      //       }
      //     }
      //   })
      // });
    }
  }, [dispatch, local.livekitInitialized]);

  useEffect(() => {
    if (EventReady) {
      dispatch(setSpace({ ...savedSubroom }));
      // get users of space
      let path = location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1
      );
      if (Object.keys(local.currentSubspace).length !== 0) {
        path = local.currentSubspace.slug;
      }
      AxiosLocal.get(`subroom/${path}?team_slug=${team_slug}`)
        .then((response) => {
          let data = response.data.data;
          if (response.data.data.override_theme) {
            if (localStorage.getObject("theme") === "dark") {
              dispatch(setEventDark({ ...data.dark_theme }));
            } else {
              dispatch(setEventLight({ ...data.light_theme }));
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });

      AxiosLocal.get(
        `subroom/users/${savedSubroom.slug}?team_slug=${team_slug}`,
        {
          sub_space_slug: savedSubroom.slug,
        }
      ).then(function (response) {
        let data = response.data.data;

        let users = data
          .map((group) => {
            return group.items;
          })
          .flat();

        users = users.filter((thing, index) => {
          const _thing = JSON.stringify(thing);
          return (
            index ===
            users.findIndex((obj) => {
              return JSON.stringify(obj) === _thing;
            })
          );
        });

        dispatch(setUsers(users));
      });

      // if(window.location.search.includes('user_2')){
      //   connectToRoom(dispatch,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Nzk0NjM2MzUsImlzcyI6ImRldmtleSIsIm5hbWUiOiJ1c2VyMiIsIm5iZiI6MTY3OTM3NzIzNSwic3ViIjoidXNlcjIiLCJ2aWRlbyI6eyJyb29tIjoibXktZmlyc3Qtcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.xrSa2Jeoh3GtOGar3SoDXCfSY9BLhiPmyotjAnLa58k");

      // }
      // else{
      //   connectToRoom(dispatch," eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Nzk0NjM1NzMsImlzcyI6ImRldmtleSIsIm5hbWUiOiJ1c2VyMSIsIm5iZiI6MTY3OTM3NzE3Mywic3ViIjoidXNlcjEiLCJ2aWRlbyI6eyJyb29tIjoibXktZmlyc3Qtcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.TzdLRJ85QX2KHdH3Ji5UU2oHUarObjgzeZ1saFQLIUI");

      // }

      // initiate_connection(
      //   dispatch,
      //   setVideoTracks,
      //   setAudioTracks,
      //   setRemoteVideoStreams,
      //   setRemoteAudioStreams,
      //   local,
      //   savedSubroom.slug,
      //   localStorage.getObject("currentSpaceJwt")
      // );
    }
  }, [EventReady, dispatch]);

  useEffect(() => {
    // if(local.fromLoby){
    const currentURL = window.location.href;
    const containsText = currentURL.includes("auth");
    let team_slug = getTeamSlugFromUrl("space");
    if (containsText) {
      team_slug = getTeamSlugFromUrl("lobby");
    }
    AxiosLocal.post("event/user/validation", {
      type: "normal",
      sub_space_slug: location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1
      ),
      team_slug: team_slug,
    }).then(function (response) {
      // let data = response.data.data
      // dispatch(setSpaces(data))
      //  let currentRoom = data.filter(space => {
      // return  `/${space.slug}` == location.pathname
      //  })[0]

      setsavedSubroom(response.data.currentSubRoom);
      let currentSubRoom = "";

      if (response.data.valid || !response.data.is_private) {
        currentSubRoom = response.data.currentSubRoom;

        if (response.data.is_private) {
          if (response.data.is_invited) {
            // normal load
          } else {
            // redirect to space page
            navigate("/space/");
          }
        } else {
          if (response.data.is_invited) {
          } else {
            if (localStorage.getObject("auth")) {
              // if password is set then show popup to enter password
              if (response.data.add_password) {
                setshowUsernamePopup(true);
                setshowPassword(true);
              } else {
                // normal load
              }
            } else {
              // if password is set then show popup to enter password
              if (response.data.add_password) {
                // ask for username and password
                setshowUsernamePopup(true);
                setshowPassword(true);
                setshowUsername(true);
              } else {
                // ask for username
                setshowUsernamePopup(true);
                setshowUsername(true);
              }
            }
          }
        }
        dispatch(
          setCurrentSpace({
            currentSpaceName: currentSubRoom.room_name,
            currentSubSpaceName: currentSubRoom.name,
            currentSubSpaceSlug: currentSubRoom.room_slug,
          })
        );
        // localStorage.setObject('currentSpaceName',currentSubRoom.room_name)
        localStorage.setObject("currentSubSpaceId", currentSubRoom.id);
        localStorage.setObject("currentSpaceSlug", currentSubRoom.room_slug);
        // localStorage.setObject('currentSubSpaceName',currentSubRoom.name)
        // localStorage.setObject('currentSubSpaceSlug',currentSubRoom.room_slug)
        setbackgroundImage(currentSubRoom.room.background_image);
        // console.log("token2", localStorage.getObject("accessToken"));
        AxiosLocal.get(
          `token2/?room_slug=${location.pathname.substring(
            location.pathname.lastIndexOf("/") + 1
          )}&team_slug=${team_slug}`
        )
          .then((response) => {
            setTimeout(() => {
              AxiosLocal.post("duplicate/tab/check", {
                slug: location.pathname.substring(
                  location.pathname.lastIndexOf("/") + 1
                ),
                team_slug: team_slug,
              })
                .then((res) => {
                  console.log(
                    res.data.space_duplicate_tab,
                    "space_duplicate_tab"
                  );
                  console.log("duplicate tab test 2");
                  if (res.data.space_duplicate_tab) {
                    console.log("space_duplicate_tab");
                    setDuplicateCheckOpen(true);
                  } else {
                    setDuplicateCheckOpen(false);
                    let data = response.data;
                    let token = data.token;
                    connectToRoom(dispatch, token).then(() => {
                      setUserInteractPopOpen(true);

                      setEventReady(true);
                    });
                  }
                })
                .catch((err) => {
                  console.log(
                    err,
                    "token2",
                    localStorage.getObject("accessToken")
                  );
                });
            }, 2000);
          })
          .catch((err) => {
            // console.log(err, "token2", localStorage.getObject("accessToken"));
            if (
              err.message == "no token" &&
              localStorage.getObject("accessToken")
            ) {
              window.location.reload();
            }
          });
      } else {
        navigate("/spaces");
      }
    });

    handleClickToast();

    // }
    // else{
    //   setreadyToJoin(true)
    // }

    //  return ()=>{
    //   try {
    //     window.room?.leave().then(()=>{
    //
    //     }).catch((err)=>{
    //
    //     })
    //     window.connection?.disconnect()
    //   } catch (error) {
    //
    //   }

    //  }
  }, [dispatch, local.fromLoby, location.pathname, navigate]);

  const handleClose = (event) => {
    setOpen(false);
  };

  const kickoutDuplicateUser = () => {
    AxiosLocal.get(
      `token2/?room_slug=${location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1
      )}&team_slug=${team_slug}`
    )
      .then((response) => {
        setDuplicateCheckOpen(false);
        let data = response.data;
        let token = data.token;
        connectToRoom(dispatch, token).then(() => {
          setUserInteractPopOpen(true);

          setEventReady(true);
        });
        window.eventChanel.publish({
          event: "RemoveDuplicateUser",
          userId: localStorage.getObject("id"),
          roomUserId: window.room?.localParticipant.sid,
        });
      })
      .catch((err) => {
        // console.log(err, "token2", localStorage.getObject("accessToken"));
        if (
          err.message == "no token" &&
          localStorage.getObject("accessToken")
        ) {
          window.location.reload();
        }
      });
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // handle mouse down
  const handleMouseDown = () => {
    //
    document.body.style.cursor = "grab";
    // add invisible div to catch mouse up event
    setMouseDown(true);
  };

  // handle mouse up
  const handleMouseUp = () => {
    document.body.style.cursor = "default";
    let seperator = document.getElementById(
      layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL
        ? "seperator"
        : "seperator-vertical"
    );
    seperator.style.backgroundColor = eventTheme.bg_color_4;
    setMouseDown(false);
  };

  //handle mouse move of seperator
  const handleMouseMove = (e) => {
    // console.log(mouseDown, "movedmoved");
    if (mouseDown) {
      e.stopPropagation();

      document.body.style.cursor = "grab";
      let seperator = document.getElementById(
        layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL
          ? "seperator"
          : "seperator-vertical"
      );
      seperator.style.backgroundColor = "#88A1AB";
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      let left = 50;
      console.log(left, "movedmoved");

      //if(conference.layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_VERTICAL) {
      if (conference.layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL) {
        // change the left of the seperator to vw units
        left = (mouseX / window.innerWidth) * 100;
      }
      //else if(conference.layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL) {
      else if (conference.layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_VERTICAL) {
        left = (mouseY / window.innerHeight) * 100;
      }

      if (layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL) {
        if (left < 80 && left > 20) {
          setLeft(left);
          setWidth(left);

          if (iAmDirector) {
            window.eventChanel.publish({
              event: "director_mode_width",
              value: left,
              layout: "dynamic_layout_horizontal",
              user_id: window.room?.myUserId(),
            });
          }
        }
      } else {
        if (left < 80 && left > 20) {
          setLeft(left);
          setWidth(left);

          if (iAmDirector) {
            window.eventChanel.publish({
              event: "director_mode_width",
              value: left,
              layout: "dynamic_layout_vertical",
              user_id: window.room?.myUserId(),
            });
          }
        }
      }
    }
  };

  // onClick handler for tiles
  const handleClick = (x, y) => {
    console.log(`Tile at (${x}, ${y}) clicked!`);
  };
  const aspectRatio = 1.77777778;

  let getLayout = () => {
    let layoutCode = <></>;

    switch (layout) {
      //case LAYOUT_TYPES.DYNAMIC_LAYOUT_VERTICAL:
      case LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL:
        layoutCode = (
          <>
            <div
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
              style={{
                width: "100vw",
                height: "100vh",
                maxHeight: "100vh",
                backgroundColor: eventTheme.bg_color_1,
                backgroundImage:
                  backgroundImage !== "" &&
                    backgroundImage !==
                    "https://pub-d6edaebcd6474ac499bdcb399e4e121c.r2.dev/bbcd00d0-7c3c-47ea-a0c2-182f358dcd0f.jpeg"
                    ? `url(${backgroundImage})`
                    : "none",
                backgroundRepeat: " no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                position: "absolute",
                top: "0px",
                left: "0px",
                /*width: '100vw',
                  height: 'calc(100vh - 60px)',
                  maxHeight: 'calc(100vh - 60px)',
                  backgroundColor: '#032E57',
                  position: "absolute",
                  top: "60px",
                  left: "0px"*/
              }}
            >
              <div>
                {/* {Object.keys(primary).length > 0 || "P" == window.room?.getLocalParticipantProperty('user_type')? */}
                <div
                  style={{
                    position: "absolute",
                    left: "5px",
                    bottom: "0px",
                    // top: "5.5vh",
                    width: "auto",
                    height: "95vh",
                    //height: 'auto',
                    //overflowY:'scroll',
                    //overflowX:'hidden',
                    backgroundColor:
                      backgroundImage == "" ? "#032E57" : "transparent",
                    display: "flex",
                    alignItems: "center",
                  }}
                  id="tier1-grid"
                  className="no-scrollbar"
                >
                  <Grid
                    draggable={iAmDirector}
                    margin="0 10px 0 0"
                    type="tier1"
                    user_type="P"
                    tileSize={20}
                    width={width - 2}
                    remoteVideoTracks={primary}
                    remoteAudioTracks={null}
                    //overlay_button={ true }
                    overlay_button={false}
                    backgroundImage={backgroundImage}
                  />
                </div>
                {/* : ""} */}

                {/* {Object.keys(secondary).length > 0 || "S" == window.room?.getLocalParticipantProperty('user_type') ?  */}
                <div
                  style={{
                    position: "absolute",
                    right: "5px",
                    bottom: "0px",

                    // top: "5.5vh",
                    width: "auto",
                    // height: "auto",
                    height: "95vh",
                    //overflowY:'scroll',
                    //overflowX:'hidden',
                    backgroundColor:
                      backgroundImage == "" ? "#032E57" : "transparent",

                    display: "flex",
                    alignItems: "center",
                  }}
                  className="no-scrollbar"
                  id="tier2-grid"
                >
                  <Grid
                    draggable={iAmDirector}
                    margin="0 0 0 10px"
                    type="tier2"
                    user_type="S"
                    tileSize={20}
                    width={100 - width}
                    remoteVideoTracks={null}
                    remoteAudioTracks={remoteAudioTracks}
                    backgroundImage={backgroundImage}
                  />
                </div>
                {/* : ""} */}

                {/* seperator */}
                <div>
                  <div
                    onMouseDown={() => {
                      // if (permissions.drag_horizontal_layout) {
                      //   if (
                      //     conference.directorMode.mode &&
                      //     conference.directorMode.user_id !=
                      //       window.room?.myUserId()
                      //   ) {
                      //     return;
                      //   }
                      //   handleMouseDown();
                      // }
                      if (permissions.drag_horizontal_layout) {
                        if (iAmDirector) {
                          console.log("iAmDirectoriAmDirector");
                          handleMouseDown();
                        } else {
                          handleClickToast("You are not a director ");
                        }
                      } else {
                        handleClickToast(
                          "You don't have permission to drag this layout"
                        );
                      }
                    }}
                    onMouseEnter={(e) => {
                      if (!iAmDirector) {
                        return;
                      }
                      document.body.style.cursor = "grab";
                      let seperator = document.getElementById("seperator");
                      seperator.style.backgroundColor = "#88A1AB";
                      e.target.style.backgroundColor = "#88a1abc9";
                    }}
                    onMouseLeave={(e) => {
                      if (!iAmDirector) {
                        return;
                      }
                      document.body.style.cursor = "default";

                      let seperator = document.getElementById("seperator");
                      seperator.style.backgroundColor = eventTheme.bg_color_4;
                      e.target.style.backgroundColor = eventTheme.bg_color_4;
                      e.target.style.opacity = "0.1";
                    }}
                    style={{
                      height: "100%",
                      width: "18px",
                      backgroundColor: eventTheme.bg_color_4,
                      position: "absolute",
                      left: matches ? `${left - 1.46}vw` : `${left - 1.65}vw`,
                      top: "0",
                      opacity: "0.1",
                      height: "100vh",
                      zIndex: "3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  ></div>
                  <div
                    id="seperator"
                    className="no-scrollbar"
                    // switch on for mose movement
                    // onMouseDown={ handleMouseDown }
                    style={{
                      position: "absolute",
                      left: `${left - 1}vw`,
                      top: "0",
                      width: "2px",
                      height: "100vh",
                      backgroundColor: eventTheme.bg_color_4,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      userSelect: "none",
                      zIndex: "2",
                    }}
                  >
                    <div
                      style={{
                        background: "inherit",
                        height: "25px",
                        width: "2px",
                        marginRight: "5px",
                        color: "transparent",
                      }}
                    >
                      .
                    </div>
                    <div
                      style={{
                        background: "inherit",
                        height: "25px",
                        width: "2px",
                        marginLeft: "5px",
                        color: "transparent",
                      }}
                    >
                      .
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
        break;
      //case LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL:
      case LAYOUT_TYPES.DYNAMIC_LAYOUT_VERTICAL:
        layoutCode = (
          <>
            <div
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
              style={{
                width: "100vw",
                height: "100vh",
                maxHeight: "100vh",
                backgroundColor: eventTheme?.bg_color_1,
                position: "absolute",
                top: "0px",
                left: "0px",
                /*width: '100vw',
                  height: 'calc(100vh - 60px)',
                  maxHeight: 'calc(100vh - 60px)',
                  backgroundColor: '#032E57',
                  position: "absolute",
                  top: "60px",
                  left: "0px"*/
                backgroundImage:
                  backgroundImage !== "" &&
                    backgroundImage !==
                    "https://pub-d6edaebcd6474ac499bdcb399e4e121c.r2.dev/bbcd00d0-7c3c-47ea-a0c2-182f358dcd0f.jpeg"
                    ? `url(${backgroundImage})`
                    : "none",
                backgroundRepeat: " no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div>
                {/* {Object.keys(primary).length > 0 || "P" == window.room?.getLocalParticipantProperty('user_type')? */}
                <div
                  style={{
                    position: "absolute",
                    left: "5px",
                    top: "8vh",

                    width: "100vw",
                    height: `${left - 6}vh`,
                    //height: 'auto',
                    //overflowY:'scroll',
                    //overflowX:'hidden',
                    backgroundColor:
                      backgroundImage == "" ? "#032E57" : "transparent",

                    display: "flex",
                    alignItems: "center",
                    // border: "1px solid red",
                  }}
                  id="tier1-grid"
                  className="no-scrollbar"
                >
                  <Grid
                    draggable={iAmDirector}
                    margin="0 10px 0 0"
                    type="tier1"
                    user_type="P"
                    tileSize={20}
                    width={width - 6}
                    remoteVideoTracks={null}
                    remoteAudioTracks={remoteAudioTracks}
                    //overlay_button={ true }
                    overlay_button={false}
                    backgroundImage={backgroundImage}
                  />
                </div>
                {/* : ""} */}

                {/* {Object.keys(secondary).length > 0 || "S" == window.room?.getLocalParticipantProperty('user_type') ?  */}
                <div
                  style={{
                    position: "absolute",
                    right: "5px",
                    bottom: `2vh`,
                    width: "100vw",
                    height: `${91 - left}vh`,

                    //overflowY:'scroll',
                    //overflowX:'hidden',
                    backgroundColor:
                      backgroundImage == "" ? "#032E57" : "transparent",

                    display: "flex",
                    alignItems: "center",
                    // border: "1px solid red",
                  }}
                  className="no-scrollbar"
                  id="tier2-grid"
                >
                  <Grid
                    draggable={iAmDirector}
                    margin="0 0 0 10px"
                    type="tier2"
                    user_type="S"
                    tileSize={20}
                    width={91 - width}
                    remoteVideoTracks={null}
                    remoteAudioTracks={remoteAudioTracks}
                    backgroundImage={backgroundImage}
                  />
                </div>
                {/* : ""} */}

                {/* seperator */}
                <div>
                  <div
                    onMouseDown={() => {
                      // if (permissions.drag_horizontal_layout) {
                      //   if (
                      //     conference.directorMode.mode &&
                      //     conference.directorMode.user_id !=
                      //       window.room?.myUserId()
                      //   ) {
                      //     return;
                      //   }
                      //   handleMouseDown();
                      // }
                      if (permissions.drag_vertial_layout) {
                        if (iAmDirector) {
                          handleMouseDown();
                        } else {
                          handleClickToast("You are not a director ");
                        }
                      }
                    }}
                    onMouseEnter={(e) => {
                      // if (conference.directorMode.mode && iAmDirector) {
                      //   return;
                      // }
                      if (!iAmDirector) {
                        return;
                      }
                      document.body.style.cursor = "grab";
                      let seperator =
                        document.getElementById("seperator-vertical");
                      seperator.style.backgroundColor = "#88A1AB";
                      e.target.style.backgroundColor = "#88a1abc9";
                    }}
                    onMouseLeave={(e) => {
                      // if (conference.directorMode.mode && iAmDirector) {
                      //   return;
                      // }
                      if (!iAmDirector) {
                        return;
                      }
                      document.body.style.cursor = "default";

                      let seperator =
                        document.getElementById("seperator-vertical");
                      seperator.style.backgroundColor = eventTheme.bg_color_4;
                      e.target.style.backgroundColor = eventTheme.bg_color_4;
                      e.target.style.opacity = "0.1";
                    }}
                    style={{
                      width: "100vw",
                      backgroundColor: eventTheme.bg_color_4,
                      position: "absolute",
                      top: matches
                        ? `${left - 1.46 + 6}vh`
                        : `${left - 1.65 + 6}vh`,
                      left: "0",
                      opacity: "0.1",
                      height: "18px",
                      zIndex: "3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  ></div>
                  <div
                    id="seperator-vertical"
                    className="no-scrollbar"
                    // switch on for mose movement
                    // onMouseDown={ handleMouseDown }
                    style={{
                      position: "absolute",
                      top: `${left + 5.3}vh`,
                      left: "0",
                      width: "100vw",
                      height: "2px",
                      backgroundColor: eventTheme.bg_color_4,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      userSelect: "none",
                      zIndex: "2",
                    }}
                  >
                    <div
                      style={{
                        background: "inherit",
                        height: "2px",
                        width: "25px",
                        marginTop: "10px",
                        color: "transparent",
                        left: "25px",
                        position: "relative",
                      }}
                    >
                      .
                    </div>
                    <div
                      style={{
                        background: "inherit",
                        height: "2px",
                        width: "25px",
                        marginBottom: "10px",
                        color: "transparent",
                      }}
                    >
                      .
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
        break;
      case LAYOUT_TYPES.SHARE_LAYOUT:
        let data = devices.filter((device) => device.url == "shareUrl");
        layoutCode = (
          <>
            <SideThumbMenu
              remoteVideoTracks={{ ...primary, ...secondary }}
              remoteAudioTracks={remoteAudioTracks}
            />
            <YoutubeShare max={true} data={data[0]} ShareUrl={shareUrl} />
          </>
        );
        break;
      case LAYOUT_TYPES.STAGE_LAYOUT:
        let currentActiveUserDevices = devices.filter(
          (device) => device.id == conference.currentActiveUserId
        );
        const onDrop = (e, type, user_type) => {
          e.preventDefault();
          e.stopPropagation();

          e.target.style.border = "none";
          let trackId = e.dataTransfer.getData("trackId");
          let viewerType = e.dataTransfer.getData("viewerType");
          dispatch(
            updateTrackPosition({
              trackId: trackId,
              trackType: viewerType,
              current_trackType: user_type,
            })
          );

          if (
            conference.directorMode.mode &&
            conference.directorMode.user_id == window.room?.myUserId()
          ) {
            window.eventChanel.publish({
              event: "directorModeUpdate",
              user_id: window.room?.myUserId(),
            });

            let track = livekitTracks.find((item) => item.sid == trackId);

            dispatch(setRender(`Viewer_${trackId}_${user_type}`));

            if (track.customProperty.type == "user") {
              let user_id = track.customProperty.user_db_id;
              let viewer_type = user_type;
              let guestUser = track.customProperty.is_guest_user;
              AxiosLocal.post(`user/organisation/relation/edit`, {
                user_id,
                viewer_type,
                guestUser,
                team_slug,
              });
            }
          }
        };
        layoutCode = (
          <>
            {window.mobileCheck() && !conference.isMobileStaged ? (
              <MeetingMobile theme={eventTheme} mobileTileView={true} />
            ) : (
              <div
                style={{
                  width: "100vw",
                  height: "100vh",
                  maxHeight: "100vh",
                  //height: 'calc(100vh - 60px)',
                  //maxHeight: 'calc(100vh - 60px)',
                  //overflow: "hidden",
                  backgroundColor: eventTheme?.bg_color_1,
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  display: "flex",
                  justifyContent: "center",
                }}
                onDrop={(e) => onDrop(e, "grid", "S")}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => {
                  if (window.mobileCheck()) {
                    dispatch(sethideHeader(!conference.hideHeader));
                  }
                }}
              >
                {centerStage.enabled ? (
                  <div
                    style={{
                      width: "100vw",
                      height: "100vh",
                      maxHeight: "100vh",
                      //height: 'calc(100vh - 60px)',
                      //maxHeight: 'calc(100vh - 60px)',
                      //overflow: "hidden",
                      backgroundColor: eventTheme?.bg_color_1,
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      onMouseEnter={() => {
                        setHover(true);
                      }}
                      onMouseLeave={() => {
                        setHover(false);
                      }}
                      style={{ display: "flex" }}
                    >
                      <MpegtsPlayer
                        data={currentActiveUserDevices[0]}
                        control={true}
                        volume={0}
                        ShareUrl={centerStage.url}
                        is_hover={is_hover}
                        id={centerStage.id}
                        type="centerStage"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      width: window.mobileCheck() ? "100vh" : "100vw",
                      height: "100vh",
                      maxHeight: "100vh",
                      //height: 'calc(100vh - 60px)',
                      //maxHeight: 'calc(100vh - 60px)',
                      //overflow: "hidden",
                      backgroundColor: eventTheme?.bg_color_1,
                      backgroundImage:
                        backgroundImage !== "" &&
                        backgroundImage !==
                          "https://pub-d6edaebcd6474ac499bdcb399e4e121c.r2.dev/bbcd00d0-7c3c-47ea-a0c2-182f358dcd0f.jpeg"
                          ? `url(${backgroundImage})`
                          : "none",
                      backgroundRepeat: " no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      position: "absolute",
                      top: window.mobileCheck() ? "" : "30px",
                      left: window.mobileCheck() ? "" : "0px",
                      display: "flex",
                      justifyContent: "center",
                      rotate: window.mobileCheck() ? "90deg" : "",
                    }}
                  >
                    {showVideo ? (
                      <>
                        <video
                          disablePictureInPicture
                          style={{
                            // position: "absolute",
                            // margin: "auto",
                            // top: "60px",
                            // //margin:'0px',
                            // width: "80vw",
                            // height: "auto",
                            // //height:'90%',
                            aspectRatio: 16 / 9,
                          }}
                          width="100%"
                          height="100%"
                          autoPlay
                          id={`active-video`}
                        />
                      </>
                    ) : (
                      <div
                        style={{
                          border: "none",
                          margin: "auto",
                          // width: props.width,
                          //height: props.height,
                          maxWidth: props.width,
                          //maxHeight: props.height,
                          minWidth: props.width,
                          aspectRatio: 16 / 9,
                          backgroundColor: eventTheme?.bg_color_2,
                          borderRadius: "4px",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          // position: "relative",
                        }}
                        // className="no-select"
                      >
                        <div
                          style={{
                            width: "22%",
                            height: "40%",
                            borderRadius: "50%",
                            backgroundColor: eventTheme?.bg_color_3,
                            // position: "absolute",
                            // top: "44%",
                            // right: "50%",
                            // transform: "translate(50%,-50%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px solid #008BCD",
                          }}
                        >
                          {/* <div
                          className="no-select"
                          style={{
                            textAlign: "center",
                            color: "#88A1AB",
                            fontSize: !!props.i_hide ? "100%" : "150%",
                          }}
                        > */}
                          <AvatarElem
                            userShortName={userShortName}
                            avatar={avatar ? avatar : "null"}
                            view="horizontal"
                          />
                          {/* {userShortName} */}
                          {/* </div> */}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {window.mobileCheck() && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      bottom:
                        window.mobileCheck() &&
                        conference.layout == "stage_layout" &&
                        conference.hideHeader
                          ? "2%"
                          : "10%",
                      transform: "translateY(-50%)",
                      transition: "bottom 0.5s ease-in-out",
                      left: "15px",
                      //left:show?"16vw":"1vw",
                      width: "30px",
                      height: "30px",
                      //padding:"5px",
                      //backgroundColor: 'rgba(40, 39, 74, 1)',
                      backgroundColor: eventTheme?.bg_color_1,
                      borderRadius: "20%",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      dispatch(setLayout("mobile_layout"));
                      dispatch(setisMobileStaged(false));
                    }}
                  >
                    <img
                      alt=""
                      src={"/assets/bottomIcons/three_dots/fullscreen.svg"}
                      //className='group-img'
                    />
                  </Box>
                )}

                <SideThumbMenu
                  remoteVideoTracks={livekitTracks}
                  remoteAudioTracks={audioTracks}
                  show={false}
                />
              </div>
            )}
          </>
        );
        break;
      case LAYOUT_TYPES.DYNAMIC_GRID_LAYOUT:
        // layoutCode = <DynamicGrid>{tiles}</DynamicGrid>;

        layoutCode = (
          <div
            style={{
              top: "60px",
              height: "90vh",
              position: "absolute",
              right: "1vw",
              // border: "1px solid red",
            }}
          >
            {" "}
            <Grid
              draggable={false}
              backgroundImage={backgroundImage}
              margin="0 0 0 10px"
              type="tier"
              user_type={"S"}
              isDynamic={true}
              tileSize={20}
              width={100 - 3}
              remoteVideoTracks={null}
              // remoteVideoTracks={primary}
              remoteAudioTracks={remoteAudioTracks}
            />
          </div>
        );
        break;
      case LAYOUT_TYPES.MOBILE_LAYOUT:
        layoutCode = (
          <div>
            <MeetingMobile theme={eventTheme} mobileTileView={true} />
          </div>
        );
        break;
      default:
        layoutCode = (
          <>
            <SideThumbMenu
              remoteVideoTracks={{ ...primary, ...secondary }}
              remoteAudioTracks={remoteAudioTracks}
            />
            <YoutubeShare ShareUrl={shareUrl} />
          </>
        );
    }

    return layoutCode;
  };

  return (
    <>
      <Helmet>
        <title>{`${theme?.login?.title} | ${removeHyphenAndCapitalize(
          location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
        )}`}</title>
      </Helmet>{" "}
      {EventReady ? (
        <div>
          <Box
            id="MainEvent"
            sx={{
              position: "absolute",
              boxSizing: "border-box",
              width: "100vw",
              height: "100vh",
              maxHeight: "100vh",
              top: "0px",
              left: "0px",
              paddingTop: "60px",
              backgroundColor: eventTheme?.bg_color_1
                ? eventTheme?.bg_color_1
                : "#032E57",
              backgroundImage:
                backgroundImage !== "" &&
                  backgroundImage !==
                  "https://pub-d6edaebcd6474ac499bdcb399e4e121c.r2.dev/bbcd00d0-7c3c-47ea-a0c2-182f358dcd0f.jpeg"
                  ? `url(${backgroundImage})`
                  : "none",
              backgroundRepeat: " no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              overflow: "hidden",
            }}
          >
            {getLayout()}
            <BottomMenu theme={eventTheme} />

            <Popper
              open={info.popoverOpen}
              // open={true}
              anchorEl={info.anchorEl}
              role={undefined}
              placement={`right-start`}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => {
                let status = info.callStatus;
                let userID = window.room?.myUserId();

                return (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        info.orientation === "right" ? "right top" : "left top",
                    }}
                  >
                    <Paper
                      style={{
                        width: "20vw",
                        backgroundColor: theme?.spaces?.primaryColor,
                        color: "#88A1AB",
                        zIndex: 999,
                      }}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-evenly",
                              backgroundColor: "#012A50",
                              // height:"50px",
                              paddingTop: "11px",
                              paddingBottom: "11px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                // justifyContent:"space-between",
                                backgroundColor: "#012243",
                                // width:"30%",
                                height: "40px",
                                alignItems: "center",
                                borderRadius: "4px",
                              }}
                              style={{
                                paddingLeft: "12px",
                                paddingRight: "12px",
                              }}
                            >
                              <img
                                alt=""
                                style={{
                                  //  width:"auto",
                                  //  height:"15px"
                                  //padding:'7px 12px',
                                  paddingRight: "12px",
                                }}
                                src="/assets/status/profile.svg"
                              />

                              <Typography
                                style={{
                                  //padding: '7px 51px 7px 17px',
                                  fontSize: "14px",
                                  fontFamily: "URW DIN REGULAR",
                                }}
                              >
                                Profile
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                // justifyContent:"space-between",
                                backgroundColor: "#012243",
                                // width:"30%",
                                height: "40px",
                                alignItems: "center",
                                borderRadius: "4px",
                              }}
                              style={{
                                paddingLeft: "12px",
                                paddingRight: "12px",
                              }}
                            >
                              <img
                                alt=""
                                style={{
                                  //padding:'7px 9px',
                                  paddingRight: "12px",
                                }}
                                src="/assets/status/connectivity.svg"
                              />

                              <Typography
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "URW DIN REGULAR",
                                  padding: "7px 36px 7px 15px",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Connectivy test
                              </Typography>
                            </Box>
                          </Box>

                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem
                              onClick={handleClose}
                              style={{
                                padding: "0px 18px",
                                marginTop: "5px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <img
                                  alt=""
                                  src="/assets/status/public link.svg"
                                  style={{ paddingLeft: "8px" }}
                                />

                                <span
                                  style={{
                                    color: "#FFFFFF",
                                    paddingLeft: "12px",
                                    fontSize: "14px",
                                    fontFamily: "URW DIN REGULAR",
                                  }}
                                >
                                  Public link
                                </span>
                              </div>

                              <div
                                style={{
                                  //height:"60px",
                                  border: "2px solid #012A50",
                                  color: "#88A1AB !important",
                                  display: "flex",
                                  borderRadius: "4px",
                                  fontSize: "14px",
                                  fontFamily: "URW DIN REGULAR",
                                  //width:"100%"
                                }}
                              >
                                <div style={{ padding: "7px 43px" }}>
                                  Copy link
                                </div>

                                <img
                                  alt=""
                                  src="/assets/status/copy.svg"
                                  style={{
                                    padding: "7px",
                                    backgroundColor: "#012A50",
                                  }}
                                />
                              </div>
                            </MenuItem>

                            <MenuItem
                              onClick={handleClose}
                              style={{ padding: "7px 18px", marginTop: "5px" }}
                            >
                              <img
                                alt=""
                                src="/assets/status/connection.svg"
                                style={{ paddingLeft: "8px" }}
                              />

                              <span
                                style={{
                                  color: "#FFFFFF",
                                  paddingLeft: "12px",
                                  fontSize: "14px",
                                  fontFamily: "URW DIN REGULAR",
                                }}
                              >
                                Connection :
                                <span
                                  style={{
                                    color:
                                      status.connectionQuality >= 80
                                        ? "green"
                                        : "red",
                                  }}
                                  id="connection_value"
                                >
                                  {status.connectionQuality >= 80
                                    ? "Good"
                                    : "Bad"}
                                </span>
                              </span>
                            </MenuItem>

                            <MenuItem
                              onClick={handleClose}
                              style={{ padding: "7px 18px", marginTop: "5px" }}
                            >
                              <img
                                alt=""
                                src="/assets/status/bitrate.svg"
                                style={{ paddingLeft: "8px" }}
                              />

                              <span
                                style={{
                                  color: "#FFFFFF",
                                  paddingLeft: "12px",
                                  fontSize: "14px",
                                  fontFamily: "URW DIN REGULAR",
                                  display: "flex",
                                }}
                              >
                                Bitrate :
                                <span
                                  style={{
                                    display: "flex",
                                  }}
                                  id="connection_value"
                                >
                                  <img
                                    alt=""
                                    src="/assets/status/down.svg"
                                    style={{ paddingLeft: "8px" }}
                                  />
                                  {status.bitrate?.upload}kbps
                                </span>
                              </span>
                            </MenuItem>

                            <MenuItem
                              onClick={handleClose}
                              style={{
                                padding: "7px 18px",
                                marginTop: "5px",
                              }}
                            >
                              <img
                                alt=""
                                src="/assets/status/packet loss.svg"
                                style={{ paddingLeft: "8px" }}
                              />

                              <span
                                style={{
                                  color: "#FFFFFF",
                                  paddingLeft: "12px",
                                  fontSize: "14px",
                                  fontFamily: "URW DIN REGULAR",
                                  display: "flex",
                                }}
                              >
                                Packet loss :
                                <span
                                  style={{
                                    display: "flex",
                                  }}
                                  id="connection_value"
                                >
                                  <img
                                    alt=""
                                    src="/assets/status/down.svg"
                                    style={{
                                      paddingLeft: "8px",
                                      paddingBottom: "10px",
                                    }}
                                  />
                                  {status.packetLoss?.download}%
                                  <img
                                    alt=""
                                    src="/assets/status/up.svg"
                                    style={{
                                      paddingLeft: "8px",
                                      paddingBottom: "10px",
                                    }}
                                  />
                                  {status.packetLoss?.upload}%
                                </span>
                              </span>
                            </MenuItem>

                            <MenuItem
                              onClick={handleClose}
                              style={{ padding: "7px 18px", marginTop: "5px" }}
                            >
                              <img
                                alt=""
                                src="/assets/status/resolution.svg"
                                style={{ paddingLeft: "8px" }}
                              />

                              <span
                                style={{
                                  color: "#FFFFFF",
                                  paddingLeft: "12px",
                                  fontSize: "14px",
                                  fontFamily: "URW DIN REGULAR",
                                }}
                              >
                                Resolution :
                                <span
                                  style={{
                                    color: "#88A1AB",
                                  }}
                                >
                                  {status.resolution &&
                                    status.resolution.hasOwnProperty(userID)
                                    ? status.resolution[userID][
                                      Object.keys(
                                        status.resolution[userID]
                                      )[0]
                                    ]?.width
                                    : 0}
                                  X
                                  {status.resolution &&
                                    status.resolution.hasOwnProperty(userID)
                                    ? status.resolution[userID][
                                      Object.keys(
                                        status.resolution[userID]
                                      )[0]
                                    ]?.height
                                    : 0}
                                </span>
                              </span>
                            </MenuItem>

                            <MenuItem
                              onClick={handleClose}
                              style={{
                                padding: "7px 18px",
                                marginTop: "5px",
                              }}
                            >
                              <img
                                alt=""
                                src="/assets/status/frameRate.svg"
                                style={{ paddingLeft: "8px" }}
                              />

                              <span
                                style={{
                                  color: "#FFFFFF",
                                  paddingLeft: "12px",
                                  fontSize: "14px",
                                  fontFamily: "URW DIN REGULAR",
                                }}
                              >
                                Frame Rate :
                                <span
                                  style={{
                                    color: "green",
                                  }}
                                  id="connection_value"
                                >
                                  {status.framerate &&
                                    status.framerate.hasOwnProperty(userID)
                                    ? status.framerate[userID][
                                    Object.keys(status.framerate[userID])[0]
                                    ]
                                    : 0}
                                </span>
                              </span>
                            </MenuItem>

                            <MenuItem
                              onClick={handleClose}
                              style={{
                                padding: "7px 18px",
                                marginTop: "5px",
                                marginBottom: "8px",
                              }}
                            >
                              <img
                                alt=""
                                src="/assets/status/report.svg"
                                style={{ paddingLeft: "8px" }}
                              />

                              <span
                                style={{
                                  color: "#FFFFFF",
                                  paddingLeft: "12px",
                                  fontSize: "14px",
                                  fontFamily: "URW DIN REGULAR",
                                }}
                              >
                                Report
                              </span>
                            </MenuItem>
                          </MenuList>
                        </Box>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                );
              }}
            </Popper>
          </Box>
          <Snackbar
            open={openToast}
            autoHideDuration={3000}
            onClose={handleCloseToast}
          >
            <Alert
              onClose={handleCloseToast}
              severity="info"
              sx={{ width: "100%" }}
              style={{
                backgroundColor: theme?.loading?.loadingColor,
                color: theme?.loby?.textColor,
              }}
            >
              {toastData}
            </Alert>
          </Snackbar>

          <PopUp
            messageType={messageType}
            message={message}
            openEndDialoge={openDialoge}
            handleClose={() => {
              setopenDialoge(false);
            }}
            handleYes={() => {
              if (messageType == "audio") {
                window.room?.localParticipant.setMicrophoneEnabled(true);
                localStorage.setObject("audioMuted", "false");
              } else if (messageType == "video") {
                console.log(
                  window.room?.localParticipant.getDefaultVideoTrack(),
                  "video trackvideo track"
                );
                window.room?.localParticipant
                  .getDefaultVideoTrack()
                  .setTrackMuted(false);
                localStorage.setObject("videoMuted", "false");
              } else if (messageType == "duplicateRoom") {
              } else if (messageType == "askToBecomeDirector") {
                window.eventChanel.publish({
                  event: "acceptedToBecomeDirector",
                  user_id: askedtoBecomeDirectorId,
                });
              }
            }}
          />
        </div>
      ) : (
        // <></>
        <EventPlaceHolder
          readyToJoin={readyToJoin}
          setreadyToJoin={setreadyToJoin}
          setfromLoby={setfromLoby}
          theme={eventTheme}
        />
      )}
      <PopUpForm
        open={showUsernamePopup}
        is_username={showUsername}
        is_password={showPassword}
        savedSubroom={savedSubroom}
        handleSuccess={() => {
          setEventReady(true);
        }}
        handleClose={() => {
          setshowUsernamePopup(false);
        }}
      />
      <IneractPopUpForm
        open={UserInteractPopOpen}
        savedSubroom={savedSubroom}
        noClose={true}
        onClick={() => {
          setUserInteractPopOpen(false);
          dispatch(setRender("click_to_listen_clicked"));
        }}
        theme={eventTheme}
      />
      <Toast
        openToast={openerrorToast}
        setOpenToast={setOpenerrorToast}
        message={errMessage}
        type="error"
      />
      {duplicateCheckOpen && (
        <LeaveDrop
          title={"Duplicate user"}
          theme={eventTheme}
          content={
            "The user is currently on the space are you sure you wanna join? this will automaticly kick the current user out."
          }
          //useState to open the modal
          // setOpen={setDuplicateCheckOpen}
          openButtonText={"Join now"}
          //function to be called on open button click
          openButtonfunction={kickoutDuplicateUser}
          cancelButtonfunction={() => {
            window.location.href = "/spaces";
          }}
          img={"/assets/switch_space/info.svg"}
        />
      )}
    </>
  );
}
