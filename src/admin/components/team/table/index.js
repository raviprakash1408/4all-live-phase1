import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Checkbox,
  TableBody,
  Box,
  Collapse,
  FormControlLabel,
  Snackbar,
  Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiTableCell from "@material-ui/core/TableCell";
import Row from "./row";
import Toast from "../../../../sections/Toast";
import spaceUserOnlineSlice, {
  setSpaceUserOnline,
} from "../../../../state/spaceUserOnline/spaceUserOnlineSlice";
import usersLoggedinSlice, {
  setAddLoggedinUser,
  setLoggedinUsers,
} from "../../../../state/usersLoggedin/usersLoggedinSlice";
import { AxiosLocal } from "../../../../utilities/axiosUtils.ts";
import { dynamicsort, updateURLParameter } from "../../../../utilities/common";
import Scrollbars from "react-custom-scrollbars";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  customTooltip: {
    backgroundColor: "rgba(220, 0, 78, 0.8)",
  },
  table: {
    borderCollapse: "separate!important",
    borderSpacing: "0px 3.5px!important",
  },
}));

const TableCell = withStyles({
  root: {
    borderBottom: "none",
    padding: "10px 16px",
  },
})(MuiTableCell);

//   const useRowStyles = makeStyles({
//     root: {
//       "& > *": {
//         borderBottom: "unset",
//       },
//     },
//   });

const TableHeaderCell = withStyles((theme) => ({
  root: {
    height: "19px",
  },
}))(TableCell);

export default function TeamTable({
  search,
  checkedList,
  setCheckedList,
  deleteUsersPopup,
  handleClickDelete,
  usersUpdate,
  setUsersUpdate,
  setInviteMember,
  onlineLoader,
  centrifugoLoginUpdateDetails,
  centrifugoViewTypeUpdateDetails,
  centrifugoRoleUpdateDetails,
  setcentrifugoRoleUpdateDetails,
  centrifugoActiveUpdateDetails,
  centrifugoEventUpdateDetails,
  loggedInUsers,
  spaceUserOnlineList,
  members,
  setmembers,
  individualLoader,
  deleteUser,
  setdeleteUser,
  changeMessage,
  selectedEvents,
  changedUserId,
  getUpdatedMembers,
  loading,
  setloading,
  eventLoader,
  sortBy,
  setsortBy,
  sortType,
  setsortType,
  getMemberList,
  onlineOfflineState,
}) {
  const navigate = useNavigate();

  const classes = useStyles();

  //change start

  const dispatch = useDispatch();

  const permissions = useSelector((state) => state.permissions);

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getObject("auth")
  );
  const [subscribedToCentrifugo, setsubscribedToCentrifugo] = useState(false);

  const [openUpdateToastUsers, setOpenUpdateToastUsers] = useState(false);

  const theme = useSelector((state) => state.theme.themeData);

  //members

  const [departments, setdepartments] = useState([]);
  const [rootRoles, setrootRoles] = useState([]);
  const [allSubrooms, setallSubrooms] = useState([]);
  const [loader, setLoader] = useState(true);
  const [allRooms, setallRooms] = useState([]);

  useEffect(() => {
    AxiosLocal.get("department/").then((response) => {
      setdepartments(response.data.data);
      setrootRoles(response.data.root);
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    });
    AxiosLocal.get("mainspace/subspace/").then((response) => {
      setallRooms([...response.data.data]);
    });

    AxiosLocal.get("subroom/").then((response) => {
      setallSubrooms([...response.data.data]);
    });
  }, []);

  //change ends

  const [initialRender, setinitialRender] = useState(true);

  // useEffect(() => {

  //     if(initialRender){
  //       setinitialRender(false)
  //     } else{
  //       setloading(true)
  //       AxiosLocal.post('users/',{"search_text":search}).then(response=>{
  //         console.log(response.data.data,"searchUserResults");
  //         setloading(false)
  //         setmembers(response.data.data);
  //       })
  //     }
  // }, [search]);

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
      for (const row of members) {
        collection.push(Number(row.id));
      }
    }

    setCheckedList(collection);
    setItemsChecked(checked);
  };

  //sorting
  const Sort = (value, order) => {
    setsortBy(value);
    setsortType(order);
    getMemberList(1, onlineOfflineState, value, order);
    let updatedUrl = "";
    if (order === "a") {
      updatedUrl = updateURLParameter(window.location.href, "sort_by", "A-Z");
    } else {
      updatedUrl = updateURLParameter(window.location.href, "sort_by", "Z-A");
    }

    let params = updatedUrl.split("?")[1];
    navigate(`/admin/team?${params}`);
  };

  const [sortbutton, setsortbutton] = useState("");

  const [memberChange, setmemberChange] = useState(false);

  //grouping

  // const grouping = (value) => {
  //   let newUsers =  users.filter(function(user) {
  //     return user.view_type == value;
  //   });
  //   setUsers([...newUsers])
  //   console.log(newUsers,"view_type");

  // }

  // useEffect(() => {
  //   let memberList = [...members]
  //   console.log([...memberList],"onlineUserList1");
  //   memberList.forEach(element => {
  //     loggedInUsers.forEach(item=>{
  //       if(item==element.id){
  //         element.is_online = true
  //       }
  //     })

  //   })
  //   const trueFirst = [...memberList].sort((a, b) => Number(b.is_online) - Number(a.is_online));
  //   console.log(trueFirst,"trueFirst");
  //   setmembers([...trueFirst])

  // }, [loggedInUsers]);

  return (
    <>
      <TableContainer
        style={{ marginTop: "10px", minHeight: "72vh" }}
        className="userListView"
      >
        {loading ? (
          <>
            <Skeleton
              variant="rounded"
              sx={{ backgroundColor: theme?.loading?.loadingColor }}
              width="100%"
              height={40}
            />
            <Skeleton
              variant="rounded"
              sx={{
                backgroundColor: theme?.loading?.loadingColor,
                marginTop: "10px",
              }}
              width="100%"
              height={60}
            />
            <Skeleton
              variant="rounded"
              sx={{
                backgroundColor: theme?.loading?.loadingColor,
                marginTop: "10px",
              }}
              width="100%"
              height={60}
            />
            <Skeleton
              variant="rounded"
              sx={{
                backgroundColor: theme?.loading?.loadingColor,
                marginTop: "10px",
              }}
              width="100%"
              height={60}
            />
            <Skeleton
              variant="rounded"
              sx={{
                backgroundColor: theme?.loading?.loadingColor,
                marginTop: "10px",
              }}
              width="100%"
              height={60}
            />
            <Skeleton
              variant="rounded"
              sx={{
                backgroundColor: theme?.loading?.loadingColor,
                marginTop: "10px",
              }}
              width="100%"
              height={60}
            />
            <Skeleton
              variant="rounded"
              sx={{
                backgroundColor: theme?.loading?.loadingColor,
                marginTop: "10px",
              }}
              width="100%"
              height={60}
            />
            <Skeleton
              variant="rounded"
              sx={{
                backgroundColor: theme?.loading?.loadingColor,
                marginTop: "10px",
              }}
              width="100%"
              height={60}
            />
            <Skeleton
              variant="rounded"
              sx={{
                backgroundColor: theme?.loading?.loadingColor,
                marginTop: "10px",
              }}
              width="100%"
              height={60}
            />
            <Skeleton
              variant="rounded"
              sx={{
                backgroundColor: theme?.loading?.loadingColor,
                marginTop: "10px",
              }}
              width="100%"
              height={60}
            />
          </>
        ) : (
          <Box sx={{ overflow: "auto" }}>
            <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
              <Table
                aria-label="collapsible table"
                elevation={0}
                className={classes.table}
                sx={{ minWidth: { sm: `calc(100% - 250px)` } }}
              >
                <TableHead>
                  <TableRow
                    style={{ backgroundColor: theme?.table?.headerColor }}
                  >
                    <TableHeaderCell
                      style={{
                        color: "white",
                        fontFamily: "URW DIN REGULAR",
                        width: "28%",
                        paddingLeft: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Checkbox
                        {...label}
                        checked={
                          members.length == checkedList.length &&
                          members.length != 0
                        }
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
                          marginLeft: checkedList.length ? "-26px" : "-45px",
                        }}
                      />
                      {checkedList.length ? (
                        <div
                          style={{
                            width: "25px",
                            height: "25px",
                            backgroundColor: theme?.common?.color1,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "1px",
                          }}
                        >
                          <span style={{ paddingTop: "15%" }}>
                            {checkedList.length - 1}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </TableHeaderCell>

                    <TableHeaderCell
                      align="left"
                      style={{ position: "relative" }}
                    >
                      <div
                        style={{
                          color: theme?.common?.color2,

                          fontFamily: "URW DIN",
                          width: "75px",
                          backgroundColor:
                            sortbutton == "name"
                              ? theme?.team?.hover
                              : theme?.team?.headerBg,
                          borderRadius: "4px",
                          cursor: "pointer",
                          position: "absolute",
                          top: "0px",
                          bottom: "0px",
                          display: "flex",
                          alignItems: "center",
                          padding: "0px 20px",
                        }}
                        // onMouseEnter={() => setsortbutton("name")}
                        // onMouseLeave={() => setsortbutton("")}
                        onClick={() => {
                          if (sortBy == "name" && sortType == "d") {
                            Sort("name", "a");
                          } else if (sortBy == "name" && sortType == "a") {
                            Sort("name", "d");
                          } else {
                            Sort("name", "a");
                          }
                        }}
                      >
                        Name
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            paddingLeft: "5px",
                          }}
                        >
                          {sortBy == "name" && sortType == "a" ? (
                            <>
                              <span
                                style={{ position: "absolute", top: "10px" }}
                                onClick={() => Sort("name", "a")}
                              >
                                <img src="/assets/admin/up-white.svg" />
                              </span>
                            </>
                          ) : sortBy == "name" && sortType == "d" ? (
                            <>
                              <span
                                style={{
                                  position: "absolute",
                                  bottom: "10px",
                                }}
                                onClick={() => Sort("name", "d")}
                              >
                                <img src="/assets/admin/down-white.svg" />
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        {sortbutton == "name" ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              paddingLeft: "28px",
                            }}
                          >
                            <span
                              style={{ position: "absolute", top: "3px" }}
                              onClick={() => Sort("name", "a")}
                            >
                              <img src="/assets/admin/up-white.svg" />
                            </span>

                            <span
                              style={{ position: "absolute", bottom: "3px" }}
                              onClick={() => Sort("name", "d")}
                            >
                              <img src="/assets/admin/down-white.svg" />
                            </span>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </TableHeaderCell>

                    <TableHeaderCell
                      align="left"
                      style={{ position: "relative" }}
                    >
                      <div
                        style={{
                          color: theme?.common?.color2,

                          fontFamily: "URW DIN",
                          width: "100px",
                          backgroundColor:
                            sortbutton == "View Type"
                              ? theme?.team?.hover
                              : theme?.team?.headerBg,
                          borderRadius: "4px",
                          // cursor: "pointer",
                          position: "absolute",
                          top: "0px",
                          bottom: "0px",
                          display: "flex",
                          alignItems: "center",
                          padding: "0px 20px",
                        }}
                      // onMouseEnter={() => setsortbutton("View Type")}
                      // onMouseLeave={() => setsortbutton("")}
                      >
                        View&nbsp;Type
                        {sortbutton == "View Type" ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              paddingLeft: "28px",
                            }}
                          >
                            <span
                              style={{ position: "absolute", top: "3px" }}
                              onClick={() => Sort("last_name", "asc")}
                            >
                              <img src="/assets/admin/up-white.svg" />
                            </span>

                            <span
                              style={{ position: "absolute", bottom: "3px" }}
                              onClick={() => Sort("last_name", "desc")}
                            >
                              <img src="/assets/admin/down-white.svg" />
                            </span>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </TableHeaderCell>
                    <TableHeaderCell
                      align="left"
                      style={{ position: "relative" }}
                    >
                      <div
                        style={{
                          color: theme?.common?.color2,

                          fontFamily: "URW DIN",
                          width: "75px",
                          backgroundColor:
                            sortbutton == "Events"
                              ? theme?.team?.hover
                              : theme?.team?.headerBg,
                          borderRadius: "4px",
                          // cursor: "pointer",
                          position: "absolute",
                          top: "0px",
                          bottom: "0px",
                          display: "flex",
                          alignItems: "center",
                          padding: "0px 20px",
                        }}
                      // onMouseEnter={() => setsortbutton("Events")}
                      // onMouseLeave={() => setsortbutton("")}
                      >
                        Spaces
                        {sortbutton == "Events" ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              paddingLeft: "28px",
                            }}
                          >
                            <span
                              style={{ position: "absolute", top: "3px" }}
                              onClick={() => Sort("last_name", "asc")}
                            >
                              <img src="/assets/admin/up-white.svg" />
                            </span>

                            <span
                              style={{ position: "absolute", bottom: "3px" }}
                              onClick={() => Sort("last_name", "desc")}
                            >
                              <img src="/assets/admin/down-white.svg" />
                            </span>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </TableHeaderCell>
                    <TableHeaderCell
                      align="left"
                      style={{ position: "relative" }}
                    >
                      <div
                        style={{
                          color: theme?.common?.color2,

                          fontFamily: "URW DIN",
                          width: "75px",
                          backgroundColor:
                            sortbutton == "role"
                              ? theme?.team?.hover
                              : theme?.team?.headerBg,
                          borderRadius: "4px",
                          position: "absolute",
                          top: "0px",
                          bottom: "0px",
                          display: "flex",
                          alignItems: "center",
                          padding: "0px 20px",
                        }}
                      // onMouseEnter={() => setsortbutton("role")}
                      // onMouseLeave={() => setsortbutton("")}
                      >
                        Role
                        {sortbutton == "role" ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              paddingLeft: "28px",
                            }}
                          >
                            <span
                              style={{ position: "absolute", top: "3px" }}
                              onClick={() => Sort("last_name", "asc")}
                            >
                              <img src="/assets/admin/up-white.svg" />
                            </span>

                            <span
                              style={{ position: "absolute", bottom: "3px" }}
                              onClick={() => Sort("last_name", "desc")}
                            >
                              <img src="/assets/admin/down-white.svg" />
                            </span>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </TableHeaderCell>
                    {/* <TableHeaderCell
                    align="right"
                    style={{ position: "relative" }}
                  >
                    <div
                      style={{
                        color: "white",
                        fontFamily: "URW DIN",
                        width: "75px",
                        backgroundColor:
                          sortbutton == "Status" ? "#011934" : "#012243",
                        borderRadius: "4px",
                        // cursor: "pointer",
                        position: "absolute",
                        top: "0px",
                        bottom: "0px",
                        display: "flex",
                        alignItems: "center",
                        padding: "0px 20px",
                        marginLeft: "-20px",
                      }}
                      // onMouseEnter={() => setsortbutton("Status")}
                      // onMouseLeave={() => setsortbutton("")}
                    >
                      Status
                      {sortbutton == "Status" ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            paddingLeft: "28px",
                          }}
                        >
                          <span
                            style={{ position: "absolute", top: "3px" }}
                            onClick={() => Sort("last_name", "asc")}
                          >
                            <img src="/assets/admin/up-white.svg" />
                          </span>

                          <span
                            style={{ position: "absolute", bottom: "3px" }}
                            onClick={() => Sort("last_name", "desc")}
                          >
                            <img src="/assets/admin/down-white.svg" />
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </TableHeaderCell> */}
                    <TableHeaderCell
                      align="center"
                      style={{
                        color: theme?.common?.color2,

                        fontFamily: "URW DIN",
                        width: "10%",
                      }}
                    >
                      Actions
                    </TableHeaderCell>
                  </TableRow>
                </TableHead>
              </Table>
              <Scrollbars
                style={{
                  width: "100%",
                  height: "72vh",
                }}
              >
                <TableContainer
                  style={{
                    // marginTop: "-5px",
                    marginLeft: "0px",
                  }}
                  className="eventListView"
                >
                  <Table
                    aria-label="collapsible table"
                    elevation={0}
                    className={classes.table}
                  >
                    <TableBody
                      style={{
                        backgroundColor: theme?.table?.rowColor,
                        height: "10px",
                      }}
                    >
                      {/* <Scrollbars style={{ width: "428%", height: '69vh', }}> */}

                      {members.map((row) =>
                        row.is_organization_user == "False" ? (
                          <Row
                            key={Number(row.id)}
                            row={row}
                            handleCheckboxClick={handleCheckboxClick}
                            checkedList={checkedList}
                            setCheckedList={setCheckedList}
                            deleteUsersPopup={deleteUsersPopup}
                            handleClickDelete={handleClickDelete}
                            loggedInUsers={loggedInUsers}
                            onlineLoader={onlineLoader}
                            centrifugoLoginUpdateDetails={
                              centrifugoLoginUpdateDetails
                            }
                            centrifugoViewTypeUpdateDetails={
                              centrifugoViewTypeUpdateDetails
                            }
                            centrifugoRoleUpdateDetails={
                              centrifugoRoleUpdateDetails
                            }
                            setcentrifugoRoleUpdateDetails={
                              setcentrifugoRoleUpdateDetails
                            }
                            individualLoader={individualLoader}
                            centrifugoActiveUpdateDetails={
                              centrifugoActiveUpdateDetails
                            }
                            centrifugoEventUpdateDetails={
                              centrifugoEventUpdateDetails
                            }
                            spaceUserOnlineList={spaceUserOnlineList}
                            selectedEvents={selectedEvents}
                            changedUserId={changedUserId}
                            departments={departments}
                            setdepartments={setdepartments}
                            rootRoles={rootRoles}
                            allSubrooms={allSubrooms}
                            setallSubrooms={setallSubrooms}
                            loader={loader}
                            setLoader={setLoader}
                            allRooms={allRooms}
                            setallRooms={setallRooms}
                            eventLoader={eventLoader}
                          />
                        ) : localStorage.getObject("is_organization_user") ==
                          "true" ? (
                          <Row
                            key={Number(row.id)}
                            row={row}
                            handleCheckboxClick={handleCheckboxClick}
                            checkedList={checkedList}
                            setCheckedList={setCheckedList}
                            deleteUsersPopup={deleteUsersPopup}
                            handleClickDelete={handleClickDelete}
                            loggedInUsers={loggedInUsers}
                            onlineLoader={onlineLoader}
                            centrifugoLoginUpdateDetails={
                              centrifugoLoginUpdateDetails
                            }
                            centrifugoViewTypeUpdateDetails={
                              centrifugoViewTypeUpdateDetails
                            }
                            centrifugoRoleUpdateDetails={
                              centrifugoRoleUpdateDetails
                            }
                            individualLoader={individualLoader}
                            centrifugoActiveUpdateDetails={
                              centrifugoActiveUpdateDetails
                            }
                            centrifugoEventUpdateDetails={
                              centrifugoEventUpdateDetails
                            }
                            spaceUserOnlineList={spaceUserOnlineList}
                            selectedEvents={selectedEvents}
                            changedUserId={changedUserId}
                            departments={departments}
                            setdepartments={setdepartments}
                            allSubrooms={allSubrooms}
                            setallSubrooms={setallSubrooms}
                            loader={loader}
                            setLoader={setLoader}
                            allRooms={allRooms}
                            setallRooms={setallRooms}
                            eventLoader={eventLoader}
                          />
                        ) : (
                          <></>
                        )
                      )}
                      {/* </Scrollbars> */}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbars>
            </Box>
          </Box>
        )}
      </TableContainer>
      <Toast
        openToast={openUpdateToastUsers}
        updateStatus="success"
        setOpenToast={setOpenUpdateToastUsers}
        message={changeMessage}
      />
    </>
  );
}
