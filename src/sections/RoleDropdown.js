import {useEffect, useState } from "react";



export default function RoleDropdown(props) {
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState("Moderator");
  function handleBlur(e) {
    console.log(e);
  }
  useEffect(() => {
    setIsSelected(props.default);
  }, [props.default]);
  console.log(selected,"selected");
  return (
      <div className="dropdown">
        <div
          onClick={(e) => {
            setIsActive(!isActive);
          }}
          className="dropdown-btn"
          style={{background:'#012A50',border:'2px solid #032E57',boxShadow:'0px 2px 0px rgba(0, 0, 0, 0.016)',color:'#88A1AB',fontSize:'14px',fontFamily:'URW DIN REGULAR',fontWeight:400}}
        >
          {selected}
          {/* <span
            className={isActive ? "fas fa-caret-up" : "fas fa-caret-down"}
          /> */}
          <img src={`${window.location.origin}/assets/admin/dropdown.svg`} />
        </div>
        <div
          className="dropdown-content"
          style={{ display: isActive ? "block" : "none",backgroundColor:"#012243",border:'2px solid #012A50',borderRadius:'4px', color:'#88A1AB',fontSize:'14px',fontFamily:'URW DIN REGULAR',fontWeight:400 }}
        >
          <div
            
            className="item"
            style={{paddingLeft:'25px'}}

          >
            {/* <label >
  <input type="radio" name="radio" /> */}
  <span onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}>Participant</span>
{/* </label> */}
          </div>
          <div
            className="item"
            style={{paddingLeft:'25px'}}
           
          >
                      {/* <label >
  <input type="radio" name="radio" /> */}
  <span onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}>Viewer</span>
{/* </label> */}
          </div>
          
          <div
            className="item"
            style={{paddingLeft:'25px'}}
           
          >
                      {/* <label >
  <input type="radio" name="radio" /> */}
  <span onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}>Guest</span>
{/* </label> */}
          </div>

      
        </div>
      </div>
  );
}