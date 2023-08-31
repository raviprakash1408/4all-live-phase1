import React, { useRef } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomAvatarGroup from "../../admin/CustomAvatarGroup";
import { dateToString } from "../../utilities/common";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import {
  setSpaceChat,
  addSpaceChat,
  newChatState,
  //@ts-ignore
} from "../../state/spaceChat/spaceChatSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ChatMessage(props) {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState(false);

  const chatHistory = useSelector((state: any) => state.spaceChats.spaceChats);

  const eventTheme = useSelector(
    (state: any) => state.theme.eventTheme[state.theme.theme]
  );
  const location = useLocation();

  function linkify(text) {
    if (text === null || text === undefined) {
      return "";
    }
    var urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '" target="__blank">' + url + "</a>";
    });
  }

  React.useEffect(() => {
    let path = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    console.log(path, "pathChatHistory");

    // Get Chat History
    async function getChatHistory() {
      AxiosLocal.get(
        `chat/?subspace_slug=${path}&offset=0&limit=100&team_slug=${props.team_slug}`
      ).then((resp) => {
        dispatch(setSpaceChat([...resp.data.chat_messages.paginated_data]));
      });
    }
    try {
      // Chat Channel Listener for new messages
      //@ts-ignore
      window.chatChanel.on("publication", (event) => {
        console.log(event, "event");
        //@ts-ignore
        if (event.data.type === "space_chat") {
          let recievedMessage = {
            id: 1,
            message: event.data.message,
            message_type: "PB",
            created: event.data.datetime,
            sender_id: event.data.sender.id,
            sender_first_name: event.data.sender.first_name,
            sender_last_name: event.data.sender.last_name,
            sender_avatar: event.data.sender.avatar,
          };
          //@ts-ignore
          dispatch(addSpaceChat({ ...recievedMessage }));
        }
      });
    } catch (e) {
      console.log(e, "e");
    }
    getChatHistory();
    return () => {
      //@ts-ignore
      window.chatChanel.removeAllListeners("publication");
    };
  }, []);

  return (
    <>
      <div>
        {chatHistory.length > 0 &&
          chatHistory.map((item: any, index: number) => {
            return parseInt(item.sender_id) !==
              //@ts-ignore
              parseInt(localStorage.getObject("id")) ? (
              <Card
                sx={{
                  width: 320,
                  backgroundColor: eventTheme.bg_color_1,
                  color: "#ffffff",
                  ".MuiCardHeader-title": {
                    color: "#ffffff",
                    fontFamily: "URW DIN",
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "22px",
                  },
                  ".MuiCardHeader-subheader": {
                    color: "#88A1AB",
                  },
                  ".MuiCardHeader-content": {
                    display: "flex",
                    justifyContent: "space-between",
                  },
                  marginBottom: "10px",
                }}
              >
                {parseInt(item.sender_id) !==
                  //@ts-ignore
                  parseInt(localStorage.getObject("id")) && (
                  <CardHeader
                    avatar={
                      <CustomAvatarGroup
                        item={item}
                        avatar={item.sender_avatar}
                        onlineUsersEvent={[]}
                        type="chat"
                        theme={eventTheme}
                      />
                    }
                    titleTypographyProps={{
                      fontFamily: "URW DIN REGULAR",
                    }}
                    subheaderTypographyProps={{
                      fontFamily: "URW DIN REGULAR",
                    }}
                    title={item.sender_first_name + " " + item.sender_last_name}
                    subheader={
                      item.created ? dateToString(new Date(item.created)) : ""
                    }
                    sx={{
                      padding: "16px 16px 0px 16px",
                      fontFamily: "URW DIN REGULAR",
                    }}
                  />
                )}

                <CardContent sx={{ padding: "0px 16px" }}>
                  <Typography
                    sx={{
                      color: "#88A1AB",
                      padding: "0px 16px 0px 58px",
                      fontFamily: "URW DIN REGULAR",
                      userSelect: "all",
                    }}
                    variant="body2"
                    color="text.secondary"
                  >
                    <div
                      style={{
                        textAlign: "justify",
                        inlineSize: "235px",
                        overflowWrap: "break-word",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: linkify(item.message),
                      }}
                    />
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <Card
                sx={{
                  width: 320,
                  backgroundColor: eventTheme.bg_color_1,
                  color: "#ffffff",
                  ".MuiCardHeader-title": {
                    color: "#ffffff",
                    fontFamily: "URW DIN",
                    fontSize: "16px",
                    fontWeight: 700,
                    lineHeight: "22px",
                    alignContent: "left",
                  },
                  ".MuiCardHeader-subheader": {
                    color: "#88A1AB",
                  },
                  ".MuiCardHeader-content": {
                    display: "flex",
                    justifyContent: "space-between",
                  },
                  marginBottom: "10px",
                  marginLeft: "64px",
                  paddingRight: "-10px",
                }}
              >
                <CardHeader
                  avatar={
                    <CustomAvatarGroup
                      item={item}
                      avatar={item.sender_avatar}
                      onlineUsersEvent={[]}
                      type="chat"
                      theme={eventTheme}
                    />
                  }
                  titleTypographyProps={{
                    fontFamily: "URW DIN REGULAR",
                  }}
                  subheaderTypographyProps={{
                    fontFamily: "URW DIN REGULAR",
                  }}
                  title="You"
                  subheader={
                    item.created ? dateToString(new Date(item.created)) : ""
                  }
                  sx={{
                    padding: "16px 16px 0px 16px",
                  }}
                />
                <CardContent sx={{ padding: "0px 16px" }}>
                  <Typography
                    sx={{
                      color: "#88A1AB",
                      padding: "0px 16px 0px 58px",
                      fontFamily: "URW DIN REGULAR",
                      userSelect: "all",
                    }}
                    variant="body2"
                    color="text.secondary"
                  >
                    <div
                      style={{
                        textAlign: "justify",
                        inlineSize: "235px",
                        overflowWrap: "break-word",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: linkify(item.message),
                      }}
                    />
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </>
  );
}
