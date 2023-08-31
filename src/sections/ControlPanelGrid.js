import React,{ useRef,
  useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
 
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  ClickAwayListener
} from '@material-ui/core';
import SubRoomDrop from './SubRoomDrop'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft:'-20px'
  },
  paper: {
    backgroundColor:'#012A50',
    // width:'157px',
    color:'white',
    display:'flex',
    alignItems:'center',
    borderRadius:'4px',
    boxShadow:'none',
    // justifyContent:'center',
    // padding:'0px 16px'
  },
}));

export default function ControlPanelGrid({
  onlineUsers,
  primaryUsers,
  secondaryUsers,
  viewerUsers,
  handRaisedUsers,
  users

}) {
  const [openNav, setOpenNav] = useState(false);
  // userCount
  const [userCount, setUserCount] = useState(0)
  const anchorRef = useRef(null);
 

  const handleToggle = () => {
    setOpenNav((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpenNav(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenNav(false);
    } else if (event.key === 'Escape') {
      setOpenNav(false);
    }
  }

  const classes = useStyles();
  useEffect(() => {
    let totalUsersCount = 0
    // loop through the users object and count the total users
    for (const [key, value] of Object.entries(users)) {
      totalUsersCount += value.items.length
    }
    setUserCount(totalUsersCount)

  },[users])
  return (
    <div className={classes.root}>
       <ul className="flex flex-wrap gap-20" style={{listStyle:'none'}}>
       {/* <li className='w18' 
          // ref={anchorRef}
          // id="composition-button"
          // aria-controls={openNav ? 'composition-menu' : undefined}
          // aria-expanded={openNav ? 'true' : undefined}
          // aria-haspopup="true" onClick={handleToggle}
          
          >
            <SubRoomDrop />
          <Paper className={classes.paper}>
          
            <img alt='' src={`${window.location.origin}/assets/images/masked_singer.png`} style={{marginRight:'10px',height:'44px',width:'44px',borderRadius:'4px',objectFit:'cover',paddingLeft:'5px'}} />
            <span style={{
              padding:'11px',
            fontFamily:'URW DIN',display:'flex',flexDirection:'column',whiteSpace: "nowrap",fontSize:'16px',textAlign:'left'}}>Hell’s Kitchen <span style={{color:'#88A1AB',fontFamily:'URW DIN REGULAR',fontWeight:400,lineHeight:'14px'}}>Breakout space 1</span></span>
            </Paper>
        </li> */}
        <li className='w10'>
          <Paper className={classes.paper} style={{justifyContent:'center'}}>
          
            <img alt='' src={`${window.location.origin}/assets/icons/green_dot.svg`} style={{marginRight:'10px'}} />
            <span style={{padding:'9px 0px 9px 29px',fontFamily:'URW DIN',display:'flex',flexDirection:'column',alignItems:'center',whiteSpace: "nowrap"}}>Online <span style={{color:'#88A1AB',fontFamily:'URW DIN REGULAR'}}>{Object.keys(onlineUsers).length}</span></span></Paper>
        </li>
        <li className='w10'>
          <Paper className={classes.paper} style={{justifyContent:'center'}}>
          <img alt='' src={`${window.location.origin}/assets/icons/red_dot.svg`} style={{marginRight:'10px'}} />
            <span style={{padding:'9px 0px 9px 29px',fontFamily:'URW DIN',display:'flex',flexDirection:'column',alignItems:'center',whiteSpace: "nowrap"}}>Offline <span style={{color:'#88A1AB',fontFamily:'URW DIN REGULAR'}}>{userCount-Object.keys(onlineUsers).length}</span></span>

          </Paper>
        </li>
        <li className='w10'>
          <Paper className={classes.paper} style={{justifyContent:'center'}}>
          <img alt='' src={`${window.location.origin}/assets/icons/hand.svg`} style={{marginRight:'10px', width:'23px', height:'29px'}} />
            <span style={{padding:'10px 0px 7px 0px',fontFamily:'URW DIN',display:'flex',flexDirection:'column',alignItems:'center',whiteSpace: "nowrap"}}>Hand Raised <span style={{color:'#88A1AB',fontFamily:'URW DIN REGULAR'}}>{ Object.keys(handRaisedUsers).length}</span></span>
          </Paper>
        </li>
        
        <li className='w10'>
          <Paper className={classes.paper} style={{justifyContent:'center'}}>
          <img alt='' src={`${window.location.origin}/assets/icons/primary.svg`} style={{marginRight:'10px', width:'28px', height:'30px'}} />
            <span style={{padding:'9px 0px 9px 20px',fontFamily:'URW DIN',display:'flex',flexDirection:'column',alignItems:'center',whiteSpace: "nowrap"}}>Primary <span style={{color:'#88A1AB',fontFamily:'URW DIN REGULAR'}}>{ Object.keys(primaryUsers).length}</span></span>
          </Paper>
        </li>
        <li className='w10'>
          <Paper className={classes.paper} style={{justifyContent:'center'}} >
          <img alt='' src={`${window.location.origin}/assets/icons/secondary.svg`} style={{marginRight:'10px', width:'28px', height:'30px'}} />
            <span style={{padding:'9px 0px 9px 5px',fontFamily:'URW DIN',display:'flex',flexDirection:'column',alignItems:'center',whiteSpace: "nowrap"}}>Secondary<span style={{color:'#88A1AB',fontFamily:'URW DIN REGULAR'}}>{ Object.keys(secondaryUsers).length}</span></span>
          </Paper>
        </li>
        <li className='w10'>
          <Paper className={classes.paper} style={{justifyContent:'center'}}>
          <img alt='' src={`${window.location.origin}/assets/icons/eye_icon.svg`} style={{marginRight:'10px'}} />

            <span style={{padding:'9px 0px 9px 10px',fontFamily:'URW DIN',display:'flex',flexDirection:'column',alignItems:'center',whiteSpace: "nowrap"}}>Viewer <span style={{color:'#88A1AB',fontFamily:'URW DIN REGULAR'}}>{ Object.keys(viewerUsers).length}</span></span>
          </Paper>
        </li>
        <li className='w10'>
          <Paper className={classes.paper} style={{justifyContent:'center'}}>
            <img alt='' src={`${window.location.origin}/assets/icons/viewer.svg`} style={{marginRight:'10px'}} />
          {/* <Visibility style={{fill:'#88A1AB',width:'25px'}}/> */}
            <span style={{padding:'9px 0px 9px 10px',fontFamily:'URW DIN',display:'flex',flexDirection:'column',alignItems:'center',whiteSpace: "nowrap"}}>Guest <span style={{color:'#88A1AB',fontFamily:'URW DIN REGULAR'}}>65</span></span>
          </Paper>
        </li>
        </ul>
        <Popper
          open={openNav}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {
            ({ TransitionProps, placement }) => (
              <Grow
                { ...TransitionProps }
                style={
                  {
                    transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom'
                  }
                }
              >
                <Paper style={
                  {
                    width:'365px',
                    backgroundColor: '#012243',
                    color: '#88A1AB',
                    borderRadius:'0px',
                    fontSize:'16px',
                  }
                }>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={openNav}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                      style={{listStyle:'none',zIndex:3}}
                    >
                     
                          
                     <MenuItem
                              style={ { margin: '7px 0px' } }

                            
                            >ghg
                            </MenuItem>

                            <MenuItem
                              style={ { margin: '7px 0px' } }

                            
                            >ghg
                            </MenuItem>

                            <MenuItem
                              style={ { margin: '7px 0px' } }

                            
                            >ghg
                            </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )
          }
        </Popper>
        
    </div>
  );
}
