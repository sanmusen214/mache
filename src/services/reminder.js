import {addItem,getItems,removeItem} from '../utils/localstorage'

const keyname='reminder'

// id
// mode:year每年的哪一天、month每月的某一日、week每周的星期几
// info如下:
// 每年: name url month day hour
// 每月：name url day hour
// 每周：name url day hour
// count如下(从创建开始过后经过了多少次)：
// nowcount

/**
 * @param obj.id
 * @param obj.mode: year/month/week
 * @param obj.info:
 * @param obj.count
 */
export function formatReminders(obj){
    if(!obj.id){
        throw Error("must have an id")
    }
    if(!obj.info){
        obj.info={}
    }
    if(!obj.count){
        obj.count={}
    }
    return {
        id:obj.id,
        mode:obj.mode||"year",
        info:{
            name:obj.info.name||"",
            url:obj.info.url||"#",
            month:obj.info.month||"1",
            day:obj.info.day||"1",
            hour:obj.info.hour||"1"
        },
        count:{
            nowcount:obj.count.nowcount||0,
        }
    }
}

export function getreminder(){
    const reslist=getItems(keyname)
    for(let i=0;i<reslist;i++){
        reslist[i]=formatReminders(reslist[i])
    }
    // console.log(reslist)
    return reslist
}

export function addreminder(item){
    const newitem=formatReminders(item)
    addItem(keyname,newitem.id,newitem)
}

export function removereminder(itemid){
    return removeItem(keyname,itemid)
}

/**
 * 由reminder对象转Date，年份默认为今年
 */
 export function RemindertoDate(reminder,year=new Date().getFullYear()){
    reminder=formatReminders(reminder)
    const dd= new Date(year,reminder.info.month,reminder.info.day,reminder.info.hour)
    // console.log(dd)
    return dd
}