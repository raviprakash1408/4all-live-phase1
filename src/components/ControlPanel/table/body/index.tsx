import React from "react"
// @ts-ignore
import { CollapsibleRow } from "./collapsibleRow.tsx"
interface CustomTableBodyProps{
    tableData: any[],
    colapsible: boolean,
    colapsibleField: string,
    colapsibleFieldMap: any,
    bodyData: any[],
    draggable: boolean,
    onDrop: (e: any) => void,
}
    
export const TableBody = ({tableData,colapsible,colapsibleField,colapsibleFieldMap,bodyData,draggable,onDrop}:CustomTableBodyProps)=>{
    const getTableData = ()=>{
        console.log(tableData,"tableDatatableData");
        
     if(colapsible){
        return Object.keys(colapsibleFieldMap).map((key:any,index)=>{
        const data = tableData.filter((item:any)=>item[colapsibleField] === key)
     
        
            return (
                <div key={index}>
                    <CollapsibleRow 
                    draggable={draggable}
                        field={key}
                        name={colapsibleFieldMap[key]}
                        data={data}
                        onDrop={onDrop}
                    />
                </div>
            )
        
        })
     }
    }
return (
            <div style={{
                display: "flex",
                width: "100%",
                // marginLeft: "5%",
                marginTop: "10px",
              
                justifyContent: "space-around",
                height: "100%",
                flexDirection: "column",
                gap: "10px",
            }}>
             {getTableData()}
                </div>

)

}