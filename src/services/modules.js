/**
 * id,name,link,describe
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


export function getmodules(){
    return [
        {
            id:"CPT2040526",
            name:"CPT204",
            link:'https://www.learningmall.cn/course/view.php?id=3444',
            describe:"This is a schoole module,This is a schoole moduleThis is a schoole moduleThis is a schoole moduleThis is a schoole moduleThis is a schoole moduleThis is a schoole module"
        },
        {
            id:"CPT2080526",
            name:"CPT208",
            link:"#",
            describe:"This is about design"
        },
        {
            id:"CPT2080527",
            name:"CPT208",
            link:"#",
            describe:"This is about design"
        },
        {
            id:"CPT20805289",
            name:"CPT208",
            link:"#",
            describe:"This is about design"
        },
        {
            id:"CPT20805299",
            name:"CPT208",
            link:"#",
            describe:"This is about design"
        }
    ]
}