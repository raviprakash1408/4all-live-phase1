import React, { useEffect, useState, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import MuiTableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import RoleDropdown from "./RoleDropdown";
import ConfigDropdown from "./ConfigDropdown";
import PositionDrop from "./PositionDrop";
import { AxiosLocal } from "../utilities/axiosUtils.ts";
import Skeleton from "@mui/material/Skeleton";
import { hasKey } from "../utilities/common";
import { getAllUsers } from "../livekitConnection/userMap.ts";

const TableCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});
const configroupFun = (name) => {
  if (name == "P") {
    return "Primary";
  } else if (name == "S") {
    return "Secondary";
  } else if (name == "V") {
    return "Viewer";
  } 
};

function Row(props) {
  const {setRefetch, row, search ,  onlineUsers,
    primaryUsers,
    secondaryUsers,
    viewerUsers,
    handRaisedUsers,} = props;
  const [open, setOpen] = React.useState(false);
  console.log(row,"rowrow");
  const classes = useRowStyles();
  const [userCategory, setuserCategory] = useState()
  const [userListRow, setuserListRow] = useState([]);
  useEffect(() => {
    setuserListRow([...row.items])
    setuserCategory(row)
  }, [row,search])


  //drag
const [isDragging, setisDragging] = useState(-1)
  const dragItem = useRef();
  const dragOverItem = useRef();

  useEffect(() => {
    console.log(onlineUsers,row.items, "onlineUsers");
  }, [onlineUsers, row.items]);

  const onlineNumber = (name) => {
    if (name == "P") {
      return Object.keys(primaryUsers).length;
    } else if (name == "S") {
      return Object.keys(secondaryUsers).length;
    } else if (name == "V") {
      return Object.keys(viewerUsers).length;
    } 
  };


  return (
    <React.Fragment>
      <TableRow
        className={classes.root}
        style={{
          backgroundColor: "#002E56",
          borderTop: "10px solid #012A50",
          cursor: "pointer",
        }}
        onClick={() => setOpen(!open)}
  
      >
     
        <TableCell
          component="th"
          scope="row"
          style={{
            fontSize: "14px",
            color: "#E1E7EA",
            cursor: "pointer",
            paddingLeft: "40px",
          }}
        >
          <span>
            {open ? (
              <img
              alt=""
                src={`${window.location.origin}/assets/icons/up.svg`}
                style={{ marginRight: "14px" }}
              />
            ) : (
              <img
              alt=""

                src={`${window.location.origin}/assets/icons/down.svg`}
                style={{ marginRight: "14px" }}
              />
            )}
          </span>
          {configroupFun(userCategory?.configroup)}
          <span
            style={{
              padding: "8px 10px",
              backgroundColor: "#012243",
              marginLeft: "13px",
              borderRadius: "4px",
              color: "#88A1AB",
            }}
          >
            {`${onlineNumber(userCategory?.configroup)} /${userCategory?.items.length}`}
          </span>
        </TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right"></TableCell>
        <TableCell align="right"></TableCell>
        {/* <TableCell align="right"></TableCell>
        <TableCell align="right"></TableCell> */}
      </TableRow>
      <TableRow
      
      onDragOver={(e) => {
        e.preventDefault();


        console.log('onDragOver',e)
      }}
      onDrop={(e) => {
        e.preventDefault();
        
        console.log('onDrop',e.dataTransfer.getData("id"),e.dataTransfer.getData("userType"),userCategory?.configroup,dragOverItem.current)
        // window.eventChanel.publish({
        //   event: "realtime_user_update",
        //   permission: "user_type",
        //   value: "P",
        //   user_id : window.room.myUserId()
  
        // }) 

        // update userListRow 
        // let temp = userListRow
        // let index = temp.findIndex((item) => item.id == e.dataTransfer.getData("id"))
        // temp[index].permission = userCategory?.configroup
        // setuserListRow([...temp])
        let users   = getAllUsers()
        console.log(users,"usersss");

      }}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse easing="ease-in-out" in={open} timeout="auto" unmountOnExit={true}>
            <Box style={{
              display:open ? "block" : "none",
              transition: "max-height 0.75s ease-out",
            }} padding={1}>
              <Table className={classes.table} aria-label="simple table">
                <TableBody  style={{borderCollapse:'collapse'}}>
                  {userListRow.map((historyRow, index) => {
                       if(historyRow == undefined){
                        return <></>
                      }
                      let online 
                  try {
                   online=hasKey(onlineUsers,historyRow.id.toString())
                 

                    if(historyRow.guestUser){
                      online = true
                    }
                  } catch (error) {
                    return <></>
                  }
             
                    return (
                    <TableRow
                      key={index}
                      className="tableCell"
                      draggable={search? false : true}
                      // draggable={false}
                      onDragStart={(e) => {
                        console.log('onDragStart',e)
                        e.dataTransfer.setData('id', historyRow.id);
                        e.dataTransfer.setData('userType', historyRow.viewType);

                        dragItem.current = historyRow

                      }}

                      onDragOver={(e) => {
                        e.preventDefault();
                        console.log('onDragOver',e)
                        dragOverItem.current = historyRow
                      }}


                      style={{cursor:'grab', borderBottom: isDragging==index ? '2px solid #008bcd' : '', marginBottom: isDragging==index ? '-2px' :'', width:'100%' }}
                    
               
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "white",
                          fontSize: "14px",
                          fontFamily: "URW DIN REGULAR",
                          width: "40%",
                          paddingLeft: "45px",
                          borderRadius:'4px 0 0 4px'

                        }}
                      >
                        {/* <div class="form-group">
                          <input type="radio" name="check" />
                        </div> */}
                        {/* <PositionDrop position={index + 1} /> */}
                        <span style={{ margin: "0px 14px 0px 4px" }}>
                          {historyRow.img ? (
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <img
                              src={`${historyRow.img}`}
                              style={{
                                height: "36px",
                                width: "36px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                //show online offline user here
                                border: `2px solid ${online ? "#008BCD" : "#ff0000"}`

                              }}
                            />
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                position: "relative",
                                height: "36px",
                                width: "36px",
                                borderRadius: "50%",
                                backgroundColor: "#012243",
                                //show online offline user here
                                border: `2px solid ${online ? "#008BCD" : "#ff0000"}`
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  // lineHeight: "36px",
                                  transform:
                                    "translateX(-50%) translateY(-50%)",
                                  color: "#88A1AB",
                                  fontSize: "18px",
                                  fontFamily: "URW DIN REGULAR",
                                  textTransform: "uppercase",
                                }}
                              >
                                {historyRow.name[0]}
                              </span>

                              <div style={{position:'absolute',bottom:'-6px',right:'-8px',width:'25px',height:'25px',backgroundColor:'#012243',borderRadius:'50%', fontSize:'12px', display:'flex', alignItems:'center', justifyContent:'center'}} >
                              {historyRow.guestUser ? <img style={{
                                width: "70%",
                              }} alt="" src={`${window.location.origin}/assets/icons/viewer.svg`}></img> : historyRow.desktop ?  <img style={{
                                width: "70%",
                              }} alt="" src={`${window.location.origin}/assets/bottomIcons/share_white.svg`}></img>:  index + 1 }
                               </div>
                            </div>

                          )}
                        </span>
                        {historyRow.name}
                        {historyRow.handRised ? (
                          <img
                            alt=""
                            src={`${window.location.origin}/assets/icons/hand-blue.svg`}
                            style={{ marginLeft: "12px" }}
                          />
                        ) : null}

                        {historyRow.moreButton ? (
                          <div
                            style={{
                              marginLeft: "20px",
                              backgroundColor: "#012A50",
                              borderRadius: "4px",
                              padding: "0px 3px",
                              height: "25px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                             alt=""

                              src={`${window.location.origin}/assets/bottomIcons/more.svg`}
                              style={{ filter: "brightness(0) invert(1)" }}
                            />
                          </div>
                        ) : null}
                      </TableCell>
                      {/* <TableCell align="right">{historyRow.name}</TableCell> */}
                      {/* <TableCell align="left" style={{width:'16%',color:'#88A1AB', fontSize:'14px',fontFamily:'URW DIN REGULAR'}}>{historyRow.email}</TableCell> */}

                      <TableCell align="left" style={{ width: "15%" }}>
                   <RoleDropdown  default={historyRow.guestUser ? "Guest":  historyRow.role } />
                      
                        {/* <SortByFileManager /> */}
                        {/* <select class="minimal" style={{fontFamily:'URW DIN REGULAR',border:'2px solid #032E57',backgroundColor:'#012A50',color:'#88A1AB'}}>
                          <option>CSS SELECT arrow (minimal)</option>
                          <option>No external background image</option>
                          <option>No wrapper</option>
                        </select> */}
                      </TableCell>

                      <TableCell align="left" style={{ width: "15%" }}>
                        <ConfigDropdown setRefetch={setRefetch} user={historyRow} default={historyRow.viewType} />
                        {/* <SortByFileManager /> */}
                      </TableCell>

                      <TableCell
                        align="right"
                        style={{
                          color: "#E1E7EA",
                          fontSize: "14px",
                          fontFamily: "URW DIN REGULAR",
                          width: "15%",
                        }}
                      >
                        100%
                      </TableCell>

                      <TableCell align="right" style={{ width: "15%" }}>
                        <Box
                          variant="contained"
                          sx={{ boxShadow: 0 }}
                          style={{
                            height: "40px",
                            width: "105px",
                            fontFamily: "URW DIN REGULAR",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            marginLeft: "6vw",
                            borderRadius:'0px 4px 4px 0px'

                          }}
                          className="viewButton"
                        >
                          View
                        </Box>
                      </TableCell>
                      {/* <TableCell></TableCell>
                      <TableCell></TableCell> */}
                    </TableRow>
                  )})}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({
  users,
   loading, 
   search,
   onlineUsers,
   primaryUsers,
   secondaryUsers,
   viewerUsers,
   handRaisedUsers,setRefetch }) {
    // state for filterdUsers and setFilteredUsers
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
      try {
    // remove configroup G from users
    const newfilteredUsers = users.filter((user) => user.configroup !== "G");
    // console.log("users CollapsibleTable", newfilteredUsers);
    // console.log("participant users CollapsibleTable",  window.room.participants);

      // filter participants by _properties.guestUser 
      let newfilteredParticipants =Object.values( window.room.participants).filter((user) => user._properties.guestUser == "true" || user._properties.desktop == "true" ).map((user) =>{
        return {
          "id": parseInt(user._properties.id),
          "name": user._properties.firstName,
          "img": "",
          "role": "Participant",
          "viewType": user._properties.user_type,
          "guestUser":user._properties.guestUser === "true",
          "desktop": user._properties.desktop === "true",

      }
      });

      // group newfilteredParticipants by viewType 
      let groupedParticipants = newfilteredParticipants.reduce((r, a) => {
        r[a.viewType] = [...r[a.viewType] || [], a];
        return r;
      }, {});


     newfilteredUsers.forEach(element => {
      element.items = element.items.concat(groupedParticipants[element.configroup])
     });

      
     setFilteredUsers(newfilteredUsers);
     console.log("participant users CollapsibleTable", groupedParticipants,newfilteredUsers);

    } catch (error) {
      console.log("error in CollapsibleTable", error);
    }
    }, [users]);


  return (
    <TableContainer
      style={{ marginTop: "16px" }}
      className="controlPanel no-scrollbar"
    >
      <Table
        aria-label="collapsible table"
        style={{ backgroundColor: "#012A50" }}
      >
        <TableHead style={{ backgroundColor: "#012243" }}>
          <TableRow style={{ backgroundColor: "#012243" }}>
            <TableCell
              style={{
                color: "white",
                fontFamily: "URW DIN REGULAR",
                width: "40%",
                paddingLeft: "40px",
              }}
            >
              Name
            </TableCell>
            {/* <TableCell align="left" style={{color:'white', fontFamily:'URW DIN REGULAR',width:'15%'}} >Email</TableCell> */}
            <TableCell
              align="left"
              style={{
                color: "white",
                fontFamily: "URW DIN REGULAR",
                width: "15%",
              }}
            >
              Role
            </TableCell>
            <TableCell
              align="left"
              style={{
                color: "white",
                fontFamily: "URW DIN REGULAR",
                width: "15%",
              }}
            >
              View Type
            </TableCell>
            {/* <TableCell align="left" style={{color:'white', fontFamily:'URW DIN REGULAR',width:'10%'}} >Position</TableCell> */}
            <TableCell
              align="right"
              style={{
                color: "white",
                fontFamily: "URW DIN REGULAR",
                width: "15%",
              }}
            >
              Volume
            </TableCell>
            {/* <TableCell
              align="right"
              style={{
                color: "white",
                fontFamily: "URW DIN REGULAR",
                width: "15%",
              }}
            >
              Subroom
            </TableCell> */}
            <TableCell
              align="right"
              style={{
                color: "white",
                fontFamily: "URW DIN REGULAR",
                width: "15%",
                paddingRight: "55px",
              }}
            >
              System Check
            </TableCell>
          </TableRow>
        </TableHead>
        {loading ? (
          <>
            <Skeleton
              variant="rounded"
              sx={{
                backgroundColor: "#012243",
                width: "250%",
                marginTop: "10px",
              }}
              height={48}
            />
            <Skeleton
              variant="rounded"
              sx={{
                backgroundColor: "#012243",
                width: "250%",
                marginTop: "10px",
              }}
              height={48}
            />
            <Skeleton
              variant="rounded"
              sx={{
                backgroundColor: "#012243",
                width: "250%",
                marginTop: "10px",
              }}
              height={48}
            />
          </>
        ) : (
          //           <TableBody style={{ backgroundColor: "#002E56" }}>
          // <TableRow
          //         style={{
          //           backgroundColor: "#002E56",
          //           borderTop: "10px solid #012A50",
          //           cursor: "pointer",
          //           width:'100%'
          //         }}>
          //              <Skeleton
          //         variant="rounded"
          //         sx={{ backgroundColor: "#012243",width:'250%' }}
          //         height={48}
          //       /></TableRow>

          //       <TableRow
          //         style={{
          //           backgroundColor: "#002E56",
          //           borderTop: "10px solid #012A50",
          //           cursor: "pointer",
          //           width:'100%'
          //         }}>
          //              <Skeleton
          //         variant="rounded"
          //         sx={{ backgroundColor: "#012243",width:'250%' }}
          //         height={48}
          //       /></TableRow>
          //       <TableRow
          //         style={{
          //           backgroundColor: "#002E56",
          //           borderTop: "10px solid #012A50",
          //           cursor: "pointer",
          //           width:'100%'
          //         }}>
          //              <Skeleton
          //         variant="rounded"
          //         sx={{ backgroundColor: "#012243",width:'250%' }}
          //         height={48}
          //       /></TableRow>

          // <TableRow
          //         style={{
          //           backgroundColor: "#002E56",
          //           borderTop: "10px solid #012A50",
          //           cursor: "pointer",
          //           width:'100%'
          //         }}>
          //              <Skeleton
          //         variant="rounded"
          //         sx={{ backgroundColor: "#012243",width:'250%' }}
          //         height={48}
          //       /></TableRow>

          //           </TableBody>
          <TableBody style={{ backgroundColor: "#002E56" }}>
            {filteredUsers.map((row) => (
              <Row
              setRefetch={setRefetch}
                onlineUsers={onlineUsers}
                primaryUsers={primaryUsers}
                secondaryUsers={secondaryUsers}
                viewerUsers={viewerUsers}
                handRaisedUsers={handRaisedUsers}
                key={row.name}
                row={row}
                search={search}
                setFilteredUsers={setFilteredUsers}
              

              />
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
