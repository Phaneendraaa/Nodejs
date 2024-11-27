const express = require("express");
const app = express();
const path = require("path");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.get("/",function(req,res){
    
    res.render("signup");
})
app.get("/home",function(re,res){
    res.send("This is Home Page");
})
app.post("/signup", async function(req,res){

        const {username,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const NewUser = await userModel.create({username,email,password:hashedPassword});
        const token = jwt.sign({email:NewUser.email,password:NewUser.password},"secretkey");
            res.cookie("token",token);
            res.redirect("/home");
        

})
app.get("/login",function(req,res){
    res.render("login");
})
app.post("/loginr", async function(req,res) {

    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user) {
        res.status(401).send("Invalid email");
    }
    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            const token = jwt.sign({email:user.email,password:user.password},"secretkey");
            res.cookie("token",token);
            res.redirect("/home");
        }
        else{
            res.send("invalid pass");
        }
    });
    
})
app.get("/cookiecheck",function(req,res){
    const token = req.cookies.token;
    res.send(`cookie is ${token}`);
})
app.get("/logout",function(req,res){
    res.cookie("token","");
    res.send("loggedout")
})







app.listen(3000);