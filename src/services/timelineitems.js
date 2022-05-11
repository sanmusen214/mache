import {getreminder,RemindertoDate,formatReminders} from './reminder'
import {showTime} from '../utils/timedate'
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
    const TimeDateNow=new Date()
    let TimeDatePoint=new Date()
    TimeDatePoint.setMinutes(0)
    TimeDatePoint.setHours(reminder.info.hour)
    //先变成尽可能往前的符合条件的月日
    switch(type){
        case "year":
            // 去年同月同日
            TimeDatePoint.setFullYear(TimeDatePoint.getFullYear()-1)
            TimeDatePoint.setMonth(reminder.info.month)
            TimeDatePoint.setDate(reminder.info.day)
            break
        case "month":
            // 去年十二月同日
            TimeDatePoint.setFullYear(TimeDatePoint.getFullYear()-1)
            TimeDatePoint.setMonth(11)
            TimeDatePoint.setDate(reminder.info.day)
            break
        case "week":
            // 去年十二月同星期
            TimeDatePoint.setFullYear(TimeDatePoint.getFullYear()-1)
            TimeDatePoint.setMonth(11)
            for(let i=0;i<10;i++){
                TimeDatePoint.setDate(i)
                if(TimeDatePoint.getDay()==reminder.info.day){
                    // console.log("追溯结束:",TimeDatePoint.getDay(),reminder.info.day)
                    break
                }
            }
            // console.log("追溯前:",TimeDatePoint)
            break
    }
    // console.log("reminder: ",reminder,"--date: ",TimeDatePoint)
    // 从去年十二月开始追溯到紧挨着现在的下一个
    while(TimeDatePoint-TimeDateNow<0){
        switch(type){
            case "year":
                TimeDatePoint.setFullYear(TimeDatePoint.getFullYear()+1)
                break
            case "month":
                TimeDatePoint.setMonth(TimeDatePoint.getMonth()+1)
                // 更新月份后再次确保日期正确
                TimeDatePoint.setDate(reminder.info.day)
                break
            case "week":
                TimeDatePoint.setDate(TimeDatePoint.getDate()+7)
                break
        }
    }
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