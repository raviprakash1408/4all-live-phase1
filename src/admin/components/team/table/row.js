import {
  TableRow,
  Checkbox,
  Stack,
  FormControlLabel,
  Collapse,
  Box,
  Snackbar,
  AvatarGroup,
  Avatar,
} from "@mui/material";
// import TeamRoleSearchDrop from 'admin/components/TeamRoleSearchDrop';
// import TeamViewtypeDrop from 'admin/components/TeamViewtypeDrop';
import React, { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
// import Toast from 'sections/Toast';
// import { AxiosLocal } from 'utilities/axiosUtils.ts';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MuiTableCell from "@material-ui/core/TableCell";
import AvatarDropdown from "../../AvatarDropdown";
import IOSSwitch from "../../CustomSwitch";
import TeamRoleSearchDrop from "../../TeamRoleSearchDrop";
import TeamRoleSearchDropElement from "../../TeamRoleSearchDropElement";
import Toast from "../../../../sections/Toast";
import { AxiosLocal } from "../../../../utilities/axiosUtils.ts";
import TeamViewtypeDrop from "../../TeamViewtypeDrop";
import EventDropInviteMember from "../../EventDropInviteMember";
import { SpaceLoadingShimmer } from "../../shimmers/SpaceLoadingShimmer.tsx";
import { organizationUser } from "../../../../utilities/common";

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
    padding: "0px 16px",
    lineHeight: "16px",
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
    selectedEvents,
    deleteUsersPopup,
    loggedInUsers,
    onlineLoader,
    centrifugoLoginUpdateDetails,
    centrifugoViewTypeUpdateDetails,
    centrifugoRoleUpdateDetails,
    setcentrifugoRoleUpdateDetails,
    centrifugoActiveUpdateDetails,
    centrifugoEventUpdateDetails,
    individualLoader,
    spaceUserOnlineList,
    changedUserId,
    departments,
    setdepartments,
    rootRoles,
    allSubrooms,
    setallSubrooms,
    loader,
    setLoader,
    allRooms,
    setallRooms,
    eventLoader,
  } = props;

  const permissions = useSelector((state) => state.permissions);

  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  // const [hoverpop, setHoverpop] = React.useState(false)
  const [openToast, setOpenToast] = React.useState(false);
  const theme_cat = useSelector((state) => state.theme.theme);

  const theme = useSelector((state) => state.theme.themeData);

  const classess = useStyles();
  const [hoverbutton, setHoverbutton] = React.useState(false);
  const [eventType, seteventType] = React.useState(true);

  const [userActive, setuserActive] = useState(row.is_active);

  const handleChangeType = (event) => {
    seteventType(event.target.value);
  };

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

  const { vertical, horizontal, openCopyToast } = state;

  const handleClick = (newState) => () => {
    setState({ openCopyToast: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, openCopyToast: false });
  };

  const [hover, setHover] = React.useState(false);
  const [viewType, setViewType] = React.useState(row.view_type);
  const [isActive, setisActive] = React.useState(
    row.is_active == "True" ? true : false
  );
  const [openUpdateToast, setOpenUpdateToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [updateStatus, setUpdateStatus] = useState("success");

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if(viewType == "V"){
  //     changeRole({id: 2})

  //   }

  // }, [viewType])

  useEffect(() => {
    // changeViewType("V")
  }, []);

  const changeRole = (role) => {
    setLoading(true);
    console.log(role, "rolerole");

    AxiosLocal.post("user/role/", {
      user_id: row.id,
      role_id: role.id,
    }).then((response) => {
      console.log(response.data);
      setOpenUpdateToast(true);
      setToastMessage("Role updated successfully.");
      setUpdateStatus("success");
      setLoading(false);
      if (role.permission_group.permission_type == "V") {
        // AxiosLocal.post(`user/organisation/relation/edit`, {
        //   user_id: row.id,
        //   viewer_type: "V",
        // }).then((response) => {
        //   console.log(response, "viewTypeChangeResponse");
        //   setOpenUpdateToast(true);
        //   setToastMessage("View type updated successfully.");
        //   setUpdateStatus("success");
        // });
      }
    });
  };

  const changeViewType = (viewType) => {
    setViewType(viewType);

    AxiosLocal.post(`user/organisation/relation/edit`, {
      user_id: row.id,
      viewer_type: viewType,
      guestUser: false,
    }).then((response) => {
      console.log(response, "viewTypeChangeResponse");
      setOpenUpdateToast(true);
      setToastMessage("View type updated successfully.");
      setUpdateStatus("success");
      if (viewType == "V") {
        // AxiosLocal.post("user/role/", {
        //   user_id: row.id,
        //   role_id: 2,
        // }).then((response) => {
        //   console.log(response.data);
        //   setOpenUpdateToast(true);
        //   setToastMessage("Role updated successfully.");
        //   setUpdateStatus("success");
        //   setLoading(false);
        // });
      }
    });
  };

  const changeIsActive = (userId, isActive) => {
    console.log(isActive, "changeIsActive");
    setuserActive(isActive);
    AxiosLocal.post(`user/profile/edit/${userId}/`, {
      is_active: isActive,
    }).then((response) => {
      setOpenUpdateToast(true);
      setToastMessage("User acive state updated successfully.");
      setUpdateStatus("success");
    });
  };

  const [viewLoader, setviewLoader] = useState(false);

  const isOnlineList = (userId, subSpaceSlug) => {
    let online_list = spaceUserOnlineList.filter((item) => {
      console.log(
        userId,
        item.userId,
        subSpaceSlug,
        item.subSpaceSlug,
        "isOnlineList"
      );
      if (item.userId == userId && item.subSpaceSlug == subSpaceSlug) {
        return item;
      }
    });

    if (online_list.length == 0) {
      return false;
    } else {
      return true;
    }
  };

  const spaceChange = (checkedList, userId, componentName) => {
    console.log(checkedList, userId, componentName, "spaceChangeTeamTable");
    AxiosLocal.post(`user/space/change/`, {
      spaces: checkedList,
      user_id: userId,
    }).then((response) => {
      setOpenUpdateToast(true);
      setToastMessage("Spaces updated successfully.");
      setUpdateStatus("success");
    });
  };

  return (
    <>
      <React.Fragment>
        <TableRow
          key={Number(row.id)}
          className={`${classes.root} collapseRow`}
          style={{
            backgroundColor: hover
              ? theme?.team?.hover
              : theme?.table?.rowColor,
            // borderTop: `10px solid ${theme?.table?.bgColor}`,
            cursor: "pointer",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        // onClick={() => setOpen(!open)}
        >
          {/* <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell> */}

          <TableCell
            // component="th"
            scope="row"
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginTop: "10px",
              opacity: row.invitation_accepted && userActive ? 1 : 0.2,
            }}
          >
            {organizationUser(permissions.edit_team_members) &&
              row.id != localStorage.getObject("id") ? (
              <Checkbox
                {...label}
                item={row}
                value={Number(row.id)}
                checked={checkedList.includes(Number(row.id))}
                onChange={handleCheckboxClick}
                sx={{
                  color: hover
                    ? theme?.team?.checkboxhover
                    : theme?.table?.buttonColor,

                  "& .MuiSvgIcon-root": { fontSize: 22 },
                  "&.Mui-checked": {
                    color: theme?.common?.color1,
                  },
                }}
                style={{
                  marginRight: "20px",
                  width: "30px",
                  height: "30px",
                  display:
                    organizationUser(permissions.edit_team_members) &&
                      row.id != localStorage.getObject("id")
                      ? "block"
                      : "none",
                }}
              />
            ) : (
              <div
                style={{ marginRight: "20px", width: "30px", height: "30px" }}
              ></div>
            )}

            {row.member_logo ? (
              <div style={{ display: "flex", position: "relative" }}>
                <img
                  src={row.member_logo}
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  alt=""
                />
                {loggedInUsers.includes(row.id) ? (
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
                )}
              </div>
            ) : (
              // <div style={{height:'40px',padding:'0px 7.45px',position:'relative',textAlign: 'center',
              // verticalAlign: 'middle',
              // lineHeight: '40px',borderRadius:'50%',backgroundColor:'#012243',color:'#88A1AB',fontSize:'18px',fontFamily:'URW DIN REGULAR',textTransform:'uppercase'}} >
              //   <span>{row.first_name[0]}{row.last_name[0]}</span>
              //   </div>
              <div style={{ display: "flex", position: "relative" }}>
                <img
                  alt=""
                  src="/assets/admin/round.svg"
                  style={{ filter: theme?.team?.iconBg }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    textAlign: "center",
                    verticalAlign: "middle",
                    lineHeight: "40px",
                    transform: "translateX(-50%) translateY(-50%)",
                    color: theme?.common?.color3,

                    fontSize: "18px",
                    fontFamily: "URW DIN REGULAR",
                    textTransform: "uppercase",
                  }}
                >
                  {!row.first_name && !row.last_name && row.email[0]}
                  {row.first_name && row.first_name[0]}
                  {row.last_name && row.last_name[0]}
                </span>
                {centrifugoLoginUpdateDetails.id == row.id &&
                  centrifugoLoginUpdateDetails.type == "login" ? (
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
                ) : centrifugoLoginUpdateDetails.id == row.id &&
                  centrifugoLoginUpdateDetails.type == "logout" ? (
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
                ) : onlineLoader ? (
                  <Skeleton
                    style={{
                      position: "absolute",
                      bottom: "-1px",
                      right: "-1px",
                      width: "12px",
                      height: "12px",
                      background: "#57676e",
                    }}
                    variant="circular"
                    width={20}
                    height={20}
                  />
                ) : loggedInUsers.includes(row.id) ? (
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
                )}
              </div>
            )}
          </TableCell>

          <TableCell
            align="left"
            style={{
              color: theme?.table?.headingColor,
              fontSize: "14px",
              fontFamily: "URW DIN",
              width: "25%",
              opacity: row.invitation_accepted && userActive ? 1 : 0.2,
            }}
          >
            <p>
              {row.first_name && row.first_name}{" "}
              {row.first_name && row.last_name}{" "}
              {!row.first_name && !row.last_name && row.email} <br />{" "}
              <span
                style={{
                  fontFamily: "URW DIN REGULAR",
                  color: theme?.common?.color3,

                  height: "100px",
                }}
              >
                {!row.first_name && !row.last_name ? "" : row.email}
              </span>
            </p>
          </TableCell>

          <TableCell
            align="left"
            style={{
              width: "15%",
              pointerEvents:
                organizationUser(permissions.edit_team_members) &&
                  row.invitation_accepted &&
                  userActive
                  ? "all"
                  : "none",
              color: theme?.common?.color3,

              fontSize: "14px",
              padding: "0px 20px",
              opacity: row.invitation_accepted && userActive ? 1 : 0.2,
            }}
          >
            {centrifugoViewTypeUpdateDetails.changed &&
              // centrifugoViewTypeUpdateDetails.updating_user_id !=
              //   localStorage.getObject("id") &&
              centrifugoViewTypeUpdateDetails.user_id == row.id &&
              centrifugoViewTypeUpdateDetails.type == "viewer_type_updation" &&
              individualLoader ? (
              <Skeleton
                style={{
                  background:
                    centrifugoViewTypeUpdateDetails.updating_user_id !=
                      localStorage.getObject("id")
                      ? "#143f63"
                      : "#002E56",
                }}
                variant="rounded"
                width={125}
                height={40}
              />
            ) : organizationUser(permissions.edit_team_members) ? (
              <TeamViewtypeDrop
                viewType={
                  centrifugoViewTypeUpdateDetails.user_id == row.id
                    ? centrifugoViewTypeUpdateDetails.viewer_type
                    : viewType
                }
                setViewType={setViewType}
                changeViewType={changeViewType}
                viewLoader={viewLoader}
                componentFor="teamTable"
                hover={hover}
              />
            ) : viewType == "P" ? (
              "Primary"
            ) : viewType == "S" ? (
              "Secondary"
            ) : viewType == "V" ? (
              "Viewer"
            ) : (
              ""
            )}

            {/* {row.view_type} */}
          </TableCell>
          <TableCell
            align="left"
            style={{
              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
              color: "#88A1AB",
              width: "20%",
              pointerEvents:
                organizationUser(permissions.edit_team_members) &&
                  row.invitation_accepted &&
                  userActive
                  ? "all"
                  : "none",
              opacity: row.invitation_accepted && userActive ? 1 : 0.2,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={3}
            >
              {eventLoader ? (
                <SpaceLoadingShimmer />
              ) : localStorage.getObject("is_organization_user") === "true" &&
                row.id == localStorage.getObject("id") ? (
                <p>All Spaces </p>
              ) : (
                <EventDropInviteMember
                  events={
                    changedUserId == row.id && selectedEvents.length != 0
                      ? selectedEvents
                      : row.spaces
                  }
                  allSubrooms={allSubrooms}
                  allRooms={allRooms}
                  width="100%"
                  spaceChange={spaceChange}
                  defaultSpace={true}
                  componentFor="teamTable"
                  userId={row.id}
                  changedUserId={changedUserId}
                  individualLoader={individualLoader}
                  centrifugoEventUpdateDetails={centrifugoEventUpdateDetails}
                />
              )}

              {/* <AvatarDropdown row={row} allRooms={allRooms} isOnlineList={isOnlineList}/> */}
              {/* <AvatarGroup
                  max={4}
                  sx={{
                    justifyContent: "start",
                    "& .MuiAvatar-root": {
                      width: 40,
                      height: 40,
                      border: `2px solid ${theme?.table?.buttonColor}`,
                      backgroundColor: theme?.table?.rowColor,
                      color: "#5D7C90",
                      fontSize: "14px",
                      fontFamily: "URW DIN",
                    },
                  }}
                >
                  {row.spaces.map((imgs) => (
                      <Avatar
                        src={imgs.menu_logo}
                        style={{
                          height: "40px",
                          width: "40px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: isOnlineList(row.id,imgs.slug)?`2px solid #008bcd`:`2px solid #FF1759`,
                        }}
                        alt=""
                      />
                  ))}
                </AvatarGroup> */}
            </Stack>
          </TableCell>
          <TableCell
            align="left"
            style={{
              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
              color: "#88A1AB",
              width: "15%",
              pointerEvents:
                organizationUser(permissions.edit_team_members) &&
                  row.invitation_accepted &&
                  userActive
                  ? "all"
                  : "none",
              opacity: row.invitation_accepted && userActive ? 1 : 0.2,
            }}
          >
            {/* {row.role} */}
            {centrifugoRoleUpdateDetails.changed &&
              centrifugoRoleUpdateDetails.user_id == row.id &&
              centrifugoRoleUpdateDetails.type == "update_role" &&
              individualLoader ? (
              <Skeleton
                style={{
                  background:
                    centrifugoRoleUpdateDetails.updating_user_id !=
                      localStorage.getObject("id")
                      ? "#143f63"
                      : "#002E56",
                }}
                variant="rounded"
                width={150}
                height={40}
              />
            ) : organizationUser(permissions.edit_team_members) ? (
              localStorage.getObject("is_organization_user") === "true" &&
                row.id == localStorage.getObject("id") ? (
                <>
                  <p>Administrator</p>
                </>
              ) : (
                <TeamRoleSearchDrop
                  setLoader={setLoader}
                  loading={loading}
                  setLoading={setLoading}
                  loader={loader}
                  setdepartments={setdepartments}
                  departments={departments}
                  rootRoles={rootRoles}
                  role={
                    centrifugoRoleUpdateDetails.user_id == row.id
                      ? centrifugoRoleUpdateDetails.role
                      : row.role
                        ? row.role[0]
                        : "Select role"
                  }
                  changeRole={changeRole}
                  hover={hover}
                  viewType={viewType}
                />
              )
            ) : (
              row.role[0].name
            )}
          </TableCell>
          {/* <TableCell
              align="center"
              style={{
                fontSize: "14px",
                fontFamily: "URW DIN REGULAR",
                color: "#88A1AB",
                width: "5",
                pointerEvents: permissions.edit_team_members
                  ? "all"
                  : "none",
              }}
            >
              {centrifugoActiveUpdateDetails.changed &&
              centrifugoActiveUpdateDetails.updating_user_id !=
                localStorage.getObject("id") &&
              centrifugoActiveUpdateDetails.user_id == row.id &&
              centrifugoActiveUpdateDetails.type == "active_state_updation" &&
              individualLoader ? (
                <Skeleton
                  style={{ background: "#143f63", margin: "4px" }}
                  variant="rounded"
                  width={44}
                  height={25}
                />
              ) : (
                <FormControlLabel
                  control={
                    <IOSSwitch
                      sx={{ marginLeft: "9px" }}
                      defaultChecked={
                        centrifugoActiveUpdateDetails &&
                        centrifugoActiveUpdateDetails.user_id == row.id
                          ? centrifugoActiveUpdateDetails.is_active
                          : row.is_active
                      }
                      onChange={(e) => {
                        changeIsActive(row.id, e.target.checked);
                        setisActive(e.target.checked);
                      }}
                    />
                  }
                  label=""
                />
              )}
            </TableCell> */}
          {organizationUser(permissions.delete_team_members) ? (
            <TableCell
              align="center"
              style={{
                width: "10%",
                pointerEvents:
                  organizationUser(permissions.edit_team_members) &&
                    row.id != localStorage.getObject("id")
                    ? "all"
                    : "none",
              }}
            >
              <div style={{ display: "flex" }}>
                {centrifugoActiveUpdateDetails.changed &&
                  centrifugoActiveUpdateDetails.updating_user_id !=
                  localStorage.getObject("id") &&
                  centrifugoActiveUpdateDetails.user_id == row.id &&
                  centrifugoActiveUpdateDetails.type == "active_state_updation" &&
                  individualLoader ? (
                  <Skeleton
                    style={{
                      background: theme?.loading?.loadingColor,
                      margin: "4px",
                    }}
                    variant="rounded"
                    width={44}
                    height={25}
                  />
                ) : (
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        theme={theme}
                        sx={{ marginLeft: "30px" }}
                        defaultChecked={
                          centrifugoActiveUpdateDetails &&
                            centrifugoActiveUpdateDetails.user_id == row.id
                            ? centrifugoActiveUpdateDetails.is_active
                            : row.is_active
                        }
                        onChange={(e) => {
                          changeIsActive(row.id, e.target.checked);
                          setisActive(e.target.checked);
                        }}
                      />
                    }
                    label=""
                  />
                )}

                <img
                  onClick={() => {
                    deleteUsersPopup("single", row.id);
                  }}
                  style={{
                    display:
                      organizationUser(permissions.edit_team_members) &&
                        row.id != localStorage.getObject("id")
                        ? "block"
                        : "none",
                    padding: "0px 31px 0px 20px",
                    filter: hover
                      ? "brightness(0) saturate(100%) invert(13%) sepia(43%) saturate(2609%) hue-rotate(186deg) brightness(100%) contrast(103%)"
                      : "",
                  }}
                  src="/assets/admin/close-icon.svg"
                  alt=""
                  className="closeIcon"
                />
              </div>
            </TableCell>
          ) : (
            <TableCell align="center" style={{ width: "10%" }}></TableCell>
          )}
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box padding={1}></Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>

      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        open={openCopyToast}
        key={vertical + horizontal}
        bodyStyle={{ height: 40, flexGrow: 0 }}
      >
        <div
          style={{
            backgroundColor: "#008BCD",
            borderRadius: "4px",
            display: "flex",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              width: "40px",
              height: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px",
            }}
          >
            <img src="/assets/admin/copy-link.svg" alt="" />
          </div>
          <p
            style={{
              fontFamily: "URW DIN REGULAR",
              color: "white",
              fontSize: "16px",
              paddingLeft: "10px",
            }}
          >
            Link copied to clipboard
          </p>
          <img
            src="/assets/admin/close-white.svg"
            style={{ padding: "0px 16px" }}
            alt=""
            onClick={handleClose}
          />
        </div>
      </Snackbar>
      <Toast
        openToast={openUpdateToast}
        updateStatus={updateStatus}
        setOpenToast={setOpenUpdateToast}
        message={toastMessage}
      />
    </>
  );
}

export default Row;
