import { useEffect, useState, useRef } from "react";
// import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Scrollbars } from "react-custom-scrollbars";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import ElementTeamRoleSearchDrop from "./ElementTeamRoleSearchDrop";
import { isEmpty, removeElementFromArray } from "../../utilities/common";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function EventDropInviteMember({
  events,
  allSubrooms,
  allRooms,
  width,
  defaultSpace,
  spaceChange,
  userId,
  componentFor,
  changedUserId,
  individualLoader,
  centrifugoEventUpdateDetails,
}) {
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState([...events]);
  const [subSpaceCountLoader, setsubSpaceCountLoader] = useState(false);

  const [spaceChanged, setspaceChanged] = useState(false);

  const [allSelected, setallSelected] = useState(false);

  console.log("events", events, selected);

  useEffect(() => {
    setIsSelected([...events]);
  }, [events]);

  //search
  const [searchArr, setsearchArr] = useState([...allRooms]);

  useEffect(() => {
    // if(componentFor=="teamTable" || componentFor=="excelTable"){
    AxiosLocal.get("mainspace/subspace/").then((response) => {
      setsearchArr([...response.data.data]);
    });
    // }
  }, []);

  //checkbox multiple
  const [checkedList, setCheckedList] = useState([]);
  const [subSpaceList, setsubSpaceList] = useState([]);
  const [checkedSelectAll, setcheckedSelectAll] = useState(false);

  const [mainRoomId, setmainRoomId] = useState(-1);
  const theme = useSelector((state) => state.theme.themeData);

  //outside click
  const warpperRef = useRef(null);

  const [initialRender, setinitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      setinitialRender(false);
    } else {
      spaceChange(selected, userId, componentFor);
    }
  }, [spaceChanged]);

  const [checkedMainSpaceIds, setcheckedMainSpaceIds] = useState([]);
  const [checkedSubSpaceIds, setcheckedSubSpaceIds] = useState([]);

  useEffect(() => {
    if (componentFor !== "teamTable" && componentFor !== "excelTable") {
      let mainSpaceIds = [...checkedMainSpaceIds];
      let subSpaceids = [...checkedSubSpaceIds];
      events?.forEach((mainspace) => {
        let mainobj = searchArr.find((room) => room.id === mainspace?.id);
        if (mainobj?.subrooms?.length == mainspace?.subrooms?.length) {
          mainSpaceIds.push(mainspace.id);
          setcheckedMainSpaceIds([...mainSpaceIds]);
        }
        mainspace?.subrooms?.forEach((subspace) => {
          subSpaceids.push(subspace.id);
          setcheckedSubSpaceIds([...subSpaceids]);
        });
      });
    }
  }, [searchArr]);

  const setSelectedValues = (selectedData) => {
    let mainSpaceIds = [...checkedMainSpaceIds];
    let subSpaceids = [...checkedSubSpaceIds];
    selectedData?.forEach((mainspace) => {
      let mainobj = searchArr.find((room) => room.id === mainspace?.id);
      if (mainobj?.subrooms?.length == mainspace?.subrooms?.length) {
        mainSpaceIds.push(mainspace.id);
        setcheckedMainSpaceIds([...mainSpaceIds]);
      }
      mainspace?.subrooms?.forEach((subspace) => {
        subSpaceids.push(subspace.id);
        setcheckedSubSpaceIds([...subSpaceids]);
      });
    });
  };

  const getSpaceSubspace = () => {
    AxiosLocal.get(`mainspace/subspaces/${userId}/`).then((response) => {
      // setIsSelected([...response.data.data])
      // setSelectedValues([...response.data.data])
      setIsSelected([...response.data.data]);
      let mainSpaceIds = [];
      let checksubSpaceIds = [];
      response.data.data.forEach((element) => {
        mainSpaceIds.push(element.id);
        element.subrooms.forEach((subspace) => {
          checksubSpaceIds.push(subspace.id);
        });
      });
      setcheckedMainSpaceIds([...mainSpaceIds]);
      setcheckedSubSpaceIds([...checksubSpaceIds]);
      if (searchArr.length == response.data.data.length) {
        setallSelected(true);
      } else {
        setallSelected(false);
      }
    });
  };

  const activeItemSet = (mainRoom, item, setType, isChecked) => {
    if (selected.some((el) => mainRoom.id == el.id)) {
      let obj = selected.find((room) => room.id === mainRoom.id);
      let filteredMainSpaces = selected.filter((item) => {
        return item.id != mainRoom.id;
      });
      setIsSelected([...filteredMainSpaces]);
      if (setType == "main") {
        const selectedSpace = {};
        if (isChecked) {
          console.log("selectedSubrooms 2");
          let mainobj = searchArr.find((room) => room.id === mainRoom.id);
          let selectedSubrooms = mainobj.subrooms;
          console.log(selectedSubrooms, "selectedSubrooms 3");
          Object.assign(selectedSpace, {
            id: mainRoom.id,
            name: mainRoom.name,
            menu_logo: mainRoom.menu_logo,
            subrooms: [...selectedSubrooms],
          });
          let mainSpaceIds = [...checkedMainSpaceIds];
          mainSpaceIds.push(mainRoom.id);
          setcheckedMainSpaceIds([...mainSpaceIds]);
          let subSpaceIds = [...checkedSubSpaceIds];
          selectedSubrooms.forEach((element) => {
            if (!subSpaceIds.includes(element.id)) {
              subSpaceIds.push(element.id);
            }
          });
          setcheckedSubSpaceIds([...subSpaceIds]);
          setIsSelected([...filteredMainSpaces, selectedSpace]);
        } else {
          let mainSpaceIds = [...checkedMainSpaceIds];
          removeElementFromArray(mainSpaceIds, mainRoom.id);
          setcheckedMainSpaceIds([...mainSpaceIds]);
          let subSpaceIds = [...checkedSubSpaceIds];
          obj.subrooms.forEach((item) => {
            removeElementFromArray(subSpaceIds, item.id);
          });
          setcheckedSubSpaceIds([...subSpaceIds]);
        }
      } else if (obj.subrooms.some((subroom) => item.id == subroom.id)) {
        console.log("test 1");
        let result = selected.filter((obj) => {
          return obj.id === mainRoom.id;
        });
        let filteredMainSpace = result[0].subrooms.filter(
          (subroom) => item.id !== subroom.id
        );
        if (filteredMainSpace.length == 1) {
          if (filteredMainSpace[0].is_master) {
            filteredMainSpace = [];
          }
        }
        const newArr = selected.map((obj) => {
          if (obj.id === mainRoom.id) {
            return { ...obj, subrooms: filteredMainSpace };
          }
          return obj;
        });

        let mainSubSpaceObj = mainRoom.subrooms.map((subSpace) => {
          if (subSpace.is_master) {
            return subSpace;
          }
        });

        setIsSelected([...newArr]);
        let subSpaceIds = [...checkedSubSpaceIds];
        removeElementFromArray(subSpaceIds, item.id);

        if (filteredMainSpace.length == 1) {
          console.log(filteredMainSpace.length, "test test");
          removeElementFromArray(subSpaceIds, mainSubSpaceObj[0].id);
        }
        setcheckedSubSpaceIds([...subSpaceIds]);
        let mainSpaceIds = [...checkedMainSpaceIds];
        removeElementFromArray(mainSpaceIds, mainRoom.id);
        setcheckedMainSpaceIds([...mainSpaceIds]);
      } else {
        let result = selected.filter((obj) => {
          return obj.id === mainRoom.id;
        });
        const subroomArr = result[0].subrooms;
        let mainSubSpaceObj = mainRoom.subrooms.map((subSpace) => {
          if (subSpace.is_master) {
            return subSpace;
          }
        });
        let subroomArrList = [...subroomArr, item];
        if (subroomArr.length === 0) {
          subroomArrList = [...subroomArrList, mainSubSpaceObj[0]];
        }
        const newArr = selected.map((obj) => {
          if (obj.id === mainRoom.id) {
            return { ...obj, subrooms: subroomArrList };
          }
          return obj;
        });
        console.log(newArr, "newArrayyyy");
        setIsSelected([...newArr]);
        let subSpaceIds = [...checkedSubSpaceIds];
        if (!subSpaceIds.includes(item.id)) {
          subSpaceIds.push(item.id);
        }
        setcheckedSubSpaceIds([...subSpaceIds]);
        let allCheck = [];
        let obj = searchArr.find((room) => room.id === mainRoom.id);
        obj.subrooms.forEach((item) => {
          if (subSpaceIds.includes(item.id)) {
            allCheck.push(true);
          } else {
            allCheck.push(false);
          }
        });
        if (!allCheck.includes(false)) {
          let mainSpaceIds = [...checkedMainSpaceIds];
          mainSpaceIds.push(mainRoom.id);
          setcheckedMainSpaceIds([...mainSpaceIds]);
        }
      }
    } else {
      const selectedSpace = {};
      if (setType == "main") {
        console.log("selectedSubrooms 1111");
        let obj = searchArr.find((room) => room.id === mainRoom.id);
        let selectedSubrooms = obj.subrooms;
        Object.assign(selectedSpace, {
          id: mainRoom.id,
          name: mainRoom.name,
          menu_logo: mainRoom.menu_logo,
          subrooms: [...selectedSubrooms],
        });
        let mainSpaceIds = [...checkedMainSpaceIds];
        mainSpaceIds.push(mainRoom.id);
        setcheckedMainSpaceIds([...mainSpaceIds]);
        let checksubSpaceIds = [...checkedSubSpaceIds];
        let subSpaceIds = [];
        selectedSubrooms.forEach((element) => {
          if (!subSpaceIds.includes(element.id)) {
            subSpaceIds.push(element.id);
          }
        });
        subSpaceIds = subSpaceIds.concat(checksubSpaceIds);
        setcheckedSubSpaceIds([...subSpaceIds]);
      } else {
        console.log("this is the case");
        let mainSubSpaceObj = mainRoom.subrooms.map((subSpace) => {
          if (subSpace.is_master) {
            return subSpace;
          }
        });
        Object.assign(selectedSpace, {
          id: mainRoom.id,
          name: mainRoom.name,
          menu_logo: mainRoom.menu_logo,
          subrooms: [],
        });
        selectedSpace.subrooms.push(item);
        selectedSpace.subrooms.push(mainSubSpaceObj[0]);
        let subSpaceIds = [...checkedSubSpaceIds];
        if (!subSpaceIds.includes(mainSubSpaceObj[0].id)) {
          subSpaceIds.push(mainSubSpaceObj[0].id);
        }
        if (!subSpaceIds.includes(item.id)) {
          subSpaceIds.push(item.id);
        }
        setcheckedSubSpaceIds([...subSpaceIds]);
      }
      setIsSelected([...selected, selectedSpace]);
    }
  };

  const handleChange = (event) => {
    const searchWord = event.target.value;
    const searchWordLower = searchWord.toLowerCase();
    let newFilter = searchArr.filter((item) => {
      return item.name.toLowerCase().includes(searchWordLower);
    });
    setsearchArr(newFilter);
    if (searchWord == "") {
      setsearchArr([...allRooms]);
    }
  };

  const handleCheckboxClick = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckedList([...checkedList, value * 1]);
      setsubSpaceList([...checkedList, value * 1]);
    } else {
      setCheckedList(checkedList.filter((item) => item != value));
      setsubSpaceList(subSpaceList.filter((item) => item != value));
    }
  };

  const selectItemAll = (e) => {
    const { checked } = e.target;
    // let subSpaceIds = []
    // let subSpace = []
    if (checked) {
      setIsSelected([...searchArr]);
      let mainSpaceIds = [];
      let checksubSpaceIds = [];
      searchArr.forEach((element) => {
        mainSpaceIds.push(element.id);
        element.subrooms.forEach((subspace) => {
          checksubSpaceIds.push(subspace.id);
        });
      });
      setcheckedMainSpaceIds([...mainSpaceIds]);
      setcheckedSubSpaceIds([...checksubSpaceIds]);
    } else {
      setIsSelected([]);
      setcheckedMainSpaceIds([]);
      setcheckedSubSpaceIds([]);
    }
    // setcheckedSelectAll(checked)
  };

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
      // document.body.style.overflow = 'unset';
    }
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setsubSpaceCountLoader(false)
  //   }, 2000);
  // }, []);

  const [spacePosition, setspacePosition] = useState({
    top: warpperRef?.current?.getBoundingClientRect(),
    left: warpperRef?.current?.getBoundingClientRect(),
  });

  const setDropdownPosition = () => {
    let topPosition = warpperRef?.current?.getBoundingClientRect().y + 40;
    if (
      window.innerHeight - warpperRef.current.getBoundingClientRect().y <
      250
    ) {
      topPosition = warpperRef?.current?.getBoundingClientRect().y - 225;
    }
    setspacePosition({
      top: topPosition,
      left: warpperRef?.current?.getBoundingClientRect().x,
    });
  };

  useEffect(() => {
    if (warpperRef.current) {
      setDropdownPosition();
    }
    window.addEventListener("scroll", setDropdownPosition);
  }, [warpperRef?.current?.getBoundingClientRect().y]);

  return (
    <div
      ref={warpperRef}
      className="dropdownEvent"
      style={{ marginRight: "10px", marginLeft: "5px", width: `${width}` }}
    >
      {componentFor == "teamTable" ? (
        <div
          onClick={(e) => {
            setIsActive(!isActive);
            getSpaceSubspace();
            // if(!isActive){
            //   document.body.style.overflow = 'hidden';
            // }else{
            //   document.body.style.overflow = 'unset';
            // }
          }}
          className="dropdown-btn"
          style={{
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.016)",
            color: "#88A1AB",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fontWeight: 400,
            height: "33px",
          }}
        >
          {selected?.length ? (
            ""
          ) : (
            <p
              style={{
                paddingLeft: "17px",
                color: theme?.team?.textcolor,
                fontStyle: "italic",
              }}
            >
              Search space
            </p>
          )}

          <div style={{ display: "flex" }}>
            {centrifugoEventUpdateDetails.changed &&
            centrifugoEventUpdateDetails.updating_user_id !=
              localStorage.getObject("id") &&
            centrifugoEventUpdateDetails.user_id == userId &&
            centrifugoEventUpdateDetails.type == "user_space_changed" &&
            individualLoader ? (
              <>
                <span style={{ position: "relative", marginLeft: "-7px" }}>
                  <Skeleton
                    style={{ backgroundColor: theme?.loading?.loadingColor }}
                    variant="circular"
                    width={40}
                    height={40}
                  />
                </span>
                <span style={{ position: "relative", marginLeft: "-7px" }}>
                  <Skeleton
                    style={{ backgroundColor: theme?.loading?.loadingColor }}
                    variant="circular"
                    width={40}
                    height={40}
                  />
                </span>
                <span style={{ position: "relative", marginLeft: "-7px" }}>
                  <Skeleton
                    style={{ backgroundColor: theme?.loading?.loadingColor }}
                    variant="circular"
                    width={40}
                    height={40}
                  />
                </span>
                <span style={{ position: "relative", marginLeft: "-7px" }}>
                  <Skeleton
                    style={{ backgroundColor: theme?.loading?.loadingColor }}
                    variant="circular"
                    width={40}
                    height={40}
                  />
                </span>
              </>
            ) : (
              <>
                {selected.length > 3 ? (
                  <div style={{ display: "flex" }}>
                    {selected.slice(0, 3).map((item) =>
                      item?.subrooms?.length != 0 ? (
                        <>
                          <span
                            style={{ position: "relative", marginLeft: "-7px" }}
                          >
                            <img
                              src={item?.menu_logo}
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                overflow: "hidden",
                                fontFamily: "URW DIN",
                              }}
                            />
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                position: "absolute",
                                bottom: "3px",
                                right: "-10px",
                              }}
                            >
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: theme?.team?.viewtypetext,
                                  backgroundColor: theme?.team?.viewtype,
                                  fontSize: "10px",
                                  borderRadius: "50%",
                                  marginRight: "13px",
                                }}
                              >
                                {/* {subSpaceCountLoader?
                      <Skeleton style={{backgroundColor:'#0b394f'}} variant="circular" width={20} height={20} />
                    : */}
                                {/* {item.subrooms_count && item.subrooms_count != 0?item.subrooms_count:0:item.subrooms_count} */}
                                {item.subrooms
                                  ? item.subrooms.length - 1
                                  : item.subrooms_count &&
                                    item.subrooms_count != 0
                                  ? item.subrooms_count - 1
                                  : 0}
                                {/* } */}
                              </div>
                            </div>
                          </span>
                        </>
                      ) : (
                        <></>
                      )
                    )}
                    <div
                      style={{
                        backgroundColor: theme?.team?.bgColor,
                        textAlign: "center",
                        verticalAlign: "middle",
                        lineHeight: "42px",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        color: theme?.common?.color3,
                        border: theme?.team?.border,
                      }}
                    >
                      +{selected.length - 3}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex" }}>
                    {selected.map((item) =>
                      item?.subrooms?.length != 0 ? (
                        <>
                          <span
                            style={{ position: "relative", marginLeft: "-7px" }}
                          >
                            <img
                              src={item?.menu_logo}
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                overflow: "hidden",
                                fontFamily: "URW DIN",
                              }}
                            />
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                position: "absolute",
                                bottom: "3px",
                                right: "-10px",
                              }}
                            >
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: theme?.team?.viewtypetext,
                                  backgroundColor: theme?.team?.viewtype,
                                  fontSize: "10px",
                                  borderRadius: "50%",
                                  marginRight: "13px",
                                }}
                              >
                                {/* {subSpaceCountLoader?
                      <Skeleton style={{backgroundColor:'#0b394f'}} variant="circular" width={20} height={20} />
                    : */}
                                {/* {item.subrooms_count?item.subrooms_count-1:isNaN(item.subrooms_count)?0:!isNaN(item.subrooms_count)?item.subrooms?.length-1:0} */}
                                {item.subrooms
                                  ? item.subrooms.length - 1
                                  : item.subrooms_count &&
                                    item.subrooms_count != 0
                                  ? item.subrooms_count - 1
                                  : 0}
                                {/* } */}
                              </div>
                            </div>
                          </span>
                        </>
                      ) : (
                        <></>
                      )
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          {/* )} */}
          {/* <span
            className={isActive ? "fas fa-caret-up" : "fas fa-caret-down"}
          /> */}
          <img src="" style={{ marginLeft: "5px" }} />
        </div>
      ) : (
        <div
          onClick={(e) => {
            setIsActive(!isActive);
            // getSpaceSubspace();
          }}
          className="dropdown-btn"
          style={{
            border: defaultSpace
              ? `2px solid ${theme.addSpace.dividercolor}`
              : selected.length
              ? ""
              : `2px dashed ${theme.addSpace.dividercolor}`,
            boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.016)",
            color: "#88A1AB",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fontWeight: 400,
            height: "33px",
            backgroundColor: theme.team.headerBg,
          }}
        >
          {selected.length ? (
            ""
          ) : (
            <p
              style={{
                paddingLeft: "17px",
                color: "rgba(225, 231, 234, 0.2)",
                fontStyle: "italic",
              }}
            >
              Search space
            </p>
          )}

          {selected.length > 5 ? (
            <div style={{ display: "flex" }}>
              {selected.slice(0, 5).map((item) => (
                <span style={{ position: "relative" }}>
                  <img
                    src={item?.menu_logo}
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "2px solid #143F63",
                      borderRadius: "4px",
                      marginRight: "2px",
                      fontFamily: "URW DIN",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      position: "absolute",
                      bottom: "3px",
                      right: "-10px",
                    }}
                  >
                    <div
                      style={{
                        width: "15px",
                        height: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: theme?.addmember?.lightbackground,
                        backgroundColor: theme.login.mainColor,
                        fontSize: "10px",
                        borderRadius: "50%",
                        marginRight: "13px",
                      }}
                    >
                      {item?.subrooms?.length - 1}
                    </div>
                  </div>
                </span>
              ))}
              <div
                style={{
                  backgroundColor: theme?.addmember?.lightbackground,
                  textAlign: "center",
                  verticalAlign: "middle",
                  lineHeight: "32px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "4px",
                  marginRight: "4px",
                  color: "#88A1AB",
                  border: "2px solid #143F63",
                }}
              >
                +{selected.length - 5}
              </div>
            </div>
          ) : (
            <div>
              {selected.map((item) =>
                item?.subrooms?.length != 0 ? (
                  <>
                    <span style={{ position: "relative" }}>
                      <img
                        src={item?.menu_logo}
                        style={{
                          width: "32px",
                          height: "32px",
                          border: "2px solid #143F63",
                          borderRadius: "4px",
                          marginRight: "2px",
                          fontFamily: "URW DIN",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          position: "absolute",
                          bottom: "3px",
                          right: "-10px",
                        }}
                      >
                        <div
                          style={{
                            width: "15px",
                            height: "15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#88A1AB",
                            backgroundColor: "#143F63",
                            fontSize: "10px",
                            borderRadius: "50%",
                            marginRight: "13px",
                          }}
                        >
                          {item?.subrooms?.length - 1}
                        </div>
                      </div>
                    </span>
                  </>
                ) : (
                  <></>
                )
              )}
            </div>
          )}
          <img src="" style={{ marginLeft: "5px" }} />
        </div>
      )}

      <div
        className="dropdown-event-content"
        style={{
          ...spacePosition,
          display: isActive ? "block" : "none",
          zIndex: 1300,
          position: "fixed",
          backgroundColor: theme?.team?.participant,
          border: theme?.team?.border,
          borderRadius: "4px",
          color: "#88A1AB",
          fontSize: "14px",
          fontFamily: "URW DIN REGULAR",
          fontWeight: 400,
          width: "300px",
        }}
      >
        {/* <Paper component="form" sx={{p: "2px 2px",display: "flex",alignItems: "center",width: "258",margin: "10px 5px",height: "33px",backgroundColor: "#012243"}} style={{zIndex: "5",boxShadow: "none",border: "2px solid",borderColor: "#143F63"}}>
          <IconButton type="submit" sx={{ p: "10px 2px 10px 10px" }} aria-label="search" style={{ color: "#88A1AB" }}>
            <img src="/assets/admin/searchsmall.svg" />
          </IconButton>
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search space" inputProps={{ "aria-label": "Search member" }} onChange={(event) => handleChange(event)} style={{fontSize: "14px",color: "#88A1AB",fontFamily: "URW DIN REGULAR"}}/>
        </Paper> */}
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginRight: "10px",
            alignItems: "center",
          }}
        >
          <p>Select all</p>
          <Checkbox
            checked={checkedMainSpaceIds.length == searchArr.length}
            {...label}
            onClick={(e) => {
              selectItemAll(e);
              setspaceChanged(!spaceChanged);
            }}
            sx={{
              color: "#143F63",

              "& .MuiSvgIcon-root": { fontSize: 20 },
              "&.Mui-checked": {
                color: theme?.common?.color1,
              },
            }}
            style={{
              width: "25px",
              height: "25px",
              marginLeft: "5px",
            }}
          />
        </div>
        <Scrollbars style={{ width: "100%", height: "22vh" }}>
          {searchArr.map((item) => (
            <>
              <div
                style={{ marginTop: "10px" }}
                onClick={() => setmainRoomId(item.id)}
              >
                <ElementTeamRoleSearchDrop
                  spaceChanged={spaceChanged}
                  setspaceChanged={setspaceChanged}
                  checkedMainSpaceIds={checkedMainSpaceIds}
                  checkedSubSpaceIds={checkedSubSpaceIds}
                  item={item}
                  selected={selected}
                  activeItemSet={activeItemSet}
                  checkedList={checkedList}
                  setCheckedList={setCheckedList}
                  handleCheckboxClick={handleCheckboxClick}
                  setsubSpaceList={setsubSpaceList}
                  subSpaceList={subSpaceList}
                  checkedSelectAll={checkedSelectAll}
                  setIsSelected={setIsSelected}
                  setmainRoomId={setmainRoomId}
                  mainRoomId={mainRoomId}
                  componentFor={componentFor}
                  spaceChange={spaceChange}
                  userId={userId}
                />
              </div>
            </>
          ))}
        </Scrollbars>
      </div>
    </div>
  );
}
