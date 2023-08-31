

import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';



const useStyles = makeStyles((theme) => ({
  
  select: {
    '&:before': {
      borderColor: 'white !important',
  },
  '&:after': {
      borderColor: 'white !important',
  },
  '&:not(.Mui-disabled):hover::before': {
      borderColor: 'white !important',
  },
  '&:hover:not(.Mui-disabled):before': { borderColor: 'white !important', },
  
   
    color: "#88A1AB",
  },
  
  icon: { color: "#88A1AB",fill: '#88A1AB !important'

 },
}));




export default function PositionDropdown() {
  const theme = useSelector(state => state.theme.themeData)
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 58,
        background: theme?.spaces?.tertiaryColor,
        color: theme?.spaces?.mainColor,
        fontSize: '14px',
        fontFamily:'URW DIN REGULAR'
      },
    },
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const classes = useStyles()

  return (
    <div
      style={{
        position: "relative"
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "58px",
          height: "44px",
          top: "-2px",
          left: "0px",
          borderRadius: '4px',
          boxShadow: "inset 0px 0px 0px 5px #012a50",
          zIndex: "1",
          userSelect: "none",
          pointerEvents: "none"
        }}
      />
      <FormControl sx={{  width: 58,  }}>
        <Select
          className={classes.select}
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          MenuProps={MenuProps}
          classes={{
            select: classes.select,
            icon: classes.icon,
          }}
          style={{height: 40, background: theme?.spaces?.tertiaryColor, borderRadius: '4px', color: theme?.spaces?.mainColor, fontSize: '14px',fontFamily:'URW DIN REGULAR',fill: 'white'}}
        >
          <MenuItem value="" style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}}>
            1
          </MenuItem>
          <MenuItem value={10} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}}> 2</MenuItem>
          <MenuItem value={20} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}}> 3</MenuItem>
          <MenuItem value={30} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}}> 4</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
