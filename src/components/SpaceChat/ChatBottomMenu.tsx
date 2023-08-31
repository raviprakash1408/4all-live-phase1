import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import debounce from "lodash.debounce";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ChatBottomMenu(props) {
  const [message, setMessage] = React.useState("");
  const [typingSent, settypingSent] = React.useState(false);

  const location = useLocation();
  const eventTheme = useSelector(
    (state: any) => state.theme.eventTheme[state.theme.theme]
  );
  // useEffect(() => {
  //   // Chat Channel Subscription
  //   AxiosLocal.post("centrifugo/space_chat_meta", {
  //     subspace_id: localStorage.getObject("currentSubSpaceId"),
  //   }).then((res) => {
  //     console.log(res.data, "centrifugoChat");
  //     try {
  //       // @ts-ignore
  //       if (window.chatChanelMeta) {
  //         // @ts-ignore
  //         window.chatChanelMeta.unsubscribe();
  //       }
  //     } catch (error) {
  //       console.log(error, "no event channel");
  //     }
  //     // @ts-ignore
  //     let chatChanelMeta = (window.chatChanelMeta = client.newSubscription(
  //       res.data.channel_name,
  //       {
  //         token: res.data.token,
  //         joinLeave: true,
  //       }
  //     ));
  //     chatChanelMeta.subscribe();
  //   });
  // }, []);

  const sendMessage = () => {
    console.log(message, "message");
    let path = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    if (message !== "") {
      // @ts-ignore
      window.chatChanel.publish({
        type: "space_chat",
        message: message,
        sender: {
          id: localStorage.getObject("id"),
          first_name: localStorage.getObject("username"),
          last_name: localStorage.getObject("last_name"),
          avatar: localStorage.getObject("avatar"),
        },
        datetime: new Date(),
      });
      setMessage("");
      AxiosLocal.post("chat/", {
        subspace_slug: path,
        message: message,
        team_slug: props.team_slug,
      })
        .then((res) => {
          console.log(res.data, "chat");
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
  };

  const handleTyping = () => {
    if (!typingSent) {
      console.log("typing sent");
      try {
        // @ts-ignore
        window.chatChanelMeta.publish({
          type: "space_chat_typing",
          sender: {
            id: localStorage.getObject("id"),
            first_name: localStorage.getObject("username"),
            last_name: localStorage.getObject("last_name"),
            avatar: localStorage.getObject("avatar"),
          },
        });
      } catch (error) {
        console.log(error, "error");
      }

      settypingSent(true);
    }
    // debounce(handleTypingStop, 300);
    handleTypingStop();
    // debounce(handleTypingStop, 3000);
  };

  const handleTypingStop = debounce(() => {
    console.log("typing stopped sent");
    try {
      //@ts-ignore
      window.chatChanelMeta.publish({
        type: "space_chat_typing_stopped",
        sender: {
          id: localStorage.getObject("id"),
          first_name: localStorage.getObject("username"),
          last_name: localStorage.getObject("last_name"),
          avatar: localStorage.getObject("avatar"),
        },
      });
    } catch (error) {
      console.log(error, "error");
    }

    settypingSent(false);
  }, 3000);

  // const handleTypingStop = () => {
  //   console.log("typing stopped sent");
  // };

  function debounce(cb, delay = 3000) {
    let timeout;

    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  // const handleTypingStop = () => {
  //   // if (typingSent) {
  //   console.log("typing stopped sent");
  //   // @ts-ignore
  //   window.chatChanel.publish({
  //     type: "space_chat_typing_stopped",
  //     sender: {
  //       id: localStorage.getObject("id"),
  //       first_name: localStorage.getObject("username"),
  //       last_name: localStorage.getObject("last_name"),
  //       avatar: localStorage.getObject("avatar"),
  //     },
  //   });
  //   typingSent = false;
  // };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          width: "90%",
          position: "absolute",
          bottom: "10px",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{ display: "flex" }}>
        <TextField
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
          fullWidth
          sx={{
            backgroundColor: eventTheme.bg_color_2,
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: "none",
              },
          }}
          inputProps={{ style: { color: "#ffffff" } }}
          id="outlined-required"
          variant="outlined"
          placeholder="Type a message"
          autoFocus={false}
          value={message}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              sendMessage();
              ev.preventDefault();
            }
          }}
        />
        <img
          alt=""
          onClick={() => {
            sendMessage();
          }}
          style={{ width: "8%", padding: "16px", cursor: "pointer" }}
          src="/assets/admin/send-message.svg"
        />
      </div>
    </Box>
  );
}
