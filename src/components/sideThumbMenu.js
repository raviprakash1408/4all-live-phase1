import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import Tile from "./tile";
import { useSelector, useDispatch } from "react-redux";
import SidebarGrid from "./staged_layout/sidebarGrid.tsx";
import { changeOpacity } from "../utilities/common";
import { setLayout, setisMobileStaged } from "../state/conference/conferenceSlice";

// create fc SideThumbMenu
export default function SideThumbMenu(props) {
  const dispatch = useDispatch();

  const [show, setshow] = useState(true);
const eventTheme = useSelector(
  (state) => state.theme.eventTheme[state.theme.theme]
);
  let layout = useSelector((state) => state.conference.layout);
  let hideHeader = useSelector((state) => state.conference.hideHeader);

  useEffect(() => {
    setshow(props.show);
  }, [props.show]);

   const warpperRef = useRef(null);

   useEffect(() => {
     document.addEventListener("mousedown", handleClickOutside);

     return () => {
       document.addEventListener("mousedown", handleClickOutside);
     };
   }, []);

   const handleClickOutside = (event) => {
     const { current: wrap } = warpperRef;
     if (wrap && !wrap.contains(event.target)) {
       setshow(false);
     }
   };
  return (
    <Box>
      <Box
        ref={warpperRef}
        sx={{
          position: "absolute",
          //display:show?"block":"none",
          //top:"6vh",
          top:
            window.mobileCheck() && layout == "stage_layout" && hideHeader
              ? "0px"
              : "58px",
          // paddingTop: "35px",
          //left: show ? "0px" : "-15vw",
          left: show ? "0px" : "-180px",
          //width: '15vw',
          width: "180px",
          //backgroundColor: 'rgba(1, 25, 52, 0.3)',
          backgroundColor: changeOpacity(eventTheme?.bg_color_0, 0.8),
          height:
            window.mobileCheck() && layout == "stage_layout" && hideHeader
              ? "100vh"
              : "100vh-58px",
          transition: "left 0.5s ease-in-out, top 0.5s ease-in-out",
          userSelect: "none",
          zIndex: 2,
        }}
      >
        <SidebarGrid
          remoteVideoTracks={props.remoteVideoTracks}
          remoteAudioTracks={props.remoteAudioTracks}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "45%",
            transform: "translateY(-50%)",
            right: "-25px",
            //left:show?"16vw":"1vw",
            width: "19px",
            height: "25px",
            //padding:"5px",
            //backgroundColor: 'rgba(40, 39, 74, 1)',
            backgroundColor: eventTheme?.bg_color_1,
            borderRadius: "20%",
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(show, "show");
            setshow(!show);
          }}
        >
          <img
            /*style={{
                            width:"15px",
                            height:"15px",
                            cursor:"pointer"
                        }}*/

            /*onClick={()=>{
                            console.log(show,"show");
                            setshow(!show);
                        } }*/

            //src={show ? '/assets/icons/hide.svg':'/assets/icons/show.svg'} className='group-img'
            alt=""
            src={"/assets/icons/mini_arrow_left.svg"}
            //className='group-img'

            style={{
              transform: show ? "rotate(0deg)" : "rotate(180deg)",
            }}
          />
        </Box>
      </Box>
        
    </Box>
  );
}
