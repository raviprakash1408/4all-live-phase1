import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputBase from "@material-ui/core/InputBase";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  select: {
    "&:before": {
      borderColor: `${
        theme?.bg_color_4 ? theme?.font_color_0 : "#88A1AB"
      } !important`,
    },
    "&:after": {
      borderColor: `${
        theme?.bg_color_4 ? theme?.font_color_0 : "#88A1AB"
      } !important`,
    },
    "&:not(.Mui-disabled):hover::before": {
      borderColor: `${
        theme?.bg_color_4 ? theme?.font_color_0 : "#88A1AB"
      } !important`,
    },
    "&:hover:not(.Mui-disabled):before": {
      borderColor: `${
        theme?.bg_color_4 ? theme?.font_color_0 : "#88A1AB"
      } !important`,
    },

    color: "#88A1AB",
  },
  formControl: { width: "100%" },
  icon: {
    color: theme?.font_color_0 ? theme?.font_color_0 : "#88A1AB",
    fill: `${theme?.font_color_0} !important`,
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
    backgroundColor: theme?.bg_color_1,
    border: `1px solid ${theme?.bg_color_4}`,
    fontSize: 14,
    // padding: '10px 26px 10px 12px',
    color: theme?.font_color_0,
    fontFamily: "URW DIN REGULAR",
    height: "27px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "12px",
    paddingTop: "8px",

    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.

    "&:focus": {
      borderRadius: 4,
      backgroundColor: theme?.bg_color_1,

      display: "flex",
      alignItems: "center",
      paddingTop: "8px",
    },
  },
}))(InputBase);

export default function SelectLabels(props) {
  const theme = useSelector((state) => state.theme.themeData);

  const dispatch = useDispatch();

  // const theme = useSelector(state => state.theme.themeData)
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

        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
  };
  const [deviceId, setdeviceId] = React.useState("");

  React.useEffect(() => {
    if (props.type === "localDevice") {
      if (
        deviceId == "" ||
        deviceId == null ||
        deviceId == undefined ||
        deviceId == "null"
      ) {
        setdeviceId(props.options[0]?.deviceId);
        props.handleChange(props.options[0]?.deviceId);
      } else {
        props.handleChange(deviceId);
      }
    } else {
      if (
        deviceId == "" ||
        deviceId == null ||
        deviceId == undefined ||
        deviceId == "null"
      ) {
        if (
          localStorage.getObject(props.type) == "" ||
          localStorage.getObject(props.type) == null ||
          localStorage.getObject(props.type) == undefined ||
          localStorage.getObject(props.type) == "null"
        ) {
          localStorage.setObject(props.type, props.options[0]?.deviceId);
          setdeviceId(props.options[0]?.deviceId);
        } else {
          setdeviceId(localStorage.getObject(props.type));
        }
      }
    }
  }, [deviceId, props, props.options, props.type]);

  // const handleChange = (event) => {
  //   setdeviceId(event.target.value);
  //   localStorage.setObject(props.type, event.target.value);
  //   if (props.type == "micDeviceId" || props.type == "camDeviceId") {
  //     props.setdeviceId(event.target.value);
  //   }
  //   // switch for audio and video dispatch
  //   if (props.type == "camDeviceId" && event.target.value !="") {
  //     dispatch(setVideoInputDeviceId(event.target.value));
  //   }
  // };

  const classes = useStyles(props.theme);
  return (
    <div>
      {!props.permission ? (
        <div
          style={{
            height: 36,
            width: 235,
            background: theme?.settings?.containerbg,

            border: `2px solid ${theme?.settings?.borderBg}`,

            borderRadius: "4px",
            color: theme?.settings?.fieldtext,

            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            display: "flex",
            alignItems: "center",
            opacity: 0.5,
          }}
        >
          <p style={{ margin: 0, paddingLeft: "15px" }}>
            {props.error_message != "" ? props.error_message : ""}
          </p>
        </div>
      ) : (
        <FormControl
          sx={{
            width:
              props.type == "manageDevice"
                ? 470
                : props.type == "localDevice"
                ? "100%"
                : 240,
          }}
        >
          <Select
            IconComponent={ExpandMoreIcon}
            value={deviceId}
            // label={props.options[0]?.label}
            onChange={(event) => {
              if (props.type === "localDevice") {
                props.handleChange(event.target.value);
                setdeviceId(event.target.value);
              } else {
                props.handleChange(event, props.type);
                setdeviceId(event.target.value);
              }
            }}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            MenuProps={MenuProps}
            classes={{
              select: classes.select,
              icon: classes.icon,
            }}
            input={
              <BootstrapInput
                name="eventType"
                id="eventType-customized-select"
                theme={props.theme}
              />
            }
            style={{
              height: 39,
              width: "100%",
              // background: props.theme?.bg_color_1,
              background: theme?.settings?.containerbg,

              border: `2px solid ${theme?.settings?.borderBg}`,

              borderRadius: "4px",
              color: theme?.settings?.fieldtext,

              fontSize: "14px",
              fill: props.theme?.font_color_0,
            }}
            sx={{
              "&:focus": {
                borderRadius: 4,
                background: theme?.settings?.containerbg,

                display: "flex",
                alignItems: "center",
                paddingTop: "8px",
              },
            }}
          >
            {props.options?.map((option, index) => {
              return (
                <MenuItem
                  selected={index == 0}
                  value={option.deviceId}
                  style={{
                    color: theme?.settings?.fieldtext
                      ? theme?.settings?.fieldtext
                      : "#768BA2",
                    fontSize: "14px",
                    fill: props.theme?.font_color_0
                      ? props.theme?.font_color_0
                      : "#768BA2",
                    fontFamily: "URW DIN REGULAR",
                  }}
                >
                  <div
                    style={{
                      overflow: "hidden",
                      color: theme?.settings?.fieldtext,
                      textOverflow: "ellipsis",
                    }}
                  >
                    {option.label}
                  </div>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </div>
  );
}
