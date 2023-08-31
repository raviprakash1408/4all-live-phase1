import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import ElementMenu from "./element_menu";
import Skeleton from "@mui/material/Skeleton";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import SubMenu from "./element_menu/sub_menu";

const MoveTo = ({ user, theme, tileType, userId }) => {
  const [loading, setloading] = useState(true);

  const local = useSelector((state) => state.local);
  const [subrooms, setsubrooms] = useState([]);
  useEffect(() => {
    console.log(user, "subroomsResponsesubroomsResponse");
    let isGuest = user?.role == "Guest" ? true : false;
    AxiosLocal.get(
      `subrooms/${localStorage.getObject("currentSubSpaceSlug")}?user_id=${
        user.user_id
      }&is_guest=${isGuest}`
    ).then(function (response) {
      console.log(response, "responseresponseresponseresponse");
      let data = response.data.subroom_list;
      if (data != undefined) {
        setsubrooms(response.data.subroom_list);
        console.log(data, "subroomsResponse");
        setloading(false);
      }
    });
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        padding: "5px 10px 5px ",
        top: "0px",
        // left: "calc(100% - 15px)",
        left:
          tileType == "tier2" || tileType == "tier" ? "" : "calc(100% - 15px)",
        right: tileType == "tier2" || tileType == "tier" ? "198px" : "",

        backgroundColor: theme?.bg_color_1,
        border: "2px solid",
        borderColor: theme?.bg_color_1,
        borderRadius: "4px",
      }}
    >
      {loading ? (
        <Box sx={{ width: "120px", padding: "15px 0px 10px 5px" }}>
          <LinearProgress style={{ width: "110px" }} />
        </Box>
      ) : (
        // <Skeleton variant="rectangular" width="140px" height="35px" style={{ backgroundColor: '#012243' }} />

        subrooms?.map((sub, index) => {
          return (
            <SubMenu
              key={index}
              label={sub.name}
              onClick={() => {
                console.log(sub, "subsub");
                window.eventChanel.publish({
                  event: "Move to Subroom",
                  userId: userId,
                  lobbyEnabled: sub.is_lobby,
                  roomSlug: sub.room_slug,
                  subroomSlug: sub.slug,
                });
              }}
              theme={theme}
            />
          );
        })
      )}
    </div>
  );
};

export default MoveTo;
