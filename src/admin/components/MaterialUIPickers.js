import * as React from "react";
// import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { SxProps } from "@mui/system";
import { useSelector } from 'react-redux';


function HomeIcon(props) {
  return (
    <img
    alt=""
      src="https://fox16-MeetMo.io.io/assets/admin/calender.svg"
      {...props}
    />
  );
}
function MonthIcon(props) {
  return <img alt="" src="/assets/admin/calenderdown.svg" {...props} />;
}
export default function MaterialUIPickers({
  value,
  setValue,
 
}) {
  const theme = useSelector((state) => state.theme.themeData);

  // const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));
  const handleChange = (newValue) => {
    setValue(newValue);
    
  };
  const popperSx = {
    "& .MuiPaper-root": {
      backgroundColor: theme.addmember.clockbg,
      color: "#88A1AB",
      fontFamily: "URW DIN REGULAR",
    },
    "& .css-dplwbx-MuiPickersCalendarHeader-label":{
      fontFamily: "URW DIN REGULAR",

    },
    "& .PrivatePickersYear-yearButton":{
      fontFamily: "URW DIN REGULAR",
      fontSize:'14px'
    },
    "& .css-rjqbug-MuiButtonBase-root-MuiIconButton-root-MuiClock-pmButton:hover":{
      backgroundColor:theme.login.mainColor,
      color:'white'

    },
    "& .css-h2z9v1-MuiButtonBase-root-MuiIconButton-root-MuiClock-amButton":{
      backgroundColor:theme.login.mainColor,
      color:'white !important'
     },
     "& .css-1481ayq-MuiPopper-root-MuiPickersPopper-root .MuiButtonBase-root":{
      backgroundColor:theme.login.mainColor,
      color:'white !important'
     },
    "& .css-h2z9v1-MuiButtonBase-root-MuiIconButton-root-MuiClock-amButton:hover":{
      backgroundColor:theme.login.mainColor,
    },
    "& .css-bkrceb-MuiButtonBase-root-MuiPickersDay-root.Mui-selected:hover":{
      backgroundColor:theme.login.mainColor,

    },
    "& .css-rjqbug-MuiButtonBase-root-MuiIconButton-root-MuiClock-pmButton":{
      backgroundColor:theme.login.mainColor,
      color:'white !important'
    },

    "& .css-3eghsz-PrivatePickersYear-button.Mui-selected":{
      backgroundColor:theme.login.mainColor

    },
    "& .MuiCalendarPicker-root": {
      backgroundColor: theme?.calender?.bgcolor3,
      color: "#88A1AB",
      fontFamily: "URW DIN REGULAR",
    },

    "& .MuiPickersDay-dayWithMargin": {
      backgroundColor: theme?.calender?.bgcolor2,
      fontFamily: "URW DIN",
    },
    "& .MuiTabs-root": {
      backgroundColor: theme.login.mainColor,
      fontFamily: "URW DIN REGULAR",
    },
    "& .MuiDayPicker-weekDayLabel": {
      color: "#88A1AB",
      fontFamily: "URW DIN REGULAR",
    },
    "& .MuiClockNumber-root": {
      color: "#88A1AB",
      fontFamily: "URW DIN REGULAR",
    },
    "& .MuiButtonBase-root": {
      color: "#88A1AB",//white
      fontFamily: "URW DIN REGULAR",
    },
    "& .MuiSvgIcon-root": { color: "#143F63" },
    "& .MuiButtonBase-root.Mui-selected": {
      backgroundColor: theme.login.mainColor,
      color: "white",
    },
    "& .MuiClockPointer-root": {
      backgroundColor: theme.login.mainColor,
    },
    "& .MuiClock-pin": {
      backgroundColor:theme.login.mainColor,
    },
    "& .MuiClockPointer-thumb": {
      backgroundColor: theme.login.mainColor,
      border: `16px solid ${theme.login.mainColor}`

    },
    // "& .MuiPickersDay-dayWithMargin": {
    //   backgroundColor: "#008BCD",

    // }

  };

   const onKeyDown = (e) => {
     e.preventDefault();
   };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DateTimePicker
          label=""
          value={value}
          onChange={handleChange}
          //   onSelect={()=>{setFormValues({
          //     ...formValues,
          //     event_start: startDate,
          //     event_end: eventendDate,
          //   });
          //   console.log("ffffffff");
          // }}
          components={{
            OpenPickerIcon: HomeIcon,
            SwitchViewIcon: MonthIcon,
          }}
          InputProps={{ sx: { "& .MuiSvgIcon-root": { color: "yellow" } } }}
          PopperProps={{
            sx: popperSx,
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              onKeyDown={onKeyDown}
              
              // inputProps={{style: { textAlign: 'center', cursor: 'none' }}}
              sx={{
                // cursor:'none',
                backgroundColor: theme?.calender?.bgcolor1,
                "& .MuiInputLabel-root": { fontSize: "14px", height: "41px" },
                "& .MuiOutlinedInput-root": {
                  fontSize: "14px",
                  height: "40px",
                },

                "& .MuiOutlinedInput-input": {
                  fontFamily: "URW DIN REGULAR",
                  fontSize: "14px",

                  color: "#88A1AB",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid",

                  borderColor: theme?.calender?.bgcolor2,

                  borderRadius: "4px",
                  color: "#88A1AB",
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    border: "2px solid",

                    borderColor:theme?.calender?.bgcolor2,

                    borderRadius: "4px",
                  },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: "2px solid",

                    borderColor: theme?.calender?.bgcolor2,

                    borderRadius: "4px",
                  },
              }}
            />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
