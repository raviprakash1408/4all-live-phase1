import React from 'react'
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    const theme = useSelector(state => state.theme.themeData)
  return (
    <Paper
    component="form"
    sx={{ p: '2px 2px', display: 'flex', alignItems: 'center', width: 250, height: '36px',  backgroundColor: theme?.spaces?.tertiaryColor, }}
    style={{marginTop: '20px',zIndex:'5',boxShadow:'none',border: '2px solid',borderColor:theme?.spaces?.quaternaryColor}}
  >
    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" style={{color: '#88A1AB'}}>
      <SearchIcon />
    </IconButton>
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Search event"
      inputProps={{ 'aria-label': 'Search event' }}
      style={{fontSize: '14px', color: theme?.spaces?.mainColor,fontFamily:'URW DIN REGULAR' }}
    />
    
  </Paper>
  )
}

export default SearchBar