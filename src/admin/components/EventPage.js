import React, { useState, useEffect } from "react";
import SearchBarLong from "../../sections/SearchBarLong";
import EventTable from "./EventTable";
import { Button, Box, Stack } from "@mui/material";
import AddEvent from "./AddEvent";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import { useDispatch, useSelector } from "react-redux";

import EventGrid from "./EventGrid";
import SearbarEvent from "./SearbarEvent";
import SortbyDrop from "./SortbyEvent";
import {
  setAddLoggedinUser,
  setLoggedinUsers,
} from "../../state/usersLoggedin/usersLoggedinSlice";
import ConfirmPop from "./ConfirmPop";
import Toast from "../../sections/Toast";
import { organizationUser } from "../../utilities/common";

const EventPage = () => {
  const permissions = useSelector((state) => state.permissions);
  console.log(permissions, "permissionspermissionspermissionspermissions");
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.themeData);
  //loading
  const [loading, setloading] = useState(true);

  const [toggleState, setToggleState] = useState("list");
  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    if (permissions.view_space && !permissions.view_space) {
      window.location.href = "/404";
    }
  }, []);

  //add event popup

  const [addEvent, setaddEvent] = React.useState(false);

  const handleAddEvent = () => {
    setaddEvent(true);
  };
  const handleAddEventClose = () => {
    setaddEvent(false);
  };

  // event grid checkbox
  const [checked, setChecked] = useState({});
  const selectedItem = Object.values(checked).filter(Boolean).length;

  useEffect(() => {
    if (localStorage.getObject("guestUser") === "true") {
      window.location.href = "/";
    }
  }, []);

  // event list
  const [rows, seteventList] = useState([]);
  useEffect(() => {
    getEventList();
  }, []);
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = theme?.login?.favicon32x32;
  }, []);
  const getEventList = () => {
    setloading(true);
    seteventList([]);

    // AxiosLocal.get("events/").then((response) => {
    //   seteventList([...response.data.data]);
    //   setloading(false);
    // });
    AxiosLocal.get("spaces/main/").then((response) => {
      console.log(response.data.data, "response.data.dataresponse.data.data");
      seteventList([...response.data.data]);
      setloading(false);
    });
  };
  const getEventListWithout = () => {
    //  AxiosLocal.get("events/").then((response) => {
    //    seteventList([...response.data.data]);
    //  });
    AxiosLocal.get("spaces/main/").then((response) => {
      seteventList([...response.data.data]);
    });
  };

  //event table checkbox
  const [checkedList, setCheckedList] = useState([]);
  const [onlineLoader, setonlineLoader] = useState(false);
  const [centrifugoLoginUpdateDetails, setcentrifugoLoginUpdateDetails] =
    useState({});
  const loggedInUsers = useSelector(
    (state) => state.loggedinUsers.loggedinUsers
  );

  useEffect(() => {
    setonlineLoader(true);
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        const resp = await window.loginChannel.presence();
        const { clients } = resp;
        let loggedin_user_ids = [...loggedInUsers];
        for (const [key, value] of Object.entries(clients)) {
          try {
            let userId = clients[key]["chan_info"].user_id;
            if (!loggedin_user_ids.includes(userId)) {
              loggedin_user_ids.push(userId);
            }
          } catch (error) {
            console.log("Centrifuge Online Users Error", error);
          }
        }
        dispatch(setLoggedinUsers([...loggedin_user_ids]));
        setonlineLoader(false);
      }, 1000);
    });
  }, []);

  try {
    window.loginChannel.on("join", function (ctx) {
      // handle new Publication data coming from channel "news".
      ctx.info.chanInfo["type"] = "login";
      setcentrifugoLoginUpdateDetails({ ...ctx.info.chanInfo });
      dispatch(setAddLoggedinUser({ ...ctx.info.chanInfo }));
    });
    window.loginChannel.on("leave", function (ctx) {
      // handle new Publication data coming from channel "news".
      ctx.info.chanInfo["type"] = "logout";
      setcentrifugoLoginUpdateDetails({ ...ctx.info.chanInfo });
      dispatch(setAddLoggedinUser({ ...ctx.info.chanInfo }));
    });
  } catch (error) {
    // console.log("aaaa");
  }

  const [confirm, setConfirm] = useState(false);

  const handleClickOpen = () => {
    setConfirm(true);
  };

  const handleClickClose = () => {
    setConfirm(false);
  };

  const [openToast, setOpenToast] = useState(false);
  const deleteEvents = () => {
    AxiosLocal.delete("events/", {
      data: { event_ids: checkedList },
    }).then((response) => {
      if (response.data.status === "Success") {
        setOpenToast(true);
        setCheckedList([]);
        getEventList();
      }
    });
  };
  const keys = Object.keys(checked)
    .filter((k) => checked[k])
    .map((key) => parseInt(key));
  console.log(keys, "keyskeyskeys");
  const deleteEventsGrid = () => {
    AxiosLocal.delete("events/", {
      data: { event_ids: keys },
    }).then((response) => {
      if (response.data.status === "Success") {
        setOpenToast(true);
        setChecked({});
        getEventList();
      }
    });
  };
  const [inputValue, setinputValue] = useState("");
  const handleChange = (event) => {
    const searchWord = event.target.value;
    // setsearchLoader(true)
    // if(searchWord == ""){
    //     console.log("searchWorkNull");
    //     setFilteredData([...selected])

    //     setTimeout(() => {
    //         setsearchLoader(false)
    //     }, 1000);
    // }
    // else{
    AxiosLocal.post("/subspaces/search/", {
      search_text: searchWord,
    }).then((response) => {
      console.log(response.data.data, "filterDataList");
      seteventList(response.data.data);

      setTimeout(() => {
        // setsearchLoader(false)
      }, 1000);
    });
    // }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: theme?.table?.bgColor,
          minHeight: "89.1vh",
          marginTop: "70px",
          marginBottom: "5px",
        }}
      >
        <div>
          <Stack
            spacing={2}
            direction="row"
            style={{ justifyContent: "space-between" }}
          >
            <div style={{ display: "flex" }}>
              {/* search */}

              <div
                style={{
                  color: theme?.table?.mainheadingColor,
                  fontSize: "20px",
                  fontFamily: "URW DIN",
                  marginRight: "20px",
                  marginLeft: "25px",
                  marginTop: "30px",
                }}
              >
                Spaces
              </div>
              <SearbarEvent
                inputValue={inputValue}
                setinputValue={setinputValue}
                handleChange={handleChange}
              />

              {/* icon box */}

              {/* <div
                style={{
                  margin: "20px 12px 0px 12px",
                  padding: "5px 26px",
                  backgroundColor: theme?.table?.buttonbgColor,
                  borderRadius: "4px",
                  height: "32px",
                }}
              >
                <img
                  src="/assets/icons/icon1.svg"
                  style={{ marginTop: "6px" }}
                  alt=""
                />
              </div> */}
            </div>

            <div style={{ display: "flex" }}>
              {/* add event */}
              {organizationUser(permissions.add_space) && (
                <Button
                  variant="contained"
                  style={{
                    textTransform: "none",
                    minWidth: "161px",
                    padding: "8px 30px 8px 20px",
                    fontSize: "14px",
                    lineHeight: "22px",
                    backgroundColor: theme?.login?.mainColor,
                    margin: "20px 10px 0px 0px",
                    color: "#E1E7EA",
                    height: "42px",
                    fontFamily: "URW DIN REGULAR",
                  }}
                  onClick={handleAddEvent}
                >
                  <img src="/assets/admin/plus.svg" />

                  <span style={{ marginLeft: "16px" }}>Add space</span>
                </Button>
              )}

              {/* Delete button */}
              {organizationUser(permissions.delete_space) ? (
                toggleState === "list" ? (
                  <Button
                    variant="contained"
                    style={{
                      textTransform: "none",
                      minWidth: "170px",
                      padding: "8px 30px 8px 20px",
                      fontSize: "14px",
                      fontWeight: "300",
                      lineHeight: "22px",
                      backgroundColor: theme?.table?.buttonbgColor,
                      margin: "20px 10px 0px 0px",
                      color: "#88A1AB",
                      height: "42px",
                      fontFamily: "URW DIN REGULAR",
                    }}
                    onClick={
                      checkedList.length == 0
                        ? console.log("k")
                        : handleClickOpen
                    }
                  >
                    <img src="/assets/admin/close.svg" alt="" />
                    <span style={{ marginLeft: "16px" }}>
                      Delete{" "}
                      {checkedList.length == 0 ? "" : `(${checkedList.length})`}
                    </span>
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    style={{
                      textTransform: "none",
                      padding: "8px 30px 8px 20px",
                      fontSize: "14px",
                      minWidth: "170px",
                      fontWeight: "300",
                      lineHeight: "22px",
                      backgroundColor: theme?.table?.buttonbgColor,
                      margin: "20px 10px 0px 0px",
                      color: "#88A1AB",
                      height: "42px",
                      fontFamily: "URW DIN REGULAR",
                    }}
                    onClick={handleClickOpen}
                  >
                    <img src="/assets/admin/close.svg" alt="" />
                    <span style={{ marginLeft: "16px" }}>
                      Delete {selectedItem == 0 ? "" : `(${selectedItem})`}
                    </span>
                  </Button>
                )
              ) : (
                <></>
              )}
              {/* <SortbyDrop seteventList={seteventList} rows={rows} /> */}

              <div
                style={{ margin: "31px 25px 0px 20px", cursor: "pointer" }}
                onClick={() => toggleTab("grid")}
              >
                <img
                  alt=""
                  src={
                    toggleState === "list"
                      ? "/assets/admin/grid-icon.svg"
                      : "/assets/admin/grid-icon-bright.svg"
                  }
                />
              </div>
              <div
                style={{ margin: "31px 14px 0px 0px", cursor: "pointer" }}
                onClick={() => toggleTab("list")}
              >
                <img
                  alt=""
                  src={
                    toggleState === "list"
                      ? "/assets/admin/list-icon.svg"
                      : "/assets/admin/list-icon-light.svg"
                  }
                />
              </div>
            </div>
          </Stack>
          {toggleState === "list" ? (
            <div style={{ marginLeft: "25px" }}>
              <EventTable
                rows={rows}
                checkedList={checkedList}
                setCheckedList={setCheckedList}
                loading={loading}
                getEventList={getEventList}
                centrifugoLoginUpdateDetails={centrifugoLoginUpdateDetails}
                onlineLoader={onlineLoader}
                loggedInUsers={loggedInUsers}
                seteventList={seteventList}
                getEventListWithout={getEventListWithout}
              />
            </div>
          ) : (
            <EventGrid
              events={rows}
              checked={checked}
              setChecked={setChecked}
              selectedItem={selectedItem}
              loading={loading}
              setloading={setloading}
              getEventList={getEventList}
              centrifugoLoginUpdateDetails={centrifugoLoginUpdateDetails}
              onlineLoader={onlineLoader}
              loggedInUsers={loggedInUsers}
            />
          )}
        </div>
      </div>
      <ConfirmPop
        message="Are you sure you want to delete ? "
        confirm={confirm}
        handleClickOpen={handleClickOpen}
        handleClickClose={handleClickClose}
        handleDelete={toggleState === "list" ? deleteEvents : deleteEventsGrid}
      />
      <Toast
        openToast={openToast}
        setOpenToast={setOpenToast}
        message="Space deleted Successfully"
      />
      {addEvent && (
        <AddEvent
          handleAddEventClose={handleAddEventClose}
          getEventList={getEventList}
          centrifugoLoginUpdateDetails={centrifugoLoginUpdateDetails}
          onlineLoader={onlineLoader}
          loggedInUsers={loggedInUsers}
        />
      )}
    </>
  );
};

export default EventPage;
