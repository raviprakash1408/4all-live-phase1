import React from "react";
import { useCallback, useEffect, useState } from "react";
import { createShortName } from "../../utilities/common";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import AvatarGroup from "@mui/material/AvatarGroup";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import CustomAvatarGroup from "../CustomAvatarGroup";

export const SpaceOnlineUsers = ({ onlineUsers, theme }) => {
  return (
    <div style={{ paddingTop: "20px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {onlineUsers.slice(0, 4).map((user: any) => {
          return (
            <CustomAvatarGroup
              item={user}
              avatar={user?.profile_pic}
              onlineUsersEvent={[]}
              type="lobby"
              theme={theme}
            />
          );
        })}
        {onlineUsers.length > 4 && (
          <div
            style={{
              backgroundColor: theme?.bg_color_2
                ? theme?.bg_color_2
                : "#002E56",
              textAlign: "center",
              verticalAlign: "middle",
              lineHeight: "50px",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              color: "#88A1AB",
              border: "2px solid #143F63",
              marginRight: "-7px",
              fontSize: "16px",
              fontFamily: "URW DIN REGULAR",
            }}
          >
            +{onlineUsers.length - 4}
          </div>
        )}
      </div>
      <p
        style={{
          textAlign: "center",
          color: theme?.font_color_0 ? theme?.font_color_0 : "#88A1AB",
          fontSize: "16px",
          fontFamily: "URW DIN",
          fontStyle: "normal",
          lineHeight: "21px",
          fontWeight: 400,
        }}
      >
        <Typography variant="body1" gutterBottom>
          <img
            alt=""
            src="/assets/admin/blue-dot.svg"
            style={{
              position: "static",
              bottom: "-1px",
              right: "-1px",
              width: "8px",
              height: "8px",
            }}
          />{" "}
          Now Online
        </Typography>
      </p>
    </div>
  );
};
