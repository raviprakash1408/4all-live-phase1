import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { LivekitRoom } from "../livekitIntegration"
import { Room, RoomEvent, VideoPresets } from "livekit-client"
// @ts-ignore
import { AxiosLocal } from "../../utilities/axiosUtils.ts"
import { getTeamSlugFromUrl } from "../../utilities/common"
import { useSelector } from "react-redux"
import { Helmet } from "react-helmet"
let prevTrackIds : Array<string|undefined> = []
export const PublicTrack = (props)=>{
    const [mute, setmute] = useState<boolean>(true)
    const location = useLocation()
    let team_slug = getTeamSlugFromUrl("lobby");
const eventTheme = useSelector(
  (state: any) => state.theme.eventTheme[state.theme.theme]
);
    useEffect(()=>{
        const video = document.getElementById("video") as HTMLVideoElement
    let path = location.pathname.split("/")
    // get last part of url and set it as trackId
    const trackId = path.pop()
    const roomSlug = path.pop()
    console.log(trackId, "trackIdtrackIdtrackIdtrackId",roomSlug);

    const room: LivekitRoom = (window.room = new Room({
        // automatically manage subscribed video quality
        adaptiveStream: true,  
        // optimize publishing bandwidth and CPU for published tracks
        dynacast: true,
        //automatically change resolution
        audioCaptureDefaults : {
          echoCancellation: true,
          autoGainControl: true,
          noiseSuppression: true
        },
    
    // default capture settings
  

    videoCaptureDefaults: {
      
      resolution: VideoPresets.h2160.resolution,
   
    }

  }));

      room.on(RoomEvent.TrackSubscribed, (track,publication) => {
        console.log("track subscribed", track,publication.trackName);
        let prevTrackId = ""
        try {
            prevTrackId = JSON.parse(publication.trackName).prevTrackId
        } catch (error) {
            console.log(error);
            
        }
        if(prevTrackId != "" && (prevTrackIds.includes(prevTrackId)  )){
            prevTrackIds.push(track.sid)
            track.attach(video);
            setmute(track.isMuted)
        }

        if (track.kind === "video" && track.sid === trackId) {
            track.attach(video);
            prevTrackIds.push(trackId)
            setmute(track.isMuted)
        }
        });

        room.on(RoomEvent.TrackMuted, (track, publication) => {
            console.log("track muted", track, publication);
            if (track.kind === "video" && prevTrackIds.includes(track.track?.sid)) {
                setmute(track.track?.isMuted || false)
            }
            });


      AxiosLocal.get(
        `token/track/?room_slug=${roomSlug}&team_slug=${team_slug}`
      ).then((response) => {
        let data = response.data;
        let token = data.token;
        console.log(token);
        console.log(response, "response response response");
        
      
       room.connect("wss://lk-helm.cluster.meetmo.io", token);
      });

    },[location, mute, team_slug])
return (
  <>
    <Helmet>
      <title>{eventTheme?.login?.title}</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={eventTheme?.login?.favicon180x180}
      />

      <link
        rel="apple-touch-icon"
        sizes="512x512"
        href={eventTheme?.login?.favicon512x512}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={eventTheme?.login?.favicon32x32}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={eventTheme?.login?.favicon16x16}
      />
    </Helmet>
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: eventTheme?.bg_color_1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!mute ? (
        <video
          id="video"
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: "16/9",
          }}
          src=""
        />
      ) : (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: eventTheme?.bg_color_1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          Loading video
        </div>
      )}
    </div>
  </>
);

}
