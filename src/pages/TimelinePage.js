import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { getTimelineitems } from '../services/timelineitems'
import { Typography,Button } from '@mui/material';

export default function TimelinePage() {

  const [lineitems, setlineitems] = React.useState({
    'before':[],
    'after':[]
  })

  React.useEffect(() => {
    setlineitems(getTimelineitems())
  }, [])

  // 渲染timeline到节点上
  const showline=(each,index,highlight=false) => {
    return (
      <TimelineItem key={each.name+each.datestr}>
        <TimelineOppositeContent color="text.secondary">
          {each.showstr}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color={index==0&&highlight?"primary":"grey"}/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>{each.name} - {each.maininfo.count}<Button onClick={()=>{
          each.maininfo.url=each.maininfo.url||""
          if(each.maininfo.url&&each.maininfo.url.indexOf("http")==0){
            window.open(each.maininfo.url)
          }}}>jump</Button></TimelineContent>
      </TimelineItem>
    )
  }

  return (
    <React.Fragment>
      <Timeline>
        {lineitems['before'].map((e,i)=>showline(e,i,false))}
        {/* after包含现在，需要高亮第一个 */}
        {lineitems['after'].map((e,i)=>{return showline(e,i,true)})}
      </Timeline>
    </React.Fragment>
  );
}
