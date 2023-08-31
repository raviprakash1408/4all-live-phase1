import React, { useEffect, useState, } from "react";
import SelectLabels from "../../sections/Dropdown";
import { useSelector } from "react-redux";

export const ShowLocalDevices = (props: any) => {
    // const theme = useSelector((state) => state.theme.themeData);

    const theme = useSelector(
      (state: any) => state.theme.eventTheme[state.theme.theme]
    );

    return (
      //   <div className="local-devices" style={{
      //       display: "flex",
      //       flexDirection: "column",
      //       gap: "6px",
      //       overflow: "hidden",
      //       overflowY: "auto",
      //       width: "470px",
      //       height: "264px",

      //   }}>
      //       {devices.map((device: MediaDeviceInfo, index: number) => {
      //           return (
      //             <div
      //               onClick={() => {
      //                 props.onSelectDevice(device.deviceId);
      //               }}
      //             >
      //               <video
      //                 style={{
      //                   width: "470px",
      //                   height: "264px",
      //                   aspectRatio: "16/9",
      //                   outline:
      //                     props.selecteddevice == device.deviceId
      //                       ? "2px solid #00FF00"
      //                       : "none",
      //                 }}
      //                 key={index}
      //                 id={`video_local_${device.deviceId}`}
      //                 className="local-device"
      //                 autoPlay={true}
      //                 muted={true}
      //                 playsInline={true}
      //               />
      //               <p
      //                 style={{
      //                   color: "white",
      //                 }}
      //               >
      //                 {device.label}
      //               </p>
      //             </div>
      //           );
      //       }

      //       )}
      //   </div>
      <>
       
        <SelectLabels
          options={props.options}
          type="localDevice"
          setdeviceId={props.selecteddevice}
          permission={true}
          theme={theme}
          handleChange={props.onSelectDevice}
        />
      </>
    );

}