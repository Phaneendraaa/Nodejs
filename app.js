const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
const userModel = require("./models/user");
const postModel = require("./models/post");
const jwt = require("jsonwebtoken");
const { count } = require("console");
app.get("/",function(req,res){
    res.render("signup");
})

app.post("/signup", async function(req,res){
    const {username,email,password} = req.body;
    const newuser = await userModel.create({username,email,password});
    const token = jwt.sign({email:newuser.email,_id:newuser._id},"secret");
    res.cookie("token",token);
    res.redirect("/profile");
})


app.get("/login",function(req,res){
    res.render("login");
})

app.post("/login", async function(req,res){
    const {email,password} = req.body;
    const curruser = await userModel.findOne({email:email,password:password});
    if(curruser){
        const token = jwt.sign({email:curruser.email,_id:curruser._id},"secret");
        res.cookie("token",token);
        res.redirect("/profile");
    }
    else{
    res.send("no user found");
    }
    
})

app.get("/profile", async function(req,res){
    const token = req.cookies.token;
    if(token){
        const decoded = jwt.verify(token,"secret");
        const curruser = await userModel.findOne({email:decoded.email}).populate("posts");
        res.render("profile",{user:curruser});
        }
        else{
            res.redirect("/login");
        }
})

app.post("/createPost", async function(req,res){
    const content = req.body.content;
    const token = req.cookies.token;
    const decoded = jwt.verify(token,"secret");
    
    const newPost = await postModel.create({user:decoded._id,content:content});
    await userModel.findOneAndUpdate({_id:decoded._id},{$push:{posts:newPost._id}});
    res.redirect("/profile");
})

app.get("/liked/:userid", async function(req,res){
        const userid = req.params.userid;
        const post = await postModel.findOneAndUpdate({user:userid},{$push:{likes:userid}}).populate("likes");
        res.redirect("/profile");
})

app.get("/delete/:postid", async function(req,res) {

    const postid = req.params.postid;
    const post = await postModel.deleteOne({_id:postid});
    res.redirect("/profile");
    
})

app.get("/logout", function(req, res) {
    res.cookie("token",""); // Clear the token cookie
    res.send("logged out"); // Send a response indicating the user has logged out
});

app.get("/readCookie", function(req, res) {
    const token = req.cookies.token; // Get the token from cookies
    if (token) {
        // If the token exists, the user is considered logged in
        res.send(`User  is logged in with token: ${token}`);
    } else {
        // If no token exists, the user is logged out
        res.send("User  is logged out");
    }
});



app.listen(3001);