import React, { useEffect, useState } from "react";
import { changeOpacity } from "../../../../utilities/common";
import { Button, InputLabel, TextField } from "@mui/material";
import MediaFileManager from "../../MediaFileManager";
//@ts-ignore
import { createTeam, editTeam } from "../../../../state/team/teamSlice.ts";
import { useDispatch } from "react-redux";
import { AxiosLocal } from "../../../../utilities/axiosUtils.ts";
import Toast from "../../../../sections/Toast";
const AddTeam = ({ theme, handleClose, team, type }) => {
  const dispatch = useDispatch();

  const [addFilePopupImage, setAddFilePopupImage] = useState(false);
  const [image, setImage] = useState(team?.company_logo);
  const [teamName, setteamName] = useState(team?.company_name);

  const [overlay, setOverlay] = useState(false);
  const [openToast, setopenToast] = useState(false);
  const [message, setmessage] = useState("");

  const [error, setError] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setteamName(value);
    validateInput(value);
  };

  const validateInput = (value) => {
    if (value.trim() === "") {
      setError("Team name is required");
    } else {
      setError("");
    }
  };

  //add api fun
  const addTeanFun = () => {
    console.log(error, teamName, "teamName");

    if (teamName == "" || teamName == undefined) {
      setError("Team name is required");
      console.log("error 1");
    } else {
      console.log("error 2");

      setButtonClicked(true);
      AxiosLocal.post(`team/`, {
        name: teamName,
        logo: image,
      }).then((response) => {
        if (response.data.status == "Success") {
          setopenToast(true);
          setmessage("Team created successfully");
          console.log(response.data, "response.data.data response.data.data");
          setTimeout(() => {
            let data = response.data.data;
            let obj = {
              users_count: 1,
              is_organization_user: true,
              first_name: localStorage.getObject("username"),
              last_name: localStorage.getObject("last_name"),
              email: localStorage.getObject("organization_user_email"),
            };
            dispatch(
              createTeam({
                ...obj,
                ...data,
              })
            );
            handleClose();
          }, 500);
        }
      });
    }

    // console.log(error, `aa${teamName}aa`, "ttttt");
  };

  //edit api fun

  const editTeamFun = () => {
    if (error == "" && (teamName == "" || teamName == undefined)) {
      setError("Team name is required");
    } else {
      //  setButtonClicked(true);

      AxiosLocal.post(`team/${team.slug}/`, {
        name: teamName,
        logo: image,
      }).then((response) => {
        if (response.data.status == "Success") {
          setopenToast(true);
          setmessage("Team edited successfully");
          setTimeout(() => {
            dispatch(
              editTeam({
                company_logo: image,
                company_name: teamName,
                slug: team.slug,
              })
            );
            if (team?.default_organisation) {
              localStorage.setObject("organization_logo", image);
              localStorage.setObject("organization", teamName);
            }
            handleClose();
          }, 500);
        } else {
          setButtonClicked(false);
        }
      });
    }
  };

  function shareHandlerImage() {
    setAddFilePopupImage(!addFilePopupImage);
  }
  return (
    <>
      <div
        style={{
          alignItems: "center",
          background: changeOpacity(theme?.editspace?.outerbgcolor, 0.9),
          bottom: "0px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          left: "0px",
          position: "fixed",
          right: "0px",
          top: "0px",
          zIndex: "22",
        }}
        className="add-team-popup"
      >
        <div
          style={{
            position: "relative",
            background: theme?.bg_color_1,
            borderRadius: "4px",
            width: "515px",
            minHeight: "405px",
            paddingBottom: "1px",
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
            onClick={() => {
              handleClose();
            }}
          >
            <img alt="" src="/assets/icons/x.svg" />
          </div>

          <p
            style={{
              color: theme?.spaces?.secondaryColor,
              fontWeight: "700",
              textAlign: "center",
              padding: "33px 0px 26px",
              fontSize: "16px",
              fontFamily: "URW DIN",
              margin: "0px",
            }}
          >
            {type == "edit" ? "Edit Team" : "Create new team"}
          </p>

          {image == "" || image == undefined ? (
            <div
              style={{
                width: "111px",
                height: "111px",
                borderRadius: "50%",
                margin: "auto",
                border: overlay
                  ? "2px dashed transparent"
                  : `2px dashed ${theme?.editspace?.dashedcolor}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
              onClick={shareHandlerImage}
              onMouseEnter={() => setOverlay(true)}
              onMouseLeave={() => setOverlay(false)}
            >
              <img
                alt=""
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(23%) sepia(21%) saturate(1219%) hue-rotate(143deg) brightness(95%) contrast(86%)",
                }}
                src="/assets/icons/plus.svg"
              />

              <div
                className="overlay"
                style={{
                  backgroundColor: changeOpacity(theme?.common?.color1, 0.8),
                  opacity: overlay ? 1 : 0,
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 3,
                }}
              >
                <img
                  alt=""
                  src="/assets/admin/img-upload.svg"
                  style={{
                    top: "50%",
                    position: "absolute",
                    width: "29px",
                    height: "26px",
                    left: "50%",
                    transform: "translateX(-50%) translateY(-50%)",
                    filter: overlay ? "brightness(0) invert(1)" : "",

                    zIndex: 1,
                  }}
                />
              </div>
            </div>
          ) : (
            <div
              style={{ position: "relative" }}
              onClick={shareHandlerImage}
              onMouseEnter={() => setOverlay(true)}
              onMouseLeave={() => setOverlay(false)}
            >
              <img
                alt=""
                src={image}
                style={{
                  width: "111px",
                  height: "111px",
                  borderRadius: "50%",
                  margin: "auto",
                  display: "flex",
                  objectFit: "cover",
                }}
              />
              <img
                alt=""
                src="/assets/admin/img-upload.svg"
                style={{
                  top: "50%",
                  position: "absolute",
                  width: "29px",
                  height: "26px",
                  left: "50%",
                  transform: "translateX(-50%) translateY(-50%)",
                  filter: overlay ? "brightness(0) invert(1)" : "",
                  opacity: overlay ? 1 : 0,

                  zIndex: 1,
                }}
              />
              <div
                className="overlay"
                style={{
                  backgroundColor: "rgba(0, 139, 205, 0.9)",
                  opacity: overlay ? 1 : 0,
                  // width: "100%",
                  // height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "111px",
                  height: "111px",
                  borderRadius: "50%",
                }}
              ></div>
            </div>
          )}

          <div
            style={{
              margin: error ? "17px auto 38px" : "17px auto 56px",
              width: "205px",
            }}
          >
            <InputLabel
              htmlFor="Country"
              style={{
                color: "#88A1AB",
                fontSize: "14px",
                fontWeight: "400",
                fontFamily: "URW DIN REGULAR",
              }}
            >
              Team name
            </InputLabel>
            <TextField
              label=""
              variant="outlined"
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: "14px",
                  height: "40px",
                  marginTop: "-5px",
                  // paddingLeft: "12px",
                  width: "205px",
                },
                "& .MuiOutlinedInput-root": {
                  fontSize: "14px",
                  height: "40px",
                  marginTop: "1px",
                  width: "205px",
                },

                "& .MuiOutlinedInput-input": {
                  fontFamily: "URW DIN REGULAR",
                  fontSize: "14px",

                  color: theme?.profile?.primaryColor,
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: error ? "1px solid" : "2px solid",
                  borderColor: error ? "#ae0000" : theme?.login?.secondaryColor,

                  borderRadius: "4px",
                  color: theme?.profile?.primaryColor,
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    border: error ? "1px solid" : "2px solid",
                    borderColor: error
                      ? "#ae0000"
                      : theme?.login?.secondaryColor,

                    borderRadius: "4px",
                  },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: error ? "1px solid" : "2px solid",

                    borderColor: error
                      ? "#ae0000"
                      : theme?.login?.secondaryColor,

                    borderRadius: "4px",
                  },
              }}
              InputLabelProps={{
                style: { color: "#5D7C90" },
              }}
              type="text"
              name="text"
              placeholder="Enter team name"
              value={teamName}
              onChange={handleInputChange}
            />

            {error && (
              <div
                style={{
                  color: "#ae0000",
                  fontSize: "14px",
                  fontWeight: "400",
                  fontFamily: "URW DIN REGULAR",
                }}
              >
                {error}
              </div>
            )}
          </div>
          <Button
            variant="contained"
            disabled={buttonClicked}
            style={{
              textTransform: "none",
              minWidth: "145px",
              padding: "9px 19px 11px 11px",

              lineHeight: "22px",
              backgroundColor: theme?.common?.color1,
              color: "white",
              fontFamily: "URW DIN REGULAR",
              boxShadow: "none",
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
            }}
            onClick={() => {
              if (type == "add") {
                addTeanFun();
              } else if (type == "edit") {
                editTeamFun();
              }
            }}
          >
            <img alt="add-team" src="/assets/admin/plus.svg" />
            <span style={{ marginLeft: "13px", fontSize: "14px" }}>
              {type == "add" ? "Add team" : "Save"}
            </span>
          </Button>
        </div>
      </div>

      {addFilePopupImage && (
        <MediaFileManager
          fileManagerType="image"
          closeShareHandlerImage={shareHandlerImage}
          setFile={setImage}
          componentFor="addTeamLogo"
        />
      )}
      <Toast
        openToast={openToast}
        setOpenToast={setopenToast}
        message={message}
      />
    </>
  );
};

export default AddTeam;
