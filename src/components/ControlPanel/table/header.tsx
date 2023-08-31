import React from "react"

export const Header = ({headerData})=>{

    const header_data = headerData.map((item, index)=>{
        return (
            <div key={index} style={{
               
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "5px",
                color: "white",
                fontSize: "20px",
            }}>
                {item.field}
            </div>
        )
    })

return (
            <div style={{
                display: "flex",
                width: "100%",
                // marginLeft: "5%",
                marginTop: "2%",
                backgroundColor: "#012243",
                justifyContent: "space-between",
                height: "25px",
            }}>
                {header_data}
               </div>
)

}