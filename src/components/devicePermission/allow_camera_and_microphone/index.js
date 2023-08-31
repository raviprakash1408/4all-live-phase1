import { useSelector } from "react-redux"

const AllowCameraAndMicrophone = ({ closePopupHandler, setWindow }) =>
{
    const theme_color = useSelector(state => state.theme.theme)

    return (
        <div
            style={
                {
                    position: "fixed",
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    top: "0px",
                    left: "0px",
                    background: "rgba(3, 46, 87, 0.95)",
                    borderRadius: "4px",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: "99",
                    userSelect: "none"
                }
            }

            onClick={ () =>
                {
                    closePopupHandler()
                    setWindow(null)
                }
            }
        >
            <div
                style={
                    {
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                        width: "690px",
                        height: "700px",
                        paddingTop: "40px",
                        backgroundColor: theme_color == "dark" ? "#011934" : "white",
                        borderRadius: "4px",
                        alignItems: "center"
                    }
                }

                onClick={ (e) =>
                    {
                        e.stopPropagation()
                    }
                }
            >
                <div
                    style={
                        {
                            position: "absolute",
                            display: "flex",
                            width: "20px",
                            height: "20px",
                            top: "-10px",
                            right: "-10px",
                            backgroundColor: "#88A1AB",
                            borderRadius: "25px",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer"
                        }
                    }

                    onClick={ (e) =>
                        {
                            e.stopPropagation()
                            closePopupHandler()
                            setWindow(null)
                        }
                    }
                >
                    <img src='/assets/icons/x.svg' />
                </div>

                <div
                    style={
                        {
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px"
                        }
                    }
                >
                    <div
                        style={
                            {
                                display: "flex",
                                width: "50px",
                                height: "50px",
                                borderRadius: "4px",
                                backgroundColor: "#008BCD",
                                alignItems: "center",
                                justifyContent: "center",
                            }
                        }
                    >
                        <img
                            src="/assets/bottomIcons/mic_white.svg"
                        />
                    </div>

                    <div
                        style={
                            {
                                display: "flex",
                                width: "50px",
                                height: "50px",
                                borderRadius: "4px",
                                backgroundColor: "#008BCD",
                                alignItems: "center",
                                justifyContent: "center",
                            }
                        }
                    >
                        <img
                            src="/assets/bottomIcons/cam_white.svg"
                        />
                    </div>
                </div>

                <div
                    style={
                        {
                            display: "flex",
                            flexDirection: "column",
                            width: "420px",
                            gap: "10px"
                        }
                    }
                >
                    <div
                        style={
                            {
                                color: "white",
                                fontSize: "20px",
                                fontWeight: "700"
                            }
                        }
                    >Allow App to use your camera and microphone</div>

                    <div
                        style={
                            {
                                color: "#88A1AB",
                                fontSize: "16px",
                                fontWeight: "400"
                            }
                        }
                    >App needs access to your camera and microphone so that other participants can see and hear you.</div>
                </div>

                <img
                    src="/assets/mockups/allow_camera_and_microphone_mockup.png"
                />
            </div>
        </div>
    )
}

export default AllowCameraAndMicrophone