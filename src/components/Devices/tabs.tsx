import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  Stack,
  InputLabel,
  FormControlLabel,
  Tooltip,
} from "@mui/material";
import * as React from "react";
//@ts-ignore
import MpegtsPlayer from "../mpegtsPlayer.tsx";
//@ts-ignore
import CustomTextField from "../styled/textField.tsx";
import { useSelector } from "react-redux";
//@ts-ignore
import { RootState } from "../../state/store.ts";
import SelectLabels from "../../sections/Dropdown";
import IOSSwitch from "../../admin/components/CustomSwitch";
import { v4 as uuidv4 } from "uuid";
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
//@ts-ignore
import DeviceCard from "./deviceCard.tsx";
import Toast from "../../sections/Toast";
import CopiedToClip from "../../admin/CopiedToClip";
//@ts-ignore
import {
  CHANNEL_TYPES,
  subscribeCentrifugoChannel,
  //@ts-ignore
} from "../../utilities/centrifugoUtils.ts";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import { ShowLocalDevices } from "./showLocalDevices.tsx";
import { getTeamSlugFromUrl } from "../../utilities/common.js";

const customConfig: Config = {
  dictionaries: [adjectives, colors],
  separator: "-",
  length: 2,
};

function Tabs(props) {
  const theme = props.theme;
  // const theme = useSelector((state: RootState) => state.theme.themeData);
  const videoDevices = useSelector(
    (state: RootState) => state.local.videoDevices
  );
  const audioDevices = useSelector(
    (state: RootState) => state.local.audioDevices
  );
  // selected tab
  const [selectedTab, setSelectedTab] = React.useState("Manage");
  // current devices
  const [devices, setDevices] = React.useState([]);

  // state for selected device
  const [selectedDevice, setSelectedDevice] = React.useState([]);

  // state for name and url
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");
  // toggle
  const [videoToggle, setVideoToggle] = React.useState(false);
  const [audioToggle, setaudioToggle] = React.useState(false);

  // streaming url
  const [streamUrl, setStreamUrl] = React.useState("");

  //refresh toast
  const [openToast, setOpenToast] = React.useState(false);
  // copy toast

  const [state, setState] = React.useState({
    openCopyToast: false,
    vertical: "top",
    horizontal: "center",
  });
  const [selectedVideoDevice, setSelectedVideoDevice] = React.useState("");
  const [selectedAudioDevice, setSelectedAudioDevice] = React.useState("");

  console.log(selectedVideoDevice, "selectedVideoDevice");

  // const { vertical, horizontal, openCopyToast } = state;

  const handleClick = (newState) => () => {
    setState({ openCopyToast: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, openCopyToast: false });
  };

  const getStreams = () => {
    fetch("https://origin.meetmo.io/api/v1/streams/")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result, "resulttt");

          let team_slug = getTeamSlugFromUrl("space");
          let streams = result.streams.filter((stream) => {
            console.log(stream.name, "streams");

            return stream.publish.active && stream.tcUrl.includes(team_slug);
          });

          setDevices(streams);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  };

  // call api to get devices
  React.useEffect(() => {
    refreshUrl();
    getStreams();

    subscribeCentrifugoChannel(CHANNEL_TYPES.DEVICE_STREAM).then((sub) => {
      sub.on("publication", (msg) => {
        getStreams();
      });
    });
  }, []);
  const refreshUrl = () => {
    const shortName: string = uniqueNamesGenerator(customConfig);
    setStreamUrl(shortName);
  };

  const Stream = () => {
    // if selectedTab is add
    if (selectedTab == "Add") {
      window.room?.localParticipant
        .createTracks({
          video: {
            deviceId: selectedVideoDevice,
          },
        })
        .then((tracks) => {
          tracks.forEach((track) => {
            let customName = name;

            if (name == "") {
              customName = "Device";
            }
            let data = {
              name: customName,
              default: false,
            };
            window.room?.localParticipant.publishTrack(track, { name: JSON.stringify(data) });
          });
        });
    }
    // if selectedTab is manage check if selectedDevice is null or not if null show error else show stream
    else {
      // if (selectedDevice.url == null) {
      //   console.log("select device");
      // } else {
      console.log("managemanage", selectedDevice);
      selectedDevice.forEach((device) => {
        // @ts-ignore
        window.eventChanel.publish({
          event: "addDevice",
          //@ts-ignore
          name: device.name,
          //@ts-ignore
          url: device.url,
          // @ts-ignore
          user_id: window.room?.myUserId(),
          // id:res.data.data.id,
          id: uuidv4(),
          //@ts-ignore
          device: device.device,
        });
        // todo: add stream to db
        // AxiosLocal.post("device/", {
        //   stream_url: selectedDevice.url,
        //   is_closed: false,
        //   device: selectedDevice.device,
        // }).then((res) => {
        //   console.log(res,"res.data.data.id");

        //   window.eventChanel.publish({
        //     event: "addDevice",
        //     name: selectedDevice.name,
        //     url: selectedDevice.url,
        //     // @ts-ignore
        //     user_id: window.room?.myUserId(),
        //     id:res.data.data.id,
        //     device: selectedDevice.device,
        //   });
        // }).catch((err) => {});
        props.onClose();
        // }
      });
    }
    props.onClose();
  };

  const [hover, setHover] = React.useState();
  const [hoverInfo, setHoverInfo] = React.useState();
  // show video devices of the user
  const [devicesLocal, setDevicesLocal] = React.useState<MediaDeviceInfo[]>([]);

  React.useEffect(() => {
    if (devicesLocal.length == 0) {
      // update the video devicesLocal using navigator.mediaDevicesLocal.enumerateDevicesLocal() video input devices
      navigator.mediaDevices
        .enumerateDevices()
        .then((devicesLocal: MediaDeviceInfo[]) => {
          setDevicesLocal(
            devicesLocal.filter((device: any) => device.kind === "videoinput")
          );
        });
    } else {
      // attach the video devicesLocal to the video element
      devicesLocal.forEach((device: MediaDeviceInfo, index: number) => {
        navigator.mediaDevices
          .getUserMedia({
            video: {
              deviceId: device.deviceId,
              width: 3840,
              height: 2160,
              frameRate: 60,
              aspectRatio: 16 / 9,
            },
          })
          .then((stream: MediaStream) => {
            const video = document.getElementById(
              `video_local_${device.deviceId}`
            ) as HTMLVideoElement;
            if (video) {
              video.srcObject = stream;
            }
          });
      });
    }
    return () => {
      devicesLocal.forEach((device: MediaDeviceInfo, index: number) => {
        const video = document.getElementById(
          `video_local_${selectedVideoDevice}`
        ) as HTMLVideoElement;
        const stream = video?.srcObject as MediaStream;
        stream?.getTracks()?.forEach((track: MediaStreamTrack) => {
          track?.stop();
        });
      });
    };
  }, [devicesLocal, selectedVideoDevice]);

  return (
    <Box>
      {/* two tabs add and manage */}
      {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1rem",
          }}
        > */}
      {/* add tab */}

      {/* <Typography
            sx={{
              color: "#fff",
              boxShadow:
                selectedTab == "Add"
                  ? "0px 0px 5px 5px hsl(213deg 89% 37%)"
                  : "none",
              backgroundColor:
                selectedTab == "Add" ? "hsl(213deg 89% 30%)" : "none",
              fontWeight: selectedTab == "Add" ? "bold" : "normal",
              padding: "0.5rem",
              borderRadius: "0.5rem",
            }}
            onClick={() => setSelectedTab("Add")}
          >
            Add Device
          </Typography> */}

      {/* manage tab */}

      {/* <Typography
            sx={{
              color: "#fff",
              boxShadow:
                selectedTab == "Manage"
                  ? "0px 0px 5px 5px hsl(213deg 89% 37%)"
                  : "none",
              backgroundColor:
                selectedTab == "Manage" ? "hsl(213deg 89% 30%)" : "none",
              fontWeight: selectedTab == "Manage" ? "bold" : "normal",
              padding: "0.5rem",
              borderRadius: "0.5rem",
            }}
            onClick={() => setSelectedTab("Manage")}
          >
            Current Streaming Devices
          </Typography>
        </Box> */}

      <ul
        style={{
          listStyle: "none",
          display: "flex",
          padding: "0px",
          margin: "0px",
        }}
      >
        <li
          style={{
            width: "50%",
            borderBottom:
              selectedTab == "Manage" ? "2px solid rgba(0, 205, 184, 1)" : "",
          }}
          // className={toggleState === "userrole" ? "roleNav" : ""}
          onClick={() => setSelectedTab("Manage")}
        >
          <div
            style={{
              backgroundColor: theme?.bg_color_1
                ? theme?.bg_color_1
                : "rgba(0, 205, 184, 1)",
              padding: "15px 0px",
              textAlign: "center",
              fontFamily: "URW DIN REGULAR",
              fontSize: "16px",
              color: "white",
              boxShadow: "none",
              borderRadius: "0px",
              cursor: "pointer",
            }}
          >
            Streaming devices
          </div>
        </li>
        <li
          style={{
            width: "50%",
            // borderLeft: `2px solid ${theme?.bg_color_1}`,
            borderBottom:
              selectedTab == "Add" ? "2px solid rgba(0, 205, 184, 1)" : "",
          }}
          onClick={() => setSelectedTab("Add")}
        >
          <div
            style={{
              backgroundColor: theme?.bg_color_1
                ? theme?.bg_color_1
                : "rgba(0, 205, 184, 1)",
              padding: "15px 0px",
              textAlign: "center",
              fontFamily: "URW DIN REGULAR",
              fontSize: "16px",
              color: "white",
              boxShadow: "none",
              borderRadius: "0px",
              cursor: "pointer",
            }}
          >
            Local devices
          </div>
        </li>
      </ul>
      {/* add device form */}
      {selectedTab == "Add" && (
        <Box
        // sx={{
        //   display: "flex",
        //   flexDirection: "column",
        //   alignItems: "center",
        //   justifyContent: "center",
        //   marginTop: "1rem",
        // }}
        >
          {/* form */}
          <Box
          // sx={{
          //   display: "flex",
          //   flexDirection: "column",
          //   alignItems: "center",
          //   justifyContent: "center",
          //   // marginTop: "1rem",
          // }}
          >
            {!videoToggle ? (
              <div>
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    border: `2px dashed ${theme?.bg_color_1}`,
                    margin: "68px auto 0px auto",
                  }}
                >
                  <img alt="" src="/assets/icons/plus.svg" />
                </div>
                <p
                  style={{
                    margin: "50px 0px",
                    color: "white",
                    fontFamily: "URW DIN REGULAR",
                    textAlign: "center",
                  }}
                >
                  Please select a devices to add
                </p>
              </div>
            ) : (
              <div style={{ padding: "15px 40px 8px" }}>
                <video
                  style={{
                    width: "470px",
                    height: "264px",
                    aspectRatio: "16/9",
                    // borderRadius:'4px'
                  }}
                  id={`video_local_${selectedVideoDevice}`}
                  className="local-device"
                  autoPlay={true}
                  muted={true}
                  playsInline={true}
                />
              </div>
            )}
            <Stack sx={{ margin: "0px 40px" }}>
              <InputLabel
                htmlFor="Country"
                style={{
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: "URW DIN REGULAR",
                  marginBottom: "5px",
                }}
              >
                Device name
              </InputLabel>
              <CustomTextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                borderColor={theme?.bg_color_3}
              />
            </Stack>

            <Stack sx={{ margin: "30px 40px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "7px",
                }}
              >
                <img
                  alt=""
                  src="/assets/bottomIcons/cam.svg"
                  style={{ paddingRight: "10px", width: "25px" }}
                />
                <p
                  style={{
                    color: "white",
                    fontFamily: "URW DIN REGULAR",
                    margin: "0px 21px 0px 0px",
                  }}
                >
                  Device video
                </p>
                <FormControlLabel
                  onChange={() => {
                    setVideoToggle(!videoToggle);
                    if (videoToggle) {
                      setSelectedVideoDevice("");
                    }
                  }}
                  control={
                    <IOSSwitch
                      theme={theme}
                      sx={{ marginRight: "15px" }}
                      defaultChecked={videoToggle}
                    />
                  }
                  label={
                    <span
                      style={{
                        color: "white",
                        fontSize: "14px",
                        fontFamily: "URW DIN REGULAR",
                      }}
                    >
                      {/* Device video */}
                    </span>
                  }
                  // labelPlacement="start"
                />
              </div>
              {videoToggle && (
                <ShowLocalDevices
                  options={devicesLocal}
                  selecteddevice={selectedVideoDevice}
                  onSelectDevice={setSelectedVideoDevice}
                />
              )}
            </Stack>

            {/* <Stack sx={{ margin: "0px 40px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <img
                  alt=""
                  src="/assets/bottomIcons/mic.svg"
                  style={{ paddingRight: "10px", width: "19px" }}
                />
                <p
                  style={{
                    color: "white",
                    fontFamily: "URW DIN REGULAR",
                    margin: "0px 21px 0px 0px",
                  }}
                >
                  Audio device
                </p>
                <FormControlLabel
                  onChange={() => {
                    setaudioToggle(!audioToggle);
                  }}
                  control={
                    <IOSSwitch
                      sx={{ marginRight: "15px" }}
                      defaultChecked={audioToggle}
                    />
                  }
                  label={
                    <span
                      style={{
                        color: "white",
                        fontSize: "14px",
                        fontFamily: "URW DIN REGULAR",
                      }}
                    >
                    </span>
                  }
                  // labelPlacement="start"
                />
              </div>
              {audioToggle && (
                <SelectLabels options={audioDevices} type="manageDevice" />
              )}
            </Stack> */}
            {/* <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    marginRight: "1rem",
                  }}
                >
                  Device Name
                </Typography> */}
            {/* mui input */}

            {/* <CustomTextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    marginRight: "1rem",
                  }}
                >
                  Device Link
                </Typography>
                <CustomTextField
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  name="url"
                />
              </Box> */}
          </Box>
          {/* priview player */}
          {url && selectedTab != "Add" && (
            <Box
              sx={{
                marginTop: "1rem",
              }}
            >
              <MpegtsPlayer ShareUrl={url} />
            </Box>
          )}
        </Box>
      )}
      {/* manage device  */}
      {selectedTab == "Manage" && (
        <Box
        // sx={{
        //   display: "flex",
        //   flexDirection: "column",
        //   alignItems: "center",
        //   justifyContent: "center",
        //   marginTop: "1rem",
        // }}
        >
          <Box style={{ margin: "20px 40px" }}>
            <Typography
              style={{ color: "white", fontFamily: "URW DIN REGULAR" }}
            >
              Streaming URL
            </Typography>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                border: `2px solid ${theme?.bg_color_2}`,
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="linkIcon" style={{ marginLeft: "10px" }}>
                  <img alt="" src="/assets/devices/link.svg" />
                </div>
                <div
                  className="link"
                  style={{
                    display: "flex",
                    margin: "0px 5px 0px 10px",
                  }}
                >
                  <Typography
                    style={{
                      color: "white",
                      fontFamily: "URW DIN REGULAR",
                      overflowX: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "160px",
                      display: "inline-block",
                      marginRight: "-5px",
                    }}
                  >
                    rtmp://origin.meetmo.io/{getTeamSlugFromUrl("space")}/
                    {localStorage.getObject("currentSubSpaceSlug")}/
                  </Typography>
                  <Typography
                    style={{
                      color: "white",
                      fontFamily: "URW DIN REGULAR",
                      marginLeft: "-4px",
                    }}
                  >
                    {streamUrl}
                  </Typography>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: theme?.bg_color_1
                    ? theme?.bg_color_1
                    : "rgba(41, 74, 85, 1)",
                  display: "flex",
                  height: "40px",
                }}
              >
                <div
                  onClick={() => {
                    refreshUrl();
                    setOpenToast(true);
                  }}
                  className="refreshIcon"
                  style={{
                    width: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <img alt="" src="/assets/devices/refresh.svg" />
                </div>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{
                    alignSelf: "auto",
                    backgroundColor: theme?.bg_color_2
                      ? theme?.bg_color_2
                      : "rgba(0, 205, 184, 1)",
                    width: "2px",
                  }}
                />
                <div
                  style={{
                    width: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `rtmp://origin.meetmo.io/${getTeamSlugFromUrl(
                        "space"
                      )}/${localStorage.getObject("currentSubSpaceSlug")}/` +
                        streamUrl
                    );
                    handleClick({
                      vertical: "bottom",
                      horizontal: "center",
                    })();
                  }}
                  className="copyIcon"
                >
                  <img alt="" src="/assets/devices/copy.svg" />
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "30px",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  style={{ color: "white", fontFamily: "URW DIN REGULAR" }}
                >
                  Devices
                </Typography>
                <div
                  style={{
                    fontFamily: "URW DIN REGULAR",
                    backgroundColor: theme?.bg_color_2
                      ? theme?.bg_color_2
                      : "rgba(0, 205, 184, 1)",
                    borderRadius: "4px",
                    height: "40px",
                    padding: "0px 10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    margin: "0px 10px 0px 18px",
                    fontSize: "16px",
                  }}
                >
                  {selectedDevice.length} / {devices.length}
                </div>
                {/* <div
                  style={{
                    padding: "4px 20px",
                    backgroundColor: "rgba(0, 205, 184, 1)",
                    borderRadius: "4px",
                    height: "32px",
                  }}
                >
                  <img
                    src="/assets/icons/icon1.svg"
                    style={{ marginTop: "6px" }}
                    alt=""
                  />
                </div> */}
              </div>
              <Button
                variant="contained"
                style={{
                  textTransform: "none",
                  minWidth: "170px",
                  padding: "10px",
                  fontSize: "16px",
                  fontWeight: "300",
                  lineHeight: "22px",
                  backgroundColor: theme?.bg_color_2
                    ? theme?.bg_color_2
                    : "rgba(0, 205, 184, 1)",
                  color: "white",
                  height: "40px",
                  fontFamily: "URW DIN REGULAR",
                }}
                onClick={() => {
                  getStreams();
                  setSelectedDevice([]);
                }}
              >
                <img src="/assets/devices/refresh.svg" alt="" />
                <span style={{ marginLeft: "11px" }}>Refresh all devices</span>
              </Button>
            </div>
          </Box>

          {/* <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            > */}
          {/* loop  devices*/}
          <div
            className="scroll"
            style={{
              maxHeight:"30vh",
              width: "100%",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            {devices.map((device) => {
              return (
                <DeviceCard
                  device={device}
                  setSelectedDevice={setSelectedDevice}
                  selectedDevice={selectedDevice}
                  theme={theme}
                />
              );
            })}

          
          </div>
        </Box>
        // </Box>
      )}

      {/* Stream and close buttons */}

      {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginTop: "1rem",
            position: "absolute",
            bottom: "20px",
            left: "30%",
            gap: "1rem",
          }}
        >
          <Typography
            onClick={Stream}
            sx={{
              color: "#fff",
              boxShadow: "inset 0 0 13px 14px hsl(213deg 89% 37%)",
              backgroundColor: "hsl(213deg 89% 30%)",
              fontWeight: "bold",
              padding: "1rem",
              borderRadius: "1rem",
              marginRight: "1rem",
            }}
          >
            Stream
          </Typography>
          <Typography
            onClick={props.onClose}
            sx={{
              color: "#fff",
              boxShadow: "inset 0 0 13px 14px hsl(213deg 89% 37%)",
              backgroundColor: "hsl(213deg 89% 30%)",
              fontWeight: "bold",
              padding: "1rem",
              borderRadius: "1rem",
            }}
          >
            Close
          </Typography>
        </Box> */}
      <div style={{ position: "absolute", bottom: "20px", left: 0, right: 0 }}>
        <Divider
          variant="fullWidth"
          style={{ borderColor: "rgba(41, 74, 85, 1)" }}
        />

        <div style={{ textAlign: "center", margin: "18px 0px 0px" }}>
          <Button
            variant="contained"
            style={{
              textTransform: "none",
              padding: "9px 25px",
              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
              lineHeight: "22px",
              backgroundColor: "rgba(0, 205, 184, 1)",
              marginRight: "21px",
              borderRadius: "4px",
              color: "white",
            }}
            onClick={Stream}
          >
            Add device
          </Button>

          <Button
            variant="contained"
            style={{
              textTransform: "none",
              padding: "8px 47px",
              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
              lineHeight: "22px",
              backgroundColor: theme?.bg_color_2
                ? theme?.bg_color_2
                : "rgba(25, 60, 71, 1)",
              border: "2px solid",
              borderColor: "rgba(41, 74, 85, 1)",
              borderRadius: "4px",
              color: "rgba(225, 234, 234, 1)",
            }}
            onClick={props.onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
      <Toast
        openToast={openToast}
        setOpenToast={setOpenToast}
        message="Updated Successfully"
      />
      <CopiedToClip state={state} handleClose={handleClose} />
    </Box>
  );
}

export default Tabs;
