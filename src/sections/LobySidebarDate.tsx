import * as React from "react";
import { Typography } from "@material-ui/core";
// @ts-ignore
import { toTimeZone } from "../utilities/timeZoneUtils.ts";
// @ts-ignore
import store, { RootState } from "../state/store.ts";

const LobySidebarDate = (props) => {
  const { theme, mainEventData, remainingTime } = props;

  let timezone = store.getState().userProfile.timezone;

  const [date, setDate] = React.useState(toTimeZone(mainEventData.start_date));

  return (
    <div className="sidebar-date">
      <Typography
        style={{
          color: theme?.font_color_0,
          fontFamily: "URW DIN REGULAR",
          fontSize: "14px",
        }}
        lineHeight={"22px"}
      >
        {
          // @ts-ignore
          Date.now() - new Date(mainEventData.end_date).getTime() &&
          mainEventData.event_mode ? (
            `Starts on ${date}`
          ) : (
            <></>
          )
        }
      </Typography>
    </div>
  );
};

export default LobySidebarDate;
