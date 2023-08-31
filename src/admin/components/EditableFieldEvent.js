import React, { useState, useRef, useEffect } from 'react'
import DoneIcon from '@mui/icons-material/Done';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { useSelector } from "react-redux";
import { AxiosLocal } from '../../utilities/axiosUtils.ts';
import Toast from '../../sections/Toast';
import CustomTooltip from '../CustomTooltip.js';
import CopiedToClip from '../CopiedToClip.js';

const EditableFieldEvent = ({ hover, rowId, row, styles, prevName, type, hovered }) => {
  const theme = useSelector((state) => state.theme.themeData);
  //outside click
  const warpperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);
   const [state, setState] = React.useState({
     openCopyToast: false,
     vertical: "top",
     horizontal: "center",
   });

   // const { vertical, horizontal, openCopyToast } = state;

   const handleClickCopy = (newState) => () => {
     setState({ openCopyToast: true, ...newState });
   };

   const handleClose = () => {
     setState({ ...state, openCopyToast: false });
   };

  const handleClickOutside = (event) => {
    const { current: wrap } = warpperRef;
    if (wrap && !wrap.contains(event.target)) {
      if (name != prevName) {
        handleClick();

      }
      setToggle(true);

    }
  };
  const [hoverIcon, sethoverIcon] = useState(false)
  const [hoverName, sethoverName] = useState(false)

  useEffect(() => {
    sethoverName(hovered)
  }, [hovered])

  const [toggle, setToggle] = useState(true)
  const [name, setName] = useState(prevName)
  const [editToast, seteditToast] = useState(false)
  const handleClick = () => {
    if (type == "space") {
      AxiosLocal.post(`event/edit/${row.id}/`, {
        name: name,
      }).then((response) => {
        if (response.data.status == "Success") {
          seteditToast(true);

        }
      });
    } else if (type == "subspace") {
      AxiosLocal.post(`subroom/edit/${row.slug}`, {
        name: name,
      }).then((response) => {
        if (response.data.status == "Success") {
          seteditToast(true);

        }
      });
    }
  }

  return (
    <>
      {toggle ? (
        <div
          style={{ display: "flex", position: "relative" }}
          //  onMouseEnter={() => sethoverName(true)}
          //  onMouseLeave={() => sethoverName(false)}
          onClick={(e) => e.stopPropagation()}
        >
          <p
            style={{
              margin: "0px",
              fontFamily: styles ? "URW DIN REGULAR" : "URW DIN",
            }}
            onDoubleClick={() => {
              setToggle(false);
            }}
          >
            {name}
            {/* {prevName} */}
          </p>
          {hoverName ? (
            <CustomTooltip text="Edit" placement="top">
              <img
                src="/assets/admin/edit.svg"
                style={{
                  padding: "0px 20px 0px 20px",
                  filter:
                    "brightness(0) saturate(100%) invert(12%) sepia(36%) saturate(4327%) hue-rotate(190deg) brightness(93%) contrast(101%)",
                  position: "absolute",
                  right: "-45px",
                  width: "14px",
                  marginTop: "5px",
                }}
                alt=""
                className="editIcon"
                onClick={() => {
                  setToggle(false);
                }}
              />
            </CustomTooltip>
          ) : (
            <></>
          )}
          {hoverName ? (
            <CustomTooltip text="Copy space slug" placement="top">
              <img
                src="/assets/admin/copy.svg"
                style={{
                  padding: "0px 20px 0px 20px",
                  filter:
                    "brightness(0) saturate(100%) invert(12%) sepia(36%) saturate(4327%) hue-rotate(190deg) brightness(93%) contrast(101%)",
                  position: "absolute",
                  right: "-70px",
                  width: "14px",
                  marginTop: "5px",
                }}
                alt=""
                className="editIcon"
                onClick={() => {
                  navigator.clipboard.writeText(row.slug);
                }}
                
              />
            </CustomTooltip>
          ) : (
            <></>
          )}
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
                    onClick={() => {setToggle(true); setName(prevName);}}
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
                    />
                  </IconButton>
                </InputAdornment>
                <InputAdornment position="end">
                  <IconButton
                    onMouseEnter={() => sethoverIcon(true)}
                    onMouseLeave={() => sethoverIcon(false)}
                    aria-label="toggle password visibility"
                    onClick={() => {
                      handleClick();
                      setToggle(true);
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
                    />
                    {/* <img
                            alt=""
                            src="/assets/admin/close-icon.svg" style={{width:'10px', height:'10px', marginLeft:'-15px'}} /> */}
                  </IconButton>
                </InputAdornment>
              </>
            ),
          }}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setToggle(true);
              event.preventDefault();
              event.stopPropagation();
              handleClick();
            }
          }}
          onClick={(e) => e.stopPropagation()}
          autoFocus
        />
      )}
      <CopiedToClip state={state} handleClose={handleClose} />

      <Toast
        openToast={editToast}
        setOpenToast={seteditToast}
        message="Event Updated Successfully"
      />
    </>
  );
}

export default EditableFieldEvent