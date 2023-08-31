import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import PopoverCustom from "./Popover";

const JoinNowButton = ({
  handlePreventClick,
  setHoverbutton,
  hoverbutton,
  theme,
  event,
  users,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    //     <Link to={`/lobby/${event.slug}`} style={{textDecoration:'none'}}
    // >
    <div onClick={handlePreventClick}>
      <Button
        variant="contained"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        onMouseEnter={() => {
          setHoverbutton(true);
          handleClick();
        }}
        onMouseLeave={() => setHoverbutton(false)}
        style={{
          textTransform: "none",
          boxShadow:
            "0px 1px 1px -2px rgb(0 0 0 / 15%), 0px 2px 2px 0px rgb(0 0 0 / 10%), 0px 1px 3px 0px rgb(0 0 0 / 10%)",
          padding: "8px 30px 8px 20px",
          fontSize: "16px",
          lineHeight: "22px",
          color: hoverbutton
            ? theme?.joinNowbutton?.bgcolorwhitee
            : theme?.table?.mainheadingColor,
          height: "42px",
          backgroundColor: hoverbutton
            ? theme?.joinNowbutton?.bgcolor1
            : theme?.joinNowbutton?.bgcolor2,

          fontFamily: "URW DIN REGULAR",
          pointerEvents: users.some(
            (el) => localStorage.getObject("id") == el.id
          )
            ? "auto"
            : "none",
        }}
        className="joinNow"
      >
        <img alt="" src="/assets/admin/join-now.svg" />
        <span style={{ marginLeft: "16px" }}>Join&nbsp;now</span>
      </Button>
      <PopoverCustom
        event={event}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        type="list"
      />
      {/* </Link> */}
    </div>
  );
};

export default JoinNowButton;
