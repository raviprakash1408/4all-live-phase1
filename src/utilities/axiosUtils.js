const axios = require("axios").default;

export const AxiosLocal = axios.create({
  // baseURL: 'http://192.168.0.196/api/v1.6/meetmo/',
  // baseURL: "https://fox16-api-dev.kubes.meetmo.io/api/v1.6/meetmo/",
  baseURL: "https://mo-dev.kubes.meetmo.io/api/v1.6/meetmo/",
  headers: {
    "Content-Type": "application/json",
    Authorization: "bearer " + localStorage.getObject("accessToken"),
  },
});
