import React from "react";
import { LAYOUT_TYPES } from "../../state/conference/conferenceSlice";
import Grid from "../grid";
import SideThumbMenu from "../sideThumbMenu";
import YoutubeShare from "../youtubeShare";

function GetLayout({
  layout,
  handleMouseUp,
  handleMouseMove,
  handleMouseDown,
  primary,
  secondary,
  remoteAudioTracks,
  permissions,
  conference,
  matches,
  left,
  width,
  shareUrl,
  setHover,
  centerStage,
}) {
  let layoutCode = <></>;

  switch (layout) {
    //case LAYOUT_TYPES.DYNAMIC_LAYOUT_VERTICAL:
    case LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL:
      layoutCode = (
        <>
          <div
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{
              width: "100vw",
              height: "100vh",
              maxHeight: "100vh",
              backgroundColor: "#032E57",
              position: "absolute",
              top: "0px",
              left: "0px",
              /*width: '100vw',
                  height: 'calc(100vh - 60px)',
                  maxHeight: 'calc(100vh - 60px)',
                  backgroundColor: '#032E57',
                  position: "absolute",
                  top: "60px",
                  left: "0px"*/
            }}
          >
            <div>
              {/* {Object.keys(primary).length > 0 || "P" == window.room?.getLocalParticipantProperty('user_type')? */}
              <div
                style={{
                  position: "absolute",
                  left: "5px",
                  top: "5.5vh",
                  width: "auto",
                  height: "94vh",
                  //height: 'auto',
                  //overflowY:'scroll',
                  //overflowX:'hidden',
                  backgroundColor: "#032E57",
                  display: "flex",
                  alignItems: "center",
                }}
                id="tier1-grid"
                className="no-scrollbar"
              >
                <Grid
                  margin="0 10px 0 0"
                  type="tier1"
                  user_type="P"
                  tileSize={20}
                  width={width - 2}
                  remoteVideoTracks={primary}
                  remoteAudioTracks={remoteAudioTracks}
                  //overlay_button={ true }
                  overlay_button={false}
                />
              </div>
              {/* : ""} */}

              {/* {Object.keys(secondary).length > 0 || "S" == window.room?.getLocalParticipantProperty('user_type') ?  */}
              <div
                style={{
                  position: "absolute",
                  right: "5px",
                  top: "5.5vh",
                  width: "auto",
                  // height: "auto",
                  height: "94vh",
                  //overflowY:'scroll',
                  //overflowX:'hidden',
                  backgroundColor: "#032E57",
                  display: "flex",
                  alignItems: "center",
                }}
                className="no-scrollbar"
                id="tier2-grid"
              >
                <Grid
                  margin="0 0 0 10px"
                  type="tier2"
                  user_type="S"
                  tileSize={20}
                  width={100 - width}
                  remoteVideoTracks={secondary}
                  remoteAudioTracks={remoteAudioTracks}
                />
              </div>
              {/* : ""} */}

              {/* seperator */}
              <div>
                <div
                  onMouseDown={() => {
                    // if (permissions.drag_horizontal_layout) {
                    //   if (
                    //     conference.directorMode.mode &&
                    //     conference.directorMode.user_id !=
                    //       window.room?.myUserId()
                    //   ) {
                    //     return;
                    //   }
                    //   handleMouseDown();
                    // }
                    if (permissions.drag_horizontal_layout) {
                      handleMouseDown();
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (
                      conference.directorMode.mode &&
                      conference.directorMode.user_id != window.room?.myUserId()
                    ) {
                      return;
                    }
                    document.body.style.cursor = "grab";
                    let seperator = document.getElementById("seperator");
                    if (seperator) {
                      seperator.style.backgroundColor = "#88A1AB";
                      e.target.style.backgroundColor = "#88a1abc9";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (
                      conference.directorMode.mode &&
                      conference.directorMode.user_id != window.room?.myUserId()
                    ) {
                      return;
                    }
                    document.body.style.cursor = "default";

                    let seperator = document.getElementById("seperator");
                    if (seperator) {
                      seperator.style.backgroundColor = "#143F63";
                      e.target.style.backgroundColor = "#143F63";
                      e.target.style.opacity = "0.1";
                    }
                  }}
                  style={{
                    //   height: "100%",
                    width: "18px",
                    backgroundColor: "#143F63",
                    position: "absolute",
                    left: matches ? `${left - 1.46}vw` : `${left - 1.65}vw`,
                    top: "0",
                    opacity: "0.1",
                    height: "100vh",
                    zIndex: "3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                ></div>
                <div
                  id="seperator"
                  className="no-scrollbar"
                  // switch on for mose movement
                  // onMouseDown={ handleMouseDown }
                  style={{
                    position: "absolute",
                    left: `${left - 1}vw`,
                    top: "0",
                    width: "2px",
                    height: "100vh",
                    backgroundColor: "#143F63",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    userSelect: "none",
                    zIndex: "2",
                  }}
                >
                  <div
                    style={{
                      background: "inherit",
                      height: "25px",
                      width: "2px",
                      marginRight: "5px",
                      color: "transparent",
                    }}
                  >
                    .
                  </div>
                  <div
                    style={{
                      background: "inherit",
                      height: "25px",
                      width: "2px",
                      marginLeft: "5px",
                      color: "transparent",
                    }}
                  >
                    .
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
      break;
    //case LAYOUT_TYPES.DYNAMIC_LAYOUT_HORIZONTAL:
    case LAYOUT_TYPES.DYNAMIC_LAYOUT_VERTICAL:
      layoutCode = (
        <>
          <div
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            // onMouseDown={handleMouseDown}

            style={{
              width: "100vw",
              height: "calc(100vh - 60px)",
              maxHeight: "calc(100vh - 60px)",
              backgroundColor: "#032E57",
              position: "absolute",
              top: "60px",
              left: "0px",

              /*width: '100vw',
                  height: '100vh',
                  maxHeight: '100vh',
                  backgroundColor: '#032E57',
                  position: "absolute",
                  top: "0px",
                  left: "0px"*/
            }}
          >
            {/*
              <div>
                <div
                  style={
                    {
                      position: 'absolute',
                      top:"5px",
                      //left:"5px",
                      width:"auto",
                      height:"auto",
                      //overflowY:'scroll',
                      //overflowX:'hidden',
                      backgroundColor: '#032E57',
                    }
                  }
                  
                  id='tier1-grid'
                  className='no-scrollbar'
                >
                  <Grid
                    margin="0 10px 0 0"
                    type="tier1"
                    tileSize={ 20 }
                    width={ width-2 }
                    remoteVideoTracks={ primary }
                    remoteAudioTracks={ remoteAudioTracks }
                    //overlay_button={ true }
                    overlay_button={ false }
                  />
                </div>
              */}

            <div>
              {Object.keys(primary).length > 0 ||
              "P" == localStorage.getObject("user_type") ? (
                <div
                  style={{
                    /*position: 'absolute',
                      left:0,
                      top:"65px",
                      width:"auto",
                      height:"auto",
                      //overflowY:'scroll',
                      //overflowX:'hidden',
                      backgroundColor: '#032E57',*/

                    position: "absolute",
                    top: "5px",
                    //left:"5px",
                    width: "auto",
                    height: "auto",
                    //overflowY:'scroll',
                    //overflowX:'hidden',
                  }}
                  id="tier1-grid"
                  className="no-scrollbar"
                >
                  <Grid
                    margin="0 10px 0 0"
                    type="tier1"
                    user_type="P"
                    tileSize={20}
                    width={width - 2}
                    remoteVideoTracks={primary}
                    remoteAudioTracks={remoteAudioTracks}
                    //overlay_button={ true }
                    overlay_button={false}
                    l_vertical={true}
                  />
                  {/* <PackedGrid
         
         boxAspectRatio={16 / 9}
         className="fullscreen2"
         remoteVideoTracks={remoteVideoTracks}
         remoteAudioTracks={remoteAudioTracks}
       >


         {tiles}


       </PackedGrid> */}
                </div>
              ) : (
                ""
              )}

              <div
                style={{
                  position: "absolute",
                  bottom: "5px",
                  // top:"5px",
                  width: "auto",
                  height: "auto",
                  //overflowY:'scroll',
                  //overflowX:'hidden',
                  backgroundColor: "#032E57",
                }}
                id="tier2-grid"
                className="no-scrollbar"
              >
                <Grid
                  margin="0 0 0 10px"
                  type="tier2"
                  tileSize={20}
                  width={100 - width - 2}
                  remoteVideoTracks={secondary}
                  remoteAudioTracks={remoteAudioTracks}
                />
              </div>

              {/* seperator */}
              <div
                id="seperator2"
                className="no-scrollbar"
                // switch on for mose movement
                onMouseDown={() => {
                  console.log(
                    permissions.drag_vertical_layout,
                    "permissions.drag_vertical_layout"
                  );
                  if (permissions.drag_vertical_layout) {
                    handleMouseDown();
                  }
                }}
                onMouseEnter={() => {
                  document.body.style.cursor = "grab";
                  let seperator = document.getElementById("seperator2");
                  if (seperator) {
                    seperator.style.backgroundColor = "#88A1AB";
                  }
                }}
                onMouseLeave={() => {
                  document.body.style.cursor = "default";

                  let seperator = document.getElementById("seperator2");
                  if (seperator) {
                    seperator.style.backgroundColor = "#143F63";
                  }
                }}
                style={{
                  position: "absolute",
                  top: `${left}vh`,
                  left: "0",
                  width: "100vw",
                  height: "2px",
                  backgroundColor: "#88A1AB",

                  userSelect: "none",
                }}
              />
            </div>
          </div>
        </>
      );
      break;
    case LAYOUT_TYPES.SHARE_LAYOUT:
      layoutCode = (
        <>
          <SideThumbMenu />
          <YoutubeShare ShareUrl={shareUrl} />
        </>
      );
      break;
    case LAYOUT_TYPES.STAGE_LAYOUT:
      layoutCode = (
        <>
          <div
            style={{
              width: "100vw",
              height: "100vh",
              maxHeight: "100vh",
              //height: 'calc(100vh - 60px)',
              //maxHeight: 'calc(100vh - 60px)',
              //overflow: "hidden",
              backgroundColor: "#032E57",
              position: "absolute",
              top: "0px",
              left: "0px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {centerStage.enabled ? (
              <div
                style={{
                  width: "100vw",
                  height: "100vh",
                  maxHeight: "100vh",
                  //height: 'calc(100vh - 60px)',
                  //maxHeight: 'calc(100vh - 60px)',
                  //overflow: "hidden",
                  backgroundColor: "#032E57",
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  style={{ display: "flex" }}
                >
                  <MpegtsPlayer
                    volume={volumeStaged}
                    ShareUrl={centerStage.url}
                  />
                </div>
                <div
                  style={{
                    display: !is_hover ? "none" : "flex",
                  }}
                >
                  <div
                    onMouseEnter={() => {
                      setHover(true);
                    }}
                    onMouseLeave={() => {
                      setHover(false);
                    }}
                    style={{
                      position: "absolute",
                      display: "flex",
                      width: "135px",
                      height: "40px",
                      bottom: "140px",
                      right: "40px",
                      backgroundColor: "#012A50",
                      borderRadius: "4px",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      zIndex: "10",
                    }}
                    // onClick={(e) => {
                    //   e.stopPropagation();
                    //   setstreamAudio(!streamAudio);
                    //   if (!streamAudio) {
                    //     setvolume(0);
                    //   }
                    // }}
                  >
                    <img
                      alt=""
                      src={
                        // streamAudio
                        //   ? "/assets/bottomIcons/three_dots/no_audio.svg"
                        //   :
                        "/assets/bottomIcons/three_dots/audio.svg"
                      }
                      style={{
                        width: "18px",
                        // filter: streamAudio
                        //   ? "brightness(0) saturate(100%) invert(9%) sepia(51%) saturate(3191%) hue-rotate(196deg) brightness(93%) contrast(99%)"
                        //   : "",
                      }}
                    />
                    {/* {!streamAudio && ( */}
                    <Slider
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      aria-label="Volume"
                      value={volumeStaged}
                      onChange={(e) => {
                        console.log(e);
                        setvolumeStaged(e.target.value);
                      }}
                      sx={{
                        width: 76,
                        color: "#008BCD",
                        height: 2,
                        marginLeft: "15px",
                        borderRadius: "0px",
                        // marginLeft: "20px",

                        "& .MuiSlider-thumb": {
                          border: "2px solid",
                          borderColor: "#008BCD",
                          color: "#E1E7EA",
                          // boxShadow: '0 0 0 2px rgba(0, 255, 0, 0.3) !important'
                          width: "17px",
                          height: "17px",
                        },
                        "& .MuiSlider-thumb:hover": {
                          // boxShadow: "0 0 0 4px rgba(0, 139, 205, 0.1) !important",
                        },
                      }}
                    />
                    {/* )} */}
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  width: "100vw",
                  height: "100vh",
                  maxHeight: "100vh",
                  //height: 'calc(100vh - 60px)',
                  //maxHeight: 'calc(100vh - 60px)',
                  //overflow: "hidden",
                  backgroundColor: "#032E57",
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {showVideo ? (
                  <video
                    disablePictureInPicture
                    style={{
                      // position: "absolute",
                      // margin: "auto",
                      // top: "60px",
                      // //margin:'0px',
                      // width: "80vw",
                      // height: "auto",
                      // //height:'90%',
                      aspectRatio: 16 / 9,
                    }}
                    width="100%"
                    height="100%"
                    autoPlay
                    id={`active-video`}
                  />
                ) : (
                  <div
                    style={{
                      border: "none",
                      margin: "auto",
                      width: props.width,
                      //height: props.height,
                      maxWidth: props.width,
                      //maxHeight: props.height,
                      minWidth: props.width,
                      aspectRatio: 16 / 9,
                      backgroundColor: "#143F63",
                      borderRadius: "4px",
                      position: "relative",
                    }}
                    className="no-select"
                  >
                    <div
                      style={{
                        width: "22%",
                        height: "40%",
                        borderRadius: "50%",
                        backgroundColor: "#012243",
                        position: "absolute",
                        top: "44%",
                        right: "50%",
                        transform: "translate(50%,-50%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        className="no-select"
                        style={{
                          textAlign: "center",
                          color: "#88A1AB",
                          fontSize: !!props.i_hide ? "100%" : "150%",
                        }}
                      >
                        {userShortName}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <SideThumbMenu show={false} />
          </div>
        </>
      );
      break;
    case LAYOUT_TYPES.DYNAMIC_GRID_LAYOUT:
      // layoutCode = <DynamicGrid>{tiles}</DynamicGrid>;

      layoutCode = (
        <Grid
          margin="0 0 0 10px"
          type="tier2"
          isDynamic={true}
          tileSize={20}
          width={100 - 2}
          remoteVideoTracks={{ ...primary, ...secondary }}
          remoteAudioTracks={remoteAudioTracks}
        />
      );
      break;
    default:
      layoutCode = (
        <>
          <SideThumbMenu />
          <YoutubeShare ShareUrl={shareUrl} />
        </>
      );
  }

  return layoutCode;
}

export default GetLayout;
