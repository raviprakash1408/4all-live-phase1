import React from 'react'
import Snackbar from "@mui/material/Snackbar";

function CopiedToClip({state, handleClose}) {
  const { vertical, horizontal, openCopyToast } = state;

  return (
    <Snackbar
    autoHideDuration={1000}
    anchorOrigin={{ vertical, horizontal }}
    open={openCopyToast}
    key={vertical + horizontal}
    bodyStyle={{ height: 40, flexGrow: 0 }}
    onClose={handleClose}
  >
    <div
      style={{
        backgroundColor: "#008BCD",
        borderRadius: "4px",
        display: "flex",
        zIndex:99999
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "40px",
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTopLeftRadius: "4px",
          borderBottomLeftRadius: "4px",
        }}
      >
        <img src="/assets/admin/copy-link.svg" alt="" />
      </div>
      <p
        style={{
          fontFamily: "URW DIN REGULAR",
          color: "white",
          fontSize: "16px",
          paddingLeft: "10px",
        }}
      >
        Link copied to clipboard
      </p>
      <img
        src="/assets/admin/close-white.svg"
        style={{ padding: "0px 16px", cursor:'pointer' }}
        alt=""
        onClick={handleClose}
      />
    </div>
  </Snackbar>

  )
}

export default CopiedToClip