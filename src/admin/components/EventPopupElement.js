import React from 'react'
import MenuItem from '@mui/material/MenuItem';


const EventPopupElement = ({title}) => {
  const [hoverpop, setHoverpop] = React.useState(false)

  return (
    <MenuItem onClick={"clicked me"} style={{padding:'11px 35px', color:hoverpop?'white':'#88A1AB',fontFamily:'URW DIN REGULAR', fontSize:'16px', transition:'all 0s ease', backgroundColor:hoverpop ? '#012243' : '#012243', fontWeight:hoverpop ? 600 : 400}} 
    onMouseEnter={ () => setHoverpop(true) }
    onMouseLeave={ () => setHoverpop(false) }>{title}</MenuItem>
  )
}

export default EventPopupElement