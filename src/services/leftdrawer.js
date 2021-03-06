/**
 * name,link,picurl
 */
const online=[
    {
        name:'Email',
        link:'https://mail.xjtlu.edu.cn/',
        picurl:'https://mail.xjtlu.edu.cn/owa/favicon.ico'
    },
    {
        name:'LearningMall',
        link:'https://core.xjtlu.edu.cn/my/',
        picurl:'https://core.xjtlu.edu.cn/theme/image.php/space/theme/1657087804/favicon'
    },
    {
        name:'Ebridge',
        link:'https://ebridge.xjtlu.edu.cn/urd/sits.urd/run/siw_lgn',
        picurl:'https://lib.xjtlu.edu.cn/sites/default/files/favicon-32x32.png'
    },
    {
        name:'Library',
        link:'https://lib.xjtlu.edu.cn/',
        picurl:'https://lib.xjtlu.edu.cn/sites/default/files/favicon-32x32.png'
    }
]
const onsite=[
    {
        name:'Printer',
        link:'http://wp.xjtlu.edu.cn/',
        picurl:'https://lib.xjtlu.edu.cn/sites/default/files/favicon-32x32.png'
    }
]
const about=[
    {
        name:'About Mache',
        link:'https://github.com/sanmusen214/mache',
        picurl:'https://github.githubassets.com/favicons/favicon.png'
    }
]
export function getdrawer(){
    return {'online':online,'onsite':onsite,'about':about}
}