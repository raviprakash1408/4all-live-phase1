import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { TextField, Stack } from "@mui/material";
import { useEffect } from "react";
import { AxiosLocal } from "../utilities/axiosUtils.ts";
import { useLocation } from "react-router";
// @ts-ignore
import CustomTextField from "./styled/textField.tsx";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import MuiTextField from "../admin/components/MuiTextField";
import { changeOpacity, formatDate } from "../utilities/common";
import { useSelector } from "react-redux";
import { RootState } from "../state/store.tsx";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { RandomPicture } from "random-picture";
import Toast from "../sections/Toast";
import { Link } from "react-router-dom";

function PopUpForm(props) {
  const theme = useSelector((state: RootState) => state.theme.themeData);
  // state for username and password
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hidePassword, sethidePassword] = React.useState(false);
  const [wrongPassword, setwrongPassword] = React.useState(false);
  const [toastNullPassword, setToastNullPassword] = React.useState(false);
  const [toastNullUsername, setToastNullUsername] = React.useState(false);
  const [toastNullBoth, setToastNullBoth] = React.useState(false);

  const location = useLocation();
  const handleClickHidePassword = () => {
    sethidePassword(!hidePassword);
  };

  const handleMouseDownHidePassword = (event) => {
    event.preventDefault();
  };
  const validateForm = () => {
    let isValid = true;
    if (props.is_password) {
      if (username == "") {
        isValid = false;
        setToastNullUsername(true);
      }
      if (password == "") {
        isValid = false;
        setToastNullPassword(true);
      }
      if (username == "" && password == "") {
        isValid = false;
        setToastNullBoth(true);
      }
    } else {
      if (username == "") {
        isValid = false;
        setToastNullUsername(true);
      }
    }

    if (isValid) {
      AxiosLocal.post("guest/", {
        password,
        name: username,
        organization_slug:
          location.pathname.split("/")[1] == "auth"
            ? location.pathname.split("/")[2]
            : location.pathname.split("/")[1],
        subspace_slug: location.pathname.substring(
          location.pathname.lastIndexOf("/") + 1
        ),
      }).then(
        function (response) {
          console.log(response.data, "Event validation");
          console.log(response, "responselogin");
          if (response.data.status == "Failed") {
            setwrongPassword(true);
          } else {
            // const userInformation = JSON.parse(response.data.user_info)
            localStorage.setObject("islogin", "yes");
            localStorage.setObject("accessToken", response.data.accessToken);
            localStorage.setObject("refreshToken", response.data.accessToken);
            localStorage.setObject("username", response.data.name);
            localStorage.setObject("last_name", "");
            localStorage.setObject("id", response.data.id);
            localStorage.setObject("currentSpaceName", "");
            localStorage.setObject("user_type", response.data.user_type);
            localStorage.setObject(
              "organization",
              response.data.organisation.company_name
            );
            localStorage.setObject(
              "organization_slug",
              response.data.organisation.slug
            );
            localStorage.setObject(
              "organizationId",
              response.data.organisation.id
            );

            localStorage.setObject(
              "centrifugo_token",
              response.data.centrifugo_token
            );
            localStorage.setObject(
              "centrifugo_channel_name",
              response.data.centrifugo_channel_name
            );
            localStorage.setObject(
              "is_organization_user",
              response.data.is_organization_user
            );

            // localStorage.setObject('userInformation', JSON.parse(response.data.user_info));
            localStorage.setObject("auth", "true");
            localStorage.setObject("guestUser", "true");
            // RandomPicture().then((data) => {
            //   localStorage.setObject("avatar", data.url);
            // });

            props.handleSuccess({ password, username });
            // props.handleClose();
            // window.location.reload();
          }
        },
        (error) => {
          if (error.response.status === 401) {
            setwrongPassword(true);
          }
          return error;
        }
      );
    } else {
      setToastNullPassword(true);
    }
  };

  // handle change for username and password
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          display: props.open ? "flex" : "none",
          width: "100vw",
          height: "100vh",
          top: "0px",
          left: "0px",
          background: theme?.bg_color_1,
          borderRadius: "4px",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "99",
          userSelect: "none",
        }}
        // onClick={() => {
        //   props.handleClose();
        // }}
      >
        <div
          style={{
            position: "relative",
            width: "482px",
            maxHeight: "90vh",
            backgroundColor: theme?.addSpace?.mainColor,
            borderRadius: "4px",
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {!props.noClose && (
            <Link to={`/`}>
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  width: "20px",
                  height: "20px",
                  top: "-10px",
                  right: "-10px",
                  backgroundColor: "#5C7189",
                  borderRadius: "25px",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  // props.handleClose();
                }}
              >
                <img
                  alt=""
                  src="/assets/icons/x.svg"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(81%) sepia(6%) saturate(202%) hue-rotate(177deg) brightness(105%) contrast(89%)",
                  }}
                />
              </div>
            </Link>
          )}
          <div
          // className="vertical-scrollbar"
          // style={{
          //   display: "flex",
          //   maxHeight: "calc(100% - 100px)",
          //   flexDirection: "column",
          //   gap: "6px",
          //   overflow: "hidden",
          //   overflowY: "auto",
          // }}
          >
            <Typography
              style={{
                padding: "35px",
                color: "white",
                textAlign: "center",
                fontSize: "20px",
                fontFamily: "URW DIN",
                fontWeight: 700,
              }}
            >
              Join to space
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "5px solid #008BCD",
                }}
                alt=""
                src={props.savedSubroom?.room_image}
              />
            </div>

            <Typography
              style={{
                color: "#E1E7EA",
                fontSize: "16px",
                fontFamily: "URW DIN",
                textAlign: "center",
                paddingTop: "10px",
              }}
            >
              {props.savedSubroom?.name}
            </Typography>

            <Typography
              style={{
                color: "#88A1AB",
                fontSize: "14px",
                fontFamily: "URW DIN REGULAR",
                textAlign: "center",
                fontWeight: 400,
              }}
            >
              {formatDate(new Date(props.savedSubroom?.start_date))}
            </Typography>

            {props.is_username && (
              // <Stack sx={{margin:"30px 68px 20px 68px"}}>
              //   <MuiTextField
              //     autoComplete="new-password"
              //     label=""
              //     variant="outlined"
              //     onChange={handleUsernameChange}
              //     value={username}
              //     placeholder="Enter your name here"
              //   />
              // </Stack>
              <Stack sx={{ margin: "30px 68px 0px 68px" }}>
                <TextField
                  label=""
                  variant="outlined"
                  onChange={handleUsernameChange}
                  value={username}
                  sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "16px",
                      height: "40px",
                      marginTop: "-5px",
                      paddingLeft: "12px",
                      textAlign: "center",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "16px",
                      height: "40px",
                      marginTop: "1px",
                      textAlign: "center",
                    },

                    "& .MuiOutlinedInput-input": {
                      fontFamily: "URW DIN REGULAR",
                      fontSize: "16px",
                      textAlign: "center",

                      color: theme?.profile?.primaryColor,
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        border: "2px solid",
                        borderColor: theme?.login?.secondaryColor,

                        borderRadius: "4px",
                        color: theme?.profile?.primaryColor,
                      },
                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        border: "2px solid",
                        borderColor: theme?.login?.secondaryColor,

                        borderRadius: "4px",
                      },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        border: "2px solid",
                        borderColor: theme?.login?.secondaryColor,

                        borderRadius: "4px",
                      },
                  }}
                  InputLabelProps={{
                    style: { color: "#5D7C90" },
                  }}
                  InputProps={{
                    style: {
                      fontStyle: "italic",
                      // backgroundColor: "#012243",
                      textAlign: "center",
                    },
                  }}
                  type="text"
                  name="text"
                  placeholder="Enter your name here"
                />
              </Stack>
            )}

            {props.is_password && (
              // <MuiTextField
              //   autoComplete="new-password"
              //   type="password"
              //   id="outlined-basic"
              //   label="Password"
              //   variant="outlined"
              //   onChange={handlePasswordChange}
              //   value={password}
              // />
              <Stack sx={{ margin: "20px 68px 0px 68px" }}>
                <TextField
                  onChange={handlePasswordChange}
                  value={password}
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
                        border: "2px solid",
                        borderColor: theme?.login?.secondaryColor,

                        borderRadius: "4px",
                        color: theme?.profile?.primaryColor,
                      },
                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      {
                        border: "2px solid",
                        borderColor: theme?.login?.secondaryColor,

                        borderRadius: "4px",
                      },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        border: "2px solid",
                        borderColor: theme?.login?.secondaryColor,

                        borderRadius: "4px",
                      },
                  }}
                  type={hidePassword ? "text" : "password"}
                  placeholder="Enter password"
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
                      </InputAdornment>
                    ),
                    style: { fontStyle: "italic" },
                  }}
                  InputLabelProps={{
                    style: { color: "#5D7C90" },
                  }}
                />
              </Stack>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 0px 58px",
              }}
            >
              {!props.disableButtons && (
                <Button
                  style={{
                    color: "white",
                    backgroundColor: theme?.login?.mainColor,
                    fontFamily: "URW DIN REGULAR",
                    textTransform: "none",
                    padding: "7px 128px",
                  }}
                  onClick={() => {
                    validateForm();
                  }}
                >
                  <img alt="" src="/assets/admin/join-now.svg" />
                  <span style={{ paddingLeft: "10px" }}>Join now</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toast
        openToast={wrongPassword}
        setOpenToast={setwrongPassword}
        message="Password is incorrect. Check your password."
        type="error"
      />
      <Toast
        openToast={toastNullPassword}
        setOpenToast={setToastNullPassword}
        message="Please enter password."
        type="error"
      />
      <Toast
        openToast={toastNullUsername}
        setOpenToast={setToastNullUsername}
        message="Please enter username."
        type="error"
      />
      <Toast
        openToast={toastNullBoth}
        setOpenToast={setToastNullBoth}
        message="Please enter username and password."
        type="error"
      />
      {/* <Dialog
        open={props.open}
        onClose={props.handleClose}
        keepMounted
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "#011934",

            boxShadow: "none",
          },
        }}
      >
        <DialogContent
          style={{
            width: "482px",

            color: "white",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            overflowY: "unset",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Join to Space
          </Typography>
          <div>
            <img
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #008BCD",
              }}
              alt=""
              src={props.savedSubroom.room_image}
            />
          </div>

          <Typography id="modal-modal-title" variant="h5" component="h2">
            {props.savedSubroom.name}
          </Typography>

          <Typography variant="h6" component="h5">
            {formatDate(new Date(props.savedSubroom.start_date))}
          </Typography>

          {props.is_username && (
            <MuiTextField
              autoComplete="new-password"
              label="Username"
              variant="outlined"
              onChange={handleUsernameChange}
              value={username}
            />
          )}

          {props.is_password && (
            <MuiTextField
              autoComplete="new-password"
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              onChange={handlePasswordChange}
              value={password}
            />
          )}
          {!props.disableButtons && (
            <DialogActions
              style={{
                color: "white",
              }}
            >
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#008BCD",
                }}
                onClick={() => {
                  checkPassword();
                }}
              >
                Save
              </Button>
            </DialogActions>
          )}
        </DialogContent>
      </Dialog> */}
    </>
  );
}

export default PopUpForm;
