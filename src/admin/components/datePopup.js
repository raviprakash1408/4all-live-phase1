import React from 'react'
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';


const DatePopup = ({anchorElDate, handleCloseDate, openDate}) => {
    const id = openDate ? 'simple-popover' : undefined;
  return (
    <Popover
                                    id={id}
                                    open={openDate}
                                    anchorEl={anchorElDate}
                                    onClose={handleCloseDate}
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "left",
                                    }}
                                  >
                                    <Box
                                      mx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        backgroundColor: "#012A50",
                                        width: "300px",
                                        padding: "10px",
                                      }}
                                    >
                                        ghghghg</Box> 
                                    </Popover>
  )
}

export default DatePopup