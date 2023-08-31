import React, { useEffect, useRef } from "react";
import Drawer from "@mui/material/Drawer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// @ts-ignore
import ChatIcon from "./ChatIcon.tsx";
// @ts-ignore
import ChatMessage from "./ChatMessage.tsx";
// @ts-ignore
import ChatBottomMenu from "./ChatBottomMenu.tsx";
// @ts-ignore
import ChatLoader from "./ChatLoader.tsx";

import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import DeleteIcon from "@mui/icons-material/Delete";
//@ts-ignore
import { clearSpaceChat } from "../../state/spaceChat/spaceChatSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../sections/Toast";
import ConfirmPop from "../../admin/components/ConfirmPop";
//@ts-ignore
import { setChatOpened } from "../../state/spaceChat/spaceChatSlice.ts";
import CustomAvatarGroup from "../../admin/CustomAvatarGroup";
import { shortNameCreator } from "../../utilities/shortName";
import { useLocation } from "react-router-dom";
import { changeOpacity, getTeamSlugFromUrl } from "../../utilities/common.js";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

interface SpaceChatProps {
  openChat: boolean;
  setopenChat: any;
}

export default function SpaceChat(props: SpaceChatProps) {
  const { openChat, setopenChat } = props;

  const [chatOpen, setchatOpen] = React.useState(false);

  const [value, setValue] = React.useState(0);

  const [typingUsers, setTypingUsers] = React.useState<any>([]);

  const [confirm, setConfirm] = React.useState<boolean>(false);

  const location = useLocation();

  const chat_messages = useSelector(
    (state: any) => state.spaceChats.spaceChats
  );

  let team_slug = getTeamSlugFromUrl("space");

  const [openUpdateToast, setOpenUpdateToast] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<string>("");
  const [updateStatus, setUpdateStatus] = React.useState<string>("success");

  const eventTheme = useSelector(
    (state: any) => state.theme.eventTheme[state.theme.theme]
  );
  const handleClickOpen = () => {
    setConfirm(true);
  };

  const handleClickClose = () => {
    setConfirm(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    let path = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    // Chat Channel Subscription
    AxiosLocal.post("centrifugo/space_chat_meta", {
      subspace_slug: path,
      team_slug: team_slug,
    }).then((res) => {
      try {
        // @ts-ignore
        if (window.chatChanelMeta) {
          // @ts-ignore
          // window.chatChanelMeta.unsubscribe();
        } else {
          let chatChanelMeta = (window.chatChanelMeta = client.newSubscription(
            res.data.channel_name,
            {
              token: res.data.token,
              joinLeave: true,
            }
          ));
          chatChanelMeta.subscribe();
        }
      } catch (error) {
        console.log(error, "no event channel");
      }
      // @ts-ignore

      try {
        //@ts-ignore
        window.chatChanelMeta.on("publication", (event) => {
          console.log(event, "event");
          //@ts-ignore
          if (
            event.data.type === "space_chat_typing" &&
            event.data.sender.id !== localStorage.getObject("id")
          ) {
            setTypingUsers([...typingUsers, event.data.sender]);
          } else if (event.data.type === "space_chat_typing_stopped") {
            setTimeout(() => {
              setTypingUsers(
                typingUsers.filter(
                  (item: any) => item.data.sender.id !== event.data.sender.id
                )
              );
            }, 2000);
          }
        });
      } catch (e) {
        console.log(e, "e");
      }
    });
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const toggleDrawer =
    (chatOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setopenChat(chatOpen);
      dispatch(setChatOpened(chatOpen));
    };

  const clearAllSpaceChat = () => {
    let path = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    dispatch(clearSpaceChat());
    AxiosLocal.delete("chat/", {
      data: { subspace_slug: path, team_slug: team_slug },
    })
      .then((res) => {
        if (res.data.status === "Success") {
          setToastMessage("Chat cleared successfully");
          setUpdateStatus("success");
          setOpenUpdateToast(true);
        } else {
          setToastMessage("Something went wrong");
          setUpdateStatus("error");
          setOpenUpdateToast(true);
        }
      })
      .catch((err) => {
        console.log(err, "clearSpaceChat");
      });
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    //@ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat_messages]);
  let shortname = shortNameCreator(
    typingUsers[typingUsers.length - 1]?.first_name,
    typingUsers[typingUsers.length - 1]?.last_name
  );
  return (
    <div>
      <React.Fragment key="right">
        {/* <ChatIcon chatOpen={chatOpen} toggleDrawer={toggleDrawer} /> */}
        <div style={{ position: "relative" }}>
          <Drawer
            BackdropProps={{ invisible: true }}
            anchor="right"
            open={openChat}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: {
                width: "440px",
                backgroundColor: changeOpacity(eventTheme?.bg_color_0, 0.7),
                height: "93vh",
                top: 60,
                boxShadow: "none",
              },
            }}
          >
            <img
              alt=""
              style={{
                position: "absolute",
                cursor: "pointer",
                top: "10px",
                left: "10px",
              }}
              className="chatCloseIcon"
              onClick={toggleDrawer(false)}
              src="/assets/admin/close-icon-grey.svg"
            />
            <DeleteIcon
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                color: "#ffffff",
              }}
              onClick={handleClickOpen}
            />
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                right: "420px",
                //left:show?"16vw":"1vw",
                width: "19px",
                height: "25px",
                //padding:"5px",
                //backgroundColor: 'rgba(40, 39, 74, 1)',
                backgroundColor: "#03274A",
                borderRadius: "20%",
                cursor: "pointer",
              }}
            >
              <img
                alt=""
                src={"/assets/icons/mini_arrow_left.svg"}
                //className='group-img'

                style={{
                  transform: true ? "rotate(0deg)" : "rotate(180deg)",
                }}
              />
            </Box> */}

            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  fontFamily: "URW DIN",
                  fontWeight: 700,
                  fontSize: "20px",
                  lineHeight: "28px",
                  color: "#ffffff",
                  textAlign: "center",
                  padding: "8px 0px",
                }}
                variant="h6"
                gutterBottom
              >
                Chat
              </Typography>
              {/* {typingUsers.length > 0 && (
              <Typography
                sx={{
                  fontFamily: "URW DIN",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "15px",
                  color: "#ffffff",
                  textAlign: "center",
                  padding: "0px 0px",
                }}
                variant="h4"
                gutterBottom
              >
                {typingUsers[typingUsers.length - 1].first_name +
                  " " +
                  typingUsers[typingUsers.length - 1].last_name}{" "}
                is typing...
              </Typography>
            )} */}
              {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  sx={{ color: "#ffffff", width: "50%" }}
                  label="Public"
                  {...a11yProps(0)}
                />
                <Tab
                  sx={{ color: "#ffffff", width: "50%" }}
                  label="Private"
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box> */}
              <TabPanel value={value} index={0}>
                <div
                  className="scroll"
                  style={{
                    height: "72vh",
                    overflowY: "scroll",
                    padding: "0px",
                  }}
                >
                  <ChatMessage openChat={openChat} team_slug={team_slug} />

                  <div ref={messagesEndRef} />
                </div>
                {typingUsers.length > 0 && (
                  <div
                    style={{
                      backgroundColor: eventTheme.bg_color_3,
                      height: "60px",
                      borderRadius: "4px",
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: "70px",
                      margin: "0px 25px",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "20px",
                    }}
                  >
                    <CustomAvatarGroup
                      avatar={typingUsers[typingUsers.length - 1].avatar}
                      item={shortname}
                      type="header"
                      onlineUsersEvent={[]}
                      theme={eventTheme}
                    />
                    <Typography
                      sx={{
                        fontFamily: "URW DIN",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "60px",
                        color: "#E1E7EA",
                        paddingLeft: "20px",
                        // marginTop:'3px'
                      }}
                      variant="h4"
                      gutterBottom
                    >
                      {typingUsers[typingUsers.length - 1].first_name +
                        " " +
                        typingUsers[typingUsers.length - 1].last_name}
                      <span
                        style={{
                          color: "#88A1AB",
                          fontFamily: "URW DIN REGULAR",
                          padding: "0px 5px",
                        }}
                      >
                        is typing
                      </span>
                    </Typography>
                    <ChatLoader />
                  </div>
                )}
                <ChatBottomMenu team_slug={team_slug} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <p style={{ color: "#ffffff" }}>Private</p>
              </TabPanel>
            </Box>
          </Drawer>
        </div>
      </React.Fragment>
      <ConfirmPop
        message="Are you sure you want clear chat history? "
        confirm={confirm}
        //@ts-ignore
        handleClickOpen={handleClickOpen}
        handleClickClose={handleClickClose}
        handleDelete={clearAllSpaceChat}
      />
      <Toast
        openToast={openUpdateToast}
        updateStatus={updateStatus}
        setOpenToast={setOpenUpdateToast}
        message={toastMessage}
      />
    </div>
  );
}
