const express = require("express");
const app = express();
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs"); //ejs is almost similar to html but addssome dynamic functionality
app.use(express.static(path.join(__dirname,"public")));  //given static files location as public
app.get("/",function(req,res){
    res.render("index");
});
app.get("/:username",function(req,res){
    res.send(`username is ${req.params.username}`)
});
app.get("/:username/:age",function(req,res){
    res.send(`username is ${req.params.username} and age is ${req.params.age}`)
});
app.listen(3000);