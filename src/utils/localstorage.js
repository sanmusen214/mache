import qs from 'qs'


/**
 * 每个以Json格式存key:{'content':[{id:''},{id:''},{id:''}]}
 */


/**
 * 修改指定的itemid的项为newitem，如果没有则创建key对象
 */
export function addItem(key, itemid, newitem) {
    if (newitem.id != itemid) {
        console.error("添加的对象id必须与传入的id相同")
        return false
    }
    const itemobj = qs.parse(localStorage.getItem(key))
    // 无原对象
    if(!itemobj){
        localStorage.setItem(key,qs.stringify({'content':[newitem]}))
        return true
    }
    // 无原对象里的content
    if(!itemobj['content']){
        itemobj['content']=[]
    }
    let count=0
    // 加入（验证id不重复
    for (let i = 0; i < itemobj['content'].length; i++) {
        if (itemobj['content'][i]['id'] == itemid) {
            count+=1
            itemobj['content'][i] = newitem
        }
    }
    if(count>1){
        // id重复
        console.error("id 重复")
        return false
    }else if(count==1){
        // id出现一次，修改已有的
        localStorage.setItem(key,qs.stringify(itemobj))
        return true
    }else{
        // 添加没有的
        itemobj['content'].push(newitem)
        localStorage.setItem(key,qs.stringify(itemobj))
        return true
    }
}

/**
 * 查询key,返回列表,[{},{}]
 */
export function getItems(key) {
    const itemobj = qs.parse(localStorage.getItem(key))
    if (itemobj['content']) {
        return itemobj['content']
    }else{
        return []
    }
}

/**
 * 导出localstorage存储的数据
 */
export function loadItems(key){
    return localStorage.getItem(key)
}

/**
 * 导入localstorage存储的数据
 */
export function saveItems(key,value){
    // console.log("-----",key,value,qs.parse(value))
    localStorage.setItem(key,value)
}

/**
 * 删除key的itemlist里id为itemid的对象,一个对象而不是整个key！
 */
export function removeItem(key, itemid) {
    const itemobj = qs.parse(localStorage.getItem(key))
    // 无原对象
    if(!itemobj){
        return false
    }
    // 无原对象里的content
    if(!itemobj['content']){
        itemobj['content']=[]
    }
    // 删除所有与itemid一样的
    for (let i =itemobj['content'].length-1; i >-1 ; i--) {
        if (itemobj['content'][i]['id'] == itemid) {
            itemobj['content'].splice(i,1)
        }
    }
    localStorage.setItem(key,qs.stringify(itemobj))
    return true
}
