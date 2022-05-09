import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./Card.css"


/**
 * 包含标题和一行介绍的Card
 * @param props.title
 * @param props.des
 */
export default function BasicCard(props) {
    const title=props.title||""
    const des=props.des||""
    return (
    <Card  variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography className='oneline' variant="h5" component="div">
          {title}
        </Typography>
        <br />
        <Typography className='oneline' variant="body2">
          {des}
        </Typography>
      </CardContent>
    </Card>
  );
}
