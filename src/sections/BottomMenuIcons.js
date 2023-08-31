import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const BottomMenuIcons = () => {

    const local = useSelector(state => state.local);
    const BottomMenuItems = [
      {
          name: 'Video',
          bgColor:local.videoMuted ? "rgba(230, 25, 89, 1)": "rgba(1, 42, 80, 1)" ,
          icon: local.videoMuted ? "/assets/bottomIcons/no_cam.svg" :"/assets/bottomIcons/cam.svg" ,
          pointer: true,
          onClick: () => {
              console.log('Video');
              // dispatch(setVideoMuted(!local.videoMuted));
          }
      },
      {
          name: 'Audio',
          bgColor:local.audioMuted ? "rgba(230, 25, 89, 1)": "rgba(1, 42, 80, 1)" ,
          icon: local.audioMuted ? "/assets/bottomIcons/no_mic.svg":"/assets/bottomIcons/mic.svg",
          pointer: true,
          onClick: () => {
              console.log('Audio');
              // dispatch(setAudioMuted(!local.audioMuted));
          }
      },
      {
          name: 'Share',
          bgColor: "rgba(1, 42, 80, 1)" ,
          icon: "/assets/bottomIcons/share.svg",
          pointer: false,
          onClick: () => {
              console.log('Share');
              // handleClickOpen()
          }
      },
      {
          name: 'Chat',
          bgColor: "rgba(1, 42, 80, 1)" ,
          icon: "/assets/bottomIcons/chat.svg",
          pointer: false,
          onClick: () => {
              console.log('Chat');
              // handleClickOpen()
          }
      },
      {
          name: 'Hand',
          bgColor: "rgba(1, 42, 80, 1)" ,
          icon: "/assets/bottomIcons/hand.svg",
          pointer: false,
          onClick: () => {
              console.log('Share');
              // handleClickOpen()
          }
      },
      {
          name: 'layout',
          bgColor: "rgba(1, 42, 80, 1)" ,
          icon: "/assets/bottomIcons/layout.svg",
          pointer: true,
          onClick: () => {
              console.log('layout');
              // handleClickOpen()
          }
      },
      {
          name: 'EndCall',
          bgColor: local.callStarted ? "rgba(1, 42, 80, 1)" :"rgba(230, 25, 89, 1)",
          icon: local.callStarted ? "/assets/bottomIcons/hangup.svg" : "/assets/bottomIcons/hangup.svg",
          pointer: false,
          onClick: () => {
              console.log('End Call');
          }
      },
      
      {
          name: 'More',
          bgColor: "rgba(1, 42, 80, 1)" ,
          icon: "/assets/bottomIcons/more.svg",
          pointer: false,
          onClick: () => {
              console.log('More');
          }
      }
    ];
    
    const bottomMenuItems = BottomMenuItems.map((item, index) => {
        
      // return bottom menu item
      return (
          <div key={index}  style={{cursor:"pointer",backgroundColor: item.bgColor    ,display:"flex",justifyContent:"center" ,padding:"12px",margin:"5px", borderRadius: '4px', position: 'relative'}} className="bottom-menu-item noselect" onClick={item.onClick} >
              <img style={{
                  width: '26px',
                  height: '26px',
               
    
              }} src={item.icon} alt={item.name} />
           {item.pointer ? <img src='/assets/icons/up.svg' style={{position: 'absolute', top: '-5%', right: '0%', padding: '5px 3px',backgroundColor: '#143F63',borderRadius: '4px'}} /> : <></> } 
            
          </div>
      );
    })

  return (
    <div style={{transform: 'translateX(-50%) translateY(-50%)', display: 'flex', left: '50%', bottom: '0%', position: 'absolute', padding: '20px', background: '#012243'}}>
    {bottomMenuItems}
  </div>
  )
}

export default BottomMenuIcons