import React from "react";
import { Divider, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import TeamMenu from "./TeamMenu.tsx";
import { changeOpacity } from "../../../../utilities/common.js";
import { AxiosLocal } from "../../../../utilities/axiosUtils.ts";
import { createTeam } from "../../../../state/team/teamSlice.ts";
import { Scrollbars } from "react-custom-scrollbars";
import CustomTooltip from "../../../CustomTooltip.js";
import { useNavigate } from "react-router-dom";

const SwitchTeam = ({ themes, openSidebar }) => {
  const [hover, sethover] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hoverGotoTeams, sethoverGotoTeams] = React.useState(false);
  const [openPopup, setopenPopup] = React.useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const teams = useSelector((state) => state.Team.teams);

  // const isMyTeam = useSelector((state) => state.Team.isMyTeam);
  // console.log(isMyTeam, "isMyTeamisMyTeam");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // React.useEffect(() => {
  //   // if isMyTeam is not empty
  // if(Object.keys(isMyTeam).length != 0){
  //   localStorage.setObject("organization", isMyTeam.company_name);

  //   localStorage.setObject("team_slug", isMyTeam.slug);
  //   localStorage.setObject("organizationId", isMyTeam.id);
  //   localStorage.setObject("organization_user_email", isMyTeam.email);
  //   localStorage.setObject(
  //     "is_organization_user",
  //     isMyTeam.is_organization_user
  //   );}
  // }, [isMyTeam])

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <div
        onMouseEnter={() => sethover(true)}
        onMouseLeave={() => sethover(false)}
        // aria-describedby={id}
        // variant="contained"
        // onClick={() => {
        //   setopenPopup(true);
        // }}
        style={{ cursor: "pointer", marginTop: "6vh" }}
      >
        {openSidebar ? (
          <div
            style={{
              display: "flex",
              backgroundColor: hover
                ? themes?.common?.color1
                : themes?.sidebar?.buttonColor,
              cursor: "pointer",
            }}
          >
            {localStorage.getObject("organization_logo") == "" ||
              localStorage.getObject("organization_logo") == "null" ? (
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  margin: "10px 19px 10px",
                  backgroundColor: themes?.spaces?.sidebaricon,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textTransform: "uppercase",
                  flexShrink: "0",
                  borderRadius: "4px",
                }}
              >
                <span
                  style={{
                    // paddingTop: "10px",
                    textAlign: "center",
                    // display: "block",
                    color: "#70A6A6",
                    fontSize: "20px",
                  }}
                >
                  {localStorage.getObject("organization")[0]}
                </span>
              </div>
            ) : (
              <img
                alt=""
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "4px",
                  margin: "10px 19px 10px",
                  objectFit: "cover",
                }}
                src={
                  // "https://pub-d6edaebcd6474ac499bdcb399e4e121c.r2.dev/0eec5b8b-108d-4c66-afe7-ec06615cf611.png"
                  localStorage.getObject("organization_logo")
                }
              />
            )}

            <div>
              <p
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontFamily: "URW DIN REGULAR",
                  fontWeight: 600,
                  marginBottom: "2px",
                  // marginTop: "10px",
                }}
              >
                {localStorage.getObject("organization")}
              </p>
              {/* <CustomTooltip text="Switch Team" placement="top-end">
                <div
                  style={{
                    display: "flex",
                    backgroundColor: hover
                      ? "white"
                      : themes?.spaces?.sidebaricon,
                    borderRadius: "52px",
                  }}
                >
                  <p
                    style={{
                      color: hover ? themes?.common?.color1 : "#88A1AB",
                      fontSize: "14px",
                      fontFamily: "URW DIN REGULAR",
                      margin: "5px 12px",
                    }}
                  >
                    Switch team
                  </p>
                  <img
                    alt=""
                    src="/assets/admin/arrow-icon.svg"
                    style={{
                      marginRight: "10px",
                      filter:
                        "brightness(0) saturate(100%) invert(59%) sepia(32%) saturate(2900%) hue-rotate(131deg) brightness(98%) contrast(101%)",
                    }}
                  />
                </div>
              </CustomTooltip> */}
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: "10px 10px 5px",
              position: "relative",
              backgroundColor: hover
                ? themes?.common?.color1
                : themes?.sidebar?.buttonColor,
            }}
          >
            {localStorage.getObject("organization_logo") == "" ||
              localStorage.getObject("organization_logo") == "null" ? (
              <div
                style={{
                  width: "50px",
                  height: "50px",

                  backgroundColor: themes?.spaces?.sidebaricon,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textTransform: "uppercase",
                  flexShrink: "0",
                  borderRadius: "4px",
                }}
              >
                <span
                  style={{
                    // paddingTop: "10px",
                    textAlign: "center",
                    // display: "block",
                    color: "#70A6A6",
                    fontSize: "20px",
                  }}
                >
                  {localStorage.getObject("organization")[0]}
                </span>
              </div>
            ) : (
              <img
                alt=""
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "4px",
                  objectFit: "cover",
                }}
                src={
                  // "https://pub-d6edaebcd6474ac499bdcb399e4e121c.r2.dev/0eec5b8b-108d-4c66-afe7-ec06615cf611.png"
                  localStorage.getObject("organization_logo")
                }
              />
            )}
            {/* <CustomTooltip text="Switch Team" placement="top-end">
              <div
                style={{
                  position: "absolute",
                  width: "24px",
                  height: "24px",
                  backgroundColor: hover ? "white" : themes?.common?.color1,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bottom: "5px",
                  right: "5px",
                  cursor: "pointer",
                }}
              >
                <img
                  alt=""
                  style={{
                    filter: hover
                      ? "brightness(0) saturate(100%) invert(59%) sepia(32%) saturate(2900%) hue-rotate(131deg) brightness(98%) contrast(101%)"
                      : "",
                    width: "15px",
                  }}
                  src="/assets/admin/arrow-icon-white.svg"
                />
              </div>
            </CustomTooltip> */}
          </div>
        )}
      </div>

      {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPopover-paper": {
            backgroundColor: themes?.spaces?.sidebaricon, // Replace with your desired background color
            minWidth: "380px",
            boxShadow: "none",
          },
          backgroundColor: changeOpacity(themes?.editspace?.outerbgcolor, 0.9),
        }}
      > */}
      {openPopup && (
        <div
          style={{
            alignItems: "center",
            background: changeOpacity(themes?.editspace?.outerbgcolor, 0.9),
            bottom: "0px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            left: "0px",
            position: "fixed",
            right: "0px",
            top: "0px",
            zIndex: "22",
          }}
          className="editEvent"
        >
          <Box
            sx={{
              position: "relative",
              background: themes?.editspace?.mainbgcolor,
              borderRadius: "4px",
              width: "380px",
              // minHeight: "665px",
            }}
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
                setopenPopup(false);
              }}
            >
              <img alt="" src="/assets/icons/x.svg" />
            </div>
            <Typography
              sx={{
                color: themes?.spaces?.secondaryColor,
                fontWeight: "600",
                textAlign: "center",
                padding: "25px 0px 20px",
                fontSize: "20px",
                fontFamily: "URW DIN",
                margin: "0px",
              }}
            >
              Teams
            </Typography>
            {/* <Divider
          orientation="horizontal"
          style={{
            backgroundColor: themes?.addSpace?.dividercolor,

            height: "2px",
          }}
        /> */}
            <Divider
              variant="fullWidth"
              style={{
                borderColor: themes?.addSpace?.dividercolor,
                margin: "0px 25px",
              }}
            />
            <Typography
              sx={{
                color: "#88A1AB",
                textAlign: "center",
                padding: "15px 0px 0px",
                fontSize: "16px",
                fontFamily: "URW DIN REGULAR",
                margin: "0px",
              }}
            >
              Teams you are part of.
            </Typography>
            <Typography
              sx={{
                color: "#88A1AB",
                textAlign: "center",
                fontSize: "16px",
                paddingBottom: "15px",
                fontFamily: "URW DIN REGULAR",
                margin: "0px",
              }}
            >
              Please select to switch team
            </Typography>

            <Scrollbars
              style={{
                width: "100%",
                height: "40vh",
              }}
            >
              <div style={{ margin: "0px 25px" }}>
                {teams.length > 0 &&
                  teams[0].teamName != "" &&
                  teams
                    .filter((item) => item.teamName != "")
                    .sort((a, b) => {
                      return b.is_my_team - a.is_my_team;
                    })
                    .map((team) => <TeamMenu theme={themes} team={team} />)}
                {/* <TeamMenu theme={themes} />
              <TeamMenu theme={themes} /> */}
              </div>
            </Scrollbars>
            <div
              style={{
                margin: "30px 0px",
                width: "160px",
                textAlign: "center",
                marginLeft: "auto",
                borderRadius: "4px",
                marginRight: "auto",
                padding: "12px 9px",
                color: hoverGotoTeams
                  ? themes?.navbar?.primaryColor
                  : "#70A6A6",
                fontSize: "16px",
                fontFamily: "URW DIN REGULAR",
                backgroundColor: hoverGotoTeams
                  ? "#70A6A6"
                  : themes?.table?.bgColor,
                cursor: "pointer",
              }}
              onMouseEnter={() => sethoverGotoTeams(true)}
              onMouseLeave={() => sethoverGotoTeams(false)}
              onClick={() => {
                navigate("/admin/team/");
                setopenPopup(false);
              }}
            >
              Go to teams
            </div>
          </Box>
        </div>
      )}

      {/* </Popover> */}
    </div>
  );
};

export default SwitchTeam;
