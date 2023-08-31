import React,{useState} from 'react'
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from 'react-redux';


const label = { inputProps: { "aria-label": "Checkbox demo" } };

const ElementTeamRoleSearchDrop = ({
  spaceChanged, 
  setspaceChanged, 
  checkedMainSpaceIds, 
  checkedSubSpaceIds, 
  item, 
  activeItemSet, 
  checkedList, 
  selected, 
  setCheckedList, 
  handleCheckboxClick, 
  setsubSpaceList, 
  subSpaceList, 
  checkedSelectAll, 
  setIsSelected, 
  setmainRoomId, 
  mainRoomId,
  componentFor,
  spaceChange,
  userId
}) => {
  const [hover, sethover] = useState(-1);
  const [hoversub, sethoversub] = useState(-1);
  const theme = useSelector(state => state.theme.themeData)


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

  const handleCheckboxChange = (event,checkType) => {
    console.log(event.target.checked,checkType,"allCheckChange");
  };

  return (
    <div>
    <div onClick={()=>{setOpen(!open); setmainRoomId(item.id)}} className="item" onMouseEnter={() => sethover(item.id)} onMouseLeave={() => sethover(-1)} style={{background: hover == item.id ? theme?.team?.hover  : "",fontSize: hover == item.id ? "14px" : "14px",fontFamily: hover == item.id ? "URW DIN" : "URW DIN REGULAR",display:'flex', justifyContent:'space-between',borderRadius:'4px',margin:'0px 5px'}}>
      <div style={{ display: "flex", alignItems: "center" }} >
        <Checkbox {...label}
          // checked={item.subrooms.length == checkedList.length && mainRoomId==item.id ? true : checkedSelectAll ? true : false}
          checked={checkedMainSpaceIds.includes(item.id)}
          onChange={(event)=>{
            handleCheckboxChange(event,"mainRoom")
            activeItemSet(item, null, "main",event.target.checked)
            setspaceChanged(!spaceChanged)
            // spaceChange(selected, userId, componentFor)
          }}
          sx={{ color: hover == item.id ? theme?.team?.checkboxhover :  theme?.team?.checkboxborder,"& .MuiSvgIcon-root": { fontSize: 20 },"&.Mui-checked": {color: theme?.common?.color1,
          }}}
          style={{ marginLeft: "-7px" }}
        />
        <img src={item?.main_logo} style={{width: "36px",height: "36px",border: "2px solid #143F63",borderRadius: "4px",marginRight: "12px"}} class="checkbox-style" />
        <p style={{ color: theme?.team?.textcolor,width:'100%' }} >{item.name}</p>
      </div>
      <img src={open?'/assets/icons/up.svg':'/assets/icons/down.svg'}  />
    </div>
    
    {item.subrooms.map((submenu) => (
        open && !submenu.is_master?
      <div 
        onMouseEnter={() => sethoversub(submenu.id)}
        onMouseLeave={() => sethoversub(-1)}
        style={{display:'flex', alignItems:'center', backgroundColor:hoversub==submenu.id?theme?.team?.hover:theme?.team?.participant, margin:'10px 5px 10px 45px',borderRadius:'4px', position:'relative',height:'40px',cursor:'pointer',border:theme?.team?.border}}>
          <div style={{backgroundColor:theme?.team?.participant,height:'100%', position:'absolute', display:'flex', alignItems:'center',borderRadius:'4px 0px 0px 4px',padding:'0px 6px'}}>
            <Checkbox {...label} 
            item={submenu} value={submenu.id} 
            checked={checkedSubSpaceIds.includes(submenu.id)} 
            onChange={(event)=>{
            activeItemSet(item, submenu, "individual",event.target.checked)
            setspaceChanged(!spaceChanged)
          }}
            sx={{ color: theme?.team?.checkboxborder,
              "& .MuiSvgIcon-root": { fontSize: 20 },
              "&.Mui-checked": {
              color: theme?.common?.color1,
            },
          }}
          style={{ width: "30px", height: "30px", }}
        />
      </div>
        <p style={{ color: theme?.team?.textcolor,fontSize:'14px',paddingLeft:'54px', whiteSpace:'nowrap', width:'138px', overflow: 'hidden', textOverflow:'ellipsis' }}>{submenu.name}</p>
      </div>
      :
      open && submenu.is_master && item.subrooms.length == 1?
      <div 
        onMouseEnter={() => sethoversub(submenu.id)}
        onMouseLeave={() => sethoversub(-1)}
        style={{display:'flex', alignItems:'center', backgroundColor:hoversub==submenu.id?theme?.team?.viewtype:theme?.team?.bgColor, margin:'10px 5px 10px 45px',borderRadius:'4px', position:'relative',height:'40px',cursor:'pointer'}}>
          
        <p style={{ color: theme?.team?.textcolor,fontSize:'14px',paddingLeft:'54px', whiteSpace:'nowrap', width:'138px', overflow: 'hidden', textOverflow:'ellipsis' }}>No sub spaces added</p>
      </div>
      :
      <></>
    ))}
    </div>
  )
}

export default ElementTeamRoleSearchDrop