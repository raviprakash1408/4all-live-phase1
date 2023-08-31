import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import { gql, useSubscription,useQuery } from "@apollo/client";


const COMMENTS_SUBSCRIPTION = gql`
  subscription PermGSubcription($id: String!) {
    permgModelUpdated(pk: $id) {
      id
      hangUp
      uploadVideoForSharing
      videoResoultion
    }
  }
`;


export default function ListenPermission(props) {


    const { data, loading } = useSubscription(
        COMMENTS_SUBSCRIPTION,
        { variables: { id:props.id },onSubscriptionComplete:()=>{console.log(data)} }
    );

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: '#000',
        color:"#fff"
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PhoneDisabledIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Hangup" secondary="" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <OndemandVideoIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Video Sharing" secondary="" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CameraRollIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Video Resolution" secondary="1080p" />
      </ListItem>
    </List>
  );
}
