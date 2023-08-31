import React, { useState } from "react";
import { useSelector } from "react-redux";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import SubMenu from "../element_menu/sub_menu";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AudioAndVideoElement = ({
  user,
  theme,
  tileType,
  track,
  userId,
  audioTrack,
}) => {
  const local = useSelector((state) => state.local);
  const [openToast, setOpenToast] = useState(false);
  const [toastData, settoastData] = useState("");
  const permissions = useSelector((state) => state.permissions);

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
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        gap: "1px",
        padding: "10px 5px",
        top: "0px",
        // left: "calc(100% - 15px)",
        left:
          tileType == "tier2" || tileType == "tier" ? "" : "calc(100% - 15px)",
        right: tileType == "tier2" || tileType == "tier" ? "198px" : "",
        backgroundColor: theme?.bg_color_1,
        border: "2px solid",
        borderColor: theme?.bg_color_1,
        borderRadius: "4px",
      }}
    >
      {!audioTrack?.isMuted
        ? permissions.mute_audio && (
            <SubMenu
              icon="/assets/three_dot_overlay_icons/mic-muted.svg"
              label="Mute audio"
              onClick={() => {
                console.log("Mute Audio");
                window.eventChanel.publish({
                  event: "muteAudio",
                  userId: userId,
                });
                handleClickToast(
                  `${user?.firstName || ""} ${
                    user?.lastName || ""
                  } audio will  be muted`
                );
              }}
              theme={theme}
            />
          )
        : permissions.request_unmute_audio && (
            <SubMenu
              icon="/assets/three_dot_overlay_icons/mic_request.svg"
              label="Request unmute audio"
              onClick={() => {
                console.log("Request unmute audio");
                window.eventChanel.publish({
                  event: "Request UnmuteAudio",
                  userId: userId,
                });
                handleClickToast(
                  `${user?.firstName || ""} ${
                    user?.lastName || ""
                  } has been requested to unmute their audio `
                );
              }}
              theme={theme}
            />
          )}
      {!track?.isMuted
        ? permissions.mute_video && (
            <SubMenu
              icon="/assets/three_dot_overlay_icons/video_mute.svg"
              label="Mute video"
              onClick={() => {
                // window.room.sendCommandOnce("muteTrack", {
                //   value: JSON.stringify({ type: "video", userId: user.userId }),
                // });
                window.eventChanel.publish({
                  event: "muteVideo",
                  userId: userId,
                });
                handleClickToast(
                  `${user?.firstName || ""} ${
                    user?.lastName || ""
                  } video will  be muted`
                );
              }}
              theme={theme}
            />
          )
        : permissions.request_unmute_video && (
            <SubMenu
              icon="/assets/three_dot_overlay_icons/video_request.svg"
              label="Request unmute video"
              onClick={() => {
                console.log("Request unmute video");

                window.eventChanel.publish({
                  event: "Request UnmuteVideo",
                  userId: userId,
                });
                handleClickToast(
                  `${user?.firstName || ""} ${
                    user?.lastName || ""
                  } has been requested to unmute their video `
                );
              }}
              theme={theme}
            />
          )}

      <Snackbar
        open={openToast}
        autoHideDuration={2000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity="info"
          sx={{ width: "100%" }}
        >
          {toastData}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AudioAndVideoElement;
