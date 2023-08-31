import React, { useCallback, useEffect, useState } from 'react';
import BottomMenu from '../bottomMenu';
import { useSelector } from "react-redux";
import { LiveKitTile } from '../livekitIntegration/livekitTile.tsx';
import { RootState } from '../../state/store.tsx';

const MeetingMobile = (props: any) => {
    const { theme } = props;
  let livekitTracks = useSelector((state) => state.livekit.tracks);
  const audioTracks = useSelector((state) => state.livekit.audioTracks);
  const livekitslice = useSelector((state) => state.livekit);
  const trackPosition = useSelector((state) => state.livekit.trackPosition);
  const devices = useSelector((state) => state.conference.devices);

  const videoMuteIdsList = useSelector(
    (state) => state.conference.videoMuteIds
  );
 const currentActiveUserId = useSelector(
   (state: RootState) => state.conference.currentActiveUserId
 );

 


 // Output the sorted array
  const [gridTiels, setgridTiels] = useState([]);
      const tiles: any[] = [];
  

 
 useEffect(() => {
   firstGrid();
 }, [currentActiveUserId]);

 const firstGrid = () => {
   //find the currentActiveUserId track in livekitTracks
   let currentActiveUserTrack = livekitTracks.find((track) => {
     return track.sid == currentActiveUserId;
   });

   //find the currentActiveUserId devic in devices
  
   let currentActiveUserDevice = devices.find((device) => {
     return device.id == currentActiveUserId;
   }
   );


   if (currentActiveUserTrack) {
     let audioTrack = audioTracks.find((audio) => {
       return (
         audio.getParticipantId() == currentActiveUserTrack.getParticipantId()
       );
     });
     tiles.push(
       <div
         // ${
         //     currentActiveUserId == trackId &&
         //     props.mobileTileView &&
         //     "grid-item-first-child"
         //   }
         className={`grid-item-first-child grid-item`}
       >
         <LiveKitTile
           trackUniqueId={currentActiveUserTrack.sid}
           draggable={false}
           userId={currentActiveUserTrack.getParticipantId()}
           tileType="remote"
           type="tier1"
           track={currentActiveUserTrack}
           audio={audioTrack}
           user={
             window.room?.getParticipantById(
               currentActiveUserTrack.getParticipantId()
             )._properties
           }
           videoMuted={videoMuteIdsList.includes(
             currentActiveUserTrack.getParticipantId()
           )}
           participant={window.room?.getParticipantById(
             currentActiveUserTrack.getParticipantId()
           )}
         />
       </div>
     );
   }else if(currentActiveUserDevice){
      tiles.push(
         <div
         // ${
         //     currentActiveUserId == trackId &&
         //     props.mobileTileView &&
         //     "grid-item-first-child"
         //   }
         className={`grid-item-first-child grid-item`}
       >
         <LiveKitTile
                 trackUniqueId={currentActiveUserDevice.id}
                 userId={currentActiveUserDevice.user_id}
                 type="tier1"
                 tileType="device"
                 track={currentActiveUserDevice}
                 audio={null}
                 user={
                   window.room?.getParticipantById(currentActiveUserDevice.user_id)._properties
                 }
                 videoMuted={null}
                 participant={window.room?.localParticipant}
               />
       </div>
              
             );
 }};
    const getTiles = useCallback(() => {
      const customTrackPositions = {};
      trackPosition.forEach((track_position, index) => {
        customTrackPositions[track_position.trackId] = track_position;
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

          // let userType = window.room?.getParticipantById(track.getParticipantId())
          //   ._properties.user_type;
          let userType = customTrackPositions[trackId]?.trackType;

          if (
            (userType == "P" || userType == "S") &&
            trackId != currentActiveUserId
          ) {
            tiles.push(
              <div
                // ${
                //     currentActiveUserId == trackId &&
                //     props.mobileTileView &&
                //     "grid-item-first-child"
                //   }
                className={`
              
               grid-item`}
              >
                <LiveKitTile
                  trackUniqueId={trackId}
                  draggable={false}
                  userId={track.getParticipantId()}
                  tileType="remote"
                  type="tier1"
                  track={track}
                  audio={audioTrack}
                  user={
                    window.room?.getParticipantById(track.getParticipantId())
                      ._properties
                  }
                  videoMuted={videoMuteIdsList.includes(
                    track.getParticipantId()
                  )}
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

         devices.forEach((device, index) => {
           let userType = customTrackPositions[device.id]?.trackType;
           if (
            ( userType == "S" ||
             userType == "P" ||
             window.room?.getParticipantById(device.user_id)._properties
               .firstName != undefined) && device.id != currentActiveUserId
           ) {
             tiles.push(
               <LiveKitTile
                 trackUniqueId={device.id}
                 userId={device.user_id}
                 type="tier1"
                 tileType="device"
                 track={device}
                 audio={null}
                 user={
                   window.room?.getParticipantById(device.user_id)._properties
                 }
                 videoMuted={null}
                 participant={window.room?.localParticipant}
               />
             );
           }
         });

      return tiles;
    }, [audioTracks, currentActiveUserId, livekitTracks, livekitslice.localAudioTracks, props.mobileTileView, trackPosition, videoMuteIdsList]);

    
   useEffect(() => {
     setgridTiels(getTiles());
   }, [

     getTiles,
   ]);


  

    return (
      <div>
        <div className="grid-container">
          {gridTiels}
     
        </div>
        <BottomMenu theme={theme} />
      </div>
    );
};

export default MeetingMobile;