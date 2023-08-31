import React from 'react'
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { useSelector } from "react-redux";


export const UserNameEmail = ({value}) => {
  const theme = useSelector((state) => state.theme.themeData);

    return (
        <Tooltip 
            TransitionComponent={Zoom} 
            sx={{fontSize: '100px'}} 
            componentsProps={{
                tooltip: {
                sx: {
                    bgcolor: '#008bcd',
                    '& .MuiTooltip-arrow': {
                        color: '#008bcd',
                    },
                },
                },
            }}
            title={<p style={{ fontSize: '0.875rem',color:'#e1e7ea' }}>{value}</p>} 
            placement="top" arrow>
            <div style={{ width: 180, whiteSpace: 'nowrap' }}>
                <Box
                    component="div"
                    sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    my: 2,
                    p: 1,
                    bgcolor:theme?.addmember?.color2,
                    color:theme?.addmember?.color3,
                    border: '0px solid',
                    borderColor:'',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    padding: '10px'
                    }}
                >
                    {value}
                </Box>
            </div>
        </Tooltip>
    )
}