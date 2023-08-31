import React, { useState } from "react";
import ElementMenu from "./element_menu";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import SubMenu from "./element_menu/sub_menu";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MoreMenu = ({ user, theme, tileType }) => {
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
      {/* <SubMenu
        label="Start system readiness check"
        onClick={() => {
          console.log("start readiness check");
        }}
        theme={theme}
      />

      <SubMenu
        label="Show spaces Menu"
        onClick={() => {
          console.log("Show spaces Menu");
        }}
        theme={theme}
      /> */}

      <SubMenu
        label="Show audio and video buttons"
        onClick={() => {
          console.log("Show audio and video buttons");
          window.room.sendCommandOnce("audio_video_button", {
            value: JSON.stringify({ type: "audio", userId: user.userId }),
          });
          handleClickToast(
            `${user?.firstName || ""} ${
              user?.lastName || ""
            } has been shown  audio and video buttons`
          );
        }}
        theme={theme}
      />

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

export default MoreMenu;
