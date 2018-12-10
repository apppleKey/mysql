const mysql = require("mysql");
var sqlOpeate = module.exports;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'mydb'
});


//  建表
async function createTable(tableName, sql) {
    return new Promise((resolve, reject) => {

        var sql = `SELECT * FROM ${tableName}`;
        connection.query("sql", function (err) {
            if (err) {
                var creatTableSql = `CREATE TABLE ${tableName} (
                Id int(11) NOT NULL AUTO_INCREMENT,
                raceName varchar(255) DEFAULT NULL,
                raceLink varchar(255) DEFAULT NULL,
                typeName varchar(255) DEFAULT NULL,
                raceNameLink varchar(255) DEFAULT NULL,
                raceRival varchar(255) DEFAULT NULL,
                raceType varchar(100) DEFAULT NULL,
                time varchar(30) DEFAULT NULL,
                PRIMARY KEY (Id)
              ) ENGINE=MyISAM DEFAULT CHARSET=utf8;
              `
                connection.query(creatTableSql, function (err) {
                    if (err) {
                        reject();
                        return
                        console.log("mytb 创建失败" + err);
                    }
                    console.log("mytb 创建成功!")
                    resolve()
                })
            } else {
                resolve()
            }
        })
    })
}
// createTable("mytb");

// 插
sqlOpeate.open=function(){

    connection.connect()
}
connection.connect()
sqlOpeate.close=function(){
    connection.end()
}
sqlOpeate.add = function (data) {
    if(!data){
        return;
    }
    return new Promise((resolve, reject) => {
        // 去重
        connection.query(`SELECT * FROM mytb
        WHERE time='${data.time}' 
         AND raceRival='${data.raceRival}'` 
         , function (err, result) {
                if (err) {
                    console.log(err);
                    // reject();
                }
                else if (result.length == 0) {
                    var addSql = 'INSERT INTO mytb(time,raceName,raceLink,typeName,raceNameLink,raceRival) VALUES(?,?,?,?,?,?)';
                    var addSqlParams = [data.time, data.raceName, data.raceLink, data.typeName, data.raceNameLink, data.raceRival];
                  
                    connection.query(addSql, addSqlParams, function (err) {
                        if (err) {
                             reject()
                             } else {
                            console.log('插入一条数据')
                            resolve();
                        }
                    })
                } else{

                    // console.log("已经存在");
                    resolve();
                }
              

                });


    })
}

// sqlOpeate.add({
//     "time": "2018-12-10 12:45:00", 
//     "raceName": "Pro League. Moscow",
//      "raceNameLink": "/League/Table+Tennis/1836132.html",
//     "raceRival": "Sergey Simonov VS Timur Mamazakirov",
//      "raceLink": "/live/Table+Tennis/dw0fJjtZwYhhw8CzcUfZsCAugRFoON5b/Sergey+Simonov_VS_Timur+Mamazakirov/",
//       "typeName": "乒乓球"
// })
// .then(function(){}).catch(()=>{})