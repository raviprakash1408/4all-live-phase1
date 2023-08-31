import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import Select from "@mui/material/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import InputBase from "@material-ui/core/InputBase";
import Skeleton from "@mui/material/Skeleton";

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
    padding: "9px 26px 9px 12px",
    color: "#88A1AB",
    fontFamily: "URW DIN REGULAR",
    // height:'40px',
    display: "flex",
    alignItems: "center",
    paddingLeft: "13px",
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.

    "&:focus": {
      borderRadius: 4,
      // backgroundColor: "#002E56",
      // display:'flex',
      // alignItems:'center',
    },
  },
}))(InputBase);

export default function TeamWorkflowDrop({
  workflowList,
  defaultWorkflow,
  workflowLoader,
  handleChange,
  selectedworkflow,
}) {
  const theme = useSelector((state) => state.theme.themeData);
  const ITEM_HEIGHT = 44;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 125,
        background:  theme?.team?.participant,

        color: theme?.spaces?.mainColor,
        fontSize: "14px",
        fontFamily: "URW DIN REGULAR",
        border: "1px solid",
        borderColor: theme?.table?.buttonbgColor,
      },
    },
  };

  console.log(selectedworkflow, "selectedworkflow");

  const classes = useStyles();
  const [age, setAge] = React.useState("Live events");

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  return (
    <div>
      {workflowLoader ? (
        <Skeleton
          style={{  backgroundColor:  theme?.loading?.loadingColor  }}
          variant="rectangular"
          width={125}
          height={40}
        />
      ) : (
        <FormControl sx={{ width: 170, height: 40 }}>
          <Select
            IconComponent={ExpandLessIcon}
            value={defaultWorkflow[0]?.id}
            onChange={(e) => {
              handleChange(e.target.value);
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
            //     return <p>Select</p>;
            //   }

            //   return selected;
            // }}
            input={
              <BootstrapInput
                name="eventType"
                id="eventType-customized-select"
              />
            }
            style={{
              backgroundColor: theme?.team?.participant,

              borderRadius: "4px",
              color: theme?.team?.textcolor,
              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
              fill: "white",
              border:theme?.team?.border,
            }}
          >
            {workflowList.map((item) => (
              <MenuItem
                value={item.id}
                style={{ fontSize: "14px", fontFamily: "URW DIN REGULAR",backgroundColor:theme?.team?.participant, }}
                select
              >
                {/* <img src="/assets/admin/public.svg" style={{paddingRight:'6px'}} /> */}
                {item.name}
              </MenuItem>
            ))}

            {/* <MenuItem
            value={"Development"}
            style={{ fontSize: "14px", fontFamily: "URW DIN REGULAR" }}
          >
            <img src="/assets/admin/private.svg" style={{paddingRight:'6px'}} />
            Development
          </MenuItem>
          <MenuItem
            value={"Audio postproduction"}
            style={{ fontSize: "14px", fontFamily: "URW DIN REGULAR" }}
          >
            <img src="/assets/admin/private.svg" style={{paddingRight:'6px'}} />
            Conference
          </MenuItem> */}
          </Select>
        </FormControl>
      )}
    </div>
  );
}
