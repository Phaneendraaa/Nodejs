const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");

app.get("/",function(req,res){
    fs.readdir("./files",function(err,files){
        res.render("index",{files:files});
    });
    
});
app.post("/formcatch",function(req,res){
        fs.writeFile(`./files/${(req.body.title).split(" ").join("")}.txt`,`${req.body.btn}`,function(err){})
        res.redirect("/");
});
app.get("/details/:val", function(req, res) {
    const filename = "./files/"+req.params.val;
    fs.readFile(filename, function(err, filedata) {
        
        res.render("detail", { filedata: filedata });
    });
});
app.get("/edit/:filenam", function(req, res) {
    const x = req.params.filenam;
    res.render("editpage",{previousName:x})
});
app.post("/edit",function(req,res){
    const PrevName = path.join(__dirname, "files", req.body.Prev);
    const newName = path.join(__dirname, "files", req.body.New);

    fs.rename(PrevName,newName+".txt",function(err){
        res.redirect("/");
    })
})
app.listen(3000);