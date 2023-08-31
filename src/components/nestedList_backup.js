import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Margin } from '@mui/icons-material';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const menu = [
  {
    title: "Hell's Kitchen",
    img: "/assets/icons/room1.svg",
    items: [
      {
        title: "Main",
        
      },
      {
        title: "Breakout space1",
        active: true
       
      },
      {
        title: "Vitae Minima Tempora",
      
      },
      {
        title: "Fuga Aut Quia",
      
      }
    ]
  },
  {
    title: "Lego Masters",
    img: "/assets/images/Room2.png",
    items: [
      {
        title: "Main",
        
      },
      {
        title: "Vitae Minima Tempora",
      
      },
      {
        title: "Fuga Aut Quia",
      
      }
    ]
  },
  {
    title: "The Masked Singer",
    img: "/assets/images/masked_singer.svg",
    items: [
      {
        title: "Main",
        
      },
      {
        title: "Vitae Minima Tempora",
      
      },
      {
        title: "Fuga Aut Quia",
      
      }
    ]
  },
  
];

const initialState = {main: false};

function reducer(state, action) {
  switch (action.type) {
    case 'toggleMain':
      return {main: !state.main};
   
    default:
      throw new Error();
  }
}


export default function NestedList() {
  const [show, setShowDispatch] = React.useReducer(reducer, initialState);


//   dict manage state


//room dropdown

const [openNav, setOpenNav] = React.useState(false);
const [openChildren, setOpenChildren] = React.useState(0);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenNav((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenNav(false);
  };
  const openChild = () => {
    setOpenChildren((prevOpenChild) => !prevOpenChild);
  }
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenNav(false);
    } else if (event.key === 'Escape') {
      setOpenNav(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openNav);
  const prevOpenChild = React.useRef(openChildren);
  React.useEffect(() => {
    if (prevOpen.current === true && openNav === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openNav;
  }, [openNav]);

  console.log(menu, 'menu');

  return (
    <div style={{position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
      backgroundColor: '#012243',
      borderRadius: '4px',
      Margin: '8px 0',
      zIndex: "5"
      }}>
      
     {/* room dropdown */}
   
     <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={openNav ? 'composition-menu' : undefined}
          aria-expanded={openNav ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
         
         <Box 
        // onClick={()=>setShowDispatch({type:"toggleMain"})}
        sx={{ display:"flex" ,justifyContent:"flex-start" ,alignItems:"center"}}>
        <img style={{width:"44px",height:"44px",marginRight:"10px"}}  src='/assets/icons/room1.svg' />
        <Typography variant="h5"  sx={{ marginRight:"10px",justifyContent:"space-around",alignItems:"center", fontSize: '16px', textTransform:'none', color:'#88A1AB'}}>
        
          <span style={{color:'white'}}>Hell’s Kitchen</span> - Breakout Space1 
          </Typography>

          <img style={{width:"10px",height:"5.5px",padding:'20px'}}  src='/assets/icons/down.svg' />
      </Box>
      

        </Button>
        <Popper
          open={openNav}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper style={{width:'365px', backgroundColor: '#012243', color: '#88A1AB', borderRadius:'0px', fontSize:'16px'}}>
                <ClickAwayListener onClickAway={handleClose}>
             
                  <MenuList
                    autoFocusItem={openNav}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                   {
                   menu.map((item, index)=>
                    <><MenuItem style={{ margin: '7px 0px' }}>
                       {openChildren===index ? <img style={{ width: "10px", height: "5.5px", padding: '10px' }} src='/assets/icons/up.svg' onClick={()=>setOpenChildren(index)} /> : <img style={{ width: "10px", height: "5.5px", padding: '10px' }} src='/assets/icons/down.svg' onClick={openChild} />}

                       <img style={{ width: "44px", height: "44px", marginRight: "5px", marginLeft: '10px' }} src={item.img} />

                       <span style={{ paddingLeft: '19px', fontSize: '16px' }}>{item.title}</span>
                     </MenuItem>
                     {
                      item.items.map((data)=>
                      <Collapse in={openChildren===index} timeout="auto" unmountOnExit>
                      <List component="div" style={{padding: '0px'}}>
                        {data.active? 
                        <MenuItem style={{ paddingLeft: '122px', paddingTop: '20px', paddingBottom: '20px', fontSize: '16px', backgroundColor: '#143F63' }}>{data.title}</MenuItem> : 
                        <MenuItem style={{ paddingLeft: '122px', paddingTop: '20px', paddingBottom: '20px', fontSize: '16px', backgroundColor: '#012A50' }}>{data.title}</MenuItem>
}
                      </List>
                    </Collapse>
                      )
                     
                     }
                     
                     </>
                   )
                   }
                    {/* <MenuItem style={{margin:'7px 0px'}} onClick={openChild}>
                      {openChildren ? <img style={{width:"10px",height:"5.5px",padding:'10px'}}  src='assets/icons/up.svg'  /> : <img style={{width:"10px",height:"5.5px",padding:'10px'}}  src='assets/icons/down.svg'  />}
                    
                    <img style={{width:"44px",height:"44px",marginRight:"5px", marginLeft:'10px'}}  src='assets/icons/room1.svg' />

                      <span style={{paddingLeft: '19px', fontSize:'16px', fontWeight: '600', color:'white'}}>Hell’s Kitchen</span> 
                      </MenuItem>
                      <Collapse in={openChildren} timeout="auto" unmountOnExit>
                        <List component="div" >
                        <MenuItem style={{paddingLeft:'122px',paddingTop:'20px', paddingBottom:'20px', fontSize:'16px', backgroundColor:'#012A50'}}>Main</MenuItem>
                        <MenuItem style={{ paddingLeft: '122px', paddingTop: '20px', paddingBottom: '20px', fontSize: '16px', backgroundColor: '#143F63', color:'white' }}>Breakout space1</MenuItem>
                        <MenuItem style={{ paddingLeft: '122px', paddingTop: '20px', paddingBottom: '20px', fontSize: '16px', backgroundColor: '#012A50' }}>Vitae Minima Tempora</MenuItem>
                        <MenuItem style={{ paddingLeft: '122px', paddingTop: '20px', paddingBottom: '20px', fontSize: '16px', backgroundColor: '#012A50' }}>Fuga Aut Quia</MenuItem>
                        </List>
                      </Collapse>
                     
                      <MenuItem style={{margin:'7px 0px'}}>
                     <img style={{width:"10px",height:"5.5px",padding:'10px'}}  src='assets/icons/down.svg' /> 
                    <img style={{width:"44px",height:"44px",marginRight:"5px", marginLeft:'10px'}}  src='assets/images/Room2.png' />

                      <span style={{paddingLeft: '19px', fontSize:'16px'}}>Lego Masters</span> 
                      </MenuItem>
                      <Collapse  timeout="auto" unmountOnExit>
                        <List component="div" >
                        <MenuItem style={{paddingLeft:'122px',paddingTop:'20px', paddingBottom:'20px', fontSize:'14px', backgroundColor:'#012A50'}}>Hey</MenuItem>
                        </List>
                      </Collapse>

                      <MenuItem style={{margin:'7px 0px'}}>
                      <img style={{width:"10px",height:"5.5px",padding:'10px'}}  src='assets/icons/down.svg' /> 
                    
                    <img style={{width:"44px",height:"44px",marginRight:"5px", marginLeft:'10px'}}  src='assets/images/masked_singer.png' />

                      <span style={{paddingLeft: '19px', fontSize:'16px'}}>The Masked Singer</span> 
                      </MenuItem>
                      <Collapse timeout="auto" unmountOnExit>
                        <List component="div" >
                        <MenuItem style={{paddingLeft:'122px',paddingTop:'20px', paddingBottom:'20px', fontSize:'14px', backgroundColor:'#012A50'}}>Hey</MenuItem>
                        </List>
                      </Collapse> */}
                     

                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      {/* <Box 
        // onClick={()=>setShowDispatch({type:"toggleMain"})}
        sx={{ display:"flex" ,justifyContent:"flex-start" ,alignItems:"center"}}>
        <img style={{width:"44px",height:"44px",marginRight:"10px"}}  src='assets/icons/room1.svg' />
        <Typography variant="h5"  component="div" sx={{ marginRight:"10px",justifyContent:"space-around",alignItems:"center", fontSize: '16px' }}>
        
          Hell’s Kitchen - Breakout Space1 
          </Typography>

          <img style={{width:"10px",height:"5.5px",padding:'20px'}}  src='assets/icons/down.svg' />
    </Box> */}
   
     
 <Collapse style={{marginTop:"20vh"}} in={show.main} timeout="auto" unmountOnExit>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader onClick={()=>setShowDispatch({type:"toggleMain"})} component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton>
      <ListItemButton >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      
      </ListItemButton>
  
    </List>
    </Collapse>
    </div>
   
  );
}
