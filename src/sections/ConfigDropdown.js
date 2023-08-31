import { useEffect, useState } from "react";
import { AxiosLocal } from "../utilities/axiosUtils.ts";

const configroupFun = (name) => {
  if (name == "P") {
    return "Primary";
  } else if (name == "S") {
    return "Secondary";
  } else if (name == "V") {
    return "Viewer";
  } 
};

export default function RoleDropdown(props) {
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState(configroupFun(props.default));
  function handleBlur(e) {
    console.log(e);
  }
  console.log(props,"selected props");
  // useEffect(() => {
  //   setIsSelected(configroupFun(props.default));
  // }, [props.default]);




const changeUserType = (data) => {
    
    if(data == "Primary"){
    
      
         // api call to update the user type
         AxiosLocal.post('user/organisation/relation/edit',{
          user_id:props.user.id,
          viewer_type:"P",
          guestUser: false,

        }).then((res)=>{
          console.log(res.data,"user_type updated");
          props.setRefetch(`refetch${props.user.id}_P`)
        }
        ).catch((err)=>{
          console.log(err,"user_type updated");
        }
        )
    }
      else if(data == "Secondary"){
        
    

            // api call to update the user type
            AxiosLocal.post('user/organisation/relation/edit',{
              user_id:props.user.id,
              viewer_type:"S",
              guestUser: false,
            }).then((res)=>{
              console.log(res.data,"user_type updated");
          props.setRefetch(`refetch${props.user.id}_S`)

            }
            ).catch((err)=>{
              console.log(err,"user_type updated");
            }
            )
      }
      else if(data == "Viewer"){
          
       

              // api call to update the user type
         AxiosLocal.post('user/organisation/relation/edit',{
          user_id:props.user.id,
          viewer_type:"V",
          guestUser: false,
        }).then((res)=>{
          console.log(res.data,"user_type updated");
          props.setRefetch(`refetch${props.user.id}_V`)

        }
        ).catch((err)=>{
          console.log(err,"user_type updated");
        }
        )
      }

  }
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
          <img alt="" src={`${window.location.origin}/assets/admin/dropdown.svg`} />
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
              changeUserType(e.target.textContent)
            }}>Primary</span>
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
              changeUserType(e.target.textContent)
            }}>Secondary</span>
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
              changeUserType(e.target.textContent)
            }}>Viewer</span>
{/* </label> */}
          </div>

       
        </div>
      </div>
  );
}