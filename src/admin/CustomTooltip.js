import React from 'react'
import { Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';

const CustomTooltip = (props) => {
  const theme = useSelector(state => state.theme.themeData)

  return (
    <Tooltip
      title={
        <div style={{ display: "flex" }}>
          {props.type == "copy" && (
            <div
              style={{
                // padding: "6px 6px 0px 7px",
                marginBottom: "5px",
                borderRadius: "4px",
                backgroundColor: theme?.bg_color_0,
                cursor: "pointer",
              }}
            >
              <img alt="" src="/assets/admin/copy.svg" />
            </div>
          )}
          <span
            style={{
              margin: "3px 8px",
              fontFamily: "URW DIN REGULAR",
              color: props.textColor ? props.textColor : "#88A1AB",
              fontSize: "14px",
            }}
          >
            {props.text}
          </span>
        </div>
      }
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: props.bgColor ? props.bgColor : theme?.bg_color_2,
          },
        },
      }}
      placement={props.placement}
    >
      {props.children}
    </Tooltip>
  );
}

export default CustomTooltip