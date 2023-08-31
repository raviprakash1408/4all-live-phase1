import React, { useEffect, useState, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Box, Checkbox, Skeleton, Collapse } from '@mui/material';
import MuiTableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Toast from "../../../sections/Toast";
import { useSelector } from "react-redux";
import { AxiosLocal } from "../../../utilities/axiosUtils.ts";
import ConfirmPop from "../ConfirmPop";
import RoleElement from "./RoleElement";
import EditableField from "./EditableField";



  const TableCell = withStyles({
    root: {
      borderBottom: "none",
      padding: "12px",
    },
  })(MuiTableCell);

  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
  });
  
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
  
  

function DepartmentRow(props) {
    const {
      row,
      addDepartment,
      addDepartmentOpen,
      setaddDepartmentOpen,
      selectedworkflowId,
      getworkflowList,
      addRole,
      selectedDepartment,
      setaddRole,
      setpermission,
      permission,
      role,
      setrole,
      setrowId,
      seteditableDepartment,
      rowId,
      getCurrentDepartment,
      currentDragRole,
      currentDragRoleName,
      department,
      setDepartment,
      setcurrentDragRole,
      roleLoader,
      arrRoleDelete,
      setarrRoleDelete,
      multipleDepartDelete,
      setmultipleDepartDelete,
      multipleSuccess,
      loadingPerm,
      permissions
    } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    const [hoverpop, setHoverpop] = React.useState(false);
    const [openToast, setOpenToast] = React.useState(false);
  
    const theme = useSelector((state) => state.theme.themeData);
    const permissionss = useSelector((state) => state.permissions);
  
    const [toggle, setToggle] = useState(true);
    const [departmentName, setDepartmentName] = useState(row.name);
    function toggleInput() {
      setToggle(false);
    }
  
    function handleChange(event) {
      setDepartmentName(event.target.value);
    }

    //multiple select checkbox

    useEffect(() => {
      setCheckedList([])
    }, [multipleSuccess])
    

    
    const [checkedList, setCheckedList] = useState([]);

    const [itemsChecked, setItemsChecked] = useState(false);

    const handleCheckboxClick = (e) => {
      
    console.log(checkedList,"checkedList");
    
    console.log(multipleSuccess, "multipleSuccessmultipleSuccess");
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
 
  const [departmentCheckbox, setdepartmentCheckbox] = useState(false)
    const selectItem = (e) => {
      setdepartmentCheckbox(!departmentCheckbox)
      console.log(departmentCheckbox,"departmentCheckbox");
      const { checked } = e.target;
      const collection = [];

      
      if (checked) {
      for (const role of row.roles) {
        collection.push(role.id);
      }
      setmultipleDepartDelete([...multipleDepartDelete, row.id])
        
      }

      // collectionDepartment.push(row.id);

   
      const arr = [...arrRoleDelete, ...collection]
      const sole = [...new Set(arr)]
      setarrRoleDelete([...sole])
     
      if (!checked) {
        const demo = []
        for (const role of row.roles) {
          demo.push(role.id);
        }
      const difference = arrRoleDelete.filter( ( el ) => !demo.includes( el ) )
      setarrRoleDelete([...difference])

    }

      setCheckedList(collection);
   
      setItemsChecked(checked);
    };

    //delete toast
    const [openToastDelete, setOpenToastDelete] = useState(false);
  
    const deleteDepartment = () => {
      AxiosLocal.delete("department/", { data: { department_ids: [row.id] } }).then(
        (response) => {
          if (response.data.status == "Success") {
            setOpenToastDelete(true);
            const departmentArr = department.filter((item) => item.id !== row.id);
            console.log(departmentArr,"arrworkflows");
            setDepartment([...departmentArr]);
      
            // getCurrentDepartment(selectedworkflowId);

          }
        }
      );
    };
  
    //confirm popup
  
    const [confirm, setConfirm] = useState(false);
    const handleClickOpen = () => {
      setConfirm(true);
    };
  
    const handleClickClose = () => {
      setConfirm(false);
    };
  
    //edit toast
    const [openToastEdit, setOpenToastEdit] = useState(false);
  
    const handleEdit = () => {
      AxiosLocal.post(`department/edit/${row.id}`, {
        name: departmentName,
      }).then((response) => {
        if (response.data.status == "Success") {
          setOpenToastEdit(true);
        }
      });
    };
  
    //outside click deselecting department
  
    const warpperRefRole = useRef(null);
  
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
  
      return () => {
        document.addEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    const handleClickOutside = (event) => {
      const { current: wrap } = warpperRefRole;
      if (wrap && !wrap.contains(event.target)) {
        setrowId(undefined);
      }
    };
  
    //permission drop for adding role
  
    // const ITEM_HEIGHT = 44;
    // const ITEM_PADDING_TOP = 8;
    // const MenuProps = {
    //   PaperProps: {
    //     style: {
    //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    //       width: 125,
    //       background: theme?.spaces?.tertiaryColor,
    //       color: theme?.spaces?.mainColor,
    //       fontSize: "14px",
    //       fontFamily: "URW DIN REGULAR",
    //       border: "1px solid",
    //       borderColor: theme?.table?.buttonbgColor,
    //     },
    //   },
    // };
  
    // const [age, setAge] = React.useState("Participant");
  
    // const handleChangePermission = (event) => {
    //   setAge(event.target.value);
    // };
  
    //for adding role
    // const [permission, setpermission] = React.useState();
    const handleChangepermission = (event) => {
      setpermission(event.target.value);
    };
    // const [role, setrole] = useState("Untitled Role");
    // const handleRoleAdd = () => {
    //   AxiosLocal.post("role/", {
    //     name: role,
    //     department_id: row.id,
    //     permission_id: permission,
    //   }).then((response) => {
    //     console.log(response, "responserole");
    //     if (response.data.status == "Success") {
    //       setaddRoleToast(true);
    //       setaddRole(false);
    //       setrole("Untitled Role");
    //       getworkflowList();
    //     } else if (response.data.status == "Failed") {
    //       setaddRoleSameToast(true);
    //       setaddRole(false);
    //       setrole("Untitled Role");
  
    //       getworkflowList();
    //     }
    //   });
    // };
  
    const [openToastDefault, setOpenToastDefault] = useState(true);
    const [toggleAddRole, settoggleAddRole] = useState(true);
    const [roleToastAdd, setroleToastAdd] = useState(false);
    const [addRoleSameToast, setaddRoleSameToast] = useState(false);
    const [roleToastDefault, setroleToastDefault] = useState(false);
  
    // for editing role
    const [roleId, setroleId] = useState();
  
    //delete toast role
    const [openToastDeleteRole, setOpenToastDeleteRole] = useState(false);
  
    //confirm popup role
  
    const [confirmRole, setConfirmRole] = useState(false);
    const handleClickOpenRole = () => {
      setConfirmRole(true);
    };
  
    const handleClickCloseRole = () => {
      setConfirmRole(false);
    };

  
    const deleteRole = () => {
  
      AxiosLocal.delete("role/", { data: { role_ids: [roleId.id] } }).then(
        (response) => {
       
          if (response.data.status == "Success") {
            setOpenToastDeleteRole(true);
            console.log(response,"responseresponse");
            getCurrentDepartment(selectedworkflowId);
          // let obj = department.find(department => department.id === rowId);
          // console.log(department, rowId, obj,"departmentdepartmentdepartment");
//           const filteredRoles = obj.roles.filter((item) => item.id !== roleId.id);
// console.log(filteredRoles,"filteredRolesfilteredRoles");

            // const dep = department.forEach(function(o) {
            //   o.roles = o.roles.filter(s => s.id != roleId.id);
            // });
            // console.log(dep, "depdepdep");
            // setDepartment([...dep])
          }
        }
      );
    };
  
    //edit role
  
    const [editRoleToast, seteditRoleToast] = useState(false);
  
    //drag
    const [dragroleId, setdragroleId] = useState("1");
    const [dragroleLeaveId, setdragroleLeaveId] = useState();

    const dragOverItem = useRef();

    const dragLeave = (e, position) => {
      console.log(position,e,row.id,"positionposition");
      setdragroleLeaveId(position)
      // dragOverItem.current = position;
      // setdragroleId(dragOverItem.current);
      // console.log(dragroleId, "dragroleId");
      // console.log(e.target.innerHTML, "e.target.innerHTML");
      // e.target.style.backgroundColor = "black";
    }; 

    const dragEnter = (e, position) => {
      if(!row.is_editable ){
          console.log("default");
      }
      else{
        dragOverItem.current = position;
        setdragroleId(dragOverItem.current);
        console.log(position,dragOverItem, "position");
        console.log(e.target.innerHTML, "e.target.innerHTML");
      }
      
      // e.target.style.backgroundColor = "yellow";
    };
  
  
    const dragOver = (e) => {
      e.preventDefault();
    };
  
    const drop = () => {
      if (dragroleId == "1" && row.is_editable) {
        console.log("Trying to drag on same department");
      } else if (row.is_editable) {
        AxiosLocal.post(`role/edit/${currentDragRole}`, {
          name: currentDragRoleName,
          department_id: dragroleId,
          // permission_id: 1,
        }).then((response) => {
          if (response.data.status == "Success") {
            setaddRole(false);
            console.log(
              row,
              currentDragRole,
              dragroleId,
              dragroleLeaveId,
              "defaultdefaultdefault defaultdefaultdefault"
            );
            console.log(response.data.data, "response.data.data");

            // const dep = [...department]
            // dep.forEach(function(o) {
            //   o.roles = o.roles.filter(s => s.id != response.data.data.id);
            // });
            // let obj = dep.find(department => department.id === rowId);
            // obj.roles.push(response.data.data)
            // console.log(dep,"departmentdepartmentdepartmentdepartment");
            // setDepartment([...dep])

            setroleToastAdd(true);
            getCurrentDepartment(selectedworkflowId);
          }
        });
      } else {
        console.log("defaultdefaultdefault");
        setroleToastDefault(true);
      }
    };
    const handlePreventClick = (e) => {
      e.stopPropagation();
      console.log("The link was clicked.");
    };
    const addWhenNoRole = () => {

      AxiosLocal.post("role/", {
        department_id: rowId,
      }).then((response) => {
        if (response.data.status == "Success") {
          getCurrentDepartment(selectedworkflowId)
          
          // setroleLoader(false)
  
        } 
      });
    }
    return (
      <>
        <TableRow
          // ref={warpperRefRole}
          key={row.id}
          className={`${classes.root} collapseRow`}
          style={{
            backgroundColor:
              rowId == row.id
                ? theme?.workflows?.iconsBg
                : theme?.workflows?.iconsBg,
            cursor: "pointer",
          }}
          onDragEnter={(e) => dragEnter(e, row.id)}
          onDragLeave={(e) => dragLeave(e, row.id)}
          onDragOver={(e) => dragOver(e)}
          onDrop={() => drop()}
          onClick={() => {
            setOpen(!open);

            if (open) {
              setrowId(undefined);
              console.log("setrowId(row.id);");
            } else {
              setrowId(row.id);
            }

            seteditableDepartment(row.is_editable);
          }}
        >
          {/* <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell> */}
          {/* <div style={{display:'flex', alignItems:'center'}}> */}
          {/* <Checkbox {...label}  sx={{  color: theme?.table?.buttonColor,
           
                        '& .MuiSvgIcon-root': { fontSize: 22 } }} style={{marginLeft:'14px', width:'30px', height:'30px'}} /> */}
          <TableHeaderCell
            align="left"
            style={{
              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
              color: "#88A1AB",
              backgroundColor: theme?.workflows?.iconsBg,
              width: "3%",
            }}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <div
              style={{
                border: theme?.workflows?.checkboxBorder,
                borderRadius: "4px",
                backgroundColor:
                  rowId == row.id
                    ? theme?.workflows?.checkbox
                    : theme?.workflows?.checkbox,
                width: "14px",
                height: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {open || rowId ? (
                <img
                  src="/assets/admin/up-white.svg"
                  style={{ height: "5px", width: "8px" }}
                  alt=""
                />
              ) : (
                <img
                  src="/assets/admin/down-white.svg"
                  style={{ height: "5px", width: "8px" }}
                  alt=""
                />
              )}
            </div>
          </TableHeaderCell>

          <TableHeaderFolder
            align="left"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px",
              borderRadius: rowId == row.id ? "2px" : "4px",
              backgroundColor: theme?.workflows?.headerBg,
            }}
          >
            {!row.is_editable ? (
              <>
                <img
                  src="/assets/admin/simplelock.svg"
                  style={{ marginRight: "14px" }}
                  alt=""
                />
                <img src="/assets/admin/folder.svg" alt="" />
              </>
            ) : (
              <>
                <span onClick={handlePreventClick}>
                  <Checkbox
                    {...label}
                    checked={
                      departmentCheckbox &&
                      row.roles.length == checkedList.length
                    }
                    onClick={selectItem.bind(this)}
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
                </span>
                <img
                  style={{ paddingLeft: "12px" }}
                  src="/assets/admin/folder.svg"
                  alt=""
                />
              </>
            )}
          </TableHeaderFolder>

          {/* </div> */}
          <TableCell
            align="left"
            style={{
              fontSize: "14px",
              fontFamily: "URW DIN",
              color: theme?.workflows?.textcolor,
              backgroundColor: theme?.workflows?.buttonBg,
              width: "30%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: theme?.workflows?.buttonBg,
              }}
            >
              <div
                style={{
                  width: "25px",
                  height: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1B3944",
                  backgroundColor: "#88A1AB",
                  fontSize: "12px",
                  borderRadius: "50%",
                  marginRight: "13px",
                }}
              >
                <div>{row.roles.length}</div>
              </div>

              {!row.is_editable ? (
                <p style={{ margin: "0px" }}>{departmentName}</p>
              ) : (
                <>
                  {/* {toggle ? (
                      <p
                        style={{ margin: "0px" }}
                        onDoubleClick={() => {
                          setToggle(false);
                        }}
                      >
                        {departmentName}
                      </p>
                    ) : (
                      <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        sx={{
                          "& .MuiInputLabel-root": {
                            fontSize: "14px",
                            height: "25px",
                            marginTop: "0px",
                          },
                          "& .MuiOutlinedInput-root": {
                            fontSize: "14px",
                            height: "25px",
                            marginTop: "0px",
                          },
  
                          "& .MuiOutlinedInput-input": {
                            fontFamily: "URW DIN REGULAR",
                            fontSize: "14px",
  
                            color: theme?.profile?.primaryColor,
                          },
                          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                            {
                              border: "1px solid",
  
                              borderColor: "#143F63",
  
                              borderRadius: "4px",
                              color: theme?.profile?.primaryColor,
                            },
                          "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                            {
                              border: "1px solid",
  
                              borderColor: "#143F63",
  
                              borderRadius: "4px",
                            },
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              border: "1px solid",
  
                              borderColor: "#143F63",
  
                              borderRadius: "4px",
                            },
                        }}
                        InputLabelProps={{
                          style: { color: "#5D7C90" },
                        }}
                        type="text"
                        value={departmentName}
                        onChange={handleChange}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            setToggle(true);
                            event.preventDefault();
                            event.stopPropagation();
                            handleEdit();
                          }
                        }}
                        autoFocus
                      />
                    )} */}
                  <EditableField
                    name={departmentName}
                    setName={setDepartmentName}
                    handleChange={(event) =>
                      setDepartmentName(event.target.value)
                    }
                    handleClick={handleEdit}
                    rowId={rowId}
                    row={row}
                    prevName={row.name}
                  />
                </>
              )}
            </div>
          </TableCell>
          <TableCell
            align="left"
            style={{
              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
              color: "#88A1AB",
              backgroundColor: theme?.workflows?.buttonBg,
              width: "10%",
            }}
          ></TableCell>

          <TableCell
            style={{ backgroundColor: theme?.workflows?.buttonBg, width: "30%" }}
            align="right"
          ></TableCell>

          <TableCell
            align="right"
            style={{ backgroundColor: theme?.workflows?.buttonBg, width: "20%" }}
          >
            {row.is_editable && permissionss.delete_workflows ? (
              <span
              // onClick={handlePreventClick}
              >
                <img
                  src="/assets/admin/close-icon.svg"
                  alt=""
                  className="closeIcon"
                  onClick={handleClickOpen}
                  style={{
                    paddingRight: "12px",
                    filter:
                      rowId == row.id
                        ? "brightness(0) saturate(100%) invert(14%) sepia(28%) saturate(3915%) hue-rotate(186deg) brightness(96%) contrast(104%)"
                        : "",
                  }}
                />
              </span>
            ) : (
              <></>
            )}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableHeaderCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              paddingRight: 0,
              backgroundColor: theme?.workflows?.iconsBg,
            }}
            colSpan={8}
          >
            <Collapse in={open || row.id == rowId} timeout="auto" unmountOnExit>
              <Box padding={1}>
                {row.roles.length == 0 && !roleLoader && (
                  <>
                    <div
                      style={{
                        height: "50px",
                        backgroundColor: theme?.workflows?.bgColor,

                        marginLeft: "25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "4px",
                        fontFamily: "URW DIN REGULAR",
                        color: "#88A1AB",
                        position: "relative",
                      }}
                    >
                      <p>No Roles</p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          position: "absolute",
                          right: "20px",
                          cursor: "pointer",
                        }}
                        onClick={addWhenNoRole}
                      >
                        <img alt="" src="/assets/admin/videoplus.svg" />
                      </div>
                    </div>
                  </>
                )}
                <div class="treeview">
                  <ul>
                    {row.roles.map((role) => (
                      <>
                        <RoleElement
                          role={role}
                          row={row}
                          key={role.id}
                          // permissiongroup={permissiongroup}
                          // handleChangepermissiongroup={
                          //   handleChangepermissiongroup
                          // }
                          // getworkflowList={getworkflowList}
                          setOpenToastDeleteRole={setOpenToastDeleteRole}
                          setroleId={setroleId}
                          handleClickOpenRole={handleClickOpenRole}
                          seteditRoleToast={seteditRoleToast}
                          setcurrentDragRole={setcurrentDragRole}
                          handleCheckboxClick={handleCheckboxClick}
                          checkedList={checkedList}
                          selectedworkflowId={selectedworkflowId}
                          getCurrentDepartment={getCurrentDepartment}
                          permissions={permissions}
                          loadingPerm={loadingPerm}
                          drop={drop}
                          dragOver={(e) => dragOver(e)}
                        />
                      </>
                    ))}
                    {roleLoader && rowId == row.id ? (
                      <li>
                        <div className="line">
                          {" "}
                          <Skeleton
                            variant="rounded"
                            sx={{
                              backgroundColor: theme?.loading?.loadingColor,
                              marginLeft: "5px",
                            }}
                            height={50}
                          />
                        </div>
                      </li>
                    ) : (
                      <></>
                    )}
                  </ul>

                  {/* {addRole &&
                      selectedDepartment.slice(-1) == row.id &&
                      !row.is_editable && (
                        <ToastRole
                          openToast={openToastDefault}
                          setOpenToast={setOpenToastDefault}
                          message="Roles cannot be add to default department"
                          setaddRole={setaddRole}
                        />
                      )} */}
                </div>
              </Box>
            </Collapse>
          </TableHeaderCell>
        </TableRow>
        <Toast
          openToast={openToastDeleteRole}
          setOpenToast={setOpenToastDeleteRole}
          message="Role Deleted Successfully"
        />
        <Toast
          openToast={openToast}
          setOpenToast={setOpenToast}
          message="Link Copied !!"
        />
        <ConfirmPop
          message="Are you sure you want to delete. All the roles related to this department wil be lost."
          confirm={confirm}
          handleClickOpen={handleClickOpen}
          handleClickClose={handleClickClose}
          handleDelete={deleteDepartment}
        />
        <ConfirmPop
          message="Are you sure you want to delete?"
          confirm={confirmRole}
          handleClickOpen={handleClickOpenRole}
          handleClickClose={handleClickCloseRole}
          handleDelete={deleteRole}
        />
        <Toast
          openToast={openToastEdit}
          setOpenToast={setOpenToastEdit}
          message="Department Edited Successfully"
        />
        <Toast
          openToast={openToastDelete}
          setOpenToast={setOpenToastDelete}
          message="Department Deleted Successfully"
        />

        <Toast
          openToast={addRoleSameToast}
          setOpenToast={setaddRoleSameToast}
          message="Role with same name already exists, please choose another name"
        />

        <Toast
          openToast={editRoleToast}
          setOpenToast={seteditRoleToast}
          message="Role Edited successfully"
        />
        <Toast
          openToast={roleToastAdd}
          setOpenToast={setroleToastAdd}
          message="Role updated successfully"
        />
        <Toast
          openToast={roleToastDefault}
          setOpenToast={setroleToastDefault}
          message="Roles can't be add to default departments"
        />
        {/* <Toast
          openToast={addRoleToast}
          setOpenToast={setaddRoleToast}
          message="Role added successfully"
        /> */}
      </>
    );
  }

  export default DepartmentRow