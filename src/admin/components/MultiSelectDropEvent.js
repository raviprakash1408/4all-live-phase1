import React, { useState } from "react";
import { useSelector } from 'react-redux';

import {
  Chip,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  Grow
} from "@material-ui/core";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const names = [
  { name: "Oliver Hansen" },
  { name: "Van Henry" },
  { name: "April Tucker" },
  { name: "Ralph Hubbard" },
  { name: "Omar Alexander" },
  { name: "Carlos Abbott" },
  { name: "Miriam Wagner" },
  { name: "Bradley Wilkerson" },
  { name: "Virginia Andrews" },
  { name: "Kelly Snyder" }
];

export default function MultiSelectDropEvent() {
  const [personName, setPersonName] = useState([]);

  return (
    <ChipSelect
      label=""
      value={personName}
      onChange={setPersonName}
      options={names}
      renderLabel={option => option.name}
    />
  );
}

const ChipSelect = ({ label, value, onChange, options, renderLabel }) => {
  const theme = useSelector(state => state.theme.themeData)

  return (
    <TextField id="outlined-basic" label="" 
 
InputLabelProps={{
style: { color: '#5D7C90' ,padding:'0px',margin:'0px'},

}}
type="text"
name="text"
placeholder="City"

      select
      value={value}
      fullWidth
      variant="outlined"
      onChange={e => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
           <PersonOutlineOutlinedIcon style={{color: '#5D7C90'}} />
          </InputAdornment>
        )

       
      }}
      SelectProps={{
        multiple: true,
        renderValue: selected =>
          selected.map(value => (
            <Chip
              key={`${renderLabel ? renderLabel(value) : value}-chip`}
              label={renderLabel ? renderLabel(value) : value}
              style={{ margin: "0px 4px 0px 0px",padding:'0px !important' }}
              onDelete={() => {
                const newValue = [...selected];
                const index = selected.findIndex(v => v === value);
                newValue.splice(index, 1);
                console.log({ newValue });
                onChange(newValue);
              }}
            />
          ))
      }}
    >
      {options.map(option => (
        <MenuItem
          key={`${renderLabel ? renderLabel(option) : option}-option`}
          value={option}
          disabled={Boolean(
            value.find(o =>
              renderLabel
                ? renderLabel(o) === renderLabel(option)
                : o === option
            )
          )}
        >
          {renderLabel ? renderLabel(option) : option}
        </MenuItem>
      ))}
    </TextField>
  );
};


