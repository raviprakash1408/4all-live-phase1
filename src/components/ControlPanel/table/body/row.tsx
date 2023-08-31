import { Slider } from "@mui/material"
import React from "react"
// @ts-ignore
import { NameWithAvatar } from "./fieldTypes/nameWithAvatar.tsx"




export const TableBodyRow = ({data,draggable,onDrop})=>{
console.log(data,"TableBodyRowTableBodyRow");
 
return (
         <div
         onDrop={(e)=>{
            e.preventDefault()
            e.stopPropagation()
            onDrop(e,data.userType,false,data.position)
         
         }}
         onDragOver={(e)=>e.preventDefault()}
          className="row" 
          draggable={draggable}
            onDragStart={(e)=>{
               e.dataTransfer.setData("text/plain",data.id)
            }}
           style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "10px",
            alignItems: "center",
            height: "50px",
            backgroundColor: "#143F63",


         }}>
            <NameWithAvatar data={data}/>

                     <div className="col-2">
                     <span>{data.role}</span>
                     </div>

                     <div className="col-3" style={{
                        paddingRight: "10px",
                     }}>
                     <span>
                     <Slider
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    aria-label="Volume"
                    //   disabled={audioMuted}
                    value={data.volume}
                    onChange={(e) => {
                      console.log(e);
                     //  setvolume(e.target.value);
                    }}
                    sx={{
                      width: 76,
                      color: "#008BCD",
                      height: 2,
                      marginLeft: "2px",
                      borderRadius: "0px",
                      // marginLeft: "20px",

                      "& .MuiSlider-thumb": {
                        border: "2px solid",
                        borderColor: "#008BCD",
                        color: "#E1E7EA",
                        // boxShadow: '0 0 0 2px rgba(0, 255, 0, 0.3) !important'
                        width: "17px",
                        height: "17px",
                      },
                      "& .MuiSlider-thumb:hover": {
                        // boxShadow: "0 0 0 4px rgba(0, 139, 205, 0.1) !important",
                      },
                    }}
                  />
                        </span>
                     </div>

         </div>
)

}