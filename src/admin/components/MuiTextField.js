import React from 'react'
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';

const MuiTextField = (props) => {
  const theme = useSelector(state => state.theme.themeData)

  return (
    <TextField
      id="outlined-basic"
      label=""
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": {
          fontSize: props.font === "medium" ? "16px" : "14px",
          height: "40px",
          marginTop: "-5px",
          paddingLeft: "12px",
        },
        "& .MuiOutlinedInput-root": {
          fontSize: props.font === "medium" ? "16px" : "14px",
          height: "40px",
          marginTop: "1px",
        },

        "& .MuiOutlinedInput-input": {
          fontFamily: "URW DIN REGULAR",
          fontSize: props.font === "medium" ? "16px" : "14px",

          color: theme?.profile?.primaryColor,
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border: props.nameExists ? "1px solid" : "2px solid",
          borderLeft: props.borderleft === "none" ? "none" : "",
          borderColor: props.nameExists
            ? "#ae0000"
            : theme?.login?.secondaryColor,
          borderRadius: props.borderleft === "none" ? "0px 4px 4px 0px" : "4px",
          color: theme?.profile?.primaryColor,
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border: props.nameExists ? "1px solid" : "2px solid",
          borderLeft: props.borderleft === "none" ? "none" : "",
          borderColor: props.nameExists
            ? "#ae0000"
            : theme?.login?.secondaryColor,
          borderRadius: props.borderleft === "none" ? "0px 4px 4px 0px" : "4px",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            border: props.nameExists ? "1px solid" : "2px solid",
            borderLeft: props.borderleft === "none" ? "none" : "",
            borderColor: props.nameExists
              ? "#ae0000"
              : theme?.login?.secondaryColor,
            borderRadius:
              props.borderleft === "none" ? "0px 4px 4px 0px" : "4px",
          },
      }}
      placeholder={props.placeholder}
      InputLabelProps={{
        style: { color: "#5D7C90" },
      }}
      name="text"
      {...props}
    />
  );
}

export default MuiTextField