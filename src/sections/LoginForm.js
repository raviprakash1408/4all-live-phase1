import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Divider,
  Grid,
  Link,
  InputAdornment,
  Stack,
  Typography,
  Box,
  TextField,
  OutlinedInput,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

// import FirebaseSocial from './FirebaseSocial';
import { AxiosLocal } from "../utilities/axiosUtils.ts";
import { AccountContext } from "./accountContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import IconButton from "@material-ui/core/IconButton";
import ReactPhoneInput from "react-phone-input-2";
import CountryCode from "./CountryCode";
import ContactUs from "./ContactUs";
import Toast from "./Toast";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import LockIcon from "@mui/icons-material/Lock";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CircularProgress from "@mui/material/CircularProgress";
import { setuserProfile } from "../state/userProfile/userProfileSlice";
import { AxiosError } from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };

// get theme from theme.js
const useOutlinedInputStyles = makeStyles((theme) => ({
  // root: {
  //   "& $notchedOutline": {
  //     borderColor: "#012A50"
  //   },
  //   "&:hover $notchedOutline": {
  //     borderColor: "#012A50 !important"
  //   },
  //   "&$focused $notchedOutline": {
  //     borderColor: "green"
  //   },
  // },
  // focused: {},
  // notchedOutline: {}
}));

const LoginForm = (props) => {
  const navigate = useNavigate();

  // get theme from theme.js
  const theme = useSelector((state) => state.theme.themeData);
  const style = useSelector((state) => state.theme.theme);
  const [hover, sethover] = useState("");

  const dispatch = useDispatch();

  const outlinedInputClasses = useOutlinedInputStyles();

  const primaryColor = theme?.login?.primaryColor;
  const secondaryColor = theme?.login?.secondaryColor;
  const tertiaryColor = theme?.login?.tertiaryColor;
  const mainColor = theme?.login?.mainColor;
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [registerPassword, setRegisterPassword] = useState();
  const [phone, setPhone] = useState("123456");
  const [country, setContry] = useState("India");
  const [isactive, setIsactive] = useState(true);
  const [tier, setTier] = useState("primary");
  const [isRegistered, setIsRegistered] = useState(false);
  const [openToastRegister, setOpenToastRegister] = React.useState(false);
  const [cPassword, setCPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
  const [openToast, setOpenToast] = React.useState(false);
  const [loginToastMessage, setLoginToastMessage] = useState(
    "Email or Password is Wrong Please Try Again"
  );
  const [loggedin, setLoggedin] = React.useState();
  const [verification, setVerification] = React.useState();
  const [resetPassword, setResetPassword] = useState();
  const [cResetPassword, setCResetPassword] = useState("");
  const [forgotpassword, setForgotpassword] = useState();
  const [openToastforgot, setOpenToastforgot] = React.useState(false);
  const [buttonLoader, setbuttonLoader] = useState(false);

  const [openUpdateToast, setOpenUpdateToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [updateStatus, setUpdateStatus] = useState("success");

  const [emailDbExists, setemailDbExists] = useState(false);

  //country
  const [countryflag, setcountryflag] = React.useState("");
  const handleChange = (childdata) => {
    if (childdata == "") {
      setcountryflag("India");
    }
    setcountryflag(childdata);
  };

  useEffect(() => {
    if (isCPasswordDirty) {
      if (registerPassword === cPassword) {
        setShowErrorMessage(false);
      } else {
        setShowErrorMessage(true);
      }
    }
  }, [cPassword, registerPassword]);
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = theme?.login?.favicon32x32;
  }, []);
  useEffect(() => {
    if (isCPasswordDirty) {
      if (resetPassword === cResetPassword) {
        setShowErrorMessage(false);
      } else {
        setShowErrorMessage(true);
      }
    }
  }, [resetPassword, cResetPassword]);

  const emailDbCheck = (email) => {
    AxiosLocal.post("user/emailcheck/", {
      email: email,
    }).then((response) => {
      if (response.data.status == "Success") {
        setemailDbExists(response.data.userExists);
      }
    });
  };

  useEffect(() => {
    document.title = theme?.login?.title;
  }, []);
  const handleOnChange = (value) => {
    console.log(value);
    setPhone(value);
  };
  const formiklogin = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Password is required"),

      username: Yup.string()
        .email("Must be a valid email")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      // password:'',
      // username:'',
      firstName: "",
      lastName: "",
      email: "",
      registerpassword: "",
      cregisterpassword: "",
      phonenumber: "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("First Name is required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Last Name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .required("Email is required"),
      registerpassword: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Password is required"),
      cregisterpassword: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Confirm password is required"),
      phonenumber: Yup.string()
        .required("Phone Number is required")
        .matches(phoneRegExp, "Phone number is not valid"),
      countrycode: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const forgetSubmit = () => {
    AxiosLocal.post("user/email/check/", {
      email: forgotpassword,
    }).then((response) => {
     
      if (response.data.email_exists) {
        AxiosLocal.post("forgotpassword/", {
            email: forgotpassword,
          }).then((response) => {
              if(response.data.status == "Success"){
                switchToCheckMail();
              }
            }
          )

      } else {
        setOpenToastforgot(true);
      }
    });
  };

  const loginSubmit = () => {
    console.log(formiklogin.values, "formik.values");
    AxiosLocal.post("user/login/", {
      username: formiklogin.values.username,
      password: formiklogin.values.password,
    })
      .then(function (response) {
        if (response.data.status == "Success") {
          console.log(response, "responselogin");
          // const userInformation = JSON.parse(response.data.user_info)
          dispatch(
            setuserProfile({
              firstName: response.data.name,
              lastName: response.data.last_name,
              avatar: response.data.avatar,
              email: response.data.email,
            })
          );
          localStorage.setObject("islogin", "yes");
          localStorage.setObject("accessToken", response.data.accessToken);
          localStorage.setObject("refreshToken", response.data.accessToken);
          localStorage.setObject("username", response.data.name);
          localStorage.setObject("last_name", response.data.last_name);
          localStorage.setObject("id", response.data.id);
          localStorage.setObject("currentSpaceName", "");
          localStorage.setObject("user_type", response.data.user_type);
          localStorage.setObject(
            "organization",
            response.data.organisation.company_name
          );
          localStorage.setObject(
            "organization_logo",
            response.data.organisation.company_logo
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
          localStorage.setObject(
            "organization_user_email",
            response.data.organisation_user_data.email
          );
          localStorage.setObject("auth", true);
          localStorage.setObject("guestUser", "false");
          localStorage.setObject("avatar", response.data.avatar);
          localStorage.setObject(
            "is_email_verified",
            response.data.is_email_verified
          );
          // role
          localStorage.setObject("role", response.data.role);
          window.location.href = "/spaces";
          // navigate.push("/spaces");
        } else {
          setOpenToast(true);
          setLoginToastMessage(response.data.message);
          setLoggedin("");
        }
      })
      .catch(function (error) {
        console.log(error, "error");
        if (!error?.response) {
          console.log("error No Server Response");
          setOpenToast(true);
          setLoginToastMessage("Server is not responding, please try again.");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else if (error?.code === AxiosError.ERR_NETWORK) {
          console.log("error Network Error");
          setOpenToast(true);
          setLoginToastMessage("Network error occured, please try again.");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else if (error.response?.status === 404) {
          console.log("error 404 - Not Found");
        } else if (error?.code) {
          console.log("error Code: " + error.code);
        } else {
          console.log("error Unknown Error");
        }
        if (error.response.data.status === "Error") {
          setOpenToast(true);
          setLoginToastMessage(error.response.data.message);
          setLoggedin("");
        }
      });
  };

  const registerSubmit = () => {
    setbuttonLoader(true);
    AxiosLocal.post("user/registration/", {
      adding_type: "registration",
      first_name: formik.values.firstName,
      last_name: formik.values.lastName,
      phone: formik.values.phonenumber,
      email: formik.values.email,
      password: formik.values.registerpassword,
      is_active: isactive,
    })
      .then(function (response) {
        console.log(response.data, "responseresponse");
        if (response.data.status == "Success") {
          localStorage.setObject("auth", true);
          handleClickToastRegister();
          setTimeout(() => {
            window.location.href = "/";
          }, 4000);
        } else {
          localStorage.setObject("auth", false);
          setOpenUpdateToast(true);
          setToastMessage("App user with this email id already exists.");
          setUpdateStatus("warning");
        }
      })
      .then(() => {
        console.log(
          typeof localStorage.getObject("auth"),
          "AuthenticationLogin"
        );
        if (localStorage.getObject("auth") === "true") {
          console.log("AuthenticationLogin");
          AxiosLocal.post("user/login/", {
            username: formik.values.email,
            password: formik.values.registerpassword,
          }).then(function (response) {
            if (response.data.status == "Success") {
              console.log(response, "responselogin");
              localStorage.setObject("islogin", "yes");
              localStorage.setObject("accessToken", response.data.accessToken);
              localStorage.setObject("refreshToken", response.data.accessToken);
              localStorage.setObject("username", response.data.name);
              localStorage.setObject("last_name", response.data.last_name);
              localStorage.setObject("id", response.data.id);
              localStorage.setObject("currentSpaceName", "");
              localStorage.setObject("user_type", response.data.user_type);
              localStorage.setObject(
                "organization",
                response.data.organisation.company_name
              );
              localStorage.setObject(
                "organization_logo",
                response.data.organisation.company_logo
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
              localStorage.setObject(
                "organization_user_email",
                response.data.organisation_user_data.email
              );
              localStorage.setObject("auth", true);
              localStorage.setObject("guestUser", "false");
              localStorage.setObject("avatar", response.data.avatar);
              localStorage.setObject(
                "is_email_verified",
                response.data.is_email_verified
              );
              localStorage.setObject("role", response.data.role);

              // window.location.href = "/spaces"

              setbuttonLoader(false);
            } else {
              setOpenToast(true);
              setLoggedin("");
            }
          });
        } else {
          setbuttonLoader(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClickToastRegister = () => {
    setOpenToastRegister(true);
  };

  const handleCloseToastRegister = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToastRegister(false);
    window.location.href = "/";
  };

  //registerform switching
  const [active, setActive] = useState("signin");

  const switchToSignup = () => {
    setActive("signup");
  };

  const switchToSignin = () => {
    setActive("signin");
  };

  const switchToForgetPassword = () => {
    setActive("forgetpassword");
  };

  const switchToCheckMail = () => {
    setActive("checkmail");
  };

  const switchToVerification = () => {
    setActive("verification");
  };

  const switchToResetPassword = () => {
    setActive("resetpassword");
  };

  const contextValue = {
    switchToSignup,
    switchToSignin,
    switchToForgetPassword,
    switchToCheckMail,
  };
  const [capsWarning, setCapsWarning] = useState(false);

  //showpassword 1
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onKeyDown = (keyEvent) => {
    if (keyEvent.getModifierState("CapsLock")) {
      setCapsWarning(true);
    } else {
      setCapsWarning(false);
    }
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //showpassword 2
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  //contactus popup
  const [showContactPop, setShowContactPop] = useState(false);

  return (
    <>
      <AccountContext.Provider value={contextValue}>
        <div className="login-form">
          <Grid
            sx={{ maxWidth: { xs: 400, lg: 475 }, margin: { xs: 2.5, md: 3 } }}
          >
            <Box
              sx={{
                p: { xs: 2, sm: 3, md: 4, xl: 5 },
                borderRadius: "4px",
                backgroundColor: primaryColor,
              }}
              className="login-form-box"
              width={active === "verification" ? "445px" : "395px"}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {active === "signin" && (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="baseline"
                      sx={{ mb: { xs: -0.5, sm: 0.5 } }}
                      style={{ paddingTop: "15px" }}
                      className="block"
                    >
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: 20,
                          color: tertiaryColor,
                          fontFamily: "URW DIN",
                        }}
                      >
                        Sign in
                      </Typography>
                      <Typography
                        sx={{ textDecoration: "none", cursor: "pointer" }}
                        color={mainColor}
                        style={{ fontFamily: "URW DIN REGULAR" }}
                        onClick={switchToSignup}
                      >
                        I don&apos;t have an account?
                      </Typography>
                    </Stack>
                  )}
                  {active === "signup" && (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="baseline"
                      sx={{ mb: { xs: -0.5, sm: 0.5 } }}
                      style={{ paddingTop: "15px" }}
                      className="block"
                    >
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: 20,
                          color: tertiaryColor,
                          fontFamily: "URW DIN",
                        }}
                      >
                        Sign up
                      </Typography>
                      <Typography
                        sx={{ textDecoration: "none", cursor: "pointer" }}
                        color={mainColor}
                        style={{ fontFamily: "URW DIN REGULAR" }}
                        onClick={switchToSignin}
                      >
                        Already have an account?
                      </Typography>
                    </Stack>
                  )}
                  {active === "forgetpassword" && (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="baseline"
                      sx={{ mb: { xs: -0.5, sm: 0.5 } }}
                      style={{ paddingTop: "15px" }}
                      className="block"
                    >
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: 20,
                          color: tertiaryColor,
                          fontFamily: "URW DIN",
                        }}
                      >
                        Forgot password?
                      </Typography>
                      <Typography
                        sx={{ textDecoration: "none", cursor: "pointer" }}
                        color={mainColor}
                        style={{ fontFamily: "URW DIN REGULAR" }}
                        onClick={switchToSignin}
                      >
                        Already have an account?
                      </Typography>
                    </Stack>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                      {active === "signin" && (
                        <>
                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <TextField
                                id="outlined-basic"
                                label="Email"
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
                                    borderRadius: "0px !important",
                                    color: theme?.login?.quaternaryColor,
                                  },
                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formiklogin.touched.username &&
                                        formiklogin.errors.username
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formiklogin.touched.username &&
                                        formiklogin.errors.username
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,
                                      color: theme?.login?.quaternaryColor,
                                    },
                                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formiklogin.touched.username &&
                                        formiklogin.errors.username
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formiklogin.touched.username &&
                                        formiklogin.errors.username
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,
                                    },
                                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formiklogin.touched.username &&
                                        formiklogin.errors.username
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formiklogin.touched.username &&
                                        formiklogin.errors.username
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,
                                    },
                                }}
                                InputLabelProps={{
                                  style: { color: "#5D7C90" },
                                }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <MailOutlined
                                        style={{ color: "#5D7C90" }}
                                      />
                                    </InputAdornment>
                                  ),
                                }}
                                type="email"
                                name="email"
                                classes={outlinedInputClasses}
                                placeholder="Enter your email"
                                {...formiklogin.getFieldProps("username")}
                                onChange={(event) =>
                                  formiklogin.setFieldValue(
                                    "username",
                                    event.target.value
                                  )
                                }
                                fullWidth
                              />
                              {formiklogin.touched.username &&
                              formiklogin.errors.username ? (
                                <div
                                  style={{
                                    color: "#ae0000",
                                    fontSize: "small",
                                  }}
                                >
                                  {formiklogin.errors.username}
                                </div>
                              ) : null}
                            </Stack>
                          </Grid>
                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <TextField
                                id="outlined-basic"
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
                                      border:
                                        formiklogin.touched.password &&
                                        formiklogin.errors.password
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formiklogin.touched.password &&
                                        formiklogin.errors.password
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,
                                      color: theme?.login?.quaternaryColor,
                                    },
                                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formiklogin.touched.password &&
                                        formiklogin.errors.password
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formiklogin.touched.password &&
                                        formiklogin.errors.password
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,
                                    },
                                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formiklogin.touched.password &&
                                        formiklogin.errors.password
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formiklogin.touched.password &&
                                        formiklogin.errors.password
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,
                                    },
                                }}
                                InputLabelProps={{
                                  style: { color: "#5D7C90" },
                                }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <LockIcon
                                        style={{
                                          color: "#5D7C90",
                                          marginLeft: "-4px",
                                          fontSize: "20px",
                                        }}
                                      />
                                    </InputAdornment>
                                  ),
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
                                          <EyeOutlined
                                            style={{ color: "#5D7C90" }}
                                          />
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
                                {...formiklogin.getFieldProps("password")}
                                onChange={(event) =>
                                  formiklogin.setFieldValue(
                                    "password",
                                    event.target.value
                                  )
                                }
                                classes={outlinedInputClasses}
                                placeholder="Enter your password"
                                onKeyDown={onKeyDown}
                              />
                              {formiklogin.touched.password &&
                              formiklogin.errors.password ? (
                                <div
                                  style={{
                                    color: "#ae0000",
                                    fontSize: "small",
                                  }}
                                >
                                  {formiklogin.errors.password}
                                </div>
                              ) : null}
                            </Stack>
                          </Grid>
                          <Grid item xs={12}>
                            {loggedin === "loggedin" ? (
                              <LoadingButton
                                disableElevation
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                loading
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                sx={{
                                  color: "#fff !important",
                                  backgroundColor: "#008BCD !important",
                                  textTransform: "none",
                                  fontFamily: "URW DIN REGULAR",
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                Sign In
                              </LoadingButton>
                            ) : (
                              <Button
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                sx={{
                                  color: "#fff",
                                  backgroundColor: mainColor,
                                  textTransform: "none",
                                  fontFamily: "URW DIN REGULAR",
                                }}
                                onClick={() => {
                                  console.log(
                                    "loginSubmit",
                                    username,
                                    password
                                  );
                                  loginSubmit();
                                  setLoggedin("loggedin");
                                }}
                              >
                                Sign In
                              </Button>
                            )}
                          </Grid>
                          <Grid item xs={12} sx={{ mt: -1 }}>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              spacing={2}
                            >
                              <Typography
                                variant="h6"
                                color={mainColor}
                                style={{
                                  textDecoration: "none",
                                  fontSize: 16,
                                  fontFamily: "URW DIN REGULAR",
                                  cursor: "pointer",
                                }}
                                onClick={switchToForgetPassword}
                              >
                                Forgot Password?
                              </Typography>
                              <Link
                                variant="h6"
                                // component={RouterLink}
                                onClick={() => {
                                  setShowContactPop(true);
                                }}
                                color={mainColor}
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
                        </>
                      )}
                      {active === "signup" && (
                        <>
                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <TextField
                                id="outlined-basic"
                                label="First name"
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

                                    color: theme?.login?.quaternaryColor,
                                  },
                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formik.touched.firstName &&
                                        formik.errors.firstName
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formik.touched.firstName &&
                                        formik.errors.firstName
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,

                                      borderRadius: "4px",
                                      color: theme?.login?.quaternaryColor,
                                    },
                                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formik.touched.firstName &&
                                        formik.errors.firstName
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formik.touched.firstName &&
                                        formik.errors.firstName
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,

                                      borderRadius: "4px",
                                    },
                                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formik.touched.firstName &&
                                        formik.errors.firstName
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formik.touched.firstName &&
                                        formik.errors.firstName
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,

                                      borderRadius: "4px",
                                    },
                                }}
                                InputLabelProps={{
                                  style: { color: "#5D7C90" },
                                }}
                                type="text"
                                name="first-name"
                                classes={outlinedInputClasses}
                                {...formik.getFieldProps("firstName")}
                                placeholder="First name"
                                fullWidth
                              />
                              {formik.touched.firstName &&
                              formik.errors.firstName ? (
                                <div
                                  style={{
                                    color: "#ae0000",
                                    fontSize: "small",
                                  }}
                                >
                                  {formik.errors.firstName}
                                </div>
                              ) : null}
                            </Stack>
                          </Grid>

                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <TextField
                                id="outlined-basic"
                                label="Last name"
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

                                    color: theme?.login?.quaternaryColor,
                                  },
                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formik.touched.lastName &&
                                        formik.errors.lastName
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formik.touched.lastName &&
                                        formik.errors.lastName
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,

                                      borderRadius: "4px",
                                      color: theme?.login?.quaternaryColor,
                                    },
                                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formik.touched.lastName &&
                                        formik.errors.lastName
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formik.touched.lastName &&
                                        formik.errors.lastName
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,

                                      borderRadius: "4px",
                                    },
                                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formik.touched.lastName &&
                                        formik.errors.lastName
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formik.touched.lastName &&
                                        formik.errors.lastName
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,

                                      borderRadius: "4px",
                                    },
                                }}
                                InputLabelProps={{
                                  style: { color: "#5D7C90" },
                                }}
                                type="text"
                                name="last-name"
                                classes={outlinedInputClasses}
                                placeholder="Last name"
                                {...formik.getFieldProps("lastName")}
                                onChange={(event) =>
                                  formik.setFieldValue(
                                    "lastName",
                                    event.target.value
                                  )
                                }
                                fullWidth
                              />
                              {formik.touched.lastName &&
                              formik.errors.lastName ? (
                                <div
                                  style={{
                                    color: "#ae0000",
                                    fontSize: "small",
                                  }}
                                >
                                  {formik.errors.lastName}
                                </div>
                              ) : null}
                            </Stack>
                          </Grid>

                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <TextField
                                id="outlined-basic"
                                label="Email"
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
                                    color: theme?.login?.quaternaryColor,
                                    borderRadius: "0px !important",
                                  },
                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formik.touched.email &&
                                        formik.errors.email
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formik.touched.email &&
                                        formik.errors.email
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,

                                      color: theme?.login?.quaternaryColor,
                                    },
                                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formik.touched.email &&
                                        formik.errors.email
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formik.touched.email &&
                                        formik.errors.email
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,
                                    },
                                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formik.touched.email &&
                                        formik.errors.email
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formik.touched.email &&
                                        formik.errors.email
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,
                                    },
                                }}
                                InputLabelProps={{
                                  style: { color: "#5D7C90" },
                                }}
                                type="email"
                                name="email"
                                classes={outlinedInputClasses}
                                {...formik.getFieldProps("email")}
                                placeholder="Enter your email"
                                onChange={(event) => {
                                  formik.setFieldValue(
                                    "email",
                                    event.target.value
                                  );
                                  emailDbCheck(event.target.value);
                                }}
                                fullWidth
                              />
                              {emailDbExists ? (
                                <div
                                  style={{
                                    color: "#ae0000",
                                    fontSize: "small",
                                  }}
                                >
                                  Email id already exists.
                                </div>
                              ) : formik.touched.email &&
                                formik.errors.email ? (
                                <div
                                  style={{
                                    color: "#ae0000",
                                    fontSize: "small",
                                  }}
                                >
                                  {formik.errors.email}
                                </div>
                              ) : null}
                            </Stack>
                          </Grid>
                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <TextField
                                id="outlined-basic"
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
                                    color: theme?.login?.quaternaryColor,
                                  },
                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formik.touched.registerpassword &&
                                        formik.errors.registerpassword
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formik.touched.registerpassword &&
                                        formik.errors.registerpassword
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,

                                      borderRadius: "4px",
                                      color: theme?.login?.quaternaryColor,
                                    },
                                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formik.touched.registerpassword &&
                                        formik.errors.registerpassword
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formik.touched.registerpassword &&
                                        formik.errors.registerpassword
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,

                                      borderRadius: "4px",
                                    },
                                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formik.touched.registerpassword &&
                                        formik.errors.registerpassword
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formik.touched.registerpassword &&
                                        formik.errors.registerpassword
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,

                                      borderRadius: "4px",
                                    },
                                }}
                                InputLabelProps={{
                                  style: { color: "#5D7C90" },
                                }}
                                type={showPassword2 ? "text" : "password"}
                                name="password"
                                classes={outlinedInputClasses}
                                {...formik.getFieldProps("registerpassword")}
                                onChange={(event) => {
                                  formik.setFieldValue(
                                    "registerpassword",
                                    event.target.value
                                  );
                                  setRegisterPassword(event.target.value);
                                }}
                                InputProps={{
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
                                          <EyeOutlined
                                            style={{ color: "#5D7C90" }}
                                          />
                                        ) : (
                                          <EyeInvisibleOutlined
                                            style={{ color: "#5D7C90" }}
                                          />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                placeholder="Enter your password"
                              />
                              {formik.touched.registerpassword &&
                              formik.errors.registerpassword ? (
                                <div
                                  style={{
                                    color: "#ae0000",
                                    fontSize: "small",
                                  }}
                                >
                                  {formik.errors.registerpassword}
                                </div>
                              ) : null}
                            </Stack>
                          </Grid>

                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <TextField
                                id="outlined-basic"
                                label="Confirm password"
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
                                    color: theme?.login?.quaternaryColor,
                                  },
                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formik.touched.cregisterpassword &&
                                        formik.errors.cregisterpassword
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formik.touched.cregisterpassword &&
                                        formik.errors.cregisterpassword
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,

                                      borderRadius: "4px",
                                      color: theme?.login?.quaternaryColor,
                                    },
                                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formik.touched.cregisterpassword &&
                                        formik.errors.cregisterpassword
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formik.touched.cregisterpassword &&
                                        formik.errors.cregisterpassword
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,

                                      borderRadius: "4px",
                                    },
                                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      border:
                                        formik.touched.cregisterpassword &&
                                        formik.errors.cregisterpassword
                                          ? "1px solid"
                                          : "2px solid",
                                      borderColor:
                                        formik.touched.cregisterpassword &&
                                        formik.errors.cregisterpassword
                                          ? "#ae0000"
                                          : theme?.login?.secondaryColor,

                                      borderRadius: "4px",
                                    },
                                }}
                                InputLabelProps={{
                                  style: { color: "#5D7C90" },
                                }}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                classes={outlinedInputClasses}
                                {...formik.getFieldProps("cregisterpassword")}
                                onChange={(event) => {
                                  formik.setFieldValue(
                                    "cregisterpassword",
                                    event.target.value
                                  );
                                  setCPassword(event.target.value);
                                  setIsCPasswordDirty(true);
                                }}
                                InputProps={{
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
                                          <EyeOutlined
                                            style={{ color: "#5D7C90" }}
                                          />
                                        ) : (
                                          <EyeInvisibleOutlined
                                            style={{ color: "#5D7C90" }}
                                          />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                placeholder="Re-inter your password"
                              />
                              {formik.touched.cregisterpassword &&
                              formik.errors.cregisterpassword ? (
                                <div
                                  style={{
                                    color: "#ae0000",
                                    fontSize: "small",
                                  }}
                                >
                                  {formik.errors.cregisterpassword}
                                </div>
                              ) : null}
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
                            {buttonLoader ? (
                              <Button
                                disableElevation
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                sx={{
                                  color: "#fff",
                                  backgroundColor: mainColor,
                                  textTransform: "none",
                                  fontFamily: "URW DIN REGULAR",
                                }}
                              >
                                <Box sx={{ display: "flex" }}>
                                  <CircularProgress
                                    size={25}
                                    style={{ color: "white" }}
                                  />
                                </Box>
                              </Button>
                            ) : (
                              <Button
                                disabled={
                                  formik.errors.firstName == null &&
                                  formik.errors.cregisterpassword == null &&
                                  formik.errors.lastName == null &&
                                  formik.errors.email == null &&
                                  !(showErrorMessage && isCPasswordDirty) &&
                                  !emailDbExists
                                    ? false
                                    : true
                                }
                                disableElevation
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                sx={{
                                  color: "#fff",
                                  backgroundColor: mainColor,
                                  textTransform: "none",
                                  fontFamily: "URW DIN REGULAR",
                                  "&:disabled": {
                                    opacity: 0.4,
                                    pointerEvents: "none",
                                    backgroundColor: mainColor,
                                    color: "#fff",
                                  },
                                }}
                                onClick={() => {
                                  registerSubmit();
                                }}
                              >
                                Sign Up
                              </Button>
                            )}
                          </Grid>
                        </>
                      )}
                      {active === "forgetpassword" && (
                        <>
                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <TextField
                                id="outlined-basic"
                                label="Email"
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

                                    color: theme?.login?.quaternaryColor,
                                  },
                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border: "2px solid",

                                      borderColor: theme?.login?.secondaryColor,

                                      borderRadius: "4px",
                                      color: theme?.login?.quaternaryColor,
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
                                type="email"
                                name="email"
                                classes={outlinedInputClasses}
                                placeholder="Enter your email"
                                onChange={(event) => {
                                  setForgotpassword(event.target.value);
                                }}
                                fullWidth
                              />
                            </Stack>
                          </Grid>

                          <Grid item xs={12}>
                            <Button
                              disableElevation
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                              sx={{
                                color: "#fff",
                                backgroundColor: mainColor,
                                textTransform: "none",
                                fontFamily: "URW DIN REGULAR",
                              }}
                              onClick={() => {
                                forgetSubmit();
                                // switchToCheckMail();
                              }}
                            >
                              Submit
                            </Button>
                          </Grid>
                        </>
                      )}
                      {active === "signup" && (
                        <Grid item xs={12}>
                          <Stack style={{ textAlign: "center" }}>
                            <Link
                              variant="h6"
                              onClick={() => {
                                setShowContactPop(true);
                              }}
                              color={mainColor}
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
                      )}
                      {active === "forgetpassword" && (
                        <Grid item xs={12}>
                          <Stack style={{ textAlign: "center" }}>
                            <Link
                              variant="h6"
                              onClick={() => {
                                setShowContactPop(true);
                              }}
                              color={mainColor}
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
                      )}

                      {active === "checkmail" && (
                        <>
                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <Typography
                                variant="h6"
                                style={{
                                  fontSize: 20,
                                  color: tertiaryColor,
                                  fontFamily: "URW DIN",
                                }}
                              >
                                Hi, Check Your Mail
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <p
                                style={{
                                  fontSize: "16px",
                                  lineHeight: "22px",
                                  color: theme?.profile?.mainColor,
                                  fontFamily: "URW DIN REGULAR",
                                }}
                              >
                                We have sent a password recover instructions to
                                your email.
                              </p>
                            </Stack>
                          </Grid>

                          <Grid item xs={12}>
                            <Button
                              disableElevation
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                              sx={{
                                color: "#fff",
                                backgroundColor: mainColor,
                                textTransform: "none",
                                fontFamily: "URW DIN REGULAR",
                              }}
                              // onClick={switchToResetPassword}
                              onClick={() => {window.location.href = "https://www.gmail.com"}}

                            >
                              Go to Mail
                            </Button>
                          </Grid>
                          <Grid item xs={12}>
                            <Stack style={{ textAlign: "center" }}>
                              <Link
                                variant="h6"
                                onClick={() => {
                                  setShowContactPop(true);
                                }}
                                color={mainColor}
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
                        </>
                      )}

                      {active === "verification" && (
                        <>
                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <Typography
                                variant="h6"
                                style={{
                                  fontSize: 20,
                                  color: tertiaryColor,
                                  fontFamily: "URW DIN",
                                }}
                              >
                                Enter Verification Code
                              </Typography>
                              <p
                                style={{
                                  fontSize: "16px",
                                  lineHeight: "22px",
                                  color: theme?.profile?.mainColor,
                                  fontFamily: "URW DIN REGULAR",
                                }}
                              >
                                We send you on mail.
                              </p>
                            </Stack>
                          </Grid>
                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <p
                                style={{
                                  fontSize: "16px",
                                  lineHeight: "22px",
                                  color: tertiaryColor,
                                  fontFamily: "URW DIN REGULAR",
                                  marginBottom: "-6px",
                                }}
                              >
                                We've send you code on josh.****@fox.com
                              </p>
                            </Stack>
                          </Grid>
                          <Grid item xs={2.5}>
                            <Stack spacing={1}>
                              <OutlinedInput
                                sx={{
                                  "& .MuiOutlinedInput-input": {
                                    p: "9.5px 12px",
                                    fontFamily: "URW DIN REGULAR",
                                    color: theme?.login?.quaternaryColor,
                                  },
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    border: "2px solid",
                                    borderColor: theme?.login?.secondaryColor,

                                    borderRadius: "4px",
                                  },
                                  "&:hover .MuiOutlinedInput-notchedOutline": {
                                    border: "2px solid",

                                    borderColor: theme?.login?.secondaryColor,

                                    borderRadius: "4px",
                                  },
                                }}
                                type="text"
                                classes={outlinedInputClasses}
                                fullWidth
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={2.5}>
                            <Stack spacing={1}>
                              <TextField
                                id="outlined-basic"
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
                                    fontSize: "15px",

                                    color: theme?.login?.quaternaryColor,
                                  },
                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border: "2px solid",

                                      borderColor: theme?.login?.secondaryColor,

                                      borderRadius: "4px",
                                      color: theme?.login?.quaternaryColor,
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
                                type="text"
                                classes={outlinedInputClasses}
                                fullWidth
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={2.5}>
                            <Stack spacing={1}>
                              <TextField
                                id="outlined-basic"
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
                                    fontSize: "15px",

                                    color: theme?.login?.quaternaryColor,
                                  },
                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border: "2px solid",

                                      borderColor: theme?.login?.secondaryColor,

                                      borderRadius: "4px",
                                      color: theme?.login?.quaternaryColor,
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
                                type="text"
                                classes={outlinedInputClasses}
                                fullWidth
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={2.5}>
                            <Stack spacing={1}>
                              <TextField
                                id="outlined-basic"
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
                                    fontSize: "15px",

                                    color: theme?.login?.quaternaryColor,
                                  },
                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border: "2px solid",

                                      borderColor: theme?.login?.secondaryColor,

                                      borderRadius: "4px",
                                      color: theme?.login?.quaternaryColor,
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
                                type="text"
                                classes={outlinedInputClasses}
                                fullWidth
                              />
                            </Stack>
                          </Grid>

                          <Grid item xs={12}>
                            <Button
                              disableElevation
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                              sx={{
                                color: "#fff",
                                backgroundColor: mainColor,
                                textTransform: "none",
                                fontFamily: "URW DIN REGULAR",
                              }}
                            >
                              Continue
                            </Button>
                          </Grid>
                          <Grid item xs={12} style={{ marginTop: "-12px" }}>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="baseline"
                            >
                              <p
                                style={{
                                  fontSize: "16px",
                                  lineHeight: "22px",
                                  color: theme?.profile?.mainColor,
                                  fontFamily: "URW DIN REGULAR",
                                }}
                              >
                                Did not receive the email?Check your spam
                                filter,
                              </p>
                              <Typography
                                // component={Link}
                                sx={{
                                  textDecoration: "none",
                                  cursor: "pointer",
                                }}
                                color={mainColor}
                                style={{ fontFamily: "URW DIN REGULAR" }}
                              >
                                Resend code
                              </Typography>
                            </Stack>
                          </Grid>

                          <Grid item xs={12}>
                            <Stack style={{ textAlign: "center" }}>
                              <Link
                                variant="h6"
                                onClick={() => {
                                  setShowContactPop(true);
                                }}
                                color={mainColor}
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
                        </>
                      )}

                      {active === "resetpassword" && (
                        <>
                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <Typography
                                variant="h6"
                                style={{
                                  fontSize: 20,
                                  color: tertiaryColor,
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
                                id="outlined-basic"
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

                                    color: theme?.login?.quaternaryColor,
                                  },
                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border: "2px solid",

                                      borderColor: theme?.login?.secondaryColor,

                                      borderRadius: "4px",
                                      color: theme?.login?.quaternaryColor,
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
                                type={showPassword2 ? "text" : "password"}
                                name="password"
                                classes={outlinedInputClasses}
                                onChange={(event) => {
                                  setResetPassword(event.target.value);
                                }}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword2}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                      color="secondary"
                                    >
                                      {showPassword2 ? (
                                        <EyeOutlined
                                          style={{ color: "#5D7C90" }}
                                        />
                                      ) : (
                                        <EyeInvisibleOutlined
                                          style={{ color: "#5D7C90" }}
                                        />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                placeholder="Enter your password"
                              />
                            </Stack>
                          </Grid>

                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <TextField
                                id="outlined-basic"
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

                                    color: theme?.login?.quaternaryColor,
                                  },
                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                    {
                                      border: "2px solid",

                                      borderColor: theme?.login?.secondaryColor,

                                      borderRadius: "4px",
                                      color: theme?.login?.quaternaryColor,
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
                                type={showPassword ? "text" : "password"}
                                name="password"
                                classes={outlinedInputClasses}
                                onChange={(event) => {
                                  setCResetPassword(event.target.value);
                                  setIsCPasswordDirty(true);
                                }}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                      color="secondary"
                                    >
                                      {showPassword ? (
                                        <EyeOutlined
                                          style={{ color: "#5D7C90" }}
                                        />
                                      ) : (
                                        <EyeInvisibleOutlined
                                          style={{ color: "#5D7C90" }}
                                        />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                }
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
                              sx={{
                                color: "#fff",
                                backgroundColor: mainColor,
                                textTransform: "none",
                                fontFamily: "URW DIN REGULAR",
                              }}
                            >
                              Reset Password
                            </Button>
                          </Grid>

                          <Grid item xs={12}>
                            <Stack style={{ textAlign: "center" }}>
                              <Link
                                variant="h6"
                                onClick={() => {
                                  setShowContactPop(true);
                                }}
                                color={mainColor}
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
                        </>
                      )}
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </div>
      </AccountContext.Provider>
      <Snackbar
        open={openToastRegister}
        autoHideDuration={4000}
        onClose={handleCloseToastRegister}
      >
        <Alert
          onClose={handleCloseToastRegister}
          severity="info"
          sx={{ width: "100%" }}
        >
          User Registered Successfully
        </Alert>
      </Snackbar>

      <Toast
        openToast={openToast}
        setOpenToast={setOpenToast}
        message={loginToastMessage}
      />
      <Toast
        openToast={openToastforgot}
        setOpenToast={setOpenToastforgot}
        message="User does not exist with this Email Id"
        type="error"
      />

      <Toast
        openToast={openUpdateToast}
        updateStatus={updateStatus}
        setOpenToast={setOpenUpdateToast}
        message={toastMessage}
      />

      {showContactPop && <ContactUs setShowContactPop={setShowContactPop} />}
    </>
  );
};
export default LoginForm;
