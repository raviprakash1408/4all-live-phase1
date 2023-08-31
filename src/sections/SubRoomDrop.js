import { useState } from "react";



export default function RoleDropdown() {
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState("Breakout space 1");
const [hover, setHover] = useState(-1)
  const subRoomList = [{
    id: 1,
    sub_space:'Breakout space 1'
  },
  {
    id: 2,
    sub_space:'Breakout space 2'
  },
  {
    id: 3,
    sub_space:'Breakout space 3'
  }

]
 
  console.log(selected,"selected");
  return (
      <div className="dropdown-subroom" style={{position:'relative',cursor:'pointer'}}>
        <div
          onClick={(e) => {
            setIsActive(!isActive);
          }}
          className="dropdown-btn"
          style={{background:'#012A50',display:'flex',alignItems:'center',justifyContent:'space-between', height:'60px',borderRadius:'4px',boxShadow:'0px 2px 0px rgba(0, 0, 0, 0.016)',color:'#88A1AB',fontSize:'14px',fontFamily:'URW DIN REGULAR',fontWeight:400}}
        >
            <div style={{display:'flex',alignItems:'center'}}>
              <img alt="" src={`${window.location.origin}/assets/images/masked_singer.png`} style={{marginRight:'10px',height:'44px',width:'44px',borderRadius:'4px',objectFit:'cover',paddingLeft:'5px'}} />
            <span style={{
              padding:'11px',
            fontFamily:'URW DIN',display:'flex',flexDirection:'column',whiteSpace: "nowrap",fontSize:'16px',textAlign:'left'}}>Hell’s Kitchen <span style={{color:'#88A1AB',fontFamily:'URW DIN REGULAR',fontWeight:400,lineHeight:'14px'}}>{selected}</span></span>
           </div>
          
          {/* <span
            className={isActive ? "fas fa-caret-up" : "fas fa-caret-down"}
          /> */}
          <div style={{paddingRight:'20px'}}>
          <img alt="" src={!isActive ?`${window.location.origin}/assets/icons/down.svg` : `${window.location.origin}/assets/icons/up.svg`} />

          </div>
        </div>
        <div
        //   className="dropdown-content"
      
          style={{ display: isActive ? "block" : "none",backgroundColor:"#012A50",borderRadius:'4px', color:'#88A1AB',fontSize:'14px',fontFamily:'URW DIN REGULAR',fontWeight:400, zIndex:6,width:'100%',position:'absolute', marginTop:'5px',left:0,boxShadow:'0 0 10px 5px rgba(0, 0, 0, 0.07)' }}
        >
            {subRoomList.map((item, index) => (
  <div
            
//   className="item"
onMouseEnter={() => setHover(index)}
onMouseLeave={() => setHover(-1)}
onClick={() => {
    setIsSelected(item.sub_space);
    setIsActive(!isActive);
  }}
  style={{padding:'12px 10px 12px 75px', textAlign:'left', cursor:'pointer', backgroundColor:hover==index ? '#143F63' : '', color:hover==index ? 'white': ''}}

>

<span >{item.sub_space}</span>

</div>
            ))}
        
         
        </div>
      </div>
  );
}