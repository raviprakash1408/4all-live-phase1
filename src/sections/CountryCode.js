

// import * as React from "react";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { makeStyles } from '@material-ui/core/styles';
// import { useSelector } from 'react-redux';
// import { Scrollbars } from 'react-custom-scrollbars';

// const countryinfo = [
//   {
//   name: "Andorra",
//   code:"ad"},
//   {
//   name: "United Arab Emirates",
//   code:"ae"},
//   {
//       name: "Afghanistan",
//       code:"af"},
//   {
//       name: "Antigua and Barbuda",
//       code:"ag"},
//   {
//       name: "Anguilla",
//       code:"ai"},
//   {
//       name: "Albania",
//       code:"al"},
//   {
//       name: "Armenia",
//       code:"am"},
//   {
//       name: "Angola",
//       code:"ao"},
//   {
//       name: "Andorra",
//       code:"ad"}
 
//   ]
 

// const useStyles = makeStyles((theme) => ({
  
//   select: {
//     '&:before': {
//       borderColor: 'white !important',
//   },
//   '&:after': {
//       borderColor: 'white !important',
//   },
//   '&:not(.Mui-disabled):hover::before': {
//       borderColor: 'white !important',
//   },
//   '&:hover:not(.Mui-disabled):before': { borderColor: 'white !important', },
  
   
//     color: "#88A1AB",
//   },
  
//   icon: { color: "#88A1AB",fill: '#88A1AB !important'

//  },
// }));




// export default function CountryCode(props) {
//   const theme = useSelector(state => state.theme.themeData)
//   const ITEM_HEIGHT = 48;
//   const ITEM_PADDING_TOP = 8;
//   const MenuProps = {
//     PaperProps: {
//       style: {
//         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//         width: 95,
//         background: theme?.spaces?.tertiaryColor,
//         color: theme?.spaces?.mainColor,
//         fontSize: '14px',
//         fontFamily:'URW DIN REGULAR'
//       },
//     },
//   };

 
//   const classes = useStyles()

//   return (
//     <div
//       style={{
//         position: "relative"
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           width: "94px",
//           height: "46px",
//           top: "-1px",
//           left: "0px",
//           borderRadius: '4px',
//           boxShadow: "inset 0px 0px 0px 1px #032E57",
//           zIndex: "2",
//           userSelect: "none",
//           pointerEvents: "none"
//         }}
//       />

//       <div
//         style={{
//           position: "absolute",
//           width: "94px",
//           height: "46px",
//           top: "-1px",
//           left: "0px",
//           borderRadius: '4px',
//           boxShadow: "inset 0px 0px 0px 1px #012a50",
//           zIndex: "1",
//           userSelect: "none",
//           pointerEvents: "none"
//         }}
//       />

//       <FormControl sx={{  width: 94,  }}>
//         <Select
//           className={classes.select}
//           value={props.countryflag}
//           onChange={(event) => props.handleChange(event.target.value)}
//           displayEmpty
//           inputProps={{ "aria-label": "Without label" }}
//           MenuProps={MenuProps}
//           classes={{
//             select: classes.select,
//             icon: classes.icon,
//           }}
//           style={{height: 42,  borderRadius: '4px', color: theme?.spaces?.mainColor, fontSize: '14px',fontFamily:'URW DIN REGULAR',fill: 'white'}}
//         >
        
// <MenuItem value="" >
//             <img style={{paddingTop:'5px'}} src={`https://flagcdn.com/in.svg`}
//         width="30"
//         />
//           </MenuItem>

// {
//   countryinfo.map((country, index) => {
//     return(
//       <MenuItem value={`${country.name}`} style={{fontSize: '14px',
//       fontFamily:'URW DIN REGULAR'}}>
//         <img style={{paddingTop:'5px'}} src={`https://flagcdn.com/${country.code}.svg`}
//         width="30"
//         />
//       </MenuItem>
//     )
//   })

// }
//           {/* <MenuItem value="" >
//             <img style={{paddingTop:'5px'}} src={`https://flagcdn.com/in.svg`}
//         width="30"
//         />
//           </MenuItem>
//           <MenuItem value={10}>
//           <img  style={{paddingTop:'5px'}} src={`https://flagcdn.com/as.svg`}
//         width="30"
//         />
//         </MenuItem>
//           <MenuItem value={20} >
//            <img  style={{paddingTop:'5px'}} src={`https://flagcdn.com/af.svg`}
//         width="30"
//         />
//         </MenuItem>
//           <MenuItem value={30} >
//           <img  style={{paddingTop:'5px'}} src={`https://flagcdn.com/af.svg`}
//         width="30"
//         />
//         </MenuItem> */}
//         </Select>
//       </FormControl>
//     </div>
//   );
// }



import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from '@mui/material/InputLabel';

import Select from "@mui/material/Select";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';



const useStyles = makeStyles((theme) => ({
  
  select: {
    '&:before': {
      borderColor: 'white !important',
  },
  '&:after': {
      borderColor: 'white !important',
  },
  '&:not(.Mui-disabled):hover::before': {
      borderColor: 'white !important',
  },
  '&:hover:not(.Mui-disabled):before': { borderColor: 'white !important', },
  
   
    color: "#88A1AB",
  },
  
  icon: { color: "#88A1AB",fill: '#88A1AB !important'

 },
}));




export default function CountryCode() {
  const theme = useSelector(state => state.theme.themeData)
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 94,
        background: theme?.spaces?.tertiaryColor,
        color: theme?.spaces?.mainColor,
        fontSize: '14px',
        fontFamily:'URW DIN REGULAR',
        border:'1px solid',
        borderColor:theme?.spaces?.quaternaryColor
      },
    },
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const classes = useStyles()

  return (
    <div
      style={{
        position: "relative",
        cursor:'pointer'
      }}
      className='sortby_space'
    >
      <div
        style={{
          position: "absolute",
          width: "94px",
          height: "42px",
          top: "-1px",
          left: "0px",
          borderRadius: '4px',
          boxShadow: `inset 0px 0px 0px 1px ${theme?.spaces?.quaternaryColor}`,
          zIndex: "2",
          userSelect: "none",
          pointerEvents: "none"
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "94px",
          height: "42px",
          top: "-1px",
          left: "0px",
          borderRadius: '4px',
          boxShadow: `inset 0px 0px 0px 10px ${theme.login.primaryColor}`,
          zIndex: "1",
          userSelect: "none",
          pointerEvents: "none"
        }}
      />

      <FormControl sx={{  width: 94, }} >
     
        <Select
          className={classes.select}
          value={age}
          
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          MenuProps={MenuProps}
          classes={{
            select: classes.select,
            icon: classes.icon,
          }}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <p>Select</p>;
            }

            return selected;
          }}
          

InputLabelProps={{
style: { color: '#5D7C90' },
}}

          style={{height: 42, background: theme?.login?.primaryColor, borderRadius: '4px', color: theme?.spaces?.mainColor, fontSize: '14px',fontFamily:'URW DIN REGULAR',fill: 'white',}}
        >
         
          <MenuItem value={+91} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}}>
          +91</MenuItem>
          <MenuItem value={+1} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}}>

          +1</MenuItem>
          <MenuItem value={+54} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}} >

          +54</MenuItem>
          <MenuItem value={+61} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}} >

          +61</MenuItem>
          <MenuItem value={+55} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}} >

          +55</MenuItem>
          <MenuItem value={+86} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}} >

          +86</MenuItem>
          <MenuItem value={+977} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}} >

          +977</MenuItem>
          <MenuItem value={+47} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}} >

          +47</MenuItem>
          <MenuItem value={+92} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}} >

          +92</MenuItem>
          <MenuItem value={+263} style={{fontSize: '14px',
        fontFamily:'URW DIN REGULAR'}} >

          +263</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

