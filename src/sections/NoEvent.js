import React from 'react'
import { Box, Typography, Button, Divider, Stack, InputLabel, OutlinedInput  } from '@mui/material';

import { useSelector } from 'react-redux';


const NoEvent = (props) => {
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

      
        <Box
      sx={{
        
        backgroundColor: theme?.login?.primaryColor,
        
      }}
      style={{borderRadius:'4px', width:'444px', height:'384px',position: 'absolute',
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '45px',
      margin: 'auto'}}
    >
     
      <div style={{display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '79px',
    }}>
    <img src={theme?.spaces?.emptySpace} style={{objectFit:'cover', padding:'10px',width:'130px',height:'130px'}} />
    </div>
   
    
    <Typography variant="h5" style={{
            color: theme?.spaces?.secondaryColor,
            textAlign: 'center',
            padding: '35px 0px',
            fontFamily: 'URW DIN REGULAR',
            fontSize:'22px'
        }} >

        There are no events available

        </Typography>
     
    </Box>
  
    
      
      {/* {updateProfile && <UpdateProfile handleUpdateProfileClose={handleUpdateProfileClose} handleProfileClose={props.handleProfileClose}/>} */}
    </>

  )
}

export default NoEvent
