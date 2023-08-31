import * as React from "react";
// @ts-ignore
import LobbySpaceCountDown from "./LobySpaceCountDown.tsx";
import { Button, Typography, Box } from "@mui/material";
import { getEventStatus } from "../utilities/common";
import { useEffect, useRef } from "react";

const LobbySpaceState = (props) => {
  const {
    theme,
    mainEventData,
    eventStatus,
    remainingTime,
    startDate,
    endDate,
  } = props;

  const [spaceStatus, setSpaceStatus] = React.useState(
    getEventStatus(startDate, endDate)
  );

  const [mainSpacedata, setmainSpacedata] = React.useState(mainEventData);

  React.useEffect(() => {
    setSpaceStatus(getEventStatus(startDate, endDate));
  }, [startDate, endDate]);

  React.useEffect(() => {
    setmainSpacedata(mainEventData);
  }, [
    mainEventData.event_mode,
    mainEventData.lobby_type,
    mainEventData.lobby_video,
    mainSpacedata.lobby_image,
  ]);

  const videoReff = useRef();

  useEffect(() => {
    // @ts-ignore
    videoReff.current?.load();
  }, [mainEventData.lobby_video]);

  return (
    <>
      {mainSpacedata.event_mode && mainSpacedata.lobby_type === "C" ? (
        spaceStatus === "upcoming" ? (
          <LobbySpaceCountDown theme={theme} remainingTime={remainingTime} />
        ) : spaceStatus === "live" ? (
          <>
            <Typography
              style={{
                fontFamily: "URW DIN",
                color: theme?.waiting?.mainColor,
                textAlign: "center",
              }}
              variant="h4"
              className="eventHeading"
            >
              Event Already started
            </Typography>
            <div
              style={{
                color: theme?.waiting?.mainColor,
                top: "40vh",
              }}
              className="countDownDes"
            >
              <Typography
                style={{
                  fontFamily: "URW DIN REGULAR",
                  textAlign: "center",
                }}
              >
                The event is in progress. Please join..
              </Typography>
            </div>
          </>
        ) : (
          <>
            <Typography
              style={{
                fontFamily: "URW DIN",
                color: theme.font_color_0,
                textAlign: "center",
              }}
              variant="h4"
              className="eventHeading"
            >
              The event has ended
            </Typography>
            <div
              style={{
                margin: "auto",
                padding: "30px 0px",
                color: theme.font_color_2,
                display: "flex",
                justifyContent: "space-evenly",
              }}
              className="eventCoutdowndiv"
            >
              <img
                alt=""
                src="/assets/images/404.svg"
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
            </div>

            <div
              style={{
                color: theme.font_color_2,
                top: "65vh",
              }}
              className="countDownDes"
            >
              <Typography
                style={{
                  fontFamily: "URW DIN REGULAR",
                  textAlign: "center",
                }}
              >
                You can't join to the event as its expired
              </Typography>
              <Button
                variant="contained"
                style={{
                  textTransform: "none",
                  padding: "9px 43px",
                  fontSize: "16px",
                  lineHeight: "22px",
                  backgroundColor: theme.button_color_0,
                  marginRight: "21px",
                  borderRadius: "4px",
                  color: theme.font_color_1,
                  fontFamily: "URW DIN REGULAR",
                  margin: "30px 0px 0px 55px",
                }}
                onClick={() => (window.location.href = "/")}
              >
                Back to home
              </Button>
            </div>
          </>
        )
      ) : mainSpacedata.lobby_type === "I" ? (
        <img
          alt=""
          src={
            mainSpacedata.lobby_image
              ? mainSpacedata.lobby_image
              : "/assets/images/lobbybg.png"
          }
          style={{
            width: "100%",
            aspectRatio: "16/9",
            objectFit: "cover",
          }}
        />
      ) : mainSpacedata.lobby_type === "V" ? (
        <video
          width="100%"
          style={{ height: "95vh" }}
          muted
          autoPlay
          controls
          loop
          controlsList="nodownload"
          // @ts-ignore
          ref={videoReff}
        >
          <source
            src={
              mainSpacedata.lobby_video
                ? mainSpacedata.lobby_video
                : "https://video.fandango.com/MPX/video/NBCU_Fandango/24/443/source_AC25FE42-A8EB-49EA-8223-6EDF318C540CTheMaskedSingerS4FirstLook_1795331651593_mp4_video_1920x1080_8000000_primary_audio_eng_9.mp4"
            }
            type="video/mp4"
          />
        </video>
      ) : (
        <></>
      )}
    </>
  );
};

export default LobbySpaceState;
