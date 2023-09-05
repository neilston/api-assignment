const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

//get all essays
Router.get("/",(req,res)=>{
    mysqlConnection.query("SELECT * from ess", (err, rows, fields)=>{
        if(!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })

});

//get essay by ids
Router.get("/:essid",(req,res)=>{
    mysqlConnection.query("SELECT * from ess WHERE essid =?",[req.params.essid], (err, rows, fields)=>{
        if(!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })

});

//get by author name
Router.get("/:author",(req,res)=>{
    mysqlConnection.query("SELECT * from ess WHERE author =?",req.params.author, (err, rows, fields)=>{
        if(!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })

});

//delete essay

Router.delete("/:essid",(req,res)=>{
    mysqlConnection.query("DELETE from ess WHERE essid =?",[req.params.essid], (err, rows, fields)=>{
        if(!err)
        {
            res.send("Deletion successful");
        }
        else
        {
            console.log(err);
        }
    })

});

//insert or update essay

Router.post("/",(req,res)=>{
    let esy = req.body;
    var sql = "SET @essid = ?; SET @title = ?; SET @author = ?; SET @description = ?; CALL essayaddmod(@essid, @title, @author, @description);"
    mysqlConnection.query(sql,[esy.essid, esy.title, esy.author, esy.description], (err, rows, fields)=>{
        if(!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })

});

module.exports = Router;