import { useState } from "react";
import { useSelector } from 'react-redux';





export default function SortByFileManager({type, theme}) {
  const themes = useSelector(state => state.theme.themeData)

  
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState("Sort by");
  function handleBlur(e) {
    console.log(e);
  }
  console.log(selected,"selected");
  return (
    <div className="dropdown">
      <div
        onClick={(e) => {
          setIsActive(!isActive);
        }}
        className="dropdown-btn"
        style={{
          background: type == "fileManger" ? theme?.bg_color_1 : "#012A50",
          backgroundColor:themes.addSpace.bgColor,
          border:`0px solid ${themes.addmember.checkboxcolor4}`,
          boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.016)",
          color: "#88A1AB",
          fontSize: "14px",
          fontFamily: "URW DIN REGULAR",
          fontWeight: 400,
        }}
      >
        {selected}
        {/* <span
            className={isActive ? "fas fa-caret-up" : "fas fa-caret-down"}
          /> */}
        <img alt="" src="/assets/admin/dropdown.svg" />
      </div>
      <div
        className="dropdown-content"
        style={{
          display: isActive ? "block" : "none",
          backgroundColor: theme?.bg_color_1? theme?.bg_color_1: themes?.addmember?.checkboxcolor2,
          border: `2px solid ${theme?.bg_color_1? theme?.bg_color_1: ""}`,
          borderRadius: "4px",
          color: "#88A1AB",
          fontSize: "14px",
          fontFamily: "URW DIN REGULAR",
          fontWeight: 400,
        }}
      >
        <div className="item">
          <label>
            <input type="radio" name="radio" />
            <span
              onClick={(e) => {
                setIsSelected(e.target.textContent);
                setIsActive(!isActive);
              }}
            >
              A-Z
            </span>
          </label>
        </div>
        <div className="item">
          <label>
            <input type="radio" name="radio" />
            <span
              onClick={(e) => {
                setIsSelected(e.target.textContent);
                setIsActive(!isActive);
              }}
            >
              Z-A
            </span>
          </label>
        </div>

        <div className="item">
          <label>
            <input type="radio" name="radio" />
            <span
              onClick={(e) => {
                setIsSelected(e.target.textContent);
                setIsActive(!isActive);
              }}
            >
              Upload date
            </span>
          </label>
        </div>

        <div className="item">
          <label>
            <input type="radio" name="radio" />
            <span
              onClick={(e) => {
                setIsSelected(e.target.textContent);
                setIsActive(!isActive);
              }}
            >
              Size
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}