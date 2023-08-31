import { Button, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import React, {useEffect} from 'react'

//create fc EventWaiting
export default function ErrorPage(props) {
  const navigate = useNavigate();

  const theme = useSelector(state => state.theme.themeData)
  useEffect(()=>{
    document.title = theme?.login?.title
   },[])
   useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = theme?.login?.favicon32x32;
  }, []);
  return (
    <div
      style={{
        // backgroundImage: `url("assets/images/waiting_bg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
      //   className="eventWaiting"
    >
      {/* round image on center */}

      <div
        style={{
          position: "absolute",
          backgroundColor: theme?.waiting?.primaryColor,
          height: "100vh",
          width: "100%",
        }}
      ></div>

      {/* <img src="assets/images/404.png" alt="fox" style={{
           
           position: 'absolute',
              top: '20vh',
              left: '50%',
            transform: 'translateX(-50%)',
            width:'391px',
            height:'140px'
            // borderRadius:'50%',
            // border: '10px solid #008BCD'
            

        }}
        className="eventImg"
/> */}
      <div
        style={{
          position: "absolute",
          top: "18vh",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div
          style={{
            fontSize: "180px",
            fontFamily: "URW DIN",
            color: "#008BCD",
          }}
        >
          404
        </div>

        <div
          style={{
            //   position: "absolute",
            //   top: "46vh",
            //   left: "50%",
            //   transform: "translateX(-50%)",
            fontFamily: "URW DIN",
            color: theme?.waiting?.mainColor,
            fontSize: "40px",
            marginTop: "-43px",
          }}
          //   variant="h4"
          //   className="eventHeading"
        >
          Page Not Found
        </div>
      </div>
      <img
        src="/assets/images/404.svg"
        alt="fox"
        style={{
          position: "absolute",
          top: "54vh",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "100px",
          objectFit: "cover",
          // borderRadius:'50%',
          // border: '10px solid #008BCD'
        }}
        className="eventImg"
      />

      <div
        style={{
          position: "absolute",
          top: "76vh",
          left: "50%",
          transform: "translateX(-50%)",
          color: theme?.waiting?.mainColor,
        }}
      >
        <Typography
          variant="h7"
          className="countDownDes"
          style={{ fontFamily: "URW DIN REGULAR", fontSize: "16px" }}
        >
          The page you are looking was moved, removed, renamed, or might never
          exist!
        </Typography>
      </div>

      <div
        style={{
          position: "absolute",
          top: "84vh",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Button
          variant="contained"
          style={{
            textTransform: "none",
            padding: "9px 43px",
            fontSize: "16px",
            lineHeight: "22px",
            backgroundColor: theme?.login?.mainColor,
            marginRight: "21px",
            borderRadius: "4px",
            color: "white",
            fontFamily: "URW DIN REGULAR",
          }}
          onClick={() => (window.location.href = "/")}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
}








