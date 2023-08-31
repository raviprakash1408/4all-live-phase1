import { ChangeCircleOutlined } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import Skeleton from "@mui/material/Skeleton";
import { Centrifuge } from "centrifuge";
import { setCentrifugoClient } from "../../state/conference/conferenceSlice";
import Toast from "../../sections/Toast";

const TeamRoleSearchDropElement = ({
  userId,
  item,
  setIsSelected,
  setIsActive,
  isActive,
  selected,
  loader,
  changeRole,
  componentFor,
  selectedDepartment,
  setselectedDepartment,
  rolePosition,
  viewType,
}) => {
  const [open, setOpen] = useState(
    selectedDepartment == item.name ? true : false
  );
  const [hover, setHover] = useState(-1);
  const theme = useSelector(state => state.theme.themeData);

  useEffect(() => {
    if (selectedDepartment == item.name) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [selected, selectedDepartment]);

  return (
    <>
      {loader ? (
        <div
          style={{ marginTop: "20px" }}
          className="item"
          key={item.id}
          onClick={() => setOpen(!open)}
        >
          <div
            style={{
              backgroundColor:theme?.loading?.loadingColor,
              borderRadius: "4px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              height: "40px",
              color: "white",
            }}
          >
            <div
              style={{
                border:  `2px solid ${theme?.loading?.loadingColor}`,
                borderRadius: "4px",
                backgroundColor: theme?.loading?.loadingColor,
                width: "19px",
                height: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10px",
                marginLeft: "2px",
              }}
              onClick={() => setOpen(!open)}
            >
              <img
                src={open ? "/assets/icons/up.svg" : "/assets/icons/down.svg"}
                style={{ height: "5px", width: "8px" }}
                alt=""
              />
            </div>
            <div
              style={{
                backgroundColor: theme?.loading?.loadingColor,
                padding: "8px 10px",
                borderRadius: "4px 0px 0px 4px",
              }}
            >
              <img
                alt=""
                style={{ marginTop: "2px" }}
                src="/assets/admin/folder.svg"
              />
            </div>
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              style={{  backgroundColor:  theme?.loading?.loadingColor  }}
            />
          </div>
          {open ? (
            <div class="treeviewRole">
              <ul>
                <li>
                  <div
                    style={{
                      height: "40px",
                      borderRadius: "4px",
                      backgroundColor: "#002E56",
                      display: "flex",
                    }}
                    className="line"
                  >
                    <div
                      style={{
                        height: "40px",
                        width: "56px",
                        backgroundColor: "#012A50",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "4px",
                      }}
                    >
                      <img
                        src="/assets/admin/branch.svg"
                        style={{ width: "22px", height: "18px" }}
                        alt=""
                      />
                    </div>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      style={{ backgroundColor: theme?.loading?.loadingColor  }}
                    />
                  </div>
                </li>
                <li>
                  <div
                    style={{
                      height: "40px",
                      borderRadius: "4px",
                      backgroundColor: "#002E56",
                      display: "flex",
                    }}
                    className="line"
                  >
                    <div
                      style={{
                        height: "40px",
                        width: "56px",
                        backgroundColor: "#012A50",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "4px",
                      }}
                    >
                      <img
                        src="/assets/admin/branch.svg"
                        style={{ width: "22px", height: "18px" }}
                        alt=""
                      />
                    </div>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      style={{ backgroundColor: theme?.loading?.loadingColor  }}
                    />
                  </div>
                </li>
                <li>
                  <div
                    style={{
                      height: "40px",
                      borderRadius: "4px",
                      backgroundColor: "#002E56",
                      display: "flex",
                    }}
                    className="line"
                  >
                    <div
                      style={{
                        height: "40px",
                        width: "56px",
                        backgroundColor: "#012A50",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "4px",
                      }}
                    >
                      <img
                        src="/assets/admin/branch.svg"
                        style={{ width: "22px", height: "18px" }}
                        alt=""
                      />
                    </div>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      style={{ backgroundColor: theme?.loading?.loadingColor  }}
                    />
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div
          style={{ marginTop: "10px" }}
          className="item"
          key={item.id}
          onClick={() => setOpen(!open)}
        >
          <div
            style={{
              backgroundColor: theme?.team?.bgColor,

              borderRadius: "4px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              height: "40px",
              color: "white",
            }}
          >
            <div
              style={{
                border: theme?.team?.border,
                borderRadius: "4px",
                backgroundColor:theme?.team?.participant,

                width: "19px",
                height: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10px",
                marginLeft: "2px",
              }}
              onClick={() => setOpen(!open)}
            >
              <img
                src={open ? "/assets/icons/up.svg" : "/assets/icons/down.svg"}
                style={{ height: "5px", width: "8px" }}
                alt=""
              />
            </div>
            <div
              style={{
                backgroundColor:theme?.team?.folder,

                padding: "8px 10px",
                borderRadius: "4px 0px 0px 4px",
              }}
            >
              <img
                alt=""
                style={{ marginTop: "2px" }}
                src="/assets/admin/folder.svg"
              />
            </div>
            <div
              style={{
                color:theme?.team?.color,

                height: "100%",
                width: "100%",
                backgroundColor: theme?.team?.default,

                display: "flex",
                alignItems: "center",
                paddingLeft: "13px",
                borderRadius: "0px 4px 4px 0px",
                fontSize: "14px",
                fontFamily: "URW DIN MEDIUM",
              }}
            >
              {item.name}
            </div>
          </div>
          {open ? (
            <div class="treeviewRole">
              <ul>
                {item.roles.map((role) => (
                  <li
                    className={
                      viewType == role.permission_group.permission_type &&
                        role.name == "Viewer"
                        ? "viewer"
                        : ""
                    }
                    onClick={(e) => {
                      setIsSelected(e.target.textContent);
                      setselectedDepartment(item.name);
                      setIsActive(!isActive);
                      console.log(e.target, role.id, "changeRole");
                      changeRole(role, componentFor, userId);
                      // ChangeCircleOutlined()
                    }}
                    // style={{
                    //   display:
                    //     viewType == "P" || viewType == "S"
                    //       ? "block"
                    //       : viewType == role.permission_group.permission_type &&
                    //         role.name == "Viewer"
                    //       ? "block"
                    //       : "none",
                    // }}
                    onMouseEnter={() => setHover(role.id)}
                    onMouseLeave={() => setHover(-1)}
                  >
                    <div
                      style={{
                        height: "40px",
                        borderRadius: "4px",
                        // backgroundColor: "#002E56",
                        display: "flex",
                      }}
                      className="line"
                    >
                      <div
                        style={{
                          height: "40px",
                          width: "56px",
                          backgroundColor: theme?.team?.bgColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "4px",
                        }}
                      >
                        <img
                          src="/assets/admin/branch.svg"
                          style={{ width: "22px", height: "18px" }}
                          alt=""
                        />
                      </div>
                      <div
                        style={{
                          height: "100%",
                          width: "100%",
                          fontFamily:
                            selected == role.name
                              ? "URW DIN"
                              : "URW DIN REGULAR",
                          backgroundColor:
                            hover == role.id
                              ? theme?.team?.hover
                              : selected == role.name
                                ?theme?.common?.color1
                                : theme?.team?.participant,
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: "13px",
                          borderRadius: "0px 4px 4px 0px",
                          fontSize: "14px",
                          color:
                            hover == role.id
                              ? "white"
                              : selected == role.name
                                ? "white"
                                : "#88A1AB",
                        }}
                      >
                        {/* viewType == role.permission_group.permission_type */}
                        {role.name}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default TeamRoleSearchDropElement;
