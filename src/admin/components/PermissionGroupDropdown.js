import React, { useEffect, useState }  from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { gql, useQuery } from "@apollo/client";
import Select from "@mui/material/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import InputBase from "@material-ui/core/InputBase";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";

const useStyles = makeStyles((theme) => ({
  select: {
    "&:before": {
      borderColor: "white !important",
    },
    "&:after": {
      borderColor: "white !important",
    },
    "&:not(.Mui-disabled):hover::before": {
      borderColor: "white !important",
    },
    "&:hover:not(.Mui-disabled):before": { borderColor: "white !important" },

    // color: "#88A1AB",
  },

  icon: {
    color: "#143F63",
    // fill: "#143F63 !important",
    width: "20px !important",
    height: "20px !important",
    
    // paddingRight:'5px'
    
  },
}));

const BootstrapInput = withStyles((theme) => ({
  // root: {
  //   'label + &': {
  //     marginTop: theme.spacing(3),
  //   },
  // },
  input: {
    borderRadius: 4,
    position: "relative",
    // backgroundColor: "#002E56",
    // border: "2px solid #143F63",
    fontSize: 14,
    // padding: '10px 26px 10px 12px',
    // color: "#E1E7EA",
    fontFamily: "URW DIN REGULAR",
    height: "15px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "13px",
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.

    // "&:focus": {
    //   borderRadius: 4,
    //   backgroundColor: "#002E56",
     
    // },
  },
}))(InputBase);



export default function PermissionGroupDropdown({
  permissiongroup,
  handleChangepermissiongroup,
  permissions
}) {
  const theme = useSelector((state) => state.theme.themeData);
  const [hover, sethover] = React.useState(false)



  const ITEM_HEIGHT = 44;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 125,
        background: theme?.spaces?.tertiaryColor,
        color: theme?.workflows?.textcolor,

        fontSize: "14px",
        fontFamily: "URW DIN REGULAR",
        border: "1px solid",
        borderColor:theme?.table?.buttonbgColor,
        marginLeft:'12px',
        marginTop:'3px'
      },
    },
  };

  const classes = useStyles();
  // const [permissiongroup, setpermissiongroup] = React.useState();

  // const handleChangepermissiongroup = (event) => {
  //   setpermissiongroup(event.target.value);
  // };

 

  return (
    <div>
      <FormControl sx={{ width: 125 }}>
        <Select
          onMouseEnter={() => sethover(true)}
          onMouseLeave={() => sethover(false)}
          IconComponent={() => (
            <ExpandMoreIcon htmlColor={hover ? "#88A1AB" : "#143F63"} />
          )}
          value={permissiongroup}
          onChange={handleChangepermissiongroup}
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
          input={
            <BootstrapInput name="eventType" id="eventType-customized-select" />
          }
          style={{
            // background: hover ?'#143F63' : theme?.table?.buttonbgColor,
            backgroundColor: hover ?theme?.workflows?.hover : theme?.workflows?.buttonBg,
            borderRadius: "4px",
            color: theme?.workflows?.textcolor,
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            // fill: "white",
            border: hover ? `2px solid ${theme?.common?.color3}` : theme?.workflows?.border,
            "&:focus": {
              borderRadius: 4,
              backgroundColor: hover ? theme?.workflows?.hover : theme?.common?.color4,
            },
          }}
        >
          {permissions?.map(({ id, title }) => (
            <MenuItem
              key={id}
              value={id}
              style={{ fontSize: "14px", fontFamily: "URW DIN REGULAR" }}
              select
              className="wrapper"
            >
              <span 
              // className="overflow-text"
              >{title}</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
