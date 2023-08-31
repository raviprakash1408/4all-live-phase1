
import * as React from 'react';
import { styled } from '@mui/system';
import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';




function CustomTextField(props) {
  const theme = useSelector((state:RootState) => state.theme.themeData)
let color = props.customProps?.color ? props.customProps?.color : theme?.profile?.primaryColor
    return ( 
        <TextField 
        sx={{
            '& .MuiInputLabel-root': { fontSize: '14px' ,height:'40px', marginTop:'-5px',paddingLeft:'12px'},
            '& .MuiOutlinedInput-root': { fontSize: '14px', height:'40px', marginTop:'1px' },
         
            '& .MuiOutlinedInput-input': {
              fontFamily:'URW DIN REGULAR',
              fontSize:'14px',

              color
             
            },
"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
border:'2px solid',

borderColor:props.borderColor?props.borderColor : theme?.login?.secondaryColor, 

borderRadius:'4px',
color: theme?.profile?.primaryColor



},
"&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
border:'2px solid',

borderColor:props.borderColor?props.borderColor : theme?.login?.secondaryColor, 

borderRadius:'4px'
},
"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
border:'2px solid',

borderColor:props.borderColor?props.borderColor : theme?.login?.secondaryColor, 

borderRadius:'4px'
}
}}

        {...props}
        />
     );
}

export default CustomTextField;