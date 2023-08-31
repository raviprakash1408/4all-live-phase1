import React, { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CHANNEL_TYPES,
  subscribeCentrifugoChannel,
} from "../../utilities/centrifugoUtils.ts";

const AdminPanel = () => {
  const theme = useSelector((state) => state.theme.themeData);
  useEffect(() => {
    document.title = theme?.login?.title;
    // subscribeCentrifugoChannel(CHANNEL_TYPES.TEAM);
    // console.log("subscribedomain");
  }, []);
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = theme?.login?.favicon32x32;
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
        
        }}
      >
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 2, backgroundColor: theme?.table?.mainBg }}
        >
          {/* width: { sm: `calc(100% - 250px)` },  */}
          <Header />
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default AdminPanel;
