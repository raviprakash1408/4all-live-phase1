import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import ImportedMembers from "./ImportedMemberList";
import BorderLinearProgress from "./LineProgress";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Toast from "../../sections/Toast";
import { changeOpacity, organizationUser } from "../../utilities/common";
import {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
const ImportMemberTeam = ({ handleImportMemberClose, getMemberList }) => {
  const theme_color = useSelector((state) => state.theme.theme);
  const theme = useSelector((state) => state.theme.themeData);
  const permissions = useSelector((state) => state.permissions);

  let [isFailedMessage, setIsFailedMessage] = useState(false);
  let [extFailure, setextFailure] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [firstSection, setFirstSection] = useState(true);
  const [isFileSelected, setFileSelected] = useState(false);
  const [isUploadCompleted, setIsUploadCompleted] = useState(false);
  const [isProgress, setIsProgress] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [progress, setProgress] = React.useState(0);
  const [openUpdateToast, setOpenUpdateToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [updateStatus, setUpdateStatus] = useState("success");

  const [buttonLoader, setbuttonLoader] = useState(false);

  const changeHandler = () => {
    // setSelectedFile(event.target.files[0]);
    setFirstSection(false);
    setIsProgress(true);
    var file_extension = selectedFile.name.split(".").pop();
    console.log(selectedFile.name.split(".").pop(), "UploadedFileExtension");

    if (file_extension == "xlsx") {
      let formData = new FormData();
      formData.append("file", selectedFile);

      var config = {
        onUploadProgress: function (progressEvent) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setTimeout(function () {
            setProgress(percentCompleted);
            console.log(
              progressEvent.loaded,
              percentCompleted,
              "percentCompleted"
            );
          }, 3000);
        },
        headers: { "content-type": "multipart/form-data" },
      };
      AxiosLocal.post("user/excel/import/", formData, config).then(
        (response) => {
          console.log(response.data, "excelUploadResponse");
          if (response.data.status == "Failed") {
            console.log("Excel upload Failed");
            setIsFailedMessage(true);
            setIsProgress(false);
            setFirstSection(true);
            setFilteredData([]);
          } else {
            setIsProgress(false);
            setFilteredData(response.data.data);
            setFirstSection(false);
            setIsUploadCompleted(true);
          }
        }
      );
    } else {
      setextFailure(true);
      setIsProgress(false);
      setFirstSection(true);
    }
  };

  const removeFile = () => {
    setFileSelected(false);
    setextFailure(false);
    setIsFailedMessage(false);
  };

  const addUsers = () => {
    setbuttonLoader(true);
    let selectedList = [...filteredData];
    let filterData = selectedList.filter((item) => {
      if (item.is_removed == false) {
        return item;
      }
    });
    console.log(filterData, "filteredDatafilteredData");
    AxiosLocal.post("convert/temp/users/", {
      users: [...filterData],
    }).then((response) => {
      if (response.data.status == "Success") {
        console.log(response.data, "excelUploadResponse");
        setOpenUpdateToast(true);
        setToastMessage("Users added successfully.");
        setUpdateStatus("success");
        handleImportMemberClose();
        getMemberList();
      } else {
        setOpenUpdateToast(true);
        setToastMessage("Users already exists.");
        setUpdateStatus("success");
        setTimeout(() => {
          handleImportMemberClose();
        }, 2000);
      }
    });
  };

  const getFilteredData = () => {
    let selectedList = [...filteredData];
    let filterData = selectedList.filter((item) => {
      if (item.is_removed == false) {
        return item;
      }
    });
    return filterData;
  };

  return (
    <div
      style={{
        alignItems: "center",
        background: changeOpacity(theme?.selectimage?.backgroundcolor1, 0.9),
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
          height: "600px",
          maxHeight: "90vh",
          backgroundColor:
            theme_color == "dark" ? theme?.addmember?.checkboxcolor4 : "white",
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
          onClick={handleImportMemberClose}
        >
          <img src="/assets/icons/x.svg" />
        </div>
        <div
          style={{
            color: theme_color == "dark" ? "#E1E7EA" : "#375C78",
            width: "full",
            fontSize: "16px",
            fontWeight: "700",
            textAlign: "center",
            padding: "33px 0px 18px",
            fontFamily: "URW DIN",
            lineHeight: "22px",
          }}
        >
          Invite members to <br />
          <span style={{ fontSize: "20px", lineHeight: "28px" }}>
            {localStorage.getItem("organization")}
          </span>
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
                width: "84px",
                height: "84px",
                backgroundColor: theme?.spaces?.sidebaricon,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textTransform: "uppercase",
                flexShrink: "0",
                borderRadius: "50%",
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
                width: "84px",
                height: "84px",
                border: "3px solid #143F63",
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
          {/* First Section Starts */}
          {firstSection ? (
            <>
              <div
                style={{
                  color: theme_color == "dark" ? "#E1E7EA" : "#375C78",
                  width: "full",
                  fontSize: "16px",
                  fontWeight: "700",
                  textAlign: "center",
                  padding: "30px 0px 5px",
                  fontFamily: "URW DIN",
                  lineHeight: "22px",
                }}
              >
                Import members from XLS file
              </div>
              <a
                style={{ textDecoration: "none" }}
                href="/assets/admin/users-invite-template.xlsx"
                download
              >
                <div
                  style={{
                    color: theme_color == "dark" ? "#008BCD" : "#375C78",
                    width: "full",
                    fontSize: "16px",
                    textAlign: "center",
                    fontFamily: "URW DIN REGULAR",
                    lineHeight: "22px",
                    fontWeight: 400,
                  }}
                >
                  Download template (.xlsx)
                </div>
              </a>
              <div
                style={{
                  border: `2px dashed ${theme?.addmember?.checkboxcolor5}`,
                  borderRadius: "4px",
                  position: "relative",
                  margin: "25px 145px 20px",
                }}
              >
                <input
                  type="number"
                  style={{
                    height: "96px",
                    zIndex: 2,
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                  }}
                />
                {isFailedMessage ? (
                  <p
                    style={{
                      top: "0%",
                      position: "absolute",
                      height: "96px",
                      margin: "25px 145px 20px",
                      textAlign: "center",
                      fontSize: "16px",
                      fontFamily: "URW DIN REGULAR",
                      lineHeight: "22px",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#ee0c4e",
                    }}
                  >
                    There are some missing fields, please check the file and
                    reupload.
                  </p>
                ) : extFailure ? (
                  <p
                    style={{
                      top: "0%",
                      position: "absolute",
                      height: "96px",
                      margin: "25px 145px 20px",
                      textAlign: "center",
                      fontSize: "16px",
                      fontFamily: "URW DIN REGULAR",
                      lineHeight: "22px",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#ee0c4e",
                    }}
                  >
                    The uploaded file format not supported, please upload an
                    excel(xlsx) file.
                  </p>
                ) : (
                  <p
                    style={{
                      top: "0%",
                      position: "absolute",
                      height: "96px",
                      margin: "20px 100px 0px",
                      textAlign: "center",
                      fontSize: "16px",
                      fontFamily: "URW DIN REGULAR",
                      lineHeight: "22px",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: theme_color == "dark" ? "#E1E7EA" : "#375C78",
                    }}
                  >
                    Please download the expample file from the above link and
                    add users in that excel sheet then upload the file.
                  </p>
                )}
                {isFileSelected ? (
                  <>
                    <Button
                      variant="contained"
                      style={{
                        textTransform: "none",
                        minWidth: "161px",
                        padding: "8px 30px 8px 20px",
                        fontSize: "14px",
                        lineHeight: "22px",
                        backgroundColor: theme?.spaces?.sidebaricon,
                        color: "#E1E7EA",
                        height: "40px",
                        fontFamily: "URW DIN REGULAR",
                        left: "50%",
                        top: "-19px",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <img alt="excel-icon" src="/assets/admin/excel.svg" />
                      <span style={{ marginLeft: "16px", marginRight: "16px" }}>
                        {selectedFile.name}
                      </span>
                      <img
                        alt=""
                        style={{ cursor: "pointer" }}
                        onClick={removeFile}
                        src="/assets/admin/minus_icon.svg"
                      />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      style={{
                        textTransform: "none",
                        minWidth: "161px",
                        padding: "8px 30px 8px 20px",
                        fontSize: "14px",
                        lineHeight: "22px",
                        backgroundColor: theme.login.mainColor,
                        color: "#E1E7EA",
                        height: "40px",
                        fontFamily: "URW DIN REGULAR",
                        left: "50%",
                        top: "-19px",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <img src="/assets/admin/excel.svg" />
                      <span style={{ marginLeft: "16px" }}>Import Excel</span>
                      <input
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={(event) => {
                          setSelectedFile(event.target.files[0]);
                          setFileSelected(true);
                        }}
                        onClick={(e) => (e.target.value = null)}
                        type="file"
                        style={{
                          height: "100%",
                          zIndex: 2,
                          position: "absolute",
                          width: "100%",
                          opacity: 0,
                          cursor: "pointer",
                        }}
                      />
                    </Button>
                  </>
                )}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  marginTop: "0px",
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    textTransform: "none",
                    padding: "8px 47px",
                    fontSize: "14px",
                    lineHeight: "22px",
                    backgroundColor: theme.login.primaryColor,
                    border: "",
                    borderColor: "",
                    borderRadius: "4px",
                    color: theme?.login?.tertiaryColor,
                  }}
                  onClick={handleImportMemberClose}
                >
                  Cancel
                </Button>
                {isFileSelected ? (
                  <Button
                    onClick={changeHandler}
                    variant="contained"
                    style={{
                      textTransform: "none",
                      padding: "8px 47px",
                      fontSize: "14px",
                      lineHeight: "22px",
                      backgroundColor: theme?.common?.color1,
                      // border: "2px solid",
                      // borderColor: theme?.common?.color1,
                      borderRadius: "4px",
                      color: theme?.login?.tertiaryColor,
                      marginLeft: "10px",
                      boxShadow: "none",
                    }}
                  >
                    Start import
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <></>
          )}

          {/* First Section Ends */}

          {/* Last Section Starts */}
          {isProgress ? (
            <>
              <div style={{ marginTop: "15%" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <Button
                    variant="contained"
                    style={{
                      textTransform: "none",
                      minWidth: "161px",
                      padding: "8px 30px 8px 20px",
                      fontSize: "14px",
                      lineHeight: "22px",
                      backgroundColor: theme?.spaces?.sidebaricon,
                      color: "#E1E7EA",
                      height: "40px",
                      fontFamily: "URW DIN REGULAR",
                      left: "50%",
                      top: "-19px",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <img alt="" src="/assets/admin/excel.svg" />
                    <span style={{ marginLeft: "16px", marginRight: "16px" }}>
                      {selectedFile.name}
                    </span>
                  </Button>
                </div>
                <div style={{ padding: "80px 38px 10px" }}>
                  <Box sx={{ width: "100%", color: theme?.common?.color1 }}>
                    <BorderLinearProgress
                      variant="determinate"
                      value={progress}
                      color="inherit"
                      sx={{
                        [`& .${linearProgressClasses.bar}`]: {
                          borderRadius: 4,
                          backgroundColor: theme?.common?.color1,
                          height: "12px",
                        },
                      }}
                    />
                  </Box>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <p
                    style={{
                      textAlign: "center",
                      fontFamily: "URW DIN REGULAR",
                      lineHeight: "22px",
                      fontWeight: "bold",
                      fontSize: "20px",
                      color: "#88A1AB",
                    }}
                  >
                    {progress}%
                  </p>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {isUploadCompleted ? (
            <>
              <div
                style={{
                  color: theme_color == "dark" ? "#E1E7EA" : "#375C78",
                  width: "full",
                  fontSize: "16px",
                  fontWeight: "700",
                  textAlign: "center",
                  padding: "30px 0px 5px",
                  fontFamily: "URW DIN",
                  lineHeight: "22px",
                  // marginTop: "80px",
                }}
              >
                Imported data
              </div>
              <div
                style={{
                  color: theme_color == "dark" ? "#88A1AB" : "#88A1AB",
                  width: "full",
                  fontSize: "16px",
                  textAlign: "center",
                  fontFamily: "URW DIN REGULAR",
                  lineHeight: "22px",
                  fontWeight: 400,
                }}
              >
                {selectedFile.name}
                <br />
                {/* {filteredData.length} members to invite */}
              </div>
              <br />
              <div
                style={{
                  textAlign: "center",
                  backgroundColor: theme?.spaces?.sidebaricon,
                  height: "235px",
                  margin: "0px 38px 10px",
                }}
              >
                <ImportedMembers
                  filteredData={filteredData}
                  setFilteredData={setFilteredData}
                  theme={theme}
                />

                {buttonLoader ? (
                  <Button
                    variant="contained"
                    style={{
                      textTransform: "none",
                      marginTop: "15px",
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
                ) : filteredData?.length > 0 ? (
                  <Button
                    onClick={addUsers}
                    variant="contained"
                    style={{
                      textTransform: "none",
                      marginTop: "15px",
                      minWidth: "161px",
                      padding: "8px 30px 8px 20px",
                      fontSize: "14px",
                      lineHeight: "22px",
                      backgroundColor: theme?.common?.color1,
                      color: "#E1E7EA",
                      height: "42px",
                      fontFamily: "URW DIN REGULAR",
                    }}
                  >
                    <img src="/assets/admin/plus.svg" />
                    <span style={{ marginLeft: "16px" }}>
                      Invite all ({getFilteredData().length})
                    </span>
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    style={{
                      textTransform: "none",
                      marginTop: "15px",
                      minWidth: "161px",
                      padding: "8px 30px 8px 20px",
                      fontSize: "14px",
                      lineHeight: "22px",
                      backgroundColor: theme?.common?.color1,
                      color: "#E1E7EA",
                      height: "42px",
                      fontFamily: "URW DIN REGULAR",
                    }}
                  >
                    <img src="/assets/admin/plus.svg" />
                    <span style={{ marginLeft: "16px" }}>Invite all</span>
                  </Button>
                )}
              </div>
            </>
          ) : (
            <></>
          )}

          {/* Last Section Ends */}
        </div>
      </div>
      <Toast
        openToast={openUpdateToast}
        updateStatus={updateStatus}
        setOpenToast={setOpenUpdateToast}
        message={toastMessage}
      />
    </div>
  );
};

export default ImportMemberTeam;
