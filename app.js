const express = require("express")

const app = express();
const path = require("path");
app.set("view engine","ejs");
const userModel = require("./models/user");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));


app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/SignupForm", async (req,res)=>{
    const {name,email,rollno} = req.body;
        const createdUser = await userModel.create({
            name,
            email,
            rollno
        });
        res.redirect("/UserList");
});
app.get("/UserList", async (req,res)=>{
    const userlist = await userModel.find();
    res.render("users",{userlist:userlist});
})

app.get("/deleteUser/:userid", async function(req,res){
        const userid = req.params.userid;
        let deletedUser = await userModel.findOneAndDelete({_id:userid});
        res.redirect("/UserList");
})
app.get("/editUser/:userid", async function(req,res){
    const userid = req.params.userid;
    let details = await userModel.findOne({_id:userid});

    res.render("editUser",{details:details});
})
app.post("/update/:useri", async function(req,res) {
    await userModel.findOneAndUpdate({_id:req.params.useri},{name:req.body.name,email:req.body.email,rollno:req.body.rollno});
    res.redirect("/UserList");
})













app.listen(3000,()=>{
    console.log("server running on http:/localhost:3000");
})