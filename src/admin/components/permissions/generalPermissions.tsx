import React, { useEffect, useReducer, useState } from "react";
import IOSSwitch from "../CustomSwitch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AxiosLocal } from "../../../utilities/axiosUtils.ts";
import { useSelector } from "react-redux";
// axios request and realtime with list of permi and valu
const permissionChangefun = (id, permissionObject) => {
  AxiosLocal.post(`/user/permission/edit/${id}`, permissionObject).then(
    (res) => {
      console.log("res", permissionObject, res);
    }
  );
  // publish permission to all users
  // @ts-ignore
  // window.permissionChanel.publish(permissionObject);
};

// initial state

type initial_button_state = {
  team_members: {
    view_team_members: boolean;
    edit_team_members: boolean;
    add_team_members: boolean;
    delete_team_members: boolean;
  };
  space: {
    view_space: boolean;
    edit_space: boolean;
    add_space: boolean;
    delete_space: boolean;
  };
  permissions: {
    view_permissions: boolean;
    edit_permissions: boolean;
    add_permissions: boolean;
    delete_permissions: boolean;
  };
  workflows: {
    view_workflows: boolean;
    edit_workflows: boolean;
    add_workflows: boolean;
    delete_workflows: boolean;
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
  team_members: {
    view_team_members: false,
    edit_team_members: false,
    add_team_members: false,
    delete_team_members: false,
  },
  space: {
    view_space: false,
    edit_space: false,
    add_space: false,
    delete_space: false,
  },
  permissions: {
    view_permissions: false,
    edit_permissions: false,
    add_permissions: false,
    delete_permissions: false,
  },
  workflows: {
    view_workflows: false,
    edit_workflows: false,
    add_workflows: false,
    delete_workflows: false,
  },
};

function button_reducer(state: initial_button_state, action: actions) {
  let newState: initial_button_state = state;

  if (action.initialize) {
    return { ...action.initialState };
  }

  switch (action.permission_group) {
    case "team_members":
      if (action.permission == "all") {
        newState = {
          ...state,
          team_members: {
            view_team_members: action.value,
            edit_team_members: action.value,
            add_team_members: action.value,
            delete_team_members: action.value,
          },
        };
      } else {
        newState = {
          ...state,
          team_members: {
            ...state.team_members,
            [action.permission]: action.value,
          },
        };
      }
      break;

    case "space":
      if (action.permission == "all") {
        newState = {
          ...state,
          space: {
            view_space: action.value,
            edit_space: action.value,
            add_space: action.value,
            delete_space: action.value,
          },
        };
      } else {
        newState = {
          ...state,
          space: {
            ...state.space,
            [action.permission]: action.value,
          },
        };
      }
      break;

    case "permissions":
      if (action.permission == "all") {
        newState = {
          ...state,
          permissions: {
            view_permissions: action.value,
            edit_permissions: action.value,
            add_permissions: action.value,
            delete_permissions: action.value,
          },
        };
      } else {
        newState = {
          ...state,
          permissions: {
            ...state.permissions,
            [action.permission]: action.value,
          },
        };
      }
      break;

    case "workflows":
      if (action.permission == "all") {
        newState = {
          ...state,
          workflows: {
            view_workflows: action.value,
            edit_workflows: action.value,
            add_workflows: action.value,
            delete_workflows: action.value,
          },
        };
      } else {
        newState = {
          ...state,
          workflows: {
            ...state.workflows,
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

const GeneralPermissions = ({ selectedPermission }) => {
  const theme = useSelector((state) => state.theme.themeData);

  const [state, dispatch] = useReducer(button_reducer, button_state);
  const organisationUser = localStorage.getObject("is_organization_user");
  const [hover, sethover] = useState("");

  useEffect(() => {
    dispatch({
      initialize: true,
      initialState: {
        team_members: {
          view_team_members: selectedPermission.permissions.view_team_members,
          edit_team_members: selectedPermission.permissions.edit_team_members,
          add_team_members: selectedPermission.permissions.add_team_members,
          delete_team_members:
            selectedPermission.permissions.delete_team_members,
        },
        space: {
          view_space: selectedPermission.permissions.view_space,
          edit_space: selectedPermission.permissions.edit_space,
          add_space: selectedPermission.permissions.add_space,
          delete_space: selectedPermission.permissions.delete_space,
        },
        permissions: {
          view_permissions: selectedPermission.permissions.view_permissions,
          edit_permissions: selectedPermission.permissions.edit_permissions,
          add_permissions: selectedPermission.permissions.add_permissions,
          delete_permissions: selectedPermission.permissions.delete_permissions,
        },
        workflows: {
          view_workflows: selectedPermission.permissions.view_workflows,
          edit_workflows: selectedPermission.permissions.edit_workflows,
          add_workflows: selectedPermission.permissions.add_workflows,
          delete_workflows: selectedPermission.permissions.delete_workflows,
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

  // updating states of buttons

  return (
    <ul
      style={{
        listStyle: "none",
        marginTop: "-16px",
        padding: 0,
        marginRight: "24px",
        backgroundColor: theme?.permissions?.bgColor,
      }}
    >
      <li style={{ display: "flex", background: theme?.permissions?.bgColor }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: `2px solid ${theme?.permissions?.border}`,

            marginLeft: "30px",
            width: "40%",
            borderRadius: "4px 0px 0px 0px",
            cursor: "pointer",
            backgroundColor:
              hover == "Team members"
                ? theme?.permissions?.bgColor
                : theme?.permissions?.bgColor,
          }}
          onMouseEnter={() => sethover("Team members")}
          onMouseLeave={() => sethover("")}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: theme?.permissions?.bgColor,
            }}
          >
            <img
              src="/assets/admin/admin-users-icon.svg"
              alt=""
              style={{
                marginLeft: "12px",
                width: "24px",
                backgroundColor: theme?.permissions?.bgColor,
              }}
            />
            <p
              style={{
                color: "#88A1AB",
                fontSize: "14px",
                fontFamily: "URW DIN REGULAR",
                marginLeft: "6px",
                backgroundColor: theme?.permissions?.bgColor,
              }}
            >
              Team members
            </p>
          </div>

          <FormControlLabel
            control={
              <IOSSwitch
                theme={theme}
                sx={{ marginRight: "36px" }}
                checked={
                  state.team_members.add_team_members ||
                  state.team_members.delete_team_members ||
                  state.team_members.view_team_members ||
                  state.team_members.edit_team_members
                }
                onChange={(event) => {
                  console.log(event.target.checked);

                  dispatch({
                    permission_group: "team_members",
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
        <div
          style={{
            border: `2px solid ${theme?.permissions?.border}`,
            borderWidth: "2px 2px 2px 0px",
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor:
              hover === "view_team_members" ? theme?.permissions?.hover : "",
          }}
          onMouseEnter={() => sethover("view_team_members")}
          onMouseLeave={() => sethover("")}
        >
          <FormControlLabel
            control={
              <IOSSwitch
                theme={theme}
                sx={{ marginRight: "36px" }}
                checked={state.team_members.view_team_members}
                onClick={() =>
                  // dispatch({
                  //   permission_group: "team_members",
                  //   permission: "view_team_members",
                  //   value: !state.team_members.view_team_members,
                  //   selectedPermission,
                  // })
                  dispatch({
                    permission_group: "team_members",
                    permission: "all",
                    value: !state.team_members.view_team_members,
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
                  backgroundColor: theme?.permissions?.bgColor,
                }}
              >
                {/* Add password */}
              </span>
            }
          />
        </div>
        <div
          style={{
            border: `2px solid ${theme?.permissions?.border}`,
            borderWidth: "2px 2px 2px 0px",
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor:
              hover === "add_team_members" ? theme?.permissions?.hover : "",
          }}
          onMouseEnter={() => sethover("add_team_members")}
          onMouseLeave={() => sethover("")}
        >
          <FormControlLabel
            control={
              <IOSSwitch
                theme={theme}
                sx={{ marginRight: "36px" }}
                checked={state.team_members.add_team_members}
                onClick={() => {
                  dispatch({
                    permission_group: "team_members",
                    permission: "add_team_members",
                    value: !state.team_members.add_team_members,
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
        <div
          style={{
            border: `2px solid ${theme?.permissions?.border}`,
            borderWidth: "2px 2px 2px 0px",
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor:
              hover === "edit_team_members" ? theme?.permissions?.hover : "",
          }}
          onMouseEnter={() => sethover("edit_team_members")}
          onMouseLeave={() => sethover("")}
        >
          <FormControlLabel
            control={
              <IOSSwitch
                theme={theme}
                sx={{ marginRight: "36px" }}
                checked={state.team_members.edit_team_members}
                onClick={() =>
                  dispatch({
                    permission_group: "team_members",
                    permission: "edit_team_members",
                    value: !state.team_members.edit_team_members,
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
                  backgroundColor: theme?.permissions?.bgColor,
                }}
              >
                {/* Add password */}
              </span>
            }
          />
        </div>
        <div
          style={{
            border: `2px solid ${theme?.permissions?.border}`,

            borderWidth: "2px 2px 2px 0px",
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "0px 4px 0px 0px",
            cursor: "pointer",
            backgroundColor:
              hover === "delete_team_members" ? theme?.permissions?.hover : "",
          }}
          onMouseEnter={() => sethover("delete_team_members")}
          onMouseLeave={() => sethover("")}
        >
          <FormControlLabel
            control={
              <IOSSwitch
                theme={theme}
                sx={{ marginRight: "36px" }}
                //   checked={showPasswordSection}
                checked={state.team_members.delete_team_members}
                onClick={() =>
                  dispatch({
                    permission_group: "team_members",
                    permission: "delete_team_members",
                    value: !state.team_members.delete_team_members,
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
      </li>
      <li style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: `2px solid ${theme?.permissions?.border}`,
            marginLeft: "30px",
            width: "40%",
            borderWidth: "0px 2px 2px 2px",
            cursor: "pointer",
            backgroundColor:
              hover == "Spaces"
                ? theme?.permissions?.bgColor
                : theme?.permissions?.bgColor,
          }}
          onMouseEnter={() => sethover("Spaces")}
          onMouseLeave={() => sethover("")}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img
              src="/assets/permissions/can_switch_breakout_space.svg"
              alt=""
              style={{ marginLeft: "12px", width: "18px" }}
            />
            <p
              style={{
                color: "#88A1AB",
                fontSize: "14px",
                fontFamily: "URW DIN REGULAR",
                marginLeft: "12px",
              }}
            >
              Spaces
            </p>
          </div>

          <FormControlLabel
            control={
              <IOSSwitch
                theme={theme}
                sx={{ marginRight: "36px" }}
                checked={
                  state.space.add_space ||
                  state.space.delete_space ||
                  state.space.view_space ||
                  state.space.edit_space
                }
                onChange={() => {
                  dispatch({
                    permission_group: "space",
                    permission: "all",
                    value:
                      !state.space.add_space ||
                      !state.space.delete_space ||
                      !state.space.view_space ||
                      !state.space.edit_space,
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
        <div
          style={{
            border: `2px solid ${theme?.permissions?.border}`,

            borderWidth: "0px 2px 2px 0px",
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor:
              hover === "view_space" ? theme?.permissions?.hover : "",
          }}
          onMouseEnter={() => sethover("view_space")}
          onMouseLeave={() => sethover("")}
        >
          <FormControlLabel
            control={
              <IOSSwitch
                theme={theme}
                sx={{ marginRight: "36px" }}
                checked={state.space.view_space}
                onClick={() =>
                  // dispatch({
                  //   permission_group: "space",
                  //   permission: "view_space",
                  //   value: !state.space.view_space,
                  //   selectedPermission,
                  // })
                  dispatch({
                    permission_group: "space",
                    permission: "all",
                    value: !state.space.view_space,
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
        <div
          style={{
            border: `2px solid ${theme?.permissions?.border}`,

            borderWidth: "0px 2px 2px 0px",
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor:
              hover === "add_space" ? theme?.permissions?.hover : "",
          }}
          onMouseEnter={() => sethover("add_space")}
          onMouseLeave={() => sethover("")}
        >
          <FormControlLabel
            control={
              <IOSSwitch
                theme={theme}
                sx={{ marginRight: "36px" }}
                checked={state.space.add_space}
                onClick={() =>
                  dispatch({
                    permission_group: "space",
                    permission: "add_space",
                    value: !state.space.add_space,
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
        <div
          style={{
            border: `2px solid ${theme?.permissions?.border}`,

            borderWidth: "0px 2px 2px 0px",
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              hover === "edit_space" ? theme?.permissions?.hover : "",
          }}
          onMouseEnter={() => sethover("edit_space")}
          onMouseLeave={() => sethover("")}
        >
          <FormControlLabel
            control={
              <IOSSwitch
                theme={theme}
                sx={{ marginRight: "36px" }}
                checked={state.space.edit_space}
                onClick={() =>
                  dispatch({
                    permission_group: "space",
                    permission: "edit_space",
                    value: !state.space.edit_space,
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
        <div
          style={{
            border: `2px solid ${theme?.permissions?.border}`,

            borderWidth: "0px 2px 2px 0px",
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor:
              hover === "delete_space" ? theme?.permissions?.hover : "",
          }}
          onMouseEnter={() => sethover("delete_space")}
          onMouseLeave={() => sethover("")}
        >
          <FormControlLabel
            onChange={() => {}}
            control={
              <IOSSwitch
                theme={theme}
                sx={{ marginRight: "36px" }}
                checked={state.space.delete_space}
                onClick={() =>
                  dispatch({
                    permission_group: "space",
                    permission: "delete_space",
                    value: !state.space.delete_space,
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
      </li>
      {organisationUser == "true" && (
        <li style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: `2px solid ${theme?.permissions?.border}`,

              marginLeft: "30px",
              width: "40%",
              borderWidth: "0px 2px 2px 2px",
              backgroundColor: theme?.permissions?.bgColor,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img
                src="/assets/permissions/permissions.svg"
                alt=""
                style={{ marginLeft: "12px" }}
              />
              <p
                style={{
                  color: "#88A1AB",
                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  marginLeft: "12px",
                }}
              >
                Permissions
              </p>
            </div>

            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "36px", marginLeft: "0px" }}
                  checked={
                    state.permissions.add_permissions ||
                    state.permissions.delete_permissions ||
                    state.permissions.view_permissions ||
                    state.permissions.edit_permissions
                  }
                  onChange={() => {
                    dispatch({
                      permission_group: "permissions",
                      permission: "all",
                      value:
                        !state.permissions.add_permissions ||
                        !state.permissions.delete_permissions ||
                        !state.permissions.view_permissions ||
                        !state.permissions.edit_permissions,
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
          <div
            style={{
              border: `2px solid ${theme?.permissions?.border}`,

              borderWidth: "0px 2px 2px 0px",
              width: "20%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "36px" }}
                  checked={state.permissions.view_permissions}
                  onClick={() =>
                    dispatch({
                      permission_group: "permissions",
                      permission: "view_permissions",
                      value: !state.permissions.view_permissions,
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
          <div
            style={{
              border: `2px solid ${theme?.permissions?.border}`,

              borderWidth: "0px 2px 2px 0px",
              width: "20%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "36px" }}
                  checked={state.permissions.add_permissions}
                  onClick={() =>
                    dispatch({
                      permission_group: "permissions",
                      permission: "add_permissions",
                      value: !state.permissions.add_permissions,
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
          <div
            style={{
              border: `2px solid ${theme?.permissions?.border}`,

              borderWidth: "0px 2px 2px 0px",
              width: "20%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "36px" }}
                  checked={state.permissions.edit_permissions}
                  onClick={() =>
                    dispatch({
                      permission_group: "permissions",
                      permission: "edit_permissions",
                      value: !state.permissions.edit_permissions,
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
          <div
            style={{
              border: `2px solid ${theme?.permissions?.border}`,

              borderWidth: "0px 2px 2px 0px",
              width: "20%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControlLabel
              onChange={() => {}}
              control={
                <IOSSwitch
                  theme={theme}
                  sx={{ marginRight: "36px" }}
                  checked={state.permissions.delete_permissions}
                  onClick={() =>
                    dispatch({
                      permission_group: "permissions",
                      permission: "delete_permissions",
                      value: !state.permissions.delete_permissions,
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
        </li>
      )}
      <li style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: `2px solid ${theme?.permissions?.border}`,

            marginLeft: "30px",
            width: "40%",
            borderWidth: "0px 2px 2px 2px",
            backgroundColor:
              hover == "Workflow"
                ? theme?.permissions?.bgColor
                : theme?.permissions?.bgColor,

            borderRadius: "0px 0px 0px 4px",
          }}
          onMouseEnter={() => sethover("Workflow")}
          onMouseLeave={() => sethover("")}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img
              src="/assets/admin/branchRole.svg"
              alt=""
              style={{ marginLeft: "12px", width: "18px" }}
            />
            <p
              style={{
                color: "#88A1AB",
                fontSize: "14px",
                fontFamily: "URW DIN REGULAR",
                marginLeft: "12px",
              }}
            >
              User roles
            </p>
          </div>

          <FormControlLabel
            onChange={() => {}}
            control={
              <IOSSwitch
                theme={theme}
                sx={{ marginRight: "36px" }}
                checked={
                  state.workflows.add_workflows ||
                  state.workflows.delete_workflows ||
                  state.workflows.view_workflows ||
                  state.workflows.edit_workflows
                }
                onChange={() => {
                  dispatch({
                    permission_group: "workflows",
                    permission: "all",
                    value:
                      !state.workflows.add_workflows ||
                      !state.workflows.delete_workflows ||
                      !state.workflows.view_workflows ||
                      !state.workflows.edit_workflows,
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
        <div
          style={{
            border: `2px solid ${theme?.permissions?.border}`,

            borderWidth: "0px 2px 2px 0px",
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor:
              hover === "view_workflows" ? theme?.permissions?.hover : "",
          }}
          onMouseEnter={() => sethover("view_workflows")}
          onMouseLeave={() => sethover("")}
        >
          <FormControlLabel
            control={
              <IOSSwitch
                theme={theme}
                sx={{ marginRight: "36px" }}
                checked={state.workflows.view_workflows}
                onClick={() =>
                  // dispatch({
                  //   permission_group: "workflows",
                  //   permission: "view_workflows",
                  //   value: !state.workflows.view_workflows,
                  //   selectedPermission,
                  // })
                  dispatch({
                    permission_group: "workflows",
                    permission: "all",
                    value: !state.workflows.view_workflows,
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
        <div
          style={{
            border: `2px solid ${theme?.permissions?.border}`,

            borderWidth: "0px 2px 2px 0px",
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",

            backgroundColor:
              hover == "add_workflows" ? theme?.permissions?.hover : "",
          }}
          onMouseEnter={() => sethover("add_workflows")}
          onMouseLeave={() => sethover("")}
        >
          <FormControlLabel
            control={
              <IOSSwitch
                theme={theme}
                sx={{ marginRight: "36px" }}
                checked={state.workflows.add_workflows}
                onClick={() =>
                  dispatch({
                    permission_group: "workflows",
                    permission: "add_workflows",
                    value: !state.workflows.add_workflows,
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
        <div
          style={{
            border: `2px solid ${theme?.permissions?.border}`,

            borderWidth: "0px 2px 2px 0px",
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",

            backgroundColor:
              hover === "edit_workflows" ? theme?.permissions?.hover : "",
          }}
          onMouseEnter={() => sethover("edit_workflows")}
          onMouseLeave={() => sethover("")}
        >
          <FormControlLabel
            onChange={() => {}}
            control={
              <IOSSwitch
                theme={theme}
                sx={{ marginRight: "36px" }}
                checked={state.workflows.edit_workflows}
                onClick={() =>
                  dispatch({
                    permission_group: "workflows",
                    permission: "edit_workflows",
                    value: !state.workflows.edit_workflows,
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
        <div
          style={{
            border: `2px solid ${theme?.permissions?.border}`,

            borderWidth: "0px 2px 2px 0px",
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "0px 0px 4px 0px",
            cursor: "pointer",
            backgroundColor:
              hover === "delete_workflows" ? theme?.permissions?.hover : "",
          }}
          onMouseEnter={() => sethover("delete_workflows")}
          onMouseLeave={() => sethover("")}
        >
          <FormControlLabel
            onChange={() => {}}
            control={
              <IOSSwitch
                theme={theme}
                sx={{ marginRight: "36px" }}
                checked={state.workflows.delete_workflows}
                onClick={() =>
                  dispatch({
                    permission_group: "workflows",
                    permission: "delete_workflows",
                    value: !state.workflows.delete_workflows,
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
      </li>
    </ul>
  );
};

export default GeneralPermissions;
