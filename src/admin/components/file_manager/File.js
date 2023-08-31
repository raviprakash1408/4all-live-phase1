import React, { useEffect } from "react";
import MediaFileManager from "../MediaFileManager";
import { useSelector } from "react-redux";

const File = () => {
  const theme = useSelector((state) => state.theme.themeData);
  useEffect(() => {
    if (localStorage.getObject("guestUser") === "true") {
      window.location.href = "/";
    }
  }, []);
  useEffect(() => {
    document.title = theme?.login?.title;
  }, []);
  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = theme?.login?.favicon32x32;
  }, []);
  return (
    <div
      style={{
        backgroundColor: theme?.selectimage?.backgroundcolor1,
        height: "97.3vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MediaFileManager fileManagerType="all" />
    </div>
  );
};

export default File;
