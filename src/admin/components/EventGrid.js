import React, { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import MoreButton from "./MoreButton";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import Toast from "../../sections/Toast";
import { Link } from "react-router-dom";
import PopoverCustom from "./Popover";
import EventEdit from "./event/edit";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const EventGrid = ({
  checked,
  setChecked,
  selectedItem,
  events,
  loading,
  setloading,
  getEventList,
  centrifugoLoginUpdateDetails,
  onlineLoader,
  loggedInUsers,
}) => {
  const theme = useSelector((state) => state.theme.themeData);

  //loader function
  const loaderFun = () => {
    return (
      <li
        style={{
          borderRadius: "4px",
          padding: "0px 0px 14px",
          cursor: "pointer",
          backgroundColor: "#012243",
          position: "relative",
        }}
        className="eventGrid"
      >
        <Skeleton
          variant="rounded"
          sx={{
            backgroundColor: theme?.loading?.loadingColor,
            width: "100%",
            height: "180px",
          }}
        />
        <Skeleton
          variant="circular"
          style={{
            width: "138px",
            height: "138px",
            position: "absolute",
            left: "0px",
            right: "0px",
            top: "25px",
            margin: "0px auto",
          }}
        />
        <Typography gutterBottom component="div">
          <Skeleton variant="rounded" />
        </Typography>

        <Typography variant="body3">
          <Skeleton variant="rounded" />
        </Typography>
      </li>
    );
  };

  const [moreGrid, setMoreGrid] = useState(-1);
  const [allcheck, setAllcheck] = useState(null);

  const handleChecked = (id) => (e) => {
    const { checked } = e.target;
    setChecked((values) => ({
      ...values,
      [id]: checked,
    }));
  };

  const checkall = () => {
    if (selectedItem > 0) {
      setAllcheck("checked");
    } else {
      setAllcheck(null);
    }
  };
  useEffect(() => {
    checkall();
  }, [handleChecked]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var weekdays = new Array(7);
  weekdays[0] = "Sun";
  weekdays[1] = "Mon";
  weekdays[2] = "Tue";
  weekdays[3] = "Wed";
  weekdays[4] = "Thu";
  weekdays[5] = "Fri";
  weekdays[6] = "Sat";

  function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return (
      months[date.getMonth()] +
      " " +
      weekdays[date.getDay()] +
      " " +
      date.getDate() +
      " " +
      date.getFullYear() +
      " " +
      strTime
    );
  }

  //success toast
  const [openToastDelete, setOpenToastDelete] = useState(false);

  const singleDelete = () => {
    AxiosLocal.post(`event/delete/${moreGrid}/`).then((response) => {
      console.log(response, "handleAddSpace");
      if (response.data.status == "Success") {
        setOpenToastDelete(true);
        getEventList();
        handleClose();
      }
    });
  };

  const [eventTile, seteventTile] = useState([]);
  const [editEvent, seteditEvent] = useState(false);
  const [showSection, setShowSection] = useState(false);
  // popover

  const [anchorElPop, setAnchorElPop] = React.useState(null);
  const handleClickPop = (event) => {
    setAnchorElPop(event.currentTarget);
  };
  const handleClosePop = () => {
    setAnchorElPop(null);
  };
  const openPop = Boolean(anchorElPop);
  const [assignedUsers, setassignedUsers] = useState([]);
  const users = (id) => {
    AxiosLocal.post(`spaces/assigned/users/`, {
      space_ids: [id],
    }).then((response) => {
      if (response.data.status == "Success") {
        setassignedUsers([...response.data.data[0].users]);
      }
    });
  };

  return (
    <div>
      <Scrollbars style={{ width: "100%", height: "82vh" }}>
        {loading ? (
          <>
            <ul
              className="flex flex-wrap eventGridView"
              style={{ gap: "30px", listStyle: "none", paddingLeft: "25px" }}
            >
              {[...Array(5)].map((x, i) => loaderFun())}
            </ul>
          </>
        ) : (
          <ul
            className="flex flex-wrap eventGridView"
            style={{ gap: "30px", listStyle: "none", paddingLeft: "25px" }}
          >
            {events.map((item, index) => (
              <li
                key={item.id}
                sx={{
                  "&hover": {
                    backgroundColor: "green !important", // theme.palette.primary.main
                  },
                }}
                style={{
                  borderRadius: "4px",
                  padding: "25px 0px 12px",
                  minHeight: "200px",
                  cursor: "pointer",
                  position: "relative",
                  backgroundColor: theme?.spacescolor?.backgroundwhite,
                }}
                onMouseEnter={() => {
                  setMoreGrid(item.id);
                  seteventTile(item);
                  users(item.id);
                }}
                onMouseLeave={() => {
                  setMoreGrid(-1);
                  seteventTile([]);
                }}
                className={`eventGrid ${
                  (open && moreGrid === item.id) ||
                  (openPop && moreGrid === item.id)
                    ? "active"
                    : ""
                }`}
              >
                <div>
                  <img
                    src={item.main_logo}
                    alt=""
                    style={{
                      width: "138px",
                      height: "138px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />

                  <Checkbox
                    checked={checked[item.id]}
                    onClick={handleChecked(item.id)}
                    {...label}
                    sx={{
                      color: theme?.selectimage?.imagebackground,

                      "& .MuiSvgIcon-root": { fontSize: 30 },
                      "&.Mui-checked": {
                        color: theme?.common?.color1,
                      },
                    }}
                    style={{
                      position: "absolute",
                      top: "-2px",
                      left: "-2px",
                      opacity:
                        moreGrid === item.id || checked[item.id]
                          ? 1
                          : allcheck
                          ? 1
                          : 0,
                    }}
                  />

                  {moreGrid === item.id ? (
                    <MoreButton
                      handleClick={handleClick}
                      handleClose={handleClose}
                      open={open}
                      anchorEl={anchorEl}
                      singleDelete={singleDelete}
                      seteditEvent={seteditEvent}
                      event={item}
                    />
                  ) : (
                    ""
                  )}
                  {moreGrid === item.id &&
                  assignedUsers.some(
                    (el) => localStorage.getObject("id") == el.id
                  ) ? (
                    <PopoverCustom
                      event={item}
                      anchorEl={anchorElPop}
                      open={openPop}
                      handleClose={handleClosePop}
                      type="grid"
                    />
                  ) : (
                    ""
                  )}
                  <Typography
                    gutterBottom
                    sx={{
                      color: theme.addmember.color1,
                      fontSize: "16px",
                      fontFamily: "URW DIN",
                      marginTop: "9px",
                    }}
                    component="div"
                  >
                    {item.name}
                  </Typography>

                  <Typography
                    variant="body3"
                    sx={{
                      color: "#88A1AB",
                      fontSize: "14px",
                      fontFamily: "URW DIN REGULAR",
                    }}
                    color="text.secondary"
                  >
                    {item.event_start
                      ? formatDate(new Date(item.event_start))
                      : ""}
                  </Typography>
                  {/* <Link to={item.is_lobby ? `/lobby/${item.slug}` :  `/${item.room_slug}/${item.slug}`} style={{textDecoration:'none'}}> */}

                  <div className="overlayEvent" onClick={handleClickPop}>
                    <div className="joinnow">
                      <img alt="" src="/assets/icons/join_symbol.svg" />
                      {/* <Typography variant="body3" style={{paddingTop: '18px', fontSize:'16px', fontFamily:'URW DIN',color:'white'}}>JOIN&nbsp;NOW</Typography> */}
                      <img
                        alt=""
                        src="/assets/icons/join_now.svg"
                        style={{ marginTop: "14px" }}
                      />
                    </div>
                  </div>
                  {/* </Link> */}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Scrollbars>
      <Toast
        openToast={openToastDelete}
        setOpenToast={setOpenToastDelete}
        message="Space Deleted Successfully"
      />

      {editEvent && (
        <EventEdit
          seteditEvent={seteditEvent}
          editEvent={editEvent}
          event={eventTile}
          centrifugoLoginUpdateDetails={centrifugoLoginUpdateDetails}
          onlineLoader={onlineLoader}
          loggedInUsers={loggedInUsers}
          getEventList={getEventList}
          showSection={showSection}
          setShowSection={setShowSection}
        />
      )}
    </div>
  );
};

export default EventGrid;
