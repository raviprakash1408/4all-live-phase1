import React, { useEffect, useState } from 'react'
import SimpleTable from '../sections/ExpandingTable'
import { Box, Typography, Button, Grid, Divider } from '@mui/material';
import ControlPanelGrid from '../sections/ControlPanelGrid';
import SearchBarLong from '../sections/SearchBarLong';
import Stack from '@mui/material/Stack';
import CollapsibleTable from '../sections/CollapsibleTable';
import FileManager from '../sections/FileManager';
import { AxiosLocal } from '../utilities/axiosUtils.ts';
import IOSSwitch from '../admin/components/CustomSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { setdirectorMode } from '../state/conference/conferenceSlice';
// import { Helmet } from 'react-helmet';



const ControlPanel = () => {
  const [openShareVideo, setOpenShareVideo] = React.useState(false);
  const handleShareVideo = () => {
    setOpenShareVideo(true)
  }
  const handleShareVideoClose = () => {
    setOpenShareVideo(false)
  }

  //user list
  console.log(window.location.pathname, "window.location.href");
  const pathname = window.location.pathname;
  const pathnameArray = pathname.split("/");
  const subspaceSlug = pathnameArray[pathnameArray.length - 1];

  // state for refetching users
  const [refetch, setRefetch] = useState("");

  const [loading, setloading] = useState(true)
  const [users, setusers] = useState([]);
  const dispatch = useDispatch();
  const directorMode = useSelector((state) => state.conference.directorMode);


   // state for count of online users
   const [onlineUsers, setOnlineUsers] = useState({});

   // state for count of primary users
   const [primaryUsers, setPrimaryUsers] = useState({});
 
   // state for count of secondary users
 
   const [secondaryUsers, setSecondaryUsers] = useState({});
 
   // state for count of viewer users
   const [viewerUsers, setViewerUsers] = useState({});
 
   // state for count of hand raised users
   const [handRaisedUsers, setHandRaisedUsers] = useState({});
 
 
 useEffect(() => {
   window.eventChanel.on('join', function(ctx) {
     // handle new Publication data coming from channel "news".
     setOnlineUsers((prev) => prev + 1)
 });
 window.eventChanel.on('leave', function(ctx) {
   // handle new Publication data coming from channel "news".
   setOnlineUsers((prev) => prev - 1)
 });
 
 // eventChanel find presence
 window.eventChanel.presence().then((presence) => {

 let presentUsers = Object.keys(presence.clients).map((key) => {
   return presence.clients[key].chan_info
 })
 
 let participants = window.room?.participants
 let newParticipants = {}
 // loop through participants and map the participant id to the participant
 for (const [key, value] of Object.entries(participants)) {
     newParticipants[ value._properties.id] = {key,...value._properties}
 }
 newParticipants[window.room?.getLocalParticipantProperty("id")] = {key:window.room?.myUserId(),"user_type":window.room?.getLocalParticipantProperty('user_type')}
   setOnlineUsers(presentUsers)

  let primaryUsers = {}
  let secondaryUsers = {}
  let viewerUsers = {}

  for (const [key, value] of Object.entries(newParticipants)) {
    if(value.user_type == "P"){
      primaryUsers[key] = value
    }
    if(value.user_type == "S"){
      secondaryUsers[key] = value
    }
    if(value.user_type == "V"){
      viewerUsers[key] = value
    }
  }

    setPrimaryUsers(primaryUsers)
    setSecondaryUsers(secondaryUsers)
    setViewerUsers(viewerUsers)
    console.log('presentUsers',newParticipants,primaryUsers,secondaryUsers,viewerUsers);


 })
 }, [])

 
  useEffect(() => {
    document.body.style.backgroundColor = "#012243"

    AxiosLocal.get(`subroom/users/${subspaceSlug}`).then((response) => {
      console.log(response,"responseresponse");
      if(response.data.status){
        setusers([...response.data.data]);
        setloading(false)
      }
      
    });
  }, [subspaceSlug,refetch])
//search
const [search, setsearch] = useState('')
  useEffect(() => {
    AxiosLocal.post(`subroom/users/${subspaceSlug}`,{
      "search_text":search
    }).then((response) => {
      console.log(response.data.data,"responseresponseresponse");
      setusers([...response.data.data])
      
          });
  }, [search, subspaceSlug])



  // const handleChange = () => {
  //   // const searchWordLower = search.toLowerCase();

  //   // let newFilter = usersList.filter((item) => {
  //   //     return item.items.some(user => user.name.toLowerCase().includes(searchWordLower))
  //   // })


    
  //   // console.log(newFilter,"newFilter");
    
  //   if(search==''){
  //     setusers([...usersList])
  //   }
  // }

  return (
    <>
    {/* <Helmet>
<title>EVENTS.FOX | Control Panel</title>

    
    </Helmet> */}
    <div
      style={
        {
          // position: "absolute",
          // top: "0px",
          // left: "0px",
          backgroundColor:'#012243',
          // paddingTop:'90px',
          // paddingBottom:'23px',
          width: "100vw",
          minHeight: '100vh',
          zIndex: "-1"
        }
      }
    >
      <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        color:'#fff',
        gap:'20px',
      }}>
       <Typography
          variant="h5"
          style={
            {
              color: '#fff',
              fontWeight: '700', 
              fontFamily:'URW DIN REGULAR',
              textAlign: 'center',
              padding: '34px 0px 27px'
            }
          }
        >

        Real-time event control panel

        </Typography>
       <div>
        <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
      
        gap:'20px',
      }}>
        <p>
          Director Mode :    </p> <IOSSwitch onChange= {(e) => {
                  dispatch(
                    setdirectorMode({ mode: !directorMode.mode, user_id: window.room?.myUserId() })
                  );
                  // publish the director mode through the eventchannel
                  window.eventChanel.publish({
                    event: 'director_mode',
                    value:true,
                    user_id:window.room?.myUserId(),
          
                  })
                }} checked={directorMode.mode && directorMode.user_id === window.room?.myUserId() ? true : false}/>
    
        </div>
       </div>
       </div>
        <ControlPanelGrid  onlineUsers={onlineUsers} primaryUsers={primaryUsers}  secondaryUsers={secondaryUsers} viewerUsers={viewerUsers} handRaisedUsers={handRaisedUsers} users={users}/>
         <div style={{padding:'6px 20px 20px 0px ',backgroundColor:'#012A50',margin:'20px'}}>
          <div style={{marginLeft:'20px', }}>
          <Stack spacing={2} direction="row">
         {/* <SearchBarLong setsearch={setsearch} /> */}
         {/* <Button variant="contained" sx={{ boxShadow: 0 }} style={{height:'40px', width:'128px', marginTop:'20px', backgroundColor:'#143F63'}} onClick={handleShareVideo}>
          <img src='/assets/icons/show.svg' />
          <span style={{marginLeft:'11px',fontFamily:'URW DIN REGULAR',textTransform:'none'}}>Share&nbsp;video</span></Button> */}
         </Stack>
      <CollapsibleTable  setRefetch={setRefetch} onlineUsers={onlineUsers} primaryUsers={primaryUsers}  secondaryUsers={secondaryUsers} viewerUsers={viewerUsers} handRaisedUsers={handRaisedUsers} users={users} loading={loading} search={search} />
      </div>
      </div>

    </div>
    {openShareVideo && <FileManager handleShareVideoClose={handleShareVideoClose} />}
    </>
  )
}

export default ControlPanel