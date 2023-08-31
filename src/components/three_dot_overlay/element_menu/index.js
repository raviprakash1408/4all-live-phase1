import { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { useSelector } from "react-redux";

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
const ElementMenu = ({
  user,
  icon,
  label,
  sub,
  is_audio,
  onClick,
  selected,
  theme,
  updateVolumeLocal,
}) => {
   const volumes = useSelector((state) => state.controlpanel.volumes);
  //filter volumes by user id
  let userVolume = volumes.filter((volume) => volume.user_id == user.userId);
    
  const [is_hover, setHover] = useState(false);
  const [volumn, setVolumn] = useState(45);
  const [value, setvalue] = useState();
  const [audioMuted, setaudioMuted] = useState(false);
  useEffect(() => {
    setvalue(userVolume[0]?.volume);
  }, [userVolume]);
  useEffect(() => {
    if (user) {
      setaudioMuted(user.audio == "muted");
    }
  }, [user, user.audio]);

  const handleChange = (event, newValue) => {
    debounce(() => setVolumn(newValue));
    console.log(newValue, "newValue");
    setvalue(newValue);
  };

  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        // gap: "7px",
        padding: " 6px 9px",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: selected ? "#008BCD" : "none",
        fontFamily: "URW DIN REGULAR",
        fontSize: "16px",
        fontWeight: 400,
        color: selected ? "#E1E7EA" : "#88A1AB",
        margin: "0px -5px",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {icon && (
        <div
          style={{
            display: "flex",
            width: "25px",
            height: "25px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img alt="" src={icon} />
        </div>
      )}

      <div
        style={{
          whiteSpace: "nowrap",
          marginLeft: "15px",
          marginRight: "20px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          display: !!sub ? "flex" : "none",
          position: "absolute",
          height: "100%",
          top: "0px",
          right: "20px",
          alignItems: "center",
          marginRight: "5px",
        }}
      >
        <img  alt="" src="/assets/three_dot_overlay_icons/arrow_right.svg" />
      </div>

      {!!sub && is_hover ? sub : null}

      <div
        style={{
          position: "absolute",
          display: is_audio ? "flex" : "none",
          width: "100%",
          height: "100%",
          top: "0px",
          left: "0px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            paddingLeft: "40px",
            paddingRight: "20px",
            alignItems: "center",
          }}
        >
          {/* <div
                        style={
                            {
                                position: "relative",
                                display: "flex",
                                width: "100%",
                                height: "4px",
                                backgroundColor: "#012A50"
                            }
                        }
                    > */}
          {/* <div
                            style={
                                {
                                    position: "absolute",
                                    width: "100%",
                                    height: "15px",
                                    top: "-5px",
                                    left: "0px"
                                }
                            }

                            onClick={ (e) =>
                                {
                                    const rect = e.target.getBoundingClientRect()
                                    //console.log(e.clientX - rect.left, "----------------- Mouse X")
                                    //console.log(rect.width, "----------------- Width")

                                    setVolumn(((e.clientX - rect.left) / rect.width) * 100)
                                }
                            }
                        /> */}

          <Slider
            aria-label="Volume"
            disabled={audioMuted}
            value={value}
            // onChange={handleChange}
            onChange={(e) => {
              console.log(e.target.value);
              // setvolume(e.target.value);
              if (value != e.target.value) {
                updateVolumeLocal(e.target.value);
                setvalue(e.target.value);
              }
            }}
            sx={{
              width: 110,
              color: audioMuted ? "#143F63 !important" : theme?.button_color_0,
              height: 2,
              marginLeft: "6px",
              borderRadius: "0px",
              "& .MuiSlider-thumb": {
                border: "2px solid",
                borderColor: audioMuted ? "#143F63" : theme?.button_color_0,
                color: audioMuted ? "#143F63" : "#E1E7EA",
                // boxShadow: '0 0 0 2px rgba(0, 255, 0, 0.3) !important'
                width: "17px",
                height: "17px",
              },
              "& .MuiSlider-thumb:hover": {
                // boxShadow: '0 0 0 2px rgba(0, 255, 0, 0.3) !important'
              },
            }}
          />

          {/* <div
                            style={
                                {
                                    position: "absolute",
                                    display: "flex",
                                    width: (volumn)+"%",
                                    height: "4px",
                                    backgroundColor: "#008BCD",
                                    pointerEvents: "none"
                                }
                            }
                        />

                        <div
                            style={
                                {
                                    position: "absolute",
                                    display: "flex",
                                    width: "10px",
                                    height: "10px",
                                    top: "-5px",
                                    left: (volumn - 5)+"%",
                                    backgroundColor: "white",
                                    border: "2px solid",
                                    borderColor: "#008BCD",
                                    borderRadius: "100%"
                                }
                            }
                        /> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default ElementMenu;
