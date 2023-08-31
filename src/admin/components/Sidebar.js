import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch, useSelector } from "react-redux";

import SidebarMenuElement from "./SidebarMenuElement";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import EventPopupElement from "./EventPopupElement";
import SwitchTeam from "./team/switch_team/SwitchTeam";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import { createTeam } from "../../state/team/teamSlice.ts";

const drawerWidth = 250;

const openedMixin = (theme, backgroundColor) => ({
  width: drawerWidth,
  backgroundColor: backgroundColor,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  border: "none",
});

const closedMixin = (theme, backgroundColor) => ({
  backgroundColor: backgroundColor,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  border: "none",
  width: `calc(${theme.spacing(7)} + 6px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 6px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "backgroundColor",
})(({ theme, open, backgroundColor }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme, backgroundColor),
    "& .MuiDrawer-paper": openedMixin(theme, backgroundColor),
  }),
  ...(!open && {
    ...closedMixin(theme, backgroundColor),
    "& .MuiDrawer-paper": closedMixin(theme, backgroundColor),
  }),
}));

export default function Sidebar() {
  const themes = useSelector((state) => state.theme.themeData);
  const permissions = useSelector((state) => state.permissions);
  console.log(permissions, "permissionsss");
  const theme = useTheme();
  let drawerLocal = localStorage.getObject("drawer");
  let draweValues = JSON.parse(drawerLocal);
  const [open, setOpen] = React.useState(JSON.parse(drawerLocal));
  const [is_hover_c, setIsHoverC] = React.useState(false);
  const dispatch = useDispatch();

  const organisationUser = localStorage.getObject("is_organization_user");

  const handleDrawer = (toggle) => {
    console.log(toggle, draweValues, "toggle");
    setOpen(!open);
    if (toggle) {
      localStorage.setObject("drawer", "false");
    } else {
      localStorage.setObject("drawer", "true");
    }
  };

  //popup
  const [openpop, setopenpop] = React.useState(false);
  const anchorRef = React.useRef(null);

  React.useEffect(() => {
    getTeamList();

    return () => {
      console.log("unmounting");
    };
  }, []);

  //function for getting teamList

  const getTeamList = async () => {
    try {
      const response = await AxiosLocal.get(`team/`);
      if (response.data.status == "Success") {
        console.log(response.data.data, "response.dataresponse.data");

        response.data.data.map((team) => {
          let teamData = {};
          teamData.default_organisation = team.default_organisation;
          teamData.is_organization_user = team.is_organization_user;
          teamData.company_logo = team.organization.company_logo;
          teamData.company_name = team.organization.company_name;
          teamData.is_active = team.organization.is_active;
          teamData.email = team.invited_by.email;
          teamData.is_my_team = team.is_my_team;
          teamData.users_count = team.users_count;
          teamData.first_name = team.invited_by.first_name;
          teamData.last_name = team.invited_by.last_name;
          teamData.slug = team.organization.slug;
          teamData.id = team.organization.id;
          dispatch(createTeam(teamData));
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = () => {
    setopenpop((prevopenpop) => !prevopenpop);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setopenpop(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setopenpop(false);
    } else if (event.key === "Escape") {
      setopenpop(false);
    }
  }

  const prevopenpop = React.useRef(openpop);
  React.useEffect(() => {
    if (prevopenpop.current === true && openpop === false) {
      anchorRef.current.focus();
    }

    prevopenpop.current = openpop;
  }, [openpop]);
  //active state
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const menu = [
    // {
    //   title: "Analytics",
    //   icon: "anal",
    //   to: "/admin/analytics",
    //   display: true,
    // },
    {
      title: "Spaces",
      icon: "space",
      to: "/admin/spaces",
      display: permissions.view_space || organisationUser == "true",
    },
    {
      title: "Teams",
      icon: "admin-users-icon",
      to: "/admin/team",
      display: permissions.view_team_members || organisationUser == "true",
    },
    {
      title: "Roles & Permissions",
      icon: "admin-role-icon",
      to: "/admin/workflows",
      display:
        permissions.view_workflows ||
        permissions.view_permissions ||
        organisationUser == "true",
    },
    // {
    //   title: "Permissions",
    //   icon: "admin-role-icon",
    //   to: "/admin/permissions",
    //   display: organisationUser == "true" ? true : false,
    // },
    {
      title: "Account",
      icon: "user",
      to: "/admin/account",
      display: true,
    },
    {
      title: "File Manager",
      icon: "folder",
      to: "/admin/fileManager",
      display: true,
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          zIndex: "1",
          backgroundColor: themes?.sidebar?.sidebarColor,
        }}
        className="sidebar"
      >
        <Drawer
          backgroundColor={themes?.sidebar?.sidebarColor}
          disableScrollLock={true}
          variant="permanent"
          open={open}
          style={{ position: "relative", borderRight: "1px solid yellow" }}
        >
          <div>
            {/* <div
              style={{
                backgroundColor: themes?.sidebar?.sidebarColor,

                display: "flex",
                justifyContent: "center",
                padding: open ? "17px 0px 17px" : "14px 0px 17px",
              }}
            >
              <img
                alt=""
                style={{
                  width: open ? "195px" : "40px",
                  height: open ? "25px" : "28px",
                }}
                src={
                  open
                    ? "/assets/images/eventdark_logo.svg"
                    : "/assets/admin/admin-logo.svg"
                }
              />
            </div> */}

            <SwitchTeam themes={themes} openSidebar={open} />
          </div>

          <List style={{ backgroundColor: themes?.sidebar?.sidebarColor }}>
            {menu.map(
              (item, index) =>
                item.display && (
                  <SidebarMenuElement
                    title={item.title}
                    icon={item.icon}
                    to={item.to}
                    open={open}
                    index={index}
                    selectedIndex={selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  />
                )
            )}
          </List>
        </Drawer>

        <Box
          style={{
            position: "absolute",
            top: "50%",
            cursor: "pointer",
            transform: "translateY(-50%)",
            left: open ? "250px" : "70px",
            borderRadius: "0px 4px 4px 0px",
            width: "12px",
            height: "80px",
            backgroundColor: is_hover_c
              ? themes.common.color1
              : themes?.sidebar?.buttonColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: open
              ? "left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"
              : "left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
          }}
          onClick={() => handleDrawer(open)}
          onMouseEnter={() => setIsHoverC(true)}
          onMouseLeave={() => setIsHoverC(false)}
        >
          {!open ? (
            <ChevronRightIcon
              style={{
                fill: "#88A1AB",
                filter: is_hover_c ? "brightness(0) invert(1)" : "",
              }}
            />
          ) : (
            <ChevronLeftIcon
              style={{
                fill: "#88A1AB",
                filter: is_hover_c ? "brightness(0) invert(1)" : "",
              }}
            />
          )}
        </Box>

        <Popper
          open={openpop}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="right-start"
          transition
          disablePortal
          style={{ zIndex: "2" }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "right-start" ? "left top" : "left bottom",
                backgroundColor: themes?.sidebar?.sidebarColor,
              }}
            >
              <Paper style={{ backgroundColor: themes?.sidebar?.mainBg }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={openpop}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <EventPopupElement title="Events" />
                    <EventPopupElement title="View all" />
                    <EventPopupElement title="Create" />
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </>
  );
}
