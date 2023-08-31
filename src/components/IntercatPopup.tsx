import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { TextField, Stack } from "@mui/material";
import { useEffect } from "react";
import { AxiosLocal } from "../utilities/axiosUtils.ts";
import { useLocation } from "react-router";
// @ts-ignore
import CustomTextField from "./styled/textField.tsx";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import MuiTextField from "../admin/components/MuiTextField";
import { changeOpacity, formatDate } from "../utilities/common";
import { useSelector } from "react-redux";
import { RootState } from "../state/store.tsx";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { RandomPicture } from "random-picture";
import Toast from "../sections/Toast";
import { Link } from "react-router-dom";
import { useState } from "react";

function IneractPopUpForm(props) {
  // const theme = useSelector((state: RootState) => state.theme.themeData);
  const theme = props.theme;

  const [UserInteractPopOpen, setUserInteractPopOpen] = useState(true);
  const [EventReady, setEventReady] = useState(false);

  // state for username and password

  const location = useLocation();

  return (
    <>
      <div
        style={{
          position: "fixed",
          display: props.open ? "flex" : "none",
          width: "100vw",
          height: "100vh",
          top: "0px",
          left: "0px",
          background: changeOpacity(theme?.bg_color_1, 0.6),
          borderRadius: "4px",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "99",
          userSelect: "none",
        }}
        // onClick={() => {
        //   props.handleClose();
        // }}

        onClick={() => {
          props.onClick();
        }}
      >
        {/* <Button
          style={{
            color: "white",
            backgroundColor: "#008BCD",
            fontFamily: "URW DIN REGULAR",
            textTransform: "none",
            padding: "7px 128px",
          }}
          onClick={() => {
            props.onClick();
          }}
        >
          <img alt="" src="/assets/admin/join-now.svg" />
          <span style={{ paddingLeft: "10px" }}>Click to listen</span>
        </Button> */}
        <div
          style={{
            position: "relative",
            // width: "482px",
            // maxHeight: "90vh",
            backgroundColor: "transparent",
            borderRadius: "4px",
          }}
        >
          <div
          // className="vertical-scrollbar"
          // style={{
          //   display: "flex",
          //   maxHeight: "calc(100% - 100px)",
          //   flexDirection: "column",
          //   gap: "6px",
          //   overflow: "hidden",
          //   overflowY: "auto",
          // }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // padding: "40px 0px 58px",
                color: theme?.loby?.textColor,
              }}
            >
              <p>Click to listen</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IneractPopUpForm;
