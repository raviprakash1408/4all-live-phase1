import { useState } from 'react'
import { AxiosLocal } from '../../utilities/axiosUtils.ts';
import { useSelector } from 'react-redux';


const MoreTooltip = ({ user, closefunction }) => {
  const theme = useSelector(state => state.theme.themeData)

const [userTooltip, setuserTooltip] = useState('')
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  return (
    <div
      style={{ display: "flex", position: "relative", alignItems: "center" }}
      onMouseEnter={() => setuserTooltip(user.id)}
      onMouseLeave={() => setuserTooltip("")}
      key={user.id}
    >
      <div
        style={{
          height: "33px",
          width: "33px",
          textAlign: "center",
          verticalAlign: "middle",
          lineHeight: "33px",
          borderRadius: "50%",
          backgroundColor: theme?.editspace?.outerbgcolor,
          color: "#88A1AB",
          fontSize: "12px",
          fontFamily: "URW DIN REGULAR",
          textTransform: "uppercase",
        }}
      >
        <span>
          {user?.first_name[0]} {user?.last_name[0]}
        </span>
      </div>
      <div
        style={{
          margin: "10px",
          fontFamily: "URW DIN REGULAR",
          color: "#88A1AB",
          fontSize: "14px",
        }}
      >
        {capitalizeFirstLetter(user.first_name)}{" "}
        {capitalizeFirstLetter(user.last_name)}
      </div>
      <img
        onClick={() => closefunction(user)}
        src="/assets/admin/close-icon.svg"
        alt=""
        style={{
          filter:
            "brightness(0) saturate(100%) invert(15%) sepia(28%) saturate(2991%) hue-rotate(182deg) brightness(94%) contrast(106%)",
          position: "absolute",
          right: "4px",
          marginTop: "5px",
          width: "11px",
          height: "11px",
          opacity: user.id == userTooltip ? 1 : 0,
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default MoreTooltip