import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// @ts-ignore
import PopUpForm from "../components/popupForm.tsx";
import { AxiosLocal } from "../utilities/axiosUtils.ts";
import { getTeamSlugFromUrl } from "../utilities/common.js";

export const EventGate = (props) => {
  const location = useLocation();

  // state for showing the username popup
  const [showUsernamePopup, setshowUsernamePopup] = useState(false);

  // state for showing the savedSubroom
  const [savedSubroom, setsavedSubroom] = useState({});
  // state for showing the username
  const [showUsername, setshowUsername] = useState(false);
  // state for showing the password
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // get the saved subroom from api
    const currentURL = window.location.href;
    const containsText = currentURL.includes("auth");
    let team_slug = getTeamSlugFromUrl("space");
    if (containsText) {
      team_slug = getTeamSlugFromUrl("lobby");
    }
    console.log(team_slug, "team_slug");

    AxiosLocal.post("event/user/validation", {
      type: "normal",
      sub_space_slug: location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1
      ),
      team_slug: team_slug,
    }).then(function (response) {
      console.log(response.data, "response.dataurl");

      if (response.data.status === "Success") {
        // if the user is already logged in
        setsavedSubroom(response.data.currentSubRoom);
        setshowUsernamePopup(true);
      }

      if (response.data.valid || !response.data.is_private) {
        if (response.data.is_private) {
          if (response.data.is_invited) {
            // normal load
          } else {
            // redirect to space page
            navigate("/space/");
          }
        } else {
          if (response.data.is_invited) {
          } else {
            if (localStorage.getObject("auth")) {
              // if password is set then show popup to enter password
              if (response.data.add_password) {
                setshowUsernamePopup(true);
                setshowPassword(true);
              } else {
                // normal load
              }
            } else {
              // if password is set then show popup to enter password
              if (response.data.add_password) {
                // ask for username and password
                setshowUsernamePopup(true);
                setshowPassword(true);
                setshowUsername(true);
              } else {
                // ask for username
                setshowUsernamePopup(true);
                setshowUsername(true);
              }
            }
          }
        }
      } else {
        navigate("/spaces");
      }
    });
  }, [location.pathname, navigate]);
  return (
    <PopUpForm
      open={showUsernamePopup}
      is_username={showUsername}
      is_password={showPassword}
      savedSubroom={savedSubroom}
      handleSuccess={() => {
        console.log("savedSubroomsavedSubroom", savedSubroom.is_lobby);
        // redirect to the Space page
        if (savedSubroom.is_lobby) {
          let path = location.pathname.replace("auth", "lobby");
          window.location.href = path;
          console.log(path, "savedSubroomsavedSubroom");

          // navigate(path);
        } else {
          navigate(location.pathname.replace("/auth", ""));
          window.location.reload();
        }
      }}
      handleClose={() => {
        console.log("close");
        setshowUsernamePopup(false);
      }}
      noClose={true}
    />
  );
};
