import React from 'react'
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchBarLong = ({setsearch}) => {
    const theme = useSelector(state => state.theme.themeData)
  return (
    <Box
    component="form"
    sx={{ p: '2px 2px', display: 'flex', alignItems: 'center', width: 433, height: '34px',  backgroundColor: theme?.spaces?.tertiaryColor, border:'2px solid #032E57',borderRadius:'4px' }}
    style={{marginTop: '20px',zIndex:'0'}}
  >
    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" style={{color: '#88A1AB'}}>
      <SearchIcon />
    </IconButton>
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Search event"
      inputProps={{ 'aria-label': 'Search user' }}
      onChange={(e)=>setsearch(e.target.value)}
      style={{fontSize: '14px', color: theme?.spaces?.mainColor,fontFamily:'URW DIN REGULAR' }}
    />
    
  </Box>
  )
}

export default SearchBarLong