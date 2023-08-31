import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

import React from 'react'


const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, hover }) => ({
  width: 44,
  height: 22,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb": {
        color: "white",
      },

      "& + .MuiSwitch-track": {
        backgroundColor: theme?.common?.color1,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
        color: "grey",
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "white",
      border: "6px solid yellow",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: "black",
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 18,
    height: 18,
    color: "#264E6E",
  },
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    backgroundColor: hover ? "#002E56" :theme?.toggleButton?.button,

    opacity: 1,
    // transition: theme.transitions.create(["background-color"], {
    //   duration: 500,
    // }),
  },
}));

export default IOSSwitch
