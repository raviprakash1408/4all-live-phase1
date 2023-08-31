import React, { useReducer, useEffect, useState } from "react";
import IOSSwitch from "../CustomSwitch";
import { Grid, FormControlLabel } from "@mui/material";
import { AxiosLocal } from "../../../utilities/axiosUtils.ts";
import { useSelector } from "react-redux";
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

// initial state

type initial_button_state = {
  global: {
    do_not_disturb: boolean;
    // control_volume_of_remote_user: boolean;
    switch_space: boolean;
    drag_horizontal_layout: boolean;
    drag_vertial_layout: boolean;
    share_space: boolean;
    control_panel: boolean;

  };
  toolbar: {
    share_screen: boolean;
    hang_up: boolean;
    raise_hand: boolean;
    end_event: boolean;
    show_three_dot_option: boolean;
    leave_event: boolean;
    change_horizontal_layout: boolean;
    change_vertical_layout: boolean;
    change_tile_layout: boolean;
    switch_video_on_off: boolean;
    switch_audio_on_off: boolean;
    mute_video: boolean;
    mute_audio: boolean;
    chat_on_space: boolean;
    manage_devices: boolean;
    share_video: boolean;

  };
  more_actions: {
    settings: boolean;
    performance_settings: boolean;
    director_mode: boolean;
    start_connectivity_test: boolean;
    view_shortcuts: boolean;
    share_audio: boolean;
    view_full_screen: boolean;
  };
  user_actions: {
    switch_role: boolean;
    view_as: boolean;
    system_readiness_check: boolean;
    show_toolbar_menu: boolean;
    show_audio_and_video_button: boolean;
    show_connectivity_test: boolean;
    show_profile: boolean;
    remove_user: boolean;
    show_three_dot_option: boolean;
    kick_user: boolean;
    request_unmute_video: boolean;
    request_unmute_audio: boolean;
    move_to_sub_spaces: boolean;
    control_volume_of_remote_user: boolean;
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
  global: {
    do_not_disturb: false,
    // control_volume_of_remote_user: false,
    switch_space: false,
    drag_horizontal_layout: false,
    drag_vertial_layout: false,
    share_space: false,
    control_panel: false,

  },
  toolbar: {
    share_screen: false,
    hang_up: false,
    raise_hand: false,
    end_event: false,
    show_three_dot_option: false,
    leave_event: false,
    change_horizontal_layout: false,
    change_vertical_layout: false,
    change_tile_layout: false,
    switch_video_on_off: false,
    switch_audio_on_off: false,
    mute_audio: false,
    mute_video: false,
    chat_on_space: false,
    manage_devices: false,
    share_video: false,

  },
  more_actions: {
    settings: false,
    performance_settings: false,
    director_mode: false,
    start_connectivity_test: false,
    view_shortcuts: false,
    share_audio: false,
    view_full_screen: false,
  },
  user_actions: {
    switch_role: false,
    view_as: false,
    system_readiness_check: false,
    show_toolbar_menu: false,
    show_audio_and_video_button: false,
    show_connectivity_test: false,
    show_profile: false,
    remove_user: false,
    show_three_dot_option: false,
    kick_user: false,
    request_unmute_video: false,
    request_unmute_audio: false,
    move_to_sub_spaces: false,
    control_volume_of_remote_user: false,
  },
};

function button_reducer(state: initial_button_state, action: actions) {
  let newState: initial_button_state = state;

  if (action.initialize) {
    return { ...action.initialState };
  }
  console.log(action.permission_group, state.more_actions, "PermissionGroup");
  switch (action.permission_group) {
    case "global":
      if (action.permission == "all") {
        newState = {
          ...state,
          global: {
            do_not_disturb: action.value,
            // control_volume_of_remote_user: action.value,
            switch_space: action.value,
            drag_horizontal_layout: action.value,
            drag_vertial_layout: action.value,
            share_space: action.value,
            control_panel: action.value,

          },
        };
      } else {
        newState = {
          ...state,
          global: {
            ...state.global,
            [action.permission]: action.value,
          },
        };
      }
      break;

    case "toolbar":
      if (action.permission == "all") {
        newState = {
          ...state,
          toolbar: {
            share_screen: action.value,
            hang_up: action.value,
            raise_hand: action.value,
            end_event: action.value,
            show_three_dot_option: action.value,
            leave_event: action.value,
            change_horizontal_layout: action.value,
            change_vertical_layout: action.value,
            change_tile_layout: action.value,
            switch_video_on_off: action.value,
            switch_audio_on_off: action.value,
            mute_audio: action.value,
            mute_video: action.value,
            chat_on_space: action.value,
            manage_devices: action.value,
            share_video: action.value,

          },
        };
      } else {
        newState = {
          ...state,
          toolbar: {
            ...state.toolbar,
            [action.permission]: action.value,
          },
        };
      }
      break;

    case "more_actions":
      if (action.permission == "all") {
        newState = {
          ...state,
          more_actions: {
            settings: action.value,
            performance_settings: action.value,
            director_mode: action.value,
            start_connectivity_test: action.value,
            view_shortcuts: action.value,
            share_audio: action.value,
            view_full_screen: action.value,
          },
        };
      } else {
        newState = {
          ...state,
          more_actions: {
            ...state.more_actions,
            [action.permission]: action.value,
          },
        };
      }
      break;

    case "user_actions":
      if (action.permission == "all") {
        newState = {
          ...state,
          user_actions: {
            switch_role: action.value,
            view_as: action.value,
            system_readiness_check: action.value,
            show_toolbar_menu: action.value,
            show_audio_and_video_button: action.value,
            show_connectivity_test: action.value,
            show_profile: action.value,
            remove_user: action.value,
            show_three_dot_option: action.value,
            kick_user: action.value,
            request_unmute_video: action.value,
            request_unmute_audio: action.value,
            move_to_sub_spaces: action.value,
            control_volume_of_remote_user: action.value,
          },
        };
      } else {
        newState = {
          ...state,
          user_actions: {
            ...state.user_actions,
            [action.permission]: action.value,
          },
        };
      }
      break;

    default:
      break;
  }
  if (action.permission == "all") {
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

const SpacePermission = ({ selectedPermission }) => {
  const [state, dispatch] = useReducer(button_reducer, button_state);
  const theme = useSelector((state) => state.theme.themeData);
  console.log(selectedPermission, "selectedPermission");
  

  const [hover, sethover] = useState("");

  useEffect(() => {
    dispatch({
      initialize: true,
      initialState: {
        global: {
          do_not_disturb: selectedPermission.permissions.do_not_disturb,
          // control_volume_of_remote_user:
          //   selectedPermission.permissions.control_volume_of_remote_user,
          switch_space: selectedPermission.permissions.switch_space,
          drag_horizontal_layout:
            selectedPermission.permissions.drag_horizontal_layout,
          drag_vertial_layout:
            selectedPermission.permissions.drag_vertial_layout,
          share_space: selectedPermission.permissions.share_space,
          control_panel: selectedPermission.permissions.control_panel,

        },
        toolbar: {
          share_screen: selectedPermission.permissions.share_screen,
          hang_up: selectedPermission.permissions.hang_up,
          raise_hand: selectedPermission.permissions.raise_hand,
          end_event: selectedPermission.permissions.end_event,
          show_three_dot_option:
            selectedPermission.permissions.show_three_dot_option,
          leave_event: selectedPermission.permissions.leave_event,
          change_horizontal_layout:
            selectedPermission.permissions.change_horizontal_layout,
          change_vertical_layout:
            selectedPermission.permissions.change_vertical_layout,
          change_tile_layout: selectedPermission.permissions.change_tile_layout,
          switch_video_on_off:
            selectedPermission.permissions.switch_video_on_off,
          switch_audio_on_off:
            selectedPermission.permissions.switch_audio_on_off,
          mute_audio: selectedPermission.permissions.mute_audio,
          mute_video: selectedPermission.permissions.mute_video,
          chat_on_space: selectedPermission.permissions.chat_on_space,
          manage_devices: selectedPermission.permissions.manage_devices,
          share_video: selectedPermission.permissions.share_video,


        },
        more_actions: {
          settings: selectedPermission.permissions.settings,
          performance_settings:
            selectedPermission.permissions.performance_settings,
          director_mode: selectedPermission.permissions.director_mode,
          start_connectivity_test:
            selectedPermission.permissions.start_connectivity_test,
          view_shortcuts: selectedPermission.permissions.view_shortcuts,
          share_audio: selectedPermission.permissions.share_audio,
          view_full_screen: selectedPermission.permissions.view_full_screen,
        },
        user_actions: {
          switch_role: selectedPermission.permissions.switch_role,
          view_as: selectedPermission.permissions.view_as,
          system_readiness_check:
            selectedPermission.permissions.system_readiness_check,
          show_toolbar_menu: selectedPermission.permissions.show_toolbar_menu,
          show_audio_and_video_button:
            selectedPermission.permissions.show_audio_and_video_button,
          show_connectivity_test:
            selectedPermission.permissions.show_connectivity_test,
          show_profile: selectedPermission.permissions.show_profile,
          remove_user: selectedPermission.permissions.remove_user,
          show_three_dot_option:
            selectedPermission.permissions.show_three_dot_option,
          kick_user: selectedPermission.permissions.kick_user,
          request_unmute_video:
            selectedPermission.permissions.request_unmute_video,
          request_unmute_audio:
            selectedPermission.permissions.request_unmute_audio,
          move_to_sub_spaces: selectedPermission.permissions.move_to_sub_spaces,
          control_volume_of_remote_user:
            selectedPermission.permissions.control_volume_of_remote_user,
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
          marginBottom: "-16px",
        }}
      >
        <div
          style={{
            borderRight: `2px solid ${theme?.permissions?.border}`,
            borderTop: `2px solid ${theme?.permissions?.border}`,
          }}
        >
          <div
            style={{
              backgroundColor:
                hover == "global" ? theme?.permissions?.hover : "",

              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "30px",
              marginRight: "15px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("global")}
            onMouseLeave={() => sethover("")}
          >
            <div style={{ display: "flex" }}>
              <p
                style={{
                  color: theme?.permissions?.color,

                  fontSize: "16px",
                  fontFamily: "URW DIN",
                }}
              >
                Global
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={
                    state.global.do_not_disturb ||
                    // state.global.control_volume_of_remote_user ||
                    state.global.switch_space ||
                    state.global.drag_horizontal_layout ||
                    state.global.drag_vertial_layout ||
                    state.global.share_space ||
                    state.global.control_panel
                  }
                  onChange={(event) => {
                    console.log(event.target.checked);

                    dispatch({
                      permission_group: "global",
                      permission: "all",
                      value: event?.target.checked,
                      selectedPermission,
                    });
                  }}
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

        <div
          style={{
            borderRight: `2px solid ${theme?.permissions?.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
              backgroundColor:
                hover == "controlPanel" ? theme?.permissions?.hover : "",
              paddingLeft: "30px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("controlPanel")}
            onMouseLeave={() => sethover("")}
            onClick={() => {
              dispatch({
                permission_group: "global",
                permission: "control_panel",
                value: !state.global.control_panel,
                selectedPermission,
              });
              // dispatch({
              //   permission_group: "toolbar",
              //   permission: "show_three_dot_option",
              //   value: !state.more_actions.control_panel
              //     ? true
              //     : state.toolbar.show_three_dot_option,
              //   selectedPermission,
              // });
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/control_panel.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Manage Hidden Users
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.global.control_panel}
                  onClick={() =>
                    dispatch({
                      permission_group: "global",
                      permission: "control_panel",
                      value: !state.global.control_panel,
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
            borderRight:`2px solid ${theme?.permissions?.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
              backgroundColor:
              hover == "Show user action button" ? theme?.permissions?.hover  : "",

              paddingLeft: "30px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("Show user action button")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "global",
                permission: "do_not_disturb",
                value: !state.global.do_not_disturb,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img
                src="/assets/permissions/three_dot_option_remote.svg"
                alt=""
              />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Do not Distrub
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                theme={theme}

                  sx={{ marginRight: "25px" }}
                  checked={state.global.do_not_disturb}
                  onClick={() =>
                    dispatch({
                      permission_group: "global",
                      permission: "do_not_disturb",
                      value: !state.global.do_not_disturb,
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
            paddingLeft: "15px",
            borderRight: `2px solid ${theme?.permissions?.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
              backgroundColor:
                hover == "Share space" ? theme?.permissions?.hover : "",
              paddingLeft: "15px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("Share space")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "global",
                permission: "share_space",
                value: !state.global.share_space,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img
                src="/assets/admin/link.svg"
                alt=""
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(74%) sepia(10%) saturate(606%) hue-rotate(151deg) brightness(84%) contrast(84%)",
                }}
              />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Share space
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.global.share_space}
                  onClick={() =>
                    dispatch({
                      permission_group: "global",
                      permission: "share_space",
                      value: !state.global.share_space,
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
        sx={{ marginTop: "-16px", marginBottom: "-16px" }}
      >
        <div
          style={{
            borderRight: `2px solid ${theme?.permissions?.border}`,
            borderTop: `2px solid ${theme?.permissions?.border}`,
            paddingTop: "52px",
            paddingLeft: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Switch space" ? theme?.permissions?.hover : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Switch space")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "global",
                permission: "switch_space",
                value: !state.global.switch_space,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img
                src="/assets/permissions/can_switch_breakout_space.svg"
                alt=""
              />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Switch space
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.global.switch_space}
                  onClick={() =>
                    dispatch({
                      permission_group: "global",
                      permission: "switch_space",
                      value: !state.global.switch_space,
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

        <div
          style={{
            borderRight: `2px solid ${theme?.permissions?.border}`,
            paddingLeft: "15px",
            paddingBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Drag horizontal layout"
                  ? theme?.permissions?.hover
                  : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Drag horizontal layout")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "global",
                permission: "drag_horizontal_layout",
                value: !state.global.drag_horizontal_layout,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img
                src="/assets/permissions/drag_horizontal_layout.svg"
                alt=""
              />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Drag horizontal layout
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.global.drag_horizontal_layout}
                  onClick={() =>
                    dispatch({
                      permission_group: "global",
                      permission: "drag_horizontal_layout",
                      value: !state.global.drag_horizontal_layout,
                      selectedPermission,
                    })
                  }
                />
              }
              labelPlacement="start"
              label={
                <span
                  style={{
                    color: theme?.common?.color3,

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
        sx={{ marginTop: "-16px", marginBottom: "-16px" }}
      >
        <div
          style={{
            borderTop: `2px solid ${theme?.permissions?.border}`,
            // borderRight: `2px solid ${theme?.permissions?.border}`,
            paddingTop: "52px",
            paddingLeft: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Drag vertical layout"
                  ? theme?.permissions?.hover
                  : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Drag vertical layout")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "global",
                permission: "drag_vertial_layout",
                value: !state.global.drag_vertial_layout,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/drag_vertical_layout.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Drag vertical layout
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.global.drag_vertial_layout}
                  onClick={() =>
                    dispatch({
                      permission_group: "global",
                      permission: "drag_vertial_layout",
                      value: !state.global.drag_vertial_layout,
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
      {/* Toolbar */}
      <Grid
        item
        xs={12}
        md={12}
        lg={4}
        sx={{
          marginTop: "-16px",
          marginBottom: "-16px",
          borderRight: `2px solid ${theme?.permissions?.border}`,
        }}
      >
        <div
          style={{
            paddingTop: "50px",
          }}
        >
          <div
            style={{
              backgroundColor:
                hover == "Toolbar" ? theme?.permissions?.hover : "",
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "30px",
              marginRight: "15px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("Toolbar")}
            onMouseLeave={() => sethover("")}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p
                style={{
                  color: theme?.permissions?.color,

                  fontSize: "16px",
                  fontFamily: "URW DIN",
                }}
              >
                Toolbar
              </p>
            </div>

            <FormControlLabel
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={
                    state.toolbar.share_screen ||
                    state.toolbar.hang_up ||
                    state.toolbar.raise_hand ||
                    state.toolbar.end_event ||
                    state.toolbar.show_three_dot_option ||
                    state.toolbar.leave_event ||
                    state.toolbar.change_horizontal_layout ||
                    state.toolbar.change_vertical_layout ||
                    state.toolbar.change_tile_layout ||
                    state.toolbar.switch_video_on_off ||
                    state.toolbar.switch_audio_on_off ||
                    state.toolbar.mute_audio ||
                    state.toolbar.mute_video ||
                    state.toolbar.chat_on_space ||
                    state.toolbar.manage_devices ||
                    state.toolbar.share_video
                  }
                  onChange={(event) => {
                    console.log(event.target.checked);

                    dispatch({
                      permission_group: "toolbar",
                      permission: "all",
                      value: event?.target.checked,
                      selectedPermission,
                    });
                  }}
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
            display: "flex",
            justifyContent: "space-between",
            borderRight: "2px solid #143F63",
            paddingLeft: "30px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img src="/assets/permissions/can_switch_video_on_off.svg" alt="" />
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
                sx={{ marginRight: "25px" }}
                checked={state.toolbar.switch_video_on_off}
                onClick={() =>
                  dispatch({
                    permission_group: "toolbar",
                    permission: "switch_video_on_off",
                    value: !state.toolbar.switch_video_on_off,
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
        </div> */}
        {selectedPermission.title != "Viewer" && (
          <>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: "15px",
                  backgroundColor:
                    hover == "Camera" ? theme?.permissions?.hover : "",
                  paddingLeft: "30px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onMouseEnter={() => sethover("Camera")}
                onMouseLeave={() => sethover("")}
                onClick={() =>
                  dispatch({
                    permission_group: "toolbar",
                    permission: "mute_video",
                    value: !state.toolbar.mute_video,
                    selectedPermission,
                  })
                }
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <img
                    src="/assets/permissions/can_switch_video_on_off.svg"
                    alt=""
                  />
                  <p
                    style={{
                      color: theme?.common?.color3,

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
                      theme={theme}
                      sx={{ marginRight: "25px" }}
                      checked={state.toolbar.mute_video}
                      onClick={() =>
                        dispatch({
                          permission_group: "toolbar",
                          permission: "mute_video",
                          value: !state.toolbar.mute_video,
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
                    ></span>
                  }
                />
              </div>
            </div>

            {/* <div
              style={{
                borderRight: `2px solid ${theme?.permissions?.border}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: "15px",
                  backgroundColor:
                    hover == "Start with camera muted" ? theme?.permissions?.hover : "",
                  paddingLeft: "30px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onMouseEnter={() => sethover("Start with camera muted")}
                onMouseLeave={() => sethover("")}
                onClick={() => {
                  dispatch({
                    permission_group: "toolbar",
                    permission: "switch_video_on_off",
                    value: !state.toolbar.switch_video_on_off,
                    selectedPermission,
                  });
                  // dispatch({
                  //   permission_group: "toolbar",
                  //   permission: "mute_video",
                  //   value: !state.toolbar.switch_video_on_off ? true : false,
                  //   selectedPermission,
                  // });
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <img src="/assets/permissions/mute_video.svg" alt="" />
                  <p
                    style={{
                      color: theme?.common?.color3,

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
                    theme={theme}

                      sx={{ marginRight: "25px" }}
                      checked={state.toolbar.switch_video_on_off}
                      onClick={() => {
                        dispatch({
                          permission_group: "toolbar",
                          permission: "switch_video_on_off",
                          value: !state.toolbar.switch_video_on_off,
                          selectedPermission,
                        });
                        // dispatch({
                        //   permission_group: "toolbar",
                        //   permission: "mute_video",
                        //   value: !state.toolbar.switch_video_on_off ? true : false,
                        //   selectedPermission,
                        // });
                      }}
                    />
                  }
                  labelPlacement="start"
                  label={
                    <span
                      style={{
                        color: theme?.common?.color3,

                        fontSize: "14px",
                        fontFamily: "URW DIN REGULAR",
                      }}
                    >
                    </span>
                  }
                />
              </div>
            </div> */}
          </>
        )}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
              backgroundColor:
                hover == "Share screen" ? theme?.permissions?.hover : "",
              paddingLeft: "30px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("Share screen")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "toolbar",
                permission: "share_screen",
                value: !state.toolbar.share_screen,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/share_screen.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Share screen
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.toolbar.share_screen}
                  onClick={() =>
                    dispatch({
                      permission_group: "toolbar",
                      permission: "share_screen",
                      value: !state.toolbar.share_screen,
                      selectedPermission,
                    })
                  }
                />
              }
              labelPlacement="start"
              label={
                <span
                  style={{
                    color: theme?.common?.color3,

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
        <div
          style={{
            paddingLeft: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Manage devices" ? theme?.permissions?.hover : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Manage devices")}
            onMouseLeave={() => sethover("")}
            onClick={() => {
              dispatch({
                permission_group: "toolbar",
                permission: "manage_devices",
                value: !state.toolbar.manage_devices,
                selectedPermission,
              });
              // dispatch({
              //   permission_group: "toolbar",
              //   permission: "show_three_dot_option",
              //   value: !state.more_actions.manage_devices
              //     ? true
              //     : state.toolbar.show_three_dot_option,
              //   selectedPermission,
              // });
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/teleprompter.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Share devices
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.toolbar.manage_devices}
                  onClick={() =>
                    dispatch({
                      permission_group: "toolbar",
                      permission: "manage_devices",
                      value: !state.toolbar.manage_devices,
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
            borderRight: `2px solid ${theme?.permissions?.border}`,
            paddingLeft: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Show three dot option" ? theme?.permissions?.hover : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Show three dot option")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "toolbar",
                permission: "show_three_dot_option",
                value: !state.toolbar.show_three_dot_option,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img
                src="/assets/permissions/show_three_dot_option_remote_users.svg"
                alt=""
              />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Show three dot option
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                theme={theme}

                  sx={{ marginRight: "25px" }}
                  checked={state.toolbar.show_three_dot_option}
                  onClick={() =>
                    dispatch({
                      permission_group: "toolbar",
                      permission: "show_three_dot_option",
                      value: !state.toolbar.show_three_dot_option,
                      selectedPermission,
                    })
                  }
                />
              }
              labelPlacement="start"
              label={
                <span
                  style={{
                    color: theme?.common?.color3,

                    fontSize: "14px",
                    fontFamily: "URW DIN REGULAR",
                  }}
                >
                </span>
              }
            />
          </div>
        </div> */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
              backgroundColor:
                hover == "Raise hand" ? theme?.permissions?.hover : "",
              paddingLeft: "30px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("Raise hand")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "toolbar",
                permission: "raise_hand",
                value: !state.toolbar.raise_hand,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/raise_hand.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Raise hand
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.toolbar.raise_hand}
                  onClick={() =>
                    dispatch({
                      permission_group: "toolbar",
                      permission: "raise_hand",
                      value: !state.toolbar.raise_hand,
                      selectedPermission,
                    })
                  }
                />
              }
              labelPlacement="start"
              label={
                <span
                  style={{
                    color: theme?.common?.color3,

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
        sx={{ marginTop: "-16px", marginBottom: "-16px" }}
      >
        {selectedPermission.title != "Viewer" && (
          <>
            <div
              style={{
                borderRight: `2px solid ${theme?.permissions?.border}`,

                paddingTop: "102px",
                paddingLeft: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: "15px",
                  backgroundColor:
                    hover == "Microphone" ? theme?.permissions?.hover : "",
                  paddingLeft: "15px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onMouseEnter={() => sethover("Microphone")}
                onMouseLeave={() => sethover("")}
                onClick={() =>
                  dispatch({
                    permission_group: "toolbar",
                    permission: "mute_audio",
                    value: !state.toolbar.mute_audio,
                    selectedPermission,
                  })
                }
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <img
                    src="/assets/permissions/can_switch_audio_on_off.svg"
                    alt=""
                  />
                  <p
                    style={{
                      color: theme?.common?.color3,

                      fontSize: "14px",
                      fontFamily: "URW DIN REGULAR",
                      marginLeft: "12px",
                    }}
                  >
                    Microphone
                  </p>
                </div>

                <FormControlLabel
                  onChange={() => {}}
                  control={
                    <IOSSwitch
                      theme={theme}
                      sx={{ marginRight: "25px" }}
                      // checked={state.toolbar.switch_audio_on_off}
                      // onClick={() =>
                      //   dispatch({
                      //     permission_group: "toolbar",
                      //     permission: "switch_audio_on_off",
                      //     value: !state.toolbar.switch_audio_on_off,
                      //     selectedPermission,
                      //   })
                      // }
                      checked={state.toolbar.mute_audio}
                      onClick={() =>
                        dispatch({
                          permission_group: "toolbar",
                          permission: "mute_audio",
                          value: !state.toolbar.mute_audio,
                          selectedPermission,
                        })
                      }
                    />
                  }
                  labelPlacement="start"
                  label={
                    <span
                      style={{
                        color: theme?.common?.color3,

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
                borderRight:`2px solid ${theme?.permissions?.border}`,

                paddingLeft: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: "15px",
                  backgroundColor:
                    hover == "Start with microphone muted" ? theme?.permissions?.hover : "",
                  paddingLeft: "15px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onMouseEnter={() => sethover("Start with microphone muted")}
                onMouseLeave={() => sethover("")}
                onClick={() => {
                  dispatch({
                    permission_group: "toolbar",
                    permission: "switch_audio_on_off",
                    value: !state.toolbar.switch_audio_on_off,
                    selectedPermission,
                  });
                  // dispatch({
                  //   permission_group: "toolbar",
                  //   permission: "mute_audio",
                  //   value: !state.toolbar.switch_audio_on_off ? true : false,
                  //   selectedPermission,
                  // });
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <img src="/assets/permissions/mute_audio.svg" alt="" />
                  <p
                    style={{
                      color: theme?.common?.color3,

                      fontSize: "14px",
                      fontFamily: "URW DIN REGULAR",
                      marginLeft: "12px",
                    }}
                  >
                    Start with microphone muted
                  </p>
                </div>

                <FormControlLabel
                  onChange={() => {}}
                  control={
                    <IOSSwitch
                    theme={theme}

                      sx={{ marginRight: "25px" }}
                      checked={state.toolbar.switch_audio_on_off}
                      onClick={() => {
                        dispatch({
                          permission_group: "toolbar",
                          permission: "switch_audio_on_off",
                          value: !state.toolbar.switch_audio_on_off,
                          selectedPermission,
                        });
                        // dispatch({
                        //   permission_group: "toolbar",
                        //   permission: "mute_audio",
                        //   value: !state.toolbar.switch_audio_on_off ? true : false,
                        //   selectedPermission,
                        // });
                      }}
                    />
                  }
                  labelPlacement="start"
                  label={
                    <span
                      style={{
                        color: theme?.common?.color3,

                        fontSize: "14px",
                        fontFamily: "URW DIN REGULAR",
                      }}
                    >
                    </span>
                  }
                />
              </div>
            </div> */}
          </>
        )}
        <div
          style={{
            borderRight: `2px solid ${theme?.permissions?.border}`,

            paddingLeft: "15px",
            paddingTop: selectedPermission.title != "Viewer" ? "" : "102px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Change horizontal layout"
                  ? theme?.permissions?.hover
                  : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Change horizontal layout")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "toolbar",
                permission: "change_horizontal_layout",
                value: !state.toolbar.change_horizontal_layout,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/changeHorizontal.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Change horizontal layout
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.toolbar.change_horizontal_layout}
                  onClick={() =>
                    dispatch({
                      permission_group: "toolbar",
                      permission: "change_horizontal_layout",
                      value: !state.toolbar.change_horizontal_layout,
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
        <div
          style={{
            borderRight: `2px solid ${theme?.permissions?.border}`,

            paddingLeft: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Change vertical layout"
                  ? theme?.permissions?.hover
                  : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Change vertical layout")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "toolbar",
                permission: "change_vertical_layout",
                value: !state.toolbar.change_vertical_layout,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img
                src="/assets/permissions/change_vertical_layout.svg"
                alt=""
              />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Change vertical layout
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.toolbar.change_vertical_layout}
                  onClick={() =>
                    dispatch({
                      permission_group: "toolbar",
                      permission: "change_vertical_layout",
                      value: !state.toolbar.change_vertical_layout,
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

        <div
          style={{
            borderRight: `2px solid ${theme?.permissions?.border}`,

            paddingLeft: "15px",
            paddingBottom: "65px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Share video" ? theme?.permissions?.hover : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Share video")}
            onMouseLeave={() => sethover("")}
            onClick={() => {
              dispatch({
                permission_group: "toolbar",
                permission: "share_video",
                value: !state.toolbar.share_video,
                selectedPermission,
              });
              // dispatch({
              //   permission_group: "toolbar",
              //   permission: "show_three_dot_option",
              //   value: !state.more_actions.share_video
              //     ? true
              //     : state.toolbar.show_three_dot_option,
              //   selectedPermission,
              // });
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/share_video.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Share video
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.toolbar.share_video}
                  onClick={() =>
                    dispatch({
                      permission_group: "toolbar",
                      permission: "share_video",
                      value: !state.toolbar.share_video,
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
            display: "flex",
            justifyContent: "space-between",
            borderRight: "2px solid #143F63",
            paddingLeft: "30px",
            paddingBottom: "20px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img src="/assets/permissions/can_switch_audio_on_off.svg" alt="" />
            <p
              style={{
                color: "#88A1AB",
                fontSize: "14px",
                fontFamily: "URW DIN REGULAR",
                marginLeft: "12px",
              }}
            >
              Switch audio
            </p>
          </div>

          <FormControlLabel
            onChange={() => {}}
            control={
              <IOSSwitch
                sx={{ marginRight: "25px" }}
                checked={state.toolbar.switch_audio_on_off}
                onClick={() =>
                  dispatch({
                    permission_group: "toolbar",
                    permission: "switch_audio_on_off",
                    value: !state.toolbar.switch_audio_on_off,
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
        </div> */}
      </Grid>

      <Grid
        item
        xs={12}
        md={12}
        lg={4}
        sx={{ marginTop: "-16px", marginBottom: "-16px" }}
      >
        <div
          style={{
            paddingLeft: "15px",
            paddingTop: "102px",
            // borderRight: `2px solid ${theme?.permissions?.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Change tileview layout"
                  ? theme?.permissions?.hover
                  : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Change tileview layout")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "toolbar",
                permission: "change_tile_layout",
                value: !state.toolbar.change_tile_layout,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/change_layout.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Change tileview layout
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.toolbar.change_tile_layout}
                  onClick={() =>
                    dispatch({
                      permission_group: "toolbar",
                      permission: "change_tile_layout",
                      value: !state.toolbar.change_tile_layout,
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

        <div
          style={{
            paddingLeft: "15px",
            // borderRight: `2px solid ${theme?.permissions?.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
              backgroundColor:
                hover == "End event" ? theme?.permissions?.hover : "",
              paddingLeft: "15px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("End event")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "toolbar",
                permission: "end_event",
                value: !state.toolbar.end_event,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/end_event.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                End event
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.toolbar.end_event}
                  onClick={() =>
                    dispatch({
                      permission_group: "toolbar",
                      permission: "end_event",
                      value: !state.toolbar.end_event,
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

        <div
          style={{
            paddingLeft: "15px",
            // borderRight: `2px solid ${theme?.permissions?.border}`,

            // paddingBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
              backgroundColor:
                hover == "Leave event" ? theme?.permissions?.hover : "",
              paddingLeft: "15px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("Leave event")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "toolbar",
                permission: "leave_event",
                value: !state.toolbar.leave_event,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/leave_event.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Leave event
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.toolbar.leave_event}
                  onClick={() =>
                    dispatch({
                      permission_group: "toolbar",
                      permission: "leave_event",
                      value: !state.toolbar.leave_event,
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

        <div
          style={{
            paddingLeft: "15px",
            paddingBottom: "20px",
            // borderRight: `2px solid ${theme?.permissions?.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
              backgroundColor: hover == "Chat" ? theme?.permissions?.hover : "",
              paddingLeft: "15px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("Chat")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "toolbar",
                permission: "chat_on_space",
                value: !state.toolbar.chat_on_space,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/bottomIcons/chat.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Chat
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.toolbar.chat_on_space}
                  onClick={() =>
                    dispatch({
                      permission_group: "toolbar",
                      permission: "chat_on_space",
                      value: !state.toolbar.chat_on_space,
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
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "30px",
          }}
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
              Mute audio
            </p>
          </div>

          <FormControlLabel
            onChange={() => {}}
            control={
              <IOSSwitch
                sx={{ marginRight: "25px" }}
                checked={state.toolbar.mute_audio}
                onClick={() =>
                  dispatch({
                    permission_group: "toolbar",
                    permission: "mute_audio",
                    value: !state.toolbar.mute_audio,
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
        </div> */}
      </Grid>

      {/* More actions */}
      <Grid
        item
        xs={12}
        md={12}
        lg={4}
        // sx={{
        //   marginTop: "-16px",
        //   marginBottom: "-16px",
        // }}
      >
        <div
          style={{
            borderRight: `2px solid ${theme?.permissions?.border}`,

            // paddingTop: "30px",
          }}
        >
          <div
            style={{
              backgroundColor:
                hover == "More actions" ? theme?.permissions?.hover : "",
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "30px",
              marginRight: "15px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("More actions")}
            onMouseLeave={() => sethover("")}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              onClick={() => {
                dispatch({
                  permission_group: "more_actions",
                  permission: "all",
                  value: !state.more_actions,
                  selectedPermission,
                });
              }}
            >
              <p
                style={{
                  color: theme?.permissions?.color,

                  fontSize: "16px",
                  fontFamily: "URW DIN",
                }}
              >
                More actions
              </p>
            </div>

            <FormControlLabel
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={
                    state.more_actions.settings ||
                    state.more_actions.performance_settings ||
                    state.more_actions.start_connectivity_test ||
                    state.more_actions.view_shortcuts ||
                    state.more_actions.share_audio ||
                    state.more_actions.view_full_screen ||
                    state.more_actions.director_mode
                  }
                  onChange={(event) => {
                    dispatch({
                      permission_group: "more_actions",
                      permission: "all",
                      value: event?.target.checked,
                      selectedPermission,
                    });
                  }}
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

        <div
          style={{
            borderRight: `2px solid ${theme?.permissions?.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
              backgroundColor:
                hover == "Director mode" ? theme?.permissions?.hover : "",
              paddingLeft: "30px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("Director mode")}
            onMouseLeave={() => sethover("")}
            onClick={() => {
              dispatch({
                permission_group: "more_actions",
                permission: "director_mode",
                value: !state.more_actions.director_mode,
                selectedPermission,
              });
              // dispatch({
              //   permission_group: "toolbar",
              //   permission: "show_three_dot_option",
              //   value: !state.more_actions.director_mode
              //     ? true
              //     : state.toolbar.show_three_dot_option,
              //   selectedPermission,
              // });


               window.loginChannel.publish({
                 event: "permission for director_mode",
                 value: state.more_actions.director_mode,
               });
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/directorMode.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Director mode
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.more_actions.director_mode}
                  onClick={() => {
                    dispatch({
                      permission_group: "more_actions",
                      permission: "director_mode",
                      value: !state.more_actions.director_mode,
                      selectedPermission,
                    });
                      window.loginChannel.publish({
                        event: "permission for director_mode",
                        value: state.more_actions.director_mode,
                      });
                  }}
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
            borderRight: `2px solid ${theme?.permissions?.border}`,

            paddingBottom: "19px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
              backgroundColor: hover == "Performance settings" ? theme?.permissions?.hover  : "",
              paddingLeft: "30px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("Performance settings")}
            onMouseLeave={() => sethover("")}
            onClick={() => {
              dispatch({
                permission_group: "more_actions",
                permission: "performance_settings",
                value: !state.more_actions.performance_settings,
                selectedPermission,
              });
              dispatch({
                permission_group: "toolbar",
                permission: "show_three_dot_option",
                value: !state.more_actions.performance_settings
                  ? true
                  : state.toolbar.show_three_dot_option,
                selectedPermission,
              });
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/performance_settings.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Performance settings
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                theme={theme}

                  sx={{ marginRight: "25px" }}
                  checked={state.more_actions.performance_settings}
                  onClick={() =>
                    dispatch({
                      permission_group: "more_actions",
                      permission: "performance_settings",
                      value: !state.more_actions.performance_settings,
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
          marginBottom: "-16px",
          borderRight: `2px solid ${theme?.permissions?.border}`,
        }}
      >
        {/* <div
          style={{
            borderRight: `2px solid ${theme?.permissions?.border}`,

            paddingLeft: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Share audio" ? theme?.permissions?.hover : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Share audio")}
            onMouseLeave={() => sethover("")}
            onClick={() => {
              dispatch({
                permission_group: "more_actions",
                permission: "share_audio",
                value: !state.more_actions.share_audio,
                selectedPermission,
              });
              dispatch({
                permission_group: "toolbar",
                permission: "show_three_dot_option",
                value: !state.more_actions.share_audio
                  ? true
                  : state.toolbar.show_three_dot_option,
                selectedPermission,
              });
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/share_audio.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Share audio
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.more_actions.share_audio}
                  onClick={() =>
                    dispatch({
                      permission_group: "more_actions",
                      permission: "share_audio",
                      value: !state.more_actions.share_audio,
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
            paddingLeft: "15px",
            paddingTop: "72px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "View full screen" ? theme?.permissions?.hover : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("View full screen")}
            onMouseLeave={() => sethover("")}
            onClick={() => {
              dispatch({
                permission_group: "more_actions",
                permission: "view_full_screen",
                value: !state.more_actions.view_full_screen,
                selectedPermission,
              });
              dispatch({
                permission_group: "toolbar",
                permission: "show_three_dot_option",
                value: !state.more_actions.view_full_screen
                  ? true
                  : state.toolbar.show_three_dot_option,
                selectedPermission,
              });
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/bottomIcons/three_dots/fullscreen.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                View full screen
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.more_actions.view_full_screen}
                  onClick={() =>
                    dispatch({
                      permission_group: "more_actions",
                      permission: "view_full_screen",
                      value: !state.more_actions.view_full_screen,
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

      <Grid item xs={12} md={12} lg={4}>
        <div
          style={{
            // borderRight: `2px solid ${theme?.permissions?.border}`,
            paddingTop: "58px",

          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
              backgroundColor:
                hover == "Settings" ? theme?.permissions?.hover : "",
              paddingLeft: "30px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("Settings")}
            onMouseLeave={() => sethover("")}
            onClick={() => {
              dispatch({
                permission_group: "toolbar",
                permission: "show_three_dot_option",
                value: !state.more_actions.settings
                  ? true
                  : state.toolbar.show_three_dot_option,
                selectedPermission,
              });
              dispatch({
                permission_group: "more_actions",
                permission: "settings",
                value: !state.more_actions.settings,
                selectedPermission,
              });
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/settings.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

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
                  checked={state.more_actions.settings}
                  onClick={() =>
                    dispatch({
                      permission_group: "more_actions",
                      permission: "settings",
                      value: !state.more_actions.settings,
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
            paddingLeft: "15px",
            paddingTop: "58px",
            // borderRight: `2px solid ${theme?.permissions?.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "View shortcuts" ? theme?.permissions?.hover : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("View shortcuts")}
            onMouseLeave={() => sethover("")}
            onClick={() => {
              dispatch({
                permission_group: "more_actions",
                permission: "view_shortcuts",
                value: !state.more_actions.view_shortcuts,
                selectedPermission,
              });
              dispatch({
                permission_group: "toolbar",
                permission: "show_three_dot_option",
                value: !state.more_actions.view_shortcuts
                  ? true
                  : state.toolbar.show_three_dot_option,
                selectedPermission,
              });
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/view_shortcuts.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                View shortcuts
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.more_actions.view_shortcuts}
                  onClick={() =>
                    dispatch({
                      permission_group: "more_actions",
                      permission: "view_shortcuts",
                      value: !state.more_actions.view_shortcuts,
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
        {/* <div
          style={{
            paddingLeft: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Start connectity test"
                  ? theme?.permissions?.hover
                  : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Start connectity test")}
            onMouseLeave={() => sethover("")}
            onClick={() => {
              dispatch({
                permission_group: "more_actions",
                permission: "start_connectivity_test",
                value: !state.more_actions.start_connectivity_test,
                selectedPermission,
              });
              dispatch({
                permission_group: "toolbar",
                permission: "show_three_dot_option",
                value: !state.more_actions.start_connectivity_test
                  ? true
                  : state.toolbar.show_three_dot_option,
                selectedPermission,
              });
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/connectivity_test.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Start connectity test
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.more_actions.start_connectivity_test}
                  onClick={() =>
                    dispatch({
                      permission_group: "more_actions",
                      permission: "start_connectivity_test",
                      value: !state.more_actions.start_connectivity_test,
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

      {/* User actions */}
      <Grid
        item
        xs={12}
        md={12}
        lg={4}
        sx={{
          borderRight: `2px solid ${theme?.permissions?.border}`,
        }}
      >
        <div
          style={{
            paddingTop: "50px",
          }}
        >
          <div
            style={{
              backgroundColor:
                hover == "User actions" ? theme?.permissions?.hover : "",
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "30px",
              marginRight: "15px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("User actions")}
            onMouseLeave={() => sethover("")}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p
                style={{
                  color: theme?.permissions?.color,

                  fontSize: "16px",
                  fontFamily: "URW DIN",
                }}
              >
                User actions
              </p>
            </div>

            <FormControlLabel
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={
                    state.user_actions.switch_role ||
                    state.user_actions.view_as ||
                    state.user_actions.system_readiness_check ||
                    state.user_actions.show_toolbar_menu ||
                    state.user_actions.show_audio_and_video_button ||
                    state.user_actions.show_profile ||
                    state.user_actions.remove_user ||
                    state.user_actions.show_three_dot_option ||
                    state.user_actions.kick_user ||
                    state.user_actions.request_unmute_video ||
                    state.user_actions.request_unmute_audio ||
                    state.user_actions.move_to_sub_spaces ||
                    state.user_actions.control_volume_of_remote_user
                  }
                  onChange={(event) => {
                    console.log(event.target.checked);

                    dispatch({
                      permission_group: "user_actions",
                      permission: "all",
                      value: event?.target.checked,
                      selectedPermission,
                    });
                  }}
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
            paddingLeft: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Switch role" ? theme?.permissions?.hover : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Switch role")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "user_actions",
                permission: "switch_role",
                value: !state.user_actions.switch_role,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/switch_role.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Switch role
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.user_actions.switch_role}
                  onClick={() =>
                    dispatch({
                      permission_group: "user_actions",
                      permission: "switch_role",
                      value: !state.user_actions.switch_role,
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
            paddingLeft: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Remove user" ? theme?.permissions?.hover : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Remove user")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "user_actions",
                permission: "remove_user",
                value: !state.user_actions.remove_user,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/remove_user_new.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Remove user
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.user_actions.remove_user}
                  onClick={() =>
                    dispatch({
                      permission_group: "user_actions",
                      permission: "remove_user",
                      value: !state.user_actions.remove_user,
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
            paddingLeft: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "System readiness check"
                  ? theme?.permissions?.hover
                  : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("System readiness check")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "user_actions",
                permission: "system_readiness_check",
                value: !state.user_actions.system_readiness_check,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img
                src="/assets/icons/on_videos/detail.svg"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(74%) sepia(10%) saturate(606%) hue-rotate(151deg) brightness(84%) contrast(84%)",
                }}
                alt=""
              />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                System readiness check
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.user_actions.system_readiness_check}
                  onClick={() =>
                    dispatch({
                      permission_group: "user_actions",
                      permission: "system_readiness_check",
                      value: !state.user_actions.system_readiness_check,
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

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "15px",
              backgroundColor:
                hover == "Control volume of remote users"
                  ? theme?.permissions?.hover
                  : "",
              paddingLeft: "30px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onMouseEnter={() => sethover("Control volume of remote users")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "user_actions",
                permission: "control_volume_of_remote_user",
                value: !state.user_actions.control_volume_of_remote_user,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/controlRemote.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Control volume of remote users
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.user_actions.control_volume_of_remote_user}
                  onClick={() =>
                    dispatch({
                      permission_group: "user_actions",
                      permission: "control_volume_of_remote_user",
                      value: !state.user_actions.control_volume_of_remote_user,
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
        <div
          style={{
            paddingLeft: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Show audio and video buttons"
                  ? theme?.permissions?.hover
                  : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Show audio and video buttons")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "user_actions",
                permission: "show_audio_and_video_button",
                value: !state.user_actions.show_audio_and_video_button,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/requestUnmuteAudio.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Show audio and video
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.user_actions.show_audio_and_video_button}
                  onClick={() =>
                    dispatch({
                      permission_group: "user_actions",
                      permission: "show_audio_and_video_button",
                      value: !state.user_actions.show_audio_and_video_button,
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
          borderRight: `2px solid ${theme?.permissions?.border}`,
        }}
      >
        <div
          style={{
            paddingLeft: "15px",
            paddingTop: selectedPermission.title != "Viewer" ? "102px" : "51px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "View as" ? theme?.permissions?.hover : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("View as")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "user_actions",
                permission: "view_as",
                value: !state.user_actions.view_as,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/view_as.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                View as
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.user_actions.view_as}
                  onClick={() =>
                    dispatch({
                      permission_group: "user_actions",
                      permission: "view_as",
                      value: !state.user_actions.view_as,
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
        <div
          style={{
            paddingLeft: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Kick user" ? theme?.permissions?.hover : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Kick user")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "user_actions",
                permission: "kick_user",
                value: !state.user_actions.kick_user,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/kick_user.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Kick user
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.user_actions.kick_user}
                  onClick={() =>
                    dispatch({
                      permission_group: "user_actions",
                      permission: "kick_user",
                      value: !state.user_actions.kick_user,
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
        <div
          style={{
            paddingLeft: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Request unmute audio"
                  ? theme?.permissions?.hover
                  : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Request unmute audio")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "user_actions",
                permission: "request_unmute_audio",
                value: !state.user_actions.request_unmute_audio,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/requestUnmuteAudio.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Request unmute audio
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.user_actions.request_unmute_audio}
                  onClick={() =>
                    dispatch({
                      permission_group: "user_actions",
                      permission: "request_unmute_audio",
                      value: !state.user_actions.request_unmute_audio,
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
        // sx={{ marginTop: "-16px", marginBottom: "-16px" }}
      >
        <div
          style={{
            //   borderRight: "2px solid #143F63",
            paddingLeft: "15px",
            paddingTop: "102px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Move to sub spaces" ? theme?.permissions?.hover : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Move to sub spaces")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "user_actions",
                permission: "move_to_sub_spaces",
                value: !state.user_actions.move_to_sub_spaces,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/three_dot_overlay_icons/move_to.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Move to sub spaces
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.user_actions.move_to_sub_spaces}
                  onClick={() =>
                    dispatch({
                      permission_group: "user_actions",
                      permission: "move_to_sub_spaces",
                      value: !state.user_actions.move_to_sub_spaces,
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
            //   borderRight: "2px solid #143F63",
            paddingLeft: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Show profile" ? theme?.permissions?.hover : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Show profile")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "user_actions",
                permission: "show_profile",
                value: !state.user_actions.show_profile,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/control_panel.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Show profile
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.user_actions.show_profile}
                  onClick={() =>
                    dispatch({
                      permission_group: "user_actions",
                      permission: "show_profile",
                      value: !state.user_actions.show_profile,
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
            paddingLeft: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Show connectivity test"
                  ? theme?.permissions?.hover
                  : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Show connectivity test")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "user_actions",
                permission: "show_connectivity_test",
                value: !state.user_actions.show_connectivity_test,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img
                src="/assets/icons/on_videos/detail.svg"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(74%) sepia(10%) saturate(606%) hue-rotate(151deg) brightness(84%) contrast(84%)",
                }}
                alt=""
              />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Show connectivity test
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.user_actions.show_connectivity_test}
                  onClick={() =>
                    dispatch({
                      permission_group: "user_actions",
                      permission: "show_connectivity_test",
                      value: !state.user_actions.show_connectivity_test,
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
        <div
          style={{
            //   borderRight: "2px solid #143F63",
            paddingLeft: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Request unmute video"
                  ? theme?.permissions?.hover
                  : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Request unmute video")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "user_actions",
                permission: "request_unmute_video",
                value: !state.user_actions.request_unmute_video,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/requestUnmuteVideo.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Request unmute video
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.user_actions.request_unmute_video}
                  onClick={() =>
                    dispatch({
                      permission_group: "user_actions",
                      permission: "request_unmute_video",
                      value: !state.user_actions.request_unmute_video,
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
            //   borderRight: "2px solid #143F63",
            paddingLeft: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "15px",
              backgroundColor:
                hover == "Prompt toolbar menu" ? theme?.permissions?.hover : "",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px",
            }}
            onMouseEnter={() => sethover("Prompt toolbar menu")}
            onMouseLeave={() => sethover("")}
            onClick={() =>
              dispatch({
                permission_group: "user_actions",
                permission: "show_toolbar_menu",
                value: !state.user_actions.show_toolbar_menu,
                selectedPermission,
              })
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="/assets/permissions/requestUnmuteVideo.svg" alt="" />
              <p
                style={{
                  color: theme?.common?.color3,

                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Prompt toolbar menu
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "25px" }}
                  checked={state.user_actions.show_toolbar_menu}
                  onClick={() =>
                    dispatch({
                      permission_group: "user_actions",
                      permission: "show_toolbar_menu",
                      value: !state.user_actions.show_toolbar_menu,
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

export default SpacePermission;
