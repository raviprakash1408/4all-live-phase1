import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { getSupportedCodec } from "../../utilities/common";

const style_icon = {
  display: "flex",
  width: "15px",
  alignItems: "center",
  justifyContent: "center",
};

const TileConnectivy = ({
  userId,
  type,
  theme,
  is_hover,
  track,
  connectionQuality,
  setconnectionQuality,
}) => {
  const [is_hover_profile, setHoverProfile] = useState(false);
  const [is_hover_connectivy, setHoverConnectivy] = useState(false);
  const [is_hover_copy, setHoverCopy] = useState(false);
  // state for supported codec
  const [supportedCodec, setSupportedCodec] = useState([]);
  const codecs = useSelector((state) => state.codec);

  const info = useSelector((state) => state.info);
  const permissions = useSelector((state) => state.permissions);

  //function for getting remote participant from window.room.participants with userId or track

  // function for checking av1, vp8, vp9 support from browser and returns supported in array

  useEffect(() => {
    // getSupportedCodec();
    window.eventChanel.publish({
      event: "asking for supported codec",
      userId: userId,
    });
  }, []);

  useEffect(() => {
    // find codec by checking userId
    // if(track?.sid != getLocalVideoTrackId()){
    let codec = codecs.codecs.find((item) => item.userId == userId);
    setSupportedCodec(codec?.supportedCodec);
    // }
  }, [codecs, track?.sid, userId]);

  //function for seperating by comma but not for last item from supportedCodec state array

  const getcommaSeperatedCodec = () => {
    let codec = "";
    supportedCodec?.forEach((item, index) => {
      if (index == supportedCodec?.length - 1) {
        codec += item;
      } else {
        codec += item + ", ";
      }
    });
    return codec;
  };

  // function for getting mime type for remote participant

  const getMimeType = (userId) => {
    let mimeType = "";
    window.room.participants.forEach((value, key) => {
      if (key == userId) {
        value.tracks.forEach((track) => {
          if (track.kind == "video") {
            mimeType = track.mimeType;
            //get mimeType after /
            mimeType = mimeType.split("/")[1];
          }
        });
      }
    });
    return mimeType;
  };



  // function for getting remote participant from window.room.participants with userId or track

  const getRemoteParticipant = (userId) => {
    let participant;
    window.room.participants.forEach((value, key) => {
      if (key == userId) participant = value;
    });
    return participant;
  };

  const getLocalVideoTrackId = () => {
    let localId = "";

    window.room.getLocalVideoTracks().forEach((track) => {
      if (track.kind == "video") {
        localId = track.trackSid;
      }
    });
    return localId;
  };

  //function for finding bitrate from stats

  useEffect(() => {
    if (track?.sid == getLocalVideoTrackId()) {
      // track.startMonitor();
      track?.getSenderStats().then((stats) => {
        console.log(stats, "statsstats");
      });
    }
  }, [track]);

  const style_row = {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    color: theme?.font_color_0,
  };

  let status = info.callStatus;

  useEffect(() => {
    if (track?.sid == getLocalVideoTrackId()) {
      setconnectionQuality(window.room.localParticipant._connectionQuality)
    } else {
      setconnectionQuality(getRemoteParticipant(userId)?.connectionQuality)
    }
  }, [setconnectionQuality, track?.sid, userId]);


  return (
    <ClickAwayListener
      onClickAway={() => {
        setHoverProfile(false);
      }}
    >
      <div
        style={{
          // position: type === "staged" ? "static" : "absolute",
          // display: is_hover ? "flex" : "none",
          display: "flex",
          flexDirection: "column",
          width: "auto",
          height: "auto",
          // top: type === "staged" ? `${positionTop - 59}px` : "10px",
          // left: type === "staged" ? "210px" : "50px",
          backgroundColor: theme?.bg_color_0,
          borderRadius: "4px",
          zIndex: "30",
          fontFamily: "URW DIN REGULAR",
          fontWeight: 400,
          marginTop: type === "staged" ? "-18px" : "-10px",
          marginLeft: type === "staged" ? "120px" : "-17px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "-10px",
            width: "10px",
            height: "30px",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            // width: "310px",
            width: "245px",
            // height: "53px",
            height: "0px",
            paddingLeft: "10px",
            paddingRight: "10px",
            backgroundColor: "#012A50",
            // fontSize: "14px",
            fontWeight: "400",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              gap: "10px",
              width: "100%",
              height: "30px",
              backgroundColor: is_hover_profile ? "#008BCD" : "#012243",
              borderRadius: "4px",
              color: is_hover_profile ? "white" : "#88A1AB",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHoverProfile(true)}
          >
            <img
              alt=""
              src={
                "/assets/popup_detail_icons/user" +
                (is_hover_profile ? "_white" : "") +
                ".svg"
              }
            />

            <div>Profile</div>
          </div> */}

          {/* <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              gap: "10px",
              whiteSpace: "nowrap",
              width: "100%",
              height: "30px",
              backgroundColor: is_hover_connectivy ? "#008BCD" : "#012243",
              borderRadius: "4px",
              color: is_hover_connectivy ? "white" : "#88A1AB",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHoverConnectivy(false)}
            onMouseLeave={() => setHoverConnectivy(true)}
          >
            <img
              alt=""
              src={
                "/assets/popup_detail_icons/connectivy" +
                (is_hover_connectivy ? "_white" : "") +
                ".svg"
              }
            />

            <div>Connectivy Results</div>
          </div> */}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            paddingTop: "20px",
            paddingBottom: "20px",
            paddingLeft: "15px",
            paddingRIght: "15px",
          }}
        >
          {/* <div style={style_row}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={style_icon}>
                <img
                  alt=""
                  src="/assets/popup_detail_icons/detail_icons/public_video_link.svg"
                />
              </div>

              <div style={{ marginLeft: "10px" }}>Public link: </div>
            </div>
            <div
              style={{
                // position: "absolute",
                display: "flex",
                width: "125px",
                height: "30px",
                // top: "10px",
                // right: "20px",
                // backgroundColor: is_hover_copy ? "#008BCD" : "#012243",
                color: is_hover_copy ? "white" : "#88A1AB",
                border: "2px solid",
                borderColor: is_hover_copy ? "#008BCD" : theme?.bg_color_4,
                borderRadius: "4px",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(track, "track");
                navigator.clipboard.writeText(
                  window.location.origin +
                    "/track" +
                    window.location.pathname +
                    "/" +
                    track?.sid
                );
              }}
              // onMouseEnter={() => setHoverCopy(true)}
              // onMouseLeave={() => setHoverCopy(false)}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                }}
              >
                Copy link
              </div>

              <div
                style={{
                  display: "flex",
                  width: "30px",
                  minWidth: "30px",
                  height: "30px",
                  color: "#012A50",
                  backgroundColor: is_hover_copy
                    ? "#008BCD"
                    : theme?.bg_color_4,
                  border: "2px solid",
                  borderColor: is_hover_copy ? "#008BCD" : theme?.bg_color_4,
                  borderRadius: "4px",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                }}
              >
                <img
                  alt=""
                  src={
                    "/assets/popup_detail_icons/detail_icons/copy" +
                    (is_hover_copy ? "_white" : "") +
                    ".svg"
                  }
                />
              </div>
            </div>
          </div> */}
          {/* <div style={style_row}>
            <div style={style_icon}>
            <img
                alt=""
                src="/assets/popup_detail_icons/detail_icons/connection.svg"
              />
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigator.clipboard.writeText(
                  window.location.origin +
                    "/track" +
                    window.location.pathname +
                    "/" +
                    track?.sid
                );
              }}
            >
              Copy Public Link{" "}
            </button>
          </div> */}
          <div style={style_row}>
            <div style={style_icon}>
              <img
                alt=""
                src="/assets/popup_detail_icons/detail_icons/connection.svg"
              />
            </div>

            <div>Connection: </div>

            <div
              style={{
                color:
                  connectionQuality == "excellent" ||
                    connectionQuality == "good"
                    ? "#08CF6F"
                    : // : connectionQuality == "good"
                    // ? "#CFBB08"
                    "#CF4408",
              }}
            >
              {connectionQuality}
              {/* {track?.sid == getLocalVideoTrackId()
                ? window.room.localParticipant._connectionQuality
                : getRemoteParticipant(userId)?.connectionQuality} */}
            </div>
          </div>
          {/* <div style={style_row}>
            <div style={style_icon}>
              <img
                alt=""
                src="/assets/popup_detail_icons/detail_icons/bitrate.svg"
              />
            </div>

            <div>Bitrate: </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                color: theme?.font_color_3,
              }}
            >
              <img
                alt=""
                src="/assets/popup_detail_icons/detail_icons/down.svg"
              />
              <div>{remoteStatus[userId]?.bitrate?.download}kbps</div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                color: theme?.font_color_3,
              }}
            >
              <img
                alt=""
                src="/assets/popup_detail_icons/detail_icons/up.svg"
              />
              <div>{remoteStatus[userId]?.bitrate?.upload}kbps</div>
            </div>
          </div> */}
          {/* <div style={style_row}>
            <div style={style_icon}>
              <img
                alt=""
                src="/assets/popup_detail_icons/detail_icons/packet_loss.svg"
              />
            </div>

            <div>Packet loss: </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                color: theme?.font_color_3,
              }}
            >
              <img
                alt=""
                src="/assets/popup_detail_icons/detail_icons/down_blue.svg"
              />
              <div>{remoteStatus[userId]?.download}%</div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                color: theme?.font_color_3,
              }}
            >
              <img
                alt=""
                src="/assets/popup_detail_icons/detail_icons/up.svg"
              />
              <div>{remoteStatus[userId]?.upload}%</div>
            </div>
          </div> */}

          {track?.sid == getLocalVideoTrackId() ? (
            <></>
          ) : (
            <div style={style_row}>
              <div style={style_icon}>
                <img
                  alt=""
                  src="/assets/popup_detail_icons/detail_icons/letency.svg"
                />
              </div>

              <div>Codec </div>
              <div style={{ color: theme?.font_color_3 }}>
                {getMimeType(userId)}
              </div>
            </div>
          )}
          <div style={style_row}>
            <div style={style_icon}>
              <img
                alt=""
                src="/assets/popup_detail_icons/detail_icons/letency.svg"
              />
            </div>
            <div>Supported Codec </div>
            <div style={{ color: theme?.font_color_3 }}>
              {track?.sid == getLocalVideoTrackId()
                ? getcommaSeperatedCodec(getSupportedCodec())
                : getcommaSeperatedCodec(supportedCodec)}
            </div>
          </div>

          {/* <div style={style_row}>
            <div style={style_icon}>
              <img
                alt=""
                src="/assets/popup_detail_icons/detail_icons/letency.svg"
              />
            </div>

            <div>Latency: </div>
            <div style={{ color: theme?.font_color_3 }}>
              {remoteStatus[userId]?.jvbRTT
                ? remoteStatus[userId]?.jvbRTT / 2
                : 0}
              ms
            </div>
          </div>
          <div style={style_row}>
            <div style={style_icon}>
              <img
                alt=""
                src="/assets/popup_detail_icons/detail_icons/e2e_rtt.svg"
              />
            </div>

            <div>E2E RTT: </div>
            <div style={{ color: theme?.font_color_3 }}>
              {remoteStatus[userId]?.jvbRTT}ms
            </div>
          </div>
          <div style={style_row}>
            <div style={style_icon}>
              <img src="/assets/popup_detail_icons/detail_icons/jitter.svg" />
            </div>

            <div>Jitter: </div>
            <div style={{ color: "#FF5D17" }}>20ms</div>
          </div> */}
          {track?.sid == getLocalVideoTrackId() ? (
            track?.constraints.width == undefined ||
              track?.constraints.height == undefined ? (
              <></>
            ) : (
              <div style={style_row}>
                <div style={style_icon}>
                  <img
                    alt=""
                    src="/assets/popup_detail_icons/detail_icons/resolution.svg"
                  />
                </div>

                <div>Resolution </div>
                <div style={{ color: theme?.font_color_3 }}>
                  {track.isMuted
                    ? "No Video"
                    : `${track?.constraints.width}  X  ${track?.constraints.height}`}
                </div>
              </div>
            )
          ) : (
            track.lastDimensions?.width == undefined || track.lastDimensions?.height == undefined ?
              (<></>) :
              (<div style={style_row}>
                <div style={style_icon}>
                  <img
                    alt=""
                    src="/assets/popup_detail_icons/detail_icons/resolution.svg"
                  />
                </div>

                <div>Resolution </div>
                <div style={{ color: theme?.font_color_3 }}>
                  {track.isMuted
                    ? "No Video"
                    : track.lastDimensions?.width +
                    " X " +
                    track.lastDimensions?.height}
                </div>
              </div>)

          )}

          {/* <div style={style_row}>
            <div style={style_icon}>
              <img
                alt=""
                src="/assets/popup_detail_icons/detail_icons/resolution.svg"
              />
            </div>

            <div>Resolution </div>
            {track?.sid == getLocalVideoTrackId() ? (
              <div style={{ color: theme?.font_color_3 }}>
                {track.isMuted
                  ? "No Video"
                  : `${track?.constraints.width}  X  ${track?.constraints.height}`}
              </div>
            ) : (
              <div style={{ color: theme?.font_color_3 }}>
                {track.isMuted
                  ? "No Video"
                  : track.lastDimensions?.width +
                    " X " +
                    track.lastDimensions?.height}
              </div>
            )}
          </div> */}

          {/* <div style={style_row}>
            <div style={style_icon}>
              <img
                alt=""
                src="/assets/popup_detail_icons/detail_icons/frame_rate.svg"
              />
            </div>

            <div>Frame Rate: </div>
            <div style={{ color: theme?.font_color_3 }}>
              {(status.framerate && status.framerate.hasOwnProperty(userId)
                ? status.framerate[userId][
                    Object.keys(status.framerate[userId])[0]
                  ]
                : 0) + " fps"}
            </div>
          </div>

          <div style={style_row}>
            <div style={style_icon}>
              <img src="/assets/popup_detail_icons/detail_icons/codecs.svg" />
            </div>

            <div>Codecs (A/V): </div>
            <div style={{ color: theme?.font_color_3 }}>opus, VP9</div>
          </div> */}
          <div style={style_row}>
            <div style={style_icon}>
              <img
                alt=""
                src="/assets/popup_detail_icons/detail_icons/participant_id.svg"
              />
            </div>

            <div>Participant id: </div>
            <div style={{ color: theme?.font_color_3 }}>{userId}</div>
          </div>
          {/* <div
                    style={ style_row }
                >
                    <div style={ style_icon } >
                        <img
                            src="/assets/popup_detail_icons/detail_icons/report.svg"
                        />
                    </div>

                    <div>Report</div>
                </div> */}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default TileConnectivy;
