import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

const InviteMemberSearch = ({handleChange, inputValue, setinputValue, clearSearch}) => {
    const theme = useSelector(state => state.theme.themeData)
    
  return (
    <Paper
    component="form"
    sx={{ p: '2px 2px', display: 'flex', alignItems: 'center', height: '33px',  backgroundColor:  theme?.addmember?.inboxcolor, }}
    style={{boxShadow:'none',border: '2px solid',borderColor: theme?.addmember?.bordercolor}} fullWidth
  >
   
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Email"
      onChange={event =>{
        handleChange(event);
        setinputValue(event.target.value)
      }}
      value={inputValue}
      inputProps={{ 'aria-label': 'Email' }}
      style={{fontSize: '14px', color: theme?.spaces?.mainColor,fontFamily:'URW DIN REGULAR' }}
    />
     <div className='searchInput' style={{padding:'0px 10px',borderRadius:'4px',fontFamily:'URW DIN REGULAR',color:'white',marginRight:'-3px',cursor:'pointer'}}>
        <img onClick={()=>{
          clearSearch()
        }} src='/assets/admin/close-icon.svg' className="closeIcon" />
     </div>
  </Paper>
  )
}

export default InviteMemberSearch