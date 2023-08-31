import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { OutlinedInput  } from '@mui/material';
import { useSelector } from 'react-redux';

  
const TogglePassword = () => {
  const theme = useSelector(state => state.theme.themeData)

  const [values, setValues] = React.useState({
    password: "password",
    showPassword: false,
  });
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  return (
   
      
         
      
      <OutlinedInput
        type={values.showPassword ? "text" : "password"}
        sx={{color: theme?.spaces?.mainColor, border:'1px solid',borderColor:theme?.login?.secondaryColor, fontSize:'14px', fontWeight:'400', height: '40px'}}
        onChange={handlePasswordChange("password")}
        value={values.password}
        fullWidth
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <Visibility style={{fill:theme?.spaces?.mainColor}}/> : <VisibilityOff style={{fill:theme?.spaces?.mainColor}}/>}
            </IconButton>
          </InputAdornment>
        }
      />

  );
};
  
export default TogglePassword;