// 带有时间记录的备忘录
import React, { useEffect } from 'react'
import { IconPlus } from '../components/AddIcon';
import BasicTablemy from '../components/Tablemy';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button, IconButton, Typography } from '@mui/material';
import FormDialogReminder from '../components/ReminderForm';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { getreminder,addreminder,removereminder } from '../services/reminder';
import { timerandom } from '../utils/timedate';
import './Reminder.css'

const headdata=['Name','Mode','Month','Day','Hour','Count','']

const modemap={'year':'each year','month':'each month','week':'each week'}

const weekdaymap={'1':'Monday','2':'Tuesday','3':'Wednesday','4':'Thursday','5':'Friday','6':'Saturday','0':'Sunday'}

// 根据不同的事件渲染不同的day 星期 or 日期
const daymap=(day,mode='month')=>{
  if(mode=='week'){
    return weekdaymap[day]
  }else{
    return day-0
  }
}

export default function Reminder() {

  const [reminders,setreminders]=React.useState([])
  const [visible,setvisible]=React.useState(false)

  useEffect(()=>{
    rerender()
  },[])

  const rerender=()=>{
    setreminders(getreminder())
  }

  const onremove=(e)=>{
    removereminder(e)
    rerender()
  }

  // 创建新reminder
  const onfinish=(res)=>{
    addreminder({
      id:res.name+timerandom(),
      mode:res.mode,
      info:{
        name:res.name,
        url:res.url,
        month:res.month,
        day:res.day,
        hour:res.hour
      },
      count:{
        nowcount:0
      }
    })
    rerender()
  }

// 渲染每行数据
const renderrow=(row)=>{
  return (
    <TableRow
      key={row.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row" sx={{fontWeight:'bolder'}}>{row.info.name}</TableCell>
      <TableCell>{modemap[row.mode]}</TableCell>
      <TableCell>{row.mode=='year'?row.info.month-0+1:null}</TableCell>
      <TableCell>{daymap(row.info.day,row.mode)}</TableCell>
      <TableCell>{row.info.hour}</TableCell>
      <TableCell className='countlabel'>
      <IconButton onClick={()=>{
        addreminder({...row,count:{nowcount:row.count.nowcount-0-1}})
        rerender()
        }}><ArrowLeftIcon /></IconButton>
        {row.count.nowcount}
      <IconButton onClick={()=>{
        addreminder({...row,count:{nowcount:row.count.nowcount-0+1}})
        rerender()
      }}><ArrowRightIcon /></IconButton>
      </TableCell>
      <TableCell>
        <Button data-url={row.info.url} onClick={(e)=>{
          if(e.target.getAttribute('data-url').indexOf('http')==0){
            window.open(e.target.getAttribute('data-url'))
          }}}>jump</Button>
        <Button color='error' data-key={row.id} onClick={(e)=>{
          if(window.confirm("Delete?")){
            onremove(e.target.getAttribute('data-key'))
          }
          }}>delete</Button>
        </TableCell>
    </TableRow>
  )
}

  return (
    <div>
      
      {
        reminders.length==0?<Typography variant='h5'>There is no reminder now</Typography>:<BasicTablemy headdata={headdata} rowsdata={reminders} render={renderrow}/>
      }
      <IconPlus recall={()=>{setvisible(true)}}/>
      <FormDialogReminder open={visible} setopen={setvisible} finish={onfinish}/>
    </div>
  )
}
