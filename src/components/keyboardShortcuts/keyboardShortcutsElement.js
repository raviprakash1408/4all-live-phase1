import { useState } from "react"
import { useSelector } from "react-redux"

const KeyboardShortcutsElement = ({ v }) =>
{
    const theme_color = useSelector(state => state.theme.theme)
    const [is_hover, setHover] = useState(false)

    return (
        <div
            style={
                {
                    display: "flex",
                    flexDirection: "row",
                    width: "full",
                    height: "full",
                    whiteSpace: "nowrap",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    backgroundColor: is_hover ? theme_color == "dark" ? "#012243" : "#E1E7EA" : "",
                    alignItems: "center",
                    justifyContent: "space-between"
                }
            }

            onMouseEnter={ () => setHover(true) }
            onMouseLeave={ () => setHover(false) }
        >
            <div
                style={
                    {
                        color: theme_color == "dark" ? "#E1E7EA" : "#88A1AB",
                        fontSize: "11px",
                        fontWeight: "400"
                    }
                }
            >
                { v.label }
            </div>

            <div
                style={
                    {
                        display: "flex",
                        flexDirection: "row",
                        width: "100px",
                        height: "21px",
                        border: "1px solid #88A1AB",
                        borderRadius: "4px",
                        overflow: "hidden",
                    }
                }
            >
                <div
                    style={
                        {
                            display: "flex",
                            width: "35px",
                            maxWidth: "35px",
                            height: "21px",
                            backgroundColor: "#88A1AB",
                            alignItems: "center",
                            justifyContent: "center"
                        }
                    }
                >
                    <img src={ "/assets/icons/keyboard_mini"+(theme_color == "dark" ? "" : "_white")+".svg" } />
                </div>

                <div
                    style={
                        {
                            display: "flex",
                            width: "100%",
                            color: "#88A1AB",
                            fontSize: "11px",
                            fontWeight: "700",
                            textAlign: "center",
                            alignItems: "center",
                            justifyContent: "center"
                        }
                    }
                >{
                    navigator.platform.indexOf("Win") == 0 ?
                        v.hot_key_win :
                        navigator.platform.indexOf("Mac") == 0 ?
                            v.hot_key_osx : ""
                }</div>
            </div>
        </div>
    )
}

export default KeyboardShortcutsElement