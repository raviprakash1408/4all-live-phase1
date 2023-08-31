import axios, { AxiosError } from "axios";

export const AxiosLocal = axios.create({
  // baseURL: "http://127.0.0.1:8000/api/v1.6/meetmo/",
  baseURL: "https://fox16-api-dev.kubes.meetmo.io/api/v1.6/meetmo/",
  // baseURL: "https://fox16-api-uat.kubes.meetmo.io/api/v1.6/meetmo/",
  // baseURL: "https://mo-dev.kubes.meetmo.io/api/v1.6/meetmo/",
  // baseURL: "https://mo-uat.kubes.meetmo.io/api/v1.6/meetmo/",
  // baseURL: "https://mo-prod.kubes.meetmo.io/api/v1.6/meetmo/",
  headers: {
    "Content-Type": "application/json",
    Authorization: "bearer " + localStorage.getObject("accessToken"),
  },
});

// // log request header using axios interceptors
// AxiosLocal.interceptors.request.use(
//   (config) => {
//     if(config.url.includes("token2"))
//   {  console.log("Request Header: ", config.headers.Authorization);}
//     return config;
//   }
// );

// log response header using axios interceptors
AxiosLocal.interceptors.response.use(
  (response) => {

    return response;
  },
  async (error: AxiosError) => {
    if (error.message == "Network Error" && error.config?.headers?.Authorization == "bearer null") {

      error.message = "no token";

    }
    console.log("Response Header: ", error, localStorage.getObject("accessToken"));
    return Promise.reject(error);
  }
);