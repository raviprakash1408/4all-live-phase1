import React from "react"

interface CountProps{
    icon: string,
    label: string,
    count: number
}

export const Count = (props:CountProps)=>{

return (
        <div className="count" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            backgroundColor: "#012A50",
            // border: "1px solid red",
            padding: "10px 10px",
            height: "40px",
            width: "150px",
        }} >
            <div className="icon">
                <img src={props.icon} alt="" />
                
            </div>
            <div className="label" style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between" ,
                alignItems: "space-between",
                marginLeft: "1vw",
                color: "white",
             
             
            }} >
                <span>{props.label}</span>
                <span>{props.count}</span>
            </div>

        </div>
)

}