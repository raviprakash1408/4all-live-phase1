import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PopUp(props) {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.themeData);
  return (
    <Dialog
      open={props.openEndDialoge}
      // TransitionComponent={Transition}

      keepMounted
      onClose={props.handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            backgroundColor: theme?.bg_color_0,
          },
        },
        zIndex: 10000,
      }}
    >
      {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
      <DialogContent
        style={{
          backgroundColor:theme?.login?.primaryColor,


          color: "white",
        }}
      >
        <DialogContentText
          style={{
            color: theme?.loby?.textColor,
            fontFamily: "URW DIN REGULAR !important",
            fontSize: "14px !important",
          }}
          id="alert-dialog-slide-description"
        >
          {props.message}

          {props.messageType == "duplicateRoom" && (
            <div>
              <Input type="text" />
            </div>
          )}
        </DialogContentText>
      </DialogContent>
      {!props.disableButtons && (
        <DialogActions
          style={{
            backgroundColor:theme?.login?.primaryColor,
          }}
        >
          <Button
            onClick={props.handleClose}
            style={{ color: theme?.common?.color3 }}
            id="LeaveNo"
          >
            No
          </Button>
          <Button
            onClick={() => {
              props.handleYes();
              props.handleClose();
            }}
            style={{color: theme?.common?.color3 }}
            id="LeaveYes"
          >
            {props.messageType == "duplicateRoom" ? "Join" : "Yes"}
          </Button>
        </DialogActions>
      )}

      {props.showSpinner && (
        <div
          className="loader-container"
          style={{
            height: "20vh",
            backgroundColor: "rgb(3, 46, 87)",
            position: "relative",
          }}
        >
          <div
            style={{
              borderColor: "#E1E7EA transparent",
            }}
            className="spinner"
          ></div>
        </div>
      )}
    </Dialog>
  );
}

export default PopUp;
