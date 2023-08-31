import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea,  } from '@mui/material';

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 250, height: 250 }} style={{backgroundColor: '#012243',transition: 'all 0.1s ease'}} className='filemanager-grid'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="179"
          image="assets/images/filemanger1.svg"
          alt="green iguana"
        />
        <CardContent style={{margin: '0px', padding: '0px', display: 'flex'}}>
            <img src='assets/images/filemanager-icon.svg' style={{backgroundColor: '#012243', padding: '26px 11px'}}/>
            <div style={{padding: '15px 10px', backgroundColor: '#012A50', width: '200px'}}>
          <Typography gutterBottom variant="h5" component="div" style={{color: '#88A1AB', fontSize: '14px'}}>
            The Masked Singer.MP4
          </Typography>
          <Typography variant="body2" color="#375C78">
            Size:534MB | 00:34:55
            {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
          </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions> */}
    </Card>
  );
}
