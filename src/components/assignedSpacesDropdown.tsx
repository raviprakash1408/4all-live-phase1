import {
  ListItemText,
  Typography,
  Box,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  Button,
  ClickAwayListener,
} from "./mui_core";
import { Skeleton } from "@mui/material";
import { useEffect, useReducer, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// @ts-ignore
import { AxiosLocal } from "../utilities/axiosUtils.ts";
import { setCurrentSpace } from "../state/local/localSlice";
import { useLocation, useNavigate } from "react-router-dom";
// @ts-ignore
import { RootState } from "../state/store.tsx";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// @ts-ignore
import {
  placeHolderSpace,
  space,
  placeHolderSubSpace,
  subSpaceType,
  // @ts-ignore
} from "../types/spaces.ts";
import {
  subscribeCentrifugoChannel,
  CHANNEL_TYPES,
  // @ts-ignore
} from "../utilities/centrifugoUtils.ts";
import {
  getTeamSlugFromUrl,
  openInNewTab,
  toSentenceCase,
  userLogout,
} from "../utilities/common";
import { log } from "video.js";
// @ts-ignore
import {
  setSelectedSpaces,
  setNonselectedSpaces,
  setCurrentSpaceData,
  updateCurrentSubSpaceData,
  setCurrentSubSpaceData,
  updateNonselectedSpaceData,
  updateSelectedSpaceData,
  updateCurrentSpaceData,
  updateNonSelecteSubSpaceData,
  updateSelecteSubSpaceData,
  addSubSpaceToNonSelectedSpaces,
  addSubSpaceToSelectedSpaces,
  // @ts-ignore
} from "../state/assignedSpaces/assignedSpacesSlice.ts";
import CustomTooltip from "../admin/CustomTooltip";
import LeaveDrop from "./popup/leaveDrop.tsx";

type initialStateType = {
  main: boolean;
};

const enum actions {
  TOGGLEMAIN = "toggleMain",
}

type action = {
  type: actions;
};

const initialState: initialStateType = { main: false };

function reducer(state: initialStateType, action: action) {
  switch (action.type) {
    case actions.TOGGLEMAIN:
      return { main: !state.main };
    default:
      throw new Error();
  }
}

export const AssignedSpacesDropdown = ({ theme }) => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [opendrop, setOpendrop] = useState<boolean>(false);

  const [dropdownClicked, setdropdownClicked] = useState<boolean>(false);

  const [expanded, setExpanded] = useState<string>("");

  const [dropdownLoader, setdropdownLoader] = useState<boolean>(true);
  const [mainSpaceLoader, setmainSpaceLoader] = useState<boolean>(false);
  const [hover, sethover] = useState<string>("");
  const [hoverjoin, sethoverjoin] = useState<boolean>(false);
  const [hovertab, sethovertab] = useState<boolean>(false);
  const handleChange =
    (panel: string) => (event: object, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : "");
    };

  const [show, setShowDispatch] = useReducer(reducer, initialState);

  const anchorRef = useRef<HTMLButtonElement>(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Theme color dark and light
  const theme_color = useSelector((state: RootState) => state.theme.theme);
  const permissions = useSelector((state: RootState) => state.permissions);
  const spacesNotAssigned = useSelector(
    (state: RootState) => state.assignedSpaces.nonselectedSpaces
  );
  const spacesAssigned = useSelector(
    (state: RootState) => state.assignedSpaces.selectedSpaces
  );
  const mainEvent = useSelector(
    (state: RootState) => state.assignedSpaces.currentSpace
  );
  const subEvent = useSelector(
    (state: RootState) => state.assignedSpaces.currentSubSpace
  );

  let team_slug;

  if (window.location.href.indexOf("lobby") > -1) {
    team_slug = getTeamSlugFromUrl("lobby");
  } else {
    team_slug = getTeamSlugFromUrl("space");
  }

  const handleToggle = () => {
    setOpenNav((prevOpen) => !prevOpen);
    AxiosLocal.post("space/subroom/notselected/", {
      slug: location.pathname.substring(location.pathname.lastIndexOf("/") + 1),
      team_slug: team_slug,
    }).then(function (response) {
      if (!dropdownClicked) {
        let assignedSpaceList = [...spacesAssigned];
        Array.prototype.push.apply(assignedSpaceList, response.data.data);
        // setspacesNotAssigned([...response.data.data]);
        dispatch(setNonselectedSpaces([...response.data.data]));
        setdropdownClicked(true);
      }
    });
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current?.contains(event.target)) return;
    setOpenNav(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenNav(false);
    } else if (event.key === "Escape") {
      setOpenNav(false);
    }
  }

  const isEmpty = (obj) => {
    return obj == undefined ? false : Object.keys(obj).length !== 0;
  };

  useEffect(() => {
    let guestUser = false;
    if (
      localStorage.getObject("guestUser") &&
      localStorage.getObject("guestUser") === "true"
    ) {
      guestUser = true;
    } else {
      guestUser = false;
    }

    AxiosLocal.post("space/subroom/selected/", {
      slug: location.pathname.substring(location.pathname.lastIndexOf("/") + 1),
      team_slug: team_slug,
      guestUser,
    })
      .then(function (response) {
        setdropdownLoader(true);
        let assignedSpaceList = response.data.data;
        // setspacesAssigned([...assignedSpaceList]);
        dispatch(setSelectedSpaces([...assignedSpaceList]));
        let selectedMAinSpace = assignedSpaceList[0];
        // setmainEvent({ ...selectedMAinSpace });
        dispatch(setCurrentSpaceData({ ...selectedMAinSpace }));

        let selectedMainSubSpace = selectedMAinSpace.subrooms.find(
          (subroom) =>
            subroom.slug ===
            location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
        );
        // setsubEvent(selectedMainSubSpace);
        dispatch(setCurrentSubSpaceData(selectedMainSubSpace));
        setExpanded(selectedMainSubSpace?.slug);
        dispatch(
          setCurrentSpace({
            currentSubspace: selectedMainSubSpace,
            currentSpaceName: selectedMAinSpace.name,
            currentSubSpaceName: selectedMainSubSpace?.name,
            currentSubSpaceSlug: selectedMainSubSpace?.slug,
          })
        );
        setdropdownLoader(false);
      })
      .catch(function (error) {});
  }, []);

  const prevOpen = useRef(openNav);

  useEffect(() => {
    if (prevOpen.current === true && openNav === false)
      // anchorRef.current.focus();
      prevOpen.current = openNav;
  }, [openNav]);

  useEffect(() => {
    document.body.style.backgroundColor = "#032e57";
  }, []);

  let mainSpaceLoaded = false;

  const changeSubSpaceUrl = (subSpace, subevents, mainSpaceSlug) => {
    let url = "";
    if (!(window.location.href.indexOf("lobby") > -1)) {
      if (!subSpace?.is_lobby) {
        if (subSpace?.is_master) {
          url = `/${localStorage.getObject(
            "organization_slug"
          )}/${mainSpaceSlug}`;
        } else {
          url = `/${localStorage.getObject(
            "organization_slug"
          )}/${mainSpaceSlug}/${subSpace.slug}`;
        }
      } else {
        if (subSpace.is_master) {
          url = `/lobby/${localStorage.getObject(
            "organization_slug"
          )}/${mainSpaceSlug}`;
        } else {
          url = `/lobby/${localStorage.getObject(
            "organization_slug"
          )}/${mainSpaceSlug}/${subSpace.slug}`;
        }
      }
    } else {
      if (!subSpace?.is_lobby) {
        if (subSpace?.is_master) {
          url = `/${localStorage.getObject(
            "organization_slug"
          )}/${mainSpaceSlug}`;
        } else {
          url = `/${localStorage.getObject(
            "organization_slug"
          )}/${mainSpaceSlug}/${subSpace.slug}`;
        }
      } else {
        if (subSpace.is_master) {
          url = `/lobby/${localStorage.getObject(
            "organization_slug"
          )}/${mainSpaceSlug}`;
        } else {
          url = `/lobby/${localStorage.getObject(
            "organization_slug"
          )}/${mainSpaceSlug}/${subSpace.slug}`;
        }
      }
    }
    return url;
  };

  const changeSubSpaceNew = (subSpace, subevents, mainSpaceSlug) => {
    setdropdownClicked(false);
    setmainSpaceLoader(true);
    if (!(window.location.href.indexOf("lobby") > -1)) {
      if (!subSpace?.is_lobby) {
        if (subSpace?.is_master) {
          window.location.href = `/${localStorage.getObject(
            "organization_slug"
          )}/${mainSpaceSlug}`;
        } else {
          window.location.href = `/${localStorage.getObject(
            "organization_slug"
          )}/${mainSpaceSlug}/${subSpace.slug}`;
        }
      } else {
        if (subSpace.is_master) {
          window.location.href = `/lobby/${localStorage.getObject(
            "organization_slug"
          )}/${mainSpaceSlug}`;
        } else {
          window.location.href = `/lobby/${localStorage.getObject(
            "organization_slug"
          )}/${mainSpaceSlug}/${subSpace.slug}`;
        }
      }
    } else {
      if (!subSpace?.is_lobby) {
        if (subSpace?.is_master) {
          window.location.href = `/${localStorage.getObject(
            "organization_slug"
          )}/${mainSpaceSlug}`;
        } else {
          window.location.href = `/${localStorage.getObject(
            "organization_slug"
          )}/${mainSpaceSlug}/${subSpace.slug}`;
        }
      } else {
        if (subSpace.is_master) {
          navigate(
            `/lobby/${localStorage.getObject(
              "organization_slug"
            )}/${mainSpaceSlug}`
          );
        } else {
          navigate(
            `/lobby/${localStorage.getObject(
              "organization_slug"
            )}/${mainSpaceSlug}/${subSpace.slug}`
          );
        }
      }
    }

    AxiosLocal.post("space/subroom/selected/", {
      slug: subSpace.slug,
      team_slug: team_slug,
    })
      .then(function (response) {
        setdropdownLoader(true);
        let assignedSpaceList = response.data.data;
        // setspacesAssigned([...assignedSpaceList]);
        dispatch(setSelectedSpaces([...assignedSpaceList]));
        let selectedMAinSpace = assignedSpaceList[0];
        // setmainEvent({ ...selectedMAinSpace });
        dispatch(setCurrentSpaceData({ ...selectedMAinSpace }));
        let selectedMainSubSpace = selectedMAinSpace.subrooms.find(
          (subroom) => subroom.slug === subSpace.slug
        );
        // setsubEvent(selectedMainSubSpace);
        dispatch(setCurrentSubSpaceData(selectedMainSubSpace));
        setExpanded(selectedMainSubSpace?.slug);
        dispatch(
          setCurrentSpace({
            currentSubspace: selectedMainSubSpace,
            currentSpaceName: selectedMAinSpace.name,
            currentSubSpaceName: selectedMainSubSpace?.name,
            currentSubSpaceSlug: selectedMainSubSpace?.slug,
          })
        );
        localStorage.setObject("currentSubSpaceId", subSpace.id);
        localStorage.setObject("currentSpaceSlug", selectedMainSubSpace?.slug);
        localStorage.setObject(
          "currentSubSpaceSlug",
          selectedMainSubSpace?.slug
        );
        setdropdownLoader(false);
      })
      .then(() => {
        // setTimeout(() => {
        AxiosLocal.post("space/subroom/notselected/", {
          slug: subSpace.slug,
          team_slug: team_slug,
        }).then(function (response) {
          // if(!dropdownClicked){
          // let assignedSpaceList = [...spacesAssigned]
          // Array.prototype.push.apply(assignedSpaceList,response.data.data);
          // setspacesNotAssigned([...response.data.data]);
          dispatch(setNonselectedSpaces([...response.data.data]));
          setdropdownClicked(true);
          setmainSpaceLoader(false);
          // }
        });
        // }, 2000);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const changeSubSpace = (subSpace, subevents, mainSpaceSlug) => {
    if (!subevents) {
      subevents = subEvent;
    }
    // setsubEvent(subSpace);
    dispatch(setCurrentSubSpaceData(subSpace));
    let currentSpace = subevents.find(function (e) {
      return e.slug === subSpace.slug;
    });
    dispatch(
      setCurrentSpace({
        currentSubspace: currentSpace,
        currentSpaceName: currentSpace.name,
        currentSubSpaceName: currentSpace.name,
        currentSubSpaceSlug: currentSpace.slug,
      })
    );
    localStorage.setObject("currentSubSpaceId", subSpace.id);
    localStorage.setObject("currentSpaceSlug", mainSpaceSlug);
    localStorage.setObject("currentSubSpaceSlug", currentSpace.slug);
    if (!(window.location.href.indexOf("lobby") > -1)) {
      if (subSpace?.is_master) {
        window.location.href = `/${localStorage.getObject(
          "organization_slug"
        )}/${mainSpaceSlug}`;
      } else {
        window.location.href = `/${localStorage.getObject(
          "organization_slug"
        )}/${mainSpaceSlug}/${currentSpace.slug}`;
      }
      setTimeout(() => window.location.reload(), 3000);
    } else {
      console.log("loby");
    }
  };

  const getSubrooms = (spaceSlug) => {
    AxiosLocal.post("spaces/subspace/", {
      main_space_slug: spaceSlug,
      team_slug: team_slug,
    })
      .then(function (response) {
        // var mainList = [...spacesNotAssigned].map(function (item) {
        //   if (item.slug == spaceSlug) {
        //     item.subrooms = response.data.data;
        //   }
        //   return item;
        // });
        // setspacesNotAssigned([...mainList]);
        dispatch(
          addSubSpaceToNonSelectedSpaces({
            subrooms: response.data.data,
            spaceSlug: spaceSlug,
          })
        );
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  useEffect(() => {
    async function getAssignedSpaces() {
      try {
        let login_channel;
        // @ts-ignore
        if (window.loginChannel) {
          // @ts-ignore
          login_channel = await window.loginChannel;
        } else {
          login_channel = await subscribeCentrifugoChannel(
            CHANNEL_TYPES.USER_LOGIN
          );
        }
        // @ts-ignore
        await window.loginChannel.addListener("publication", function (ctx) {
          switch (ctx.data.type) {
            case "user_space_changed":
              let mainEventData = ctx.data.data.filter(
                (space) => space.slug === mainEvent.slug
              );

              if (ctx.data.user_id == localStorage.getObject("id")) {
                if (mainEventData.length == 0) {
                  window.location.href = "/404";
                  // navigate("/404");
                }
              }

              AxiosLocal.post("space/subroom/notselected/", {
                slug: location.pathname.substring(
                  location.pathname.lastIndexOf("/") + 1
                ),
                team_slug: team_slug,
              }).then(function (response) {
                if (!dropdownClicked) {
                  let assignedSpaceList = [...spacesAssigned];
                  Array.prototype.push.apply(
                    assignedSpaceList,
                    response.data.data
                  );
                  // setspacesNotAssigned([...response.data.data]);
                  dispatch(setNonselectedSpaces([...response.data.data]));
                }
              });
              break;
            case "user_space_edit":
              // check if the space is in the selected spaces
              // if yes then update the space
              // if no then update the space in the non selected spaces
              // setTimeout(() => {
              //   console.log(mainEvent, ctx.data.data.id, "mainEventSSS");
              // }, 2000);

              if (ctx.data.data.id == mainEvent.id) {
                dispatch(updateCurrentSpaceData(ctx.data.data));
                dispatch(updateSelectedSpaceData(ctx.data.data));
              } else {
                dispatch(updateNonselectedSpaceData(ctx.data.data));
              }
              // editCurrentSpace(ctx.data.data, "mainSpace");
              // updateSelectedSpaceData
              // dispatch(updateNonselectedSpaceData(ctx.data.data));
              break;

            case "user_subspace_edit":
              if (ctx.data.data.main_space_id == mainEvent.id) {
                dispatch(updateSelecteSubSpaceData(ctx.data.data));
              } else {
                dispatch(updateNonSelecteSubSpaceData(ctx.data.data));
              }

            default:
              console.log("aaa");
          }
        });
      } catch (error) {
        console.log(error, "error");
      }
    }
    if (localStorage.getObject("auth") == "true") {
      getAssignedSpaces();
    }

    return () => {
      // @ts-ignore
      if (window.loginChannel) {
        // @ts-ignore
        window.loginChannel.removeAllListeners();
      }
    };
  }, [mainEvent, subEvent]);

  //function for leaveSpace
  const leaveSpace = () => {
     if (localStorage.getObject("guestUser") == "true") {
      userLogout()
     
       window.location.href = "/";
     } else {
       window.location.href = "/spaces";
     }
  };

  return (
    <>
      {!dropdownLoader ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            backgroundColor: "#012243",
            borderRadius: "4px",
            zIndex: "5",
          }}
        >
          {/* --- room dropdown --- */}
          <div>
            <Button
              // @ts-ignore
              disabled={!permissions.switch_space}
              ref={anchorRef}
              id="composition-button"
              aria-controls={openNav ? "composition-menu" : undefined}
              aria-expanded={openNav ? "true" : undefined}
              aria-haspopup="true"
              onClick={() => {
                handleToggle();
              }}
              style={{
                position: "relative",
                width: "365px",
                height: "44px",
                paddingLeft: "0px",
                justifyContent: "start",
                backgroundColor: theme?.bg_color_1
                  ? theme?.bg_color_1
                  : "#E1E7EA",
                //overflow: "hidden"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                <img
                  alt=""
                  style={{ width: "44px", height: "44px", marginRight: "10px" }}
                  src={
                    // @ts-ignore
                    subEvent?.room_image
                      ? // @ts-ignore
                        subEvent.room_image
                      : "/assets/icons/room1.svg"
                  }
                />
                <Typography
                  variant="h5"
                  sx={{
                    maxWidth: "250px",
                    marginRight: "10px",
                    justifyContent: "space-around",
                    alignItems: "center",
                    fontSize: "16px !important",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: "600 !important",
                    textTransform: "none",
                    color: theme?.font_color_0
                      ? theme?.font_color_0
                      : "#88A1AB",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <span
                    style={{
                      color: theme?.font_color_0
                        ? theme?.font_color_0
                        : "#4B6D85",
                    }}
                  >
                    {isEmpty(mainEvent) ? mainEvent.name : "Loading..."}
                  </span>
                  {subEvent?.is_master ? " - Main" : ` - ${subEvent?.name}`}
                </Typography>
              </Box>

              <img
                alt=""
                style={{
                  position: "absolute",
                  width: "10px",
                  height: "5.5px",
                  right: "20px",
                }}
                src="/assets/icons/down.svg"
              />
            </Button>

            <Popper
              open={openNav}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
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
                      width: "365px",
                      backgroundColor: theme?.bg_color_1
                        ? theme?.bg_color_1
                        : "#E1E7EA",
                      color: theme?.font_color_0
                        ? theme?.font_color_0
                        : "#88A1AB",
                      borderRadius: "0px",
                      fontSize: "14px",
                    }}
                  >
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={openNav}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                        style={{
                          height: "fit-content",
                          maxHeight: "400px",
                          overflowY: openNav ? "scroll" : "hidden",
                          padding: 0,
                        }}
                        sx={{
                          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                            backgroundColor: theme?.bg_color_1
                              ? theme?.bg_color_1
                              : "#021A31",
                            width: "0.5em",
                          },
                          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb":
                            {
                              backgroundColor: theme?.bg_color_0
                                ? theme?.bg_color_0
                                : "#008BCD",
                            },
                        }}
                      >
                        {spacesAssigned?.map((item) => {
                          return (
                            <div>
                              <Accordion
                                style={{
                                  background: theme?.bg_color_1
                                    ? theme?.bg_color_1
                                    : "#012243",
                                  color: theme?.font_color_0
                                    ? theme?.font_color_0
                                    : "#ffffff",
                                }}
                                expanded={expanded === item.slug}
                                onChange={handleChange(item.slug)}
                              >
                                {mainEvent.name != item.name && (
                                  <AccordionSummary
                                    expandIcon={
                                      <ExpandMoreIcon
                                        style={{
                                          color: "#88a1ab",
                                          fontSize: "18px",
                                        }}
                                      />
                                    }
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    onClick={() => {
                                      getSubrooms(item.slug);
                                    }}
                                  >
                                    <Typography
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontFamily: "URW DIN REGULAR",
                                        fontSize: "14px",
                                      }}
                                    >
                                      <img
                                        style={{
                                          width: "44px",
                                          height: "44px",
                                          marginRight: "5px",
                                          marginLeft: "10px",
                                        }}
                                        alt="space_logo"
                                        src={item.main_logo}
                                      />
                                      {toSentenceCase(item.name)}
                                    </Typography>
                                  </AccordionSummary>
                                )}

                                <AccordionDetails style={{ padding: "0px" }}>
                                  <Paper
                                    sx={{
                                      maxWidth: "100%",
                                      padding: "0px",
                                      background: theme?.bg_color_2
                                        ? theme?.bg_color_2
                                        : "#012a50",
                                      color: theme?.font_color_0
                                        ? theme?.font_color_0
                                        : "#ffffff",
                                    }}
                                  >
                                    <MenuList style={{ padding: "0px" }}>
                                      {item?.subrooms?.map((subroom) => (
                                        <MenuItem
                                          // sx={{
                                          //   "&:hover": {
                                          //     background: "red",
                                          //   },
                                          // }}

                                          onMouseEnter={() => {
                                            sethover(subroom.slug);
                                          }}
                                          onMouseLeave={() => {
                                            sethover("");
                                          }}
                                          sx={{
                                            "&:hover": {
                                              backgroundColor:
                                                theme?.bg_color_3,
                                            },
                                            height: "50px",
                                            background:
                                              subEvent.id === subroom.id
                                                ? theme?.button_color_0
                                                : theme?.bg_color_4,
                                          }}
                                        >
                                          <ListItemText
                                            disableTypography
                                            style={{ paddingLeft: "18%" }}
                                            primary={
                                              <Typography
                                                style={{
                                                  fontFamily: "URW DIN REGULAR",
                                                  fontSize: "14px",
                                                }}
                                              >
                                                {`${toSentenceCase(
                                                  subroom.name
                                                )} ${
                                                  subroom.is_master
                                                    ? "(Main)"
                                                    : ""
                                                }`}
                                              </Typography>
                                            }
                                          ></ListItemText>

                                          {hover === subroom.slug &&
                                            subEvent.id !== subroom.id && (
                                              <CustomTooltip
                                                text={"Join Now"}
                                                placement="top-start"
                                              >
                                                <div
                                                  style={{
                                                    backgroundColor: hoverjoin
                                                      ? theme?.button_color_0
                                                      : theme?.bg_color_1,

                                                    width: "35px",
                                                    height: "30px",
                                                    borderRadius: "4px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                  }}
                                                  onClick={() => {
                                                    changeSubSpaceNew(
                                                      subroom,
                                                      // @ts-ignore
                                                      item.subrooms,
                                                      item.slug
                                                    );
                                                  }}
                                                  onMouseEnter={() => {
                                                    sethoverjoin(true);
                                                  }}
                                                  onMouseLeave={() => {
                                                    sethoverjoin(false);
                                                  }}
                                                >
                                                  {
                                                    <img
                                                      alt=""
                                                      src="/assets/switch_space/join.svg"
                                                      style={{
                                                        width: "18px",
                                                        filter: hoverjoin
                                                          ? "brightness(0) invert(1)"
                                                          : "",
                                                      }}
                                                    />
                                                  }
                                                </div>
                                              </CustomTooltip>
                                            )}
                                          {window.location.href.indexOf(
                                            "lobby"
                                          ) > -1 ? (
                                            subEvent.id === subroom.id ? (
                                              <></>
                                            ) : (
                                              hover === subroom.slug && (
                                                <CustomTooltip
                                                  text={"Open in new tab"}
                                                  placement="top-start"
                                                >
                                                  <div
                                                    style={{
                                                      backgroundColor: hovertab
                                                        ? theme?.button_color_0
                                                        : theme?.bg_color_1,
                                                      width: "35px",
                                                      height: "30px",
                                                      borderRadius: "4px",
                                                      display: "flex",
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                      marginLeft: "10px",
                                                    }}
                                                    onClick={(e) => {
                                                      e.stopPropagation();

                                                      openInNewTab(
                                                        changeSubSpaceUrl(
                                                          subroom,
                                                          // @ts-ignore
                                                          item.subrooms,
                                                          item.slug
                                                        )
                                                      );
                                                    }}
                                                    onMouseEnter={() => {
                                                      sethovertab(true);
                                                    }}
                                                    onMouseLeave={() => {
                                                      sethovertab(false);
                                                    }}
                                                  >
                                                    <img
                                                      alt=""
                                                      src="/assets/switch_space/new_tab.svg"
                                                      style={{
                                                        width: "18px",
                                                        filter: hovertab
                                                          ? "brightness(0) invert(1)"
                                                          : "",
                                                      }}
                                                    />
                                                  </div>
                                                </CustomTooltip>
                                              )
                                            )
                                          ) : (
                                            hover === subroom.slug && (
                                              <CustomTooltip
                                                text={
                                                  subEvent.id === subroom.id
                                                    ? "Leave Event"
                                                    : "Open in new tab"
                                                }
                                                placement="top-start"
                                              >
                                                <div
                                                  style={{
                                                    backgroundColor:
                                                      subEvent.id === subroom.id
                                                        ? "#E61959"
                                                        : hovertab
                                                        ? theme?.button_color_0
                                                        : theme?.bg_color_1,
                                                    width: "35px",
                                                    height: "30px",
                                                    borderRadius: "4px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    marginLeft: "10px",
                                                  }}
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (
                                                      subEvent.id === subroom.id
                                                    ) {
                                                      setOpendrop(true);
                                                    } else {
                                                      openInNewTab(
                                                        changeSubSpaceUrl(
                                                          subroom,
                                                          // @ts-ignore
                                                          item.subrooms,
                                                          item.slug
                                                        )
                                                      );
                                                    }
                                                  }}
                                                  onMouseEnter={() => {
                                                    sethovertab(true);
                                                  }}
                                                  onMouseLeave={() => {
                                                    sethovertab(false);
                                                  }}
                                                >
                                                  {subEvent.id ===
                                                  subroom.id ? (
                                                    <img
                                                      alt=""
                                                      src="/assets/bottomIcons/hangup_white.svg"
                                                      style={{
                                                        width: "24px",
                                                      }}
                                                    />
                                                  ) : (
                                                    <img
                                                      alt=""
                                                      src="/assets/switch_space/new_tab.svg"
                                                      style={{
                                                        width: "18px",
                                                        filter: hovertab
                                                          ? "brightness(0) invert(1)"
                                                          : "",
                                                      }}
                                                    />
                                                  )}
                                                </div>
                                              </CustomTooltip>
                                            )
                                          )}
                                        </MenuItem>
                                      ))}
                                    </MenuList>
                                  </Paper>
                                </AccordionDetails>
                              </Accordion>
                            </div>
                          );
                        })}
                        {spacesNotAssigned?.map((item) => {
                          return (
                            <div>
                              <Accordion
                                sx={{
                                  "&:hover": {
                                    backgroundColor: theme?.bg_color_0,
                                  },
                                  background: theme?.bg_color_2
                                    ? theme?.bg_color_2
                                    : "#012243",
                                  color: theme?.font_color_0
                                    ? theme?.font_color_0
                                    : "#ffffff",
                                  margin: "5px 0px",
                                }}
                                expanded={expanded === item.slug}
                                onChange={handleChange(item.slug)}
                              >
                                <AccordionSummary
                                  expandIcon={
                                    <ExpandMoreIcon
                                      style={{
                                        color: theme?.font_color_0
                                          ? theme?.font_color_0
                                          : "#88a1ab",
                                        fontSize: "18px",
                                      }}
                                    />
                                  }
                                  aria-controls="panela-content"
                                  id="panel2a-header"
                                  onClick={() => {
                                    getSubrooms(item.slug);
                                  }}
                                >
                                  <Typography
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      fontFamily: "URW DIN REGULAR",
                                    }}
                                  >
                                    <img
                                      style={{
                                        width: "44px",
                                        height: "44px",
                                        marginRight: "5px",
                                        marginLeft: "10px",
                                      }}
                                      alt="space_logo"
                                      src={item.main_logo}
                                    />
                                    {toSentenceCase(item.name)}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails style={{ padding: "0px" }}>
                                  <Paper
                                    sx={{
                                      maxWidth: "100%",
                                      padding: "0px",
                                      background: theme?.bg_color_4
                                        ? theme?.bg_color_4
                                        : "#012a50",
                                      color: theme?.font_color_0
                                        ? theme?.font_color_0
                                        : "#ffffff",
                                    }}
                                  >
                                    <MenuList style={{ padding: "0px" }}>
                                      {item?.subrooms?.map((subroom) => (
                                        <MenuItem
                                          sx={{
                                            "&:hover": {
                                              backgroundColor:
                                                theme?.bg_color_3,
                                            },
                                            height: "50px",
                                            // background:
                                            //   subEvent.id === subroom.id
                                            //     ? theme?.button_color_0
                                            //     : theme?.bg_color_3,
                                          }}
                                          // onClick={() => {
                                          //   changeSubSpaceNew(
                                          //     subroom,
                                          //     item.subrooms,
                                          //     item.slug
                                          //   );
                                          // }}
                                          onMouseEnter={() => {
                                            sethover(subroom.slug);
                                          }}
                                          onMouseLeave={() => {
                                            sethover("");
                                          }}
                                        >
                                          <ListItemText
                                            disableTypography
                                            style={{ paddingLeft: "18%" }}
                                            primary={
                                              <Typography
                                                style={{
                                                  fontFamily: "URW DIN REGULAR",
                                                  fontSize: "14px",
                                                }}
                                              >
                                                {`${toSentenceCase(
                                                  subroom.name
                                                )} ${
                                                  subroom.is_master
                                                    ? "(Main)"
                                                    : ""
                                                }`}
                                              </Typography>
                                            }
                                          ></ListItemText>

                                          {hover === subroom.slug && (
                                            <CustomTooltip
                                              text="Join Now"
                                              placement="top-start"
                                            >
                                              <div
                                                style={{
                                                  backgroundColor:
                                                    subEvent.id === subroom.id
                                                      ? "#E61959"
                                                      : hoverjoin
                                                      ? theme?.button_color_0
                                                      : theme?.bg_color_1,
                                                  width: "35px",
                                                  height: "30px",
                                                  borderRadius: "4px",
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                }}
                                                onMouseEnter={() => {
                                                  sethoverjoin(true);
                                                }}
                                                onMouseLeave={() => {
                                                  sethoverjoin(false);
                                                }}
                                                onClick={() => {
                                                  changeSubSpaceNew(
                                                    subroom,
                                                    // @ts-ignore
                                                    item.subrooms,
                                                    item.slug
                                                  );
                                                }}
                                              >
                                                {/* {subEvent.id === subroom.id ? (
                                              <img
                                                alt=""
                                                src="/assets/bottomIcons/hangup_white.svg"
                                                style={{
                                                  width: "24px",
                                                  transform: "scaleX(-1)",
                                                }}
                                              />
                                            ) : ( */}
                                                <img
                                                  alt=""
                                                  src="/assets/switch_space/join.svg"
                                                  style={{
                                                    width: "18px",
                                                    filter: hoverjoin
                                                      ? "brightness(0) invert(1)"
                                                      : "",
                                                  }}
                                                />
                                                {/* )} */}
                                              </div>
                                            </CustomTooltip>
                                          )}
                                          {hover === subroom.slug && (
                                            <CustomTooltip
                                              text="Open in new tab"
                                              placement="top-start"
                                            >
                                              <div
                                                style={{
                                                  backgroundColor: hovertab
                                                    ? theme?.button_color_0
                                                    : theme?.bg_color_1,
                                                  width: "35px",
                                                  height: "30px",
                                                  borderRadius: "4px",
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  marginLeft: "10px",
                                                }}
                                                onMouseEnter={() => {
                                                  sethovertab(true);
                                                }}
                                                onMouseLeave={() => {
                                                  sethovertab(false);
                                                }}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  openInNewTab(
                                                    changeSubSpaceUrl(
                                                      subroom,
                                                      item.subrooms,
                                                      item.slug
                                                    )
                                                  );
                                                }}
                                              >
                                                <img
                                                  alt=""
                                                  src="/assets/switch_space/new_tab.svg"
                                                  style={{
                                                    width: "18px",
                                                    filter: hovertab
                                                      ? "brightness(0) invert(1)"
                                                      : "",
                                                  }}
                                                />
                                              </div>
                                            </CustomTooltip>
                                          )}
                                        </MenuItem>
                                      ))}
                                    </MenuList>
                                  </Paper>
                                </AccordionDetails>
                              </Accordion>
                            </div>
                          );
                        })}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            borderRadius: "4px",
            zIndex: "5",
          }}
        >
          <Skeleton
            variant="rounded"
            sx={{
              backgroundColor: theme?.loading?.loadingColor,
              display: "flex",
            }}
            width={365}
            height={60}
          />
        </div>
      )}

      {opendrop && (
        <LeaveDrop
          title={"Exit space"}
          theme={theme}
          content={"Are you sure want to leave the space?"}
          setOpen={setOpendrop}
          openButtonText={"Exit"}
          openButtonfunction={leaveSpace}
          img={"/assets/switch_space/exit.svg"}
          cancelButtonfunction={() => {
            setOpendrop(false);
          }}
        />
      )}
    </>
  );
};
