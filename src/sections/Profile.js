import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Divider, Grid } from "@mui/material";
import { CloseOutlined } from "@ant-design/icons";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import { AxiosLocal } from "../utilities/axiosUtils.ts";
import moment from "moment";

const Profile = (props) => {
  const theme = useSelector((state) => state.theme.themeData);

  const [updateProfile, setUpdateProfile] = React.useState(false);
  const handleUpdateProfile = () => {
    setUpdateProfile(true);
  };
  const handleUpdateProfileClose = () => {
    setUpdateProfile(false);
  };
  const [user, setUser] = useState({});

  const [updatedtime, setupdatedtime] = useState("");

  useEffect(() => {
    userProfile();
    //   setInterval(() => {

    // }, 1000);
  }, []);

  const userProfile = () => {
    AxiosLocal.get("user/loggedin/").then((response) => {
      setUser(response.data.data);
      console.log(response.data.data, "responseresponse");

      setupdatedtime(response.data.data.updated);
    });
  };
  const updatedfromnow = moment({ updatedtime }).fromNow();
  // console.log(updatedfromnow, "updatedfromnow")
  return (
    <>
      <div
        style={{
          alignItems: "center",
          background: theme?.waiting?.primaryColor,
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
            position: "relative",
          }}
          className="profile-box"
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* src={localStorage.getObject("avatar")} */}
            <img
              alt=""
              src={"/assets/images/blank_profile.jpeg"}
              style={{
                width: "52px",
                height: "54px",
                borderRadius: "50%",
                objectFit: "cover",
                padding: "10px",
              }}
            />
            <p className="header-profile-name">
              {user.first_name} {user.last_name} <br />
              <span style={{ fontSize: "14px" }}>Voluptatem natus</span>
            </p>
            <div
              style={{
                position: "absolute",
                top: "30px",
                right: "28px",

                cursor: "pointer",
              }}
            >
              <img alt="" src="/assets/icons/3dots.svg" />
            </div>
            <div
              onClick={props.handleProfileClose}
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
                zIndex: 999,
              }}
            >
              <img alt="" src="/assets/icons/x.svg" />
            </div>
            {/* <div style={{
    borderRadius: '50%',
    color: theme?.profile?.mainColor,
    marginTop:'-80px',
    marginLeft:'1px',
    width:'25px',
    height:'25px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
    }} className='close-button' onClick={props.handleProfileClose}>
     <CloseOutlined />
    </div> */}
          </div>
          <Divider
            variant="fullWidth"
            style={{ borderColor: theme?.login?.secondaryColor }}
          />
          <Box
            style={{
              border: "1px solid",
              borderColor: theme?.login?.secondaryColor,
              borderRadius: "0px 4px 4px 0px",
              margin: "20px",
            }}
            className="innerbox"
          >
            <p
              style={{
                fontSize: "14px",
                color: theme?.profile?.mainColor,
                padding: "0px 20px",
              }}
            >
              {user.description}
            </p>
            <Grid container style={{ padding: "0px 20px" }} spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    alt=""
                    style={{ width: "18px", height: "18px" }}
                    src="/assets/icons/msg.svg"
                  />
                  <p
                    style={{
                      paddingLeft: "10px",
                      paddingTop: "5px",
                      color: theme?.profile?.mainColor,
                      fontSize: "14px",
                    }}
                  >
                    {user.email}
                  </p>
                </div>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    alt=""
                    style={{ width: "18px", height: "18px" }}
                    src="/assets/icons/location.svg"
                  />
                  <p
                    style={{
                      paddingLeft: "10px",
                      paddingTop: "5px",
                      color: theme?.profile?.mainColor,
                      fontSize: "14px",
                    }}
                  >
                    {" "}
                    {user.city}
                  </p>
                </div>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    alt=""
                    style={{ width: "18px", height: "18px" }}
                    src="/assets/icons/call.svg"
                  />
                  <p
                    style={{
                      paddingLeft: "10px",
                      color: theme?.profile?.mainColor,
                      fontSize: "14px",
                    }}
                  >
                    {user.phone}
                  </p>
                </div>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    alt=""
                    style={{ width: "18px", height: "18px" }}
                    src="/assets/icons/link.svg"
                  />
                  <p
                    style={{
                      paddingLeft: "10px",
                      color: theme?.login?.mainColor,
                      fontSize: "14px",
                    }}
                  >
                    https://effie.en
                  </p>
                </div>
              </Grid>
            </Grid>
            <div
              style={{
                display: "flex",
                margin: "32px 0px",
                justifyContent: "space-around",
              }}
            >
              <p
                style={{
                  paddingLeft: "10px",
                  color: theme?.profile?.mainColor,
                  fontSize: "14px",
                }}
              >
                Updated in {updatedfromnow}
              </p>
              <Button
                variant="contained"
                style={{
                  textTransform: "none",
                  padding: "9px 16px",
                  fontSize: "14px",
                  color: theme?.login?.mainColor,
                  backgroundColor: theme?.navbar?.primaryColor,
                  border: "1px solid",
                }}
                onClick={handleUpdateProfile}
              >
                Update Profile
              </Button>
            </div>
          </Box>
        </Box>
      </div>

      {updateProfile && (
        <UpdateProfile
          handleUpdateProfileClose={handleUpdateProfileClose}
          handleProfileClose={props.handleProfileClose}
          user={user}
        />
      )}
    </>
  );
};

export default Profile;
