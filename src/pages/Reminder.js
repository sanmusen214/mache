// 带有时间记录的备忘录
import React from 'react'
import { IconPlus } from '../components/AddIcon';

import { addItem,getItem,removeItem } from '../utils/localstorage';
export default function Reminder() {
  return (
    <div>
      <div onClick={()=>{
        addItem('test','test1',{id:'test1',text:'I am a test',world:'hello world'})
      }}>add test1 to test</div>
      <div onClick={()=>{
        addItem('test','test2',{id:'test2',text:'I am a test2',world:'hello world2'})
      }}>add test2 to test</div>
      <div
      onClick={()=>{
        console.log(getItem('test'))
      }}
      >show test</div>
      <div onClick={()=>{
        removeItem('test','test1')
      }}>
        delete test1
      </div>
      <div onClick={()=>{
        removeItem('test','test2')
      }}>
        delete test2
      </div>
      <IconPlus />
    </div>
  )
}
