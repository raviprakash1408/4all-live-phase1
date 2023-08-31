import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BottomMenuAudioInputVolumn from "../bottom_menu_audio_input_volumn";
// @ts-ignore
import AudioInput from "./audioIndicator.tsx";

function MicList(props) {
  const [devices, setDevices] = useState<[{ deviceId: string; label: string }]>(
    [{ deviceId: "", label: "" }]
  );
  const [devicesOutput, setDevicesOutput] = useState<
    [{ deviceId: string; label: string }]
  >([{ deviceId: "", label: "" }]);

  const [deviceId, setDeviceId] = useState(
    localStorage.getObject("micDeviceId")
  );
  // const [deviceId, setDeviceId] = useState(
  //   localStorage.getObject("micDeviceId") == "null"
  //     ? localStorage.getObject("micDeviceId")
  //     : devices[0].deviceId
  // );
  const [speakerdeviceId, setspeakerdeviceId] = useState(
    localStorage.getObject("audioOutputDeviceId")
  );
  const audioOutputDevices = useSelector(
    (state) => state.local.audioOutputDevices
  );

  console.log(audioOutputDevices, "audioOutputDevicesaudioOutputDevices");

  const handleDevices = React.useCallback(
    (mediaDevices) => {
      setDevices(mediaDevices.filter(({ kind }) => kind === "audioinput"));
      setDevicesOutput(
        mediaDevices.filter(({ kind }) => kind === "audiooutput")
      );
    },
    [setDevices, setDevicesOutput]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return (
    <div
      style={{
        maxHeight: "310px",
        width: "270px",
        overflowY: "scroll",
        padding: "5px 0px",
      }}
    >
      <p style={{ padding: "10px 15px", margin: "0px" }}>Audio Input</p>
      {devices.map((device, key) => (
        <div
          style={{
            display: "flex",

            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 15px",
            // gap: "100px",
            fontFamily: "URW DIN REGULAR",
            fontSize: "14px",
            backgroundColor:
              deviceId == device.deviceId ? "rgb(0, 139, 205)" : "",
            color: deviceId == device.deviceId ? "white" : "",
            // border:
            //   deviceId == device.deviceId
            //     ? "1px solid rgb(0, 139, 205)"
            //     : "none",
          }}
          onClick={() => {
            props.handleClose();
            setDeviceId(device.deviceId);
            props.setdeviceId(device.deviceId);
            localStorage.setObject("micDeviceId", device.deviceId);
          }}
        >
          <p
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              width: "200px",
              padding: "0px",
              margin: "0px",
            }}
          >
            {device.label || `Device ${key + 1}`}
          </p>
          <BottomMenuAudioInputVolumn
            deviceid={device.deviceId}
            default_volumn={0}
            type="lobby"
          />
          {/* <AudioInput deviceid={device.deviceId} default_volumn={0} /> */}
        </div>
      ))}
      <p style={{ padding: "10px 15px", margin: "0px" }}>Audio Output</p>
      {devicesOutput.map((item, index) => (
        <div
          style={{
            display: "flex",

            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 15px",
            // gap: "100px",
            fontFamily: "URW DIN REGULAR",
            fontSize: "14px",
            backgroundColor:
              speakerdeviceId == item.deviceId ? "rgb(0, 139, 205)" : "",
            color: speakerdeviceId == item.deviceId ? "white" : "",
          }}
          onClick={() => {
            props.handleClose();
            // setDeviceId(device.deviceId);
            // props.setdeviceId(device.deviceId);
            setspeakerdeviceId(item.deviceId);
            localStorage.setObject("audioOutputDeviceId", item.deviceId);
          }}
        >
          <p
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              width: "200px",
              padding: "0px",
              margin: "0px",
            }}
          >
            {item.label}
          </p>
          {/* <BottomMenuAudioInputVolumn
              deviceid={device.deviceId}
              default_volumn={0}
              type="lobby"
            /> */}
          {/* <AudioInput deviceid={device.deviceId} default_volumn={0} /> */}
        </div>
      ))}
    </div>
  );
}

export default MicList;
