import React from 'react'
import { FormControlLabel } from "@mui/material";
import { customGql, titleCase, toCamel } from "../../utilities/common";
import IOSSwitch from "./CustomSwitch";
import { gql, useMutation,useQuery } from "@apollo/client";
import { AxiosLocal } from '../../utilities/axiosUtils.ts';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from 'react-redux';


const themeResponsive = createTheme({
  breakpoints: {
    values: {
      xxs: 0, // smol phone
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536 // large screens
    }
  }
});

function PermissionButton({
    permission,
    selectedPermission,
    setSelectedPermission,
 

}) {
    
    const UPDATE_PERMISSION = customGql`
mutation updateMutation($id: String!,$${toCamel(permission)}:Boolean!) 
    {
    updatePermissionGroup(
        permData: {
          id:$id,
          ${toCamel(permission)}: $${toCamel(permission)},
    })
    { 
        perm {
            ${toCamel(permission)}
        }
        }
  

}
`
console.log( permission,
  selectedPermission,
  selectedPermission.permissions[permission],"kfafffaff");
    const [UpdatePermission, { data, loading, error }] = useMutation(UPDATE_PERMISSION);
  const theme = useSelector((state) => state.theme.themeData);

    const replaceImage = (error) => {
      error.target.src = 'https://fox16-MeetMo.io.io/assets/permissions/edit.svg' 
  }
    return ( 
      <ThemeProvider theme={themeResponsive}>

        <div
        style={{
          display: "flex",
          marginTop: "-10px",
          // marginLeft: "3px",
          justifyContent:'space-between',
          gap:'10px',
          width:{ xl :'90%' } 
        }}
      >
      <div style={{display:'flex', alignItems:'center'}}>
                          <img src={`/assets/permissions/${permission}.svg`} onError = {replaceImage} />
                            <p
              style={{
                fontFamily: "URW DIN REGULAR",
                color: "#88A1AB",
                fontSize: "16px",
                marginLeft:'12px'
              }}
            >
              {titleCase(permission)}
            </p>
            </div>
            <FormControlLabel
              onClick={() => {
                console.log("checked", permission);
            //  update selected permission local state
            setSelectedPermission(selectedPermission=>{
              return {
                ...selectedPermission,
                permissions:{
                  ...selectedPermission.permissions,
                  [permission]:!selectedPermission.permissions[permission]
                }
              }
            })

            // UpdatePermission({
            // variables:{
            //   id:selectedPermission.id.toString(),
            //   [toCamel(permission)]:!selectedPermission.permissions[permission],
          
            // }
            // })

              // api call to update permission
              AxiosLocal.post(`/user/permission/edit/${selectedPermission.id}`, {
                
                [permission]: !selectedPermission.permissions[
                  permission
                ],
               
              }).then((res) => {
                console.log("res", res);
              });
              // publish permission to all users

                window.permissionChanel.publish({
                  [permission]:
                  !selectedPermission.permissions[permission],
                });
              }}
              control={
                <IOSSwitch
                theme={theme}
                  sx={{ m: 1 }}
                  checked={
                    selectedPermission.permissions[permission]
                  }
                />
              }
              // labelPlacement="start"
              // label={
              //   <span
              //     style={{
              //       color: "#88A1AB",
              //       fontSize: "14px",
              //       fontFamily: "URW DIN REGULAR",
              //     }}
              //   >
              //     {titleCase(permission)}
              //   </span>
              // }
            />
          
  
      </div>
      </ThemeProvider>

     );
}

export default PermissionButton;