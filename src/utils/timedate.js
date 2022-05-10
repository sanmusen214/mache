/**
 * 返回依据于时间的随机数
 */
export function timerandom(){
    return new Date().getSeconds()
}

/**
 * 字符串转本地时
 */
export function StringtoDate(str){
    const res= new Date(str)
    return {
        month:res.getMonth(),//0~11
        date:res.getDate(),//1~31
        day:res.getDay(),//0~6
        hour:res.getHours(),//0~23
    }
}

/**
 * 本地时转UTC字符串
 */
export function DatetoString(date){
    return date.toUTCString()
}