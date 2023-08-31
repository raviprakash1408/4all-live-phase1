import React, { useState, useEffect, useRef, Suspense } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NestedList from "./nestedList";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Badge } from "@mui/material";
import { setTheme } from "../utilities/theme";
import { MaterialUISwitch } from "./muiSwitch";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Profile from "../sections/Profile";
import { Link, useNavigate } from "react-router-dom";
import ContactUs from "../sections/ContactUs";
import LogoutPop from "../sections/Logout";
import PopUp from "./endCall";
import Settings from "./Settings";
import { setScreenSharing } from "../state/local/localSlice";
import { AssignedSpacesDropdown } from "./assignedSpacesDropdown.tsx";
import { shortNameCreator } from "../utilities/shortName";
import CustomAvatarGroup from "../admin/CustomAvatarGroup";
import { useLocation } from "react-router-dom";
import { AxiosLocal } from "../utilities/axiosUtils.ts";
import { HiddenUserStrip } from "./hiddenUserStrip/index.tsx";
import {
  setEventDark,
  setEventLight,
  setThemeInitial,
  setEventThemeInitial,
} from "../state/theme/themeSlice";
import PanToolIcon from "@mui/icons-material/PanTool";
import {
  hexToCssFilter,
  organizationUser,
  userLogout,
} from "../utilities/common";
import CustomTooltip from "../admin/CustomTooltip";
import { usePopUpWindow } from "./popupWindow/index.tsx";
import NewWindow from "react-new-window";
import Toast from "../sections/Toast";

export default function ButtonAppBar() {
  let hideHeader = useSelector((state) => state.conference.hideHeader);

  const profile = useSelector((state) => state.userProfile);
  const permissions = useSelector((state) => state.permissions);

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const location = useLocation();

  //const [userName, setuserName] = useState(localStorage.getObject('username'));
  const [userName, setuserName] = useState("Charlie Collier"); // User name mockup
  const [contactPopup, setContactPopup] = useState(false);
  const [settingsPopup, setsettingsPopup] = useState(false);

  const [message, setMessage] = useState("");
  const [openerrorToast, setOpenerrorToast] = useState(false);

  const { openNewWindow } = usePopUpWindow(<HiddenUserStrip />);

  const [fullName, setfullName] = useState(
    localStorage.getObject("username") +
    " " +
    localStorage.getObject("last_name")
  );
  let shortname = shortNameCreator(
    localStorage.getObject("username"),
    localStorage.getObject("last_name")
  );
  const [profileImg, setprofileImg] = useState(
    localStorage.getObject("avatar") == "null"
      ? null
      : localStorage.getObject("avatar")
  );
  const local = useSelector((state) => state.local);

  const [openEndDialoge, setopenEndDialoge] = React.useState(false);
  // reloadto
  const [reloadto, setreloadto] = React.useState("/spaces/");
  const handleClickOpen = (to = "/spaces/") => {
    setreloadto(to);
    setopenEndDialoge(true);
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  useEffect(() => {
    if (profile.avatar) {
      setprofileImg(profile.avatar);
    }
  }, [profile.avatar]);

  // before unload event inside useEffect

  const [overrideTheme, setoverrideTheme] = useState(false);
  // const [theme, settheme] = useState(
  //   useSelector((state) => state.theme.themeData)
  // );

  // function for removing hyphen from string and made first letter capital
  const removeHyphenAndCapitalize = (str) => {
    return str.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const theme = useSelector(
    (state) => state.theme.eventTheme[state.theme.theme]
  );
  const themes = useSelector((state) => state.theme.themeData);

  let conference = useSelector((state) => state.conference);
  const [subscribedToCentrifugo, setsubscribedToCentrifugo] = useState(false);

  useEffect(() => {
    window.addEventListener("storage", (e) => {
      if (e.target.localStorage?.islogin === '0') {
        userLogout();
        localStorage.setObject("islogin", 'No');
        window.location.href = "/";
      }
    });
  }, []);

  useEffect(() => {
    // check if the string contains lobby or not
    if (
      location.pathname.includes("lobby") ||
      location.pathname.includes("eventsfox")
    ) {
      let path = location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1
      );
      document.title = `${themes?.login?.title} | ${path}`;
      const favicon = document.querySelector('link[rel="icon"]');
      favicon.href = themes?.login?.favicon32x32;
      if (Object.keys(local.currentSubspace).length !== 0) {
        path = local.currentSubspace.slug;
      }
      AxiosLocal.get(`subroom/${path}`)
        .then(function (response) {
          // if (response.data.data.override_theme) {
          //   setoverrideTheme(true);
          //   if (localStorage.getObject("theme") === "dark") {
          //     settheme({ ...theme, ...response.data.data.dark_theme });
          //   } else {
          //     settheme({ ...theme, ...response.data.data.light_theme });
          //   }
          // }
          let data = response.data.data;
          if (response.data.data.override_theme) {
            if (localStorage.getObject("theme") === "dark") {
              dispatch(setEventDark({ ...data.dark_theme }));
            } else {
              dispatch(setEventLight({ ...data.light_theme }));
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("unmountingAppBar");
      dispatch(setEventThemeInitial());
    }
    return () => {
      // setoverrideTheme(false);
      console.log("unmounting");
    };
  }, [location.pathname, useSelector((state) => state.theme.themeData)]);

  // useEffect(() => {
  try {
    window.eventChanel.on("publication", function async(ctx) {
      // if (ctx.data.type === "light_theme" || ctx.data.type === "dark_theme") {
      //   if (localStorage.getObject("theme") === "dark") {
      //     settheme({ ...theme, ...ctx.data.dark_theme });
      //   } else {
      //     settheme({ ...theme, ...ctx.data.light_theme });
      //   }
      // }

      if (ctx.data.type === "light_theme" || ctx.data.type === "dark_theme") {
        if (localStorage.getObject("theme") === "dark") {
          dispatch(setEventDark({ ...ctx.data.dark_theme }));
        } else {
          dispatch(setEventLight({ ...ctx.data.light_theme }));
        }
      }
    });
  } catch (error) {
    // console.log("aaaa");
  }
  // }, []);

  useEffect(() => {
    try {
      window.loginChannel.on("publication", function (ctx) {
        switch (ctx.data.type) {
          case "user_name_edited":
            if (ctx.data.user_id === localStorage.getObject("id")) {
              setfullName(ctx.data.first_name + " " + ctx.data.last_name);
              setprofileImg(ctx.data.avatar);
            }
            break;
          case "workflow_changed":
            setOpenerrorToast(true);
            setMessage("Team workflow changed, so this page will be reloaded.");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
            break;
          case "user_remove":
            console.log("user_remove", ctx.data);
            console.log("user_remove", ctx.data.user_ids[0]);
            if (ctx.data?.user_ids[0] === localStorage.getObject("id")) {
              userLogout();
              window.location.href = "/";
            }
            break;

          default:
            console.log("aaa");
        }
      });
    } catch (error) {
      // console.log("aaaa");
    }
  }, []);

  // useEffect(()=>{
  //   AxiosLocal.get('user/loggedin/',{
  //     headers : {
  //       'Authorization': 'Bearer ' + localStorage.getObject('accessToken')
  //     }
  //   })
  //   .then(function (response) {
  //     console.log(response.data.data,"localStorage");
  //     setuserData(response.data.data)
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // },[])

  // console.log(localStorage.getObject('accessToken'),userData);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }
  const [openProfile, setOpenProfile] = React.useState(false);
  const handleProfile = () => {
    setOpenProfile(true);
  };
  const handleProfileClose = () => {
    setOpenProfile(false);
  };

  // const [openSupport, setOpenSupport] = React.useState(false);
  // const handleSupport = () => {
  //   setOpenSupport(true)
  // }
  // const handleSupportClose = () => {
  //   setOpenSupport(false)
  // }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const dispatch = useDispatch();
  // useSelector to get the theme from the store
  // const theme = useSelector((state) => state.theme.themeData);
  const style = useSelector((state) => state.theme.theme);
  //logout

  const [openlogout, setOpenlogout] = useState(false);

  // open hiddenUser
  const [openHiddenUsers, setOpenHiddenUsers] = useState(false);
  //  controlpanel state
  const [controlpanel, setControlpanel] = useState(null);

  // console.log(theme,'theme');
  // get user from redux
  // const loggedIn = useSelector(state => state.user.loggedIn)
  useEffect(
    () => {
      let beforeunload = (e) => {
        console.log("beforeunload");
        // controlpanel.current.close();

        if (controlpanel) {
          controlpanel.close();
        }
      };
      window.addEventListener("beforeunload", beforeunload);

      return () => {
        console.log("beforeunload", "after unload");

        window.removeEventListener("beforeunload", beforeunload);
      };
    },

    // eslint-disable-next-line
    [controlpanel]
  );
  const videoTracks = useSelector(
    (state) => state.conference.remoteVideoStreams
  );

  const hiddenUsers = () => {
    let hiddenUsersList = Object.keys(videoTracks).reduce(function (
      filtered,
      key
    ) {
      //@ts-ignore
      let properties = window.room?.getParticipantById(key)?._properties;

      let user_type = properties?.user_type;

      if (!["P", "S"].includes(user_type)) {
        filtered.push(properties?.userId);
      }
      return filtered;
    },
      []);

    // check iam hidden
    // push to hiddenUsersList

    if (window.room?.getLocalParticipantProperty("user_type") == "V") {
      hiddenUsersList.push(window.room?.getLocalParticipantProperty("userId"));
    }

    return hiddenUsersList;
  };
  // loggedIn is true
  const loggedIn = true;

  const user = useSelector((state) => state.user.user);

  // if user is logged in, show the user else login button
  const userButton = loggedIn ? (
    <Box
      mx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "justify-between",
      }}
      className="header-left"
    >
      {/* <Badge
        className="header-bell-icon"
        style={{
          backgroundColor: theme?.spaces?.primaryColor,
          padding: "12px 12px",
          borderRadius: "4px",
          marginRight: "7px",
        }}
        badgeContent={
          <Box
            sx={{
              backgroundColor: "#008BCD",
              borderRadius: "50%",
              height: "20px",
              width: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              marginRight: "22px",
            }}
          >
            <Typography variant="h7">9</Typography>
          </Box>
        }
      >
        <img alt="bell" src="/assets/images/bell.svg" />
      </Badge> */}

      {/* <Button color='inherit'>{user.name}</Button> */}
      {/* <Avatar sx={{
      marginLeft: '5vw',
      width: '30px',
      height: '30px',
    }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}

      <div style={{ position: "relative" }}>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{
            backgroundColor: theme?.bg_color_1,
            padding: "0px 30px 0px 12px",
            borderRadius: "4px",
            height: "42px",
            minWidth: "174px",
            justifyContent: "normal",
          }}
        >
          <CustomAvatarGroup
            avatar={profileImg}
            item={shortname}
            type="header"
            theme={theme}
          />
          {/* {shortname ?
          <div
            style={{
              backgroundColor: "#002E56",
              textAlign: "center",
              verticalAlign: "middle",
              lineHeight: "36px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              color: "#88A1AB",
            }}
          >
            {shortname}
          </div>
          :
          <img alt="" src={profileImg} />
          } */}
          <p
            className="header-profile-name"
            style={{
              textTransform: "none",
              marginLeft: "18px",
              color: theme?.font_color_0 ? theme?.font_color_0 : "#88A1AB",
            }}
          >
            {/* {localStorage.getObject("username")
              ? localStorage.getObject("username") +
                " " +
                localStorage.getObject("last_name")
              : userName} */}
            {fullName ? fullName : userName}
          </p>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          style={{ zIndex: "6" }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper
                style={{
                  width: "174px",
                  backgroundColor: theme?.bg_color_1,
                  color: theme?.font_color_0 ? theme?.font_color_0 : "#88A1AB",
                  borderTopRightRadius: "0px",
                  borderTopLeftRadius: "0px",
                  borderTop: "1px solid",
                  borderTopColor: theme?.bg_color_4,
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {/* <Link
                      to="/admin/account"
                      style={{ textDecoration: "none", color: "#88A1AB" }}
                    > */}
                    {(localStorage.getObject("guestUser") === "false" && localStorage.getObject("is_email_verified") === "true") || (localStorage.getObject("is_organization_user") === "true" && localStorage.getObject('organization_slug') === "eventsfox") ? (
                      <MenuItem
                        onClick={() => {
                          if (window.room) {
                            try {
                              handleClickOpen("/admin/account");
                            } catch (error) {
                              console.log("error", error);
                              navigate(`/admin/account`);
                            }
                          } else {
                            navigate(`/admin/account`);
                          }
                        }}
                        style={{ margin: "7px 0px" }}
                      >
                        <img
                          alt=""
                          src="/assets/icons/profile-icon.svg"
                          style={{ paddingLeft: "8px", color: "red" }}
                        />
                        <span style={{ paddingLeft: "19px", fontSize: "14px" }}>
                          Profile
                        </span>
                      </MenuItem>
                    ) : (
                      <></>
                    )}
                    {/* </Link> */}
                    {localStorage.getObject("guestUser") == "false" && (
                      // <Link
                      //   to="/spaces"
                      //   style={{ textDecoration: "none", color: "#88A1AB" }}
                      // >
                      <MenuItem
                        onClick={() => {
                          if (window.room) {
                            try {
                              handleClickOpen();
                            } catch (error) {
                              console.log("error", error);
                              navigate(`/spaces/`);
                            }
                          } else {
                            navigate(`/spaces/`);
                          }
                        }}
                        style={{ margin: "7px 0px" }}
                      >
                        <img
                          alt=""
                          src="/assets/icons/spaces-icon.svg"
                          style={{
                            paddingLeft: "8px",
                          }}
                        />
                        <span style={{ paddingLeft: "19px", fontSize: "14px" }}>
                          Spaces
                        </span>
                      </MenuItem>
                      // </Link>
                    )}
                    {(localStorage.getObject("guestUser") === "false" && localStorage.getObject("is_email_verified") === "true") || (localStorage.getObject("is_organization_user") === "true" && localStorage.getObject('organization_slug') === "eventsfox") ? (
                      <>
                        <MenuItem
                          onClick={() => {
                            if (window.room) {
                              try {
                                // window.open("/admin/spaces", "_blank");
                                openInNewTab("/admin/spaces");
                                // handleClickOpen("/admin/spaces");
                              } catch (error) {
                                console.log("error", error);
                                navigate(`/admin/spaces`);
                              }
                            } else {
                              navigate(`/admin/spaces`);
                            }
                          }}
                          style={{ margin: "7px 0px" }}
                        >
                          <img
                            src="/assets/icons/dashboard.svg"
                            style={{ paddingLeft: "8px" }}
                            alt=""
                          />
                          <span
                            style={{ paddingLeft: "19px", fontSize: "14px" }}
                          >
                            Dashboard
                          </span>{" "}
                        </MenuItem>
                      </>
                    ) : (
                      <></>
                    )}

                    <MenuItem style={{ margin: "7px 0px" }}>
                      <img
                        src="/assets/icons/theme.svg"
                        style={{ paddingLeft: "8px" }}
                        alt=""
                      />
                      <span style={{ paddingLeft: "19px", fontSize: "14px" }}>
                        Theme
                      </span>
                      <MaterialUISwitch
                        sx={{ ml: 3 }}
                        onChange={() => {
                          if (style === "dark") {
                            setTheme("light", dispatch);
                          } else {
                            setTheme("dark", dispatch);
                          }
                        }}
                        checked={
                          localStorage.getObject("theme") === "dark"
                            ? true
                            : false
                        }
                      />
                    </MenuItem>

                    {/* {localStorage.getObject("guestUser") == "false" && (
                      <MenuItem
                        onClick={() => {
                          setsettingsPopup(true);
                          handleClose();
                        }}
                        style={{ margin: "7px 0px" }}
                      >
                        <img
                          src="/assets/icons/settings.svg"
                          style={{ paddingLeft: "8px" }}
                          alt=""
                        />
                        <span style={{ paddingLeft: "19px", fontSize: "14px" }}>
                          Settings
                        </span>{" "}
                      </MenuItem>
                    )} */}
                    <MenuItem
                      onClick={() => {
                        setContactPopup(true);

                        handleClose();
                      }}
                      style={{ margin: "7px 0px" }}
                    >
                      <img
                        src="/assets/icons/support.svg"
                        style={{ paddingLeft: "8px" }}
                        alt=""
                      />
                      <span style={{ paddingLeft: "19px", fontSize: "14px" }}>
                        Support
                      </span>{" "}
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        setOpenlogout(true);
                      }}
                      style={{ margin: "7px 0px" }}
                    >
                      <img
                        src="/assets/icons/logout.svg"
                        style={{ paddingLeft: "8px" }}
                        alt=""
                      />
                      <span style={{ paddingLeft: "19px", fontSize: "14px" }}>
                        Logout
                      </span>{" "}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        {(organizationUser(permissions.control_panel) &&
          window.location.href.indexOf("spaces") === -1 &&
          window.location.href.indexOf("lobby") === -1) ||
          (conference.directorMode.mode &&
            (conference.layout == "dynamic_layout_horizontal" ||
              conference.layout == "dynamic_layout_vertical")) ? (
          <>
            <CustomTooltip text="Manage Hidden Users" placement="top-start">
              <Badge
                className="header-bell-icon"
                style={{
                  backgroundColor: theme.bg_color_1,
                  padding: "10px",
                  borderRadius: "4px",
                  // marginRight: "7px",
                  position: "absolute",
                  left: "-50px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (controlpanel) {
                    controlpanel.focus();
                  } else {
                    setOpenHiddenUsers(true);
                  }
                }}
                badgeContent={
                  hiddenUsers().includes(conference.HandRise[0]) ? (
                    <Box
                      sx={{
                        backgroundColor: "#008BCD",
                        borderRadius: "50%",
                        height: "15px",
                        width: "15px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "23px",
                        // marginRight: "22px",
                      }}
                    >
                      <PanToolIcon
                        style={{
                          fontSize: "12px",
                          color: "white",
                        }}
                      />
                    </Box>
                  ) : null
                }
              >
                <img alt="viewer" src="/assets/icons/viewer.svg" />
              </Badge>
            </CustomTooltip>
            {openHiddenUsers && (
              <Suspense fallback={<></>}>
                <NewWindow
                  closeOnUnmount={true}
                  onOpen={(e) => {
                    console.log(e, "onOpen");
                    setControlpanel(e);
                  }}
                  onUnload={(e) => {
                    console.log(e, "unloading");
                    setOpenHiddenUsers(false);
                    setControlpanel(null);
                  }}
                  name={`Manage hidden user - ${removeHyphenAndCapitalize(
                    "Space"
                  )}`}
                  title={`Manage hidden user - ${removeHyphenAndCapitalize(
                    "Space"
                  )}`}
                  features={{
                    popup: true,
                    width: 350,
                    height: 600,
                    directories: false,
                    titlebar: false,
                    toolbar: false,
                    location: false,
                    status: false,
                    menubar: false,
                    scrollbars: false,
                    alwaysRaised: true,
                  }}
                >
                  <div>
                    <HiddenUserStrip theme={theme} />
                  </div>
                </NewWindow>
              </Suspense>
            )}
            {/* {openHiddenUsers && <HiddenUserStrip />} */}
          </>
        ) : null}
      </div>

      {/* <MaterialUISwitch sx={{ m: 1 }} onChange={()=>{
     
     if(theme === 'dark'){
       setTheme('light',dispatch);
     }
     else{
       setTheme('dark',dispatch);
     }
   
   }} defaultChecked /> */}
    </Box>
  ) : (
    <Button color="inherit">Login</Button>
  );
  return (
    <>
      {/* {window.mobileCheck() &&
      conference.layout == "stage_layout" &&
      hideHeader ? (
        <></>
      ) : (
        <Box
          style={{
            userSelect: "none",
            position: "relative",
            transition: "all 0.5s ease-in-out",
          }}
        > */}
      <AppBar
        style={{
          position: "fixed",
          top:
            window.mobileCheck() &&
            conference.layout == "stage_layout" &&
            hideHeader
              ? "-59px"
              : "0px",
          left: "0px",
          zIndex: "20",
          height: "59px",
          paddingTop: "10px",
          justifyContent: "center",
          backgroundColor: theme.bg_color_0,
          paddingBottom: "10px",
          transition: "top 0.5s",
          boxShadow: "none",
        }}
        position="static"
      >
        <Toolbar>
          {/* <Typography variant="h5"   component="div" sx={{ flexGrow: 1,color:theme?.navbar?.secondaryColor }}>
            EVENTS.FOX
          </Typography> */}
          <Typography
            component="div"
            sx={{ flexGrow: 1 /*cursor: "pointer"*/ }}

            /*onClick={ () =>
            {
              navigate("/spaces")
            }
          }*/
          >
            <img
              alt=""
              src={themes?.navbar?.logoImg}
              style={{
                height: "auto",
                width: "10%",
                flexGrow: 1,
                cursor: "pointer",
              }}
              onClick={() => {
                if (window.room) {
                  try {
                    handleClickOpen();
                  } catch (error) {
                    console.log("error", error);
                    navigate(`/spaces/`);
                  }
                } else {
                  navigate(`/spaces/`);
                }
              }}
            />
          </Typography>

          {/*window.location.pathname === "/event"  ? <NestedList /> : null*/}
          {window.location.href.indexOf("spaces") > -1 ? null : (
            <AssignedSpacesDropdown theme={theme} />
          )}

          {userButton}
        </Toolbar>
      </AppBar>
      {/* </Box>
      )} */}

      {openProfile && <Profile handleProfileClose={handleProfileClose} />}
      {/* {openSupport && <ContactUs handleSupportClose={handleSupportClose} />} */}

      {openlogout && <LogoutPop setOpenlogout={setOpenlogout} />}

      <PopUp
        message="Are you sure you want to leave?."
        openEndDialoge={openEndDialoge}
        handleClose={() => {
          setopenEndDialoge(false);
        }}
        handleYes={() => {
          window.location.href = "/spaces/";
        }}
      />
      {contactPopup && <ContactUs setShowContactPop={setContactPopup} />}
      {settingsPopup && <Settings closePopupHandler={setsettingsPopup} />}
      <Toast
        openToast={openerrorToast}
        setOpenToast={setOpenerrorToast}
        message={message}
        type="error"
      />
    </>
  );
}
