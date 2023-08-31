import { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import Skeleton from "@mui/material/Skeleton";
import TeamRoleSearchDrop from "./TeamRoleSearchDrop";
import TeamViewtypeDrop from "./TeamViewtypeDrop";
import EventDropInviteMember from "./EventDropInviteMember";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { UserNameEmail } from "./UserNameEmail.tsx";
import { useSelector } from "react-redux";

const SearchNewMember = ({
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
  viewType,
  changeViewType,
  spaceChange,
  addNewMember,
  addUserLoader,
  addedId,
  newUser,
}) => {
  const [newUserViewType, setnewUserViewType] = useState(newUser.viewer_type);

  const [spacesSlected, setspacesSlected] = useState([]);

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
              {addUserLoader && addedId.includes(0) ? (
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
                <tr style={{ borderSpacing: "0px !important" }}>
                  <td
                    style={{
                      borderSpacing: "0px !important",
                      display: "flex",
                      alignItems: "center",
                      color: "#E1E7EA",
                      fontFamily: "URW DIN REGULAR",
                      fontWeight: 400,
                    }}
                  >
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
                        backgroundColor: theme?.spacescolor?.backgroundwhite,
                        border: `2px solid ${theme?.spacescolor?.bordercolor}`,
                        color: "#88A1AB",
                        fontSize: "18px",
                        fontFamily: "URW DIN REGULAR",
                        textTransform: "uppercase",
                      }}
                    >
                      <span>{inputValue.charAt(0).toUpperCase()}</span>
                    </div>
                    <UserNameEmail value={inputValue} />

                    {/* <div  style={{width: '150px',overflow: 'auto',whiteSpace: 'nowrap',"&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                            backgroundColor: "#021A31",
                            width:'0.5em'
                          },
                          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                            backgroundColor: "#008BCD",
                          }}}>
                            {inputValue}
                            
                            </div> */}
                  </td>
                  <td
                    style={{
                      paddingRight: "30px",
                      borderSpacing: "0px !important",
                    }}
                  >
                    <TeamRoleSearchDrop
                      setLoader={setLoader}
                      loader={loader}
                      setdepartments={setdepartments}
                      departments={departments}
                      rootRoles={rootRoles}
                      role=""
                      setOpenUpdateToast={setOpenUpdateToast}
                      setToastMessage={setToastMessage}
                      setUpdateStatus={setUpdateStatus}
                      changeRole={changeRole}
                      userId=""
                      componentFor="newUserList"
                    />
                  </td>
                  <td style={{ borderSpacing: "0px !important" }}>
                    <TeamViewtypeDrop
                      viewType={newUserViewType}
                      setnewUserViewType={setnewUserViewType}
                      changeViewType={changeViewType}
                      userId=""
                      componentFor="newUserList"
                    />
                  </td>
                  <td style={{ borderSpacing: "0px !important" }}>
                    <EventDropInviteMember
                      events={[...newUser.spaces]}
                      allSubrooms={allSubrooms}
                      allRooms={allRooms}
                      spaceChange={spaceChange}
                      userId=""
                      componentFor="newUserList"
                    />
                  </td>
                  <td style={{ borderSpacing: "0px !important" }}>
                    <img
                      src="/assets/admin/plus-icon.svg"
                      className="invite-icon-add"
                      style={{ paddingRight: "18px" }}
                      onClick={() => {
                        addNewMember(inputValue);
                      }}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Scrollbars>
    </>
  );
};

export default SearchNewMember;
