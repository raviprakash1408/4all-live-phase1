import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Snackbar,
  Tooltip,
  Box,
  Typography,
  Button,
  Grid,
  Divider,
  Stack,
  InputLabel,
  OutlinedInput,
  TextField,
  InputBase,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import MuiAlert from "@mui/material/Alert";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { makeStyles } from "@material-ui/core/styles";
import MediaFileManager from "./MediaFileManager";
import IOSSwitch from "./CustomSwitch";
import FormControlLabel from "@mui/material/FormControlLabel";
import CustomThemeColorSelector from "./CustomTheme";
import { Scrollbars } from "react-custom-scrollbars";
import MultiSelectDropEvent from "./MultiSelectDropEvent";
import AddEventDrop from "./AddEventDrop";
import LobbyTypeDrop from "./LobbyTypeDrop";
import InvitePeopleDrop from "./InvitePeopleDrop";
import Toast from "../../sections/Toast";
import MaterialUIPickers from "./MaterialUIPickers";
import dayjs from "dayjs";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import useHover from "./use-hover";
import CustomTooltip from "../CustomTooltip";
import MuiTextField from "./MuiTextField";
import TeamViewtypeDrop from "./TeamViewtypeDrop";
import { WEBSITE_DOMAIN } from "../../utilities/websiteUrls.ts";
import {
  changeOpacity,
  isEmpty,
  organizationUser,
} from "../../utilities/common";
import ColorPaletteTab from "./event/colorPaletteTab.tsx";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddEvent = (props) => {
  const dispatch = useDispatch();
  const reservedWords = [
    "spaces",
    "admin",
    "register",
    "404",
    "waiting",
    "track",
    "auth",
    "test_keyboard_shortcuts",
    "permission",
    "invitation",
  ];
  const theme = useSelector((state) => state.theme.themeData);
  const permissions = useSelector((state) => state.permissions);
  const colorPalette = useSelector((state) => state.colorPalette.colorPalette);

  const [image, setImage] = useState("");
  const [imageLobby, setImageLobby] = useState("");
  const [imagebg, setImagebg] = useState("");

  const [videoLobby, setvideoLobby] = useState("");

  const [eventName, setEventName] = useState("");
  const [startDate, setstartDate] = React.useState(dayjs());
  const [endDate, setendDate] = React.useState(dayjs());
  const [slug, setslug] = useState();
  const [eventType, seteventType] = React.useState(false);

  const [password, setPassword] = useState("");
  const [hidePassword, sethidePassword] = useState(false);

  const handleClickHidePassword = () => {
    sethidePassword(!hidePassword);
  };

  const handleMouseDownHidePassword = (event) => {
    event.preventDefault();
  };

  const [lobbyType, setLobbyType] = useState("I");

  const [lobby, setLobby] = useState(false);
  const [bg, setBg] = useState(false);

  const [overridetheme, setOverridetheme] = useState(false);
  const [showSection, setShowSection] = useState(false);
  const [showPasswordSection, setshowPasswordSection] = useState(false);
  const [date, setdate] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [registerPassword, setRegisterPassword] = useState();
  const [cPassword, setCPassword] = useState("");
  const [isCPasswordDirty, setIsCPasswordDirty] = useState();
  const [showPassword, setShowPassword] = useState();
  const [message, setMessage] = useState("");

  const [openView, setopenView] = useState(1);
  const [showShare, setshowShare] = useState(false);
  const [autoStartSpace, setautoStartSpace] = useState(false);
  const [viewType, setViewType] = useState("V");
  const [hiddenUserPresents, sethiddenUserPresents] = useState("P");

  function doesNotStartWithSpecialChar(str) {
    return /^[0-9 !@#$%^&*)(']/.test(str);
  }

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

  useEffect(() => {
    if (isCPasswordDirty) {
      if (registerPassword === cPassword) {
        setShowErrorMessage(false);
      } else {
        setShowErrorMessage(true);
      }
    }
  }, [cPassword, registerPassword]);

  const [breakoutHover, setBreakoutHover] = useState(false);

  const [breakoutRooms, setbreakoutRooms] = useState([]);
  const [typedValue, settypedValue] = useState("");
  //function for convering array to string values seperated by comma
  function getStringBreakoutRooms(breakoutRooms) {
    var newArray = [];
    //mapping over breakoutRooms array
    breakoutRooms.map((breakoutRoom) => {
      breakoutRoom.map((breakoutRoom) => {
        newArray.push(breakoutRoom);
      });
    });
    return newArray.join(",");
  }

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

  //refresh

  const [staterefresh, setStaterefresh] = React.useState({
    openrefresh: false,
    verticals: "bottom",
    horizontals: "left",
  });

  const { verticals, horizontals, openrefresh } = staterefresh;

  const handleClickrefresh = (newState) => () => {
    setStaterefresh({ openrefresh: true, ...newState });
  };

  const handleCloserefresh = () => {
    setStaterefresh({ ...staterefresh, openrefresh: false });
  };

  //success toast
  const [openToast, setOpenToast] = useState(false);

  //random password
  const generatePassword = () => {
    const randomPassword =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

    setPassword(randomPassword);
    sethidePassword(true);
    setFormValues({
      ...formValues,
      password_text: randomPassword,
    });
  };
  //overlay
  const [overlay, setOverlay] = useState(false);

  //invitepeopledrop
  const [selected, setIsSelected] = useState([]);
  //date format
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

  const eventstartDate = formatDate(startDate.$d);
  const eventendDate = formatDate(endDate.$d);

  //validation

  const intialValues = {
    name: "",
    room_name: "",
    main_logo: "",
    menu_logo: "",
    main_name: "",
    srooms: [],
    slug: "",
    should_notify: false,
    public_mode: false,
    send_invites: true,
    countdown_enabled: true,
    allow_cms: false,
    add_password: false,
    password_text: "",
    users: [],
    event_mode: false,
    event_start: "",
    event_end: "",
    auto_start_space: false,
    is_lobby: false,
    lobby_image: null,
    lobby_video: null,
    background_image: "",
    automatic_remainder: false,
    override_theme: false,
    light_theme: {},
    dark_theme: {},
  };

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [namexists, setnamexists] = useState(false);
  const [showpasswordvalid, setshowpasswordvalid] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    let user = selected?.map((item) => item.id);

    setFormValues({ ...formValues, users: user });
  }, [selected]);

  useEffect(() => {
    if (lobby) {
      setFormValues({ ...formValues, lobby_type: lobbyType });
    }
  }, [lobbyType]);

  useEffect(() => {
    setFormValues({ ...formValues, default_viewer_type: viewType });
  }, [viewType]);

  useEffect(() => {
    setFormValues({
      ...formValues,
      event_start: eventstartDate,
      event_end: eventendDate,
    });
  }, [startDate, eventendDate]);

  const submit = () => {
    console.log(formValues, "formValues");

    AxiosLocal.post("event/add/", formValues).then((response) => {
      if (response.data.status == "Success") {
        setOpenToast(true);
        props.handleAddEventClose();
        props.getEventList();
      }
    });
  };

  //input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //form submission handler
  const handleSubmit = (e) => {
    e?.preventDefault();
    setFormErrors(validate(formValues, "all"));
    setIsSubmitting(true);
  };

  //form validation handler
  // const validate = (values, type) => {
  //   let errors = {};
  //   switch (type) {
  //     case "all":
  //       if (!values.room_name) {
  //         errors.room_name = "Space name is required";
  //       }

  //       if (!values.main_logo) {
  //         errors.main_logo = "Logo is required. Upload one image.";
  //       }
  //       break;
  //     case "eventName":
  //       if (!values.room_name) {
  //         errors.room_name = "Space name is required";
  //       }
  //       break;

  //     case "mainLogo":
  //       if (!values.room_name) {
  //         errors.main_logo = "Logo is required. Upload one image.";
  //       }
  //       break;
  //     default:
  //      console.log("not validated");
  //   }
  //   return errors;
  // };

  const validate = (values, type) => {
    let errors = {};

    if (type == "all") {
      console.log(values, "values values");
      if (!values.room_name) {
        errors.room_name = "Space name is required";
      }

      if (!values.main_logo) {
        errors.main_logo = "Logo is required. Upload one image.";
      }
      if (doesNotStartWithSpecialChar(eventName[0])) {
        errors.room_name = "Space name cannot start with special character.";
      }
      if (reservedWords.includes(values.room_name)) {
        errors.room_name = "Can't use reserved words as space name";
      }
      // if (!values.password) {
      //   errors.password = "Password is required";
      // }
      // if (!values.lobby_image) {
      //   errors.lobby_image = "Image for lobby is required";
      //   }
    } else if (type == "eventName") {
      if (!values.room_name) {
        errors.room_name = "Space name is required";
      }
      if (reservedWords.includes(values.room_name)) {
        errors.room_name = "Can't use reserved words as space name";
      }
      if (doesNotStartWithSpecialChar(eventName[0])) {
        errors.room_name = "Space name cannot start with special character.";
      }

    } else if (type == "mainLogo") {
      if (!values.main_logo) {
        errors.main_logo = "Logo is required. Upload one image.";
      }
    }
    // else if(type == "addPassword"){
    //   if (!values.password) {
    //   errors.password = "Password is required";
    //   setIsSubmitting(false)
    //   }
    // }else if(type == "imageLobby"){
    //   if (!values.lobby_image) {
    //   errors.lobby_image = "Image for lobby is required";
    //   setIsSubmitting(false)
    //   }
    // }

    // if (!date) {
    //   if (!values.room_expiry) {
    //     errors.room_expiry =
    //       "Event Mode is on. Make sure you selected start and end date.";
    //   }
    // }

    return errors;
  };

  useEffect(() => {
    if (namexists) {
      setIsSubmitting(false);
    }
  }, [namexists]);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setFormErrors(validate(formValues, "eventName"));

    setIsSubmitting(false);
  }, [eventName]);

  const isFirstRunLogo = useRef(true);

  useEffect(() => {
    if (isFirstRunLogo.current) {
      isFirstRunLogo.current = false;
      return;
    }
    setFormErrors(validate(formValues, "mainLogo"));
    setIsSubmitting(false);
  }, [image]);

  useEffect(() => {
    if (showPasswordSection && password == "") {
      setshowpasswordvalid(true);
      setIsSubmitting(false);
    } else {
      setshowpasswordvalid(false);
    }
  }, [password]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors, isSubmitting, submit]);
  // const isFirstRun = useRef(true);

  // useEffect(() => {
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false;
  //     return;
  //   }

  //   setFormErrors(validate(formValues));
  // }, [formValues.main_logo, formValues.room_name]);

  // const handleAddSpaceValidation = () => {
  //   AxiosLocal.post("event/add/", formValues).then((response) => {
  //     console.log(response, "handleAddSpace");
  //     if (response.data.status == "Success") {
  //       setOpenToast(true);
  //     }
  //   });
  // };
  const [overlayLobby, setOverlayLobby] = useState(false);

  const [hoverRef, isHovered] = useHover();
  const [hoverRefbgImage, isHoveredbgImage] = useHover();

  // useEffect(() => {
  //   if(lobbyType == "I"){
  //   setFormErrors(validate({
  //     ...formValues,

  //     lobby_image: imageLobby,
  //   }, "imageLobby"))
  // }
  // }, [lobbyType])
  const [subrooms, setsubrooms] = useState([]);
  useEffect(() => {
    let subroomsList = [] || subrooms;
    let filtered = breakoutRooms.forEach((element) => {
      const results = element.filter((element) => {
        return element !== "";
      });
      subroomsList.push(...results);
    });
    const subroomList = subroomsList.join();
    setsubrooms(subroomList);
  }, [breakoutRooms, subrooms]);


  useEffect(() => {
    setFormValues({
      ...formValues,
      srooms: subrooms,
    });
  }, [subrooms])


  const [lightTheme, setlightTheme] = useState([]);

  const [darkTheme, setdarkTheme] = useState([]);
  const changeColorPalette = (colorPaletteData) => {

    if (!isEmpty(colorPaletteData.light_theme)) {

      setFormValues({
        ...formValues,
        light_theme: {},
      });

      let l_theme = {
        light_theme_color_0: colorPalette["light_theme"]["theme_color_0"],
        light_theme_color_1: colorPalette["light_theme"]["theme_color_1"],
        light_theme_color_2: colorPalette["light_theme"]["theme_color_2"],
        light_theme_color_3: colorPalette["light_theme"]["theme_color_3"],
        light_theme_color_4: colorPalette["light_theme"]["theme_color_4"],
        light_theme_color_5: colorPalette["light_theme"]["theme_color_5"],
        light_theme_color_6: colorPalette["light_theme"]["theme_color_6"],
        light_theme_color_7: colorPalette["light_theme"]["theme_color_7"],
        light_theme_color_8: colorPalette["light_theme"]["theme_color_8"],
        light_theme_color_9: colorPalette["light_theme"]["theme_color_9"],
        light_theme_color_10: colorPalette["light_theme"]["theme_color_10"],
        light_theme_color_11: colorPalette["light_theme"]["theme_color_11"],
        light_theme_color_12: colorPalette["light_theme"]["theme_color_12"],
        light_theme_color_13: colorPalette["light_theme"]["theme_color_13"],
        light_theme_color_14: colorPalette["light_theme"]["theme_color_14"],
        light_theme_color_15: colorPalette["light_theme"]["theme_color_15"],
      }

      setFormValues({
        ...formValues,
        light_theme: {
          ...l_theme
        },
      });
    }

    if (!isEmpty(colorPaletteData.dark_theme)) {

      setFormValues({
        ...formValues,
        dark_theme: {},
      });
      let d_theme = {
        dark_theme_color_0: colorPaletteData["dark_theme"]["dark_theme_color_0"],
        dark_theme_color_1: colorPaletteData["dark_theme"]["dark_theme_color_1"],
        dark_theme_color_2: colorPaletteData["dark_theme"]["dark_theme_color_2"],
        dark_theme_color_3: colorPaletteData["dark_theme"]["dark_theme_color_3"],
        dark_theme_color_4: colorPaletteData["dark_theme"]["dark_theme_color_4"],
        dark_theme_color_5: colorPaletteData["dark_theme"]["dark_theme_color_5"],
        dark_theme_color_6: colorPaletteData["dark_theme"]["dark_theme_color_6"],
        dark_theme_color_7: colorPaletteData["dark_theme"]["dark_theme_color_7"],
        dark_theme_color_8: colorPaletteData["dark_theme"]["dark_theme_color_8"],
        dark_theme_color_9: colorPaletteData["dark_theme"]["dark_theme_color_9"],
        dark_theme_color_10: colorPaletteData["dark_theme"]["dark_theme_color_10"],
        dark_theme_color_11: colorPaletteData["dark_theme"]["dark_theme_color_11"],
        dark_theme_color_12: colorPaletteData["dark_theme"]["dark_theme_color_12"],
        dark_theme_color_13: colorPaletteData["dark_theme"]["dark_theme_color_13"],
        dark_theme_color_14: colorPaletteData["dark_theme"]["dark_theme_color_14"],
        dark_theme_color_15: colorPaletteData["dark_theme"]["dark_theme_color_15"],
      }
      console.log(d_theme, "d_theme");
      setFormValues({
        ...formValues,
        dark_theme: { ...d_theme },
      });
    }

    // if (!isEmpty(colorPaletteData.light_theme)) {
    //   setFormValues({
    //     ...formValues,
    //     light_theme: {
    //       light_theme_color_0: colorPalette["light_theme"]["theme_color_0"],
    //       light_theme_color_1: colorPalette["light_theme"]["theme_color_1"],
    //       light_theme_color_2: colorPalette["light_theme"]["theme_color_2"],
    //       light_theme_color_3: colorPalette["light_theme"]["theme_color_3"],
    //       light_theme_color_4: colorPalette["light_theme"]["theme_color_4"],
    //       light_theme_color_5: colorPalette["light_theme"]["theme_color_5"],
    //       light_theme_color_6: colorPalette["light_theme"]["theme_color_6"],
    //       light_theme_color_7: colorPalette["light_theme"]["theme_color_7"],
    //       light_theme_color_8: colorPalette["light_theme"]["theme_color_8"],
    //       light_theme_color_9: colorPalette["light_theme"]["theme_color_9"],
    //       light_theme_color_10: colorPalette["light_theme"]["theme_color_10"],
    //       light_theme_color_11: colorPalette["light_theme"]["theme_color_11"],
    //       light_theme_color_12: colorPalette["light_theme"]["theme_color_12"],
    //       light_theme_color_13: colorPalette["light_theme"]["theme_color_13"],
    //       light_theme_color_14: colorPalette["light_theme"]["theme_color_14"],
    //       light_theme_color_15: colorPalette["light_theme"]["theme_color_15"],
    //     },
    //   });
    // }

    // if (!isEmpty(colorPaletteData.dark_theme)) {
    //   setFormValues({
    //     ...formValues,
    //     dark_theme: {
    //       dark_theme_color_0: colorPalette["dark_theme"]["theme_color_0"],
    //       dark_theme_color_1: colorPalette["dark_theme"]["theme_color_1"],
    //       dark_theme_color_2: colorPalette["dark_theme"]["theme_color_2"],
    //       dark_theme_color_3: colorPalette["dark_theme"]["theme_color_3"],
    //       dark_theme_color_4: colorPalette["dark_theme"]["theme_color_4"],
    //       dark_theme_color_5: colorPalette["dark_theme"]["theme_color_5"],
    //       dark_theme_color_6: colorPalette["dark_theme"]["theme_color_6"],
    //       dark_theme_color_7: colorPalette["dark_theme"]["theme_color_7"],
    //       dark_theme_color_8: colorPalette["dark_theme"]["theme_color_8"],
    //       dark_theme_color_9: colorPalette["dark_theme"]["theme_color_9"],
    //       dark_theme_color_10: colorPalette["dark_theme"]["theme_color_10"],
    //       dark_theme_color_11: colorPalette["dark_theme"]["theme_color_11"],
    //       dark_theme_color_12: colorPalette["dark_theme"]["theme_color_12"],
    //       dark_theme_color_13: colorPalette["dark_theme"]["theme_color_13"],
    //       dark_theme_color_14: colorPalette["dark_theme"]["theme_color_14"],
    //       dark_theme_color_15: colorPalette["dark_theme"]["theme_color_15"],
    //     },
    //   });
    // }
    setCount((c) => c + 1);

    console.log(formValues, "formValuesssss");
  };

  const initThemeColor = (changeState) => {
    console.log(changeState, "changeState");
    let themeData = {
      override_theme: false,
      light_theme: {},
      dark_theme: {},
    };
    if (changeState) {
      themeData = {
        override_theme: true,
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
      };
    }

    setFormValues({
      ...formValues,
      override_theme: themeData.override_theme,
      light_theme: themeData.light_theme,
      dark_theme: themeData.dark_theme,
    });
  };

  return (
    <>
      <div
        style={{
          alignItems: "center",
          background: changeOpacity(theme?.addSpace?.bgColor, 0.9),
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
        className="addEvent"
      >
        <form
          onSubmit={handleSubmit}
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
              background: theme?.addSpace?.mainColor,
              borderRadius: "4px",
              width: "700px",
              minHeight: "665px",
              paddingBottom: "20px",
              border: `2px solid ${theme?.addSpace?.mainColor}`,
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
              onClick={props.handleAddEventClose}
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
              Add space
            </Typography>
            {organizationUser(permissions.add_space) ? (
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
                  Permission for add space is off for you. please contact owner
                  of the Team.
                </p>
              </div>
            )}
            <Divider
              variant="fullWidth"
              style={{
                borderColor: theme?.addSpace?.borderbackgroundcolor,
                margin: "0px 40px",
                borderWidth: "1px",
              }}
            />

            <Stack spacing={1} sx={{ margin: "26px 0px 14px 40px" }}>
              {/* <Typography variant="h5" style={{
            color: theme?.spaces?.secondaryColor,
            textAlign: 'center',
            fontSize:'16px',
            fontFamily:'URW DIN',
            textAlign:'left'
        }} >

        Personal Information

        </Typography> */}
            </Stack>

            <div
              className={organizationUser(permissions.add_space) ? "" : "blur"}
              style={{
                pointerEvents: organizationUser(permissions.add_space)
                  ? "auto"
                  : "none",
              }}
            >
              <Scrollbars
                style={{
                  width: "100%",
                  height: showSection ? "70vh" : "470px",
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
                          border: formErrors.main_logo
                            ? `2px dashed ${theme?.editspace?.dashedcolor}`
                            : !overlay
                              ? `2px dashed ${theme?.editspace?.dashedcolor}`
                              : "2px solid transparent",
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
                    <TextField
                      label=""
                      variant="outlined"
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "14px",
                          height: "40px",
                          marginTop: "-5px",
                          paddingLeft: "12px",
                        },
                        "& .MuiOutlinedInput-root": {
                          fontSize: "14px",
                          height: "40px",
                          marginTop: "1px",
                        },

                        "& .MuiOutlinedInput-input": {
                          fontFamily: "URW DIN REGULAR",
                          fontSize: "14px",

                          color: theme?.profile?.primaryColor,
                        },
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          border:
                            formErrors.room_name || namexists
                              ? "1px solid"
                              : "2px solid",
                          borderColor:
                            formErrors.room_name || namexists
                              ? "#ae0000"
                              : theme?.login?.secondaryColor,

                          borderRadius: "4px",
                          color: theme?.profile?.primaryColor,
                        },
                        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          border:
                            formErrors.room_name || namexists
                              ? "1px solid"
                              : "2px solid",
                          borderColor:
                            formErrors.room_name || namexists
                              ? "#ae0000"
                              : theme?.login?.secondaryColor,

                          borderRadius: "4px",
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          border:
                            formErrors.room_name || namexists
                              ? "1px solid"
                              : "2px solid",
                          borderColor:
                            formErrors.room_name || namexists
                              ? "#ae0000"
                              : theme?.login?.secondaryColor,

                          borderRadius: "4px",
                        },
                      }}
                      InputLabelProps={{
                        style: { color: "#5D7C90" },
                      }}
                      type="text"
                      name="text"
                      placeholder="Enter Space Name"
                      value={formValues.room_name}
                      onChange={(event) => {
                        setEventName(event.target.value);
                        setslug(slugify(event.target.value));
                        AxiosLocal.post(`space/name/check/`, {
                          name: event.target.value,
                        }).then((response) => {
                          console.log(
                            response.data.space_exists,
                            "response.data.space_exists"
                          );
                          setnamexists(response.data.space_exists);
                        });

                        // if (!namexists) {
                        if (eventName !== event.target.value) {
                          setFormValues({
                            ...formValues,
                            name: event.target.value,
                            room_name: event.target.value,
                            main_name: event.target.value,
                            slug: slugify(event.target.value),
                          });
                        }
                        // }

                        // setFormErrors(validate({
                        //   ...formValues,
                        //   name: event.target.value,
                        //   room_name: event.target.value,
                        //   main_name: event.target.value,
                        //   slug: slugify(event.target.value),
                        // }, "eventName"));
                      }}
                    />
                    {formErrors.room_name ? (
                      <div
                        style={{
                          color: "#ae0000",
                          fontSize: "small",
                          marginTop: "5px",
                        }}
                      >
                        {formErrors.room_name}
                      </div>
                    ) : null}

                    {namexists ? (
                      <div
                        style={{
                          color: "#ae0000",
                          fontSize: "small",
                          marginTop: "5px",
                        }}
                      >
                        Space already exists. Please try with other names.
                      </div>
                    ) : null}
                  </Stack>
                </div>
                {formErrors.main_logo ? (
                  <div
                    style={{
                      color: "#ae0000",
                      fontSize: "small",
                      marginTop: "5px",
                      margin: "-25px 0px 25px 40px",
                    }}
                  >
                    {formErrors.main_logo}
                  </div>
                ) : null}
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
                      {localStorage.getObject("organization_slug")}/
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
                      value={slug}
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
                        backgroundColor: theme?.addSpace?.mainColor,
                      }}
                    >
                      Space type
                    </InputLabel>
                    <AddEventDrop
                      seteventType={seteventType}
                      eventType={eventType}
                      formValues={formValues}
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
                            setFormValues({
                              ...formValues,
                              add_password: !showPasswordSection,
                              password_text: randomPassword,
                            });
                          } else {
                            setFormValues({
                              ...formValues,
                              add_password: false,
                            });
                          }
                        }}
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
                        <TextField
                          label=""
                          variant="outlined"
                          sx={{
                            "& .MuiInputLabel-root": {
                              fontSize: "14px",
                              height: "40px",
                              marginTop: "-5px",
                            },
                            "& .MuiOutlinedInput-root": {
                              fontSize: "14px",
                              height: "40px",
                              marginTop: "1px",
                            },

                            "& .MuiOutlinedInput-input": {
                              fontFamily: "URW DIN REGULAR",
                              fontSize: "14px",

                              color: theme?.profile?.primaryColor,
                            },
                            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                            {
                              border: showpasswordvalid
                                ? "1px solid"
                                : "2px solid",
                              borderColor: showpasswordvalid
                                ? "#ae0000"
                                : theme?.login?.secondaryColor,

                              borderRadius: "4px",
                              color: theme?.profile?.primaryColor,
                            },
                            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                            {
                              border: showpasswordvalid
                                ? "1px solid"
                                : "2px solid",
                              borderColor: showpasswordvalid
                                ? "#ae0000"
                                : theme?.login?.secondaryColor,

                              borderRadius: "4px",
                            },
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              border: showpasswordvalid
                                ? "1px solid"
                                : "2px solid",
                              borderColor: showpasswordvalid
                                ? "#ae0000"
                                : theme?.login?.secondaryColor,

                              borderRadius: "4px",
                            },
                          }}
                          type={hidePassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={password}
                          onChange={(event) => {
                            setPassword(event.target.value);

                            setFormValues({
                              ...formValues,
                              password_text: event.target.value,
                            });
                            //   if(showPasswordSection){
                            //   setFormErrors(validate({
                            //     ...formValues,
                            //     password: event.target.value,
                            //   }, "addPassword"));
                            // }
                          }}
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
                                      backgroundColor: "#012A50",
                                      marginLeft: "10px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      handleClickrefresh({
                                        verticals: "bottom",
                                        horizontals: "left",
                                      })();
                                      generatePassword();
                                    }}
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
                                      backgroundColor: "#012A50",
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
                        {showpasswordvalid ? (
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
                {!showSection ? (
                  <Button
                    onClick={() => setShowSection(true)}
                    style={{
                      backgroundColor: theme?.editspace?.outerbgcolor,
                      color: "#88A1AB",
                      textTransform: "none",
                      fontFamily: "URW DIN REGULAR",
                      padding: "8px 20px",
                      margin: "39px 227px",
                      borderColor: theme?.addSpace?.borderbackgroundcolor,
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

                {showSection ? (
                  <>
                    <Divider
                      variant="fullWidth"
                      style={{
                        borderColor: theme?.addSpace?.borderbackgroundcolor,
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
                          backgroundColor: theme?.addSpace?.breakoutrooms,
                          display: "flex",
                          alignItems: "center",
                          width: 620,
                          height: "32px",
                          border: `2px solid ${theme?.login?.secondaryColor}`,
                          borderRadius: "4px",
                          fontFamily: "URW DIN REGULAR",
                          fontSize: "14px",
                        }}
                      >
                        {breakoutRooms?.map((item) => (
                          <>
                            <div
                              style={{
                                backgroundColor:
                                  breakoutHover == item
                                    ? "#008BCD"
                                    : theme?.addSpace?.borderbackgroundcolor,
                                borderRadius: "4px",
                                color:
                                  breakoutHover == item ? "white" : "#88A1AB",
                                padding: "5px 15px 8px 15px",
                                marginRight: "4px",
                                cursor: "pointer",
                                position: "relative",
                              }}
                              onMouseEnter={() => setBreakoutHover(item)}
                              onMouseLeave={() => setBreakoutHover("")}
                            >
                              <p style={{ margin: "0px" }}>{item}</p>
                              {breakoutHover == item && (
                                <span
                                  style={{
                                    backgroundColor: "#FF1759",
                                    position: "absolute",
                                    right: "-5px",
                                    top: "-5px",
                                    borderRadius: "50%",
                                    padding: "3px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                  onClick={() => {
                                    let Arr = breakoutRooms.filter(
                                      (el) => el != item
                                    );
                                    console.log(Arr, "Arr");
                                    setbreakoutRooms([...Arr]);
                                  }}
                                >
                                  <img
                                    alt="close-icon"
                                    src="/assets/admin/close-white.svg"
                                    style={{
                                      width: "7px",
                                      height: "7px",
                                    }}
                                  />
                                </span>
                              )}
                            </div>
                          </>
                        ))}
                        {/* <div style={{backgroundColor:'#143F63',borderRadius:'4px',color:'#88A1AB',padding:'6px 11px',marginRight:'3px'}}>Room 1</div> */}

                        {/* {breakoutRoom ? splitBreakout() : <></>} */}
                        <InputBase
                          value={typedValue}
                          sx={{ ml: 1, flex: 1 }}
                          placeholder=""
                          inputProps={{ "aria-label": "" }}
                          // onChange={(e) => {
                          //   setFormValues({
                          //     ...formValues,
                          //     srooms: subrooms,
                          //   });
                          // }}
                          onChange={e => {
                            let val = e.target.value;
                            console.log(e.key, "key", typedValue);
                            settypedValue(val);
                          }}
                          onKeyDown={(e) => {
                            let val = e.target.value;
                            // const roomArr = val.split(",");
                            if (e.which === 188 || e.key === "Enter") {
                              // if (e.key === "Enter") {
                              e.stopPropagation()
                              e.preventDefault()
                              // }
                              if (val != "") {
                                setbreakoutRooms([...breakoutRooms, [val]]);
                                settypedValue("");

                              }
                            }

                          }}
                          // inputKeydown = e => {
                          //   const val = e.target.value;
                          //   var patt = /^[0-9]*$/;
                          //   if (e.key === "Enter" ||  e.which === 188 && val) {}
                          // }
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
                        borderColor: theme?.addSpace?.borderbackgroundcolor,
                        margin: "0px 40px",
                        borderWidth: "1px",
                      }}
                    />

                    {/* <div style={{ display: "flex", marginTop: "18px" }}>
                      <Stack
                        sx={{ margin: "22px 0px 24px 55px", width: "30%" }}
                      >
                        <FormControlLabel
                          onChange={() => {
                            setdate(!date);
                            setFormValues({ ...formValues, event_mode: !date });
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
                            // setFormValues={setFormValues}
                            // formValues={formValues}
                            // startDate={eventstartDate}
                            // eventendDate={eventendDate}
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
                          control={
                            <IOSSwitch
                              theme={theme}
                              sx={{ marginRight: "15px" }}
                              onChange={() => {
                                setautoStartSpace(!autoStartSpace);
                                setFormValues({
                                  ...formValues,
                                  auto_start_space: !autoStartSpace,
                                });
                              }}
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
                        borderColor: theme?.addSpace?.borderbackgroundcolor,
                        margin: "0px 40px 29px",
                        borderWidth: "1px",
                      }}
                    />

                    <Stack sx={{ margin: "0px 0px 24px 55px" }}>
                      <FormControlLabel
                        onChange={() => {
                          setLobby(!lobby);
                          setFormValues({ ...formValues, is_lobby: !lobby });
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
                                border: ` 2px dashed ${theme?.addSpace?.dividercolor}`,
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
                                    console.log("videoooo");
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

                    <Stack sx={{ margin: "0px 0px 24px 55px" }}>
                      <FormControlLabel
                        onChange={() => {
                          setBg(!bg);
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
                            border: ` 2px dashed ${theme?.addSpace?.dividercolor}`,

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
                            {imagebg ? (
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

                    <Stack sx={{ margin: "0px 0px 24px 55px" }}>
                      <FormControlLabel
                        onChange={(e) => {
                          initThemeColor(e.target.checked);
                          setOverridetheme(!overridetheme);
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
                          spaceSlug=""
                          component="addSpace"
                          changeColorPalette={changeColorPalette}
                          lightTheme={formValues.light_theme}
                          darkTheme={formValues.dark_theme}
                        />
                      </Stack>
                    )}

                    {/* {overridetheme && <CustomThemeColorSelector />} */}

                    <Button
                      onClick={() => setShowSection(false)}
                      style={{
                        backgroundColor: theme?.addSpace?.textbgcolor,
                        color: "#88A1AB",
                        textTransform: "none",
                        fontFamily: "URW DIN REGULAR",
                        padding: "8px 20px",
                        margin: "39px 227px",
                        borderColor: theme?.addSpace?.borderbackgroundcolor,
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

            <div style={{ textAlign: "center", margin: "18px 0px 0px" }}>
              {organizationUser(permissions.add_space) && (
                <Button
                  variant="contained"
                  style={{
                    textTransform: "none",
                    padding: "9px 25px",
                    fontSize: "14px",
                    fontFamily: "URW DIN REGULAR",
                    lineHeight: "22px",
                    backgroundColor: theme?.login?.mainColor,
                    marginRight: "21px",
                    borderRadius: "4px",
                    color: "white",
                  }}
                  type="submit"
                >
                  Create space
                </Button>
              )}
              <Button
                variant="contained"
                style={{
                  textTransform: "none",
                  padding: "8px 47px",
                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  lineHeight: "22px",
                  backgroundColor: theme?.login?.primaryColor,
                  border: "2px solid",
                  borderColor: theme?.login?.secondaryColor,
                  borderRadius: "4px",
                  color: theme?.login?.tertiaryColor,
                }}
                onClick={props.handleAddEventClose}
              >
                Cancel
              </Button>
            </div>
          </Box>
        </form>
      </div>
      {addFilePopup ? (
        <MediaFileManager
          fileManagerType="video"
          closeShareHandler={closeShareHandler}
          setFile={setvideoLobby}
          setFormValues={setFormValues}
          formValues={formValues}
        />
      ) : (
        ""
      )}
      {addFilePopupImage ? (
        <MediaFileManager
          fileManagerType="image"
          closeShareHandlerImage={closeShareHandlerImage}
          setFile={setImage}
          setFormValues={setFormValues}
          formValues={formValues}
          componentFor="logo"
        />
      ) : (
        ""
      )}
      {addFilePopupImageLobby ? (
        <MediaFileManager
          fileManagerType="image"
          closeShareHandlerImage={closeShareHandlerImageLobby}
          setFile={setImageLobby}
          setFormValues={setFormValues}
          formValues={formValues}
          componentFor="lobbyImage"
        />
      ) : (
        ""
      )}
      {addFilePopupImageBg ? (
        <MediaFileManager
          fileManagerType="image"
          closeShareHandlerImage={closeShareHandlerImageBg}
          setFile={setImagebg}
          setFormValues={setFormValues}
          formValues={formValues}
          componentFor="bgImage"
        />
      ) : (
        <></>
      )}
      <Toast
        openToast={openToast}
        setOpenToast={setOpenToast}
        message="Space Added Successfully"
      />
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        open={openCopyToast}
        key={vertical + horizontal}
        bodyStyle={{ height: 40, flexGrow: 0, pointer: "cursor" }}
        onClose={handleClose}
      >
        <div
          style={{
            backgroundColor: "#008BCD",
            borderRadius: "4px",
            display: "flex",
            pointer: "cursor !importrant",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              width: "40px",
              height: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px",
            }}
          >
            <img src="/assets/admin/copy-link.svg" alt="" />
          </div>
          <p
            style={{
              fontFamily: "URW DIN REGULAR",
              color: "white",
              fontSize: "16px",
              paddingLeft: "10px",
            }}
          >
            Link copied to clipboard
          </p>
          <img
            src="/assets/admin/close-white.svg"
            style={{ padding: "0px 16px" }}
            alt=""
            onClick={handleClose}
          />
        </div>
      </Snackbar>

      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        open={openrefresh}
        key={verticals + horizontals}
        bodyStyle={{ height: 40, flexGrow: 0, pointer: "cursor" }}
        onClose={handleCloserefresh}
      >
        <div
          style={{
            backgroundColor: "#008BCD",
            borderRadius: "4px",
            display: "flex",
            pointer: "cursor",
          }}
        >
          <img
            src="/assets/admin/tick.svg"
            alt=""
            style={{ marginLeft: "20px" }}
          />

          <p
            style={{
              fontFamily: "URW DIN REGULAR",
              color: "white",
              fontSize: "16px",
              paddingLeft: "10px",
            }}
          >
            Password created successfully
          </p>
          <img
            src="/assets/admin/close-white.svg"
            style={{ padding: "0px 16px", pointer: "cursor" }}
            alt=""
            onClick={handleCloserefresh}
          />
        </div>
      </Snackbar>
    </>
  );
};

export default AddEvent;
