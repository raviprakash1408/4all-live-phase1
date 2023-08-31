import { gql } from "@apollo/client";
export const titleCase = (s) => {
  // handle if s is undefined
  if (s === undefined) {
    return s;
  }
  return s
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
    .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()); // First char after each -/_
};
export function dynamicsort(property, order) {
  var sort_order = 1;
  if (order === "desc") {
    sort_order = -1;
  }
  return function (a, b) {
    // a should come before b in the sorted order
    if (a[property] < b[property]) {
      return -1 * sort_order;
      // a should come after b in the sorted order
    } else if (a[property] > b[property]) {
      return 1 * sort_order;
      // a and b are the same
    } else {
      return 0 * sort_order;
    }
  };
}

export const customGql = (staticParts, dynamicParts) => {
  let temp =
    staticParts[0] +
    dynamicParts +
    staticParts[1] +
    dynamicParts +
    staticParts[2] +
    dynamicParts +
    staticParts[3] +
    dynamicParts +
    staticParts[4];
  console.log(temp, staticParts, dynamicParts, "staticParts dynamicParts");
  return gql(temp);
};

// convert snakecase to camelcase
export const toCamel = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

// find if key exists in object
export const hasKey = (objlist, key) => {
  if (typeof objlist == "object") {
    return objlist.some((obj) => obj["user_id"] === key);
  }
  //  check if key equals to user_id field in object
};

export const ValidateEmail = (input) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (input.match(validRegex)) {
    return true;
  } else {
    return false;
  }
};

export const isEmpty = (ob) => {
  for (var i in ob) {
    return false;
  }
  return true;
};

export const removeElementFromArray = (array, element) => {
  const index = array.indexOf(element);
  if (index > -1) {
    // only splice array when item is found
    array.splice(index, 1); // 2nd parameter means remove one item only
  }
};

export const trimFileNme = (name) => {
  var file_name = name;
  var arr_filename = file_name.split(".");
  var file_ex = arr_filename[arr_filename.length - 1];
  if (file_name.length > 10) {
    file_name = file_name.substr(0, 5) + "..." + file_name.substr(-5);
  }
  return file_name;
};

const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

export const niceBytes = (x) => {
  let l = 0,
    n = parseInt(x, 10) || 0;

  while (n >= 1024 && ++l) {
    n = n / 1024;
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
};

export const getURLParameters = (url) => {
  var result = {};
  var hashIndex = url.indexOf("#");
  if (hashIndex > 0) url = url.substr(0, hashIndex);
  var searchIndex = url.indexOf("?");
  if (searchIndex == -1) return result;
  var sPageURL = url.substring(searchIndex + 1);
  var sURLVariables = sPageURL.split("&");
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split("=");
    result[sParameterName[0]] = sParameterName[1];
  }
  return result;
};
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return (
    months[date.getMonth()] +
    " " +
    date.getDate() +
    " " +
    date.getFullYear() +
    " " +
    strTime
  );
}

// fn for convert date to string
export function dateToString(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export function updateURLParameter(url, param, paramVal) {
  var newAdditionalURL = "";
  var tempArray = url.split("?");
  var baseURL = tempArray[0];
  var additionalURL = tempArray[1];
  var temp = "";
  if (additionalURL) {
    tempArray = additionalURL.split("&");
    for (var i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split("=")[0] != param) {
        newAdditionalURL += temp + tempArray[i];
        temp = "&";
      }
    }
  }

  var rows_txt = temp + "" + param + "=" + paramVal;
  return baseURL + "?" + newAdditionalURL + rows_txt;
}

export function removeURLParameter(url, parameter) {
  //prefer to use l.search if you have a location/link object
  var urlparts = url.split("?");
  if (urlparts.length >= 2) {
    var prefix = encodeURIComponent(parameter) + "=";
    var pars = urlparts[1].split(/[&;]/g);

    //reverse iteration as may be destructive
    for (var i = pars.length; i-- > 0;) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    url = urlparts[0] + "?" + pars.join("&");
    return url;
  } else {
    return url;
  }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function createShortName(first_name, last_name) {
  return first_name.charAt(0).toUpperCase() + last_name.charAt(0).toUpperCase();
}

export function organizationUser(permission) {
  const organisationUser = localStorage.getObject("is_organization_user");
  if (organisationUser == "true") {
    return true;
  } else {
    return permission;
  }
}

// throttle function
export function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// function for getting event status by comparing start and end date
export const getEventStatus = (start_date, end_date) => {
  let event_status = "upcoming";
  try {
    let current_date = new Date();
    let start_date_time = new Date(start_date);
    let end_date_time = new Date(end_date);
    if (current_date < start_date_time) {
      event_status = "upcoming";
    } else if (
      current_date >= start_date_time &&
      current_date <= end_date_time
    ) {
      event_status = "live";
    } else if (current_date > end_date_time) {
      event_status = "past";
    }
  } catch (error) {
    console.log(error, "getEventStatus error");
  }

  return event_status;
};

// function for changing the opacity of the rgba color if it not having opacity then add opacity
export const changeOpacity = (color, opacity) => {
  if (color.indexOf("rgba") === -1) {
    color = color.replace("rgb", "rgba");
    color = color.replace(")", ", " + opacity + ")");
  } else {
    color = color.replace(/[^,]+(?=\))/, opacity);
  }
  return color;
};

// function for convert hex color to css filter
export const hexToCssFilter = (hex) => {
  const rgb = hex;
  return `brightness(${rgb.r}%) contrast(${rgb.g}%) saturate(${rgb.b}%)`;
};

export function convertTZ(date, tzString) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}

// function for validate formdata fields not empty
export const validateForm = (form) => {
  let valid = true;
  for (let key in form) {
    if (key !== "phonenumber") {
      if (form[key] === "") {
        valid = false;
        break;
      }
    }
  }
  return valid;
};

export const isGuestUser = () => {
  let guestUser = false;

  if (
    localStorage.getObject("guestUser") &&
    localStorage.getObject("guestUser") === "true"
  ) {
    guestUser = true;
  } else {
    guestUser = false;
  }

  return guestUser;
};

export const userLogout = () => {
  var micDeviceId = localStorage.getObject("micDeviceId");
  var cameraDeviceId = localStorage.getObject("camDeviceId");
  var audioOutputDeviceId = localStorage.getObject("audioOutputDeviceId");
  localStorage.clear();
  localStorage.setObject("micDeviceId", micDeviceId);
  localStorage.setObject("camDeviceId", cameraDeviceId);
  localStorage.setObject("audioOutputDeviceId", audioOutputDeviceId);
  localStorage.setObject("islogin", 0);
};

// function for change the name string to sentence case
export const toSentenceCase = (str) => {
  try {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } catch (error) {
    return str;
  }
};

export const getSupportedCodec = () => {
  const arr = RTCRtpSender.getCapabilities("video").codecs;
  const hasVP9 = arr.some((obj) => obj.mimeType === "video/VP9");
  const hasAV1 = arr.some((obj) => obj.mimeType === "video/AV1");
  const hasVP8 = arr.some((obj) => obj.mimeType === "video/VP8");
  const supportedCodec = [];
  if (hasVP9) supportedCodec.push("VP9");
  if (hasAV1) supportedCodec.push("AV1");
  if (hasVP8) supportedCodec.push("VP8");
  return supportedCodec;
};

export const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export const removeHyphenAndCapitalize = (str) => {
  return str.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

export const registerFormValidation = (
  formikErrors,
  showErrorMessage,
  isCPasswordDirty,
  emailDbExists,
  inviteUserEmail
) => {
  console.log(formikErrors, "formikErrors");
  let valid = true;
  if (inviteUserEmail !== "") {
    if (
      formikErrors.firstName == null &&
      formikErrors.cregisterpassword == null &&
      formikErrors.lastName == null &&
      formikErrors.email == null &&
      !(showErrorMessage && isCPasswordDirty)
    ) {
      valid = false;
    } else {
      valid = true;
    }
  } else {
    if (
      formikErrors.firstName == null &&
      formikErrors.cregisterpassword == null &&
      formikErrors.lastName == null &&
      formikErrors.email == null &&
      !(showErrorMessage && isCPasswordDirty) &&
      !emailDbExists
    ) {
      valid = false;
    } else {
      valid = true;
    }
  }
  return valid;
};

//function get teamSlug from url

export const getTeamSlugFromUrl = (type) => {
  const url = window.location.href;
  let teamSlug;
  if (type == "lobby") {
    teamSlug = url.split("/")[4];
  } else if (type == "space") {
    teamSlug = url.split("/")[3];
  }
  return teamSlug;
};



