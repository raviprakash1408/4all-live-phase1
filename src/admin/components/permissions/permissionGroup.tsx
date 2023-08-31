import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import IOSSwitch from "../CustomSwitch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Divider, Grid } from "@mui/material";
//@ts-ignore
import GeneralPermissions from "./generalPermissions.tsx";
//@ts-ignore
import SpacePermission from "./spacePermission.tsx";
//@ts-ignore
import LobbyPermissions from "./lobbyPermissions.tsx";
//@ts-ignore
import StreamingPermissios from "./streamingPermissios.tsx";
import { AxiosLocal } from "../../../utilities/axiosUtils.ts";
import { useSelector } from "react-redux";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  borderRadius: "4px",
  backgroundColor: "#002E56",
  marginTop:'10px'
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{ fontSize: "0.9rem", transform: "rotate(90deg)", filter: 'brightness(0) saturate(100%) invert(70%) sepia(10%) saturate(582%) hue-rotate(151deg) brightness(88%) contrast(90%)' }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  // borderTop: "2px solid #143F63",
  // backgroundColor: "#002E56",
  overflowX: "hidden",
  maxHeight: "40vh",
}));

export default function PermissionGroup({selectedPermission}) {
  const theme = useSelector((state) => state.theme.themeData);

  const [expanded, setExpanded] = React.useState<string | false>();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      {selectedPermission.title != 'Guest' &&
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        style={{backgroundColor:theme?.permissions?.bgColor,color:theme?.permissions?.color,}}

      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div style={{ width: "40%" }}>
            <Typography
              style={{
                color: theme?.permissions?.color,

                fontFamily: "URW DIN",
                fontSize: "16px",
                marginLeft: "8px",
              }}
            >
              General
            </Typography>
          </div>

          <div
            style={{
              width: "20%",
              display: expanded === "panel1" ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="/assets/admin/eye.svg" alt="" />
            <Typography
              style={{
                color: theme?.permissions?.textcolor,

                fontFamily: "URW DIN REGULAR",
                fontSize: "16px",
                marginLeft: "8px",
              }}
            >
              View
            </Typography>
          </div>
          <div
            style={{
              width: "20%",
              display: expanded === "panel1" ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="/assets/admin/videoplus.svg" alt="" />

            <Typography
              style={{
                color: theme?.permissions?.textcolor,

                fontFamily: "URW DIN REGULAR",
                fontSize: "16px",
                marginLeft: "8px",
              }}
            >
              Add
            </Typography>
          </div>
          <div
            style={{
              width: "20%",
              display: expanded === "panel1" ? "flex" : "none",

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="/assets/admin/edit-grid.svg" alt="" />

            <Typography
              style={{
                color: theme?.permissions?.textcolor,

                fontFamily: "URW DIN REGULAR",
                fontSize: "16px",
                marginLeft: "8px",
              }}
            >
              Edit
            </Typography>
          </div>

          <div
            style={{
              width: "20%",
              display: expanded === "panel1" ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="/assets/admin/close.svg" alt="" />

            <Typography
              style={{
                color: theme?.permissions?.textcolor,

                fontFamily: "URW DIN REGULAR",
                fontSize: "16px",
                marginLeft: "8px",
              }}
            >
              Delete
            </Typography>
          </div>
        </AccordionSummary >
        <AccordionDetails sx={{backgroundColor:theme?.permissions?.bgColor,}}>
          <GeneralPermissions selectedPermission={selectedPermission} />
        </AccordionDetails>
      </Accordion>
}
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        style={{backgroundColor:theme?.permissions?.bgColor,color:theme?.permissions?.color,}}

      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography
            style={{
              color: theme?.permissions?.color,

              
              fontFamily: "URW DIN",
              fontSize: "16px",
              marginLeft: "8px",
            }}
          >
            Space
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SpacePermission selectedPermission={selectedPermission} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        style={{backgroundColor:theme?.permissions?.bgColor}}

      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography
            style={{
              color: theme?.permissions?.color,

              fontFamily: "URW DIN",
              fontSize: "16px",
              marginLeft: "8px",
            }}
          >
            Lobby
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <LobbyPermissions selectedPermission={selectedPermission} />
        </AccordionDetails>
      </Accordion>
      {/* <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography
            style={{
              color: "white",
              fontFamily: "URW DIN",
              fontSize: "16px",
              marginLeft: "8px",
            }}
          >
            Streaming
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <StreamingPermissios selectedPermission={selectedPermission} />
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
