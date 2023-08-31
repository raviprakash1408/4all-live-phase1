import React,{useState, useRef, useEffect} from 'react'
import DoneIcon from '@mui/icons-material/Done';
import { TextField,InputAdornment, IconButton} from '@mui/material';
import { useSelector } from "react-redux";
import Toast from '../../../sections/Toast';

const EditableField = ({name, setName, handleChange,  handleClick, hover, rowId, row, styles, prevName}) => {
    const theme = useSelector((state) => state.theme.themeData);
    const permissions = useSelector((state) => state.permissions);
    const [message, setMessage] = useState("");
    const [openerrorToast, setOpenerrorToast] = useState(false);


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
      if(name != prevName){
        //  && name != ""
        handleClick();
      setToggle(true);

      }
      // else{
      //   setOpenerrorToast(true);
      //     setMessage("The field can't be empty. Please add right name.");
      // }

    }
  };
const [hoverIcon, sethoverIcon] = useState(false)
const [hoverName, sethoverName] = useState(false)
const [toggle, setToggle] = useState(true)


  return (
    <>
      {toggle ? (
        <div
          key={name}
          style={{ display: "flex" }}
          onMouseEnter={() => sethoverName(true)}
          onMouseLeave={() => sethoverName(false)}
        >
          <span
            style={{
              fontFamily: styles ? "URW DIN REGULAR" : "URW DIN",
              position: "relative",
            }}
            // onDoubleClick={(e) => {
            //   setToggle(false);
            // }}
          >
            {name}
            {hoverName ? (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <img
                  src="/assets/admin/edit.svg"
                  style={{
                    padding: "0px 20px 0px 20px",
                    filter:
                      "brightness(0) saturate(100%) invert(68%) sepia(33%) saturate(186%) hue-rotate(152deg) brightness(86%) contrast(88%)",
                    position: "absolute",
                    right: "-40px",
                    width: "14px",
                    marginTop: "5px",
                  }}
                  alt=""
                  className="editIcon"
                  onClick={() => {
                    setToggle(false);
                  }}
                />
              </span>
            ) : (
              <></>
            )}
          </span>
        </div>
      ) : (
        <TextField
          ref={warpperRef}
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
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: "1px solid",

              borderColor: hover || rowId == row?.id ? "#88A1AB" : "#143F63",

              borderRadius: "4px",
              color: theme?.profile?.primaryColor,
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: "1px solid",

              borderColor: hover || rowId == row?.id ? "#88A1AB" : "#143F63",

              borderRadius: "4px",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: "1px solid",

                borderColor: hover || rowId == row?.id ? "#88A1AB" : "#143F63",

                borderRadius: "4px",
              },
          }}
          InputLabelProps={{
            style: { color: "#5D7C90" },
          }}
          InputProps={{
            endAdornment: (
              <>
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color="secondary"
                  >
                    <img
                      alt=""
                      src="/assets/admin/close-icon.svg"
                      style={{
                        width: "10px",
                        height: "10px",
                        filter:
                          "brightness(0) saturate(100%) invert(58%) sepia(2%) saturate(3141%) hue-rotate(154deg) brightness(111%) contrast(78%)",
                      }}
                      onClick={() => {
                        setName(prevName);
                        setToggle(true);
                      }}
                    />
                  </IconButton>
                </InputAdornment>
                <InputAdornment position="end">
                  <IconButton
                    onMouseEnter={() => sethoverIcon(true)}
                    onMouseLeave={() => sethoverIcon(false)}
                    aria-label="toggle password visibility"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color="secondary"
                  >
                    <DoneIcon
                      style={{
                        width: "15px",
                        height: "15px",
                        color: hoverIcon ? "#008BCD" : "#88A1AB",
                      }}
                      onClick={() => {
                         if (name != "") {
                          if(name != prevName){
                           handleClick();

                          }
                           setToggle(true);
                         } else {
                           setOpenerrorToast(true);
                           setMessage(
                             "The field can't be empty. Please add right name."
                           );
                         }
                        }}
                    />
                  </IconButton>
                </InputAdornment>
              </>
            ),
          }}
          type="text"
          value={name}
          onChange={handleChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setToggle(true);
              event.preventDefault();
              event.stopPropagation();
              handleClick();
            }
          }}
          autoFocus
        />
      )}
      <Toast
        openToast={openerrorToast}
        setOpenToast={setOpenerrorToast}
        message={message}
        type="error"
      />
    </>
  );
}

export default EditableField