const keyname='reminder'

// id
// mode:year每年的哪一天、month每月的某一日、week每周的星期几
// info如下:
// 每年: name url month day hour
// 每月：name url day hour
// 每周：name url day hour
// count如下(从创建开始过后经过了多少次)：
// needcount(bool) maxcount nowcount createTimeStr

/**
 * @param obj.id
 * @param obj.mode: year/month/week
 * @param obj.info:
 * @param obj.count
 */
function formatReminders(obj){
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
            needcount:obj.count.needcount||false,
            maxcount:obj.count.maxcount||500,
            nowcount:obj.count.nowcount||0,
            createTimeStr:obj.count.createTimeStr||"Tue, 10 May 2022 06:40:17 GMT"
        }
    }
}

export function getreminder(){
    return [
        {
            id:'id123',
            mode:"year",
            info:{
                name:"test reminder",
                url:"#",
                month:"2",
                day:"3",
                hour:"12"
            },
            count:{
                needcount:true,
                maxcount:500,
                nowcount:3,
                createTimeStr:"Tue, 10 May 2022 06:40:17 GMT"
            }
        }
    ]
}