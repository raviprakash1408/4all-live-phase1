import React, { useEffect } from "react"
import AvatarElem from "../../components/staged_layout/avatar.tsx";
import { useSelector } from "react-redux";
import PanToolIcon from "@mui/icons-material/PanTool";
import Box from "@material-ui/core/Box";
import { shortNameCreator } from "../../utilities/shortName";
import CustomAvatarGroup from "../../admin/CustomAvatarGroup";
import CustomTooltip from "../../admin/CustomTooltip.js";
import { organizationUser } from "../../utilities/common.js";


interface HiddenUserProps {
  avatar: string;
  firstName: string;
  lastname: string;
  userId: string;
  role: string;
  guestUser: string;
  trackId: string;
  theme: any;
  track: any;
}

export const HiddenUser = (props:HiddenUserProps)=>{
// const theme = useSelector((state) => state.theme.eventTheme[state.theme.theme]);

  const [showDrag, setShowDrag] = React.useState(false);
  const [mainUser, setMainUser] = React.useState(false);

  const HandRise = useSelector((state) => state.conference.HandRise);
  const conference = useSelector((state) => state.conference);

  const permissions = useSelector((state) => state.permissions);

  console.log(props.track,mainUser, "tracktrack");
  
  useEffect(() => {
    let isDefault = false;

    try {
      isDefault = JSON.parse(props.track?.customProperty?.name).default;
    } catch (e) {
      console.log(e);
    }
    // if (isDefault && props.track?.source == "camera") {
    if (isDefault) {
      setMainUser(true);
    }
  }, [props.track?.customProperty?.name]);

  const {theme} = props;

const dragStart = (e, userId) => {
  
    // curser to grabbing
    e.target.style.cursor = "grabbing";
    
    // set targets children opacity to 0
    e.target.children[0].style.opacity = 0.3;
    e.target.style.border = "3px dashed rgb(21 63 99)";

    var elem = document.createElement("div");
    elem.id = "drag-ghost";

    elem.style.position = "absolute";
    // elem.style.top = "1000vh";
    elem.style.top = "-100vh";

    // console.log( e.target.offsetWidth,"elem.style.width");
    elem.style.width = e.target.offsetWidth / 2 + "px";
    elem.style.height = e.target.offsetHeight / 2 + "px";
    elem.style.backgroundColor = "rgb(21,63 ,99)";

    var canvas = document.createElement("canvas");
    canvas.width = e.target.offsetWidth / 2;
    canvas.height = e.target.offsetHeight / 2;
    // canvas background color

    var canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;

    // find video element in the target element using getElementsBytagName
    var video = e.target.getElementsByTagName("video")[0];

    if (video) {
      // draw video element on canvas
      canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
    } else {
      try {
        // clone the target element and append it to the body
        // draw circle at the center of the canvas with radius 50
        canvasContext.beginPath();
        canvasContext.arc(
          canvas.width / 2,
          canvas.height / 2,
          canvas.height / 4,
          0,
          2 * Math.PI
        );
        canvasContext.fillStyle = "rgb(1, 34, 67)";
        canvasContext.fill();

        //  get inner text of the userShortName class and draw it on the canvas
        var text =
          e.target.getElementsByClassName("userShortName")[0].innerText;
        canvasContext.font = `${canvas.height / 8}px Arial`;
        canvasContext.fillStyle = "rgb(136, 161, 171)";
        canvasContext.textAlign = "center";
        canvasContext.fillText(text, canvas.width / 2, canvas.height / 2);
      } catch (err) {
        console.log(err);
      }
    }

    elem.appendChild(canvas);
    document.body.appendChild(elem);
    e.dataTransfer.setDragImage(elem, 0, 0);
    e.dataTransfer.setData("position", 0);
    e.dataTransfer.setData("userid", props.userId);
    e.dataTransfer.setData("type", "hiddenUser");
    // isDevice
    e.dataTransfer.setData("isDevice", "false");


    console.log(
      e.target.getAttribute("data-trackid"),
      "e.target.getAttribute"
    );
    e.dataTransfer.setData("trackId", props.trackId);
    e.dataTransfer.setData(
      "viewerType",
     "V"
    );
      console.log(e,userId,"dragStart");
  }
 

return (
  <>
    <div
      draggable={
        conference.directorMode.mode &&
        conference.directorMode.user_id === window.room.myUserId()
          ? true
          : false
      }
      onDragStart={(e) => dragStart(e, props.userId)}
      onDragEnd={(e) => {
        e.target.style.cursor = "grab";
        e.target.children[0].style.opacity = 1;
        e.target.style.border = "none";
      }}
      className="hidden-user-strip__user"
      style={{
        height: "50px",
        backgroundColor: showDrag
          ? theme?.bg_color_2
            ? theme?.bg_color_2
            : "rgba(0, 139, 205, 1)"
          : theme?.bg_color_2
          ? theme?.bg_color_2
          : "rgba(1, 42, 80, 1)",
        borderRadius: "4px",
        //overflow: "hidden",
        cursor: "pointer",
        marginTop: "10px",
        marginLeft: "22px",
        marginRight: "22px",
        // position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 0px 0px 6px",
        // outline: HandRise.includes(props.userId) ? "2px solid #008BCD" : "",
      }}
      onMouseEnter={() => setShowDrag(true)}
      onMouseLeave={() => setShowDrag(false)}
    >
      {/* <div className="hidden-user-strip__user__avatar">
      <img
        src={props.avatar}
        style={{
          width: "40px",
          height: "40px",
        }}
        alt="avatar"
      />
    </div> */}
      <div style={{ display: "flex" }}>
        <CustomAvatarGroup
          avatar={props.avatar}
          item={
            props.guestUser == "true"
              ? shortNameCreator(props.firstName, "Guest")
              : shortNameCreator(props.firstName, props.lastname)
          }
          type="hiddenUser"
          theme={theme}
          onlineUsersEvent={""}
        />
        <div style={{ paddingLeft: "6px" }}>
          <p
            style={{
              margin: "0px",
              padding: "4px 12px 0px",
              // textAlign: "center",
              // fontFamily: "URW DIN REGULAR",
              fontSize: "14px",
              color: showDrag ? "white" : "rgba(136, 161, 171, 1)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontWeight: 600,
              lineHeight: "14px",
            }}
          >
            {props.firstName} {props.lastname}
          </p>
          <p
            style={{
              margin: "0px",
              padding: "4px 12px 0px",
              // textAlign: "center",
              // fontFamily: "URW DIN REGULAR",
              fontSize: "14px",
              color: "white",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "14px",
            }}
          >
            {props.guestUser == "true" ? "Guest" : props.role}
          </p>
        </div>
      </div>

      {/* <div
        //   onMouseOver={mouseEnter}
        //   onMouseLeave={mouseLeave}
        style={{
          position: "absolute",
          bottom: "0px",
          height: "100%",
          width: "100%",
          borderRadius: "4px",
          background: showDrag
            ? "linear-gradient(rgb(0 139 205 / 0%) , rgb(0 139 205 / 50%))"
            : "none",
          // background:  "linear-gradient(rgb(0 139 205 / 0%) , rgb(0 139 205 / 50%))" ,
          transition: "background-color 1000ms linear",
          zIndex: "2",
        }}
      ></div> */}
      <div style={{ display: "flex" }}>
        {HandRise.includes(props.userId) && mainUser && (
          <div
            style={{
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: showDrag ? theme?.bg_color_1 : theme?.bg_color_1,
              borderRadius: "4px",
              marginRight: "10px",
            }}
          >
            <img
              style={{
                width: "16px",
              }}
              alt=""
              src={`${window.location.origin}/assets/bottomIcons/three_dots/hand.svg`}
            />
          </div>
        )}
        {conference.directorMode.mode &&
          conference.directorMode.user_id === props.userId && (
            <div
              style={{
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: showDrag
                  ? theme?.bg_color_1
                    ? theme?.bg_color_1
                    : "rgba(1, 34, 67, 1)"
                  : theme?.bg_color_1
                  ? theme?.bg_color_1
                  : "rgba(20, 63, 99, 1)",

                borderRadius: "4px",
                marginRight: "10px",
              }}
            >
              <img
                style={{
                  width: "16px",
                }}
                draggable="false"
                alt=""
                src={`${window.location.origin}/assets/bottomIcons/three_dots/director_mode.svg`}
              />
            </div>
          )}

        {showDrag &&
          conference.directorMode.mode &&
          conference.directorMode.user_id === window.room.myUserId() && (
            <div
              style={{
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: showDrag
                  ? theme?.bg_color_1
                    ? theme?.bg_color_1
                    : "rgba(1, 34, 67, 1)"
                  : theme?.bg_color_1
                  ? theme?.bg_color_1
                  : "rgba(20, 63, 99, 1)",
                borderRadius: "4px",
                marginRight: "10px",
              }}
            >
              <img
                style={{
                  width: "18px",
                }}
                draggable="false"
                alt=""
                src={`${window.location.origin}/assets/drag/drag.svg`}
              />
            </div>
          )}

        {organizationUser(permissions.kick_user) &&
          props.userId !== window.room?.localParticipant.sid &&
          showDrag && (
            <CustomTooltip text="Kick user" placement="top-start">
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: showDrag
                    ? theme?.bg_color_1
                      ? theme?.bg_color_1
                      : "rgba(1, 34, 67, 1)"
                    : theme?.bg_color_1
                    ? theme?.bg_color_1
                    : "rgba(20, 63, 99, 1)",

                  borderRadius: "4px",
                  marginRight: "10px",
                }}
                onClick={() => {
                  window.eventChanel.publish({
                    event: "Kick User",
                    userId: props.userId,
                    name: props.firstName + " " + props.lastname,
                  });
                }}
              >
                <img
                  style={{
                    width: "11px",
                  }}
                  draggable="false"
                  alt=""
                  src={`${window.location.origin}/assets/admin/close.svg`}
                />
              </div>
            </CustomTooltip>
          )}
      </div>
    </div>
  </>
);

}