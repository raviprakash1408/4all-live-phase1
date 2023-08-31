import React from "react";
import { useSelector } from "react-redux";
import CustomAvatarGroup from "../../../../../admin/CustomAvatarGroup";
import { shortNameCreator } from "../../../../../utilities/shortName";

export const NameWithAvatar = ({ data }) => {
  const onlineUsers = useSelector(
    (state: any) => state.controlpanel.onlineUsers
  );
  const onlineUsersArray = onlineUsers.map((item: any) => item.user_id);
  console.log(onlineUsers, onlineUsersArray, data);
  const getIcon = () => {
    if (data.streamType == "Desktop") {
      return (
        <img src={"/assets/bottomIcons/end_icons/share_white.svg"} alt="" />
      );
    } else if (data.streamType == "Video") {
      return (
        <img src={"/assets/bottomIcons/end_icons/video/share.svg"} alt="" />
      );
    } else if (data.streamType == "Device") {
      return (
        <img src={"/assets/bottomIcons/three_dots/manage_devices.svg"} alt="" />
      );
    } else {
      return "";
    }
  };
  return (
    <div
      className="col-1"
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <CustomAvatarGroup
        id={data.id}
        online={["Desktop", "Video", "Device"].includes(data.streamType)}
        item={shortNameCreator(
          data.name?.split(" ")[0],
          data.name?.split(" ")[1]
        )}
        avatar={data.profilePic}
        onlineUsersEvent={onlineUsersArray}
        type={"controlpanel"}
      />

      <span>
        {data.name} <span></span>
        {getIcon()}{" "}
      </span>
    </div>
  );
};
