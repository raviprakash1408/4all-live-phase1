import React, { useEffect, useRef, useState } from "react";
import ThreeDotOverlay from "../three_dot_overlay";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip, Slider, Box } from "@mui/material";
import PanToolIcon from "@mui/icons-material/PanTool";
import { changeOpacity } from "../../utilities/common";
// @ts-ignore
import AvatarElem from "../staged_layout/avatar.tsx";
import { shortNameCreator } from "../../utilities/shortName";
import TileConnectivy from "../tile_connectivy";
import {
  LAYOUT_TYPES,
  setCenterStageDevice,
  setcurrentActiveUserId,
  setCurrentActiveVideo,
  setLayout,
} from "../../state/conference/conferenceSlice";
import { setPopoverOpen } from "../../state/info/infoSlice";
// @ts-ignore
import MpegtsPlayer from "../mpegtsPlayer.tsx";
// @ts-ignore
import { updateRoomConfig } from "../../livekitConnection/userMap.ts";
// @ts-ignore
import { addVolume } from "../../state/controlpannel/slice.ts";
import CustomTooltip from "../../admin/CustomTooltip";
import Wave from "wave-visualizer";
import { VideoTrack, AudioTrack } from "livekit-client";
// @ts-ignore
import { tableData } from "../ControlPanel.tsx";
import { RootState } from "../../state/store";
import DirectorModeToast from "../Toast/DirectorModeToast";

interface TileProps {
  type: "tier1" | "tier2" | "tier";
  trackUniqueId: string;
  tileType: "remote" | "local" | "device";
  track: VideoTrack | tableData;
  userId: string;
  audio: AudioTrack;
  user: {
    user_first_name: string;
    user_last_name: any;
    avatar: any;
    is_organization_user: any;
    role: string;
  };
}

export const LiveKitNoTrackTile = (props: TileProps) => {
  const audioElement = useRef();
  const b = useRef(null);
  const dispatch = useDispatch();
  const [is_hover, setHover] = useState(false);
  const [is_hover_detail, setHoverDetail] = useState(false);
  const HandRise = useSelector((state: RootState) => state.conference.HandRise);
  const eventTheme = useSelector(
    (state: any) => state.theme.eventTheme[state.theme.theme]
  );
  const conference = useSelector((state: any) => state.conference);
  const permissions = useSelector((state: RootState) => state.permissions);

  const mouseLeave = () => {
    let container = document.getElementById(
      `draggable_div_${props.type}_${props.trackUniqueId}`
    );

    //   set draggable on container
    // @ts-ignore
    container.draggable = false;
    //   change cursor to normal
    // @ts-ignore
    container.style.cursor = "default";
  };

  const mouseEnter = () => {
    let container = document.getElementById(
      `draggable_div_${props.type}_${props.trackUniqueId}`
    );
    //   set draggable on container
    if (true) {
      // @ts-ignore
      container.draggable = true;
    }

    //   change cursor to grab
    // @ts-ignore
    container.style.cursor = "grab";
  };

  useEffect(() => {
    const audio = document.getElementById(
      `${props.trackUniqueId}-${props.type}-audio`
    ) as HTMLAudioElement;

    const canvas = document.getElementById(
      `${props.trackUniqueId}-${props.type}-canvas`
    ) as HTMLCanvasElement;
    if (
      audio &&
      props.audio &&
      props.userId != window.room?.localParticipant?.participantInfo?.sid
    ) {
      try {
        props.audio?.attach(audio);
      } catch (e) {
        console.log(e, "error");
      }
    }
  }, [props.audio, props.trackUniqueId, props.type, props.userId]);

  const goToCenterStage = (e) => {
    if (
      permissions.change_horizontal_layout ||
      permissions.change_vertical_layout ||
      permissions.change_tile_layout
    ) {
      if (props.tileType != "device") {
        dispatch(setLayout(LAYOUT_TYPES.STAGE_LAYOUT));

        dispatch(
          setPopoverOpen({
            open: false,
            anchorEl: e.currentTarget,
            orientation: props.type == "tier2" ? "left" : "right",
            id: props.userId,
          })
        );

        dispatch(
          setCurrentActiveVideo({ video: "no video", userId: props.userId })
        );
        // if(props.track.source === "screen_share"){
        // dispatch(setcurrentActiveUserId(props.trackUniqueId));
        // }else{
        dispatch(setcurrentActiveUserId(props.trackUniqueId));
        // }
        dispatch(
          setCenterStageDevice({
            layout_change: true,
            enabled: false,
            url: "",
            id: "",
          })
        );
      } else {
        dispatch(setcurrentActiveUserId(props.track.id));

        dispatch(
          setCenterStageDevice({
            layout_change: true,
            enabled: true,
            url: props.track.url,
            id: props.track.id,
          })
        );
      }
    }
    // }
  };

  return (
    <>
      <div
        ref={b}
        id={`draggable_div_${props.type}_${props.trackUniqueId}`}
        onClick={(e) => {
          if (
            conference.directorMode.mode &&
            conference.directorMode.user_id == window.room?.myUserId()
          ) {
            window.eventChanel.publish({
              event: "layoutChanged",
              layout: "stage_layout",
              trackUniqueId: props.trackUniqueId,
            });
            goToCenterStage(e);
          } else {
            goToCenterStage(e);
          }
        }}
        onMouseEnter={() => {
          setHover(true);
          let container = document.getElementById(
            `draggable_div_${props.type}_${props.trackUniqueId}`
          );
          container.style.cursor = "pointer";
        }}
        onMouseLeave={() => {
          setHover(false);
          let container = document.getElementById(
            `draggable_div_${props.type}_${props.trackUniqueId}`
          );
          container.style.cursor = "default";
        }}
        style={{
          position: "relative",
          containerType: "inline-size",
        }}
      >
        <div
          style={{
            outline: HandRise.includes(props.userId) &&
                  props.track?.isDefaultVideoTrack() 
              ? `2px solid ${eventTheme?.button_color_0}`
              : "none",
            // @ts-ignore
            aspectRatio: 16 / 9,
            backgroundColor: eventTheme?.bg_color_2
              ? eventTheme?.bg_color_2
              : "rgba(20, 63, 99, 1)",
            borderRadius: "4px",
            position: "relative",
          }}
        >
          {/* <canvas id={`${props.trackUniqueId}-${props.type}-canvas`}></canvas> */}
          <div
            className={`no-select outer-ring-${
              props.track?.isDefaultVideoTrack() ? props.userId : ""
            }`}
            style={{
              // @ts-ignore
              "--ring-color": eventTheme?.button_color_0,
              "--ring-color-2": changeOpacity(eventTheme?.button_color_0, 0),
              "--ring-color-3": changeOpacity(eventTheme?.button_color_0, 0.5),
              "--ring-color-4": changeOpacity(eventTheme?.button_color_0, 1),
              width: "22%",
              height: "40%",
              borderRadius: "50%",
              backgroundColor: eventTheme?.dark_theme_color_3
                ? eventTheme?.dark_theme_color_3
                : "rgba(1, 34, 67, 1)",
              position: "absolute",
              top: "45%",
              right: "50%",
              transform: "translate(50%,-50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // border: "2px solid #008BCD",
            }}
          >
            <AvatarElem
              userShortName={shortNameCreator(
                props.user?.user_first_name,
                props.user?.user_last_name
              )}
              avatar={props.user?.avatar}
              view="horizontal"
              theme={eventTheme}
            />
          </div>
          <div
            className="no-select"
            style={{
              display: "flex",
              // Mannual layout Horizontal and Vertical
              marginTop: "auto", // 16:9 aspect vertical layout
              maxWidth: "280px",
              aspectRatio: 16 / 9,
              height: "30px",
              alignItems: "center",
              color: "#E1E7EA",
              fontFamily: "URW DIN REGULAR",
              position: "absolute",
              left: "10px",
              bottom: "10px",
              zIndex: "0",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                paddingLeft: "10px",
                alignItems: "center",
                justifyContent: "start",
                overflow: "hidden",
                backgroundColor: eventTheme?.dark_theme_color_3
                  ? eventTheme?.dark_theme_color_3
                  : "rgba(1, 34, 67, 1)",
                opacity: "0.9",
                borderBottomLeftRadius: "4px",
                borderBottomRightRadius: "4px",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
                height: "30px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "18px",
                  height: "18px",
                  minWidth: "18px",
                  minHeight: "18px",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: "10",
                  overflow: "hidden",
                }}
              >
                {props?.audio === "mute" ? (
                  <img alt="" src="/assets/icons/on_videos/muted_audio.svg" />
                ) : (
                  <img alt="" src="/assets/icons/on_videos/unmuted_audio.svg" />
                )}
              </div>
              <div
                style={{
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: props.tileType == "device" ? "225px" : "120px",
                  fontFamily: "URW DIN REGULAR",
                  fontSize: "14px",
                  fontSize: "clamp(10px, 3cqw, 14px)",
                }}
              >
                {props.user?.user_first_name} {props.user?.user_last_name}
              </div>

              <span
                style={{
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "90px",
                  fontSize: "12px",
                  fontSize: "clamp(10px, 3cqw, 12px)",
                  color: "#88A1AB",
                  fontFamily: "URW DIN REGULAR",
                  paddingRight: "10px",
                }}
              >
                {props.user?.is_organization_user ? "Owner" : props.user?.role}
              </span>
            </div>
          </div>

          {conference.directorMode.mode &&
            conference.directorMode.user_id === window.room?.myUserId() &&
            (conference.layout == "dynamic_layout_horizontal" ||
              conference.layout == "dynamic_layout_vertical") && (
              // conference.layout == "dynamic_grid_layout"
              <div
                style={{
                  position: "absolute",
                  display: is_hover ? "flex" : "none",
                  width: "30px",
                  height: "30px",
                  top: "10px",
                  left: "50px",
                  backgroundColor: true ? "#008BCD" : "#143F63",
                  borderRadius: "4px",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: "10",
                }}
                onMouseOver={mouseEnter}
                onMouseLeave={mouseLeave}
                className="drag_button"
              >
                <img
                  alt=""
                  draggable="false"
                  src="/assets/drag/up.svg"
                  className="drag-icon-up"
                />
                <img
                  alt=""
                  draggable="false"
                  src="/assets/drag/left.svg"
                  className="drag-icon-left"
                />
                <img
                  alt=""
                  draggable="false"
                  src="/assets/drag/right.svg"
                  className="drag-icon-right"
                />
                <img
                  alt=""
                  draggable="false"
                  src="/assets/drag/down.svg"
                  className="drag-icon-down"
                />
              </div>
            )}
          {HandRise.includes(props?.trackUniqueId) ? (
            <Box
              sx={{
                position: "absolute",
                top: "10px",
                left: "10px",
                backgroundColor: eventTheme?.button_color_0,
                width: "28px",
                height: "25px",
                borderRadius: "4px",
                zIndex: "99",
              }}
            >
              <PanToolIcon
                style={{
                  fontSize: "18px",
                  padding: "3px 0px 3px 3px",
                  color: "white",
                }}
              />
            </Box>
          ) : (
            <></>
          )}

          {props.track?.source == "screen_share"
            ? is_hover && (
                <div
                  style={{
                    position: "absolute",
                    display: "flex",
                    width: "30px",
                    height: "30px",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "rgb(230, 25, 89)",
                    borderRadius: "4px",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    zIndex: "10",
                  }}
                  onClick={(e) => {
                    // step 1 stop event propagation
                    e.stopPropagation();
                    // step 2 declare variable
                    let publish = false;
                    let event = "";
                    let id = "";
                    let trackId = "";
                    if (props.track?.source == "screen_share") {
                      event = "removeScreenShare";
                      id = props.userId;
                      publish = true;
                    } else if (props.track.customProperty?.type != "device") {
                      event = "removeDevice";
                      id = props.track.id;
                      publish = true;
                      let newDevices = [...devices];
                      newDevices = newDevices.filter(
                        (item) => item.id !== props.track.id
                      );
                      updateRoomConfig({ devices: newDevices });
                    } else if (props.track.customProperty?.type == "device") {
                      console.log("removeLocalDevice");
                      event = "removeLocalDevice";
                      id = props.userId;
                      trackId = props.track.sid;
                      publish = true;
                    }
                    // else {
                    //   window.room.localParticipant.unpublishTrack(props.track);
                    // }

                    if (publish) {
                      // @ts-ignore
                      window?.eventChanel?.publish({
                        event,
                        id,
                        trackId,
                      });
                    }
                  }}
                >
                  <img
                    alt=""
                    src="/assets/admin/close.svg"
                    style={{
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </div>
              )
            : is_hover &&
              props.userId !== window.room?.localParticipant.sid &&
              props.track?.source !== "screen_share" && (
                <Tooltip
                  title={
                    <div style={{ display: "flex", zIndex: 1 }}>
                      <span
                        style={{
                          margin: "4px",
                          fontFamily: "URW DIN REGULAR",
                          color: "black",
                          fontSize: "14px",
                          textTransform: "capitalize",
                        }}
                      >
                        <ThreeDotOverlay
                          trackUniqueId={props.trackUniqueId}
                          userId={props.userId}
                          is_hover={true}
                          setHoverMenu={setHover}
                          theme={eventTheme}
                          type={"horizontal"}
                          updateVolumeLocal={""}
                          tileType={props.type}
                          isDirector={
                            conference.directorMode.mode &&
                            conference.directorMode.user_id ===
                              window.room?.localParticipant.sid
                          }
                          viewerType="P"
                          track="no track"
                          audioTrack={props.audio}
                          dbuserId={props.user.user_id}
                        />
                      </span>
                    </div>
                  }
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: "transparent",
                      },
                    },
                  }}
                  placement="left-start"
                >
                  <div
                    style={{
                      position: "absolute",
                      display: "flex",
                      width: "30px",
                      height: "30px",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "#008BCD",
                      borderRadius: "4px",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      zIndex: "10",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <img
                      alt=""
                      src={
                        "/assets/icons/on_videos/three_dot" +
                        (true ? "_white" : "") +
                        ".svg"
                      }
                    />
                  </div>
                </Tooltip>
              )}

          <audio
            ref={audioElement}
            autoPlay
            id={`${props.trackUniqueId}-${props.type}-audio`}
            className={`${props.trackUniqueId}-audio`}
          />
        </div>
      </div>
    </>
  );
};
