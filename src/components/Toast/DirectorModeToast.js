import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DirectorModeToast() {
  const directorLeft = useSelector((state) => state.conference.directorLeft);
  const [msg, setmsg] = useState("");
  const [openmsg, setOpen] = useState(false);

  useEffect(() => {
    if (directorLeft) {
      setOpen(true);
      setmsg("Director has left the meeting. You can become the director now");
    }
  }, []);

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
      setOpen(false);
   
  };
  return (
    <div>
      <Snackbar
        open={openmsg}
        autoHideDuration={3000}
        onClose={handleCloseToast}
      >
        {/* <Alert onClose={handleCloseToast} severity={props.updateStatus?props.updateStatus:"info"} sx={{ width: '100%' }}>
        {props.message}
        </Alert> */}
        <Alert
          onClose={handleCloseToast}
          severity={"success"}
          style={{
            background: "#008BCD",
          }}
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default DirectorModeToast;
