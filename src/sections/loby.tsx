import * as React from "react";
import { Helmet } from "react-helmet";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import store, { RootState } from "../state/store.ts";
import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AxiosLocal } from "../utilities/axiosUtils.ts";
import { getRemainingTimeUntilMsTimestamp } from "../utilities/CountdownTimerUtils";
//@ts-ignore
import Preview from "../components/loby/preview.tsx";
import {
  convertTZ,
  formatDate,
  getEventStatus,
  getTeamSlugFromUrl,
} from "../utilities/common";
// @ts-ignore
import { SpaceOnlineUsers } from "../admin/components/SpaceOnlineUsers.tsx";
import moment from "moment";
import "moment-timezone";
// @ts-ignore
import LobbySpaceState from "./LobySpaceState.tsx";
// @ts-ignore
import { toTimeZone } from "../utilities/timeZoneUtils.ts";
// @ts-ignore
import LobySidebarDate from "./LobySidebarDate.tsx";
import { setEventDark, setEventLight } from "../state/theme/themeSlice";
import {
  CAPITALIZE_WEBSITE_PATH,
  WEBSITE_PATH,
} from "../utilities/websiteUrls.ts";
interface MainEvent {
  room_image?: string;
  name?: string;
  lobby_type?: string;
  lobby_image?: string;
  lobby_video?: string;
  start_date: string;
  end_date: string;
  is_master?: boolean;
  auto_start_space: boolean;
  event_mode: boolean;
}
const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

function Loby() {
  // selectors
  // const theme = useSelector((state: RootState) => state.theme.themeData);
  const local = useSelector((state: RootState) => state.local);
  let conference = useSelector((state: RootState) => state.conference);
  const [subscribedToCentrifugo, setsubscribedToCentrifugo] = useState(false);
  const [onlineUserLoader, setonlineUserLoader] = useState(false);

  const [overrideTheme, setoverrideTheme] = useState<boolean>(false);

  const permissions = useSelector((state: RootState) => state.permissions);

  const [darkTheme, setdarkTheme] = useState({});
  const [lightTheme, setlightTheme] = useState({});

  // const [theme, settheme] = useState(
  //   useSelector((state: RootState) => state.theme.themeData)
  // );

  let team_slug = getTeamSlugFromUrl("lobby");

  const theme = useSelector(
    (state: RootState) => state.theme.eventTheme[state.theme.theme]
  );
  const themes = useSelector((state) => state.theme.themeData);

  const dispatch = useDispatch();

  //states
  // @ts-ignore
  const [mainEventData, setmainEventData] = useState<MainEvent>({
    start_date: "",
    is_master: false,
  });

  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  // realtime
  const [realTime, setRealTime] = useState(0);

  //   isloading
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  const [onlineUsers, setonlineUsers] = useState<any>([]);

  const [eventStatus, seteventStatus] = useState<string>("upcoming");

  let myDate = new Date(mainEventData.start_date);
  let countdownTimestampMs = myDate.getTime();

  useEffect(() => {
    setonlineUserLoader(true);
    if (conference.centrifugoClient) {
      // Space Channel Subscription
      let path = location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1
      );
      AxiosLocal.post("centrifugo/space", {
        subspace_slug: path,
        team_slug: team_slug,
      })
        .then((res) => {
          let eventToken = res.data.token;
          let eventChanel;
          // @ts-ignore
          try {
            // @ts-ignore
            let eventChanel = (window.eventChanel = client.newSubscription(
              res.data.channel_name,
              {
                token: eventToken,
                joinLeave: true,
              }
            ));
            eventChanel.subscribe();
          } catch (error) {
            // @ts-ignore
            eventChanel = window.eventChanel;
          }

          // console.log(res.data.channel_name, eventToken, "centrifugo");

          // @ts-ignore
          window.eventChanel.on("publication", function async(ctx) {
            if (ctx.data.event === "lobby_realtime") {
              setRealTime((prev) => prev + 1);
            }

            // if (
            //   ctx.data.type === "light_theme" ||
            //   ctx.data.type === "dark_theme"
            // ) {
            //   if (localStorage.getObject("theme") === "dark") {
            //     settheme({ ...theme, ...ctx.data.dark_theme });
            //   } else {
            //     settheme({ ...theme, ...ctx.data.light_theme });
            //   }
            // }
            if (
              ctx.data.type === "light_theme" ||
              ctx.data.type === "dark_theme"
            ) {
              if (localStorage.getObject("theme") === "dark") {
                dispatch(setEventDark({ ...ctx.data.dark_theme }));
              } else {
                dispatch(setEventLight({ ...ctx.data.light_theme }));
              }
            }

            if (
              ctx.data.type === "room_name" ||
              ctx.data.type === "main_logo" ||
              ctx.data.type === "event_mode" ||
              ctx.data.type === "lobby_type" ||
              ctx.data.type === "lobby_image" ||
              ctx.data.type === "lobby_video" ||
              ctx.data.type === "event_start" ||
              ctx.data.type === "event_end"
            ) {
              // console.log(ctx.data, "room_name");
              let room_data = ctx.data.main_room_data;
              let mainSpaceData = {
                room_image: room_data.main_logo,
                name: room_data.name,
                lobby_type: room_data.lobby_type,
                lobby_image: room_data.lobby_image,
                lobby_video: room_data.lobby_video,
                start_date: room_data.event_start,
                end_date: room_data.event_end,
                is_master: false,
                auto_start_space: room_data.auto_start_space,
                event_mode: room_data.event_mode,
              };
              setmainEventData({ ...mainSpaceData });
            }
            if (ctx.data.type === "is_lobby" && ctx.data.value === false) {
              joinMeet();
            }
          });

          setsubscribedToCentrifugo(true);
        })
        .catch((err) => {
          console.log(err, "centrifugo");
        });
    }

    return () => {
      console.log("unsubscribing centrifugo");
      // @ts-ignore
      // window.eventChanel?.unsubscribe();
    };
  }, [conference.centrifugoClient, subscribedToCentrifugo]);

  useEffect(() => {
    try {
      let presenseDataReady = true;
      let subspace_id = local.currentSubspace.id;
      let organization_id = localStorage.getObject("organizationId");

      let path = location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1
      );
      if (local.currentSubspace.id === undefined) {
        presenseDataReady = false;
        AxiosLocal.get(`subspace/${path}/?team_slug=${team_slug}`)
          .then((res) => {
            // @ts-ignore
            if (res.status === "Success") {
              subspace_id = res.data.id;
              organization_id = res.data.organization.id;
              localStorage.setObject("currentSubSpaceId", res.data.id);
              localStorage.setObject(
                "organizationId",
                res.data.organization_id
              );
            }
          })
          .catch((err) => {
            // console.log(err);
          });
      }

      if (presenseDataReady) {
        // @ts-ignore
        window.client
          .presence(
            `space_online_channel_${subspace_id}_${organization_id}_${WEBSITE_PATH}`
          )
          .then(function (resp) {
            try {
              const { clients } = resp;
              //for loop dict
              let users = [];
              let user_ids = [];
              for (const [key, value] of Object.entries(clients)) {
                // @ts-ignore
                if (!user_ids.includes(clients[key]["chan_info"]["user_id"])) {
                  // @ts-ignore
                  users.push(clients[key]["chan_info"]);
                  // @ts-ignore
                  user_ids.push(clients[key]["chan_info"]["user_id"]);
                }
              }
              setonlineUsers([...users]);
              setonlineUserLoader(false);
            } catch (error) {
              console.log("presence error1", error);
            }
          });
      }
    } catch (error) {
      console.log("presence error3", error);
    }
  }, [local.currentSubspace]);
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = themes?.login?.favicon32x32;
  }, []);
  const joinMeet = () => {
    let selectedSubSpace = local.currentSubspace;
    let path = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    if (Object.keys(selectedSubSpace).length !== 0) {
      try {
        if (selectedSubSpace?.is_master) {
          path = `${localStorage.getObject("organization_slug")}/${
            selectedSubSpace.slug
          }`;
        } else {
          path = `${localStorage.getObject("organization_slug")}/${
            selectedSubSpace.room_slug
          }/${selectedSubSpace.slug}`;
        }
      } catch (error) {
        path = `${selectedSubSpace.room_slug}/${selectedSubSpace.slug}`;
      }
    }
    window.localStorage.setObject("lobby_visited", "true");
    window.localStorage.setObject("lobby_visited_event_path", `/${path}`);

    window.location.href = `/${path}`;
  };
  useEffect(() => {
    let path = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    if (Object.keys(local.currentSubspace).length !== 0) {
      path = local.currentSubspace.slug;
    }
    AxiosLocal.get(`subroom/${path}?team_slug=${team_slug}`)
      .then(function (response) {
        seteventStatus(
          getEventStatus(
            response.data.data.start_date,
            response.data.data.end_date
          )
        );
        if (!response.data.data.is_lobby) {
          console.log(response.data,"LobbyCheckingggg");
          
          joinMeet();
        }
        let data = response.data.data;
        if (response.data.data.override_theme) {
          if (localStorage.getObject("theme") === "dark") {
            dispatch(setEventDark({ ...data.dark_theme }));
          } else {
            dispatch(setEventLight({ ...data.light_theme }));
          }
        }
        setIsLoading(false);
        setmainEventData(response.data.data);
        localStorage.setObject("currentSubSpaceId", response.data.data.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [
    local.currentSubspace,
    useSelector((state: RootState) => state.theme.themeData),
    localStorage.getObject("theme"),
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMs);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdownTimestampMs]);

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://video.fandango.com/MPX/video/NBCU_Fandango/24/443/source_AC25FE42-A8EB-49EA-8223-6EDF318C540CTheMaskedSingerS4FirstLook_1795331651593_mp4_video_1920x1080_8000000_primary_audio_eng_9.mp4",
        type: "video/mp4",
      },
    ],
  };

  const videoRef = useRef();

  useEffect(() => {
    // @ts-ignore
    videoRef.current?.load();
  }, [mainEventData]);

  useEffect(() => {
    seteventStatus(
      getEventStatus(mainEventData.start_date, mainEventData.end_date)
    );
  }, [mainEventData.start_date, mainEventData.end_date]);

  return (
    <>
      <Helmet>
        <title>{themes?.login?.title} | Lobby</title>
      </Helmet>

      {!isLoading && (
        <Grid container spacing={0} height="100vh">
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            style={{
              backgroundColor: theme.bg_color_1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="sidebar-header">
              <Typography
                variant="h5"
                style={{
                  color: theme.font_color_1,
                  fontFamily: "URW DIN",
                  fontWeight: "700",
                }}
              >
                Join to space
              </Typography>
            </div>
            <div className="sidebar-avatar">
              {mainEventData.room_image && (
                <img
                  style={{
                    borderRadius: "50%",
                    width: "150px",
                    height: "150px",
                    border: `5px solid ${theme.button_color_0}`,
                    margin: "24px",
                    objectFit: "cover",
                  }}
                  src={mainEventData.room_image}
                  alt="avatar"
                />
              )}
            </div>

            <div className="sidebar-name">
              <Typography
                style={{
                  color: theme.font_color_1,
                  fontFamily: "URW DIN REGULAR",
                  fontSize: "16px",
                }}
              >
                {mainEventData.name}
              </Typography>
            </div>
            <LobySidebarDate
              mainEventData={mainEventData}
              theme={theme}
              remainingTime={remainingTime}
            />
            <div>
              <Preview theme={theme} />
            </div>
            {
              // @ts-ignore
              // Date.now() - new Date(mainEventData.end_date).getTime() && mainEventData.event_mode <= 0 ? (
              <Button
                onClick={joinMeet}
                variant="contained"
                style={{
                  textTransform: "none",
                  color: theme.font_color_1,
                  padding: "8px 63px",
                  fontSize: "14px",
                  lineHeight: "22px",
                  // pointerEvents: eventStatus === "upcoming" ? "none" : "all",
                  backgroundColor: theme.button_color_0,
                }}
                sx={{
                  filter: "blur(0px)",
                }}
                id="joinBtn"
              >
                Join now
              </Button>
            }

            {permissions?.show_online_people_loby &&
              !onlineUserLoader &&
              onlineUsers.length !== 0 && (
                <SpaceOnlineUsers theme={theme} onlineUsers={onlineUsers} />
              )}

            {/* <Box
                style={{
                  backgroundColor: "#88A1AB",
                  color: "#012243",
                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  margin:'15px 20px 0px 20px',
                  borderRadius:'4px',
                  padding:'12px 50px'
                }}
              >
                {/* <img src='/assets/bottomIcons/' */}
            {/* You need to enable microphone and camera access
              </Box>  */}
            {/* <CustomAvatarGroup /> */}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={9}
            style={{
              backgroundColor: theme.bg_color_4,
              display: "flex",
              alignItems: "center",
              marginTop: "6vh",
            }}
            className="lobyRightside"
          >
            <LobbySpaceState
              theme={theme}
              mainEventData={mainEventData}
              eventStatus={eventStatus}
              remainingTime={remainingTime}
              startDate={mainEventData.start_date}
              endDate={mainEventData.end_date}
              videoRef={videoRef}
            />

            {/* {
              // @ts-ignore
              mainEventData.event_mode &&
              Date.now() - new Date(mainEventData.end_date).getTime() <= 0 ? (
                mainEventData.lobby_type === "C" ? (
                  mainEventData.auto_start_space ? (
                    Date.now() - new Date(mainEventData.start_date).getTime() <=
                    0 ? (
                      <p>Immediate join</p>
                    ) : (
                      countdown()
                    )
                  ) : Date.now() -
                      new Date(mainEventData.start_date).getTime() >
                    0 ? (
                    countdown()
                  ) : (
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
                          The event is in progress. Please join..
                        </Typography>
                      </div>
                    </>
                  )
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
              ) : mainEventData.lobby_type === "I" ? (
                <img
                  alt=""
                  src={
                    mainEventData.lobby_image
                      ? mainEventData.lobby_image
                      : "/assets/images/lobbybg.png"
                  }
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    objectFit: "cover",
                  }}
                />
              ) : mainEventData.lobby_type === "V" ? (
                <video
                  width="100%"
                  style={{ height: "95vh" }}
                  muted
                  autoPlay
                  controls
                  loop
                  controlsList="nodownload"
                  // @ts-ignore
                  ref={videoRef}
                >
                  <source
                    src={
                      mainEventData.lobby_video
                        ? mainEventData.lobby_video
                        : "https://video.fandango.com/MPX/video/NBCU_Fandango/24/443/source_AC25FE42-A8EB-49EA-8223-6EDF318C540CTheMaskedSingerS4FirstLook_1795331651593_mp4_video_1920x1080_8000000_primary_audio_eng_9.mp4"
                    }
                    type="video/mp4"
                  />
                </video>
              ) : (
                <></>
              )
              // :
              //  mainEventData.lobby_type === "I" ? (
              //     <img
              //       alt=""
              //       src={
              //         mainEventData.lobby_image
              //           ? mainEventData.lobby_image
              //           : "/assets/images/lobbybg.png"
              //       }
              //       style={{
              //         width: "100%",
              //         aspectRatio: "16/9",
              //         objectFit: "cover",
              //       }}
              //     />
              //   ) : mainEventData.lobby_type === "V" ? (
              //     <video
              //       width="100%"
              //       autoPlay
              //       controls
              //       controlsList="nodownload"
              //     >
              //       <source
              //         src={
              //           mainEventData.lobby_video
              //             ? mainEventData.lobby_video
              //             : "https://video.fandango.com/MPX/video/NBCU_Fandango/24/443/source_AC25FE42-A8EB-49EA-8223-6EDF318C540CTheMaskedSingerS4FirstLook_1795331651593_mp4_video_1920x1080_8000000_primary_audio_eng_9.mp4"
              //         }
              //         type="video/mp4"
              //       />
              //     </video>
              //   ):
              //   (<></>)
            } */}
          </Grid>
          {/* <ChatIcon/> */}
          {/* <SpaceChat /> */}
        </Grid>
      )}
    </>
  );
}

export default Loby;
