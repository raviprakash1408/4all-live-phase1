import React, { useState, useEffect } from "react";
import DropSearchAddMember from "./DropSearchAddMember";
import { Scrollbars } from "react-custom-scrollbars";
import TeamRoleSearchDrop from "./TeamRoleSearchDrop";
import TeamViewtypeDrop from "./TeamViewtypeDrop";
import EventDropInviteMember from "./EventDropInviteMember";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import Toast from "../../sections/Toast";
import { Button } from "@mui/material";

const ImportedMembers = ({ filteredData, setFilteredData, theme }) => {
  const [loader, setLoader] = useState(true);
  const [departments, setdepartments] = useState([]);
  const [rootRoles, setrootRoles] = useState([]);
  const [openUpdateToast, setOpenUpdateToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [updateStatus, setUpdateStatus] = useState("success");
  const [allRooms, setallRooms] = useState([]);
  const [allSubrooms, setallSubrooms] = useState([]);

  const [viewType, setViewType] = useState("");

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

  const changeRole = (role, componentName, userId) => {
    let filterdData = [...filteredData];
    let changedData = filterdData.filter((item) => {
      if (item.id == userId) {
        item.role = role;
      }
      return item;
    });
    setFilteredData([...changedData]);
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

  const spaceChange = (checkedList, userId, componentName) => {
    console.log(checkedList, userId, componentName, "spaceChangeExcelTable");
    let selectedSpaceList = [...filteredData];
    let changedData = selectedSpaceList.filter((item) => {
      if (item.id == userId) {
        item.spaces = [...checkedList];
      }
      return item;
    });
    setFilteredData([...changedData]);
  };

  // const removeUser = (userId) =>{
  //     console.log(userId,"removeUser");
  //     AxiosLocal.delete(`user/excel/import/`,{
  //         data: {"user_id":userId}
  //       }).then(response=>{
  //         if(response.data.status == "Success"){
  //             setOpenUpdateToast(true);
  //             setToastMessage("User removed successfully.")
  //             setUpdateStatus("success")

  //             setFilteredData([...response.data.data])
  //         }
  //     })
  // };

  const removeAddUser = (userId) => {
    console.log(userId, "removeUser");
    let selectedSpaceList = [...filteredData];
    let changedData = selectedSpaceList.filter((item) => {
      if (item.id == userId) {
        item.is_removed = !item.is_removed;
      }
      return item;
    });
    setFilteredData([...changedData]);
  };

  return (
    <>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          padding: "0px",
          margin: "0px",
        }}
      >
        <li
          style={{
            width: "37%",
            paddingTop: "15px",
            color: "#88A1AB",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            textAlign: "left",
            paddingLeft: "20px",
            fontWeight: 400,
            paddingBottom: "10px",
          }}
        >
          Users
        </li>
        <li
          style={{
            width: "22%",
            paddingTop: "15px",
            color: "#88A1AB",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            textAlign: "left",
            fontWeight: 400,
            paddingBottom: "10px",
          }}
        >
          Role
        </li>
        <li
          style={{
            width: "16%",
            paddingTop: "15px",
            color: "#88A1AB",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            textAlign: "left",
            fontWeight: 400,
            paddingBottom: "10px",
          }}
        >
          View type
        </li>
        <li
          style={{
            width: "32%",
            paddingTop: "15px",
            color: "#88A1AB",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            textAlign: "left",
            fontWeight: 400,
            paddingBottom: "10px",
          }}
        >
          Spaces
        </li>
        <li
          style={{
            width: "3%",
            paddingTop: "15px",
            color: "#88A1AB",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            textAlign: "left",
            fontWeight: 400,
            paddingBottom: "10px",
          }}
        ></li>
      </ul>
      <Scrollbars style={{ width: "100%", height: "190px" }}>
        <div class="tableFixHead">
          <table
            style={{
              borderCollapse: "seperate",
              borderSpacing: "0 1em",
              width: "100%",
              marginTop: "-31px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    width: "35%",
                    paddingTop: "15px",
                    color: "#88A1AB",
                    fontSize: "14px",
                    fontFamily: "URW DIN REGULAR",
                    textAlign: "left",
                    paddingLeft: "20px",
                    fontWeight: 400,
                  }}
                ></th>
                <th
                  style={{
                    width: "15%",
                    paddingTop: "15px",
                    color: "#88A1AB",
                    fontSize: "14px",
                    fontFamily: "URW DIN REGULAR",
                    textAlign: "left",
                    fontWeight: 400,
                  }}
                ></th>
                <th
                  style={{
                    width: "15%",
                    paddingTop: "15px",
                    color: "#88A1AB",
                    fontSize: "14px",
                    fontFamily: "URW DIN REGULAR",
                    textAlign: "left",
                    fontWeight: 400,
                  }}
                ></th>
                <th
                  style={{
                    width: "30%",
                    paddingTop: "15px",
                    color: "#88A1AB",
                    fontSize: "14px",
                    fontFamily: "URW DIN REGULAR",
                    textAlign: "left",
                    fontWeight: 400,
                  }}
                ></th>
                <th
                  style={{
                    width: "3%",
                    paddingTop: "15px",
                    color: "#88A1AB",
                    fontSize: "14px",
                    fontFamily: "URW DIN REGULAR",
                    textAlign: "left",
                    fontWeight: 400,
                  }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <>
                  <tr key={item.id}>
                    <td
                      className={item.is_removed && "blur"}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#E1E7EA",
                        fontFamily: "URW DIN REGULAR",
                        fontWeight: 400,
                        paddingTop: "0px",
                      }}
                    >
                      {item.avatar ? (
                        <img
                          src={
                            item.avatar
                              ? item.avatar
                              : "https://pub-d6edaebcd6474ac499bdcb399e4e121c.r2.dev/4c6e4bf2-28be-446c-807e-d66ecddae784.jpg"
                          }
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            margin: "0px 15px 0px 20px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            height: "40px",
                            width: "40px",
                            position: "relative",
                            textAlign: "center",
                            margin: "0px 15px 0px 20px",
                            verticalAlign: "middle",
                            lineHeight: "40px",
                            borderRadius: "50%",
                            backgroundColor: theme?.addmember?.inboxcolor,
                            color: "#88A1AB",
                            fontSize: "18px",
                            fontFamily: "URW DIN REGULAR",
                            textTransform: "uppercase",
                          }}
                        >
                          <span>{item.email[0]}</span>
                        </div>
                      )}
                      {item.email}
                    </td>
                    <td
                      className={item.is_removed && "blur"}
                      style={{ paddingRight: "30px" }}
                    >
                      <TeamRoleSearchDrop
                        setLoader={setLoader}
                        loader={loader}
                        setdepartments={setdepartments}
                        rootRoles={rootRoles}
                        departments={departments}
                        role={item.role}
                        setOpenUpdateToast={setOpenUpdateToast}
                        setToastMessage={setToastMessage}
                        setUpdateStatus={setUpdateStatus}
                        changeRole={changeRole}
                        userId={item.id}
                        componentFor="excelTable"
                      />
                    </td>
                    <td className={item.is_removed && "blur"}>
                      <TeamViewtypeDrop
                        viewType={item.viewer_type ? item.viewer_type : "P"}
                        setViewType={setViewType}
                        changeViewType={changeViewType}
                        userId={item.id}
                        componentFor="excelTable"
                      />
                    </td>
                    <td className={item.is_removed && "blur"}>
                      <EventDropInviteMember
                        events={item.spaces}
                        allSubrooms={allSubrooms}
                        allRooms={allRooms}
                        spaceChange={spaceChange}
                        userId={item.id}
                        componentFor="excelTable"
                      />
                    </td>
                    <td>
                      {item.is_removed ? (
                        <img
                          src="/assets/admin/plus-icon.svg"
                          className="invite-icon-add"
                          style={{ paddingRight: "18px" }}
                          onClick={() => {
                            removeAddUser(item.id);
                          }}
                        />
                      ) : (
                        <img
                          src="/assets/admin/invite.svg"
                          className="invite-icon"
                          style={{ paddingRight: "18px" }}
                          onClick={() => {
                            removeAddUser(item.id);
                          }}
                        />
                      )}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </Scrollbars>
      <Toast
        openToast={openUpdateToast}
        updateStatus={updateStatus}
        setOpenToast={setOpenUpdateToast}
        message={toastMessage}
      />
    </>
  );
};

export default ImportedMembers;
