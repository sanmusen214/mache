import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { getmodules,addmodules,removemodules } from '../services/modules';
import BasicCard from '../components/Card';
import "./Modules.css"
import { IconPlus } from '../components/AddIcon';
import PropTypes from 'prop-types';
import FormDialogModule from '../components/ModuleForm';
import { timerandom } from '../utils/timedate';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

/**
 * 单个模块
 * @param props.info
 * @param props.remove
 */
export function Module(props) {
  const info = props.info || {}
  const remove=props.remove||function(e){return e}
  return (
    <Grid
      item
      xs={4}
      sx={{ cursor: 'default', userSelect: 'none' }}
      onClick={() => { if (info.link && info.link.indexOf('http')==0) { window.open(info.link) } }}>
      <div className="modulebox">
        <BasicCard
          id={info.id}
          title={info.name}
          des={info.describe}
          remove={remove}
        />
      </div>
    </Grid>
  )
}

Module.propTypes = {
  info: PropTypes.object.isRequired
}


/**
 * 
 */
export default function Modules() {

  const [modules, setmodules] = useState([])
  const [showform, setshowform] = useState(false)

  useEffect(() => {
    reshow()
  }, [])

  const remove=(e)=> {
    removemodules(e)
    reshow()
  }
  
  const submit=(e)=>{
    //处理传回来的各种表单提交
    addmodules({
      id:e.name+timerandom(),
      name:e.name,
      link:e.url,
      describe:e.des
    })
    reshow()
  }

  const reshow=()=>{
    setmodules(getmodules())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {
        modules.length==0?<Typography variant='h5'>There is no module now</Typography>:null
      }
      <Grid container spacing={2}>
        {modules.map((e) => {
          return <Module key={e.id} info={e} remove={remove}/>
        })}
      </Grid>
      <IconPlus recall={() => {
        setshowform(true)
      }} />
      <FormDialogModule 
      open={showform} 
      setopen={setshowform} 
      finish={submit} />
    </Box>
  )
}
