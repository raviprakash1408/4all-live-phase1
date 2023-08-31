import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
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

export default function AddEventDrop(props) {
  const theme = useSelector((state) => state.theme.themeData);
  const ITEM_HEIGHT = 44;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 129,
        background: theme?.addSpace?.color1,
        color: theme?.table?.mainheadingColor,
        fontSize: "14px",
        fontFamily: "URW DIN REGULAR",
        border: "1px solid",
        borderColor: theme?.addSpace?.borderbackgroundcolor,
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
      backgroundColor: "",
      border: "",
      fontSize: 14,
      // padding: '10px 26px 10px 12px',
      color: "",
      fontFamily: "URW DIN REGULAR",
      height: "42px",
      padding: "9px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.

      "&:focus": {
        borderRadius: 4,
        backgroundColor: "",
        height: "42px",
        padding: "9px",
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

      <FormControl sx={{ width: 129 }}>
        <Select
          IconComponent={ExpandMoreIcon}
          value={props.eventType}
          onChange={(e) => {
            props.seteventType(e.target.value);
            props.setFormValues({
              ...props.formValues,
              public_mode: e.target.value,
            });
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
            height: 42,
            background: theme?.addSpace?.frontbg,
            borderRadius: "4px",
            color: theme?.darkfontcolor?.fontcolor,
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fill: "white",
            border: `2px solid ${theme?.addSpace?.borderbackgroundcolor}`

          }}
        >
          <MenuItem
            value={true}
            style={{ fontSize: "14px", fontFamily: "URW DIN REGULAR" }}
          >
            <img
            alt=""
              src="/assets/admin/public.svg"
              style={{ paddingRight: "6px" }}
            />
            Public
          </MenuItem>
          <MenuItem
            value={false}
            style={{ fontSize: "14px", fontFamily: "URW DIN REGULAR" }}
          >
            <img
            alt=""
              src="/assets/admin/private.svg"
              style={{ paddingRight: "6px" }}
            />
            Private
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
