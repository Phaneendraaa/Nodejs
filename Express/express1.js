const express = require("express")
const app = express()

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("this is from error middleware" + err.message);  // This is called when there is an error in code code
});
app.use(function(req, res, next) {
    console.log("This is similar to constructor in java , it is called first"); // First this is called whenever a route is called
});

app.get("/hello",function(req,res){
    res.send("Hello");
});
app.get("/",function(req,res,next){
    res.send("hello");
});

app.listen(2000);
