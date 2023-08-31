import { useEffect, useState } from "react";
import Wave from "wave-visualizer";

import { useSelector } from "react-redux";

const BottomMenuAudioInputVolumn = ({ default_volumn, deviceid, type }) => {
  const [volumn, setVolumn] = useState(0);
  const [grades, setGrades] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  let [wave] = useState(new Wave());
  // Theme color dark and light
  const theme_color = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const g = Math.floor((volumn / 100) * 8);

    for (let i = 0; i < grades.length; i++) {
      grades[i] = i < g ? 1 : 0;
    }

    setGrades([...grades]);
  }, [volumn]);

  useEffect(() => {
    setVolumn(default_volumn);
    let newstream;

    navigator.mediaDevices
      .getUserMedia({
        audio: {
          deviceId: deviceid,
        },
      })
      .then((stream) => {
        newstream = stream;
        console.log(stream, "safadgsfgd");
        wave.fromStream(stream, `output_${deviceid}`, {
          colors: ["grey", "white", "blue"],
        });
      });

    return () => {
      newstream?.getTracks().forEach((track) => track.stop());
    };
  }, [default_volumn, deviceid, wave]);

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        gap: "3px",
        height: "30px",
        right: type == "lobby" ? "5px" : "10px",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* {
                grades.map((v, i) => (
                    <div
                        key={ i }

                        style={
                            {
                                position: "relative",
                                width: "3px",
                                height: "100%",
                                backgroundColor: !v ? (theme_color == "dark" ? "#143F63" : "#cccccc") : (theme_color == "dark" ? "white" : "#143F63"),
                            }
                        }

                        onClick={ (e) => {
                                e.stopPropagation()
                                setVolumn((i + 1) / 8 * 100)
                            }
                        }
                    >
                        <div
                            style={
                                {
                                    position: "absolute",
                                    width: "2px",
                                    height: "100%",
                                    top: "0px",
                                    left: "3px"
                                }
                            }
                        />
                    </div>
                ))
            } */}

      <canvas id={`output_${deviceid}`} height="500" width="500"></canvas>
    </div>
  );
};

export default BottomMenuAudioInputVolumn;
