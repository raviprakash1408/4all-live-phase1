import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Link,
  InputAdornment,
  Stack,
  Typography,
  TextField,
  Box
} from "@mui/material";
import { useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import AuthFooter from "../../sections/AuthFooter";
import LockIcon from "@mui/icons-material/Lock";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import { getURLParameters } from "../../utilities/common";
import Toast from "../../sections/Toast";
import { Helmet } from "react-helmet";

const ResetPassword = () => {
  const theme = useSelector((state) => state.theme.themeData);


  //showpassword 1

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //showpassword 2
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const [resetPassword, setResetPassword] = useState("");
  const [cResetPassword, setCResetPassword] = useState("");
  const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(true);

  useEffect(() => {
    if (isCPasswordDirty) {
      if (resetPassword === cResetPassword) {
        setShowErrorMessage(false);
      } else {
        setShowErrorMessage(true);
      }
    }
  }, [resetPassword, cResetPassword]);
  ;


  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePaste = (event) => {
    event.preventDefault(); // Prevent default paste behavior
    setCResetPassword(""); // Clear the confirm password field
  };

  //error toast

  const [message, setMessage] = useState("");
  const [openerrorToast, setOpenerrorToast] = useState(false);
  const [openToast, setOpenToast] = useState(false);


  useEffect(() => {
    isTokenValid()
  }, [])
  let params = getURLParameters(window.location.href);


  //function for check token is valid 
  const isTokenValid = () => {
    console.log(params, "paramsparams");
    if (params.token) {

      AxiosLocal.post("token/check/", {
        token: params.token,
      }).then(function (response) {
        console.log(response, "response");
        if (response.data.status === "Success") {
          console.log("Token is valid");
        } else {
          setMessage("Token is invalid")
          setOpenerrorToast(true)
          window.location.href = "/";
        }
      })
    }
  }




  //function for reset password
  const handleResetPassword = () => {
    AxiosLocal.post("password/reset/", {
      token: params.token,
      new_password: resetPassword,
      confirm_password: cResetPassword,
    }).then((response) => {
      console.log(response, response.data.status == "Success", "responseresponse responseresponse");
      if (response.data.status == "Success") {
        setOpenToast(true)
        setMessage("Password reseted successfully")
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }

    });
  }

  console.log(theme, "themetheme");

  return (
    <>
      <Helmet>
        <title>{theme?.login?.title}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={theme?.login?.favicon180x180}
        />

        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href={theme?.login?.favicon512x512}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={theme?.login?.favicon32x32}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={theme?.login?.favicon16x16}
        />


      </Helmet>
      <div
        style={{
          height: "100vh",
          width: "100%",
          position: "absolute",
          backgroundColor: theme?.table?.headerColor,
        }}
      >
        {/* <img
          alt="Authbg"
          src={theme?.login?.bgImg}
          className="Authbg"
          draggable="false"
        /> */}

        {/* <MaterialUISwitch
        mode={style}
        sx={{ m: 3 }}
        onChange={() => {
          if (style === "dark") {
            setTheme("light", dispatch);
          } else {
            setTheme("dark", dispatch);
          }
        }}
        defaultChecked
      /> */}
        <img
          alt="Authlogo"
          src={theme?.login?.logoImg}
          className="Authlogo"
          draggable="false"
        />
        <div>
          {/* reset password form */}

          <div className="login-form">
            <Grid
              sx={{
                maxWidth: { xs: 400, lg: 475 },
                margin: { xs: 2.5, md: 3 },
              }}
            >
              <Box
                sx={{
                  p: { xs: 2, sm: 3, md: 4, xl: 5 },
                  borderRadius: "4px",
                  backgroundColor: theme?.login?.primaryColor,
                }}
                className="login-form-box"
                width={"395px"}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: 20,
                          color: theme?.login?.tertiaryColor,
                          fontFamily: "URW DIN",
                        }}
                      >
                        Reset Password
                      </Typography>
                      <p
                        style={{
                          fontSize: "16px",
                          lineHeight: "22px",
                          color: theme?.profile?.mainColor,
                          fontFamily: "URW DIN REGULAR",
                        }}
                      >
                        Please choose your new password
                      </p>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <TextField
                        id="reset_password"
                        label="Password"
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
                            fontSize: "15px",
                            borderRadius: "0px",

                            color: theme?.login?.quaternaryColor,
                          },
                          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            border: false ? "1px solid" : "2px solid",
                            borderColor: false
                              ? "#ae0000"
                              : theme?.login?.secondaryColor,
                            color: theme?.login?.quaternaryColor,
                          },
                          "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            border: false ? "1px solid" : "2px solid",
                            borderColor: false
                              ? "#ae0000"
                              : theme?.login?.secondaryColor,
                          },
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            border: false ? "1px solid" : "2px solid",
                            borderColor: false
                              ? "#ae0000"
                              : theme?.login?.secondaryColor,
                          },
                        }}
                        InputLabelProps={{
                          style: { color: "#5D7C90" },
                        }}
                        InputProps={{
                          // startAdornment: (
                          //   <InputAdornment position="start">
                          //     <LockIcon
                          //       style={{
                          //         color: "#5D7C90"showPassword,
                          //         marginLeft: "-4px",
                          //         fontSize: "20px",
                          //       }}
                          //     />
                          //   </InputAdornment>
                          // ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                color="secondary"
                              >
                                {showPassword ? (
                                  <EyeOutlined style={{ color: "#5D7C90" }} />
                                ) : (
                                  <EyeInvisibleOutlined
                                    style={{ color: "#5D7C90" }}
                                  />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={(event) =>
                          setResetPassword(event.target.value)
                        }
                        placeholder="Enter your password"
                      />
                      {/* {formiklogin.touched.password &&
                    formiklogin.errors.password ? (
                      <div
                        style={{
                          color: "#ae0000",
                          fontSize: "small",
                        }}
                      >
                        {formiklogin.errors.password}
                      </div>
                    ) : null} */}
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <TextField
                        id="reset_confirm_password "
                        label="Confirm Password"
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
                            fontSize: "15px",
                            borderRadius: "0px",

                            color: theme?.login?.quaternaryColor,
                          },
                          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            border:
                              showErrorMessage && isCPasswordDirty
                                ? "1px solid"
                                : "2px solid",
                            borderColor:
                              showErrorMessage && isCPasswordDirty
                                ? "#ae0000"
                                : theme?.login?.secondaryColor,
                            color: theme?.login?.quaternaryColor,
                          },
                          "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            border:
                              showErrorMessage && isCPasswordDirty
                                ? "1px solid"
                                : "2px solid",
                            borderColor:
                              showErrorMessage && isCPasswordDirty
                                ? "#ae0000"
                                : theme?.login?.secondaryColor,
                          },
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            border:
                              showErrorMessage && isCPasswordDirty
                                ? "1px solid"
                                : "2px solid",
                            borderColor:
                              showErrorMessage && isCPasswordDirty
                                ? "#ae0000"
                                : theme?.login?.secondaryColor,
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color:
                              showErrorMessage && isCPasswordDirty
                                ? "#ae0000"
                                : "#5D7C90",
                          },
                        }}
                        InputProps={{
                          // startAdornment: (
                          //   <InputAdornment position="start">
                          //     <LockIcon
                          //       style={{
                          //         color: "#5D7C90",
                          //         marginLeft: "-4px",
                          //         fontSize: "20px",
                          //       }}
                          //     />
                          //   </InputAdornment>
                          // ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword2}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                color="secondary"
                              >
                                {showPassword2 ? (
                                  <EyeOutlined style={{ color: "#5D7C90" }} />
                                ) : (
                                  <EyeInvisibleOutlined
                                    style={{ color: "#5D7C90" }}
                                  />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        type={showPassword2 ? "text" : "password"}
                        name="password"
                        onChange={(event) => {
                          setCResetPassword(event.target.value);
                          setIsCPasswordDirty(true);
                        }}
                        onCopy={handlePaste}
                        onCut={handlePaste}
                        onPaste={handlePaste}
                        placeholder="Enter your confirm password"
                      />
                      {showErrorMessage && isCPasswordDirty ? (
                        <div
                          style={{
                            color: "#ae0000",
                            fontSize: "small",
                          }}
                        >
                          {" "}
                          Passwords did not match{" "}
                        </div>
                      ) : (
                        ""
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      disableElevation
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      disabled={showErrorMessage}
                      sx={{
                        color: "#fff",
                        backgroundColor: theme?.login?.mainColor,

                        textTransform: "none",
                        fontFamily: "URW DIN REGULAR",
                        "&:disabled": {
                          opacity: 0.4,
                          pointerEvents: "none",
                          backgroundColor: theme?.login?.mainColor,
                          color: "#fff",
                        },
                      }}
                      onClick={handleResetPassword}
                    >
                      Reset Password
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack style={{ textAlign: "center" }}>
                      <Link
                        variant="h6"
                        // onClick={() => {
                        //   setShowContactPop(true);
                        // }}
                        color={theme?.login?.mainColor}
                        style={{
                          textDecoration: "none",
                          fontSize: 16,
                          fontFamily: "URW DIN REGULAR",
                          cursor: "pointer",
                        }}
                      >
                        Contact us
                      </Link>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </div>
        </div>
        <div
          style={{
            top: "50%",
            right: "21px",
            margin: "auto 0",
            position: "absolute",
            width: "70px",
            height: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme?.login?.iconColor,
            borderRadius: "50%",
          }}
        >
          <img alt="" src={theme?.login?.iconImg} />
        </div>
        <div>
          <AuthFooter />
        </div>
      </div>
      <Toast
        openToast={openerrorToast}
        setOpenToast={setOpenerrorToast}
        message={message}
        type="error"
      />
      <Toast
        openToast={openToast}
        setOpenToast={setOpenToast}
        message={message}
      />
    </>
  );
}

export default ResetPassword