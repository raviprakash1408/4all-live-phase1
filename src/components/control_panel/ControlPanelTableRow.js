import React,{useState, useRef, useEffect} from 'react'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import MuiTableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import TableRow from "@material-ui/core/TableRow";
import PositionDrop from '../../sections/PositionDrop';
import RoleDropdown from "../../sections/RoleDropdown";
import ConfigDropdown from "../../sections/ConfigDropdown";
import { makeStyles, withStyles } from "@material-ui/core/styles";

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

function ControlPanelTableRow(props) {

    const configroupFun = (name) => {
        if (name == "P") {
          return "Primary";
        } else if (name == "S") {
          return "Secondary";
        } else if (name == "V") {
          return "Viewer";
        } else if (name == "G") {
          return "Guest";
        }
      };
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const [userListRow, setuserListRow] = useState([...row.items]);
    //drag
  const [isDragging, setisDragging] = useState(-1)
    const dragItem = useRef();
    const dragOverItem = useRef();
  
    const dragStart = (e, position) => {
      console.log(position, "dragStart");
      dragItem.current=position
      e.target.style.outline = "2px dashed rgb(21 63 99)";
         
  
  
      // e.target.children[0].style.opacity = 0;
      // e.target.children[1].style.opacity = 0;
      // e.target.children[2].style.opacity = 0;
      // e.target.children[3].style.opacity = 0;
      // e.target.children[4].style.opacity = 0;
      e.target.style.cursor = "grab";
  
      e.target.style.backgroundColor = "transparent";
    };
  
    const dragEnter = (e, position) => {
      console.log(position, "dragEnter");
      dragOverItem.current=position
      setisDragging(position)
      // e.target.style.borderBottom = "2px solid #008bcd";
      // e.target.style.marginBottom = "-2px";
  
  
  
  
    };
  
    const dragStop = (e) => {
      e.target.style.outline = "none";
      e.target.style.cursor = "move";
      setisDragging(-1)
  
      // e.target.style.borderBottom = "none";
      // e.target.style.marginBottom = "0px";
       
  
      // e.target.children[0].style.opacity = 1;
      // e.target.children[1].style.opacity = 1;
      // e.target.children[2].style.opacity = 1;
      // e.target.children[3].style.opacity = 1;
      // e.target.children[4].style.opacity = 1;
  
      let dragItemArray = [...userListRow]
      const draggedItemContent = dragItemArray.splice(dragItem.current, 1)[0]
      dragItemArray.splice(dragOverItem.current, 0, draggedItemContent)
      dragItem.current = null
      dragOverItem.current = null
      setuserListRow(dragItemArray)
  
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
                alt=''
                  src={`${window.location.origin}/assets/icons/up.svg`}
                  style={{ marginRight: "14px" }}
                />
              ) : (
                <img
                alt=''
                  src={`${window.location.origin}/assets/icons/down.svg`}
                  style={{ marginRight: "14px" }}
                />
              )}
            </span>
            {configroupFun(row.configroup)}
            <span
              style={{
                padding: "8px 10px",
                backgroundColor: "#012243",
                marginLeft: "13px",
                borderRadius: "4px",
                color: "#88A1AB",
              }}
            >
              {row.items.length}
            </span>
          </TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
          {/* <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell> */}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box padding={1}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody  style={{borderCollapse:'collapse'}}>
                    {userListRow.map((historyRow, index) => (
                      <TableRow
                        key={index}
                        className="tableCell"
                        draggable={true}
                        style={{cursor:'move', borderBottom: isDragging==index ? '2px solid #008bcd' : '', marginBottom: isDragging==index ? '-2px' :'' }}
                        onDragStart={(e) => dragStart(e, index)}
                        onDragEnter={(e) => dragEnter(e, index)}
                        onDragEnd={(e) => dragStop(e)}
                        onDragOver={(e) => e.preventDefault()}
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
                          }}
                        >
                          {/* <Checkbox {...label} /> */}
                          <div class="form-group">
                            <input type="radio" name="check" />
                          </div>
                          <PositionDrop position={index + 1} />
                          <span style={{ margin: "0px 14px 0px 4px" }}>
                            {historyRow.img ? (
                              <img
                              alt=''
                                src={`${window.location.origin}/${historyRow.img}`}
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                  border: "1px solid #00CDB8",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  position: "relative",
                                  height: "40px",
                                  width: "40px",
                                  borderRadius: "50%",
                                  backgroundColor: "#012243",
                                }}
                              >
                                <span
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                    lineHeight: "40px",
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
  
                                {/* <img src="/assets/icons/red_dot.svg" style={{position:'absolute',bottom:'-1px',right:'-1px',width:'12px',height:'12px'}} /> */}
                              </div>
                            )}
                          </span>
                          {historyRow.name}
                          {historyRow.handRised ? (
                            <img
                            alt=''
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
                              alt=''
                                src={`${window.location.origin}/assets/bottomIcons/more.svg`}
                                style={{ filter: "brightness(0) invert(1)" }}
                              />
                            </div>
                          ) : null}
                        </TableCell>
                        {/* <TableCell align="right">{historyRow.name}</TableCell> */}
                        {/* <TableCell align="left" style={{width:'16%',color:'#88A1AB', fontSize:'14px',fontFamily:'URW DIN REGULAR'}}>{historyRow.email}</TableCell> */}
  
                        <TableCell align="left" style={{ width: "15%" }}>
                          <RoleDropdown />
                          {/* <SortByFileManager /> */}
                          {/* <select class="minimal" style={{fontFamily:'URW DIN REGULAR',border:'2px solid #032E57',backgroundColor:'#012A50',color:'#88A1AB'}}>
                            <option>CSS SELECT arrow (minimal)</option>
                            <option>No external background image</option>
                            <option>No wrapper</option>
                          </select> */}
                        </TableCell>
  
                        <TableCell align="left" style={{ width: "15%" }}>
                          <ConfigDropdown />
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
                            }}
                            className="viewButton"
                          >
                            View
                          </Box>
                        </TableCell>
                        {/* <TableCell></TableCell>
                        <TableCell></TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }


export default ControlPanelTableRow