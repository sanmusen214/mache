
/**
 * 返回依据于时间的随机数
 */
export function timerandom(){
    return new Date().getSeconds()
}

/**
 * 获取某年的几月有几天,月份从1开始
 */
export function daysinMon(year,month){
    month=month-0
    month=month+1
    if(month==13){
        month=1
    }
    if(month<10){
        month='0'+month
    }else{
        month=month+''
    }
    const marchmonth=new Date(year+"-"+month+"-01")
    const febmonth=new Date(marchmonth.setDate(0))
    // console.log(febmonth.toString())
    return febmonth.getDate()
}

/**
 * 字符串转本地时
 */
export function StringtoDate(str){
    const res= new Date(str)
    return {
        month:res.getMonth(),//0~11
        date:res.getDate(),//1~31
        day:res.getDay(),//0~6 0是周日
        hour:res.getHours(),//0~23
    }
}

/**
 * 本地时转UTC字符串
 */
export function DatetoString(date){
    return date.toUTCString()
}

/**
 * date对象转显示的字符串
 */
export function showTime(date){
    return date.getFullYear()+"-"+((date.getMonth()+1)>9?date.getMonth()+1:"0"+(date.getMonth()+1))+"-"+(date.getDate()>9?date.getDate():"0"+date.getDate())+" "+(date.getHours()>9?date.getHours():"0"+date.getHours())+":"+(date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes());
}

