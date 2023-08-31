import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Divider,
  CardActionArea,
  OutlinedInput,
  Snackbar,
  Checkbox,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  setStreamType,
  STREAM_TYPES,
  setShareUrl,
} from "../../state/local/localSlice";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import SortByFileManager from "../../sections/SortByFileManager";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmPop from "./ConfirmPop";
import { trimFileNme } from "../../utilities/common";
import MediaFileManagerLoader from "./MediaFileManagerLoader";
import FileType from "./file_manager/FileType";
import FileTypeButton from "./file_manager/FileType";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

// const video = [
//   {
//     id: 4,
//     file_url: "/assets/videos/snow.mp4",
//     file_name_original: "snow",
//     file_size: 13,
//   },
//   {
//     id: 5,
//     file_url: "/assets/videos/snow.mp4",
//     file_name_original: "nature",
//     file_size: 10,
//   },
//   {
//     id: 6,
//     file_url: "/assets/videos/snow.mp4",
//     file_name_original: "Forest",
//     file_size: 5,
//   },
// ];

// const images = [
//   {
//     image: "/assets/images/masked_singer.svg",
//   },
//   {
//     image: "/assets/images/filemanger1.svg",
//   },
//   {
//     image: "/assets/images/filemanager2.svg",
//   },
//   {
//     image: "/assets/images/filemanger3.svg",
//   },
//   {
//     image: "/assets/images/filemanger4.svg",
//   },
//   {
//     image: "/assets/images/filemanger5.svg",
//   },
//   {
//     image: "/assets/images/filemanger6.svg",
//   },
//   {
//     image: "/assets/images/filemanger7.svg",
//   },
//   {
//     image: "/assets/images/masked_singer.svg",
//   },
//   {
//     image: "/assets/images/filemanger1.svg",
//   },
// ];

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

function MediaFileManager(props) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.themeData);
  const local = useSelector((state) => state.local);
  const [progress, setProgress] = React.useState(0);
  const [toggleState, setToggleState] = useState(1);
  const [tab, setTab] = useState("all files");
  const [shareUrl, setshareUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [active, setActive] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [moreGrid, setMoreGrid] = useState(-1);
  const [checked, setChecked] = useState({});
  const [allcheck, setAllcheck] = useState(null);
  let [loading, setLoading] = useState(false);
  let [loaderfilename, setLoaderfilename] = useState();
  let [loaderfilesize, setLoaderfilesize] = useState();
  let [loaderfileduration, setLoaderfileduration] = useState();
  let [videoUploaded, setVideoUploaded] = useState(false);
  let [imageUploaded, setImageUploaded] = useState(false);
  const [filesCount, setfilesCount] = useState();

  // drag and drop
  const [files, setFiles] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };
  console.log(files?.length, "files");

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const outlinedInputClasses = useOutlinedInputStyles();

  React.useEffect(() => {
    getVideos();
  }, [videoUploaded]);

  const getImages = () => {
    AxiosLocal.get("files/image").then((response) => {
      setImages(response.data.data);
    });
  };

  const getVideos = () => {
    AxiosLocal.get("files/video").then((response) => {
      setVideos(response.data.data);
    });
  };

  React.useEffect(() => {
    getImages();
  }, [imageUploaded]);

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

  const changeHandler = async (event) => {
    console.log(event.target.files, "mediaFiles");
    // setSelectedFile(event.target.files[0]);
    setfilesCount(Object.keys(event.target.files).length);
    for (const [key, value] of Object.entries(event.target.files)) {
      try {
        console.log(event.target.files[key], value, "MediaUploadFiles");
        let element = event.target.files[key];
        var file_type = element.type.split("/")[0];
        console.log(file_type, "UploadedFileExtension");
        setLoading(true);
        let val = element.size / 1000000;
        let file_size = parseFloat(Number(val).toFixed(1));

        let formData = new FormData();
        formData.append("file", element);
        formData.append("file_name", element.name);
        formData.append("file_size", file_size);
        setLoaderfilename(element.name);
        setLoaderfilesize(file_size);

        if (file_type == "video") {
          const duration = await getVideoDuration(element);
          let video_duration = duration.toString().split(".")[0];
          formData.append("duration", video_duration);
          setLoaderfileduration(video_duration);
        }

        var config = {
          onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setTimeout(function () {
              setProgress(percentCompleted);
              console.log(
                progressEvent.loaded,
                percentCompleted,
                "percentCompleted"
              );
            }, 3000);
          },
          headers: { "content-type": "multipart/form-data" },
        };
        AxiosLocal.post("file/upload/", formData, config).then((response) => {
          handleClick();
          // setImages([]);
          // setVideos([]);
          // setTimeout(setVideoUploaded(!videoUploaded), 3000);
          // setTimeout(setImageUploaded(!imageUploaded), 3000);
          getImages();
          getVideos();
          setLoading(false);
        });
      } catch (error) {
        console.log("Media upload error", error);
      }
    }
  };

  const selectedItem = Object.values(checked).filter(Boolean).length;

  const selectedArr = Object.keys(checked).filter((key) => checked[key]);

  const selectedArrForDelete = selectedArr.map(Number);

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
    AxiosLocal.delete("files/", {
      data: { media_ids: selectedArrForDelete },
    }).then((response) => {
      console.log(response.data);
      setChecked({});
      if (props.fileManagerType == "video") {
        getVideos();
      } else if (props.fileManagerType == "image") {
        getImages();
      } else if (props.fileManagerType == "all") {
        getVideos();
        getImages();
      }
      // setVideos([]);
      // setTimeout(setVideoUploaded(!videoUploaded), 3000);
      // setTimeout(setImageUploaded(!imageUploaded), 3000);
    });
  };

  //search
  const [search, setSearch] = useState("");

  //confirm popup

  const [confirm, setConfirm] = useState(false);

  const handleClickOpen = () => {
    setConfirm(true);
  };

  const handleClickClose = () => {
    setConfirm(false);
    setChecked({});
  };

  if (props.fileManagerType == "video") {
    console.log("videovideo");
    return (
      <>
        <>
          <SkeletonTheme baseColor="#012243" highlightColor="#002E56">
            <div
              style={{
                alignItems: "center",
                background: theme?.waiting?.primaryColor,
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
              className="filemanager-popup"
            >
              <div
                style={{
                  backgroundColor: theme?.shareVideo?.primaryColor,
                  position: "relative",
                }}
                className="container"
              >
                <div
                  style={{
                    position: "absolute",
                    display: "flex",
                    width: "20px",
                    height: "20px",
                    top: "-10px",
                    right: "-10px",
                    backgroundColor: "#88A1ABx  ",
                    borderRadius: "25px",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={props.closeShareHandler}
                >
                  <img alt="" src="/assets/icons/x.svg" />
                </div>
                {/* <Typography variant="h5" style={{color: theme?.shareVideo?.quinaryColor,fontWeight: '700', textAlign: 'center',padding: '23px 0px',fontFamily: 'URW DIN'}} >
            Select Video
          </Typography> */}
                {/* <div style={{display: 'flex', backgroundColor: theme?.waiting?.primaryColor, justifyContent: 'space-evenly'}}>
            <Button sx={{ color: '#88A1AB', display: 'block' , textTransform: 'none', fontSize: '14px', padding: '10px 155px',borderRadius: '0px' }} className={toggleState === 1 ? 'active' : ''} onClick={() => toggleTab(1)}>
              Files
            </Button>
          </div> */}
                {/* section1 */}
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
                      color: theme?.shareVideo?.quinaryColor,
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
                        borderColor: theme?.editspace?.outerbgcolor,
                        padding: "0px 16px",
                        fontSize: "12px",
                        fontWeight: "300",
                        lineHeight: "22px",
                        backgroundColor: theme?.shareVideo?.tertiaryColor,
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
                    {/* onClick={handleDelete} */}
                    <Button
                      onClick={handleClickOpen}
                      variant="contained"
                      style={{
                        textTransform: "none",
                        padding: "10px 29px",
                        fontSize: "12px",
                        fontWeight: "300",
                        lineHeight: "22px",
                        backgroundColor: theme?.shareVideo?.tertiaryColor,
                        margin: "20px 10px 0px 0px",
                        color: "#88A1AB",
                        height: "44px",
                      }}
                    >
                      <img src="/assets/icons/delete-icon.svg" />
                      <span style={{ marginLeft: "12px" }}>
                        Delete ({selectedItem})
                      </span>
                    </Button>
                    {/* search */}
                    <Paper
                      component="form"
                      sx={{
                        p: "2px 2px",
                        display: "flex",
                        alignItems: "center",
                        width: 433,
                        marginRight: "10px",
                        height: "36px",
                        boxShadow: "none",
                        backgroundColor: theme?.shareVideo?.tertiaryColor,
                        border: "2px solid",
                        borderColor: theme?.shareVideo?.borderColor,
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
                        style={{
                          fontSize: "12px",
                          color: theme?.darkfontcolor?.fontcolor,
                        }}
                      />
                      {search ? (
                        <CloseIcon
                          style={{
                            color: theme?.shareVideo?.primaryColor,
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                        />
                      ) : null}
                    </Paper>
                    {/* search */}

                    {/* <div style={{margin: '20px 12px 0px 12px', padding: '5px 26px', backgroundColor: '#032E57', borderRadius: '4px'}} >
                <img src='/assets/icons/icon1.svg' style={{marginTop:'6px'}} />
              </div> */}
                    <div style={{ marginTop: "20px" }}>
                      <SortByFileManager />
                    </div>
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
                      [...Array(filesCount)].map((e, i) => (
                        <MediaFileManagerLoader
                          progress={progress}
                          loaderfilename={loaderfilename}
                          loaderfilesize={loaderfilesize}
                          loaderfileduration={loaderfileduration}
                          count={filesCount}
                        />
                      ))
                    ) : (
                      <></>
                    )}
                    {videos.map((item, index) => (
                      <Grid item xs={12} sm={4} md={3} lg={3}>
                        <Card
                          sx={{ maxWidth: 250, height: 250 }}
                          style={{
                            backgroundColor:
                              theme?.selectimage?.imagebackground,
                            transition: "all 0.1s ease",
                            position: "relative",
                          }}
                          onClick={() => setActiveVideo(item)}
                          className={`filemanager-grid ${activeVideo?.id == item.id && "active"
                            }`}
                          onMouseEnter={() => setMoreGrid(item.id)}
                          onMouseLeave={() => setMoreGrid(-1)}
                        >
                          <Checkbox
                            checked={checked[item.id]}
                            onClick={handleChecked(item.id)}
                            {...label}
                            sx={{
                              color: theme?.selectimage?.dropdawnbackground,

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
                            <video
                              id={item.id}
                              width="100%"
                              height="179"
                              muted
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
                              }}
                            >
                              <img
                                alt=""
                                src="/assets/icons/filemanager-icon.svg"
                                style={{
                                  backgroundColor:
                                    theme?.addmember?.checkboxcolor3,
                                  padding: "26px 11px",
                                }}
                              />
                              <div
                                style={{
                                  padding: "15px 10px",
                                  backgroundColor:
                                    theme?.addmember?.checkboxcolor4,
                                  width: "200px",
                                }}
                              >
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                  style={{
                                    color: "white",
                                    fontSize: "14px",
                                    whiteSpace: "nowrap",
                                    marginRight: "19px",
                                  }}
                                >
                                  {trimFileNme(item.file_name_original)}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  style={{
                                    color: theme?.addmember?.checkboxcolor5,
                                  }}
                                >
                                  ize:{item.file_size} MB | 00:00:
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

                {/* section2 */}
                <div
                  style={{ height: "550px", position: "relative" }}
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

                {/* section3 */}
                <Divider
                  variant="fullWidth"
                  style={{ borderColor: theme?.addSpace?.dividercolor }}
                />
                <div style={{ textAlign: "center", margin: "18px 0px" }}>
                  <Button
                    onClick={() => {
                      console.log(activeVideo, "hhhhhh");
                      props.setFile(activeVideo.file_url);
                      props.setFormValues({
                        ...props.formValues,
                        lobby_video: activeVideo.file_url,
                      });
                      props.closeShareHandler();
                    }}
                    variant="contained"
                    style={{
                      textTransform: "none",
                      padding: "9px 59px",
                      fontSize: "14px",
                      lineHeight: "22px",
                      backgroundColor: theme?.login?.mainColor,
                      marginRight: "21px",
                    }}
                  >
                    Select
                  </Button>
                  {/* } */}

                  <Button
                    variant="contained"
                    style={{
                      textTransform: "none",
                      padding: "8px 47px",
                      fontSize: "14px",
                      lineHeight: "22px",
                      backgroundColor: theme?.addmember?.checkboxcolor2,
                      border: "2px solid",
                      borderColor: theme?.addSpace?.dividercolor,
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
          </SkeletonTheme>
          <ConfirmPop
            message="Are you sure you want to delete?"
            confirm={confirm}
            handleClickOpen={handleClickOpen}
            handleClickClose={handleClickClose}
            handleDelete={handleDelete}
          />

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
        </>
      </>
    );
  } else if (props.fileManagerType == "image") {
    console.log("imageimage");

    return (
      <>
        <SkeletonTheme baseColor="#012243" highlightColor="#002E56">
          <div
            style={{
              alignItems: "center",
              background: theme?.waiting?.primaryColor,
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
            className="filemanager-popup"
          >
            <div
              style={{
                backgroundColor: theme?.shareVideo?.primaryColor,
                position: "relative",
              }}
              className="container"
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
                onClick={props.closeShareHandlerImage}
              >
                <img alt="" src="/assets/icons/x.svg" />
              </div>
              {/* section1 */}
              <div>
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
                      color: theme?.shareVideo?.quinaryColor,
                      fontWeight: "700",
                      padding: "23px 0px",
                      fontFamily: "URW DIN",
                      fontSize: "22px",
                    }}
                  >
                    Select Image
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
                        borderColor: theme?.selectimage?.backgroundcolor1,
                        padding: "0px 16px",
                        fontSize: "12px",
                        fontWeight: "300",
                        lineHeight: "22px",
                        backgroundColor: theme?.shareVideo?.tertiaryColor,
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
                        accept="image/*"
                        onChange={(event) => {
                          changeHandler(event);
                        }}
                        type="file"
                        multiple
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
                      onClick={handleClickOpen}
                      variant="contained"
                      style={{
                        textTransform: "none",
                        padding: "10px 29px",
                        fontSize: "12px",
                        fontWeight: "300",
                        lineHeight: "22px",
                        backgroundColor: theme?.selectimage?.backgroundcolor,
                        margin: "20px 10px 0px 0px",
                        color: "#88A1AB",
                        height: "44px",
                        pointerEvents: selectedItem ? "auto" : "none",
                      }}
                    >
                      <img alt="" src="/assets/icons/delete-icon.svg" />
                      <span style={{ marginLeft: "12px" }}>
                        Delete ({selectedItem})
                      </span>
                    </Button>
                    {/* search */}

                    <Paper
                      component="form"
                      sx={{
                        p: "2px 2px",
                        display: "flex",
                        alignItems: "center",
                        width: 433,
                        height: "36px",
                        boxShadow: "none",
                        marginRight: "10px",
                        backgroundColor: theme?.shareVideo?.tertiaryColor,
                        border: "2px solid",
                        borderColor: theme?.shareVideo?.borderColor,
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
                        style={{
                          fontSize: "12px",
                          color: theme?.darkfontcolor?.fontcolor,
                        }}
                      />
                      {search ? (
                        <CloseIcon
                          style={{
                            color: theme?.searchiconcolor?.crossmarkcolor,
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                        />
                      ) : null}
                    </Paper>
                    {/* search */}
                    <div style={{ marginTop: "20px" }}>
                      <SortByFileManager />
                    </div>
                    {/* </div> */}
                  </div>
                </div>
                <Scrollbars style={{ width: "100%", height: "57vh" }}>
                  <Grid
                    container
                    spacing={"21px"}
                    style={{ padding: "25px 43px" }}
                  >
                    {loading ? (
                      [...Array(filesCount)].map((e, i) => (
                        <MediaFileManagerLoader
                          progress={progress}
                          loaderfilename={loaderfilename}
                          loaderfilesize={loaderfilesize}
                          loaderfileduration={loaderfileduration}
                          count={filesCount}
                        />
                      ))
                    ) : (
                      <></>
                    )}

                    {images.map((item) => (
                      <Grid item xs={12} sm={4} md={3} lg={3}>
                        <Card
                          sx={{ maxWidth: 250, height: 250 }}
                          style={{
                            backgroundColor:
                              theme?.selectimage?.imagebackground,
                            transition: "all 0.1s ease",
                            position: "relative",
                          }}
                          onClick={() => setActive(item)}
                          className={`filemanager-grid ${active?.id == item.id && "active"
                            }`}
                          onMouseEnter={() => setMoreGrid(item.id)}
                          onMouseLeave={() => setMoreGrid(-1)}
                        >
                          <Checkbox
                            checked={checked[item.id]}
                            onClick={handleChecked(item.id)}
                            {...label}
                            sx={{
                              color: theme?.selectimage?.dropdawnbackground,

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
                            <CardMedia
                              component="img"
                              height="179"
                              image={item.file_url ? item.file_url : ""}
                            />
                            {/* <video id={item.id} width='100%' height="179" onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()}>
                          <source src={item.file_url} type="video/mp4"/>
                        </video> */}
                            <CardContent
                              style={{
                                margin: "0px",
                                padding: "0px",
                                display: "flex",
                              }}
                            >
                              <img
                                alt=""
                                src="/assets/icons/filemanager-icon.svg"
                                style={{
                                  backgroundColor:
                                    theme?.addmember?.checkboxcolor3,
                                  padding: "26px 11px",
                                }}
                              />
                              <div
                                style={{
                                  padding: "15px 10px",
                                  backgroundColor:
                                    theme?.addmember?.checkboxcolor4,
                                  width: "200px",
                                }}
                              >
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                  style={{
                                    color: "white",
                                    fontSize: "14px",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    // marginRight: "19px",
                                  }}
                                >
                                  {trimFileNme(
                                    item.file_name_original
                                      ? item.file_name_original
                                      : ""
                                  )}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  style={{
                                    color: theme?.addmember?.checkboxcolor5,
                                  }}
                                >
                                  Size:{item.file_size ? item.file_size : ""}MB
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
                style={{ height: "550px", position: "relative" }}
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

              {/* section3 */}
              {/* <div className={toggleState === 3 ? 'content active-content' : 'content'}>
            <div style={{display:'flex', alignItems:'center',justifyContent:'center',margin:'120px 0px'}} className='screen'>
           <Box style={{borderRadius:'4px',width:'220px',height:'220px',display:'flex', alignItems:'center',justifyContent:'center', margin:'40px',flexDirection:'column',cursor:'pointer'}} className='screen-box'>
    
            <DesktopOutlined style={{fontSize:'65px',color:'#88A1AB' }} />
            <Typography variant="h5" style={{
              color: '#88A1AB',
              textAlign: 'center',
              padding: '20px',
              fontSize:'16px',
              fontFamily: 'URW DIN REGULAR'
          }} >
  
          Desktop
  
          </Typography>
            </Box>
           <Box style={{borderRadius:'4px',width:'220px',height:'220px',display:'flex', alignItems:'center',justifyContent:'center', margin:'40px',flexDirection:'column',cursor:'pointer'}} className='screen-box'>
  
            <WindowIcon style={{fontSize:'65px',fill:'#88A1AB', }} />
            
            <Typography variant="h5" style={{
              color: '#88A1AB',
              textAlign: 'center',
              padding: '20px',
              fontSize:'16px',
              fontFamily: 'URW DIN REGULAR'
          }} >
  
          Window
  
          </Typography>
            </Box>
  
            <Box style={{borderRadius:'4px',width:'220px',height:'220px',display:'flex', alignItems:'center',justifyContent:'center', margin:'40px',flexDirection:'column',cursor:'pointer'}} className='screen-box'>
            <TabIcon style={{fontSize:'65px',fill:'#88A1AB', }} />
            <Typography variant="h5" style={{
              color: '#88A1AB',
              textAlign: 'center',
              padding: '20px',
              fontSize:'16px',
              fontFamily: 'URW DIN REGULAR'
          }} >
  
          Tab
  
          </Typography>
            </Box>
            
            </div>
      
          </div> */}

              <Divider
                variant="fullWidth"
                style={{ borderColor: theme?.addSpace?.dividercolor }}
              />

              <div style={{ textAlign: "center", margin: "18px 0px" }}>
                <Button
                  onClick={() => {
                    props.closeShareHandlerImage();

                    if (props.componentFor == "addTeamLogo") {
                      props.setFile(active.file_url);

                    }

                    if (props.componentFor == "logo") {
                      props.setFile(active.file_url);
                      props.setFormValues({
                        ...props.formValues,
                        main_logo: active.file_url,
                        menu_logo: active.file_url,
                      });
                    }

                    if (props.componentFor == "userProfile") {
                      props.setFile(active.file_url);
                      props.setFormValues({
                        ...props.formValues,
                        avatar: active.file_url,
                      });
                    }
                    if (props.componentFor == "lobbyImage") {
                      props.setFile(active.file_url);
                      props.setFormValues({
                        ...props.formValues,
                        lobby_image: active.file_url,
                      });
                    }
                    if (props.componentFor == "bgImage") {
                      props.setFile(active.file_url);
                      props.setFormValues({
                        ...props.formValues,
                        background_image: active.file_url,
                      });
                    }
                  }}
                  variant="contained"
                  style={{
                    textTransform: "none",
                    padding: "9px 59px",
                    fontSize: "14px",
                    lineHeight: "22px",
                    backgroundColor: theme?.login?.mainColor,
                    marginRight: "21px",
                  }}
                >
                  Select
                </Button>

                <Button
                  variant="contained"
                  style={{
                    textTransform: "none",
                    color: theme?.selectimage?.textcolor,
                    padding: "8px 47px",
                    fontSize: "14px",
                    lineHeight: "22px",
                    backgroundColor: theme?.selectimage?.backgroundcolor,
                    border: ` 2pz solid ${theme?.selectimage?.backgroundcolor1}`,
                  }}
                  onClick={() => {
                    props.closeShareHandlerImage();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
            {selectedItem ? (
              <ConfirmPop
                message="Are you sure you want to delete?"
                confirm={confirm}
                handleClickOpen={handleClickOpen}
                handleClickClose={handleClickClose}
                handleDelete={handleDelete}
              />
            ) : (
              <></>
            )}
          </div>
        </SkeletonTheme>

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
              Your Image is successfully uploaded
            </p>
            <img
              src="/assets/admin/tick.svg"
              style={{ padding: "0px 16px" }}
              alt=""
            />
          </div>
        </Snackbar>
      </>
    );
  } else if (props.fileManagerType == "all") {
    return (
      <>
        <SkeletonTheme baseColor="#012243" highlightColor="#002E56">
          <div
            style={{
              backgroundColor: theme?.addmember?.checkboxcolor2,
              position: "relative",
              width: "100%",
              // marginTop: "55px",
            }}
          >
            <div>
              {/* <div
                style={{
                  width: "99.99%",
                  display: "flex",
                  // backgroundColor: theme?.addmember?.checkboxcolor1,
                  // marginTop:'100px'
                }}
              >
                <div
                  style={{
                    // width: "99.5%",
                    cursor: "pointer",
                    borderBottom: `2px solid ${tab == "all files"
                      ? theme?.common?.color1
                      : theme?.addmember?.checkboxcolor2
                      }`,

                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme?.addmember?.headerBg,
                    height: "50px"
                  }}
                  onClick={() => setTab("all files")}
                >
                  <img
                    alt=""
                    style={{
                      paddingRight: "20px",
                      filter:
                        "brightness(0) saturate(100%) invert(74%) sepia(10%) saturate(578%) hue-rotate(152deg) brightness(83%) contrast(86%)",
                    }}
                    src="/assets/fileManager/file.svg"
                  />
                  <div
                    style={{
                      color: "rgba(136, 161, 171, 1)",
                      fontSize: "14px",
                    }}
                  >
                    All&nbsp;files
                  </div>
                </div>
                {/* <div
                  style={{
                    borderBottom: `2px solid ${tab == "file by space"
                      ? theme?.common?.color1
                      : theme?.addmember?.checkboxcolor2
                      }`,
                    marginLeft: "2px",
                    padding: "15px 0px",
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    backgroundColor: theme?.addmember?.headerBg,
                  }}
                  onClick={() => setTab("file by space")}
                >
                  <img
                    alt=""
                    style={{
                      paddingRight: "20px",
                      filter:
                        "brightness(0) saturate(100%) invert(74%) sepia(10%) saturate(578%) hue-rotate(152deg) brightness(83%) contrast(86%)",
                    }}
                    src="/assets/fileManager/space.svg"
                  />
                  <div
                    style={{
                      color: "rgba(136, 161, 171, 1)",
                      fontSize: "14px",
                    }}
                  >
                    Files&nbsp;by&nbsp;space
                  </div>
                </div>
              </div> */}
              {tab == "all files" ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "0px 43px 18px",
                    }}
                  >
                    {/* search */}

                    <Paper
                      component="form"
                      sx={{
                        p: "2px 2px",
                        display: "flex",
                        alignItems: "center",
                        width: 235,
                        height: "36px",
                        boxShadow: "none",
                        marginRight: "10px",
                        backgroundColor: theme?.addSpace?.bgColor,
                        // border: "2px solid",
                        // borderColor: "rgba(20, 63, 99, 1)",
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
                        placeholder="Search files"
                        inputProps={{ "aria-label": "Search files" }}
                        style={{
                          fontSize: "12px",
                          color: theme?.common?.color3,
                        }}
                      />
                      {search ? (
                        <CloseIcon
                          style={{
                            color: theme?.shareVideo?.primaryColor,
                            fontSize: "20px",
                            cursor: "pointer",
                          }}
                        />
                      ) : null}
                    </Paper>

                    <div style={{ display: "flex" }}>
                      {/* upload button */}
                      <Button
                        style={{
                          textTransform: "none",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "4px",
                          border: ` 2px solid ${theme?.selectimage?.backgroundcolor1}`,
                          // borderColor: "rgba(20, 63, 99, 1)",
                          padding: "0px 16px",
                          fontSize: "12px",
                          fontWeight: "300",
                          lineHeight: "22px",
                          backgroundColor: theme?.addSpace?.bgColor,
                          margin: "20px 10px 0px 43px",
                          color: "#88A1AB",
                          height: "38px",
                          position: "relative",
                          cursor: "pointer",
                        }}
                      >
                        <img alt="" src="/assets/icons/upload-icon.svg" />
                        <span style={{ marginLeft: "9px", cursor: "pointer" }}>
                          Upload File
                        </span>
                        <input
                          accept={toggleState === 1 ? "image/*" : "video/*"}
                          onChange={(event) => {
                            changeHandler(event);
                          }}
                          type="file"
                          multiple
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
                        onClick={handleClickOpen}
                        variant="contained"
                        style={{
                          textTransform: "none",
                          padding: "10px 29px",
                          fontSize: "12px",
                          fontWeight: "300",
                          lineHeight: "22px",
                          backgroundColor: theme?.addSpace?.bgColor,
                          margin: "20px 10px 0px 0px",
                          color: "#88A1AB",
                          height: "40px",
                          pointerEvents: selectedItem ? "auto" : "none",
                          boxShadow: "none",
                        }}
                      >
                        <img alt="" src="/assets/icons/delete-icon.svg" />
                        <span style={{ marginLeft: "12px" }}>
                          Delete ({selectedItem})
                        </span>
                      </Button>

                      {/* search */}
                      <div style={{ marginTop: "20px" }}>
                        <SortByFileManager type="fileManger" />
                      </div>
                      {/* </div> */}
                    </div>
                  </div>

                  <Divider
                    variant="fullWidth"
                    style={{
                      borderColor: theme?.editspace?.outerbgcolor,
                      height: "2px",
                    }}
                  />

                  <div style={{ display: "flex", paddingLeft: "20px" }}>
                    <FileTypeButton
                      toggleTab={toggleTab}
                      toggleState={toggleState}
                      tabCount={1}
                      buttonType="Images"
                    />

                    <FileTypeButton
                      toggleTab={toggleTab}
                      tabCount={2}
                      buttonType="Media"
                    />
                    {/* <FileTypeButton
                      toggleTab={toggleTab}
                      tabCount={3}
                      buttonType="Audios"
                    /> */}
                    {/* <FileTypeButton
                      toggleTab={toggleTab}
                      tabCount={4}
                      buttonType="Documents"
                    /> */}
                    {/* <FileTypeButton
                      toggleTab={toggleTab}
                      tabCount={5}
                      buttonType="Notes"
                    /> */}
                    {/* <FileTypeButton
                      toggleTab={toggleTab}
                      tabCount={6}
                      buttonType="All files"
                    /> */}

                    {/* <div
                  style={{
                    display: "flex",
                    backgroundColor: "rgba(20, 63, 99, 1)",
                    padding: "10px 14px",
                    borderRadius: "4px",
                    flex: 1,
                    margin: "20px 20px 0px 0px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    alt=""
                    src="/assets/fileManager/volume.svg"
                    style={{ paddingRight: "20px" }}
                  />
                  <div>
                    <Typography
                      style={{
                        color: "#88A1AB",
                        fontFamily: "URW DIN",
                        fontSize: "16px",
                      }}
                    >
                      Audios
                    </Typography>
                    <Typography
                      style={{
                        color: "#88A1AB",
                        fontFamily: "URW DIN REGULAR",
                        fontSize: "14px",
                      }}
                    >
                      7 files
                    </Typography>
                  </div>
                </div> */}

                    {/* <div
                  style={{
                    display: "flex",
                    backgroundColor: "rgba(20, 63, 99, 1)",
                    padding: "10px 14px",
                    borderRadius: "4px",
                    flex: 1,
                    margin: "20px 20px 0px 0px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    alt=""
                    src="/assets/fileManager/pdf.svg"
                    style={{ paddingRight: "20px" }}
                  />
                  <div>
                    <Typography
                      style={{
                        color: "#88A1AB",
                        fontFamily: "URW DIN",
                        fontSize: "16px",
                      }}
                    >
                      Documents
                    </Typography>
                    <Typography
                      style={{
                        color: "#88A1AB",
                        fontFamily: "URW DIN REGULAR",
                        fontSize: "14px",
                      }}
                    >
                      7 files
                    </Typography>
                  </div>
                </div> */}

                    {/* <div
                  style={{
                    display: "flex",
                    backgroundColor: "rgba(20, 63, 99, 1)",
                    padding: "10px 14px",
                    borderRadius: "4px",
                    flex: 1,
                    margin: "20px 20px 0px 0px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    alt=""
                    src="/assets/fileManager/notes.svg"
                    style={{ paddingRight: "20px" }}
                  />
                  <div>
                    <Typography
                      style={{
                        color: "#88A1AB",
                        fontFamily: "URW DIN",
                        fontSize: "16px",
                      }}
                    >
                      Notes
                    </Typography>
                    <Typography
                      style={{
                        color: "#88A1AB",
                        fontFamily: "URW DIN REGULAR",
                        fontSize: "14px",
                      }}
                    >
                      7 files
                    </Typography>
                  </div>
                </div> */}

                    {/* <div
                  style={{
                    display: "flex",
                    backgroundColor: "rgba(20, 63, 99, 1)",
                    padding: "10px 14px",
                    borderRadius: "4px",
                    flex: 1,
                    margin: "20px 20px 0px 0px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    alt=""
                    src="/assets/fileManager/fileBig.svg"
                    style={{ paddingRight: "20px" }}
                  />
                  <div>
                    <Typography
                      style={{
                        color: "#88A1AB",
                        fontFamily: "URW DIN",
                        fontSize: "16px",
                      }}
                    >
                      All files
                    </Typography>
                    <Typography
                      style={{
                        color: "#88A1AB",
                        fontFamily: "URW DIN REGULAR",
                        fontSize: "14px",
                      }}
                    >
                      7 files
                    </Typography>
                  </div>
                </div> */}
                  </div>
                  {toggleState === 1 ? (
                    <Scrollbars style={{ width: "100%", height: "67vh" }}>
                      <Grid
                        container
                        spacing={"21px"}
                        style={{ padding: "25px 43px" }}
                      >
                        {loading ? (
                          [...Array(filesCount)].map((e, i) => (
                            <MediaFileManagerLoader
                              progress={progress}
                              loaderfilename={loaderfilename}
                              loaderfilesize={loaderfilesize}
                              loaderfileduration={loaderfileduration}
                              count={filesCount}
                            />
                          ))
                        ) : (
                          <></>
                        )}

                        {images.map((item) => (
                          <Grid item xs={12} sm={4} md={3} lg={2.4}>
                            <Card
                              // sx={{ maxWidth: 250, height: 250 }}
                              style={{
                                backgroundColor:
                                  theme?.selectimage?.imagebackground,
                                transition: "all 0.1s ease",
                                position: "relative",
                              }}
                              onClick={() => setActive(item)}
                              className={`filemanager-grid ${active?.id == item.id && "active"
                                }`}
                              onMouseEnter={() => setMoreGrid(item.id)}
                              onMouseLeave={() => setMoreGrid(-1)}
                            >
                              <Checkbox
                                checked={checked[item.id]}
                                onClick={handleChecked(item.id)}
                                {...label}
                                sx={{
                                  color: theme?.selectimage?.dropdawnbackground,

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
                                <CardMedia
                                  component="img"
                                  height="200"
                                  image={item.file_url ? item.file_url : ""}
                                />
                                {/* <video id={item.id} width='100%' height="179" onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()}>
                          <source src={item.file_url} type="video/mp4"/>
                        </video> */}
                                <CardContent
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    display: "flex",
                                  }}
                                >
                                  <img
                                    alt=""
                                    src="/assets/icons/filemanager-icon.svg"
                                    style={{
                                      backgroundColor:
                                        theme?.addmember?.checkboxcolor3,
                                      padding: "26px 11px",
                                    }}
                                  />
                                  <div
                                    style={{
                                      padding: "15px 10px",
                                      backgroundColor:
                                        theme?.addmember?.checkboxcolor4,
                                      width: "100%",
                                    }}
                                  >
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="div"
                                      style={{
                                        color: "white",
                                        fontSize: "14px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        // marginRight: "19px",
                                      }}
                                    >
                                      {trimFileNme(
                                        item.file_name_original
                                          ? item.file_name_original
                                          : ""
                                      )}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      style={{
                                        color: theme?.addmember?.checkboxcolor5,
                                      }}
                                    >
                                      Size:
                                      {item.file_size ? item.file_size : ""}
                                      MB
                                    </Typography>
                                  </div>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Scrollbars>
                  ) : (
                    <Scrollbars style={{ width: "100%", height: "67vh" }}>
                      <Grid
                        container
                        spacing={"21px"}
                        style={{ padding: "25px 43px" }}
                      >
                        {/* shimmer */}

                        {loading ? (
                          [...Array(filesCount)].map((e, i) => (
                            <MediaFileManagerLoader
                              progress={progress}
                              loaderfilename={loaderfilename}
                              loaderfilesize={loaderfilesize}
                              loaderfileduration={loaderfileduration}
                              count={filesCount}
                            />
                          ))
                        ) : (
                          <></>
                        )}
                        {videos.map((item, index) => (
                          // <Grid item xs={12} sm={4} md={3} lg={3}>
                          <Grid item xs={12} sm={4} md={3} lg={2.4}>
                            <Card
                              // sx={{ maxWidth: 250, height: 250 }}
                              style={{
                                backgroundColor:
                                  theme?.selectimage?.imagebackground,
                                transition: "all 0.1s ease",
                                position: "relative",
                              }}
                              onClick={() => setActiveVideo(item)}
                              className={`filemanager-grid ${activeVideo?.id == item.id && "active"
                                }`}
                              onMouseEnter={() => setMoreGrid(item.id)}
                              onMouseLeave={() => setMoreGrid(-1)}
                            >
                              <Checkbox
                                checked={checked[item.id]}
                                onClick={handleChecked(item.id)}
                                {...label}
                                sx={{
                                  color: theme?.selectimage?.dropdawnbackground,

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
                                <video
                                  id={item.id}
                                  width="100%"
                                  height="200"
                                  muted
                                  onMouseOver={(event) => event.target.play()}
                                  onMouseOut={(event) => event.target.pause()}
                                >
                                  <source
                                    src={item.file_url}
                                    type="video/mp4"
                                  />
                                </video>
                                <CardContent
                                  style={{
                                    margin: "0px",
                                    padding: "0px",
                                    display: "flex",
                                  }}
                                >
                                  <img
                                    alt=""
                                    src="/assets/icons/filemanager-icon.svg"
                                    style={{
                                      backgroundColor:
                                        theme?.addmember?.checkboxcolor3,
                                      padding: "26px 11px",
                                    }}
                                  />
                                  <div
                                    style={{
                                      padding: "15px 10px",
                                      backgroundColor:
                                        theme?.addmember?.checkboxcolor4,
                                      width: "200px",
                                    }}
                                  >
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="div"
                                      style={{
                                        color: "#white",
                                        fontSize: "14px",
                                        whiteSpace: "nowrap",
                                        marginRight: "19px",
                                      }}
                                    >
                                      {trimFileNme(item.file_name_original)}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      style={{
                                        color: theme?.addmember?.checkboxcolor5,
                                      }}
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
                  )}
                </>
              ) : (
                <div
                  style={{
                    height: "84vh",
                  }}
                >
                  {" "}
                  <div
                    style={{
                      border: ` 4px dashed ${theme?.account?.buttonBg}`,
                    }}
                    className="dropzone"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <img src="/assets/fileManager/nofile.svg" alt="" />
                    <Typography
                      style={{
                        fontFamily: "URW DIN",
                        color: theme?.common?.color3,
                        fontSize: "24px",
                        padding: "28px 0px",
                      }}
                    >
                      There are no files
                    </Typography>
                    <img src="/assets/fileManager/upload.svg" alt="" />
                    <input
                      type="file"
                      multiple
                      onChange={(event) => setFiles(event.target.files)}
                      hidden
                      accept="image/png, image/jpeg"
                      ref={inputRef}
                    />

                    <Typography
                      onClick={() => inputRef.current.click()}
                      style={{
                        textAlign: "center",
                        color: "rgba(136, 161, 171, 1)",
                        fontFamily: "URW DIN REGULAR",
                        fontSize: "14px",
                        cursor: "pointer",
                        marginTop: "5px",
                      }}
                    >
                      Drag and drop images here <br /> or <br /> Browse files
                    </Typography>
                  </div>
                </div>
              )}
            </div>

            <Divider
              variant="fullWidth"
              style={{ borderColor: theme?.addSpace?.dividercolor }}
            />
          </div>
          {selectedItem ? (
            <ConfirmPop
              message="Are you sure you want to delete?"
              confirm={confirm}
              handleClickOpen={handleClickOpen}
              handleClickClose={handleClickClose}
              handleDelete={handleDelete}
            />
          ) : (
            <></>
          )}
          {/* </div> */}
        </SkeletonTheme>

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
              Your Image is successfully uploaded
            </p>
            <img
              src="/assets/admin/tick.svg"
              style={{ padding: "0px 16px" }}
              alt=""
            />
          </div>
        </Snackbar>
      </>
    );
  } else {
    return (
      <>
        <div className="filemanager-popup">
          <div
            style={{
              backgroundColor: theme?.shareVideo?.primaryColor,
              position: "relative",
            }}
            className="container"
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
              onClick={props.closeShareHandler}
            >
              <img alt="" src="/assets/icons/x.svg" />
            </div>
            {/* <Typography variant="h5" style={{
              color: theme?.shareVideo?.quinaryColor,
              fontWeight: '700', 
              textAlign: 'center',
              padding: '23px 0px',
              fontFamily: 'URW DIN'
  
          }} >
  
          Share Video
  
          </Typography> */}

            {/* <Divider variant="fullWidth" style={{borderColor: '#002E56'}}/> */}
            {/* section1 */}
            <div>
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
                    color: theme?.shareVideo?.quinaryColor,
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
                  <Box
                    style={{
                      textTransform: "none",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "4px",
                      border: "2px solid",
                      borderColor: theme?.selectimage?.backgroundcolor,
                      padding: "0px 16px",
                      fontSize: "12px",
                      fontWeight: "300",
                      lineHeight: "22px",
                      backgroundColor: theme?.shareVideo?.tertiaryColor,
                      margin: "20px 10px 0px 43px",
                      color: "#88A1AB",
                      height: "40px",
                    }}
                  >
                    <img src="/assets/icons/upload-icon.svg" />
                    <span style={{ marginLeft: "9px" }}>Upload File</span>
                  </Box>
                  {/* Delete button */}
                  <Button
                    variant="contained"
                    style={{
                      textTransform: "none",
                      padding: "10px 29px",
                      fontSize: "12px",
                      fontWeight: "300",
                      lineHeight: "22px",
                      backgroundColor: "#032E57",
                      margin: "20px 10px 0px 0px",
                      color: "#88A1AB",
                      height: "44px",
                    }}
                  >
                    <img src="/assets/icons/delete-icon.svg" />
                    <span style={{ marginLeft: "16px" }}>Delete (1)</span>
                  </Button>
                  <Paper
                    component="form"
                    sx={{
                      p: "2px 2px",
                      display: "flex",
                      alignItems: "center",
                      width: 433,
                      height: "40px",
                      backgroundColor: "#032E57",
                      marginTop: "20px",
                      marginRight: "12px",
                    }}
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
                      style={{
                        fontSize: "12px",
                        color: theme?.selectimage?.textcolor,
                      }}
                    />
                  </Paper>
                  {/* <div style={{margin: '20px 12px 0px 12px', padding: '5px 26px', backgroundColor: '#032E57', borderRadius: '4px'}} >
                <img src='/assets/icons/icon1.svg' style={{marginTop:'6px'}} />
              </div> */}
                  <div style={{ marginTop: "20px" }}>
                    <SortByFileManager />
                  </div>
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
                  {images.map((item) => (
                    <Grid item xs={12} sm={4} md={3} lg={3}>
                      <Card
                        sx={{ maxWidth: 250, height: 250 }}
                        style={{
                          backgroundColor: theme?.selectimage?.imagebackground,
                          transition: "all 0.1s ease",
                        }}
                        onClick={() => setActive(item)}
                        className={`filemanager-grid ${active?.id == item && "active"
                          }`}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="video"
                            height="179"
                            image={item.file_url}
                            autoplay
                            loop
                          />
                          {/* <video id={item.id} width='100%' height="179" onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()}>
                          <source src={item.file_url} type="video/mp4"/>
                        </video> */}
                          <CardContent
                            style={{
                              margin: "0px",
                              padding: "0px",
                              display: "flex",
                            }}
                          >
                            <img
                              alt=""
                              src="/assets/icons/filemanager-icon.svg"
                              style={{
                                backgroundColor:
                                  theme?.addmember?.checkboxcolor3,
                                padding: "26px 11px",
                              }}
                            />
                            <div
                              style={{
                                padding: "15px 10px",
                                backgroundColor:
                                  theme?.addmember?.checkboxcolor4,
                                width: "200px",
                              }}
                            >
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                style={{
                                  color: "white",
                                  fontSize: "14px",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  marginRight: "19px",
                                }}
                              >
                                {item.file_name}
                              </Typography>
                              <Typography
                                variant="body2"
                                style={{
                                  color: theme?.addmember?.checkboxcolor5,
                                }}
                              >
                                Size:534MB | 00:34:55
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
              style={{ height: "550px", position: "relative" }}
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

            {/* section3 */}
            {/* <div className={toggleState === 3 ? 'content active-content' : 'content'}>
            <div style={{display:'flex', alignItems:'center',justifyContent:'center',margin:'120px 0px'}} className='screen'>
           <Box style={{borderRadius:'4px',width:'220px',height:'220px',display:'flex', alignItems:'center',justifyContent:'center', margin:'40px',flexDirection:'column',cursor:'pointer'}} className='screen-box'>
    
            <DesktopOutlined style={{fontSize:'65px',color:'#88A1AB' }} />
            <Typography variant="h5" style={{
              color: '#88A1AB',
              textAlign: 'center',
              padding: '20px',
              fontSize:'16px',
              fontFamily: 'URW DIN REGULAR'
          }} >
  
          Desktop
  
          </Typography>
            </Box>
           <Box style={{borderRadius:'4px',width:'220px',height:'220px',display:'flex', alignItems:'center',justifyContent:'center', margin:'40px',flexDirection:'column',cursor:'pointer'}} className='screen-box'>
  
            <WindowIcon style={{fontSize:'65px',fill:'#88A1AB', }} />
            
            <Typography variant="h5" style={{
              color: '#88A1AB',
              textAlign: 'center',
              padding: '20px',
              fontSize:'16px',
              fontFamily: 'URW DIN REGULAR'
          }} >
  
          Window
  
          </Typography>
            </Box>
  
            <Box style={{borderRadius:'4px',width:'220px',height:'220px',display:'flex', alignItems:'center',justifyContent:'center', margin:'40px',flexDirection:'column',cursor:'pointer'}} className='screen-box'>
            <TabIcon style={{fontSize:'65px',fill:'#88A1AB', }} />
            <Typography variant="h5" style={{
              color: '#88A1AB',
              textAlign: 'center',
              padding: '20px',
              fontSize:'16px',
              fontFamily: 'URW DIN REGULAR'
          }} >
  
          Tab
  
          </Typography>
            </Box>
            
            </div>
      
          </div> */}

            <Divider
              variant="fullWidth"
              style={{ borderColor: theme?.addSpace?.dividercolor }}
            />

            <div style={{ textAlign: "center", margin: "18px 0px" }}>
              <Button
                onClick={() => {
                  if (toggleState == 2) {
                    console.log(shareUrl, "shareUrl");
                    dispatch(setStreamType(STREAM_TYPES.SHARING));
                    dispatch(setShareUrl(shareUrl));
                    window.room.sendCommandOnce("Share", {
                      value: JSON.stringify({ shareUrl, userId: local.userId }),
                    });

                    props.closeShareHandler();
                  }
                }}
                variant="contained"
                style={{
                  textTransform: "none",
                  padding: "9px 59px",
                  fontSize: "14px",
                  lineHeight: "22px",
                  backgroundColor: "#008BCD",
                  marginRight: "21px",
                }}
              >
                Share
              </Button>

              <Button
                variant="contained"
                style={{
                  textTransform: "none",
                  padding: "8px 47px",
                  fontSize: "14px",
                  lineHeight: "22px",
                  backgroundColor: "#011934",
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
      </>
    );
  }
  // }
}

export default MediaFileManager;
