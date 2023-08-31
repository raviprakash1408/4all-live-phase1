import React from "react";
import { shortNameCreator } from "../utilities/shortName";
import Tooltip from "@mui/material/Tooltip";
import CustomTooltip from "./CustomTooltip";
import { useSelector } from "react-redux";

const CustomAvatarGroup = ({  
  item,
  avatar,
  onlineUsersEvent,
  type,
  id = 0,
  online = false,
  theme,
}) => {
  const themes = useSelector((state) => state.theme.themeData);

  const getName = (user) => {
    let name = "";
    if (user.first_name && user.last_name) {
      name = user.first_name + " " + user.last_name;
    } else if (user.sender_first_name && user.sender_last_name) {
      name = user.sender_first_name + " " + user.sender_last_name;
    }
    return name;
  };
  const getFirstName = (user) => {
    let name = "";
    if (user.first_name) {
      name = user.first_name;
    } else if (user.sender_first_name) {
      name = user.sender_first_name;
    }
    return name;
  };
  const getLastName = (user) => {
    let name = "";
    if (user.last_name) {
      name = user.last_name;
    } else if (user.sender_last_name) {
      name = user.sender_last_name;
    }
    return name;
  };
  const getAvatar = (page) => {
    let result = null;
    switch (page) {
      case "lobby":
        result =
          avatar && avatar !== null && avatar !== "null" ? (
            <CustomTooltip text={getName(item)} placement="top-start">
              <img
                alt=""
                src={avatar}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginRight: "-7px",
                  border: "2px solid #008BCD",
                }}
              />
            </CustomTooltip>
          ) : (
            <CustomTooltip text={getName(item)} placement="top-start">
              <div
                style={{
                  backgroundColor: theme?.bg_color_2
                    ? theme?.bg_color_2
                    : "#002E56",
                  textAlign: "center",
                  verticalAlign: "middle",
                  lineHeight: "36px",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  color: theme?.font_color_0 ? theme?.font_color_0 : "#88A1AB",
                  border: "2px solid #008BCD",
                  marginRight: "-7px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: type === "account" ? "30px" : "14px",
                  fontFamily: "URW DIN REGULAR",
                }}
              >
                {shortNameCreator(getFirstName(item), getLastName(item))}
              </div>
            </CustomTooltip>
          );
        break;

      case "chat":
        result =
          avatar && avatar !== null && avatar !== "null" ? (
            <CustomTooltip text={getName(item)} placement="top-start">
              <img
                alt=""
                src={avatar}
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  // marginRight: "-7px",
                  // border: "2px solid #008BCD",
                }}
              />
            </CustomTooltip>
          ) : (
            <CustomTooltip text={getName(item)} placement="top-start">
              <div
                style={{
                  backgroundColor: theme?.bg_color_2
                    ? theme?.bg_color_2
                    : "#002E56",
                  textAlign: "center",
                  verticalAlign: "middle",
                  lineHeight: "40px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  color: theme?.font_color_0 ? theme?.font_color_0 : "#88A1AB",
                  // border: "2px solid #008BCD",
                  // marginRight: "-7px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: type === "account" ? "30px" : "14px",
                  fontFamily: "URW DIN REGULAR",
                }}
              >
                {shortNameCreator(getFirstName(item), getLastName(item))}
              </div>
            </CustomTooltip>
          );
        break;

      default:
        result =
          avatar && avatar !== null && avatar !== "null" ? (
            <img
              alt=""
              src={avatar}
              style={{
                width: type === "account" ? "100px" : "36px",
                height: type === "account" ? "100px" : "36px",
                objectFit: "cover",
                borderRadius: "50%",
                marginRight: "-7px",
                // border:
                //   type === "header"
                //     ? "none"
                //     : type == "director"
                //     ? "2px solid #008BCD"
                //     : type == "hiddenUser"
                //     ? "2px solid rgba(20, 63, 99, 1)"
                //     : online ||
                //       onlineUsersEvent?.includes(
                //         String(type == "controlpanel" ? id : item.id)
                //       )
                //     ? "2px solid #008BCD"
                //     : "2px solid rgb(239 2 42)",
                border: "2px solid rgb(20, 63, 99)",
              }}
            />
          ) : (
            <div
              style={{
                backgroundColor: theme?.bg_color_2
                  ? theme?.bg_color_2
                  : themes?.addmember?.lightbackground,
                textAlign: "center",
                verticalAlign: "middle",
                lineHeight: "36px",
                width: type === "account" ? "100px" : "36px",
                height: type === "account" ? "100px" : "36px",
                borderRadius: "50%",
                color: theme?.font_color_0 ? theme?.font_color_0 : "#88A1AB",
                // border:
                //   type === "header"
                //     ? "none"
                //     : type == "director"
                //     ? "2px solid #008BCD"
                //     : type == "hiddenUser"
                //     ? "2px solid rgba(20, 63, 99, 1)"
                //     : online ||
                //       onlineUsersEvent?.includes(
                //         String(type == "controlpanel" ? id : item.id)
                //       )
                //     ? "2px solid #008BCD"
                //     // : "2px solid rgb(239 2 42)",
                //     : "2px solid rgb(20, 63, 99)",
                border: "2px solid",
                borderColor:"rgba(110, 139, 155, 1)",
                marginRight: "-7px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: type === "account" ? "30px" : "14px",
                fontFamily: type == "hiddenUser" ? "" : "URW DIN REGULAR",
              }}
            >
              {/* {item?.first_name[0]}
            {item?.last_name[0]} */}
              {item}
            </div>
          );
        break;
    }
    return result;
  };
  return getAvatar(type);
};

export default CustomAvatarGroup;
