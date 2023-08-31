import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { getRemainingTimeUntilMsTimestamp } from "../utilities/CountdownTimerUtils";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

//create fc EventWaiting
export default function EventWaiting({ countdownTimestampMs }) {
  const theme = useSelector((state) => state.theme.themeData);

  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMs);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdownTimestampMs]);

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }

  return (
    <>
      {/* <Helmet>
    <title>EVENTS.FOX | Waiting</title>

    </Helmet> */}
      <div
        style={{
          backgroundImage: `url("/assets/images/waiting_bg.png")`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          height: "94vh",
          width: "80vw",
        }}
        className="eventWaiting"
      >
        {/* round image on center */}

        <div
          style={{
            position: "absolute",
            backgroundColor: theme?.waiting?.primaryColor,
            height: "67vh",
            width: "100%",
            top: "33vh",
          }}
        ></div>

        {localStorage.getObject("organization_logo") == "" ||
        localStorage.getObject("organization_logo") == "null" ? (
          <div
            style={{
              width: "270px",
              height: "270px",
              backgroundColor: theme?.spaces?.sidebaricon,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "uppercase",
              position: "absolute",
              top: "20vh",
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "50%",
              border: "10px solid #008BCD",
            }}
          >
            <span
              style={{
                // paddingTop: "10px",
                textAlign: "center",
                // display: "block",
                color: "#70A6A6",
                fontSize: "20px",
              }}
            >
              {localStorage.getObject("organization")[0]}
            </span>
          </div>
        ) : (
          <img
            src={localStorage.getObject("organization_logo")}
            alt="fox"
            style={{
              position: "absolute",
              top: "20vh",
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "50%",
              border: "10px solid #008BCD",
            }}
            className="eventImg"
          />
        )}

        <Typography
          style={{
            position: "absolute",
            top: "52vh",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "URW DIN",
            color: theme?.waiting?.mainColor,
          }}
          variant="h4"
          className="eventHeading"
        >
          The event has not started
        </Typography>

        <div
          style={{
            position: "absolute",
            width: "40%",
            top: "60vh",
            left: "50%",
            transform: "translateX(-50%)",
            color: theme?.waiting?.mainColor,
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <div
            style={{
              border: "2px solid",
              borderColor: theme?.login?.mainColor,
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            className="eventCountDown"
          >
            <Typography variant="h4" className="CountDown">
              {remainingTime.days}
            </Typography>
            <Typography
              variant="h6"
              className="CountDownHeading"
              style={{ fontFamily: "URW DIN REGULAR" }}
            >
              Days
            </Typography>
          </div>

          <div
            style={{
              border: "2px solid",
              borderColor: theme?.login?.mainColor,
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            className="eventCountDown"
          >
            <Typography variant="h4" className="CountDown">
              {remainingTime.hours}
            </Typography>
            <Typography
              variant="h6"
              className="CountDownHeading"
              style={{ fontFamily: "URW DIN REGULAR" }}
            >
              Hours
            </Typography>
          </div>
          <div
            style={{
              border: "2px solid",
              borderColor: theme?.login?.mainColor,
              borderRadius: "4px",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            className="eventCountDown"
          >
            <Typography variant="h4" className="CountDown">
              {remainingTime.minutes}
            </Typography>
            <Typography
              variant="h6"
              className="CountDownHeading"
              style={{ fontFamily: "URW DIN REGULAR" }}
            >
              Minutes
            </Typography>
          </div>

          <div
            style={{
              border: "2px solid",
              borderColor: theme?.login?.mainColor,
              borderRadius: "4px",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            className="eventCountDown"
          >
            <Typography variant="h4" className="CountDown">
              {remainingTime.seconds}
            </Typography>
            <Typography
              variant="h6"
              className="CountDownHeading"
              style={{ fontFamily: "URW DIN REGULAR" }}
            >
              Seconds
            </Typography>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: "84vh",
            left: "50%",
            transform: "translateX(-50%)",
            color: theme?.waiting?.mainColor,
          }}
        >
          <Typography
            variant="h7"
            className="countDownDes"
            style={{ fontFamily: "URW DIN REGULAR" }}
          >
            You will enter once the countdown reach to zero
          </Typography>
        </div>
      </div>
    </>
  );
}
