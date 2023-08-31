import React, { useState, useEffect, useMemo } from "react";
import { AxiosLocal } from "../../../utilities/axiosUtils.ts";
import {
  Grid,
  Paper,
  Button,
  Stack,
  InputLabel,
  TextField,
  Typography,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Security from "./Security";
import UserProfile from "./userProfile";

import UserSecurity from "./Security";
import MediaFileManager from "../MediaFileManager";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Toast from "../../../sections/Toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setuserProfile,
  setTimeZone,
} from "../../../state/userProfile/userProfileSlice";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import spacetime from "spacetime";
import CustomAvatarGroup from "../../CustomAvatarGroup";
import { shortNameCreator } from "../../../utilities/shortName";

const Item = styled(Paper)(({ theme }) => ({
  padding: "15px 0px",
  textAlign: "center",
  fontFamily: "URW DIN REGULAR",
  fontSize: "16px",
  color: "#88A1AB",
  boxShadow: "none",
  borderRadius: "0px",
  cursor: "pointer",
}));

const AccountPage = () => {
  // console.log(
  //   Intl.DateTimeFormat().resolvedOptions().timeZone,
  //   " Intl.DateTimeFormat().resolvedOptions().timeZone"
  // );
  const [selectedTimezone, setSelectedTimezone] = useState(
    "America/Los_Angeles"
  );
  const [datetime, setDatetime] = useState(spacetime.now());

  const theme = useSelector((state) => state.theme.themeData);
  const dispatch = useDispatch();

  const [changedval, setChangedval] = useState({});

  const [user, setUser] = useState({});
  const [image, setImage] = useState(
    localStorage.getObject("avatar") == "null"
      ? null
      : localStorage.getObject("avatar")
  );
  const [firstName, setfirstName] = useState();
  const [lastName, setLastName] = useState();
  const [shortName, setshortName] = useState();

  const [email, setEmail] = useState(user.email);

  const [registerPassword, setRegisterPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [character, setcharacter] = useState(false);
  const [uppercase, setuppercase] = useState(false);
  const [lowercase, setlowercase] = useState(false);
  const [number, setnumber] = useState(false);

  //success toast
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState("");

  //loading
  const [loading, setloading] = useState(false);

  useMemo(() => {
    const selectedTimezoneValue = selectedTimezone.value ?? selectedTimezone;
    console.log(
      datetime.goto(selectedTimezoneValue).unixFmt("dd.MM.YY HH:mm:ss"),
      selectedTimezone.value,
      "timezoneProfile"
    );
    setDatetime(datetime.goto(selectedTimezoneValue));
    dispatch(
      setuserProfile({
        time: datetime.goto(selectedTimezoneValue).unixFmt("dd.MM.YY HH:mm:ss"),
      })
    );
  }, [selectedTimezone]);

  useEffect(() => {
    if (localStorage.getObject("guestUser") === "true") {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    setChangedval({
      ...changedval,
      timezone: selectedTimezone.value,
    });
  }, [selectedTimezone]);
  useEffect(() => {
    document.title = theme?.login?.title;
  }, []);
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = theme?.login?.favicon32x32;
  }, []);
  const timezone = useSelector((state) => state.userProfile.timezone);

  console.log(timezone, "timezone");

  //error toast

  const [openerrorToast, setOpenerrorToast] = useState(false);

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword3 = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  function containsUppercase(str) {
    return /[A-Z]/.test(str);
  }
  function containsLowercase(str) {
    return /[a-z]/.test(str);
  }
  function containsnumber(str) {
    return /[0-9]/.test(str);
  }
  useEffect(() => {
    if (isCPasswordDirty) {
      if (registerPassword === cPassword) {
        setShowErrorMessage(false);
      } else {
        setShowErrorMessage(true);
      }
    }
    if (registerPassword?.length >= 6) {
      setcharacter(true);
    } else {
      setcharacter(false);
    }
    if (containsUppercase(registerPassword)) {
      setuppercase(true);
    } else {
      setuppercase(false);
    }
    if (containsLowercase(registerPassword)) {
      setlowercase(true);
    } else {
      setlowercase(false);
    }
    if (containsnumber(registerPassword)) {
      setnumber(true);
    } else {
      setnumber(false);
    }
  }, [cPassword, registerPassword]);

  // const [addFilePopupImage, setAddFilePopupImage] = useState(false);

  // function closeShareHandlerImage() {
  //   setAddFilePopupImage(!addFilePopupImage);
  // }

  const [toggleState, setToggleState] = useState("profile");
  const toggleTab = (index) => {
    setToggleState(index);
  };
  useEffect(() => {
    userProfile();
  }, []);

  const userProfile = () => {
    AxiosLocal.get("user/loggedin/").then((response) => {
      console.log(response.data.data, "response.data.dataresponse.data.data");
      setUser(response.data.data);
      setfirstName(response.data.data.first_name);
      setLastName(response.data.data.last_name);
      setshortName(
        shortNameCreator(
          response.data.data.first_name,
          response.data.data.last_name
        )
      );
      setEmail(response.data.data.email);
      // setImage(
      //   response.data.data.avatar == null || localStorage.getObject("avatar") === undefined
      //     ? null : response.data.data.avatar
      // );
      setImage(response.data.data.avatar);
    });
  };
  const changeHandler = (event) => {
    if (event.target.files[0].size > 2000000) {
      setMessage("File cannot be updated. File size should be less than 2MB.");
      setOpenerrorToast(true);
    } else {
      let formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("file_type", "personal");
      setloading(true);
      AxiosLocal.post("file/upload/", formData).then((response) => {
        const user_id = localStorage.getObject("id");

        if (response.data.status == "Success") {
          console.log(response.data, "response.data");
          setImage(response.data.url);
          // setChangedval({
          //   ...changedval,
          //   avatar: response.data.url,
          // });
          AxiosLocal.post(`profile/edit/${user_id}/`, {
            avatar: response.data.url,
          })
            .then(function (response) {
              dispatch(
                setuserProfile({
                  avatar: response.data.avatar,
                })
              );
              console.log(response.data, "responseuseredit");
              localStorage.setObject("avatar", response.data.avatar);

              if (response.data.status == "Success") {
                setOpenToast(true);
                setMessage(response.data.message);
              } else {
                setOpenerrorToast(true);
                setMessage(response.data.message);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
          setloading(false);
        } else {
          setOpenerrorToast(true);
          setMessage("Error occured. File cannot be uploaded.");
          setloading(false);
        }
      });
    }
    //  const objectUrl = URL.createObjectURL(event.target.files[0]);
    //    setImage(objectUrl);
  };

  const updateSubmit = () => {
    const user_id = localStorage.getObject("id");
    console.log(changedval, "changedval");
    AxiosLocal.post(`profile/edit/${user_id}/`, changedval)
      .then(function (response) {
        dispatch(
          setuserProfile({
            firstName: response.data.name,
            lastName: response.data.last_name,
            avatar: response.data.avatar,
            timezone: response.data.timezone,
          })
        );
        console.log(response.data, "responseuseredit");
        localStorage.setObject("username", response.data.name);
        localStorage.setObject("last_name", response.data.last_name);
        localStorage.setObject("avatar", response.data.avatar);

        if (response.data.status == "Success") {
          setOpenToast(true);
          setMessage(response.data.message);
        } else {
          setOpenerrorToast(true);
          setMessage(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div
        style={{
          backgroundColor: theme?.account?.bgColor,

          height: "91.1vh",
          marginTop: "60px",
        }}
      >
        <p
          style={{
            fontFamily: "URW DIN",
            color: theme?.account?.text,

            fontSize: "20px",
            textAlign: "center",
            padding: "20px 0px 0px",
          }}
        >
          Account
        </p>

        <Grid container>
          <Grid
            item
            xs={6}
            onClick={() => toggleTab("profile")}
            style={{
              // backgroundColor: "#012A50",
              borderBottom: `2px solid ${toggleState == "profile"
                  ? theme?.common?.color1
                  : theme?.workflows?.workflowAndPermissionsBg
                }`,

              // borderBottom:
              //   toggleState === "profile" ? theme?.account?.border : "",
            }}
          >
            <Item
              style={{
                width: "99.9%",
                color: theme?.account?.buttonText,
                backgroundColor: theme?.account?.buttonBg,
              }}
            >
              Profile
            </Item>
          </Grid>

          <Grid item xs={6} onClick={() => toggleTab("security")}>
            <Item
              style={{
                backgroundColor: theme?.account?.buttonBg,
                color: theme?.account?.buttonText,
                borderBottom: `2px solid ${toggleState == "security"
                    ? theme?.common?.color1
                    : theme?.workflows?.workflowAndPermissionsBg
                  }`,

                // borderBottom:
                //   toggleState === "security" ? theme?.account?.border : "",
              }}
            >
              Security
            </Item>
          </Grid>
        </Grid>
        {
          toggleState === "profile" && (
            <div>
              <Stack
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "55px 0px 10px",
                }}
              >
                <span
                  style={{ position: "relative", cursor: "pointer" }}
                // onClick={closeShareHandlerImage}
                >
                  {loading ? (
                    <Skeleton
                      style={{ backgroundColor: theme?.loading?.loadingColor }}
                      variant="circular"
                      width={100}
                      height={104}
                    />
                  ) : (
                    // <img
                    //   alt=""
                    //   src={image}
                    //   style={{
                    //     width: "100px",
                    //     height: "100px",
                    //     borderRadius: "50%",
                    //     objectFit: "cover",
                    //   }}
                    // />
                    <CustomAvatarGroup
                      avatar={image}
                      item={shortName}
                      type="account"
                    />
                  )}

                  <div
                    style={{
                      border: theme?.account?.border,

                      backgroundColor: theme?.account?.upload,
                      borderRadius: "50%",
                      padding: "5px",
                      position: "absolute",
                      right: "0px",
                      bottom: "0px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* <input
                      type="file"
                      id="file"
                      name="file"
                      style={{ position:'relative', width: "20px", height: "20px",opacity:0 }}
                    /> */}
                    <img alt="" src="/assets/icons/upload.svg" />
                  </div>
                  <input
                    accept=".jpg, .jpeg, .png"
                    onChange={(event) => {
                      changeHandler(event);
                    }}
                    type="file"
                    style={{
                      height: "100%",
                      zIndex: 2,
                      position: "absolute",
                      width: "100%",
                      opacity: 0,
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      cursor: "pointer",
                    }}
                  />
                </span>
              </Stack>
              <div style={{ maxWidth: "400px", margin: "0px auto" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Stack sx={{ width: "50%", marginRight: "10px" }}>
                    <InputLabel
                      htmlFor="first-name"
                      style={{
                        color: theme?.spaces?.mainColor,
                        fontSize: "14px",
                        fontWeight: "400",
                      }}
                    >
                      First name
                    </InputLabel>

                    <TextField
                      id="first-name"
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

                          color: theme?.account?.normaltext,
                        },
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          border: theme?.account?.border,

                          // borderColor: "#143F63",

                          // borderRadius: "4px",
                          color: theme?.profile?.primaryColor,
                        },
                        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          border: theme?.account?.border,
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          border: theme?.account?.border,
                        },
                      }}
                      InputLabelProps={{
                        style: { color: "#5D7C90" },
                      }}
                      type="text"
                      fullWidth
                      name="text"
                      placeholder="Enter Your Name"
                      value={firstName}
                      onChange={(event) => {
                        setChangedval({
                          ...changedval,
                          first_name: event.target.value,
                        });
                        setfirstName(event.target.value);
                      }}
                    />
                  </Stack>
                  <Stack sx={{ width: "50%" }}>
                    <InputLabel
                      htmlFor="last-name"
                      style={{
                        color: theme?.spaces?.mainColor,
                        fontSize: "14px",
                        fontWeight: "400",
                      }}
                    >
                      Last name
                    </InputLabel>

                    <TextField
                      id="last-name"
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

                          color: theme?.account?.normaltext,
                        },
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          border: theme?.account?.border,
                          color: theme?.profile?.primaryColor,
                        },
                        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          border: theme?.account?.border,
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          border: theme?.account?.border,
                        },
                      }}
                      InputLabelProps={{
                        style: { color: "#5D7C90" },
                      }}
                      type="text"
                      fullWidth
                      name="text"
                      placeholder="Enter Your Name"
                      value={lastName}
                      onChange={(event) => {
                        setChangedval({
                          ...changedval,

                          last_name: event.target.value,
                        });
                        setLastName(event.target.value);
                      }}
                    />
                  </Stack>
                </div>
                <Stack sx={{ marginTop: "20px" }}>
                  <InputLabel
                    htmlFor="last-name"
                    style={{
                      color: theme?.spaces?.mainColor,
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    Email
                  </InputLabel>
                  <div
                    style={{
                      height: "40px",
                      border: theme?.account?.border,

                      lineHeight: "40px",
                      borderRadius: "4px",
                      fontFamily: "URW DIN REGULAR",
                      fontSize: "14px",
                      paddingLeft: "12px",
                      color: theme?.account?.normaltext,

                      opacity: 0.4,
                    }}
                  >
                    {user.email}
                  </div>
                </Stack>

                {/* <Stack sx={{ marginTop: "20px" }}>
                  <InputLabel
                    style={{
                      color: theme?.spaces?.mainColor,
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    Timezone
                  </InputLabel>

                  <TimezoneSelect
                    value={selectedTimezone}
                    onChange={setSelectedTimezone}

                    // timezones={{
                    //   ...allTimezones,
                    //   'America/Lima': 'Pittsburgh',
                    //   'Europe/Berlin': 'Frankfurt',
                    // }}
                  />
                 
                 
                </Stack> */}
              </div>
            </div>
          )
          // <UserProfile user={user} />
        }

        {toggleState === "security" && (
          <div style={{ maxWidth: "400px", margin: "0px auto" }}>
            <form>
              <Stack sx={{ marginTop: "55px" }}>
                <InputLabel
                  htmlFor="current-password"
                  style={{
                    color: theme?.spaces?.mainColor,
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Current password
                </InputLabel>
                <TextField
                  // autoComplete="on"
                  id="current-password"
                  label=""
                  variant="outlined"
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "14px",
                      height: "42px",
                      marginTop: "-5px",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "14px",
                      height: "42px",
                      marginTop: "1px",
                      color: theme?.account?.normaltext,
                    },

                    "& .MuiOutlinedInput-input": {
                      fontFamily: "URW DIN REGULAR",
                      fontSize: "14px",

                      color: theme?.account?.normaltext,
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      border: theme?.account?.border,

                      color: theme?.account?.normaltext,
                    },
                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      border: theme?.account?.border,
                      color: theme?.account?.normaltext,
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: theme?.account?.border,
                      color: theme?.account?.normaltext,
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "#5D7C90" },
                  }}
                  InputProps={{
                    endAdornment: (
                      <div
                        onClick={handleClickShowPassword3}
                        style={{ cursor: "pointer" }}
                      >
                        {values.showPassword ? (
                          <EyeOutlined
                            style={{ color: "#88A1AB", fontSize: "14px" }}
                          />
                        ) : (
                          <EyeInvisibleOutlined
                            style={{ color: "#88A1AB", fontSize: "14px" }}
                          />
                        )}
                      </div>
                    ),
                  }}
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment position="end">
                  //       <IconButton
                  //         onClick={handleClickShowPassword3}
                  //         onMouseDown={handleMouseDownPassword}
                  //         edge="end"
                  //       >
                  //         {values.showPassword ? (
                  //           <EyeOutlined
                  //             style={{ color: "#88A1AB", fontSize: "14px" }}
                  //           />
                  //         ) : (
                  //           <EyeInvisibleOutlined
                  //             style={{ color: "#88A1AB", fontSize: "14px" }}
                  //           />
                  //         )}
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                  type={values.showPassword ? "text" : "password"}
                  onChange={(event) => {
                    setChangedval({
                      ...changedval,
                      confirm_password: event.target.value,
                    });
                    setValues({ ...values, password: event.target.value });
                  }}
                  value={values.password}
                  placeholder="Enter your current password"
                  fullWidth
                ></TextField>
              </Stack>
              <Stack sx={{ marginTop: "20px" }}>
                <InputLabel
                  htmlFor="new-password"
                  style={{
                    color: theme?.spaces?.mainColor,
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  New password
                </InputLabel>

                <TextField
                  id="new-password"
                  // autoComplete="on"
                  label=""
                  variant="outlined"
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "14px",
                      height: "42px",
                      marginTop: "-5px",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "14px",
                      height: "42px",
                      marginTop: "1px",
                    },

                    "& .MuiOutlinedInput-input": {
                      fontFamily: "URW DIN REGULAR",
                      fontSize: "14px",

                      color: theme?.account?.normaltext,
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      border: theme?.account?.border,

                      color: theme?.account?.normaltext,
                    },
                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      border: theme?.account?.border,
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: theme?.account?.border,
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "#5D7C90" },
                  }}
                  InputProps={{
                    endAdornment: (
                      <div
                        onClick={handleClickShowPassword2}
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword2 ? (
                          <EyeOutlined
                            style={{ color: "#88A1AB", fontSize: "14px" }}
                          />
                        ) : (
                          <EyeInvisibleOutlined
                            style={{ color: "#88A1AB", fontSize: "14px" }}
                          />
                        )}
                      </div>
                    ),
                  }}
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment position="end">
                  //       <IconButton
                  //         aria-label="toggle password visibility"
                  //         onClick={handleClickShowPassword2}
                  //         onMouseDown={handleMouseDownPassword}
                  //         edge="end"
                  //         color="secondary"
                  //       >
                  //         {showPassword2 ? (
                  //           <EyeOutlined
                  //             style={{ color: "#88A1AB", fontSize: "14px" }}
                  //           />
                  //         ) : (
                  //           <EyeInvisibleOutlined
                  //             style={{ color: "#88A1AB", fontSize: "14px" }}
                  //           />
                  //         )}
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                  type={showPassword2 ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  // value={registerpassword}
                  onChange={(event) => {
                    containsUppercase(event.target.value);
                    containsLowercase(event.target.value);
                    containsnumber(event.target.value);
                    setRegisterPassword(event.target.value);
                    setChangedval({
                      ...changedval,
                      new_password: event.target.value,
                    });
                  }}
                  onCut={(e) => {
                    e.preventDefault();
                  }}
                  onCopy={(e) => {
                    e.preventDefault();
                  }}
                />
              </Stack>

              <Stack sx={{ marginTop: "20px" }}>
                <InputLabel
                  htmlFor="confirm-password"
                  style={{
                    color: theme?.spaces?.mainColor,
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Confirm password
                </InputLabel>
                <TextField
                  id="confirm-password"
                  // autoComplete="on"
                  label=""
                  variant="outlined"
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "14px",
                      height: "42px",
                      marginTop: "-5px",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "14px",
                      height: "42px",
                      marginTop: "1px",
                    },

                    "& .MuiOutlinedInput-input": {
                      fontFamily: "URW DIN REGULAR",
                      fontSize: "14px",

                      color: theme?.account?.normaltext,
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      border:
                        showErrorMessage && isCPasswordDirty
                          ? theme?.account?.border
                          : theme?.account?.border,

                      // borderColor:
                      //   showErrorMessage && isCPasswordDirty
                      //     ? "#ae0000"
                      //     : "#143F63",

                      // borderRadius: "4px",
                      color: theme?.account?.normaltext,
                    },
                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      border:
                        showErrorMessage && isCPasswordDirty
                          ? theme?.account?.border
                          : theme?.account?.border,

                      // borderColor:
                      //   showErrorMessage && isCPasswordDirty
                      //     ? "#ae0000"
                      //     : "#143F63",

                      borderRadius: "4px",
                      color: theme?.account?.normaltext,
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border:
                        showErrorMessage && isCPasswordDirty
                          ? theme?.account?.border
                          : theme?.account?.border,

                      // borderColor:
                      //   showErrorMessage && isCPasswordDirty
                      //     ? "#ae0000"
                      //     : "#143F63",

                      borderRadius: "4px",
                      color: theme?.account?.normaltext,
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "#5D7C90" },
                  }}
                  InputProps={{
                    endAdornment: (
                      <div
                        onClick={handleClickShowPassword}
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword ? (
                          <EyeOutlined
                            style={{ color: "#88A1AB", fontSize: "14px" }}
                          />
                        ) : (
                          <EyeInvisibleOutlined
                            style={{ color: "#88A1AB", fontSize: "14px" }}
                          />
                        )}
                      </div>
                    ),
                  }}
                  placeholder="Re-Enter your password"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={(event) => {
                    setChangedval({
                      ...changedval,
                      new_password: event.target.value,
                    });

                    setCPassword(event.target.value);
                    setIsCPasswordDirty(true);
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                  }}
                />

                {showErrorMessage && isCPasswordDirty ? (
                  <div style={{ color: "#ae0000", fontSize: "small" }}>
                    Password did not match
                  </div>
                ) : (
                  ""
                )}

                {/* <TogglePassword /> */}
              </Stack>
            </form>
            <Typography
              variant="h5"
              style={{
                color: theme?.account?.normaltext,

                fontWeight: "700",
                fontSize: "14px",
                marginTop: "20px",
              }}
            >
              Password must contain:
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: theme?.spaces?.mainColor,
                fontSize: "14px",
                borderBottom: "1px solid",
              }}
            >
              <img
                alt=""
                src={
                  character
                    ? "/assets/icons/tick.png"
                    : "/assets/images/close-red.svg"
                }
              />
              <p style={{ marginLeft: "10px" }}>At least 6 character</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: theme?.spaces?.mainColor,
                fontSize: "14px",
                borderBottom: "1px solid",
              }}
            >
              <img
                alt=""
                src={
                  uppercase
                    ? "/assets/icons/tick.png"
                    : "/assets/images/close-red.svg"
                }
              />
              <p style={{ marginLeft: "10px" }}>
                At least 1 uppercase letter(A..Z)
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: theme?.spaces?.mainColor,
                fontSize: "14px",
                borderBottom: "1px solid",
              }}
            >
              <img
                alt=""
                src={
                  lowercase
                    ? "/assets/icons/tick.png"
                    : "/assets/images/close-red.svg"
                }
              />
              <p style={{ marginLeft: "10px" }}>
                At least 1 lowercase letter(a..z)
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: theme?.spaces?.mainColor,
                fontSize: "14px",
                borderBottom: "1px solid",
              }}
            >
              <img
                alt=""
                src={
                  number
                    ? "/assets/icons/tick.png"
                    : "/assets/images/close-red.svg"
                }
              />
              <p style={{ marginLeft: "10px" }}>At least 1 number(0..9)</p>
            </div>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "38px auto",
            maxWidth: "400px",
          }}
        >
          <Button
            variant="contained"
            style={{
              fontFamily: "URW DIN REGULAR",
              textTransform: "none",
              fontSize: "14px",
              lineHeight: "22px",
              backgroundColor: theme?.login?.mainColor,
              borderRadius: "4px",
              color: "white",
              boxShadow: "none",
              width: "180px",
              height: "40px",
            }}
            onClick={() => {
              if (toggleState === "security") {
                if (
                  character &&
                  uppercase &&
                  lowercase &&
                  number &&
                  registerPassword === cPassword
                ) {
                  updateSubmit();
                } else {
                  setOpenerrorToast(true);
                  setMessage(
                    "Password didn't match the constraints. Please check."
                  );
                }
              } else {
                updateSubmit();
              }
            }}
          >
            Save changes
          </Button>

          <Button
            variant="contained"
            style={{
              fontFamily: "URW DIN REGULAR",
              textTransform: "none",
              height: "40px",
              fontSize: "14px",
              lineHeight: "22px",
              backgroundColor: theme?.account?.cancelButton,
              border: theme?.account?.border,

              // borderRadius: "4px",
              color: theme?.login?.tertiaryColor,
              boxShadow: "none",
              width: "180px",
            }}
          // onClick={() => {
          //   props.handleUpdateProfileClose();
          //   props.handleProfileClose();
          // }}
          >
            Cancel
          </Button>
        </div>
      </div>

      {/* {addFilePopupImage && (
        <MediaFileManager
          fileManagerType="image"
          closeShareHandlerImage={closeShareHandlerImage}
          setFile={setImage}
          setFormValues={setChangedval}
          formValues={changedval}
          componentFor="userProfile"
        />
      )} */}
      <Toast
        openToast={openToast}
        setOpenToast={setOpenToast}
        message={message}
      />
      <Toast
        openToast={openerrorToast}
        setOpenToast={setOpenerrorToast}
        message={message}
        type="error"
      />
    </>
  );
};

export default AccountPage;
