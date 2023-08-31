import React, { useState, useEffect } from 'react'
import { MenuItem, Menu, Button } from '@mui/material';
import { useSelector } from 'react-redux';
// @ts-ignore
import { RootState } from "../state/store.tsx";

export const OnlineOfflineFilter = ({
    openfilter,
    handleClickfilter,
    anchorElfilter,
    onlineFilter,
    handleClosefilter,
    onlineOfflineState
}) =>{
    const theme = useSelector((state:RootState) => state.theme.themeData)
    return (
        <>
        <div aria-controls={openfilter ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={openfilter ? 'true' : undefined} onClick={handleClickfilter} style={{margin: '20px 12px 0px 12px', padding: '4.5px 26px', backgroundColor: theme?.table?.buttonbgColor, borderRadius: '4px', height:'32px',cursor:'pointer'}} >
            <img src='/assets/icons/icon1.svg' style={{marginTop:'6px'}} />
        </div>
        <Menu 
            id="basic-menu" 
            anchorEl={anchorElfilter} 
            open={openfilter} onClose={handleClosefilter} 
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            sx={{
                "& .MuiPaper-root": {
                    backgroundColor: "#012243",
                    border:'2px solid #012A50',
                    boxShadow:'none',
                    borderRadius:'4px'
                }
                }}
            style={{marginTop:'5px'}}
            >
            <MenuItem style={{padding:'10px 15px',color:'#88A1AB',fontFamily:'URW DIN REGULAR'}}>
                <Button onClick={()=>{onlineFilter('online')}} style={{ background:onlineOfflineState === 'online'?'#143F63':'#012A50',textTransform: 'capitalize' }} 
                    variant="text" >
                    <img src="/assets/admin/blue-dot.svg" alt="" style={{paddingRight:'10px',width:'10px',height:'10px'}}/> Online
                </Button>
                <Button onClick={()=>{onlineFilter('offline')}} style={{marginLeft:'20px',background:'#012A50',textTransform: 'capitalize'}} variant="text">
                    <img src="/assets/icons/red_dot.svg" alt="" style={{paddingRight:'18px',width:'10px',height:'10px'}}/> Offline
                </Button>
            </MenuItem>
            <MenuItem style={{padding:'10px 15px',color:'#88A1AB',fontFamily:'URW DIN REGULAR',textAlign:'center'}}>
                <Button onClick={()=>{onlineFilter('clear')}} style={{ background:'#012A50',width:'100%',textTransform:'none' }} variant="text"> All status</Button>
            </MenuItem>
        </Menu>
        </>
    )
};