const express = require("express")
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const userModel = require("./usermodel");
const path = require("path");

app.get("/",function(req,res){
    res.send("hello");
});
app.get("/create", async function(req,res){
        const [name,email,age] = ["phaneendra","naga@gmail.com",25];
        let createdUser = await userModel.create({name:name,email:email,age:age});
        res.send(createdUser);
});
app.get("/read", async function (req,res) {
        let userList = await userModel.find({name:"phanibabu"});
        res.send(userList);
})
app.get("/update",async function (req,res) {
    let updatedList = await userModel.findOneAndUpdate({name:"naga"},{name:"phanibabu"});
    res.send(updatedList);
})
app.get("/delete", async function(req,res){
    let deletedList = await userModel.findOneAndDelete({name:"phaneendra"});
    res.send(deletedList);
})
app.listen(1500);