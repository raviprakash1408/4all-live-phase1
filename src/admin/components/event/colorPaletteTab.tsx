import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomThemeColorSelector from "../CustomTheme";
import { AxiosLocal } from "../../../utilities/axiosUtils.ts";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, color: "rgb(136, 161, 171)" }}>
          <Typography style={{ color: "rgb(136, 161, 171)" }}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {

  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ColorPaletteTab({
  spaceSlug,
  component,
  changeColorPalette,
  lightTheme,
  darkTheme,
}) {
  const [value, setValue] = React.useState(0);
  const theme = useSelector((state) => state.theme.themeData);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log(lightTheme, darkTheme, "lightTheme, darkTheme");

  const dispatch = useDispatch();

  return (
    <Box sx={{ bgcolor: theme.addmember.color2, width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          style={{
            color: "rgb(136, 161, 171)",
          }}
        >
          <Tab
            style={{
              color: "rgb(136, 161, 171)",
            }}
            label="Dark Theme"
            {...a11yProps(0)}
          />
          <Tab
            style={{
              color: "rgb(136, 161, 171)",
            }}
            label="Light Theme"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CustomThemeColorSelector
          spaceSlug={spaceSlug}
          component={component}
          changeColorPalette={changeColorPalette}
          themeType="dark"
          lightTheme={lightTheme}
          darkTheme={darkTheme}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustomThemeColorSelector
          spaceSlug={spaceSlug}
          component={component}
          changeColorPalette={changeColorPalette}
          themeType="light"
          lightTheme={lightTheme}
          darkTheme={darkTheme}
        />
      </TabPanel>
    </Box>
  );
}
