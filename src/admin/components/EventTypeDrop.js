// import React from 'react';
// import { makeStyles, withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import InputBase from '@material-ui/core/InputBase';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';

// const BootstrapInput = withStyles(theme => ({
//   // root: {
//   //   'label + &': {
//   //     marginTop: theme.spacing(3),
//   //   },
//   // },
//   input: {
//     borderRadius: 4,
//     position: 'relative',
//     backgroundColor: '#002E56',
//     border: '2px solid #143F63',
//     fontSize: 14,
//     // padding: '10px 26px 10px 12px',
//     color:'#E1E7EA',
//     fontFamily:'URW DIN REGULAR',
//     height:'28px',
//     display:'flex',
//     justifyContent:'center',
//     alignItems:'center',
//     paddingLeft:'6px',
//     // transition: theme.transitions.create(['border-color', 'box-shadow']),
//     // Use the system font instead of the default Roboto font.

//     // '&:focus': {
//     //   borderRadius: 4,
//     // backgroundColor: '#002E56',

//     // },
//   },
// }))(InputBase);

// const useStyles = makeStyles(theme => ({
//   // root: {
//   //   display: 'flex',
//   //   alignItems:'center',
//   //   justifyContent:'center'
//   // },
//   margin: {
//     margin: theme.spacing(1),
//   },
//   icon: { color: "#143F63",fill: '#143F63 !important', width:'20px !important', height:'20px !important',paddingRight:'5px'

//    },
// }));

// const ITEM_HEIGHT = 48;
//   const ITEM_PADDING_TOP = 8;
//   const MenuProps = {
//     PaperProps: {
//       style: {
//         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//         width: 122,
//         background: '#002E56',
//         color: '#E1E7EA',
//         fontSize: '14px',
//         fontFamily:'URW DIN REGULAR',
//         border:'1px solid',
//         borderColor:'#143F63'
//       },
//     },
//   };

// export default function EventTypeDrop(props) {
//   const classes = useStyles();

//   return (
//     <form className={classes.root} autoComplete="off">
//       <FormControl className={classes.margin} fullWidth>
//         <Select
//         IconComponent = {ExpandLessIcon}
//           // value={props.eventType}
//         //   onChange={handleChangeType}
//           // onChange={(e)=>{props.handleChangeType(e.target.value)}}
//           MenuProps={MenuProps}
//           classes={{
//             icon: classes.icon,
//           }}
//           // input={<BootstrapInput name="eventType" id="eventType-customized-select" />}
//         >

//        <MenuItem value={true} style={{fontSize: '14px',
//         fontFamily:'URW DIN REGULAR'}} >
//           <img src="/assets/admin/public.svg" style={{paddingRight:'6px'}} />
//           Public</MenuItem>
//           <MenuItem value={false} style={{fontSize: '14px',
//         fontFamily:'URW DIN REGULAR'}} >
//           <img src="/assets/admin/private.svg" style={{paddingRight:'6px'}} />

//           Private</MenuItem>
//           {/* <List component="nav" aria-label="main mailbox folders">
//         <ListItemButton
//           selected={selectedIndex === 0}
//           onClick={(event) => handleListItemClick(event, 0)}
//           select
//         >
//           <ListItemIcon>
//             <InboxIcon />
//           </ListItemIcon>
//           <ListItemText primary="Inbox" />
//         </ListItemButton>
//         <ListItemButton
//           selected={selectedIndex === 1}
//           onClick={(event) => handleListItemClick(event, 1)}
//         >
//           <ListItemIcon>
//             <DraftsIcon />
//           </ListItemIcon>
//           <ListItemText primary="Drafts" />
//         </ListItemButton>
//       </List> */}

//         </Select>
//       </FormControl>
//     </form>
//   );
// }

import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Select from "@mui/material/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import InputBase from "@material-ui/core/InputBase";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import Toast from "../../sections/Toast";

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

export default function EventTypeDrop(props) {
  const theme = useSelector((state) => state.theme.themeData);
  const ITEM_HEIGHT = 44;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 125,
        background: theme?.table?.buttonColor,
        color: theme?.table?.mainheadingColor,
        fontSize: "14px",
        fontFamily: "URW DIN REGULAR",
        border: "1px solid",
        borderColor: theme?.table?.buttonColor,
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
      // backgroundColor: "#002E56",
      // border: "2px solid #143F63",
      fontSize: 14,
      // padding: '10px 26px 10px 12px',
      // color: "#E1E7EA",
      fontFamily: "URW DIN REGULAR",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: "6px",
      // transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.

      "&:focus": {
        borderRadius: 4,
        backgroundColor: "",
      },
    },
  }))(InputBase);

  const classes = useStyles();
  const [editToast, seteditToast] = React.useState(false);
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

      <FormControl sx={{ width: 125 }}>
        <Select
          IconComponent={ExpandMoreIcon}
          value={props.eventType}
          onChange={(e) => {
            props.seteventType(e.target.value);
            AxiosLocal.post(`event/edit/${props.eventId}/`, {
              public_mode: e.target.value,
            }).then((response) => {
              console.log(response, "handleAddSpace");
              if (response.data.status == "Success") {
                seteditToast(true);
                window.eventChanel.publish({
                  event: "lobby_realtime",
                });
                console.log("lobby_realtime");
              }
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
            height: 38,
            background: theme?.spacescolor?.color1,
            borderRadius: "4px",
            color: theme?.darkfontcolor?.fontcolor,
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fill: "white",
            border:`2px solid ${theme?.spacescolor?.bordercolor}`,

          }}
        >
          <MenuItem
            value={true}
            style={{ fontSize: "14px", fontFamily: "URW DIN REGULAR" }}
          >
            <img
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
              src="/assets/admin/private.svg"
              style={{ paddingRight: "6px" }}
            />
            Private
          </MenuItem>
        </Select>
      </FormControl>
      <Toast
        openToast={editToast}
        setOpenToast={seteditToast}
        message="Space Updated Successfully"
      />
    </div>
  );
}
