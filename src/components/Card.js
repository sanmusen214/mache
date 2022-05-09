import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./Card.css"
import PropTypes from 'prop-types';
import { Divider } from '@mui/material';

BasicCard.propTypes={
  id:PropTypes.string.isRequired,
  title:PropTypes.string.isRequired,
  des:PropTypes.string.isRequired,
  remove:PropTypes.func
}

/**
 * 包含标题和一行介绍的Card
 * @param props.id
 * @param props.title
 * @param props.des
 * @param props.remove
 */
export default function BasicCard(props) {
    const id=props.id||""
    const title=props.title||""
    const des=props.des||""
    const remove=props.remove||function(e){return e}
    return (
    <Card  variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography className='oneline' variant="h4" component="div">
          {title}
        </Typography>
        <Typography className='oneline' variant="body2">
          {des}
        </Typography>
        <Divider style={{marginTop:'5px'}}/>
        <a 
        style={{float:'right',color:'gray',textDecoration:'underline'}} 
        data-key={id}
        onClick={(e)=>{
          remove(e)
          e.stopPropagation()
        }}>remove</a>
      </CardContent>
    </Card>
  );
}
