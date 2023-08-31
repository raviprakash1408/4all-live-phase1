import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from "@material-ui/core/TableCell";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const TableCell = withStyles({
  root: {
    borderBottom: "none"
  }
})(MuiTableCell);

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
});

function createData(configroup, name, email, role, config, position, volume, subroom, systemcheck) {
  return {
    configroup, 
    name, 
    email, 
    role, 
    config, 
    position, 
    volume, 
    subroom, 
    systemcheck
    
  };
}

const rows = [
  {
    configroup: 'Admin',
    items: [
      {
        name:'Person',
        email:'person4@gmail.com',
        role:'Tier 1',
        config:'T2',
        position:'1',
        volume:'100%',
        subroom:'--',
        systemcheck:'View'
        
      },
      {
        name:'Person',
        email:'person4@gmail.com',
        role:'Tier 1',
        config:'T2',
        position:'1',
        volume:'100%',
        subroom:'--',
        systemcheck:'View'
        
      },
      {
        name:'Person',
        email:'person4@gmail.com',
        role:'Tier 1',
        config:'T2',
        position:'1',
        volume:'100%',
        subroom:'--',
        systemcheck:'View'
        
      }
    ]
  },
  {
    configroup: 'Tier 1',
    items: [
  
      {
        name:'Person',
        email:'person4@gmail.com',
        role:'Tier 1',
        config:'T2',
        position:'1',
        volume:'100%',
        subroom:'--',
        systemcheck:'View'
        
      }
    ]
  },
  {
    configroup: 'Tier 2',
    items: [
      {
        name:'Person',
        email:'person4@gmail.com',
        role:'Tier 1',
        config:'T2',
        position:'1',
        volume:'100%',
        subroom:'--',
        systemcheck:'View'
        
      },
      {
        name:'Person',
        email:'person4@gmail.com',
        role:'Tier 1',
        config:'T2',
        position:'1',
        volume:'100%',
        subroom:'--',
        systemcheck:'View'
        
      },
      {
        name:'Person',
        email:'person4@gmail.com',
        role:'Tier 1',
        config:'T2',
        position:'1',
        volume:'100%',
        subroom:'--',
        systemcheck:'View'
        
      }
    ]
  },
  {
    configroup: 'Tier 3',
    items: [
      {
        name:'Person',
        email:'person4@gmail.com',
        role:'Tier 1',
        config:'T2',
        position:'1',
        volume:'100%',
        subroom:'--',
        systemcheck:'View'
        
      },
     
      {
        name:'Person',
        email:'person4@gmail.com',
        role:'Tier 1',
        config:'T2',
        position:'1',
        volume:'100%',
        subroom:'--',
        systemcheck:'View'
        
      }
    ]
  },
  {
    configroup: 'Tier 4',
    items: [
      {
        name:'Person',
        email:'person4@gmail.com',
        role:'Tier 1',
        config:'T2',
        position:'1',
        volume:'100%',
        subroom:'--',
        systemcheck:'View'
        
      },
     
      {
        name:'Person',
        email:'person4@gmail.com',
        role:'Tier 1',
        config:'T2',
        position:'1',
        volume:'100%',
        subroom:'--',
        systemcheck:'View'
        
      }
    ]
  },
  
  ];

  // createData(
  //   'Admin',
  //   'Person',
  //   'person4@gmail.com',
  //   'Tier 1',
  //   'T2',
  //   '1',
  //   '100%',
  //   '--',
  //   'View'

  // ),
  // createData(
  //   'Tier 1',
  //   'Person',
  //   'person4@gmail.com',
  //   'Tier 1',
  //   'T2',
  //   '1',
  //   '100%',
  //   '--',
  //   'View'
  //  ),
  // createData(
  //   'Tier 2',
  //   'Person',
  //   'person4@gmail.com',
  //   'Tier 1',
  //   'T2',
  //   '1',
  //   '100%',
  //   '--',
  //   'View'
  // ),
  // createData(
  //   'Tier 3',
  //   'Person',
  //   'person4@gmail.com',
  //   'Tier 1',
  //   'T2',
  //   '1',
  //   '100%',
  //   '--',
  //   'View'
  // ),
  // createData(
  //   'Tier 4',
  //   'Person',
  //   'person4@gmail.com',
  //   'Tier 1',
  //   'T2',
  //   '1',
  //   '100%',
  //   '--',
  //   'View'
  // )


const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <TableRow {...otherProps}>
        
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow style={{backgroundColor:'#002E56'}}>
          <TableCell padding="checkbox" />
          {expandComponent}
        </TableRow>
      )}
    </>
  );
};

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.root} style={{marginTop:'16px'}}>
      <Table className={classes.table} aria-label="simple table" style={{backgroundColor:'#012A50'}}>
        <TableHead style={{backgroundColor:'#012243'}}>
          <TableRow style={{backgroundColor:'#012243'}}>
            <TableCell padding="checkbox" />
            <TableCell style={{color:'white', fontFamily:'URW DIN REGULAR'}} >Name</TableCell>
            <TableCell align="right" style={{color:'white', fontFamily:'URW DIN REGULAR'}} >Email</TableCell>
            <TableCell align="right" style={{color:'white', fontFamily:'URW DIN REGULAR'}} >Role</TableCell>
            <TableCell align="right" style={{color:'white', fontFamily:'URW DIN REGULAR'}} >Config</TableCell>
            <TableCell align="right" style={{color:'white', fontFamily:'URW DIN REGULAR'}} >Position</TableCell>
            <TableCell align="right" style={{color:'white', fontFamily:'URW DIN REGULAR'}} >Volume</TableCell>
            <TableCell align="right" style={{color:'white', fontFamily:'URW DIN REGULAR'}} >Subroom</TableCell>
            <TableCell align="center" style={{color:'white', fontFamily:'URW DIN REGULAR'}} >System Check</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <ExpandableTableRow
              key={row.configroup}
              expandComponent={
                row.items.map((data)=>
                <TableRow key={data.name}>

              <TableCell colSpan="0">
              {data.name}
              </TableCell>
            <TableCell align="right">{data.email}</TableCell>
            <TableCell align="right">{data.role}</TableCell>
            <TableCell align="right">{data.config}</TableCell>
            <TableCell align="right">{data.position}</TableCell>
            <TableCell align="right">{data.volume}</TableCell>
            <TableCell align="right">{data.subroom}</TableCell>
            <TableCell align="right">{data.systemcheck}</TableCell>
            </TableRow>)}
              style={{backgroundColor:'#002E56',borderTop:'10px solid #012A50'}}
            >
              <TableCell component="th" scope="row" style={{fontSize:'14px',color:'#E1E7EA'}}>
                {row.configroup}
                <span style={{padding:'8px 10px',backgroundColor:"#012243",marginLeft:'13px', borderRadius:'4px',color:'#88A1AB'}}>7</span>
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </ExpandableTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
