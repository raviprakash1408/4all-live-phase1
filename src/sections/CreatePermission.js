import { Button, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import CreatePermissionGroup from '../components/permissions_gql_test/create';

export default function CreatePermissionPage(props) {
  const theme = useSelector(state => state.theme.themeData)

  return (
    <div style={{
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
   

    }} className="eventWaiting">
    
    {/* round image on center */}
  
    <div style={{
        position: 'absolute',
        backgroundColor:"#fff",
        height:"100vh",
        width:"100%",
    }}>


<div style={{display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '79px',
    }}>

<CreatePermissionGroup/>

    </div>

        </div>

     

    </div>
  )
}








