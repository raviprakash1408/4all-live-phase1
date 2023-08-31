// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Button, Stack } from '@mui/material';
import { useSelector } from 'react-redux';

// project import

// assets
import Google from '../assets/images/google.svg';
import Twitter from '../assets/images/twitter.svg';
import Facebook from '../assets/images/facebook.svg';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const FirebaseSocial = () => {
  const themes = useSelector(state => state.theme.themeData)
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  

  return (
    <Stack
      direction="row"
      style={{padding:'8px 0px 13px'}}
      spacing={matchDownSM ? 1 : 2}
      justifyContent={matchDownSM ? 'space-around' : 'space-between'}
      sx={{ '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}
    >
      <Button
        variant="outlined"
        color="primary"
        sx={{
          ':hover': {
            bgcolor: '#143F63',
            borderColor: '#143F63'
          }
        }}
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        style={{textTransform: 'none', color: themes.login.tertiaryColor,fontFamily: 'Public Sans', fontSize:'14px'}}
      >
        {!matchDownSM && 'Google'}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        sx={{
          ':hover': {
            bgcolor: '#143F63',
            borderColor: '#143F63'
          }
        }}
        fullWidth={!matchDownSM}
        startIcon={<img src={Twitter} alt="Twitter" />}
        style={{textTransform: 'none', color: themes.login.tertiaryColor,fontFamily: 'Public Sans', fontSize:'14px'}}
      >
        {!matchDownSM && 'Twitter'}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        sx={{
          ':hover': {
            bgcolor: '#143F63',
            borderColor: '#143F63'
          }
        }}
        fullWidth={!matchDownSM}
        startIcon={<img src={Facebook} alt="Facebook" />}
        style={{textTransform: 'none', color: themes.login.tertiaryColor, fontFamily: 'Public Sans', fontSize:'14px'}}
      >
        {!matchDownSM && 'Facebook'}
      </Button>
    </Stack>
  );
};

export default FirebaseSocial;
