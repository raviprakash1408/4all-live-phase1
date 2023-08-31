import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import { useSelector } from "react-redux";
import { AxiosLocal } from "../utilities/axiosUtils.ts";
import { changeOpacity } from "../utilities/common.js";

const LogoutPop = (props) => {
  const theme = useSelector((state) => state.theme.themeData);
  const logout = () => {
    var micDeviceId = localStorage.getObject("micDeviceId");
    var cameraDeviceId = localStorage.getObject("camDeviceId");
    var audioOutputDeviceId = localStorage.getObject("audioOutputDeviceId");
    localStorage.clear();

    localStorage.setObject("micDeviceId", micDeviceId);
    localStorage.setObject("camDeviceId", cameraDeviceId);
    localStorage.setObject("audioOutputDeviceId", audioOutputDeviceId);
    localStorage.setObject("islogin", 0);

    window.loginChannel?.unsubscribe();

    window.location.href = "/";
    console.log(localStorage, "logout");

    AxiosLocal.post("user/logout/", {}).then((response) => {
      console.log(response);
    });
  };
  return (
    <>
      <div
        style={{
          alignItems: "center",
          background: changeOpacity(theme?.waiting?.primaryColor, "0.6"),
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
        className="profile-popup"
      >
        <Box
          sx={{
            backgroundColor: theme.login.primaryColor,
          }}
          style={{
            border: "1px solid",
            borderColor: theme?.login?.secondaryColor,
            borderRadius: "4px",
            width: "475px",
            height: "320px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "25px",
              position: "relative",
              paddingBottom: "0px",
            }}
          >
            <img
              alt="logout"
              src={theme?.navbar?.infoIcon}
              style={{
                objectFit: "cover",
                padding: "10px 10px 5px 10px",
                width: "75px",
                height: "75px",
              }}
            />
          </div>

          <Typography
            variant="h5"
            style={{
              color: theme?.spaces?.secondaryColor,
              fontWeight: "700",
              textAlign: "center",
              padding: "18px 0px",
              fontFamily: "URW DIN",
              fontSize: "20px",
            }}
          >
            Are you sure you want to log out ?
          </Typography>

          <Stack spacing={1} sx={{ margin: "0px 44px 20px 44px" }}>
            <Button
              variant="contained"
              style={{
                textTransform: "none",

                fontSize: "16px",
                padding: "7px",
                lineHeight: "22px",
                backgroundColor: theme?.common?.color1,
              }}
              onClick={logout}
            >
              Submit
            </Button>
          </Stack>

          <Stack spacing={1} sx={{ margin: "0px 44px 20px 44px" }}>
            <Button
              variant="outlined"
              style={{
                textTransform: "none",

                fontSize: "16px",
                padding: "7px",
                lineHeight: "22px",
                color: theme?.common?.color1,
                borderColor: theme?.common?.color1,
              }}
              onClick={() => {
                props.setOpenlogout(false);
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </div>

      {/* {updateProfile && <UpdateProfile handleUpdateProfileClose={handleUpdateProfileClose} handleProfileClose={props.handleProfileClose}/>} */}
    </>
  );
};

export default LogoutPop;
