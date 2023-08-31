import { MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLayout } from "../../state/conference/conferenceSlice";

const BottomMenuEndElement = ({
  props,
  title,
  icon,
  onClick,
  selected = false,
  theme,
}) => {
  const dispatch = useDispatch();
  const [is_hover, setHover] = useState(selected);

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
      onMouseLeave={() => {
        if (!selected) {
          setHover(false);
        }
      }}
      onClick={(e) => {
        /*dispatch(setLayout(layout))

                    props.setOpen(false)
                    props.setShowOverflow(false)
                    props.setTmr(Date.now())*/

        onClick(e);
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
            "/assets/bottomIcons/end_icons/" +
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

export default BottomMenuEndElement;
