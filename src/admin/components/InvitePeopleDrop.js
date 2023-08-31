import { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Stack,
  InputLabel,
  OutlinedInput,
  TextField,
  InputBase,
  Tooltip,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import { useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import MoreTooltip from "./MoreTooltip";

export default function InvitePeopleDrop({
  selected,
  eventId,
  seteditToast,
  setIsSelected,
  centrifugoLoginUpdateDetails,
  onlineLoader,
  loggedInUsers,
}) {
  const theme = useSelector((state) => state.theme.themeData);
  const [isActive, setIsActive] = useState(false);
  const [hover, sethover] = useState(-1);
  const [currentUser, setcurrentUser] = useState(-1);
  const [loaderuser, setloaderuser] = useState(false);
  const [removedUsers, setremovedUsers] = useState();
  // let selected = [{id: '60', first_name: 'Chikku', last_name: '', email: 'chikku@gmail.com', member_logo: null}]

  //outside click
  console.log(selected, "selectedselected");

  const warpperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    const { current: wrap } = warpperRef;
    if (wrap && !wrap.contains(event.target)) {
      setIsActive(false);
    }
  };
  //autocomplete
  const [searchArr, setsearchArr] = useState([]);
  const [searchContent, setsearchContent] = useState(false);
  const [search, setsearch] = useState("");

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const handleChange = (event) => {
    let searchWord = event.target.value;

    if (searchWord) {
      setsearchContent(true);
    } else {
      setsearchContent(false);
    }

    AxiosLocal.post("user/search/team/", {
      search_text: searchWord,
    }).then((response) => {
      setsearchArr(response.data.data);
    });
    // event.target.value=''
  };

  let activeEmpty = searchArr.filter(
    (item) =>
      !selected.some((itemToBeRemoved) => itemToBeRemoved.id === item.id)
  );

  const closefunction = (item) => {
    setcurrentUser(item.id);
    setloaderuser(true);
    AxiosLocal.post(`space/user/remove/`, {
      mainspace_id: eventId,
      user_id: item.id,
    }).then((response) => {
      if (response.data.status == "Success") {
        setremovedUsers();
        seteditToast(true);
        setIsActive(true);
      }
    });
    setTimeout(() => {
      const removeItem = selected.filter((elem) => elem != item);
      setIsSelected([...removeItem]);

      setremovedUsers(item.id);
    }, 500);

    // if (isActive) {
    //   setIsActive(true);
    // } else {
    //   setIsActive(false);
    // }
  };

  return (
    <div ref={warpperRef} className="InvitePeople">
      <Box
        component="form"
        sx={{
          p: "2px 2px",
          backgroundColor: theme?.addSpace?.mainColor,
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "34px",
          border: `2px solid ${theme?.login?.secondaryColor}`,
          borderRadius: "4px",
          fontFamily: "URW DIN REGULAR",
          fontSize: "14px",
          cursor: "pointer",
          borderRight: "none",
        }}
        onClick={() => {
          setIsActive(true);
        }}
        className="InvitePeopleDrop"
      >
        <IconButton
          type="submit"
          sx={{ p: "10px" }}
          aria-label="search"
          style={{ color: "#88A1AB" }}
        >
          <img alt="" src="/assets/admin/person.svg" />
        </IconButton>

        {selected?.length > 1 ? (
          <>
            {selected
              .filter((item) => item.is_organization_user === false)
              .slice(0, 1)
              .map((item) => (
                <>
                  {loaderuser && currentUser == item.id ? (
                    <Skeleton
                      variant="rounded"
                      sx={{
                        backgroundColor:theme?.loading?.loadingColor,

                        width: "170px",
                        height: "34px",
                      }}
                    />
                  ) : (
                    <></>
                  )}
                  <div
                    style={{
                      backgroundColor: theme?.editspace?.bgcolor1,
                      display: currentUser == item.id ? "none" : "flex",
                      alignItems: "center",
                      padding: "0px 11px 0px 7px",
                      height: "32px",
                      borderRadius: "4px",
                      marginRight: "4px",
                    }}
                  >
                    {item.avatar ? (
                      <div style={{ position: "relative" }}>
                        <img
                          alt=""
                          src={item.avatar}
                          style={{
                            width: "19px",
                            height: "19px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            marginRight: "14px",
                          }}
                        />
                        {centrifugoLoginUpdateDetails.user_id == item.id &&
                        centrifugoLoginUpdateDetails.type == "login" ? (
                          <span>
                            {" "}
                            <img
                              alt=""
                              src="/assets/admin/greendotborder.svg"
                              style={{
                                position: "absolute",
                                bottom: "1px",
                                right: "-4px",
                                width: "8px",
                                height: "8px",
                              }}
                            />
                          </span>
                        ) : centrifugoLoginUpdateDetails.user_id == item.id &&
                          centrifugoLoginUpdateDetails.type == "logout" ? (
                          <></>
                        ) : onlineLoader ? (
                          <Skeleton
                            style={{
                              position: "absolute",
                              bottom: "1px",
                              right: "-4px",
                              width: "8px",
                              height: "8px",
                              backgroundColor:theme?.loading?.loadingColor,

                            }}
                            variant="circular"
                            width={20}
                            height={20}
                          />
                        ) : loggedInUsers.includes(item.id) ? (
                          <span>
                            {" "}
                            <img
                              alt=""
                              src="/assets/admin/greendotborder.svg"
                              style={{
                                position: "absolute",
                                bottom: "1px",
                                right: "-4px",
                                width: "8px",
                                height: "8px",
                              }}
                            />
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <>
                        <div
                          style={{
                            height: "19px",
                            width: "19px",
                            position: "relative",
                            textAlign: "center",
                            margin: "0px 13px 0px 0px",
                            verticalAlign: "middle",
                            lineHeight: "19px",
                            borderRadius: "50%",
                            backgroundColor: theme?.editspace?.mainbgcolor,
                            color: "#88A1AB",
                            fontSize: "12px",
                            fontFamily: "URW DIN REGULAR",
                            textTransform: "uppercase",
                          }}
                        >
                          <span>{item?.first_name[0]}</span>
                          {centrifugoLoginUpdateDetails.user_id == item.id &&
                          centrifugoLoginUpdateDetails.type == "login" ? (
                            <span>
                              {" "}
                              <img
                                alt=""
                                src="/assets/admin/greendotborder.svg"
                                style={{
                                  position: "absolute",
                                  bottom: "1px",
                                  right: "-4px",
                                  width: "8px",
                                  height: "8px",
                                }}
                              />
                            </span>
                          ) : centrifugoLoginUpdateDetails.user_id == item.id &&
                            centrifugoLoginUpdateDetails.type == "logout" ? (
                            <></>
                          ) : onlineLoader ? (
                            <Skeleton
                              style={{
                                position: "absolute",
                                bottom: "1px",
                                right: "-4px",
                                width: "8px",
                                height: "8px",
                                backgroundColor:theme?.loading?.loadingColor,

                              }}
                              variant="circular"
                              width={20}
                              height={20}
                            />
                          ) : loggedInUsers.includes(item.id) ? (
                            <span>
                              {" "}
                              <img
                                alt=""
                                src="/assets/admin/greendotborder.svg"
                                style={{
                                  position: "absolute",
                                  bottom: "1px",
                                  right: "-4px",
                                  width: "8px",
                                  height: "8px",
                                }}
                              />
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </>
                    )}

                    <p
                      style={{
                        marginRight: "20px",
                        color: "#88A1AB",
                        fontSize: "14px",
                      }}
                    >
                      {capitalizeFirstLetter(item.first_name)}{" "}
                      {capitalizeFirstLetter(item.last_name)}
                    </p>
                    <img
                      alt=""
                      src="/assets/admin/close.svg"
                      style={{ width: "8px", height: "8px" }}
                      onClick={() => closefunction(item)}
                    />
                  </div>
                </>
              ))}
            <Tooltip
              title={
                <div
                  className="avatar-scroll"
                  style={{
                    maxHeight: "250px",
                    overflowY: "scroll",
                    width: "210px",
                    marginRight: "-8px",
                  backgroundColor:theme?.addSpace?.mainColor,

                  }}
                >
                  {selected
                    .slice(1)
                    .filter((item) => item.is_organization_user === false)
                    .map((user) => (
                      <MoreTooltip user={user} closefunction={closefunction} />
                    ))}
                </div>
              }
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: theme?.table?.buttonColor,
                  },
                },
                arrow: {
                  sx: {
                    color: theme?.addSpace?.mainColor,
                    fontSize: "22px",
                  },
                },
              }}
              placement="bottom"
              arrow
            >
              <div
                style={{
                  backgroundColor: theme?.addSpace?.borderbackgroundcolor,
                  display: "flex",
                  alignItems: "center",
                  padding: "0px 11px 0px 7px",
                  height: "32px",
                  borderRadius: "4px",
                  marginRight: "4px",
                  color: "#88A1AB",
                }}
              >
                +{selected?.length - 2}
              </div>
            </Tooltip>
          </>
        ) : (
          <>
            {selected
              .filter((item) => item.is_organization_user === false)
              .map((item) => (
                <>
                  {loaderuser && currentUser == item.id ? (
                    <Skeleton
                      variant="rounded"
                      sx={{
                        backgroundColor:theme?.loading?.loadingColor,

                        width: "100%",
                        height: "34px",
                      }}
                    />
                  ) : (
                    <></>
                  )}
                  <div
                    style={{
                      backgroundColor: theme?.addSpace?.borderbackgroundcolor,
                      display: "flex",
                      alignItems: "center",
                      padding: "0px 11px 0px 7px",
                      height: "32px",
                      borderRadius: "4px",
                      marginRight: "4px",
                    }}
                  >
                    {item.avatar ? (
                      <div style={{ position: "relative" }}>
                        <img
                          alt=""
                          src={item.avatar}
                          style={{
                            width: "19px",
                            height: "19px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            marginRight: "14px",
                          }}
                        />
                        {centrifugoLoginUpdateDetails.user_id == item.id &&
                        centrifugoLoginUpdateDetails.type == "login" ? (
                          <span>
                            {" "}
                            <img
                              alt=""
                              src="/assets/admin/greendotborder.svg"
                              style={{
                                position: "absolute",
                                bottom: "1px",
                                right: "-4px",
                                width: "8px",
                                height: "8px",
                              }}
                            />
                          </span>
                        ) : centrifugoLoginUpdateDetails.user_id == item.id &&
                          centrifugoLoginUpdateDetails.type == "logout" ? (
                          <></>
                        ) : onlineLoader ? (
                          <Skeleton
                            style={{
                              position: "absolute",
                              bottom: "1px",
                              right: "-4px",
                              width: "8px",
                              height: "8px",
                              backgroundColor:theme?.loading?.loadingColor,

                            }}
                            variant="circular"
                            width={20}
                            height={20}
                          />
                        ) : loggedInUsers.includes(item.id) ? (
                          <span>
                            {" "}
                            <img
                              alt=""
                              src="/assets/admin/greendotborder.svg"
                              style={{
                                position: "absolute",
                                bottom: "1px",
                                right: "-4px",
                                width: "8px",
                                height: "8px",
                              }}
                            />
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <div
                        style={{
                          height: "19px",
                          width: "19px",
                          position: "relative",
                          textAlign: "center",
                          margin: "0px 13px 0px 0px",
                          verticalAlign: "middle",
                          lineHeight: "19px",
                          borderRadius: "50%",
                          backgroundColor: theme?.editspace?.mainbgcolor,
                          color: "#88A1AB",
                          fontSize: "12px",
                          fontFamily: "URW DIN REGULAR",
                          textTransform: "uppercase",
                        }}
                      >
                        <span>{item.first_name[0]}</span>
                        {centrifugoLoginUpdateDetails.user_id == item.id &&
                        centrifugoLoginUpdateDetails.type == "login" ? (
                          <span>
                            {" "}
                            <img
                              alt=""
                              src="/assets/admin/greendotborder.svg"
                              style={{
                                position: "absolute",
                                bottom: "1px",
                                right: "-4px",
                                width: "8px",
                                height: "8px",
                              }}
                            />
                          </span>
                        ) : centrifugoLoginUpdateDetails.user_id == item.id &&
                          centrifugoLoginUpdateDetails.type == "logout" ? (
                          <></>
                        ) : onlineLoader ? (
                          <Skeleton
                            style={{
                              position: "absolute",
                              bottom: "1px",
                              right: "-4px",
                              width: "8px",
                              height: "8px",
                              backgroundColor:theme?.loading?.loadingColor,

                            }}
                            variant="circular"
                            width={20}
                            height={20}
                          />
                        ) : loggedInUsers.includes(item.id) ? (
                          <span>
                            {" "}
                            <img
                              alt=""
                              src="/assets/admin/greendotborder.svg"
                              style={{
                                position: "absolute",
                                bottom: "1px",
                                right: "-4px",
                                width: "8px",
                                height: "8px",
                              }}
                            />
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                    )}
                    <p
                      style={{
                        marginRight: "20px",
                        color: "#88A1AB",
                        fontSize: "14px",
                      }}
                    >
                      {item.first_name} {item.last_name}
                    </p>
                    <img
                      alt=""
                      src="/assets/admin/close.svg"
                      style={{ width: "8px", height: "8px" }}
                      onClick={() => closefunction(item)}
                    />
                  </div>
                </>
              ))}
          </>
        )}
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Add more"
          inputProps={{ "aria-label": "" }}
          onChange={(event) => {
            handleChange(event);
            setsearch(event.target.value);
          }}
          value={search}
          style={{
            fontSize: "14px",
            color: "#88A1AB",
            fontStyle: "italic",
            fontFamily: "URW DIN REGULAR",
          }}
        />
      </Box>

      <div
        className="dropdown-contents"
        style={{
          display: isActive ? "block" : "none",
          backgroundColor: theme?.editspace?.mainbgcolor,
          border: `2px solid ${theme?.addSpace?.borderbackgroundcolor}`,
          borderRadius: "4px",
          color: "#88A1AB",
          fontSize: "14px",
          fontFamily: "URW DIN REGULAR",
          fontWeight: 400,
          opacity: searchContent ? 1 : 0,
        }}
      >
        {/* <Scrollbars style={{ width: "100%", height: '20vh', }}> */}

        {searchArr?.length == 0 || activeEmpty.length == 0 ? (
          <div
            style={{
              backgroundColor: theme?.addSpace?.borderbackgroundcolor,
              height: "100px",
              margin: "0px 38px 10px",
            }}
          >
            <p
              style={{
                color: theme?.spaces?.secondaryColor,
                textAlign: "center",
                fontFamily: "URW DIN REGULAR",
                fontSize: "14px",
                paddingTop: "34px",
              }}
            >
              Search results not found
            </p>
          </div>
        ) : (
          searchArr
            ?.filter((item) => item.is_organization_user === false)
            .map((item) => (
              <div
                className="item"
                onMouseEnter={() => sethover(item.id)}
                onMouseLeave={() => sethover(-1)}
                style={{
                  background: hover == item.id ? theme?.addSpace?.borderbackgroundcolor : "",
                  fontSize: hover == item.id ? "14px" : "14px",
                  fontFamily: hover == item.id ? "URW DIN" : "URW DIN REGULAR",
                  display: selected.some((el) => item.id == el.id)
                    ? "none"
                    : "block",
                }}
              >
                <div
                  onClick={() => {
                    if (selected.some((el) => item.id == el.id)) {
                      let filtereArr = selected.filter(
                        (ele) => ele.id != item.id
                      );
                      setIsSelected([...filtereArr]);
                    } else {
                      setIsSelected([...selected, item]);
                      AxiosLocal.post(`space/user/add/`, {
                        mainspace_id: eventId,
                        user_id: item.id,
                      }).then((response) => {
                        if (response.data.status == "Success") {
                          //  setremovedUsers()
                          seteditToast(true);
                        }
                      });
                      setsearch("");
                    }
                    console.log(selected, "selectedselected");
                  }}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ display: "flex" }}>
                    <div style={{ position: "relative", display: "flex" }}>
                      {item.avatar ? (
                        <div>
                          <img
                            alt=""
                            src={item.avatar}
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />

                          {centrifugoLoginUpdateDetails.user_id == item.id &&
                          centrifugoLoginUpdateDetails.type == "login" ? (
                            <img
                              alt=""
                              src="/assets/admin/greendotborder.svg"
                              style={{
                                position: "absolute",
                                bottom: "4px",
                                right: "-1px",
                              }}
                            />
                          ) : centrifugoLoginUpdateDetails.user_id == item.id &&
                            centrifugoLoginUpdateDetails.type == "logout" ? (
                            <></>
                          ) : onlineLoader ? (
                            <Skeleton
                              style={{
                                position: "absolute",
                                bottom: "4px",
                                right: "-1px",
                                width: "12px",
                                height: "12px",
                                backgroundColor:theme?.loading?.loadingColor,

                              }}
                              variant="circular"
                              width={20}
                              height={20}
                            />
                          ) : loggedInUsers.includes(item.id) ? (
                            <img
                              alt=""
                              src="/assets/admin/greendotborder.svg"
                              style={{
                                position: "absolute",
                                bottom: "4px",
                                right: "-1px",
                              }}
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                      ) : (
                        <div
                          style={{
                            height: "40px",
                            width: "40px",
                            position: "relative",
                            textAlign: "center",
                            // margin: "0px 15px 0px 20px",
                            verticalAlign: "middle",
                            lineHeight: "40px",
                            borderRadius: "50%",
                            backgroundColor: theme?.addSpace?.maincolor,
                        border: `2px solid ${theme?.addSpace?.borderbackgroundcolor}`,

                            color: "#88A1AB",
                            fontSize: "18px",
                            fontFamily: "URW DIN REGULAR",
                            textTransform: "uppercase",
                          }}
                        >
                          <span>{item.email[0]}</span>
                        </div>
                      )}

                      {centrifugoLoginUpdateDetails.user_id == item.id &&
                      centrifugoLoginUpdateDetails.type == "login" ? (
                        <img
                          alt=""
                          src="/assets/admin/greendotborder.svg"
                          style={{
                            position: "absolute",
                            bottom: "4px",
                            right: "-1px",
                          }}
                        />
                      ) : centrifugoLoginUpdateDetails.user_id == item.id &&
                        centrifugoLoginUpdateDetails.type == "logout" ? (
                        <></>
                      ) : onlineLoader ? (
                        <Skeleton
                          style={{
                            position: "absolute",
                            bottom: "4px",
                            right: "-1px",
                            width: "12px",
                            height: "12px",
                            backgroundColor:theme?.loading?.loadingColor,

                          }}
                          variant="circular"
                          width={20}
                          height={20}
                        />
                      ) : loggedInUsers.includes(item.id) ? (
                        <img
                          alt=""
                          src="/assets/admin/greendotborder.svg"
                          style={{
                            position: "absolute",
                            bottom: "4px",
                            right: "-1px",
                          }}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <p
                      style={{
                        color:
                          selected.some((el) => item.id == el.id) ||
                          hover == item.id
                            ? "white"
                            : "#88A1AB",
                        marginLeft: "14px",
                      }}
                    >
                      {item?.first_name} {item?.last_name}
                    </p>
                  </div>
                  <img
                    alt=""
                    src="/assets/admin/plus-icon.svg"
                    style={{
                      filter: hover == item.id ? "brightness(0) invert(1)" : "",
                    }}
                  />
                </div>
                {/* <span onClick={(e) => {
                      setIsSelected([selected, ]);
                      setIsActive(!isActive);
                    }}>primary</span> */}
              </div>
            ))
        )}

        {/* </Scrollbars> */}
      </div>
    </div>
  );
}
