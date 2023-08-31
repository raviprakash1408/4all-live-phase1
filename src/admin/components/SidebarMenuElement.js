import React, {useEffect} from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import Image, { Shimmer } from 'react-image-shimmer'
import SyncIcon from '@mui/icons-material/Sync';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';


const SidebarMenuElement = ({ title, icon, open, to, selectedIndex, index, popup }) => {
  const theme = useSelector((state) => state.theme.themeData);

  const [hover, setHover] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);
  let location = useLocation();


  useEffect(() => {
    setHover(false)
  }, [selectedIndex]);

  useEffect(() => {
setHovering(location.pathname === to);
  }, [location, to])
  

  return (
    <ListItem key={title} disablePadding sx={{ display: "block" }}>
      <Link to={to} style={{ textDecoration: "none" }}>
        <ListItemButton
          sx={{
            justifyContent: open ? "initial" : "center",
            padding: "0px 14px",
            transition: "all 0s ease",
            margin: "10px",
            borderRadius: "4px",
            backgroundColor:
              hover || hovering ? `${theme?.common?.color1} !important` :theme.sidebar.sidebarColor,
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="active"
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? "12px" : "auto",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: hover || hovering ? "" :theme?.spaces?.sidebaricon,
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: open ? "-7px" : "0px",
              }}
            >
              <img
              alt=''
                src={"/assets/admin/" + icon + ".svg"}
                style={{
                  filter: hover || hovering ? "brightness(0) invert(1)" : "",
                  width: icon == "user" ? "24px" : "auto",
                }}
                onLoad={() => {
                  console.log("img loaded");
                }}
              />
            </div>
          </ListItemIcon>
          <ListItemText
            primary={title}
            sx={{
              opacity: open ? 1 : 0,
              color: hover || hovering ? "white" :theme.sidebar.sidebarText,
            }}
            primaryTypographyProps={{
              fontSize: "16px",
              fontFamily: hover || hovering ? "URW DIN" : "URW DIN REGULAR",
            }}
          />
        </ListItemButton>
      </Link>
    </ListItem>
  );
}

export default SidebarMenuElement