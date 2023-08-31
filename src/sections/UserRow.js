import React, { useRef } from "react";
import TableRow from "@material-ui/core/TableRow";
import MuiTableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";

import RoleDropdown from "./RoleDropdown";
import ConfigDropdown from "./ConfigDropdown";

import PositionDrop from "./PositionDrop";
const TableCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);
//drag

// const dragItem = useRef();
// const dragOverItem = useRef();

const dragStart = (e, position) => {
  console.log(position, "position");
  //   dragItem.current = position;
  console.log(e.target.innerHTML);
  e.target.style.outline = "2px dashed rgb(21 63 99)";
  e.target.children[0].style.opacity = 0;
  e.target.children[1].style.opacity = 0;
  e.target.children[2].style.opacity = 0;
  e.target.children[3].style.opacity = 0;
  e.target.children[4].style.opacity = 0;
  e.target.children[5].style.opacity = 0;

  e.target.style.backgroundColor = "transparent";
};

const dragStop = (e) => {
  e.target.style.outline = "none";
  e.target.children[0].style.opacity = 1;
  e.target.children[1].style.opacity = 1;
  e.target.children[2].style.opacity = 1;
  e.target.children[3].style.opacity = 1;
  e.target.children[4].style.opacity = 1;
  e.target.children[5].style.opacity = 1;
};

const UserRow = ({ historyRow, index }) => {
  return (
    <TableRow
      key={historyRow.name}
      className="tableCell"
      draggable={true}
      onDragStart={(e) => dragStart(e, index)}
      onDragEnd={(e) => dragStop(e, index)}
      //   onDragEnter={(e) => dragEnter(e, index)}
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
          width: "30%",
        }}
      >
        {/* <Checkbox {...label} /> */}
        <div class="form-group">
          <input type="radio" name="check" />
        </div>
        <PositionDrop />
        <span style={{ margin: "0px 14px 0px 4px" }}>
          <img
            src={historyRow.img}
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "1px solid #00CDB8",
            }}
          />
        </span>
        {historyRow.name}
        {historyRow.handRised ? (
          <img
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
        {historyRow.volume}
      </TableCell>
      <TableCell align="center" style={{ color: "#E1E7EA", width: "20%" }}>
        {historyRow.subroom}
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
          }}
          className="viewButton"
        >
          View
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
