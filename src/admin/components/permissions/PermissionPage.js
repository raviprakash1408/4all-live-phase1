import React, { useState } from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import Permission from "./index.tsx";

const Item = styled(Paper)(({ theme }) => ({
  padding: "15px 0px",
  textAlign: "center",
  fontFamily: "URW DIN REGULAR",
  fontSize: "16px",
  color: "#88A1AB",
  boxShadow: "none",
  borderRadius: "0px",
  cursor: "pointer",
}));

const PermissionPage = () => {
  const permissions = useSelector((state) => state.permissions);
  const organisationUser = localStorage.getObject("is_organization_user");

  // const [toggleState, setToggleState] = useState('userrole')
  // const toggleTab = (index) => {
  //   setToggleState(index)
  // }
  return (
    <div
      style={{
        backgroundColor: "#012A50",
        minHeight: "89.1vh",
        marginTop: "70px",
        marginBottom: "5px",
      }}
      className="role"
    >
      {/* {permissions.view_workflows && permissions.view_permissions && (
        <>
          <p
            style={{
              fontFamily: "URW DIN",
              color: "white",
              fontSize: "20px",
              textAlign: "center",
              padding: "20px 0px 0px",
            }}
          >
            Workflows & permissions
          </p>

          <Grid container spacing={"3px"} style={{ marginTop: "-4px" }}>
            <Grid
              item
              xs={6}
              className={toggleState === "userrole" ? "roleNav" : ""}
              onClick={() => toggleTab("userrole")}
              style={{ backgroundColor: "#012A50" }}
            >
              <Item style={{ backgroundColor: "#002E56" }}>Workflows</Item>
            </Grid>

            <Grid
              item
              xs={6}
              className={toggleState === "permissions" ? "roleNav" : ""}
              onClick={() => toggleTab("permissions")}
            >
              <Item style={{ backgroundColor: "#002E56" }}>Permissions</Item>
            </Grid>
          </Grid>
        </>
      )} */}

      <Permission />
    </div>
  );
};

export default PermissionPage;
