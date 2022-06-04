import {getreminder,RemindertoDate,formatReminders} from './reminder'
import {showTime} from '../utils/timedate'
import { Construction } from '@mui/icons-material'
/**
 */
function formatTimelineItems(obj){
    obj.maininfo=obj.maininfo||{}
    return {
        name:obj.name||'',
        datestr:obj.datestr||'',
        showstr:obj.showstr||'',
        maininfo:{
            url:obj.maininfo.url||"#",
            count:obj.maininfo.count||0
        }
    }
}


/**
 * 按照reminder，年/月/周为循环，找到紧挨着当前的下个节点
 */
 export function findNextPointAfter(reminder){
    const type=reminder.mode
    const TimeDatePoint=new Date()
    TimeDatePoint.setMinutes(0)
    TimeDatePoint.setHours(reminder.info.hour)
    //从今天开始往后追溯
    switch(type){
        case "year":
            if(TimeDatePoint.getMonth()==reminder.info.month&&TimeDatePoint.getDate()==reminder.info.day){
                break
            }
            for(let i=0;i<366;i++){
                TimeDatePoint.setDate(TimeDatePoint.getDate()+1)
                if(TimeDatePoint.getMonth()==reminder.info.month&&TimeDatePoint.getDate()==reminder.info.day){
                    break
                }
            }
            break
        case "month":
            if(TimeDatePoint.getDate()==reminder.info.day){
                break
            }
            for(let i=0;i<366;i++){
                TimeDatePoint.setDate(TimeDatePoint.getDate()+1)
                if(TimeDatePoint.getDate()==reminder.info.day){
                    break
                }
            }
            break
        case "week":
            if(TimeDatePoint.getDay()==reminder.info.day){
                break
            }
            for(let i=0;i<366;i++){
                TimeDatePoint.setDate(TimeDatePoint.getDate()+1)
                if(TimeDatePoint.getDay()==reminder.info.day){
                    break
                }
            }
            break
    }
    // console.log("reminder: ",reminder,"--date: ",TimeDatePoint)
    return TimeDatePoint
}

export function getTimelineitems(){
    const reminderlist=getreminder()
    const tllist=[formatTimelineItems({
        name:'Now time',
        datestr:new Date().toString(),
        showstr:showTime(new Date()),
        maininfo:{
            url:"#",
            count:0
        }
    })]
    // 当前时间点往前,只包含周循环
    const bllist=[]
    // 建立每年/每月/每周三个优先队列
    const eachyear=[]
    const eachmonth=[]
    const eachweek=[]
    // 把reminderlist里的按顺序放进优先队列里
    for (let each of reminderlist){
        switch(each.mode){
            case 'year':
                eachyear.push(each)
                break
            case 'month':
                eachmonth.push(each)
                break
            case 'week':
                eachweek.push(each)
                break
        }
    }
    // 挨个把Now time之后最近的一次节点拿出来
    for (let ey of eachyear){
        const nextdatepoint=findNextPointAfter(ey)
        tllist.push(formatTimelineItems({
            name:ey.info.name,
            datestr:nextdatepoint.toString(),
            showstr:showTime(nextdatepoint),
            maininfo:{
                url:ey.info.url,
                count:ey.count.nowcount
            }
        }))
    }
    for (let em of eachmonth){
        const nextdatepoint=findNextPointAfter(em)
        tllist.push(formatTimelineItems({
            name:em.info.name,
            datestr:nextdatepoint.toString(),
            showstr:showTime(nextdatepoint),
            maininfo:{
                url:em.info.url,
                count:em.count.nowcount
            }
        }))
        // 月份往前，注意日期缩小（对于30号，这个月31天，上个月只有30天
        const lastdatepoint=new Date(nextdatepoint)
        // 先设为0日，跳到上个月最后一天后判断目标日期是否越界lastdatepoint月总天数，否则继续跳
        lastdatepoint.setDate(0)
        while(lastdatepoint.getDate()<em.info.day){
            lastdatepoint.setDate(0)
        }
        lastdatepoint.setDate(em.info.day)
        bllist.push(formatTimelineItems({
            name:em.info.name,
            datestr:lastdatepoint.toString(),
            showstr:showTime(lastdatepoint),
            maininfo:{
                url:em.info.url,
                count:em.count.nowcount
            }
        }))
    }
    for (let ew of eachweek){
        const nextdatepoint=findNextPointAfter(ew)
        tllist.push(formatTimelineItems({
            name:ew.info.name,
            datestr:nextdatepoint.toString(),
            showstr:showTime(nextdatepoint),
            maininfo:{
                url:ew.info.url,
                count:ew.count.nowcount
            }
        }))
        // 往前
        const lastdatepoint=new Date(nextdatepoint)
        lastdatepoint.setDate(lastdatepoint.getDate()-7)
        bllist.push(formatTimelineItems({
            name:ew.info.name,
            datestr:lastdatepoint.toString(),
            showstr:showTime(lastdatepoint),
            maininfo:{
                url:ew.info.url,
                count:ew.count.nowcount
            }
        }))
    }
    // 把tllist排序
    tllist.sort((a,b)=>{
        let timea=new Date(a.datestr)
        let timeb=new Date(b.datestr)
        const diff=timea-timeb
        timea=null
        timeb=null
        return diff
    })
    // 把bllist排序
    bllist.sort((a,b)=>{
        let timea=new Date(a.datestr)
        let timeb=new Date(b.datestr)
        const diff=timea-timeb
        timea=null
        timeb=null
        return diff
    })
    return {'before':bllist,'after':tllist}
}