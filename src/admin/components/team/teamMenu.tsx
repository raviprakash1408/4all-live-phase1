import React, { useState } from "react";
import { Divider } from "@mui/material";
import { AxiosLocal } from "../../../utilities/axiosUtils.ts";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeam, getIsMyTeam } from "../../../state/team/teamSlice.ts";
import Toast from "../../../sections/Toast";
import CustomTooltip from "../../CustomTooltip";
import AddTeam from "./add_team/Index.tsx";
import ConfirmPop from "../ConfirmPop";
const TeamMenu = ({ theme, team }) => {
  const [hover, setHover] = useState<boolean>(false);
  const [hoverClose, sethoverClose] = useState<boolean>(false);
  const [hoveredit, sethoveredit] = useState<boolean>(false);
  const [openToast, setopenToast] = useState<boolean>(false);
  const [openeditTeam, setopeneditTeam] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [message, setmessage] = useState<string>("");

  const teams = useSelector((state) => state.Team.teams);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setConfirm(true);
  };

  const handleClickClose = () => {
    setConfirm(false);
  };

  const getDefaultTeamFun = () => {
    let teamlist = [...teams];
    //find a team inside teamlist and that team's is_my_team is true
    let index = teamlist.findIndex((team) => team.is_my_team === true);
    let defaultTeam = teamlist[index];
    console.log(console.log(defaultTeam, "defaultTeamdefaultTeam"));
    localStorage.setObject("organization", defaultTeam.company_name);
    localStorage.setObject("organization_logo", "null");
    localStorage.setObject("team_slug", defaultTeam.slug);
    localStorage.setObject("organizationId", defaultTeam.id);
    localStorage.setObject("organization_user_email", defaultTeam.email);
    localStorage.setObject(
      "is_organization_user",
      defaultTeam.is_organization_user
    );
  };

  //function for delete team
  const deleteTeamFun = () => {
    AxiosLocal.delete("team/", {
      data: { team_slug: team?.slug },
    }).then((response) => {
      if (response.data.status === "Success") {
        setopenToast(true);
        if (team?.is_organization_user) {
          setmessage(response.data.message);
        } else {
          setmessage("You are unassigned from this team");
        }
        if (team?.default_organisation) {
          console.log(team, "team?.default_organisation 2");
          setTimeout(() => {
            window.location.reload();
          }, 500);
          getDefaultTeamFun();
        } else {
          setTimeout(() => {
            dispatch(deleteTeam(team));
          }, 500);
        }
      }
    });
  };

  const switchTeamFun = () => {
    if (!team?.default_organisation) {
      AxiosLocal.post(`team/switch/${team.slug}/`, {}).then((response) => {
        console.log(response, "responseresponseresponse");

        if (response.data.status == "Success") {
          //  setopenToast(true);
          //  setmessage("Team switched successfully");
          localStorage.setObject("organization", team.company_name);
          localStorage.setObject("organization_logo", team.company_logo);
          localStorage.setObject("organization_slug", team.slug);
          localStorage.setObject(
            "is_organization_user",
            team.is_organization_user
          );

          // localStorage.setObject(
          //   "organizationId",
          //   team.id
          // );
          // localStorage.setObject(
          //   "organization_user_email",
          //   team.email
          // );
          //  setTimeout(() => {
          console.log("Team switched successfully");
          window.location.reload();
          //  }, 300);
        }
      });
    }
  };

  const handleAddTeamClose = () => {
    setopeneditTeam(false);
  };
  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ position: "relative", display: team?.company_name==="EVENTS.FOX" ?  "display" : "none"  }}
      >
        {/* <CustomTooltip
          text={`Switch to ${team?.company_name}`}
          placement="top"
          bgColor={theme?.table?.rowColor}
        > */}
          <li
            style={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
              borderRadius: "4px",
              padding: "12px 0px 12px 6px",
              backgroundColor: hover
                ? theme?.table?.rowColor
                : team?.default_organisation
                ? theme?.common?.color1
                : "",
              cursor: "pointer",
              transition: "background-color ease-in 0.1s",
            }}
            onClick={switchTeamFun}
          >
            {/* <img
            src="/assets/admin/edit.svg"
            style={{
              padding: "0px 20px 0px 20px",
              filter:
                "brightness(0) saturate(100%) invert(12%) sepia(36%) saturate(4327%) hue-rotate(190deg) brightness(93%) contrast(101%)",
              position: "absolute",
              right: "-45px",
              width: "14px",
              marginTop: "5px",
            }}
            alt=""
            className="editIcon"
            onClick={() => {
              setToggle(false);
            }}
          /> */}

            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "8px",
                backgroundColor: team?.default_organisation
                  ? "white"
                  : team?.is_active
                  ? theme?.common?.color1
                  : "#FF1759",
              }}
            ></div>
            <div style={{ position: "relative" }}>
              {team?.company_logo == "" ? (
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    // border: `2px solid ${theme?.table?.rowColor}`,
                    border: `2px solid transparent`,

                    backgroundColor: theme?.spaces?.sidebaricon,
                    margin: "0px 13px 0px 6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    style={{
                      // paddingTop: "10px",
                      textAlign: "center",
                      // display: "block",
                      color: "#70A6A6",
                      fontSize: "20px",
                    }}
                  >
                    {team?.company_name == null ? "d" : team?.company_name[0]}
                  </span>
                </div>
              ) : (
                <img
                  alt=""
                  style={{
                    width: "50px",
                    height: "50px",
                    border: `2px solid ${theme?.spaces?.sidebaricon}`,
                    objectFit: "cover",
                    margin: "0px 13px 0px 6px",
                  }}
                  src={team?.company_logo}
                />
              )}

              <div
                style={{
                  position: "absolute",
                  bottom: team?.company_logo == "" ? "-6px" : "0px",
                  right: "8px",
                  height: "25px",
                  width: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  fontSize: "12px",
                  fontFamily: "URW DIN",
                  color: theme?.common?.color1,
                }}
              >
                {team?.users_count}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "16px",
                  fontFamily: "URW DIN",
                  color: team?.default_organisation ? "white" : "#70A6A6",
                }}
              >
                {team?.company_name}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                  color: team?.default_organisation
                    ? "white"
                    : team?.is_organization_user
                    ? theme?.common?.color1
                    : "#70A6A6",
                  marginBottom: "10px",
                }}
              >
                {team?.is_organization_user
                  ? `${team?.first_name} ${team?.last_name}`
                  : `Invited by ${team?.first_name} ${team?.last_name}`}
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    height: "25px",
                    width: "70px",
                    borderRadius: "52px",
                    backgroundColor: team?.default_organisation
                      ? "white"
                      : theme?.common?.color1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontFamily: "URW DIN REGULAR",
                    color: team?.default_organisation
                      ? theme?.common?.color1
                      : "white",
                  }}
                >
                  {team?.is_organization_user ? "Owner" : "Member"}
                </div>
                {team?.is_my_team && (
                  <div
                    style={{
                      height: "25px",
                      width: "70px",
                      borderRadius: "52px",
                      backgroundColor: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontFamily: "URW DIN REGULAR",
                      color: theme?.common?.color1,

                      marginLeft: "10px",
                    }}
                  >
                    Default
                  </div>
                )}
              </div>
            </div>
          </li>
        {/* </CustomTooltip> */}
        {/* {hover && !team?.is_my_team && (
          <CustomTooltip
            text={team?.is_organization_user ? "Delete" : "Leave"}
            bgColor={theme?.table?.rowColor}
            placement="top"
          >
            <div
              style={{
                position: "absolute",
                display: "flex",
                width: "20px",
                height: "20px",
                top: "-10px",
                right: "-10px",
                backgroundColor: hoverClose ? "#FF1759" : "#70A6A6",
                borderRadius: "25px",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleClickOpen();
              }}
              onMouseEnter={() => sethoverClose(true)}
              onMouseLeave={() => sethoverClose(false)}
            >
              <img
                alt=""
                style={{
                  filter: hoverClose ? "brightness(0) invert(1)" : "",
                }}
                src="/assets/icons/x.svg"
              />
            </div>
          </CustomTooltip>
        )} */}

        {/* {hover && team?.is_organization_user && (
          <CustomTooltip
            text="Edit"
            bgColor={theme?.table?.rowColor}
            placement="top"
          >
            <div
              style={{
                position: "absolute",
                display: "flex",
                width: "20px",
                height: "20px",
                top: "-10px",
                right: team?.is_my_team ? "-10px" : "18px",
                backgroundColor: hoveredit ? "white" : "#70A6A6",
                borderRadius: "25px",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                setopeneditTeam(true);
              }}
              onMouseEnter={() => sethoveredit(true)}
              onMouseLeave={() => sethoveredit(false)}
            >
              <img
                alt=""
                style={{
                  // filter: hoveredit ? "brightness(0) invert(1)" : "",
                  height: "12px",
                }}
                src="/assets/admin/edit.svg"
              />
            </div>
          </CustomTooltip>
        )} */}
        {/* <Divider
          variant="fullWidth"
          style={{
            borderColor: theme?.editspace?.outerbgcolor,
            borderWidth: "1px",
            opacity: hover ? 0 : 1,
          }}
        /> */}
      </div>
      <Toast
        openToast={openToast}
        setOpenToast={setopenToast}
        message={message}
        type="error"
      />
      <ConfirmPop
        message={
          team?.is_organization_user
            ? "Are you sure you want to delete the team ? "
            : "Are you sure you want to leave the team ? "
        }
        confirm={confirm}
        handleClickOpen={handleClickOpen}
        handleClickClose={handleClickClose}
        handleDelete={deleteTeamFun}
      />
      {openeditTeam && (
        <AddTeam
          theme={theme}
          handleClose={handleAddTeamClose}
          team={team}
          type="edit"
        />
      )}
    </>
  );
};

export default TeamMenu;
