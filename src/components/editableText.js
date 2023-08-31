import React from "react";
import { useEffect, useState,useRef } from "react";
import { TextField,InputAdornment, IconButton} from '@mui/material';
import { useSelector } from "react-redux";
import DoneIcon from '@mui/icons-material/Done';

export default function EditableText(props) {
    const theme = useSelector((state) => state.theme.themeData);
  
  const [newvalue, setnewvalue] = useState("");
  
  const [isEditing, setisEditing] = useState(false);
  const warpperRef = useRef(null)
  const currentText = useRef({currentValue:null,previousValue:null})




  const onSave = ()=>{
    if(currentText.current != null)
    {   props.onSave(newvalue);
     
        currentText.current = {
            currentValue:newvalue,
            previousValue:currentText.current.currentValue
        }
       
      
   
   }
        
   setisEditing(false);
  }
  
  useEffect(() => {
   
    currentText.current.previousValue =props.value

    currentText.current.currentValue =props.value
    setnewvalue(props.value)
  }, [props.value]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    const { current: wrap } = warpperRef;
    if (wrap && !wrap.contains(event.target)) {
        console.log(currentText.current                                     ,"currentText");
        onSave()
 

    }
  };

  return (
    <div ref={warpperRef}  onClick={(e) => e.stopPropagation()}>
      {isEditing ? (
        // <input value={newvalue} onChange={e=>setnewvalue(e.target.value)} />
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          sx={{
            "& .MuiInputLabel-root": {
              fontSize: "14px",
              height: "25px",
              marginTop: "0px",
            },
            "& .MuiOutlinedInput-root": {
              fontSize: "14px",
              height: "25px",
              marginTop: "0px",
            },

            "& .MuiOutlinedInput-input": {
              fontFamily: "URW DIN REGULAR",
              fontSize: "14px",

              color: theme?.profile?.primaryColor,
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
              {
                border: "1px solid",

                borderColor: "#143F63",

                borderRadius: "4px",
                color: theme?.profile?.primaryColor,
              },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
              {
                border: "1px solid",

                borderColor: "#143F63",

                borderRadius: "4px",
              },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: "1px solid",

                borderColor:"#143F63",

                borderRadius: "4px",
              },
          }}
          InputLabelProps={{
            style: { color: "#5D7C90" },
          }}

          InputProps={{
          
            endAdornment:(
              <>
              <InputAdornment
              
              position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  color="secondary"
                  onClick={()=>{
                    // setisEditing(false);
                   setnewvalue( currentText.current.previousValue)
                  }}
                >
              <img
              alt=""
        src="/assets/admin/close-icon.svg" style={{width:'10px', height:'10px',   filter: 'brightness(0) saturate(100%) invert(58%) sepia(2%) saturate(3141%) hue-rotate(154deg) brightness(111%) contrast(78%)'}} />
                </IconButton>
              
               
              </InputAdornment>
              <InputAdornment position="end">

              <IconButton
            
              aria-label="toggle password visibility"
              edge="end"
              color="secondary"
              >
              <DoneIcon
              onClick={()=>{
                onSave()
              }}
              style={{width:'15px', height:'15px', color:'#88A1AB'}} />
               </IconButton>
            </InputAdornment>
</>
            ),
          }}
          type="text"
          value={newvalue} 
          onChange={e=>setnewvalue(e.target.value)} 
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.stopPropagation();
            //   handleClick();
            }
          }}
          autoFocus
        />
      ) : (
        <div style={{
            position:"relative",
            display:"flex",
            alignItems: "center"
            
        }}
        className="editIconParent"
        >
       
          <p
          onDoubleClick={()=>setisEditing(currentValue=>!currentValue) }
          >{newvalue}</p>
          <img
            src="/assets/admin/edit.svg"
            style={{
              padding: "0px 20px 0px 20px",
              position: "absolute",
              right: "-45px",
              width: "14px",
            
            }}
            alt=""
            className="editIcon"
            onClick={() => {
                setisEditing(currentValue=>!currentValue)
            }}
          />
        </div>
      )}
    </div>
  );
}
