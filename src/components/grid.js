import React, { useRef, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  LAYOUT_TYPES,
  switchParticipantPosition,
} from "../state/conference/conferenceSlice";
import Tile from "./tile";
import YoutubeShare from "./youtubeShare";
import { PackedGrid } from "react-packed-grid";
import { CustomGrid } from "./CustomGrid";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import resize from "../utilities/grid";
import { AxiosLocal } from "../utilities/axiosUtils.ts";
import { LiveKitTile } from "./livekitIntegration/livekitTile.tsx";

import { Track, LocalTrack } from "livekit-client";
import {
  setAudioDevices,
  setAudioOutputDevices,
  setVideoDevices,
} from "../state/local/localSlice";
import {
  addTrackPosition,
  updateTrackPosition,
} from "../state/livekit/slice.ts";
import { setRender } from "../state/livekit/slice.ts";
import { LiveKitNoTrackTile } from "./livekitIntegration/livekitNoTrackTile.tsx";
import { getTeamSlugFromUrl } from "../utilities/common";
// create and export a functional Grid component
export default function Grid(props) {
  let team_slug = getTeamSlugFromUrl("space");
  const eventTheme = useSelector(
    (state) => state.theme.eventTheme[state.theme.theme]
  );
  // create a grid of tiles
  const grid = useRef(null);
  //   let  local = useSelector(state => state.local);
  const local = useSelector((state) => state.local);
  const conference = useSelector((state) => state.conference);
  const participantPositions = useSelector(
    (state) => state.conference.participantPositions
  );
  const videoMuteIdsList = useSelector(
    (state) => state.conference.videoMuteIds
  );

  const audioMuteIdsList = useSelector(
    (state) => state.conference.audioMuteIds
  );
  const livekitTracks = useSelector((state) => state.livekit.tracks);
  const audioTracks = useSelector((state) => state.livekit.audioTracks);
  const livekitslice = useSelector((state) => state.livekit);
  const rerendered = useSelector((state) => state.livekit.rerender);
  const [draggingPriority, setdraggingPriority] = useState({});
  const devices = useSelector((state) => state.conference.devices);

  const [gridTiels, setgridTiels] = useState([]);
  const trackPosition = useSelector((state) => state.livekit.trackPosition);
  const dispatch = useDispatch();

  window.mutedList = videoMuteIdsList;

  const getPriority = useCallback(
    (key) => {
      if (draggingPriority && Object.keys(draggingPriority).length > 0) {
      }
      if (participantPositions[key]) {
        return participantPositions[key].position;
      }
      return 0;
    },
    [draggingPriority, participantPositions]
  );

  const dragStart = useCallback(
    (e, userId) => {
      setdraggingPriority(participantPositions);
      // curser to grabbing
      e.target.style.cursor = "grabbing";
      grid.current.dragId = userId;
      // set current drag element
      grid.current.dragElement = e.target;
      // set targets children opacity to 0
      e.target.children[0].style.opacity = 0.3;
      // e.target.style.border = "3px dashed rgb(21 63 99)";

      var elem = document.createElement("div");
      elem.id = "drag-ghost";

      elem.style.position = "absolute";
      // elem.style.top = "1000vh";
      elem.style.top = "-100vh";
      elem.style.width = e.target.offsetWidth / 2 + "px";
      elem.style.height = e.target.offsetHeight / 2 + "px";
      elem.style.backgroundColor = eventTheme?.bg_color_2;

      var canvas = document.createElement("canvas");
      canvas.width = e.target.offsetWidth / 2;
      canvas.height = e.target.offsetHeight / 2;
      // canvas background color

      var canvasContext = canvas.getContext("2d");

      // find video element in the target element using getElementsBytagName
      var video = e.target.getElementsByTagName("video")[0];

      if (video) {
        // draw video element on canvas
        canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
      } else {
        try {
          // clone the target element and append it to the body
          // draw circle at the center of the canvas with radius 50
          canvasContext.beginPath();
          canvasContext.arc(
            canvas.width / 2,
            canvas.height / 2,
            canvas.height / 4,
            0,
            2 * Math.PI
          );
          canvasContext.fillStyle = eventTheme?.bg_color_3;
          canvasContext.fill();

          //  get inner text of the userShortName class and draw it on the canvas
          var text =
            e.target.getElementsByClassName("userShortName")[0].innerText;
          canvasContext.font = `${canvas.height / 8}px Arial`;
          canvasContext.fillStyle = 'white';
          canvasContext.textAlign = "center";
          canvasContext.fillText(text, canvas.width / 2, canvas.height / 2);
        } catch (err) {
          console.log(err);
        }
      }

      elem.appendChild(canvas);
      document.body.appendChild(elem);
      e.dataTransfer.setDragImage(elem, 0, 0);
      // e.dataTransfer.setData("position", e.target.getAttribute("priority"));
      // e.dataTransfer.setData("userid", e.target.getAttribute("data-userid"));
      // e.dataTransfer.setData("type", e.target.getAttribute("type"));

      e.dataTransfer.setData("trackId", e.target.getAttribute("data-trackid"));
      e.dataTransfer.setData(
        "viewerType",
        e.target.getAttribute("data-viewertype")
      );
      // isDevice
      e.dataTransfer.setData(
        "isDevice",
        e.target.getAttribute("data-isdevice")
      );
      //desktop
      e.dataTransfer.setData(
        "isDesktop",
        e.target.getAttribute("data-desktop")
      );
    },
    [participantPositions]
  );

  const dragStop = (e, userId) => {
    // curser to grabbing
    e.target.style.cursor = "default";
    grid.current.dragId = null;
    grid.current.dragElement = null;

    e.target.style.border = "none";
    e.target.children[0].style.opacity = 1;
    var ghost = document.getElementById("drag-ghost");
    if (ghost && ghost.parentNode) {
      ghost.parentNode.removeChild(ghost);
    }
    setdraggingPriority({});
  };

  const dragEnter = useCallback((e, userId) => {
    if (grid.current.dragId === userId) {
      return;
    }
    try {
      // get center of target element
      const targetRect = e.target.getBoundingClientRect();
      const targetCenter = {
        x: targetRect.left + targetRect.width / 2,
        y: targetRect.top + targetRect.height / 2,
      };

      // if clientX is less than target center x, then we are on the left side
      const isLeft = e.clientX < targetCenter.x;
      // if clientY is less than target center y, then we are on the top side
      const isTop = e.clientY < targetCenter.y;

      // if we are on the left side, add border-left, otherwise add border-right
      const horizontal = isLeft ? "left" : "right";
      // if we are on the top side, add border-top, otherwise add border-bottom
      const vertical = isTop ? "top" : "bottom";

      // vertical offset of center of target element e.clientY
      const verticalOffset = Math.abs(e.clientY - targetCenter.y);
      // horizontal offset of center of target element e.clientX
      const horizontalOffset = Math.abs(e.clientX - targetCenter.x);
      if (e.target.classList.contains("no-select")) {
      } else {
        let differece = 0;
        if (verticalOffset > horizontalOffset) {
          e.target.style[`border-${vertical}`] = "3px dashed red";
          if (vertical === "top") {
            differece = -1;
          } else {
            differece = 1;
          }
        } else {
          // otherwise we are on the left or right side
          e.target.style[`border-${horizontal}`] = "3px dashed red";

          if (horizontal === "left") {
            differece = -1;
          } else {
            differece = 1;
          }
        }
        // convert e.target.id to number
        grid.current.dropPriority = parseInt(e.target.id) + differece;
        // let changedPriority = {
        //   ...participantPositions,
        //   userId: {
        //     ...participantPositions[userId],
        //     position: participantPositions[grid.current.dragId].position,
        //   },
        //   [grid.current.dragId]: {
        //     ...participantPositions[grid.current.dragId],
        //     position: participantPositions[userId].position,
        //   },
        // };

        // setdraggingPriority(changedPriority);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const dragLeave = (e, userId) => {
    e.preventDefault();
    if (grid.current.dragId === userId) {
      return;
    }
    e.target.style.border = "none";
  };

  const dragOver = (e, userId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e, type, user_type) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      e.target.style.border = "none";
      let trackId = e.dataTransfer.getData("trackId");
      let viewerType = e.dataTransfer.getData("viewerType");

      dispatch(
        updateTrackPosition({
          trackId: trackId,
          trackType: viewerType,
          current_trackType: props.user_type,
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

        window.room.getParticipants().forEach((participant) => {
          if (participant.sid == trackId) {
            let participantData = JSON.parse(participant.metadata);

            AxiosLocal.post(`user/organisation/relation/edit`, {
              user_id: participantData.user_id,
              viewer_type: props.user_type,
              guestUser: false,
              role: participantData.role,
              team_slug,
            });
          }
        });

        let track = livekitTracks.find((item) => item.sid == trackId);

        dispatch(setRender(`Viewer_${trackId}_${props.user_type}`));

        // localStorage.setObject("videoMuted", "true")

        if (track.customProperty.type == "user") {
          let user_id = track.customProperty.user_db_id;
          let viewer_type = props.user_type;
          let guestUser = track.customProperty.is_guest_user;
          AxiosLocal.post(`user/organisation/relation/edit`, {
            user_id,
            viewer_type,
            guestUser,
            team_slug,
          });
        }
      }
    } catch (e) {
      console.log(e, "onDropError");
    }
  };

  //function for checking screen share
  const isScreenShare = (track) => {
    let isScreenShare = false;
    if (track.source === "screen_share") {
      isScreenShare = true;
    }
    return isScreenShare;
  };

  const getTiles = useCallback(() => {
    const tiles = [];
    const customTrackPositions = {};
    trackPosition.forEach((track_position, index) => {
      customTrackPositions[track_position.trackId] = track_position;
    });

    //  conference.noVideo.includes(participant.sid)
    window.room?.getParticipants().forEach((participant, index) => {
      let trackSource = "no source";
      //  if (participant.videoTracks.size > 0) {
      //    try {
      //      trackSource = participant.videoTracks.values().next().value
      //        .track.source;
      //    } catch (e) {
      //      console.log(e, "trackSourceError");
      //    }
      //  }
      if (
        //  participant.videoTracks.size == 0 ||
        //  trackSource == "no source" ||
        //  trackSource == "screen_share"
        conference.noVideo.includes(participant.sid)
      ) {
        let participantMeta = {};
        try {
          participantMeta = JSON.parse(participant.metadata);
        } catch (error) {
          console.log(error, "gridAudioParticipantError");
        }

        let audioTrack = "mute";
        if (participant.audioTracks.size > 0) {
          audioTrack = audioTracks.find((track) => {
            return track.getParticipantId() == participant.sid;
          });
        }

        let key = index;

        let userType = customTrackPositions[participant.sid]?.trackType;

        let trackId = participant.sid;

        if (!userType) {
          userType = participantMeta.user_type;
          dispatch(
            addTrackPosition({
              default: false,
              trackId: participant.sid,
              trackType: participantMeta.user_type,
              participantId: participant.sid,
            })
          );
        }

        if (props.type == "tier1" && userType == "P") {
          tiles.push(
            <div
              type="tier1"
              style={{
                transition: "100ms linear",
              }}
              onDragStart={(e) => dragStart(e, key)}
              onDragEnter={(e) => dragEnter(e, key)}
              onDragEnd={(e) => dragStop(e, key)}
              onDragLeave={(e) => dragLeave(e, key)}
              // onDrop={(e) => onDrop(e, local.userId, 1, track.sid, userType)}
              onDragOver={(e) => dragOver(e, key)}
              id={`draggable_div_tier1_${trackId}`}
              draggable={true}
              data-userid={key}
              data-trackid={participant.sid}
              data-viewertype={userType}
              key={trackId}
            >
              <LiveKitNoTrackTile
                type="tier1"
                participant={window.room?.localParticipant}
                user={participantMeta}
                audio={audioTrack}
                trackUniqueId={trackId}
                userId={participant.sid}
              />
            </div>
          );
        } else if (props.type == "tier2" && userType == "S") {
          tiles.push(
            <div
              type="tier2"
              style={{
                transition: "100ms linear",
              }}
              onDragStart={(e) => dragStart(e, key)}
              onDragEnter={(e) => dragEnter(e, key)}
              onDragEnd={(e) => dragStop(e, key)}
              onDragLeave={(e) => dragLeave(e, key)}
              // onDrop={(e) => onDrop(e, local.userId, 1, track.sid, userType)}
              onDragOver={(e) => dragOver(e, key)}
              id={`draggable_div_tier2_${trackId}`}
              draggable={true}
              data-userid={key}
              data-trackid={participant.sid}
              data-viewertype={userType}
              key={trackId}
            >
              <LiveKitNoTrackTile
                type="tier2"
                participant={window.room?.localParticipant}
                user={participantMeta}
                audio={audioTrack}
                trackUniqueId={trackId}
                userId={participant.sid}
              />
            </div>
          );
        } else if (
          props.type == "tier" &&
          (userType == "S" || userType == "P")
        ) {
          tiles.push(
            <div
              type="tier"
              style={{
                transition: "100ms linear",
              }}
              onDragStart={(e) => dragStart(e, key)}
              onDragEnter={(e) => dragEnter(e, key)}
              onDragEnd={(e) => dragStop(e, key)}
              onDragLeave={(e) => dragLeave(e, key)}
              // onDrop={(e) => onDrop(e, local.userId, 1, track.sid, userType)}
              onDragOver={(e) => dragOver(e, key)}
              id={`draggable_div_tier_${trackId}`}
              draggable={true}
              data-userid={key}
              data-trackid={participant.sid}
              data-viewertype={userType}
              key={trackId}
            >
              <LiveKitNoTrackTile
                type="tier"
                participant={window.room?.localParticipant}
                user={participantMeta}
                audio={audioTrack}
                trackUniqueId={trackId}
                userId={participant.sid}
              />
            </div>
          );
        }
      }
    });

    livekitTracks.forEach((track, index) => {
      // forloop for audio tracks to find the track with same participant id
      let audioTrack = audioTracks.find((audio) => {
        return audio.getParticipantId() == track.getParticipantId();
      });

      let localaudioTrack = livekitslice.localAudioTracks.find((audio) => {
        return audio.getParticipantId() == track.getParticipantId();
      });

      let trackId = track.sid;
      let priority = index;
      let key = index;
      // let userType = window.room?.getParticipantById(track.getParticipantId())
      //   ._properties.user_type;
      let userType = customTrackPositions[trackId]?.trackType;

      if (props.type == "tier1" && userType == "P") {
        tiles.push(
          <div
            type="tier1"
            // priority={priority}
            onDragStart={(e) => dragStart(e, key)}
            onDragEnter={(e) => dragEnter(e, key)}
            onDragEnd={(e) => dragStop(e, key)}
            onDragLeave={(e) => dragLeave(e, key)}
            // onDrop={(e) => onDrop(e, local.userId, 1, track.sid, userType)}
            onDragOver={(e) => dragOver(e, key)}
            id={`draggable_div_tier1_${trackId}`}
            data-userid={key}
            data-trackid={trackId}
            data-viewertype={userType}
            data-desktop={isScreenShare(track)}
            style={{
              transition: "100ms linear",
            }}
            key={trackId}
          >
            <LiveKitTile
              trackUniqueId={trackId}
              draggable={true}
              userId={track.getParticipantId()}
              tileType="remote"
              type="tier1"
              track={track}
              audio={audioTrack}
              user={
                window.room?.getParticipantById(track.getParticipantId())
                  ._properties
              }
              videoMuted={videoMuteIdsList.includes(track.getParticipantId())}
              participant={window.room?.getParticipantById(
                track.getParticipantId()
              )}
            />
          </div>
        );
      } else if (props.type == "tier2" && userType == "S") {
        tiles.push(
          <div
            type="tier2"
            // priority={priority}
            onDragStart={(e) => dragStart(e, key)}
            onDragEnter={(e) => dragEnter(e, key)}
            onDragEnd={(e) => dragStop(e, key)}
            onDragLeave={(e) => dragLeave(e, key)}
            // onDrop={(e) => onDrop(e, local.userId, 1, track.sid, userType)}
            onDragOver={(e) => dragOver(e, key)}
            id={`draggable_div_tier2_${trackId}`}
            data-userid={key}
            data-trackid={trackId}
            data-viewertype={userType}
            data-desktop={isScreenShare(track)}
            style={{
              transition: "100ms linear",
            }}
            key={trackId}
          >
            <LiveKitTile
              trackUniqueId={trackId}
              userId={track.getParticipantId()}
              tileType="remote"
              type="tier2"
              track={track}
              audio={audioTrack}
              user={
                window.room?.getParticipantById(track.getParticipantId())
                  ._properties
              }
              videoMuted={videoMuteIdsList.includes(track.getParticipantId())}
              participant={window.room?.getParticipantById(
                track.getParticipantId()
              )}
            />
          </div>
        );
      } else if (props.type == "tier" && (userType == "S" || userType == "P")) {
        tiles.push(
          <div
            type="tier"
            // priority={priority}
            onDragStart={(e) => dragStart(e, key)}
            onDragEnter={(e) => dragEnter(e, key)}
            onDragEnd={(e) => dragStop(e, key)}
            onDragLeave={(e) => dragLeave(e, key)}
            // onDrop={(e) => onDrop(e, local.userId, 1, track.sid, userType)}
            onDragOver={(e) => dragOver(e, key)}
            id={`draggable_div_tier_${trackId}`}
            data-userid={key}
            data-trackid={trackId}
            data-viewertype={userType}
            data-desktop={isScreenShare(track)}
            style={{
              transition: "100ms linear",
            }}
            key={trackId}
          >
            <LiveKitTile
              trackUniqueId={trackId}
              userId={track.getParticipantId()}
              tileType="remote"
              type="tier"
              track={track}
              audio={audioTrack}
              user={
                window.room?.getParticipantById(track.getParticipantId())
                  ._properties
              }
              videoMuted={videoMuteIdsList.includes(track.getParticipantId())}
              participant={window.room?.getParticipantById(
                track.getParticipantId()
              )}
            />
          </div>
        );
      } else if (userType == "V" && track.customProperty?.is_local) {
        // check if track is instance of LocalVideoTrack
        try {
          track.setTrackMuted(true);
          localStorage.setObject("videoMuted", true);

          if (localaudioTrack) {
            localaudioTrack.setTrackMuted(true);
            localStorage.setObject("audioMuted", true);
          }
        } catch (e) {
          console.log(e, "error in setting track muted");
        }
      }
    });

    let localTrackSource = "no source";

    // if (window.room?.localParticipant.videoTracks.size > 0) {
    //   try {
    //     localTrackSource = window.room?.localParticipant.videoTracks
    //       .values()
    //       .next().value.track.source;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    if (
      // window.room?.localParticipant.videoTracks.size == 0 ||
      // localTrackSource == "no source" ||
      // localTrackSource == "screen_share"
      conference.noVideo.includes(window.room?.localParticipant.sid)
    ) {
      try {
        let participantMeta = JSON.parse(
          window.room?.localParticipant.metadata
        );
        let audioTrack = "mute";
        if (window.room?.localParticipant.audioTracks.size > 0) {
          audioTrack = window.room?.localParticipant.audioTracks
            .values()
            .next().value;
        }

        let localUserType =
          customTrackPositions[window.room?.localParticipant.sid]?.trackType;
        let trackId = window.room?.localParticipant.sid;
        let key = window.room?.localParticipant.sid;
        let index = window.room?.localParticipant.sid;

        if (props.type == "tier1" && localUserType == "P") {
          tiles.push(
            <div
              type="tier1"
              onDragStart={(e) => dragStart(e, key)}
              onDragEnter={(e) => dragEnter(e, key)}
              onDragEnd={(e) => dragStop(e, key)}
              onDragLeave={(e) => dragLeave(e, key)}
              // onDrop={(e) => onDrop(e, local.userId, 1, track.sid, userType)}
              onDragOver={(e) => dragOver(e, key)}
              id={`draggable_div_tier1_${trackId}`}
              data-userid={key}
              data-trackid={trackId}
              data-viewertype={localUserType}
              style={{
                transition: "100ms linear",
              }}
              key={trackId}
            >
              <LiveKitNoTrackTile
                type="tier1"
                participant={window.room?.localParticipant}
                user={participantMeta}
                audio={audioTrack}
                trackUniqueId={trackId}
                userId={window.room?.localParticipant.sid}
              />
            </div>
          );
        } else if (props.type == "tier2" && localUserType == "S") {
          tiles.push(
            <div
              type="tier2"
              onDragStart={(e) => dragStart(e, key)}
              onDragEnter={(e) => dragEnter(e, key)}
              onDragEnd={(e) => dragStop(e, key)}
              onDragLeave={(e) => dragLeave(e, key)}
              // onDrop={(e) => onDrop(e, local.userId, 1, track.sid, userType)}
              onDragOver={(e) => dragOver(e, key)}
              id={`draggable_div_tier2_${trackId}`}
              data-userid={key}
              data-trackid={trackId}
              data-viewertype={localUserType}
              style={{
                transition: "100ms linear",
              }}
              key={trackId}
            >
              <LiveKitNoTrackTile
                type="tier2"
                participant={window.room?.localParticipant}
                user={participantMeta}
                audio={audioTrack}
                trackUniqueId={trackId}
                userId={window.room?.localParticipant.sid}
              />
            </div>
          );
        } else if (
          props.type == "tier" &&
          (localUserType == "S" || localUserType == "P")
        ) {
          tiles.push(
            <div
              type="tier"
              onDragStart={(e) => dragStart(e, key)}
              onDragEnter={(e) => dragEnter(e, key)}
              onDragEnd={(e) => dragStop(e, key)}
              onDragLeave={(e) => dragLeave(e, key)}
              // onDrop={(e) => onDrop(e, local.userId, 1, track.sid, userType)}
              onDragOver={(e) => dragOver(e, key)}
              id={`draggable_div_tier_${trackId}`}
              data-userid={key}
              data-trackid={trackId}
              data-viewertype={localUserType}
              style={{
                transition: "100ms linear",
              }}
              key={index}
            >
              <LiveKitNoTrackTile
                type="tier"
                participant={window.room?.localParticipant}
                user={participantMeta}
                audio={audioTrack}
                trackUniqueId={trackId}
                userId={window.room?.localParticipant.sid}
              />
            </div>
          );
        }
      } catch (e) {
        console.log("error", e);
      }
    }

    //local
    let local_user_id = window.room?.localParticipant.sid;
    // let localUserType = window.room?.getParticipantById(
    //   window.room?.localParticipant.sid
    // )._properties.user_type;

    // window.room?.localParticipant.videoTracks?.forEach((track, index) => {

    //   let trackId = track.trackSid;
    //   let localUserType = customTrackPositions[trackId]?.trackType;

    //   if (props.type == "tier1" && localUserType == "P") {
    //     tiles.push(
    //       <div
    //         type={props.type}
    //         onDragStart={(e) => dragStart(e, local_user_id)}
    //         onDragEnter={(e) => dragEnter(e, local_user_id)}
    //         onDragEnd={(e) => dragStop(e, local_user_id)}
    //         onDragLeave={(e) => dragLeave(e, window.room?.localParticipant.sid)}
    //         // onDrop={(e) =>
    //         //   onDrop(e, local.userId, 1, track.trackSid, localUserType)
    //         // }
    //         onDragOver={(e) => dragOver(e, local_user_id)}
    //         id={`draggable_div_tier1_${trackId}`}
    //         data-userid={local_user_id}
    //         data-trackid={trackId}
    //         data-viewertype={localUserType}
    //         style={{
    //           transition: "100ms linear",
    //         }}
    //         key={"local"}
    //       >
    //         <LiveKitTile
    //           trackUniqueId={track.trackSid}
    //           userId={window.room?.localParticipant.sid}
    //           type={props.type}
    //           tileType="local"
    //           track={track?.track}
    //           user={
    //             window.room?.getParticipantById(
    //               window.room?.localParticipant.sid
    //             )._properties
    //           }
    //           videoMuted={
    //             videoMuteIdsList.includes(window.room?.localParticipant.sid) &&
    //             track.source == "camera"
    //           }
    //           audio={window.room?.getLocalAudioTrack()?.track}
    //           participant={window.room?.localParticipant}
    //         />
    //       </div>
    //     );
    //   } else if (props.type == "tier2" && localUserType == "S") {
    //     tiles.push(
    //       <div
    //         type={props.type}
    //         onDragStart={(e) => dragStart(e, local_user_id)}
    //         onDragEnter={(e) => dragEnter(e, local_user_id)}
    //         onDragEnd={(e) => dragStop(e, local_user_id)}
    //         onDragLeave={(e) => dragLeave(e, window.room?.localParticipant.sid)}
    //         // onDrop={(e) =>
    //         //   onDrop(e, local.userId, 1, track.trackSid, localUserType)
    //         // }
    //         onDragOver={(e) => dragOver(e, local_user_id)}
    //         id={`draggable_div_tier2_${track.trackSid}`}
    //         data-userid={local_user_id}
    //         data-trackid={trackId}
    //         data-viewertype={localUserType}
    //         style={{
    //           transition: "100ms linear",
    //         }}
    //         key={"local"}
    //       >
    //         <LiveKitTile
    //           trackUniqueId={track.trackSid}
    //           userId={window.room?.localParticipant.sid}
    //           type={props.type}
    //           tileType="local"
    //           track={track?.track}
    //           user={
    //             window.room?.getParticipantById(
    //               window.room?.localParticipant.sid
    //             )._properties
    //           }
    //           videoMuted={
    //             videoMuteIdsList.includes(window.room?.localParticipant.sid) &&
    //             track.source == "camera"
    //           }
    //           audio={window.room?.getLocalAudioTrack()?.track}
    //           participant={window.room?.localParticipant}
    //         />
    //       </div>
    //     );
    //   } else if (
    //     props.type == "tier" &&
    //     (localUserType == "S" || localUserType == "P")
    //   ) {
    //     tiles.push(
    //       <div
    //         type={props.type}
    //         onDragStart={(e) => dragStart(e, local_user_id)}
    //         onDragEnter={(e) => dragEnter(e, local_user_id)}
    //         onDragEnd={(e) => dragStop(e, local_user_id)}
    //         onDragLeave={(e) => dragLeave(e, window.room?.localParticipant.sid)}
    //         // onDrop={(e) =>
    //         //   onDrop(e, local.userId, 1, track.trackSid, localUserType)
    //         // }
    //         onDragOver={(e) => dragOver(e, local_user_id)}
    //         id={`draggable_div_tier2_${track.trackSid}`}
    //         data-userid={local_user_id}
    //         data-trackid={trackId}
    //         data-viewertype={localUserType}
    //         style={{
    //           transition: "100ms linear",
    //         }}
    //         key={"local"}
    //       >
    //         <LiveKitTile
    //           trackUniqueId={track.trackSid}
    //           userId={window.room?.localParticipant.sid}
    //           type={props.type}
    //           tileType="local"
    //           track={track?.track}
    //           user={
    //             window.room?.getParticipantById(
    //               window.room?.localParticipant.sid
    //             )._properties
    //           }
    //           videoMuted={
    //             videoMuteIdsList.includes(window.room?.localParticipant.sid) &&
    //             track.source == "camera"
    //           }
    //           audio={window.room?.getLocalAudioTrack()?.track}
    //           participant={window.room?.localParticipant}
    //         />
    //       </div>
    //     );
    //   }
    // });

    //map over devices

    devices.forEach((device, index) => {
      let priority = index;
      let key = index;
      let userType = customTrackPositions[device.id]?.trackType;
      if (
        props.type == "tier1" &&
        userType == "P" &&
        window.room?.getParticipantById(device.user_id)._properties.firstName !=
          undefined
      ) {
        tiles.push(
          <div
            type="tier1"
            // priority={priority}
            onDragStart={(e) => dragStart(e, key)}
            onDragEnter={(e) => dragEnter(e, key)}
            onDragEnd={(e) => dragStop(e, key)}
            onDragLeave={(e) => dragLeave(e, key)}
            onDragOver={(e) => dragOver(e, key)}
            // onDrop={(e) => onDrop(e, key, priority)}
            id={`draggable_div_tier1_${device.id}`}
            data-isdevice={true}
            data-trackid={device.id}
            data-viewertype={userType}
            data-desktop={false}
            key={device.id}
            className="grid-item"
          >
            <LiveKitTile
              trackUniqueId={device.id}
              userId={device.user_id}
              type="tier1"
              tileType="device"
              track={device}
              audio={null}
              user={window.room?.getParticipantById(device.user_id)._properties}
              videoMuted={null}
              participant={window.room?.localParticipant}
            />
          </div>
        );
      } else if (
        props.type == "tier2" &&
        userType == "S" &&
        window.room?.getParticipantById(device.user_id)._properties.firstName !=
          undefined
      ) {
        tiles.push(
          <div
            type="tier2"
            // priority={priority}
            onDragStart={(e) => dragStart(e, key)}
            onDragEnter={(e) => dragEnter(e, key)}
            onDragEnd={(e) => dragStop(e, key)}
            onDragLeave={(e) => dragLeave(e, key)}
            onDragOver={(e) => dragOver(e, key)}
            // onDrop={(e) => onDrop(e, key, priority)}

            key={device.id}
            id={`draggable_div_tier2_${device.id}`}
            data-trackid={device.id}
            data-viewertype={userType}
            data-isdevice={true}
            className="grid-item"
          >
            <LiveKitTile
              trackUniqueId={device.id}
              userId={device.user_id}
              type="tier2"
              tileType="device"
              track={device}
              audio={null}
              user={window.room?.getParticipantById(device.user_id)._properties}
              videoMuted={null}
              participant={window.room?.localParticipant}
            />
          </div>
        );
      } else if (
        props.type == "tier" &&
        (userType == "S" || userType == "P") &&
        window.room?.getParticipantById(device.user_id)._properties.firstName !=
          undefined
      ) {
        tiles.push(
          <div
            type="tier"
            // priority={priority}
            onDragStart={(e) => dragStart(e, key)}
            onDragEnter={(e) => dragEnter(e, key)}
            onDragEnd={(e) => dragStop(e, key)}
            onDragLeave={(e) => dragLeave(e, key)}
            onDragOver={(e) => dragOver(e, key)}
            // onDrop={(e) => onDrop(e, key, priority)}
            draggable={true}
            key={device.id}
            id={device.id}
            className="grid-item"
          >
            <LiveKitTile
              trackUniqueId={device.id}
              draggable={true}
              userId={device.user_id}
              type="tier"
              tileType="device"
              track={device}
              audio={null}
              user={window.room?.getParticipantById(device.user_id)._properties}
              videoMuted={null}
              participant={window.room?.localParticipant}
            />
          </div>
        );
      }
    });

    // sort tiles by priority
    const sortedTiles = tiles.sort((a, b) => {
      return a.props.priority - b.props.priority;
    });
    return sortedTiles;
  }, [
    trackPosition,
    conference.noVideo,
    livekitTracks,
    devices,
    props.type,
    audioTracks,
    dispatch,
    dragStart,
    dragEnter,
    videoMuteIdsList,
  ]);
  useEffect(() => {
    let currentGrid = grid.current;
    window.addEventListener("resize", () => {
      resize(currentGrid, conference.layout);
    });
    return () => {
      window.removeEventListener("resize", () => {
        resize(currentGrid, conference.layout);
      });
    };
  }, [conference.layout]);
  useEffect(() => {
    setgridTiels(getTiles());
  }, [
    props.remoteVideoTracks,
    participantPositions,
    getTiles,
    draggingPriority,
  ]);
  useEffect(() => {
    resize(grid.current, conference.layout);
  }, [props.width, gridTiels, props.remoteVideoTracks, conference.layout]);

  let gridStyle = {
    position: "relative",
    placeItems: "center",

    display: "grid",
    gridGap: "10px",
    // border: '1px solid green',
    width:
      conference.layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_VERTICAL
        ? "100vw"
        : `${props.width}vw`,
    height:
      conference.layout == LAYOUT_TYPES.DYNAMIC_LAYOUT_VERTICAL
        ? `${props.width}vh`
        : "90vh",
    justifyContent: "center",
  };

  return (
    <div
      style={gridStyle}
      className="grid"
      ref={grid}
      type={props.type}
      onDrop={(e) => onDrop(e, "grid", props.user_type)}
      onDragOver={(e) => e.preventDefault()}
    >
      {gridTiels}
    </div>
  );
}
