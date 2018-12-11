const mysql = require("mysql");
var sqlOpeate = module.exports;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'mydb'
});

connection.connect();
sqlOpeate.query = function (data) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM mytb`
        , function (err, result) {
            // connection.end();
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result)
                }
            });


    })
}
