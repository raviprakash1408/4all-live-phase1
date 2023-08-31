import { Button, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import UpdatePermissionGroup from '../components/permissions_gql_test/update';
import { useParams } from 'react-router-dom';

export default function UpdatePermissionPage(props) {
  const theme = useSelector(state => state.theme.themeData)
  const { id } = useParams();
  console.log("From URL",id)
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

<UpdatePermissionGroup id={id}/>

    </div>

        </div>

     

    </div>
  )
}








