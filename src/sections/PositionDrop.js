import { useState } from "react";

export default function PositionDrop(props) {
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState(props.position);
  function handleBlur(e) {
    console.log(e);
  }
  console.log(selected, "selected");
  return (
    <div
      className="dropdown"
      style={{ marginRight: "10px", marginLeft: "5px", width: "50px" }}
    >
      <div
        onClick={(e) => {
          setIsActive(!isActive);
        }}
        className="dropdown-btn"
        style={{
          background: "#012A50",
          border: "2px solid #032E57",
          boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.016)",
          color: "#88A1AB",
          fontSize: "14px",
          fontFamily: "URW DIN REGULAR",
          fontWeight: 400,
          height: "14px",
        }}
      >
        {selected}
        {/* <span
            className={isActive ? "fas fa-caret-up" : "fas fa-caret-down"}
          /> */}
        <img
          src={`${window.location.origin}/assets/icons/down.svg`}
          style={{ marginLeft: "5px" }}
        />
      </div>
      <div
        className="dropdown-content"
        style={{
          display: isActive ? "block" : "none",
          backgroundColor: "#012243",
          border: "2px solid #012A50",
          borderRadius: "4px",
          color: "#88A1AB",
          fontSize: "14px",
          fontFamily: "URW DIN REGULAR",
          fontWeight: 400,
          width: "55px",
        }}
      >
        <div className="item" style={{ paddingLeft: "25px" }}>
          {/* <label >
  <input type="radio" name="radio" /> */}
          <span
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
          >
            1
          </span>
          {/* </label> */}
        </div>
        <div className="item" style={{ paddingLeft: "25px" }}>
          {/* <label >
  <input type="radio" name="radio" /> */}
          <span
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
          >
            2
          </span>
          {/* </label> */}
        </div>

        <div className="item" style={{ paddingLeft: "25px" }}>
          {/* <label >
  <input type="radio" name="radio" /> */}
          <span
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
          >
            3
          </span>
          {/* </label> */}
        </div>

        <div className="item" style={{ paddingLeft: "25px" }}>
          {/* <label >
  <input type="radio" name="radio" /> */}
          <span
            onClick={(e) => {
              setIsSelected(e.target.textContent);
              setIsActive(!isActive);
            }}
          >
            4
          </span>
          {/* </label> */}
        </div>
      </div>
    </div>
  );
}
