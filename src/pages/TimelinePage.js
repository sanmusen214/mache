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

  const [lineitems, setlineitems] = React.useState([])

  React.useEffect(() => {
    const aal = getTimelineitems()
    // console.log(aal)
    setlineitems(aal)
  }, [])

  return (
    <React.Fragment>
      {lineitems.length==0?<Typography variant='h5'>There is no reminder now</Typography>:null}
      <Timeline>
        {lineitems.map((each,index) => {
          return (
            <TimelineItem key={each.name+each.datestr}>
              <TimelineOppositeContent color="text.secondary">
                {each.showstr}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color={index==0?"primary":"grey"}/>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>{each.name} - {each.maininfo.count}<Button onClick={()=>{
                each.maininfo.url=each.maininfo.url||""
                if(each.maininfo.url&&each.maininfo.url.indexOf("http")==0){
                  window.open(each.maininfo.url)
                }}}>jump</Button></TimelineContent>
            </TimelineItem>
          )

        })}
      </Timeline>
    </React.Fragment>
  );
}
