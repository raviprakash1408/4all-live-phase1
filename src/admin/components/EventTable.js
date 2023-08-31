import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import MuiTableCell from "@material-ui/core/TableCell";
import FormControlLabel from "@mui/material/FormControlLabel";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import Toast from "../../sections/Toast";
// import {rows} from './EventData'
import { AvatarGroup, Box, Avatar, Stack, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import EventTableCell from "./EventTableCell";
import EventTypeDrop from "./EventTypeDrop";
import { Scrollbars } from "react-custom-scrollbars";
import JoinNowButton from "./JoinNowButton";

import Skeleton from "@mui/material/Skeleton";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import ConfirmPop from "./ConfirmPop";
import EditableFieldEvent from "./EditableFieldEvent";
import EditableText from "../../components/editableText";
import CopiedToClip from "../CopiedToClip";
import DatePopup from "./datePopup";
import Popover from "@mui/material/Popover";
import MaterialUIPickers from "./MaterialUIPickers";
import CustomTooltip from "../CustomTooltip";
import EventEdit from "./event/edit";
import { setLoggedinUsers } from "../../state/usersLoggedin/usersLoggedinSlice";
import CustomAvatarGroup from "../CustomAvatarGroup";
import SearbarEvent from "./SearbarEvent";
import { WEBSITE_DOMAIN } from "../../utilities/websiteUrls.ts";
import { shortNameCreator } from "../../utilities/shortName";
import { organizationUser } from "../../utilities/common";
import { toTimeZone } from "../../utilities/timeZoneUtils.ts";
import { WEBSITE_PATH } from "../../utilities/websiteUrls.ts";

const useStyles = makeStyles(() => ({
  customTooltip: {
    backgroundColor: "rgba(220, 0, 78, 0.8)",
  },
  customArrow: {
    color: "rgba(220, 0, 78, 0.8)",
  },
}));

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

function Row(props) {
  const {
    row,
    checkedList,
    handleCheckboxClick,
    // seteditEvent,
    setrowId,
    rowId,
    getEventList,
    centrifugoLoginUpdateDetails,
    onlineLoader,
    loggedInUsers,
    getEventListWithout,
  } = props;
  const permissions = useSelector((state) => state.permissions);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  // const [hoverpop, setHoverpop] = React.useState(false)
  const [openToast, setOpenToast] = React.useState(false);

  const theme = useSelector((state) => state.theme.themeData);

  const classess = useStyles();
  const [hoverbutton, setHoverbutton] = React.useState(false);
  const [eventType, seteventType] = React.useState(row.public_mode);

  function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      strTime
    );
  }

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
  const handlePreventClick = (e) => {
    e.stopPropagation();
  };

  const [hoverjoinbutton, setHoverjoinbutton] = React.useState(false);

  //confirm popup

  const [confirm, setConfirm] = useState(false);

  const handleClickOpen = () => {
    setConfirm(true);
  };

  const handleClickClose = () => {
    setConfirm(false);
  };
  //success toast
  const [openToastDelete, setOpenToastDelete] = useState(false);

  const singleDelete = () => {
    AxiosLocal.post(`event/delete/${rowId}/`).then((response) => {
      if (response.data.status == "Success") {
        setOpenToastDelete(true);
        getEventList();
      }
    });
  };

  const [editEvent, seteditEvent] = React.useState(false);

  const editEventfun = () => {
    window.loginChannel.publish({
      type: "asking_for_event_edit",
    });
  };

  const [userTooltip, setuserTooltip] = useState("");
  const [eventName, seteventName] = useState(row.name);

  //user delete
  const deleteUser = (item) => {
    AxiosLocal.post(`space/user/remove/`, {
      mainspace_id: row.id,
      user_id: item.id,
    }).then((response) => {
      if (response.data.status == "Success") {
        //  setremovedUsers()
        seteditToast(true);
        getEventListWithout();
      }
    });
  };

  // useer add
  const addUser = (item) => {
    AxiosLocal.post(`space/user/add/`, {
      mainspace_id: row.id,
      user_id: item.id,
    }).then((response) => {
      if (response.data.status == "Success") {
        //  setremovedUsers()
        seteditToast(true);
        getEventListWithout();
      }
    });
  };
  //popover for calender

  const [anchorElDate, setAnchorElDate] = React.useState(null);
  const handleClickDate = (event) => {
    setAnchorElDate(event.currentTarget);
  };
  const handleCloseDate = () => {
    setAnchorElDate(null);
  };
  const openDate = Boolean(anchorElDate);
  const id = openDate ? "simple-popover" : undefined;
  const [onlineUsersEvent, setonlineUsersEvent] = useState([]);
  //centrifugo staus online offline
  useEffect(() => {
    meetingStatus();
  }, []);
  let conference = useSelector((state) => state.conference);
  const meetingStatus = () => {
    let organizationId = localStorage.getObject("organizationId");
    // let subSpaceId = row.subroom_list[0]?.id;
    let subSpaceId = row.id;

    try {
      conference.centrifugoClient
        .presence(
          `space_channel_${subSpaceId}_${organizationId}_${WEBSITE_PATH}`
        )
        .then(
          function (resp) {
            const { clients } = resp;

            let loggedin_user_ids = [...onlineUsersEvent];
            for (const [key, value] of Object.entries(clients)) {
              try {
                let userId = value["chan_info"].user_id;
                loggedin_user_ids.push(userId);
              } catch (error) {
                console.log("Centrifuge Online Users Error", error);
              }
            }
            setonlineUsersEvent([...loggedin_user_ids]);
          },
          function (err) {
            console.log("presence error", err);
          }
        );
    } catch (error) {
      console.log("aaa");
    }
  };

  // search on user
  const [searchContent, setsearchContent] = useState(false);

  const [searchArr, setsearchArr] = useState([]);
  const [userLoading, setuserLoading] = useState(true);

  // subroom
  const [subroom, setsubroom] = useState([]);
  const [subroomLoading, setsubroomLoading] = useState(true);

  const handleChange = (event) => {
    let searchWord = event.target.value;
    if (searchWord) {
      setsearchContent(true);
    } else {
      setsearchContent(false);
    }
    AxiosLocal.post("user/search/team/", {
      search_text: searchWord,
    }).then((response) => {
      setsearchArr(response.data.data);
    });
  };
  const [editToast, seteditToast] = useState(false);
  const [showSection, setShowSection] = useState(false);
  useEffect(() => {
    users();
  }, []);

  const users = () => {
    AxiosLocal.post(`spaces/assigned/users/`, {
      space_ids: [row.id],
    }).then((response) => {
      if (response.data.status == "Success") {
        setsearchArr([...response.data.data[0].users]);
        setuserLoading(false);
      }
    });
  };

  const subrooms = () => {
    AxiosLocal.post(`spaces/sub/`, {
      main_space_slug: row.slug,
    }).then((response) => {
      console.log(response.data.data, "response.data.data");
      if (response.data.status == "Success") {
        setsubroom([...response.data.data]);
        setsubroomLoading(false);
      }
    });
  };

  return (
    <>
      <React.Fragment>
        <TableRow
          key={row.id}
          className={`${classes.root} collapseRow`}
          style={{
            backgroundColor: hoverjoinbutton
              ? theme?.spacescolor?.hoverbackground
              : theme.table.rowColor,
            borderTop: `10px solid ${theme.table.bgColor}`,
            cursor: "pointer",
          }}
          onMouseEnter={() => setHoverjoinbutton(true)}
          onMouseLeave={() => setHoverjoinbutton(false)}
          onClick={() => {
            setOpen(!open);
            if (!open) {
              subrooms();
            }
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              {...label}
              item={row}
              value={row.id}
              checked={checkedList.includes(row.id)}
              onChange={handleCheckboxClick}
              sx={{
                color: theme?.table?.buttonColor,

                "& .MuiSvgIcon-root": { fontSize: 22 },
                "&.Mui-checked": {
                  color: theme?.common?.color1,
                },
              }}
              style={{ marginLeft: "14px", width: "30px", height: "30px" }}
              onClick={handlePreventClick}
            />

            <TableCell
              component="th"
              scope="row"
              style={{
                display: "flex",
                alignItems: "center",
                color: theme?.table?.headingColor,
                fontSize: "14px",
                fontFamily: "URW DIN",
              }}
            >
              <CustomTooltip
                text={`${row.name} has ${row.subroom_count + 1} sub spaces`}
                placement="top-start"
              >
                <div
                  style={{
                    fontFamily: "URW DIN REGULAR",
                    color: theme?.common?.color7,
                    height: "20px",
                    width: "20px",
                    backgroundColor: theme?.login?.mainColor,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    marginRight: "8px",
                    // padding: "3px",
                  }}
                  onClick={handlePreventClick}
                >
                  {row.subroom_count + 1}
                </div>
              </CustomTooltip>
              {/* <div style={{ display: "flex", position: "relative" }}> */}
              <img
                src={row.main_logo}
                style={{
                  height: "40px",
                  width: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid rgb(20, 63, 99)",
                }}
                alt=""
              />
              {/* {onlineUsersEvent.length > 0 ? (
                  <img
                    alt=""
                    src="/assets/admin/blue-dot.svg"
                    style={{
                      position: "absolute",
                      bottom: "-1px",
                      right: "-1px",
                      width: "12px",
                      height: "12px",
                    }}
                  />
                ) : (
                  <img
                    alt=""
                    src="/assets/icons/red_dot.svg"
                    style={{
                      position: "absolute",
                      bottom: "-1px",
                      right: "-1px",
                      width: "12px",
                      height: "12px",
                    }}
                  />
                )} */}
              {/* </div> */}
              <span style={{ paddingLeft: "14px" }}>
                <EditableFieldEvent
                  row={row}
                  styles={false}
                  prevName={row.name}
                  type="space"
                  hovered={hoverjoinbutton}
                />

                {/* <EditableText onSave={(value)=>{
                    console.log(value,"fdfdgd");
                  }} value={row.name}/> */}
              </span>

              {/* <p style={{ paddingLeft: "14px" }}>{row.name}</p> */}
            </TableCell>
          </div>
          {/* <TableCell
            align="left"
            style={{
              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
              color: "#88A1AB",
            }}
          >
            <p onClick={handlePreventClick}>{row.slug}</p>
          </TableCell> */}
          <TableCell
            align="center"
            style={{
              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
              color: "#88A1AB",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={3}
              // onMouseEnter={() => setsearchArr([...row.users])}
            >
              <Tooltip
                title={
                  <div
                    className="avatar-scroll"
                    style={{
                      maxHeight: "250px",
                      overflowY: "scroll",
                      width: "210px",
                      marginRight: "-8px",
                    }}
                    onClick={handlePreventClick}
                  >
                    {/* <SearbarEvent type="edit" handleChange={handleChange} /> */}
                    {searchArr
                      .filter((item) => item.is_organization_user === false)
                      .map((user) => (
                        <div
                          style={{
                            display: "flex",
                            position: "relative",
                            alignItems: "center",
                          }}
                          onMouseEnter={() => setuserTooltip(user.id)}
                          onMouseLeave={() => setuserTooltip("")}
                          onClick={handlePreventClick}
                        >
                          <div
                            style={{
                              height: "33px",
                              width: "33px",
                              // position: "relative",
                              textAlign: "center",
                              // margin: "0px 15px 0px 20px",
                              verticalAlign: "middle",
                              lineHeight: "33px",
                              borderRadius: "50%",
                              backgroundColor:
                                theme?.spacescolor?.backgroundwhite,
                              color: "#88A1AB",
                              fontSize: "12px",
                              fontFamily: "URW DIN REGULAR",
                              textTransform: "uppercase",
                              // border:'2px solid #012A50'
                            }}
                          >
                            <span>
                              {user?.first_name[0]} {user?.last_name[0]}
                            </span>
                          </div>
                          <div
                            style={{
                              margin: "10px",
                              fontFamily: "URW DIN REGULAR",
                              color: "#88A1AB",
                              fontSize: "14px",
                            }}
                          >
                            {user?.first_name} {user?.last_name}
                          </div>
                          {/* {searchArr.some((el) => user.id == el.id) ? (
                          <img
                            onClick={() => deleteUser(user)}
                            src="/assets/admin/close-icon.svg"
                            alt=""
                            style={{
                              filter:
                                "brightness(0) saturate(100%) invert(15%) sepia(28%) saturate(2991%) hue-rotate(182deg) brightness(94%) contrast(106%)",
                              position: "absolute",
                              right: "5px",
                              width: "11px",
                              height: "11px",
                              opacity: user.id == userTooltip ? 1 : 0,
                              cursor: "pointer",
                            }}
                          />
                        ) : (
                          <img
                            alt=""
                            onClick={() => {
                              addUser(user);
                              console.log("clicked");
                            }}
                            src="/assets/icons/plus.svg"
                            style={{
                              filter:
                                "brightness(0) saturate(100%) invert(9%) sepia(92%) saturate(2129%) hue-rotate(194deg) brightness(94%) contrast(99%)",
                              position: "absolute",
                              right: "5px",
                              width: "11px",
                              height: "11px",
                              opacity: user.id == userTooltip ? 1 : 0,
                              cursor: "pointer",
                            }}
                          />
                        )} */}
                        </div>
                      ))}
                    {/* </Scrollbars> */}
                  </div>
                }
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: theme?.table?.buttonColor,
                    },
                  },
                  arrow: {
                    sx: {
                      color: theme?.addmember?.checkboxcolor7,
                      fontSize: "22px",
                    },
                  },
                }}
                placement="bottom"
                arrow
              >
                {/* <AvatarGroup
                  max={4}
                  sx={{
                    justifyContent: "start",
                    "& .MuiAvatar-root": {
                      width: 40,
                      height: 40,
                      border: onlineUsersEvent.includes(String(6))
                        ? "2px solid yellow"
                        : `2px solid ${theme?.table?.buttonColor}`,
                      backgroundColor: theme?.table?.rowColor,
                      color: "#5D7C90",
                      fontSize: "14px",
                      fontFamily: "URW DIN",
                    },
                  }}
                  onClick={handlePreventClick}
                >
             
                  {row.users.map((item) => (
                    <>
                      {item.avatar ? (
                        <Avatar
                          src={item.avatar}
                          style={{
                            height: "40px",
                            width: "40px",
                            objectFit: "cover",
                             }}
                          alt=""
                        />
                      ) : (
                        <Avatar
                          sx={{
                            bgcolor: "#012243",
                            height: "40px",
                            width: "40px",
                          }}
                        >
                          {item?.first_name[0]}
                          {item?.last_name[0]}
                       
                        </Avatar>
                      )}
                    </>
                  ))}

                 
                </AvatarGroup> */}
                {userLoading ? (
                  <div style={{ display: "flex" }}>
                    <Skeleton
                      style={{
                        backgroundColor: theme?.loading?.loadingColor,
                        marginRight: "-7px",
                      }}
                      variant="circular"
                      width={40}
                      height={40}
                    />
                    <Skeleton
                      style={{
                        backgroundColor: theme?.loading?.loadingColor,
                        marginRight: "-7px",
                      }}
                      variant="circular"
                      width={40}
                      height={40}
                    />
                    <Skeleton
                      style={{
                        backgroundColor: theme?.loading?.loadingColor,
                        marginRight: "-7px",
                      }}
                      variant="circular"
                      width={40}
                      height={40}
                    />
                    <Skeleton
                      style={{
                        backgroundColor: theme?.loading?.loadingColor,
                        marginRight: "-7px",
                      }}
                      variant="circular"
                      width={40}
                      height={40}
                    />
                  </div>
                ) : (
                  <div style={{ display: "flex" }}>
                    {searchArr
                      .filter((item) => item.is_organization_user === false)
                      .slice(0, 3)
                      .map((item) => (
                        <CustomAvatarGroup
                          item={shortNameCreator(
                            item.first_name,
                            item.last_name
                          )}
                          avatar={item.avatar}
                          onlineUsersEvent={onlineUsersEvent}
                        />
                      ))}
                    {searchArr.filter(
                      (item) => item.is_organization_user === false
                    ).length > 3 && (
                      <div
                        style={{
                          backgroundColor: theme?.spacescolor?.color1,
                          textAlign: "center",
                          verticalAlign: "middle",
                          lineHeight: "36px",
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          color: "#88A1AB",
                          border: `2px solid ${theme?.spacescolor?.bordercolor}`,
                          marginRight: "-7px",
                        }}
                      >
                        +{searchArr.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </Tooltip>
            </Stack>
          </TableCell>
          <TableCell
            align="center"
            style={{
              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
              color: "#88A1AB",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme?.table?.bgColor,
                borderRadius: "4px",
                height: "40px",
              }}
              onClick={handlePreventClick}
            >
              <div
                style={{ display: "flex" }}
                //  onClick={handleClickDate}
                onClick={() => {
                  seteditEvent(true);
                  editEventfun();
                  setShowSection(true);
                }}
              >
                {row.event_mode ? (
                  <img src="/assets/admin/calender.svg" alt="" />
                ) : (
                  <></>
                )}
                <p
                  style={{
                    marginLeft: "8px",
                    paddingTop: "3px",
                    lineHeight: "17px",
                    padding: "0px",
                  }}
                >
                  {row.event_mode
                    ? toTimeZone(row.event_start)
                    : "Event mode off"}
                  <br />
                  {row.event_mode ? toTimeZone(row.event_end) : ""}
                </p>
              </div>
            </Box>
            {/* <DatePopup anchorEl={anchorElDate} open={openDate} handleClose={handleCloseDate} /> */}

            <Popover
              id={id}
              open={openDate}
              anchorEl={anchorElDate}
              onClose={handleCloseDate}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              onClick={handlePreventClick}
            >
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: theme?.calender?.bgcolor1,
                  width: "400px",
                  padding: "10px",
                  fontFamily: "URW DIN REGULAR",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#88A1AB",
                  border: `1px solid ${theme?.calender?.bordercolor}`,
                }}
              >
                <MaterialUIPickers />
                to
                <MaterialUIPickers />
              </Box>
            </Popover>

            {/* <MaterialUIPickers /> */}
          </TableCell>

          {/* <TableCell
            align="center"
            style={{
              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
              color: theme?.table?.headingColor,
            }}
          >
       
            {onlineUsersEvent.length > 0 ? (
              <div>
                <img
                  src="/assets/admin/blue-dot.svg"
                  style={{
                    paddingRight: "10px",
                    height: "12px",
                    width: "12px",
                  }}
                  alt=""
                  onClick={handlePreventClick}
                />
                <span onClick={handlePreventClick}>Online</span>
              </div>
            ) : (
              <div>
                <img
                  src="/assets/icons/red_dot.svg"
                  style={{
                    paddingRight: "10px",
                    height: "12px",
                    width: "12px",
                  }}
                  alt=""
                  onClick={handlePreventClick}
                />

                <span onClick={handlePreventClick}>Offline</span>
              </div>
            )}
          </TableCell> */}
          <TableCell align="center">
            <div onClick={handlePreventClick}>
              <EventTypeDrop
                seteventType={seteventType}
                eventType={eventType}
                eventId={row.id}
              />
              {/* <SortbyDrop /> */}
            </div>
            {/* {row.publicMode ?
      <img src="/assets/admin/Switchactive.svg" /> :
      <img src="/assets/admin/Switchinactive.svg" />
} */}
          </TableCell>
          {hoverjoinbutton &&
          searchArr.some((el) => localStorage.getObject("id") == el.id) ? (
            <TableCell align="center">
              <JoinNowButton
                setHoverbutton={setHoverbutton}
                handlePreventClick={handlePreventClick}
                theme={theme}
                hoverbutton={hoverbutton}
                event={row}
                users={searchArr}
              />
            </TableCell>
          ) : (
            <TableCell style={{ opacity: 0 }} align="center">
              <JoinNowButton
                setHoverbutton={setHoverbutton}
                handlePreventClick={handlePreventClick}
                theme={theme}
                hoverbutton={hoverbutton}
                event={row}
                users={searchArr}
              />
            </TableCell>
          )}
          {/* <TableCell align="left"  >
        <JoinNowButton setHoverbutton={setHoverbutton} handlePreventClick={handlePreventClick} theme={theme} hoverbutton={hoverbutton}/>
        </TableCell> */}

          {/* {!hoverjoinbutton ? 

<TableCell align="left" style={{color:theme?.table?.rowColor}} > 

</TableCell>
: */}
          <TableCell
            align="center"
            style={{ display: "flex" }}
            onClick={handlePreventClick}
          >
            {organizationUser(permissions.share_space) && (
              <CustomTooltip
                type="copy"
                text="Copy share link"
                placement="top-start"
              >
                <span
                  style={{ marginTop: "4px", padding: "0px 20px 0px 0px" }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${WEBSITE_DOMAIN}${localStorage.getObject(
                        "organization_slug"
                      )}/${row.slug}`
                    );
                    // row.is_lobby
                    //   ? navigator.clipboard.writeText(
                    //       `${WEBSITE_DOMAIN}lobby/${localStorage.getObject(
                    //         "organization_slug"
                    //       )}/${row.slug}`
                    //     )
                    //   : navigator.clipboard.writeText(
                    //       `${WEBSITE_DOMAIN}${localStorage.getObject(
                    //         "organization_slug"
                    //       )}/${row.slug}`
                    //     );
                  }}
                >
                  <img
                    src="/assets/admin/link.svg"
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
            {organizationUser(permissions.edit_space) && (
              <CustomTooltip text="Edit" placement="top-start">
                <img
                  src="/assets/admin/edit.svg"
                  style={{ padding: "0px 20px 0px 0px" }}
                  alt=""
                  className="editIcon"
                  onClick={() => {
                    seteditEvent(true);
                    editEventfun();
                  }}
                />
              </CustomTooltip>
            )}

            {organizationUser(permissions.delete_space) && (
              <CustomTooltip text="Delete" placement="top-start">
                <img
                  src="/assets/admin/close-icon.svg"
                  alt=""
                  className="closeIcon"
                  onMouseEnter={() => setrowId(row.id)}
                  onClick={handleClickOpen}
                />
              </CustomTooltip>
            )}
          </TableCell>
          {/* }  */}
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box padding={1}>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: theme?.table?.buttonColor,
                    color: theme?.table?.headingColor,
                    fontSize: "14px",
                    fontFamily: "URW DIN",
                    textAlign: "center",
                    height: "30px",
                    lineHeight: "30px",
                  }}
                >
                  Sub spaces
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "4px",
                  }}
                ></div>
                <div
                  // className="avatar-scroll"
                  style={{
                    maxHeight: "300px",
                    overflowY: "scroll",
                    width: "100%",
                  }}
                >
                  <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                      {/* <Scrollbars style={{ width: "1112%", height: "150px" }}> */}
                      {/* <div
                      // className="avatar-scroll"
                      style={{
                        maxHeight: "300px",
                        overflowY: "scroll",
                        width:'150%'
                      }}
                    > */}
                      {subroomLoading
                        ? [...Array(row.subroom_count)].map((i) => {
                            return (
                              <>
                                <Skeleton
                                  variant="rounded"
                                  sx={{
                                    backgroundColor:
                                      theme?.loading?.loadingColor,
                                    width: "100%",
                                    height: "72px",
                                    marginBottom: "4px",
                                  }}
                                />
                              </>
                            );
                          })
                        : subroom.map((historyRow) => (
                            <>
                              <EventTableCell
                                historyRow={historyRow}
                                getEventList={getEventList}
                                users_list={searchArr}
                                main_event={row}
                              />
                            </>
                          ))}

                      {/* </div> */}
                      {/* </Scrollbars> */}
                    </TableBody>
                  </Table>
                </div>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
      {editEvent && (
        <EventEdit
          seteditEvent={seteditEvent}
          event={row}
          editEvent={editEvent}
          centrifugoLoginUpdateDetails={centrifugoLoginUpdateDetails}
          onlineLoader={onlineLoader}
          loggedInUsers={loggedInUsers}
          getEventList={getEventList}
          showSection={showSection}
          setShowSection={setShowSection}
          getEventListWithout={getEventListWithout}
        />
      )}

      <CopiedToClip state={state} handleClose={handleClose} />

      <ConfirmPop
        message="Are you sure you want to delete? Subroom related to this space will be lost."
        confirm={confirm}
        handleClickOpen={handleClickOpen}
        handleClickClose={handleClickClose}
        handleDelete={singleDelete}
      />

      <Toast
        openToast={openToastDelete}
        setOpenToast={setOpenToastDelete}
        message="Space Deleted Successfully"
      />

      <Toast
        openToast={editToast}
        setOpenToast={seteditToast}
        message="Space Updated Successfully"
      />
    </>
  );
}

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
//   createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
//   createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
//   createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5)
// ];

export default function EventTable({
  rows,
  checkedList,
  setCheckedList,
  loading,
  getEventList,
  centrifugoLoginUpdateDetails,
  onlineLoader,
  loggedInUsers,
  getEventListWithout,
}) {
  const theme = useSelector((state) => state.theme.themeData);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [itemsChecked, setItemsChecked] = useState(false);

  const handleCheckboxClick = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setCheckedList([...checkedList, value * 1]);
    } else {
      setCheckedList(checkedList.filter((item) => item != value));
    }
  };

  const selectItem = (e) => {
    const { checked } = e.target;
    const collection = [];

    if (checked) {
      for (const row of rows) {
        collection.push(row.id);
      }
    }
    setCheckedList(collection);
    setItemsChecked(checked);
  };
  // const [editEvent, seteditEvent] = React.useState(false);
  const [rowId, setrowId] = React.useState(-1);
  return (
    <>
      {loading ? (
        <>
          <Skeleton
            variant="rounded"
            sx={{
              backgroundColor: theme?.loading?.loadingColor,
              width: "100%",
              marginTop: "10px",
            }}
            height={62}
          />
          <Skeleton
            variant="rounded"
            sx={{
              backgroundColor: theme?.loading?.loadingColor,
              marginTop: "10px",
              width: "100%",
            }}
            height={76}
          />
          <Skeleton
            variant="rounded"
            sx={{
              backgroundColor: theme?.loading?.loadingColor,
              marginTop: "10px",
              width: "100%",
            }}
            height={76}
          />
          <Skeleton
            variant="rounded"
            sx={{
              backgroundColor: theme?.loading?.loadingColor,
              marginTop: "10px",
              width: "100%",
            }}
            height={76}
          />
          <Skeleton
            variant="rounded"
            sx={{
              backgroundColor: theme?.loading?.loadingColor,
              marginTop: "10px",
              width: "100%",
            }}
            height={76}
          />
          <Skeleton
            variant="rounded"
            sx={{
              backgroundColor: theme?.loading?.loadingColor,
              marginTop: "10px",
              width: "100%",
            }}
            height={76}
          />
          <Skeleton
            variant="rounded"
            sx={{
              backgroundColor: theme?.loading?.loadingColor,
              marginTop: "10px",
              width: "100%",
            }}
            height={76}
          />
          <Skeleton
            variant="rounded"
            sx={{
              backgroundColor: theme?.loading?.loadingColor,
              marginTop: "10px",
              width: "100%",
            }}
            height={76}
          />
          <Skeleton
            variant="rounded"
            sx={{
              backgroundColor: theme?.loading?.loadingColor,
              marginTop: "10px",
              width: "100%",
            }}
            height={76}
          />
        </>
      ) : (
        <>
          <Table
            aria-label="collapsible table"
            style={{ marginTop: "10px" }}
             elevation={0}
          >
            <TableHead>
              <TableRow style={{ backgroundColor: theme?.table?.headerColor }}>
                <TableCell
                  style={{
                    color: "white",
                    fontFamily: "URW DIN REGULAR",
                    // width: "25%",
                    paddingLeft: "40px",
                  }}
                >
                  <Checkbox
                    {...label}
                    checked={rows.length == checkedList.length}
                    onClick={selectItem.bind(this)}
                    sx={{
                      color: theme?.table?.buttonColor,

                      "& .MuiSvgIcon-root": { fontSize: 22 },
                      "&.Mui-checked": {
                        color: theme?.common?.color1,
                      },
                    }}
                    style={{
                      width: "30px",
                      height: "30px",
                      marginLeft: "-26px",
                    }}
                  />
                  <span style={{ paddingLeft: "15px" }}>Space Name</span>
                </TableCell>
                {/* <TableCell
                  align="left"
                  style={{
                    color: "white",
                    fontFamily: "URW DIN REGULAR",
                    width: "15%",
                  }}
                >
                  Slug
                </TableCell> */}
                <TableCell
                  align="left"
                  style={{
                    color: "white",
                    fontFamily: "URW DIN REGULAR",
                    // width: "15%",
                  }}
                >
                  Users
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    fontFamily: "URW DIN REGULAR",
                    // width: "15%",
                  }}
                >
                  Event Start Date End Date
                </TableCell>
                {/* <TableCell
                  align="center"
                  style={{
                    color: "white",
                    fontFamily: "URW DIN REGULAR",
                    width: "10%",
                  }}
                >
                  Status
                </TableCell> */}
                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    fontFamily: "URW DIN REGULAR",
                    // width: "9%",
                  }}
                >
                  Space Type
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    color: "white",
                    fontFamily: "URW DIN REGULAR",
                    // width: "10%",
                  }}
                ></TableCell>

                <TableCell
                  align="center"
                  style={{
                    color: "white",
                    fontFamily: "URW DIN REGULAR",
                    // width: "10%",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Scrollbars
            style={{
              width: "100%",
              height: "82vh",
            }}
          >
            <TableContainer className="eventListView">
              <Table aria-label="collapsible table" elevation={0}>
                <TableBody style={{ backgroundColor: theme?.table?.rowColor }}>
                  {rows.map((row) => (
                    <Row
                      key={row.id}
                      row={row}
                      handleCheckboxClick={handleCheckboxClick}
                      checkedList={checkedList}
                      // seteditEvent={seteditEvent}
                      setrowId={setrowId}
                      rowId={rowId}
                      getEventList={getEventList}
                      centrifugoLoginUpdateDetails={
                        centrifugoLoginUpdateDetails
                      }
                      onlineLoader={onlineLoader}
                      loggedInUsers={loggedInUsers}
                      getEventListWithout={getEventListWithout}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbars>
        </>
      )}
    </>
  );
}
