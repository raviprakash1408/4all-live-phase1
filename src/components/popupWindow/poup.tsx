import React, { useCallback } from "react"

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "../../state/store.ts";

export const usePopUpWindow = (children)=>{
  // function for removing hyphen from string and made first letter capital
  const removeHyphenAndCapitalize = (str) => {
    return str.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };



  const openNewWindow = useCallback(() => {
    let newWindow = window.open(
      "",
      "_blank",
      "left=1000,top=100,width=350,height=600,popup=yes,directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,alwaysRaised=yes"
    );
    newWindow.document.write(
      '<html><head><link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600&display=swap" rel="stylesheet"></head><body>' +
        "</body></html>"
    );
    newWindow.document.body.setAttribute(
      "style",
      "font-family: 'Noto Sans', sans-serif !important"
    );
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<Provider store={store}>{children}</Provider>);
    newWindow.document.title = `Manage hidden user ${removeHyphenAndCapitalize(
      window.room.options.name
    )}`;
    newWindow?.document.body.appendChild(div);
  }, [children]);

  return {
    openNewWindow,
  };
}