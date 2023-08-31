import { CircularProgress } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';

interface VideoLoaderProps {
    videoElement: HTMLVideoElement | null;
}

function VideoLoader(props: VideoLoaderProps) {
    const [buffering, setbuffering] = useState(true)

useEffect(() => {
    if(props.videoElement){
        props.videoElement.addEventListener('waiting', () => {
            console.log("waiting VideoLoader");
            setbuffering(true)
        })
        props.videoElement.addEventListener('playing', () => {
            console.log("playing VideoLoader");
            
            setbuffering(false)
        })
    }
}, [props.videoElement,setbuffering])
    return ( 
        <>
        {buffering && <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 9999,
                        
}}> <CircularProgress  /> </div>}
        </>
     );
}

export default VideoLoader;