import { MenuItem, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import Image, { Shimmer } from "react-image-shimmer";
import IOSSwitch from "../../admin/components/CustomSwitch";
import CustomAvatarGroup from "../../admin/CustomAvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import { shortNameCreator } from "../../utilities/shortName";
import { height } from "@mui/system";
import { useSelector } from "react-redux";
const ThreeDotMenuElement = ({
  props,
  title,
  icon,
  onClick,
  boolean,
  disabled,
  checked,
  theme,
}) => {
  const [is_hover, setHover] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const directorMode = useSelector((state) => state.conference.directorMode);
  const iAmDirector = useSelector((state) =>
    state.conference.directorMode.mode
      ? state.conference.directorMode.user_id == window.room?.myUserId()
      : false
  );

  const getButton = () => {
    if (iAmDirector && directorMode?.mode) {
      return (
        <IOSSwitch
          theme={theme}
          checked={checked}
          disabled={false}
          onChange={props.onClick}
          sx={{ m: 1 }}
        />
      );
    } else if (!iAmDirector && directorMode?.mode) {
      return (
        <div style={{ position: "relative" }}>
          <div
            onClick={(e) => {
              window.eventChanel.publish({
                event: "askToBecomeDirector",
                user_id: directorMode.user_id,
                current_user_id: window.room?.myUserId(),
              });
            }}
            onMouseEnter={() => setOverlay(true)}
            onMouseLeave={() => setOverlay(false)}
            style={{ margin: "0 10px 0 8px" }}
          >
            <CustomAvatarGroup
              avatar={
                window.room?.getParticipantById(directorMode.user_id)
                  ?._properties?.avatar
              }
              item={shortNameCreator(
                window.room?.getParticipantById(directorMode.user_id)
                  ?._properties?.firstName,
                window.room?.getParticipantById(directorMode.user_id)
                  ?._properties?.lastName
              )}
              type="director"
            />
          </div>
          {overlay && (
            <div
              style={{
                position: "absolute",
                left: "60px",
                top: "0px",
                backgroundColor: theme?.bg_color_0,
                borderRadius: "4px",
                height: "40px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  padding: "9px 15px 0px",
                  fontFamily: "URW DIN REGULAR",
                  fontSize: "14px",
                  color: theme?.font_color_0,
                }}
              >
                {
                  window.room?.getParticipantById(directorMode.user_id)
                    ?._properties?.firstName
                }{" "}
                {
                  window.room?.getParticipantById(directorMode.user_id)
                    ?._properties?.lastName
                }
              </p>
            </div>
          )}
          {/* </Tooltip> */}
          {/* <Typography
                  noWrap="true"
                  style={{
                    paddingLeft: "12px",
                    fontSize: "14px",
                    fontFamily: "URW DIN REGULAR",
                  }}
                  onClick={(e) => {
                    window.eventChanel.publish({
                      event: "askToBecomeDirector",
                      user_id: directorMode.user_id,
                      current_user_id: window.room?.myUserId(),
                    });
                  }}
                >
                  {" "}
                  {
                    window.room?.getParticipantById(directorMode.user_id)
                      ?._properties?.firstName
                  }
                </Typography> */}
        </div>
      );
    } else {
      return (
        <IOSSwitch
          checked={checked}
          disabled={disabled}
          onChange={props.onClick}
          sx={{ m: 1 }}
        />
      );
    }
  };
  const getTitile = () => {
    if (boolean && !iAmDirector && directorMode?.mode) {
      return (
        <div>
          {" "}
          <p>Directed by </p>
          {/* <span style={{
                fontSize: '8px',
            }} >Click here to ask to become Director</span>  */}
        </div>
      );
    } else {
      return title;
    }
  };

  return (
    <MenuItem
      style={{
        gap: "10px",
        // padding:!iAmDirector && directorMode?.mode ? "2px 18px" : "12px 18px",
        padding: "12px 18px",
        marginTop: "5px",
        backgroundColor: is_hover ? theme?.button_color_0 : theme?.bg_color_0,
        color: is_hover ? theme?.font_color_0 : "#88A1AB",
        textOverflow: "ellipsis",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => {
       
          if (!iAmDirector && directorMode?.mode && title === "Director Mode") {
            window.eventChanel.publish({
              event: "askToBecomeDirector",
              user_id: directorMode.user_id,
              current_user_id: window.room?.myUserId(),
            });
          } else {
            onClick(e);
          }
      }}
    >
      <div
        style={{
          display: "flex",
          width: "25px",
          height: "25px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={
            "/assets/bottomIcons/three_dots/" +
            icon +
            (is_hover ? "_white" : "") +
            ".svg"
          }
          fallback={<Shimmer width={25} height={25} />}
          errorFallback={(err) => {
            return (
              <img
                alt=""
                src={
                  "/assets/bottomIcons/three_dots/" +
                  icon +
                  (is_hover ? "_white" : "") +
                  ".svg"
                }
              />
            );
          }}
        />
      </div>

      <Typography
        noWrap="true"
        style={{
          paddingLeft: "12px",
          fontSize: "14px",
          fontFamily: "URW DIN REGULAR",
        }}
      >
        {getTitile()}
      </Typography>
      {/* if condition */}

      {boolean && getButton()}
    </MenuItem>
  );
};

export default ThreeDotMenuElement;
