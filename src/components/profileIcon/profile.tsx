import React, { useEffect, useState } from "react";

export default function Profile(props = { id: 7, username: "Lakshmi Manoj", avatar :""}) {
  const [username, setusername] = useState("");
  const [profileImage, setprofileImage] = useState("");
  useEffect(() => {
    // show twoleter

    // atatch online eventlistener

    
  }, []);
  return (
    <div className="profile">
      {profileImage !== "" ? (
        <div className="type">
          <img
            alt=""
            style={{
              width: "50px",
              height: "auto",
            }}
            src="/assets/images/blank_profile.jpeg"
          />
        </div>
      ) : (
        <div className="type">
          <span>AM</span>
        </div>
      )}
    </div>
  );
}