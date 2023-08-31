import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InviteMemberSearch from "./InviteMemberSearch";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { Button } from "@mui/material";
import SearchAddMember from "./SearchAddMember";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import IconButton from "@mui/material/IconButton";
import DropSearchAddMember from "./DropSearchAddMember";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TeamRoleSearchDrop from "./TeamRoleSearchDrop";
// import useClipboard from 'react-hook-clipboard'
import Toast from "../../sections/Toast";
import EventDropInviteMember from "./EventDropInviteMember";
import Skeleton from "@mui/material/Skeleton";
import TeamViewtypeDrop from "./TeamViewtypeDrop";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  changeOpacity,
  organizationUser,
  ValidateEmail,
} from "../../utilities/common";
import SearchNewMember from "./SearchNewMember";
import validator from "validator";
import { WEBSITE_DOMAIN } from "../../utilities/websiteUrls.ts";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const InviteMember = ({
  handleInviteMemberClose,
  rows,
  setInviteMember,
  getMemberList,
}) => {
  const theme_color = useSelector((state) => state.theme.theme);
  const theme = useSelector((state) => state.theme.themeData);
  const permissions = useSelector((state) => state.permissions);

  const [filteredData, setFilteredData] = useState([]);

  const [selected, setIsSelected] = useState([]);

  // const [clipboard, copyToClipboard] = useClipboard()

  let [teamLinkSettings, setTeamLinkSettings] = useState({});

  const [openToastforgot, setOpenToastforgot] = useState(false);

  const [loader, setLoader] = useState(true);

  const [inviteLinkLoader, setinviteLinkLoader] = useState(false);

  const [openUpdateToast, setOpenUpdateToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [updateStatus, setUpdateStatus] = useState("success");

  const [viewType, setViewType] = useState("P");

  const [departments, setdepartments] = useState([]);
  const [rootRoles, setrootRoles] = useState([]);
  const [allSubrooms, setallSubrooms] = useState([]);
  const [allRooms, setallRooms] = useState([]);

  const [addUserLoader, setaddUserLoader] = useState(false);
  const [addedId, setaddedId] = useState([]);

  const [buttonLoader, setbuttonLoader] = useState(false);

  const [addedStatus, setaddedStatus] = useState(false);

  const [newUserId, setnewUserId] = useState(10000);

  function isEmpty(ob) {
    for (var i in ob) {
      return false;
    }
    return true;
  }

  const getOrganisationLinkSettings = () => {
    setinviteLinkLoader(true);
    AxiosLocal.get(
      `organisation/invite/link/settings/${localStorage.getObject("id")}`
    ).then((response) => {
      let settingsData = response.data.data;
      setTeamLinkSettings({ ...settingsData });
      setViewType(settingsData.viewer_type);
      setLoader(true);
      setinviteLinkLoader(false);
    });
  };

  useEffect(() => {
    AxiosLocal.get("department/").then((response) => {
      console.log(response.data.data, "departmentInviteMember");
      setdepartments(response.data.data);
      setrootRoles(response.data.root);
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    });
    getOrganisationLinkSettings();
    AxiosLocal.get("subroom/").then((response) => {
      console.log(response.data.data, "subroomInviteMember");
      setallSubrooms(response.data.data);
    });
    AxiosLocal.get("mainspace/subspace/").then((response) => {
      console.log([...response.data.data], "mainSpaceSubspace");
      setallRooms([...response.data.data]);
    });
  }, []);

  useEffect(() => {
    setaddedStatus(!addedStatus);
  }, [selected]);

  const [inputValue, setinputValue] = useState("");
  const [searchLoader, setsearchLoader] = useState(false);

  const [newUser, setnewUser] = useState({
    id: 0,
    email: inputValue,
    same_team: false,
    avatar: "",
    role: { name: "" },
    viewer_type: "P",
    spaces: [],
  });

  const handleChange = (event) => {
    const searchWord = event.target.value;
    // const searchWordLower = searchWord.toLowerCase();

    // const newFilter = rows.filter((item) => {
    //     return item.email.toLowerCase().includes(searchWordLower)
    // })
    // setFilteredData(newFilter)
    setsearchLoader(true);
    if (searchWord == "") {
      setFilteredData([...selected]);

      setTimeout(() => {
        setsearchLoader(false);
      }, 1000);
    } else {
      AxiosLocal.post("user/search/", {
        search_text: searchWord,
      }).then((response) => {
        console.log(response.data, "userSearchSearch");
        setFilteredData(response.data.data);

        setTimeout(() => {
          setsearchLoader(false);
        }, 1000);
      });
    }
  };

  var removeObjectFromArrayByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };

  const clearSearch = () => {
    setFilteredData([...selected]);
    setinputValue("");
    setsearchLoader(false);
  };

  const activeItemSet = (item, addRemoveType) => {
    setaddUserLoader(true);
    setaddedId([item.id]);
    if (addRemoveType == "add") {
      setTimeout(() => {
        let selectedArray = [...selected];

        selectedArray.push(item);

        setIsSelected([...selectedArray]);

        let newData = removeObjectFromArrayByAttr(filteredData, "id", item.id);

        // setFilteredData([...newData]);
        setFilteredData([...selectedArray]);
        setaddUserLoader(false);
        setaddedId([]);
      }, 2000);

      setinputValue("");

      setToastMessage("User selected for invite.");
    } else {
      setTimeout(() => {
        let newData = removeObjectFromArrayByAttr(selected, "id", item.id);

        setIsSelected([...newData]);

        setFilteredData([...newData]);

        setaddUserLoader(false);
        setaddedId([]);
      }, 2000);

      setToastMessage("User removed from invite.");
    }
    setOpenUpdateToast(true);
    setUpdateStatus("success");
  };

  const changeRole = (role, componentName, userId) => {
    // setLoading(true)
    if (componentName == "inviteSettings") {
      AxiosLocal.post(
        `organisation/invite/link/settings/${localStorage.getObject("id")}`,
        {
          role_id: role.id,
        }
      ).then((response) => {
        console.log(response.data);
        setOpenUpdateToast(true);
        setToastMessage("Role updated successfully.");
        setUpdateStatus("success");
        // setLoading(false)
      });
    } else if (componentName == "newUserList") {
      let newUserData = { ...newUser };
      newUserData.role = role;
      setnewUser({ ...newUserData });
    } else {
      console.log("inviteMember");
      let filterdData = [...filteredData];
      let changedData = filterdData.filter((item) => {
        if (item.id == userId) {
          item.role = role;
        }
        return item;
      });
      setFilteredData([...changedData]);
    }
  };

  const changeViewType = (viewType, componentName, userId) => {
    console.log(componentName, "newUserListnewUserList");
    if (componentName == "inviteSettings") {
      AxiosLocal.post(
        `organisation/invite/link/settings/${localStorage.getObject("id")}`,
        {
          viewer_type: viewType,
        }
      ).then((response) => {
        setOpenUpdateToast(true);
        setToastMessage("View type updated successfully.");
        setUpdateStatus("success");
      });
    } else if (componentName == "newUserList") {
      console.log("newUserListnewUserList");
      let newUserData = { ...newUser };
      newUserData.viewer_type = viewType;
      setnewUser({ ...newUserData });
      console.log(newUserData, "newUserListnewUserList");
    } else {
      let filterdData = [...filteredData];
      let changedData = filterdData.filter((item) => {
        if (item.id == userId) {
          item.viewer_type = viewType;
        }
        return item;
      });
      setFilteredData([...changedData]);
    }
  };

  const addMember = () => {
    setbuttonLoader(true);
    AxiosLocal.post("user/registration/", {
      new_users: [...selected],
      adding_type: "in_db_not_in_team",
    }).then((response) => {
      console.log(response.data);
      setbuttonLoader(true);
      if (response.data.status == "Success") {
        setinputValue("");
        setIsSelected([]);
        setFilteredData([]);
        setOpenUpdateToast(true);
        setToastMessage("Selected users successfully added to the team.");
        setUpdateStatus("success");
        setInviteMember(false);
        setbuttonLoader(false);
        getMemberList(1, "all", "", "", "");
      }
    });
  };

  const spaceChange = (checkedList, userId, componentName) => {
    console.log(componentName, "checkedList");
    if (componentName == "newUserList") {
      let newUserData = { ...newUser };
      newUserData.spaces = [...checkedList];
      setnewUser({ ...newUserData });
    } else if (componentName == "inviteSettings") {
      if (checkedList.length != 0) {
        AxiosLocal.post(
          `organisation/invite/link/settings/${localStorage.getObject("id")}`,
          {
            spaces: checkedList,
          }
        ).then((response) => {
          setOpenUpdateToast(true);
          setToastMessage("Spaces updated successfully.");
          setUpdateStatus("success");
        });
      }
    } else {
      console.log(checkedList, "spaceChanges");
      let filterdData = [...filteredData];
      let changedData = filterdData.filter((item) => {
        if (item.id == userId) {
          item.spaces = [...checkedList];
        }
        return item;
      });
      setFilteredData([...changedData]);
    }
  };

  const addNewMember = (email) => {
    setaddUserLoader(true);
    setaddedId([0]);
    console.log(email, "selectedUsers");
    let newUserData = { ...newUser };
    newUserData.id = newUserId;
    setnewUserId(newUserId + 1);
    newUserData.email = email;
    console.log(newUserData, "newUserData");
    setnewUser({ ...newUserData });
    let selectedUsers = [...selected];
    selectedUsers.push({ ...newUserData });
    setIsSelected([...selectedUsers]);
    setnewUser({ ...newUserData });
    setToastMessage("User selected for invite.");
    setOpenUpdateToast(true);
    setUpdateStatus("success");
    setTimeout(() => {
      setaddUserLoader(false);
    }, 1000);
    setFilteredData([...selectedUsers]);
    setinputValue("");
    setsearchLoader(false);
    newUserData.spaces = [];
    setnewUser({ ...newUserData });
  };

  return (
    <>
      <div
        style={{
          alignItems: "center",
          background: changeOpacity(theme?.addmember?.color2, 0.7),
          bottom: "0px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          left: "0px",
          position: "fixed",
          right: "0px",
          top: "0px",
          zIndex: "33",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "965px",
            height: filteredData.length != 0 ? "728px" : "600px",
            maxHeight: "90vh",
            backgroundColor:
              theme_color == "dark" ? theme?.bg_color_1 : "white",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              position: "absolute",
              display: "flex",
              width: "20px",
              height: "20px",
              top: "-10px",
              right: "-10px",
              backgroundColor: "#88A1AB",
              borderRadius: "25px",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={handleInviteMemberClose}
          >
            <img alt="" src="/assets/icons/x.svg" />
          </div>
          <div
            style={{
              color: theme_color == "dark" ? "#E1E7EA" : "#375C78",
              width: "full",
              fontSize: "16px",
              fontWeight: "700",
              textAlign: "center",
              padding: "33px 0px 20px",
              fontFamily: "URW DIN",
              lineHeight: "22px",
            }}
          >
            Invite members to <br />
            {localStorage.getObject("organization")}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {localStorage.getObject("organization_logo") == "" ||
            localStorage.getObject("organization_logo") == "null" ? (
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  backgroundColor: theme?.addmember?.inboxcolor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textTransform: "uppercase",
                  flexShrink: "0",
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: theme?.addmember?.bordercolor,
                }}
              >
                <span
                  style={{
                    textAlign: "center",
                    color: "#70A6A6",
                    fontSize: "20px",
                  }}
                >
                  {localStorage.getObject("organization")[0]}
                </span>
              </div>
            ) : (
              <img
                alt=""
                style={{
                  width: "90px",
                  height: "90px",
                  border: "2px solid",
                  borderColor: theme?.addmember?.bordercolor,
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                src={localStorage.getObject("organization_logo")}
              />
            )}
          </div>
          {organizationUser(permissions.add_team_members) ? (
            <></>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#E61959",
                marginTop: "20px",
              }}
            >
              <img src="/assets/images/info-white.svg" alt="" />
              <p
                style={{
                  fontSize: "14px",
                  color: "white",
                  fontFamily: "URW DIN REGULAR",
                  padding: "0px",
                  margin: "10px",
                }}
              >
                Permission for add team member is off for you. Please contact
                owner of the Team.
              </p>
            </div>
          )}
          <div
            className={
              organizationUser(permissions.add_team_members) ? "" : "blur"
            }
            style={{
              pointerEvents: organizationUser(permissions.add_team_members)
                ? "auto"
                : "none",
            }}
          >
            <div style={{ margin: "30px 38px 10px" }}>
              <p
                style={{
                  margin: "0px",
                  fontFamily: "URW DIN REGULAR",
                  color: "#88A1AB",
                }}
              >
                Search
              </p>
              <InviteMemberSearch
                inputValue={inputValue}
                setinputValue={setinputValue}
                handleChange={handleChange}
                clearSearch={clearSearch}
              />
            </div>
            {filteredData.length != 0 ? (
              <div
                style={{
                  backgroundColor:
                    inputValue != ""
                      ? theme?.addmember?.color4
                      : theme?.addmember?.color4,
                  height: "235px",
                  margin: "0px 38px 10px",
                }}
              >
                <SearchAddMember
                  searchLoader={searchLoader}
                  inputValue={inputValue}
                  filteredData={filteredData}
                  activeItemSet={activeItemSet}
                  selected={selected}
                  allSubrooms={allSubrooms}
                  allRooms={allRooms}
                  setLoader={setLoader}
                  loader={loader}
                  departments={departments}
                  rootRoles={rootRoles}
                  setOpenUpdateToast={setOpenUpdateToast}
                  setToastMessage={setToastMessage}
                  setUpdateStatus={setUpdateStatus}
                  changeRole={changeRole}
                  setdepartments={setdepartments}
                  addUserLoader={addUserLoader}
                  addedId={addedId}
                  viewType={viewType}
                  setViewType={setViewType}
                  changeViewType={changeViewType}
                  spaceChange={spaceChange}
                  setInviteMember={setInviteMember}
                  addedStatus={addedStatus}
                />
              </div>
            ) : filteredData.length == 0 && inputValue == "" ? (
              <></>
            ) : filteredData.length == 0 &&
              inputValue != "" &&
              validator.isEmail(inputValue) ? (
              <div
                style={{
                  backgroundColor:
                    inputValue != ""
                      ? theme?.addmember?.color4
                      : theme?.addmember?.color4,
                  height: "150px",
                  margin: "0px 38px 10px",
                }}
              >
                <SearchNewMember
                  allSubrooms={allSubrooms}
                  allRooms={allRooms}
                  setLoader={setLoader}
                  loader={loader}
                  departments={departments}
                  rootRoles={rootRoles}
                  setOpenUpdateToast={setOpenUpdateToast}
                  setToastMessage={setToastMessage}
                  setUpdateStatus={setUpdateStatus}
                  changeRole={changeRole}
                  setdepartments={setdepartments}
                  addUserLoader={addUserLoader}
                  addedId={addedId}
                  viewType={viewType}
                  setViewType={setViewType}
                  changeViewType={changeViewType}
                  spaceChange={spaceChange}
                  setInviteMember={setInviteMember}
                  inputValue={inputValue}
                  addNewMember={addNewMember}
                  newUser={newUser}
                />
              </div>
            ) : filteredData.length == 0 &&
              inputValue != "" &&
              !validator.isEmail(inputValue) ? (
              <div
                style={{
                  backgroundColor: theme?.addmember?.bordercolor,
                  height: "100px",
                  margin: "0px 38px 10px",
                }}
              >
                <Typography
                  variant="h5"
                  style={{
                    color: theme?.spaces?.secondaryColor,
                    textAlign: "center",
                    padding: "35px 0px",
                    fontFamily: "URW DIN REGULAR",
                    fontSize: "22px",
                  }}
                >
                  No search results found
                </Typography>
              </div>
            ) : (
              <></>
            )}
            <div style={{ margin: "20px 38px 30px" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={4}>
                  <Grid item xs={3.5}>
                    <p
                      style={{
                        margin: "0px",
                        fontFamily: "URW DIN REGULAR",
                        color: "#88A1AB",
                      }}
                    >
                      Or send a invite link
                    </p>
                    <Paper
                      component="form"
                      sx={{
                        p: "2px 0px",
                        display: "flex",
                        alignItems: "center",
                        height: "33px",
                        backgroundColor: theme?.addmember?.inboxcolor,
                      }}
                      style={{
                        boxShadow: "none",
                        border: "2px solid",
                        borderColor: theme?.addmember?.bordercolor,
                      }}
                      fullWidth
                    >
                      {inviteLinkLoader ? (
                        <Skeleton
                          style={{
                            backgroundColor: theme?.loading?.loadingColor,
                          }}
                          variant="rectangular"
                          width={235}
                          height={36}
                        />
                      ) : (
                        <>
                          <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Link"
                            value={`${WEBSITE_DOMAIN}invitation/${teamLinkSettings.code}`}
                            inputProps={{ "aria-label": "Email" }}
                            style={{
                              fontSize: "14px",
                              color: theme.addmember.color3,
                              fontFamily: "URW DIN REGULAR",
                            }}
                          />
                          <IconButton
                            onClick={() => {
                              setOpenToastforgot(true);
                              navigator.clipboard.writeText(
                                `${WEBSITE_DOMAIN}invitation/${teamLinkSettings.code}`
                              );
                            }}
                            type="button"
                            style={{
                              background: theme?.addmember?.inboxcolor,
                              borderRadius: "0px",
                            }}
                            sx={{ p: "10px" }}
                            aria-label="search"
                          >
                            <img alt="" src="/assets/admin/copy.svg" />
                          </IconButton>
                        </>
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={2.5}>
                    <p
                      style={{
                        margin: "0px",
                        fontFamily: "URW DIN REGULAR",
                        color: "#88A1AB",
                      }}
                    >
                      View type
                    </p>
                    {inviteLinkLoader ? (
                      <Skeleton
                        style={{
                          backgroundColor: theme?.loading?.loadingColor,
                        }}
                        variant="rectangular"
                        width={180}
                        height={40}
                      />
                    ) : (
                      <TeamViewtypeDrop
                        userId={"1"}
                        viewType={viewType}
                        setOpenUpdateToast={setOpenUpdateToast}
                        setToastMessage={setToastMessage}
                        setUpdateStatus={setUpdateStatus}
                        setViewType={setViewType}
                        changeViewType={changeViewType}
                        componentFor="inviteSettings"
                      />
                    )}
                  </Grid>
                  <Grid item xs={2.5}>
                    <p
                      style={{
                        margin: "0px",
                        fontFamily: "URW DIN REGULAR",
                        color: "#88A1AB",
                      }}
                    >
                      Default role
                    </p>
                    {inviteLinkLoader ? (
                      <Skeleton
                        style={{
                          backgroundColor: theme?.loading?.loadingColor,
                        }}
                        variant="rectangular"
                        width={180}
                        height={40}
                      />
                    ) : (
                      <TeamRoleSearchDrop
                        setLoader={setLoader}
                        loader={loader}
                        setdepartments={setdepartments}
                        departments={departments}
                        rootRoles={rootRoles}
                        role={
                          isEmpty(teamLinkSettings) ? "" : teamLinkSettings.role
                        }
                        setOpenUpdateToast={setOpenUpdateToast}
                        setToastMessage={setToastMessage}
                        setUpdateStatus={setUpdateStatus}
                        changeRole={changeRole}
                        componentFor="inviteSettings"
                      />
                    )}
                  </Grid>
                  <Grid item xs={3.5}>
                    <p
                      style={{
                        margin: "0px",
                        fontFamily: "URW DIN REGULAR",
                        color: "#88A1AB",
                      }}
                    >
                      Default Spaces
                    </p>
                    {
                      inviteLinkLoader ? (
                        <Skeleton
                          style={{
                            backgroundColor: theme?.loading?.loadingColor,
                          }}
                          variant="rectangular"
                          width={235}
                          height={40}
                        />
                      ) : (
                        // <Paper component="form" sx={{ p: '2px 0px', display: 'flex', alignItems: 'center', height: '33px',  backgroundColor: '#011934', }} style={{boxShadow:'none',border: '2px solid',borderColor:'#012A50'}} fullWidth >
                        <EventDropInviteMember
                          events={
                            isEmpty(teamLinkSettings)
                              ? []
                              : teamLinkSettings.spaces
                          }
                          allSubrooms={
                            allSubrooms.length == 0 ? [] : allSubrooms
                          }
                          allRooms={allRooms}
                          width="100%"
                          spaceChange={spaceChange}
                          defaultSpace={true}
                          componentFor="inviteSettings"
                        />
                      )
                      // </Paper>
                    }
                  </Grid>
                </Grid>
              </Box>
            </div>

            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {buttonLoader ? (
                <Button
                  variant="contained"
                  style={{
                    textTransform: "none",
                    minWidth: "161px",
                    padding: "8px 30px 8px 20px",
                    fontSize: "14px",
                    lineHeight: "22px",
                    backgroundColor: "#008BCD",
                    color: "#E1E7EA",
                    height: "42px",
                    fontFamily: "URW DIN REGULAR",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress size={20} style={{ color: "white" }} />
                  </Box>
                </Button>
              ) : selected.length > 0 ? (
                <Button
                  onClick={addMember}
                  variant="contained"
                  style={{
                    textTransform: "none",
                    minWidth: "161px",
                    padding: "8px 30px 8px 20px",
                    fontSize: "14px",
                    lineHeight: "22px",
                    backgroundColor: theme.login.mainColor,
                    color: "#E1E7EA",
                    height: "42px",
                    fontFamily: "URW DIN REGULAR",
                  }}
                >
                  <img alt="" src="/assets/admin/plus.svg" />
                  <span style={{ marginLeft: "16px" }}>
                    Invite all ({selected.length})
                  </span>
                </Button>
              ) : (
                <></>
              )}
            </div>

            <div
              className="vertical-scrollbar"
              style={{
                display: "flex",
                maxHeight: "calc(100% - 100px)",
                flexDirection: "column",
                gap: "6px",
                overflow: "hidden",
                overflowY: "auto",
              }}
            ></div>

            <div
              className="vertical-scrollbar"
              style={{
                display: "flex",
                maxHeight: "calc(100% - 100px)",
                flexDirection: "column",
                gap: "6px",
                overflow: "hidden",
                overflowY: "auto",
              }}
            ></div>
          </div>
        </div>
      </div>
      <Toast
        openToast={openToastforgot}
        setOpenToast={setOpenToastforgot}
        message="Link copied successfully."
      />
      <Toast
        openToast={openUpdateToast}
        updateStatus={updateStatus}
        setOpenToast={setOpenUpdateToast}
        message={toastMessage}
      />
    </>
  );
};

export default InviteMember;
