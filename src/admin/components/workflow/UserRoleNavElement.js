import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  IconButton,
  TextField,
} from "@mui/material";
import ConfirmPop from "../ConfirmPop";
import { AxiosLocal } from "../../../utilities/axiosUtils.ts";
import Toast from "../../../sections/Toast";
import { useSelector } from "react-redux";
import { organizationUser } from "../../../utilities/common";

const UserRoleNavElement = ({
  title,
  item,
  selectedworkflow,
  setselectedworkflow,
  setaddDepartment,
  getworkflowList,
  handleClickOpen,
  getCurrentDepartment,
  addDepartment,
  setDepartment,
  setdepartmentloading,
}) => {
  const permissions = useSelector((state) => state.permissions);

  const [hover, setHover] = useState(false);
  const [hoverStar, setHoverStar] = useState(false);
  const [hoverWorkflow, sethoverWorkflow] = useState("");
  const theme = useSelector((state) => state.theme.themeData);

  //edit
  const [toggle, setToggle] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [openerrorToast, setOpenerrorToast] = useState(false);

  //toast

  const [openToast, setOpenToast] = useState(false);
  const [defaultId, setdefaultId] = useState();

  useEffect(() => {
    setName(title);
  }, [title]);

 
  const handleEdit = () => {
   

    AxiosLocal.post(`workflow/edit/${hoverWorkflow}`, {
      name: name,
    }).then((response) => {
      if (response.data.status == "Success") {
        console.log(response, "responseresponseresponse");
        getworkflowList();
        setOpenToast(true);
        setMessage("Workflow Edited Successfully");
      }
    });
   
  };

  //outside click

  const workflowref = useRef(null);

  useEffect(() => {
    console.log(name, "name");
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, [name]);

  const handleClickOutside =(event) => {
    const { current: wrap } = workflowref;
    if (wrap && !wrap.contains(event.target)) {
      // if (name) {
        handleEdit();
        setToggle(true);
      // } else {
      //   setOpenerrorToast(true);
      //   setMessage("Workflow name can't be empty. Please add right name.");
      // }
    }
  }



  const defaultWorkflowfun = () => {
    AxiosLocal.post(`workflow/edit/${defaultId}`, {
      default: true,
    }).then((response) => {
      console.log(response, "response");
      getworkflowList();
    });
  };
  //confirm popup

  const [confirm, setConfirm] = useState(false);
  const handleClickOpenConfirm = () => {
    setConfirm(true);
  };

  const handleClickCloseConfirm = () => {
    setConfirm(false);
  };
  return (
    <>
      <ListItem
        disablePadding
        onMouseEnter={() => {
          // setaddDepartment(item.id)
          sethoverWorkflow(item.id);

          setHover(true);
        }}
        onMouseLeave={() => {
          // setaddDepartment(-1)
          setHover(false);
          sethoverWorkflow("");
        }}
        onClick={() => {
          setselectedworkflow(item);
          setaddDepartment(item.id);
          setdepartmentloading(true);
          getCurrentDepartment(item.id);
        }}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="comments"
            style={{ marginTop: "-5px" }}
          >
            {organizationUser(permissions.delete_workflows) && (
              <img
                alt=""
                src={
                  item.default
                    ? ""
                    : // selectedworkflow.id == item.id &&
                    hover
                    ? "/assets/admin/close-icon.svg"
                    : ""
                }
                style={{
                  filter:
                    selectedworkflow.id == item.id
                      ? ""
                      : hover
                      ? "brightness(0) saturate(100%) invert(64%) sepia(7%) saturate(810%) hue-rotate(152deg) brightness(96%) contrast(94%)"
                      : "",
                }}
                onClick={handleClickOpen}
              />
            )}
          </IconButton>
        }
      >
        <ListItemButton
          style={{
            backgroundColor: !toggle
              ? theme?.workflows?.buttonBg
              : selectedworkflow.id == item.id
              ? theme?.common?.color1
              : hover
              ? theme?.workflows?.hover
              : theme?.workflows?.buttonBg,
            borderRadius: "4px",
            marginBottom: "5px",
            height: "42px",
          }}
        >
          <ListItemIcon>
            {
              // hover ? (
              item.default ? (
                <img alt="" src={"/assets/admin/star-hover.png"} />
              ) : selectedworkflow.id == item.id && hover ? (
                <img
                  alt=""
                  onMouseEnter={() => setHoverStar(true)}
                  onMouseLeave={() => setHoverStar(false)}
                  onClick={() => {
                    setdefaultId(item.id);
                    handleClickOpenConfirm();
                    // defaultWorkflowfun(item.id)
                  }}
                  src={
                    hoverStar
                      ? "/assets/admin/star-hover.png"
                      : "/assets/admin/star.svg"
                  }
                />
              ) : hover ? (
                <img
                  alt=""
                  onMouseEnter={() => setHoverStar(true)}
                  onMouseLeave={() => setHoverStar(false)}
                  onClick={() => {
                    setdefaultId(item.id);
                    handleClickOpenConfirm();
                    // defaultWorkflowfun(item.id)
                  }}
                  src={
                    hoverStar
                      ? "/assets/admin/star-hover.png"
                      : "/assets/admin/star-hover.svg"
                  }
                  // style={{
                  //   filter: hover
                  //     ? "brightness(0) saturate(100%) invert(13%) sepia(24%) saturate(5608%) hue-rotate(189deg) brightness(97%) contrast(102%)"
                  //     : " brightness(0) invert(1)",
                  // }}
                />
              ) : (
                <></>
              )
            }
          </ListItemIcon>

          {toggle ? (
            <ListItemText
              primaryTypographyProps={{
                color:
                  hover || selectedworkflow.id == item.id ? "white" : "#88A1AB",
                fontFamily:
                  hover || selectedworkflow.id == item.id
                    ? "URW DIN"
                    : "URW DIN REGULAR",
              }}
              primary={name}
            />
          ) : (
            <TextField
              ref={workflowref}
              autoFocus
              id="edit"
              label=""
              variant="outlined"
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                  height: "30px",
                  marginTop: "-5px",
                  paddingLeft: "12px",
                  width: "100%",
                },
                "& .MuiOutlinedInput-root": {
                  fontSize: "14px",
                  height: "30px",
                  marginTop: "1px",
                  width: "100%",
                },

                "& .MuiOutlinedInput-input": {
                  fontFamily: "URW DIN REGULAR",
                  fontSize: "14px",

                  color: theme?.workflows?.textcolor,
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid",

                  borderColor: name ? "#2D5472" : "#E61959",

                  borderRadius: "4px",
                  color: "white",
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    border: "0.5px solid",

                    borderColor: name ? "#2D5472" : "#E61959",

                    borderRadius: "4px",
                  },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: theme?.workflows?.border,

                    borderColor: name ? "#2D5472" : "#E61959",

                    borderRadius: "4px",
                  },
              }}
              // className={classes.overrides}
              InputLabelProps={{
                style: { color: "#5D7C90" },
              }}
              type="text"
              name="text"
              placeholder="Enter Workflow Name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              onFocus={(event) => {
                event.target.select();
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === "Escape") {
                  event.preventDefault();
                  event.stopPropagation();
                  if (name) {
                    handleEdit();
                    setToggle(true);
                  } else {
                    setOpenerrorToast(true);
                    setMessage(
                      "Workflow name can't be empty. Please add right name."
                    );
                  }
                }
              }}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          {hover && organizationUser(permissions.edit_workflows) && (
            <div onClick={(e) => e.stopPropagation()}>
              <img
                alt=""
                onClick={() => setToggle(false)}
                style={{
                  marginRight: "-12px",
                  filter:
                    selectedworkflow.id == item.id
                      ? "brightness(0) saturate(100%) invert(12%) sepia(36%) saturate(4327%) hue-rotate(190deg) brightness(93%) contrast(101%)"
                      : "",
                }}
                src={"/assets/admin/edit-workflow.svg"}
              />
            </div>
          )}
        </ListItemButton>
      </ListItem>
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
      <ConfirmPop
        message="Are you sure you want to change default workflow. All the user roles will be changed to default role of the selected workflow and all logged in users will get reloaded."
        confirm={confirm}
        handleClickOpen={handleClickOpenConfirm}
        handleClickClose={handleClickCloseConfirm}
        handleDelete={defaultWorkflowfun}
      />
    </>
  );
};

export default UserRoleNavElement;
