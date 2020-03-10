const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");
const path = require('path');
const ejs = require('ejs');
const app = express();
const EssRoutes = require ("./routes/ess");


app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/ess", EssRoutes);

app.get('/',(req, res) => {
    let sql = "SELECT * FROM ess";
    let query = mysqlConnection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('essay_index', {
            title : 'ESSAY DASHBOARD',
            ess : rows
        });
    });
});

app.get('/add',(req,res)=>{
    res.render('essay_add', {
        title : 'ADD ESSAY'
    });
});

app.post('/save',(req, res) => { 
    let data = {title : req.body.title, author : req.body.author, description : req.body.description};
    let sql = "INSERT INTO ess SET ?";
    let query = mysqlConnection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

app.get('/edit/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `Select * from ess where essid = ${userId}`;
    let query = mysqlConnection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('essay_edit', {
            title : 'EDIT ESSAY',
            user : result[0]
        });
    });
});

app.post('/update',(req, res) => {   
    const userId = req.body.id;
    let sql = "update ess SET title='"+req.body.title+"',  author='"+req.body.author+"',  description='"+req.body.description+"' where essid ="+userId;
    let query = mysqlConnection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

app.get('/delete/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE from ess where essid = ${userId}`;
    let query = mysqlConnection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});

app.listen(3000);