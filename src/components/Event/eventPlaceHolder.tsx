import { Skeleton } from "@mui/material";
import { AnyAction } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import PopUp from "../endCall";
import ChatLoader from "../SpaceChat/ChatLoader.tsx";

type eventPlaceHolder = {
  readyToJoin: boolean;
  setreadyToJoin: (arg0: boolean) => void;
  setfromLoby: () => AnyAction;
  theme: any;
};

function EventPlaceHolder({
  readyToJoin,
  setreadyToJoin,
  setfromLoby,
  theme,
}: eventPlaceHolder) {
  const dispatch = useDispatch();
  // change the background color of the body inside useEffect
  React.useEffect(() => {
    document.body.style.backgroundColor = theme?.bg_color_0
      ? theme?.bg_color_0
      : "#143F63";
    return () => {
      document.body.style.backgroundColor = "#143F63";
    };
  }, [theme]);

  return (
    <div>
      <div
        style={{
          height: "100vh",
          position: "relative",
        }}
      >
        <Skeleton
          variant="rounded"
          sx={{
            backgroundColor: theme?.bg_color_1 ? theme?.bg_color_1 : "#143F63",
            aspectRatio: 16 / 9,
            width: "95vw",
            height: "99%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateY(-50%) translateX(-50%)",
          }}
        />
        <Skeleton
          sx={{
            width: "20vw",
            height: "20vw",
            borderRadius: "50%",
            backgroundColor: theme?.bg_color_2 ? theme?.bg_color_2 : "#012243",
            position: "absolute",
            top: "45%",
            right: "50%",
            transform: "translate(50%,-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `2px solid ${
              theme?.button_color_0 ? theme?.button_color_0 : "#143F63"
            }`,
          }}
        ></Skeleton>

        <div
          style={{
            position: "absolute",
            top: "45%",
            right: "50%",
            transform: "translate(50%,-50%)",
            fontFamily: "URW DIN",
            fontSize: "1.2vw",
            display: "flex",
            color: theme?.account?.normaltext,
          }}
        >
          <div className="loader">
            <span>Loading</span>
            <span className="loader__dot">.</span>
            <span className="loader__dot">.</span>
            <span className="loader__dot">.</span>
          </div>
        </div>
      </div>

      <PopUp
        message="Are you sure you want to join the space ?."
        openEndDialoge={readyToJoin}
        handleClose={() => setreadyToJoin(false)}
        handleYes={() => {
          console.log("join now");
          dispatch(setfromLoby());
          setreadyToJoin(false);
        }}
      />
    </div>
  );
}

export default EventPlaceHolder;
