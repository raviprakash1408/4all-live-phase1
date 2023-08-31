import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { MaterialUISwitch } from "../components/muiSwitch";
// import { getTheme } from '../utilities/theme';
import { setTheme } from "../utilities/theme";
import LoginForm from "./LoginForm";
import { useDispatch } from "react-redux";
import RegisterForm from "./RegisterForm";
import AuthFooter from "./AuthFooter";

const AutLayout = () => {
  // get theme from theme.js
  const theme = useSelector((state) => state.theme.themeData);
  const style = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "absolute",
        backgroundColor: theme?.table?.headerColor,
      }}
    >
      {/* <img alt="Authbg" src={theme?.login?.bgImg} className="Authbg" draggable="false" /> */}

      <MaterialUISwitch
        mode={style}
        sx={{ m: 3 }}
        onChange={() => {
          if (style === "dark") {
            setTheme("light", dispatch);
          } else {
            setTheme("dark", dispatch);
          }
        }}
        defaultChecked
      />
      <img
        alt="Authlogo"
        src={theme?.login?.logoImg}
        className="Authlogo"
        draggable="false"
      />
      <LoginForm />
      {/* <div
        style={{
          top: "50%",
          right: "21px",
          margin: "auto 0",
          position: "absolute",
          width: "70px",
          height: "70px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme?.login?.iconColor,
          borderRadius: "50%",
        }}
      >
        <img src={theme?.login?.iconImg} />
      </div> */}
      <div>
        <AuthFooter />
      </div>
    </div>
  );
};

export default AutLayout;
