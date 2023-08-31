import React,{useState} from 'react'
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from 'react-redux';

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const ElementAvatarDropdown = ({item, activeItemSet, checkedList, selected, setCheckedList, handleCheckboxClick, setsubSpaceList, subSpaceList, checkedSelectAll, setIsSelected, setmainRoomId, mainRoomId}) => {
  const [hover, sethover] = useState(-1);
  const [hoversub, sethoversub] = useState(-1);
  const theme = useSelector((state) => state.theme.themeData)

  const [open, setOpen] = useState(false)

  const [itemsChecked, setItemsChecked] = useState(false);
 
  const selectItem = (e) => {
    const { checked } = e.target;
    const collection = [];
    const collectionItem = [];


    if (checked) {
      for (const row of item.subrooms) {
        collection.push(row.id);
        collectionItem.push(row);

      }
    }
    setCheckedList(collection);
    console.log(subSpaceList,"subSpaceListsubSpaceList");
    setsubSpaceList([...subSpaceList, ...collection])
    setIsSelected([...selected, ...collectionItem])

    if (!checked) {
      const demo = []
      const demoItem = []

      for (const role of item.subrooms) {
        demo.push(role.id);
        demoItem.push(role);

      }
    const difference = subSpaceList.filter( ( el ) => !demo.includes( el ) )
    setsubSpaceList([...difference])
    const differenceObjArr = selected.filter( x => !demoItem.filter( y => y.id === x.id).length);
    setIsSelected([...differenceObjArr])

  }
    setItemsChecked(checked);
  };

  return (
    <div>
    <div
      className="item"
      onMouseEnter={() => sethover(item.id)}
      onMouseLeave={() => sethover(-1)}
      
      style={{
        background: hover == item.id ? "#143F63" : "",
        fontSize: hover == item.id ? "14px" : "14px",
        fontFamily: hover == item.id ? "URW DIN" : "URW DIN REGULAR",
        display:'flex', 
        justifyContent:'space-between',
        borderRadius:'4px',
        margin:'0px 5px'
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center" }}
        onClick={() => {
          // activeItemSet(item);
          // setIsActive(!isActive);
        }}
      >
        <Checkbox
          {...label}
          checked={item.subrooms.length == checkedList.length && mainRoomId==item.id ? true : checkedSelectAll ? true : false}
          onClick={selectItem.bind(this)}
          sx={{
            color: hover == item.id ? "#012243" : "#143F63",

            "& .MuiSvgIcon-root": { fontSize: 20 },
            "&.Mui-checked": {
              color: theme?.common?.color1,
            },
          }}
          style={{
            //  width: "30px", height: "30px",
           marginLeft: "-7px" }}
        />
        <img
          src={item?.main_logo}
          style={{
            width: "38px",
            height: "38px",
            border: "2px solid #143F63",
            borderRadius: "50%",
            marginRight: "12px",
          }}
          alt=""
          class="checkbox-style"
        />
        <p style={{ color: "white" }}>{item.name}</p>

        
      </div>
      <img     alt="" onClick={()=>{setOpen(!open);
      setmainRoomId(item.id)}}
      // style={{paddingRight:'10px'}}
              src={open?'/assets/icons/up.svg':'/assets/icons/down.svg'}  />
    </div>
    
    {item.subrooms.map((submenu) => (
        open?
      <div  
      onClick={() => {
        activeItemSet(item, submenu);
        // setIsActive(!isActive);
      }}
      onMouseEnter={() => sethoversub(submenu.id)}
      onMouseLeave={() => sethoversub(-1)}
      style={{display:'flex', alignItems:'center', backgroundColor:hoversub==submenu.id?'#143F63':'#012A50', margin:'10px 5px 10px 45px',borderRadius:'4px', position:'relative',height:'40px',cursor:'pointer'}}>
          
          <div style={{backgroundColor:'#012A50',height:'100%', position:'absolute', display:'flex', alignItems:'center',borderRadius:'4px 0px 0px 4px',padding:'0px 6px'}}>
          <Checkbox
          {...label}
          item={submenu}
          value={submenu.id}
          checked={checkedList.includes(submenu.id)}
          onChange={handleCheckboxClick}
          
          sx={{
            color: "#143F63",
            "& .MuiSvgIcon-root": { fontSize: 20 },
            "&.Mui-checked": {
              color: theme?.common?.color1,

            },
          }}
          style={{ width: "30px", height: "30px", }}
        />
      </div>
        <p style={{ color: "white",fontSize:'14px',paddingLeft:'54px', whiteSpace:'nowrap', width:'138px', overflow: 'hidden', textOverflow:'ellipsis' }}>{submenu.name}</p>

          
      </div>
      :
      <></>
    ))}
   
    </div>
  )
}

export default ElementAvatarDropdown