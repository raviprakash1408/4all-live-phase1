import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearbarEvent = ({ handleChange, inputValue, setinputValue, type }) => {
  const theme = useSelector((state) => state.theme.themeData);
  let drawerLocal = localStorage.getObject("drawer");
  let draweValues = JSON.parse(drawerLocal);
  console.log(draweValues, "draweValues");
  return (
    <Box
      component="form"
      sx={{
        p: "2px 2px",
        display: "flex",
        alignItems: "center",
        width: type == "edit" ? 190 : 220,
        height: "34px",
        backgroundColor: theme?.table?.buttonbgColor,
        border:
          type == "edit"
            ? "2px solid ${theme.spacescolor.searchspacebordercolor}`"
            : `2px solid ${theme.spacescolor.searchspacebordercolor}`,
        borderRadius: "4px",
        marginTop: type == "edit" ? "5px" : "20px",
        marginBottom: type == "edit" ? "5px" : "",
        zIndex: "5",
      }}
    >
      <IconButton
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
        style={{ color: "#88A1AB" }}
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={type == "edit" ? "Search users" : "Search space"}
        inputProps={{ "aria-label": "Search event" }}
        value={inputValue}
        onChange={(event) => {
          handleChange(event);
          setinputValue(event.target.value);
        }}
        style={{
          fontSize: "14px",
          color: theme?.spaces?.mainColor,
          fontFamily: "URW DIN REGULAR",
        }}
      />
    </Box>
  );
};

export default SearbarEvent;
