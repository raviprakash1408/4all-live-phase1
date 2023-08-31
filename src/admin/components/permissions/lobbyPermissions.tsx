import React, { useEffect, useReducer, useState } from "react";
import IOSSwitch from "../CustomSwitch";
import { FormControlLabel, Grid } from "@mui/material";
import { AxiosLocal } from "../../../utilities/axiosUtils.ts";
import { useSelector } from 'react-redux';

// const ghg = {
//   show_online_people_loby: false,
//   show_settings_button_loby: false,
//   switch_space_loby: false,
//   switch_video_on_off_loby: false,
//   switch_audio_on_off_loby: false,
//   mute_audio_loby: false,
//   mute_video_loby: false,
// };

// axios request and realtime with list of permi and valu
const permissionChangefun = (id, permissionObject) => {
  AxiosLocal.post(`/user/permission/edit/${id}`, permissionObject).then(
    (res) => {
      console.log("res", res);
    }
  );
  // publish permission to all users
  // @ts-ignore
  // window.permissionChanel.publish(permissionObject);
};

type initial_button_state = {
  loby: {
    // mute_video: boolean;
    // mute_audio: boolean;
    // switch_space: boolean;
    // switch_video_on_off: boolean;
    // switch_audio_on_off: boolean;
    show_settings_button_loby: boolean;
    show_online_people_loby: boolean;
    override_join_now: boolean;
  };
};
type actions = {
  initialState?: any;
  initialize?: boolean;
  permission_group: string;
  permission: string;
  value: boolean;
  selectedPermission: { id: string };
};
const button_state: initial_button_state = {
  loby: {
    // mute_video: false,
    // mute_audio: false,
    // switch_video_on_off: false,
    // switch_audio_on_off: false,
    // switch_space: false,
    show_settings_button_loby: false,
    show_online_people_loby: false,
    override_join_now: false,
  },
};

function button_reducer(state: initial_button_state, action: actions) {
  let newState: initial_button_state = state;

  if (action.initialize) {
    return { ...action.initialState };
  }
  switch (action.permission_group) {
    case "loby":
      if (action.permission == "all") {
        newState = {
          ...state,
          loby: {
            // mute_video: action.value,
            // mute_audio: action.value,
            // switch_space: action.value,
            // switch_video_on_off: action.value,
            // switch_audio_on_off: action.value,
            show_settings_button_loby: action.value,
            show_online_people_loby: action.value,
            override_join_now: action.value,
          },
        };
      } else {
        newState = {
          ...state,
          loby: {
            ...state.loby,
            [action.permission]: action.value,
          },
        };
      }
      break;

    default:
      break;
  }
  if (action.permission == "all") {
    console.log("all permission");
    permissionChangefun(
      action.selectedPermission.id,
      newState[action.permission_group]
    );
    console.log(state[action.permission_group], "permission_group");
  } else {
    permissionChangefun(action.selectedPermission.id, {
      [action.permission]: action.value,
    });
  }
  return newState;
}

const LobbyPermissions = ({ selectedPermission }) => {
  const [state, dispatch] = useReducer(button_reducer, button_state);
  const theme = useSelector((state) => state.theme.themeData);

  const [hover, sethover] = useState("");
  useEffect(() => {
    dispatch({
      initialize: true,
      initialState: {
        loby: {
          // mute_video: selectedPermission.permissions.mute_video,
          // mute_audio: selectedPermission.permissions.mute_audio,
          // switch_space: selectedPermission.permissions.switch_space,
          // switch_video_on_off: selectedPermission.permissions.switch_video_on_off,
          // switch_audio_on_off: selectedPermission.permissions.switch_audio_on_off,
          show_settings_button_loby:
            selectedPermission.permissions.show_settings_button_loby,
          show_online_people_loby:
            selectedPermission.permissions.show_online_people_loby,
          override_join_now: selectedPermission.permissions.override_join_now,
        },
      },
      permission_group: "",
      permission: "",
      value: false,
      selectedPermission: {
        id: "",
      },
    });
  }, [selectedPermission.permissions]);

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={12}
        lg={4}
        sx={{
          marginTop: "-16px",
          // marginBottom: "-16px",
        }}
      >
        {/* <div
          style={{
            borderRight: "2px solid #143F63",
            paddingLeft: "15px",
            marginTop: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
              backgroundColor: hover == "Camera" ? "#143F63" : "",
              paddingLeft: "15px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("Camera")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "loby",
                permission: "mute_video",
                value: !state.loby.mute_video,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img
                src="/assets/permissions/can_switch_video_on_off.svg"
                alt=""
              />
              <p
                style={{
                  color: "#88A1AB",
                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Camera
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  hover={hover == "Camera" ? true : false}
                  sx={{ marginRight: "25px" }}
                  checked={state.loby.mute_video}
                  onClick={() =>
                    dispatch({
                      permission_group: "loby",
                      permission: "mute_video",
                      value: !state.loby.mute_video,
                      selectedPermission,
                    })
                  }
                />
              }
              labelPlacement="start"
              label={
                <span
                  style={{
                    color: "#88A1AB",
                    fontSize: "14px",
                    fontFamily: "URW DIN REGULAR",
                  }}
                >
                </span>
              }
            />
          </div>
        </div>
        <div
          style={{
            borderRight: "2px solid #143F63",
            paddingLeft: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
              backgroundColor:
                hover == "Start with camera muted" ? "#143F63" : "",
              paddingLeft: "15px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("Start with camera muted")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "loby",
                permission: "switch_video_on_off",
                value: !state.loby.switch_video_on_off,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/mute_video.svg" alt="" />
              <p
                style={{
                  color: "#88A1AB",
                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Start with camera muted
              </p>
            </div>

            <FormControlLabel
              control={
                <IOSSwitch
                  hover={hover == "Start with camera muted" ? true : false}
                  sx={{ marginRight: "25px" }}
                  checked={state.loby.switch_video_on_off}
                  onClick={() =>
                    dispatch({
                      permission_group: "loby",
                      permission: "switch_video_on_off",
                      value: !state.loby.switch_video_on_off,
                      selectedPermission,
                    })
                  }
                />
              }
              labelPlacement="start"
              label={
                <span
                  style={{
                    color: "#88A1AB",
                    fontSize: "14px",
                    fontFamily: "URW DIN REGULAR",
                  }}
                >
                </span>
              }
            />
          </div>
        </div> */}
        <div
          style={{
            borderRight: `2px solid ${theme?.permissions?.border}`,

            paddingLeft: "15px",
            margin: "15px 0px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
              backgroundColor: hover == "Settings" ? theme?.permissions?.hover : "",
              paddingLeft: "15px",
              borderRadius: "4px",
              cursor: "pointer",

            }}
            onMouseEnter={() => sethover("Settings")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "loby",
                permission: "show_settings_button_loby",
                value: !state.loby.show_settings_button_loby,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/settings.svg" alt="" />
              <p
                style={{
                  color: "#88A1AB",
                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Settings
              </p>
            </div>

            <FormControlLabel
              control={
                <IOSSwitch
                theme={theme}

                  sx={{ marginRight: "25px" }}
                  checked={state.loby.show_settings_button_loby}
                  onClick={() =>
                    dispatch({
                      permission_group: "loby",
                      permission: "show_settings_button_loby",
                      value: !state.loby.show_settings_button_loby,
                      selectedPermission,
                    })
                  }
                />
              }
              labelPlacement="start"
              label={
                <span
                  style={{
                    color: "#88A1AB",
                    fontSize: "14px",
                    fontFamily: "URW DIN REGULAR",
                  }}
                >
                  {/* Add password */}
                </span>
              }
            />
          </div>
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={4}
        sx={{
          marginTop: "-16px",
          //  marginBottom: "-16px"
        }}
      >
        <div
          style={{
            borderRight: `2px solid ${theme?.permissions?.border}`,

            paddingLeft: "15px",
            marginTop: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
              backgroundColor: hover == "Switch audio on off" ? theme?.permissions?.hover : "",
              paddingLeft: "15px",
              borderRadius: "4px",
              cursor: "pointer",

            }}
            onMouseEnter={() => sethover("Switch audio on off")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "loby",
                permission: "show_online_people_loby",
                value: !state.loby.show_online_people_loby,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/view_as.svg" alt="" />
              <p
                style={{
                  color: "#88A1AB",
                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Show online people
              </p>
            </div>
            <FormControlLabel
              control={
                <IOSSwitch
                theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.loby.show_online_people_loby}
                  onClick={() =>
                    dispatch({
                      permission_group: "loby",
                      permission: "show_online_people_loby",
                      value: !state.loby.show_online_people_loby,
                      selectedPermission,
                    })
                  }
                />
              }
              labelPlacement="start"
              label={
                <span
                  style={{
                    color: "#88A1AB",
                    fontSize: "14px",
                    fontFamily: "URW DIN REGULAR",
                  }}
                >
                  {/* Add password */}
                </span>
              }
            />
          </div>
        </div>
        {/* <div
          style={{
            borderRight: "2px solid #143F63",
            paddingLeft: "15px",
            paddingBottom: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
              backgroundColor:
                hover == "Start with microphone muted" ? "#143F63" : "",
              paddingLeft: "15px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("Start with microphone muted")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "loby",
                permission: "switch_audio_on_off",
                value: !state.loby.switch_audio_on_off,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/mute_audio.svg" alt="" />
              <p
                style={{
                  color: "#88A1AB",
                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Start with microphone muted
              </p>
            </div>

            <FormControlLabel
              control={
                <IOSSwitch
                  hover={hover == "Switch audio on off" ? true : false}
                  sx={{ marginRight: "25px" }}
                  checked={state.loby.switch_audio_on_off}
                  onClick={() =>
                    dispatch({
                      permission_group: "loby",
                      permission: "switch_audio_on_off",
                      value: !state.loby.switch_audio_on_off,
                      selectedPermission,
                    })
                  }
                />
              }
              labelPlacement="start"
              label={
                <span
                  style={{
                    color: "#88A1AB",
                    fontSize: "14px",
                    fontFamily: "URW DIN REGULAR",
                  }}
                >
                </span>
              }
            />
          </div>
        </div> */}
      </Grid>

      <Grid
        item
        xs={12}
        md={12}
        lg={4}
        sx={{
          marginTop: "-16px",
          //  marginBottom: "-16px"
        }}
      >
        {/* <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "30px",
            marginTop: "15px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img
              src="/assets/permissions/can_switch_breakout_space.svg"
              alt=""
            />
            <p
              style={{
                color: "#88A1AB",
                fontSize: "14px",
                fontFamily: "URW DIN REGULAR",
                marginLeft: "12px",
              }}
            >
              Override Join Now
            </p>
          </div>

          <FormControlLabel
            onChange={() => {}}
            control={
              <IOSSwitch
                sx={{ marginRight: "36px" }}
              />
            }
            labelPlacement="start"
            label={
              <span
                style={{
                  color: "#88A1AB",
                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                }}
              >
              </span>
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "30px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img src="/assets/permissions/view_as.svg" alt="" />
            <p
              style={{
                color: "#88A1AB",
                fontSize: "14px",
                fontFamily: "URW DIN REGULAR",
                marginLeft: "12px",
              }}
            >
              Show online people
            </p>
          </div>

          <FormControlLabel
            onChange={() => {}}
            control={
              <IOSSwitch
                sx={{ marginRight: "36px" }}
              />
            }
            labelPlacement="start"
            label={
              <span
                style={{
                  color: "#88A1AB",
                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                }}
              >
              </span>
            }
          />
        </div> */}

        {/* <div
          style={{
            // borderRight: "2px solid #143F63",
            paddingLeft: "15px",
            marginTop: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
              backgroundColor: hover == "Override Join Now" ? theme?.permissions?.hover : "",
              paddingLeft: "15px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("Override Join Now")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "loby",
                permission: "override_join_now",
                value: !state.loby.override_join_now,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/view_as.svg" alt="" />
              <p
                style={{
                  color: "#88A1AB",
                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Override Join Now
              </p>
            </div>
            <FormControlLabel
              control={
                <IOSSwitch
                theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.loby.override_join_now}
                  onClick={() =>
                    dispatch({
                      permission_group: "loby",
                      permission: "override_join_now",
                      value: !state.loby.override_join_now,
                      selectedPermission,
                    })
                  }
                />
              }
              labelPlacement="start"
              label={
                <span
                  style={{
                    color: "#88A1AB",
                    fontSize: "14px",
                    fontFamily: "URW DIN REGULAR",
                  }}
                >
                </span>
              }
            />
          </div>
        </div> */}
      </Grid>
    </Grid>
  );
};

export default LobbyPermissions;
