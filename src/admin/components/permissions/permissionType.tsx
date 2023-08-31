import * as React from 'react';
import { FormControlLabel } from "@mui/material";


import { gql, useMutation,useQuery } from "@apollo/client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AxiosLocal } from '../../../utilities/axiosUtils.ts';
import IOSSwitch from '../CustomSwitch';
import { titleCase } from '../../../utilities/common';
import { permissionsByType } from './permissionList.ts';
import PermissionButton from '../permissionButton';
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


function PermissionType({
    permissionType,
    selectedPermission,
    setSelectedPermission,
 

}) {
  
    // state for the permission toggle
    const [permissionToggle, setPermissionToggle] = React.useState(false);

    const theme = useSelector((state) => state.theme.themeData);
    const OnClick = () =>  {
     
        setPermissionToggle(!permissionToggle)
  
    
      }
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

            flexDirection: "column",

            width:"100%"
          }}
        >
      
              <FormControlLabel
                    onClick={OnClick}
                    control={<IOSSwitch
                      theme={theme}

                        sx={{ m: 1 }}
                        checked={permissionToggle} />} label={  <div style={{display:'flex', alignItems:'center'}}>
                        <img alt='' src={`/assets/permissions/${permissionType?.name}.svg`} onError = {replaceImage} />
                          <p
                           onClick={OnClick} 
            style={{
              fontFamily: "URW DIN REGULAR",
              color: "#88A1AB",
              fontSize: "16px",
              marginLeft:'12px'
            }}
          >
            {titleCase(permissionType?.name)}
          </p>
          </div>}           
              />
        <div style={{
            display: "flex",
          justifyContent:'space-between',
        }}>
        {permissionToggle && permissionsByType(permissionType).map((permission) => {
        return <PermissionButton permission={permission.name}  selectedPermission={selectedPermission}  setSelectedPermission={setSelectedPermission}/>
    })}
        </div>
  
        </div>


        </ThemeProvider>
  
       );
}

export default PermissionType;