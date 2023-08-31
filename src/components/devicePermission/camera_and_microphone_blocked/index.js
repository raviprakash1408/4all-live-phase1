import { useSelector } from "react-redux";

const CameraAndMicrophoneBlocked = ({ closePopupHandler, setWindow }) => {
  const theme_color = useSelector((state) => state.theme.theme);

  return (
    <div
      style={{
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
        userSelect: "none",
      }}
      onClick={() => {
        closePopupHandler();
        setWindow(null);
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          width: "520px",
          height: "410px",
          paddingTop: "40px",
          backgroundColor: theme_color == "dark" ? "#011934" : "white",
          borderRadius: "4px",
          alignItems: "center",
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          style={{
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
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.stopPropagation();
            closePopupHandler();
            setWindow(null);
          }}
        >
          <img src="/assets/icons/x.svg" />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "50px",
              height: "50px",
              borderRadius: "4px",
              backgroundColor: "#E61959",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="/assets/bottomIcons/no_mic_white.svg" />
          </div>

          <div
            style={{
              display: "flex",
              width: "50px",
              height: "50px",
              borderRadius: "4px",
              backgroundColor: "#E61959",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="/assets/bottomIcons/no_cam_white.svg" />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
            gap: "10px",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Camera and microphone are blocked
          </div>

          <div
            style={{
              color: "#88A1AB",
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
            App requires access to your camera and microphone. Click the camera
            blocked icon
            <img
              src="/assets/mockups/cam_blocked.png"
              style={{
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            />
            in your browser’s address bar.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "380px",
            maxWidth: "380px",
            height: "40px",
            paddingLeft: "10px",
            paddingRight: "10px",
            border: "2px solid rgba(3, 46, 87, 0.95)",
            color: "#88A1AB",
            fontSize: "14px",
            fontWeight: "400",
            borderRadius: "4px",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <div>Error details</div>

          <img src="/assets/icons/down.svg" />
        </div>

        <div
          style={{
            display: "flex",
            width: "400px",
            height: "40px",
            color: "white",
            backgroundColor: "#008BCD",
            borderRadius: "4px",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          Retry
        </div>
      </div>
    </div>
  );
};

export default CameraAndMicrophoneBlocked;
