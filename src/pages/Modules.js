import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { getmodules } from '../services/modules';
import BasicCard from '../components/Card';
import "./Modules.css"
import { IconPlus } from '../components/AddIcon';
import PropTypes from 'prop-types';
import FormDialog from '../components/PopupForm';

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
  const info = props.info || {}
  return (
    <Grid
      item
      xs={4}
      sx={{ cursor: 'default', userSelect: 'none' }}
      onClick={() => { if (info.link != "#" && info.link) { window.open(info.link) } }}>
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

function remove(e) {
  console.log(e.target.getAttribute("data-key"))
}

function submit(e) {
  //处理传回来的各种表单提交
  console.log("submit!")
  return e
}
/**
 * TODO: 传入表单，返回填写内容
 */
export default function Modules() {

  const [modules, setmodules] = useState([])
  const [showform, setshowform] = useState(false)

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
      <IconPlus recall={() => {
        console.log(showform)
        setshowform(true)
        console.log(showform)
      }} />
      <FormDialog open={showform} setOpen={setshowform} finish={submit} />
    </Box>
  )
}
