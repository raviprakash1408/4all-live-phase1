import React, { useEffect, useState } from "react";
import { Avatar, AvatarGroup, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { AxiosLocal } from "../../../utilities/axiosUtils.ts";
import CustomAvatarGroup from "../../CustomAvatarGroup";
import CustomTooltip from "../../CustomTooltip";
import { useLocation } from "react-router-dom";

const OnlineUser = ({ subspaceId }) => {
  const location = useLocation();
  const theme = useSelector((state) => state.theme.themeData);
  const [onlineUsersEvent, setonlineUsersEvent] = useState([]);
  let currentUserId = localStorage.getObject("id");

  console.log(onlineUsersEvent, "onlineUsersEventonlineUsersEvent");
  useEffect(() => {
    eventChannelUsers();
  }, []);

  const eventChannelUsers = () => {
    // event channel subscription
    let path = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    AxiosLocal.post("centrifugo/space_edit", {
      subspace_slug: path,
    }).then((res) => {
      let eventToken = res.data.token;
      const dynamicEventChanel = (window.dynamicEventChanel =
        window.centrugeClient.newSubscription(res.data.channel_name, {
          token: eventToken,
        }));

      dynamicEventChanel.subscribe();
      // console.log(window.dynamicEventChanel.presence(), "window.dynamicEventChanel.presence");
      window.dynamicEventChanel
        .presence(`${window.dynamicEventChanel.channel}`)
        .then(
          function (resp) {
            const { clients } = resp;
            console.log(resp, "respresprespresp");
            let loggedin_user_ids = [...onlineUsersEvent];
            for (const [key, value] of Object.entries(clients)) {
              try {
                let userId = value["chan_info"];
                loggedin_user_ids.push(userId);
              } catch (error) {
                console.log("Centrifuge Online Users Error", error);
              }
            }
            setonlineUsersEvent([...loggedin_user_ids]);
          },
          function (err) {
            console.log("presence error", err);
          }
        );
    });
  };

  return (
    <>
      {onlineUsersEvent.length > 1 && (
        <Button
          style={{
            backgroundColor: "#143F63",
            color: "#88A1AB",
            textTransform: "none",
            marginRight: "10px",
            height: "30px",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
          }}
        >
          Currently editing
        </Button>
      )}
      {/* <AvatarGroup
        max={4}
        sx={{
          justifyContent: "start",
          "& .MuiAvatar-root": {
            width: 40,
            height: 40,
            border: `2px solid ${theme?.table?.buttonColor}`,
            backgroundColor: theme?.table?.rowColor,
            color: "#5D7C90",
            fontSize: "14px",
            fontFamily: "URW DIN",
          },
        }}
      > */}
      <div style={{ display: "flex" }}>
        {onlineUsersEvent
          .filter((item) => item.user_id != currentUserId)
          .slice(0, 3)
          .map((item) => (
            // <Avatar
            //   src="/assets/images/person.svg"
            //   style={{
            //     height: "40px",
            //     width: "40px",
            //     objectFit: "cover",
            //     border: `2px solid ${theme?.table?.buttonColor}`,
            //   }}
            //   alt=""
            // />
            // <CustomTooltip
            //   text={`${item?.first_name[0]}  ${item?.last_name[0]}`}
            //   placement="top-start"
            // >
            <CustomTooltip
              text={`${item?.first_name}  ${item?.last_name}`}
              placement="top-start"
            >
              {item.profile_pic ? (
                <img
                  src={item.profile_pic}
                  style={{
                    width: "36px",
                    height: "36px",
                    border: "2px solid #143F63",
                    borderRadius: "50%",
                    marginRight: "-7px",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <div
                  style={{
                    backgroundColor: "#011934",
                    textAlign: "center",
                    verticalAlign: "middle",
                    lineHeight: "36px",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    color: "#88A1AB",
                    border: "2px solid #143F63",
                    fontFamily: "URW DIN REGULAR",
                    marginRight: "-7px",
                    cursor: "pointer",
                  }}
                >
                  {item?.first_name[0]}
                  {item?.last_name[0]}
                </div>
              )}
            </CustomTooltip>

            // </CustomTooltip>
          ))}
      </div>
      {/* </AvatarGroup> */}
    </>
  );
};

export default OnlineUser;
