import React, { useState } from "react";
import DropSearchAddMember from "./DropSearchAddMember";
import { Scrollbars } from "react-custom-scrollbars";
import EventDropInviteMember from "./EventDropInviteMember";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import TeamRoleSearchDrop from "./TeamRoleSearchDrop";
import TeamViewtypeDrop from "./TeamViewtypeDrop";
import { UserNameEmail } from "./UserNameEmail.tsx";
import { useSelector } from "react-redux";

const SearchAddMember = ({
  filteredData,
  searchLoader,
  selected,
  inputValue,
  activeItemSet,
  allSubrooms,
  allRooms,
  setLoader,
  loader,
  departments,
  rootRoles,
  setdepartments,
  setOpenUpdateToast,
  setToastMessage,
  setUpdateStatus,
  changeRole,
  addUserLoader,
  addedId,
  viewType,
  setViewType,
  changeViewType,
  spaceChange,
  setInviteMember,
}) => {
  const [memberList, setmemberList] = useState(filteredData);
  const theme = useSelector((state) => state.theme.themeData);

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
            width: "18%",
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
            width: "36%",
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
              {searchLoader ? (
                <>
                  <tr>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#E1E7EA",
                        fontFamily: "URW DIN REGULAR",
                        fontWeight: 400,
                      }}
                    >
                      <Skeleton
                        style={{
                          margin: "0px 15px 0px 20px",
                          backgroundColor: theme?.loading?.loadingColor,
                        }}
                        variant="circular"
                        width={40}
                        height={40}
                      />
                      <Skeleton
                        style={{
                          backgroundColor: theme?.loading?.loadingColor,
                        }}
                        variant="rectangular"
                        width={150}
                        height={35}
                      />
                    </td>
                    <td>
                      <Skeleton
                        style={{
                          backgroundColor: theme?.loading?.loadingColor,
                        }}
                        variant="rectangular"
                        width={150}
                        height={35}
                      />
                    </td>
                    <td>
                      <Skeleton
                        style={{
                          backgroundColor: theme?.loading?.loadingColor,
                        }}
                        variant="rectangular"
                        width={150}
                        height={35}
                      />
                    </td>
                    <td>
                      <Skeleton
                        style={{
                          backgroundColor: theme?.loading?.loadingColor,
                        }}
                        variant="rectangular"
                        width={250}
                        height={35}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#E1E7EA",
                        fontFamily: "URW DIN REGULAR",
                        fontWeight: 400,
                      }}
                    >
                      <Skeleton
                        style={{
                          margin: "0px 15px 0px 20px",
                          backgroundColor: theme?.loading?.loadingColor,
                        }}
                        variant="circular"
                        width={40}
                        height={40}
                      />
                      <Skeleton
                        style={{
                          backgroundColor: theme?.loading?.loadingColor,
                        }}
                        variant="rectangular"
                        width={150}
                        height={35}
                      />
                    </td>
                    <td>
                      <Skeleton
                        style={{
                          backgroundColor: theme?.loading?.loadingColor,
                        }}
                        variant="rectangular"
                        width={150}
                        height={35}
                      />
                    </td>
                    <td>
                      <Skeleton
                        style={{
                          backgroundColor: theme?.loading?.loadingColor,
                        }}
                        variant="rectangular"
                        width={150}
                        height={35}
                      />
                    </td>
                    <td>
                      <Skeleton
                        style={{
                          backgroundColor: theme?.loading?.loadingColor,
                        }}
                        variant="rectangular"
                        width={250}
                        height={35}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#E1E7EA",
                        fontFamily: "URW DIN REGULAR",
                        fontWeight: 400,
                      }}
                    >
                      <Skeleton
                        style={{
                          margin: "0px 15px 0px 20px",
                          backgroundColor: theme?.loading?.loadingColor,
                        }}
                        variant="circular"
                        width={40}
                        height={40}
                      />
                      <Skeleton
                        style={{
                          backgroundColor: theme?.loading?.loadingColor,
                        }}
                        variant="rectangular"
                        width={150}
                        height={35}
                      />
                    </td>
                    <td>
                      <Skeleton
                        style={{
                          backgroundColor: theme?.loading?.loadingColor,
                        }}
                        variant="rectangular"
                        width={150}
                        height={35}
                      />
                    </td>
                    <td>
                      <Skeleton
                        style={{
                          backgroundColor: theme?.loading?.loadingColor,
                        }}
                        variant="rectangular"
                        width={150}
                        height={35}
                      />
                    </td>
                    <td>
                      <Skeleton
                        style={{
                          backgroundColor: theme?.loading?.loadingColor,
                        }}
                        variant="rectangular"
                        width={250}
                        height={35}
                      />
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  {inputValue != "" ? (
                    <>
                      {filteredData.map((item) => (
                        <>
                          {selected.some((el) => item.id == el.id) ? (
                            <></>
                          ) : (
                            <>
                              {item.same_team ? (
                                <>
                                  <tr key={item.id}>
                                    <td
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#E1E7EA",
                                        fontFamily: "URW DIN REGULAR",
                                        fontWeight: 400,
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
                                            backgroundColor:
                                              theme?.spacescolor
                                                ?.backgroundwhite,
                                            border: `2px solid ${theme?.spacescolor?.bordercolor}`,
                                            color: "#88A1AB",
                                            fontSize: "18px",
                                            fontFamily: "URW DIN REGULAR",
                                            textTransform: "uppercase",
                                          }}
                                        >
                                          <span>
                                            {item.first_name[0]}
                                            {item.last_name[0]}
                                          </span>
                                        </div>
                                      )}

                                      <UserNameEmail
                                        value={
                                          item.first_name + " " + item.last_name
                                        }
                                      />
                                    </td>
                                    {/* <tr>wdfedrferfer</tr> */}
                                    <td
                                      style={{
                                        color: "#88A1AB",
                                        fontSize: "14px",
                                        fontFamily: "URW DIN REGULAR",
                                      }}
                                    >
                                      {" "}
                                      Already in this team, please go to the
                                      users page to edit this user
                                      {/* <span onClick={()=>{setInviteMember(false)}} style={{fontSize:'15px', color: '#008bcd',cursor:'pointer'}}>Click here</span> */}
                                    </td>
                                  </tr>
                                </>
                              ) : addUserLoader && addedId.includes(item.id) ? (
                                <>
                                  <tr>
                                    <td
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#E1E7EA",
                                        fontFamily: "URW DIN REGULAR",
                                        fontWeight: 400,
                                      }}
                                    >
                                      <Skeleton
                                        style={{
                                          margin: "0px 15px 0px 20px",
                                          backgroundColor: "#0b394f",
                                        }}
                                        variant="circular"
                                        width={40}
                                        height={40}
                                      />
                                      <Skeleton
                                        style={{ backgroundColor: "#0b394f" }}
                                        variant="rectangular"
                                        width={150}
                                        height={35}
                                      />
                                    </td>
                                    <td>
                                      <Skeleton
                                        style={{ backgroundColor: "#0b394f" }}
                                        variant="rectangular"
                                        width={150}
                                        height={35}
                                      />
                                    </td>
                                    <td>
                                      <Skeleton
                                        style={{ backgroundColor: "#0b394f" }}
                                        variant="rectangular"
                                        width={150}
                                        height={35}
                                      />
                                    </td>
                                    <td>
                                      <Skeleton
                                        style={{ backgroundColor: "#0b394f" }}
                                        variant="rectangular"
                                        width={250}
                                        height={35}
                                      />
                                    </td>
                                  </tr>
                                </>
                              ) : (
                                <>
                                  <tr key={item.id}>
                                    <td
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#E1E7EA",
                                        fontFamily: "URW DIN REGULAR",
                                        fontWeight: 400,
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
                                            backgroundColor:
                                              theme?.spacescolor
                                                ?.backgroundwhite,
                                            border: `2px solid ${theme?.spacescolor?.bordercolor}`,
                                            color: "#88A1AB",
                                            fontSize: "18px",
                                            fontFamily: "URW DIN REGULAR",
                                            textTransform: "uppercase",
                                          }}
                                        >
                                          <span>
                                            {item.first_name[0]}
                                            {item.last_name[0]}
                                          </span>
                                        </div>
                                      )}
                                      <UserNameEmail
                                        value={
                                          item.first_name + " " + item.last_name
                                        }
                                      />
                                    </td>
                                    <td style={{ paddingRight: "30px" }}>
                                      <TeamRoleSearchDrop
                                        setLoader={setLoader}
                                        loader={loader}
                                        setdepartments={setdepartments}
                                        departments={departments}
                                        rootRoles={rootRoles}
                                        role={item.role}
                                        setOpenUpdateToast={setOpenUpdateToast}
                                        setToastMessage={setToastMessage}
                                        setUpdateStatus={setUpdateStatus}
                                        changeRole={changeRole}
                                        userId={item.id}
                                        componentFor="inviteUser"
                                      />
                                    </td>
                                    <td>
                                      <TeamViewtypeDrop
                                        viewType={
                                          item.viewer_type
                                            ? item.viewer_type
                                            : "P"
                                        }
                                        setViewType={setViewType}
                                        changeViewType={changeViewType}
                                        userId={item.id}
                                        componentFor="inviteUser"
                                      />
                                    </td>
                                    <td>
                                      <EventDropInviteMember
                                        events={item.spaces}
                                        allSubrooms={allSubrooms}
                                        allRooms={allRooms}
                                        spaceChange={spaceChange}
                                        userId={item.id}
                                        componentFor="inviteUser"
                                      />
                                    </td>
                                    <td>
                                      {selected.some(
                                        (el) => item.id == el.id
                                      ) ? (
                                        <img
                                          src="/assets/admin/invite.svg"
                                          className="invite-icon"
                                          style={{ paddingRight: "18px" }}
                                          onClick={() => {
                                            activeItemSet(item, "remove");
                                          }}
                                        />
                                      ) : (
                                        <img
                                          src="/assets/admin/plus-icon.svg"
                                          className="invite-icon-add"
                                          style={{
                                            paddingRight: "18px",
                                          }}
                                          onClick={() => {
                                            activeItemSet(item, "add");
                                          }}
                                        />
                                      )}
                                    </td>
                                  </tr>
                                </>
                              )}
                            </>
                          )}
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      {filteredData.map((item) => (
                        <>
                          {item.same_team ? (
                            <>
                              <tr key={item.id}>
                                <td
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#E1E7EA",
                                    fontFamily: "URW DIN REGULAR",
                                    fontWeight: 400,
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
                                        backgroundColor:
                                          theme?.spacescolor?.backgroundwhite,
                                        border: `2px solid ${theme?.spacescolor?.bordercolor}`,
                                        color: "#88A1AB",
                                        fontSize: "18px",
                                        fontFamily: "URW DIN REGULAR",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      <span>
                                        {item.first_name[0]}
                                        {item.last_name[0]}
                                      </span>
                                    </div>
                                  )}
                                  <UserNameEmail
                                    value={
                                      item.first_name + " " + item.last_name
                                    }
                                  />
                                </td>
                                <td
                                  style={{
                                    width: "100%",
                                    color: "#88A1AB",
                                    fontSize: "14px",
                                    fontFamily: "URW DIN REGULAR",
                                  }}
                                >
                                  {" "}
                                  Already in this team, please go to the users
                                  page to edit this user{" "}
                                  <Link
                                    to="/spaces"
                                    style={{
                                      textDecoration: "none",
                                      color: "#00cdb8",
                                    }}
                                  >
                                    <span style={{ fontSize: "15px" }}>
                                      Click here
                                    </span>
                                  </Link>
                                </td>
                              </tr>
                            </>
                          ) : addUserLoader && addedId.includes(item.id) ? (
                            <>
                              <tr>
                                <td
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#E1E7EA",
                                    fontFamily: "URW DIN REGULAR",
                                    fontWeight: 400,
                                  }}
                                >
                                  <Skeleton
                                    style={{
                                      margin: "0px 15px 0px 20px",
                                      backgroundColor: "#0b394f",
                                    }}
                                    variant="circular"
                                    width={40}
                                    height={40}
                                  />
                                  <Skeleton
                                    style={{ backgroundColor: "#0b394f" }}
                                    variant="rectangular"
                                    width={150}
                                    height={35}
                                  />
                                </td>
                                <td>
                                  <Skeleton
                                    style={{ backgroundColor: "#0b394f" }}
                                    variant="rectangular"
                                    width={150}
                                    height={35}
                                  />
                                </td>
                                <td>
                                  <Skeleton
                                    style={{ backgroundColor: "#0b394f" }}
                                    variant="rectangular"
                                    width={150}
                                    height={35}
                                  />
                                </td>
                                <td>
                                  <Skeleton
                                    style={{ backgroundColor: "#0b394f" }}
                                    variant="rectangular"
                                    width={250}
                                    height={35}
                                  />
                                </td>
                              </tr>
                            </>
                          ) : (
                            <>
                              <tr key={item.id}>
                                <td
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#E1E7EA",
                                    fontFamily: "URW DIN REGULAR",
                                    fontWeight: 400,
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
                                        backgroundColor:
                                          theme?.spacescolor?.backgroundwhite,
                                        border: `2px solid ${theme?.spacescolor?.bordercolor}`,
                                        color: "#88A1AB",
                                        fontSize: "18px",
                                        fontFamily: "URW DIN REGULAR",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      <span>
                                        {!item.first_name || !item.last_name
                                          ? item.email[0]
                                          : item.first_name[0] +
                                            item.last_name[0]}
                                      </span>
                                    </div>
                                  )}
                                  {item.first_name && item.first_name + " "}
                                  {item.last_name && item.last_name}
                                  {!item.first_name && !item.last_name && (
                                    <UserNameEmail value={item.email} />
                                  )}
                                </td>
                                <td style={{ paddingRight: "30px" }}>
                                  <TeamRoleSearchDrop
                                    setLoader={setLoader}
                                    loader={loader}
                                    setdepartments={setdepartments}
                                    departments={departments}
                                    rootRoles={rootRoles}
                                    role={item.role}
                                    setOpenUpdateToast={setOpenUpdateToast}
                                    setToastMessage={setToastMessage}
                                    setUpdateStatus={setUpdateStatus}
                                    changeRole={changeRole}
                                    userId={item.id}
                                    componentFor="inviteUser"
                                  />
                                </td>
                                <td>
                                  <TeamViewtypeDrop
                                    viewType={
                                      item.viewer_type ? item.viewer_type : "P"
                                    }
                                    setViewType={setViewType}
                                    changeViewType={changeViewType}
                                    userId={item.id}
                                    componentFor="inviteUser"
                                  />
                                </td>
                                <td>
                                  <EventDropInviteMember
                                    events={item.spaces}
                                    allSubrooms={allSubrooms}
                                    allRooms={allRooms}
                                    spaceChange={spaceChange}
                                    userId={item.id}
                                    componentFor="inviteUser"
                                  />
                                </td>
                                <td>
                                  {selected.some((el) => item.id == el.id) ? (
                                    <img
                                      src="/assets/admin/invite.svg"
                                      className="invite-icon"
                                      style={{ paddingRight: "18px" }}
                                      onClick={() => {
                                        activeItemSet(item, "remove");
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src="/assets/admin/plus-icon.svg"
                                      className="invite-icon"
                                      style={{ paddingRight: "18px" }}
                                      onClick={() => {
                                        activeItemSet(item, "add");
                                      }}
                                    />
                                  )}
                                </td>
                              </tr>
                            </>
                          )}
                        </>
                      ))}
                    </>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </Scrollbars>
    </>
  );
};

export default SearchAddMember;
