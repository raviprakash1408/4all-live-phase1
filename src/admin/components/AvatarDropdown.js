import { useEffect, useState, useRef } from "react";
// import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Scrollbars } from "react-custom-scrollbars";
import ElementTeamRoleSearchDrop from "./ElementTeamRoleSearchDrop";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import ElementAvatarDropdown from "./ElementAvatarDropdown";
import { useSelector } from "react-redux";


const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function AvatarDropdown({ row, allRooms, isOnlineList }) {
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState([...row.spaces]);
  const theme = useSelector((state) => state.theme.themeData);
  // const [mainRoomObj, setmainRoomObj] = useState({})
  // const [subroomList, setsubroomList] = useState([])
  const activeItemSet = (mainRoom, item) => {
    // if (selected.some((el) => item.id == el.id)) {
    //   let filtereArr = selected.filter((ele) => ele.id != item.id);
    //   setIsSelected([...filtereArr]);
    // } else {
    //   setIsSelected([...selected, item]);

    // }
 
    if(selected.some((el) => mainRoom.id == el.id)){
      let obj = selected.find(room => room.id === mainRoom.id);
      if(obj.subrooms.some((subroom) => item.id == subroom.id)){
        let result = selected.filter(obj => {
          return obj.id === mainRoom.id
        })
  
        const filteredMainSpace = result[0].subrooms.filter((subroom) => item.id !== subroom.id);
        const newArr = selected.map(obj => {
          if (obj.id === mainRoom.id) {

            return {...obj, subrooms: filteredMainSpace};
          }
        
          return obj;
        });
        setIsSelected([...newArr])
  
      }else{
        let result = selected.filter(obj => {
          return obj.id === mainRoom.id
        })
        const subroomArr = result[0].subrooms
        const subroomArrList = [...subroomArr, item]
        const newArr = selected.map(obj => {
          if (obj.id === mainRoom.id) {
            return {...obj, subrooms: subroomArrList};
          }
        
          return obj;
        });
        setIsSelected([...newArr])
      }
     
     
    }else{
  
      const selectedSpace = {}
     
      Object.assign(selectedSpace, {id:mainRoom.id, name: mainRoom.name, menu_logo: mainRoom.menu_logo, subrooms: []})
      selectedSpace.subrooms.push(item);
      setIsSelected([...selected, selectedSpace])
     
  };
}

  //search
  const [searchArr, setsearchArr] = useState([...allRooms]);
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

  //checkbox multiple

  const [checkedList, setCheckedList] = useState([]);
  const [subSpaceList, setsubSpaceList] = useState([]);

 
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

  const [checkedSelectAll, setcheckedSelectAll] = useState(false)
 const selectItemAll = (e) => {
  const { checked } = e.target;

  let subSpaceIds = []
  let subSpace = []

  if (checked) {
  
  allRooms.map((item)=>{
    item.subrooms.map((space)=>{
      subSpaceIds.push(space.id)
      subSpace.push(space)

    })
  })
  setCheckedList([...subSpaceIds])
  // setIsSelected([...subSpace])
  setIsSelected([...allRooms])

 }else{
  setCheckedList([])
  setIsSelected([])

}
setcheckedSelectAll(checked)
}
const [mainRoomId, setmainRoomId] = useState(-1)

 //outside click

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
  return (
    <div
    ref={warpperRef}

      className="dropdownEventCircle"
      style={{ marginRight: "10px", marginLeft: "5px", position:'relative', minWidth: '205px',margin: '0 auto' }}
    >
      <div
        onClick={(e) => {
          setIsActive(!isActive);
        }}
        className="dropdown-btn"
        style={{
          boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.016)",
          color: "#88A1AB",
          fontSize: "14px",
          fontFamily: "URW DIN REGULAR",
          fontWeight: 400,
          height: "33px",
        //   backgroundColor: "#021934",
          // marginTop: "-5px",
        }}
      >
        {selected?.length ? (
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

        {/* {selected?.length > 4 ? (
          <div style={{ display: "flex" }}>
            {selected.slice(0, 4).map((item) => (
              <img
                src={item?.menu_logo}
                style={{
                  width: "40px",
                  height: "40px",
                  border: isOnlineList(row.id,row.slug)?`2px solid #008bcd`:`2px solid #FF1759`,
                  // border: `2px solid #FF1759`,
                  borderRadius: "50%",
                //   marginRight: "2px",
                }}
              />
            ))}
            <div
              style={{
                backgroundColor: "#002E56",
                textAlign: "center",
                verticalAlign: "middle",
                lineHeight: "40px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                // marginRight: "4px",
                color: "#88A1AB",
                border: "2px solid #143F63",
              }}
            >
              +{selected?.length - 4}
            </div>
          </div>
        ) : ( */}
          <div style={{ display: "flex" }}>
            {selected.map((item) => (
              <>
              <span style={{position:"relative",marginLeft:'-7px'}}>
                <img alt="" src={item?.menu_logo} style={{width: "40px",height: "40px",border: isOnlineList(row.id,item.slug)?`2px solid #008bcd`:`2px solid #FF1759`,borderRadius: "50%",overflow:'hidden',fontFamily: "URW DIN"}} />
                <div style={{ display: "flex", alignItems:'center',position:'absolute',bottom:'3px', right:'-10px' }} >
                  <div style={{width:'20px',height:'20px',display:'flex',alignItems:'center',justifyContent:'center',color:'#88A1AB',backgroundColor:'#143F63',fontSize:'10px',borderRadius:'50%',marginRight:'13px'}}>
                    {item?.subrooms?.length}
                  </div>
                </div>
              </span>
              </>
            ))}
          </div>
        {/* )} */}
        {/* <span
            className={isActive ? "fas fa-caret-up" : "fas fa-caret-down"}
          /> */}
        <img alt="" src="" style={{ marginLeft: "5px" }} />
      </div>
      <div
        className="dropdown-event-content-circle"
        style={{
          display: isActive ? "block" : "none",
          backgroundColor: "#012243",
          border: "2px solid #012A50",
          borderRadius: "4px",
          color: "#88A1AB",
          fontSize: "14px",
          fontFamily: "URW DIN REGULAR",
          fontWeight: 400,
          position:'absolute',
          left:'-20px',
          marginTop:'10px'
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 2px",
            display: "flex",
            alignItems: "center",
            width: "258",
            margin: "10px 5px",
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
            sx={{ p: "10px 2px 10px 10px" }}
            aria-label="search"
            style={{ color: "#88A1AB" }}
          >
            <img alt="" src="/assets/admin/searchsmall.svg" />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search space"
            inputProps={{ "aria-label": "Search member" }}
            onChange={(event) => handleChange(event)}
            style={{
              fontSize: "14px",
              color:theme?.common?.color3,

              fontFamily: "URW DIN REGULAR",
            }}
          />
        </Paper>
        {/* <div style={{display:'flex', justifyContent:'end', marginRight:'10px', alignItems:'center'}}>
        <p>Select all</p>
        <Checkbox
          {...label}
          // checked={item.subrooms.length == checkedList.length}
          onClick={selectItemAll}
          sx={{
            color:  "#143F63",

            "& .MuiSvgIcon-root": { fontSize: 20 },
            "&.Mui-checked": {
              color: "#008BCD",
            },
          }}
          style={{
             width: "25px", height: "25px",
           marginLeft: "5px", }}
        />
        </div> */}
        <Scrollbars style={{ width: "100%", height: "200px" }}>
          {allRooms.map((item) => (
          <div onClick={()=> setmainRoomId(item.id)}>
<ElementAvatarDropdown item={item} selected={selected} activeItemSet={activeItemSet} checkedList={checkedList} setCheckedList={setCheckedList} handleCheckboxClick={handleCheckboxClick} setsubSpaceList={setsubSpaceList} subSpaceList={subSpaceList} checkedSelectAll={checkedSelectAll} setIsSelected={setIsSelected}setmainRoomId={setmainRoomId} mainRoomId={mainRoomId}/>
          </div>

          ))}
        </Scrollbars>
      </div>
    </div>
  );
}
