import { Button, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import ListenPermission from '../components/permissions_gql_test/listen';
import { useParams } from 'react-router-dom';


export default function ListenPermissionPermissionPage(props) {
  const theme = useSelector(state => state.theme.themeData)
  const { id } = useParams();

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
        backgroundColor:"#000",
        color:"#fff",
        height:"100vh",
        width:"100%",
    }}>


<div style={{display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '79px',
    
    }}>

<ListenPermission id={id}/>

    </div>

        </div>

     

    </div>
  )
}








