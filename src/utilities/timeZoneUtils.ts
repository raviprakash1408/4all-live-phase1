import moment from "moment";
// @ts-ignore
import store from "../state/store.ts";
import { AxiosLocal } from "./axiosUtils.ts";

let timezone = store.getState().userProfile.timezone !== "" ? store.getState().userProfile.timezone : "America/Los_Angeles";
if (localStorage.getObject("auth") === "true") {
AxiosLocal.get(`user/info/?user_id=${localStorage.getObject("id")}`).then(
    (res) => {
      let timezone =
            res.data.data[0]?.app_user.timezone !== null
              ? res.data.data[0]?.app_user.timezone
              : "Asia/Kolkata";
      localStorage.setObject(
        "user_timezone",
        timezone
      );
    }
  );
  };  
export function toTimeZone(time) {
    var format = "YYYY/MM/DD LT";
    return moment(time, format).tz(timezone).format(format);
}