import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  InputAdornment,
  Button,
  Divider,
  Stack,
  InputLabel,
  InputBase,
  IconButton,
  Skeleton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import FormControlLabel from "@mui/material/FormControlLabel";
import Toast from "../../../sections/Toast";
import CopiedToClip from "../../CopiedToClip";
import ConfirmPop from "../ConfirmPop";
import MediaFileManager from "../MediaFileManager";
import dayjs from "dayjs";
import { AxiosLocal } from "../../../utilities/axiosUtils.ts";
import useHover from "../use-hover";
import MuiTextField from "../MuiTextField";
import InvitePeopleDrop from "../InvitePeopleDrop";
import AddEventDrop from "../AddEventDrop";
import TeamViewtypeDrop from "../TeamViewtypeDrop";
import IOSSwitch from "../CustomSwitch";
import CustomTooltip from "../../CustomTooltip";
import MaterialUIPickers from "../MaterialUIPickers";
import LobbyTypeDrop from "../LobbyTypeDrop";
import CustomThemeColorSelector from "../CustomTheme";
import OnlineUser from "./onlineUser";
import { WEBSITE_DOMAIN } from "../../../utilities/websiteUrls.ts";
import {
  changeOpacity,
  formatDate,
  organizationUser,
} from "../../../utilities/common";
import ColorPaletteTab from "./colorPaletteTab.tsx";
import {
  setColorPalette,
  setIndividualColor,
  setToInitialState,
  setDarkColorPalette,
  setLightColorPalette,
  setColorPickerColor,
} from "../../../state/colorPalette/colorPaletteSlice.ts";
import moment from "moment";
import { toTimeZone } from "../../../utilities/timeZoneUtils.ts";
import { useLocation } from "react-router-dom";

const EventEdit = (props) => {
  const theme = useSelector((state) => state.theme.themeData);
  const colorPalette = useSelector((state) => state.colorPalette.colorPalette);
  const permissions = useSelector((state) => state.permissions);
  const [changedval, setChangedval] = useState();
  const [eventName, setEventName] = useState(props.event.name);
  const [url, setUrl] = useState(props.event.slug);
  const [image, setImage] = useState(props.event.main_logo);
  const [imageLobby, setImageLobby] = useState(
    props.event.lobby_image
      ? props.event.lobby_image
      : "/assets/images/lobbybg.png"
  );
  const [imagebg, setImagebg] = useState(props.event.background_image);

  const dispatch = useDispatch();

  const location = useLocation();

  const [videoLobby, setvideoLobby] = useState(
    props.event.lobby_video
      ? props.event.lobby_video
      : "https://video.fandango.com/MPX/video/NBCU_Fandango/24/443/source_AC25FE42-A8EB-49EA-8223-6EDF318C540CTheMaskedSingerS4FirstLook_1795331651593_mp4_video_1920x1080_8000000_primary_audio_eng_9.mp4"
  );

  const [date, setdate] = useState(props.event.event_mode);
  const [startDate, setstartDate] = React.useState(
    props.event.event_start ? dayjs(props.event.event_start) : dayjs()
  );
  const [endDate, setendDate] = React.useState(
    props.event.event_end
      ? dayjs(props.event.event_end)
      : dayjs().add(1, "hour")
  );
  console.log(startDate, endDate, "startDate, endDate");
  const [breakoutRooms, setbreakoutRooms] = useState([]);
  const [breakoutHover, setBreakoutHover] = useState(false);

  const [eventType, seteventType] = React.useState(props.event.public_mode);
  const [password, setPassword] = useState(props.event.password_text);
  const [hidePassword, sethidePassword] = useState(false);
  const [namexists, setnamexists] = useState(false);
  const [specialChar, setspecialChar] = useState(false);
  function doesNotStartWithSpecialChar(str) {
    return /^[0-9 !@#$%^&*)(']/.test(str);
  }

  const handleClickHidePassword = () => {
    sethidePassword(!hidePassword);
  };

  const handleMouseDownHidePassword = (event) => {
    event.preventDefault();
  };
  const [lobbyType, setLobbyType] = useState(
    props.event.lobby_type ? props.event.lobby_type : "I"
  );
  const [autoStartSpace, setautoStartSpace] = useState(
    props.event.auto_start_space
  );

  const [lobby, setLobby] = useState(props.event.is_lobby);
  const [bg, setBg] = useState(
    props.event.background_image &&
    props.event.background_image !==
    "https://pub-d6edaebcd6474ac499bdcb399e4e121c.r2.dev/bbcd00d0-7c3c-47ea-a0c2-182f358dcd0f.jpeg"
  );

  const [overridetheme, setOverridetheme] = useState(
    props.event.override_theme ? props.event.override_theme : false
  );

  const [lightTheme, setlightTheme] = useState(props.event.light_theme);

  const [darkTheme, setdarkTheme] = useState(props.event.dark_theme);

  const [showPasswordSection, setshowPasswordSection] = useState(
    props.event.add_password
  );

  const [viewType, setViewType] = useState(props.event.default_viewer_type);
  const [hiddenUserPresents, sethiddenUserPresents] = useState("P");
  //passwordValidation
  const [passwordValidation, setpasswordValidation] = useState(false);

  let conference = useSelector((state) => state.conference);
  const [subscribedToCentrifugo, setsubscribedToCentrifugo] = useState(false);

  useEffect(() => {
    users();
    subrooms();
  }, []);

  const users = () => {
    AxiosLocal.post(`spaces/assigned/users/`, {
      space_ids: [props.event.id],
    }).then((response) => {
      if (response.data.status == "Success") {
        setIsSelected([...response.data.data[0].users]);
      }
    });
  };

  const subrooms = () => {
    AxiosLocal.post(`spaces/sub/`, {
      main_space_slug: props.event.slug,
    }).then((response) => {
      console.log(response.data.data, "response.data.data");
      if (response.data.status == "Success") {
        setbreakoutRooms([...response.data.data]);
      }
    });
  };

  useEffect(() => {
    if (conference.centrifugoClient && !subscribedToCentrifugo) {
      let path = location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1
      );
      AxiosLocal.post("centrifugo/space", {
        subspace_slug: path,
      })
        .then((res) => {
          console.log(res.data, "centrifugo");
          let eventToken = res.data.token;

          try {
            // @ts-ignore
            const eventChanel = (window.eventChanel =
              window.centrugeClient.newSubscription(res.data.channel_name, {
                token: eventToken,
                joinLeave: true,
              }));
            console.log(res.data.channel_name, eventToken, "centrifugo");

            eventChanel.subscribe();
          } catch (err) {
            console.log(err, "centrifugo");
          }

          setsubscribedToCentrifugo(true);
        })
        .catch((err) => {
          console.log(err, "centrifugo");
        });
    }

    return () => {
      console.log("unsubscribing centrifugo");
      // window.eventChanel?.unsubscribe();
    };
  }, [conference.centrifugoClient, subscribedToCentrifugo]);

  const [addFilePopup, setAddFilePopup] = useState(false);
  const [addFilePopupImage, setAddFilePopupImage] = useState(false);
  const [addFilePopupImageLobby, setAddFilePopupImageLobby] = useState(false);
  const [addFilePopupImageBg, setAddFilePopupImageBg] = useState(false);

  function closeShareHandler() {
    setAddFilePopup(!addFilePopup);
    console.log("share");
  }
  function closeShareHandlerImage() {
    setAddFilePopupImage(!addFilePopupImage);
  }

  function closeShareHandlerImageLobby() {
    setAddFilePopupImageLobby(!addFilePopupImageLobby);
  }

  function closeShareHandlerImageBg() {
    setAddFilePopupImageBg(!addFilePopupImageBg);
  }
  //overlay
  const [overlay, setOverlay] = useState(false);

  //invitepeopledrop
  const [selected, setIsSelected] = useState([]);

  const [loader, setloader] = useState(false);

  function formatDate(tdate) {
    var hours = tdate.getHours();
    var minutes = tdate.getMinutes();
    var strTime = hours + ":" + minutes;
    return (
      tdate.getMonth() +
      1 +
      "/" +
      tdate.getDate() +
      "/" +
      tdate.getFullYear() +
      " " +
      strTime
    );
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  // const eventstartDate = formatDate(startDate.$d);
  // const eventendDate = formatDate(endDate.$d);
  const eventstartDate = toTimeZone(startDate);
  const eventendDate = toTimeZone(endDate);
  const [formValues, setFormValues] = useState({});
  const [editToast, seteditToast] = useState(false);
  // confirm popup for closing
  const [confirm, setConfirm] = useState(false);
  const handleClickOpen = () => {
    setConfirm(true);
  };

  const handleClickClose = () => {
    setConfirm(false);
  };

  // copy toast

  const [state, setState] = React.useState({
    openCopyToast: false,
    vertical: "bottom",
    horizontal: "center",
  });

  const { vertical, horizontal, openCopyToast } = state;

  const handleClick = (newState) => () => {
    setState({ openCopyToast: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, openCopyToast: false });
  };

  //random password
  const generatePassword = () => {
    const randomPassword =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

    setPassword(randomPassword);
    sethidePassword(true);

    AxiosLocal.post(`event/edit/${props.event.id}/`, {
      password_text: randomPassword,
    }).then((response) => {
      if (response.data.status == "Success") {
        seteditToast(true);
        // window.eventChanel.publish({
        //   event: "lobby_realtime",
        // })
        console.log("lobby_realtime");

        setFormValues({});
      }
    });
  };

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    AxiosLocal.post(`event/edit/${props.event.id}/`, {
      main_logo: image,
      menu_logo: image,
    }).then((response) => {
      console.log(response, "handleAddSpace");
      if (response.data.status == "Success") {
        seteditToast(true);
        setFormValues({});
        //  window.eventChanel.publish({
        //   event: "lobby_realtime",
        // })
        console.log("lobby_realtime");
      }
    });
  }, [image, props.event.id]);

  const isFirstRuneventType = useRef(true);

  useEffect(() => {
    console.log("spaceDateEdit");
    if (isFirstRuneventType.current) {
      isFirstRuneventType.current = false;
      return;
    }
    submit();
  }, [eventType, startDate, endDate, videoLobby, imageLobby, imagebg]);

  const isFirstRunlobbyType = useRef(true);

  useEffect(() => {
    if (isFirstRunlobbyType.current) {
      isFirstRunlobbyType.current = false;
      return;
    }

    AxiosLocal.post(`event/edit/${props.event.id}/`, {
      lobby_type: lobbyType,
    }).then((response) => {
      console.log(response, "handleAddSpace");
      if (response.data.status == "Success") {
        seteditToast(true);
        setFormValues({});
        //  window.eventChanel.publish({
        //   event: "lobby_realtime",
        // })
        console.log("lobby_realtime");
      }
    });
  }, [lobbyType]);

  const isFirstRunguest = useRef(true);

  useEffect(() => {
    if (isFirstRunguest.current) {
      isFirstRunguest.current = false;
      return;
    }

    AxiosLocal.post(`event/edit/${props.event.id}/`, {
      default_viewer_type: viewType,
    }).then((response) => {
      console.log(response, "handleAddSpace");
      if (response.data.status == "Success") {
        seteditToast(true);
        setFormValues({});
        // window.eventChanel.publish({
        //   event: "lobby_realtime",
        // });
        console.log("lobby_realtime");
      }
    });
  }, [viewType]);

  useEffect(() => {
    if (lobbyType == "C") {
      setLobbyType("I");
    }
  }, [date]);

  const submit = () => {
    console.log(formValues, "formValues");
    AxiosLocal.post(`event/edit/${props.event.id}/`, formValues).then(
      (response) => {
        console.log(response, "handleAddSpace");
        if (response.data.status == "Success") {
          seteditToast(true);
          setFormValues({});
          //  window.eventChanel.publish({
          //   event: "lobby_realtime",
          // })
          console.log("lobby_realtime");
        }
      }
    );
  };

  const singleDelete = () => {
    AxiosLocal.delete("subroom/", {
      data: { subroom_ids: [breakoutHover.id] },
    }).then((response) => {
      if (response.data.status === "Success") {
        seteditToast(true);
      }
    });
  };

  useEffect(() => {
    if (showPasswordSection && password == "") {
      setpasswordValidation(true);
    } else {
      setpasswordValidation(false);
    }
  }, [password]);
  const [hoverRef, isHovered] = useHover();
  const [hoverRefbgImage, isHoveredbgImage] = useHover();

  useEffect(() => {
    handleClickScroll();
  }, []);

  const handleClickScroll = () => {
    const element = document.getElementById("section-1");
    console.log(element, "elementelement");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const changeColorPalette = async (colorPaletteData) => {
    console.log(colorPaletteData, "colorPaletteData");

    // let paletteData = {
    //   dark_theme: {
    //     dark_theme_color_0: colorPalette["dark_theme"]["theme_color_0"],
    //     dark_theme_color_1: colorPalette["dark_theme"]["theme_color_1"],
    //     dark_theme_color_2: colorPalette["dark_theme"]["theme_color_2"],
    //     dark_theme_color_3: colorPalette["dark_theme"]["theme_color_3"],
    //     dark_theme_color_4: colorPalette["dark_theme"]["theme_color_4"],
    //     dark_theme_color_5: colorPalette["dark_theme"]["theme_color_5"],
    //     dark_theme_color_6: colorPalette["dark_theme"]["theme_color_6"],
    //     dark_theme_color_7: colorPalette["dark_theme"]["theme_color_7"],
    //     dark_theme_color_8: colorPalette["dark_theme"]["theme_color_8"],
    //     dark_theme_color_9: colorPalette["dark_theme"]["theme_color_9"],
    //     dark_theme_color_10: colorPalette["dark_theme"]["theme_color_10"],
    //     dark_theme_color_11: colorPalette["dark_theme"]["theme_color_11"],
    //     dark_theme_color_12: colorPalette["dark_theme"]["theme_color_12"],
    //     dark_theme_color_13: colorPalette["dark_theme"]["theme_color_13"],
    //     dark_theme_color_14: colorPalette["dark_theme"]["theme_color_14"],
    //     dark_theme_color_15: colorPalette["dark_theme"]["theme_color_15"],
    //   },
    //   light_theme: {
    //     light_theme_color_0: colorPalette["light_theme"]["theme_color_0"],
    //     light_theme_color_1: colorPalette["light_theme"]["theme_color_1"],
    //     light_theme_color_2: colorPalette["light_theme"]["theme_color_2"],
    //     light_theme_color_3: colorPalette["light_theme"]["theme_color_3"],
    //     light_theme_color_4: colorPalette["light_theme"]["theme_color_4"],
    //     light_theme_color_5: colorPalette["light_theme"]["theme_color_5"],
    //     light_theme_color_6: colorPalette["light_theme"]["theme_color_6"],
    //     light_theme_color_7: colorPalette["light_theme"]["theme_color_7"],
    //     light_theme_color_8: colorPalette["light_theme"]["theme_color_8"],
    //     light_theme_color_9: colorPalette["light_theme"]["theme_color_9"],
    //     light_theme_color_10: colorPalette["light_theme"]["theme_color_10"],
    //     light_theme_color_11: colorPalette["light_theme"]["theme_color_11"],
    //     light_theme_color_12: colorPalette["light_theme"]["theme_color_12"],
    //     light_theme_color_13: colorPalette["light_theme"]["theme_color_13"],
    //     light_theme_color_14: colorPalette["light_theme"]["theme_color_14"],
    //     light_theme_color_15: colorPalette["light_theme"]["theme_color_15"],
    //   },
    // };

    AxiosLocal.post(`event/edit/${props.event.id}/`, colorPaletteData).then(
      (response) => {
        if (response.data.status == "Success") {
          seteditToast(true);
          // window.eventChanel.publish({
          //   event: "lobby_realtime",
          // })
          console.log("lobby_realtime");
        }
      }
    );
  };

  useEffect(() => {
    console.log(
      formatDate(startDate.$d),
      startDate.$d,
      moment.tz(startDate.$d, "Asia/Kolkata").format("MM/DD/YYYY HH:mm"),
      "formatDate(startDate.$d)"
    );
    AxiosLocal.post(`event/edit/${props.event.id}/`, {
      event_end: moment
        .tz(endDate.$d, localStorage.getObject("user_timezone"))
        .format("MM/DD/YYYY HH:mm"),
      event_start: moment
        .tz(startDate.$d, localStorage.getObject("user_timezone"))
        .format("MM/DD/YYYY HH:mm"),
    }).then((response) => {
      if (response.data.status == "Success") {
        seteditToast(true);
        // window.eventChanel.publish({
        //   event: "lobby_realtime",
        // })
        console.log("lobby_realtime");
      }
    });
    // submit();
  }, [startDate, endDate]);

  return (
    <>
      <div
        style={{
          alignItems: "center",
          background: changeOpacity(theme?.editspace?.outerbgcolor, 0.9),
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
        <form
          noValidate
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        >
          <Box
            sx={{
              position: "relative",
              background: theme?.editspace?.mainbgcolor,
              borderRadius: "4px",
              width: "700px",
              minHeight: "665px",
              paddingBottom: "1px",
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
                handleClickOpen();
                props.getEventList();
                // props.getEventListWithout()
              }}
            >
              <img alt="" src="/assets/icons/x.svg" />
            </div>
            <Typography
              variant="h5"
              style={{
                color: theme?.spaces?.secondaryColor,
                fontWeight: "700",
                textAlign: "center",
                padding: "23px 0px",
                fontSize: "24px",
                fontFamily: "URW DIN",
              }}
            >
              Edit space
            </Typography>
            <div
              style={{
                position: "absolute",
                right: "32px",
                top: "11px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* <OnlineUser subspaceId={props.event.subroom_list[0]} /> */}
            </div>
            {organizationUser(permissions.edit_space) ? (
              <></>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#E61959",
                }}
              >
                <img src="/assets/images/info-white.svg" alt="" />
                <p
                  style={{
                    fontSize: "14px",
                    color: "white",
                    fontFamily: "URW DIN REGULAR",
                    padding: "0px",
                    margin: "10px",
                  }}
                >
                  Permission for edit space is off for you. please contact owner
                  of the Team.
                </p>
              </div>
            )}
            <Divider
              variant="fullWidth"
              style={{
                borderColor: theme?.editspace?.outerbgcolor,
                margin: "0px 40px",
                borderWidth: "1px",
              }}
            />

            <Stack spacing={1} sx={{ margin: "20px 0px 14px 40px" }}></Stack>
            <div
              className={organizationUser(permissions.edit_space) ? "" : "blur"}
              style={{
                pointerEvents: organizationUser(permissions.edit_space)
                  ? "auto"
                  : "none",
              }}
            >
              <Scrollbars
                style={{
                  width: "100%",
                  height: props.showSection ? "70vh" : "610px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <Stack
                    sx={{ margin: "0px 32px 33px 82px" }}
                    style={{ width: "15%" }}
                  >
                    {image ? (
                      <div
                        style={{
                          borderRadius: "50%",
                          position: "relative",
                          width: "79px",
                          height: "79px",
                        }}
                        onMouseEnter={() => setOverlay(true)}
                        onMouseLeave={() => setOverlay(false)}
                        onClick={closeShareHandlerImage}
                      >
                        <img
                          alt=""
                          src={image}
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "block",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                        />

                        <div
                          className="overlay"
                          style={{
                            backgroundColor: "rgba(0, 139, 205, 0.9)",
                            opacity: overlay ? 1 : 0,
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 3,
                          }}
                        >
                          <img
                            alt=""
                            src="/assets/admin/img-upload.svg"
                            style={{
                              top: "50%",
                              position: "absolute",
                              width: "29px",
                              height: "26px",
                              left: "50%",
                              transform: "translateX(-50%) translateY(-50%)",
                              filter: overlay ? "brightness(0) invert(1)" : "",

                              zIndex: 1,
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        onMouseEnter={() => setOverlay(true)}
                        onMouseLeave={() => setOverlay(false)}
                        style={{
                          border: `2px dashed ${theme?.editspace?.dashedcolor}`,
                          borderRadius: "50%",
                          position: "relative",
                          width: "79px",
                          height: "79px",
                          cursor: "pointer",
                        }}
                        onClick={closeShareHandlerImage}
                      >
                        <input
                          type="text"
                          autoComplete="off"
                          style={{
                            height: "79px",
                            zIndex: 2,
                            position: "relative",
                            width: "79px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0,
                            cursor: "pointer",
                          }}
                        />
                        <img
                          alt=""
                          src="/assets/admin/img-upload.svg"
                          style={{
                            top: "50%",
                            position: "absolute",
                            width: "29px",
                            height: "26px",
                            left: "50%",
                            transform: "translateX(-50%) translateY(-50%)",
                            filter: overlay ? "brightness(0) invert(1)" : "",

                            zIndex: 1,
                          }}
                        />
                        <div
                          className="overlay"
                          style={{
                            backgroundColor: "rgba(0, 139, 205, 0.9)",
                            opacity: overlay ? 1 : 0,
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                          }}
                        ></div>
                      </div>
                    )}
                  </Stack>
                  <Stack
                    sx={{ margin: "0px 42px 24px 0px" }}
                    style={{ width: "85%" }}
                  >
                    <InputLabel
                      htmlFor="Country"
                      style={{
                        color: "#88A1AB",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "URW DIN REGULAR",
                      }}
                    >
                      Space name
                    </InputLabel>
                    <MuiTextField
                      type="text"
                      placeholder="Enter Space Name"
                      value={eventName}
                      onChange={(event) => {
                        setEventName(event.target.value);
                        if (
                          doesNotStartWithSpecialChar(event.target.value[0])
                        ) {
                          setspecialChar(true);
                        } else {
                          setspecialChar(false);
                        }
                        // setUrl(slugify(event.target.value));
                        AxiosLocal.post(`space/name/check/`, {
                          name: event.target.value,
                        }).then((response) => {
                          console.log(
                            response.data.space_exists,
                            "response.data.space_exists"
                          );
                          setnamexists(response.data.space_exists);
                        });
                        if (!namexists || !specialChar) {
                          if (eventName !== event.target.value) {
                            setFormValues({
                              ...formValues,
                              name: event.target.value,
                              room_name: event.target.value,
                              main_name: event.target.value,
                              // slug: slugify(event.target.value),
                            });
                          }
                        }
                      }}
                      nameExists={namexists || specialChar}
                      onBlur={() => {
                        if (!namexists && !specialChar) {
                          submit();
                        }
                      }}
                    />
                    {namexists ? (
                      <div
                        style={{
                          color: "#ae0000",
                          fontSize: "small",
                          marginTop: "5px",
                        }}
                      >
                        Space already exists
                      </div>
                    ) : null}
                    {specialChar && (
                      <div
                        style={{
                          color: "#ae0000",
                          fontSize: "small",
                          marginTop: "5px",
                        }}
                      >
                        Space name cannot start with special character.
                      </div>
                    )}
                  </Stack>
                </div>
                {/* <Stack sx={{ margin: "0px 42px 0px 40px" }}>
                    <InputLabel
                      htmlFor="Country"
                      style={{
                        color: "#88A1AB",
                        fontSize: "14px",
                        fontFamily: "URW DIN REGULAR",
                      }}
                    >
                      Friendly URL (auto generated)
                    </InputLabel>
                  </Stack>

                  <div style={{ display: "flex" }}>
                    <Stack
                      sx={{
                        margin: "0px 0px 24px 40px",
                        display: "flex",
                        width: "40%",
                      }}
                    >
                      <Box
                        style={{
                          backgroundColor: "#143F63",
                          padding: "12px 16px 11px 16px",
                          borderRadius: "4px 0px 0px 4px",
                          color: "#88A1AB",
                          fontSize: "14px",
                          fontFamily: "URW DIN REGULAR",
                        }}
                      >
                        {WEBSITE_DOMAIN}
                        {localStorage.getObject("organization_slug")}
                      </Box>
                    </Stack>

                    <Stack
                      sx={{ margin: "0px 42px 0px 0px" }}
                      style={{ width: "60%" }}
                    >
                      <MuiTextField
                        borderleft="none"
                        // placeholder="Enter url"
                        type="text"
                        value={url}
                        // onChange={(event)=>{
                        //   setChangedval({...changedval, url:event.target.value});

                        //   setUrl(event.target.value)
                        //   }}
                      />
                    </Stack>
                  </div> */}
                <div style={{ display: "flex" }}>
                  <Stack sx={{ margin: "0px 0px 30px 40px", width: "70%" }}>
                    <InputLabel
                      htmlFor="Country"
                      style={{
                        color: "#88A1AB",
                        fontSize: "14px",
                        fontFamily: "URW DIN REGULAR",
                      }}
                    >
                      Invite people
                    </InputLabel>

                    <InvitePeopleDrop
                      selected={selected}
                      setIsSelected={setIsSelected}
                      eventId={props.event.id}
                      seteditToast={seteditToast}
                      centrifugoLoginUpdateDetails={
                        props.centrifugoLoginUpdateDetails
                      }
                      onlineLoader={props.onlineLoader}
                      loggedInUsers={props.loggedInUsers}
                    />
                  </Stack>
                  <Stack sx={{ margin: "0px 0px 30px 0px" }}>
                    <InputLabel
                      htmlFor="Country"
                      style={{
                        color: "#88A1AB",
                        fontSize: "14px",
                        fontFamily: "URW DIN REGULAR",
                      }}
                    >
                      Space type
                    </InputLabel>
                    <AddEventDrop
                      seteventType={seteventType}
                      eventType={eventType}
                      setFormValues={setFormValues}
                    />
                  </Stack>
                </div>
                {eventType && (
                  <Stack sx={{ margin: "0px 42px 23px 40px" }}>
                    <InputLabel
                      htmlFor="Public user enters as"
                      style={{
                        color: "#88A1AB",
                        fontSize: "14px",
                        fontFamily: "URW DIN REGULAR",
                      }}
                    >
                      Public user enters as
                    </InputLabel>
                    <TeamViewtypeDrop
                      viewType={viewType}
                      setViewType={setViewType}
                      componentFor="editEvent"
                    />
                  </Stack>
                )}
                {eventType && (
                  <div style={{ display: "flex" }}>
                    <Stack sx={{ margin: "0px 0px 24px 55px", width: "30%" }}>
                      <FormControlLabel
                        onChange={() => {
                          setshowPasswordSection(!showPasswordSection);

                          if (!showPasswordSection) {
                            const randomPassword =
                              Math.random().toString(36).slice(2) +
                              Math.random().toString(36).slice(2);

                            setPassword(randomPassword);
                            sethidePassword(true);
                            AxiosLocal.post(`event/edit/${props.event.id}/`, {
                              add_password: !showPasswordSection,
                              password_text: randomPassword,
                            }).then((response) => {
                              console.log(response, "handleAddSpace");
                              if (response.data.status == "Success") {
                                seteditToast(true);
                                setFormValues({});
                                // window.eventChanel.publish({
                                //   event: "lobby_realtime",
                                // });
                                console.log("lobby_realtime");
                              }
                            });
                          }
                          // APi call for disabling add password
                          else {
                            AxiosLocal.post(`event/edit/${props.event.id}/`, {
                              add_password: !showPasswordSection,
                              password_text: "",
                            }).then((response) => {
                              console.log(response, "handleAddSpace");
                              if (response.data.status == "Success") {
                                seteditToast(true);
                                setFormValues({});
                                // window.eventChanel.publish({
                                //   event: "lobby_realtime",
                                // });
                                console.log("lobby_realtime");
                              }
                            });
                          }
                        }}
                        er
                        pass
                        control={
                          <IOSSwitch
                            theme={theme}
                            sx={{ marginRight: "15px" }}
                            checked={showPasswordSection}
                          />
                        }
                        label={
                          <span
                            style={{
                              color: "#88A1AB",
                              fontSize: "14px",
                              fontFamily: "URW DIN REGULAR",
                            }}
                          >
                            Add password
                          </span>
                        }
                      />
                    </Stack>
                    {showPasswordSection ? (
                      <Stack sx={{ margin: "0px 42px 0px 0px", width: "70%" }}>
                        <MuiTextField
                          type={hidePassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={password}
                          onChange={(event) => {
                            setPassword(event.target.value);
                            setFormValues({
                              ...formValues,
                              password_text: event.target.value,
                            });
                          }}
                          onBlur={() => {
                            //check showPasswordSection and then api call
                            if (password == "") {
                              setpasswordValidation(true);
                            } else {
                              submit();
                            }
                          }}
                          nameExists={passwordValidation}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <img
                                  alt=""
                                  src="/assets/admin/lock.svg"
                                  style={{ color: "#5D7C90" }}
                                />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickHidePassword}
                                  onMouseDown={handleMouseDownHidePassword}
                                  edge="end"
                                  color="secondary"
                                  disableRipple={true}
                                >
                                  <img
                                    alt=""
                                    src="/assets/admin/eye.svg"
                                    style={{ color: "#5D7C90" }}
                                  />
                                </IconButton>
                                <CustomTooltip
                                  text="Refresh"
                                  placement="top-start"
                                >
                                  <div
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      backgroundColor:
                                        theme?.editspace?.bgcolor1,
                                      marginLeft: "10px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => generatePassword()}
                                  >
                                    <img
                                      alt=""
                                      src="/assets/admin/refresh.svg"
                                      style={{ color: "#5D7C90" }}
                                    />
                                  </div>
                                </CustomTooltip>

                                {/* copy */}

                                <CustomTooltip
                                  type="copy"
                                  text="Copy share link"
                                  placement="top-start"
                                >
                                  <div
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      backgroundColor:
                                        theme?.editspace?.bgcolor1,
                                      marginLeft: "2px",
                                      marginRight: "-12px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      if (password != "") {
                                        handleClick({
                                          vertical: "bottom",
                                          horizontal: "center",
                                        })();
                                      }

                                      if (password == "") {
                                        navigator.clipboard.writeText("");
                                      } else {
                                        navigator.clipboard.writeText(password);
                                      }
                                    }}
                                  >
                                    <img
                                      alt=""
                                      src="/assets/admin/copy.svg"
                                      style={{ color: "#5D7C90" }}
                                    />
                                  </div>
                                </CustomTooltip>
                              </InputAdornment>
                            ),
                          }}
                          InputLabelProps={{
                            style: { color: "#5D7C90" },
                          }}
                        />
                        {passwordValidation ? (
                          <div
                            style={{
                              color: "#ae0000",
                              fontSize: "small",
                              margin: "5px 0px",
                            }}
                          >
                            Add password is on. Password is required.
                          </div>
                        ) : null}
                      </Stack>
                    ) : (
                      <></>
                    )}
                  </div>
                )}

                <Stack sx={{ margin: "15px 42px 0px 40px" }}>
                  <InputLabel
                    htmlFor="Country"
                    style={{
                      color: "#E1E7EA",
                      fontSize: "16px",
                      fontFamily: "URW DIN",
                    }}
                  >
                    Here's the link to your space
                  </InputLabel>
                  <p
                    style={{
                      color: "#88A1AB",
                      fontSize: "16px",
                      fontFamily: "URW DIN REGULAR",
                      margin: "0px",
                    }}
                  >
                    Copy this link and send it to people you want to meet with.
                    Be sure to save it so you can use it later, too.
                  </p>
                </Stack>
                <Stack sx={{ margin: "15px 42px 20px 40px" }}>
                  <MuiTextField
                    font="medium"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img
                            alt=""
                            src="/assets/admin/link-grid.svg"
                            style={{ color: "#88A1AB" }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: theme?.editspace?.outerbgcolor,
                              marginLeft: "2px",
                              marginRight: "-12px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              handleClick({
                                vertical: "bottom",
                                horizontal: "center",
                              })();
                              navigator.clipboard.writeText(
                                `${WEBSITE_DOMAIN}${localStorage.getObject(
                                  "organization_slug"
                                )}/${url}`
                              );
                            }}
                          >
                            <img
                              alt=""
                              src="/assets/admin/copy.svg"
                              style={{ color: "#5D7C90" }}
                            />
                          </div>
                        </InputAdornment>
                      ),
                    }}
                    type="text"
                    placeholder="Link"
                    value={`${WEBSITE_DOMAIN}${localStorage.getObject(
                      "organization_slug"
                    )}/${url}`}
                  />
                </Stack>

                <Stack sx={{ margin: "0px 42px 23px 40px" }}>
                  <InputLabel
                    htmlFor="Hidden user present as"
                    style={{
                      color: "#88A1AB",
                      fontSize: "14px",
                      fontFamily: "URW DIN REGULAR",
                    }}
                  >
                    Hidden user presents video/screen as
                  </InputLabel>
                  <TeamViewtypeDrop
                    viewType={hiddenUserPresents}
                    setViewType={sethiddenUserPresents}
                    componentFor="editEvent"
                    HiddenUser="HiddenUser"
                  />
                </Stack>

                {!props.showSection ? (
                  <Button
                    onClick={() => {
                      props.setShowSection(true);
                    }}
                    style={{
                      backgroundColor: theme?.editspace?.outerbgcolor,
                      color: "#88A1AB",
                      textTransform: "none",
                      fontFamily: "URW DIN REGULAR",
                      padding: "8px 20px",
                      margin: "19px 227px 39px 227px",
                    }}
                  >
                    <img
                      alt=""
                      src="/assets/icons/down.svg"
                      style={{ paddingRight: "17px" }}
                    />
                    Show advanced settings
                  </Button>
                ) : (
                  <></>
                )}
                {props.showSection ? (
                  <>
                    <Divider
                      variant="fullWidth"
                      style={{
                        borderColor: theme?.editspace?.outerbgcolor,
                        margin: "0px 40px",
                        borderWidth: "1px",
                      }}
                    />
                    <Stack sx={{ margin: "15px 42px 23px 40px" }}>
                      <InputLabel
                        htmlFor="Country"
                        style={{
                          color: "#88A1AB",
                          fontSize: "14px",
                          fontFamily: "URW DIN REGULAR",
                        }}
                      >
                        Breakout rooms (comma seperated)
                      </InputLabel>

                      <Box
                        component="form"
                        sx={{
                          p: "2px 2px",
                          backgroundColor: theme?.editspace?.mainbgcolor,
                          display: "flex",
                          alignItems: "center",
                          width: 620,
                          border: `2px solid ${theme?.login?.secondaryColor}`,
                          borderRadius: "4px",
                          fontFamily: "URW DIN REGULAR",
                          fontSize: "14px",
                          whiteSpace: "nowrap",
                          overflowY: "scroll",
                          overflowX: "hidden",
                          maxHeight: "112px",
                        }}
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                      >
                        {breakoutRooms
                          ?.filter((item) => item.is_master !== true)
                          .map((item) => (
                            <>
                              <div
                                style={{
                                  margin: "2px 2px",
                                  backgroundColor:
                                    breakoutHover.id == item.id
                                      ? "#008BCD"
                                      : theme?.editspace?.bgcolor1,
                                  borderRadius: "4px",
                                  color:
                                    breakoutHover.id == item.id
                                      ? "white"
                                      : "#88A1AB",
                                  padding: "5px 28px 8px 15px",
                                  marginRight: "4px",
                                  cursor: "pointer",
                                  position: "relative",
                                }}
                                onMouseEnter={() => setBreakoutHover(item)}
                                onMouseLeave={() => setBreakoutHover("")}
                              >
                                <p style={{ margin: "0px" }}>{item.name}</p>
                                {breakoutHover.id == item.id ? (
                                  <img
                                    alt=""
                                    src="/assets/admin/close-white.svg"
                                    style={{
                                      position: "absolute",
                                      right: "9px",
                                      top: "10px",
                                    }}
                                    onClick={() => {
                                      let Arr = breakoutRooms.filter(
                                        (el) => el.id != item.id
                                      );
                                      setbreakoutRooms([...Arr]);
                                      singleDelete();
                                    }}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            </>
                          ))}
                        {loader && (
                          <Skeleton
                            variant="rounded"
                            sx={{
                              backgroundColor: theme?.loading?.loadingColor,
                              width: "90px",
                              height: "34px",
                            }}
                          />
                        )}

                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          placeholder=""
                          inputProps={{ "aria-label": "" }}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              srooms: [e.target.value],
                            });
                          }}
                          onKeyDown={(e) => {
                            let val = e.target.value;
                            if (e.which === 188 || e.key === "Enter") {
                              // if (e.key === "Enter") {

                              if (val != "") {
                                setloader(true);
                                    e.target.value = "";

                                AxiosLocal.post(`subroom/`, {
                                  mainspace_id: props.event.id,
                                  name: val,
                                }).then((response) => {

                                  if (response.data.status == "Success") {
                                    setloader(false);
                                    setbreakoutRooms([
                                      ...breakoutRooms,
                                      response.data.data,
                                    ]);
                                    seteditToast(true);
                                  }
                                });
                              }
                            }
                          }}
                          style={{
                            fontSize: "14px",
                            color: theme?.spaces?.mainColor,
                            fontFamily: "URW DIN REGULAR",
                            // opacity: breakoutRooms ? 0 : 1,
                          }}
                        />
                      </Box>
                    </Stack>
                    <Divider
                      variant="fullWidth"
                      style={{
                        borderColor: theme?.editspace?.outerbgcolor,
                        margin: "0px 40px",
                        borderWidth: "1px",
                      }}
                    />
                    {/* <div style={{ display: "flex", marginTop: "18px" }}>
                      <Stack
                        sx={{ margin: "22px 0px 24px 55px", width: "30%" }}
                        id="section-1"
                      >
                        <FormControlLabel
                          onChange={() => {
                            setdate(!date);
                            AxiosLocal.post(`event/edit/${props.event.id}/`, {
                              event_mode: !date,
                              event_start: eventstartDate,
                              event_end: eventendDate,
                              // lobby_type: ""
                            }).then((response) => {
                              console.log(response, "handleAddSpace");
                              if (response.data.status == "Success") {
                                seteditToast(true);
                                setFormValues({});
                                // window.eventChanel.publish({
                                //   event: "lobby_realtime",
                                // });
                                console.log("lobby_realtime");
                              }
                            });
                          }}
                          control={
                            <IOSSwitch
                              theme={theme}
                              sx={{ marginRight: "15px" }}
                              defaultChecked={date}
                            />
                          }
                          label={
                            <span
                              style={{
                                color: "#88A1AB",
                                fontSize: "14px",
                                fontFamily: "URW DIN REGULAR",
                              }}
                            >
                              Event mode
                            </span>
                          }
                        />
                      </Stack>
                      {date ? (
                        <>
                          <Stack sx={{ margin: "0px 20px 23px 0px" }}>
                            <InputLabel
                              htmlFor="Country"
                              style={{
                                color: "#88A1AB",
                                fontSize: "14px",
                                fontFamily: "URW DIN REGULAR",
                              }}
                            >
                              Event start date time
                            </InputLabel>
                            <MaterialUIPickers
                              value={startDate}
                              setValue={setstartDate}
                              startDate={eventstartDate}
                              eventendDate={eventendDate}
                              formValues={formValues}
                              setFormValues={setFormValues}
                            />
                          </Stack>

                          <Stack sx={{ margin: "0px 42px 0px 0px" }}>
                            <InputLabel
                              htmlFor="Country"
                              style={{
                                color: "#88A1AB",
                                fontSize: "14px",
                                fontFamily: "URW DIN REGULAR",
                              }}
                            >
                              Event end date time
                            </InputLabel>
                            <MaterialUIPickers
                              value={endDate}
                              setValue={setendDate}
                              startDate={eventstartDate}
                              eventendDate={eventendDate}
                              formValues={formValues}
                              setFormValues={setFormValues}
                            />
                          </Stack>
                        </>
                      ) : (
                        ""
                      )}
                    </div> */}
                    {date ? (
                      <Stack sx={{ margin: "16px 0px 30px 55px" }}>
                        <FormControlLabel
                          onChange={() => {
                            setautoStartSpace(!autoStartSpace);
                            AxiosLocal.post(`event/edit/${props.event.id}/`, {
                              auto_start_space: !autoStartSpace,
                            }).then((response) => {
                              if (response.data.status == "Success") {
                                seteditToast(true);
                                setFormValues({});
                                // window.eventChanel.publish({
                                //   event: "lobby_realtime",
                                // });
                                console.log("lobby_realtime");
                              }
                            });
                          }}
                          control={
                            <IOSSwitch
                              theme={theme}
                              sx={{ marginRight: "15px" }}
                              defaultChecked={autoStartSpace}
                            />
                          }
                          label={
                            <span
                              style={{
                                color: "#88A1AB",
                                fontSize: "14px",
                                fontFamily: "URW DIN REGULAR",
                              }}
                            >
                              Auto start space
                            </span>
                          }
                        />
                      </Stack>
                    ) : (
                      <></>
                    )}
                    <Divider
                      variant="fullWidth"
                      style={{
                        borderColor: theme?.editspace?.outerbgcolor,
                        margin: "0px 40px 29px",
                        borderWidth: "1px",
                      }}
                    />
                    <Stack sx={{ margin: "0px 0px 24px 55px" }}>
                      <FormControlLabel
                        onChange={() => {
                          setLobby(!lobby);
                          console.log(!lobby, "!lobby!lobby");
                          // if(!lobby){
                          AxiosLocal.post(`event/edit/${props.event.id}/`, {
                            is_lobby: !lobby,
                            lobby_type: lobbyType,
                          }).then((response) => {
                            if (response.data.status == "Success") {
                              seteditToast(true);
                              setFormValues({});
                              // window.eventChanel.publish({
                              //   event: "lobby_realtime",
                              // });
                              // console.log("lobby_realtime");
                            }
                          });
                          // }else{
                          //     AxiosLocal.post(`event/edit/${props.event.id}/`, {
                          //       is_lobby: !lobby,
                          //       lobby_type: "I",
                          //     }).then((response) => {
                          //       if (response.data.status == "Success") {
                          //         seteditToast(true);
                          //         setFormValues({});
                          //         // window.eventChanel.publish({
                          //         //   event: "lobby_realtime",
                          //         // });
                          //         // console.log("lobby_realtime");
                          //       }
                          //     });
                          //   }
                        }}
                        control={
                          <IOSSwitch
                            theme={theme}
                            sx={{ marginRight: "15px" }}
                            defaultChecked={lobby}
                          />
                        }
                        label={
                          <span
                            style={{
                              color: "#88A1AB",
                              fontSize: "14px",
                              fontFamily: "URW DIN REGULAR",
                            }}
                          >
                            Enable lobby
                          </span>
                        }
                      />
                    </Stack>
                    {lobby ? (
                      <>
                        <Stack sx={{ margin: "0px 42px 24px 40px" }}>
                          <InputLabel
                            htmlFor="Country"
                            style={{
                              color: "#88A1AB",
                              fontSize: "14px",
                              fontWeight: "400",
                              fontFamily: "URW DIN REGULAR",
                            }}
                          >
                            Lobby type
                          </InputLabel>
                          <LobbyTypeDrop
                            lobbyType={lobbyType}
                            setLobbyType={setLobbyType}
                            eventMode={date}
                          />
                        </Stack>
                        {lobbyType != "C" ? (
                          <Stack sx={{ margin: "0px 42px 24px 40px" }}>
                            <div
                              style={{
                                // formErrors.lobby_image?  "2px dashed #ae0000"
                                border: `2px dashed ${theme?.editspace?.dashedcolor}`,
                                borderRadius: "4px",
                                position: "relative",
                              }}
                            >
                              <input
                                onClick={() => {
                                  if (lobbyType == "I") {
                                    setAddFilePopupImageLobby(
                                      !addFilePopupImageLobby
                                    );

                                    // setFormErrors(validate({
                                    //   ...formValues,

                                    //   lobby_image: imageLobby,
                                    // }, "imageLobby"))

                                    console.log("imgggggg");
                                  } else if (lobbyType == "V") {
                                    setImageLobby("");
                                    closeShareHandler();
                                  } else {
                                    console.log("lobby");
                                  }
                                }}
                                type="number"
                                autoComplete="off"
                                style={{
                                  height: "85px",
                                  zIndex: 2,
                                  position: "relative",
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  opacity: 0,
                                  cursor: "pointer",
                                }}
                                ref={hoverRef}
                              />
                              {imageLobby && lobbyType == "I" ? (
                                <div
                                  style={{
                                    top: "50%",
                                    position: "absolute",
                                    width: "70px",
                                    height: "70px",
                                    left: "50%",
                                    transform:
                                      "translateX(-50%) translateY(-50%)",
                                  }}
                                >
                                  {/* <div style={{position:"relative"}}> */}
                                  <img
                                    alt=""
                                    src={imageLobby}
                                    style={{
                                      borderRadius: "4px",
                                      width: "100%",
                                      height: "100%",
                                      display: "block",
                                      objectFit: "cover",
                                      //  zIndex: 1,
                                    }}
                                  // onMouseEnter={() => {
                                  //   console.log("imageLobby")
                                  //   setOverlayLobby(true)}}
                                  // onMouseLeave={() => setOverlayLobby(false)}
                                  />
                                  <div
                                    // className="overlay"
                                    style={{
                                      backgroundColor: "rgba(0, 139, 205, 0.9)",
                                      opacity: isHovered ? 1 : 0,
                                      width: "100%",
                                      height: "100%",
                                      position: "absolute",
                                      top: 0,
                                      left: 0,
                                      zIndex: 3,
                                      borderRadius: "4px",
                                    }}
                                  >
                                    <img
                                      alt=""
                                      src="/assets/admin/img-upload.svg"
                                      style={{
                                        top: "50%",
                                        position: "absolute",
                                        width: "29px",
                                        height: "26px",
                                        left: "50%",
                                        transform:
                                          "translateX(-50%) translateY(-50%)",
                                        filter: isHovered
                                          ? "brightness(0) invert(1)"
                                          : "",

                                        zIndex: 3,
                                      }}
                                    />
                                  </div>
                                  {/* </div> */}
                                </div>
                              ) : videoLobby ? (
                                <video
                                  src={videoLobby}
                                  style={{
                                    height: "70px",
                                    top: "50%",
                                    position: "absolute",
                                    left: "50%",
                                    transform:
                                      "translateX(-50%) translateY(-50%)",
                                    borderRadius: "4px",
                                  }}
                                  onMouseOver={(event) => event.target.play()}
                                  onMouseOut={(event) => event.target.pause()}
                                />
                              ) : (
                                <img
                                  alt=""
                                  src="/assets/admin/upload.svg"
                                  style={{
                                    top: "50%",
                                    position: "absolute",
                                    width: "20px",
                                    height: "20px",
                                    left: "50%",
                                    transform:
                                      "translateX(-50%) translateY(-50%)",
                                    zIndex: 2,
                                  }}
                                />
                              )}
                            </div>
                          </Stack>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                    <Divider
                      variant="fullWidth"
                      style={{
                        borderColor: theme?.editspace?.outerbgcolor,
                        margin: "0px 40px 24px 40px",
                        borderWidth: "1px",
                      }}
                    />
                    <Stack sx={{ margin: "0px 0px 24px 55px" }}>
                      <FormControlLabel
                        onChange={() => {
                          setBg(!bg);
                          console.log(!bg, "!bg!bg");
                          if (bg) {
                            setImagebg("");
                            AxiosLocal.post(`event/edit/${props.event.id}/`, {
                              background_image:
                                "https://pub-d6edaebcd6474ac499bdcb399e4e121c.r2.dev/bbcd00d0-7c3c-47ea-a0c2-182f358dcd0f.jpeg",
                            }).then((response) => {
                              if (response.data.status == "Success") {
                                //  seteditToast(true);
                                setFormValues({});
                              }
                            });
                          }
                        }}
                        control={
                          <IOSSwitch
                            theme={theme}
                            sx={{ marginRight: "15px" }}
                            defaultChecked={bg}
                          />
                        }
                        label={
                          <span
                            style={{
                              color: "#88A1AB",
                              fontSize: "14px",
                              fontFamily: "URW DIN REGULAR",
                            }}
                          >
                            Background Image
                          </span>
                        }
                      />
                    </Stack>
                    {bg && (
                      <Stack sx={{ margin: "0px 42px 24px 40px" }}>
                        <div
                          style={{
                            // formErrors.lobby_image?  "2px dashed #ae0000"
                            border: `2px dashed ${theme?.editspace?.dashedcolor}`,
                            borderRadius: "4px",
                            height: "85px",
                            zIndex: 2,
                            position: "relative",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                          onClick={closeShareHandlerImageBg}
                          ref={hoverRefbgImage}
                        >
                          <div
                            style={{
                              top: "50%",
                              position: "absolute",
                              width: "70px",
                              height: "70px",
                              left: "50%",
                              transform: "translateX(-50%) translateY(-50%)",
                            }}
                          >
                            {/* <div style={{position:"relative"}}> */}
                            {imagebg &&
                              imagebg !==
                              "https://pub-d6edaebcd6474ac499bdcb399e4e121c.r2.dev/bbcd00d0-7c3c-47ea-a0c2-182f358dcd0f.jpeg" ? (
                              <img
                                alt=""
                                src={imagebg}
                                style={{
                                  borderRadius: "4px",
                                  width: "100%",
                                  height: "100%",
                                  display: "block",
                                  objectFit: "cover",
                                  //  zIndex: 1,
                                }}
                              />
                            ) : (
                              <img
                                alt=""
                                src="/assets/admin/upload.svg"
                                style={{
                                  top: "50%",
                                  position: "absolute",
                                  width: "20px",
                                  height: "20px",
                                  left: "50%",
                                  transform:
                                    "translateX(-50%) translateY(-50%)",
                                  zIndex: 2,
                                }}
                              />
                            )}
                            <div
                              // className="overlay"
                              style={{
                                backgroundColor: "rgba(0, 139, 205, 0.9)",
                                opacity: isHoveredbgImage ? 1 : 0,
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                zIndex: 3,
                                borderRadius: "4px",
                              }}
                            >
                              <img
                                alt=""
                                src="/assets/admin/img-upload.svg"
                                style={{
                                  top: "50%",
                                  position: "absolute",
                                  width: "29px",
                                  height: "26px",
                                  left: "50%",
                                  transform:
                                    "translateX(-50%) translateY(-50%)",
                                  filter: isHoveredbgImage
                                    ? "brightness(0) invert(1)"
                                    : "",

                                  zIndex: 3,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </Stack>
                    )}

                    <Divider
                      variant="fullWidth"
                      style={{
                        borderColor: theme?.editspace?.outerbgcolor,
                        margin: "0px 40px 24px 40px",
                        borderWidth: "1px",
                      }}
                    />
                    <Stack sx={{ margin: "0px 0px 24px 55px" }}>
                      <FormControlLabel
                        onChange={() => {
                          setOverridetheme(!overridetheme);

                          AxiosLocal.post(`event/edit/${props.event.id}/`, {
                            override_theme: !overridetheme,
                            dark_theme: {
                              dark_theme_color_0: "rgba(1, 25, 52, 1)",
                              dark_theme_color_1: "rgba(1, 34, 67, 1)",
                              dark_theme_color_2: "rgba(1, 42, 80, 1)",
                              dark_theme_color_3: "rgba(0, 46, 86, 1)",
                              dark_theme_color_4: "rgba(20, 63, 99, 1)",
                              dark_theme_color_5: "rgba(38, 78, 110, 1)",
                              dark_theme_color_6: "rgba(55, 92, 120, 1)",
                              dark_theme_color_7: "rgba(75, 109, 133, 1)",
                              dark_theme_color_8: "rgba(93, 124, 144, 1)",
                              dark_theme_color_9: "rgba(110, 139, 155, 1)",
                              dark_theme_color_10: "rgba(136, 161, 171, 1)",
                              dark_theme_color_11: "rgba(165, 184, 192, 1)",
                              dark_theme_color_12: "rgba(225, 231, 234, 1)",
                              dark_theme_color_13: "rgba(255, 255, 255, 1)",
                              dark_theme_color_14: "rgba(230, 25, 89, 1)",
                              dark_theme_color_15: "rgba(0, 139, 205, 1)",
                            },
                            light_theme: {
                              light_theme_color_0: "rgba(255, 255, 255, 1)",
                              light_theme_color_1: "rgba(225, 231, 234, 1)",
                              light_theme_color_2: "rgba(165, 184, 192, 1)",
                              light_theme_color_3: "rgba(136, 161, 171, 1)",
                              light_theme_color_4: "rgba(110, 139, 155, 1)",
                              light_theme_color_5: "rgba(93, 124, 144, 1)",
                              light_theme_color_6: "rgba(75, 109, 133, 1)",
                              light_theme_color_7: "rgba(55, 92, 120, 1)",
                              light_theme_color_8: "rgba(38, 78, 110, 1)",
                              light_theme_color_9: "rgba(20, 63, 99, 1)",
                              light_theme_color_10: "rgba(0, 46, 86, 1)",
                              light_theme_color_11: "rgba(1, 42, 80, 1)",
                              light_theme_color_12: "rgba(1, 34, 67, 1)",
                              light_theme_color_13: "rgba(1, 25, 52, 1)",
                              light_theme_color_14: "rgba(230, 25, 89, 1)",
                              light_theme_color_15: "rgba(0, 139, 205, 1)",
                            },
                          }).then((response) => {
                            if (response.data.status == "Success") {
                              //  seteditToast(true);
                              setFormValues({});
                            }
                          });
                        }}
                        control={
                          <IOSSwitch
                            theme={theme}
                            sx={{ marginRight: "15px" }}
                            defaultChecked={overridetheme}
                          />
                        }
                        label={
                          <span
                            style={{
                              color: "#88A1AB",
                              fontSize: "14px",
                              fontFamily: "URW DIN REGULAR",
                            }}
                          >
                            Override theme
                          </span>
                        }
                      />
                    </Stack>
                    {overridetheme && (
                      <Stack sx={{ margin: "0px 42px 24px 40px" }}>
                        <ColorPaletteTab
                          spaceSlug={props.event.slug}
                          component="editSpace"
                          changeColorPalette={changeColorPalette}
                          lightTheme={lightTheme}
                          darkTheme={darkTheme}
                        />
                      </Stack>
                    )}

                    {/* <CustomThemeColorSelector componentFor="light" /> */}

                    <Button
                      onClick={() => props.setShowSection(false)}
                      style={{
                        backgroundColor: theme?.editspace?.outerbgcolor,
                        color: "#88A1AB",
                        textTransform: "none",
                        fontFamily: "URW DIN REGULAR",
                        padding: "8px 20px",
                        margin: "39px 227px",
                      }}
                    >
                      <img
                        alt=""
                        src="/assets/icons/up.svg"
                        style={{ paddingRight: "17px" }}
                      />
                      Hide advanced settings
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </Scrollbars>
            </div>

            <Divider
              variant="fullWidth"
              style={{ borderColor: theme?.login?.secondaryColor }}
            />
          </Box>
        </form>
      </div>
      {addFilePopup && (
        <MediaFileManager
          fileManagerType="video"
          closeShareHandler={closeShareHandler}
          setFile={setvideoLobby}
          setFormValues={setFormValues}
          formValues={formValues}
        />
      )}
      {addFilePopupImage && (
        <MediaFileManager
          fileManagerType="image"
          closeShareHandlerImage={closeShareHandlerImage}
          setFile={setImage}
          setFormValues={setFormValues}
          formValues={formValues}
          componentFor="logo"
        />
      )}

      {addFilePopupImageLobby && (
        <MediaFileManager
          fileManagerType="image"
          closeShareHandlerImage={closeShareHandlerImageLobby}
          setFile={setImageLobby}
          setFormValues={setFormValues}
          formValues={formValues}
          componentFor="lobbyImage"
        />
      )}
      {addFilePopupImageBg && (
        <MediaFileManager
          fileManagerType="image"
          closeShareHandlerImage={closeShareHandlerImageBg}
          setFile={setImagebg}
          setFormValues={setFormValues}
          formValues={formValues}
          componentFor="bgImage"
        />
      )}
      <Toast
        openToast={editToast}
        setOpenToast={seteditToast}
        message="Event Updated Successfully"
      />
      <ConfirmPop
        message="Are you sure you exit from Edit page ?"
        confirm={confirm}
        handleClickOpen={handleClickOpen}
        handleClickClose={handleClickClose}
        handleDelete={() => {
          props.seteditEvent(false);
        }}
      />
      <CopiedToClip state={state} handleClose={handleClose} />
    </>
  );
};

export default EventEdit;
