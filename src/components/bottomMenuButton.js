import { useState } from "react";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import Toast from "../sections/Toast";

const BottomMenuButton = ({
  item,
  setOpen,
  anchorRef,
  setpopoverType,
  handleToggle,
  setAnchorEl,
  theme,
}) => {
  const permissions = useSelector((state) => state.permissions);

  const newChat = useSelector((state) => state.spaceChats.newChat);

  const theme_color = useSelector((state) => state.theme.theme);
  const local = useSelector((state) => state.local);

  const [is_hover, setHover] = useState(false);
  const [is_hover_mini, setHoverMini] = useState(false);

  const hover_color = "#008BCD";
  const icon = item.icon.split(".")[0];
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState("");


  return (
    <>
      <div
        id={item.name}
        className={
          local.showBottomMenu
            ? "bottom-menu-area-flash bottom-menu-item noselect"
            : "bottom-menu-item noselect"
        }
        ref={anchorRef}
        style={{
          position: "relative",
          backgroundColor:
            (is_hover && !is_hover_mini) || item.active
              ? theme?.button_color_0
              : item.bgColor,
          zIndex: "1",
          display: "flex",
          justifyContent: "center",
          padding: "12px",
          margin: "5px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={(e) => {
          if (!item.disable) {
            item.onClick(e);
            //setOpen(false)
          }else{
            setOpenToast(true);
            setMessage("You don't have permission to access this feature");
          }
        }}
        onMouseEnter={() => {
          if (!item.disable) setHover(true);
        }}
        onMouseLeave={() => setHover(false)}
      >
        <div
          style={{
            position: "absolute",
            display: is_hover ? "flex" : "none",
            flexDirection: "row",
            flexWrap: "nowrap",
            gap: "5px",
            height: "26px",
            top: "-45px",
            left: "0px",
            padding: "5px",
            borderRadius: "4px",
            backgroundColor: theme?.bg_color_0,
            whiteSpace: "nowrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: is_hover && !is_hover_mini ? "flex" : "none",
              color: theme?.font_color_1,
              fontSize: "15px",
              paddingLeft: "5px",
              paddingRight: "5px",
              backgroundColor: theme?.bg_color_0,
              borderRadius: "4px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {navigator.platform.indexOf("Win") == 0
              ? item.tooltip_shotcut_win
              : navigator.platform.indexOf("Mac") == 0
              ? item.tooltip_shotcut_osx
              : ""}
          </div>

          <div
            style={{
              color: theme?.font_color_2,
              fontSize: "15px",
              padding: "2px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {is_hover && !is_hover_mini
              ? item.tooltip_description
              : item.name + " settings"}
          </div>
        </div>

        <Badge
          invisible={newChat && item.name === "Chat" ? false : true}
          variant="dot"
          color="primary"
          sx={{
            "& .MuiBadge-badge": {
              height: 15,
              minWidth: 15,
              borderRadius: "50%",
              backgroundColor: is_hover ? "#ffffff" : "#008bcd",
            },
          }}
        >
          <img
            style={{
              width: "26px",
              height: "26px",
            }}
            /*onClick={ () => {
                        item.onClick()
                        setOpen(false)
                    }
                }*/

            src={
              icon +
              ((is_hover && !is_hover_mini) || item.active ? "_white" : "") +
              ".svg"
            }
            //src={item.icon}
            alt={item.name}
          />
        </Badge>

        {item.permission && item.pointer ? (
          <img
            ref={anchorRef}
            alt=""
            onClick={(e) => {
              if (!item.disable) {
                e.stopPropagation();
                setpopoverType(item.name);
                handleToggle(item.name);
                setAnchorEl(e.currentTarget);
              }
            }}
            onMouseEnter={() => setHoverMini(true)}
            onMouseLeave={() => setHoverMini(false)}
            src={
              "/assets/icons/up" +
              (is_hover_mini || theme_color == "light" ? "_white" : "") +
              ".svg"
            }
            style={{
              position: "absolute",
              top: "-8%",
              right: "0%",
              padding: "5px 3px",
              backgroundColor: is_hover_mini
                ? theme?.button_color_0
                : theme?.bg_color_2,
              borderRadius: "4px",
            }}
          />
        ) : (
          <></>
        )}
      </div>
      <Toast
        openToast={openToast}
        setOpenToast={setOpenToast}
        message={message}
      />
    </>
  );
};

export default BottomMenuButton;
