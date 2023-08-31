import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React, { useState, useEffect } from "react";
// import MultiActionAreaCard from './Card'
import {
  Box,
  Typography,
  Button,
  Grid,
  Divider,
  CardActionArea,
  OutlinedInput,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SortbyDrop from "./SortbyDrop";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TabIcon from "@mui/icons-material/Tab";
import WindowIcon from "@mui/icons-material/Window";
import { DesktopOutlined } from "@ant-design/icons";
import {
  setStreamType,
  STREAM_TYPES,
  setShareUrl,
} from "../state/local/localSlice";
import CircularStatic from "../admin/components/CircularStatic";
import CloseIcon from "@mui/icons-material/Close";
import { AxiosLocal } from "../utilities/axiosUtils.ts";
import { Checkbox, CircularProgress, Snackbar } from "@mui/material";
import SortByFileManager from "./SortByFileManager";
import { v4 as uuidv4 } from "uuid";
import { updateRoomConfig } from "../livekitConnection/userMap.ts";
import {
  setCenterStageDevice,
  setcurrentActiveUserId,
  setplaying,
} from "../state/conference/conferenceSlice";
import { changeOpacity } from "../utilities/common";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const images = [
  {
    id: 1,
    image: "/assets/images/masked_singer.svg",
  },
  {
    id: 2,
    image: "/assets/images/filemanger1.svg",
  },
  {
    id: 3,
    image: "/assets/images/filemanager2.svg",
  },
  {
    id: 4,
    image: "/assets/images/filemanger3.svg",
  },
  {
    id: 5,
    image: "/assets/images/filemanger4.svg",
  },
  {
    id: 6,
    image: "/assets/images/filemanger5.svg",
  },
  {
    id: 7,
    image: "/assets/images/filemanger6.svg",
  },
  {
    id: 8,
    image: "/assets/images/filemanger7.svg",
  },
  {
    id: 9,
    image: "/assets/images/masked_singer.svg",
  },
  {
    id: 10,
    image: "/assets/images/filemanger1.svg",
  },
];

const useOutlinedInputStyles = makeStyles((theme) => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#012A50",
    },
    "&:hover $notchedOutline": {
      borderColor: "#012A50 !important",
    },
    "&$focused $notchedOutline": {
      borderColor: "green",
    },
  },
  focused: {},
  notchedOutline: {},
}));

function eventChannelEvents(ctx) {
  console.log(ctx.data, "ctx.datactx.data");
}

function FileManager(props) {
  const conference = useSelector((state) => state.conference);
  // const theme = useSelector((state) => state.theme?.themeData);
  const { theme } = props;
  const local = useSelector((state) => state.local);

  // get device from store conference
  const devices = useSelector((state) => state.conference.devices);
  //progressbar
  const [progress, setProgress] = React.useState(0);

  const [toggleState, setToggleState] = useState(props.openView);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const [shareUrl, setshareUrl] = useState("");

  const [videos, setVideos] = useState([]);

  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  //shimmer
  let [loading, setLoading] = useState(false);
  let [loaderfilename, setLoaderfilename] = useState();
  let [loaderfilesize, setLoaderfilesize] = useState();
  let [loaderfileduration, setLoaderfileduration] = useState();

  let [videoUploaded, setVideoUploaded] = useState(false);

  let [imageUploaded, setImageUploaded] = useState(false);

  const outlinedInputClasses = useOutlinedInputStyles();

  React.useEffect(() => {
    setToggleState(props.openView);
  }, [props.openView]);

  React.useEffect(() => {
    AxiosLocal.get("files/video").then((response) => {
      setVideos(response.data.data);
    });
  }, [videoUploaded]);

  React.useEffect(() => {
    AxiosLocal.get("files/image").then((response) => {
      setImages(response.data.data);
    });
  }, [imageUploaded]);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex, "FileUpload");

    // setImages(imageList);
  };

  const [videoSrc, seVideoSrc] = useState("");

  const getVideoDuration = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const media = new Audio(reader.result);
        media.onloadedmetadata = () => resolve(media.duration);
      };
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
    });
  //   onSubmit = fields => { const { title, body, image } = fields; var formData = new FormData(); formData. append(‘title’, title); formData. append(‘body’, body); formData
  const changeHandler = async (event) => {
    // setSelectedFile(event.target.files[0]);
    var file_type = event.target.files[0].type.split("/")[0];

    setLoading(true);

    let val = event.target.files[0].size / 1000000;
    let file_size = parseFloat(Number(val).toFixed(1));

    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("file_name", event.target.files[0].name);
    formData.append("file_size", file_size);
    setLoaderfilename(event.target.files[0].name);
    setLoaderfilesize(file_size);

    if (file_type == "video") {
      // const duration = await getVideoDuration(event.target.files[0]);
      // create a URL from the file object
      const url = URL.createObjectURL(event.target.files[0]);
      // create a hidden video element
      const video = document.createElement("video");
      // set the file object URL as the src of the video element
      video.src = url;
      // get video/audio duration when it's available
      let video_duration = "";
      video.addEventListener("loadedmetadata", () => {
        video_duration = video.duration.toFixed(2).toString().split(".")[0];
        setLoaderfileduration(video_duration);
      });
      formData.append("duration", video_duration);
    }

    var config = {
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setTimeout(function () {
          setProgress(percentCompleted);
        }, 3000);
      },
      headers: { "content-type": "multipart/form-data" },
    };
    AxiosLocal.post("file/upload/", formData, config).then((response) => {
      //todo loader stop @Lakshmi
      setLoading(false);

      //success toast
      handleClick();

      setVideos([]);

      setTimeout(setVideoUploaded(!videoUploaded), 3000);
      setTimeout(setImageUploaded(!imageUploaded), 3000);
    });
  };

  const trimFileNme = (name) => {
    var file_name = name;
    var arr_filename = file_name.split(".");
    var file_ex = arr_filename[arr_filename.length - 1];
    if (file_name.length > 10) {
      file_name = file_name.substr(0, 5) + "..." + file_name.substr(-5);
    }
    return file_name;
  };

  //active element

  const [active, setActive] = useState(null);
  // function activeItems(element){

  //   if(active.includes(element)){
  //     let filteredArr = active.filter(item => item != element)
  //     setActive(filteredArr)
  //     console.log("removed");
  //   }else{
  //     setActive([...active, element])
  //   }
  // }
  // console.log(active,"activeactiveactive");

  // checkbox for deletion
  const [moreGrid, setMoreGrid] = useState(-1);
  const [checked, setChecked] = useState({});
  const selectedItem = Object.values(checked).filter(Boolean).length;

  const selectedArr = Object.keys(checked).filter((key) => checked[key]);

  const selectedArrForDelete = selectedArr.map(Number);
  const [allcheck, setAllcheck] = useState(null);

  const handleChecked = (id) => (e) => {
    const { checked } = e.target;
    setChecked((values) => ({
      ...values,
      [id]: checked,
    }));
  };
  const checkall = () => {
    if (selectedItem > 0) {
      setAllcheck("checked");
    } else {
      setAllcheck(null);
    }
  };
  useEffect(() => {
    checkall();
  }, [handleChecked]);

  //toast

  const [state, setState] = React.useState({
    openCopyToast: false,
    vertical: "bottom",
    horizontal: "right",
  });

  const { vertical, horizontal, openCopyToast } = state;

  const handleClick = () => {
    setState({ ...state, openCopyToast: true });
  };

  const handleClose = () => {
    setState({ ...state, openCopyToast: false });
  };

  const handleDelete = () => {
    //todo are you sure popup only after click yes hit the api @Lakshmi
    AxiosLocal.delete("files/", {
      data: { media_ids: selectedArrForDelete },
    }).then((response) => {
      setChecked({});
      setVideos([]);
      setTimeout(setVideoUploaded(!videoUploaded), 3000);
      setTimeout(setImageUploaded(!imageUploaded), 3000);
    });
  };

  //search
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      if (window.eventChanel) {
        window.eventChanel.on("publication", (ctx) => {
          eventChannelEvents(ctx);
        });
      }
    } catch {
      // console.log("Error");
    }

    // return () => {

    //   if (window.eventChanel) {
    //     window.eventChanel.removeAllListeners("publication");
    //   }
    //   // window.eventChanel?.unsubscribe();
    // };
  }, []);

  return (
    <>
      <SkeletonTheme baseColor="#012243" highlightColor="#002E56">
        <div
          className="filemanager-popup"
          style={{
            backgroundColor: theme?.bg_color_2
              ? changeOpacity(theme?.bg_color_2, 0.6)
              : changeOpacity(theme?.waiting?.primaryColor, 0.6),
            top: 60,
          }}
        >
          <div
            style={{
              backgroundColor: theme?.bg_color_0
                ? theme?.bg_color_0
                : theme?.shareVideo.primaryColor,
            }}
            className="container"
          >
            <Typography
              variant="h5"
              style={{
                color: theme?.shareVideo.quinaryColor,
                fontWeight: "700",
                textAlign: "center",
                padding: "23px 0px",
                fontFamily: "URW DIN",
              }}
            >
              Share Video
            </Typography>
            <div
              style={{
                display: "flex",
                backgroundColor: theme?.bg_color_1
                  ? theme?.bg_color_1
                  : theme?.waiting?.primaryColor,
                justifyContent: "space-evenly",
              }}
            >
              <Button
                sx={{
                  color: "#88A1AB",
                  display: "block",
                  textTransform: "none",
                  fontSize: "14px",
                  padding: "10px 150px",
                  borderRadius: "0px",
                }}
                className={toggleState === 1 ? "active" : ""}
                onClick={() => toggleTab(1)}
              >
                File
              </Button>

              <Button
                sx={{
                  color: "#88A1AB",
                  display: "block",
                  textTransform: "none",
                  fontSize: "14px",
                  padding: "10px 150px !important",
                  backgroundColor: "transparent",
                  borderRadius: "0px",
                }}
                className={toggleState === 2 ? "active" : ""}
                onClick={() => toggleTab(2)}
              >
                Youtube/vimeo
              </Button>

              {/* <Button sx={{ color: '#88A1AB', display: 'block' , textTransform: 'none', fontSize: '14px', padding: '10px 150px !important', backgroundColor: 'transparent',borderRadius: '0px' }}
        className={toggleState === 3 ? 'active' : ''} onClick={() => toggleTab(3)}
        >
    Devices
        </Button> */}

              {/* <Button sx={{ color: '#88A1AB', display: 'block' , textTransform: 'none', fontSize: '14px', padding: '10px 155px !important', backgroundColor: 'transparent',borderRadius: '0px' }}
        className={toggleState === 3 ? 'active' : ''} onClick={() => toggleTab(3)}
        >
        Screens
        </Button> */}
            </div>
            {/* <Divider variant="fullWidth" style={{borderColor: '#002E56'}}/> */}
            {/* section1 */}
            <div
              className={
                toggleState === 1 ? "content active-content" : "content"
              }
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "25px 43px 0px",
                }}
              >
                <Typography
                  variant="h5"
                  style={{
                    color: theme?.shareVideo.quinaryColor,
                    fontWeight: "700",
                    padding: "23px 0px",
                    fontFamily: "URW DIN",
                    fontSize: "22px",
                  }}
                >
                  Select Video
                </Typography>
                <div style={{ display: "flex" }}>
                  {/* upload button */}
                  <Button
                    style={{
                      textTransform: "none",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "4px",
                      border: "2px solid",
                      borderColor: theme?.bg_color_1
                        ? theme?.bg_color_1
                        : theme?.shareVideo.tertiaryColor,
                      padding: "0px 16px",
                      fontSize: "12px",
                      fontWeight: "300",
                      lineHeight: "22px",
                      backgroundColor: theme?.bg_color_1
                        ? theme?.bg_color_1
                        : theme?.shareVideo.tertiaryColor,
                      margin: "20px 10px 0px 43px",
                      color: "#88A1AB",
                      height: "43px",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <img alt="" src="/assets/icons/upload-icon.svg" />
                    <span style={{ marginLeft: "9px", cursor: "pointer" }}>
                      Upload File
                    </span>
                    <input
                      accept="video/*"
                      multiple
                      onChange={(event) => {
                        changeHandler(event);
                      }}
                      type="file"
                      style={{
                        height: "100%",
                        zIndex: 2,
                        position: "absolute",
                        width: "100%",
                        opacity: 0,
                        cursor: "pointer",
                      }}
                    />
                  </Button>
                  {/* Delete button */}
                  <Button
                    onClick={handleDelete}
                    variant="contained"
                    style={{
                      textTransform: "none",
                      padding: "10px 29px",
                      fontSize: "12px",
                      fontWeight: "300",
                      lineHeight: "22px",
                      backgroundColor: theme?.bg_color_1
                        ? theme?.bg_color_1
                        : "#032E57",
                      margin: "20px 10px 0px 0px",
                      color: "#88A1AB",
                      height: "44px",
                    }}
                  >
                    <img alt="" src="/assets/icons/delete-icon.svg" />
                    <span style={{ marginLeft: "12px" }}>
                      Delete ({selectedItem})
                    </span>
                  </Button>
                  {/* <Paper
                    component="form"
                    sx={{
                      p: "2px 2px",
                      display: "flex",
                      alignItems: "center",
                      width: 433,
                      marginRight: "10px",
                      height: "36px",
                      boxShadow: "none",
                      backgroundColor: theme?.bg_color_1? theme?.bg_color_1: theme?.shareVideo.tertiaryColor,
                      border: "2px solid",
                      borderColor: theme?.bg_color_1? theme?.bg_color_1: theme?.shareVideo.borderColor,
                      fontFamily: "URW DIN REGULAR",
                      fontWeight: 400,
                      marginTop: "20px",
                    }}
                    onChange={(event) => setSearch(event.target.value)}
                  >
                    <IconButton
                      type="submit"
                      sx={{ p: "10px" }}
                      aria-label="search"
                      style={{ color: "#88A1AB" }}
                    >
                      <SearchIcon />
                    </IconButton>
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search File to Share"
                      inputProps={{ "aria-label": "Search File to Share" }}
                      style={{ fontSize: "12px", color: "rgb(245 245 245)" }}
                    />
                    {search ? (
                      <CloseIcon
                        style={{
                          color: theme?.shareVideo.primaryColor,
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                      />
                    ) : null}
                  </Paper> */}
                  {/* <div style={{margin: '20px 12px 0px 12px', padding: '5px 26px', backgroundColor: '#032E57', borderRadius: '4px'}} >
                <img src='/assets/icons/icon1.svg' style={{marginTop:'6px'}} />
              </div> */}
                  {/* <div style={{ marginTop: "20px" }}>
                    <SortByFileManager theme={theme} />
                  </div> */}
                  {/* </div> */}
                </div>
                {/* <div style={{margin:'31px 25px 0px 59px'}}>
                <img src='/assets/icons/grid-symbol.svg' />
              </div>
              <div style={{margin:'31px 0px 0px 0px'}}>
                <img src='/assets/icons/list-symbol.svg' />
              </div> */}
              </div>
              <Scrollbars style={{ width: "100%", height: "57vh" }}>
                <Grid
                  container
                  spacing={"21px"}
                  style={{ padding: "25px 43px" }}
                >
                  {/* shimmer */}

                  {loading ? (
                    <Grid item xs={12} sm={4} md={3} lg={3}>
                      <Card
                        sx={{ maxWidth: 250, height: 250 }}
                        style={{
                          backgroundColor: theme?.bg_color_1
                            ? theme?.bg_color_1
                            : theme?.shareVideo.videoIconBgcolor,
                          transition: "all 0.1s ease",
                          boxShadow: "none",
                          position: "relative",
                        }}
                        className="filemanager-grid"
                      >
                        <CardActionArea>
                          <Skeleton height="179px" width="250px" />
                          {/* <div  style={
                        {
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
                           
                        }
                    }>
                    <img src='/assets/icons/x.svg' />

      </div> */}

                          <p
                            style={{
                              position: "absolute",
                              top: "33%",
                              right: "50%",
                              transform: "translate(50%,-50%)",
                              zIndex: 6,
                              fontSize: "14px",
                              color: "rgb(136, 161, 171)",
                              fontFamily: "URW DIN REGULAR",
                            }}
                          >
                            Uploading...
                          </p>

                          <CardContent
                            style={{
                              margin: "0px",
                              padding: "0px",
                              display: "flex",
                            }}
                          >
                            {/* <img src='/assets/icons/filemanager-icon.svg' style={{backgroundColor: theme?.shareVideo.videoIconBgcolor, padding: '26px 11px'}}/> */}
                            <div
                              style={{
                                padding: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {/* circular loader */}
                              <Box
                                sx={{
                                  position: "relative",
                                  display: "inline-flex",
                                }}
                              >
                                <CircularProgress
                                  variant="determinate"
                                  value={progress}
                                />
                                <Box
                                  sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: "absolute",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    component="div"
                                    color="text.secondary"
                                    style={{
                                      fontSize: "12px",
                                      color: "rgb(136, 161, 171)",
                                      fontFamily: "URW DIN REGULAR",
                                    }}
                                  >
                                    {`${Math.round(progress)}%`}
                                  </Typography>
                                </Box>
                              </Box>
                            </div>
                            <div
                              style={{
                                padding: "15px 10px",
                                backgroundColor: theme?.bg_color_1
                                  ? theme?.bg_color_1
                                  : theme?.shareVideo.cardBgcolor,
                                width: "200px",
                              }}
                            >
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                style={{
                                  color: "#88A1AB",
                                  fontSize: "14px",
                                  whiteSpace: "nowrap",
                                  marginRight: "19px",
                                }}
                              >
                                {/* <Skeleton /> */}
                                {trimFileNme(loaderfilename)}
                              </Typography>
                              <Typography
                                variant="body2"
                                style={{
                                  fontFamily: "URW DIN REGULAR",
                                  fontWeight: 400,
                                  color: theme?.shareVideo.dateTextColor,
                                }}
                              >
                                {/* <Skeleton /> */}
                                Size:{loaderfilesize} MB | 00:00:
                                {loaderfileduration}
                                {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
                              </Typography>
                            </div>
                          </CardContent>
                        </CardActionArea>
                        {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions> */}
                      </Card>
                    </Grid>
                  ) : (
                    <></>
                  )}
                  {videos.map((item, index) => (
                    <Grid item xs={12} sm={4} md={3} lg={3}>
                      <Card
                        sx={{ maxWidth: 250, height: 250 }}
                        style={{
                          backgroundColor: theme?.bg_color_1
                            ? theme?.bg_color_1
                            : "#012243",
                          transition: "all 0.1s ease",
                          position: "relative",
                        }}
                        onClick={() => {
                          setActive(item);
                          if (shareUrl === item.file_url) {
                            setshareUrl("");
                            setActive(null);
                          } else {
                            setshareUrl(item.file_url);
                          }
                        }}
                        className={`filemanager-grid ${
                          active == item && "active"
                        }`}
                        onMouseEnter={() => setMoreGrid(item.id)}
                        onMouseLeave={() => setMoreGrid(-1)}
                      >
                        <Checkbox
                          checked={checked[item.id]}
                          onClick={handleChecked(item.id)}
                          {...label}
                          sx={{
                            color: "#143F63",

                            "& .MuiSvgIcon-root": { fontSize: 25 },
                            "&.Mui-checked": {
                              color: theme?.common?.color1,
                            },
                          }}
                          style={{
                            position: "absolute",
                            zIndex: 9,
                            top: "5px",
                            left: "0px",
                            opacity:
                              moreGrid === item.id || checked[item.id]
                                ? 1
                                : allcheck
                                ? 1
                                : 0,
                          }}
                        />

                        <CardActionArea>
                          {/* <CardMedia component="video" height="179" image={item.file_url} autoplay loop /> */}
                          <video
                            id={item.id}
                            muted
                            width="100%"
                            height="179"
                            onMouseOver={(event) => event.target.play()}
                            onMouseOut={(event) => event.target.pause()}
                          >
                            <source src={item.file_url} type="video/mp4" />
                          </video>
                          <CardContent
                            style={{
                              margin: "0px",
                              padding: "0px",
                              display: "flex",
                              backgroundColor: theme?.bg_color_2
                                ? theme?.bg_color_2
                                : "#012243",
                            }}
                          >
                            <img
                              alt=""
                              src="/assets/icons/filemanager-icon.svg"
                              style={{
                                backgroundColor: theme?.bg_color_1
                                  ? theme?.bg_color_1
                                  : "#012243",
                                padding: "26px 11px",
                              }}
                            />
                            <div
                              style={{
                                padding: "15px 10px",
                                backgroundColor: theme?.bg_color_2
                                  ? theme?.bg_color_2
                                  : "#012A50",
                                width: "200px",
                              }}
                            >
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                style={{
                                  color: "#88A1AB",
                                  fontSize: "14px",
                                  whiteSpace: "nowrap",
                                  marginRight: "19px",
                                }}
                              >
                                {trimFileNme(item.file_name_original)}
                              </Typography>
                              <Typography
                                variant="body2"
                                color={
                                  theme?.font_color_2
                                    ? theme?.font_color_2
                                    : "#375C78"
                                }
                              >
                                Size:{item.file_size} MB | 00:00:
                                {item.video_duration}
                              </Typography>
                            </div>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Scrollbars>
            </div>

            {/* section2 */}
            <div
              style={{ height: "555px", position: "relative" }}
              className={
                toggleState === 2 ? "content active-content" : "content"
              }
            >
              <Box
                sx={{
                  width: "750px",
                  height: "240px",
                  backgroundColor: theme?.bg_color_2
                    ? theme?.bg_color_2
                    : "#012243",
                  position: "absolute",
                  top: "50%",
                  right: "50%",
                  transform: "translate(50%,-50%)",
                  borderRadius: "4px",
                }}
              >
                {/* <TextField
        label="Standard warning"
        variant="standard"
        // color="rgb(136, 161, 171)"
        focused
        style={{width:'100%',color:'rgb(136, 161, 171)'}}
      /> */}
                <Typography
                  variant="h5"
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    padding: "50px 0px",
                    fontSize: "20px",
                    fontFamily: "URW DIN REGULAR",
                  }}
                >
                  Share Youtube/Vimeo Video
                </Typography>
                {/* <Input style={{ color:'rgb(136, 161, 171)', width:'70%'}}  placeholder='Place your link here' /> */}
                <OutlinedInput
                  id="standard-name"
                  sx={{
                    color: "rgb(136, 161, 171)",
                    height: "44px",
                    borderWidth: "2px",
                    fontFamily: "URW DIN REGULAR",
                    width: "90%",
                  }}
                  type="text"
                  name="first-name"
                  classes={outlinedInputClasses}
                  value={shareUrl}
                  onChange={(e) => setshareUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=BV8Lm3yl2ng"
                />
              </Box>
            </div>

            <div
              style={{ height: "555px", position: "relative" }}
              className={
                toggleState === 3 ? "content active-content" : "content"
              }
            >
              <Box
                sx={{
                  width: "750px",
                  height: "240px",
                  backgroundColor: "#012243",
                  position: "absolute",
                  top: "50%",
                  right: "50%",
                  transform: "translate(50%,-50%)",
                  borderRadius: "4px",
                }}
              >
                {/* <TextField
        label="Standard warning"
        variant="standard"
        // color="rgb(136, 161, 171)"
        focused
        style={{width:'100%',color:'rgb(136, 161, 171)'}}
      /> */}
                <Typography
                  variant="h5"
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    padding: "50px 0px",
                    fontSize: "20px",
                    fontFamily: "URW DIN REGULAR",
                  }}
                >
                  Share Device
                </Typography>
                {/* <Input style={{ color:'rgb(136, 161, 171)', width:'70%'}}  placeholder='Place your link here' /> */}
                <OutlinedInput
                  id="standard-name"
                  sx={{
                    color: "rgb(136, 161, 171)",
                    height: "44px",
                    borderWidth: "2px",
                    fontFamily: "URW DIN REGULAR",
                    width: "90%",
                  }}
                  type="text"
                  name="first-name"
                  classes={outlinedInputClasses}
                  value={shareUrl}
                  onChange={(e) => setshareUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=BV8Lm3yl2ng"
                />
              </Box>
            </div>

            <Divider variant="fullWidth" style={{ borderColor: "#002E56" }} />

            <div style={{ textAlign: "center", margin: "18px 0px" }}>
              <Button
                onClick={() => {
                  let file_name_original = "";
                  if (active === null) {
                  } else {
                    file_name_original = active.file_name_original;
                  }
                  let video = {
                    event: "addDevice",
                    name: "Video",
                    url: shareUrl,
                    user_id: window.room?.myUserId(),
                    id: uuidv4(),
                    type: "video",
                    file_name: file_name_original,
                    director_mode: conference.directorMode.mode,
                  };
                  console.log(video, "videoAddDevice");
                  window.eventChanel?.publish(video);

                  window.eventChanel?.publish({
                    event: "videoPlayPause",
                    videoStatus: { id: video.id, play: true },
                  });

                  // dispatch(setStreamType(STREAM_TYPES.SHARING))
                  // dispatch(setShareUrl(shareUrl))
                  // window.room.sendCommandOnce('Share', {value:JSON.stringify({shareUrl,userId:local.userId})});
                  let newDevices = [...devices, video];
                  updateRoomConfig({ devices: newDevices });
                  props.closeShareHandler();
                  // if (conference.directorMode.mode) {
                  dispatch(
                    setCenterStageDevice({
                      layout_change: true,
                      enabled: true,
                      url: shareUrl,
                      id: video.id,
                    })
                  );
                  dispatch(setcurrentActiveUserId(video.id));

                  // }
                }}
                variant="contained"
                disabled={shareUrl == ""}
                style={{
                  textTransform: "none",
                  padding: "9px 59px",
                  fontSize: "14px",
                  lineHeight: "22px",
                  backgroundColor: theme?.bg_color_1
                    ? theme?.bg_color_1
                    : "#008BCD",
                  marginRight: "21px",
                  color: theme?.font_color_1 ? theme?.font_color_1 : "#fff",
                }}
              >
                {toggleState == 1 ? "Select" : "Share"}
              </Button>

              {/* <Button onClick={()=>{
  if(toggleState==2||toggleState==3){
    console.log(shareUrl,"shareUrl");
    dispatch(setStreamType(STREAM_TYPES.SHARING))
    dispatch(setShareUrl(shareUrl))
    window.room.sendCommandOnce('Share', {value:JSON.stringify({shareUrl,userId:local.userId,type:toggleState})});

    props.closeShareHandler()
  }
}} variant="contained"
style={{textTransform: 'none',
padding: '9px 59px',
fontSize: '14px',
lineHeight: '22px', backgroundColor: '#008BCD', marginRight: '21px'}}>Share</Button> */}

              <Button
                variant="contained"
                style={{
                  textTransform: "none",
                  padding: "8px 47px",
                  fontSize: "14px",
                  lineHeight: "22px",
                  backgroundColor: theme?.bg_color_1
                    ? theme?.bg_color_1
                    : "#011934",
                  border: "1px solid #375C78",
                }}
                onClick={() => {
                  props.closeShareHandler();
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
        <Snackbar
          autoHideDuration={3000}
          anchorOrigin={{ vertical, horizontal }}
          open={openCopyToast}
          key={vertical + horizontal}
          bodyStyle={{ height: 30, flexGrow: 0 }}
          onClose={() => handleClose()}
        >
          <div
            style={{
              backgroundColor: "#008BCD",
              borderRadius: "4px",
              display: "flex",
            }}
            onClick={handleClose}
          >
            <div
              style={{
                width: "55px",
                height: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderTopLeftRadius: "4px",
                borderBottomLeftRadius: "4px",
              }}
            >
              <img
                src="/assets/icons/filemanager-icon.svg"
                alt=""
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <p
              style={{
                fontFamily: "URW DIN REGULAR",
                color: "white",
                fontSize: "16px",
              }}
            >
              Your video is successfully uploaded
            </p>
            <img
              src="/assets/admin/tick.svg"
              style={{ padding: "0px 16px" }}
              alt=""
            />
          </div>
        </Snackbar>
      </SkeletonTheme>
    </>
  );
}

export default FileManager;
