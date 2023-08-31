import {
  ListSubheader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  InboxIcon,
  DraftsIcon,
  SendIcon,
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
import { AxiosLocal } from "../utilities/axiosUtils.ts";
import { setCurrentSpace } from "../state/local/localSlice";
import { useLocation, useNavigate } from "react-router-dom";

// const menu = [
//   {
//     title: "Hell's Kitchen",
//     img: "assets/icons/room1.svg",
//     items: [
//       { title: "Main" },
//       { title: "Breakout space1" },
//       { title: "Vitae Minima Tempora" },
//       { title: "Fuga Aut Quia" }
//     ]
//   },
//   {
//     title: "Lego Masters",
//     img: "assets/images/Room2.png",
//     items: [
//       { title: "Main" },
//       { title: "Vitae Minima Tempora" },
//       { title: "Fuga Aut Quia" }
//     ]
//   },
//   {
//     title: "The Masked Singer",
//     img: "assets/images/masked_singer.png",
//     items: [
//       { title: "Main" },
//       { title: "Vitae Minima Tempora" },
//       { title: "Fuga Aut Quia" }
//     ]
//   },
// ];

const initialState = { main: false };

function reducer(state, action) {
  switch (action.type) {
    case "toggleMain":
      return { main: !state.main };
    default:
      throw new Error();
  }
}

export default function NestedList() {
  const [show, setShowDispatch] = useReducer(reducer, initialState);
  const [openNav, setOpenNav] = useState(false);
  const anchorRef = useRef(null);
  const permissions = useSelector((state) => state.permissions);

  const [is_show_parent_index, setIsShowParentIndex] = useState(0);
  const [child_selected_index, setChildSelectedIndex] = useState([0, 0]);
  const dispatch = useDispatch();
  // Theme color dark and light
  const theme_color = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();
  const handleToggle = () => {
    setOpenNav((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
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
  const location = useLocation();

  const [mainEvent, setmainEvent] = useState({});
  const [mainEvents, setmainEvents] = useState([]);
  const [subEvent, setsubEvent] = useState([]);
  const [selectedSubEvent, setselectedSubEvent] = useState(null);
  const [subEventNames, setsubEventNames] = useState([]);
  const [currentSelectedSpaceName, setcurrentSelectedSpaceName] = useState(
    localStorage.getObject("currentSpaceName")
  );
  const [subrooms, setsubrooms] = useState([]);
  const isEmpty = (obj) => {
    return obj == undefined ? false : Object.keys(obj).length !== 0;
  };

  useEffect(() => {
    console.log("EventList");
    AxiosLocal.get("breakoutSpaces/")
      .then(function (response) {
        let path = location.pathname.substring(
          location.pathname.lastIndexOf("/") + 1
        );
        console.log(response.data.subrooms, "EventListResponse");
        // let currentSpace = response.data.data.map(element => {
        //   console.log(element,"mainEventListElem");
        //   if (element.main_name === localStorage.getObject('currentSpaceName')){
        //     return element
        //   }
        // });
        setmainEvents(response.data.data);
        let currentSpace = response.data.subrooms.find(function (e) {
          console.log(e.slug, path, "mainEventListElem");
          return e.slug === path;
        });

        console.log(currentSpace, "currentSpaceName");
        let result = response.data.subrooms.reduce(function (r, a) {
          r[a.room_name] = r[a.room_name] || [];
          r[a.room_name].push(a);
          return r;
        }, Object.create(null));
        var groups = Object.keys(result).map(function (key) {
          return {
            title: key,
            items: result[key],
            img: result[key][0].room_image,
            room_slug: result[key][0].room_slug,
          };
        });
        console.log(groups, "resultresult");
        setmainEvent(currentSpace);
        setsubrooms(groups);
        response.data.subrooms.forEach((element) => {
          console.log(element, "subEventListElem");
          if (
            element.slug ===
            location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
          ) {
            window.location.href.indexOf("lobby") > -1 &&
              changeSubSpace(element, response.data.subrooms);

            // if(!subEventNames.includes(element.name)){
            //   subEventNames.push(element.name)
            //   subEvent.push(element)
            // }

            console.log("changeSubSpace", element);
          }
        });

        console.log(subEvent, "subEvent[0]subEvent[0]");

        // setselectedSubEvent(subEvent[0])
        // if(!localStorage.getObject('currentSubSpaceName')){
        //   localStorage.setObject('currentSubSpaceName',subEvent[0].name)
        //   localStorage.setObject('currentSubSpaceSlug',subEvent[0].slug)
        // }

        console.log(subEvent, "subEventList");
        setsubEvent(response.data.subrooms);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [localStorage.getObject("currentSpaceName")]);

  console.log(mainEvent, "EventListResponse");
  console.log(
    subEvent,
    window.location.href.indexOf("spaces") > -1,
    "EventListResponseEventListResponse"
  );

  const menu = [
    {
      title: mainEvent ? mainEvent.name : "",
      img: mainEvent ? mainEvent.main_logo : "",
      items: subEvent.length !== 0 ? subEvent : [],
    },
  ];

  const prevOpen = useRef(openNav);

  useEffect(() => {
    if (prevOpen.current === true && openNav === false)
      anchorRef.current.focus();
    prevOpen.current = openNav;
  }, [openNav]);

  useEffect(() => {
    document.body.style.backgroundColor = "#032e57";
  }, []);

  const changeSubSpace = (subSpace, subevents) => {
    console.log("changeSubSpace", subSpace, subEvent);
    setselectedSubEvent(subSpace);
    if (!subevents) {
      subevents = subEvent;
    }
    let currentSpace = subevents.find(function (e) {
      return e.slug === subSpace.room_slug;
    });
    console.log(currentSpace, "currentSpace");
    setmainEvent(currentSpace);
    setIsShowParentIndex(currentSpace.room_slug);
    setChildSelectedIndex([currentSpace.room_slug, currentSpace.slug]);
    dispatch(
      setCurrentSpace({
        currentSubspace: subSpace,
        currentSpaceName: subSpace.room_name,
        currentSubSpaceName: subSpace.name,
        currentSubSpaceSlug: subSpace.room_slug,
      })
    );
    // localStorage.setObject('currentSpaceName',subSpace.room_name)
    localStorage.setObject("currentSubSpaceId", subSpace.id);
    localStorage.setObject("currentSpaceSlug", subSpace.room_slug);
    // localStorage.setObject('currentSubSpaceName',subSpace.name)
    // localStorage.setObject('currentSubSpaceSlug',subSpace.slug)
    if (!(window.location.href.indexOf("lobby") > -1)) {
      if (
        localStorage.getObject("currentSubSpaceName") ===
        localStorage.getObject("currentSpaceName")
      ) {
        window.location.href = `/${localStorage.getObject("currentSpaceSlug")}`;
      } else {
        window.location.href = `/${localStorage.getObject(
          "currentSpaceSlug"
        )}/${localStorage.getObject("currentSubSpaceSlug")}`;
      }
      setTimeout(() => window.location.reload(), 3000);
    } else {
      navigate(
        `/lobby/${localStorage.getObject("organization_slug")}/${
          subSpace.slug
        }`,
        { replace: true }
      );
    }
    console.log(window.location, "currentLocation");
  };

  return isEmpty(mainEvent) ? (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        backgroundColor: "#012243",
        borderRadius: "4px",
        Margin: "8px 0",
        zIndex: "5",
      }}
    >
      {/* --- room dropdown --- */}

      <div>
        <Button
          disabled={!permissions.can_switch_breakout_space}
          ref={anchorRef}
          id="composition-button"
          aria-controls={openNav ? "composition-menu" : undefined}
          aria-expanded={openNav ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{
            position: "relative",
            width: "365px",
            height: "44px",
            paddingLeft: "0px",
            justifyContent: "start",
            backgroundColor: theme_color == "dark" ? "#012243" : "#E1E7EA",
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
              style={{ width: "44px", height: "44px", marginRight: "10px" }}
              src={
                mainEvent?.room_image
                  ? mainEvent.room_image
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
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "none",
                color: "#88A1AB",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                //backgroundColor: "red"
              }}
            >
              <span
                style={{ color: theme_color == "dark" ? "white" : "#4B6D85" }}
              >
                {isEmpty(mainEvent) ? mainEvent.name : "Hell’s Kitchen"}
              </span>{" "}
              -{" "}
              {subEvent.length !== 0 &&
              localStorage.getObject("currentSubSpaceName")
                ? localStorage.getObject("currentSubSpaceName") ==
                  localStorage.getObject("currentSpaceName")
                  ? " Main"
                  : localStorage.getObject("currentSubSpaceName")
                : "Breakout Space1"}
            </Typography>
          </Box>

          <img
            style={{
              position: "absolute",
              width: "10px",
              height: "5.5px",
              //padding:'20px',
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
                  backgroundColor:
                    theme_color == "dark" ? "#012243" : "#E1E7EA",
                  color: "#88A1AB",
                  borderRadius: "0px",
                  fontSize: "16px",
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={openNav}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {subrooms.map((item, index) => {
                      if (item.room_slug == selectedSubEvent?.slug) {
                        console.log(item, selectedSubEvent, "selectedSubEvent");
                      }

                      return (
                        <>
                          <MenuItem
                            style={{ margin: "7px 0px" }}
                            onClick={() => {
                              setIsShowParentIndex(
                                item.room_slug == is_show_parent_index
                                  ? -1
                                  : item.room_slug
                              );
                            }}
                          >
                            {is_show_parent_index === item.room_slug ? (
                              <img
                                style={{
                                  width: "10px",
                                  height: "5.5px",
                                  padding: "10px",
                                }}
                                src="/assets/icons/up.svg"
                              />
                            ) : (
                              <img
                                style={{
                                  width: "10px",
                                  height: "5.5px",
                                  padding: "10px",
                                }}
                                src="/assets/icons/down.svg"
                              />
                            )}

                            <img
                              style={{
                                width: "44px",
                                height: "44px",
                                marginRight: "5px",
                                marginLeft: "10px",
                              }}
                              src={item.img}
                            />

                            <span
                              style={{
                                paddingLeft: "19px",
                                fontSize: "16px",
                                fontWeight: "600",
                              }}
                            >
                              {item.title}
                            </span>
                          </MenuItem>

                          {item.items.map((data, i) => (
                            <Collapse
                              in={is_show_parent_index === item.room_slug}
                              timeout="auto"
                              unmountOnExit
                              onClick={() => {
                                changeSubSpace(data);
                                setChildSelectedIndex([
                                  item.room_slug,
                                  data.slug,
                                ]);
                              }}
                            >
                              <List component="div" style={{ padding: "0px" }}>
                                {
                                  <MenuItem
                                    style={{
                                      maxWidth: "365px",
                                      paddingLeft: "122px",
                                      paddingTop: "20px",
                                      paddingBottom: "20px",
                                      fontSize: "16px",
                                      fontWeight:
                                        child_selected_index[0] ==
                                          item.room_slug &&
                                        child_selected_index[1] == data.slug
                                          ? "600"
                                          : "400",
                                      //backgroundColor: "red",
                                      backgroundColor:
                                        child_selected_index[0] ==
                                          item.room_slug &&
                                        child_selected_index[1] == data.slug
                                          ? theme_color == "dark"
                                            ? "#143F63"
                                            : "#E1E7EA"
                                          : theme_color == "dark"
                                          ? "#012A50"
                                          : "white",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    <div
                                      style={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                      }}
                                    >
                                      {data.name}
                                      {data.is_master ? " - Main" : ""}
                                    </div>
                                  </MenuItem>
                                }
                              </List>
                            </Collapse>
                          ))}
                        </>
                      );
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      <Collapse
        style={{ marginTop: "20vh" }}
        in={show.main}
        timeout="auto"
        unmountOnExit
      >
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              onClick={() => setShowDispatch({ type: "toggleMain" })}
              component="div"
              id="nested-list-subheader"
            >
              Nested List Items
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Sent mail" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </List>
      </Collapse>
    </div>
  ) : (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        borderRadius: "4px",
        Margin: "8px 0",
        zIndex: "5",
      }}
    >
      <Skeleton
        variant="rounded"
        sx={{ backgroundColor: "#012243", display: "flex" }}
        width={365}
        height={45}
      />
    </div>
  );
}
