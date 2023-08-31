import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import SortbyDrop from "./SortbyDrop";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { AxiosLocal } from "../utilities/axiosUtils.ts";
import { setcurrentSpaceName } from "../state/local/localSlice";
import NoEvent from "./NoEvent";
import ReactLoading from "react-loading";
import { Helmet } from "react-helmet";
import { formatDate, userLogout } from "../utilities/common";
import {
  CHANNEL_TYPES,
  subscribeCentrifugoChannel,
} from "../utilities/centrifugoUtils.ts";
import { CAPITALIZE_WEBSITE_PATH } from "../utilities/websiteUrls.ts";

function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}
// create functional component for selection of events
export default function EventSelection(props) {
  const dispatch = useDispatch();
  // useSelector to get the theme from the store
  const theme = useSelector((state) => state.theme.themeData);
  // const style = useSelector(state => state.theme.theme)
  // loading
  let [loading, setLoading] = useState(true);
  // return a grid of events
  const [events, setevents] = useState([]);
  let newEvents = [];

  const getSpaces = () => {
    AxiosLocal.get("breakoutSpaces/")
      .then(function (response) {
        console.log(response.data.data, "EventListResponse");
        setevents(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getSpaces();
  }, []);
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = theme?.login?.favicon32x32;
  }, []);
  const spaceClick = (spaceName, spaceSlug) => {
    // console.log("spaceClick");
    localStorage.removeItem("currentSubSpaceName");
    localStorage.removeItem("currentSubSpaceSlug");
    dispatch(setcurrentSpaceName(spaceName));
    localStorage.setObject("currentSpaceName", spaceName);
    localStorage.setObject("currentSpaceSlug", spaceSlug);
    localStorage.removeItem("currentSubSpaceName");
  };

  useEffect(() => {
    async function getAssignedSpaces() {
      console.log("getAssignedSpaces");

      try {
        console.log("getAssignedSpaces 1");
        let login_channel;
        // @ts-ignore
        if (window.loginChannel) {
          // @ts-ignore
          login_channel = await window.loginChannel;
        } else {
          login_channel = await subscribeCentrifugoChannel(
            CHANNEL_TYPES.USER_LOGIN
          );
        }

        console.log(login_channel, "login_channel");

        // @ts-ignore
        await window.loginChannel.on("publication", function (ctx) {
          console.log(ctx, "user_space_changed");
          switch (ctx.data.type) {
            case "user_space_changed":
              console.log(ctx.data, "user_space_changed");
              getSpaces();
              break;
            case "user_space_edit":
              getSpaces();
              break;
            case "user_remove":
              console.log("user_remove", ctx.data);
              console.log("user_remove", ctx.data.user_ids[0]);
              if (ctx.data?.user_ids[0] === localStorage.getObject("id")) {
                userLogout();
                window.location.href = "/";
              }
              break;

            default:
              console.log("aaa");
          }
        });
      } catch (error) {
        console.log("getAssignedSpaces 2");
        console.log(error, "error");
      }
    }
    if (localStorage.getObject("auth") == "true") {
      getAssignedSpaces();
    }
  }, []);

  //   for (let i = 0; i < events.length; i++) {
  //       newEvents.push(
  //           <Grid item xs={12} sm={8} md={4} lg={4} >
  //                 <Badge  invisible={!events[i].liveNow}  anchorOrigin={{
  //   vertical: 'top',
  //   horizontal: 'left',
  // }} overlap="circular" badgeContent={
  //                   (<img style={{
  //                       width: 'auto',
  //                       height: '40px',
  //                   }} src='/assets/images/liveNow.svg' />)
  //                 }>

  //           <Card sx={{
  //               backgroundColor: theme?.spaces?.tertiaryColor,
  //             width: '100%',
  //             height: 'auto',
  //             display: 'flex',
  //             padding: '10px',
  //               flexDirection: 'column',
  //               justifyContent: 'space-between',
  //               alignItems: 'center',
  //               width: '250px',
  //               height:'250px'
  //           }} className='eventGrid'>
  //           <CardActionArea sx={{
  //               display: 'flex',
  //               flexDirection: 'column',
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //           }}>
  //             <CardMedia
  //               component="img"

  //               image={events[i].image}
  //               alt="green iguana"
  //               sx={{
  //                   width: '50%',
  //                   // make image round
  //                   borderRadius: "50%",
  //                   // make image fit in card

  //               }}
  //               className='eventImg'
  //             />
  //             <CardContent sx={{
  //               display: 'flex',
  //               flexDirection: 'column',
  //               alignItems: 'center',
  //               justifyContent: 'center',
  //             }}>
  //               <Typography gutterBottom  sx={{
  //                   color: theme?.spaces?.secondaryColor,
  //                   fontSize:'16px',
  //                   fontFamily:'URW DIN'
  //               }} component="div">
  //                 {events[i].name}
  //               </Typography>
  //               <Typography variant="body3" sx={{
  //                   color: theme?.spaces?.mainColor,
  //                   fontSize:'14px',
  //                   fontFamily:'URW DIN REGULAR'
  //               }} color="text.secondary">
  //                   {new Date(events[i].date).toUTCString()}

  //               </Typography>
  //             </CardContent>
  //           </CardActionArea>
  //           <div className='overlay'>
  //             <div className='joinnow'>
  //             <img src='/assets/icons/join_now_symbol.png' />
  //             <img src='/assets/icons/JOIN NOW.png' style={{marginTop: '14px'}}/>
  //             </div>
  //           </div>
  //         </Card>

  //     </Badge>
  //       </Grid>
  //       );
  //   }

  for (let i = 0; i < events.length; i++) {
    newEvents.push(
      <li
        key={"event" + i}
        style={{
          backgroundColor: theme?.spaces?.tertiaryColor,
          borderRadius: "4px",
          position: "relative",
          padding: "10px 0px 12px",
        }}
        className="eventList"
      >
        {/* {events[i].liveNow ? <img style={{
                    position:'absolute',
                    top:'3px',
                    left:'3px',
                    width: 'auto',
                    height: '40px',
                }} src='/assets/images/liveNow.svg' /> : ''} */}
        {events[i].event_mode ? (
          <></>
        ) : (
          <img
            alt=""
            style={{
              position: "absolute",
              top: "19px",
              right: "25px",
              width: "50px",
              height: "53px",
              zIndex: "4",
            }}
            src="/assets/images/live.svg"
          />
        )}
        {/* <Badge  invisible={!events[i].liveNow}  anchorOrigin={{
vertical: 'top',
horizontal: 'left',
}} overlap="circular" badgeContent={
                (<img style={{
                    width: 'auto',
                    height: '40px',
                }} src='/assets/images/liveNow.svg' />)
              }> */}

        <div
          style={{
            // backgroundColor: theme?.spaces?.tertiaryColor,

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            // width: '250px',
            // height:'250px'
          }}
          className="eventGrid"
        >
          <img
            alt=""
            src={
              events[i] != null && events[i].hasOwnProperty("main_logo")
                ? events[i].main_logo
                : events[i].hasOwnProperty("room_image")
                  ? events[i].room_image
                  : "/assets/icons/room1.svg"
            }
            style={{
              // make image round
              borderRadius: "50%",
              // make image fit in card
            }}
            className="eventImg"
          />

          <Typography
            gutterBottom
            sx={{
              color: theme?.spaces?.secondaryColor,
              fontSize: "16px",
              fontFamily: "URW DIN",
              marginTop: "17px",
            }}
            component="div"
          >
            {events[i].name}
          </Typography>
          {events[i].event_mode ? (
            <>
              <Typography
                variant="body3"
                sx={{
                  color: theme?.spaces?.mainColor,
                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                }}
                color="text.secondary"
              >
                Starts at {formatDate(new Date(events[i].event_start))}
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant="body3"
                sx={{
                  color: theme?.spaces?.mainColor,
                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  opacity: 0,
                }}
                color="text.secondary"
              >
                Event mode off
              </Typography>
            </>
          )}
          {/* organization not geting */}
          <Link
            reloadDocument
            to={
              events[i].is_lobby
                ? `/lobby/${localStorage.getObject("organization_slug")}/${events[i].slug
                }`
                : `/${localStorage.getObject("organization_slug")}/${events[i].slug
                }`
            }
            onClick={() => {
              if (events[i].is_lobby) {
                window.location.href = `/lobby/${localStorage.getObject(
                  "organization_slug"
                )}/${events[i].slug}`;
              } else {
                window.location.href = `/${localStorage.getObject(
                  "organization_slug"
                )}/${events[i].slug}`;
              }
            }}
            className="overlay"
          >
            <div
              className="joinnow"
              onClick={() => {
                spaceClick(events[i].name, events[i].slug);
              }}
            >
              <img alt="" src="/assets/icons/join_symbol.svg" />
              {/* <Typography variant="body3" style={{paddingTop: '18px', fontSize:'16px', fontFamily:'URW DIN',color:'white'}}>JOIN&nbsp;NOW</Typography> */}
              <img
                alt=""
                src="/assets/icons/join_now.svg"
                style={{ marginTop: "14px" }}
              />
            </div>
          </Link>
        </div>

        {/* </Badge> */}
      </li>
    );
  }

  return (
    <>
      <Helmet>
        <title> {theme?.login?.title} | Space </title>
      </Helmet>

      <div
        style={{
          backgroundImage: "url(" + theme?.login?.bgImg + ")",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundBlendMode: "darken",
          position: "relative",
          backgroundColor: theme?.spaces?.bgColor,
          // height: "93.9vh",
          // overflow: "hidden",
          paddingTop: "60px",
        }}
        className="testclass content-full-height"
      >
        <Box
          sx={{
            overflow: "hidden",
          }}
        >
          {/* <Box sx={{ display: 'flex', justifyContent:"flex-end", margin:"10px 30px" }}>
                        <Box  sx={{
            background:" #012A50",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

        }}>
                        <img style={{
                            width: 'auto',
            height: '20px',
                        }} src='assets/images/search.svg' />
        <TextField
        sx={{
            height: '30px',
            display: 'flex',
            border:"none"
        }}
          InputLabelProps={{
            style: {
              color: '#88A1AB',
               
                margin:"-15px 10px",
                border:"none",
            }
          }}
          InputProps={{
            style: {
              margin: "-5px 10px",
                // border: '1px solid #032E57'
                border:"none"
           
            }
          }}
        id="input-with-sx" label="Search event" variant="standard" />
                        </Box>
       
      </Box> */}
          {/* <Grid sx={{
            padding: "0 7vw",
          overflow: 'hidden',
            }} container columnSpacing={1} spacing={2}> */}
          <Typography
            variant="body3"
            sx={{
              color: theme?.spaces?.secondaryColor,
              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
              textAlign: "center",
              position: "absolute",
              left: "50%",
              marginLeft: "-100px",
              top: "95px",
            }}
            color="text.secondary"
          >
            Spaces - Please select a space
          </Typography>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "24px 0px",
              maxWidth: "1163px",
              margin: "auto",
            }}
          >
            <SearchBar />
            <div style={{ margin: "20px 0px 20px 20px" }}>
              <SortbyDrop />
            </div>
          </div> */}
          {!loading ? (
            <div style={{ marginTop: "100px", }} className="container">
              <Scrollbars style={{ width: "100%", height: "82vh" }}>
                {/* <Grid container spacing={{ xs: 5, md: 5, lg:5 }} columns={{ xs: 4, sm: 8, md: 12, lg:16 }} style={{paddingBottom:'40px'}}> */}
                <ul
                  className="flex flex-wrap gap"
                  style={{ listStyle: "none" }}
                >
                  {newEvents.length !== 0 ? newEvents : <NoEvent />}

                  {/* {newEvents} */}
                </ul>
                {/* </Grid> */}
              </Scrollbars>
            </div>
          ) : (
            <div
              className="loader-container"
            // style={{
            //   background: theme?.spaces?.bgColor

            // }}
            >
              <div
                className="spinner"
                style={{
                  borderColor: `${theme?.spaces?.secondaryColor} transparent`,
                }}
              ></div>
            </div>
          )}
        </Box>
      </div>
    </>
  );
}
