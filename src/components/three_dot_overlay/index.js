import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AudioAndVideoElement from "./audio_and_video_element";
import ElementMenu from "./element_menu";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import MoveTo from "./subroom_menu";
import ViewAs from "./viewAs";
import MoreMenu from "./moreMenu";
import { ClickAwayListener } from "@mui/material";

import { organizationUser } from "../../utilities/common";
import CustomAvatarGroup from "../../admin/CustomAvatarGroup";
import { shortNameCreator } from "../../utilities/shortName";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ThreeDotOverlay = ({
  is_hover,
  userId,
  setHoverMenu,
  type,
  theme,
  updateVolumeLocal,
  tileType,
  trackUniqueId,
  isDirector,
  viewerType,
  track,
  audioTrack,
  dbuserId,
}) => {
  const element_body = useRef(null);
  const [is_left, setLeft] = useState(false);
  const [user, setuser] = useState({});
  const localuser = useSelector((state) => state.user.user);
  const permissions = useSelector((state) => state.permissions);

  const [openToast, setOpenToast] = useState(false);
  const [toastData, settoastData] = useState("");

  const handleClickToast = (content = null) => {
    if (content) {
      settoastData(content);
    } else {
      settoastData("You have Joined the Meeting");
    }
    setOpenToast(true);
  };
  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };
  useEffect(() => {
    if (window.room && userId != window.room?.myUserId()) {
      let participent = window.room.getParticipantById(userId)?._properties;
      setuser(participent);
      console.log(participent, "participent", userId);
    } else if (window.room && userId == window.room?.myUserId()) {
      console.log(localuser, "localuser");
      if (localuser) {
        setuser(localuser);
      }
    }
  }, [is_hover, userId]);

  useEffect(() => {
    console.log(is_left, "is_left");
  }, [is_left]);

  // const local = useSelector(state=>state.local)
  //   const [subrooms, setsubrooms] = useState([])

  //  useEffect(() => {
  //       console.log("subroomsResponsesubroomsResponse")
  //       AxiosLocal.get(`subrooms/${localStorage.getObject("currentSubSpaceSlug")}`)
  //       .then(function (response) {
  //           console.log(response,"responseresponseresponseresponse")
  //         let data = response.data.subroom_list
  //         if(data != undefined ){
  //           setsubrooms(response.data.subroom_list)
  //           console.log(data,"subroomsResponse");
  //         }

  //       })

  //   }, [])
  const [hover, setHover] = useState(false);

  console.log(is_hover, userId, "is_hover, userId");
  return (
    <>
      <ClickAwayListener onClickAway={() => setHoverMenu(false)}>
        <div
          ref={element_body}
          style={{
            // position: type === "staged" ? "static" : "absolute",
            display: is_hover ? "flex" : "none",
            flexDirection: "column",
            // top: type === "staged" ? '' : "10px",
            // left:
            //   user?.user_type == "S" ? "calc(100% - 14vw)" : "",
            // right: type === "staged" ? "" : "50px",
            // left: type === "staged" ? "210px" : "",
            color: theme?.font_color_0,
            backgroundColor: theme?.bg_color_0,
            border: "2px solid",
            borderColor: theme?.bg_color_1,
            borderRadius: "4px",
            zIndex: "999",
            marginTop: type === "staged" ? "-18px" : "-10px",
            marginLeft: type === "staged" ? "20px" : "",
            marginRight: type === "staged" ? "" : "-18px",
          }}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "-10px",
              width: "10px",
              height: "30px",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              padding: "7px 10px",
              borderBottom: "2px solid",
              borderColor: theme?.bg_color_1,
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: theme?.bg_color_2,
                borderRadius: "100%",
                overflow: "hidden",
              }}
            >
              {/* <img
              alt=""
              // src={user?.avatar ? user.avatar : "/assets/mockups/charlie.png"}
              src="/assets/mockups/charlie.png"
            /> */}
              <CustomAvatarGroup
                avatar={user.avatar}
                item={shortNameCreator(user.firstName, user.lastName)}
                type="header"
                theme={theme}
              />
            </div>

            <div
              style={{
                whiteSpace: "nowrap",
                fontFamily: "URW DIN DEMI",
                fontWeight: 500,
                fontSize: "16px",
                marginLeft: "5px",
              }}
            >{`${user?.firstName || ""} ${user?.lastName || ""}`}</div>
          </div>

          {user && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1px",
                width: "100%",
                padding: "10px",
              }}
            >
              {/* {organizationUser(permissions.control_volume_of_remote_user) &&
              type === "staged" && (
                <ElementMenu
                  user={user}
                  icon="/assets/three_dot_overlay_icons/audio.svg"
                  label=""
                  is_audio={true}
                  theme={theme}
                  updateVolumeLocal={updateVolumeLocal}
                />
              )} */}
              {organizationUser(permissions.move_to_sub_spaces) && (
                <ElementMenu
                  user={user}
                  icon="/assets/three_dot_overlay_icons/move_to.svg"
                  label="Move to"
                  sub={
                    <MoveTo
                      tileType={tileType}
                      user={user}
                      theme={theme}
                      userId={userId}
                    />
                  }
                  theme={theme}
                  // subrooms={subrooms}
                />
              )}
              {/* {permissions.switch_role && (
              <ElementMenu
                user={user}
                icon="/assets/three_dot_overlay_icons/promote_user.svg"
                label="Switch role"
              />
            )} */}
              {organizationUser(permissions.view_as) && isDirector && (
                <ElementMenu
                  user={user}
                  icon="/assets/three_dot_overlay_icons/promote_user.svg"
                  label="View as"
                  sub={
                    <ViewAs
                      tileType={tileType}
                      user={user}
                      theme={theme}
                      viewerType={viewerType}
                      trackId={trackUniqueId}
                      isDirector={isDirector}
                    />
                  }
                  theme={theme}
                />
              )}
              {(organizationUser(permissions.control_volume_of_remote_user) ||
                // permissions.mute_video ||
                organizationUser(permissions.request_unmute_video) ||
                organizationUser(permissions.request_unmute_audio)) &&
              track != "no track" ? (
                <ElementMenu
                  user={user}
                  icon="/assets/three_dot_overlay_icons/mic.svg"
                  label="Audio & Video"
                  sub={
                    <AudioAndVideoElement
                      tileType={tileType}
                      user={user}
                      theme={theme}
                      track={track}
                      userId={userId}
                      audioTrack={audioTrack}
                    />
                  }
                  theme={theme}
                />
              ) : (
                <></>
              )}
              {/* {(organizationUser(permissions.show_audio_and_video_button) ||
              organizationUser(permissions.show_toolbar_menu) ||
              organizationUser(permissions.system_readiness_check)) && (
              <ElementMenu
                user={user}
                icon="/assets/three_dot_overlay_icons/more.svg"
                label="More"
                sub={<MoreMenu tileType={tileType} user={user} theme={theme} />}
                theme={theme}
              />
            )} */}
              {organizationUser(permissions.kick_user) && (
                <ElementMenu
                  user={user}
                  icon="/assets/three_dot_overlay_icons/remove_user.svg"
                  label="Kick user"
                  onClick={() => {
                    // window.room.sendCommandOnce("kickUser", {
                    //   value: JSON.stringify({ userId: user.userId }),
                    // });
                    window.eventChanel.publish({
                      event: "Kick User",
                      userId: userId,
                      name: `${user?.firstName} ${user?.lastName}`,
                    });
                    // handleClickToast(
                    //   `${user?.firstName || ""} ${
                    //     user?.lastName || ""
                    //   } will be kicked out`
                    // );
                  }}
                  theme={theme}
                />
              )}
              {organizationUser(permissions.remove_user) && (
                <ElementMenu
                  user={user}
                  icon="/assets/three_dot_overlay_icons/promote_user.svg"
                  label="Remove user"
                  onClick={() => {
                    // window.room.sendCommandOnce("removeUser", {
                    //   value: JSON.stringify({ userId: user.userId }),
                    // });
                    window.eventChanel.publish({
                      event: "Remove User",
                      userId: userId,
                      dbuserId: dbuserId,
                      name: `${user?.firstName} ${user?.lastName}`,
                    });
                    // handleClickToast(
                    //   `${user?.firstName || ""} ${
                    //     user?.lastName || ""
                    //   } will be kicked out`
                    // );
                  }}
                  theme={theme}
                />
              )}
            </div>
          )}
          <Snackbar
            open={openToast}
            autoHideDuration={2000}
            onClose={handleCloseToast}
          >
            <Alert
              onClose={handleCloseToast}
              severity="info"
              sx={{ width: "100%" }}
            >
              {toastData}
            </Alert>
          </Snackbar>
        </div>
      </ClickAwayListener>
    </>
  );
};

export default ThreeDotOverlay;
