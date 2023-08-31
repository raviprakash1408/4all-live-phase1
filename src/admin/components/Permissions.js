import React from "react";
import {
  Box,
  List,
  Button,
  Divider,
  Grid,
  FormControlLabel,
  Stack,
  TextField,
  Tooltip,
  Popover,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Slider,
} from "@mui/material";
import IOSSwitch from "./CustomSwitch";
import PermissionNavElement from "./PermissionNavElement";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { titleCase } from "../../utilities/common";
import { setPermissionInSelectedPermission } from "../../state/admin/adminSlice";
import { Scrollbars } from "react-custom-scrollbars";
import VideoQualityDrop from "./VideoQualityDrop";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";

import PermissionButton from "./permissionButton";


const useOutlinedInputStyles = makeStyles((theme) => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#143F63",
    },
    "&:hover $notchedOutline": {
      borderColor: "#143F63 !important",
    },
    "&$focused $notchedOutline": {
      borderColor: "green",
    },
  },
  focused: {},
  notchedOutline: {},
}));



const Permissions = () => {
  const theme = useSelector((state) => state.theme.themeData);
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const outlinedInputClasses = useOutlinedInputStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  // permissions  
  const [permissions, setPermissions] = React.useState([
    {
        "id": 1,
        "title": "Participant"
    },
    {
        "id": 2,
        "title": "Viewer"
    },
    {
        "id": 3,
        "title": "Guest"
    }
]);

// selected permission
const [selectedPermission, setSelectedPermission] = React.useState({
    "id": 1,
    "title": "Participant",
    "permissions": {}
});


// call api to get permissions
  React.useEffect(() => {
    const getPermissions = async () => {
      const { data } = await AxiosLocal.get("user/permission/");
      console.log(data, "data from getPermissions");
      setPermissions(data.data);
      getPermissionDetails(data.data[0].id);

    };
    getPermissions();
  }, []);


  const handleClick = (event) => {
    console.log(event.currentTarget.id, "event.currentTarget");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const getPermissionDetails = async (id) => {
    const { data } = await AxiosLocal.get(`user/permission/${id}`);
    console.log(data, "data from getPermissionDetails");
    let selectedPermission = permissions.find((permission) => permission.id === id);
    setSelectedPermission({...selectedPermission, permissions:{...data.data}});
  }
  
  const selectPermission = (id) => {
    // call api to get permission details
    getPermissionDetails(id);

  }
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div style={{ display: "flex" }}>
        <Box style={{ width: "300px", margin: "0px 23px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontFamily: "URW DIN",
                color: "white",
                fontSize: "20px",
                textAlign: "center",
                marginRight:'24px'
              }}
            >
              Permissions
            </p>
            <Button
              variant="contained"
              style={{
                textTransform: "none",
                padding: "9px 19px 11px 11px",
                minWidth:'130px',
                lineHeight: "22px",
                backgroundColor: "#008BCD",
                color: "white",
                fontFamily: "URW DIN REGULAR",
              }}
            >
              <img alt="" src="/assets/admin/plus.svg" />
              <span style={{ marginLeft: "13px", fontSize: "14px" }}>
                Add new
              </span>
            </Button>
          </div>
          <List>
            {permissions.map((permission) => {
              // console.log(permissionName,"permissionName");
             
                return (
                  <PermissionNavElement
                    title={`${permission.title}`}
                    selected={permission.id === selectedPermission.id}
                    onClick={()=>selectPermission(permission.id)}
                  />
                );
              
          
           
})}
            {/* <PermissionNavElement title='Participant'  />
        <PermissionNavElement title='Guest'  />
        <PermissionNavElement title='Restricted'  />
        <PermissionNavElement title='Team editor'  /> */}
          </List>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          style={{
            alignSelf: "auto",
            backgroundColor: "#002E56",
            // height: '25px',
            marginTop: "23px",
            marginBottom: "21px",
            width: "2px",
          }}
        />

        <Box sx={{ flexGrow: 1 }} style={{ margin: "23px 32px" }}>
          {/* <Grid container>
   <Grid item lg={3} xl={2}>
    
   <p style={{fontFamily:'URW DIN REGULAR',color:'#88A1AB',fontSize:'14px'}}>
         Permission type name
        </p>


   </Grid >
   <Grid item lg={3} xl={2}>
    
  

   <TextField id="outlined-basic" label="" variant="outlined" sx={{
                      '& .MuiInputLabel-root': { fontSize: '14px' ,height:'42px', marginTop:'-5px'},
                      '& .MuiOutlinedInput-root': { fontSize: '14px', height:'42px', marginTop:'1px' },
                   
                      '& .MuiOutlinedInput-input': {
                        fontFamily:'URW DIN REGULAR',
                        fontSize:'14px',

                        color: theme?.profile?.primaryColor
                       
                      },
         "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border:'1px solid',
  
          borderColor:'#143F63',
  
          borderRadius:'4px',
          color: theme?.profile?.primaryColor



        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border:'1px solid',
  
          borderColor:'#143F63',

          borderRadius:'4px'
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border:'1px solid',
  
          borderColor:'#143F63',

          borderRadius:'4px'
        }
        }}
        InputLabelProps={{
          style: { color: '#5D7C90' },
        }}
                      
                       type="text"

                        classes={outlinedInputClasses}

                        // placeholder="Enter your email"
                        
                        fullWidth

                        name="text"
                        placeholder="First Name"
                        value={'Participant'}
                        
                         />
   </Grid >
   <Grid item lg={1} xl={1}></Grid>
   <Grid item lg={3} xl={2}>
    
    <p style={{fontFamily:'URW DIN REGULAR',color:'#88A1AB',fontSize:'14px'}}>
          Permission type name
         </p>
 
 
    </Grid >
    <Grid item lg={3} xl={2}>
    
  

    <TextField id="outlined-basic" label="" variant="outlined" sx={{
                       '& .MuiInputLabel-root': { fontSize: '14px' ,height:'42px', marginTop:'-5px'},
                       '& .MuiOutlinedInput-root': { fontSize: '14px', height:'42px', marginTop:'1px' },
                    
                       '& .MuiOutlinedInput-input': {
                         fontFamily:'URW DIN REGULAR',
                         fontSize:'14px',
 
                         color: theme?.profile?.primaryColor
                        
                       },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
           border:'1px solid',
   
           borderColor:'#143F63',
   
           borderRadius:'4px',
           color: theme?.profile?.primaryColor
 
 
 
         },
         "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
           border:'1px solid',
   
           borderColor:'#143F63',
 
           borderRadius:'4px'
         },
         "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
           border:'1px solid',
   
           borderColor:'#143F63',
 
           borderRadius:'4px'
         }
         }}
         InputLabelProps={{
           style: { color: '#5D7C90' },
         }}
                       
                        type="text"
 
                         classes={outlinedInputClasses}
 
                         // placeholder="Enter your email"
                         
                         fullWidth
 
                         name="text"
                         
                          />
    </Grid >
        </Grid> */}
<div style={{
  display: "flex",
  justifyContent: "flex-start",
}}>
  <div style={{
    display: "flex",
    gap: "20px",
    alignItems:'center'
  }}>
          <p style={{
            color: "#88A1AB",
            fontFamily:'URW DIN REGULAR',
            fontSize:'15px'
          }}>Permissions type name</p>
        {/* input with only border */}
      <div style={{border:"2px solid #143F63"}}>{ selectedPermission.title }</div>
  </div>

  {/* <div style={{
  display: "flex",
  gap: "20px",
}}>
        <p style={{
          color: "#88A1AB",
        }}>Copy from</p>
      <TextField  
        label=""
        variant="outlined"
        sx={{
          '& .MuiInputLabel-root': { fontSize: '14px' ,height:'42px', marginTop:'-5px'},
          '& .MuiOutlinedInput-root': { fontSize: '14px', height:'42px', marginTop:'1px' },
       
          '& .MuiOutlinedInput-input': {
            fontFamily:'URW DIN REGULAR',
            fontSize:'14px',

            color: theme?.profile?.primaryColor
           
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            border:'1px solid',
    
            borderColor:'#143F63',
    
            borderRadius:'4px',
            color: theme?.profile?.primaryColor
          },
          "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            border:'1px solid',
    
            borderColor:'#143F63',
    
            borderRadius:'4px'
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border:'1px solid',
    
            borderColor:'#143F63',
    
            borderRadius:'4px'
          }
        }}

        InputLabelProps={{
          style: { color: '#5D7C90' },
        }}
        type="select"
        classes={outlinedInputClasses}
        
        name="text"
      
       
      />
</div> */}
</div>
          <Divider
            orientation="horizontal"
            style={{
              backgroundColor: "#002E56",
              height: "2px",
              marginTop: "23px",
            }}
          />
    {/* <Scrollbars style={{ height: "60vh" }}> */}
                    
          <Grid
          style={{
            overflowX: "hidden",
            height: "60vh",
          }}
          container spacing={3}>
            {Object.keys(admin.selectedPermission.permissions).map(
              (permissionType) => {
                console.log(
                  permissionType,
                  admin.selectedPermission.permissions[permissionType],
                  "selectedPermission"
                );

                return (
                  <Grid item sm={12} md={12} lg={12} xl={12}>
                    <Tooltip
                      title={
                        <div style={{ display: "flex" }}>
                          <span
                            style={{
                              margin: "4px",
                              fontFamily: "URW DIN REGULAR",
                              color: "#88A1AB",
                              fontSize: "14px",
                              textTransform: "capitalize",
                            }}
                          >
                            {permissionType} Permissions
                          </span>
                        </div>
                      }
                      componentsProps={{
                        tooltip: {
                          sx: {
                            bgcolor: theme?.table?.buttonColor,
                          },
                        },
                      }}
                      placement="top-start"
                    >
                      <p
                        style={{
                          fontFamily: "URW DIN",
                          color: "white",
                          fontSize: "16px",
                          textTransform: "capitalize",
                        }}
                      >
                        {titleCase(permissionType)} Permissions
                      </p>
                    </Tooltip>
                    {/* static dropdown */}
                    {/* { permissionType == "video_quality" && <VideoQualityDrop />} */}
                    {/* <Scrollbars 
                    style={{ width: "98%", height: "30vh",display:"flex" }}> */}
                      {permissionType == 'video_quality' ?  Object.keys(
                        admin.selectedPermission.permissions[permissionType]
                      ).map((permission) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              marginTop: "-3px",
                              marginLeft: "3px",
                            }}
                          >
                            {typeof admin.selectedPermission.permissions[
                              permissionType
                            ][permission] == "object" ? (
                              <div style={{
                                display: "flex",
                              }}>
                                <Box
                                  mx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontFamily: "URW DIN REGULAR",
                                      color: "#88A1AB",
                                      fontSize: "16px",
                                    }}
                                  >
                                    {titleCase(permission)}
                                  </div>

                                  <Box
                                    mx={{
                                      backgroundColor: "#012A50",
                                      marginTop: "10px",
                                      display: "flex",
                                    }}
                                  >
                                    {Object.values(
                                      admin.selectedPermission.permissions[
                                        permissionType
                                      ][permission]
                                    ).map((vc) => {
                                      console.log(vc, "vcvcv");
                                      return (
                                        <Box
                                          mx={{
                                            color: "#88A1AB",
                                            padding: "10px 30px",
                                            backgroundColor: "#143F63",
                                            borderRadius: "10px",
                                            marginRight: "10px",
                                          }}
                                        >
                                          {vc.resolution}
                                        </Box>
                                      );
                                    })}
                                    <Box
                                      mx={{
                                        color: "#88A1AB",
                                        padding: "10px 30px",
                                        backgroundColor: "#143F63",
                                        borderRadius: "10px",
                                        marginRight: "10px",
                                      }}
                                      onClick={handleClick}
                                      id={permission}
                                    >
                                      <img src="/assets/admin/MeetMo 1.6/add.svg" />
                                  
                                    </Box>
                                  </Box>

                                  <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "left",
                                    }}
                                  >
                                    <Box
                                      mx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        backgroundColor: "#012A50",
                                        width: "300px",
                                        padding: "10px",
                                      }}
                                    >
                                      <Box
                                        mx={{
                                          marginTop: "10px",
                                          display: "flex",
                                          color: "#fff",
                                          width: "100%",
                                          justifyContent: "space-around",
                                        }}
                                      >
                                        <Box> resolutions</Box>

                                        {anchorEl?.id != "viewing_quality" && (
                                          <Box> Bit rate</Box>
                                        )}
                                      </Box>

                                      <Box
                                        mx={{
                                          marginTop: "10px",
                                        }}
                                      >
                                        {Object.values(
                                          admin.selectedPermission.permissions[
                                            permissionType
                                          ][anchorEl?.id] || {}
                                        ).map((vc) => {
                                          console.log(vc, "vcvcv");
                                          return (
                                            <Box
                                              mx={{
                                                marginTop: "10px",
                                                borderRadius: "10px",
                                                color: "#88A1AB",
                                                padding: "10px 10px",
                                                backgroundColor: "#143F63",
                                                display: "flex",
                                                justifyContent: "space-around",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Box >
                                                {/* {vc.resolution} */}
                                                <FormControl variant="standard">
                                                  <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={vc.resolution}
                                                    label="Age"
                                                    sx={{
                                                      color: "#fff",
                                                    }}
                                                    onChange={() => {}}
                                                  >
                                                    <MenuItem value={"144p"}>
                                                      144p
                                                    </MenuItem>
                                                    <MenuItem value={"180p"}>
                                                      180p
                                                    </MenuItem>
                                                    <MenuItem value={"360p"}>
                                                      360p
                                                    </MenuItem>
                                                    <MenuItem value={"480p"}>
                                                      480p
                                                    </MenuItem>
                                                    <MenuItem value={"480p"}>
                                                      480p
                                                    </MenuItem>
                                                    <MenuItem value={"720p"}>
                                                      720p
                                                    </MenuItem>
                                                    <MenuItem value={"1080p"}>
                                                      1080p
                                                    </MenuItem>
                                                    <MenuItem value={"1440p"}>
                                                      1440p
                                                    </MenuItem>
                                                    <MenuItem value={"2160p"}>
                                                      2160p
                                                    </MenuItem>
                                                  </Select>
                                                </FormControl>
                                              </Box>

                                              {anchorEl?.id !=
                                                "viewing_quality" && (
                                                <Box
                                                  mx={{
                                                    width: 100,
                                                  }}
                                                >
                                                  <Slider
                                                    step={10}
                                                    marks
                                                    min={10}
                                                    max={110}
                                                  />
                                                </Box>
                                              )}

                                              {anchorEl?.id !=
                                                "viewing_quality" && (
                                                <Box mx={{}}>{vc.bitrate}</Box>
                                              )}
                                              {Object.keys(
                                                admin.selectedPermission
                                                  .permissions[permissionType][
                                                  permission
                                                ]
                                              ).length > 1 && (
                                                <Box
                                                  mx={{
                                                    marginLeft: "5px",
                                                  }}
                                                  onClick={() => {
                                                    // remove quality
                                                  }}
                                                >
                                                  <img src="/assets/admin/MeetMo 1.6/remove.svg" />
                                                </Box>
                                              )}
                                            </Box>
                                          );
                                        })}

                                        <Box
                                          mx={{
                                            marginTop: "10px",
                                            borderRadius: "10px",
                                            color: "#88A1AB",
                                            padding: "10px 30px",
                                            backgroundColor: "transparent",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            border: "3px dashed #143F63",
                                          }}
                                          onClick={() => {
                                            // add quality
                                          }}
                                        >
                                          <img src="/assets/admin/MeetMo 1.6/add.svg" />
                                          <Typography
                                            mx={{
                                              marginLeft: "3px",
                                            }}
                                          >
                                            {" "}
                                            Add Resolution
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Popover>
                                </Box>
                              </div>
                            ) : (
                        
                              <div style={{
                                display: "flex",
                              
                              }}>

                                  <FormControlLabel
                                  
                                    onClick={() => {
                                      console.log("checked", permission);
                                      dispatch(
                                        setPermissionInSelectedPermission({
                                          permissionType,
                                          permission,
                                          value:
                                            !admin.selectedPermission.permissions[
                                              permissionType
                                            ][permission],
                                        })
                                      );
                                      window.permissionChanel.publish({
                                        [permission]:
                                          !admin.selectedPermission.permissions[
                                            permissionType
                                          ][permission],
                                      });
                                    }}
                                    control={
                                      <IOSSwitch
                                      theme={theme}
                                        sx={{ m: 1 }}
                                        defaultChecked={
                                          admin.selectedPermission.permissions[
                                            permissionType
                                          ][permission]
                                        }
                                      />
                                    }
                                    // labelPlacement=""
                                    label={
                                      <span
                                        style={{
                                          color: "#88A1AB",
                                          fontSize: "14px",
                                          fontFamily: "URW DIN REGULAR",
                                        }}
                                      >
                                        {titleCase(permission)}
                                      </span>
                                    }
                                  
                                  />
                              </div>
                          
                          
                            )}
                          </div>
                        );
                      }):
                      <div 
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                      }}
                      >

             
                    {  Object.keys(admin.selectedPermission.permissions[permissionType]||{}).map((permission) => {
                        return (
                         

                     <PermissionButton permission={permission} selectedPermission={selectedPermission}  setSelectedPermission={setSelectedPermission} />
                  )
                        
                        ;
                      })}
                               </div>
                      }
                    {/* </Scrollbars> */}
                  </Grid>
                );
              }
            )}
          </Grid>
          {/* </Scrollbars> */}
        </Box>
      </div>
      <Divider
        orientation="horizontal"
        style={{
          backgroundColor: "#002E56",
          height: "2px",
        }}
      />
    </>
  );
};

export default Permissions;
