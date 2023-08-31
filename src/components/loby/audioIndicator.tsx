import {
    useEffect,
    useState
} from "react"
import Wave from 'wave-visualizer';

import { useSelector } from "react-redux";
// @ts-ignore
import { RootState } from "../../state/store.tsx";
import React from "react";

const AudioInput = ({ default_volumn,deviceid }) => {
    const [volumn, setVolumn] = useState(0)
    const [grades, setGrades] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  
    let [wave] = useState(new Wave());
    // Theme color dark and light
    const theme_color = useSelector((state:RootState) => state.theme.theme)

    useEffect(() => {
        const g = Math.floor((volumn / 100) * 8)

        for(let i = 0; i < grades.length; i++) {
            grades[i] = i < g ? 1 : 0
        }

        setGrades([...grades])
    }, [grades, volumn])

    useEffect(() => {
        setVolumn(default_volumn)
       
       
        navigator.mediaDevices.getUserMedia({ audio: {
            deviceId:deviceid
          }}).then(stream=>{
          console.log(stream, "streamstream");
          
            // @ts-ignore
            wave.fromStream(stream, `output_${deviceid}`, {
                colors: ["#008BCD", "#008BCD", "#008BCD"],
              });
            
        })
       
    }, [default_volumn, deviceid, wave])

    return (
        <div
            style={
                {
                    position: "absolute",
                    display: "flex",
                    flexDirection: "row",
                    gap: "2px",
                    height: "30px",
                    right: "5px"
                }
            }

            onClick={ (e) => e.stopPropagation() }
        >


<canvas id={`output_${deviceid}`} height="500" width="500"></canvas>
        </div>
    )
}

export default AudioInput