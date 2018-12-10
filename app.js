var schedule = require("node-schedule");
const request = require('request');
const phantom = require('phantom');
const cheerio = require("cheerio");
const moment = require("moment");
const fs = require("fs");
const express = require("express");
const dealData = require("./deal/sstream.com.js");
const sqlOpeate = require("./mysql/conn.js");
function exec() {
    (async function () {
        var instance = await phantom.create();
        var page = await instance.createPage();
        await page.property('viewportSize', { width: 1024, height: 600 });
        await page.open('http://sstream365.com/');
        await page.render('./github.png');
        const content = await page.property('content');
        fs.writeFileSync("hehe.html", content)
        // const content=fs.readFileSync("hehe.html")
        const data = dealData.dealContent(content) || [];
        for (var i = data.length - 1; ; i--) {
            // await sqlOpeate.open();
            // console.log(JSON.stringify(data[i]))
            await sqlOpeate.add(data[i]);

            // await sqlOpeate.close();
        }
    })()
}


var count = 0;
var j = schedule.scheduleJob("1 * * * * *", function () {
    count++;
    try {
        exec();
        console.log('现在时间：', new Date(), count + "次");
    } catch (e) {
        // sqlOpeate.close();
    }


});




// const app = express();

// app.get('*', (req, res) => res.send('Hello World!'));

// app.listen(3001, () => console.log('Example app listening on port 3001!'));

// const parser = require('cron-parser');
// const interval = parser.parseExpression("1 * * * * *");
// //打印后面10次的执行时间
// for (let i = 0; i < 10; ++i) {
// console.log(interval.next().toString());
// }