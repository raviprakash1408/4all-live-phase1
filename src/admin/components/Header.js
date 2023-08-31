import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Badge } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Link, useNavigate } from "react-router-dom";
import { MaterialUISwitch } from "../../components/muiSwitch";
import { setTheme } from "../../utilities/theme";
import LogoutPop from "../../sections/Logout";
import { shortNameCreator } from "../../utilities/shortName";
import CustomAvatarGroup from "../CustomAvatarGroup";
import { userLogout } from "../../utilities/common";
import Toast from "../../sections/Toast";
import {
  createTeam,
  deleteTeam,
  editTeam,
  getIsMyTeam,
} from "../../state/team/teamSlice.ts";
import {
  CHANNEL_TYPES,
  subscribeCentrifugoChannel,
} from "../../utilities/centrifugoUtils.ts";
import ContactUs from "../../sections/ContactUs";

export default function Header() {
  const profile = useSelector((state) => state.userProfile);

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [userName, setuserName] = useState("Charlie Collier"); // User name mockup
  const [contactPopup, setContactPopup] = useState(false);
  const [settingsPopup, setsettingsPopup] = useState(false);
  const local = useSelector((state) => state.local);
  const [fullName, setfullName] = useState(
    localStorage.getObject("username") +
    " " +
    localStorage.getObject("last_name")
  );
  const [message, setMessage] = useState("");
  const [openerrorToast, setOpenerrorToast] = useState(false);
  let shortname = shortNameCreator(
    localStorage.getObject("username"),
    localStorage.getObject("last_name")
  );
  const [profileImg, setprofileImg] = useState(
    localStorage.getObject("avatar") == "null"
      ? null
      : localStorage.getObject("avatar")
  );
  const [slug, setSlug] = useState("");

  const [openEndDialoge, setopenEndDialoge] = React.useState(false);
  const handleClickOpen = () => {
    setopenEndDialoge(true);
  };
  useEffect(() => {
    if (profile.avatar) {
      setprofileImg(profile.avatar);
    }
  }, [profile.avatar]);

  const teams = useSelector((state) => state.Team.teams);

  const getDefaultOrganizationSlug = () => {
    let index = teams.findIndex((team) => team.default_organisation === true);
    if (teams[index].slug) {
      setSlug(teams[index].slug);
    }
  };
  useEffect(() => {
    let index = teams.findIndex((team) => team.default_organisation === true);
    if (teams[index]?.slug) {
      setSlug(teams[index].slug);
    }
  }, [teams]);

  useEffect(() => {
    window.addEventListener("storage", (e) => {
      if (e.target.localStorage.islogin === '0') {
        userLogout();
        localStorage.setObject("islogin", 'No');
        window.location.href = "/";
      }
    });
  }, []);

  useEffect(() => {
    try {
      window.loginChannel.on("publication", function (ctx) {
        switch (ctx.data.type) {
          case "user_name_edited":
            if (ctx.data.user_id === localStorage.getObject("id")) {
              setfullName(ctx.data.first_name + " " + ctx.data.last_name);
              // setprofileImg(profile.avatar);
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

  useEffect(() => {
    async function changeTeamData() {
      console.log("getAssignedSpaces");

      try {
        console.log("getAssignedSpaces 1");
        let teamChannel;
        // @ts-ignore
        if (window.team_channel) {
          // @ts-ignore
          teamChannel = await window.team_channel;
        } else {
          teamChannel = await subscribeCentrifugoChannel(CHANNEL_TYPES.TEAM);
        }

        await window.team_channel.on("publication", function (ctx) {
          console.log(ctx.data, "ctx.data.type");

          switch (ctx.data.type) {
            case "team_edited":
              console.log("team_edited");

              dispatch(
                editTeam({
                  company_logo: ctx.data.team_data.company_logo,
                  company_name: ctx.data.team_data.company_name,
                  slug: ctx.data.team_data.slug,
                })
              );
              break;
            case "team_deleted":
              console.log(
                localStorage.getObject("id"),
                ctx.data.team_data.slug,
                "ctx.data.team_data.slug"
              );

              if (
                ctx.data.deleting_user_id != localStorage.getObject("id") &&
                ctx.data.is_team_deleted
              ) {
                if (
                  localStorage.getObject("organization_slug") ==
                  ctx.data.team_data.slug
                ) {
                  dispatch(getIsMyTeam());
                  window.location.reload();
                }
                dispatch(deleteTeam(ctx.data.team_data));
              }
              break;

            case "team_added":
              if (localStorage.getObject("id") == ctx.data.user_data.id) {
                // window.location.reload();
                let teamData = {};
                teamData.default_organisation = false;
                teamData.is_organization_user =
                  ctx.data.team_data.is_organization_user;
                teamData.company_logo = ctx.data.team_data.company_logo;
                teamData.company_name = ctx.data.team_data.company_name;
                teamData.is_active = ctx.data.team_data.is_active;
                teamData.email = ctx.data.invited_by.email;
                teamData.is_my_team = false;
                teamData.users_count = ctx.data.user_count;
                teamData.first_name = ctx.data.invited_by.first_name;
                teamData.last_name = ctx.data.invited_by.last_name;
                teamData.slug = ctx.data.team_data.slug;
                teamData.id = ctx.data.team_data.id;
                dispatch(createTeam(teamData));
              }

              break;

            case "team_unassigned":
              if (localStorage.getObject("id") == ctx.data?.user_data?.id) {
                console.log("unassign 1");
                if (
                  localStorage.getObject("organization_slug") ==
                  ctx.data?.team_data?.slug
                ) {
                  dispatch(getIsMyTeam());

                  window.location.reload();
                }
                dispatch(deleteTeam(ctx.data.team_data));
              }
              break;

            // case "team_switched":
            //     if(localStorage.getObject("id") == ctx.data.team_data.id){

            //   console.log("team_switched", ctx.data);
            //     }
            //   break;

            default:
              console.log("eee");
          }
        });
      } catch (error) {
        console.log("getAssignedSpaces 2");
        console.log(error, "error");
      }
    }
    if (localStorage.getObject("auth") == "true") {
      changeTeamData();
    }
  }, []);

  // useEffect(() => {
  //   try {
  //     window.team_channel.on("publication", function (ctx) {
  //       console.log(ctx.data, "ctx.data.type");

  //       switch (ctx.data.type) {
  //         case "team_edited":
  //           console.log("team_edited");

  //           dispatch(
  //             editTeam({
  //               company_logo: ctx.data.team_data.company_logo,
  //               company_name: ctx.data.team_data.company_name,
  //               slug: ctx.data.team_data.slug,
  //             })
  //           );
  //           break;
  //         case "team_deleted":
  //           console.log(
  //             localStorage.getObject("organization_slug"),
  //             ctx.data.team_data.slug,
  //             "ctx.data.team_data.slug"
  //           );

  //           if (
  //             localStorage.getObject("organization_slug") ==
  //             ctx.data.team_data.slug
  //           ) {
  //             dispatch(getIsMyTeam());
  //             window.location.reload();
  //           }
  //           dispatch(deleteTeam(ctx.data.team_data));
  //           break;

  //         case "team_added":
  //           if (localStorage.getObject("id") == ctx.data.user_data.id) {
  //             // window.location.reload();
  //             let teamData = {};
  //             teamData.default_organisation = false;
  //             teamData.is_organization_user =
  //               ctx.data.team_data.is_organization_user;
  //             teamData.company_logo = ctx.data.team_data.company_logo;
  //             teamData.company_name = ctx.data.team_data.company_name;
  //             teamData.is_active = ctx.data.team_data.is_active;
  //             teamData.email = ctx.data.user_data.email;
  //             teamData.is_my_team = false;

  //             teamData.first_name = ctx.data.user_data.first_name;
  //             teamData.last_name = ctx.data.user_data.last_name;
  //             teamData.slug = ctx.data.team_data.slug;
  //             teamData.id = ctx.data.team_data.id;
  //             dispatch(createTeam(teamData));
  //           }

  //           break;

  //         case "team_unassigned":
  //           if (localStorage.getObject("id") == ctx.data.user_data) {
  //             if (
  //               localStorage.getObject("organization_slug") ==
  //               ctx.data.team_data.slug
  //             ) {
  //               dispatch(getIsMyTeam());

  //               // window.location.reload();
  //             }
  //             dispatch(deleteTeam(ctx.data.team_data));
  //           }
  //           break;

  //         // case "team_switched":
  //         //     if(localStorage.getObject("id") == ctx.data.team_data.id){

  //         //   console.log("team_switched", ctx.data);
  //         //     }
  //         //   break;

  //         default:
  //           console.log("eee");
  //       }
  //     });
  //   } catch (error) {
  //     console.log("team centrifugo error");
  //   }
  // }, []);

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

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const dispatch = useDispatch();
  // useSelector to get the theme from the store
  const theme = useSelector((state) => state.theme.themeData);
  const style = useSelector((state) => state.theme.theme);
  //logout

  const [openlogout, setOpenlogout] = useState(false);

  // console.log(theme,'theme');
  // get user from redux
  // const loggedIn = useSelector(state => state.user.loggedIn)
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
        width: { sm: `calc(100% - 250px)` },
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

      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{
            backgroundColor: theme?.spaces?.primaryColor,
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
          />

          {/* <img
            alt=""
            src={profileImg}
            className="header-profile-pic"
          /> */}
          <p
            className="header-profile-name"
            style={{ textTransform: "none", marginLeft: "18px" }}
          >
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
                  backgroundColor: theme?.spaces?.primaryColor,
                  color: "#88A1AB",
                  borderTopRightRadius: "0px",
                  borderTopLeftRadius: "0px",
                  borderTop: "1px solid",
                  borderTopColor: theme?.loby?.primaryColor,
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <Link
                      to="/admin/account"
                      style={{ textDecoration: "none", color: "#88A1AB" }}
                    >
                      <MenuItem
                        onClick={handleProfile}
                        style={{ margin: "7px 0px" }}
                      >
                        <img
                          alt=""
                          src="/assets/icons/profile-icon.svg"
                          style={{ paddingLeft: "8px" }}
                        />
                        <span style={{ paddingLeft: "19px", fontSize: "14px" }}>
                          Profile
                        </span>
                      </MenuItem>
                    </Link>
                    <Link
                      to="/spaces"
                      style={{ textDecoration: "none", color: "#88A1AB" }}
                    >
                      <MenuItem style={{ margin: "7px 0px" }}>
                        <img
                          alt=""
                          src="/assets/icons/spaces-icon.svg"
                          style={{ paddingLeft: "8px" }}
                        />
                        <span style={{ paddingLeft: "19px", fontSize: "14px" }}>
                          Spaces
                        </span>
                      </MenuItem>
                    </Link>

                    <Link
                      to="/admin/spaces"
                      style={{ textDecoration: "none", color: "#88A1AB" }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleClose();
                        }}
                        style={{ margin: "7px 0px" }}
                      >
                        <img
                          src="/assets/icons/dashboard.svg"
                          style={{ paddingLeft: "8px" }}
                          alt=""
                        />
                        <span style={{ paddingLeft: "19px", fontSize: "14px" }}>
                          Dashboard
                        </span>{" "}
                      </MenuItem>
                    </Link>

                    <MenuItem style={{ margin: "7px 0px" }}>
                      <img
                        alt=""
                        src="/assets/icons/theme.svg"
                        style={{ paddingLeft: "8px" }}
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

                    {/* <MenuItem
                      onClick={() => {
                        setsettingsPopup(true);
                        handleClose();
                      }}
                      style={{ margin: "7px 0px" }}
                    >
                      <img
                        alt=""
                        src="/assets/icons/settings.svg"
                        style={{ paddingLeft: "8px" }}
                      />
                      <span style={{ paddingLeft: "19px", fontSize: "14px" }}>
                        Settings
                      </span>{" "}
                    </MenuItem> */}

                    <MenuItem
                      onClick={() => {
                        setContactPopup(true);

                        handleClose();
                      }}
                      style={{ margin: "7px 0px" }}
                    >
                      <img
                        alt=""
                        src="/assets/icons/support.svg"
                        style={{ paddingLeft: "8px" }}
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
                        alt=""
                        src="/assets/icons/logout.svg"
                        style={{ paddingLeft: "8px" }}
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
      <Box
        style={{
          userSelect: "none",
        }}
      >
        <AppBar
          style={{
            position: "fixed",
            top: "0px",
            left: "0px",
            zIndex: "20",
            height: "6vh",
            paddingTop: "10px",
            justifyContent: "center",
            backgroundColor: theme?.navbar?.primaryColor,
            paddingBottom: "10px",
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
            >
              <img
                src={theme?.navbar?.logoImg}
                alt=""
                style={{
                  height: "auto",
                  width: "10%",
                  cursor: "pointer",
                }}
              />

              {/* onClick={ () =>
                {

                  if(window.room){
                    try {
                      handleClickOpen()
                    } catch (error) {
                      console.log("error",error);
                      navigate(`/spaces/`)
                    }
                  }
                  else{
                navigate(`/spaces/`)
                    
                  }
             
               
                }
              } */}
            </Typography>

            {userButton}
          </Toolbar>
        </AppBar>
      </Box>
      {contactPopup && <ContactUs setShowContactPop={setContactPopup} />}

      {openlogout && <LogoutPop setOpenlogout={setOpenlogout} />}
      <Toast
        openToast={openerrorToast}
        setOpenToast={setOpenerrorToast}
        message={message}
        type="error"
      />
    </>
  );
}
