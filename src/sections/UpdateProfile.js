import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Divider,
  Stack,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import CountryCode from "./CountryCode";
import TogglePassword from "./TogglePassword";
import { useSelector } from "react-redux";
import { AxiosLocal } from "../utilities/axiosUtils.ts";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { makeStyles } from "@material-ui/core/styles";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useOutlinedInputStyles = makeStyles((theme) => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#012A50",
    },
    "&:hover $notchedOutline": {
      borderColor: "#012A50 !important",
    },
    "&$focused $notchedOutline": {
      borderColor: "green",
    },
  },
  focused: {},
  notchedOutline: {},
}));

const UpdateProfile = (props) => {
  const theme = useSelector((state) => state.theme.themeData);
  const outlinedInputClasses = useOutlinedInputStyles();

  const [openToast, setOpenToast] = React.useState(false);

  const handleClickToast = () => {
    setOpenToast(true);
  };

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };
  const userArr = props.user;
  console.log(userArr, "userArr");
  const [firstName, setFirstName] = useState(userArr.first_name);
  const [lastName, setLastName] = useState(userArr.last_name);
  const [description, setDescription] = useState(userArr.description);
  const [city, setCity] = useState(userArr.city);
  const [address, setAddress] = useState(userArr.address);
  const [email, setEmail] = useState(userArr.email);
  const [phone, setPhone] = useState(userArr.phone);
  const [country, setCountry] = useState(userArr.country);
  const [changedval, setChangedval] = useState({});
  const [registerPassword, setRegisterPassword] = useState();
  const [cPassword, setCPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword3 = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setChangedval({ ...changedval, confirm_password: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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

  const handleChange = (event) => {
    setFirstName(event.target.value);

    console.log("value is:", event.target.value);
  };
  console.log(props, "handleProfileClose");
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  console.log(changedval, "changedval");
  const updateSubmit = () => {
    const user_id = localStorage.getObject("id");
    AxiosLocal.post(`profile/edit/${user_id}/`, changedval)
      .then(function (response) {
        console.log(response.data, "responseuseredit");
        localStorage.setObject("username", response.data.name);
        localStorage.setObject("last_name", response.data.last_name);

        if (response.data.status == "Success") {
          handleClickToast();
          setMessage(response.data.message);
        } else {
          handleClickToast();
          setMessage(response.data.message);
        }

        // user set on redux
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div
        style={{
          alignItems: "center",
          // background: 'rgba(3, 46, 87, 0.4)',
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
      >
        <Box
          sx={{
            background: theme.login.primaryColor,
            borderRadius: "4px",
            border: "1px solid",
            borderColor: theme?.login?.secondaryColor,
          }}
          className="update-container"
        >
          <Typography
            variant="h5"
            style={{
              color: theme?.spaces?.secondaryColor,
              fontWeight: "700",
              textAlign: "center",
              padding: "23px 0px",
            }}
          >
            Settings
          </Typography>

          {/* navbar */}

          <div
            style={{
              display: "flex",
              backgroundColor: theme?.waiting?.primaryColor,
              justifyContent: "space-evenly",
            }}
          >
            <Button
              sx={{
                color: "#88A1AB !important",
                display: "block",
                textTransform: "none",
                fontSize: "14px",
                padding: "10px 43px !important",
                backgroundColor: "transparent",
                borderRadius: "0px",
              }}
              className={toggleState === 1 ? "active" : ""}
              onClick={() => toggleTab(1)}
            >
              Profile
            </Button>

            <Button
              sx={{
                color: "#88A1AB !important",
                display: "block",
                textTransform: "none",
                fontSize: "14px",
                padding: "10px 43px !important",
                backgroundColor: "transparent",
                borderRadius: "0px",
              }}
              className={toggleState === 2 ? "active" : ""}
              onClick={() => toggleTab(2)}
            >
              Personal details
            </Button>

            <Button
              sx={{
                color: "#88A1AB !important",
                display: "block",
                textTransform: "none",
                fontSize: "14px",
                padding: "10px 43px !important",
                backgroundColor: "transparent",
                borderRadius: "0px",
              }}
              className={toggleState === 3 ? "active" : ""}
              onClick={() => toggleTab(3)}
            >
              Security
            </Button>
          </div>

          {/* profile */}
          <div
            className={toggleState === 1 ? "content active-content" : "content"}
          >
            <Stack
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "30px",
                position: "relative",
              }}
            >
              <img
                alt=""
                src="/assets/images/person.svg"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  backgroundColor: "#264E6E",
                  borderRadius: "50%",
                  padding: "5px",
                  position: "absolute",
                  right: "39%",
                  bottom: "18%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  alt=""
                  src="/assets/icons/upload.svg"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </Stack>
            <Stack spacing={1} sx={{ margin: "0px 44px 20px 44px" }}>
              <InputLabel
                htmlFor="first-name"
                style={{
                  color: theme?.spaces?.mainColor,
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                First Name
              </InputLabel>

              <TextField
                id="first-name"
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

                    color: theme?.profile?.primaryColor,
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid",

                    borderColor: theme?.login?.secondaryColor,

                    borderRadius: "4px",
                    color: theme?.profile?.primaryColor,
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    border: "1px solid",

                    borderColor: theme?.login?.secondaryColor,

                    borderRadius: "4px",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: "1px solid",

                    borderColor: theme?.login?.secondaryColor,

                    borderRadius: "4px",
                  },
                }}
                InputLabelProps={{
                  style: { color: "#5D7C90" },
                }}
                type="text"
                classes={outlinedInputClasses}
                // placeholder="Enter your email"

                fullWidth
                name="text"
                placeholder="First Name"
                value={firstName}
                onChange={(event) => {
                  setChangedval({
                    ...changedval,
                    first_name: event.target.value,
                  });
                  setFirstName(event.target.value);
                }}
              />
              {/* <OutlinedInput
            sx={{color: theme?.profile?.primaryColor, border:'1px solid',borderColor:theme?.login?.secondaryColor, fontSize:'14px', fontWeight:'400', height: '40px'}}
            type="text"
            name="text"
            placeholder="First Name"
            value={firstName}
            
            onChange={(event)=>{
                setChangedval({...changedval, first_name:event.target.value});
                setFirstName(event.target.value)
              }}
            
            
            fullWidth
            
            /> */}
            </Stack>

            <Stack spacing={1} sx={{ margin: "0px 44px 20px 44px" }}>
              <InputLabel
                htmlFor="last-name"
                style={{
                  color: theme?.spaces?.mainColor,
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                Last Name
              </InputLabel>
              <TextField
                id="last-name"
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

                    color: theme?.profile?.primaryColor,
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid",

                    borderColor: theme?.login?.secondaryColor,

                    borderRadius: "4px",
                    color: theme?.profile?.primaryColor,
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    border: "1px solid",

                    borderColor: theme?.login?.secondaryColor,

                    borderRadius: "4px",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: "1px solid",

                    borderColor: theme?.login?.secondaryColor,

                    borderRadius: "4px",
                  },
                }}
                InputLabelProps={{
                  style: { color: "#5D7C90" },
                }}
                type="text"
                name="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => {
                  setChangedval({
                    ...changedval,
                    last_name: event.target.value,
                  });

                  setLastName(event.target.value);
                }}
                fullWidth
              />
              {/* <OutlinedInput
            sx={{color: theme?.profile?.primaryColor, border:'1px solid',borderColor:theme?.login?.secondaryColor, fontSize:'14px', fontWeight:'400', height: '40px'}}
            type="text"
            name="text"
            placeholder="Last Name"
            value={lastName}
            
            onChange={(event)=>{
              setChangedval({...changedval, last_name:event.target.value});

              setLastName(event.target.value)
              }}
            
            fullWidth
            
            /> */}
            </Stack>

            <Stack spacing={1} sx={{ margin: "0px 44px 20px 44px" }}>
              <InputLabel
                htmlFor="about-me"
                style={{
                  color: theme?.spaces?.mainColor,
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                About me
              </InputLabel>

              <TextField
                id="about-me"
                label=""
                variant="outlined"
                sx={{
                  "& .MuiInputLabel-root": {
                    fontSize: "14px",
                    height: "130px",
                    marginTop: "-5px",
                  },
                  "& .MuiOutlinedInput-root": {
                    fontSize: "14px",
                    height: "130px",
                    marginTop: "1px",
                  },

                  "& .MuiOutlinedInput-input": {
                    fontFamily: "URW DIN REGULAR",
                    fontSize: "14px",

                    color: theme?.profile?.primaryColor,
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid",

                    borderColor: theme?.login?.secondaryColor,

                    borderRadius: "4px",
                    color: theme?.profile?.primaryColor,
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    border: "1px solid",

                    borderColor: theme?.login?.secondaryColor,

                    borderRadius: "4px",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: "1px solid",

                    borderColor: theme?.login?.secondaryColor,

                    borderRadius: "4px",
                  },
                }}
                InputLabelProps={{
                  style: { color: "#5D7C90" },
                }}
                type="text"
                name="text"
                placeholder="about me"
                value={description}
                onChange={(event) => {
                  setChangedval({
                    ...changedval,
                    description: event.target.value,
                  });

                  setDescription(event.target.value);
                }}
                // value={'Voluptatibus non sunt ut qui ex sunt illum. Sed quos ipum exercitationem neque. Optio a non. Saepe aut est quos nulla atque et in minus'}
                rows={5}
                multiline
                fullWidth
              />
              {/* <OutlinedInput
            sx={{color: theme?.profile?.primaryColor, border:'1px solid', borderColor:theme?.login?.secondaryColor, fontSize:'14px', fontWeight:'400'}}
            type="text"
            name="text"
            placeholder="about me"
            value={description}
            onChange={(event)=>{
              setChangedval({...changedval, description:event.target.value});

              setDescription(event.target.value)
              }}
            // value={'Voluptatibus non sunt ut qui ex sunt illum. Sed quos ipum exercitationem neque. Optio a non. Saepe aut est quos nulla atque et in minus'}
            multiline
  rows={5}

            fullWidth
            
            /> */}
            </Stack>
          </div>
          {/* personal details */}
          <div
            className={toggleState === 2 ? "content active-content" : "content"}
          >
            {/* <Stack spacing={1} sx={{margin:'39px 44px 20px 44px'}}>
            <InputLabel htmlFor="first-name" style={{color:theme?.spaces?.mainColor, fontSize:'14px', fontWeight:'400'}}>Email</InputLabel>
            <TextField id="outlined-basic" label="" variant="outlined"
        disabled={true}
            
            sx={{
                      '& .MuiInputLabel-root': { fontSize: '14px' ,height:'42px', marginTop:'-5px'},
                      '& .MuiOutlinedInput-root': { fontSize: '14px', height:'42px', marginTop:'1px' },
                   
                      '& .MuiOutlinedInput-input': {
                        fontFamily:'URW DIN REGULAR',
                        fontSize:'14px',

                        color: theme?.profile?.primaryColor
                       
                      },
         "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border:'1px solid',
  
          borderColor:theme?.login?.secondaryColor,
  
          borderRadius:'4px',
          color: theme?.profile?.primaryColor



        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border:'1px solid',
  
          borderColor:theme?.login?.secondaryColor,

          borderRadius:'4px'
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border:'1px solid',
  
          borderColor:theme?.login?.secondaryColor,

          borderRadius:'4px'
        },
        "& .MuiInputBase-root.Mui-disabled": {
          "& > fieldset": {
            border:'2px solid',
  
            borderColor:theme?.login?.secondaryColor,
  
            borderRadius:'4px',

          },
          '& .MuiOutlinedInput-input': {
          

            color: 'white !important'
           
          },
         
        
      }

    
     
        }}
        InputLabelProps={{
          style: { color: '#5D7C90' },
         
        }}
      

        type="email"
            name="text"
            placeholder="Email"
            value={email}
           
            
            onChange={(event)=>{
              // setChangedval({...changedval, email:event.target.value});

              setEmail(event.target.value)
              }}
            fullWidth
/> */}
            {/* <OutlinedInput
            disabled={true}

            id="Email"
            sx={{color: theme?.profile?.primaryColor, border:'1px solid',borderColor:theme?.login?.secondaryColor, fontSize:'14px', fontWeight:'400', height: '40px',
            "& .MuiInputBase-root.Mui-disabled": {
              "& > fieldset": {
                  borderColor: "white"
              }
          }}}
            type="email"
            name="text"
            placeholder="Email"
            value={email}
           
            
            onChange={(event)=>{
              // setChangedval({...changedval, email:event.target.value});

              setEmail(event.target.value)
              }}
            fullWidth
            
            /> */}
            {/* </Stack> */}
            <Stack
              spacing={1}
              sx={{ margin: "39px 44px 20px 44px" }}
            // sx={{margin:'0px 44px 20px 44px'}}
            >
              <InputLabel
                htmlFor="phone"
                style={{
                  color: theme?.spaces?.mainColor,
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                Phone Number
              </InputLabel>
              <div style={{ display: "flex" }}>
                <CountryCode />
                <TextField
                  id="phone"
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

                      color: theme?.profile?.primaryColor,
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid",

                      borderColor: theme?.login?.secondaryColor,

                      borderRadius: "4px",
                      color: theme?.profile?.primaryColor,
                    },
                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid",

                      borderColor: theme?.login?.secondaryColor,

                      borderRadius: "4px",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid",

                      borderColor: theme?.login?.secondaryColor,

                      borderRadius: "4px",
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "#5D7C90" },
                  }}
                  type="text"
                  name="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(event) => {
                    setChangedval({ ...changedval, phone: event.target.value });

                    setPhone(event.target.value);
                  }}
                  fullWidth
                  style={{ marginLeft: "10px" }}
                />
              </div>
            </Stack>
            <div style={{ display: "flex" }}>
              <Stack
                sx={{ margin: "0px 22px 20px 44px" }}
                style={{ width: "50%" }}
              >
                <InputLabel
                  htmlFor="Country"
                  style={{
                    color: theme?.spaces?.mainColor,
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Country
                </InputLabel>
                <TextField
                  id="Country"
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

                      color: theme?.profile?.primaryColor,
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid",

                      borderColor: theme?.login?.secondaryColor,

                      borderRadius: "4px",
                      color: theme?.profile?.primaryColor,
                    },
                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid",

                      borderColor: theme?.login?.secondaryColor,

                      borderRadius: "4px",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid",

                      borderColor: theme?.login?.secondaryColor,

                      borderRadius: "4px",
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "#5D7C90" },
                  }}
                  type="text"
                  name="text"
                  placeholder="Country"
                  value={country}
                  onChange={(event) => {
                    setChangedval({
                      ...changedval,
                      country: event.target.value,
                    });
                    setCountry(event.target.value);
                  }}
                />
              </Stack>

              <Stack
                sx={{ margin: "0px 44px 20px 0px" }}
                style={{ width: "50%" }}
              >
                <InputLabel
                  htmlFor="Country"
                  style={{
                    color: theme?.spaces?.mainColor,
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  City
                </InputLabel>
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
                      fontSize: "14px",

                      color: theme?.profile?.primaryColor,
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid",

                      borderColor: theme?.login?.secondaryColor,

                      borderRadius: "4px",
                      color: theme?.profile?.primaryColor,
                    },
                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid",

                      borderColor: theme?.login?.secondaryColor,

                      borderRadius: "4px",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid",

                      borderColor: theme?.login?.secondaryColor,

                      borderRadius: "4px",
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "#5D7C90" },
                  }}
                  type="text"
                  name="text"
                  placeholder="City"
                  value={city}
                  onChange={(event) => {
                    setChangedval({ ...changedval, city: event.target.value });

                    setCity(event.target.value);
                  }}
                />
              </Stack>
            </div>
            <Stack spacing={1} sx={{ margin: "0px 44px 174px 44px" }}>
              <InputLabel
                style={{
                  color: theme?.spaces?.mainColor,
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                Address
              </InputLabel>
              <div style={{ display: "flex" }}>
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
                      fontSize: "14px",

                      color: theme?.profile?.primaryColor,
                    },
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid",

                      borderColor: theme?.login?.secondaryColor,

                      borderRadius: "4px",
                      color: theme?.profile?.primaryColor,
                    },
                    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid",

                      borderColor: theme?.login?.secondaryColor,

                      borderRadius: "4px",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid",

                      borderColor: theme?.login?.secondaryColor,

                      borderRadius: "4px",
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "#5D7C90" },
                  }}
                  type="text"
                  name="text"
                  placeholder="Address"
                  value={address}
                  onChange={(event) => {
                    setChangedval({
                      ...changedval,
                      address: event.target.value,
                    });

                    setAddress(event.target.value);
                  }}
                  fullWidth
                />
              </div>
            </Stack>
          </div>

          {/* security */}
          <div
            className={toggleState === 3 ? "content active-content" : "content"}
          >
            <Stack spacing={1} sx={{ margin: "39px 44px 20px 44px" }}>
              <InputLabel
                htmlFor="current_password"
                style={{
                  color: theme?.spaces?.mainColor,
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                Current password
              </InputLabel>
              <TextField
                id="current_password"
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

                    color: theme?.profile?.primaryColor,
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid",

                    borderColor: theme?.login?.secondaryColor,

                    borderRadius: "4px",
                    color: theme?.profile?.primaryColor,
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    border: "1px solid",

                    borderColor: theme?.login?.secondaryColor,

                    borderRadius: "4px",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: "1px solid",

                    borderColor: theme?.login?.secondaryColor,

                    borderRadius: "4px",
                  },
                }}
                InputLabelProps={{
                  style: { color: "#5D7C90" },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword3}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <EyeOutlined
                            style={{ color: theme?.spaces?.mainColor }}
                          />
                        ) : (
                          <EyeInvisibleOutlined
                            style={{ color: theme?.spaces?.mainColor }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type={values.showPassword ? "text" : "password"}
                onChange={handlePasswordChange("password")}
                value={values.password}
                classes={outlinedInputClasses}
                placeholder="Enter your current password"
                fullWidth
              />
              {/* <OutlinedInput
        type={values.showPassword ? "text" : "password"}
        sx={{color: theme?.spaces?.mainColor, border:'1px solid',borderColor:theme?.login?.secondaryColor, fontSize:'14px', fontWeight:'400', height: '40px'}}
        onChange={handlePasswordChange("password")}
        value={values.password}
        classes={outlinedInputClasses}

        fullWidth
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword3}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <Visibility style={{fill:theme?.spaces?.mainColor}}/> : <VisibilityOff style={{fill:theme?.spaces?.mainColor}}/>}
            </IconButton>
          </InputAdornment>
        }
      /> */}
            </Stack>
            <Stack spacing={1} sx={{ margin: "20px 44px 20px 44px" }}>
              <InputLabel
                htmlFor="new_password"
                style={{
                  color: theme?.spaces?.mainColor,
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                New password
              </InputLabel>

              <TextField
                id="new_password"
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

                    color: theme?.profile?.primaryColor,
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid",

                    borderColor: theme?.login?.secondaryColor,

                    borderRadius: "4px",
                    color: theme?.profile?.primaryColor,
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    border: "1px solid",

                    borderColor: theme?.login?.secondaryColor,

                    borderRadius: "4px",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: "1px solid",

                    borderColor: theme?.login?.secondaryColor,

                    borderRadius: "4px",
                  },
                }}
                InputLabelProps={{
                  style: { color: "#5D7C90" },
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
                          <EyeOutlined style={{ color: "#5D7C90" }} />
                        ) : (
                          <EyeInvisibleOutlined style={{ color: "#5D7C90" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type={showPassword2 ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                // value={registerpassword}
                onChange={(event) => {
                  setRegisterPassword(event.target.value);
                }}
              />
            </Stack>

            <Stack spacing={1} sx={{ margin: "20px 44px 255px 44px" }}>
              <InputLabel
                htmlFor="password"
                style={{
                  color: theme?.spaces?.mainColor,
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                Confirm password
              </InputLabel>
              <TextField
                id="password"
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

                    color: theme?.profile?.primaryColor,
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid",

                    borderColor:
                      showErrorMessage && isCPasswordDirty
                        ? "#ae0000"
                        : theme?.login?.secondaryColor,

                    borderRadius: "4px",
                    color: theme?.profile?.primaryColor,
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    border: "1px solid",

                    borderColor:
                      showErrorMessage && isCPasswordDirty
                        ? "#ae0000"
                        : theme?.login?.secondaryColor,

                    borderRadius: "4px",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: "1px solid",

                    borderColor:
                      showErrorMessage && isCPasswordDirty
                        ? "#ae0000"
                        : theme?.login?.secondaryColor,

                    borderRadius: "4px",
                  },
                }}
                InputLabelProps={{
                  style: { color: "#5D7C90" },
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
                          <EyeOutlined style={{ color: "#5D7C90" }} />
                        ) : (
                          <EyeInvisibleOutlined style={{ color: "#5D7C90" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder="Re-Inter your password"
                fullWidth
                type={showPassword ? "text" : "password"}
                name="password"
                classes={outlinedInputClasses}
                onChange={(event) => {
                  setChangedval({
                    ...changedval,
                    new_password: event.target.value,
                  });

                  setCPassword(event.target.value);
                  setIsCPasswordDirty(true);
                }}
              />
              {/* <OutlinedInput
                        fullWidth
                        sx={{color: theme?.login?.quaternaryColor, borderWidth:'2px', height:'42px', fontFamily:'URW DIN REGULAR'}}
                        type={showPassword ? "text" : "password"}

                        name="password"
                        classes={outlinedInputClasses}
                        onChange={(event) =>{
                        setChangedval({...changedval, new_password:event.target.value});

                        setCPassword(event.target.value);
                        setIsCPasswordDirty(true);}}

                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              color="secondary"
                            >
                              {showPassword ? <EyeOutlined style={{color:'#5D7C90'}}/> : <EyeInvisibleOutlined style={{color:'#5D7C90'}}/>}
                            </IconButton>
                          </InputAdornment>
                        }
                        // onChange={(event)=>{
                        //   setRegisterPassword(event.target.value)
                        // }}
                       
                        placeholder="Re Inter your password"
                      /> */}
              {showErrorMessage && isCPasswordDirty ? (
                <div style={{ color: "#ae0000", fontSize: "small" }}>
                  {" "}
                  Passwords did not match{" "}
                </div>
              ) : (
                ""
              )}

              {/* <TogglePassword /> */}
            </Stack>

            {/* <Typography variant="h5" style={{
            color: '#fff',
            fontWeight: '700', 
            padding: '20px 44px 10px 44px',
            fontSize: '14px'
        }} >

        Password must contain:

        </Typography>
        <div style={{display:'flex',alignItems:'center', color:theme?.spaces?.mainColor,fontSize:'14px',borderBottom: '1px solid',margin: '0px 80px 0px 44px'}}>
       <img src='assets/icons/tick.png' style={{marginRight:'10px'}} />
       <p>At least 6 character</p>
       </div>
       <div style={{display:'flex',alignItems:'center', color:theme?.spaces?.mainColor,fontSize:'14px',borderBottom: '1px solid',margin: '0px 80px 0px 44px'}}>
       <img src='assets/icons/tick.png' style={{marginRight:'10px'}} />
       <p>At least 6 character</p>
       </div>
       <div style={{display:'flex',alignItems:'center', color:theme?.spaces?.mainColor,fontSize:'14px',borderBottom: '1px solid',margin: '0px 80px 0px 44px'}}>
       <img src='assets/icons/tick.png' style={{marginRight:'10px'}} />
       <p>At least 6 character</p>
       </div>
       <div style={{display:'flex',alignItems:'center', color:theme?.spaces?.mainColor,fontSize:'14px',borderBottom: '1px solid',margin: '0px 80px 20px 44px'}}>
       <img src='assets/icons/tick.png' style={{marginRight:'10px'}} />
       <p>At least 6 character</p>
       </div> */}
          </div>
          <Divider
            variant="fullWidth"
            style={{ borderColor: theme?.login?.secondaryColor }}
          />

          <div style={{ textAlign: "center", margin: "18px 0px" }}>
            <Button
              variant="contained"
              style={{
                textTransform: "none",
                padding: "9px 25px",
                fontSize: "14px",
                lineHeight: "22px",
                backgroundColor: theme?.login?.mainColor,
                marginRight: "21px",
                borderRadius: "4px",
                color: "white",
              }}
              onClick={updateSubmit}
            >
              Save changes
            </Button>

            <Button
              variant="contained"
              style={{
                textTransform: "none",
                padding: "8px 47px",
                fontSize: "14px",
                lineHeight: "22px",
                backgroundColor: theme?.login?.primaryColor,
                border: "1px solid",
                borderColor: theme?.login?.secondaryColor,
                borderRadius: "4px",
                color: theme?.login?.tertiaryColor,
              }}
              onClick={() => {
                props.handleUpdateProfileClose();
                props.handleProfileClose();
              }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </div>
      <Snackbar
        open={openToast}
        autoHideDuration={2000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity="info"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateProfile;
