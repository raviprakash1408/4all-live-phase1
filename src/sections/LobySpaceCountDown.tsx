import * as React from "react";
import { Typography } from "@material-ui/core";

const LobbySpaceCountDown = (props) => {
  const { theme, remainingTime } = props;
  return (
    <>
      <Typography
        style={{
          fontFamily: "URW DIN",
          color: theme.font_color_0,
        }}
        variant="h4"
        className="eventHeading"
      >
        The event has not started
      </Typography>
      <div
        style={{
          margin: "auto",
          padding: "30px 0px",
          color: theme.font_color_0,
          display: "flex",
          justifyContent: "space-evenly",
        }}
        className="eventCoutdowndiv"
      >
        <div
          style={{
            border: "2px solid",
            borderColor: theme.font_color_0,
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
            borderColor: theme.font_color_0,
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
            borderColor: theme.font_color_0,
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
            borderColor: theme.font_color_0,
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
          color: theme.font_color_0,
        }}
        className="countDownDes"
      >
        <Typography style={{ fontFamily: "URW DIN REGULAR" }}>
          You will enter once the countdown reach to zero
        </Typography>
      </div>
    </>
  );
};

export default LobbySpaceCountDown;
