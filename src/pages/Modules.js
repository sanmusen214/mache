import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { getmodules } from '../services/modules';
import BasicCard from '../components/Card';
import "./Modules.css"
import { IconPlus } from '../components/AddIcon';

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
 */
export function Module(props) {
  const e=props.info||{}
  return (
    <Grid
      item
      xs={4}
      sx={{ cursor: 'pointer', userSelect: 'none' }}
      onClick={() => { if (e.link != "#" && e.link) { window.open(e.link) } }}>
      <div className="modulebox">
        <BasicCard
          title={e.name}
          des={e.describe}
        />
      </div>
    </Grid>
  )
}


export default function Modules() {

  const [modules, setmodules] = useState([])

  useEffect(() => {
    setmodules(getmodules())
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {modules.map((e) => {
          return <Module key={e.id} info={e} />
        })}
      </Grid>
      <IconPlus />
    </Box>
  )
}
