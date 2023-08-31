import React from "react";

const AvatarElem = ({ userShortName, avatar, view, theme }) => {
 
  
  return (
    <div
      style={{
        width: view == "horizontal" ? "100%" : "130px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: view == "horizontal" ? "100%" : "",
      }}
    >
      {avatar == "null" ||
      avatar === undefined ||
      avatar === "" ||
      avatar == null ? (
        <p
          className="userShortName"
          style={{
            textAlign: "center",
            fontSize: view == "horizontal" ? "clamp(12px, 5cqw, 62px)" : "28px",
            color: theme?.font_color_0 ? theme?.font_color_0 : "#88A1AB",
            fontFamily: view == "horizontal" ? "URW DIN" : "URW DIN REGULAR",
            // marginTop: view == "horizontal" ? "20px" : "",
          }}
        >
          {userShortName}
        </p>
      ) : (
        <img
          alt=""
          src={avatar}
          style={{
            height: view == "horizontal" ? "100%" : "50px",
            width: view == "horizontal" ? "100%" : "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      )}
    </div>
  );
};

export default AvatarElem;
