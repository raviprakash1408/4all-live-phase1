import { Centrifuge, Subscription } from 'centrifuge';
import { AxiosLocal } from './axiosUtils.ts';
import { log } from 'console';

//@ts-ignore
export const client = window.client = new Centrifuge('wss://ws-svc.cluster.meetmo.io/connection/websocket', {
  maxServerPingDelay: 1000,
});
client.connect();
client.on('connected', function (ctx) {
  // now client connected to Centrifugo and authenticated.
  console.log(ctx, "centrifugocli connected");
});
client.on('connecting', function (ctx) {
  // do whatever you need in case of connecting to a server
  console.log(ctx, "centrifugocli connecting");
});
client.on('disconnected', function (ctx) {
  // do whatever you need in case of connecting to a server
  console.log(ctx, "centrifugocli disconnected");
});
const addNetworkError = (ctx) => {

  console.log(ctx, "errorerrorerrorerror");
  // show overlay with error message html

  let Error = document.createElement('div');
  // id = "error"
  Error.id = "network_error"
  Error.style.position = "absolute";
  Error.style.top = "0";
  Error.style.left = "0";
  Error.style.width = "100%";
  Error.style.height = "100%";
  Error.style.backgroundColor = "rgba(0,0,0,0.5)";
  Error.style.zIndex = "99999"
  Error.style.display = "flex";
  Error.style.justifyContent = "center";
  Error.style.alignItems = "center";
  Error.style.color = "white";
  Error.style.fontSize = "20px";
  Error.style.fontWeight = "bold";
  Error.innerHTML = "You are not connected to internet"
  document.body.appendChild(Error)


}

const removeNetworkError = (ctx) => {
  console.log(ctx, "connectedconnectedconnectedconnected");
  let Error = document.getElementById("network_error");
  if (Error) {
    Error.remove();
  }
}
// client.on('connecting', addNetworkError);
// client.on('disconnected', addNetworkError);


// client.on('connected',removeNetworkError);

export const channels = {}

export const enum CHANNEL_TYPES {
  DEVICE_STREAM = "device_stream",
  USER = "user",
  PERMISSION = "permission",
  SPACE = "space",
  USER_LOGIN = "user_login",
  SPACE_EDIT = "space_edit",
  SPACE_CHAT = "space_chat",
  SPACE_CHAT_META = "space_chat_meta",
  TEAM = "team_channel",
}

export const subscribeCentrifugoChannel = (channelType: CHANNEL_TYPES): Promise<Subscription> => {
  return new Promise((resolve, reject) => {
    let channel = ""
    switch (channelType) {
      case CHANNEL_TYPES.DEVICE_STREAM:
        console.log("device_stream");
        channel = "deviceStreamChannel";
        break;
      case CHANNEL_TYPES.USER:
        console.log("user");
        channel = "userChannel";
        break;
      case CHANNEL_TYPES.PERMISSION:
        console.log("permission");
        channel = "permissionChannel";
        break;
      case CHANNEL_TYPES.SPACE:
        console.log("space");
        channel = "eventChanel";
        break;
      case CHANNEL_TYPES.USER_LOGIN:
        channel = "loginChannel";
        break;
      case CHANNEL_TYPES.SPACE_EDIT:
        console.log("space_edit");
        channel = "spaceEditChannel";
        break;
      case CHANNEL_TYPES.SPACE_CHAT:
        console.log("space_chat");
        channel = "chatChanel";
        break;
      case CHANNEL_TYPES.SPACE_CHAT_META:
        console.log("space_chat_meta");
        channel = "chatMetaChanel";
        break;
      case CHANNEL_TYPES.TEAM:
        console.log("team_channel");
        channel = "team_channel";
        break;
      default:
        console.log("default");
    }

    // API call to get channel name and token
    AxiosLocal.post(`centrifugo/${channelType}`).then((res: { data: { channel_name: any; token: any; }; }) => {
      let channelName = res.data.channel_name
      let channelToken = res.data.token

      // If channel already exists then unsubscribe it
      if (window[channel]) {
        resolve(window[channel])
      } else {
        // Subscribe to new channel
        try {
          const channelSubscription = window[channel] = client.newSubscription(channelName, { token: channelToken, joinLeave: true });
          channelSubscription.subscribe()
          // channels[channelType] = channelSubscription
          channelSubscription.on('subscribed', function (ctx: any) {
            // handle new Publication data coming from channel "news".
            // console.log("centrifugoCentralised");
          });


          if (channelType === CHANNEL_TYPES.USER_LOGIN) {
            //@ts-ignore
            channelSubscription.on('connecting', function (context: any) {
              console.log("disconnected to cf", context)
              // do whatever you need in case of disconnect from server
            });
          }

          //@ts-ignore
          channelSubscription.on('reconnect', function (context: any) {
            console.log("reconnected to cf", context)
            // do whatever you need in case of disconnect from server
          });

          //@ts-ignore
          channelSubscription.on('connect', function (context: any) {
            console.log("connected to cf", context)
            // do whatever you need in case of disconnect from server
          });

          channelSubscription.on('error', function (context: any) {
            console.log("centrifugo error", context)
            // do whatever you need in case of disconnect from server
          });


          resolve(channelSubscription)
        }
        catch (error) {
          // console.log(error,"centrifugoCentralised");

          reject(error)
        }
      }



    })
  });
};

