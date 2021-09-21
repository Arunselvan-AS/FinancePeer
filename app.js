const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mysql = require('mysql');
const deasync = require('deasync');
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

//Homepage
app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/view',(req,res)=>{
    res.render('viewdata');
});
app.post('/SendValues',(req,res)=>{
    console.log(req.body);
    res.json({status:"Sent Successful"});
});
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));