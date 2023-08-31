import { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TeamRoleSearchDropElement from "./TeamRoleSearchDropElement";
import { isEmpty } from "../../utilities/common";
import { useSelector } from "react-redux";

export default function TeamRoleSearchDrop({
  userId,
  role,
  loader,
  setLoader,
  departments,
  setdepartments,
  rootRoles,
  changeRole,
  loading,
  setLoading,
  componentFor,
  hover,
  viewType,
}) {
  const theme = useSelector((state) => state.theme.themeData);

  const [isActive, setIsActive] = useState(false);

  const [selected, setIsSelected] = useState(
    !isEmpty(role) && role?.name != "" ? role?.name : "Participant"
  );

  const [selectedDepartment, setselectedDepartment] = useState(
    !isEmpty(role) && role?.department?.name != ""
      ? role?.department?.name
      : "Default"
  );
  //search
  useEffect(() => {
    departments.forEach((element) => {
      console.log(element, "roleDeptItem");
    });
  }, []);

  const handleChange = (event) => {
    const searchWord = event.target.value;
    console.log(searchWord, "searchUsersearchUser");
    const searchWordLower = searchWord.toLowerCase();

    let newFilter = departments.filter((item) => {
      return item.roles.some((role) =>
        role.name.toLowerCase().includes(searchWordLower)
      );
    });

    setdepartments(newFilter);

    if (searchWord == "") {
      setdepartments([...departments]);
    }
  };

  //outside click close

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

  const [rolePosition, setrolePosition] = useState({
    top: warpperRef?.current?.getBoundingClientRect(),
    left: warpperRef?.current?.getBoundingClientRect(),
  });

  useEffect(() => {
    if (warpperRef.current) {
      let topPosition = warpperRef?.current?.getBoundingClientRect().y + 35;
      if (
        window.innerHeight - warpperRef.current.getBoundingClientRect().y <
        300
      ) {
        topPosition = warpperRef?.current?.getBoundingClientRect().y - 270;
      }
      setrolePosition({
        top: topPosition,
        left: warpperRef?.current?.getBoundingClientRect().x,
      });
    }
  }, [warpperRef?.current?.getBoundingClientRect().y]);

  return (
    <div className="dropdownRole" ref={warpperRef}>
      <div
        onClick={(e) => {
          setIsActive(!isActive);
        }}
        className="dropdown-btn"
        style={{
          background: hover ? theme?.team?.hover : theme?.team?.participant,
          border: hover ? theme?.team?.hoverborder : theme?.team?.border,
          boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.016)",
          color: theme?.team?.color,
          fontSize: "14px",
          fontFamily: "URW DIN REGULAR",
          fontWeight: 400,
          height: "14px",
          backgroundColor:theme?.team?.participant,
          // border:"1px solid ",
          borderColor:theme?.team?.border,
        

          // width: "100%",
        }}
      >
        {role?.name == selected ? role?.name : selected}

        {/* <span
            className={isActive ? "fas fa-caret-up" : "fas fa-caret-down"}
          /> */}
        <img
          alt=""
          src="/assets/admin/down.svg"
          style={{
            filter: hover
              ? "brightness(0) saturate(100%) invert(13%) sepia(43%) saturate(2609%) hue-rotate(186deg) brightness(100%) contrast(103%)"
              : "",
          }}
        />
      </div>
      <div
        className="dropdownRole-content"
        style={{
          ...rolePosition,
          display: isActive ? "block" : "none",
          backgroundColor: theme?.team?.dropdown,

          border: theme?.team?.border,
          borderRadius: "4px",
          color: theme?.common?.color3,

          fontSize: "14px",
          fontFamily: "URW DIN REGULAR",
          fontWeight: 400,
          zIndex: 1300,
          position: "fixed",
          opacity: 1,
          height: "250px",
          overflow: "scroll",
        }}
      >
        {/* <Paper
          component="form"
          sx={{
            p: "2px 2px",
            display: "flex",
            alignItems: "center",
            width: "258",
            margin: "10px",
            height: "33px",
            backgroundColor: "#012243",
          }}
          style={{
            zIndex: "5",
            boxShadow: "none",
            border: "2px solid",
            borderColor: "#143F63",
          }}
        >
          <IconButton
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
            style={{ color: "#88A1AB" }}
          >
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search role"
            inputProps={{ "aria-label": "Search role" }}
            onChange={(event) => handleChange(event)}
            style={{
              fontSize: "14px",
              color: "#88A1AB",
              fontFamily: "URW DIN REGULAR",
            }}
          />
        </Paper> */}
        {departments?.map((item, index) => (
          <TeamRoleSearchDropElement
            userId={userId}
            item={item}
            setIsSelected={setIsSelected}
            setIsActive={setIsActive}
            isActive={isActive}
            selected={selected}
            setLoading={setLoading}
            loader={loader}
            setLoader={setLoader}
            changeRole={changeRole}
            componentFor={componentFor}
            selectedDepartment={selectedDepartment}
            setselectedDepartment={setselectedDepartment}
            rolePosition={rolePosition}
            viewType={viewType}
          />
        ))}

        {rootRoles?.map((item, index) => (
          <div
            style={{ marginTop: "10px" }}
            className="item"
            key={item.id}
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setselectedDepartment("");
              setIsActive(!isActive);
              console.log(e.target, item.id, "changeRole");
              changeRole(item, componentFor, userId);
              // ChangeCircleOutlined()
            }}
          >
            <div
              style={{
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
                  width: "19px",
                  height: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "10px",
                  marginLeft: "2px",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: theme?.team?.folder,
                  padding: "8px 10px",
                  borderRadius: "4px 0px 0px 4px",
                }}
              >
                <img
                  alt=""
                  style={{ marginTop: "2px" }}
                  src="/assets/admin/branch.svg"
                />
              </div>
              <div
                style={{
                  color: theme?.team?.color,
                  height: "100%",
                  width: "100%",
                  backgroundColor:
                    selected == item.name
                      ? theme.common.color1
                      : theme?.team?.participant,
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
          </div>
        ))}
      </div>
    </div>
  );
}
