import React, { useState, useRef, useEffect } from "react";
import { Checkbox, TextField } from "@mui/material";
import { useSelector } from "react-redux";
// import { AxiosLocal } from "../../utilities/axiosUtils.ts";
// import ConfirmPop from "./ConfirmPop";
import PermissionGroupDropdown from "../PermissionGroupDropdown";
import Toast from "../../../sections/Toast";
import { AxiosLocal } from "../../../utilities/axiosUtils.ts";
import ConfirmPop from "../ConfirmPop";
import EditableField from "./EditableField";
import Skeleton from '@mui/material/Skeleton';
import { organizationUser } from "../../../utilities/common";


const RoleElement = ({
  role,
  row,
  // permissiongroup,
  // handleChangepermissiongroup,
  selectedworkflowId,
  getCurrentDepartment,
  setroleId,
  handleClickOpenRole,
  seteditRoleToast,
  setcurrentDragRole,
  checkedList,
  handleCheckboxClick,
  loadingPerm,
  permissions,
  drop,
  dragOver
}) => {
  const theme = useSelector((state) => state.theme.themeData);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [toggleroleEdit, setToggleroleEdit] = useState(true);

  // const [permissions, setpermissions] = useState([])
  // const [loadingPerm, setloadingPerm] = useState(true)
  // useEffect(() => {
  //   permissionList()
  // }, [])
  
  // const permissionList = () =>{
  //   AxiosLocal.get("user/permission/").then((response) => {

  //  if(response.data.status){
  //     setpermissions([...response.data.data])
  //     setTimeout(() => {
  //     setloadingPerm(false)
  //   }, 2000)
  //   }
  //   });
  // }
  const [roleName, setroleName] = useState(role.name);

  const [permissiongroup, setpermissiongroup] = React.useState(role.permission_group.id);

  const [hover, sethover] = useState(false)
  const [changed, setchanged] = useState(false)

  const handleChangepermissiongroup = (event) => {
    setpermissiongroup(event.target.value);
    setchanged(true)
    // setTimeout(() => {
    // handleRoleEditPermission();
      
    // }, 2000);
  };
  // const isFirstRun = useRef(true);

  useEffect(() => {
    //     if (isFirstRun.current) {
    //   isFirstRun.current = false;
    //   return;
    // }
    if(changed){
      handleRoleEditPermission();

    }
  }, [permissiongroup])
  
  const handleRoleEdit = () => {
    AxiosLocal.post(`role/edit/${role.id}`, {
      name: roleName
      // department_id: row.id,
      // permission_id: permissiongroup,
    }).then((response) => {
      console.log(response, "responserole");
      if (response.data.status == "Success") {
        seteditRoleToast(true);
        getCurrentDepartment(selectedworkflowId)

      }
    });
  };
  // console.log(permissiongroup,role.id,"permissiongrouppermissiongroup");
  const handleRoleEditPermission = () => {
    AxiosLocal.post(`role/edit/${role.id}`, {
 
      permission_id: permissiongroup
    }).then((response) => {
      console.log(response, "responserole");
      if (response.data.status == "Success") {
        seteditRoleToast(true);
      }
    });
  };
  return (
    <>
      <li
        key={role.id}
        onDragOver={(e) => dragOver(e)}
        onDrop={() => drop()}
        onMouseEnter={() => sethover(true)}
        onMouseLeave={() => sethover(false)}
      >
        <div
          draggable={role.is_editable ? true : false}
          onDragStart={(e) => setcurrentDragRole(role.id)}
          style={{
            height: "50px",
            borderRadius: "4px",
            backgroundColor: hover ? theme?.workflows?.hover : theme?.workflows?.buttonBg,
            display: "flex",
            width: "100%",
            marginLeft: "5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            border:theme?.workflows?.border,
            color:theme?.workflows?.color,
          }}
          className="line"
        >
          <div
            style={{
              height: "50px",
              width: "95px",
              backgroundColor: theme?.workflows?.checkboxBg,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              border:theme?.workflows?.border,

            }}
          >
            {!role.is_editable ? (
              <img src="/assets/admin/lock-branch.svg" alt="" />
            ) : (
              <>
                <Checkbox
                  {...label}
                  item={role}
                  value={role.id}
                  checked={checkedList.includes(role.id)}
                  onChange={handleCheckboxClick}
                  sx={{
                    color: "#88A1AB",

                    "& .MuiSvgIcon-root": { fontSize: 22 },
                    "&.Mui-checked": {
                      color: theme?.common?.color1,

                    },
                  }}
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
                <img
                  style={{ paddingLeft: "10px" }}
                  src="/assets/admin/branchRole.svg"
                  alt=""
                />
              </>
            )}
          </div>
          {!row.is_editable ? (
            <p
              style={{
                marginLeft: "28px",
                fontFamily: "URW DIN REGULAR",
              }}
            >
              {roleName}
              {/* {role.name} */}
            </p>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "28px",
                }}
              >
                {/* {toggleroleEdit ? (
                  <p
                    style={{
                      fontFamily: "URW DIN REGULAR",
                      fontSize: "14px",
                      paddingLeft: "28px",
                    }}
                    onDoubleClick={() => {
                      setToggleroleEdit(false);
                    }}
                  >
                    {roleName}
                  </p>
                ) : (
                  <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    sx={{
                      "& .MuiInputLabel-root": {
                        fontSize: "14px",
                        height: "27px",
                        marginLeft: "14px",
                        marginTop: "-5px",
                      },
                      "& .MuiOutlinedInput-root": {
                        fontSize: "14px",
                        height: "27px",
                        marginLeft: "14px",
                        marginTop: "1px",
                      },

                      "& .MuiOutlinedInput-input": {
                        fontFamily: "URW DIN REGULAR",
                        fontSize: "14px",

                        color: theme?.profile?.primaryColor,
                      },
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          border: "1px solid",

                          borderColor:hover ? "#88A1AB" : "#143F63",

                          borderRadius: "4px",
                          color: theme?.profile?.primaryColor,
                        },
                      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          border: "1px solid",

                          borderColor:hover ? "#88A1AB" :  "#143F63",

                          borderRadius: "4px",
                        },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          border: "1px solid",

                          borderColor:hover ? "#88A1AB" : "#143F63",

                          borderRadius: "4px",
                        },
                    }}
                    InputLabelProps={{
                      style: { color: "#5D7C90" },
                    }}
                    value={roleName}
                    onChange={(e) => setroleName(e.target.value)}
                    type="text"
                    autoFocus
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === "Escape") {
                        setToggleroleEdit(true);
                        handleRoleEdit()
                        event.preventDefault();
                        event.stopPropagation();
                      }
                    }}
                  />
                )} */}
                <EditableField
                  name={roleName}
                  setName={setroleName}
                  handleChange={(event) => setroleName(event.target.value)}
                  handleClick={handleRoleEdit}
                  hover={hover}
                  styles={true}
                  prevName={role.name}
                />
              </div>
            </>
          )}

          <div className="PermissionGroupDropdown">
            {loadingPerm ? (
              <Skeleton
                style={{  backgroundColor:  theme?.loading?.loadingColor  }}
                variant="rounded"
                width={120}
                height={36}
              />
            ) : (
              <PermissionGroupDropdown
                permissiongroup={permissiongroup}
                handleChangepermissiongroup={handleChangepermissiongroup}
                // handleRoleEdit={handleRoleEditPermission}
                permissions={permissions}
              />
            )}
          </div>

          {organizationUser(permissions.can_remove_roles) &&
            (row.is_editable ? (
              <img
                src="/assets/admin/close-icon.svg"
                alt=""
                className="closeIcon"
                style={{
                  position: "absolute",
                  right: "19px",
                  top: "32px",
                  cursor: "pointer",
                  filter: hover
                    ? "brightness(0) saturate(100%) invert(10%) sepia(39%) saturate(3328%) hue-rotate(191deg) brightness(93%) contrast(100%)"
                    : "",
                }}
                onClick={() => {
                  setroleId(role);
                  handleClickOpenRole();
                }}
              />
            ) : (
              <></>
            ))}
        </div>
      </li>
    </>
  );
};

export default RoleElement;
