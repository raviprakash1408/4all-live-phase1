import React, { useEffect } from "react";
import Webcam from "react-webcam";
import { setVideoInputDeviceId } from "../../state/mediaDevices/mediaDeviceSlice";
import { useDispatch } from "react-redux";

const CameraList = (props) => {
  const [devices, setDevices] = React.useState<
    [{ deviceId: string; label: string }]
  >([{ deviceId: "", label: "" }]);
  const [deviceId, setDeviceId] = React.useState(
    localStorage.getObject("camDeviceId")
  );
  const handleDevices = React.useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  const dispatch = useDispatch();
  //get current local video track

  return (
    <div>
      {devices.map((device, key) => (
        <div
          key={key}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "5px",
            // gap: "10px",
            border:
              deviceId == device.deviceId
                ? "1px solid rgb(0, 139, 205)"
                : "none",
            color: "#88A1AB",
            fontFamily: "URW DIN REGULAR",
            fontSize: "14px",
            borderRadius: "4px",
          }}
          onClick={() => {
            props.handleClose();
            setDeviceId(device.deviceId);
            props.setdeviceId(device.deviceId);
            localStorage.setObject("camDeviceId", device.deviceId);
            dispatch(setVideoInputDeviceId(device.deviceId));
          }}
        >
          <div style={{ position: "relative" }}>
            <Webcam
              height={180}
              width={300}
              audio={false}
              videoConstraints={{
                deviceId: device.deviceId,
                aspectRatio: 16 / 9,
              }}
            />
            <p
              style={{
                position: "absolute",
                bottom: "5px",
                left: "0px",
                right: "0px",
                color: "white",
                textAlign: "center",
              }}
            >
              {device.label || `Device ${key + 1}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CameraList;
