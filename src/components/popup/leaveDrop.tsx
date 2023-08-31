import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";

import { useSelector } from "react-redux";
import { changeOpacity } from "../../utilities/common";

const LeaveDrop = (props) => {
  // const theme = useSelector((state: any) => state.theme.themeData);
  const theme = props.theme;

  return (
    <div
      style={{
        alignItems: "center",
        background: changeOpacity(theme?.bg_color_1, 0.6),
        bottom: "0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        left: "0px",
        position: "fixed",
        right: "0px",
        top: "0px",
        zIndex: "33",
      }}
      className="profile-popup"
    >
      <Box
        style={{
          backgroundColor: theme?.bg_color_0,
          borderRadius: "20px",
          width: "420px",
          height: "387px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            display: "flex",
            width: "20px",
            height: "20px",
            top: "-10px",
            right: "-10px",
            backgroundColor: "#88A1AB",
            borderRadius: "25px",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={props.cancelButtonfunction}
        >
          <img alt="" src="/assets/icons/x.svg" />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "50px 0px 40px",
              backgroundColor: theme?.bg_color_2,
              width: "100px",
              height: "100px",
              borderRadius: "50%",
            }}
          >
            <img
              alt="infoDrop"
              src={props.img}
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        <Typography
          variant="h5"
          style={{
            color: theme?.spaces?.secondaryColor,
            fontWeight: "700",
            textAlign: "center",
            padding: "0px 0px 4px",
            fontFamily: "URW DIN",
            fontSize: "20px",
          }}
        >
          {props.title}
        </Typography>

        <Typography
          variant="h5"
          style={{
            color: "#88A1AB",
            fontWeight: "400",
            textAlign: "center",
            padding: "0px 25px",
            fontFamily: "URW DIN REGULAR",
            fontSize: "16px",
          }}
        >
          {props.content}
        </Typography>

        <div
          style={{
            textAlign: "center",
            position: "absolute",
            bottom: "53px",
            left: 0,
            right: 0,
            margin: "auto",
          }}
        >
          <Button
            variant="contained"
            style={{
              textTransform: "none",
              padding: "9px 25px",
              minWidth: "137px",
              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
              lineHeight: "22px",
              backgroundColor: theme?.bg_color_2,
              marginRight: "21px",
              borderRadius: "4px",
              color: "white",
            }}
            onClick={props.openButtonfunction}
          >
            {props.openButtonText}
          </Button>
          <Button
            variant="contained"
            style={{
              textTransform: "none",
              padding: "9px 47px",
              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
              lineHeight: "22px",
              backgroundColor: theme?.bg_color_3,
              // border: "2px solid",
              // borderColor: theme?.login?.secondaryColor,
              borderRadius: "4px",
              color: theme?.login?.tertiaryColor,
            }}
            onClick={props.cancelButtonfunction}
          >
            Cancel
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default LeaveDrop;
