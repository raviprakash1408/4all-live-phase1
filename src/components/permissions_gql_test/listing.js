import * as React from 'react';

import { gql, useQuery } from "@apollo/client";


import Button from '@mui/material/Button';


import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import CreateIcon from '@mui/icons-material/Create';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#1A2027',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: "#fff",
  fontSize:"2vh",
}));


const GET_PERMS = gql`

query QueryPermissionGroup {
    allPermissions{
        id
        title
    }
}
`;

function ListPerm() {
  const { loading, error, data } = useQuery(GET_PERMS);

  if (loading) return null;
  if (error) return `Error! ${error}`;



return (

    
<Box sx={{ width: '70%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {
       data.allPermissions.map(({ id, title }) => (
        <Grid item xs={6}>
          <Item>Role Name - {title} -  {id}
          <Grid item>
          <Button variant="outlined" onClick={() => window.location.href="/permission/edit/"+id } startIcon={<CreateIcon />}>Edit</Button>
            </Grid>
          </Item>
        </Grid>)
       )
      }
      </Grid>
    </Box>  
    );
}



export default ListPerm
