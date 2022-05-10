// 带有时间记录的备忘录
import React, { useEffect } from 'react'
import { IconPlus } from '../components/AddIcon';
import BasicTablemy from '../components/Tablemy';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button, IconButton } from '@mui/material';
import FormDialogReminder from '../components/ReminderForm';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { getreminder,addreminder,removereminder } from '../services/reminder';
import { timerandom } from '../utils/timedate';
import './Reminder.css'

const headdata=['Name','Mode','Month','Day','Hour','Count','']

const modemap={'year':'each year','month':'each month','week':'each week'}

const weekdaymap={'0':'Monday','1':'Tuesday','2':'Wednesday','3':'Thursday','4':'Friday','5':'Saturday','6':'Sunday'}

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
        <Button data-key={row.id} onClick={(e)=>{
          removereminder(e.target.getAttribute('data-key'))
          rerender()
          }}>delete</Button>
        </TableCell>
    </TableRow>
  )
}

  return (
    <div>
      <BasicTablemy headdata={headdata} rowsdata={reminders} render={renderrow}/>
      <IconPlus recall={()=>{setvisible(true)}}/>
      <FormDialogReminder open={visible} setopen={setvisible} finish={onfinish}/>
    </div>
  )
}
