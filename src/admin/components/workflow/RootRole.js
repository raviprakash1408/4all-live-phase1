import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import MuiTableCell from "@material-ui/core/TableCell";
import { TextField, Checkbox } from "@mui/material";
import { useSelector } from "react-redux";
import PermissionGroupDropdown from '../PermissionGroupDropdown';
import { AxiosLocal } from '../../../utilities/axiosUtils.ts';
import ConfirmPop from '../ConfirmPop';
import Skeleton from '@mui/material/Skeleton';
import EditableField from './EditableField';
import Toast from "../../../sections/Toast";

  const TableCell = withStyles({
    root: {
      borderBottom: "none",
      padding: "12px",
    },
  })(MuiTableCell);
  const TableRoot = withStyles({
    root: {
      borderBottom: "none",
      padding: "8px",
    },
  })(MuiTableCell);
  
  const TableHeaderCell = withStyles((theme) => ({
    root: {
      backgroundColor: "#012A50",
    },
  }))(TableCell);
  
  const TableHeaderFolder = withStyles((theme) => ({
    root: {
      backgroundColor: "#012243",
      borderRadius: "2px",
      // height:'10px'
    },
  }))(TableCell);


export const RootRole = ({sethoverRootRole, item, setcurrentDragRole, setcurrentDragRoleName, hoverRootRole, currentDragRoleName,  getCurrentDepartment, selectedworkflowId, loadingPerm, permissions, arrRoleDelete, setarrRoleDelete}) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const theme = useSelector((state) => state.theme.themeData);
  const [toggleroleEdit, setToggleroleEdit] = useState(true);
  const permission = useSelector((state) => state.permissions);
  const [roleName, setroleName] = useState(item.name);

  const [permissiongroup, setpermissiongroup] = React.useState(item.permission_group.id);
  const [changed, setchanged] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState("");
  const [openerrorToast, setOpenerrorToast] = useState(false);

  const handleChangepermissiongroup = (event) => {
    setpermissiongroup(event.target.value);
    setchanged(true);

  };

  useEffect(() => {
   
    if (changed) {
      handleRoleEditPermission();
    }
  }, [permissiongroup]);

   const handleRoleEditPermission = () => {
     AxiosLocal.post(`role/edit/${item.id}`, {
       permission_id: permissiongroup,
     }).then((response) => {
       console.log(response, "responserole");
       if (response.data.status == "Success") {
          setOpenToast(true);
          setMessage("Role edited successfully")
       }
     });
   };

  const deleteRole = () => {

    AxiosLocal.delete("role/", { data: { role_ids: [item.id] } }).then(
      (response) => {
        // getworkflowList();
        console.log(response,"response");
        if (response.data.status == "Success") {
          // setOpenToastDeleteRole(true);
          getCurrentDepartment(selectedworkflowId)
          setOpenerrorToast(true)
          setMessage("Role deleted successfully")
        }
      }
    );
  };

  const [confirmRole, setConfirmRole] = useState(false);
  const handleClickOpenRole = () => {
    setConfirmRole(true);
  };

  const handleClickCloseRole = () => {
    setConfirmRole(false);
  };

  // checkbox
  
  const [checkedList, setCheckedList] = useState([]);


  const handleCheckboxClick = (e) => {
    
  
    const { value, checked } = e.target;

    if (checked) {
      setCheckedList([...checkedList, value * 1]);
      const arr = [...arrRoleDelete, value * 1, ...checkedList]
      const sole = [...new Set(arr)]

      setarrRoleDelete([...sole])
    } else {
      setCheckedList(checkedList.filter((item) => item != value));
      setarrRoleDelete(arrRoleDelete.filter((item) => item != value));

    }
  };

  const handleRoleEdit = () => {
    AxiosLocal.post(`role/edit/${item.id}`, {
      name: roleName,
      
    }).then((response) => {
      console.log(response, "responserole");
      if (response.data.status == "Success") {
        setOpenToast(true);
        setMessage("Role edited successfully");
      }
    });
  };

  return (
    <>
      <ConfirmPop
        message="Are you sure you want to delete the roles"
        confirm={confirmRole}
        handleClickOpen={handleClickOpenRole}
        handleClickClose={handleClickCloseRole}
        handleDelete={deleteRole}
      />
      <TableRow
        onMouseEnter={() => sethoverRootRole(item.id)}
        onMouseLeave={() => sethoverRootRole("")}
        draggable
        onDragStart={(e) => {
          setcurrentDragRole(item.id);
          setcurrentDragRoleName(item.name);
        }}
        key={item.id}
        className={`collapseRow`}
        style={{
          backgroundColor:
            hoverRootRole == item.id
              ? theme?.workflows?.hover
              : theme?.workflows?.buttonBg,
          // borderTop:`10px solid ${theme?.table?.bgColor}`,
          cursor: "pointer",
          // opacity: addRole ? 1 : 0,
        }}
      >
        <TableHeaderCell
          align="left"
          style={{
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            color: "#88A1AB",
            backgroundColor: theme?.workflows?.iconsBg,
          }}
        ></TableHeaderCell>
        <TableHeaderFolder
          align="left"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme?.workflows?.checkboxBg,
          }}
        >
          <Checkbox
            {...label}
            item={item}
            value={item.id}
            checked={arrRoleDelete.includes(item.id)}
            onChange={handleCheckboxClick}
            sx={{
              color: theme?.workflows?.icons,

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
        </TableHeaderFolder>

        <TableRoot
          align="left"
          style={{
            fontSize: "14px",
            fontFamily: "URW DIN",
            color: theme?.workflows?.textcolor,
          }}
        >
          <div>
            <EditableField
              name={roleName}
              setName={setroleName}
              handleChange={(event) => setroleName(event.target.value)}
              handleClick={handleRoleEdit}
              prevName={item.name}
            />
          </div>
          {/* <div style={{ display: "flex" }}>
            {toggleroleEdit ? (
              <p
                style={{ margin: "0px", paddingLeft: "10px" }}
                onDoubleClick={() => {
                  setToggleroleEdit(false);
                  setcurrentDragRoleName(item.name);
                  setcurrentDragRole(item.id);
                }}
              >
                {item.name}
              </p>
            ) : (
              <TextField
                id="editingRootRole"
                label=""
                variant="outlined"
                sx={{
                  "& .MuiInputLabel-root": {
                    fontSize: "14px",
                    height: "27px",
                    // marginLeft: "14px",
                    // marginTop: "-5px",
                  },
                  "& .MuiOutlinedInput-root": {
                    fontSize: "14px",
                    height: "27px",
                    // marginLeft: "14px",
                    // marginTop: "1px",
                  },

                  "& .MuiOutlinedInput-input": {
                    fontFamily: "URW DIN REGULAR",
                    fontSize: "14px",

                    color: theme?.profile?.primaryColor,
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid",

                    borderColor:
                      hoverRootRole == item.id ? "#88A1AB" : "#143F63",

                    borderRadius: "4px",
                    color: theme?.profile?.primaryColor,
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid",

                      borderColor:
                        hoverRootRole == item.id ? "#88A1AB" : "#143F63",

                      borderRadius: "4px",
                    },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: "1px solid",

                      borderColor:
                        hoverRootRole == item.id ? "#88A1AB" : "#143F63",

                      borderRadius: "4px",
                    },
                }}
                InputLabelProps={{
                  style: { color: "#5D7C90" },
                }}
                value={currentDragRoleName}
                onChange={(e) => setcurrentDragRoleName(e.target.value)}
                type="text"
                autoFocus
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === "Escape") {
                    setToggleroleEdit(true);
                    // handleRootRoleEdit()
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }}
              />

            )}
           
          </div> */}
        </TableRoot>
        <TableRoot align="right"></TableRoot>

        <TableRoot
          align="left"
          style={{
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            color: "#88A1AB",
          }}
        >
          {loadingPerm ? (
            <Skeleton
              style={{ backgroundColor: theme?.loading?.loadingColor }}
              variant="rounded"
              width={120}
              height={36}
            />
          ) : (
            <PermissionGroupDropdown
              permissiongroup={permissiongroup}
              handleChangepermissiongroup={handleChangepermissiongroup}
              // handleRoleEdit={handleRoleEditPermission}
              // handleRoleEdit={() => console.log("editedit")}
              permissions={permissions}
            />
          )}
        </TableRoot>

        {/* <TableRoot align="right"></TableRoot> */}

        <TableRoot align="right">
          {item.is_editable && permission.delete_workflows ? (
            <img
              src="/assets/admin/close-icon.svg"
              alt=""
              className="closeIcon"
              onClick={handleClickOpenRole}
              style={{
                paddingRight: "15px",
                filter:
                  hoverRootRole == item.id
                    ? "brightness(0) saturate(100%) invert(10%) sepia(39%) saturate(3328%) hue-rotate(191deg) brightness(93%) contrast(100%)"
                    : "",
              }}
            />
          ) : (
            <></>
          )}
        </TableRoot>
      </TableRow>

      <Toast
        openToast={openToast}
        setOpenToast={setOpenToast}
        message={message}
      />

      <Toast
        openToast={openerrorToast}
        setOpenToast={setOpenerrorToast}
        message={message}
        type="error"
      />
    </>
  );
}
