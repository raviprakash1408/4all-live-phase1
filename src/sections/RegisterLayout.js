import React from 'react'
import { useSelector } from 'react-redux';
import { MaterialUISwitch } from '../components/muiSwitch';
import { setTheme } from '../utilities/theme';
import { useDispatch } from 'react-redux';
import RegisterForm from './RegisterForm';
import AuthFooter from './AuthFooter';
import { Helmet } from "react-helmet";


const RegisterLayout = () => {
    // get theme from theme.js
    const theme = useSelector(state => state.theme.themeData)
    const style = useSelector(state => state.theme.theme)
    const dispatch = useDispatch()

    
    return (
      <>
        <Helmet>
          <title>{theme?.login?.title}</title>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={theme?.login?.favicon180x180}
          />

          <link
            rel="apple-touch-icon"
            sizes="512x512"
            href={theme?.login?.favicon512x512}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={theme?.login?.favicon32x32}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={theme?.login?.favicon16x16}
          />

         
        </Helmet>
        <div
          style={{
            height: "100vh",
            width: "100%",
            position: "absolute",
            backgroundColor: theme?.table?.headerColor,
          }}
        >
          {/* <img alt="Authbg" src={theme?.login?.bgImg} className="Authbg" /> */}
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
          />
          <RegisterForm />
          <div
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
          </div>
          <div>
            <AuthFooter />
          </div>
        </div>
      </>
    );
}

export default RegisterLayout