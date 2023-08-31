import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../state/store.ts"
// @ts-ignore
import { Count } from "./counts.tsx"

interface Counter{
    icon: string,
    label: string,
    count: number
}

export const Header = (props)=>{
    // state for counts
    const [counts, setCounts] = React.useState<Counter[]>()
    const UserCounts = useSelector((state:RootState)=>state.controlpanel.UserCounts)
    // get counts from api
    React.useEffect(()=>{
        // fetch("http://localhost:3000/api/counts")
        // .then(res=>res.json())
        // .then(data=>{
        //     setCounts(data)
        // })

        // mock data
        setCounts([
            {
                icon: "/assets/icons/green_dot.svg",
                label: "Online",
                count:UserCounts.online
            },
            {
                icon: "/assets/icons/red_dot.svg",
                label: "Offline",
                count: UserCounts.offline
            },
            {
                icon: "/assets/icons/hand.svg",
                label: "Hand Raised",
                count: UserCounts.handraise
            },
            {
                icon: "/assets/icons/primary.svg",
                label: "Primary",
                count: UserCounts.primary
            },
            {
                icon: "/assets/icons/secondary.svg",
                label: "Secondary",
                count: UserCounts.secondary
            },
            {
                icon: "/assets/icons/eye_icon.svg",
                label: "Hidden",
                count: UserCounts.hidden
            },
            {
                icon: "/assets/icons/viewer.svg",
                label: "Guest",
                count: UserCounts.guest
            }
          
          ])

    }, [UserCounts])

    const getcounts = ()=>{
        if(counts){
            return counts.map((count,index)=>{
                return <Count key={index} icon={count.icon} label={count.label} count={count.count}/>
            })
        }
    }
return (
         <div className="header" style={{
            // marginTop: "8vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
         }}>
              <h2 style={{
                color: "white",
              }} >Real-time Space Control Panel</h2>

              <div style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
           
              }}>
                {getcounts()}
              </div>
         </div>
)

}