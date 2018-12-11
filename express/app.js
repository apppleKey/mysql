

const express = require("express")
const app = express();
const sqlOpeate = require("./db.js")
app.post('/api/getlist', (req, res) => {
    var data = {}
    try {
        var data = sqlOpeate.query().then((list) => {
            data.data = list;
            data.code = 0;
            data.msg = "成功！";
            // console.log(data)
            // res.send(JSON.stringify(data));
            res.send(JSON.stringify(data));
        }).catch((err) => {
            throw err
        })
    } catch (e) {
        data.data = [];
        data.code = 1;
        data.msg = err.message;
        // res.send(JSON.stringify(data));
    }

});

app.listen(3001, () => console.log('Example app listening on port 3001!'));
