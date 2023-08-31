import { MenuItem } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserSpaceConfig } from "../../livekitConnection/userMap.ts";
import { setLayout } from "../../state/conference/conferenceSlice";

const BottomMenuLayoutElement = ({
  props,
  title,
  layout,
  icon,
  iAmDirector,
  theme,
}) => {
  const dispatch = useDispatch();
  const [is_hover, setHover] = useState(false);

  return (
    <MenuItem
      style={{
        gap: "10px",
        marginTop: "5px",
        paddingTop: "13px",
        paddingLeft: "30px",
        paddingRight: "30px",
        backgroundColor: is_hover ? theme?.button_color_0 : theme?.bg_color_0,
        color: is_hover ? "white" : "#88A1AB",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        dispatch(setLayout(layout));

        props.setOpen(false);
        props.setShowOverflow(false);
        props.setTmr(Date.now());
        if (!iAmDirector) return;
        // updateUserSpaceConfig({layout})
        window.eventChanel.publish({
          event: "layoutChanged",
          layout,
          user_id: window.room?.myUserId(),
        });
      }}
    >
      <div
        style={{
          display: "flex",
          width: "30px",
          height: "30px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          alt=""
          src={
            "/assets/bottomIcons/layouts/" +
            icon +
            (is_hover ? "_white" : "") +
            ".svg"
          }
        />
      </div>

      <span
        style={{
          maxWidth: "full",
          fontSize: "14px",
          fontFamily: "URW DIN REGULAR",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title}
      </span>
    </MenuItem>
  );
};

export default BottomMenuLayoutElement;
