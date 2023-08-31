

import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from '@mui/material/InputLabel';

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




export default function SortbyDrop({seteventList, rows}) {

  //sort array of object A-Z

  const sortbyName = () => {
    const strAscending = [...rows].sort((a, b) =>
    a.name > b.name ? 1 : -1,
  );
  seteventList([...strAscending])
  }
  const sortbyDate = () => {
    let sortedEvents = [...rows].sort((a,b) => new Date(a.event_start).getTime() - new Date(b.event_start).getTime())
    seteventList([...sortedEvents])
console.log(sortedEvents,"sortedEventssortedEvents");
  }
  const theme = useSelector(state => state.theme.themeData)
  const ITEM_HEIGHT = 44;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 120,
        background: theme?.spaces?.tertiaryColor,
        color: theme?.spaces?.mainColor,
        fontSize: "14px",
        fontFamily: "URW DIN REGULAR",
        border: "1px solid",
        borderColor: theme?.table?.buttonbgColor,
      },
    },
    MenuProps: { disableScrollLock: true },
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const classes = useStyles()

  return (
    <div
      style={{
        position: "relative",
        cursor:'pointer', marginTop:'20px'
      }}
      className='sortby_space'
    >
      <div
        style={{
          position: "absolute",
          width: "94px",
          height: "44px",
          top: "-1px",
          left: "0px",
          borderRadius: '4px',
          boxShadow: `inset 0px 0px 0px 0px ${theme?.table?.buttonbgColor}`,
          zIndex: "2",
          userSelect: "none",
          pointerEvents: "none"
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "94px",
          height: "44px",
          top: "-1px",
          left: "0px",
          borderRadius: '4px',
          boxShadow: `inset 0px 0px 0px 10px ${theme?.table?.buttonbgColor}`,
          zIndex: "1",
          userSelect: "none",
          pointerEvents: "none"
        }}
      />

      <FormControl sx={{  width: 94, }} >
     
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
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <p>Sort by</p>;
            }

            return selected;
          }}
          

          style={{height: 42, background: theme?.table?.buttonbgColor, borderRadius: '4px', color: theme?.spaces?.mainColor, fontSize: '14px',fontFamily:'URW DIN REGULAR',fill: 'white',}}
        >
         
          <MenuItem value={'Live Now'} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}} className='sortby_space'>
          <img src="/assets/icons/livenow_icon.svg" style={{paddingRight:'6px',width:'20px', height:'auto'}} />
          Live Now</MenuItem>
          <MenuItem value={'Date'} onClick={sortbyDate} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}} className='sortby_space'>
          <img src="/assets/icons/date_icon.svg" style={{paddingRight:'6px',width:'20px', height:'auto'}} />

          Date</MenuItem>
          <MenuItem value={'Name'} onClick={sortbyName} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}} className='sortby_space'>
          <img src="/assets/icons/name_icon.svg" style={{paddingRight:'6px',width:'20px', height:'auto'}}/>

          Name</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
