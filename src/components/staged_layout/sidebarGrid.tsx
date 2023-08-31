import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "../../state/store.tsx";
import TileElement from "./tileElement.tsx";
import { Track } from "livekit-client";
import LivekitTileElement from "./LivekitTileElement.tsx";
import LivekitTileNoTrackElement from "./LivekitTileNoTrackElement.tsx";

const SidebarGrid = ({ remoteVideoTracks, remoteAudioTracks }) => {
  // get audio and video from redux store
  const local = useSelector((state: RootState) => state.local);
  const conference = useSelector((state) => state.conference);

  const participantPositions = useSelector(
    (state: RootState) => state.conference.participantPositions
  );
  const devices = useSelector((state) => state.conference.devices);

  const audioTracks = useSelector((state) => state.livekit.audioTracks);

  const trackPosition = useSelector((state) => state.livekit.trackPosition);

  const rerendered = useSelector((state) => state.livekit.rerender);

  const customTrackPositions = {};
  trackPosition.forEach((track_position, index) => {
    customTrackPositions[track_position.trackId] = track_position;
  });

  const [noTrackParticipants, setNoTrackParticipants] = useState([]);

  useEffect(() => {
    setNoTrackParticipants([]);
    window.room.getParticipants().forEach((participant, index) => {
      if (conference.noVideo.includes(participant?.sid)) {
        let noTrackParticipantsList = [...noTrackParticipants, participant];
        setNoTrackParticipants(noTrackParticipantsList);
      }
    });

    if (conference.noVideo.includes(window.room?.localParticipant?.sid)) {
      // noTrackParticipants.push(window.room?.localParticipant);
      let noTrackParticipantsList2 = [
        ...noTrackParticipants,
        window.room?.localParticipant,
      ];
      setNoTrackParticipants(noTrackParticipantsList2);
    }

    console.log(noTrackParticipants, "noTrackParticipants");
  }, [trackPosition, rerendered]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "180px",
          // height: "100vh",
          //backgroundColor: 'rgba(1, 25, 52, 0.8)',
          alignItems: "center",
          justifyContent: "start",
          overflowY: "scroll",
          height: "88vh",
          paddingTop: "35px",
          paddingBottom: "35px",
        }}
      >
        {Object.keys(remoteVideoTracks)
          .filter(
            (track) =>
              customTrackPositions[remoteVideoTracks[track].sid]?.trackType !==
              "V"
          )
          .map((track, index) => {
            let audioTrack = audioTracks.find((audioTrack) => {
              return (
                audioTrack.getParticipantId() ==
                remoteVideoTracks[track].getParticipantId()
              );
            });
            return (
              <LivekitTileElement
                key={index}
                trackUniqueId={remoteVideoTracks[track]?.sid}
                data={remoteVideoTracks[track]}
                userId={remoteVideoTracks[track]?.getParticipantId()}
                isLocal={false}
                video={remoteVideoTracks[track]}
                audio={audioTrack}
                // videoMuted={remoteVideoTracks[track]?.isMuted}
                audioMuted={audioTrack?.isMuted}
                type="remote"
                user={
                  window.room?.getParticipantById(
                    remoteVideoTracks[track]?.getParticipantId()
                  )._properties
                }
                position={index + 1}
              />
            );
            // }
          })}
        {devices.map((device, index) => {
          if (
            window.room?.getParticipantById(device.user_id)._properties
              .firstName != undefined
          ) {
            return (
              <LivekitTileElement
                trackUniqueId={device.id}
                data={device}
                userId={device.id}
                isLocal={false}
                video={device}
                audio={device}
                // videoMuted={remoteVideoTracks[track]?.isMuted}
                audioMuted={false}
                type="device"
                user={
                  window.room?.getParticipantById(device.user_id)._properties
                }
                position={index + 1}
              />
            );
          }
        })}
        {noTrackParticipants.map((participant, index) => {
          let usernoVideo = {};
          try {
            usernoVideo = JSON.parse(participant?.metadata);
          } catch (error) {
            console.log(error, "noTrackParticipantMetadataError");
          }
          return (
            <LivekitTileNoTrackElement
              trackUniqueId={participant?.sid}
              data={participant}
              userId={participant?.sid}
              isLocal={false}
              video="no video"
              audio={participant}
              // videoMuted={remoteVideoTracks[track]?.isMuted}
              audioMuted={true}
              type="participant"
              user={usernoVideo}
              position={index + 1}
            />
          );
        })}
      </Box>
    </>
  );
};

export default SidebarGrid;
