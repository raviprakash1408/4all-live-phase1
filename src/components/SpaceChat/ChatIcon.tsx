import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";

export default function ChatIcon({ toggleDrawer, chatOpen }) {
  return (
    <Box
      onClick={toggleDrawer(true)}
      sx={{
        height: 320,
        transform: "translateZ(0px)",
        flexGrow: 1,
        display: chatOpen ? "none" : "block",
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: "absolute",
          top: 700,
          right: 16,
          ".MuiSpeedDial-root": {
            backgroundColor: "rgb(0, 139, 205)",
          },
        }}
        FabProps={{
          sx: {
            bgcolor: "rgb(0, 139, 205)",
            "&:hover": {
              bgcolor: "rgb(0, 139, 205)",
            },
          },
        }}
        icon={<img src="/assets/bottomIcons/chat.svg" />}
      ></SpeedDial>
    </Box>
  );
}
