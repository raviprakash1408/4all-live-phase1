import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Webcam from "react-webcam";
import Preview from "./loby/preview.tsx";
import { changeOpacity } from "../utilities/common";
import { useLocation } from "react-router-dom";
import { AxiosLocal } from "../utilities/axiosUtils.ts";

const Settings = (props) => {
  const theme = useSelector((state) => state.theme.themeData);
  const location = useLocation();
  const [overrideTheme, setoverrideTheme] = useState(false);
  // const [theme, settheme] = useState(
  //   useSelector((state) => state.theme.themeData)
  // );
  // useEffect(() => {
  //   console.log(location.pathname, "useEffect");
  //   // check if the string contains lobby or not
  //   if (location.pathname.includes("lobby")) {
  //     let path = location.pathname.substring(
  //       location.pathname.lastIndexOf("/") + 1
  //     );
  //     AxiosLocal.get(`subroom/${path}`)
  //       .then(function (response) {
  //         console.log(response.data.data, "IndividualEventDataSettings");
  //         if (response.data.data.override_theme) {
  //           setoverrideTheme(true);
  //           if (localStorage.getObject("theme") === "dark") {
  //             settheme({ ...theme, ...response.data.data.dark_theme });
  //           } else {
  //             settheme({ ...theme, ...response.data.data.light_theme });
  //           }
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  // }, [useSelector((state) => state.theme.themeData)]);
  return (
    <div
      style={{
        alignItems: "center",
        background: changeOpacity(
          props.theme?.bg_color_1
            ? props.theme?.bg_color_1
            : theme?.settings?.bgColor,
          0.8
        ),
        bottom: "0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        left: "0px",
        position: "fixed",
        right: "0px",
        top: "0px",
        zIndex: "33",
      }}
      className="settings-bg"
    >
      <Box
        sx={{
          paddingBottom: "35px",
          position: "relative",
        }}
        style={{
          backgroundColor: props.theme?.bg_color_1,
        }}
        className="settings-container"
      >
        <div
          style={{
            position: "absolute",
            display: "flex",
            width: "20px",
            height: "20px",
            top: "-10px",
            right: "-10px",
            backgroundColor: "#88A1AB",
            borderRadius: "25px",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            props.closePopupHandler(false);
          }}
        >
          <img alt="" src="/assets/icons/x.svg" />
        </div>
        <Typography
          variant="h5"
          style={{
            color: props.theme?.font_color_0,
            fontWeight: "700",
            textAlign: "center",
            padding: "23px 0px 0px",
            fontFamily: "URW DIN",
          }}
        >
          Settings
        </Typography>
        <div
          style={{
            display: "flex",
            backgroundColor: "#002E56",
            justifyContent: "space-evenly",
          }}
        ></div>
        {/* <Grid container>
          <Grid item xs={6} md={6}> */}
        <Preview
          type="settings"
          theme={props.theme}
          closePopupHandler={props.closePopupHandler}
        />
        {/* </Grid>
        </Grid> */}
      </Box>
    </div>
  );
};

export default Settings;
