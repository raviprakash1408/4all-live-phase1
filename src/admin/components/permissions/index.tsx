import { makeStyles } from "@material-ui/styles";
import { Box, List, Button, Divider, Grid, Skeleton } from "@mui/material";
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from "../../../sections/Toast";
import { setPermissionInSelectedPermission } from "../../../state/admin/adminSlice";
import { RootState } from '../../../state/store.ts';
import { AxiosLocal } from '../../../utilities/axiosUtils.ts';
import { titleCase } from "../../../utilities/common";
import IOSSwitch from "../CustomSwitch";
import PermissionButton from "../permissionButton";
import PermissionNavElement from "../PermissionNavElement";
//@ts-ignore
import PermissionGroup from "./permissionGroup.tsx";
import { Scrollbars } from "react-custom-scrollbars";

import { permissionGroups,permissionTypesByGroup } from "./permissionList.ts";
import PermissionType from "./permissionType.tsx";
const useOutlinedInputStyles = makeStyles((theme) => ({
    root: {
      "& $notchedOutline": {
        borderColor: "#143F63",
      },
      "&:hover $notchedOutline": {
        borderColor: "#143F63 !important",
      },
      "&$focused $notchedOutline": {
        borderColor: "green",
      },
    },
    focused: {},
    notchedOutline: {},
  }));

function Permission() {
  const theme = useSelector((state: RootState) => state.theme.themeData);
  const admin = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch();
  const outlinedInputClasses = useOutlinedInputStyles();
  //success toast
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  // permissions
  const [permissions, setPermissions] = useState([
    {
      id: 1,
      title: "Participant",
      default: true,
    },
    {
      id: 2,
      title: "Viewer",
      default: true,
    },
    {
      id: 3,
      title: "Guest",
      default: true,
    },
  ]);

  // selected permission
  const [selectedPermission, setSelectedPermission] = React.useState({
    id: 1,
    title: "Participant",
    permissions: {},
  });

  const [loading, setloading] = React.useState(true);

  // call api to get permissions
  React.useEffect(() => {
    getPermissions();
  }, []);
  const getPermissions = async () => {
    const { data } = await AxiosLocal.get("user/permission/");
    console.log(data, "data from getPermissions");
    setPermissions(data.data);
    getPermissionDetails(data.data[0].id, data.data[0].title);
  };
  //  const getPermissions =() => {
  //   AxiosLocal.get("user/permission/").then((response) => {
  //     console.log(response.data,"response.data");

  //     // console.log(data, "data from getPermissions");
  //     // setPermissions(data.data);
  //     // getPermissionDetails(data.data[0].id, data.data[0].title);
  //   });

  //  };
  const addPermissionfun = () => {
    AxiosLocal.post("user/permission/", {}).then((response) => {
      if (response.data.status == "Success") {
        console.log(response.data.data, "response.dataresponse.data");
        setPermissions([...permissions, response.data.data]);
        setMessage(response.data.message);
        setOpenToast(true)

        getPermissions();
      } else if (response.data.status == "Failed") {
      }
    });
  };
  const handleClick = (event) => {
    console.log(event.currentTarget.id, "event.currentTarget");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const getPermissionDetails = async (id, title) => {
    setloading(true);
    const { data } = await AxiosLocal.get(`user/permission/${id}`);
    console.log(data, "data from getPermissionDetails");

    setSelectedPermission({ id, title, permissions: data.data });
    setloading(false);
  };
  console.log(selectedPermission, "selectedPermissionnnnn");

  const selectPermission = (id, title) => {
    // call api to get permission details
    getPermissionDetails(id, title);
    console.log(id, title, "id,title");
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div style={{ display: "flex" }}>
        <Box
          style={{
            // width: "266px",
            margin: "0px 23px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontFamily: "URW DIN",
                color: theme?.permissions?.color,

                fontSize: "20px",
                textAlign: "center",
                marginRight: "24px",
              }}
            >
              Permissions
            </p>
            <Button
              variant="contained"
              style={{
                textTransform: "none",
                padding: "9px 19px 11px 11px",
                minWidth: "130px",
                lineHeight: "22px",
                backgroundColor: theme?.common?.color1,
                color: "white",
                fontFamily: "URW DIN REGULAR",
              }}
              onClick={addPermissionfun}
            >
              <img alt="" src="/assets/admin/plus.svg" />
              <span style={{ marginLeft: "13px", fontSize: "14px" }}>
                Add new
              </span>
            </Button>
          </div>
          <Scrollbars style={{ width: "100%", height: "65vh" }}>
            <List>
              {permissions.map((permission) => {
                // console.log(permissionName,"permissionName");

                return (
                  <PermissionNavElement
                    title={`${permission.title}`}
                    selected={permission.id === selectedPermission.id}
                    onClick={() =>
                      selectPermission(permission.id, permission.title)
                    }
                    permission={permission}
                    getPermissions={getPermissions}
                  />
                );
              })}
            </List>
          </Scrollbars>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          style={{
            alignSelf: "auto",
            backgroundColor: theme?.permissions?.divider,

            height: "69vh",
            marginTop: "23px",
            marginBottom: "21px",
            width: "2px",
          }}
        />

        <Box sx={{ flexGrow: 1 }} style={{ margin: "23px 32px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  color: "#88A1AB",
                  fontFamily: "URW DIN REGULAR",
                  fontSize: "15px",
                }}
              >
                Permissions type name
              </p>
              {/* input with only border */}
              <div
                style={{
                  border: `2px solid ${theme?.permissions?.border}`,

                  fontFamily: "URW DIN REGULAR",
                  borderRadius: "4px",
                  color: theme?.permissions?.textColor,

                  padding: "6px 15px 9px",
                  minWidth: "116px",
                  backgroundColor:theme?.permissions?.bgColor1

                }}
              >
                {selectedPermission.title}
              </div>
            </div>
          </div>
          <Divider
            orientation="horizontal"
            style={{
              backgroundColor:theme?.permissions?.divider,

              height: "2px",
              marginTop: "10px",
            }}
          />

          <Grid
            // style={{
            //   overflowX: "hidden",
            //   height: "60vh",
            // }}
            container
            rowSpacing={3}
          >
            {/* {
                        permissionGroups.map((permissionGroup) => {
                           
                  return (
                    <Grid item sm={12} md={12} lg={12} xl={12}>
                      <Tooltip
                        title={
                          <div style={{ display: "flex" }}>
                            <span
                              style={{
                                margin: "4px",
                                fontFamily: "URW DIN REGULAR",
                                color: "#88A1AB",
                                fontSize: "14px",
                                textTransform: "capitalize",
                              }}
                            >
                              {permissionGroup.name} Permissions
                            </span>
                          </div>
                        }
                        componentsProps={{
                          tooltip: {
                            sx: {
                              bgcolor: theme?.table?.buttonColor,
                            },
                          },
                        }}
                        placement="top-start"
                      >
                        <p
                          style={{
                            fontFamily: "URW DIN",
                            color: "white",
                            fontSize: "16px",
                            textTransform: "capitalize",
                          }}
                        >
                          {permissionGroup.name} Permissions
                        </p>
                      </Tooltip>
                   
                   {
                      permissionTypesByGroup(permissionGroup).map((permissionType) => {
                        return  <PermissionType permissionType={permissionType} selectedPermission={selectedPermission}  setSelectedPermission={setSelectedPermission} />
                   
                      })
                   }
                    </Grid>
                  );
                }
              )} */}
            {loading ? (
              <>
                <Skeleton
                  variant="rounded"
                  sx={{  backgroundColor:  theme?.loading?.loadingColor , marginTop: "40px" }}
                  width="100%"
                  height={50}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ backgroundColor:  theme?.loading?.loadingColor , marginTop: "10px" }}
                  width="100%"
                  height={50}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ backgroundColor:  theme?.loading?.loadingColor , marginTop: "10px" }}
                  width="100%"
                  height={50}
                />
                <Skeleton
                  variant="rounded"
                  sx={{  backgroundColor:  theme?.loading?.loadingColor , marginTop: "10px" }}
                  width="100%"
                  height={50}
                />
              </>
            ) : (
              <div style={{ marginTop: "27px" }}>
                {Object.keys(selectedPermission.permissions).length && (
                  <PermissionGroup selectedPermission={selectedPermission} />
                )}
              </div>
            )}
          </Grid>
        </Box>
      </div>
      <Divider
        orientation="horizontal"
        style={{
          backgroundColor: theme?.permissions?.divider,

          height: "2px",
        }}
      />
      <Toast
        openToast={openToast}
        setOpenToast={setOpenToast}
        message={message}
      />
    </>
  );
}

export default Permission;