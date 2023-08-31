import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";

export default function ConfirmPop({
  confirm,
  message,
  handleClickClose,
  handleDelete,
}) {
  const theme = useSelector(state => state.theme.themeData)

  // const [confirm, setConfirm] = React.useState(false);

  // const handleClickOpen = () => {
  //   setConfirm(true);
  // };

  // const handleClickClose = () => {
  //   setConfirm(false);
  // };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={confirm}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "550px",
              backgroundColor: theme?.workflows?.iconsBg,
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "#88A1AB", fontFamily: "URW DIN REGULAR" }}
          >
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClickClose}
            style={{
              color: theme?.common?.color1,
              fontFamily: "URW DIN REGULAR",
            }}
          >
            No
          </Button>
          <Button
            onClick={() => {
              handleDelete();
              handleClickClose();
            }}
            style={{
              color: "#FF1759",
              fontFamily: "URW DIN REGULAR",
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
