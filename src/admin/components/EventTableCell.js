import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import MuiTableCell from "@material-ui/core/TableCell";

import TableRow from "@material-ui/core/TableRow";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { AvatarGroup, Box, Avatar, Stack, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import ConfirmPop from "./ConfirmPop";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import Toast from "../../sections/Toast";
import EditableField from "./workflow/EditableField";
import EditableFieldEvent from "./EditableFieldEvent";
import CopiedToClip from "../CopiedToClip";
import CustomTooltip from "../CustomTooltip";
import { WEBSITE_DOMAIN } from "../../utilities/websiteUrls.ts";
import JoinNowButton from "./JoinNowButton";

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

const EventTableCell = ({
  historyRow,
  getEventList,
  users_list,
  main_event,
}) => {
  const permissions = useSelector((state) => state.permissions);
  const [hoverpop, setHoverpop] = React.useState(false);
  const [hoverbutton, setHoverbutton] = React.useState(false);
  const theme = useSelector((state) => state.theme.themeData);
  // const [users_list, setusers] = useState([]);
  const [userLoading, setuserLoading] = useState(true);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // copy toast

  const [state, setState] = React.useState({
    openCopyToast: false,
    vertical: "top",
    horizontal: "center",
  });

  // const { vertical, horizontal, openCopyToast } = state;

  const handleClick = (newState) => () => {
    setState({ openCopyToast: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, openCopyToast: false });
  };

  const [subroomId, setsubroomId] = React.useState();
  const [confirm, setConfirm] = React.useState(false);

  const handleClickOpen = () => {
    setConfirm(true);
  };

  const handleClickClose = () => {
    setConfirm(false);
  };
  const [openToast, setOpenToast] = React.useState(false);

  const singleDelete = () => {
    AxiosLocal.delete("subroom/", {
      data: { subroom_ids: [subroomId] },
    }).then((response) => {
      if (response.data.status === "Success") {
        setOpenToast(true);
        getEventList();
      }
    });
  };
  // useEffect(() => {
  //   users();
  // }, []);

  // const users = () => {
  //   AxiosLocal.post(`spaces/assigned/users/`, {
  //     space_ids: [historyRow.id],
  //   }).then((response) => {
  //     if (response.data.status == "Success") {
  //       setusers([...response.data.data[0].users]);
  //       setuserLoading(false);
  //     }
  //   });
  // };
  const [subroomName, setsubroomName] = React.useState(historyRow.name);

  return (
    <>
      <TableRow
        key={historyRow.id}
        className="tableCell"
        style={{
          cursor: "pointer",
          backgroundColor: hoverpop
            ? theme?.spacescolor?.hoverbackground
            : theme?.table?.rowColor,
          width: "100%",
        }}
        onMouseEnter={() => setHoverpop(true)}
        onMouseLeave={() => setHoverpop(false)}
      >
        {/* <div style={{ display: "flex", alignItems: "center" }}> */}
        {/* <Checkbox {...label}  sx={{  color:hoverpop?theme?.table?.rowColor : theme?.table?.buttonColor,
         
         '& .MuiSvgIcon-root': { fontSize: 22 } }} style={{marginLeft:'14px', width:'30px', height:'30px'}} className="checkbox" />
                    */}
        <TableCell
          // component="th"
          // scope="row"
          style={{
            display: "flex",
            alignItems: "center",
            color: theme?.table?.mainheadingColor,
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
          }}
        >
          <span>
            <EditableFieldEvent
              styles={true}
              row={historyRow}
              prevName={historyRow.name}
              type="subspace"
              hovered={hoverpop}
            />
          </span>
          {/* <p>{historyRow.name}</p> */}
        </TableCell>
        {/* </div> */}

        {/* <TableCell align="right">{historyRow.name}</TableCell> */}
        {/* <TableCell align="left" style={{color:'#88A1AB',  fontSize:'14px',fontFamily:'URW DIN REGULAR',width:'15%'}}>
          {historyRow.slug}

                      </TableCell> */}

        <TableCell
          align="left"
        // style={{ width: "25%" }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={3}
          >
            <AvatarGroup
              max={4}
              sx={{
                justifyContent: "start",
                "& .MuiAvatar-root": {
                  width: 40,
                  height: 40,
                  border: `2px solid ${theme?.table?.buttonColor}`,
                  backgroundColor: theme?.table?.rowColor,
                  color: theme.avatar.textcolor,
                  fontSize: "14px",
                  fontFamily: "URW DIN",
                },
              }}
            >
              {
                // userLoading?
                // <Avatar
                //       sx={{
                //         bgcolor: theme?.table?.buttonColor,
                //         height: "40px",
                //         border: `2px solid ${theme?.table?.buttonColor}`,
                //         width: "40px",
                //       }}
                //     >

                //     </Avatar>
                //     :

                users_list
                  .filter((item) => item.is_organization_user === false)
                  .map((item) => (
                    <>
                      {item.avatar ? (
                        <Avatar
                          src={item.avatar}
                          style={{
                            height: "40px",
                            width: "40px",
                            objectFit: "cover",
                            border: `2px solid ${theme?.table?.buttonColor}`,
                          }}
                          alt=""
                        />
                      ) : (
                        <Avatar
                          sx={{
                            bgcolor: "#012243",
                            height: "40px",
                            border: `2px solid ${theme?.table?.buttonColor}`,
                            width: "40px",
                          }}
                        >
                          {item.first_name[0]}
                          {item.last_name[0]}
                        </Avatar>
                      )}
                    </>
                  ))
              }
            </AvatarGroup>
          </Stack>
        </TableCell>

        <TableCell
          align="left"
        // style={{ width: "14%" }}
        ></TableCell>

        <TableCell
          align="left"
        // style={{ width: "10%" }}
        ></TableCell>
        <TableCell
          align="left"
        // style={{ width: "10%" }}
        ></TableCell>
        <TableCell
          align="left"
        // style={{ width: "10%" }}
        ></TableCell>
        <TableCell
          align="left"
        // style={{ width: "10%" }}
        >
          {/* <Link
            to={
              historyRow.is_lobby
                ? `/lobby/${historyRow.slug}`
                : `/${localStorage.getObject("organization_slug")}/${
                    historyRow.room_slug
                  }/${historyRow.slug}`
            }
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              onMouseEnter={() => setHoverbutton(true)}
              onMouseLeave={() => setHoverbutton(false)}
              style={{
                textTransform: "none",
                boxShadow:
                  "0px 1px 1px -2px rgb(0 0 0 / 15%), 0px 2px 2px 0px rgb(0 0 0 / 10%), 0px 1px 3px 0px rgb(0 0 0 / 10%)",
                padding: "8px 30px 8px 20px",
                fontSize: "16px",
                lineHeight: "22px",
                color: hoverpop
                  ? theme?.table?.headingColor
                  : theme?.table?.mainheadingColor,
                height: "42px",
                backgroundColor: hoverbutton
                  ? theme?.table?.mainColor2
                  : theme?.table?.buttonColor,
                transition: "none",
                fontFamily: "URW DIN REGULAR",
              }}
              className="joinNow"
            >
              <img alt="" src="/assets/admin/join-now.svg" />
              <span style={{ marginLeft: "16px" }}>Join&nbsp;now</span>
            </Button>
          </Link> */}
          {hoverpop &&
            users_list.some((el) => localStorage.getObject("id") == el.id) ? (
            <Link
              to={
                historyRow.is_master
                  ? historyRow.is_lobby
                    ? `/lobby/${localStorage.getObject("organization_slug")}/${main_event.slug
                    }`
                    : `/${localStorage.getObject("organization_slug")}/${main_event.slug
                    }`
                  : historyRow.is_lobby
                    ? `/lobby/${localStorage.getObject("organization_slug")}/${main_event.slug
                    }/${historyRow.slug}`
                    : `/${localStorage.getObject("organization_slug")}/${main_event.slug
                    }/${historyRow.slug}`
              }
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                onMouseEnter={() => setHoverbutton(true)}
                onMouseLeave={() => setHoverbutton(false)}
                style={{
                  textTransform: "none",
                  boxShadow:
                    "0px 1px 1px -2px rgb(0 0 0 / 15%), 0px 2px 2px 0px rgb(0 0 0 / 10%), 0px 1px 3px 0px rgb(0 0 0 / 10%)",
                  padding: "8px 30px 8px 20px",
                  fontSize: "16px",
                  lineHeight: "22px",
                  color: hoverpop
                    ? theme?.joinNowbutton?.bgcolorwhitee
                    : theme?.joinNowbutton?.bgcolorwhitee,
                  height: "42px",
                  backgroundColor: hoverbutton
                    ? theme?.joinNowbutton?.bgcolor1
                    : theme?.joinNowbutton?.bgcolor2,
                  transition: "none",
                  fontFamily: "URW DIN REGULAR",
                }}
                className="joinNow"
              >
                <img alt="" src="/assets/admin/join-now.svg" />
                <span style={{ marginLeft: "16px" }}>Join&nbsp;now</span>
              </Button>
            </Link>
          ) : (
            <Link
              to={
                historyRow.is_lobby
                  ? `/lobby/${localStorage.getObject("organization_slug")}/${historyRow.slug
                  }`
                  : `/${localStorage.getObject("organization_slug")}/${historyRow.room_slug
                  }/${historyRow.slug}`
              }
              style={{
                textDecoration: "none",
                opacity: 0,
                pointerEvents: "none",
              }}
            >
              <Button
                variant="contained"
                onMouseEnter={() => setHoverbutton(true)}
                onMouseLeave={() => setHoverbutton(false)}
                style={{
                  textTransform: "none",
                  boxShadow:
                    "0px 1px 1px -2px rgb(0 0 0 / 15%), 0px 2px 2px 0px rgb(0 0 0 / 10%), 0px 1px 3px 0px rgb(0 0 0 / 10%)",
                  padding: "8px 30px 8px 20px",
                  fontSize: "16px",
                  lineHeight: "22px",
                  color: hoverpop
                    ? theme?.table?.headingColor
                    : theme?.table?.mainheadingColor,
                  height: "42px",
                  backgroundColor: hoverbutton
                    ? theme?.table?.mainColor2
                    : theme?.table?.buttonColor,
                  transition: "none",
                  fontFamily: "URW DIN REGULAR",
                }}
                className="joinNow"
              >
                <img alt="" src="/assets/admin/join-now.svg" />
                <span style={{ marginLeft: "16px" }}>Join&nbsp;now</span>
              </Button>
            </Link>
          )}
        </TableCell>
        <TableCell
          align="center"
        // style={{ width: "18%" }}
        >
          {/* <Tooltip
            title={
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    padding: "6px 6px 0px 7px",
                    marginBottom: "5px",
                    borderRadius: "4px",
                    backgroundColor: "#002E56",
                    cursor: "pointer",
                  }}
                >
                  <img src="/assets/admin/copy.svg" />
                </div>
                <span
                  style={{
                    margin: "10px",
                    fontFamily: "URW DIN REGULAR",
                    color: "#88A1AB",
                    fontSize: "14px",
                  }}
                >
                  Copy&nbsp;share&nbsp;link
                </span>
              </div>
            }
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#143F63",
                },
              },
            }}
            placement="top-start"
          >
           <span style={{marginTop:'4px'}}  onClick={() =>{historyRow.should_notify ? navigator.clipboard.writeText(`https://fox16-MeetMo.io.io/lobby/${historyRow.slug}`) : navigator.clipboard.writeText(`https://fox16-MeetMo.io.io/${historyRow.room_slug}/${historyRow.slug}`)}}>
            <img
              src="/assets/admin/link.svg"
              style={{ padding: "0px 20px 0px 20px", }}
              alt=""
              className="linkIcon"
              onClick={handleClick({
                vertical: "bottom",
                horizontal: "center",
              })}
            />
            </span>
          </Tooltip> */}
          {!historyRow.is_master && permissions.share_space && (
            <CustomTooltip
              type="copy"
              text="Copy share link"
              placement="top-start"
            >
              <span
                style={{ marginTop: "4px" }}
                onClick={() => {
                  historyRow.should_notify
                    ? navigator.clipboard.writeText(
                      `${WEBSITE_DOMAIN}lobby/${localStorage.getObject(
                        "organization_slug"
                      )}/${historyRow.slug}`
                    )
                    : navigator.clipboard.writeText(
                      `${WEBSITE_DOMAIN}${localStorage.getObject(
                        "organization_slug"
                      )}/${historyRow.room_slug}/${historyRow.slug}`
                    );
                }}
              >
                <img
                  src="/assets/admin/link.svg"
                  style={{ padding: "0px 20px 0px 20px" }}
                  alt=""
                  className="linkIcon"
                  onClick={handleClick({
                    vertical: "bottom",
                    horizontal: "center",
                  })}
                />
              </span>
            </CustomTooltip>
          )}
          {/* <img
            src="/assets/admin/edit.svg"
            style={{ padding: "0px 20px 0px 20px", }}
            alt=""
            className="editIcon"
          /> */}
          {!historyRow.is_master && permissions.delete_space ? (
            <img
              src="/assets/admin/close-icon.svg"
              alt=""
              className="closeIcon"
              onMouseEnter={() => setsubroomId(historyRow.id)}
              onClick={handleClickOpen}
            />
          ) : (
            <></>
          )}
        </TableCell>
      </TableRow>
      <CopiedToClip state={state} handleClose={handleClose} />

      <ConfirmPop
        message="Are you sure you want to delete?"
        confirm={confirm}
        handleClickOpen={handleClickOpen}
        handleClickClose={handleClickClose}
        handleDelete={singleDelete}
      />
      <Toast
        openToast={openToast}
        setOpenToast={setOpenToast}
        message="Subroom deleted Successfully"
      />
    </>
  );
};

export default EventTableCell;
