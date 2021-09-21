const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mysql = require('mysql');
const deasync = require('deasync');
function getConnection() {
    return mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "Arun@123",
        database: "financepeer"
    })
}
const con = getConnection();
// Middleware
app.use("/js", express.static(path.join(".", "public/js/")))
app.use("/css", express.static(path.join(".", "public/css/")))
const middlewares=[
    express.static(path.join(__dirname,'public')),
    bodyParser.urlencoded({extended:false})
];
app.use(middlewares)
const layout=require('express-layout');
app.use(bodyParser.json());
app.set('view engine', 'ejs');

function selectQuery(sql)
{
    var ret = null;
    con.query(sql, (err, rows, fields) => {
        if (err) {
          console.log("Failed to query " + err);
          console.log('select statement error');
        }
        ret = {err : err, rows : rows,fields:fields};
    });
    while((ret == null))
    {
         deasync.runLoopOnce();
    }
    return (ret);
}
//Homepage

app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/view',(req,res)=>{
    res.render('viewdata');
});
app.get('/tableValues',(req,res)=>{
    var query = selectQuery(`SELECT * from jsdata`);
    var rows = query.rows;
    res.json(rows);
})
app.post('/SendValues',(req,res)=>{
    var body = req.body;
    var str = JSON.stringify(body);
    str = str.replaceAll('\\','');
    var del = selectQuery(`DELETE from jsdata`);
    var query = selectQuery(`insert INTO jsdata select * from JSON_TABLE('${str}',"$[*]" COLUMNS(userId int PATH "$.userId",id int PATH "$.id",title varchar(1000) PATH "$.title",body varchar(1000) PATH "$.body")) as jt1;`);
    res.json({status:"Sent Successful"});
});
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));