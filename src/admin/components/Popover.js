import React, { useState } from "react";
import { MenuItem, Menu, Popover } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setcurrentSpaceName } from "../../state/local/localSlice";
import { useSelector } from "react-redux";

function PopoverCustom({ anchorEl, handleClose, open, event, type }) {
  const theme = useSelector((state) => state.theme.themeData);
  const dispatch = useDispatch();
  const [hover, sethover] = useState(false);
  const spaceClick = (spaceName, spaceSlug) => {
    console.log("spaceClick");
    localStorage.removeItem("currentSubSpaceName");
    localStorage.removeItem("currentSubSpaceSlug");
    dispatch(setcurrentSpaceName(spaceName));
    localStorage.setObject("currentSpaceName", spaceName);
    localStorage.setObject("currentSpaceSlug", spaceSlug);
    localStorage.removeItem("currentSubSpaceName");
  };
  return (
    <Menu
      MenuListProps={{
        "aria-labelledby": "basic-button",
        disablePadding: true,
      }}
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: theme?.selectimage?.backgroundcolor,
          border: `2px solid ${theme?.selectimage?.bordercolor}`,
          boxShadow: "none",
          borderRadius: "4px",
          marginTop: "-32px",
          marginLeft:
            type === "grid" ? "-86px" : type === "list" ? "-75px" : "",
          width: "312px",
          paddingTop: "-8px",
          paddingBottom: "-8px",
        },
      }}
    >
      <Link
        to={
          event.is_lobby
            ? `/lobby/${localStorage.getObject("organization_slug")}/${
                event.slug
              }`
            : `/${localStorage.getObject("organization_slug")}/${event.slug}`
        }
        style={{ textDecoration: "none" }}
      >
        <MenuItem
          onClick={() => {
            spaceClick(event.name, event.slug);
          }}
          style={{
            backgroundColor:
              hover == "user" ? theme?.selectimage?.imagebackground : "",
            padding: "8px 26px",
            color: hover == "user" ? "white" : "#88A1AB",
            fontFamily: hover == "user" ? "URW DIN MEDIUM" : "URW DIN REGULAR",
          }}
          onMouseEnter={() => sethover("user")}
          onMouseLeave={() => sethover("")}
        >
          <img
            src="/assets/admin/user.svg"
            alt=""
            style={{
              paddingRight: "13px",
              height: "18px",
              width: "17px",
              filter: hover == "user" ? "brightness(0) invert(1)" : "",
            }}
          />
          Join as user
        </MenuItem>
      </Link>

      <MenuItem
        onClick={() => {
          console.log("jjhj");
        }}
        style={{
          backgroundColor:
            hover == "device" ? theme?.selectimage?.imagebackground : "",
          padding: "8px 24px",
          color: hover == "device" ? "white" : "#88A1AB",
          borderColor: "#012243",
          fontFamily: hover == "device" ? "URW DIN MEDIUM" : "URW DIN REGULAR",
        }}
        onMouseEnter={() => sethover("device")}
        onMouseLeave={() => sethover("")}
      >
        <img
          src="/assets/bottomIcons/cam.svg"
          alt=""
          style={{
            paddingRight: "12px",
            width: "22px",
            height: "22px",
            filter: hover == "device" ? "brightness(0) invert(1)" : "",
          }}
        />
        Join as Device
      </MenuItem>

      <MenuItem
        onClick={() => {
          console.log("jjhj");
        }}
        style={{
          backgroundColor:
            hover == "role" ? theme?.selectimage?.imagebackground : "",
          padding: "8px 23px",
          color: hover == "role" ? "white" : "#88A1AB",
          fontFamily: hover == "role" ? "URW DIN MEDIUM" : "URW DIN REGULAR",
        }}
        onMouseEnter={() => sethover("role")}
        onMouseLeave={() => sethover("")}
      >
        <img
          src="/assets/admin/branchRole.svg"
          alt=""
          style={{
            paddingRight: "11px",
            height: "18px",
            width: "22px",
            filter: hover == "role" ? "brightness(0) invert(1)" : "",
          }}
        />
        Go to modify roles
      </MenuItem>
    </Menu>
  );
}

export default PopoverCustom;
