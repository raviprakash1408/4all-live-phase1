import styled from "@emotion/styled"
import React from "react"
// @ts-ignore
import { TableBody } from "./body/index.tsx"
// @ts-ignore
import { Header } from "./header.tsx"


// styled input component
const Input = styled.input`
    width: 100%;
    background-color: #012A50;
    height: 20px;
    border:none;
    color: white;
    padding-left: 10px;
    &:focus{
        outline: none;
    }
    &::placeholder{
        color: white;

    
    }
`

interface CustomTableProps{
    tableData: any[],
    headerData: string[],
    colapsible: boolean,
    colapsibleField: string,
    colapsibleFieldMap: any,
    bodyData: any[],
    OnDrop: (e: any) => void,
}
    

export const CustomTable = ({tableData,headerData,colapsible,colapsibleField,colapsibleFieldMap,bodyData,OnDrop}:CustomTableProps)=>{

    

return (
            <div style={{
                display: "flex",
                width: "90%",
                marginLeft: "5%",
                marginTop: "2%",
                flexDirection: "column",
            }}>
                <div style={{
                    width: "30%",
                    display: "flex",
                    fontSize: "20px",
                    justifyContent: "space-between",
                    border: "1px solid rgba(156, 226, 184, .2)",
                    paddingLeft: "10px",

                }}>
                <img src="/assets/images/search.svg" alt="" />
              <Input 
                placeholder={"Search user"}
              
               type="text"   />
               </div>
               <div>
               <Header headerData={headerData}/>
                <TableBody onDrop={OnDrop} draggable={true}  bodyData={bodyData} colapsible={colapsible} colapsibleField={colapsibleField} colapsibleFieldMap={colapsibleFieldMap}  tableData={tableData}/>
               </div>
            </div>
)

}