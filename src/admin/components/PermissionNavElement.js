import React, { useState, useEffect, useRef } from "react";
import {
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
  TextField,
} from "@mui/material";
import { AxiosLocal } from '../../utilities/axiosUtils.ts';
import ConfirmPop from './ConfirmPop';
import Toast from '../../sections/Toast';
import { useSelector } from 'react-redux';

const PermissionNavElement = ({
  title,
  onClick,
  selected,
  permission,
  getPermissions,
}) => {
  const [hover, setHover] = useState(false);
  const [permId, setpermId] = useState();
  const theme = useSelector((state) => state.theme.themeData);

  //error toast

  const [openerrorToast, setOpenerrorToast] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const [message, setMessage] = useState("");

  // popup delete
  const [confirm, setConfirm] = React.useState(false);

  // edit
  const [toggle, setToggle] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(title);
  }, [title]);

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleEdit = () => {
    AxiosLocal.post(`user/permission/edit/${permId}`, {
      title: name,
    }).then((response) => {
      if (response.data.status == "Success") {
        console.log(response, "responseresponseresponse");
        setMessage(response.data.message);
        setOpenToast(true)

        // getPermissions();
      }
    });
  };

  //outside click

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
      // console.log(name, "namenamename");
        // if (name) {
          handleEdit();
          setToggle(true);
        // } else {
        //   setOpenerrorToast(true);
        //   setMessage("Permission name can't be empty. Please add right name.");
        // }
    }
  };

  const handleClickOpen = () => {
    setConfirm(true);
  };

  const handleClickClose = () => {
    setConfirm(false);
  };

  const deletePermission = () => {
    console.log(permId, "permIdpermId");
    AxiosLocal.delete("user/permission/", {
      data: { permission_ids: [permId] },
    }).then((response) => {
      console.log(response, "response.dataresponse.data");
      setMessage(response.data.message);
      setOpenerrorToast(true);
      getPermissions();
    });
  };
  // console.log(permission, "permissionpermission");
  return (
    <>
      <ListItem
        disablePadding
        onClick={onClick}
        onMouseEnter={() => {
          setHover(true);
          setpermId(permission.id);
        }}
        onMouseLeave={() => {
          setHover(false);
          // setpermId("");
        }}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="comments"
            style={{ marginTop: "-5px" }}
          >
            {!permission.default ? (
              <div onClick={(e) => e.stopPropagation()}>
                <img
                  alt=""
                  src={"/assets/admin/close-icon.svg"}
                  style={{
                    filter: selected
                      ? "brightness(0) invert(1)"
                      : "brightness(0) saturate(100%) invert(64%) sepia(7%) saturate(810%) hue-rotate(152deg) brightness(96%) contrast(94%)",
                  }}
                  onClick={handleClickOpen}
                />
              </div>
            ) : (
              <img
                src="/assets/admin/simplelock.svg"
                style={{ height: "12px" }}
                alt=""
              />
            )}
          </IconButton>
        }
      >
        <ListItemButton
          style={{
            backgroundColor: selected
              ? theme?.common?.color1 
              : hover
              ? theme?.permissions?.hover
              : theme?.permissions?.bgColor,
            // backgroundColor:hover? '#008BCD' : '#002E56',
            borderRadius: "4px",
            marginBottom: "5px",
          }}
        >
          {toggle ? (
            <ListItemText
              primaryTypographyProps={{
                color: selected ?  theme?.common?.color2  : hover ? theme?.permissions?.textcolor : theme?.permissions?.textcolor,
                fontWeight: selected ? "bold" : hover ? "bold" : "normal",
                fontFamily: hover ? "URW DIN" : "URW DIN REGULAR",
              }}
              primary={name}
            />
          ) : (
            <TextField
              ref={warpperRef}
              autoFocus
              id="outlined-basic"
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

                  color: "white",
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
                    border: "0.5px solid",

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
              placeholder="Add Permission"
              value={name}
              onChange={handleChange}
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
                      "Permission name can't be empty. Please add right name."
                    );
                  }
                }
              }}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          {hover &&
            (permission.default ? (
              <></>
            ) : (
              <div onClick={(e) => e.stopPropagation()}>
                <img
                  alt=""
                  style={{
                    marginRight: "-12px",
                    display: !toggle ? "none" : "flex",
                  }}
                  src={"/assets/admin/edit-workflow.svg"}
                  onClick={() => setToggle(false)}
                />
              </div>
            ))}
        </ListItemButton>
      </ListItem>
      <ConfirmPop
        message="Are you sure you want to delete?"
        confirm={confirm}
        handleClickOpen={handleClickOpen}
        handleClickClose={handleClickClose}
        handleDelete={deletePermission}
      />

      <Toast
        openToast={openerrorToast}
        setOpenToast={setOpenerrorToast}
        message={message}
        type="error"
      />
      <Toast
        openToast={openToast}
        setOpenToast={setOpenToast}
        message={message}
      />
    </>
  );
};

export default PermissionNavElement