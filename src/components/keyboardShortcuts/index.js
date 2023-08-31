import { useSelector } from "react-redux"
import KeyboardShortcutsElement from "./keyboardShortcutsElement"

const KeyboardShortcuts = ({ closePopupHandler, setWindow }) =>
{
    const theme_color = useSelector(state => state.theme.theme)

    const all_shortcuts = [
        {
            label: "Show or hide videos thumbnails",
            hot_key_win: "S",
            hot_key_osx: "S"
        },
        {
            label: "Show or hide all UI elements",
            hot_key_win: "Alt + F",
            hot_key_osx: "Option + F"
        },
        {
            label: "Mute or unmute your microphone in all groups",
            hot_key_win: "M",
            hot_key_osx: "M"
        },
        {
            label: "Start or stop your camera in all groups",
            hot_key_win: "V",
            hot_key_osx: "V"
        },
        {
            label: "Open or close chat",
            hot_key_win: "C",
            hot_key_osx: "C"
        },
        {
            label: "Open or close users",
            hot_key_win: "U",
            hot_key_osx: "U"
        },
        {
            label: "Open or close notes",
            hot_key_win: "N",
            hot_key_osx: "N"
        },
        {
            label: "Open or close images",
            hot_key_win: "I",
            hot_key_osx: "I"
        },
        {
            label: "Open or close files",
            hot_key_win: "T",
            hot_key_osx: "T"
        },
        {
            label: "Open or close groups",
            hot_key_win: "G",
            hot_key_osx: "G"
        },
        {
            label: "View or exit full screen",
            hot_key_win: "F",
            hot_key_osx: "F"
        },
        {
            label: "Toggle Tile layout",
            hot_key_win: "W",
            hot_key_osx: "W"
        },
        {
            label: "Toggle 1cam layout",
            hot_key_win: "Alt + 1",
            hot_key_osx: "Option + 1"
        },
        {
            label: "Toggle 2cam layout",
            hot_key_win: "Alt + 2",
            hot_key_osx: "Option + 2"
        },
        {
            label: "Toggle 3cam layout",
            hot_key_win: "Alt + 3",
            hot_key_osx: "Option + 3"
        },
        {
            label: "Toggle 4cam layout",
            hot_key_win: "Alt + 4",
            hot_key_osx: "Option + 4"
        },
        {
            label: "Show or hide keyboard shortcuts",
            hot_key_win: "?",
            hot_key_osx: "?"
        },
        {
            label: "Push to talk in all groups",
            hot_key_win: "SPACE",
            hot_key_osx: "SPACE"
        },
        {
            label: "Push to talk in the main group",
            hot_key_win: "SPACE + 0",
            hot_key_osx: "SPACE + 0"
        },
        {
            label: "Push to talk in group 1-9",
            hot_key_win: "SPACE + 1-9",
            hot_key_osx: "SPACE + 1-9"
        },
        {
            label: "Cut to your videos feed",
            hot_key_win: "0",
            hot_key_osx: "0"
        },
        {
            label: "Cut to another user's video feed",
            hot_key_win: "1-9",
            hot_key_osx: "1-9"
        },
        {
            label: "Start or stop recording the space",
            hot_key_win: "R",
            hot_key_osx: "R"
        },
        {
            label: "Copy incitation sharable Link",
            hot_key_win: "Alt + C",
            hot_key_osx: "Option + C"
        }
    ]

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
                        width: "530px",
                        height: "860px",
                        maxHeight: "90vh",
                        backgroundColor: theme_color == "dark" ? "#011934" : "white",
                        borderRadius: "4px"
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
                            color: theme_color == "dark" ? "white" : "#375C78",
                            width: "full",
                            fontSize: "20px",
                            fontWeight: "700",
                            textAlign: "center",
                            padding: "30px"
                        }
                    }
                >
                    Keyboard shortcuts
                </div>

                <div
                    className="vertical-scrollbar"

                    style={
                        {
                            display: "flex",
                            maxHeight: "calc(100% - 100px)",
                            flexDirection: "column",
                            gap: "6px",
                            overflow: "hidden",
                            overflowY: "auto"
                        }
                    }
                >
                    {
                        all_shortcuts.map((v, i) =>
                            (
                                <KeyboardShortcutsElement
                                    key={ i }
                                    v={ v }
                                />
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default KeyboardShortcuts