import React,{useState,useEffect, useCallback} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import mpegts from 'mpegts.js';
import Player from './Devices/player';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// create Youtube Share functional component
export default function YoutubeShare(props) {
    // console.log(props,"propspropspropsprops");
  
    let  userId = useSelector(state => state.local.userId);
    // url 
    const [url, seturl] = useState("")

    const [playing, setplaying] = useState(true)
    // extention
    const [extention, setextention] = useState("")
    // controls useState
 


    const [volume, setvolume] = useState(0.5)
  
// useref player
const [openToast, setOpenToast] = React.useState(false);

  const handleClickToast = () => {
    setOpenToast(true);
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

 
  useEffect(() => {
    setextention(props.ShareUrl?.split('.').pop())
    seturl(props.ShareUrl?.replace('http://','http://'))
  }, [props.ShareUrl])

  useEffect(() => {
    if(extention == "flv"){
      // setcontrols(false)
      if (mpegts.getFeatureList().mseLivePlayback) {
        var videoElement = document.getElementById('videoElement');
        var player = mpegts.createPlayer({
            type: 'flv',  // could also be mpegts, m2ts, flv
            isLive: true,
            url: props.ShareUrl
        });
        player.attachMediaElement(videoElement);
        player.load();
        player.play();
    }
    }
  }, [extention,props.ShareUrl])



 
      return (
        <div
          style={{
            aspectRatio: "16/9",
            borderRadius: "4px",
          }}
        >
          <Player
            control={props.control}
            volume={props.volume}
            data={props.data}
            handleClickToast={handleClickToast}
            url={url}
            ShareUrl={props.ShareUrl}
            is_hover={props.is_hover}
            id={props.id}
            type={props.type}
          />
          {/* <video id='videoElement' width="100%" height="100%" /> */}

          {/* {!props.max && props.data &&  <Snackbar open={openToast} autoHideDuration={2000} onClose={handleCloseToast}>
     <Alert onClose={handleCloseToast} severity="info" sx={{ width: '100%' }}>
        {props.data?.user_id == window.room?.myUserId() ? window.room?.getLocalParticipantProperty("firstName")  :window.room?.getParticipantById(props.data?.user_id)?.getProperty("firstName")} is sharing video
        </Alert>
      </Snackbar>
} */}
        </div>
      );
}

