import { Box, Modal, Typography } from "@mui/material";
import * as React from "react";
import { changeOpacity } from "../../utilities/common";
import Tabs from "./tabs.tsx";

function Devices(props) {
  const [open, setOpen] = React.useState(true);

  const { theme } = props;

  const handleClose = () => {
    setOpen(false);
    props.setmanageDevices(false);
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "rgba(25, 60, 71, 1)",
    border: "none",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    height: "50vh",
    overflowY: "scroll",
  };
  return (
    // <Modal
    //     open={open}
    //     onClose={handleClose}
    //     aria-labelledby="modal-modal-title"
    //     aria-describedby="modal-modal-description"
    //   >
    //     <Box sx={style}>
    //       <Typography sx={{
    //         color: '#fff',
    //       }} id="modal-modal-title" variant="h6" component="h2">
    //       Manage Devices
    //       </Typography>

    //       <Tabs onClose={props.onClose}/>
    //     </Box>
    //   </Modal>
    <div
      style={{
        position: "fixed",
        display: "flex",
        width: "100vw",
        height: "100vh",
        top: "0px",
        left: "0px",
        background: theme?.bg_color_2
          ? changeOpacity(theme?.bg_color_2, 0.6)
          : changeOpacity("rgba(57, 88, 97, 1)", 0.6),
        borderRadius: "4px",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "99",
        userSelect: "none",
      }}
      onClick={() => {
        props.onClose();
      }}
    >
      <div
        style={{
          position: "relative",
          width: "548px",
          height: "80vh",
          maxHeight: "90vh",
          backgroundColor: theme?.bg_color_0
            ? theme?.bg_color_0
            : "rgba(25, 60, 71, 1)",
          borderRadius: "4px",
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          style={{
            position: "absolute",
            display: "flex",
            width: "20px",
            height: "20px",
            top: "-10px",
            right: "-10px",
            backgroundColor: theme?.bg_color_1 ? theme?.bg_color_1 : "#5C7189",
            borderRadius: "25px",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.stopPropagation();
            props.onClose();
          }}
        >
          <img
            alt=""
            src="/assets/icons/x.svg"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(81%) sepia(6%) saturate(202%) hue-rotate(177deg) brightness(105%) contrast(89%)",
            }}
          />
        </div>

        <div
          style={{
            color: "white",
            width: "full",
            fontSize: "18px",
            fontWeight: "600",
            textAlign: "center",
            padding: "30px",
            fontFamily: "URW DIN",
          }}
        >
          Manage Devices
        </div>

        <div
        // className="vertical-scrollbar"
        // style={{
        //   display: "flex",
        //   maxHeight: "calc(100% - 100px)",
        //   flexDirection: "column",
        //   gap: "6px",
        //   overflow: "hidden",
        //   overflowY: "auto",
        // }}
        >
          <Tabs onClose={props.onClose} theme={theme} />
        </div>
      </div>
    </div>
  );
}

export default Devices;
