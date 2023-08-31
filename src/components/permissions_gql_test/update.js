import { gql, useMutation,useQuery } from "@apollo/client";
import { useState,useEffect,React } from "react";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


const GET_PERM = gql`
    query QueryPermissionGroup($id: String!) {
        permission(id:$id)
            {
            title
            canSwitchBreakoutSpace,
            videoResoultion,
            canSwitchVideoOnOff,
            canSwitchAudioOnOff,
            canDragVerticalLayout,
            canDragHorizontalLayout,
            shareVideoFromFileManager,
            hangUp,
            shareScreen,
            connectivityTest,
            uploadVideoForSharing
        }
    }
`


const UPDATE_HANGUP = gql`

mutation updateMutation($id: String!,$hangUp:Boolean!) 
    {
    updatePermissionGroup(
        permData: {
          id:$id,
          hangUp: $hangUp,
    })
    { perm {
        hangUp
        }
    }

}`

const UPDATE_UVFS = gql`

mutation updateMutation($id: String!,$uploadVideoForSharing:Boolean!) 
    {
    updatePermissionGroup(
        permData: {
          id:$id,
          uploadVideoForSharing:$uploadVideoForSharing
    })
    { 
    perm {
        uploadVideoForSharing
    }
    }

}`


const UPDATE_TITLE = gql`

mutation updateMutation($id: String!,$title:String!) 
    {
    updatePermissionGroup(
        permData: {
          id:$id,
          title:$title
    })
    { 
    perm {
        title
    }
    }

}`


const UPDATE_VR = gql`

mutation updateMutation($id: String!,$videoResoultion:String!) 
    {
    updatePermissionGroup(
        permData: {
          id:$id,
          videoResoultion:$videoResoultion
    })
    { 
    perm {
        videoResoultion
    }
    }

}`

const UpdatePermissionGroup = (props) => {
   
    const [state,setState] = useState({})
    const { loading, error, data } = useQuery(GET_PERM, {variables: { id:props.id }})
    const [UpdatehangUp] = useMutation(UPDATE_HANGUP);
    const [UpdateuploadVideoForSharing] = useMutation(UPDATE_UVFS);
    const [UpdateVideoResoultion] = useMutation(UPDATE_VR);
    const [Updatetitle] = useMutation(UPDATE_TITLE);

    useEffect(() => {
        if(!loading && data){
            setState(data.permission);
        }
      }, [loading, data])

      const handleChange = (event) => {

        if(event.target.name=='hangUp'){
            UpdatehangUp({ variables: {id:props.id,hangUp: event.target.checked},onCompleted:()=>{console.log("updated hangUp")}})
        }
        if(event.target.name=='uploadVideoForSharing'){
            UpdateuploadVideoForSharing({ variables: {id:props.id,uploadVideoForSharing: event.target.checked},onCompleted:()=>{console.log("updated UpdateuploadVideoForSharing")}})
        }

        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };

    
      const handleChangeVal = (event) => {

        if(event.target.name=='title'){
            Updatetitle({ variables: {id:props.id,title: event.target.value},
                onCompleted:()=>{console.log("updated title")}})
        }

        if(event.target.name=='videoResoultion'){
            UpdateVideoResoultion({ variables: {id:props.id,videoResoultion: event.target.value},
                onCompleted:()=>{console.log("updated videoResoultion")}})
        }

        setState({
          ...state,
          [event.target.name]: event.target.value,
        });
      };

return (
    
    <div>
    
    <FormControl component="fieldset" variant="standard">
      
      <FormGroup>

      <FormControlLabel
          control={
            <TextField id="outlined-basic" placeholder="Role name" variant="outlined" name="title" value={state.title ? state.title : ""}  onChange={handleChangeVal}
            />
        }
        />
<br/>
<FormControlLabel
        label="Video Resolution"
          control={
<Select
          labelId="video-res"
          id="video-res"
          name="videoResoultion"
          value={state.videoResoultion ? state.videoResoultion : ""} 
          onChange={handleChangeVal}
          >
        <MenuItem value="">Select</MenuItem>
          <MenuItem value="2160p">2160p</MenuItem>
          <MenuItem value="1080p">1080p</MenuItem>
          <MenuItem value="720p">720p</MenuItem>
          <MenuItem value="320p">320p</MenuItem>
          <MenuItem value="320p">180p</MenuItem>

        </Select>    
    }
  
        />

<br/>
    <FormControlLabel
        control={
        <Switch 
        checked={state.canSwitchBreakoutSpace? state.canSwitchBreakoutSpace : false} 
        onChange={handleChange}
        name="canSwitchBreakoutSpace"
        />
        }
        label="canSwitchBreakoutSpace"
    />

<FormControlLabel
        control={
        <Switch 
        checked={state.uploadVideoForSharing ? state.uploadVideoForSharing : false} 
        onChange={handleChange}
        name="uploadVideoForSharing"
        />
        }
        label="uploadVideoForSharing"
    />




<FormControlLabel
        control={
        <Switch 
        checked={state.canDragHorizontalLayout ? state.canDragHorizontalLayout:false } 
        onChange={handleChange}
        name="canDragHorizontalLayout"
        />
        }
        label="canDragHorizontalLayout"
    />

<FormControlLabel
        control={
        <Switch 
        checked={state.canDragVerticalLayout ? state.canDragVerticalLayout:false} 
        onChange={handleChange}
        name="canDragVerticalLayout"
        />
        }
        label="canDragVerticalLayout"
    />


    <FormControlLabel
        control={
        <Switch 
        checked={state.canSwitchAudioOnOff ? state.canSwitchAudioOnOff:false} 
        onChange={handleChange}
        name="canSwitchAudioOnOff"
        />
        }
        label="canSwitchAudioOnOff"
    />


    <FormControlLabel
        control={
        <Switch 
        checked={state.canSwitchVideoOnOff  ? state.canSwitchVideoOnOff:false} 
        onChange={handleChange}
        name="canSwitchVideoOnOff"
        />
        }
        label="canSwitchVideoOnOff"
    />

<FormControlLabel
        control={
        <Switch 
        checked={state.shareVideoFromFileManager  ? state.shareVideoFromFileManager:false} 
        onChange={handleChange}
        name="shareVideoFromFileManager"
        />
        }
        label="shareVideoFromFileManager"
    />



<FormControlLabel
        control={
        <Switch 
        checked={state.hangUp  ? state.hangUp:false} 
        onChange={handleChange}
        name="hangUp"
        />
        }
        label="hangUp"
    />


<FormControlLabel
        control={
        <Switch 
        checked={state.shareScreen ? state.shareScreen:false} 
        onChange={handleChange}
        name="shareScreen"
        />
        }
        label="shareScreen"
    />


<FormControlLabel
        control={
        <Switch 
        checked={state.connectivityTest ? state.connectivityTest:false} 
        onChange={handleChange}
        name="connectivityTest"
        />
        }
        label="connectivityTest"
    />


</FormGroup>
    </FormControl>


        </div>    
    )
}

export default UpdatePermissionGroup