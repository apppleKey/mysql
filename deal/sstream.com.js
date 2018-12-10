const cheerio=require("cheerio")
const moment=require("moment")
var dealData=module.exports;
//吸取页面的数据整理归纳
dealData.dealContent=function ( content){
    const $=cheerio.load(content)
    // instance.exit();
    let trs=$("tbody>tr");
    let data=[];
    trs.map((i,v)=>{
        var obj={}
        // 找到td  
        var $tds=cheerio.load(v)("td");

         // 第一个td
         var $td1=cheerio.load($tds[0]);
            // 获取时间
            obj.time=moment().format("YYYY-MM-DD "+$td1.html().slice(21,26)+":00")

            //获取比赛内容
            var $a=$td1("a");
           obj.raceName=cheerio.load($a[0]).text();//举办方
           obj.raceNameLink=$a[0].attribs.href;//举办方赛事链接
           obj.raceRival=cheerio.load($a[1]).text();//赛事双方
           obj.raceLink=$a[1].attribs.href//比参赛链接
        //  console.log(time);
        // 第二个td 
        var $td2=cheerio.load($tds[1]);
        obj.typeName=$td2.text()
        data.push(obj)
    })
    return data;
}