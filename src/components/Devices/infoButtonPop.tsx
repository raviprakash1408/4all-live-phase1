import React from 'react'
import { Typography, Divider } from "@mui/material";
import { niceBytes } from '../../utilities/common';

const InfoButtonPop = ({ device, is_hover, positionLeft, positionTop }) => {
  function parseMillisecondsIntoReadableTime(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    h += d * 24;
    return h + ":" + m + ":" + s;
  }

  return (
    <>
      <div
        style={{
          display: is_hover ? "block" : "none",
          padding: "15px 0px",
          width: "563px",
          position: "absolute",
          top: `${positionTop}`,
          left: `${positionLeft}`,
          borderRadius: "4px",
          zIndex: 5,
        }}
      >
        <div
          style={{
            backgroundColor: "#012A50",
            padding: "15px 5px",
            borderRadius: "4px 4px 0px 0px",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              margin: "0px",
              padding: "0px",
              display: "flex",
            }}
          >
            <li style={{ width: "48%" }}>
              <div
                style={{
                  display: "flex",
                  padding: "5px 0px",
                }}
              >
                <img
                  alt=""
                  src="/assets/devices/stream_id.svg"
                  style={{ margin: "0px 10px" }}
                />
                <Typography
                  style={{
                    color: "#E1E7EA",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Stream ID:
                </Typography>
                <Typography
                  style={{
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  {device?.id}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "5px 0px",
                }}
              >
                <img
                  alt=""
                  src="/assets/devices/name.svg"
                  style={{ margin: "0px 10px" }}
                />
                <Typography
                  style={{
                    color: "#E1E7EA",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Name:
                </Typography>
                <Typography
                  style={{
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  {device?.name?.split("/").pop()}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "5px 0px",
                }}
              >
                <img
                  alt=""
                  src="/assets/devices/connection.svg"
                  style={{ margin: "0px 10px" }}
                />
                <Typography
                  style={{
                    color: "#E1E7EA",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Connection:
                </Typography>
                <Typography
                  style={{
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Good
                </Typography>
              </div>
            </li>

            <li style={{ width: "52%", paddingLeft: "10px" }}>
              <div
                style={{
                  display: "flex",
                  padding: "5px 0px",
                }}
              >
                <img
                  alt=""
                  src="/assets/devices/clock.svg"
                  style={{ margin: "0px 10px" }}
                />
                <Typography
                  style={{
                    color: "#E1E7EA",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Duration:
                </Typography>
                <Typography
                  style={{
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  {parseMillisecondsIntoReadableTime(1672811657119)}
                  {/* {device?.live_ms / 1000} */}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "5px 0px",
                }}
              >
                <img
                  alt=""
                  src="/assets/devices/frame.svg"
                  style={{ margin: "0px 10px" }}
                />
                <Typography
                  style={{
                    color: "#E1E7EA",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Frames:
                </Typography>
                <Typography
                  style={{
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  {device?.frames}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "5px 0px",
                }}
              >
                <img
                  alt=""
                  src="/assets/devices/bandwidth.svg"
                  style={{ margin: "0px 10px" }}
                />
                <Typography
                  style={{
                    color: "#E1E7EA",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Total bandwidth:
                </Typography>
                <Typography
                  style={{
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  <span>
                    &nbsp;&nbsp;
                    <img
                      alt=""
                      src="/assets/popup_detail_icons/detail_icons/down.svg"
                    />{" "}
                    {niceBytes(device?.recv_bytes)} &nbsp;
                    <img
                      alt=""
                      src="/assets/popup_detail_icons/detail_icons/up.svg"
                    />{" "}
                    {niceBytes(device?.send_bytes)}
                  </span>
                </Typography>
              </div>
            </li>
          </ul>
        </div>
        <div
          style={{
            backgroundColor: "#012243",
            padding: "15px 5px",
            borderRadius: "0px 0px 4px 4px",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              margin: "0px",
              padding: "0px",
              display: "flex",
            }}
          >
            <li style={{ width: "48%" }}>
              <Typography
                style={{
                  color: "#E1E7EA",
                  fontFamily: "URW DIN",
                  fontWeight: 400,
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                Video
              </Typography>
              <div
                style={{
                  display: "flex",
                  padding: "5px 0px",
                }}
              >
                <img
                  alt=""
                  src="/assets/devices/codec.svg"
                  style={{ margin: "0px 10px" }}
                />
                <Typography
                  style={{
                    color: "#E1E7EA",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Codec:
                </Typography>
                <Typography
                  style={{
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  {device?.video?.codec}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "5px 0px",
                }}
              >
                <img
                  alt=""
                  src="/assets/devices/stream_id.svg"
                  style={{ margin: "0px 10px" }}
                />
                <Typography
                  style={{
                    color: "#E1E7EA",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Profile:
                </Typography>
                <Typography
                  style={{
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  {device?.video?.profile}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "5px 0px",
                }}
              >
                <img
                  alt=""
                  src="/assets/devices/level.svg"
                  style={{ margin: "0px 10px" }}
                />
                <Typography
                  style={{
                    color: "#E1E7EA",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Level:
                </Typography>
                <Typography
                  style={{
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  {device?.video?.level}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "5px 0px",
                }}
              >
                <img
                  alt=""
                  src="/assets/devices/bitrate.svg"
                  style={{ margin: "0px 10px" }}
                />
                <Typography
                  style={{
                    color: "#E1E7EA",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Bitrate:
                </Typography>
                <Typography
                  style={{
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  <span>
                    &nbsp;&nbsp;
                    <img
                      alt=""
                      src="/assets/popup_detail_icons/detail_icons/down.svg"
                    />{" "}
                    {niceBytes(device?.kbps?.recv_30s)} &nbsp;
                    <img
                      alt=""
                      src="/assets/popup_detail_icons/detail_icons/up.svg"
                    />{" "}
                    {niceBytes(device?.kbps?.send_30s)}
                  </span>
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "5px 0px",
                }}
              >
                <img
                  alt=""
                  src="/assets/devices/resolution.svg"
                  style={{ margin: "0px 10px" }}
                />
                <Typography
                  style={{
                    color: "#E1E7EA",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Resolution:
                </Typography>
                <Typography
                  style={{
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  {device?.video?.height}x{device?.video?.width} / 29.97p
                </Typography>
              </div>
            </li>
            <Divider
              orientation="vertical"
              flexItem
              style={{
                alignSelf: "auto",
                backgroundColor: "#143F63",
                width: "2px",
              }}
            />
            <li style={{ width: "52%", paddingLeft: "10px" }}>
              <Typography
                style={{
                  color: "#E1E7EA",
                  fontFamily: "URW DIN",
                  fontWeight: 400,
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                Audio
              </Typography>
              <div
                style={{
                  display: "flex",
                  padding: "5px 0px",
                }}
              >
                <img
                  alt=""
                  src="/assets/devices/codec.svg"
                  style={{ margin: "0px 10px" }}
                />
                <Typography
                  style={{
                    color: "#E1E7EA",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Codec:
                </Typography>
                <Typography
                  style={{
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  {device?.audio?.codec}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "5px 0px",
                }}
              >
                <img
                  alt=""
                  src="/assets/devices/rate.svg"
                  style={{ margin: "0px 10px" }}
                />
                <Typography
                  style={{
                    color: "#E1E7EA",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Sample rate:
                </Typography>
                <Typography
                  style={{
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  {device?.audio?.sample_rate}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "5px 0px",
                }}
              >
                <img
                  alt=""
                  src="/assets/devices/channel.svg"
                  style={{ margin: "0px 10px" }}
                />
                <Typography
                  style={{
                    color: "#E1E7EA",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Channels:
                </Typography>
                <Typography
                  style={{
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  {device?.audio?.channel}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "5px 0px",
                }}
              >
                <img
                  alt=""
                  src="/assets/devices/profile.svg"
                  style={{ margin: "0px 10px" }}
                />
                <Typography
                  style={{
                    color: "#E1E7EA",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  Profile:
                </Typography>
                <Typography
                  style={{
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                    fontWeight: 400,
                    fontSize: "14px",
                  }}
                >
                  {device?.audio?.profile}
                </Typography>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default InfoButtonPop