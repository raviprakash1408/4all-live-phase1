import React from "react"
// @ts-ignore
import { TableBodyRow } from "./row.tsx"

export const CollapsibleRow = ({data,name,draggable,onDrop,field})=>{
    // set open close state
    const [open, setOpen] = React.useState(false)
    const getTableData = ()=>{
        if(open){
            return data.map((item,index)=>{
                return (
                    <TableBodyRow onDrop={onDrop} draggable={draggable} key={index} data={item} />
                )
            })
        }
       
    }
return (
        <div
        onDrop={(e)=>onDrop(e,field,true)}
        onDragOver={(e)=>e.preventDefault()}
         style={{
            backgroundColor: "#002E56",
            color: "white",
            width: "100%",
            height: "auto",
         
            paddingLeft: "10px",
       
        }}>
            <div style={{
               display: "flex",
               justifyContent: "start",
               gap: "10px",
               alignItems: "center",

            }} onClick={()=>setOpen(!open)} >

            <img src={`/assets/icons/${open ?"up" :"down"  }.svg`} alt="" />
          <span>{name}</span>  
            <span style={{
                backgroundColor:"#012243",
                borderRadius: "10%",
                width: "30px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

            }}>{data.length}</span>
       
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
            }}>
            {getTableData()}

            </div>
        </div>
)

}