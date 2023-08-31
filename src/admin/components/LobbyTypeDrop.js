import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Select from "@mui/material/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import InputBase from "@material-ui/core/InputBase";

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

    color: "#88A1AB",
  },

  icon: {
    color: "#143F63",
    fill: "#143F63 !important",
    width: "20px !important",
    height: "20px !important",
    paddingRight: "5px",
  },
}));

export default function LobbyTypeDrop(props) {
  const theme = useSelector((state) => state.theme.themeData);
  const ITEM_HEIGHT = 44;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 622,
        background: theme?.addmember?.dropdawnbgcolor,
        color: theme?.table?.mainheadingColor,
        fontSize: "14px",
        fontFamily: "URW DIN REGULAR",
        // border: "1px solid",
        // borderColor: "#012A50",
      },
    },
  };

  const BootstrapInput = withStyles((theme) => ({
    // root: {
    //   'label + &': {
    //     marginTop: theme.spacing(3),
    //   },
    // },
    input: {
      borderRadius: 4,
      position: "relative",
      // backgroundColor: "#011934",
      // border: "2px solid #012A50",
      fontSize: 14,
      // padding: '10px 26px 10px 12px',
      color: "",
      fontFamily: "URW DIN REGULAR",
      height: "40px",
      padding: "9px 9px 9px 16px",
      //   display:'flex',
      //   justifyContent:'center',
      //   alignItems:'center',
      // transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.

      "&:focus": {
        borderRadius: 4,
        backgroundColor: "",
        height: "40px",
        padding: "9px 9px 9px 16px",
      },
    },
  }))(InputBase);

  const classes = useStyles();

  return (
    <div>
      {/* <div
        style={{
          position: "absolute",
          width: "125px",
          height: "40px",
          top: "-1px",
          left: "0px",
          borderRadius: '4px',
          boxShadow: `inset 0px 0px 0px 2px #143F63`,
          zIndex: "2",
          userSelect: "none",
          pointerEvents: "none"
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "125px",
          height: "40px",
          top: "-1px",
          left: "0px",
          borderRadius: '4px',
          boxShadow: `inset 0px 0px 0px 2px #143F63`,
          zIndex: "1",
          userSelect: "none",
          pointerEvents: "none"
        }}
      />  */}

      <FormControl sx={{ width: 622 }}>
        <Select
          IconComponent={ExpandMoreIcon}
          value={props.lobbyType}
          onChange={(e) => {
            props.setLobbyType(e.target.value);
          }}
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
          //     return <p>Sort by</p>;
          //   }

          //   return selected;
          // }}

         
          input={
            <BootstrapInput name="eventType" id="eventType-customized-select" />
          }
          style={{
            height: 40,
            background: theme?.addSpace?.color1,
            borderRadius: "4px",
            color: theme?.darkfontcolor?.fontcolor,
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fill: "white",
            border:"2px solid",
            borderColor:theme?.addSpace?.borderbackgroundcolor,
          
          }}
        >
          <MenuItem
            disabled
            value=""
            style={{ fontSize: "14px", fontFamily: "URW DIN REGULAR" }}
          >
            <em>Select</em>
          </MenuItem>
          <MenuItem
            value={"V"}
            style={{ fontSize: "14px", fontFamily: "URW DIN REGULAR" }}
          >
            Video
          </MenuItem>
          <MenuItem
            value={"I"}
            style={{ fontSize: "14px", fontFamily: "URW DIN REGULAR" }}
          >
            Image
          </MenuItem>
          {props.eventMode && (
            <MenuItem
              value={"C"}
              style={{ fontSize: "14px", fontFamily: "URW DIN REGULAR" }}
            >
              Countdown
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}
