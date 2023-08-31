import * as React from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { SxProps } from "@mui/system";

function HomeIcon(props) {
  return (
    <img
      src="https://fox16-MeetMo.io.io/assets/admin/calender.svg"
      {...props}
    />
  );
}
export default function MaterialUIPickers() {
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const popperSx = {
    "& .MuiPaper-root": {
      backgroundColor: "#88A1AB",
    },
   
    "& .MuiCalendarPicker-root": {
      backgroundColor: "#88A1AB"
    },
   
    "& .MuiPickersDay-dayWithMargin": {
      color: "rgb(229,228,226)",
      backgroundColor: "#012A50"
    },
    "& .MuiTabs-root": { backgroundColor: "#012A50" }
  };
  return (
   
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DateTimePicker
            label=""
            value={value}
            onChange={handleChange}
            components={{
              OpenPickerIcon: HomeIcon
            }}
            InputProps={{ sx: { "& .MuiSvgIcon-root": { color: "yellow" } } }}
            PopperProps={{
              sx: popperSx
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  backgroundColor: "#011934",
                  "& .MuiInputLabel-root": { fontSize: "14px", height: "41px" },
                  "& .MuiOutlinedInput-root": {
                    fontSize: "14px",
                    height: "40px"
                  },

                  "& .MuiOutlinedInput-input": {
                    fontFamily: "URW DIN REGULAR",
                    fontSize: "14px",

                    color: "#88A1AB"
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid",

                    borderColor: "#012A50",

                    borderRadius: "4px",
                    color: "#88A1AB"
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid",

                    borderColor: "#012A50",

                    borderRadius: "4px"
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid",

                    borderColor: "#012A50",

                    borderRadius: "4px"
                  }
                }}
              />
            )}
          />
        </Stack>
      </LocalizationProvider>
  );
}
