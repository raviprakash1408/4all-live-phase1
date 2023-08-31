import React, { useState } from "react";
import CustomTooltip from "../../../CustomTooltip";
import { AxiosLocal } from "../../../../utilities/axiosUtils.ts";
import {
  defaultTeamSlug,
  deleteTeam,
  getIsMyTeam,
} from "../../../../state/team/teamSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import ConfirmPop from "../../ConfirmPop";
import Toast from "../../../../sections/Toast";
import { setPermissions } from "../../../../state/permissions/permissionSlice";

const TeamMenu = ({ theme, team }) => {
  const [hover, sethover] = React.useState<boolean>(false);
  const [hoverClose, sethoverClose] = React.useState<boolean>(false);
  const [switchTeam, setswitchTeam] = React.useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [openToast, setopenToast] = useState<boolean>(false);
  const [message, setmessage] = useState<string>("");

  const teams = useSelector((state) => state.Team.teams);

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

  const handleClickOpen = () => {
    setConfirm(true);
  };

  const handleClickClose = () => {
    setConfirm(false);
  };
  const dispatch = useDispatch();
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
          console.log(team, "team?.default_organisation 1");
          setTimeout(() => {
            window.location.reload();
          }, 500);
          getDefaultTeamFun();
        } else {
          dispatch(deleteTeam(team));
        }
      }
    });
  };
  const switchTeamFun = () => {
    if (!team?.default_organisation) {
      AxiosLocal.post(`team/switch/${team.slug}/`, {}).then((response) => {
        console.log(response, team, "responseresponseresponse");

        if (response.data.status == "Success") {
          //  setopenToast(true);
          //  setmessage("Team switched successfully");
          localStorage.setObject("organization", team.company_name);
          localStorage.setObject("organization_logo", team.company_logo);
          localStorage.setObject("organization_slug", team.slug);
          // dispatch(defaultTeamSlug(team.slug));
          localStorage.setObject(
            "is_organization_user",
            team.is_organization_user
          );
          // localStorage.setObject(
          //   "organization_user_email",
          //   team.email
          // );

          AxiosLocal.post("centrifugo/permission").then((res) => {
            dispatch(setPermissions({ ...res.data.permissions }));
          });

          setTimeout(() => {
            console.log("Team switched successfully");
            window.location.reload();
          }, 500);
        }
      });
    }
  };
  return (
    <>
      <div
        style={{
          backgroundColor:
            hover || team?.default_organisation
              ? theme?.common?.color1
              : theme?.table?.bgColor,
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          cursor: "pointer",
        }}
        onClick={switchTeamFun}
        onMouseEnter={() => sethover(true)}
        onMouseLeave={() => sethover(false)}
      >
        <div style={{ padding: "10px 17px 10px 10px" }}>
          {team?.company_logo == "" ? (
            <div
              style={{
                width: "60px",
                height: "60px",
                // border: `2px solid ${theme?.table?.rowColor}`,
                border: `2px solid transparent`,
                borderRadius: "50%",
                backgroundColor: theme?.spaces?.sidebaricon,
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  textAlign: "center",
                  // display: "block",
                  color: "#70A6A6",
                  fontSize: "20px",
                  // paddingTop: "15px",
                }}
              >
                {team?.company_name[0]}
              </span>
            </div>
          ) : (
            <img
              alt=""
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={team?.company_logo}
            />
          )}
        </div>

        <div style={{ width: "62%" }}>
          <div
            style={{
              color: hover || team?.default_organisation ? "white" : "#70A6A6",
              fontSize: "16px",
              fontFamily: "URW DIN MEDIUM",
              // paddingTop: "2px",
            }}
          >
            {team?.company_name}
          </div>
          <div
            style={{
              color: hover || team?.default_organisation ? "white" : "#70A6A6",

              fontSize: "14px",
              fontFamily: "URW DIN REGULAR",
            }}
          >
            {team?.email}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "10px",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor:
                  hover || team?.default_organisation ? "white" : "#70A6A6",
                borderRadius: "4px",
                padding: "2px 14px 3px",
                color: hover
                  ? theme?.common?.color1
                  : theme?.navbar?.primaryColor,
                fontSize: "14px",
                fontFamily: "URW DIN REGULAR",
              }}
            >
              {team?.is_organization_user ? "Owner" : "Member"}
            </div>

            {team?.is_my_team && (
              <div
                style={{
                  backgroundColor:
                    hover || team?.default_organisation ? "white" : "#70A6A6",

                  borderRadius: "4px",
                  padding: "2px 14px 3px",
                  color:
                    hover || team?.default_organisation
                      ? theme?.common?.color1
                      : theme?.navbar?.primaryColor,
                  fontSize: "14px",
                  fontFamily: "URW DIN REGULAR",
                }}
              >
                Default
              </div>
            )}
            {hover && !team?.default_organisation && (
              <CustomTooltip text="Switch Team" placement="top-end">
                <div
                  onMouseEnter={() => setswitchTeam(true)}
                  onMouseLeave={() => setswitchTeam(false)}
                >
                  <img
                    alt=""
                    style={{
                      filter: switchTeam
                        ? "brightness(0) saturate(100%) invert(16%) sepia(13%) saturate(3028%) hue-rotate(147deg) brightness(96%) contrast(84%)"
                        : "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(187deg) brightness(102%) contrast(98%)",
                    }}
                    src="/assets/icons/switch-grey.svg"
                  />
                </div>
              </CustomTooltip>
            )}
          </div>
        </div>
        {hover && !team?.is_my_team && (
          <CustomTooltip
            text={team?.is_organization_user ? "Delete" : "Leave"}
            placement="top"
          >
            <div
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
                  filter: hoverClose
                    ? "brightness(0) saturate(100%) invert(37%) sepia(87%) saturate(7390%) hue-rotate(334deg) brightness(104%) contrast(101%)"
                    : "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(187deg) brightness(102%) contrast(98%)",
                }}
                src="/assets/admin/close.svg"
              />
            </div>
          </CustomTooltip>
        )}
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
    </>
  );
};

export default TeamMenu;
