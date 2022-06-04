import {addItem,getItems,removeItem} from '../utils/localstorage'

const keyname='module'
/**
 * 'module':{id,name,link,describe}
 */
function formatModules(obj){
    if(!obj.id){
        throw Error("must have an id")
    }
    return {
        id:obj.id,
        name:obj.name||obj.id,
        link:obj.link||"#",
        describe:obj.describe||""
    }
}

/**
 * {id,name,link,describe}
 */
export function getmodules(){
    const resultlist= getItems(keyname)
    for (let i=0;i<resultlist.length;i++){
        resultlist[i]=formatModules(resultlist[i])
    }
    return resultlist
}

/**
 * target:{id,name,link,describe}
 */
export function addmodules(target){
    const newmodule=formatModules(target)
    return addItem(keyname,target.id,target)
}

export function removemodules(itemid){
    return removeItem(keyname,itemid)
}