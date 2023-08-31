import { gql, useMutation } from "@apollo/client";
import { useState,React } from "react";
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


const POST_MESSAGE = gql`
    mutation createMutation($title: String!, 
        $canSwitchBreakoutSpace: Boolean!,
        $videoResoultion: String!,
        $canSwitchVideoOnOff: Boolean!,
        $canSwitchAudioOnOff: Boolean!,
        $canDragVerticalLayout: Boolean!,
        $canDragHorizontalLayout: Boolean!,
        $shareVideoFromFileManager: Boolean!,
        $hangUp: Boolean!,
        $shareScreen: Boolean!,
        $connectivityTest: Boolean!
        $uploadVideoForSharing: Boolean!,

        ) {
        createPermissionGroup (
            permData: {
            title: $title, 
            canSwitchBreakoutSpace: $canSwitchBreakoutSpace,
            videoResoultion: $videoResoultion,
            canSwitchVideoOnOff: $canSwitchVideoOnOff,
            canSwitchAudioOnOff: $canSwitchAudioOnOff,
            canDragVerticalLayout: $canDragVerticalLayout,
            canDragHorizontalLayout: $canDragHorizontalLayout,
            shareVideoFromFileManager: $shareVideoFromFileManager,
            hangUp: $hangUp,
            shareScreen: $shareScreen,
            connectivityTest: $connectivityTest,
            uploadVideoForSharing:$uploadVideoForSharing
        }){
        perm {
            title, 
            videoResoultion,
            canSwitchBreakoutSpace,
            canSwitchVideoOnOff,
            canSwitchAudioOnOff,
            canDragVerticalLayout,
            canDragHorizontalLayout,
            shareVideoFromFileManager,
            uploadVideoForSharing,
            hangUp,
            shareScreen,
            connectivityTest,
        }
    }
    }
`

const CreatePermissionGroup = () => {
    const [mutateFunction, { data, loading, error }] = useMutation(POST_MESSAGE,{
        onCompleted: (data) =>window.location.href = "/permission/list",
        onError: (error) => console.error("Error creating a post", error),
      });

    const [state, setState] = useState({
        canSwitchBreakoutSpace: false,
        videoResoultion: "1080p",
        canSwitchVideoOnOff: false,
        title:"",
        canSwitchAudioOnOff: false,
        canDragVerticalLayout: false,
        canDragHorizontalLayout: false,
        shareVideoFromFileManager: false,
        uploadVideoForSharing:false,
        hangUp: false,
        shareScreen: false,
        connectivityTest: false
      });


    const handleChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };

    
      const handleChangeVal = (event) => {
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
            <TextField id="outlined-basic" label="Role name" variant="outlined" name="title" value={state.title}  onChange={handleChangeVal}
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
          value={state.videoResoultion} 
          onChange={handleChangeVal}
          >
          <MenuItem value={"2160p"}>2160p</MenuItem>
          <MenuItem value={"1080p"}>1080p</MenuItem>
          <MenuItem value={"720p"}>720p</MenuItem>
          <MenuItem value={"320p"}>320p</MenuItem>
          <MenuItem value={"320p"}>180p</MenuItem>

        </Select>    
    }
  
        />

<br/>
    <FormControlLabel
        control={
        <Switch 
        checked={state.canSwitchBreakoutSpace} 
        onChange={handleChange}
        name="canSwitchBreakoutSpace"
        />
        }
        label="canSwitchBreakoutSpace"
    />

<FormControlLabel
        control={
        <Switch 
        checked={state.uploadVideoForSharing} 
        onChange={handleChange}
        name="uploadVideoForSharing"
        />
        }
        label="uploadVideoForSharing"
    />




<FormControlLabel
        control={
        <Switch 
        checked={state.canDragHorizontalLayout} 
        onChange={handleChange}
        name="canDragHorizontalLayout"
        />
        }
        label="canDragHorizontalLayout"
    />

<FormControlLabel
        control={
        <Switch 
        checked={state.canDragVerticalLayout} 
        onChange={handleChange}
        name="canDragVerticalLayout"
        />
        }
        label="canDragVerticalLayout"
    />


    <FormControlLabel
        control={
        <Switch 
        checked={state.canSwitchAudioOnOff} 
        onChange={handleChange}
        name="canSwitchAudioOnOff"
        />
        }
        label="canSwitchAudioOnOff"
    />


    <FormControlLabel
        control={
        <Switch 
        checked={state.canSwitchVideoOnOff} 
        onChange={handleChange}
        name="canSwitchVideoOnOff"
        />
        }
        label="canSwitchVideoOnOff"
    />

<FormControlLabel
        control={
        <Switch 
        checked={state.shareVideoFromFileManager} 
        onChange={handleChange}
        name="shareVideoFromFileManager"
        />
        }
        label="shareVideoFromFileManager"
    />



<FormControlLabel
        control={
        <Switch 
        checked={state.hangUp} 
        onChange={handleChange}
        name="hangUp"
        />
        }
        label="hangUp"
    />


<FormControlLabel
        control={
        <Switch 
        checked={state.shareScreen} 
        onChange={handleChange}
        name="shareScreen"
        />
        }
        label="shareScreen"
    />


<FormControlLabel
        control={
        <Switch 
        checked={state.connectivityTest} 
        onChange={handleChange}
        name="connectivityTest"
        />
        }
        label="connectivityTest"
    />


<FormControlLabel

control={
<Button onClick={() => mutateFunction({variables: {title: state.title, 
            canSwitchBreakoutSpace: state.canSwitchBreakoutSpace,
            videoResoultion: state.videoResoultion,
            canSwitchVideoOnOff: state.canSwitchVideoOnOff,
            canSwitchAudioOnOff: state.canSwitchAudioOnOff,
            canDragVerticalLayout: state.canDragVerticalLayout,
            canDragHorizontalLayout: state.canDragHorizontalLayout,
            shareVideoFromFileManager: state.shareVideoFromFileManager,
            hangUp: state.hangUp,
            shareScreen: state.shareScreen,
            uploadVideoForSharing:state.uploadVideoForSharing,
            connectivityTest: state.connectivityTest}})} variant="contained">Create</Button>
          }
        />


</FormGroup>
    </FormControl>


        </div>    
    )
}

export default CreatePermissionGroup