import { useDispatch, useSelector } from "react-redux";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import { organizationUser } from "../../utilities/common";
import ElementMenu from "./element_menu";
import SubMenu from "./element_menu/sub_menu";
import { setRender, updateTrackPosition } from "../../state/livekit/slice.ts";
import { setLayout } from "../../state/conference/conferenceSlice.js";

  const ViewAs = ({ user, theme, tileType, viewerType, trackId,isDirector }) => {
    const permissions = useSelector((state) => state.permissions);
    const livekitTracks = useSelector((state) => state.livekit.tracks);
    const layout = useSelector((state) => state.conference.layout);
  let conference = useSelector((state) => state.conference);
  
  
    const dispatch = useDispatch();
    return (
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          padding: "10px 5px",
          top: "0px",
          left:
            tileType == "tier2" || tileType == "tier"
              ? ""
              : "calc(100% - 15px)",
          right: tileType == "tier2" || tileType == "tier" ? "198px" : "",
          backgroundColor: theme?.bg_color_1,
          border: "2px solid",
          borderColor: theme?.bg_color_1,
          borderRadius: "4px",
        }}
      >
        {(layout == "dynamic_layout_vertical" ||
          layout == "dynamic_layout_horizontal") && (
          <>
            <SubMenu
              selected={viewerType == "P"}
              label="Primary"
              onClick={() => {
                console.log("Primary");
                // if (user?.user_type != "P") {
                if (true) {
                  // window.room.sendCommandOnce("PARTICIPANT_PROPERTY", {
                  //   value: JSON.stringify({
                  //     property: "user_type",
                  //     userId: user.userId,
                  //     value: "P",
                  //   }),
                  // });
                  dispatch(
                    updateTrackPosition({
                      trackId: trackId,
                      trackType: viewerType,
                      current_trackType: "P",
                    })
                  );

                  dispatch(setRender(`Viewer_${trackId}_${viewerType}`));

                  if (isDirector) {
                    window.eventChanel.publish({
                      event: "directorModeUpdate",
                      user_id: window.room?.myUserId(),
                    });

                    let track = livekitTracks.find(
                      (item) => item.sid == trackId
                    );
                    console.log(
                      track.customProperty,
                      "livekitTrackslivekitTrackslivekitTracks"
                    );
                    if (track.customProperty.type == "user") {
                      let user_id = track.customProperty.user_db_id;
                      let viewer_type = "P";
                      let guestUser = track.customProperty.is_guest_user;
                      AxiosLocal.post(`user/organisation/relation/edit`, {
                        user_id,
                        viewer_type,
                        guestUser,
                      });
                    }
                  }
                }
              }}
            />

            <SubMenu
              selected={viewerType == "S"}
              label="Secondary"
              onClick={() => {
                console.log("Secondary");
                // if (user?.user_type != "P") {
                if (true) {
                  // window.room.sendCommandOnce("PARTICIPANT_PROPERTY", {
                  //   value: JSON.stringify({
                  //     property: "user_type",
                  //     userId: user.userId,
                  //     value: "P",
                  //   }),
                  // });
                  dispatch(
                    updateTrackPosition({
                      trackId: trackId,
                      trackType: viewerType,
                      current_trackType: "S",
                    })
                  );

                  dispatch(setRender(`Viewer_${trackId}_${viewerType}`));

                  if (isDirector) {
                    window.eventChanel.publish({
                      event: "directorModeUpdate",
                      user_id: window.room?.myUserId(),
                    });

                    let track = livekitTracks.find(
                      (item) => item.sid == trackId
                    );
                    console.log(
                      track.customProperty,
                      "livekitTrackslivekitTrackslivekitTracks"
                    );
                    if (track.customProperty.type == "user") {
                      let user_id = track.customProperty.user_db_id;
                      let viewer_type = "S";
                      let guestUser = track.customProperty.is_guest_user;
                      AxiosLocal.post(`user/organisation/relation/edit`, {
                        user_id,
                        viewer_type,
                        guestUser,
                      });
                    }
                  }
                }
              }}
              theme={theme}
            />
          </>
        )}
        {organizationUser(permissions.show_three_dot_option) &&
          organizationUser(permissions.control_panel) && (
            <SubMenu
              label="Hidden"
              onClick={() => {
                // if (user?.user_type != "V") {
                // window.room.sendCommandOnce("PARTICIPANT_PROPERTY", {
                //   value: JSON.stringify({
                //     property: "user_type",
                //     userId: user.userId,
                //     value: "P",
                //   }),
                // });
                dispatch(
                  updateTrackPosition({
                    trackId: trackId,
                    trackType: viewerType,
                    current_trackType: "V",
                  })
                );

                dispatch(setRender(`Viewer_${trackId}_${viewerType}`));

                if (isDirector) {
                  window.eventChanel.publish({
                    event: "directorModeUpdate",
                    user_id: window.room?.myUserId(),
                  });

                  let track = livekitTracks.find((item) => item.sid == trackId);
                  console.log(
                    track,
                    conference.currentActiveUserId,
                    track.customProperty,
                    "livekitTrackslivekitTrackslivekitTracks"
                  );
                  if (track.customProperty.type == "user") {
                    let user_id = track.customProperty.user_db_id;
                    let viewer_type = "V";
                    let guestUser = track.customProperty.is_guest_user;
                    AxiosLocal.post(`user/organisation/relation/edit`, {
                      user_id,
                      viewer_type,
                      guestUser,
                    });
                  }
                  if (
                    track.sid == conference.currentActiveUserId &&
                    layout == "stage_layout"
                  ) {
                    dispatch(setLayout());
                  }
                }
                // }
              }}
              theme={theme}
            />
          )}
      </div>
    );
  };

export default ViewAs;
