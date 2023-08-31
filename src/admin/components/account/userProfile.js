import React,{useState} from 'react'
import { useSelector } from "react-redux";
import {
  Stack,
  InputLabel,
  TextField,
} from "@mui/material";


const UserProfile = (props) => {
  const theme = useSelector((state) => state.theme.themeData);

    const userArr = props.user;
    console.log(props, "props");
    const [firstName, setFirstName] = useState(userArr.first_name);
    const [lastName, setLastName] = useState(userArr.last_name);
    const [email, setEmail] = useState(userArr.email);




  return (
    <div>
      <Stack
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "55px 0px 10px",
        }}
      >
        <span style={{ position: "relative" }}>
          <img
            alt=""
            src="/assets/images/blank_profile.jpeg"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              backgroundColor: "#264E6E",
              borderRadius: "50%",
              padding: "5px",
              position: "absolute",
              right: "0px",
              bottom: "0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              alt=""
              src="/assets/icons/upload.svg"
              style={{ cursor: "pointer" }}
            />
          </div>
        </span>
      </Stack>
      <div style={{ maxWidth: "400px", margin: "0px auto" }}>
        <Stack>
          <InputLabel
            htmlFor="full-name"
            style={{
              color: theme?.spaces?.mainColor,
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            Full name
          </InputLabel>

          <TextField
            id="full-name"
            label=""
            variant="outlined"
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "14px",
                height: "40px",
                marginTop: "-5px",
              },
              "& .MuiOutlinedInput-root": {
                fontSize: "14px",
                height: "40px",
                marginTop: "1px",
              },

              "& .MuiOutlinedInput-input": {
                fontFamily: "URW DIN REGULAR",
                fontSize: "14px",

                color: theme?.profile?.primaryColor,
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",

                borderColor: "#143F63",

                borderRadius: "4px",
                color: theme?.profile?.primaryColor,
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  border: "2px solid",

                  borderColor: "#143F63",

                  borderRadius: "4px",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: "2px solid",

                  borderColor: "#143F63",

                  borderRadius: "4px",
                },
            }}
            InputLabelProps={{
              style: { color: "#5D7C90" },
            }}
            type="text"
            // classes={outlinedInputClasses}
            // placeholder="Enter your email"

            fullWidth
            name="text"
            placeholder="Enter Your Name"
            value={firstName}
            onChange={(event) => {
              // setChangedval({ ...changedval, first_name: event.target.value });
              setFirstName(event.target.value);
            }}
          />
        </Stack>

        <Stack sx={{ marginTop: "20px" }}>
          <InputLabel
            htmlFor="email"
            style={{
              color: theme?.spaces?.mainColor,
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            Email
          </InputLabel>
          <TextField
            id="email"
            label=""
            variant="outlined"
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "14px",
                height: "40px",
                marginTop: "-5px",
              },
              "& .MuiOutlinedInput-root": {
                fontSize: "14px",
                height: "40px",
                marginTop: "1px",
              },

              "& .MuiOutlinedInput-input": {
                fontFamily: "URW DIN REGULAR",
                fontSize: "14px",

                color: theme?.profile?.primaryColor,
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",

                borderColor: "#143F63",

                borderRadius: "4px",
                color: theme?.profile?.primaryColor,
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  border: "2px solid",

                  borderColor: "#143F63",

                  borderRadius: "4px",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: "2px solid",

                  borderColor: "#143F63",

                  borderRadius: "4px",
                },
            }}
            InputLabelProps={{
              style: { color: "#5D7C90" },
            }}
            type="text"
            name="text"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              // setChangedval({ ...changedval, last_name: event.target.value });

              setEmail(event.target.value);
            }}
            fullWidth
          />
        </Stack>

        <Stack sx={{ marginTop: "20px" }}>
          <InputLabel
            htmlFor="timezone"
            style={{
              color: theme?.spaces?.mainColor,
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            Timezone
          </InputLabel>

          <TextField
            id="timezone"
            label=""
            variant="outlined"
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: "14px",
                height: "40px",
                marginTop: "-5px",
              },
              "& .MuiOutlinedInput-root": {
                fontSize: "14px",
                height: "40px",
                marginTop: "1px",
              },

              "& .MuiOutlinedInput-input": {
                fontFamily: "URW DIN REGULAR",
                fontSize: "14px",

                color: theme?.profile?.primaryColor,
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",

                borderColor: "#143F63",

                borderRadius: "4px",
                color: theme?.profile?.primaryColor,
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  border: "2px solid",

                  borderColor: "#143F63",

                  borderRadius: "4px",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: "2px solid",

                  borderColor: "#143F63",

                  borderRadius: "4px",
                },
            }}
            InputLabelProps={{
              style: { color: "#5D7C90" },
            }}
            type="text"
            name="text"
            placeholder="Last Name"
            value={"America/Bogota"}
            onChange={(event) => {
              // setChangedval({ ...changedval, last_name: event.target.value });

              setLastName(event.target.value);
            }}
            fullWidth
          />
        </Stack>
      </div>
    </div>
  );
}

export default UserProfile