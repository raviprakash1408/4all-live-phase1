import React from 'react'
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from "@mui/material/useMediaQuery";
import {DebounceInput} from 'react-debounce-input';

const TeamSearchBar = ({ userSearch, setsearch, onlineOfflineState, sortBy, sortType, getMemberList }) => {
    const theme = useSelector(state => state.theme.themeData)
  const matches = useMediaQuery("(max-width:1280px)");

  return (
    <Paper
    component="form"
    sx={{ p: '2px 2px', display: 'flex', alignItems: 'center', width: matches ? 'auto' : 227, height: '33px',  backgroundColor:theme?.team?.participant, }}
    style={{marginTop: '20px',zIndex:'0',boxShadow:'none',border:theme?.team?.border,}}
  >
    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" style={{color: '#88A1AB'}}>
      <SearchIcon />
    </IconButton>
    <DebounceInput
    sx={{ ml: matches ? 0 : 1, flex: 1 }}
      placeholder="Search member"
    style={{fontSize: '14px', color: theme?.spaces?.mainColor,fontFamily:'URW DIN REGULAR', backgroundColor: theme?.team?.participant, border: 'none', outline: 'none', height: '33px', width: '100%' }}
          minLength={2}
          debounceTimeout={300}
          onChange={event => {
            getMemberList(1,onlineOfflineState, sortBy, sortType, event.target.value)
            setsearch(event.target.value)
          }} />

    {/* <InputBase
      sx={{ ml: matches ? 0 : 1, flex: 1 }}
      placeholder="Search member"
      inputProps={{ 'aria-label': 'Search member' }}
      style={{fontSize: '14px', color: theme?.spaces?.mainColor,fontFamily:'URW DIN REGULAR' }}
      onChange={(e)=>{
        getMemberList(1,onlineOfflineState, sortBy, sortType, e.target.value)
        setsearch(e.target.value)
      }}
    /> */}
    
  </Paper>
  )
}

export default TeamSearchBar