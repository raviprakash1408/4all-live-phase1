import React from "react";
import IOSSwitch from "../CustomSwitch";
import { Grid, FormControlLabel } from "@mui/material";
import VideoQualityDrop from "../VideoQualityDrop";
import { useSelector } from "react-redux";

const StreamingPermissios = () => {
  const theme = useSelector((state) => state.theme.themeData);

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={12}
        lg={4}
        sx={{
          marginTop: "-16px",
          // marginBottom: "-16px",
        }}
      >
        <div
          style={{
            borderRight: `2px solid ${theme?.permissions?.border}`,

            paddingLeft: "30px",
            paddingRight: "25px",
          }}
        >
          <p
            style={{
              color: "#88A1AB",
              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
            }}
          >
            Uploading streaming quality
          </p>
          <VideoQualityDrop />
        </div>
      </Grid>
      {/* <Grid
        item
        xs={12}
        md={12}
        lg={4}
        sx={{
          marginTop: "-16px",
          //  marginBottom: "-16px"
        }}
      >
        <div
          style={{
            borderRight: "2px solid #143F63",
            paddingLeft: "30px",
            paddingRight: "25px",
          }}
        >
          <p
            style={{
              color: "#88A1AB",
              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
              marginLeft: "12px",
            }}
          >
            Audio streaming quality
          </p>
          <VideoQualityDrop />
        </div>
      </Grid> */}

      <Grid
        item
        xs={12}
        md={12}
        lg={4}
        sx={{
          marginTop: "-16px",
          //  marginBottom: "-16px"
        }}
      >
        <div
          style={{
            paddingLeft: "30px",
            paddingRight: "25px",
          }}
        >
          <p
            style={{
              color: "#88A1AB",
              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
              marginLeft: "12px",
            }}
          >
            Downloading streaming quality
          </p>
          <VideoQualityDrop />
        </div>
      </Grid>
    </Grid>
  );
};

export default StreamingPermissios;
