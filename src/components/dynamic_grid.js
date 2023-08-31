import React from 'react'
import { PackedGrid } from 'react-packed-grid';

function DynamicGrid(props) {
    return ( 
        <PackedGrid     boxAspectRatio={16 / 9}
        className="fullscreen"
     >
        {props.children}
        </PackedGrid>
     );
}

export default DynamicGrid;