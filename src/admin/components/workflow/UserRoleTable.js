import React, { useEffect, useState, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import MuiTableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { AxiosLocal } from "../../../utilities/axiosUtils.ts";
import DepartmentRow from "./DepartmentRow";
import { RootRole } from "./RootRole";
import { Scrollbars } from "react-custom-scrollbars";


const useStyles = makeStyles(() => ({
  customTooltip: {
    backgroundColor: "rgba(220, 0, 78, 0.8)",
  },
  table: {
    borderCollapse: "separate!important",
    borderSpacing: "0px 5px!important",
  },
  tableHeader: {
    borderCollapse: "separate!important",
    borderSpacing: "0px 5px!important",
    marginTop: "20px"
  },

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

const TableCell = withStyles({
  root: {
    borderBottom: "none",
    padding: "12px",
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
export default function UserRoleTable({
  selectedDepartment,
  addDepartment,
  addDepartmentOpen,
  setaddDepartmentOpen,
  selectedworkflow,
  getworkflowList,
  addRole,
  setaddRole,
  setpermission,
  setrole,
  permission,
  setrowId,
  seteditableDepartment,
  rowId,
  department,
  rootRoles,
  setDepartment,
  getCurrentDepartment,
  roleLoader,
  arrRoleDelete,
  setarrRoleDelete,
  multipleDepartDelete,
  setmultipleDepartDelete,
  multipleSuccess,
  currentDragRole,
  setcurrentDragRole,
  currentDragRoleName,
  setcurrentDragRoleName,
}) {
  const theme = useSelector((state) => state.theme.themeData);
  const classes = useStyles();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };


  //new Department
  const warpperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    const { current: wrap } = warpperRef;
    if (wrap && !wrap.contains(event.target)) {
      //   AxiosLocal.post('department/',{
      //     name:newDepartment,
      //     workflow_id:selectedworkflow.id
      //   }).then((response)=>{
      //     console.log(response.data.status,"newWorkflows")
      //     if(response.data.status=="Success"){
      //       setaddDepartmentOpen(false)
      //       getworkflowList()
      //       setnewDepartment('Untitled Department')
      //     }
      // })
      setaddDepartmentOpen(false);
    }
  };

  // const handleKeyDown = (event) => {
  //   console.log(event, "event.key");
  //   if (event.key === "Enter") {
  //     AxiosLocal.post("department/", {
  //       name: newDepartment,
  //       workflow_id: selectedworkflow.id,
  //     }).then((response) => {
  //       console.log(response.data.status, "newWorkflows");
  //       if (response.data.status == "Success") {
  //         setaddDepartmentOpen(false);
  //         getworkflowList();
  //         setnewDepartment("Untitled Department");
  //       }
  //     });
  //   }
  // };
  //new role

  // const [currentDragRole, setcurrentDragRole] = useState();
  // const [currentDragRoleName, setcurrentDragRoleName] = useState();

  //root role edit

  const [hoverRootRole, sethoverRootRole] = useState("");

  // const [permissiongroup, setpermissiongroup] = useState(role.permission_group.id);

  //permissions

  const [permissions, setpermissions] = useState([]);
  const [loadingPerm, setloadingPerm] = useState(true);
  useEffect(() => {
    permissionList();
  }, []);

  const permissionList = () => {
    AxiosLocal.get("user/permission/").then((response) => {
      if (response.data.status) {
        setpermissions([...response.data.data]);
        setTimeout(() => {
          setloadingPerm(false);
        }, 2000);
      }
    });
  };
  return (
    <>
      <Table
        aria-label="collapsible table"
        elevation={0}
        className={classes.tableHeader}
      >
        <TableHead>
          <TableRow style={{ backgroundColor: theme?.workflows?.headerBg }}>
            <TableHeaderCell
              style={{
                color: "white",
                fontFamily: "URW DIN REGULAR",
                width: "3%",
                backgroundColor: theme?.workflows?.leftHeader,
              }}
            ></TableHeaderCell>
            <TableHeaderFolder
              style={{
                color: "white",
                fontFamily: "URW DIN REGULAR",
                width: "8%",
                backgroundColor: theme?.workflows?.headerBg,
              }}
            ></TableHeaderFolder>

            <TableCell
              style={{
                color: "white",
                fontFamily: "URW DIN REGULAR",
                width: "50%",
                backgroundColor: theme?.workflows?.headerBg,
              }}
            >
              Department/User Role
            </TableCell>
            <TableCell
              align="left"
              style={{
                color: "white",
                fontFamily: "URW DIN REGULAR",
                width: "10%",
              }}
            ></TableCell>
            <TableCell
              align="left"
              style={{
                color: "white",
                fontFamily: "URW DIN REGULAR",
                width: "30%",
              }}
            >
              Permissions
            </TableCell>
            <TableHeaderFolder
              align="center"
              style={{
                color: "white",
                fontFamily: "URW DIN REGULAR",
                width: "20%",
                backgroundColor: theme?.workflows?.headerBg,
              }}
            >
              Actions
            </TableHeaderFolder>
          </TableRow>
        </TableHead>
      </Table>
      <Scrollbars
        style={{
          width: "100%",
          height: "60vh",
        }}
      >
        <TableContainer
          style={{
            marginTop: "-5px",
            marginLeft: "0px",
          }}
          className="eventListView"
        >
          <Table
            aria-label="collapsible table"
            elevation={0}
            className={classes.table}
          >
            <TableBody
              style={{
                backgroundColor: theme?.table?.rowColor,
              }}
              className={classes.tableBody}
            >
              {rootRoles.map((item) => (
                <>
                  {/* <div 
        style={{height:'5px', backgroundColor:'#012A50'}}></div> */}

                  <RootRole
                    key={item.id}
                    sethoverRootRole={sethoverRootRole}
                    item={item}
                    setcurrentDragRole={setcurrentDragRole}
                    setcurrentDragRoleName={setcurrentDragRoleName}
                    hoverRootRole={hoverRootRole}
                    currentDragRoleName={currentDragRoleName}
                    getCurrentDepartment={getCurrentDepartment}
                    selectedworkflowId={selectedworkflow.id}
                    permissions={permissions}
                    loadingPerm={loadingPerm}
                    arrRoleDelete={arrRoleDelete}
                    setarrRoleDelete={setarrRoleDelete}
                  />
                </>
              ))}

              <div
                style={{
                  height: "4px",
                  backgroundColor: theme?.workflows?.bgColor,
                }}
              ></div>
              {department?.map((row) => (
                <DepartmentRow
                  rowId={rowId}
                  setrowId={setrowId}
                  seteditableDepartment={seteditableDepartment}
                  key={row.id}
                  row={row}
                  addDepartment={addDepartment}
                  addDepartmentOpen={addDepartmentOpen}
                  setaddDepartmentOpen={setaddDepartmentOpen}
                  selectedworkflowId={selectedworkflow.id}
                  getworkflowList={getworkflowList}
                  addRole={addRole}
                  setaddRole={setaddRole}
                  setpermission={setpermission}
                  permission={permission}
                  currentDragRole={currentDragRole}
                  currentDragRoleName={currentDragRoleName}
                  department={department}
                  setDepartment={setDepartment}
                  getCurrentDepartment={getCurrentDepartment}
                  setcurrentDragRole={setcurrentDragRole}
                  roleLoader={roleLoader}
                  arrRoleDelete={arrRoleDelete}
                  setarrRoleDelete={setarrRoleDelete}
                  multipleDepartDelete={multipleDepartDelete}
                  setmultipleDepartDelete={setmultipleDepartDelete}
                  multipleSuccess={multipleSuccess}
                  permissions={permissions}
                  loadingPerm={loadingPerm}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbars>
    </>
  );
}
