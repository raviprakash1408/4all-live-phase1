import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector } from 'react-redux';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Toast(props) {
  const theme = useSelector(state => state.theme.themeData)


// const [openToast, setOpenToast] = React.useState(false);

  const handleClickToast = () => {
    props.setOpenToast(true);
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.setOpenToast(false);
  };
  return (
    <div>
      <Snackbar
        open={props.openToast}
        autoHideDuration={3000}
        onClose={handleCloseToast}
      >
        {/* <Alert onClose={handleCloseToast} severity={props.updateStatus?props.updateStatus:"info"} sx={{ width: '100%' }}>
        {props.message}
        </Alert> */}
        <Alert
          onClose={handleCloseToast}
          severity={props.type == "error" ? "error" : "success"}
          style={{ background: props.type == "error" ? theme?.button_color_1 : theme?.team?.bgColor,color:theme?.team?.color }}
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Toast

