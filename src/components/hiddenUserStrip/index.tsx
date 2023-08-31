import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../sections/Toast";
import { switchParticipantPosition } from "../../state/conference/conferenceSlice";
//@ts-ignore
import { updateTrackPosition, setRender } from "../../state/livekit/slice.ts";
//@ts-ignore
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
//@ts-ignore
import { HiddenUser } from "./hiddenUser.tsx";
import { LocalVideoTrack } from "livekit-client";
import { getTeamSlugFromUrl } from "../../utilities/common";

export const HiddenUserStrip = (props) => {
  const { theme } = props;

 
  const [openerrorToast, setOpenerrorToast] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const conference = useSelector((state: any) => state.conference);
  const trackPosition = useSelector(
    (state: any) => state.livekit.trackPosition
  );

  const participantPropertyChange = useSelector(
    (state: any) =>
      state.userProfile.userUpdated.userId + state.userProfile.userUpdated.type
  );
  const videoTracks = useSelector((state: any) => state.livekit.tracks);
  const audioTracks = useSelector((state: any) => state.livekit.audioTracks);

  let team_slug = getTeamSlugFromUrl("space")


  const hiddenUsers = useCallback(() => {
    const customTrackPositions = {};
    trackPosition.forEach((track_position, index) => {
      customTrackPositions[track_position.trackId] = track_position;
    });
    // console.log("gridAudioTrakssss", customTrackPositions);

    // console.log(participantPropertyChange, "participantPropertyChange");

    // let hiddenUsersNoTrackList = [];

    // window.room.getParticipants().forEach((participant, index) => {
    //   let trackSource = "no source";
    //   //@ts-ignore
    //   if (participant.videoTracks.size > 0) {
    //     try {
    //       //@ts-ignore
    //       trackSource = participant.videoTracks.values().next().value
    //         .track.source;
    //     } catch (e) {
    //       console.log(e, "trackSourceError");
    //     }
    //   }
    //   if (
    //     //@ts-ignore
    //     participant.videoTracks.size == 0 ||
    //     trackSource == "no source" ||
    //     trackSource == "screen_share"
    //   ) {
    //     //@ts-ignore
    //     let userType = customTrackPositions[participant.sid]?.trackType;
    //     let participantMeta = {};
    //     try {
    //       participantMeta = JSON.parse(participant?.metadata);
    //     } catch (error) {
    //       console.log(error, "gridAudioParticipantError");
    //     }
    //     if (!["P", "S"].includes(userType)) {
    //       // check if track is instance of LocalVideoTrack
    //       console.log("gridAudioParticipantError");
    //       //@ts-ignore
    //       hiddenUsersNoTrackList.push(
    //         //@ts-ignore
    //         <HiddenUser
    //           trackId={participant?.sid}
    //           avatar={participantMeta?.avatar}
    //           firstName={participantMeta?.user_first_name}
    //           lastname={participantMeta?.user_last_name}
    //           userId={participantMeta?.userId}
    //           role={participantMeta?.role}
    //           guestUser={participantMeta?.guestUser}
    //           theme={theme}
    //         />
    //       );
    //     }
    //   }
    // });
    // let localTrackSource = "no source";
    // if (window.room?.localParticipant.videoTracks.size > 0) {
    //   try {
    //     localTrackSource = window.room?.localParticipant.videoTracks
    //       .values()
    //       .next().value.track.source;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    // if (
    //   window.room?.localParticipant.videoTracks.size == 0 ||
    //   localTrackSource == "no source" ||
    //   localTrackSource == "screen_share"
    // ) {
    //   let participantMeta = JSON.parse(window.room?.localParticipant.metadata);
    //   let localUserType =
    //     customTrackPositions[window.room?.localParticipant.sid]?.trackType;
    //   if (!["P", "S"].includes(localUserType)) {
    //     // check if track is instance of LocalVideoTrack

    //     //@ts-ignore
    //     hiddenUsersNoTrackList.push(
    //       //@ts-ignore
    //       <HiddenUser
    //         trackId={window.room?.localParticipant?.sid}
    //         avatar={participantMeta?.avatar}
    //         firstName={participantMeta?.user_first_name}
    //         lastname={participantMeta?.user_last_name}
    //         userId={participantMeta?.userId}
    //         role={participantMeta?.role}
    //         guestUser={participantMeta?.guestUser}
    //         theme={theme}
    //       />
    //     );
    //   }
    // }

    let hiddenUsersList = videoTracks.reduce(function (
      filtered: JSX.Element[],
      track
    ) {
      //@ts-ignore
      let properties = window.room?.getParticipantById(
        track?.getParticipantId()
        //@ts-ignore
      )?._properties;
      console.log(properties, "propertiesproperties");
      let user_type = customTrackPositions[track.sid]?.trackType;
      console.log(user_type, "user_typeuser_typeuser_type");

      if (!["P", "S"].includes(user_type)) {
        // check if track is instance of LocalVideoTrack

        filtered.push(
          // @ts-ignore
          <HiddenUser
            track={track}
            trackId={track?.sid}
            avatar={properties?.avatar}
            firstName={properties?.firstName}
            lastname={properties?.lastName}
            userId={track.getParticipantId()}
            role={properties?.role}
            guestUser={properties?.guestUser}
            theme={theme}
          />
        );
      }
      return filtered;
    },
    []);

    // return hiddenUsersNoTrackList;

    // check iam hidden
    // push to hiddenUsersList

    // if (window.room?.getLocalParticipantProperty("user_type") == "V") {
    //   hiddenUsersList.push(
    //     <HiddenUser
    //       avatar={window.room?.getLocalParticipantProperty("avatar")}
    //       firstName={window.room?.getLocalParticipantProperty("firstName")}
    //       lastname={window.room?.getLocalParticipantProperty("lastName")}
    //       userId={window.room?.getLocalParticipantProperty("userId")}
    //       role={window.room?.getLocalParticipantProperty("role")}
    //       guestUser={window.room?.getLocalParticipantProperty("guestUser")}
    //     />
    //   );
    // }

    // return hiddenUsersList

    let handRisedUserIds = conference.HandRise;

    let handRisedUsers = hiddenUsersList.filter((user: any) => {
      return handRisedUserIds.includes(user.props.userId);
    });

    let nonHandRisedUsers = hiddenUsersList.filter((user: any) => {
      return !handRisedUserIds.includes(user.props.userId);
    });

    return [...handRisedUsers, ...nonHandRisedUsers];
  }, [
    conference.HandRise,
    participantPropertyChange,
    trackPosition,
    videoTracks,
  ]);

  const onDrop = (e, userId, priority) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      let trackId = e.dataTransfer.getData("trackId");
      let viewerType = e.dataTransfer.getData("viewerType");
      // isDesktop
      let isDesktop = e.dataTransfer.getData("isDesktop");
      let isDevice = e.dataTransfer.getData("isDevice");

      console.log("onDropUser",isDesktop);

      if (isDesktop == "true") {
        setOpenerrorToast(true);
        setMessage("Desktop can't be dropped here")
        return;
      }else if(isDevice == "true"){
        setOpenerrorToast(true);
        setMessage("Device can't be dropped here");
        return;
      }
      else{
        let track = videoTracks.find((item) => item.sid == trackId);

        e.target.style.border = "none";

        dispatch(
          updateTrackPosition({
            trackId: trackId,
            trackType: viewerType,
            current_trackType: "V",
          })
        );

        dispatch(setRender(`Viewer_${trackId}_${"V"}`));

        if (
          conference.directorMode.mode &&
          conference.directorMode.user_id == window.room?.myUserId()
        ) {
          //@ts-ignore
          window.eventChanel?.publish({
            event: "directorModeUpdate",
            user_id: window.room?.myUserId(),
          });

          if (track.customProperty.type == "user") {
            let user_id = track.customProperty.user_db_id;
            let viewer_type = "V";
            let guestUser = track.customProperty.is_guest_user;
            AxiosLocal.post(`user/organisation/relation/edit`, {
              user_id,
              viewer_type,
              guestUser,
              team_slug,
            });
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  // }
  // check user is director

  return (
    <div>
      <div
        onDrop={(e) => onDrop(e, "", 1)}
        onDragOver={(e) => {
          if (
            conference.directorMode.mode &&
            conference.directorMode.user_id === window.room.myUserId()
          ) {
            e.preventDefault();
          }
        }}
        style={{
          position: "absolute",
          //  position:'relative',
          width: "100vw",
          height: "100vh",
          backgroundColor: theme?.bg_color_1
            ? theme?.bg_color_1
            : "rgba(1, 25, 52, 1)",
          userSelect: "none",
          msUserSelect: "none",
          WebkitUserSelect: "none",
        }}
        // className="horizontal-scroll"
      >
        {/* <div className="hidden-user-strip" style={{ display: "flex" }}> */}
        <p
          style={{
            margin: "0px",
            padding: "20px 0px 12px 0px",
            fontSize: "20px",
            color: "white",
            textAlign: "center",
          }}
        >
          Hidden users
        </p>

        {hiddenUsers().length === 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ color: "white" }}>No Hidden User</p>
          </div>
        ) : (
          hiddenUsers()
        )}
        {/* </div> */}
      </div>
      <Toast
        openToast={openerrorToast}
        setOpenToast={setOpenerrorToast}
        message={message}
        type="error"
      />
    </div>
  );
};
