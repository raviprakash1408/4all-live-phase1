import React, { useState } from "react";

const SubMenu = ({ selected, icon, label, onClick, theme }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        // gap: "7px",
        padding: " 6px 9px",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor:
          selected || hover ? theme?.button_color_0 : theme?.bg_color_1,
        fontFamily: "URW DIN REGULAR",
        fontSize: "16px",
        fontWeight: 400,
        color: selected || hover ? "white" : "#88A1AB",
        margin: "0px -5px",
      }}
    >
      {icon && (
        <div
          style={{
            display: "flex",
            width: "25px",
            height: "25px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            alt=""
            src={icon}
            style={{
              filter: selected || hover ? "brightness(0) invert(1)" : "",
            }}
          />
        </div>
      )}

      <div
        style={{
          whiteSpace: "nowrap",
          marginLeft: "15px",
          marginRight: "20px",
          color: theme?.font_color_0,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default SubMenu;
