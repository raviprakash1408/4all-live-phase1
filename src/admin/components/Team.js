import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
  Divider,
  Grid,
  FormControlLabel,
  Stack,
  TextField,
  MenuItem,
  Menu,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import TeamTable from './TeamTable';
import TeamWorkflowDrop from "./TeamWorkflowDrop";
import TeamSearchBar from "./TeamSearchBar";
import InviteMember from "./InviteMember";
import ImportMemberTeam from "./ImportMemberTeam";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import ConfirmPop from "./ConfirmPop";
import Toast from "../../sections/Toast";
import Skeleton from "@mui/material/Skeleton";
import TeamTable from "./team/table";
import spaceUserOnlineSlice, {
  setSpaceUserOnline,
} from "../../state/spaceUserOnline/spaceUserOnlineSlice";
import usersLoggedinSlice, {
  setAddLoggedinUser,
  setLoggedinUsers,
} from "../../state/usersLoggedin/usersLoggedinSlice";
import {
  CHANNEL_TYPES,
  subscribeCentrifugoChannel,
} from "../../utilities/centrifugoUtils.ts";
import { OnlineOfflineFilter } from "./OnlineOfflineFilter.tsx";
import Badge from "@mui/material/Badge";
import TablePagination from "@mui/material/TablePagination";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  getURLParameters,
  organizationUser,
  removeURLParameter,
  updateURLParameter,
} from "../../utilities/common";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomTooltip from "../CustomTooltip";
import TeamMenu from "./team/teamMenu.tsx";
import AddTeam from "./team/add_team/Index.tsx";
import { Scrollbars } from "react-custom-scrollbars";

const Team = () => {
  const matches = useMediaQuery("(max-width:1440px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.themeData);
  let teams = useSelector((state) => state.Team.teams);

  const [teamlist, setTeamlist] = useState(teams);

  //  useEffect(() => {
  //    const teamsorted = teams?.sort((a, b) => {
  //      // Sort in descending order (true values first)
  //      return b.is_my_team - a.is_my_team;
  //    });
  //    console.log("teamlist", teams, teamsorted);
  //   //  setTeamlist(teamsorted);
  //  }, [teams])

  const [search, setsearch] = useState("");

  const [checkedList, setCheckedList] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (localStorage.getObject("guestUser") === "true") {
      window.location.href = "/";
    }
  }, []);

  const [anchorElfilter, setAnchorElfilter] = React.useState(null);
  const openfilter = Boolean(anchorElfilter);
  const handleClickfilter = (event) => {
    setAnchorElfilter(event.currentTarget);
  };
  const handleClosefilter = () => {
    setAnchorElfilter(null);
  };
  //invite member popup

  const [inviteMember, setInviteMember] = React.useState(false);
  const handleInviteMember = () => {
    setInviteMember(true);
  };
  const handleInviteMemberClose = () => {
    setInviteMember(false);
  };

  //import member

  const [usersUpdate, setUsersUpdate] = useState(false);

  const [importMember, setImportMember] = React.useState(false);
  const handleImportMember = () => {
    setImportMember(true);
  };
  const handleImportMemberClose = () => {
    setImportMember(false);
  };

  const organisation = localStorage.getObject("organization");

  //confirm popup

  const [confirm, setConfirm] = useState(false);

  const handleClickOpen = () => {
    setConfirm(true);
  };

  const handleClickClose = () => {
    setConfirm(false);
  };

  const [confirmUserDelete, setConfirmUserDelete] = useState(false);
  const [confirmDeleteMessage, setConfirmDeleteMessage] = useState("");
  const [singleDeleteUserId, setSingleDeleteUserId] = useState("");

  const [userCount, setuserCount] = useState("");

  const [workflowList, setworkflowList] = useState([]);
  const [defaultWorkflow, setdefaultWorkflow] = useState([]);
  const [workflowLoader, setworkflowLoader] = useState(false);

  // add team
  const [addTeam, setaddTeam] = useState(false);

  //close add team popup
  const handleAddTeamClose = () => {
    setaddTeam(false);
  };

  const [selectedworkflow, setselectedworkflow] = useState(1);

  const handleClickOpenUser = () => {
    setConfirmUserDelete(true);
  };

  const handleClickCloseUser = () => {
    setConfirmUserDelete(false);
  };

  const deleteUsersPopup = (deleteType, id = null) => {
    if (deleteType == "single") {
      setConfirmUserDelete(true);
      setConfirmDeleteMessage(
        `Are you sure you want to remove this user from this team?`
      );
      setSingleDeleteUserId(id);
    } else {
      if (checkedList.length != 0) {
        setConfirmUserDelete(true);
        setConfirmDeleteMessage(
          `Are you sure you want to remove these ${checkedList.length} users from this team?`
        );
      }
    }
  };

  const [openUpdateToast, setOpenUpdateToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [updateStatus, setUpdateStatus] = useState("success");

  // PAGINATION
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalData, setTotalData] = React.useState(100);

  const handleChangePage = (event, newPage) => {
    seteventLoader(true);
    getMemberList(newPage + 1, onlineOfflineState, sortBy, sortType);
    setPage(newPage + 1);
    let updatedUrl = updateURLParameter(
      window.location.href,
      "page",
      newPage + 1
    );
    let params = updatedUrl.split("?")[1];
    navigate(`/admin/team?${params}`);
    // navigate(`/admin/team?page=${params}`, { replace: true });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // PAGINATION

  const handleClickDelete = () => {
    let payload = {};
    if (singleDeleteUserId != "") {
      payload = { user_ids: [singleDeleteUserId] };
      setSingleDeleteUserId("");
    } else {
      payload = { user_ids: checkedList };
    }
    AxiosLocal.post("user/remove/", payload).then((response) => {
      console.log(response, "deleteResponse");
      setOpenUpdateToast(true);
      setToastMessage("Users removed successfully.");
      setUpdateStatus("success");
      setCheckedList([]);
      // getMemberList()
      // setUsersUpdate(!usersUpdate)
      getMemberList(1, onlineOfflineState, sortBy, sortType);
    });
  };

  useEffect(() => {
    AxiosLocal.post("user/count/", {}).then((response) => {
      // setloading(false)
      setuserCount(response.data.user_count);
    });
  }, [usersUpdate]);
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = theme?.login?.favicon32x32;
  }, []);
  useEffect(() => {
    AxiosLocal.get("workflow/").then((response) => {
      setworkflowLoader(true);
      setworkflowList(response.data.data);
      let defaultWorkflow = response.data.data.filter((item) => {
        return item.default == true;
      });
      console.log(response.data.data, "workflowupdation");
      setdefaultWorkflow([...defaultWorkflow]);
      setTimeout(() => {
        setworkflowLoader(false);
      }, 1000);
    });
  }, [usersUpdate]);
  useEffect(() => {
    document.title = theme?.login?.title;
  }, []);
  const handleChange = (selectedWorkflow) => {
    console.log(selectedWorkflow, "selectedWorkflow");
    setselectedworkflow(selectedWorkflow);
    setConfirm(true);
    // getMemberList(1,onlineOfflineState,sortBy,sortType,search)
  };

  //CENTRIFUGO

  const [members, setmembers] = useState([]);
  const [membersTemp, setmembersTemp] = useState([]);
  const [individualLoader, setindividualLoader] = useState(false);
  const [deleteUser, setdeleteUser] = useState(false);

  const loggedInUsers = useSelector(
    (state) => state.loggedinUsers.loggedinUsers
  );

  const spaceUserOnlineList = useSelector(
    (state) => state.spaceUserOnlineList.spaceUserOnlineList
  );

  const [changeMessage, setchangeMessage] = useState("");
  const [onlineLoader, setonlineLoader] = useState(false);
  const [centrifugoLoginUpdateDetails, setcentrifugoLoginUpdateDetails] =
    useState({});
  const [centrifugoViewTypeUpdateDetails, setcentrifugoViewTypeUpdateDetails] =
    useState({});
  const [centrifugoRoleUpdateDetails, setcentrifugoRoleUpdateDetails] =
    useState({});
  const [centrifugoActiveUpdateDetails, setcentrifugoActiveUpdateDetails] =
    useState({});
  const [centrifugoEventUpdateDetails, setcentrifugoEventUpdateDetails] =
    useState({});
  const [indLoader, setindLoader] = useState(false);
  const [selectedEvents, setselectedEvents] = useState([]);
  const [changedUserId, setchangedUserId] = useState();
  const [getUpdatedMembers, setgetUpdatedMembers] = useState(false);
  const [loading, setloading] = useState(true);
  const [onlineOfflineState, setonlineOfflineState] = useState("all");

  const permissions = useSelector((state) => state.permissions);

  const [eventLoader, seteventLoader] = useState(true);

  const [sortBy, setsortBy] = useState("");
  const [sortType, setsortType] = useState("");

  useEffect(() => {
    if (permissions.view_team_members && !permissions.view_team_members) {
      window.location.href = "/404";
    }
  }, []);

  const changeWorkflow = () => {
    AxiosLocal.post(`workflow/edit/${selectedworkflow}`, {
      default: true,
    }).then((response) => {
      setUsersUpdate(!usersUpdate);
      setgetUpdatedMembers(!getUpdatedMembers);
      getMemberList(1, onlineOfflineState, sortBy, sortType, search);
    });
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log("spaceUserOnlineShow");
  //       console.log("spaceUserOnlineShowss");
  //       window.loginChannel.publish({
  //         "type":"asking_for_space_presence"
  //       });
  //   }, 5000);
  // },[])

  useEffect(() => {
    async function getLoginStatus() {
      console.log("getAssignedSpaces");

      try {
        console.log("getAssignedSpaces 1");
        let login_channel;
        // @ts-ignore
        if (window.loginChannel) {
          // @ts-ignore
          login_channel = await window.loginChannel;
        } else {
          login_channel = await subscribeCentrifugoChannel(
            CHANNEL_TYPES.USER_LOGIN
          );
        }

        console.log(login_channel, "login_channel");

        // @ts-ignore
        const resp = await window.loginChannel.presence();
        console.log(resp);
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
      } catch (error) {
        console.log("getAssignedSpaces 2");
        console.log(error, "error");
      }
    }
    if (localStorage.getObject("auth") == "true") {
      getLoginStatus();
    }
  }, []);

  // useEffect(() => {
  //   try {
  //     setonlineLoader(true);
  //     const myPromise = new Promise((resolve, reject) => {
  //       setTimeout(async () => {
  //         try {
  //           const resp = await window.loginChannel.presence();
  //           console.log(resp);
  //           const { clients } = resp;
  //           let loggedin_user_ids = [...loggedInUsers];
  //           for (const [key, value] of Object.entries(clients)) {
  //             try {
  //               let userId = clients[key]["chan_info"].user_id;
  //               if (!loggedin_user_ids.includes(userId)) {
  //                 loggedin_user_ids.push(userId);
  //               }
  //             } catch (error) {
  //               console.log("Centrifuge Online Users Error", error);
  //             }
  //           }
  //           dispatch(setLoggedinUsers([...loggedin_user_ids]));
  //           setonlineLoader(false);
  //         } catch (error) {
  //           console.log("aa");
  //         }
  //       }, 1000);
  //     });
  //   } catch (error) {
  //     console.log("aa");
  //   }
  // }, []);

  // useEffect(() => {
  //   // setonlineLoader(true)
  //   const myPromise = new Promise(async(resolve, reject) => {
  //     // setTimeout(async() => {
  //       const resp = await window.eventChanel?.presence();
  //       const { clients } = resp
  //       let loggedin_user_ids = [...loggedInUsers]
  //       for (const [key, value] of Object.entries(clients)) {
  //         try {
  //           let userId = clients[key]['chan_info'].user_id
  //           if(!loggedin_user_ids.includes(userId)){
  //             loggedin_user_ids.push(userId)
  //           }
  //         } catch (error) {
  //           console.log("Centrifuge Online Users Error", error);
  //         }
  //       }
  //       dispatch(setLoggedinUsers([...loggedin_user_ids]))
  //         setonlineLoader(false)
  //     // }, 5000);
  //   })
  // },[])

  useEffect(() => {
    try {
      window.loginChannel.on("publication", function (ctx) {
        console.log(ctx.data, "User channel publication");
        switch (ctx.data.type) {
          case "new_user_added":
            setUsersUpdate(!usersUpdate);
            setInviteMember(false);
            setindLoader(true);
            setTimeout(() => {
              setindLoader(false);
            }, 3000);
            break;

          case "viewer_type_updation":
            setindividualLoader(true);
            setcentrifugoViewTypeUpdateDetails({ ...ctx.data });
            setTimeout(() => {
              let dict = { ...ctx.data };
              delete dict["changed"];
              setcentrifugoViewTypeUpdateDetails({ ...dict });
              setindividualLoader(false);
            }, 2000);
            break;

          case "update_role":
            setindividualLoader(true);
            setcentrifugoRoleUpdateDetails({ ...ctx.data });
            setTimeout(() => {
              let dict = { ...ctx.data };
              delete dict["changed"];
              setcentrifugoRoleUpdateDetails({ ...dict });
              setindividualLoader(false);
            }, 2000);
            break;

          case "active_state_updation":
            setindividualLoader(true);
            setcentrifugoActiveUpdateDetails({ ...ctx.data });
            setTimeout(() => {
              let dict = { ...ctx.data };
              delete dict["changed"];
              setcentrifugoActiveUpdateDetails({ ...dict });
              setindividualLoader(false);
            }, 2000);
            break;

          case "user_remove":
            const users_list = [...members];

            const namesToDeleteArr = [...ctx.data.user_ids];

            const namesToDeleteSet = new Set(namesToDeleteArr);

            const newArr = users_list.filter((item) => {
              return !namesToDeleteSet.has(item.id);
            });
            setTimeout(() => {
              setmembers([...newArr]);
              // setloading(false)
              setdeleteUser(!deleteUser);
              setUsersUpdate(!usersUpdate);
            }, 2000);
            break;

          case "entered_to_space":
            let spaceUserOnline = [...spaceUserOnlineList];
            console.log(ctx, spaceUserOnline, "entered_to_space");
            let dataFilter = spaceUserOnline.filter((item) => {
              if (
                item.userId == ctx.data.userId &&
                item.subSpaceSlug == ctx.data.subSpaceSlug
              ) {
                return item;
              }
            });
            console.log(dataFilter, "dataFilter");
            if (dataFilter.length == 0) {
              spaceUserOnline.push({ ...ctx.data });
              dispatch(setSpaceUserOnline([...spaceUserOnline]));
            } else {
              break;
            }
            break;

          case "leaved_from_space":
            console.log(ctx, "leaved_from_space");
            let spaceUserOnlines = [...spaceUserOnlineList];
            let filteredList = spaceUserOnlines.filter((item) => {
              return (
                item.userId != ctx.data.userId &&
                item.subSpaceSlug != ctx.data.subSpaceSlug
              );
            });
            dispatch(setSpaceUserOnline([...filteredList]));
            break;

          case "user_space_changed":
            setindividualLoader(true);
            setcentrifugoEventUpdateDetails({ ...ctx.data });
            setTimeout(() => {
              let dict = { ...ctx.data };
              delete dict["changed"];
              setcentrifugoEventUpdateDetails({ ...dict });
              setindividualLoader(false);
            }, 2000);
            break;

          default:
            console.log("aaa");
        }
      });
    } catch (error) {
      // console.log("aaaa");
    }
  }, []);

  useEffect(() => {
    try {
      // TRIGGERED ON ANY USER SUBSCRIBE THE CHANNEL
      window.loginChannel.on("join", function (ctx) {
        console.log("User Loggedinnnnn");
        ctx.info.chanInfo["type"] = "login";
        setcentrifugoLoginUpdateDetails({ ...ctx.info.chanInfo });
        dispatch(setAddLoggedinUser({ ...ctx.info.chanInfo }));
      });

      // TRIGGERED ON ANY USER UNSUBSCRIBE THE CHANNEL
      window.loginChannel.on("leave", function (ctx) {
        ctx.info.chanInfo["type"] = "logout";
        setcentrifugoLoginUpdateDetails({ ...ctx.info.chanInfo });
        console.log(ctx.info.chanInfo, "join");
        dispatch(setAddLoggedinUser({ ...ctx.info.chanInfo }));
      });
    } catch (error) {
      console.log("user login centrifugo error");
    }
  }, []);

  const onlineFilter = (filterType) => {
    let currentUrl = window.location.href;
    console.log(sortBy, sortType, "currentPath");
    setonlineOfflineState(filterType);
    getMemberList(1, filterType, sortBy, sortType, search);
    if (filterType == "online") {
      // let url = ``
      // if(currentUrl.includes('?')){
      //   url = `&status=online`
      // }
      // else{
      //   url = `?status=online`
      // }
      // navigate(`${url}`,{replace:true})
      //   let filteredMembers = [...membersTemp].filter((item)=>{
      //     if(item.is_online){
      //       return item
      //     }
      // })
      // setmembers([...filteredMembers])
    } else if (filterType == "offline") {
      let filteredMembers = [...membersTemp].filter((item) => {
        if (!item.is_online) {
          return item;
        }
      });
      setmembers([...filteredMembers]);
    } else {
      setmembers([...membersTemp]);
      setonlineOfflineState("");
    }
  };

  useEffect(() => {
    console.log("getUsersUpdate");
    getMemberList(0, onlineOfflineState, sortBy, sortType, search);
  }, [usersUpdate, deleteUser]);

  // let getMemberListFunction = new Promise((resolve, reject) => {

  // });

  const getMembersWithStatus = (status) => {
    AxiosLocal.post(`user/loggedin/status/`, {
      user_ids: [...loggedInUsers],
      status: onlineOfflineState,
    }).then((response) => {
      console.log(response.data.data, "userGetList");
      setmembersTemp([...response.data.data]);
      setmembers([...response.data.data]);
      setPage(response.data.paginator.current_page);
      setRowsPerPage(response.data.paginator.number_of_items_per_page);
      setTotalData(response.data.paginator.total_items);
      setloading(false);
      var ids = [...response.data.data].map(function (item) {
        return item.id;
      });
      AxiosLocal.post("user/space/list/", { user_ids: ids }).then((resp) => {
        console.log(resp.data.data, "userGetListResponse");
        var mainList = [...response.data.data].map(function (item) {
          console.log(item.id, "mainList");
          [...resp.data.data].map(function (spaceItem) {
            console.log(spaceItem.id, item.id, spaceItem.spaces, "mainList");
            if (spaceItem.id == item.id) {
              console.log(spaceItem.id, item.id, spaceItem.spaces, "mainList");
              // Object.assign(item, {"spaces": spaceItem.spaces});
              item.spaces = spaceItem.spaces;
            }
          });
          return item;
        });
        console.log(mainList, "mainList");
        setmembersTemp([...mainList]);
        setmembers([...mainList]);
        seteventLoader(false);
      });
    });
  };

  const updateUrl = (parameter, value) => {
    let updatedUrl = updateURLParameter(window.location.href, parameter, value);
    let params = updatedUrl.split("?")[1];
    navigate(`/admin/team?${params}`);
  };

  const removeParameter = (parameter) => {
    let updatedUrl = removeURLParameter(window.location.href, parameter);
    let params = updatedUrl.split("?")[1];
    navigate(`/admin/team?${params}`);
  };

  const getMemberList = (pageNo, status, sortBy, sortType, search_text) => {
    let currentUrl = window.location.href;
    setloading(true);
    let url = `users/`;

    let updatedUrl = currentUrl;

    let getParams = getURLParameters(window.location.href);
    if (status != "all") {
      updateUrl("status", status);
    } else {
      if (getParams.search_text) {
        removeParameter("status");
      }
    }

    if (search_text && search_text != "") {
      updateUrl("search_text", search_text);
    } else {
      if (getParams.search_text) {
        removeParameter("search_text");
      }
    }

    let payloadData = {
      user_ids: [...loggedInUsers],
      status: status,
      sort_by: sortBy,
      sort_type: sortType,
      search_text:
        search_text && search_text != "" ? search_text.toLowerCase() : "",
    };

    if (pageNo !== 0) {
      if (getParams.page == pageNo) {
        payloadData.page = getParams.page;
      } else {
        payloadData.page = pageNo;
      }
    } else {
      payloadData.page = 1;
    }

    AxiosLocal.get(url, { params: payloadData }).then((response) => {
      setmembersTemp([...response.data.data]);
      setmembers([...response.data.data]);
      setPage(response.data.paginator.current_page);
      setRowsPerPage(response.data.paginator.number_of_items_per_page);
      setTotalData(response.data.paginator.total_items);
      setloading(false);
      var ids = [...response.data.data].map(function (item) {
        return item.id;
      });
      AxiosLocal.post("user/space/list/", { user_ids: ids }).then((resp) => {
        var mainList = [...response.data.data].map(function (item) {
          [...resp.data.data].map(function (spaceItem) {
            if (spaceItem.id == item.id) {
              item.spaces = spaceItem.spaces;
            }
          });
          return item;
        });
        setmembersTemp([...mainList]);
        setmembers([...mainList]);
        seteventLoader(false);
      });
    });
  };

  //CENTRIFUGO

  return (
    <>
      <div
        style={{
          display: "flex",
          marginTop: "6vh",
          backgroundColor: theme?.team?.bgColor,
          // minHeight: "96.1vh",
          height: "91.5vh",
          overflow: "hidden",
          // minHeight: "91vh",
        }}
      >
        <Box style={{ width: "350px", margin: "10px 13px 10px 23px" }}>
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
                color: theme?.team?.color,

                fontSize: "20px",
                textAlign: "center",
              }}
            >
              Teams
            </p>
            {/* <Button
              variant="contained"
              style={{
                textTransform: "none",
                minWidth: "145px",
                padding: "9px 19px 11px 11px",

                lineHeight: "22px",
                backgroundColor: theme?.common?.color1,
                color: "white",
                fontFamily: "URW DIN REGULAR",
                boxShadow: "none",
              }}
              onClick={() => {
                setaddTeam(true);
              }}
            >
              <img alt="add-team" src="/assets/admin/plus.svg" />
              <span style={{ marginLeft: "13px", fontSize: "14px" }}>
                Add team
              </span>
            </Button> */}
          </div>
          <Scrollbars style={{ height: "75vh" }}>
            <ul
              style={{
                listStyle: "none",
                paddingLeft: "0px",
                marginRight: "10px",
              }}
            >
              {/* other teams */}
              {teams.length > 0 &&
                teams[0].teamName != "" &&
                teams
                  .filter((item) => item.teamName != "")
                  .sort((a, b) => {
                    return b.is_my_team - a.is_my_team;
                  })
                  .map((team) => <TeamMenu theme={theme} team={team} />)}
            </ul>
          </Scrollbars>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          style={{
            alignSelf: "auto",
            backgroundColor: theme?.team?.divider,

            // height: '25px',
            marginTop: "23px",
            marginBottom: "21px",
            width: "2px",
          }}
        />
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0px 17px 0px 20px",
            }}
          >
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
              Members ({localStorage.getObject('is_organization_user') !== 'false' ? userCount : userCount - 1})
            </div>
            {/* <SearbarEvent /> */}
            <div style={{ display: "flex" }}>
              <TeamSearchBar
                onlineOfflineState={onlineOfflineState}
                sortBy={sortBy}
                sortType={sortType}
                getMemberList={getMemberList}
                setsearch={setsearch}
              />

              {/* <OnlineOfflineFilter 
      openfilter={openfilter} 
      handleClickfilter={handleClickfilter} 
      anchorElfilter={anchorElfilter} 
      onlineFilter={onlineFilter}
      handleClosefilter={handleClosefilter}
      onlineOfflineState={onlineOfflineState} /> */}

              <div
                aria-controls={openfilter ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openfilter ? "true" : undefined}
                onClick={handleClickfilter}
                style={{
                  margin: "20px 12px 0px 12px",
                  padding: "4.5px 26px",
                  backgroundColor: theme?.table?.buttonbgColor,
                  borderRadius: "4px",
                  height: "32px",
                  cursor: "pointer",
                }}
              >
                <Badge
                  color={
                    onlineOfflineState === "online"
                      ? "info"
                      : onlineOfflineState === "offline"
                        ? "error"
                        : "default"
                  }
                  overlap="circular"
                  badgeContent=" "
                  variant="dot"
                >
                  <img
                    alt=""
                    src="/assets/icons/icon1.svg"
                    style={{ marginTop: "6px" }}
                  />
                </Badge>
              </div>

              <Menu
                id="basic-menu"
                anchorEl={anchorElfilter}
                open={openfilter}
                onClose={handleClosefilter}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{
                  "& .MuiPaper-root": {
                    backgroundColor: theme?.team?.headerBg,
                    border: theme?.team?.border,
                    boxShadow: "none",
                    borderRadius: "4px",
                  },
                }}
                style={{ marginTop: "5px" }}
              >
                <MenuItem
                  style={{
                    padding: "10px 15px",
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                  }}
                >
                  <Button
                    className="filter_button"
                    onClick={() => {
                      onlineFilter("online");
                    }}
                    style={{
                      background:
                        onlineOfflineState === "online"
                          ? theme?.common?.color1
                          : theme?.team?.participant,
                      textTransform: "capitalize",
                    }}
                    variant={
                      onlineOfflineState === "online" ? "contained" : "texts"
                    }
                  >
                    <img
                      src="/assets/admin/blue-dot.svg"
                      alt=""
                      style={{
                        paddingRight: "10px",
                        width: "10px",
                        height: "10px",
                      }}
                    />{" "}
                    Online
                  </Button>
                  <Button
                    onClick={() => {
                      onlineFilter("offline");
                    }}
                    style={{
                      marginLeft: "20px",
                      background:
                        onlineOfflineState === "offline"
                          ? theme?.common?.color1
                          : theme?.team?.participant,
                      textTransform: "capitalize",
                    }}
                    variant={
                      onlineOfflineState === "offline" ? "contained" : "texts"
                    }
                  >
                    <img
                      src="/assets/icons/red_dot.svg"
                      alt=""
                      style={{
                        paddingRight: "18px",
                        width: "10px",
                        height: "10px",
                      }}
                    />{" "}
                    Offline
                  </Button>
                </MenuItem>
                <MenuItem
                  style={{
                    padding: "10px 15px",
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                    textAlign: "center",
                  }}
                >
                  <Button
                    onClick={() => {
                      onlineFilter("all");
                    }}
                    style={{
                      background:
                        onlineOfflineState === ""
                          ? theme?.common?.color1
                          : theme?.team?.participant,
                      width: "100%",
                      textTransform: theme?.team?.border,
                    }}
                    variant={onlineOfflineState === "" ? "contained" : "texts"}
                  >
                    {" "}
                    All status
                  </Button>
                </MenuItem>
              </Menu>

              {/* <p
                style={{
                  margin: "32px 12px 0px 0px",
                  color: "#88A1AB",
                  fontFamily: "URW DIN REGULAR",
                  fontSize: "14px",
                  display: matches ? "none" : "",
                }}
              >
                Workflow
              </p>
              <div style={{ margin: "20px 12px 0px 0px" }}>
                <TeamWorkflowDrop
                  workflowList={workflowList}
                  defaultWorkflow={defaultWorkflow}
                  selectedworkflow={selectedworkflow}
                  workflowLoader={workflowLoader}
                  handleChange={handleChange}
                />
              </div> */}
              {organizationUser(permissions.add_team_members) &&
                (matches ? (
                  <CustomTooltip text="Add Member" placement="top-start">
                    <Button
                      variant="contained"
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      style={{
                        textTransform: "none",
                        minWidth: matches ? "" : "161px",
                        padding: "8px 20px 8px 20px",
                        fontSize: "14px",
                        lineHeight: "22px",
                        backgroundColor: theme?.login?.mainColor,
                        margin: "20px 10px 0px 0px",
                        color: "#E1E7EA",
                        height: "42px",
                        fontFamily: "URW DIN REGULAR",
                      }}
                    >
                      <img alt="" src="/assets/admin/plus.svg" />
                      {!matches && (
                        <span style={{ marginLeft: "10px" }}>Add member</span>
                      )}
                    </Button>
                  </CustomTooltip>
                ) : (
                  <Button
                    variant="contained"
                    id="basic-button2"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    style={{
                      textTransform: "none",
                      minWidth: matches ? "" : "161px",
                      padding: "8px 20px 8px 20px",
                      fontSize: "14px",
                      lineHeight: "22px",
                      backgroundColor: theme?.login?.mainColor,
                      margin: "20px 10px 0px 0px",
                      color: "#E1E7EA",
                      height: "42px",
                      fontFamily: "URW DIN REGULAR",
                    }}
                  >
                    <img alt="" src="/assets/admin/plus.svg" />
                    {!matches && (
                      <span style={{ marginLeft: "10px" }}>Add member</span>
                    )}
                  </Button>
                ))}

              <Menu
                id="basic-menu2"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{
                  "& .MuiPaper-root": {
                    backgroundColor: theme?.addmember?.inboxcolor,
                    border: `2px solid ${theme?.addmember?.bordercolor}`,
                    boxShadow: "none",
                    borderRadius: "4px",
                  },
                }}
                style={{ marginTop: "5px" }}
              >
                <MenuItem
                  onClick={() => {
                    handleInviteMember();
                    handleClose();
                  }}
                  style={{
                    padding: "10px 15px",
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                  }}
                >
                  <img
                    src="/assets/admin/user.svg"
                    alt=""
                    style={{
                      paddingRight: "18px",
                      height: "22px",
                      width: "20px",
                    }}
                  />
                  Invite
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleImportMember();
                    handleClose();
                  }}
                  style={{
                    paddingRight: "45px",
                    borderColor: "#012243",
                    color: "#88A1AB",
                    fontFamily: "URW DIN REGULAR",
                  }}
                >
                  <img
                    src="/assets/admin/import.svg"
                    alt=""
                    style={{
                      paddingRight: "20px",
                      width: "22px",
                      height: "22px",
                    }}
                  />
                  Import (.xlsx)
                </MenuItem>
              </Menu>
              {organizationUser(permissions.delete_team_members) &&
                (matches ? (
                  <CustomTooltip text="Delete" placement="top-start">
                    <Button
                      variant="contained"
                      style={{
                        textTransform: "none",
                        minWidth: matches ? "" : "170px",
                        padding: matches ? "" : "8px 30px 8px 20px",
                        fontSize: "14px",
                        fontWeight: "300",
                        lineHeight: "22px",
                        backgroundColor: theme?.table?.buttonbgColor,
                        margin: "20px 10px 0px 0px",
                        color: "#88A1AB",
                        height: "42px",
                        fontFamily: "URW DIN REGULAR",
                      }}
                      onClick={() => {
                        deleteUsersPopup("multiple");
                      }}
                    >
                      <img src="/assets/admin/close.svg" alt="" />
                      {!matches && (
                        <span style={{ marginLeft: "16px" }}>
                          Delete
                          {checkedList.length !== 0 ? (
                            `(${checkedList.length})`
                          ) : (
                            <></>
                          )}
                        </span>
                      )}
                    </Button>
                  </CustomTooltip>
                ) : (
                  <Button
                    variant="contained"
                    style={{
                      textTransform: "none",
                      minWidth: matches ? "" : "170px",
                      padding: matches ? "" : "8px 30px 8px 20px",
                      fontSize: "14px",
                      fontWeight: "300",
                      lineHeight: "22px",
                      backgroundColor: theme?.table?.buttonbgColor,
                      margin: "20px 10px 0px 0px",
                      color: "#88A1AB",
                      height: "42px",
                      fontFamily: "URW DIN REGULAR",
                    }}
                    onClick={() => {
                      deleteUsersPopup("multiple");
                    }}
                  >
                    <img src="/assets/admin/close.svg" alt="" />
                    {!matches && (
                      <span style={{ marginLeft: "16px" }}>
                        Delete
                        {checkedList.length !== 0 ? (
                          `(${checkedList.length})`
                        ) : (
                          <></>
                        )}
                      </span>
                    )}
                  </Button>
                ))}
            </div>
          </div>

          <div style={{ margin: "15px 20px 0px 30px" }}>
            <TeamTable
              search={search}
              usersUpdate={usersUpdate}
              checkedList={checkedList}
              setCheckedList={setCheckedList}
              deleteUsersPopup={deleteUsersPopup}
              handleClickDelete={handleClickDelete}
              setUsersUpdate={setUsersUpdate}
              setInviteMember={setInviteMember}
              onlineLoader={onlineLoader}
              centrifugoLoginUpdateDetails={centrifugoLoginUpdateDetails}
              centrifugoViewTypeUpdateDetails={centrifugoViewTypeUpdateDetails}
              centrifugoRoleUpdateDetails={centrifugoRoleUpdateDetails}
              setcentrifugoRoleUpdateDetails={setcentrifugoRoleUpdateDetails}
              centrifugoActiveUpdateDetails={centrifugoActiveUpdateDetails}
              centrifugoEventUpdateDetails={centrifugoEventUpdateDetails}
              loggedInUsers={loggedInUsers}
              spaceUserOnlineList={spaceUserOnlineList}
              members={members}
              setmembers={setmembers}
              individualLoader={individualLoader}
              deleteUser={deleteUser}
              setdeleteUser={setdeleteUser}
              changeMessage={changeMessage}
              selectedEvents={selectedEvents}
              changedUserId={changedUserId}
              getUpdatedMembers={getUpdatedMembers}
              loading={loading}
              setloading={setloading}
              setmembersTemp={setmembersTemp}
              setPage={setPage}
              setRowsPerPage={setRowsPerPage}
              setTotalData={setTotalData}
              eventLoader={eventLoader}
              sortBy={sortBy}
              setsortBy={setsortBy}
              sortType={sortType}
              setsortType={setsortType}
              getMemberList={getMemberList}
              onlineOfflineState={onlineOfflineState}
            />
            {/* <TeamTable search={search} usersUpdate={usersUpdate} checkedList={checkedList} setCheckedList={setCheckedList} deleteUsersPopup={deleteUsersPopup} handleClickDelete={handleClickDelete} setUsersUpdate={setUsersUpdate} /> */}
          </div>
          <TablePagination
            component="div"
            count={totalData}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[]}
            style={{ color: "#70A6A6" }}
            sx={{
              // button:{color: '#ffffff'},
              button: {
                "&:disabled": {
                  color: "#70a6a669",
                },
              },
              // svg:{color:'#ffffff'},d
            }}
          />
        </div>
      </div>
      {inviteMember && (
        <InviteMember
          handleInviteMemberClose={handleInviteMemberClose}
          setInviteMember={setInviteMember}
          getMemberList={getMemberList}
        />
      )}
      {importMember && (
        <ImportMemberTeam
          handleImportMemberClose={handleImportMemberClose}
          usersUpdate={usersUpdate}
          setUsersUpdate={setUsersUpdate}
          getUpdatedMembers={getUpdatedMembers}
          setgetUpdatedMembers={setgetUpdatedMembers}
          getMemberList={getMemberList}
        />
      )}
      <ConfirmPop
        message="Are you sure you want to exit?"
        confirm={confirm}
        handleClickOpen={handleClickOpen}
        handleClickClose={handleClickClose}
        handleDelete={handleClickClose}
      />

      <ConfirmPop
        message={confirmDeleteMessage}
        confirm={confirmUserDelete}
        handleClickOpen={handleClickOpenUser}
        handleClickClose={handleClickCloseUser}
        handleDelete={handleClickDelete}
      />

      <Toast
        openToast={openUpdateToast}
        updateStatus={updateStatus}
        setOpenToast={setOpenUpdateToast}
        message={toastMessage}
      />
      <ConfirmPop
        message="Are you sure you want to change the workflow? all user roles will be changed to the deafault role of the selected workflow."
        confirm={confirm}
        handleClickOpen={handleClickOpen}
        handleClickClose={handleClickClose}
        handleDelete={changeWorkflow}
      />
      {addTeam && (
        <AddTeam theme={theme} handleClose={handleAddTeamClose} type="add" />
      )}
    </>
  );
};

export default Team;
