import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const ComingSoon = () => {
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: matches ? "1.5rem" : "3rem",
        backgroundColor: "#012243",
        color: "white",

        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div
        style={{
          letterSpacing: matches ? "7px" : "2rem",
          fontFamily: "URW DIN",
        }}
      >
        COMING SOON
      </div>
      <div
        style={{
          fontSize: matches ? "12px" : "1rem",
          letterSpacing: matches ? "2.5px" : "0.5rem",
          fontFamily: "URW DIN REGULAR",
          color: "#5b657b",
        }}
      >
        SITE UNDER RECONSTRUCTION
      </div>
    </div>
  );
};

export default ComingSoon;
