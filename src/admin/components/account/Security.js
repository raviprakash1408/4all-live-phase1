import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Button,
  Grid,
  Divider,
  Stack,
  InputLabel,
  TextField,
} from "@mui/material";
import InputAdornment from "@material-ui/core/InputAdornment";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import IconButton from "@material-ui/core/IconButton";

const UserSecurity = (props) => {
  const theme = useSelector((state) => state.theme.themeData);
   const userArr = props.user;
   console.log(userArr, "userArr");

   const [changedval, setChangedval] = useState({});
   const [registerPassword, setRegisterPassword] = useState();
   const [cPassword, setCPassword] = useState("");
   const [showErrorMessage, setShowErrorMessage] = useState(false);
   const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const [values, setValues] = React.useState({
     password: "",
     showPassword: false,
   });

   const handleClickShowPassword3 = () => {
     setValues({ ...values, showPassword: !values.showPassword });
   };

   const handlePasswordChange = (prop) => (event) => {
     setValues({ ...values, [prop]: event.target.value });
     setChangedval({ ...changedval, confirm_password: event.target.value });
   };

   const handleClickShowPassword = () => {
     setShowPassword(!showPassword);
   };
   const [showPassword2, setShowPassword2] = useState(false);
   const handleClickShowPassword2 = () => {
     setShowPassword2(!showPassword2);
   };
 
   useEffect(() => {
     if (isCPasswordDirty) {
       if (registerPassword === cPassword) {
         setShowErrorMessage(false);
       } else {
         setShowErrorMessage(true);
       }
     }
   }, [cPassword, registerPassword]);


  return (
    <div style={{ maxWidth: "400px", margin: "0px auto" }}>
      <form>
        <Stack sx={{ marginTop: "55px" }}>
          <InputLabel
            htmlFor="current-password"
            style={{
              color: theme?.spaces?.mainColor,
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            Current password
          </InputLabel>
          <TextField
            autoComplete="on"
            id="current-password"
            label=""
            variant="outlined"
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "14px",
                height: "42px",
                marginTop: "-5px",
              },
              "& .MuiOutlinedInput-root": {
                fontSize: "14px",
                height: "42px",
                marginTop: "1px",
              },

              "& .MuiOutlinedInput-input": {
                fontFamily: "URW DIN REGULAR",
                fontSize: "14px",

                color: theme?.profile?.primaryColor,
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",

                borderColor: "#143F63",

                borderRadius: "4px",
                color: theme?.profile?.primaryColor,
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  border: "2px solid",

                  borderColor: "#143F63",

                  borderRadius: "4px",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: "2px solid",

                  borderColor: "#143F63",

                  borderRadius: "4px",
                },
            }}
            InputLabelProps={{
              style: { color: "#5D7C90" },
            }}
            InputProps={{
              endAdornment: (
                <div
                  onClick={handleClickShowPassword3}
                  style={{ cursor: "pointer" }}
                >
                  {values.showPassword ? (
                    <EyeOutlined
                      style={{ color: "#88A1AB", fontSize: "14px" }}
                    />
                  ) : (
                    <EyeInvisibleOutlined
                      style={{ color: "#88A1AB", fontSize: "14px" }}
                    />
                  )}
                </div>
              ),
            }}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <IconButton
            //         onClick={handleClickShowPassword3}
            //         onMouseDown={handleMouseDownPassword}
            //         edge="end"
            //       >
            //         {values.showPassword ? (
            //           <EyeOutlined
            //             style={{ color: "#88A1AB", fontSize: "14px" }}
            //           />
            //         ) : (
            //           <EyeInvisibleOutlined
            //             style={{ color: "#88A1AB", fontSize: "14px" }}
            //           />
            //         )}
            //       </IconButton>
            //     </InputAdornment>
            //   ),
            // }}
            type={values.showPassword ? "text" : "password"}
            onChange={handlePasswordChange("password")}
            value={values.password}
            placeholder="Enter your current password"
            fullWidth
          ></TextField>
        </Stack>
        <Stack sx={{ marginTop: "20px" }}>
          <InputLabel
            htmlFor="new-password"
            style={{
              color: theme?.spaces?.mainColor,
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            New password
          </InputLabel>

          <TextField
            id="new-password"
            autoComplete="on"
            label=""
            variant="outlined"
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "14px",
                height: "42px",
                marginTop: "-5px",
              },
              "& .MuiOutlinedInput-root": {
                fontSize: "14px",
                height: "42px",
                marginTop: "1px",
              },

              "& .MuiOutlinedInput-input": {
                fontFamily: "URW DIN REGULAR",
                fontSize: "14px",

                color: theme?.profile?.primaryColor,
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",

                borderColor: "#143F63",

                borderRadius: "4px",
                color: theme?.profile?.primaryColor,
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  border: "2px solid",

                  borderColor: "#143F63",

                  borderRadius: "4px",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: "2px solid",

                  borderColor: "#143F63",

                  borderRadius: "4px",
                },
            }}
            InputLabelProps={{
              style: { color: "#5D7C90" },
            }}
            InputProps={{
              endAdornment: (
                <div
                  onClick={handleClickShowPassword2}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword2 ? (
                    <EyeOutlined
                      style={{ color: "#88A1AB", fontSize: "14px" }}
                    />
                  ) : (
                    <EyeInvisibleOutlined
                      style={{ color: "#88A1AB", fontSize: "14px" }}
                    />
                  )}
                </div>
              ),
            }}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <IconButton
            //         aria-label="toggle password visibility"
            //         onClick={handleClickShowPassword2}
            //         onMouseDown={handleMouseDownPassword}
            //         edge="end"
            //         color="secondary"
            //       >
            //         {showPassword2 ? (
            //           <EyeOutlined
            //             style={{ color: "#88A1AB", fontSize: "14px" }}
            //           />
            //         ) : (
            //           <EyeInvisibleOutlined
            //             style={{ color: "#88A1AB", fontSize: "14px" }}
            //           />
            //         )}
            //       </IconButton>
            //     </InputAdornment>
            //   ),
            // }}
            type={showPassword2 ? "text" : "password"}
            placeholder="Enter your password"
            name="password"
            // value={registerpassword}
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
        </Stack>

        <Stack sx={{ marginTop: "20px" }}>
          <InputLabel
            htmlFor="confirm-password"
            style={{
              color: theme?.spaces?.mainColor,
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            Confirm password
          </InputLabel>
          <TextField
            id="confirm-password"
            autoComplete="on"
            label=""
            variant="outlined"
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "14px",
                height: "42px",
                marginTop: "-5px",
              },
              "& .MuiOutlinedInput-root": {
                fontSize: "14px",
                height: "42px",
                marginTop: "1px",
              },

              "& .MuiOutlinedInput-input": {
                fontFamily: "URW DIN REGULAR",
                fontSize: "14px",

                color: theme?.profile?.primaryColor,
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border:
                  showErrorMessage && isCPasswordDirty
                    ? "1px solid"
                    : "2px solid",

                borderColor:
                  showErrorMessage && isCPasswordDirty ? "#ae0000" : "#143F63",

                borderRadius: "4px",
                color: theme?.profile?.primaryColor,
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  border:
                    showErrorMessage && isCPasswordDirty
                      ? "1px solid"
                      : "2px solid",

                  borderColor:
                    showErrorMessage && isCPasswordDirty
                      ? "#ae0000"
                      : "#143F63",

                  borderRadius: "4px",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border:
                    showErrorMessage && isCPasswordDirty
                      ? "1px solid"
                      : "2px solid",

                  borderColor:
                    showErrorMessage && isCPasswordDirty
                      ? "#ae0000"
                      : "#143F63",

                  borderRadius: "4px",
                },
            }}
            InputLabelProps={{
              style: { color: "#5D7C90" },
            }}
            InputProps={{
              endAdornment: (
                <div
                  onClick={handleClickShowPassword}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? (
                    <EyeOutlined
                      style={{ color: "#88A1AB", fontSize: "14px" }}
                    />
                  ) : (
                    <EyeInvisibleOutlined
                      style={{ color: "#88A1AB", fontSize: "14px" }}
                    />
                  )}
                </div>
              ),
            }}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <IconButton
            //         aria-label="toggle password visibility"
            //         onClick={handleClickShowPassword}
            //         onMouseDown={handleMouseDownPassword}
            //         edge="end"
            //         color="secondary"
            //       >
            //         {showPassword ? (
            //           <EyeOutlined
            //             style={{ color: "#88A1AB", fontSize: "14px" }}
            //           />
            //         ) : (
            //           <EyeInvisibleOutlined
            //             style={{ color: "#88A1AB", fontSize: "14px" }}
            //           />
            //         )}
            //       </IconButton>
            //     </InputAdornment>
            //   ),
            // }}
            placeholder="Re-Enter your password"
            fullWidth
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={(event) => {
              setChangedval({
                ...changedval,
                new_password: event.target.value,
              });

              setCPassword(event.target.value);
              setIsCPasswordDirty(true);
            }}
          />

          {showErrorMessage && isCPasswordDirty ? (
            <div style={{ color: "#ae0000", fontSize: "small" }}>
              Password did not match
            </div>
          ) : (
            ""
          )}

          {/* <TogglePassword /> */}
        </Stack>
      </form>
      <Typography
        variant="h5"
        style={{
          color: "#fff",
          fontWeight: "700",
          fontSize: "14px",
          marginTop: "20px",
        }}
      >
        Password must contain:
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: theme?.spaces?.mainColor,
          fontSize: "14px",
          borderBottom: "1px solid",
        }}
      >
        <img
          alt=""
          src="/assets/icons/tick.png"
          style={{ marginRight: "10px" }}
        />
        <p>At least 6 character</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: theme?.spaces?.mainColor,
          fontSize: "14px",
          borderBottom: "1px solid",
        }}
      >
        <img
          alt=""
          src="/assets/icons/tick.png"
          style={{ marginRight: "10px" }}
        />
        <p>At least 1 uppercase letter(A..Z)</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: theme?.spaces?.mainColor,
          fontSize: "14px",
          borderBottom: "1px solid",
        }}
      >
        <img
          alt=""
          src="/assets/icons/tick.png"
          style={{ marginRight: "10px" }}
        />
        <p>At least 1 lowercase letter(a..z)</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: theme?.spaces?.mainColor,
          fontSize: "14px",
          borderBottom: "1px solid",
        }}
      >
        <img
          alt=""
          src="/assets/icons/tick.png"
          style={{ marginRight: "10px" }}
        />
        <p>At least 1 number(0..9)</p>
      </div>
    </div>
  );
}

export default UserSecurity