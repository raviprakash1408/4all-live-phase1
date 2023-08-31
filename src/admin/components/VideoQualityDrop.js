import React, { useState } from "react";
import { Box, Slider } from "@mui/material";
import { useSelector } from "react-redux";

const VideoQualityDrop = () => {
  const theme = useSelector((state) => state.theme.themeData);

  const [selected, setIsSelected] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [hover, sethover] = useState(-1);
  const [hoverRemove, sethoverRemove] = useState(-1);

  const [addResolution, setaddResolution] = useState(false);

  const streaming_quality = [
    {
      id: 1,
      resolution: "2160",
      bitrate: "4 Mbps",
    },
    {
      id: 2,
      resolution: "1440p",
      bitrate: "1 Mbps",
    },
    {
      id: 3,
      resolution: "1080p",
      bitrate: "3 Mbps",
    },
    {
      id: 4,
      resolution: "720p",
      bitrate: "1 Mbps",
    },
    {
      id: 5,
      resolution: "480p",
      bitrate: "1 Mbps",
    },
    {
      id: 6,
      resolution: "360p",
      bitrate: "1 Mbps",
    },
    ,
    {
      id: 7,
      resolution: "180p",
      bitrate: "1 Mbps",
    },
  ];
  console.log(selected.length, "selected.length");
  return (
    <div
      style={{ position: "relative" }}
      // className="InvitePeopleDrop"
    >
      <Box
        component="form"
        sx={{
          p: "2px 2px",
          backgroundColor: theme?.permissions?.videoquality,

          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "32px",
          border: `2px solid ${theme?.permissions?.border}`,

          borderRadius: "4px",
          fontFamily: "URW DIN REGULAR",
          fontSize: "14px",
          cursor: "pointer",
          borderRadius: "4px",
        }}
        onClick={(e) => {
          setIsActive(!isActive);
        }}
        // className="InvitePeopleDrop"
      >
        {selected.slice(0, 2).map((item) => (
          <div
            style={{
              backgroundColor: theme?.permissions?.bgColor,

              display: "flex",
              alignItems: "center",
              padding: "0px 25px 0px 25px",
              height: "32px",
              borderRadius: "4px",
              marginRight: "4px",
            }}
          >
            <p
              style={{
                // marginRight: "20px",
                color: "#88A1AB",
                fontSize: "14px",
              }}
            >
              {item.resolution}
            </p>
            {/* <img
              src="/assets/admin/close.svg"
              style={{ width: "8px", height: "8px" }}
              onClick={() => {
                const removeItem = selected.filter((elem) => elem != item);
                setIsSelected([...removeItem]);
                if (isActive) {
                  setIsActive(true);
                } else {
                  setIsActive(false);
                }
              }}
            /> */}
          </div>
        ))}
        <div
          style={{
            backgroundColor:theme?.permissions?.bgColor,

            display: "flex",
            alignItems: "center",
            padding: "0px 9px",
            height: "32px",
            borderRadius: "4px",
            marginRight: "4px",
            color: "#88A1AB",
          }}
        >
          <img src="/assets/admin/MeetMo 1.6/add.svg" />
        </div>
      </Box>

      <div
        // className="dropdown-contents"
        style={{
          display: isActive ? "block" : "none",
          backgroundColor: "#012243",
          border: `2px solid ${theme?.permissions?.border}`,

          borderRadius: "4px",
          color: "#88A1AB",
          fontSize: "14px",
          fontFamily: "URW DIN REGULAR",
          fontWeight: 400,
          position: "absolute",
          left: 100,
          zIndex: 1,
          width: "283px",
        }}
      >
        {/* <Scrollbars style={{ width: "100%", height: '20vh', }}> */}
        <div style={{ display: "flex" }}>
          <p
            style={{
              marginLeft: "14px",
              color: theme?.permissions?.color,

              fontSize: "14px",
              fontFamily: "URW DIN",
            }}
          >
            Resolution
          </p>
          <p
            style={{
              marginLeft: "78px",
              color: theme?.permissions?.color,

              fontSize: "14px",
              fontFamily: "URW DIN",
            }}
          >
            Bitrate
          </p>
        </div>

        {selected.map((item) => (
          <div
            style={{
              backgroundColor: theme?.permissions?.bgColor,

              display: "flex",
              alignItems: "center",
              padding: "0px 15px 0px 20px",
              height: "32px",
              borderRadius: "4px",
              margin: "5px 15px",
              // justifyContent: "space-evenly",
            }}
            onMouseEnter={() => sethoverRemove(item.id)}
            onMouseLeave={() => sethoverRemove(-1)}
          >
            <p
              style={{
                // marginRight: "20px",
                color: "#88A1AB",
                fontSize: "14px",
                width: "25%",
              }}
            >
              {item.resolution}
            </p>
            <div style={{ width: "45%" }}>
              <Slider
                aria-label="Volume"
                //   disabled={audioMuted}
                //   value={value}
                //   onChange={handleChange}
                sx={{
                  width: 76,
                  color: "#008BCD",
                  height: 2,
                  marginLeft: "6px",
                  borderRadius: "0px",
                  marginLeft: "20px",

                  "& .MuiSlider-thumb": {
                    border: "2px solid",
                    borderColor: "#008BCD",
                    color: "#E1E7EA",
                    // boxShadow: '0 0 0 2px rgba(0, 255, 0, 0.3) !important'
                    width: "17px",
                    height: "17px",
                  },
                  "& .MuiSlider-thumb:hover": {
                    // boxShadow: '0 0 0 2px rgba(0, 255, 0, 0.3) !important'
                  },
                }}
              />
            </div>
            <p
              style={{
                marginLeft: "12px",
                color: "#88A1AB",
                fontSize: "14px",
                width: "30%",
                // opacity: hoverRemove == item.id ? 0 : 1,
                display: hoverRemove == item.id ? "none" : "block",
              }}
            >
              {item.bitrate}
            </p>
            <img
              src="/assets/admin/closeRoundRed.svg"
              style={{
                width: "20px",
                height: "20px",
                width: "30%",
                marginLeft: "12px",
                cursor: "pointer",
                // opacity: hoverRemove == item.id ? 1 : 0,
                display: hoverRemove == item.id ? "block" : "none",
              }}
              onClick={() => {
                const removeItem = selected.filter((elem) => elem != item);
                setIsSelected([...removeItem]);
                if (isActive) {
                  setIsActive(true);
                } else {
                  setIsActive(false);
                }
              }}
            />
          </div>
        ))}
        <div
          style={{
            display: "flex",
            backgroundColor: theme?.permissions?.videoquality,

            alignItems: "center",
            padding: "0px 25px 0px 25px",
            height: "32px",
            borderRadius: "4px",
            margin: "5px 15px",
            border: "2px dashed #143F63",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
          onClick={() => setaddResolution(!addResolution)}
        >
          <img src="/assets/admin/MeetMo 1.6/add.svg" />

          <p
            style={{
              marginLeft: "11px",
              color: theme?.permissions?.color,

              fontSize: "14px",
            }}
          >
            Add resolution
          </p>
          {/* <img
              src="/assets/admin/close.svg"
              style={{ width: "8px", height: "8px" }}
              onClick={() => {
                const removeItem = selected.filter((elem) => elem != item);
                setIsSelected([...removeItem]);
                if (isActive) {
                  setIsActive(true);
                } else {
                  setIsActive(false);
                }
              }}
            /> */}
        </div>

        <Box
          style={{
            position: "absolute",
            backgroundColor: theme?.permissions?.videoquality,

            border: `2px solid ${theme?.permissions?.border}`,

            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        >
          {addResolution ? (
            streaming_quality?.map((item) => (
              <div
                onMouseEnter={() => sethover(item.id)}
                onMouseLeave={() => sethover(-1)}
                style={{
                  background: selected.some((el) => item.id == el.id)
                    ? "#008BCD"
                    : "" || hover == item.id
                    ? "#143F63"
                    : "",
                  fontSize: selected.some((el) => item.id == el.id)
                    ? "14px"
                    : "14px",
                  fontFamily: selected.some((el) => item.id == el.id)
                    ? "URW DIN"
                    : "URW DIN REGULAR",
                  width: "141px",
                  //   display: selected.some((el) => item.id == el.id)
                  //     ? "none"
                  //     : "block",
                }}
              >
                <div
                  onClick={() => {
                    if (selected.some((el) => item.id == el.id)) {
                      let filtereArr = selected.filter(
                        (ele) => ele.id != item.id
                      );
                      setIsSelected([...filtereArr]);
                    } else {
                      setIsSelected([...selected, item]);
                    }
                    console.log(selected, "selectedselected");
                  }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div style={{ width: "20%" }}>
                    <img
                      src="/assets/admin/videoplus.svg"
                      style={{
                        // filter: hover == item.id ? "brightness(0) invert(1)" : "",
                        marginLeft: "10px",
                        opacity: selected.some((el) => item.id == el.id)
                          ? 0
                          : hover == item.id
                          ? 1
                          : 0,
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "50%",
                    }}
                  >
                    <p
                      style={{
                        color:
                          selected.some((el) => item.id == el.id) ||
                          hover == item.id
                            ? "white"
                            : theme?.permissions?.color,
                        marginLeft: "14px",
                      }}
                    >
                      {item.resolution}
                    </p>
                  </div>
                  <div
                    style={{
                      width: "20%",
                      opacity:
                        hover == item.id &&
                        selected.some((el) => item.id == el.id)
                          ? 1
                          : 0,
                    }}
                  >
                    <img
                      style={{
                        marginLeft: "10px",
                        // opacity: hover == item.id ? 1 : 0,
                        display: "flex",
                        justifyConter: "end",
                      }}
                      src="/assets/admin/closeRoundRed.svg"
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </Box>
        {/* </Scrollbars> */}
      </div>
    </div>
  );
};

export default VideoQualityDrop;
