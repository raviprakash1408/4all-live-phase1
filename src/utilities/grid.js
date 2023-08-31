import { LAYOUT_TYPES } from "../state/conference/conferenceSlice";
import $ from "jquery";
const getAngle = (width, height) => {
  let hypot = Math.sqrt(width ** 2 + height ** 2);
  let angle = (Math.asin(height / hypot) * 180) / Math.PI;
  return angle;
};

const getHeight = (h) => {
  if (h < 180) return 180;
  if (h < 240) return 240;
  if (h < 360) return 360;
  if (h < 480) return 480;
  if (h < 720) return 720;
  if (h < 1080) return 1080;
  if (h < 1440) return 1440;
  if (h < 2160) return 2160;
  if (h < 4320) return 4320;
  if (h < 8640) return 8640;
};
// get quotient of a and b
function getQuotient(a, b) {
  return Math.floor(a / b);
}
function between(x, min, max) {
  return x >= min && x <= max;
}
function getMaximumWidth(a) {
  let quotient = getQuotient(a, 16);
  return [quotient * 16, quotient];
}

// get maximum height
function getMaximumHeight(a) {
  let quotient = getQuotient(a, 9);
  return [quotient * 9, quotient];
}

function getMaximumWidthHeight(w, h) {
  let [width, quotient] = getMaximumWidth(w);
  let height = quotient * 9;

  while (height > h) {
    quotient -= 1;
    height = quotient * 9;
  }
  width = quotient * 16;

  return { width, height };
}
export default function resize(main_grid, layout) {
  let childs = Array.from(main_grid.children);

  // get the width of the main_grid
  let width = main_grid.offsetWidth;
  let height = main_grid.offsetHeight;

  let angle = getAngle(width, height);

  // assign gridArea to each child as the loop index
  for (let i = 0; i < childs.length; i++) {
    childs[i].style.gridArea = `v_${i + 1}`;
  }

  // if the width of the main_grid is less than 200px
  // if (width < 300) {
  // if the length of the childs is 1

  let constraints = {};
  window.$ = $;
  if (childs.length == 1) {

    main_grid.style.gridTemplateRows = "auto";

    let wh = getMaximumWidthHeight(width, height);
    childs[0].style.placeSelf = "center";
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;

      constraints[window.$(childs[i]).data("userid")] = {
        maxHeight: getHeight(wh.height),
      };
    }
    // set main_grid gridtemplateareas to center the child vertically and horizontally


    main_grid.style.gridTemplateAreas = `"v_1" `;
  }

  // if the length of the childs is 2
  else if (childs.length == 2) {
    main_grid.style.gridTemplateRows = "auto";
    let wh;
    let gridTemplateAreas = `  " v_1 v_2  " `;
    main_grid.style.gridTemplateRows = "auto";

    wh = getMaximumWidthHeight(width, height / 2);

    if (angle < 35) {
      wh = getMaximumWidthHeight(width / 2, height);
      gridTemplateAreas = `  " v_1 v_2  " `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      main_grid.style.gridTemplateRows = `1fr `;
    } else {
      gridTemplateAreas = `  " v_1" "v_2  " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr  1fr `;
    }
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;

      constraints[window.$(childs[i]).data("userid")] = {
        maxHeight: getHeight(wh.height),
      };
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally
    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  } else if (childs.length == 3) {
    main_grid.style.gridTemplateRows = "auto";
    let gridTemplateAreas;

    let wh = getMaximumWidthHeight(width / 2, height / 2);

    gridTemplateAreas = `  " v_1 v_2  " "v_3 v_3 `;
    if (angle < 20) {
      wh = getMaximumWidthHeight(width / 3, height);
      gridTemplateAreas = `  " v_1 v_2 v_3 " `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      main_grid.style.gridTemplateRows = `1fr`;
    } else if (angle < 45) {
      wh = getMaximumWidthHeight(width / 2, height / 2);
      gridTemplateAreas = `  "  v_1 v_2 . " "v_3 v_3 v_3 `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[2].style.alignSelf = "flex-start";
      main_grid.style.gridTemplateRows = `1fr 1fr`;
      // main_grid.style.allignItems = 'center'
    } else {
      wh = getMaximumWidthHeight(width, height / 3);
      gridTemplateAreas = `  " v_1 " " v_2 " " v_3 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
      main_grid.style.allignItems = "center";
    }
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;

      constraints[window.$(childs[i]).data("userid")] = {
        maxHeight: getHeight(wh.height),
      };
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally
    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  }

  // if the length of the childs is 4
  else if (childs.length == 4) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas = `"v_1"  "v_2"  "v_3"  "v_4"`;
    let wh = getMaximumWidthHeight(width, height / 4);

    if (angle < 20) {
      wh = getMaximumWidthHeight(width / 4, height);
      gridTemplateAreas = `  " v_1 v_2 v_3 v_4 `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      main_grid.style.gridTemplateRows = `1fr `;
      // main_grid.style.allignItems = 'center'
    } else if (angle < 45) {
      wh = getMaximumWidthHeight(width / 2, height / 2);
      gridTemplateAreas = `  " v_1 v_2  " "v_3 v_4 `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "start";
      childs[3].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr 1fr`;
      // main_grid.style.allignItems = 'center'
    } else {
      wh = getMaximumWidthHeight(width, height / 4);
      gridTemplateAreas = `  " v_1 " "v_2" "v_3" "v_4"  `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px 1fr`;
      // main_grid.style.allignItems = 'center'
    }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;

      constraints[window.$(childs[i]).data("userid")] = {
        maxHeight: getHeight(wh.height),
      };
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally
    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  }

  // if the length of the childs is 5
  else if (childs.length == 5) {

    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas = ` "v_1"   "v_2"   "v_3"   "v_4"   "v_5"  `;
    let wh = getMaximumWidthHeight(width, height / 5);

    if (angle < 15) {
      wh = getMaximumWidthHeight(width / 5, height);
      gridTemplateAreas = `"v_1 v_2 v_3 v_4 v_5"  `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      main_grid.style.gridTemplateRows = "auto";
    } else if (angle > 15 && angle < 35) {
      wh = getMaximumWidthHeight(width / 3, height / 2);
      gridTemplateAreas = ` "v_1 v_1 v_2 v_2  v_3 v_3"  " v_4 v_4 v_4 v_5 v_5 v_5" `;

      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "normal";
      childs[3].style.justifySelf = "end";
      childs[4].style.alignSelf = "baseline";
      childs[4].style.justifySelf = "baseline";

      main_grid.style.gridTemplateRows = "auto";
    } else if (angle > 35 && angle < 62) {
      wh = getMaximumWidthHeight(width / 2, height / 3);
      gridTemplateAreas = ` " v_1 v_2 . "  "v_3 v_4 ." "v_5 v_5 v_5" `;

      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[4].style.alignSelf = "baseline";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else {
      wh = getMaximumWidthHeight(width, height / 5);
      gridTemplateAreas = `"v_1"   "v_2"   "v_3"   "v_4"   "v_5"  `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      main_grid.style.gridTemplateRows = `auto`;
    }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;

      constraints[window.$(childs[i]).data("userid")] = {
        maxHeight: getHeight(wh.height),
      };
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally
    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  }

  // if the length of the childs is 6
  else if (childs.length == 6) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas = `"v_1" "v_2" "v_3" "v_4" "v_5" "v_6"`;
    let wh;
    if (angle < 12) {
      wh = getMaximumWidthHeight(width / 6, height);
      gridTemplateAreas = `"v_1 v_2 v_3 v_4 v_5 v_6"  `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      main_grid.style.gridTemplateRows = "auto";
    } else if (angle > 12 && angle < 25) {
      wh = getMaximumWidthHeight(width / 4, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 "  ". v_5 v_6 ." `;

      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "start";
      childs[5].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = "auto";
    } else if (angle > 25 && angle < 55) {
      wh = getMaximumWidthHeight(width / 2, height / 3);
      gridTemplateAreas = ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "start";
      childs[5].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else {
      wh = getMaximumWidthHeight(width, height / 6);
      gridTemplateAreas = `"v_1"   "v_2"   "v_3"   "v_4"   "v_5"   "v_6"  `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      main_grid.style.gridTemplateRows = "auto";
    }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;

      constraints[window.$(childs[i]).data("userid")] = {
        maxHeight: getHeight(wh.height),
      };
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally
    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  }

  // if the length of the childs is 7
  else if (childs.length == 7) {
    main_grid.style.gridTemplateRows = "auto";
    let gridTemplateAreas = `"v_1" "v_2" "v_3" "v_4" "v_5" "v_6" "v_7"`;
    let wh;
    if (angle < 12) {
      wh = getMaximumWidthHeight(width / 7, height);
      gridTemplateAreas = `"v_1 v_2 v_3 v_4 v_5 v_6 v_7"  `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      main_grid.style.gridTemplateRows = "auto";
    } else if (angle > 12 && angle < 24) {
      wh = getMaximumWidthHeight(width / 5, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 "  ". v_6 v_7 . ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "start";
      childs[6].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = "auto";
    } else if (angle > 24 && angle < 35) {
      wh = getMaximumWidthHeight(width / 3, height / 3);
      gridTemplateAreas = ` ". . . " ". . . "  " v_1 v_2 v_3  "  "v_4 v_5 v_6" "v_7 v_7 v_7" ". . . " ". . . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      // childs[3].style.placeSelf = 'baseline'
      // childs[4].style.placeSelf = 'start'
      // childs[5].style.placeSelf = 'start'
      // childs[6].style.placeSelf = 'center'
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "baseline center";
      main_grid.style.gridTemplateRows = "auto";
    } else if (angle > 35 && angle < 60) {
      wh = getMaximumWidthHeight(width / 2, height / 4);
      gridTemplateAreas = ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " " v_7 v_7" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[6].style.alignSelf = "baseline";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px 1fr`;
    } else {
      wh = getMaximumWidthHeight(width, height / 7);
      gridTemplateAreas = `"v_1"   "v_2"   "v_3"   "v_4"   "v_5"   "v_6"  "v_7" `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      main_grid.style.gridTemplateRows = "auto";
    }
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;

      constraints[window.$(childs[i]).data("userid")] = {
        maxHeight: getHeight(wh.height),
      };
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally
    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  }

  // if the length of the childs is 8
  else if (childs.length == 8) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas = `"v_1" "v_2" "v_3" "v_4" "v_5" "v_6" "v_7" "v_8"`;
    let wh;
    if (angle < 5) {
      wh = getMaximumWidthHeight(width / 8, height);
      gridTemplateAreas = `"v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8"  `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
    } else if (angle > 5 && angle < 8) {
      wh = getMaximumWidthHeight(width / 7, height / 2);
      gridTemplateAreas = `"v_1 v_2 v_3 v_4 v_5 v_6 v_7"  ". . . v_8 . . ."`;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "start";
    } else if (angle > 8 && angle < 16) {
      wh = getMaximumWidthHeight(width / 6, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6"  ". . v_7 v_8 . ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "start";
      childs[7].style.placeSelf = "start";
    } else if (angle > 16 && angle < 24) {
      wh = getMaximumWidthHeight(width / 4, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4   " "  v_5 v_6 v_7 v_8    " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "start";
      childs[5].style.placeSelf = "start";
      childs[6].style.placeSelf = "start";
      childs[7].style.placeSelf = "start";
    } else if (angle > 24 && angle < 40) {
      wh = getMaximumWidthHeight(width / 3, height / 3);
      gridTemplateAreas = ` " v_1 v_1 v_2 v_2 v_3 v_3  "  "v_4 v_4 v_5 v_5 v_6 v_6" "v_7 v_7 v_7 v_8 v_8 v_8" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.justifySelf = "right";
      childs[6].style.alignSelf = "baseline";

      childs[7].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 40 && angle < 70) {
      wh = getMaximumWidthHeight(width / 2, height / 4);
      gridTemplateAreas = ` " v_1 v_2 "  "v_3 v_4"  " v_5 v_6 " " v_7  v_8 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "start";
      childs[7].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px  1fr`;
    } else {
      wh = getMaximumWidthHeight(width / 2, height / 5);
      gridTemplateAreas = ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " " v_7  v_8 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "start";
      childs[7].style.placeSelf = "start";
    }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  }

  // if the length of the childs is 9
  else if (childs.length == 9) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas = `"v_1" "v_2" "v_3" "v_4" "v_5" "v_6" "v_7" "v_8" "v_9"`;
    let wh;
    if (angle < 8) {
      wh = getMaximumWidthHeight(width / 9, height);
      gridTemplateAreas = `"v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9"  `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
    } else if (angle > 8 && angle < 16) {
      wh = getMaximumWidthHeight(width / 6, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6"  ". . v_7 v_8 v_9 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "start";
      childs[7].style.placeSelf = "start";
      childs[8].style.placeSelf = "start";
    } else if (angle > 16 && angle < 24) {
      wh = getMaximumWidthHeight(width / 5, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 " "   v_6 v_7 v_8  v_9 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "start";
      childs[6].style.placeSelf = "start";
      childs[7].style.placeSelf = "start";
      childs[8].style.placeSelf = "start";
    } else if (angle > 24 && angle < 44) {
      wh = getMaximumWidthHeight(width / 3, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3  "  "v_4 v_5 v_6" " v_7 v_8 v_9" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "start";
      childs[7].style.placeSelf = "start";
      childs[8].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 44 && angle < 60) {
      wh = getMaximumWidthHeight(width / 2, height / 5);
      gridTemplateAreas = ` "v_1 v_1 v_2 v_2 " "v_3 v_3 v_4 v_4"  " v_5 v_5 v_6 v_6 " " v_7 v_7  v_8 v_8 " " v_9 v_9 v_9 v_9 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px   ${wh.height}px 1fr`;
    } else {
      wh = getMaximumWidthHeight(width, height / 9);
      // gridTemplateAreas =  ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " " v_7  v_8 " " v_9 . " `
      gridTemplateAreas = `  ". . . ." ". . . ." ". . . ." ". . . ." ". . . ." ". . . ." ". . . ." ". . . ." ". . . ." ". . . ." "v_1 v_1 v_2 v_2 " "v_3 v_3 v_4 v_4"  " v_5 v_5 v_6 v_6 " " v_7 v_7  v_8 v_8 " " v_9 v_9 v_9 v_9 " ". . . ." ". . . ." ". . . ." ". . . ." ". . . ." ". . . ." ". . . ." ". . . ." ". . . ." ". . . ."`;

      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
    }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  }

  // if the length of the childs is 10
  else if (childs.length == 10) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas = `"v_1" "v_2" "v_3" "v_4" "v_5" "v_6" "v_7" "v_8" "v_9" "v_10"`;
    let wh;
    if (angle < 5) {
      wh = getMaximumWidthHeight(width / 10, height);
      gridTemplateAreas = `"v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10"  `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
    }
    //    else if(angle > 5 && angle < 8 ){
    //   wh = getMaximumWidthHeight(width/7,height/2)
    //   gridTemplateAreas = `"v_1 v_2 v_3 v_4 v_5 v_6 v_7"  ". . v_8 v_9 v_10 . ."`
    //   childs[0].style.placeSelf = 'end'
    //   childs[1].style.placeSelf = 'end'
    //   childs[2].style.placeSelf = 'end'
    //   childs[3].style.placeSelf = 'end'
    //   childs[4].style.placeSelf = 'end'
    //   childs[5].style.placeSelf = 'end'
    //   childs[6].style.placeSelf = 'end'
    //   childs[7].style.placeSelf = 'start'
    //   childs[8].style.placeSelf = 'start'
    //   childs[9].style.placeSelf = 'start'
    // }
    else if (angle > 5 && angle < 16) {
      wh = getMaximumWidthHeight(width / 6, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6"  ". v_7 v_8 v_9 v_10 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "start";
      childs[7].style.placeSelf = "start";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
    } else if (angle > 16 && angle < 24) {
      wh = getMaximumWidthHeight(width / 5, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 " "   v_6 v_7 v_8  v_9 v_10 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "start";
      childs[6].style.placeSelf = "start";
      childs[7].style.placeSelf = "start";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
    } else if (angle > 24 && angle < 40) {
      wh = getMaximumWidthHeight(width / 3, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3  "  "v_4 v_5 v_6" " v_7 v_8 v_9" " v_10 v_10 v_10" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 40 && angle < 60) {
      wh = getMaximumWidthHeight(width / 2, height / 5);
      gridTemplateAreas = ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " " v_7  v_8 " " v_9 v_10 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "start";
      childs[9].style.alignSelf = "baseline";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px   ${wh.height}px 1fr`;
    } else {
      wh = getMaximumWidthHeight(width, height / 10);
      gridTemplateAreas = ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " " v_7  v_8 " " v_9 v_10 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px   ${wh.height}px 1fr`;
    }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  }

  // if the length of the childs is 11
  else if (childs.length == 11) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas = `"v_1" "v_2" "v_3" "v_4" "v_5" "v_6" "v_7" "v_8" "v_9" "v_10" "v_11"`;
    let wh;

    if (angle < 8) {
      wh = getMaximumWidthHeight(width / 11, height);
      gridTemplateAreas = `"v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11"  `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
    } else if (angle > 8 && angle < 16) {
      wh = getMaximumWidthHeight(width / 6, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6"  " v_7 v_8 v_9 v_10 v_11 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "start";
      childs[7].style.placeSelf = "start";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
    } else if (angle > 16 && angle < 24) {
      wh = getMaximumWidthHeight(width / 5, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 " "   v_6 v_7 v_8  v_9 v_10 " " v_11 . . . ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 24 && angle < 60) {
      wh = getMaximumWidthHeight(width / 3, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3  "  "v_4 v_5 v_6" " v_7 v_8 v_9" " v_10 v_11 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 60 && angle < 70) {
      wh = getMaximumWidthHeight(width / 2, height / 6);
      gridTemplateAreas = ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " " v_7  v_8 " " v_9 v_10 " " v_11 v_11 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[10].style.alignSelf = "baseline";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px   ${wh.height}px ${wh.height}px 1fr`;
    } else {
      wh = getMaximumWidthHeight(width, height / 11);
      gridTemplateAreas = ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " " v_7  v_8 " " v_9 v_10 " " v_11 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px   ${wh.height}px ${wh.height}px 1fr`;
    }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  }

  // if the length of the childs is 12
  else if (childs.length == 12) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas = `"v_1" "v_2" "v_3" "v_4" "v_5" "v_6" "v_7" "v_8" "v_9" "v_10" "v_11" "v_12"`;
    let wh;
    if (angle < 8) {
      wh = getMaximumWidthHeight(width / 12, height);
      gridTemplateAreas = `"v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12"  `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
    } else if (angle > 8 && angle < 16) {
      wh = getMaximumWidthHeight(width / 6, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6"  " v_7 v_8 v_9 v_10 v_11 v_12" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "start";
      childs[7].style.placeSelf = "start";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
    } else if (angle > 16 && angle < 24) {
      wh = getMaximumWidthHeight(width / 5, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 " "   v_6 v_7 v_8  v_9 v_10 " " v_11 v_12 . . ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 24 && angle < 50) {
      wh = getMaximumWidthHeight(width / 3, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3  "  "v_4 v_5 v_6" " v_7 v_8 v_9" " v_10 v_11 v_12" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 50 && angle < 70) {
      wh = getMaximumWidthHeight(width / 2, height / 6);
      gridTemplateAreas = ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " " v_7  v_8 " " v_9 v_10 " " v_11 v_12 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px   ${wh.height}px ${wh.height}px 1fr`;
    } else {
      wh = getMaximumWidthHeight(width, height / 12);
      gridTemplateAreas = ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " " v_7  v_8 " " v_9 v_10 " " v_11 v_12 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px   ${wh.height}px ${wh.height}px 1fr`;
    }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  }

  // if the length of the childs is 13
  else if (childs.length == 13) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas = `"v_1" "v_2" "v_3" "v_4" "v_5" "v_6" "v_7" "v_8" "v_9" "v_10" "v_11" "v_12" "v_13"`;
    let wh;
    if (angle < 8) {
      wh = getMaximumWidthHeight(width / 13, height);
      gridTemplateAreas = `"v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13"  `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
    } else if (angle > 8 && angle < 16) {
      wh = getMaximumWidthHeight(width / 7, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7"  " v_8 v_9 v_10 v_11 v_12 v_13 ."  `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "start";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "start";
      childs[12].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr  1fr`;
    } else if (angle > 16 && angle < 24) {
      wh = getMaximumWidthHeight(width / 5, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 " "   v_6 v_7 v_8  v_9 v_10 " " v_11 v_12 v_13 . ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "start";
      childs[12].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 24 && angle < 40) {
      wh = getMaximumWidthHeight(width / 4, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 " " v_5 v_6 v_7 v_8 " " v_9 v_10 v_11 v_12 " " v_13 v_13 v_13 v_13" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[12].style.alignSelf = "baseline";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 40 && angle < 50) {
      wh = getMaximumWidthHeight(width / 3, height / 5);
      gridTemplateAreas = ` " v_1 v_2 v_3 " " v_4 v_5 v_6 " " v_7 v_8 v_9 " " v_10 v_11 v_12 " " v_13 v_13 v_13 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "start";
      childs[12].style.placeSelf = "center";
      childs[12].style.alignSelf = "baseline";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 50 && angle < 70) {
      wh = getMaximumWidthHeight(width / 2, height / 7);
      gridTemplateAreas = ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " " v_7  v_8 " " v_9 v_10 " " v_11 v_12 " " v_13 v_13 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[12].style.alignSelf = "baseline";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px   ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else {
      wh = getMaximumWidthHeight(width, height / 13);
      gridTemplateAreas = ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " " v_7  v_8 " " v_9 v_10 " " v_11 v_12 " " v_13 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px   ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  }

  // if the length of the childs is 14
  else if (childs.length == 14) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas = `"v_1" "v_2" "v_3" "v_4" "v_5" "v_6" "v_7" "v_8" "v_9" "v_10" "v_11" "v_12" "v_13" "v_14"`;
    let wh;
    if (angle < 8) {
      wh = getMaximumWidthHeight(width / 14, height);
      gridTemplateAreas = `"v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14"  `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
    } else if (angle > 8 && angle < 16) {
      wh = getMaximumWidthHeight(width / 7, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7"  " v_8 v_9 v_10 v_11 v_12 v_13 v_14"  `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "start";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "start";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr  1fr`;
    } else if (angle > 16 && angle < 24) {
      wh = getMaximumWidthHeight(width / 5, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 " "   v_6 v_7 v_8  v_9 v_10 " " v_11 v_12 v_13 v_14 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "start";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 24 && angle < 40) {
      wh = getMaximumWidthHeight(width / 4, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 " " v_5 v_6 v_7 v_8 " " v_9 v_10 v_11 v_12 " " v_13 v_14 . ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 40 && angle < 50) {
      wh = getMaximumWidthHeight(width / 3, height / 5);

      gridTemplateAreas = ` " v_1 v_2 v_3 " " v_4 v_5 v_6 " " v_7 v_8 v_9 " " v_10 v_11 v_12 " " v_13 v_14 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "start";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";

      // main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px 1fr`
    } else if (angle > 50 && angle < 70) {
      wh = getMaximumWidthHeight(width / 2, height / 7);
      gridTemplateAreas = ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " " v_7  v_8 " " v_9 v_10 " " v_11 v_12 " " v_13 v_14" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px   ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else {
      wh = getMaximumWidthHeight(width, height / 14);
      gridTemplateAreas = ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " " v_7  v_8 " " v_9 v_10 " " v_11 v_12 " " v_13 v_14" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px   ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    }
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  }

  // if the length of the childs is 15
  else if (childs.length == 15) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas = `"v_1" "v_2" "v_3" "v_4" "v_5" "v_6" "v_7" "v_8" "v_9" "v_10" "v_11" "v_12" "v_13" "v_14" "v_15"`;
    let wh;
    if (angle < 8) {
      wh = getMaximumWidthHeight(width / 15, height);
      gridTemplateAreas = `"v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14 v_15"  `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
    } else if (angle > 8 && angle < 16) {
      wh = getMaximumWidthHeight(width / 8, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8"  " v_9 v_10 v_11 v_12 v_13 v_14 v_15 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "start";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr  1fr`;
    } else if (angle > 16 && angle < 24) {
      wh = getMaximumWidthHeight(width / 5, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 " "   v_6 v_7 v_8  v_9 v_10 " " v_11 v_12 v_13 v_14 v_15" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "start";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 24 && angle < 40) {
      wh = getMaximumWidthHeight(width / 4, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 " " v_5 v_6 v_7 v_8 " " v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 40 && angle < 52) {
      wh = getMaximumWidthHeight(width / 3, height / 5);

      gridTemplateAreas = ` " v_1 v_2 v_3 " " v_4 v_5 v_6 " " v_7 v_8 v_9 " " v_10 v_11 v_12 " " v_13 v_14 v_15 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "start";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";

      // main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px 1fr`
    } else if (angle > 52 && angle < 71) {
      wh = getMaximumWidthHeight(width / 2, height / 8);
      gridTemplateAreas = ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " " v_7  v_8 " " v_9 v_10 " " v_11 v_12 " " v_13 v_14" " v_15 v_15" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[14].style.alignSelf = "baseline";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px   ${wh.height}px ${wh.height}px ${wh.height}px  ${wh.height}px  1fr`;
    } else {
      wh = getMaximumWidthHeight(width, height / 15);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14 v_15" `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.alignSelf = "baseline";
    }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  }

  // if the length of the childs is 16
  else if (childs.length == 16) {
    main_grid.style.gridTemplateRows = "auto";
    let gridTemplateAreas = `"v_1 v_2 v_3 v_4" "v_5 v_6 v_7 v_8" "v_9 v_10 v_11 v_12" "v_13 v_14 v_15 v_16"`;
    let wh;
    if (angle < 8) {
      wh = getMaximumWidthHeight(width / 16, height);
      gridTemplateAreas = `"v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14 v_15 v_16"  `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
    } else if (angle > 8 && angle < 16) {
      wh = getMaximumWidthHeight(width / 8, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8"  " v_9 v_10 v_11 v_12 v_13 v_14 v_15 v_16" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "start";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr  1fr`;
    } else if (angle > 16 && angle < 24) {
      wh = getMaximumWidthHeight(width / 6, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 v_6 " "    v_7 v_8  v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16 . ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 24 && angle < 49) {
      wh = getMaximumWidthHeight(width / 4, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 " " v_5 v_6 v_7 v_8 " " v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 49 && angle < 60) {
      wh = getMaximumWidthHeight(width / 3, height / 5);

      gridTemplateAreas = ` " v_1 v_2 v_3 " " v_4 v_5 v_6 " " v_7 v_8 v_9 " " v_10 v_11 v_12 " " v_13 v_14 v_15 " " v_16 v_16 v_16 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "center";
      childs[15].style.alignSelf = "baseline";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 60 && angle < 70) {
      wh = getMaximumWidthHeight(width / 2, height / 8);
      gridTemplateAreas = ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " " v_7  v_8 " " v_9 v_10 " " v_11 v_12 " " v_13 v_14" " v_15 v_16" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px   ${wh.height}px ${wh.height}px ${wh.height}px  ${wh.height}px  1fr`;
    } else {
      // wh = getMaximumWidthHeight(width,height/16)
      // gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14 v_15 v_16" `
      // childs[0].style.placeSelf = 'center'
      // childs[1].style.placeSelf = 'center'
      // childs[2].style.placeSelf = 'center'
      // childs[3].style.placeSelf = 'center'
      // childs[4].style.placeSelf = 'center'
      // childs[5].style.placeSelf = 'center'
      // childs[6].style.placeSelf = 'center'
      // childs[7].style.placeSelf = 'center'
      // childs[8].style.placeSelf = 'center'
      // childs[9].style.placeSelf = 'center'
      // childs[10].style.placeSelf = 'center'
      // childs[11].style.placeSelf = 'center'
      // childs[12].style.placeSelf = 'center'
      // childs[13].style.placeSelf = 'center'
      // childs[14].style.placeSelf = 'center'
      // childs[15].style.placeSelf = 'center'

      // main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`

      wh = getMaximumWidthHeight(width / 2, height / 8);
      gridTemplateAreas = ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " " v_7  v_8 " " v_9 v_10 " " v_11 v_12 " " v_13 v_14" " v_15 v_16" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px   ${wh.height}px ${wh.height}px ${wh.height}px  ${wh.height}px  1fr`;
    }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  }

  // if the length of the childs is 17
  else if (childs.length == 17) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas = `"v_1" "v_2" "v_3" "v_4" "v_5" "v_6" "v_7" "v_8" "v_9" "v_10" "v_11" "v_12" "v_13" "v_14" "v_15" "v_16" "v_17"`;
    let wh;
    if (angle < 7) {
      wh = getMaximumWidthHeight(width / 12, height);
      // gridTemplateAreas = `"v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14 v_15 v_16 v_17"  `
      // childs[0].style.placeSelf = 'center'
      // childs[1].style.placeSelf = 'center'
      // childs[2].style.placeSelf = 'center'
      // childs[3].style.placeSelf = 'center'
      // childs[4].style.placeSelf = 'center'
      // childs[5].style.placeSelf = 'center'
      // childs[6].style.placeSelf = 'center'
      // childs[7].style.placeSelf = 'center'
      // childs[8].style.placeSelf = 'center'
      // childs[9].style.placeSelf = 'center'
      // childs[10].style.placeSelf = 'center'
      // childs[11].style.placeSelf = 'center'
      // childs[12].style.placeSelf = 'center'
      // childs[13].style.placeSelf = 'center'
      // childs[14].style.placeSelf = 'center'
      // childs[15].style.placeSelf = 'center'
      // childs[16].style.placeSelf = 'center'
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14"  "  v_15 v_16 v_17 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
    } else if (angle > 7 && angle < 16) {
      wh = getMaximumWidthHeight(width / 9, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9"  "  v_10 v_11 v_12 v_13 v_14 v_15 v_16 v_17 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "start";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr  1fr`;
    } else if (angle > 16 && angle < 24) {
      wh = getMaximumWidthHeight(width / 6, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 v_6 " "    v_7 v_8  v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16 v_17 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 24 && angle < 35) {
      wh = getMaximumWidthHeight(width / 5, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5" "  v_6 v_7 v_8 v_9 v_10 " "  v_11 v_12 v_13 v_14 v_15" "  v_16 v_17 . . ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px  1fr`;
    } else if (angle > 35 && angle < 38) {
      wh = getMaximumWidthHeight(width / 4, height / 4);

      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 " " v_5 v_6 v_7 v_8 " " v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16" "v_17 . . ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 38 && angle < 69) {
      wh = getMaximumWidthHeight(width / 3, height / 6);
      gridTemplateAreas = ` " v_1 v_2 v_3 " "  v_4 v_5 v_6 " "  v_7 v_8 v_9 " "  v_10 v_11 v_12 " "  v_13 v_14 v_15 " "  v_16 v_17 v_17" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "baseline";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px   ${wh.height}px ${wh.height}px  1fr`;
    } else {
      // wh = getMaximumWidthHeight(width,height/17)
      // gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14 v_15 v_16 v_17" `
      // childs[0].style.placeSelf = 'center'
      // childs[1].style.placeSelf = 'center'
      // childs[2].style.placeSelf = 'center'
      // childs[3].style.placeSelf = 'center'
      // childs[4].style.placeSelf = 'center'
      // childs[5].style.placeSelf = 'center'
      // childs[6].style.placeSelf = 'center'
      // childs[7].style.placeSelf = 'center'
      // childs[8].style.placeSelf = 'center'
      // childs[9].style.placeSelf = 'center'
      // childs[10].style.placeSelf = 'center'
      // childs[11].style.placeSelf = 'center'
      // childs[12].style.placeSelf = 'center'
      // childs[13].style.placeSelf = 'center'
      // childs[14].style.placeSelf = 'center'
      // childs[15].style.placeSelf = 'center'
      // childs[16].style.placeSelf = 'center'

      // main_grid.style.gridTemplateRows = `auto`
      wh = getMaximumWidthHeight(width / 2, height / 8);
      gridTemplateAreas = ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " " v_7  v_8 " " v_9 v_10 " " v_11 v_12 " " v_13 v_14" " v_15 v_16"  " v_17 v_17 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "baseline";
      childs[16].style.placeSelf = "center";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px   ${wh.height}px ${wh.height}px ${wh.height}px  ${wh.height}px  1fr`;
    }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  }

  // if the length of the childs is 18
  else if (childs.length == 18) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas = `"v_1" "v_2" "v_3" "v_4" "v_5" "v_6" "v_7" "v_8" "v_9" "v_10" "v_11" "v_12" "v_13" "v_14" "v_15" "v_16" "v_17" "v_18"`;

    let wh;
    if (angle < 8) {
      wh = getMaximumWidthHeight(width / 18, height);
      gridTemplateAreas = `"v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14 v_15 v_16 v_17 v_18"  `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
    } else if (angle > 8 && angle < 16) {
      wh = getMaximumWidthHeight(width / 9, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9"  "  v_10 v_11 v_12 v_13 v_14 v_15 v_16 v_17 v_18" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "start";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr  1fr`;
    } else if (angle > 16 && angle < 24) {
      wh = getMaximumWidthHeight(width / 6, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 v_6 " "    v_7 v_8  v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16 v_17 v_18" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 24 && angle < 35) {
      wh = getMaximumWidthHeight(width / 5, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5" "  v_6 v_7 v_8 v_9 v_10 " "  v_11 v_12 v_13 v_14 v_15" "  v_16 v_17 v_18 . ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px  1fr`;
    } else if (angle > 35 && angle < 39.5) {
      wh = getMaximumWidthHeight(width / 4, height / 4);

      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 " " v_5 v_6 v_7 v_8 " " v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16" "v_17 v_18 . ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 39.5 && angle < 69.5) {
      wh = getMaximumWidthHeight(width / 3, height / 6);
      gridTemplateAreas = ` " v_1 v_2 v_3 " "  v_4 v_5 v_6 " "  v_7 v_8 v_9 " "  v_10 v_11 v_12 " "  v_13 v_14 v_15 " "  v_16 v_17 v_18 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px  1fr`;
    } else {
      wh = getMaximumWidthHeight(width / 2, height / 8);
      gridTemplateAreas = ` " v_1 v_2 " "v_3 v_4"  " v_5 v_6 " " v_7  v_8 " " v_9 v_10 " " v_11 v_12 " " v_13 v_14" " v_15 v_16"  " v_17 v_18 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px   ${wh.height}px ${wh.height}px ${wh.height}px  ${wh.height}px ${wh.height}px  1fr`;
    }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  }

  // if the length of the childs is 19
  else if (childs.length == 19) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas = `"v_1" "v_2" "v_3" "v_4" "v_5" "v_6" "v_7" "v_8" "v_9" "v_10" "v_11" "v_12" "v_13" "v_14" "v_15" "v_16" "v_17" "v_18" "v_19"`;
    let wh;
    if (angle < 8) {
      wh = getMaximumWidthHeight(width / 19, height);
      gridTemplateAreas = `"v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14 v_15 v_16 v_17 v_18 v_19"  `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "center";
    } else if (angle > 8 && angle < 16) {
      wh = getMaximumWidthHeight(width / 10, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10"  "   v_11 v_12 v_13 v_14 v_15 v_16 v_17 v_18 v_19 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "start";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr  1fr`;
    } else if (angle > 16 && angle < 24) {
      wh = getMaximumWidthHeight(width / 7, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 v_6 v_7" "     v_8  v_9 v_10 v_11 v_12  v_13 v_14" " v_15 v_16 v_17 v_18 v_19 . ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 24 && angle < 40) {
      wh = getMaximumWidthHeight(width / 5, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5" "  v_6 v_7 v_8 v_9 v_10 " "  v_11 v_12 v_13 v_14 v_15" "  v_16 v_17 v_18 v_19 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px  1fr`;
    } else if (angle > 40 && angle < 60) {
      wh = getMaximumWidthHeight(width / 4, height / 5);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4" "   v_5 v_6   v_7 v_8" "  v_9 v_10 v_11 v_12"  "  v_13 v_14 v_15 v_16" "   v_17 v_18 v_19 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px   ${wh.height}px   1fr`;
    } else {
      // wh = getMaximumWidthHeight(width,height/19)
      // gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14 v_15 v_16 v_17v v_18 v_19" `
      // childs[0].style.placeSelf = 'center'
      // childs[1].style.placeSelf = 'center'
      // childs[2].style.placeSelf = 'center'
      // childs[3].style.placeSelf = 'center'
      // childs[4].style.placeSelf = 'center'
      // childs[5].style.placeSelf = 'center'
      // childs[6].style.placeSelf = 'center'
      // childs[7].style.placeSelf = 'center'
      // childs[8].style.placeSelf = 'center'
      // childs[9].style.placeSelf = 'center'
      // childs[10].style.placeSelf = 'center'
      // childs[11].style.placeSelf = 'center'
      // childs[12].style.placeSelf = 'center'
      // childs[13].style.placeSelf = 'center'
      // childs[14].style.placeSelf = 'center'
      // childs[15].style.placeSelf = 'center'
      // childs[16].style.placeSelf = 'center'
      // childs[17].style.placeSelf = 'center'
      // childs[18].style.placeSelf = 'center'
      // main_grid.style.gridTemplateRows = `auto`
      wh = getMaximumWidthHeight(width / 3, height / 7);
      gridTemplateAreas = ` " v_1 v_2 v_3 " "  v_4 v_5 v_6 " "  v_7 v_8 v_9 " "  v_10 v_11 v_12 " "  v_13 v_14 v_15 " "  v_16 v_17 v_18 " "  v_19 v_19 v_19 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "start";
      childs[18].style.justifySelf = "center";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  } else if (childs.length == 20) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14 v_15 v_16 v_17v v_18 v_19 v_20" `;
    let wh;
    if (angle < 8) {
      wh = getMaximumWidthHeight(width / 20, height);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14 v_15 v_16 v_17v v_18 v_19 v_20" `;
      childs[0].style.placeSelf = "center";
      childs[1].style.placeSelf = "center";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "center";
      childs[19].style.placeSelf = "center";
    } else if (angle > 8 && angle < 16) {
      wh = getMaximumWidthHeight(width / 10, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 " " v_11 v_12 v_13 v_14 v_15 v_16 v_17 v_18 v_19 v_20 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "start";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";

      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr 1fr`;
    } else if (angle > 16 && angle < 24) {
      wh = getMaximumWidthHeight(width / 7, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 " " v_8 v_9 v_10 v_11 v_12 v_13 v_14 " " v_15 v_16 v_17 v_18 v_19 v_20 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 24 && angle < 40) {
      wh = getMaximumWidthHeight(width / 5, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 " " v_6 v_7 v_8 v_9 v_10 " " v_11 v_12 v_13 v_14 v_15 " " v_16 v_17 v_18 v_19 v_20 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "start";
      childs[6].style.placeSelf = "start";
      childs[7].style.placeSelf = "start";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 40 && angle < 42) {
      wh = getMaximumWidthHeight(width / 4, height / 5);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 " " v_5 v_6 v_7 v_8 " " v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16 " " v_17 v_18 v_19 v_20 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "start";
      childs[5].style.placeSelf = "start";
      childs[6].style.placeSelf = "start";
      childs[7].style.placeSelf = "start";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 42 && angle < 54) {
      wh = getMaximumWidthHeight(width / 3, height / 7);
      gridTemplateAreas = ` " v_1 v_2 v_3 " "  v_4 v_5 v_6 " "  v_7 v_8 v_9 " "  v_10 v_11 v_12 " "  v_13 v_14 v_15 " "  v_16 v_17 v_18 " "  v_19 v_20 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else {
      wh = getMaximumWidthHeight(width / 3, height / 7);
      gridTemplateAreas = ` " v_1 v_2 v_3 " "  v_4 v_5 v_6 " "  v_7 v_8 v_9 " "  v_10 v_11 v_12 " "  v_13 v_14 v_15 " "  v_16 v_17 v_18 " "  v_19 v_20 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    }
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  } else if (childs.length == 21){
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas 
    let wh;
    if (angle < 8) {
       wh = getMaximumWidthHeight(width / 12, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11" " v_12 v_13 v_14 v_15 v_16 v_17 v_18 v_19 v_20 v_21 . "`;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px 1fr`;
      

    } else if (angle > 8 && angle < 16) {
      wh = getMaximumWidthHeight(width / 12, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11" " v_12 v_13 v_14 v_15 v_16 v_17 v_18 v_19 v_20 v_21 . "`;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "start";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
    } else if (angle > 16 && angle < 24) {
      wh = getMaximumWidthHeight(width / 7, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 v_6 v_7"  "v_8  v_9 v_10 v_11 v_12  v_13 v_14" " v_15 v_16 v_17 v_18 v_19 v_20 v_21" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "start";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 24 && angle < 42) {
      wh = getMaximumWidthHeight(width / 5, height / 5);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 " " v_6 v_7 v_8 v_9 v_10 " " v_11 v_12 v_13 v_14 v_15 " " v_16 v_17 v_18 v_19 v_20 " ". . v_21 . ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "start";
      childs[6].style.placeSelf = "start";
      childs[7].style.placeSelf = "start";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    }  else if (angle > 42 && angle < 54) {
      wh = getMaximumWidthHeight(width / 3, height / 7);
      gridTemplateAreas = ` " v_1 v_2 v_3 " "  v_4 v_5 v_6 " "  v_7 v_8 v_9 " "  v_10 v_11 v_12 " "  v_13 v_14 v_15 " "  v_16 v_17 v_18 " "  v_19 v_20 v_21 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else {
      wh = getMaximumWidthHeight(width / 3, height / 7);
      gridTemplateAreas = ` " v_1 v_2 v_3 " "  v_4 v_5 v_6 " "  v_7 v_8 v_9 " "  v_10 v_11 v_12 " "  v_13 v_14 v_15 " "  v_16 v_17 v_18 " "  v_19 v_20 v_21 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    }
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  
  } else if (childs.length == 22){
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas 
    let wh;
    if (angle < 16) {
       wh = getMaximumWidthHeight(width / 11, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11" " v_12 v_13 v_14 v_15 v_16 v_17 v_18 v_19 v_20 v_21 v_22" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "start";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr 1fr`;
      

    } else if (angle > 16 && angle < 24) {
      wh = getMaximumWidthHeight(width / 8, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 v_6 v_7 v_8 "  " v_9 v_10 v_11 v_12  v_13 v_14 v_15 v_16 " " . v_17 v_18 v_19 v_20 v_21 v_22 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 24 && angle < 42) {
      wh = getMaximumWidthHeight(width / 5, height / 5);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 " " v_6 v_7 v_8 v_9 v_10 " " v_11 v_12 v_13 v_14 v_15 " " v_16 v_17 v_18 v_19 v_20 " ". . v_21 v_22 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "start";
      childs[6].style.placeSelf = "start";
      childs[7].style.placeSelf = "start";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";


      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    }  else if (angle > 42 && angle < 54) {
      wh = getMaximumWidthHeight(width / 3, height / 8);
      gridTemplateAreas = ` " v_1 v_2 v_3 " "  v_4 v_5 v_6 " "  v_7 v_8 v_9 " "  v_10 v_11 v_12 " "  v_13 v_14 v_15 " "  v_16 v_17 v_18 " "  v_19 v_20 v_21 " "  . v_22 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";


      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else {
     wh = getMaximumWidthHeight(width / 3, height / 8);
      gridTemplateAreas = ` " v_1 v_2 v_3 " "  v_4 v_5 v_6 " "  v_7 v_8 v_9 " "  v_10 v_11 v_12 " "  v_13 v_14 v_15 " "  v_16 v_17 v_18 " "  v_19 v_20 v_21 " "  . v_22 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";


      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    }
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  
  } else if (childs.length == 23) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas;
    let wh;
    if (angle < 5) {
      wh = getMaximumWidthHeight(width / 12, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12" " v_13 v_14 v_15 v_16 v_17 v_18 v_19 v_20 v_21 v_22 v_23 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr 1fr`;
    } else if (angle > 5 && angle < 11.5) {
      wh = getMaximumWidthHeight(width / 8, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 v_6 v_7 v_8 "  " v_9 v_10 v_11 v_12  v_13 v_14 v_15 v_16 " " v_17 v_18 v_19 v_20 v_21 v_22 v_23 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 11.5 && angle < 22) {
      wh = getMaximumWidthHeight(width / 6, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 " " v_7 v_8 v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16 v_17 v_18 " " v_19 v_20 v_21 v_22 v_23 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 22 && angle < 42) {
      wh = getMaximumWidthHeight(width / 5, height / 5);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 " " v_6 v_7 v_8 v_9 v_10 " " v_11 v_12 v_13 v_14 v_15 " " v_16 v_17 v_18 v_19 v_20 " ". v_21 v_22 v_23 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "start";
      childs[6].style.placeSelf = "start";
      childs[7].style.placeSelf = "start";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 42 && angle < 54) {
      wh = getMaximumWidthHeight(width / 3, height / 8);
      gridTemplateAreas = ` " v_1 v_2 v_3 " "  v_4 v_5 v_6 " "  v_7 v_8 v_9 " "  v_10 v_11 v_12 " "  v_13 v_14 v_15 " "  v_16 v_17 v_18 " "  v_19 v_20 v_21 " "  v_22 v_23 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else {
      wh = getMaximumWidthHeight(width / 3, height / 8);
      gridTemplateAreas = ` " v_1 v_2 v_3 " "  v_4 v_5 v_6 " "  v_7 v_8 v_9 " "  v_10 v_11 v_12 " "  v_13 v_14 v_15 " "  v_16 v_17 v_18 " "  v_19 v_20 v_21 " "  v_22 v_23 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    }
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  } else if (childs.length == 24) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas;
    let wh;
    if (angle < 5) {
      wh = getMaximumWidthHeight(width / 12, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12" " v_13 v_14 v_15 v_16 v_17 v_18 v_19 v_20 v_21 v_22 v_23 v_24" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";


      main_grid.style.gridTemplateRows = `1fr 1fr`;
    } else if (angle > 5 && angle < 11.5) {
      wh = getMaximumWidthHeight(width / 8, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 v_6 v_7 v_8 "  " v_9 v_10 v_11 v_12  v_13 v_14 v_15 v_16 " " v_17 v_18 v_19 v_20 v_21 v_22 v_23 v_24" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 11.5 && angle < 22) {
      wh = getMaximumWidthHeight(width / 6, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 " " v_7 v_8 v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16 v_17 v_18 " " v_19 v_20 v_21 v_22 v_23 v_24" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "start";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 22 && angle < 38) {
      wh = getMaximumWidthHeight(width / 5, height / 5);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 " " v_6 v_7 v_8 v_9 v_10 " " v_11 v_12 v_13 v_14 v_15 " " v_16 v_17 v_18 v_19 v_20 " " v_21 v_22 v_23 v_24 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "start";
      childs[6].style.placeSelf = "start";
      childs[7].style.placeSelf = "start";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    }else if (angle > 38 && angle < 56) {
      wh = getMaximumWidthHeight(width / 4, height / 7);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 " " v_5 v_6 v_7 v_8 " " v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16 " " v_17 v_18 v_19 v_20 " " v_21 v_22 v_23 v_24 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } 
     else if (angle > 56 && angle < 63.5) {
      wh = getMaximumWidthHeight(width / 3, height / 8);
      gridTemplateAreas = ` " v_1 v_2 v_3 " "  v_4 v_5 v_6 " "  v_7 v_8 v_9 " "  v_10 v_11 v_12 " "  v_13 v_14 v_15 " "  v_16 v_17 v_18 " "  v_19 v_20 v_21 " "  v_22 v_23 v_24 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else {
       wh = getMaximumWidthHeight(width / 2, height / 13);

      gridTemplateAreas = ` " v_1 v_2" " v_3 v_4" " v_5 v_6" " v_7 v_8" " v_9 v_10" " v_11 v_12" " v_13 v_14" " v_15 v_16" " v_17 v_18" " v_19 v_20" " v_21 v_22" " v_23 v_24" " . . " `
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "center";
      childs[19].style.placeSelf = "center";
      childs[20].style.placeSelf = "center";
      childs[21].style.placeSelf = "center";
      childs[22].style.placeSelf = "center";
      childs[23].style.placeSelf = "center";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;

    }
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  } else if (childs.length == 25) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas;
    let wh;
    if (angle < 4.6) {
      wh = getMaximumWidthHeight(width / 13, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13" " v_14 v_15 v_16 v_17 v_18 v_19 v_20 v_21 v_22 v_23 v_24 v_25 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";
      childs[24].style.placeSelf = "start";


      main_grid.style.gridTemplateRows = `1fr 1fr`;
    } else if (angle > 4.6 && angle < 8) {
      wh = getMaximumWidthHeight(width / 14, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14" " v_15 v_16 v_17 v_18 v_19 v_20 v_21 v_22 v_23 v_24 v_25 . . ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";
      childs[24].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr 1fr`;
    }
    
    else if (angle > 8 && angle < 10) {
      wh = getMaximumWidthHeight(width / 9, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 v_6 v_7 v_8 v_9"  " v_10 v_11 v_12  v_13 v_14 v_15 v_16 v_17 v_18 " " v_19 v_20 v_21 v_22 v_23 v_24 v_25 . . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";
      childs[24].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } 
    // else if (angle > 12 && angle < 15) {
    //   wh = getMaximumWidthHeight(width / 10, height / 3);
    //   gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 v_6 v_7 v_8 v_9 v_10"  " v_11 v_12 v_13 v_14 v_15 v_16 v_17 v_18 v_19 v_20" " v_21 v_22 v_23 v_24 v_25 . . . . . " `;
    //   childs[0].style.placeSelf = "end";
    //   childs[1].style.placeSelf = "end";
    //   childs[2].style.placeSelf = "end";
    //   childs[3].style.placeSelf = "end";
    //   childs[4].style.placeSelf = "end";
    //   childs[5].style.placeSelf = "end";
    //   childs[6].style.placeSelf = "end";
    //   childs[7].style.placeSelf = "end";
    //   childs[8].style.placeSelf = "end";
    //   childs[9].style.placeSelf = "end";
    //   childs[10].style.placeSelf = "start";
    //   childs[11].style.placeSelf = "start";
    //   childs[12].style.placeSelf = "start";
    //   childs[13].style.placeSelf = "start";
    //   childs[14].style.placeSelf = "start";
    //   childs[15].style.placeSelf = "start";
    //   childs[16].style.placeSelf = "start";
    //   childs[17].style.placeSelf = "start";
    //   childs[18].style.placeSelf = "start";
    //   childs[19].style.placeSelf = "start";
    //   childs[20].style.placeSelf = "start";
    //   childs[21].style.placeSelf = "start";
    //   childs[22].style.placeSelf = "start";
    //   childs[23].style.placeSelf = "start";
    //   childs[24].style.placeSelf = "start";

    //   main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    // }
    else if (angle > 10 && angle < 23) {

      wh = getMaximumWidthHeight(width / 7, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 " " v_8 v_9 v_10 v_11 v_12 v_13 v_14 " " v_15 v_16 v_17 v_18 v_19 v_20 v_21 " " v_22 v_23 v_24 v_25 . . . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";
      childs[24].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height} ${wh.height}px 1fr`;

     
    } else if (angle > 23 && angle < 42) {
      wh = getMaximumWidthHeight(width / 5, height / 5);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 " " v_6 v_7 v_8 v_9 v_10 " " v_11 v_12 v_13 v_14 v_15 " " v_16 v_17 v_18 v_19 v_20 " " v_21 v_22 v_23 v_24 v_25" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "start";
      childs[6].style.placeSelf = "start";
      childs[7].style.placeSelf = "start";
      childs[8].style.placeSelf = "start";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";
      childs[24].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;

    }  else if (angle > 42 && angle < 54) {
    wh = getMaximumWidthHeight(width / 4, height / 7);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4" "  v_5 v_6 v_7 v_8 " " v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16 " " v_17 v_18 v_19 v_20 " " v_21 v_22 v_23 v_24 " " v_25 . . . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "center";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 54 && angle < 65) {
        wh = getMaximumWidthHeight(width / 3, height / 9);
     
      gridTemplateAreas = ` " v_1 v_2 v_3" " v_4 v_5 v_6" " v_7 v_8 v_9" " v_10 v_11 v_12" " v_13 v_14 v_15" " v_16 v_17 v_18" " v_19 v_20 v_21" " v_22 v_23 v_24" " v_25 . . " " . . . " " . . . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "center";
      childs[19].style.placeSelf = "center";
      childs[20].style.placeSelf = "center";
      childs[21].style.placeSelf = "center";
      childs[22].style.placeSelf = "center";
      childs[23].style.placeSelf = "center";
      childs[24].style.placeSelf = "start";
      
      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    }
    else {
      wh = getMaximumWidthHeight(width / 2, height / 14);

      gridTemplateAreas = ` " v_1 v_2" " v_3 v_4" " v_5 v_6" " v_7 v_8" " v_9 v_10" " v_11 v_12" " v_13 v_14" " v_15 v_16" " v_17 v_18" " v_19 v_20" " v_21 v_22" " v_23 v_24" " v_25 . " " . . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "end";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;

      

      
    }
    
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  } else if (childs.length == 26) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas;
    let wh;
    if (angle < 4.6) {
      wh = getMaximumWidthHeight(width / 13, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13" " v_14 v_15 v_16 v_17 v_18 v_19 v_20 v_21 v_22 v_23 v_24 v_25 v_26" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr 1fr`;
    } else if (angle > 4.6 && angle < 8) {
      wh = getMaximumWidthHeight(width / 14, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14" " . v_15 v_16 v_17 v_18 v_19 v_20 v_21 v_22 v_23 v_24 v_25 v_26 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr 1fr`;
    } else if (angle > 8 && angle < 10) {
      wh = getMaximumWidthHeight(width / 9, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 v_6 v_7 v_8 v_9"  " v_10 v_11 v_12  v_13 v_14 v_15 v_16 v_17 v_18 " " v_19 v_20 v_21 v_22 v_23 v_24 v_25 v_26 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 10 && angle < 23) {
      wh = getMaximumWidthHeight(width / 7, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 " " v_8 v_9 v_10 v_11 v_12 v_13 v_14 " " v_15 v_16 v_17 v_18 v_19 v_20 v_21 " " . v_22 v_23 v_24 v_25 v_26 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height} ${wh.height}px 1fr`;
    } else if (angle > 23 && angle < 42) {
      wh = getMaximumWidthHeight(width / 6, height / 5);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 " " v_7 v_8 v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16 v_17 v_18 " " v_19 v_20 v_21 v_22 v_23 v_24 " " . . v_25 v_26 . . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 42 && angle < 54) {
      wh = getMaximumWidthHeight(width / 4, height / 7);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4" "  v_5 v_6 v_7 v_8 " " v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16 " " v_17 v_18 v_19 v_20 " " v_21 v_22 v_23 v_24 " " . v_25 v_26 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "center";
      childs[24].style.placeSelf = "center";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 54 && angle < 65) {
      wh = getMaximumWidthHeight(width / 3, height / 9);

      gridTemplateAreas = ` " v_1 v_2 v_3" " v_4 v_5 v_6" " v_7 v_8 v_9" " v_10 v_11 v_12" " v_13 v_14 v_15" " v_16 v_17 v_18" " v_19 v_20 v_21" " v_22 v_23 v_24" " v_25 v_26 . " " . . . " " . . . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "center";
      childs[19].style.placeSelf = "center";
      childs[20].style.placeSelf = "center";
      childs[21].style.placeSelf = "center";
      childs[22].style.placeSelf = "center";
      childs[23].style.placeSelf = "center";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else {
      wh = getMaximumWidthHeight(width / 2, height / 14);

      gridTemplateAreas = ` " v_1 v_2" " v_3 v_4" " v_5 v_6" " v_7 v_8" " v_9 v_10" " v_11 v_12" " v_13 v_14" " v_15 v_16" " v_17 v_18" " v_19 v_20" " v_21 v_22" " v_23 v_24" " v_25 v_26 " " . . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "end";
      childs[25].style.placeSelf = "end";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  } else if (childs.length == 27) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas;
    let wh;
    if (angle < 8) {
      wh = getMaximumWidthHeight(width / 14, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14" " . v_15 v_16 v_17 v_18 v_19 v_20 v_21 v_22 v_23 v_24 v_25 v_26 v_27" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";
      childs[26].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr 1fr`;
     
    }  else if (angle > 8 && angle < 10) {
      wh = getMaximumWidthHeight(width / 9, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4  v_5 v_6 v_7 v_8 v_9"  " v_10 v_11 v_12  v_13 v_14 v_15 v_16 v_17 v_18 " " v_19 v_20 v_21 v_22 v_23 v_24 v_25 v_26 v_27 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "start";
      childs[10].style.placeSelf = "start";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "start";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";
      childs[26].style.placeSelf = "start";


      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 10 && angle < 23) {
      wh = getMaximumWidthHeight(width / 7, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 " " v_8 v_9 v_10 v_11 v_12 v_13 v_14 " " v_15 v_16 v_17 v_18 v_19 v_20 v_21 " "  v_22 v_23 v_24 v_25 v_26 v_27 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";
      childs[26].style.placeSelf = "start";


      main_grid.style.gridTemplateRows = `1fr ${wh.height} ${wh.height}px 1fr`;
    } else if (angle > 23 && angle < 42) {
      wh = getMaximumWidthHeight(width / 6, height / 5);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 " " v_7 v_8 v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16 v_17 v_18 " " v_19 v_20 v_21 v_22 v_23 v_24 " "  v_25 v_26 v_27 . . . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";
      childs[26].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 42 && angle < 54) {
      wh = getMaximumWidthHeight(width / 4, height / 7);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4" "  v_5 v_6 v_7 v_8 " " v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16 " " v_17 v_18 v_19 v_20 " " v_21 v_22 v_23 v_24 " " v_25 v_26 v_27 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";
      childs[26].style.placeSelf = "start";


      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 54 && angle < 65) {
      wh = getMaximumWidthHeight(width / 3, height / 9);

      gridTemplateAreas = ` " v_1 v_2 v_3" " v_4 v_5 v_6" " v_7 v_8 v_9" " v_10 v_11 v_12" " v_13 v_14 v_15" " v_16 v_17 v_18" " v_19 v_20 v_21" " v_22 v_23 v_24" " v_25 v_26 v_27 " " . . . " " . . . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "center";
      childs[19].style.placeSelf = "center";
      childs[20].style.placeSelf = "center";
      childs[21].style.placeSelf = "center";
      childs[22].style.placeSelf = "center";
      childs[23].style.placeSelf = "center";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";
      childs[26].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else {
      wh = getMaximumWidthHeight(width / 2, height / 14);

      gridTemplateAreas = ` " v_1 v_2" " v_3 v_4" " v_5 v_6" " v_7 v_8" " v_9 v_10" " v_11 v_12" " v_13 v_14" " v_15 v_16" " v_17 v_18" " v_19 v_20" " v_21 v_22" " v_23 v_24" " v_25 v_26 " " v_27 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "end";
      childs[25].style.placeSelf = "end";
      childs[26].style.placeSelf = "end";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  } else if (childs.length == 28) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas;
    let wh;
    if (angle < 8) {
      wh = getMaximumWidthHeight(width / 14, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14" " v_15 v_16 v_17 v_18 v_19 v_20 v_21 v_22 v_23 v_24 v_25 v_26 v_27 v_28" `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "start";
      childs[15].style.placeSelf = "start";
      childs[16].style.placeSelf = "start";
      childs[17].style.placeSelf = "start";
      childs[18].style.placeSelf = "start";
      childs[19].style.placeSelf = "start";
      childs[20].style.placeSelf = "start";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";
      childs[26].style.placeSelf = "start";
      childs[27].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr 1fr`;
    } else if (angle > 8 && angle < 9) {
      wh = getMaximumWidthHeight(width / 10, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 " " v_11 v_12 v_13 v_14 v_15 v_16 v_17 v_18 v_19 v_20 " " v_21 v_22 v_23 v_24 v_25 v_26 v_27 v_28 v_29 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "end";
      childs[25].style.placeSelf = "end";
      childs[26].style.placeSelf = "end";
      childs[27].style.placeSelf = "end";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 9 && angle < 23) {
      wh = getMaximumWidthHeight(width / 7, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 " " v_8 v_9 v_10 v_11 v_12 v_13 v_14 " " v_15 v_16 v_17 v_18 v_19 v_20 v_21 " "  v_22 v_23 v_24 v_25 v_26 v_27 v_28 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "start";
      childs[22].style.placeSelf = "start";
      childs[23].style.placeSelf = "start";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";
      childs[26].style.placeSelf = "start";
      childs[27].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height} ${wh.height}px 1fr`;
    } else if (angle > 23 && angle < 42) {
      wh = getMaximumWidthHeight(width / 6, height / 5);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 " " v_7 v_8 v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16 v_17 v_18 " " v_19 v_20 v_21 v_22 v_23 v_24 " " . v_25 v_26 v_27 v_28 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";
      childs[26].style.placeSelf = "start";
      childs[27].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 42 && angle < 54) {
      wh = getMaximumWidthHeight(width / 4, height / 7);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4" "  v_5 v_6 v_7 v_8 " " v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16 " " v_17 v_18 v_19 v_20 " " v_21 v_22 v_23 v_24 " " v_25 v_26 v_27 v_28 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";
      childs[26].style.placeSelf = "start";
      childs[27].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 54 && angle < 65) {
      wh = getMaximumWidthHeight(width / 3, height / 10);

      gridTemplateAreas = ` " v_1 v_2 v_3" " v_4 v_5 v_6" " v_7 v_8 v_9" " v_10 v_11 v_12" " v_13 v_14 v_15" " v_16 v_17 v_18" " v_19 v_20 v_21" " v_22 v_23 v_24" " v_25 v_26 v_27 " " . v_28 . " " . . . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "center";
      childs[19].style.placeSelf = "center";
      childs[20].style.placeSelf = "center";
      childs[21].style.placeSelf = "center";
      childs[22].style.placeSelf = "center";
      childs[23].style.placeSelf = "center";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";
      childs[26].style.placeSelf = "start";
      childs[27].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else {
      wh = getMaximumWidthHeight(width / 2, height / 14);

      gridTemplateAreas = ` " v_1 v_2" " v_3 v_4" " v_5 v_6" " v_7 v_8" " v_9 v_10" " v_11 v_12" " v_13 v_14" " v_15 v_16" " v_17 v_18" " v_19 v_20" " v_21 v_22" " v_23 v_24" " v_25 v_26 " " v_27 v_28 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "end";
      childs[25].style.placeSelf = "end";
      childs[26].style.placeSelf = "end";
      childs[27].style.placeSelf = "end";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  } else if (childs.length == 29) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas;
    let wh;
    if (angle < 4) {
      wh = getMaximumWidthHeight(width / 15, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14 v_15 " " v_16 v_17 v_18 v_19 v_20 v_21 v_22 v_23 v_24 v_25 v_26 v_27 v_28 v_29 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "end";
      childs[25].style.placeSelf = "end";
      childs[26].style.placeSelf = "end";
      childs[27].style.placeSelf = "end";
      childs[28].style.placeSelf = "end";

      main_grid.style.gridTemplateRows = `1fr 1fr`;
    } else if (angle > 4 && angle < 9) {
      wh = getMaximumWidthHeight(width / 10, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 " " v_11 v_12 v_13 v_14 v_15 v_16 v_17 v_18 v_19 v_20 " " v_21 v_22 v_23 v_24 v_25 v_26 v_27 v_28 v_29 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "end";
      childs[25].style.placeSelf = "end";
      childs[26].style.placeSelf = "end";
      childs[27].style.placeSelf = "end";
      childs[28].style.placeSelf = "end";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 9 && angle < 23) {
      wh = getMaximumWidthHeight(width / 8, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 " " v_9 v_10 v_11 v_12 v_13 v_14 v_15 v_16 " " v_17 v_18 v_19 v_20 v_21 v_22 v_23 v_24 " " v_25 v_26 v_27 v_28 v_29 . . . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "end";
      childs[25].style.placeSelf = "end";
      childs[26].style.placeSelf = "end";
      childs[27].style.placeSelf = "end";
      childs[28].style.placeSelf = "end";

      main_grid.style.gridTemplateRows = `1fr ${wh.height} ${wh.height}px 1fr`;
    } else if (angle > 23 && angle < 42) {
      wh = getMaximumWidthHeight(width / 6, height / 5);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 " " v_7 v_8 v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16 v_17 v_18 " " v_19 v_20 v_21 v_22 v_23 v_24 " " v_25 v_26 v_27 v_28 v_29 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";
      childs[26].style.placeSelf = "start";
      childs[27].style.placeSelf = "start";
      childs[28].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 42 && angle < 54) {
      wh = getMaximumWidthHeight(width / 4, height / 8);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 " " v_5 v_6 v_7 v_8 " " v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16 " " v_17 v_18 v_19 v_20 " " v_21 v_22 v_23 v_24 " " v_25 v_26 v_27 v_28 " " v_29 . . . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "end";
      childs[25].style.placeSelf = "end";
      childs[26].style.placeSelf = "end";
      childs[27].style.placeSelf = "end";
      childs[28].style.placeSelf = "end";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 54 && angle < 65) {
      wh = getMaximumWidthHeight(width / 3, height / 10);

      gridTemplateAreas = ` " v_1 v_2 v_3" " v_4 v_5 v_6" " v_7 v_8 v_9" " v_10 v_11 v_12" " v_13 v_14 v_15" " v_16 v_17 v_18" " v_19 v_20 v_21" " v_22 v_23 v_24" " v_25 v_26 v_27 " " v_28 v_29 . "`;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "end";
      childs[25].style.placeSelf = "end";
      childs[26].style.placeSelf = "end";
      childs[27].style.placeSelf = "end";
      childs[28].style.placeSelf = "end";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px  1fr`;
    } else {
      wh = getMaximumWidthHeight(width / 2, height / 15);
      gridTemplateAreas = ` " v_1 v_2" " v_3 v_4" " v_5 v_6" " v_7 v_8" " v_9 v_10" " v_11 v_12" " v_13 v_14" " v_15 v_16" " v_17 v_18" " v_19 v_20" " v_21 v_22" " v_23 v_24" " v_25 v_26" " v_27 v_28" " v_29 ." `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "center";
      childs[3].style.placeSelf = "center";
      childs[4].style.placeSelf = "center";
      childs[5].style.placeSelf = "center";
      childs[6].style.placeSelf = "center";
      childs[7].style.placeSelf = "center";
      childs[8].style.placeSelf = "center";
      childs[9].style.placeSelf = "center";
      childs[10].style.placeSelf = "center";
      childs[11].style.placeSelf = "center";
      childs[12].style.placeSelf = "center";
      childs[13].style.placeSelf = "center";
      childs[14].style.placeSelf = "center";
      childs[15].style.placeSelf = "center";
      childs[16].style.placeSelf = "center";
      childs[17].style.placeSelf = "center";
      childs[18].style.placeSelf = "center";
      childs[19].style.placeSelf = "center";
      childs[20].style.placeSelf = "center";
      childs[21].style.placeSelf = "center";
      childs[22].style.placeSelf = "center";
      childs[23].style.placeSelf = "center";
      childs[24].style.placeSelf = "center";
      childs[25].style.placeSelf = "center";
      childs[26].style.placeSelf = "center";
      childs[27].style.placeSelf = "center";
      childs[28].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  } else if (childs.length == 30) {
    main_grid.style.gridTemplateRows = "auto";

    let gridTemplateAreas;
    let wh;
    if (angle < 4) {
      wh = getMaximumWidthHeight(width / 15, height / 2);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 v_11 v_12 v_13 v_14 v_15 " " v_16 v_17 v_18 v_19 v_20 v_21 v_22 v_23 v_24 v_25 v_26 v_27 v_28 v_29 v_30 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "end";
      childs[25].style.placeSelf = "end";
      childs[26].style.placeSelf = "end";
      childs[27].style.placeSelf = "end";
      childs[28].style.placeSelf = "end";
      childs[29].style.placeSelf = "end";


      main_grid.style.gridTemplateRows = `1fr 1fr`;
    } else if (angle > 4 && angle < 9) {
      wh = getMaximumWidthHeight(width / 10, height / 3);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 v_9 v_10 " " v_11 v_12 v_13 v_14 v_15 v_16 v_17 v_18 v_19 v_20 " " v_21 v_22 v_23 v_24 v_25 v_26 v_27 v_28 v_29 v_30 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "end";
      childs[25].style.placeSelf = "end";
      childs[26].style.placeSelf = "end";
      childs[27].style.placeSelf = "end";
      childs[28].style.placeSelf = "end";
      childs[29].style.placeSelf = "end";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px 1fr`;
    } else if (angle > 9 && angle < 23) {
      wh = getMaximumWidthHeight(width / 8, height / 4);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 v_7 v_8 " " v_9 v_10 v_11 v_12 v_13 v_14 v_15 v_16 " " v_17 v_18 v_19 v_20 v_21 v_22 v_23 v_24 " " . v_25 v_26 v_27 v_28 v_29 v_30 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "end";
      childs[25].style.placeSelf = "end";
      childs[26].style.placeSelf = "end";
      childs[27].style.placeSelf = "end";
      childs[28].style.placeSelf = "end";
      childs[29].style.placeSelf = "end";

      main_grid.style.gridTemplateRows = `1fr ${wh.height} ${wh.height}px 1fr`;
    } else if (angle > 23 && angle < 42) {
      wh = getMaximumWidthHeight(width / 6, height / 5);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 v_5 v_6 " " v_7 v_8 v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16 v_17 v_18 " " v_19 v_20 v_21 v_22 v_23 v_24 " " v_25 v_26 v_27 v_28 v_29 v_30 " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "start";
      childs[25].style.placeSelf = "start";
      childs[26].style.placeSelf = "start";
      childs[27].style.placeSelf = "start";
      childs[28].style.placeSelf = "start";
      childs[29].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else if (angle > 42 && angle < 54) {
      wh = getMaximumWidthHeight(width / 4, height / 8);
      gridTemplateAreas = ` " v_1 v_2 v_3 v_4 " " v_5 v_6 v_7 v_8 " " v_9 v_10 v_11 v_12 " " v_13 v_14 v_15 v_16 " " v_17 v_18 v_19 v_20 " " v_21 v_22 v_23 v_24 " " v_25 v_26 v_27 v_28 " " . v_29 v_30 . " `;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "end";
      childs[25].style.placeSelf = "end";
      childs[26].style.placeSelf = "end";
      childs[27].style.placeSelf = "end";
      childs[28].style.placeSelf = "start";
      childs[29].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    } else {
      wh = getMaximumWidthHeight(width / 3, height / 10);

      gridTemplateAreas = ` " v_1 v_2 v_3" " v_4 v_5 v_6" " v_7 v_8 v_9" " v_10 v_11 v_12" " v_13 v_14 v_15" " v_16 v_17 v_18" " v_19 v_20 v_21" " v_22 v_23 v_24" " v_25 v_26 v_27 " " v_28 v_29 v_30 "`;
      childs[0].style.placeSelf = "end";
      childs[1].style.placeSelf = "end";
      childs[2].style.placeSelf = "end";
      childs[3].style.placeSelf = "end";
      childs[4].style.placeSelf = "end";
      childs[5].style.placeSelf = "end";
      childs[6].style.placeSelf = "end";
      childs[7].style.placeSelf = "end";
      childs[8].style.placeSelf = "end";
      childs[9].style.placeSelf = "end";
      childs[10].style.placeSelf = "end";
      childs[11].style.placeSelf = "end";
      childs[12].style.placeSelf = "end";
      childs[13].style.placeSelf = "end";
      childs[14].style.placeSelf = "end";
      childs[15].style.placeSelf = "end";
      childs[16].style.placeSelf = "end";
      childs[17].style.placeSelf = "end";
      childs[18].style.placeSelf = "end";
      childs[19].style.placeSelf = "end";
      childs[20].style.placeSelf = "end";
      childs[21].style.placeSelf = "end";
      childs[22].style.placeSelf = "end";
      childs[23].style.placeSelf = "end";
      childs[24].style.placeSelf = "end";
      childs[25].style.placeSelf = "end";
      childs[26].style.placeSelf = "end";
      childs[27].style.placeSelf = "start";
      childs[28].style.placeSelf = "start";
      childs[29].style.placeSelf = "start";

      main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px  1fr`;
    } 
    // else {
    //   wh = getMaximumWidthHeight(width / 2, height / 15);
    //   gridTemplateAreas = ` " v_1 v_2" " v_3 v_4" " v_5 v_6" " v_7 v_8" " v_9 v_10" " v_11 v_12" " v_13 v_14" " v_15 v_16" " v_17 v_18" " v_19 v_20" " v_21 v_22" " v_23 v_24" " v_25 v_26" " v_27 v_28" " v_29 v_30" `;
    //   childs[0].style.placeSelf = "end";
    //   childs[1].style.placeSelf = "end";
    //   childs[2].style.placeSelf = "center";
    //   childs[3].style.placeSelf = "center";
    //   childs[4].style.placeSelf = "center";
    //   childs[5].style.placeSelf = "center";
    //   childs[6].style.placeSelf = "center";
    //   childs[7].style.placeSelf = "center";
    //   childs[8].style.placeSelf = "center";
    //   childs[9].style.placeSelf = "center";
    //   childs[10].style.placeSelf = "center";
    //   childs[11].style.placeSelf = "center";
    //   childs[12].style.placeSelf = "center";
    //   childs[13].style.placeSelf = "center";
    //   childs[14].style.placeSelf = "center";
    //   childs[15].style.placeSelf = "center";
    //   childs[16].style.placeSelf = "center";
    //   childs[17].style.placeSelf = "center";
    //   childs[18].style.placeSelf = "center";
    //   childs[19].style.placeSelf = "center";
    //   childs[20].style.placeSelf = "center";
    //   childs[21].style.placeSelf = "center";
    //   childs[22].style.placeSelf = "center";
    //   childs[23].style.placeSelf = "center";
    //   childs[24].style.placeSelf = "center";
    //   childs[25].style.placeSelf = "center";
    //   childs[26].style.placeSelf = "center";
    //   childs[27].style.placeSelf = "center";
    //   childs[28].style.placeSelf = "start";
    //   childs[29].style.placeSelf = "start";

    //   main_grid.style.gridTemplateRows = `1fr ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px ${wh.height}px 1fr`;
    // }

    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `${wh.width}px`;
      childs[i].style.height = `${wh.height}px`;
    }

    // set main_grid gridtemplateareas to center the child vertically and horizontally

    main_grid.style.gridTemplateAreas = gridTemplateAreas;
  }

  // if the length of the childs is 31
  else if (childs.length == 31) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `80px`;
      childs[i].style.height = `45px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3" "v_4 v_5 v_6"  "v_7 v_8 v_9" "v_10 v_11 v_12"  " v_13 v_14 v_15 "  " v_16 v_17 v_18 "  " v_19 v_20 v_21 "  " v_22 v_23 v_24 "  " v_25 v_26 v_27 "  " v_28 v_29 v_30 "  " v_31 . ."     `;
  }

  // if the length of the childs is 32
  else if (childs.length == 32) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `80px`;
      childs[i].style.height = `45px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3" "v_4 v_5 v_6"  "v_7 v_8 v_9" "v_10 v_11 v_12"  " v_13 v_14 v_15 "  " v_16 v_17 v_18 "  " v_19 v_20 v_21 "  " v_22 v_23 v_24 "  " v_25 v_26 v_27 "  " v_28 v_29 v_30 "  " v_31 v_32 ."     `;
  }

  // if the length of the childs is 33
  else if (childs.length == 33) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `80px`;
      childs[i].style.height = `45px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3" "v_4 v_5 v_6"  "v_7 v_8 v_9" "v_10 v_11 v_12"  " v_13 v_14 v_15 "  " v_16 v_17 v_18 "  " v_19 v_20 v_21 "  " v_22 v_23 v_24 "  " v_25 v_26 v_27 "  " v_28 v_29 v_30 "  " v_31 v_32 v_33 "     `;
  }

  // if the length of the childs is 34
  else if (childs.length == 34) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `80px`;
      childs[i].style.height = `45px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3" "v_4 v_5 v_6"  "v_7 v_8 v_9" "v_10 v_11 v_12"  " v_13 v_14 v_15 "  " v_16 v_17 v_18 "  " v_19 v_20 v_21 "  " v_22 v_23 v_24 "  " v_25 v_26 v_27 "  " v_28 v_29 v_30 "  " v_31 v_32 v_33 "  " v_34 . ."     `;
  }

  // if the length of the childs is 35
  else if (childs.length == 35) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `80px`;
      childs[i].style.height = `45px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3" "v_4 v_5 v_6"  "v_7 v_8 v_9" "v_10 v_11 v_12"  " v_13 v_14 v_15 "  " v_16 v_17 v_18 "  " v_19 v_20 v_21 "  " v_22 v_23 v_24 "  " v_25 v_26 v_27 "  " v_28 v_29 v_30 "  " v_31 v_32 v_33 "  " v_34 v_35 ."     `;
  }

  // if the length of the childs is 36
  else if (childs.length == 36) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `80px`;
      childs[i].style.height = `45px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3" "v_4 v_5 v_6"  "v_7 v_8 v_9" "v_10 v_11 v_12"  " v_13 v_14 v_15 "  " v_16 v_17 v_18 "  " v_19 v_20 v_21 "  " v_22 v_23 v_24 "  " v_25 v_26 v_27 "  " v_28 v_29 v_30 "  " v_31 v_32 v_33 "  " v_34 v_35 v_36 "     `;
  }

  // if the length of the childs is 37
  else if (childs.length == 37) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `80px`;
      childs[i].style.height = `45px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3" "v_4 v_5 v_6"  "v_7 v_8 v_9" "v_10 v_11 v_12"  " v_13 v_14 v_15 "  " v_16 v_17 v_18 "  " v_19 v_20 v_21 "  " v_22 v_23 v_24 "  " v_25 v_26 v_27 "  " v_28 v_29 v_30 "  " v_31 v_32 v_33 "  " v_34 v_35 v_36 "  " v_37 . ."     `;
  }

  // if the length of the childs is 38
  else if (childs.length == 38) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `80px`;
      childs[i].style.height = `45px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3" "v_4 v_5 v_6"  "v_7 v_8 v_9" "v_10 v_11 v_12"  " v_13 v_14 v_15 "  " v_16 v_17 v_18 "  " v_19 v_20 v_21 "  " v_22 v_23 v_24 "  " v_25 v_26 v_27 "  " v_28 v_29 v_30 "  " v_31 v_32 v_33 "  " v_34 v_35 v_36 "  " v_37 v_38 ."     `;
  }

  // if the length of the childs is 39
  else if (childs.length == 39) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `80px`;
      childs[i].style.height = `45px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3" "v_4 v_5 v_6"  "v_7 v_8 v_9" "v_10 v_11 v_12"  " v_13 v_14 v_15 "  " v_16 v_17 v_18 "  " v_19 v_20 v_21 "  " v_22 v_23 v_24 "  " v_25 v_26 v_27 "  " v_28 v_29 v_30 "  " v_31 v_32 v_33 "  " v_34 v_35 v_36 "  " v_37 v_38 v_39 "     `;
  }

  // if the length of the childs is 40
  else if (childs.length == 40) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"     `;
  }

  // if the length of the childs is 41
  else if (childs.length == 41) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 . . ."     `;
  }

  // if the length of the childs is 42
  else if (childs.length == 42) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 . ."     `;
  }

  // if the length of the childs is 43
  else if (childs.length == 43) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 ."     `;
  }

  // if the length of the childs is 44
  else if (childs.length == 44) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44"     `;
  }

  // if the length of the childs is 45
  else if (childs.length == 45) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44"  "v_45 . . ."     `;
  }

  // if the length of the childs is 46
  else if (childs.length == 46) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44"  "v_45 v_46 . ."     `;
  }

  // if the length of the childs is 47
  else if (childs.length == 47) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44"  "v_45 v_46 v_47 ."     `;
  }

  // if the length of the childs is 48
  else if (childs.length == 48) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44"  "v_45 v_46 v_47 v_48"     `;
  }

  // if the length of the childs is 49
  else if (childs.length == 49) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44"  "v_45 v_46 v_47 v_48"  "v_49 . . ."     `;
  }

  // if the length of the childs is 50
  else if (childs.length == 50) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44"  "v_45 v_46 v_47 v_48"  "v_49 v_50 . ."     `;
  }

  // if the length of the childs is 51
  else if (childs.length == 51) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44"  "v_45 v_46 v_47 v_48"  "v_49 v_50 v_51 ."     `;
  }

  // if the length of the childs is 52
  else if (childs.length == 52) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44"  "v_45 v_46 v_47 v_48"  "v_49 v_50 v_51 v_52"     `;
  }

  // if the length of the childs is 53
  else if (childs.length == 53) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44"  "v_45 v_46 v_47 v_48"  "v_49 v_50 v_51 v_52"  "v_53 . . ."     `;
  }

  // if the length of the childs is 54
  else if (childs.length == 54) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44"  "v_45 v_46 v_47 v_48"  "v_49 v_50 v_51 v_52"  "v_53 v_54 . ."     `;
  }

  // if the length of the childs is 55
  else if (childs.length == 55) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44"  "v_45 v_46 v_47 v_48"  "v_49 v_50 v_51 v_52"  "v_53 v_54 v_55 ."     `;
  }

  // if the length of the childs is 56
  else if (childs.length == 56) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44"  "v_45 v_46 v_47 v_48"  "v_49 v_50 v_51 v_52"  "v_53 v_54 v_55 v_56"     `;
  }

  // if the length of the childs is 57
  else if (childs.length == 57) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44"  "v_45 v_46 v_47 v_48"  "v_49 v_50 v_51 v_52"  "v_53 v_54 v_55 v_56"  "v_57 . . ."     `;
  }

  // if the length of the childs is 58
  else if (childs.length == 58) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44"  "v_45 v_46 v_47 v_48"  "v_49 v_50 v_51 v_52"  "v_53 v_54 v_55 v_56"  "v_57 v_58 . ."     `;
  }

  // if the length of the childs is 59
  else if (childs.length == 59) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44"  "v_45 v_46 v_47 v_48"  "v_49 v_50 v_51 v_52"  "v_53 v_54 v_55 v_56"  "v_57 v_58 v_59 ."     `;
  }

  // if the length of the childs is 60
  else if (childs.length == 60) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `64px`;
      childs[i].style.height = `36px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4"  "v_5 v_6 v_7 v_8"  "v_9 v_10 v_11 v_12"  "v_13 v_14 v_15 v_16"  "v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24"  "v_25 v_26 v_27 v_28"  "v_29 v_30 v_31 v_32"  "v_33 v_34 v_35 v_36"  "v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44"  "v_45 v_46 v_47 v_48"  "v_49 v_50 v_51 v_52"  "v_53 v_54 v_55 v_56"  "v_57 v_58 v_59 v_60"     `;
  }

  // if the length of the childs is 61
  else if (childs.length == 61) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15"  "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35"  "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"  "v_56 v_57 v_58 v_59 v_60"  "v_61 . . . ."     `;
  }

  // if the length of the childs is 62
  else if (childs.length == 62) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15"  "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35"  "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"  "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 . . ."     `;
  }

  // if the length of the childs is 63
  else if (childs.length == 63) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15"  "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35"  "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"  "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 . ."     `;
  }

  // if the length of the childs is 64
  else if (childs.length == 64) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15"  "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35"  "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"  "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 v_64 ."     `;
  }

  // if the length of the childs is 65
  else if (childs.length == 65) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15"  "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35"  "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"  "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 v_64 v_65"     `;
  }

  // if the length of the childs is 66
  else if (childs.length == 66) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15"  "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35"  "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"  "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 v_64 v_65"  "v_66 . . . ."     `;
  }

  // if the length of the childs is 67
  else if (childs.length == 67) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15"  "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35"  "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"  "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 v_64 v_65"  "v_66 v_67 . . ."   `;
  }

  // if the length of the childs is 68
  else if (childs.length == 68) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15"  "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35"  "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"  "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 v_64 v_65"  "v_66 v_67 v_68 . ."   `;
  }

  // if the length of the childs is 69
  else if (childs.length == 69) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15"  "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35"  "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"  "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 v_64 v_65"  "v_66 v_67 v_68 v_69 ."   `;
  }

  // if the length of the childs is 70
  else if (childs.length == 70) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15"  "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35"  "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"  "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 v_64 v_65"  "v_66 v_67 v_68 v_69 v_70"   `;
  }

  // if the length of the childs is 71
  else if (childs.length == 71) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15"  "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35"  "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"  "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 v_64 v_65"  "v_66 v_67 v_68 v_69 v_70"  "v_71 . . . ." `;
  }

  // if the length of the childs is 72
  else if (childs.length == 72) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15"  "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35"  "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"  "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 v_64 v_65"  "v_66 v_67 v_68 v_69 v_70"  "v_71 v_72 . . ." `;
  }

  // if the length of the childs is 73
  else if (childs.length == 73) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15"  "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35"  "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"  "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 v_64 v_65"  "v_66 v_67 v_68 v_69 v_70"  "v_71 v_72 v_73 . ." `;
  }

  // if the length of the childs is 74
  else if (childs.length == 74) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15" 
         "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35" 
          "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"
            "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 v_64 v_65"  "v_66 v_67 v_68 v_69 v_70"  "v_71 v_72 v_73 v_74 ." `;
  }

  // if the length of the childs is 75
  else if (childs.length == 75) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15" 
        "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35" 
         "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"
           "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 v_64 v_65"  "v_66 v_67 v_68 v_69 v_70"  "v_71 v_72 v_73 v_74 v_75" `;
  }

  // if the length of the childs is 76
  else if (childs.length == 76) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15" 
        "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35" 
         "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"
           "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 v_64 v_65"  "v_66 v_67 v_68 v_69 v_70"  "v_71 v_72 v_73 v_74 v_75"
           "v_76 . . . ." `;
  }

  // if the length of the childs is 77
  else if (childs.length == 77) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15" 
      "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35" 
       "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"
         "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 v_64 v_65"  "v_66 v_67 v_68 v_69 v_70"  "v_71 v_72 v_73 v_74 v_75"
         "v_76 v_77 . . ." `;
  }

  // if the length of the childs is 78
  else if (childs.length == 78) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15" 
        "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35" 
         "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"
           "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 v_64 v_65"  "v_66 v_67 v_68 v_69 v_70"  "v_71 v_72 v_73 v_74 v_75"
           "v_76 v_77 v_78 . ." `;
  }

  // if the length of the childs is 79
  else if (childs.length == 79) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15" 
          "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35" 
           "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"
             "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 v_64 v_65"  "v_66 v_67 v_68 v_69 v_70"  "v_71 v_72 v_73 v_74 v_75"
             "v_76 v_77 v_78 v_79 ." `;
  }

  // if the length of the childs is 80
  else if (childs.length == 80) {
    // set main_grid gridtemplateareas to center the child vertically and horizontally

    // loop through the childs and set width and height
    for (let i = 0; i < childs.length; i++) {
      childs[i].style.width = `48px`;
      childs[i].style.height = `27px`;
    }

    main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15" 
        "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35" 
         "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"
           "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 v_64 v_65"  "v_66 v_67 v_68 v_69 v_70"  "v_71 v_72 v_73 v_74 v_75"
           "v_76 v_77 v_78 v_79 v_80" `;
  }

  // // if the length of the childs is 81
  // else if (childs.length == 81) {
  //   // set main_grid gridtemplateareas to center the child vertically and horizontally

  //   // loop through the childs and set width and height
  //   for (let i = 0; i < childs.length; i++) {
  //     childs[i].style.width = `48px`
  //     childs[i].style.height = `27px`
  //   }

  //   main_grid.style.gridTemplateAreas = `   "v_1 v_2 v_3 v_4 v_5"  "v_6 v_7 v_8 v_9 v_10"  "v_11 v_12 v_13 v_14 v_15"
  //   "v_16 v_17 v_18 v_19 v_20"  "v_21 v_22 v_23 v_24 v_25"  "v_26 v_27 v_28 v_29 v_30"  "v_31 v_32 v_33 v_34 v_35"
  //    "v_36 v_37 v_38 v_39 v_40"  "v_41 v_42 v_43 v_44 v_45"  "v_46 v_47 v_48 v_49 v_50"  "v_51 v_52 v_53 v_54 v_55"
  //      "v_56 v_57 v_58 v_59 v_60"  "v_61 v_62 v_63 v_64 v_65"  "v_66 v_67 v_68 v_69 v_70"  "v_71 v_72 v_73 v_74 v_75"
  //      "v_76 v_77 v_78 v_79 v_80"   "v_81 . . . ." `

  // }

  // }

  // if the width of the main_grid is greater than
}
