import { MenuList } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRender } from "../../state/livekit/slice.ts";
import { setScreenSharing } from "../../state/local/localSlice";
import { RootState } from "../../state/store.ts";
import BottomMenuEndElement from "../bottom_menu_end_element";
import { organizationUser } from "../../utilities/common";

const Share = ({ props, theme }) => {
  const local = useSelector((state: RootState) => state.local);
  const dispatch = useDispatch();
  const permissions = useSelector((state: RootState) => state.permissions);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        left: "-50%",
        backgroundColor: theme?.bg_color_0,
      }}
    >
      <div
        style={{
          display: props.is_show_overflow ? "flex" : "none",
          position: "absolute",
          width: "200vw",
          height: "200vh",
          top: "-100vh",
          left: "-100vw",
          zIndex: "-1",
        }}
        onClick={() => {
          //props.handleClose()
          props.setOpen(false);
          props.setShowOverflow(false);
          props.setTmr(Date.now());

          /*props.setHoverChk(false)

        setTimeout(() => {
          //is_chk.current = is_hover_chk
          //console.log("- "+is_chk.current)
          if(!props.is_chk.current) props.setHover(false)
        }, 5000)*/
        }}
      />

      <MenuList
        style={{
          overflowY: "scroll",
          //height:"9vh",
          overflowX: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        autoFocusItem={props.open}
        id="composition-menu"
        aria-labelledby="composition-button"
        onKeyDown={props.handleListKeyDown}
        className="no-scrollbar"
      >
        {organizationUser(permissions.share_video) && (
          <div>
            <BottomMenuEndElement
              props={props}
              title="Share Video"
              icon="video/share"
              onClick={(e) => {
                console.log("Share Video");
                props.showShareHandler();
                props.setopenView(1);
                props.handleClose(e);

                props.setOpen(false);
                props.setShowOverflow(false);
                props.setHoverChk(false);
                props.setHover(false);
              }}
              theme={theme}
            />
          </div>
        )}

        {organizationUser(permissions.share_screen) && (
          <div>
            <BottomMenuEndElement
              props={props}
              title="Share Screen"
              icon="share"
              selected={local.screenSharing}
              onClick={(e) => {
                if (local.screenSharing) {
                  window.room?.localParticipant
                    .setScreenShareEnabled(false)
                    .then(() => {
                      dispatch(setScreenSharing(false));
                      dispatch(setRender("localScreenShareDisabled"));
                      console.log("Share Screeniff");
                    });
                } else {
                  window.room?.localParticipant
                    .setScreenShareEnabled(true)
                    .then(() => {
                      dispatch(setScreenSharing(true));
                      dispatch(setRender("localScreenShareEnabled"));
                    });
                }

                props.setOpen(false);
                props.setShowOverflow(false);
                // props.setHoverChk(false);
                props.setHover(false);
              }}
              theme={theme}
            />
          </div>
        )}
        {/* {organizationUser(permissions.manage_devices) && (
          <div>
            <BottomMenuEndElement
              props={props}
              title="Share Device"
              icon="manage_devices"
              // selected={local.screenSharing}
              onClick={(e) => {
                console.log("Share Device");
                props.setmanageDevices(true);
                props.handleClose(e);

                props.setOpen(false);
                props.setShowOverflow(false);
                props.setHoverChk(false);
                props.setHover(false);
              }}
              theme={theme}
            />
          </div>
        )} */}
      </MenuList>
    </div>
  );
};

export default Share;
