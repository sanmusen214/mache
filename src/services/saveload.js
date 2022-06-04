import { loadItems,saveItems } from "../utils/localstorage";
import qs from 'qs'

let keys={'reminder':null,'module':null}
// 取出localstorage,内容为localstorage的聚合
export function loadAll(){
    let strload={...keys}
    console.log(strload)
    for(let k in keys){
        strload[k]=qs.parse(loadItems(k))
    }
    return qs.stringify(strload)
}

//存进localstorage
export function saveAll(strsave){
    let strobjs=qs.parse(strsave)
    for(let k in strobjs){
        // console.log(qs.stringify(strobjs[k]))
        // console.log(keys[k])
        if(keys[k]!==undefined){
            saveItems(k,qs.stringify(strobjs[k]))
        }else{
            console.warn("import string not valid")
        }

    }
}