import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Select from "@mui/material/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import InputBase from "@material-ui/core/InputBase";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ConfirmPop from "./ConfirmPop";

// const useStyles = makeStyles((theme) => ({

//   select: {
//     color: "#88A1AB",
//   },
//   icon: {
//     width:'9px !important', height:'4px !important'
//   }

// }));

const BootstrapInput = withStyles((theme) => ({
  input: {
    borderRadius: 4,
    position: "relative",
    // backgroundColor: '#002E56',
    // border: '2px solid #143F63',
    fontSize: 14,
    // color: "#E1E7EA",
    fontFamily: "URW DIN REGULAR",
    height: "25px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "13px",
    "&:focus": {
      borderRadius: 4,
      // backgroundColor: '#002E56',
    },
  },
}))(InputBase);

export default function TeamViewtypeDrop({
  viewType,
  setViewType,
  setnewUserViewType,
  changeViewType,
  viewLoader,
  componentFor,
  userId,
  type,
  hover,
  HiddenUser,
}) {
  const theme = useSelector((state) => state.theme.themeData);
  const ITEM_HEIGHT = 44;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 125,
        background: theme?.spaces?.tertiaryColor,
        color: theme?.spaces?.mainColor,
        fontSize: "14px",
        fontFamily: "URW DIN REGULAR",
        border: "1px solid",
        borderColor: theme?.table?.buttonbgColor,
        marginLeft: "12px",
      },
    },
  };

  // const classes = useStyles()

  // useEffect(() => {
  //   setViewType(viewType);
  // }, [viewType])

  const [confirm, setConfirm] = React.useState(false);
  const [defaultViewer, setDefaultViewer] = useState(false);

  const defaultViewerRole = () => {
    setDefaultViewer(true);
  };

  const handleClickOpen = () => {
    setConfirm(true);
  };

  const handleClickClose = () => {
    setConfirm(false);
  };

  return (
    <div>
      {viewLoader ? (
        <Box sx={{ display: "flex" }} style={{ zIndex: "1" }}>
          <CircularProgress
            size={20}
            sx={{
              color: "#41ceb9",
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        </Box>
      ) : (
        <FormControl
          sx={{ width: componentFor === "editEvent" ? "100%" : "125px" }}
        >
          <Select
            IconComponent={() => (
              <ExpandMoreIcon
                htmlColor={hover ? "#002E56" : "#143F63"}
                style={{ fontSize: "19px", paddingRight: "10px" }}
              />
            )}
            value={viewType}
            onChange={(e) => {
              if (componentFor == "editEvent") {
                setViewType(e.target.value);
              } else {
                if (componentFor == "newUserList") {
                  setnewUserViewType(e.target.value);
                } else if (componentFor == "inviteSettings") {
                  setViewType(e.target.value);
                }
                // if (componentFor == "teamTable") {
                changeViewType(e.target.value, componentFor, userId);
                // if (e.target.value === "V" && componentFor == "teamTable") {
                //   handleClickOpen();
                //   if (defaultViewer) {
                //     changeViewType(e.target.value, componentFor, userId);
                //   }
                // }
                // }
              }
            }}
            // className={classes.select}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={MenuProps}
            // classes={{
            //   select: classes.select,
            //   icon: classes.icon,
            // }}
            input={
              <BootstrapInput
                name="eventType"
                id="eventType-customized-select"
              />
            }
            style={{
              borderRadius: "4px",
              border:
                componentFor === "editEvent"
                  ? theme?.team?.border
                  : hover
                  ? theme?.team?.hoverborder
                  : theme?.team?.border,
              color: theme?.team?.color,
              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
              fill: "white",
            }}
          >
            <MenuItem
              style={{ fontSize: "14px", fontFamily: "URW DIN REGULAR" }}
              value={"P"}
            >
              {/* <img src="/assets/admin/public.svg" style={{paddingRight:'6px'}} /> */}
              Primary
            </MenuItem>
            <MenuItem
              style={{ fontSize: "14px", fontFamily: "URW DIN REGULAR" }}
              value={"S"}
            >
              {/* <img src="/assets/admin/private.svg" style={{paddingRight:'6px'}} /> */}
              Secondary
            </MenuItem>
            {HiddenUser !== "HiddenUser" && (
              <MenuItem
                style={{ fontSize: "14px", fontFamily: "URW DIN REGULAR" }}
                value={"V"}
              >
                {/* <img src="/assets/admin/private.svg" style={{paddingRight:'6px'}} /> */}
                Hidden
              </MenuItem>
            )}

            {/* <MenuItem style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}} value={'G'}>
          <img src="/assets/admin/private.svg" style={{paddingRight:'6px'}} />

          Guest</MenuItem> */}
          </Select>
        </FormControl>
      )}
      <ConfirmPop
        message="Are you sure for hidden view type, role will be changed to viewer"
        confirm={confirm}
        handleClickOpen={handleClickOpen}
        handleClickClose={handleClickClose}
        handleDelete={defaultViewerRole}
      />
    </div>
  );
}
