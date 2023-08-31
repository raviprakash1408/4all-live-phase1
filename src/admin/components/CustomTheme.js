import React, { useState, useEffect } from "react";
import { Typography, Button, Stack, InputLabel } from "@mui/material";
import { TinyColor } from "@ctrl/tinycolor";
import ColourPicker from "./ColourPicker";
import { useDispatch, useSelector } from "react-redux";
import {
  setIndividualColor,
  setDarkColorPalette,
  setLightColorPalette,
  setColorPickerColor,
} from "../../state/colorPalette/colorPaletteSlice.ts";
import { AxiosLocal } from "../../utilities/axiosUtils.ts";
import { configureStore } from "@reduxjs/toolkit";
import store from "../../state/store.ts";
import { isEmpty } from "../../utilities/common";
import { WEBSITE_PATH } from "../../utilities/websiteUrls.ts";

const CustomThemeColorSelector = (props) => {
  const {
    spaceSlug,
    component,
    themeType,
    changeColorPalette,
    lightTheme,
    darkTheme,
  } = props;

  const dispatch = useDispatch();

  const colorPalette = useSelector((state) => state.colorPalette.colorPalette);

  useEffect(() => {
    console.log(component, "aaaaaannnnnnn");
    if (component === "editSpace") {
      AxiosLocal.get(`subroom/${spaceSlug}`)
        .then(function (response) {
          if (response.data.data.override_theme) {
            let darkTheme = {};
            let lightTheme = {};
            if (isEmpty(response.data.data.dark_theme)) {
              darkTheme = {
                theme_color_0: "rgba(1, 25, 52, 1)",
                theme_color_1: "rgba(1, 34, 67, 1)",
                theme_color_2: "rgba(1, 42, 80, 1)",
                theme_color_3: "rgba(0, 46, 86, 1)",
                theme_color_4: "rgba(20, 63, 99, 1)",
                theme_color_5: "rgba(38, 78, 110, 1)",
                theme_color_6: "rgba(55, 92, 120, 1)",
                theme_color_7: "rgba(75, 109, 133, 1)",
                theme_color_8: "rgba(93, 124, 144, 1)",
                theme_color_9: "rgba(110, 139, 155, 1)",
                theme_color_10: "rgba(136, 161, 171, 1)",
                theme_color_11: "rgba(165, 184, 192, 1)",
                theme_color_12: "rgba(225, 231, 234, 1)",
                theme_color_13: "rgba(255, 255, 255, 1)",
                theme_color_14: "rgba(230, 25, 89, 1)",
                theme_color_15: "rgba(0, 139, 205, 1)",
              };
            } else {
              darkTheme = {
                theme_color_0: response.data.data.dark_theme.dark_theme_color_0,
                theme_color_1: response.data.data.dark_theme.dark_theme_color_1,
                theme_color_2: response.data.data.dark_theme.dark_theme_color_2,
                theme_color_3: response.data.data.dark_theme.dark_theme_color_3,
                theme_color_4: response.data.data.dark_theme.dark_theme_color_4,
                theme_color_5: response.data.data.dark_theme.dark_theme_color_5,
                theme_color_6: response.data.data.dark_theme.dark_theme_color_6,
                theme_color_7: response.data.data.dark_theme.dark_theme_color_7,
                theme_color_8: response.data.data.dark_theme.dark_theme_color_8,
                theme_color_9: response.data.data.dark_theme.dark_theme_color_9,
                theme_color_10:
                  response.data.data.dark_theme.dark_theme_color_10,
                theme_color_11:
                  response.data.data.dark_theme.dark_theme_color_11,
                theme_color_12:
                  response.data.data.dark_theme.dark_theme_color_12,
                theme_color_13:
                  response.data.data.dark_theme.dark_theme_color_13,
                theme_color_14:
                  response.data.data.dark_theme.dark_theme_color_14,
                theme_color_15:
                  response.data.data.dark_theme.dark_theme_color_15,
              };
            }
            if (isEmpty(response.data.data.light_theme)) {
              lightTheme = {
                theme_color_0: "rgba(255, 255, 255, 1)",
                theme_color_1: "rgba(225, 231, 234, 1)",
                theme_color_2: "rgba(165, 184, 192, 1)",
                theme_color_3: "rgba(136, 161, 171, 1)",
                theme_color_4: "rgba(110, 139, 155, 1)",
                theme_color_5: "rgba(93, 124, 144, 1)",
                theme_color_6: "rgba(75, 109, 133, 1)",
                theme_color_7: "rgba(55, 92, 120, 1)",
                theme_color_8: "rgba(38, 78, 110, 1)",
                theme_color_9: "rgba(20, 63, 99, 1)",
                theme_color_10: "rgba(0, 46, 86, 1)",
                theme_color_11: "rgba(1, 42, 80, 1)",
                theme_color_12: "rgba(1, 34, 67, 1)",
                theme_color_13: "rgba(1, 25, 52, 1)",
                theme_color_14: "rgba(230, 25, 89, 1)",
                theme_color_15: "rgba(0, 139, 205, 1)",
              };
            } else {
              lightTheme = {
                theme_color_0:
                  response.data.data.light_theme.light_theme_color_0,
                theme_color_1:
                  response.data.data.light_theme.light_theme_color_1,
                theme_color_2:
                  response.data.data.light_theme.light_theme_color_2,
                theme_color_3:
                  response.data.data.light_theme.light_theme_color_3,
                theme_color_4:
                  response.data.data.light_theme.light_theme_color_4,
                theme_color_5:
                  response.data.data.light_theme.light_theme_color_5,
                theme_color_6:
                  response.data.data.light_theme.light_theme_color_6,
                theme_color_7:
                  response.data.data.light_theme.light_theme_color_7,
                theme_color_8:
                  response.data.data.light_theme.light_theme_color_8,
                theme_color_9:
                  response.data.data.light_theme.light_theme_color_9,
                theme_color_10:
                  response.data.data.light_theme.light_theme_color_10,
                theme_color_11:
                  response.data.data.light_theme.light_theme_color_11,
                theme_color_12:
                  response.data.data.light_theme.light_theme_color_12,
                theme_color_13:
                  response.data.data.light_theme.light_theme_color_13,
                theme_color_14:
                  response.data.data.light_theme.light_theme_color_14,
                theme_color_15:
                  response.data.data.light_theme.light_theme_color_15,
              };
            }

            dispatch(setDarkColorPalette(darkTheme));
            dispatch(setLightColorPalette(lightTheme));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      let darkTheme = {};
      let lightTheme = {};
      let color_pellets = require("../../meetmo_color_palettes.json");
      if (WEBSITE_PATH.includes("events.fox")) {
        color_pellets = require("../../fox_color_palettes.json");
      } else {
        color_pellets = require("../../meetmo_color_palettes.json");
      }
      darkTheme = {
        theme_color_0: color_pellets.dark.dark_theme_color_0,
        theme_color_1: color_pellets.dark.dark_theme_color_1,
        theme_color_2: color_pellets.dark.dark_theme_color_2,
        theme_color_3: color_pellets.dark.dark_theme_color_3,
        theme_color_4: color_pellets.dark.dark_theme_color_4,
        theme_color_4: color_pellets.dark.dark_theme_color_4,
        theme_color_5: color_pellets.dark.dark_theme_color_5,
        theme_color_6: color_pellets.dark.dark_theme_color_6,
        theme_color_7: color_pellets.dark.dark_theme_color_7,
        theme_color_8: color_pellets.dark.dark_theme_color_8,
        theme_color_8: color_pellets.dark.dark_theme_color_8,
        theme_color_9: color_pellets.dark.dark_theme_color_9,
        theme_color_10: color_pellets.dark.dark_theme_color_10,
        theme_color_11: color_pellets.dark.dark_theme_color_11,
        theme_color_12: color_pellets.dark.dark_theme_color_12,
        theme_color_13: color_pellets.dark.dark_theme_color_13,
        theme_color_14: color_pellets.dark.dark_theme_color_14,
        theme_color_15: color_pellets.dark.dark_theme_color_15,
      };

      lightTheme = {
        theme_color_0: color_pellets.light.light_theme_color_0,
        theme_color_1: color_pellets.light.light_theme_color_1,
        theme_color_2: color_pellets.light.light_theme_color_2,
        theme_color_3: color_pellets.light.light_theme_color_3,
        theme_color_4: color_pellets.light.light_theme_color_4,
        theme_color_5: color_pellets.light.light_theme_color_5,
        theme_color_6: color_pellets.light.light_theme_color_6,
        theme_color_7: color_pellets.light.light_theme_color_7,
        theme_color_8: color_pellets.light.light_theme_color_8,
        theme_color_9: color_pellets.light.light_theme_color_9,
        theme_color_10: color_pellets.light.light_theme_color_10,
        theme_color_11: color_pellets.light.light_theme_color_11,
        theme_color_12: color_pellets.light.light_theme_color_12,
        theme_color_13: color_pellets.light.light_theme_color_13,
        theme_color_14: color_pellets.light.light_theme_color_14,
        theme_color_15: color_pellets.light.light_theme_color_15,
      };

      dispatch(setDarkColorPalette(darkTheme));
      dispatch(setLightColorPalette(lightTheme));

    }
  }, []);

  const [color, setColor] = useState({ r: "241", g: "112", b: "19", a: "1" });

  const [startColor, setStartColor] = useState("rgba(225, 231, 234, 1)");

  const [colour2, setcolour2] = useState("rgba(195, 208, 213, 1)");

  const [colour3, setcolour3] = useState("rgba(165, 184, 192, 1)");

  const [colour4, setcolour4] = useState("rgba(136, 161, 171, 1)");

  const [colour5, setcolour5] = useState("rgba(110, 139, 155, 1)");

  const [colour6, setcolour6] = useState("rgba(93, 124, 144, 1)");

  const [colour7, setcolour7] = useState("rgba(75, 109, 133, 1)");

  const [colour8, setcolour8] = useState("rgba(55, 92, 120, 1)");

  const [colour9, setcolour9] = useState("rgba(38, 78, 110, 1)");

  const [colour10, setcolour10] = useState("rgba(20, 63, 99, 1)");

  const [colour11, setcolour11] = useState("rgba(0, 46, 86, 1)");

  const [colour12, setcolour12] = useState("rgba(1, 42, 80, 1)");

  const [colour13, setcolour13] = useState("rgba(1, 34, 67, 1)");

  const [endColor, setEndColor] = useState("rgba(0, 36, 48, 1)");

  const [dangerColor, setDangerColor] = useState("rgba(230, 25, 89, 1)");

  const [importantColor, setImportantColor] = useState("rgba(0, 139, 205, 1)");

  const [loadFirstTime, setloadFirstTime] = useState(true);

  // useEffect(() => {
  //   if (loadFirstTime) {
  //     // if (component === "addSpace") {
  //     if (themeType === "light") {
  //       setStartColor(
  //         lightTheme?.light_theme_color_0
  //           ? lightTheme?.light_theme_color_0
  //           : "rgba(225, 231, 234, 1)"
  //       );
  //       setcolour2(
  //         lightTheme?.light_theme_color_1
  //           ? lightTheme?.light_theme_color_1
  //           : "rgba(195, 208, 213, 1)"
  //       );
  //       setcolour3(
  //         lightTheme?.light_theme_color_2
  //           ? lightTheme?.light_theme_color_2
  //           : "rgba(165, 184, 192, 1)"
  //       );
  //       setcolour4(
  //         lightTheme?.light_theme_color_3
  //           ? lightTheme?.light_theme_color_3
  //           : "rgba(136, 161, 171, 1)"
  //       );
  //       setcolour5(
  //         lightTheme?.light_theme_color_4
  //           ? lightTheme?.light_theme_color_4
  //           : "rgba(110, 139, 155, 1)"
  //       );
  //       setcolour6(
  //         lightTheme?.light_theme_color_5
  //           ? lightTheme?.light_theme_color_5
  //           : "rgba(93, 124, 144, 1)"
  //       );
  //       setcolour7(
  //         lightTheme?.light_theme_color_6
  //           ? lightTheme?.light_theme_color_6
  //           : "rgba(75, 109, 133, 1)"
  //       );
  //       setcolour8(
  //         lightTheme?.light_theme_color_7
  //           ? lightTheme?.light_theme_color_7
  //           : "rgba(55, 92, 120, 1)"
  //       );
  //       setcolour9(
  //         lightTheme?.light_theme_color_8
  //           ? lightTheme?.light_theme_color_8
  //           : "rgba(38, 78, 110, 1)"
  //       );
  //       setcolour10(
  //         lightTheme?.light_theme_color_9
  //           ? lightTheme?.light_theme_color_9
  //           : "rgba(20, 63, 99, 1)"
  //       );
  //       setcolour11(
  //         lightTheme?.light_theme_color_10
  //           ? lightTheme?.light_theme_color_10
  //           : "rgba(0, 46, 86, 1)"
  //       );
  //       setcolour12(
  //         lightTheme?.light_theme_color_11
  //           ? lightTheme?.light_theme_color_11
  //           : "rgba(1, 42, 80, 1)"
  //       );
  //       setcolour13(
  //         lightTheme?.light_theme_color_12
  //           ? lightTheme?.light_theme_color_12
  //           : "rgba(1, 34, 67, 1)"
  //       );
  //       setEndColor(
  //         lightTheme?.light_theme_color_13
  //           ? lightTheme?.light_theme_color_13
  //           : "rgba(0, 36, 48, 1)"
  //       );
  //       setDangerColor(
  //         lightTheme?.light_theme_color_14
  //           ? lightTheme?.light_theme_color_14
  //           : "rgba(230, 25, 89, 1)"
  //       );
  //       setImportantColor(
  //         lightTheme?.light_theme_color_15
  //           ? lightTheme?.light_theme_color_15
  //           : "rgba(0, 139, 205, 1)"
  //       );
  //     } else {
  //       setStartColor(
  //         darkTheme?.dark_theme_color_0
  //           ? darkTheme?.dark_theme_color_0
  //           : "rgba(1, 25, 52, 1)"
  //       );
  //       setcolour2(
  //         darkTheme?.dark_theme_color_1
  //           ? darkTheme?.dark_theme_color_1
  //           : "rgba(1, 34, 67, 1)"
  //       );
  //       setcolour3(
  //         darkTheme?.dark_theme_color_2
  //           ? darkTheme?.dark_theme_color_2
  //           : "rgba(1, 42, 80, 1)"
  //       );
  //       setcolour4(
  //         darkTheme?.dark_theme_color_3
  //           ? darkTheme?.dark_theme_color_3
  //           : "rgba(0, 46, 86, 1)"
  //       );
  //       setcolour5(
  //         darkTheme?.dark_theme_color_4
  //           ? darkTheme?.dark_theme_color_4
  //           : "rgba(20, 63, 99, 1)"
  //       );
  //       setcolour6(
  //         darkTheme?.dark_theme_color_5
  //           ? darkTheme?.dark_theme_color_5
  //           : "rgba(38, 78, 110, 1)"
  //       );
  //       setcolour7(
  //         darkTheme?.dark_theme_color_6
  //           ? darkTheme?.dark_theme_color_6
  //           : "rgba(55, 92, 120, 1)"
  //       );
  //       setcolour8(
  //         darkTheme?.dark_theme_color_7
  //           ? darkTheme?.dark_theme_color_7
  //           : "rgba(75, 109, 133, 1)"
  //       );
  //       setcolour9(
  //         darkTheme?.dark_theme_color_8
  //           ? darkTheme?.dark_theme_color_8
  //           : "rgba(93, 124, 144, 1)"
  //       );
  //       setcolour10(
  //         darkTheme?.dark_theme_color_9
  //           ? darkTheme?.dark_theme_color_9
  //           : "rgba(110, 139, 155, 1)"
  //       );
  //       setcolour11(
  //         darkTheme?.dark_theme_color_10
  //           ? darkTheme?.dark_theme_color_10
  //           : "rgba(136, 161, 171, 1)"
  //       );
  //       setcolour12(
  //         darkTheme?.dark_theme_color_11
  //           ? darkTheme?.dark_theme_color_11
  //           : "rgba(165, 184, 192, 1)"
  //       );
  //       setcolour13(
  //         darkTheme?.dark_theme_color_12
  //           ? darkTheme?.dark_theme_color_12
  //           : "rgba(195, 208, 213, 1)"
  //       );
  //       setEndColor(
  //         darkTheme?.dark_theme_color_13
  //           ? darkTheme?.dark_theme_color_13
  //           : "rgba(225, 231, 234, 1)"
  //       );
  //       setDangerColor(
  //         darkTheme?.dark_theme_color_14
  //           ? darkTheme?.dark_theme_color_14
  //           : "rgba(230, 25, 89, 1)"
  //       );
  //       setImportantColor(
  //         darkTheme?.dark_theme_color_15
  //           ? darkTheme?.dark_theme_color_15
  //           : "rgba(0, 139, 205, 1)"
  //       );
  //     }

  //     setloadFirstTime(false);
  //   }
  // }, []);

  const [displayColorPicker, setdisplayColorPicker] = useState(false);
  const [selectedColourBlock, setSelectedColourBlock] = useState("");
  const [theme, setTheme] = useState(
    themeType === "dark" ? "dark_theme" : "light_theme"
  );

  const hexToRGB = (hex) => {
    let alpha = false,
      h = hex.slice(hex.startsWith("#") ? 1 : 0);
    if (h.length === 3) h = [...h].map((x) => x + x).join("");
    else if (h.length === 8) alpha = true;
    h = parseInt(h, 16);
    return (
      "rgb" +
      (alpha ? "a" : "") +
      "(" +
      (h >>> (alpha ? 24 : 16)) +
      ", " +
      ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
      ", " +
      ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
      (alpha ? `, ${h & 0x000000ff}` : "") +
      ")"
    );
  };

  const onChangeMethod = async (color) => {
    // let darken2,
    //   darken3,
    //   darken4,
    //   darken5,
    //   darken6,
    //   darken7,
    //   darken8,
    //   light13,
    //   light12,
    //   light11,
    //   light10,
    //   light9,
    //   light8;
    // if (themeType === "light") {
    //   darken2 = new TinyColor(color.hex).darken(4);
    //   darken3 = new TinyColor(color.hex).darken(8);
    //   darken4 = new TinyColor(color.hex).darken(12);
    //   darken5 = new TinyColor(color.hex).darken(16);
    //   darken6 = new TinyColor(color.hex).darken(20);
    //   darken7 = new TinyColor(color.hex).darken(24);
    //   darken8 = new TinyColor(color.hex).darken(28);
    //   // let darken9 = new TinyColor(color.hex).darken(58)
    //   // let darken10 = new TinyColor(color.hex).darken(63)
    //   // let darken11 = new TinyColor(color.hex).darken(70)
    //   // let darken12 = new TinyColor(color.hex).darken(77)
    //   // let darken13 = new TinyColor(color.hex).darken(84)
    //   // let endDarken = new TinyColor(color.hex).darken(91)
    //   light13 = new TinyColor(color.hex).lighten(4);
    //   light12 = new TinyColor(color.hex).lighten(8);
    //   light11 = new TinyColor(color.hex).lighten(12);
    //   light10 = new TinyColor(color.hex).lighten(16);
    //   light9 = new TinyColor(color.hex).lighten(20);
    //   light8 = new TinyColor(color.hex).lighten(24);
    //   // let light7 = new TinyColor(color.hex).lighten(28)
    //   // let light6 = new TinyColor(color.hex).lighten(58)
    //   // let light5 = new TinyColor(color.hex).lighten(63)
    //   // let light4 = new TinyColor(color.hex).lighten(70)
    //   // let light3 = new TinyColor(color.hex).lighten(77)
    //   // let light2 = new TinyColor(color.hex).lighten(84)
    // } else {
    //   darken2 = new TinyColor(color.hex).lighten(4);
    //   darken3 = new TinyColor(color.hex).lighten(8);
    //   darken4 = new TinyColor(color.hex).lighten(12);
    //   darken5 = new TinyColor(color.hex).lighten(16);
    //   darken6 = new TinyColor(color.hex).lighten(20);
    //   darken7 = new TinyColor(color.hex).lighten(24);
    //   darken8 = new TinyColor(color.hex).lighten(28);
    //   light13 = new TinyColor(color.hex).darken(4);
    //   light12 = new TinyColor(color.hex).darken(8);
    //   light11 = new TinyColor(color.hex).darken(12);
    //   light10 = new TinyColor(color.hex).darken(16);
    //   light9 = new TinyColor(color.hex).darken(20);
    //   light8 = new TinyColor(color.hex).darken(24);
    // }
    // console.log(selectedColourBlock, "selectedColourBlock");
    // setColor({ ...color.rgb });
    // switch (selectedColourBlock) {
    //   case "theme_color_0":
    //     console.log(hexToRGB(darken2.toHex()), "startColorfn");
    //     await setStartColor(hexToRGB(color.hex));
    //     await setcolour2(hexToRGB(darken2.toHex()));
    //     await setcolour3(hexToRGB(darken3.toHex()));
    //     await setcolour4(hexToRGB(darken4.toHex()));
    //     await setcolour5(hexToRGB(darken5.toHex()));
    //     await setcolour6(hexToRGB(darken6.toHex()));
    //     await setcolour7(hexToRGB(darken7.toHex()));
    //     await setcolour8(hexToRGB(darken8.toHex()));
    //     let colorData = {
    //       theme_color_0: hexToRGB(color.hex),
    //       theme_color_1: hexToRGB(darken2.toHex()),
    //       theme_color_2: hexToRGB(darken3.toHex()),
    //       theme_color_3: hexToRGB(darken4.toHex()),
    //       theme_color_4: hexToRGB(darken5.toHex()),
    //       theme_color_5: hexToRGB(darken6.toHex()),
    //       theme_color_6: hexToRGB(darken7.toHex()),
    //       theme_color_7: hexToRGB(darken8.toHex()),
    //     };
    //     console.log(colorData, "colorDataDArk");
    //     if (themeType === "dark") {
    //       dispatch(setDarkColorPalette(colorData));
    //     } else {
    //       dispatch(setLightColorPalette(colorData));
    //     }
    //     break;
    //   case "theme_color_13":
    //     await setEndColor(hexToRGB(color.hex));
    //     // setcolour7({ ...light7.toRgb() });
    //     await setcolour8(hexToRGB(light8.toHex()));
    //     await setcolour9(hexToRGB(light9.toHex()));
    //     await setcolour10(hexToRGB(light10.toHex()));
    //     await setcolour11(hexToRGB(light11.toHex()));
    //     await setcolour12(hexToRGB(light12.toHex()));
    //     await setcolour13(hexToRGB(light13.toHex()));
    //     let colorData2 = {
    //       theme_color_13: hexToRGB(color.hex),
    //       theme_color_8: hexToRGB(light8.toHex()),
    //       theme_color_9: hexToRGB(light9.toHex()),
    //       theme_color_10: hexToRGB(light10.toHex()),
    //       theme_color_11: hexToRGB(light11.toHex()),
    //       theme_color_12: hexToRGB(light12.toHex()),
    //       theme_color_13: hexToRGB(light13.toHex()),
    //     };
    //     if (themeType === "dark") {
    //       dispatch(setDarkColorPalette(colorData2));
    //     } else {
    //       dispatch(setLightColorPalette(colorData2));
    //     }
    //     break;
    //   default:
    //     await setColor(hexToRGB(color.hex));
    //     let colorPaletteType =
    //       themeType === "dark" ? "dark_theme" : "light_theme";
    //     dispatch(
    //       setIndividualColor({
    //         theme: colorPaletteType,
    //         color: selectedColourBlock,
    //         value: hexToRGB(color.hex),
    //       })
    //     );
    //     break;
    // }
  };

  let colorPaletteData = {
    theme_color_0:
      themeType === "light"
        ? colorPalette["light_theme"]["theme_color_0"]
        : colorPalette["dark_theme"]["theme_color_0"],
    theme_color_1:
      themeType === "light"
        ? colorPalette["light_theme"]["theme_color_1"]
        : colorPalette["dark_theme"]["theme_color_1"],
    theme_color_2:
      themeType === "light"
        ? colorPalette["light_theme"]["theme_color_2"]
        : colorPalette["dark_theme"]["theme_color_2"],
    theme_color_3:
      themeType === "light"
        ? colorPalette["light_theme"]["theme_color_3"]
        : colorPalette["dark_theme"]["theme_color_3"],
    theme_color_4:
      themeType === "light"
        ? colorPalette["light_theme"]["theme_color_4"]
        : colorPalette["dark_theme"]["theme_color_4"],
    theme_color_5:
      themeType === "light"
        ? colorPalette["light_theme"]["theme_color_5"]
        : colorPalette["dark_theme"]["theme_color_5"],
    theme_color_6:
      themeType === "light"
        ? colorPalette["light_theme"]["theme_color_6"]
        : colorPalette["dark_theme"]["theme_color_6"],
    theme_color_7:
      themeType === "light"
        ? colorPalette["light_theme"]["theme_color_7"]
        : colorPalette["dark_theme"]["theme_color_7"],
    theme_color_8:
      themeType === "light"
        ? colorPalette["light_theme"]["theme_color_8"]
        : colorPalette["dark_theme"]["theme_color_8"],
    theme_color_9:
      themeType === "light"
        ? colorPalette["light_theme"]["theme_color_9"]
        : colorPalette["dark_theme"]["theme_color_9"],
    theme_color_10:
      themeType === "light"
        ? colorPalette["light_theme"]["theme_color_10"]
        : colorPalette["dark_theme"]["theme_color_10"],
    theme_color_11:
      themeType === "light"
        ? colorPalette["light_theme"]["theme_color_11"]
        : colorPalette["dark_theme"]["theme_color_11"],
    theme_color_12:
      themeType === "light"
        ? colorPalette["light_theme"]["theme_color_12"]
        : colorPalette["dark_theme"]["theme_color_12"],
    theme_color_13:
      themeType === "light"
        ? colorPalette["light_theme"]["theme_color_13"]
        : colorPalette["dark_theme"]["theme_color_13"],
    theme_color_14:
      themeType === "light"
        ? colorPalette["light_theme"]["theme_color_14"]
        : colorPalette["dark_theme"]["theme_color_14"],
    theme_color_15:
      themeType === "light"
        ? colorPalette["light_theme"]["theme_color_15"]
        : colorPalette["dark_theme"]["theme_color_15"],
  };

  // function for generate rgba string from rgba dictionary object and alpha value (0-1)
  const toRgba = (color) => {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  };

  const handleChangeComplete = async (color, event) => {
    console.log(color, event, "handleChangeComplete");
    let darken2,
      darken3,
      darken4,
      darken5,
      darken6,
      darken7,
      darken8,
      light13,
      light12,
      light11,
      light10,
      light9,
      light8;

    if (themeType === "light") {
      darken2 = new TinyColor(color.rgb).darken(4);
      darken3 = new TinyColor(color.rgb).darken(8);
      darken4 = new TinyColor(color.rgb).darken(12);
      darken5 = new TinyColor(color.rgb).darken(16);
      darken6 = new TinyColor(color.rgb).darken(20);
      darken7 = new TinyColor(color.rgb).darken(24);
      darken8 = new TinyColor(color.rgb).darken(28);
      // let darken9 = new TinyColor(color.hex).darken(58)
      // let darken10 = new TinyColor(color.hex).darken(63)
      // let darken11 = new TinyColor(color.hex).darken(70)
      // let darken12 = new TinyColor(color.hex).darken(77)
      // let darken13 = new TinyColor(color.hex).darken(84)
      // let endDarken = new TinyColor(color.hex).darken(91)

      light13 = new TinyColor(color.rgb).lighten(4);
      light12 = new TinyColor(color.rgb).lighten(8);
      light11 = new TinyColor(color.rgb).lighten(12);
      light10 = new TinyColor(color.rgb).lighten(16);
      light9 = new TinyColor(color.rgb).lighten(20);
      light8 = new TinyColor(color.rgb).lighten(24);
      // let light7 = new TinyColor(color.hex).lighten(28)
      // let light6 = new TinyColor(color.hex).lighten(58)
      // let light5 = new TinyColor(color.hex).lighten(63)
      // let light4 = new TinyColor(color.hex).lighten(70)
      // let light3 = new TinyColor(color.hex).lighten(77)
      // let light2 = new TinyColor(color.hex).lighten(84)
    } else {
      darken2 = new TinyColor(color.rgb).lighten(4);
      darken3 = new TinyColor(color.rgb).lighten(8);
      darken4 = new TinyColor(color.rgb).lighten(12);
      darken5 = new TinyColor(color.rgb).lighten(16);
      darken6 = new TinyColor(color.rgb).lighten(20);
      darken7 = new TinyColor(color.rgb).lighten(24);
      darken8 = new TinyColor(color.rgb).lighten(28);

      light13 = new TinyColor(color.rgb).darken(4);
      light12 = new TinyColor(color.rgb).darken(8);
      light11 = new TinyColor(color.rgb).darken(12);
      light10 = new TinyColor(color.rgb).darken(16);
      light9 = new TinyColor(color.rgb).darken(20);
      light8 = new TinyColor(color.rgb).darken(24);
    }
    console.log(selectedColourBlock, "selectedColourBlock");
    setColor({ ...color.rgb });

    switch (selectedColourBlock) {
      case "theme_color_0":
        console.log(toRgba(color.rgb), darken2, "startColorfn");
        // setStartColor(toRgba(color.rgb));
        // setcolour2(toRgba(darken2));
        // setcolour3(hexToRGB(darken3.toHex()));
        // setcolour4(hexToRGB(darken4.toHex()));
        // setcolour5(hexToRGB(darken5.toHex()));
        // setcolour6(hexToRGB(darken6.toHex()));
        // setcolour7(hexToRGB(darken7.toHex()));
        // setcolour8(hexToRGB(darken8.toHex()));

        let colorData = {
          theme_color_0: toRgba(color.rgb),
          theme_color_1: toRgba(darken2),
          theme_color_2: toRgba(darken3),
          theme_color_3: toRgba(darken4),
          theme_color_4: toRgba(darken5),
          theme_color_5: toRgba(darken6),
          theme_color_6: toRgba(darken7),
          theme_color_7: toRgba(darken8),
        };

        colorPaletteData = { ...colorPaletteData, ...colorData };

        console.log(colorData, "colorDataDArk");
        if (themeType === "dark") {
          dispatch(setDarkColorPalette(colorData));
        } else {
          dispatch(setLightColorPalette(colorData));
        }

        break;
      case "theme_color_13":
        console.log("theme_color_13");
        // setEndColor(hexToRGB(color.hex));
        // // setcolour7({ ...light7.toRgb() });
        // setcolour8(hexToRGB(light8.toHex()));
        // setcolour9(hexToRGB(light9.toHex()));
        // setcolour10(hexToRGB(light10.toHex()));
        // setcolour11(hexToRGB(light11.toHex()));
        // setcolour12(hexToRGB(light12.toHex()));
        // setcolour13(hexToRGB(light13.toHex()));

        let colorData2 = {
          theme_color_13: toRgba(color.rgb),
          theme_color_8: toRgba(light8),
          theme_color_9: toRgba(light9),
          theme_color_10: toRgba(light10),
          theme_color_11: toRgba(light11),
          theme_color_12: toRgba(light12),
          // theme_color_13: hexToRGB(light13.toHex()),
        };
        colorPaletteData = { ...colorPaletteData, ...colorData2 };
        if (themeType === "dark") {
          dispatch(setDarkColorPalette(colorData2));
        } else {
          dispatch(setLightColorPalette(colorData2));
        }

        break;
      default:
        setColor(toRgba(color.rgb));
        let colorPaletteType =
          themeType === "dark" ? "dark_theme" : "light_theme";

        colorPaletteData = {
          ...colorPaletteData,
          [selectedColourBlock]: toRgba(color.rgb),
        };
        dispatch(
          setIndividualColor({
            theme: colorPaletteType,
            color: selectedColourBlock,
            value: toRgba(color.rgb),
          })
        );
        break;
    }
    let colorData;
    // setTimeout(() => {}, 2000);
    if (themeType === "light") {
      colorData = {
        light_theme: {
          light_theme_color_0: colorPaletteData.theme_color_0,
          light_theme_color_1: colorPaletteData.theme_color_1,
          light_theme_color_2: colorPaletteData.theme_color_2,
          light_theme_color_3: colorPaletteData.theme_color_3,
          light_theme_color_4: colorPaletteData.theme_color_4,
          light_theme_color_5: colorPaletteData.theme_color_5,
          light_theme_color_6: colorPaletteData.theme_color_6,
          light_theme_color_7: colorPaletteData.theme_color_7,
          light_theme_color_8: colorPaletteData.theme_color_8,
          light_theme_color_9: colorPaletteData.theme_color_9,
          light_theme_color_10: colorPaletteData.theme_color_10,
          light_theme_color_11: colorPaletteData.theme_color_11,
          light_theme_color_12: colorPaletteData.theme_color_12,
          light_theme_color_13: colorPaletteData.theme_color_13,
          light_theme_color_14: colorPaletteData.theme_color_14,
          light_theme_color_15: colorPaletteData.theme_color_15,
        },
      };
    } else {
      colorData = {
        dark_theme: {
          dark_theme_color_0: colorPaletteData.theme_color_0,
          dark_theme_color_1: colorPaletteData.theme_color_1,
          dark_theme_color_2: colorPaletteData.theme_color_2,
          dark_theme_color_3: colorPaletteData.theme_color_3,
          dark_theme_color_4: colorPaletteData.theme_color_4,
          dark_theme_color_5: colorPaletteData.theme_color_5,
          dark_theme_color_6: colorPaletteData.theme_color_6,
          dark_theme_color_7: colorPaletteData.theme_color_7,
          dark_theme_color_8: colorPaletteData.theme_color_8,
          dark_theme_color_9: colorPaletteData.theme_color_9,
          dark_theme_color_10: colorPaletteData.theme_color_10,
          dark_theme_color_11: colorPaletteData.theme_color_11,
          dark_theme_color_12: colorPaletteData.theme_color_12,
          dark_theme_color_13: colorPaletteData.theme_color_13,
          dark_theme_color_14: colorPaletteData.theme_color_14,
          dark_theme_color_15: colorPaletteData.theme_color_15,
        },
      };
    }

    console.log(colorData, "colorData");
    changeColorPalette(colorData);
  };

  // useEffect(() => {
  //   let colorData;
  //   if (themeType === "light") {
  //     colorData = {
  //       light_theme: {
  //         light_theme_color_0: colorPalette.light_theme.light_theme_color_0,
  //         light_theme_color_1: colorPalette.light_theme.light_theme_color_1,
  //         light_theme_color_2: colorPalette.light_theme.light_theme_color_2,
  //         light_theme_color_3: colorPalette.light_theme.light_theme_color_3,
  //         light_theme_color_4: colorPalette.light_theme.light_theme_color_4,
  //         light_theme_color_5: colorPalette.light_theme.light_theme_color_5,
  //         light_theme_color_6: colorPalette.light_theme.light_theme_color_6,
  //         light_theme_color_7: colorPalette.light_theme.light_theme_color_7,
  //         light_theme_color_8: colorPalette.light_theme.light_theme_color_8,
  //         light_theme_color_9: colorPalette.light_theme.light_theme_color_9,
  //         light_theme_color_10: colorPalette.light_theme.light_theme_color_10,
  //         light_theme_color_11: colorPalette.light_theme.light_theme_color_11,
  //         light_theme_color_12: colorPalette.light_theme.light_theme_color_12,
  //         light_theme_color_13: colorPalette.light_theme.light_theme_color_13,
  //         light_theme_color_14: colorPalette.light_theme.light_theme_color_14,
  //         light_theme_color_15: colorPalette.light_theme.light_theme_color_15,
  //       },
  //     };
  //   } else {
  //     colorData = {
  //       dark_theme: {
  //         dark_theme_color_0: colorPalette.dark_theme.dark_theme_color_0,
  //         dark_theme_color_1: colorPalette.dark_theme.dark_theme_color_1,
  //         dark_theme_color_2: colorPalette.dark_theme.dark_theme_color_2,
  //         dark_theme_color_3: colorPalette.dark_theme.dark_theme_color_3,
  //         dark_theme_color_4: colorPalette.dark_theme.dark_theme_color_4,
  //         dark_theme_color_5: colorPalette.dark_theme.dark_theme_color_5,
  //         dark_theme_color_6: colorPalette.dark_theme.dark_theme_color_6,
  //         dark_theme_color_7: colorPalette.dark_theme.dark_theme_color_7,
  //         dark_theme_color_8: colorPalette.dark_theme.dark_theme_color_8,
  //         dark_theme_color_9: colorPalette.dark_theme.dark_theme_color_9,
  //         dark_theme_color_10: colorPalette.dark_theme.dark_theme_color_10,
  //         dark_theme_color_11: colorPalette.dark_theme.dark_theme_color_11,
  //         dark_theme_color_12: colorPalette.dark_theme.dark_theme_color_12,
  //         dark_theme_color_13: colorPalette.dark_theme.dark_theme_color_13,
  //         dark_theme_color_14: colorPalette.dark_theme.dark_theme_color_14,
  //         dark_theme_color_15: colorPalette.dark_theme.dark_theme_color_15,
  //       },
  //     };
  //   }

  //   console.log(colorData, "colorData");
  //   changeColorPalette(colorData);
  // }, [colorPalette]);

  const handleClick = (type) => {
    setdisplayColorPicker(!displayColorPicker);
    setSelectedColourBlock(type);

    let colorPaletteType = themeType === "dark" ? "dark_theme" : "light_theme";

    setColor(colorPalette[colorPaletteType][type]);

    console.log(colorPalette[colorPaletteType][type], "color");

    dispatch(setColorPickerColor(colorPalette[colorPaletteType][type]));
  };

  const handleClose = () => {
    setdisplayColorPicker(!displayColorPicker);
  };

  // console.log(
  //   startColor,
  //   colour2,
  //   colour3,
  //   colour4,
  //   colour5,
  //   colour6,
  //   colour7,
  //   colour8,
  //   colour9,
  //   colour10,
  //   colour11,
  //   colour12,
  //   colour13,
  //   endColor,
  //   dangerColor,
  //   importantColor,
  //   "colorsInColorPellete"
  // );

  return (
    <>
      {/* <Stack spacing={1} sx={{margin:'26px 0px 14px 40px'}}>
                <InputLabel htmlFor="Country" style={{color:'#88A1AB', fontSize:'14px', fontWeight:'400',fontFamily:'URW DIN REGULAR'}}>Custom Theme Color Selector</InputLabel>
                
            </Stack> */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ margin: "0px 40px 4px 40px" }}
      >
        <Typography
          variant="h5"
          style={{
            color: "#4B6D85",
            textAlign: "center",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fontWeight: 400,
            textAlign: "left",
          }}
        >
          Start colour
        </Typography>
        <Typography
          variant="h5"
          style={{
            color: "#4B6D85",
            textAlign: "center",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fontWeight: 400,
            textAlign: "left",
          }}
        >
          End colour
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ margin: "0px 40px 0px 40px" }}
      >
        <Button
          onClick={() => {
            handleClick("theme_color_0");
          }}
          style={{
            borderRadius: "0px",
            padding: "52px 16px",
            width: "16%",
            minWidth: "35px",
            backgroundColor: colorPalette[theme].theme_color_0,
            border: "3px solid #008BCD",
            borderRadius: "4px 0px 0px 4px",
          }}
          variant="contained"
        ></Button>
        <Button
          onClick={() => {
            handleClick("theme_color_1");
          }}
          style={{
            borderRadius: "0px",
            padding: "55px 16px",
            width: "16%",
            minWidth: "35px",
            backgroundColor: colorPalette[theme].theme_color_1,
          }}
          variant="contained"
        ></Button>
        <Button
          onClick={() => {
            handleClick("theme_color_2");
          }}
          style={{
            borderRadius: "0px",
            padding: "55px 16px",
            width: "16%",
            minWidth: "35px",
            backgroundColor: colorPalette[theme].theme_color_2,
          }}
          variant="contained"
        ></Button>
        <Button
          onClick={() => {
            handleClick("theme_color_3");
          }}
          style={{
            borderRadius: "0px",
            padding: "55px 16px",
            width: "16%",
            minWidth: "35px",
            backgroundColor: colorPalette[theme].theme_color_3,
          }}
          variant="contained"
        ></Button>
        <Button
          onClick={() => {
            handleClick("theme_color_4");
          }}
          style={{
            borderRadius: "0px",
            padding: "55px 16px",
            width: "16%",
            minWidth: "35px",
            backgroundColor: colorPalette[theme].theme_color_4,
          }}
          variant="contained"
        ></Button>
        <Button
          onClick={() => {
            handleClick("theme_color_5");
          }}
          style={{
            borderRadius: "0px",
            padding: "55px 16px",
            width: "16%",
            minWidth: "35px",
            backgroundColor: colorPalette[theme].theme_color_5,
          }}
          variant="contained"
        ></Button>
        <Button
          onClick={() => {
            handleClick("theme_color_6");
          }}
          style={{
            borderRadius: "0px",
            padding: "55px 16px",
            width: "16%",
            minWidth: "35px",
            backgroundColor: colorPalette[theme].theme_color_6,
          }}
          variant="contained"
        ></Button>
        <Button
          onClick={() => {
            handleClick("theme_color_7");
          }}
          style={{
            borderRadius: "0px",
            padding: "55px 16px",
            width: "16%",
            minWidth: "35px",
            background: `linear-gradient(to right,${colorPalette[theme].theme_color_7}, ${colorPalette[theme].theme_color_8})`,
          }}
          variant="contained"
        ></Button>
        {/* <Button onClick={ ()=>{ handleClick("colour9") } } style={{ borderRadius: '0px', padding: '55px 16px',width:'16%', minWidth:'35px', backgroundColor:`rgba(${colour8.r},${colour8.g},${colour8.b},${colour8.a})` }} variant="contained"></Button> */}
        <Button
          onClick={() => {
            handleClick("theme_color_8");
          }}
          style={{
            borderRadius: "0px",
            padding: "55px 16px",
            width: "16%",
            minWidth: "35px",
            backgroundColor: colorPalette[theme].theme_color_8,
          }}
          variant="contained"
        ></Button>
        <Button
          onClick={() => {
            handleClick("theme_color_9");
          }}
          style={{
            borderRadius: "0px",
            padding: "55px 16px",
            width: "16%",
            minWidth: "35px",
            backgroundColor: colorPalette[theme].theme_color_9,
          }}
          variant="contained"
        ></Button>
        <Button
          onClick={() => {
            handleClick("theme_color_10");
          }}
          style={{
            borderRadius: "0px",
            padding: "55px 16px",
            width: "16%",
            minWidth: "35px",
            backgroundColor: colorPalette[theme].theme_color_10,
          }}
          variant="contained"
        ></Button>
        <Button
          onClick={() => {
            handleClick("theme_color_11");
          }}
          style={{
            borderRadius: "0px",
            padding: "55px 16px",
            width: "16%",
            minWidth: "35px",
            backgroundColor: colorPalette[theme].theme_color_11,
          }}
          variant="contained"
        ></Button>
        <Button
          onClick={() => {
            handleClick("theme_color_12");
          }}
          style={{
            borderRadius: "0px",
            padding: "55px 16px",
            width: "16%",
            minWidth: "35px",
            backgroundColor: colorPalette[theme].theme_color_12,
          }}
          variant="contained"
        ></Button>
        <Button
          onClick={() => {
            handleClick("theme_color_13");
          }}
          style={{
            borderRadius: "0px",
            padding: "52px 16px",
            width: "16%",
            minWidth: "35px",
            backgroundColor: colorPalette[theme].theme_color_13,
            border: "3px solid #008BCD",
            borderRadius: "0px 4px 4px 0px",
          }}
          variant="contained"
        ></Button>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ margin: "0px 30px 19px 40px" }}
      >
        <InputLabel
          style={{
            textAlign: "center",
            color: "#819aa4",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fontWeight: 400,
          }}
        >
          0
        </InputLabel>
        <InputLabel
          style={{
            color: "#819aa4",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fontWeight: 400,
          }}
        >
          1
        </InputLabel>
        <InputLabel
          style={{
            color: "#819aa4",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fontWeight: 400,
          }}
        >
          2
        </InputLabel>
        <InputLabel
          style={{
            color: "#819aa4",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fontWeight: 400,
          }}
        >
          3
        </InputLabel>
        <InputLabel
          style={{
            color: "#819aa4",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fontWeight: 400,
          }}
        >
          4
        </InputLabel>
        <InputLabel
          style={{
            color: "#819aa4",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fontWeight: 400,
          }}
        >
          5
        </InputLabel>
        <InputLabel
          style={{
            color: "#819aa4",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fontWeight: 400,
          }}
        >
          6
        </InputLabel>
        <InputLabel
          style={{
            color: "#819aa4",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fontWeight: 400,
          }}
        >
          7
        </InputLabel>
        <InputLabel
          style={{
            color: "#819aa4",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fontWeight: 400,
          }}
        >
          8
        </InputLabel>
        <InputLabel
          style={{
            color: "#819aa4",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fontWeight: 400,
          }}
        >
          9
        </InputLabel>
        <InputLabel
          style={{
            color: "#819aa4",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fontWeight: 400,
          }}
        >
          10
        </InputLabel>
        <InputLabel
          style={{
            color: "#819aa4",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fontWeight: 400,
          }}
        >
          11
        </InputLabel>
        <InputLabel
          style={{
            color: "#819aa4",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fontWeight: 400,
          }}
        >
          12
        </InputLabel>
        <InputLabel
          style={{
            color: "#819aa4",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            fontWeight: 400,
          }}
        >
          13
        </InputLabel>
      </Stack>
      {displayColorPicker ? (
        <div style={{ position: "absolute", zIndex: "2" }}>
          <div
            style={{
              position: "fixed",
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            }}
            onClick={handleClose}
          />
          <ColourPicker
            color={color}
            onChangeMethod={onChangeMethod}
            handleChangeComplete={handleChangeComplete}
          />
        </div>
      ) : null}
      <Stack
        direction="row"
        justifyContent="center"
        style={{ textAlign: "center", margin: "10px 40px 0px" }}
        alignItems="center"
      >
        <Button
          onClick={() => {
            handleClick("theme_color_14");
          }}
          variant="contained"
          style={{
            borderRadius: "4px 0px 0px 4px",
            padding: "20px 10px",
            width: "50%",
            backgroundColor: colorPalette[theme].theme_color_14,
          }}
          component="span"
        ></Button>
        <Button
          onClick={() => {
            handleClick("theme_color_15");
          }}
          variant="contained"
          style={{
            borderRadius: "0px 4px 4px 0px",
            padding: "20px 10px",
            width: "50%",
            backgroundColor: colorPalette[theme].theme_color_15,
          }}
          component="span"
        ></Button>
      </Stack>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <div
          htmlFor="password"
          style={{
            color: "#88A1AB",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            width: "50%",
            margin: "8px 0px 0px 40px",
            textAlign: "center",
          }}
        >
          Danger
        </div>
        <div
          htmlFor="password"
          style={{
            paddingLeft: "15px",
            color: "#88A1AB",
            fontSize: "14px",
            fontFamily: "URW DIN REGULAR",
            width: "50%",
            margin: "8px 40px 0px 0px",
            textAlign: "center",
          }}
        >
          Important
        </div>
      </Stack>
    </>
  );
};

export default CustomThemeColorSelector;
