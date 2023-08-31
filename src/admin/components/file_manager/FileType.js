import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import {
  Typography,

} from "@mui/material";
import themeSlice from "../../../state/theme/themeSlice";

function FileTypeButton({ toggleTab, buttonType, tabCount, toggleState }) {
  const theme = useSelector((state) => state.theme.themeData);

  const [hover, setHover] = useState("");
    // useEffect(() => {
    //   if (toggleState === tabCount) {
    //     setHover("fileType");
    //   }
    // }, [tabCount, toggleState]);
    
  return (
    <div
      style={{
        display: "flex",
        backgroundColor:
          hover || toggleState === tabCount ? theme?.joinNowbutton?.bgcolor1 : theme?.addSpace?.bgColor,
        padding: "10px 14px",
        borderRadius: "4px",
        flex: 1,
        margin: "20px 20px 0px 00px",
        cursor: "pointer",
      }}
      onClick={() => toggleTab(tabCount)}
      onMouseEnter={() => setHover("fileType")}
      onMouseLeave={() => setHover("")}
    >
      <img
        alt=""
        src={`/assets/fileManager/${buttonType}.svg`}
        style={{
          paddingRight: "20px",
          filter: hover || toggleState === tabCount ? "brightness(0) invert(1)" : "",
        }}
      />
      <div>
        <Typography
          style={{
            color: hover || toggleState === tabCount ? "white" : "#88A1AB",
            fontFamily: "URW DIN",
            fontSize: "16px",
          }}
        >
          {buttonType}
        </Typography>
        <Typography
          style={{
            color: hover || toggleState === tabCount ? "white" : "#88A1AB",
            fontFamily: "URW DIN REGULAR",
            fontSize: "14px",
          }}
        >
          7 files
        </Typography>
      </div>
    </div>
  );
}

export default FileTypeButton