import React, { useState, useEffect } from "react";
import { Box, Typography, Checkbox } from "@mui/material";
import MpegtsPlayer from "../mpegtsPlayer.tsx";
import InfoButtonPop from "./infoButtonPop.tsx";
import { niceBytes } from "../../utilities/common";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const DeviceCard = ({ device, setSelectedDevice, selectedDevice, theme }) => {
  const [hover, setHover] = useState(false);
  const [hoverInfo, setHoverInfo] = useState(false);

  return (
    <Box
      style={{
        margin: "10px 40px",
        width: "472px",
        borderRadius: "4px",
        backgroundColor: hover ? theme?.bg_color_3 : theme?.bg_color_2,
        height: "144px",
        display: "flex",
        position: "relative",
        outline: selectedDevice.some((el) => el.name == device.name)
          ? "2px solid rgba(0, 205, 184, 1)"
          : "",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        if (!selectedDevice.some((el) => el.name == device.name)) {
          setSelectedDevice([
            ...selectedDevice,
            {
              url: "https://origin.meetmo.io" + device.url + ".flv",
              name: device.name,
              device,
            },
          ]);
        } else {
          const filteredremoveDevice = selectedDevice.filter(
            (item) => item.name !== device.name
          );
          setSelectedDevice([...filteredremoveDevice]);
        }
      }}
    >
      <div style={{ width: "256px", height: "144px", borderRadius: "4px" }}>
        {/* <Checkbox
          {...label}
          onClick={() => {
            if (!selectedDevice.some((el) => el.name == device.name)) {
              setSelectedDevice([
                ...selectedDevice,
                {
                  url: "https://origin.meetmo.io" + device.url + ".flv",
                  name: device.name,
                  device,
                },
              ]);
            } else {
              const filteredremoveDevice = selectedDevice.filter(
                (item) => item.name !== device.name
              );
              setSelectedDevice([...filteredremoveDevice]);
            }
          }}
          checked={selectedDevice.some((el) => el.name == device.name)}
          // onClick={selectItemAll}
          sx={{
            color: "white",
            borderRadius: "0px",
            "& .MuiSvgIcon-root": { fontSize: 25 },
            "&.Mui-checked": {
              color: "rgba(0, 205, 184, 1)",
            },
          }}
          style={{
            width: "30px",
            height: "30px",
            position: "absolute",
            top: "16px",
            left: "5px",
          }}
        /> */}
        <MpegtsPlayer
          // onClick={() => {
          //   if (!selectedDevice.some((el) => el.name == device.name)) {
          //     setSelectedDevice([
          //       ...selectedDevice,
          //       {
          //         url: "https://origin.meetmo.io" + device.url + ".flv",
          //         name: device.name,
          //         device,
          //       },
          //     ]);
          //   } else {
          //     const filteredremoveDevice = selectedDevice.filter(
          //       (item) => item.name !== device.name
          //     );
          //     setSelectedDevice([...filteredremoveDevice]);
          //   }
          // }}
          // onClick={() =>
          //   setSelectedDevice({
          //     url: "https://origin.meetmo.io" + device.url + ".flv",
          //     name: device.name,
          //     device,
          //   })
          // }
          ShareUrl={"https://origin.meetmo.io" + device.url + ".flv"}
        />
      </div>
      {/* <div>
        <img alt=""
          src={device.image}
          style={{
            width: "256px",
            height: "144px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
          alt=""
        />
      </div> */}
      <div>
        <Typography
          style={{
            color: "#E1E7EA",
            fontFamily: "URW DIN",
            marginTop: "5px",
            marginLeft: "20px",
          }}
        >
          {device.name?.split("/").pop()}
        </Typography>
        {hover && (
          <img
            src="/assets/devices/ibutton.svg"
            alt=""
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              cursor: "pointer",
              height: "20px",
              width: "20px",
              filter: hoverInfo ? "brightness(0) invert(1)" : "",
            }}
            onMouseEnter={() => setHoverInfo(true)}
            onMouseLeave={() => setHoverInfo(false)}
          />
        )}
        {hoverInfo && (
          <InfoButtonPop
            device={device}
            is_hover={hover}
            positionLeft="0px"
            positionTop="20px"
          />
        )}
        <ul
          style={{
            listStyle: "none",
            margin: "0px",
            padding: "0px",
            display: "flex",
          }}
        >
          <li style={{ margin: "0px 20px" }}>
            <Typography
              style={{
                color: "white",
                fontFamily: "URW DIN REGULAR",
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              Video codec
            </Typography>
            <Typography
              style={{
                color: "white",
                fontFamily: "URW DIN REGULAR",
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              Audio codec
            </Typography>
            <Typography
              style={{
                color: "white",
                fontFamily: "URW DIN REGULAR",
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              Resolution
            </Typography>
            <Typography
              style={{
                color: "white",
                fontFamily: "URW DIN REGULAR",
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              FPS
            </Typography>
            <Typography
              style={{
                color: "white",
                fontFamily: "URW DIN REGULAR",
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              Bitrate
            </Typography>
          </li>
          <li>
            <Typography
              style={{
                color: "#E1E7EA",
                fontFamily: "URW DIN REGULAR",
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              {device.video?.codec}
            </Typography>
            <Typography
              style={{
                color: "#E1E7EA",
                fontFamily: "URW DIN REGULAR",
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              {device.audio?.codec}
            </Typography>
            <Typography
              style={{
                color: "#E1E7EA",
                fontFamily: "URW DIN REGULAR",
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              {device.video?.width} x {device.video?.height}
            </Typography>
            <Typography
              style={{
                color: "#E1E7EA",
                fontFamily: "URW DIN REGULAR",
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              {device?.frames}
            </Typography>
            <Typography
              style={{
                color: "#E1E7EA",
                fontFamily: "URW DIN REGULAR",
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              {niceBytes(device?.recv_30s)}
            </Typography>
          </li>
        </ul>
      </div>
    </Box>
  );
};

export default DeviceCard;
