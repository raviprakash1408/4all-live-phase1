import React, { useState, useEffect, useRef } from "react";
import {
  Skeleton,
  Box,
  List,
  Button,
  Divider,

} from "@mui/material";
// import UserRoleNavElement from "./UserRoleNavElement";
import EventTable from "../EventTable";
import UserRoleTable from "./UserRoleTable";
import { useSelector } from "react-redux";
import SearbarEvent from "../SearbarEvent";
import { AxiosLocal } from "../../../utilities/axiosUtils.ts";
import { makeStyles } from "@material-ui/core/styles";
import Toast from "../../../sections/Toast";
import ConfirmPop from "../ConfirmPop";

// import Skeleton,{ SkeletonTheme } from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import { Scrollbars } from "react-custom-scrollbars";
import UserRoleNavElement from "./UserRoleNavElement";
import { organizationUser } from "../../../utilities/common";

const useStyles = makeStyles((theme) => ({
  overrides: {
    width: "100%",
  },
}));

const UserRoles = () => {

  const permissionsGlobal = useSelector((state) => state.permissions);
  const classes = useStyles();
  const theme = useSelector((state) => state.theme.themeData);
  const [workflows, setworkflows] = useState([]);
  const [selectedworkflow, setselectedworkflow] = useState({});
  const [loading, setloading] = useState(true);
  const [departmentloading, setdepartmentloading] = useState(true);

  // const [departments, setdepartments] = useState([])
  const [department, setDepartment] = useState([]);
  const [rootRoles, setrootRoles] = useState([]);

  useEffect(() => {
    getworkflowList();
  }, []);

  useEffect(() => {
    userTable();
  }, [department]);

  const getworkflowList = () => {
    AxiosLocal.get("workflow/").then((response) => {
      setworkflows(response.data.data);
      const defaultobj = response.data.data.find( item => {
        return item.default === true
    });
    console.log(defaultobj,"defaultobjdefaultobj");
      setselectedworkflow({...defaultobj});
      setloading(false);
      getCurrentDepartment(defaultobj.id);

    })
  };
 //get current department

 const getCurrentDepartment = (id) => {
  AxiosLocal.get(`department/${id}`, {}).then((response) => {
    setDepartment([...response.data.data]);
    setrootRoles(response.data.root)
    setdepartmentloading(false);
  });
};
  const addWorkflowfun = () => {
    AxiosLocal.post("workflow/", {
    }).then((response) => {
      if (response.data.status == "Success") {
        // setaddWorkflow(false);

        setOpenToast(true);
        setworkflows([response.data.data, ...workflows]);
        // setworkflows([...workflows.slice(0, 0), response.data.data, ...workflows.slice(0)]);

        // getworkflowList();


      } else if (response.data.status == "Failed") {
        // setaddWorkflow(false);
        setOpenToastFail(true);
      }
    });
  };

  //add department
  // const [newDepartment, setnewDepartment] = useState("Untitled Department");
  const [newDepartmentToast, setnewDepartmentToast] = useState(false);

  const addDepartmentfun = () => {
    AxiosLocal.post("department/", {
      workflow_id: selectedworkflow.id,
    }).then((response) => {
      console.log(response.data.status, "newWorkflows");
      if (response.data.status == "Success") {
        // getworkflowList();
        // getCurrentDepartment();
        // setnewDepartment("Untitled Department");
        setnewDepartmentToast(true);
        setrowId(response.data.data.id)
        console.log(response,"responseresponse");
        setDepartment([response.data.data, ...department])
      }
    });
  };

  //success toast
  const [openToast, setOpenToast] = useState(false);
  //failure toast

  const [openToastFail, setOpenToastFail] = useState(false);

  const [addDepartment, setaddDepartment] = useState(-1);
  const [addDepartmentOpen, setaddDepartmentOpen] = useState(false);
  const [addRole, setaddRole] = useState(false);
  //multiple delete

  const [arrRoleDelete, setarrRoleDelete] = useState([]);
  const [multipleDepartDelete, setmultipleDepartDelete] = useState([]);
  const [multipleSuccess, setmultipleSuccess] = useState(false);


  const deletemultipleRole = () => {
    AxiosLocal.delete("role/", {
      data: { role_ids:  arrRoleDelete},
    }).then((response) => {
      AxiosLocal.delete("department/", { data: { department_ids: multipleDepartDelete } }).then(
        (response) => {
          console.log(response, "response.data.status");
          setarrRoleDelete([])

          if (response.data.status === "Success") {
    
          getCurrentDepartment(selectedworkflow.id)
          setmultipleDepartDelete([])
          setmultipleSuccess(!multipleSuccess)
          //setCheckedList([])
          }
        }
      );


    });
  };

    //confirm popup for deleting roles

    const [confirmRole, setConfirmRole] = useState(false);
    const handleClickOpenRole = () => {
      setConfirmRole(true);
    };
  
    const handleClickCloseRole = () => {
      setConfirmRole(false);
    };
  

  //root node drag
  
  const [currentDragRole, setcurrentDragRole] = useState();
  const [currentDragRoleName, setcurrentDragRoleName] = useState();
  const [toRootRole, settoRootRole] = useState(false)

 //drag
//  const dragOverItem = useRef();
 const dragEnter = (e) => {
  console.log(e);
  //  if(!row.is_editable){
  //      console.log("default");
  //  }else{
    //  dragOverItem.current = position;
    //  setdragroleId(dragOverItem.current);
    //  console.log(dragroleId, "dragroleId");
    //  console.log(e.target.innerHTML, "e.target.innerHTML");
  //  }
   
   // e.target.style.backgroundColor = "yellow";
 };
 const dragLeave = (e, position) => {
   // dragOverItem.current = position;
   // setdragroleId(dragOverItem.current);
   // console.log(dragroleId, "dragroleId");
   // console.log(e.target.innerHTML, "e.target.innerHTML");
   // e.target.style.backgroundColor = "black";
 };

 const dragOver = (e) => {
   e.preventDefault();
 };

 const drop = (e) => {
   
  //  if(row.is_editable){
     AxiosLocal.post(`role/edit/${currentDragRole}`, {
      edit_type: "to_root",
     }).then((response) => {
       if (response.data.status == "Success") {
       console.log(response,"response.data.data");
         getCurrentDepartment(selectedworkflow.id);
         settoRootRole(true);
       }
     });
//  }else{
//    console.log("defaultdefaultdefault");
//    setroleToastDefault(true)
  
//  }
 };

  const userTable = () => {
    return (
      <UserRoleTable
        department={department}
        setDepartment={setDepartment}
        addDepartment={addDepartment}
        addDepartmentOpen={addDepartmentOpen}
        setaddDepartmentOpen={setaddDepartmentOpen}
        selectedworkflow={selectedworkflow}
        getworkflowList={getworkflowList}
        addRole={addRole}
        setaddRole={setaddRole}
        setrole={setrole}
        setpermission={setpermission}
        permission={permission}
        setrowId={setrowId}
        seteditableDepartment={seteditableDepartment}
        rowId={rowId}
        rootRoles={rootRoles}
        getCurrentDepartment={getCurrentDepartment}
        roleLoader={roleLoader}
        arrRoleDelete={arrRoleDelete}
        setarrRoleDelete={setarrRoleDelete}
        multipleDepartDelete={multipleDepartDelete}
        setmultipleDepartDelete={setmultipleDepartDelete}
        multipleSuccess={multipleSuccess}
        currentDragRole={currentDragRole}
        setcurrentDragRole={setcurrentDragRole}
        currentDragRoleName={currentDragRoleName}
        setcurrentDragRoleName={setcurrentDragRoleName}
      />
    );
  };
  //delete toast
  const [openToastDelete, setOpenToastDelete] = useState(false);

  const deleteWorkflow = () => {
    AxiosLocal.delete("workflow/", {
      data: { workflow_id: addDepartment },
    }).then((response) => {

      console.log(response, "response.data.status");
      if (response.data.status === "Success") {
//         const arrworkflows = workflows.filter((item) => item.id !== selectedworkflow.id);
//         console.log(arrworkflows,selectedworkflow.id,"arrworkflows");
//         setworkflows([...arrworkflows]);
// setselectedworkflow({})
        getworkflowList()
        setOpenToastDelete(true);
      }
    });
  };
  //confirm popup

  const [confirm, setConfirm] = useState(false);
  const handleClickOpen = () => {
    setConfirm(true);
  };

  const handleClickClose = () => {
    setConfirm(false);
  };

  //add role
  const [permission, setpermission] = React.useState("1");

  const [addRoleToastDepartment, setaddRoleToastDepartment] = React.useState(false);

  const [role, setrole] = useState("Untitled Role");
  const [rowId, setrowId] = useState();
  const [editableDepartment, seteditableDepartment] = useState(false);
  const [defaultAddRole, setdefaultAddRole] = useState(false)
  const [roleLoader, setroleLoader] = useState(false)

  const handleRoleAdd = () => {
    if(!editableDepartment){
      setdefaultAddRole(true)
    }else{
    setroleLoader(true)

      AxiosLocal.post("role/", {
        name: role,
        department_id: rowId,
        permission_id: permission,
      }).then((response) => {
        if (response.data.status == "Success") {
          setaddRoleToastDepartment(true);
          // getCurrentDepartment(selectedworkflow.id)
        // setTimeout(() => {
          let obj = department.find(department => department.id === rowId);
          obj.roles.push(response.data.data)
          setroleLoader(false)
        // }, 500);

          // setaddRole(false);
          // setrole("Untitled Role");
          // getworkflowList();
          // getCurrentDepartment();
        } else if (response.data.status == "Failed") {
          setroleLoader(false)

          // setaddRoleSameToast(true);
          // setaddRole(false);
          // setrole("Untitled Role");
          // getCurrentDepartment();
        }
      });
    }
   
  };
  
  const addRolefun = () => {
    console.log(selectedworkflow.id,"selectedworkflow.id");
    AxiosLocal.post("role/", {
      workflow_id: selectedworkflow.id,
      // permission_id: permission,
    }).then((response) => {
      console.log(response,"responseresponse");
      getCurrentDepartment(selectedworkflow.id)
    });

  }

  const workflowsgroup = () => {
   
    return workflows?.map((item) => (
      <UserRoleNavElement
        key={item.id}
      getCurrentDepartment={getCurrentDepartment}
        title={item.name}
        selectedworkflow={selectedworkflow}
        setselectedworkflow={setselectedworkflow}
        item={item}
        addDepartment={addDepartment}
        setaddDepartment={setaddDepartment}
        getworkflowList={getworkflowList}
        handleClickOpen={handleClickOpen}
        setDepartment={setDepartment}
        setdepartmentloading={setdepartmentloading}
      />
    ))
  }


  return (
    // <SkeletonTheme baseColor="#002E56" highlightColor="#012A50">
    <>
      <div style={{ display: "flex" }}>
        <Box style={{ width: "350px", margin: "10px 23px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontFamily: "URW DIN",
                color: theme?.workflows?.color,

                fontSize: "20px",
                textAlign: "center",
              }}
            >
              Workflow
            </p>
            {organizationUser(permissionsGlobal.add_workflows) && (
              <Button
                variant="contained"
                style={{
                  textTransform: "none",
                  minWidth: "157px",
                  padding: "9px 19px 11px 11px",

                  lineHeight: "22px",
                  backgroundColor: theme?.login?.mainColor,
                  color: "white",
                  fontFamily: "URW DIN REGULAR",
                }}
                onClick={() => addWorkflowfun()}
              >
                <img alt="" src="/assets/admin/plus.svg" />
                <span style={{ marginLeft: "13px", fontSize: "14px" }}>
                  Add workflow
                </span>
              </Button>
            )}
          </div>
          {loading ? (
            <List>
              <Skeleton
                variant="rounded"
                sx={{  backgroundColor:  theme?.loading?.loadingColor  }}
                width="100%"
                height={45}
              />
              <Skeleton
                variant="rounded"
                sx={{  backgroundColor:  theme?.loading?.loadingColor , marginTop: "6px" }}
                width="100%"
                height={45}
              />
              <Skeleton
                variant="rounded"
                sx={{  backgroundColor:  theme?.loading?.loadingColor , marginTop: "6px" }}
                width="100%"
                height={45}
              />
              <Skeleton
                variant="rounded"
                sx={{  backgroundColor:  theme?.loading?.loadingColor , marginTop: "6px" }}
                width="100%"
                height={45}
              />
            </List>
          ) : (
            <Scrollbars style={{ width: "100%", height: "65vh" }}>
              <List>
                {workflowsgroup()}

                {/* <UserRoleNavElement title='Audio postproduction'  />
             <UserRoleNavElement title='Video conferencing'  />
             <UserRoleNavElement title='Film production'  />  */}
              </List>
            </Scrollbars>
          )}
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          style={{
            alignSelf: "auto",
            backgroundColor: theme?.workflows?.border,
            // height: '25px',
            marginTop: "23px",
            marginBottom: "21px",
            width: "2px",
          }}
        />
        <div
          style={{ width: "100%" }}
          //  onDragEnter={(e) => dragEnter(e)}
          //  onDragLeave={(e) => dragLeave(e)}
          //  onDragOver={(e) => dragOver(e)}
          //  onDrop={(e) => drop(e)}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0px 17px 0px 20px",
            }}
          >
            <div
              style={{
                color: theme?.table?.mainheadingColor,
                fontSize: "20px",
                fontFamily: "URW DIN",
                marginRight: "20px",
                marginLeft: "25px",
                marginTop: "30px",
              }}
            >
              User roles
            </div>
            {/* <SearbarEvent /> */}
            <div style={{ display: "flex" }}>
              {/* <div
                style={{
                  margin: "20px 12px 0px 12px",
                  padding: "5px 26px",
                  backgroundColor: theme?.table?.buttonbgColor,
                  borderRadius: "4px",
                  height: "32px",
                }}
              >
                <img
                  src="/assets/icons/icon1.svg"
                  style={{ marginTop: "6px" }}
                />
              </div> */}
              {organizationUser(permissionsGlobal.add_workflows) && (
                <Button
                  variant="contained"
                  style={{
                    textTransform: "none",
                    minWidth: "170px",
                    padding: "8px 30px 8px 20px",
                    fontSize: "14px",
                    fontWeight: "300",
                    lineHeight: "22px",
                    backgroundColor: theme?.table?.buttonbgColor,
                    margin: "20px 10px 0px 0px",
                    color: "#88A1AB",
                    height: "42px",
                    fontFamily: "URW DIN REGULAR",
                  }}
                  onClick={() => addDepartmentfun()}
                >
                  <img
                    src="/assets/admin/folder.svg"
                    style={{ height: "18px", width: "25px" }}
                    alt=""
                  />
                  <span style={{ marginLeft: "16px" }}>Add department</span>
                </Button>
              )}
              {organizationUser(permissionsGlobal.add_workflows) && (
                <Button
                  variant="contained"
                  style={{
                    textTransform: "none",
                    minWidth: "161px",
                    padding: "8px 30px 8px 20px",
                    fontSize: "14px",
                    lineHeight: "22px",
                    backgroundColor: theme?.login?.mainColor,
                    margin: "20px 10px 0px 0px",
                    color: "#E1E7EA",
                    height: "42px",
                    fontFamily: "URW DIN REGULAR",
                  }}
                  onClick={
                    rowId == undefined
                      ? () => addRolefun()
                      : () => handleRoleAdd()
                  }
                  // onClick={addRolefun}
                >
                  <img src="/assets/admin/plus.svg" />
                  <span style={{ marginLeft: "16px" }}>Add role</span>
                </Button>
              )}
              {organizationUser(permissionsGlobal.delete_workflows) && (
                <Button
                  variant="contained"
                  style={{
                    textTransform: "none",
                    minWidth: "170px",
                    // padding: "8px 30px 8px 20px",
                    fontSize: "14px",
                    fontWeight: "300",
                    lineHeight: "22px",
                    backgroundColor: theme?.table?.buttonbgColor,
                    margin: "20px 10px 0px 0px",
                    color: "#88A1AB",
                    height: "42px",
                    fontFamily: "URW DIN REGULAR",
                  }}
                  onClick={handleClickOpenRole}
                >
                  <img
                    src="/assets/admin/close.svg"
                    alt=""
                    style={{ marginTop: "2px" }}
                  />
                  <div style={{ marginLeft: "16px" }}>
                    Delete{" "}
                    {arrRoleDelete.length == 0
                      ? ""
                      : `(${arrRoleDelete.length})`}{" "}
                    {multipleDepartDelete.length == 0
                      ? ""
                      : `(${multipleDepartDelete.length})`}{" "}
                  </div>
                </Button>
              )}
            </div>
          </div>

          <div style={{ marginRight: "17px" }}>
            {/* <UserRoleTable department={department} /> */}
            {departmentloading ? (
              <>
                <Skeleton
                  variant="rounded"
                  sx={{
                     backgroundColor:  theme?.loading?.loadingColor ,
                    marginLeft: "40px",
                    marginTop: "20px",
                  }}
                  width="100%"
                  height={46}
                />
                <Skeleton
                  variant="rounded"
                  sx={{
                     backgroundColor:  theme?.loading?.loadingColor ,
                    marginLeft: "40px",
                    marginTop: "15px",
                  }}
                  width="100%"
                  height={50}
                />
                <Skeleton
                  variant="rounded"
                  sx={{
                     backgroundColor:  theme?.loading?.loadingColor ,
                    marginLeft: "40px",
                    marginTop: "15px",
                  }}
                  width="100%"
                  height={50}
                />
                <Skeleton
                  variant="rounded"
                  sx={{
                     backgroundColor:  theme?.loading?.loadingColor ,
                    marginLeft: "40px",
                    marginTop: "15px",
                  }}
                  width="100%"
                  height={50}
                />
                <Skeleton
                  variant="rounded"
                  sx={{
                     backgroundColor:  theme?.loading?.loadingColor ,
                    marginLeft: "40px",
                    marginTop: "15px",
                  }}
                  width="100%"
                  height={50}
                />
                <Skeleton
                  variant="rounded"
                  sx={{
                     backgroundColor:  theme?.loading?.loadingColor ,
                    marginLeft: "40px",
                    marginTop: "15px",
                  }}
                  width="100%"
                  height={50}
                />
              </>
            ) : (
              userTable()
            )}
          </div>
          <div
            style={{ width: "100%", minHeight: "200px" }}
            onDragEnter={(e) => dragEnter(e)}
            onDragLeave={(e) => dragLeave(e)}
            onDragOver={(e) => dragOver(e)}
            onDrop={(e) => drop(e)}
          ></div>
        </div>
      </div>
      <Toast
        openToast={openToast}
        setOpenToast={setOpenToast}
        message="Workflow Added Successfully"
      />
      <Toast
        openToast={openToastDelete}
        setOpenToast={setOpenToastDelete}
        message="Workflow deleted Successfully"
      />
      <Toast
        openToast={openToastFail}
        setOpenToast={setOpenToastFail}
        message="Workflow is not added. Please check your connection"
      />
      <Toast
        openToast={newDepartmentToast}
        setOpenToast={setnewDepartmentToast}
        message="Department added Successfully"
      />
      <ConfirmPop
        message="Are you sure you want to delete. All the Departments related to this workflow will be lost."
        confirm={confirm}
        handleClickOpen={handleClickOpen}
        handleClickClose={handleClickClose}
        handleDelete={deleteWorkflow}
      />
      <Toast
        openToast={addRoleToastDepartment}
        setOpenToast={setaddRoleToastDepartment}
        message="Role added successfully"
      />
      <Toast
        openToast={defaultAddRole}
        setOpenToast={setdefaultAddRole}
        message="Roles can't be added to default department"
      />

      <Toast
        openToast={toRootRole}
        setOpenToast={settoRootRole}
        message="Role updated successfully"
      />

      <ConfirmPop
        message="Are you sure you want to delete the roles"
        confirm={confirmRole}
        handleClickOpen={handleClickOpenRole}
        handleClickClose={handleClickCloseRole}
        handleDelete={deletemultipleRole}
      />
    </>
    // </SkeletonTheme>
  );
};

export default UserRoles;
