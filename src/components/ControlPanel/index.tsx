import React, { useEffect, useState } from "react";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
// @ts-ignore
import { Header } from "./header/index.tsx";
// @ts-ignore
import { CustomTable } from "./table/index.tsx";
// @ts-ignore
import { client } from "../../utilities/centrifugoUtils.ts";
import {
  setOnlineUsers,
  setOnlineUserCounts,
} from "../../state/controlpannel/slice.ts";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

let askForDevicesBool = true;

export interface tableData {
  id: number;
  name: string;
  profilePic: string;
  role: string;
  userType: "P" | "S" | "V";
  volume?: number;
  guest?: boolean;
  handRised?: boolean;
  streamType?: "Desktop" | "Device" | "Video" | "Camera";
  url?: string;
  position?: number;
  file_name?: string;
}

interface HeaderData {
  field: string;
  type:
    | "text"
    | "image"
    | "icon"
    | "button"
    | "dropdown"
    | "switch"
    | "slider"
    | "input"
    | "checkbox"
    | "radio"
    | "link"
    | "avatarWithName";
}

const eventPublication = (ctx, tableData, setTableData) => {
  console.log(ctx, tableData, "eventPublication");
  switch (ctx.data.event) {
    case "getDevicesResponce":
      let devices = ctx.data.devices;
      console.log(devices, " getDevicesResponce");
      let tableDataCopy = [...tableData];
      tableDataCopy = tableDataCopy.concat(...devices);
      // remove duplicates based on id
      tableDataCopy = tableDataCopy.filter(
        (thing, index, self) =>
          index === self.findIndex((t) => t.id === thing.id)
      );

      setTableData(tableDataCopy);
      console.log(tableDataCopy, "tableDataCopy");

      break;
    case "askForDevices":
      console.log("askForDevices");
      setTimeout(() => {
        window.eventChanel.publish({ event: "getDevices" });
      }, 2000);

      break;
    default:
      break;
  }
};
export const ControlPanel = (props) => {
  // get table data from api
  const location = useLocation();
  const [tableData, setTableData] = useState<tableData[]>([]);
  // header data
  const [headerData, setHeaderData] = useState<HeaderData[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    AxiosLocal.get(
      `subroom/users/${window.location.pathname.split("/")[2]}`
    ).then((response) => {
      let data = [];
      if (response.data.status) {
        response.data.data.forEach((item: any) => {
          item.items.forEach((user) => {
            let singleUser: tableData = {
              id: user.id,
              name: user.name,
              profilePic: user.img,
              role: user.role,
              userType: user.viewType,
              streamType: "Camera",
            };
            // @ts-ignore
            data.push(singleUser);
          });
        });

        setTableData(data);
      }
    });
    // mock data

    // setTableData([
    //   {
    //     id: 1,
    //     name: "Amruth",
    //     profilePic: "https://pub-d6edaebcd6474ac499bdcb399e4e121c.r2.dev/e4751c74-7df8-4f3b-b6bd-d26aa656edea.jpg",
    //     role: "Admin",
    //     userType: "S",
    //     volume: 0,
    //     guest: false,
    //     handRised: false,
    //     streamType: "Device",
    //     position: 1,

    //   },
    //   {
    //     id: 2,
    //     name: "John Doe",
    //     profilePic: "https://pub-d6edaebcd6474ac499bdcb399e4e121c.r2.dev/2568abb2-3fce-4d38-84ef-aee6958567e7.jpg",
    //     role: "Admin",
    //     userType: "P",
    //     volume: 0,
    //     guest: false,
    //     handRised: false,
    //     streamType: "Desktop",
    //     position: 2,
    //   },
    //   {
    //     id: 3,
    //     name: "Anish",
    //     profilePic: "https://pub-d6edaebcd6474ac499bdcb399e4e121c.r2.dev/a8f57d42-ea6d-4360-aaa0-96150772f97c.jpg",
    //     role: "Admin",
    //     userType: "V",
    //     volume: 0,
    //     guest: false,
    //     handRised: false,
    //     streamType: "Video",
    //     position: 3,

    //   },
    //   {
    //     id: 4,
    //     name: "Lakshmi",
    //     profilePic: "https://pub-d6edaebcd6474ac499bdcb399e4e121c.r2.dev/2568abb2-3fce-4d38-84ef-aee6958567e7.jpg",
    //     role: "Admin",
    //     userType: "P",
    //     volume: 0,
    //     guest: false,
    //     handRised: false,
    //     streamType: "Desktop",
    //     position: 4,
    //   },
    // ]
    // )
    // setHeaderData(["Name", "Role", "Volume"])
    setHeaderData([
      { field: "Name", type: "avatarWithName" },
      { field: "Role", type: "dropdown" },
      { field: "Volume", type: "slider" },
    ]);
  }, []);

  useEffect(() => {
    if (tableData.length > 0) {
      AxiosLocal.get(
        `subroom/${window.location.pathname.split("/")[2]}`,
        {}
      ).then((result) => {
        let path = location.pathname.substring(
          location.pathname.lastIndexOf("/") + 1
        );
        AxiosLocal.post("centrifugo/space", {
          subspace_slug: path,
        }).then((res) => {
          console.log(`res`, res);
          let eventToken = res.data.token;
          let eventChanel;
          try {
            // @ts-ignore
            if (window.eventChanel) {
              // @ts-ignore
              eventChanel = window.eventChanel;
            } else {
              // @ts-ignore
              eventChanel = window.eventChanel = client.newSubscription(
                res.data.channel_name,
                {
                  token: eventToken,
                  joinLeave: true,
                }
              );

              //
              // eventChanel.subscribe();
            }
          } catch (error) {
            console.log(error, "no event channel");
          }

          // eventchannel on publish
          eventChanel.on("publication", (ctx) =>
            eventPublication(ctx, tableData, setTableData)
          );
          if (askForDevicesBool) {
            eventChanel.publish({ event: "getDevices" });
            askForDevicesBool = false;
          }

          eventChanel.presence().then((presence) => {
            let presentUsers = Object.keys(presence.clients).map((key) => {
              return presence.clients[key].chan_info;
            });

            console.log("presentUsers", presentUsers);
            let newParticipants = {};

            // loop through participants and map the participant id to the participant
            for (const user of tableData) {
              console.log("tableData 1", user);
              if (user.streamType == "Device") {
                newParticipants[`${user.id}_desktop`] = { ...user };
              } else {
                newParticipants[user.id] = { ...user };
              }
            }

            dispatch(setOnlineUsers(presentUsers));
            let primaryUsers = {};
            let secondaryUsers = {};
            let viewerUsers = {};

            for (const [key, value] of Object.entries(newParticipants)) {
              if (value.userType == "P") {
                primaryUsers[key] = value;
              }
              if (value.userType == "S") {
                secondaryUsers[key] = value;
              }
              if (value.userType == "V") {
                viewerUsers[key] = value;
              }
            }
            dispatch(
              setOnlineUserCounts({
                primary: Object.keys(primaryUsers).length,
                secondary: Object.keys(secondaryUsers).length,
                hidden: Object.keys(viewerUsers).length,
                online: presentUsers.length,
                offline: tableData.length - presentUsers.length,
                handraise: 0,
                guest: 0,
              })
            );

            console.log(
              "presentUsers",
              newParticipants,
              primaryUsers,
              secondaryUsers,
              viewerUsers
            );
          });
        });
      });
    }

    return () => {
      if (window.eventChanel) {
        window.eventChanel.removeAllListeners("publication");
      }
    };
  }, [dispatch, tableData, setTableData]);
  return (
    <div
      style={{
        backgroundColor: "#012A50",
        height: "100vh",
      }}
    >
      <Header />
      <CustomTable
        colapsibleFieldMap={{
          P: "Primary",
          S: "Secondary",
          V: "Hidden",
        }}
        OnDrop={(e, userType, header, position) => {
          // get the id of the dragged element
          const id = e.dataTransfer.getData("text");
          // set the position of the dragged element
          const draggedElement = tableData.find(
            (item) => item.id === parseInt(id)
          );
          if (draggedElement) {
            let newElement = { ...draggedElement };
            newElement.position = position;
            newElement.userType = userType;
            // remove the dragged element from the table data
            const newTableData = tableData.filter(
              (item) => item.id !== parseInt(id)
            );

            // add the dragged element to the table data
            newTableData.push(newElement);

            // set the new table data
            setTableData(newTableData);

            console.log(newElement);
            // @ts-ignore
            window.eventChanel.publish({
              event: "director_mode_drop",
              value: {
                user_id_1: newElement.id,
                position_1: 1,
                user_type: newElement.userType,
              },
              user_id: 555,
              livekit: false,
            });
          }
        }}
        bodyData={["name", "role", "volume"]}
        colapsibleField={"userType"}
        colapsible={true}
        headerData={headerData}
        tableData={tableData}
      />
    </div>
  );
};
