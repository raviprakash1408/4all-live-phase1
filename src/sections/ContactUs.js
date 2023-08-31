import React from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Box, Typography, Button, Divider, Stack, InputLabel, OutlinedInput, TextField  } from '@mui/material';

import { useSelector } from 'react-redux';
import { changeOpacity } from '../utilities/common';


const ContactUs = (props) => {
  const theme = useSelector(state => state.theme.themeData)

//   const [updateProfile, setUpdateProfile] = React.useState(false);
//   const handleUpdateProfile = () => {
//     setUpdateProfile(true)
//   }
//   const handleUpdateProfileClose = () => {
//     setUpdateProfile(false)
//   }
  return (
    <>
      <div
        style={{
          alignItems: "center",
          background: changeOpacity(theme?.waiting?.primaryColor, 0.9),
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
        className="profile-popup"
      >
        <Box
          sx={{
            backgroundColor: theme?.addSpace?.mainColor,
          }}
          style={{
            border: "1px solid",
            borderColor: theme?.login?.secondaryColor,
            borderRadius: "4px",
            width: "475px",
            height: "540px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "35px",
              // position: 'relative',
              paddingBottom: "5px",
            }}
          >
            <img
              src={theme?.login?.RequestAssIcon}
              style={{
                objectFit: "cover",
                padding: "10px",
                width: "80px",
                height: "78px",
              }}
            />
          </div>
          <div
            onClick={() => {
              props.setShowContactPop(false);
            }}
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
              zIndex: 999,
            }}
          >
            <img src="/assets/icons/x.svg" />
          </div>

          <Typography
            variant="h5"
            style={{
              color: theme?.spaces?.secondaryColor,
              fontWeight: "700",
              textAlign: "center",
              padding: "12px 0px",
              fontFamily: "URW DIN",
            }}
          >
            Request Assistance
          </Typography>

          <p
            style={{
              fontSize: "14px",
              textAlign: "center",
              color: theme?.profile?.mainColor,
              padding: "0px 20px",
              fontFamily: "URW DIN REGULAR",
            }}
          >
            {`Use the form below or email ${localStorage.getItem('organization_slug')== "meetmo"? "hello@meetmo.io" : "support@events.fox"}`}
          </p>

          <Stack spacing={1} sx={{ margin: "0px 44px 20px 44px" }}>
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
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
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
              // OutlinedInput

              // sx={{
              //   '& .MuiOutlinedInput-input': {
              //     p: '9.5px 12px',
              //     fontSize:'14px', fontFamily: 'URW DIN REGULAR',
              //     color: theme?.login?.quaternaryColor,

              //   },
              //   '& .MuiOutlinedInput-notchedOutline':{

              //     border:'2px solid',
              //     borderColor:theme?.login?.secondaryColor,

              //     borderRadius:'4px'
              //   },
              //   '&:hover .MuiOutlinedInput-notchedOutline':{

              //     border:'2px solid',

              //     borderColor:theme?.login?.secondaryColor,

              //     borderRadius:'4px'
              //   }

              // }}
              // sx={{color: theme?.profile?.primaryColor, border:'1px solid',borderColor:theme?.login?.secondaryColor, fontSize:'14px', height: '40px', fontFamily: 'URW DIN REGULAR'}}
              type="email"
              name="email"
              placeholder="Email"
              fullWidth
            />
          </Stack>

          <Stack spacing={1} sx={{ margin: "0px 44px 20px 44px" }}>
            <TextField
              id="outlined-basic"
              label=""
              variant="outlined"
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                  marginTop: "-5px",
                },
                "& .MuiOutlinedInput-root": {
                  fontSize: "14px",
                  marginTop: "1px",
                },

                "& .MuiOutlinedInput-input": {
                  fontFamily: "URW DIN REGULAR",
                  fontSize: "15px",

                  color: theme?.login?.quaternaryColor,
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
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
              name="text"
              placeholder="What do you need assistance"
              multiline
              rows={5}
              fullWidth
            />
          </Stack>
          <Stack spacing={1} sx={{ margin: "0px 44px 20px 44px" }}>
            <Button
              variant="contained"
              style={{
                textTransform: "none",

                fontSize: "16px",
                padding: "7px",
                lineHeight: "22px",
                backgroundColor: theme?.login?.mainColor,
              }}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </div>

      {/* {updateProfile && <UpdateProfile handleUpdateProfileClose={handleUpdateProfileClose} handleProfileClose={props.handleProfileClose}/>} */}
    </>
  );
}

export default ContactUs
