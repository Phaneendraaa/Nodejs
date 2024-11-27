const express = require("express");
const app = express();
app.listen(3000);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieparser = require("cookie-parser");
app.use(cookieparser());
app.get("/",function(req,res){
    res.send("Hello World");
})

app.get("/createuser", async function(req,res){

    let newuser = await userModel.create({username:"na",email:"nagawork@gmail.com"});
    res.cookie("currentuser",newuser._id);
    res.send(newuser);
});

app.get("/createpost", async function(req,res){
        const curruser = req.cookies.currentuser;

        const newpost = await postModel.create({postdata:"This   a post",user:curruser});
        await userModel.findOneAndUpdate({_id:newpost.user},{$push:{posts: newpost._id}}); //another method is by using .save() browse for info
        res.send(newpost);

})
app.get("/readuser", async function(req,res){
    
    let newuser = await userModel.find();
    res.send(newuser);
});
app.get("/readpost", async function(req,res){
    
    let newuser = await postModel.find();
    res.send(newuser);
});


