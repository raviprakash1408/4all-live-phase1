import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import UserRoles from "./workflow/UserRoles";
import Permission from "./permissions/index.tsx";
import Permissions from "./Permissions";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { organizationUser } from "../../utilities/common";

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

const RolePage = () => {
  const theme = useSelector((state) => state.theme.themeData);

  const permissions = useSelector((state) => state.permissions);
  const organisationUser = localStorage.getObject("is_organization_user");
  const [toggleState, setToggleState] = useState("userrole");
  const toggleTab = (index) => {
    setToggleState(index);
  };
  useEffect(() => {
    if (localStorage.getObject("guestUser") === "true") {
      window.location.href = "/";
    }
  }, []);
  useEffect(() => {
    document.title = theme?.login?.title;
  }, []);
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = theme?.login?.favicon32x32;
  }, []);
  return (
    <div
      style={{
        backgroundColor: theme.workflows.bgColor,

        height: "88.6vh",
        marginTop: "70px",
        marginBottom: "5px",
        overflow: "hidden",
      }}
      className="role"
    >
      {organisationUser == "true" ? (
        <>
          <p
            style={{
              color: theme.workflows.color,

              fontSize: "20px",
              textAlign: "center",
              padding: "20px 0px 0px",
              backgroundColor: theme.workflows.bgColor,
            }}
          >
            Roles & permissions
          </p>

          <Grid container spacing={"3px"} style={{ marginTop: "-4px" }}>
            <Grid
              item
              xs={6}
              className={toggleState === "userrole" ? "roleNav" : ""}
              onClick={() => toggleTab("userrole")}
              style={{ backgroundColor: theme.workflows.bgColor }}
            >
              <Item
                style={{
                  backgroundColor: theme.workflows.workflowAndPermissionsBg,
                }}
              >
                User roles
              </Item>
            </Grid>

            <Grid
              item
              xs={6}
              className={toggleState === "permissions" ? "roleNav" : ""}
              onClick={() => toggleTab("permissions")}
            >
              <Item
                style={{
                  backgroundColor: theme.workflows.workflowAndPermissionsBg,
                }}
              >
                Permissions
              </Item>
            </Grid>
          </Grid>
        </>
      ) : (
        organizationUser(permissions.view_workflows) &&
        organizationUser(permissions.view_permissions) && (
          <>
            <p
              style={{
                fontFamily: "URW DIN",
                color: theme.workflows.color,

                fontSize: "20px",
                textAlign: "center",
                padding: "20px 0px 0px",
              }}
            >
              Roles & permissions
            </p>

            <Grid container style={{ marginTop: "-4px" }}>
              <Grid
                item
                xs={6}
                style={{
                  borderBottom: `2px solid ${
                    toggleState === "permissions"
                      ? theme?.workflows?.workflowAndPermissionsBg
                      : theme?.common?.color1
                  }`,
                }}
                onClick={() => toggleTab("userrole")}
                // style={{ backgroundColor: "#012A50" }}
              >
                <Item
                  style={{
                    width: "99.9%",
                    backgroundColor: theme.workflows.workflowAndPermissionsBg,
                    color: theme.workflows.workflowsAndpermissions,
                  }}
                >
                  User roles
                </Item>
              </Grid>

              <Grid
                item
                xs={6}
                style={{
                  borderBottom: `2px solid ${
                    toggleState === "permissions"
                      ? theme?.common?.color1
                      : theme?.workflows?.workflowAndPermissionsBg
                  }`,
                }}
                onClick={() => toggleTab("permissions")}
              >
                <Item
                  style={{
                    backgroundColor: theme.workflows.workflowAndPermissionsBg,
                    color: theme.workflows.workflowsAndpermissions,
                  }}
                >
                  Permissions
                </Item>
              </Grid>
            </Grid>
          </>
        )
      )}
      {organisationUser == "true" ? (
        <>
          {toggleState === "permissions" ? <Permission /> : ""}
          {toggleState === "userrole" ? <UserRoles /> : ""}
        </>
      ) : organizationUser(permissions.view_workflows) &&
        organizationUser(permissions.view_permissions) ? (
        <>
          {toggleState === "permissions" ? <Permission /> : ""}
          {toggleState === "userrole" ? <UserRoles /> : ""}
        </>
      ) : (
        <>
          {organizationUser(permissions.view_workflows) && <UserRoles />}
          {organizationUser(permissions.view_permissions) && <Permission />}
        </>
      )}
      {/* <Permission /> */}
    </div>
  );
};

export default RolePage;
