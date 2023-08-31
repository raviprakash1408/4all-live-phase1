


import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from '@mui/material/InputLabel';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import Select from "@mui/material/Select";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import InputBase from '@material-ui/core/InputBase';

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
  
  icon: { color: "#143F63",fill: '#143F63 !important', width:'20px !important', height:'20px !important',
  // paddingRight:'5px'
  
   },
}));

const BootstrapInput = withStyles(theme => ({
  // root: {
  //   'label + &': {
  //     marginTop: theme.spacing(3),
  //   },
  // },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#012243',
    border: '2px solid #012A50',
    fontSize: 14,
    // padding: '10px 26px 10px 12px',
    color:'#E1E7EA',
    fontFamily:'URW DIN REGULAR',
    height:'30px',
    display:'flex',
    alignItems:'center',
    paddingLeft:'13px',
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
  
    '&:focus': {
      borderRadius: 4,
      backgroundColor: '#012243',
      // height:'30px',

    // display:'flex',
    // alignItems:'center',

    },
  },
}))(InputBase);


export default function DropSearchAddMember() {
  const theme = useSelector(state => state.theme.themeData)
  const ITEM_HEIGHT = 44;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 125,
        background: theme?.spaces?.tertiaryColor,
        color: theme?.spaces?.mainColor,
        fontSize: '14px',
        fontFamily:'URW DIN REGULAR',
        border:'1px solid',
        borderColor:theme?.table?.buttonbgColor
      },
    },
  };


  const classes = useStyles()
  const [age, setAge] = React.useState("Participant");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div
    
  >

      <FormControl sx={{  width: 125 }} >
     
        <Select
          IconComponent = {ExpandLessIcon}
          value={age}
          onChange={handleChange}     
          className={classes.select}
         
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          MenuProps={MenuProps}
          classes={{
            select: classes.select,
            icon: classes.icon,
          }}
          // renderValue={(selected) => {
          //   if (selected.length === 0) {
          //     return <p>Select</p>;
          //   }

          //   return selected;
          // }}
            input={<BootstrapInput name="eventType" id="eventType-customized-select" />}

          style={{background: '#012243 !important', borderRadius: '4px', color: theme?.spaces?.mainColor, fontSize: '14px',fontFamily:'URW DIN REGULAR',fill: 'white'}}
        >
         
         <MenuItem value={'Participant'} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}} select>
          {/* <img src="/assets/admin/public.svg" style={{paddingRight:'6px'}} /> */}
          Participant</MenuItem>
          <MenuItem value={'Viewer'} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}} >
          {/* <img src="/assets/admin/private.svg" style={{paddingRight:'6px'}} /> */}

          Viewer</MenuItem>
          <MenuItem value={'Guest'} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}} >
          {/* <img src="/assets/admin/private.svg" style={{paddingRight:'6px'}} /> */}

          Guest</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

