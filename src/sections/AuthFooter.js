// material-ui
import { useMediaQuery, Container, Link, Typography, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
    const themes = useSelector(state => state.theme.themeData)
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <Container maxWidth="xl" style={{ position: "absolute", bottom: "49px" }}>
      <Stack
        direction={matchDownSM ? "column" : "row"}
        justifyContent={matchDownSM ? "center" : "space-between"}
        spacing={2}
        alignItems={matchDownSM ? "center" : "center"}
        textAlign={matchDownSM ? "center" : "inherit"}
      >
        <Typography
          variant="subtitle2"
          color="secondary"
          component="span"
          style={{
            color: themes?.table?.buttonColor,
            marginLeft: "111px",
            fontFamily: "URW DIN REGULAR",
            zIndex: 2,
          }}
        >
          This site is protected by RE-CAPTCHA and the Google Privacy Policy
        </Typography>
        {/* <img src="/assets/images/poweredby.svg" alt="poweredby" /> */}

        <Stack
          direction={matchDownSM ? "column" : "row"}
          spacing={matchDownSM ? 1 : 3}
          textAlign={matchDownSM ? "center" : "inherit"}
        >
          <Typography
            variant="subtitle2"
            color="secondary"
            underline="hover"
            style={{
              color: themes.login.footerColor,
              fontFamily: "URW DIN REGULAR",
            }}
          >
            Terms and Conditions
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            underline="hover"
            style={{
              color: themes?.table?.buttonColor,
              fontFamily: "URW DIN REGULAR",
            }}
          >
            Privacy Policy
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            underline="hover"
            style={{ color: themes.login.footerColor }}
          >
            CA Privacy Notice
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default AuthFooter;
